from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from datetime import datetime, timedelta
from .models import PracticeArea, ContactMessage, Appointment, BusinessHours, Holiday, Attorney
from .serializers import (
    PracticeAreaSerializer, ContactMessageSerializer, 
    AppointmentSerializer, BusinessHoursSerializer, HolidaySerializer, AttorneySerializer
)
from .utils import send_contact_email_async, send_appointment_confirmation_email, get_available_time_slots


class PracticeAreaViewSet(viewsets.ModelViewSet):
    queryset = PracticeArea.objects.all()
    serializer_class = PracticeAreaSerializer
    search_fields = ['name', 'description']
    ordering_fields = ['name', 'id']
    ordering = ['name']


class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        
        # Send email asynchronously
        send_contact_email_async(
            name=serializer.validated_data['name'],
            email=serializer.validated_data['email'],
            message=serializer.validated_data['message']
        )
        
        return Response(
            {"message": "Thank you for your message. We will get back to you soon."},
            status=status.HTTP_201_CREATED
        )


class AppointmentViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing appointments with availability checking
    """
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    ordering = ['-appointment_date', '-appointment_time']
    
    def create(self, request, *args, **kwargs):
        """Create a new appointment with availability validation"""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # Validate appointment date and time
        appointment_date = serializer.validated_data['appointment_date']
        appointment_time = serializer.validated_data['appointment_time']
        duration_minutes = serializer.validated_data.get('duration_minutes', 60)
        
        # Check if date is in the past
        today = datetime.now().date()
        if appointment_date < today:
            return Response(
                {"error": "Cannot book appointments in the past."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Check if it's a holiday
        if Holiday.objects.filter(date=appointment_date).exists():
            return Response(
                {"error": "The selected date is a holiday. Please choose another date."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Get business hours for this day
        day_of_week = appointment_date.weekday()
        try:
            business_hours = BusinessHours.objects.get(day_of_week=day_of_week)
        except BusinessHours.DoesNotExist:
            return Response(
                {"error": "Business hours not configured for this day."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if not business_hours.is_open:
            return Response(
                {"error": "The office is closed on this day."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Check if appointment time is within business hours
        if not (business_hours.start_time <= appointment_time):
            return Response(
                {"error": f"Appointment time must be after {business_hours.start_time}"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Calculate end time and check if it's within business hours
        from datetime import datetime as dt
        appointment_end = (dt.combine(appointment_date, appointment_time) + 
                          timedelta(minutes=duration_minutes)).time()
        
        if appointment_end > business_hours.end_time:
            return Response(
                {"error": f"Appointment must end by {business_hours.end_time}"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Check for overlapping appointments
        appointment_start_dt = dt.combine(appointment_date, appointment_time)
        appointment_end_dt = appointment_start_dt + timedelta(minutes=duration_minutes)
        
        # Get all existing appointments for this date
        existing_appointments = Appointment.objects.filter(
            appointment_date=appointment_date,
            status__in=['pending', 'confirmed']
        )
        
        # Check if this appointment overlaps with any existing appointment
        for appt in existing_appointments:
            appt_start_dt = dt.combine(appointment_date, appt.appointment_time)
            appt_end_dt = appt_start_dt + timedelta(minutes=appt.duration_minutes)
            
            # Check for overlap: new appointment starts before existing ends AND new appointment ends after existing starts
            if appointment_start_dt < appt_end_dt and appointment_end_dt > appt_start_dt:
                return Response(
                    {"error": "This time slot or a portion of it is already booked. Please choose another time."},
                    status=status.HTTP_400_BAD_REQUEST
                )
        
        # Save the appointment
        self.perform_create(serializer)
        appointment = serializer.instance
        
        # Send confirmation email
        send_appointment_confirmation_email(appointment)
        
        return Response(
            {
                "message": "Appointment successfully booked! Confirmation email has been sent.",
                "appointment": serializer.data
            },
            status=status.HTTP_201_CREATED
        )
    
    @action(detail=False, methods=['get'])
    def available_slots(self, request):
        """
        Get available appointment slots for a given date
        Query params: date (YYYY-MM-DD), duration_minutes (optional, default 60)
        """
        date_str = request.query_params.get('date')
        duration_minutes = int(request.query_params.get('duration_minutes', 60))
        
        if not date_str:
            return Response(
                {"error": "date parameter is required (format: YYYY-MM-DD)"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            appointment_date = datetime.strptime(date_str, '%Y-%m-%d').date()
        except ValueError:
            return Response(
                {"error": "Invalid date format. Use YYYY-MM-DD"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        available_slots = get_available_time_slots(appointment_date, duration_minutes)
        
        return Response({
            "date": appointment_date,
            "available_slots": [slot.strftime('%H:%M') for slot in available_slots],
            "count": len(available_slots)
        })
    
    @action(detail=False, methods=['get'])
    def available_dates(self, request):
        """
        Get available dates for appointment booking (next 30 days)
        """
        days_ahead = int(request.query_params.get('days_ahead', 30))
        duration_minutes = int(request.query_params.get('duration_minutes', 60))
        
        available_dates = []
        today = datetime.now().date()
        
        for i in range(1, days_ahead + 1):
            check_date = today + timedelta(days=i)
            
            # Skip if holiday
            if Holiday.objects.filter(date=check_date).exists():
                continue
            
            # Check business hours
            day_of_week = check_date.weekday()
            try:
                business_hours = BusinessHours.objects.get(day_of_week=day_of_week)
                if not business_hours.is_open:
                    continue
            except BusinessHours.DoesNotExist:
                continue
            
            # Check if there are available slots for this date
            slots = get_available_time_slots(check_date, duration_minutes)
            if slots:
                available_dates.append({
                    "date": check_date,
                    "day": check_date.strftime('%A'),
                    "slots_count": len(slots)
                })
        
        return Response({
            "available_dates": available_dates,
            "total": len(available_dates)
        })


class BusinessHoursViewSet(viewsets.ModelViewSet):
    """ViewSet for managing business hours"""
    queryset = BusinessHours.objects.all()
    serializer_class = BusinessHoursSerializer
    ordering = ['day_of_week']


class HolidayViewSet(viewsets.ModelViewSet):
    """ViewSet for managing holidays"""
    queryset = Holiday.objects.all()
    serializer_class = HolidaySerializer
    ordering = ['date']


class AttorneyViewSet(viewsets.ModelViewSet):
    """ViewSet for managing attorneys/team members"""
    queryset = Attorney.objects.filter(is_active=True).order_by('order', 'full_name')
    serializer_class = AttorneySerializer
    search_fields = ['full_name', 'job_title', 'bio', 'specializations']
    ordering_fields = ['order', 'full_name', 'job_title']
    ordering = ['order', 'full_name']
    lookup_field = 'slug'
