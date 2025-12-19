# Appointment Break Times Feature - Implementation Guide

## Overview

The appointment scheduling system now supports break times (lunch breaks, coffee breaks, etc.) during business hours. This allows you to define specific time periods when appointments cannot be scheduled.

## How It Works

### 1. **Business Hours** (Already Exists)
Define regular business hours for each day of the week:
- Example: Monday 9:00 AM - 5:00 PM

### 2. **Break Times** (New Feature)
Define breaks within business hours for each day:
- Example: Monday 12:00 PM - 1:00 PM (Lunch Break)
- Example: Monday 3:00 PM - 3:30 PM (Coffee Break)

### 3. **Appointment Slots Generation**
When a user requests available appointment slots, the system:
1. Gets the business hours for that day
2. Checks for active breaks on that day
3. Excludes any time slots that overlap with breaks
4. Returns only available time slots that fit within working hours and don't conflict with breaks or existing appointments

## How to Add Break Times

### Via Django Admin Panel

1. Go to: `http://localhost:8000/admin/`
2. Navigate to: **Break Times** section
3. Click **+ Add Break Time**
4. Fill in the form:
   - **Day of week**: Select the day (Monday-Sunday)
   - **Start time**: When the break starts (e.g., 12:00)
   - **End time**: When the break ends (e.g., 13:00)
   - **Reason**: Description (e.g., "Lunch", "Coffee Break")
   - **Is active**: Check this box to enable the break

### Example Configuration

**Monday:**
- Business Hours: 9:00 AM - 5:00 PM
- Break 1: 12:00 PM - 1:00 PM (Lunch)
- Break 2: 3:00 PM - 3:30 PM (Coffee Break)

**Result:**
Available slots would be:
- 9:00 AM - 11:30 AM
- 1:00 PM - 3:00 PM
- 3:30 PM - 5:00 PM

## API Endpoints

### Get Available Appointment Slots
```
GET /api/appointments/available_slots/?date=2025-12-20&duration_minutes=60
```

The endpoint automatically considers:
- Business hours for that day
- Active break times
- Existing confirmed/pending appointments

### Manage Break Times (Admin Only)
```
GET    /api/break-times/                    # List all breaks
POST   /api/break-times/                    # Create a new break
GET    /api/break-times/{id}/               # Get specific break
PUT    /api/break-times/{id}/               # Update break
DELETE /api/break-times/{id}/               # Delete break
```

### Break Time Request Body Example
```json
{
  "day_of_week": 0,           // 0=Monday, 1=Tuesday, etc.
  "start_time": "12:00",      // HH:MM format
  "end_time": "13:00",        // HH:MM format
  "reason": "Lunch",          // Description
  "is_active": true           // Enable/disable
}
```

## Frontend Integration

The frontend automatically uses the updated API that accounts for breaks. No frontend changes needed - everything is handled on the backend.

When a user:
1. Selects an appointment date
2. Selects a duration
3. The system fetches available slots from the API
4. Available slots already exclude all break times
5. User picks from the available slots

## Managing Breaks

### Temporarily Disable a Break
- Go to Break Times admin
- Find the break
- Uncheck "Is active"
- Save

### Delete a Break
- Go to Break Times admin
- Find the break
- Click Delete

### Change Break Times
- Edit the break in admin
- Update start/end times
- Save

## Features

✅ Per-day break configuration
✅ Multiple breaks per day (e.g., lunch + coffee break)
✅ Enable/disable breaks without deleting
✅ Clear reason/description for each break
✅ Automatic exclusion from appointment slots
✅ Works with existing overlap detection
✅ Admin panel integration
✅ REST API support

## Database

New table: `pages_breaktime`
Fields:
- `id` - Primary key
- `day_of_week` - Day of week (0-6)
- `start_time` - Break start time
- `end_time` - Break end time
- `reason` - Description
- `is_active` - Boolean to enable/disable

## Migration

The migration file `0012_breaktime.py` creates the new table. 

To apply:
```bash
python manage.py migrate
```

## Testing

Test via Django shell:
```python
from pages.utils import get_available_time_slots
from datetime import date

# Get available slots for a specific date (Monday)
slots = get_available_time_slots(date(2025, 12, 22), duration_minutes=60)
print(slots)  # Returns times that avoid breaks
```

## Summary

This implementation provides a flexible, scalable way to manage breaks in your appointment scheduling system. Breaks are:
- Easy to add/edit/remove via admin
- Automatically respected during slot generation
- Configurable per day
- Can be temporarily disabled without deletion
- Integrated with the existing appointment overlap detection
