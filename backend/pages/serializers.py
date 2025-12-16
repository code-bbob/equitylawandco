from rest_framework import serializers
from .models import PracticeArea, PracticeAreaImage, ContactMessage, Appointment, BusinessHours, Holiday, Attorney


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
        fields = ['id', 'name', 'description', 'featured_image', 'featured_image_url', 'gallery_images']
    
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
        fields = ['id', 'name', 'email', 'message', 'created_at']
        read_only_fields = ['id', 'created_at']


class BusinessHoursSerializer(serializers.ModelSerializer):
    day_of_week_display = serializers.CharField(source='get_day_of_week_display', read_only=True)
    
    class Meta:
        model = BusinessHours
        fields = ['id', 'day_of_week', 'day_of_week_display', 'is_open', 'start_time', 'end_time']


class HolidaySerializer(serializers.ModelSerializer):
    class Meta:
        model = Holiday
        fields = ['id', 'date', 'name', 'description']


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
            'id', 'full_name', 'slug', 'job_title', 'bio', 
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