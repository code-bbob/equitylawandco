from rest_framework import serializers
from .models import PracticeArea, PracticeAreaImage, ContactMessage, Appointment, AppointmentDay, AvailableHours, Attorney


class PracticeAreaImageSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = PracticeAreaImage
        fields = ['id', 'image', 'image_url', 'title', 'description', 'order']
    
    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None


class PracticeAreaSerializer(serializers.ModelSerializer):
    featured_image_url = serializers.SerializerMethodField()
    gallery_images = PracticeAreaImageSerializer(many=True, read_only=True)
    
    class Meta:
        model = PracticeArea
        fields = ['id', 'name', 'slug', 'description', 'featured_image', 'featured_image_url', 'gallery_images']
    
    def get_featured_image_url(self, obj):
        if obj.featured_image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.featured_image.url)
            return obj.featured_image.url
        return None


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'email', 'phone', 'message', 'created_at']
        read_only_fields = ['id', 'created_at']


class AvailableHoursSerializer(serializers.ModelSerializer):
    class Meta:
        model = AvailableHours
        fields = ['id', 'day', 'start_time', 'end_time']


class AppointmentDaySerializer(serializers.ModelSerializer):
    day_display = serializers.CharField(source='get_day_of_week_display', read_only=True)
    available_hours = AvailableHoursSerializer(many=True, read_only=True)
    
    class Meta:
        model = AppointmentDay
        fields = ['id', 'day_of_week', 'day_display', 'is_active', 'available_hours']


class AppointmentSerializer(serializers.ModelSerializer):
    practice_area_name = serializers.CharField(source='practice_area.name', read_only=True)
    
    class Meta:
        model = Appointment
        fields = [
            'id', 'client_name', 'client_email', 'client_phone', 
            'practice_area', 'practice_area_name', 'appointment_date', 
            'appointment_time', 'duration_minutes', 'notes', 'status', 
            'created_at', 'updated_at', 'confirmation_sent'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at', 'confirmation_sent']


class AttorneySerializer(serializers.ModelSerializer):
    photo_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Attorney
        fields = [
            'id', 'full_name', 'slug', 'job_title', 'short_bio', 'professional_background',
            'email', 'phone', 'photo', 'photo_url', 'order', 
            'is_active', 'specializations', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'slug', 'created_at', 'updated_at']
    
    def get_photo_url(self, obj):
        if obj.photo:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.photo.url)
            return obj.photo.url
        return None