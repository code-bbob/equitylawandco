from django.db import models
from django_ckeditor_5.fields import CKEditor5Field
from datetime import datetime, timedelta
import uuid
from django.utils.text import slugify

# Create your models here.

class Appointment(models.Model):
    """Appointment booking model"""
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('cancelled', 'Cancelled'),
        ('completed', 'Completed'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    client_name = models.CharField(max_length=255)
    client_email = models.EmailField()
    client_phone = models.CharField(max_length=20)
    practice_area = models.ForeignKey('PracticeArea', on_delete=models.SET_NULL, null=True, blank=True)
    appointment_date = models.DateField()
    appointment_time = models.TimeField()
    duration_minutes = models.IntegerField(default=60, help_text="Duration in minutes")
    notes = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    confirmation_sent = models.BooleanField(default=False)
    
    def __str__(self):
        return f"Appointment - {self.client_name} ({self.appointment_date} {self.appointment_time})"
    
    class Meta:
        ordering = ['-appointment_date', '-appointment_time']
        unique_together = ['appointment_date', 'appointment_time']
        verbose_name_plural = "Appointments"


class BusinessHours(models.Model):
    """Define business hours for each day of the week"""
    DAY_CHOICES = [
        (0, 'Monday'),
        (1, 'Tuesday'),
        (2, 'Wednesday'),
        (3, 'Thursday'),
        (4, 'Friday'),
        (5, 'Saturday'),
        (6, 'Sunday'),
    ]
    
    day_of_week = models.IntegerField(choices=DAY_CHOICES, unique=True)
    is_open = models.BooleanField(default=True)
    start_time = models.TimeField(default='09:00')
    end_time = models.TimeField(default='17:00')
    
    def __str__(self):
        return f"{self.get_day_of_week_display()} - {self.start_time} to {self.end_time}" if self.is_open else f"{self.get_day_of_week_display()} - Closed"
    
    class Meta:
        verbose_name_plural = "Business Hours"


class Holiday(models.Model):
    """Define holidays and closed dates"""
    date = models.DateField(unique=True)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    
    def __str__(self):
        return f"{self.date} - {self.name}"
    
    class Meta:
        verbose_name_plural = "Holidays"
        ordering = ['date']


class PracticeArea(models.Model):
    name = models.CharField(max_length=255)
    description = CKEditor5Field()
    featured_image = models.ImageField(upload_to='practice_areas/', null=True, blank=True, help_text="Main image displayed at the top of the page")

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name_plural = "Practice Areas"


class PracticeAreaImage(models.Model):
    practice_area = models.ForeignKey(PracticeArea, on_delete=models.CASCADE, related_name='gallery_images')
    image = models.ImageField(upload_to='practice_areas/gallery/')
    title = models.CharField(max_length=255, blank=True, help_text="Optional title for the image")
    description = models.CharField(max_length=500, blank=True, help_text="Optional description for the image")
    order = models.PositiveIntegerField(default=0, help_text="Order of images in gallery (lower numbers appear first)")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.practice_area.name} - {self.title or 'Gallery Image'}"
    
    class Meta:
        ordering = ['order', '-created_at']
        verbose_name_plural = "Practice Area Images"


class ContactMessage(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    def __str__(self):
        return f"Message from {self.name} ({self.email})"
    
    class Meta:
        verbose_name_plural = "Contact Messages"
        ordering = ['-created_at']


class Attorney(models.Model):
    """Attorney/Team Member model"""
    full_name = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True, help_text="URL-friendly identifier")
    job_title = models.CharField(max_length=255, help_text="e.g., Senior Attorney, Junior Attorney, Paralegal")
    bio = models.TextField(blank=True, help_text="Professional biography")
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=20, blank=True)
    photo = models.ImageField(upload_to='attorneys/', help_text="Professional photo of the attorney")
    order = models.PositiveIntegerField(default=0, help_text="Order of appearance on the team page (lower numbers appear first)")
    is_active = models.BooleanField(default=True, help_text="Whether to display this attorney on the website")
    specializations = models.CharField(max_length=500, blank=True, help_text="Comma-separated list of practice areas")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.full_name} - {self.job_title}"
    
    def save(self, *args, **kwargs):
        if not self.slug:
            # Generate slug from full_name
            base_slug = self.full_name.lower().replace(' ', '-').replace('.', '').replace("'", '')
            base_slug = ''.join(c for c in base_slug if c.isalnum() or c == '-')
            slug = base_slug
            
            # Handle duplicates by adding a number suffix
            counter = 1
            while Attorney.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            
            self.slug = slug
        
        super().save(*args, **kwargs)
    
    class Meta:
        verbose_name_plural = "Attorneys"
        ordering = ['order', 'full_name']


class Blog(models.Model):
    """Blog post model"""
    title = models.CharField(max_length=255, unique=True)
    slug = models.SlugField(max_length=255, unique=True, help_text="URL-friendly identifier")
    author = models.CharField(max_length=255, help_text="Name of the blog author")
    featured_image = models.ImageField(upload_to='blogs/', null=True, blank=True, help_text="Featured image for the blog post")
    excerpt = models.TextField(max_length=500, help_text="Short summary of the blog post")
    content = CKEditor5Field(help_text="Main content of the blog post")
    category = models.CharField(max_length=100, blank=True, help_text="Blog category/topic")
    published_date = models.DateField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)
    is_published = models.BooleanField(default=True, help_text="Whether this blog is visible on the website")
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.title)
            slug = base_slug
            
            # Handle duplicates by adding a number suffix
            counter = 1
            while Blog.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            
            self.slug = slug
        
        super().save(*args, **kwargs)
    
    class Meta:
        verbose_name_plural = "Blogs"
        ordering = ['-published_date']
        indexes = [
            models.Index(fields=['-published_date']),
            models.Index(fields=['slug']),
            models.Index(fields=['is_published']),
        ]