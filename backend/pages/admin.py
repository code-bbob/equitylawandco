from django.contrib import admin
from .models import PracticeArea, PracticeAreaImage, ContactMessage, Appointment, BusinessHours, Holiday, Attorney, Blog

class PracticeAreaImageInline(admin.TabularInline):
    model = PracticeAreaImage
    extra = 3
    fields = ['image', 'title', 'description', 'order']
    ordering = ['order']

class PracticeAreaAdmin(admin.ModelAdmin):
    list_display = ['name', 'featured_image_preview', 'gallery_count']
    fields = ['name', 'description', 'featured_image']
    search_fields = ['name', 'description']
    inlines = [PracticeAreaImageInline]
    
    def featured_image_preview(self, obj):
        if obj.featured_image:
            return f'✓ Image uploaded'
        return 'No image'
    featured_image_preview.short_description = 'Featured Image'
    
    def gallery_count(self, obj):
        count = obj.gallery_images.count()
        return f'{count} image{"s" if count != 1 else ""}'
    gallery_count.short_description = 'Gallery Images'

class PracticeAreaImageAdmin(admin.ModelAdmin):
    list_display = ['practice_area', 'title', 'order', 'image_preview']
    list_filter = ['practice_area', 'created_at']
    search_fields = ['title', 'description', 'practice_area__name']
    
    def image_preview(self, obj):
        if obj.image:
            return '✓ Image uploaded'
        return 'No image'
    image_preview.short_description = 'Image'


class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'created_at', 'is_read', 'preview']
    list_filter = ['created_at', 'is_read']
    search_fields = ['name', 'email', 'message']
    readonly_fields = ['name', 'email', 'message', 'created_at']
    fields = ['name', 'email', 'message', 'created_at', 'is_read']
    
    def preview(self, obj):
        return obj.message[:50] + '...' if len(obj.message) > 50 else obj.message
    preview.short_description = 'Message Preview'
    
    def has_add_permission(self, request):
        return False
    
    def has_delete_permission(self, request, obj=None):
        return request.user.is_superuser


admin.site.register(PracticeArea, PracticeAreaAdmin)
admin.site.register(PracticeAreaImage, PracticeAreaImageAdmin)
admin.site.register(ContactMessage, ContactMessageAdmin)


class AppointmentAdmin(admin.ModelAdmin):
    list_display = ['client_name', 'appointment_date', 'appointment_time', 'status', 'practice_area', 'confirmation_status']
    list_filter = ['status', 'appointment_date', 'practice_area', 'created_at']
    search_fields = ['client_name', 'client_email', 'client_phone']
    readonly_fields = ['id', 'created_at', 'updated_at', 'confirmation_sent']
    fields = [
        'id', 'client_name', 'client_email', 'client_phone',
        'practice_area', 'appointment_date', 'appointment_time',
        'duration_minutes', 'notes', 'status', 'confirmation_sent',
        'created_at', 'updated_at'
    ]
    
    def confirmation_status(self, obj):
        return '✓ Sent' if obj.confirmation_sent else '✗ Not sent'
    confirmation_status.short_description = 'Confirmation Email'


class BusinessHoursAdmin(admin.ModelAdmin):
    list_display = ['get_day_display', 'is_open', 'start_time', 'end_time']
    list_filter = ['is_open']
    fields = ['day_of_week', 'is_open', 'start_time', 'end_time']
    
    def get_day_display(self, obj):
        return obj.get_day_of_week_display()
    get_day_display.short_description = 'Day'


class HolidayAdmin(admin.ModelAdmin):
    list_display = ['date', 'name', 'description']
    list_filter = ['date']
    search_fields = ['name', 'description']
    fields = ['date', 'name', 'description']
    date_hierarchy = 'date'


class AttorneyAdmin(admin.ModelAdmin):
    list_display = ['full_name', 'slug', 'job_title', 'is_active', 'order', 'photo_preview', 'created_at']
    list_filter = ['is_active', 'job_title', 'created_at']
    search_fields = ['full_name', 'job_title', 'bio', 'specializations', 'email']
    readonly_fields = ['id', 'slug', 'created_at', 'updated_at']
    fieldsets = (
        ('Personal Information', {
            'fields': ('full_name', 'slug', 'job_title', 'photo')
        }),
        ('Professional Details', {
            'fields': ('bio', 'specializations', 'email', 'phone')
        }),
        ('Display Settings', {
            'fields': ('is_active', 'order')
        }),
        ('Metadata', {
            'fields': ('id', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    ordering = ['order', 'full_name']
    
    def photo_preview(self, obj):
        if obj.photo:
            return '✓ Photo uploaded'
        return '✗ No photo'
    photo_preview.short_description = 'Photo'


admin.site.register(Appointment, AppointmentAdmin)
admin.site.register(BusinessHours, BusinessHoursAdmin)
admin.site.register(Holiday, HolidayAdmin)
admin.site.register(Attorney, AttorneyAdmin)


class BlogAdmin(admin.ModelAdmin):
    list_display = ['title', 'author', 'published_date', 'category', 'is_published', 'featured_image_preview']
    list_filter = ['is_published', 'published_date', 'category', 'author']
    search_fields = ['title', 'excerpt', 'content', 'author', 'category']
    readonly_fields = ['id', 'slug', 'published_date', 'updated_date', 'created_at']
    fieldsets = (
        ('Blog Information', {
            'fields': ('title', 'slug', 'excerpt', 'author')
        }),
        ('Content', {
            'fields': ('content', 'featured_image')
        }),
        ('Organization', {
            'fields': ('category', 'is_published')
        }),
        ('Metadata', {
            'fields': ('id', 'published_date', 'updated_date', 'created_at'),
            'classes': ('collapse',)
        }),
    )
    ordering = ['-published_date']
    
    def featured_image_preview(self, obj):
        if obj.featured_image:
            return '✓ Image uploaded'
        return '✗ No image'
    featured_image_preview.short_description = 'Featured Image'


admin.site.register(Blog, BlogAdmin)
