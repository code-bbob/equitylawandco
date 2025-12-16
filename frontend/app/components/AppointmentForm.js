import { useState, useEffect } from 'react';

export default function AppointmentForm() {
  const [availableDates, setAvailableDates] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [practiceAreas, setPracticeAreas] = useState([]);

  const [formData, setFormData] = useState({
    client_name: '',
    client_email: '',
    client_phone: '',
    practice_area: '',
    appointment_date: '',
    appointment_time: '',
    duration_minutes: 60,
    notes: ''
  });

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

  // Load practice areas and available dates on mount
  useEffect(() => {
    loadPracticeAreas();
    loadAvailableDates();
  }, []);

  const loadPracticeAreas = async () => {
    try {
      const response = await fetch(`${API_BASE}/practice-areas/`);
      const data = await response.json();
      setPracticeAreas(data.results || data);
    } catch (err) {
      console.error('Error loading practice areas:', err);
    }
  };

  const loadAvailableDates = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(
        `${API_BASE}/appointments/available_dates/?days_ahead=30&duration_minutes=60`
      );
      
      if (!response.ok) throw new Error('Failed to load available dates');
      
      const data = await response.json();
      setAvailableDates(data.available_dates || []);
    } catch (err) {
      setError('Unable to load available dates. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadAvailableSlots = async (date) => {
    setLoading(true);
    setError('');
    setAvailableSlots([]);
    
    try {
      const response = await fetch(
        `${API_BASE}/appointments/available_slots/?date=${date}&duration_minutes=${formData.duration_minutes}`
      );
      
      if (!response.ok) throw new Error('Failed to load time slots');
      
      const data = await response.json();
      setAvailableSlots(data.available_slots || []);
      
      if (data.available_slots.length === 0) {
        setError('No available time slots for this date.');
      }
    } catch (err) {
      setError('Unable to load time slots. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, appointment_date: date, appointment_time: '' });
    if (date) {
      loadAvailableSlots(date);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Validation
    if (!formData.client_name.trim()) {
      setError('Please enter your name');
      setLoading(false);
      return;
    }

    if (!formData.client_email.trim()) {
      setError('Please enter your email');
      setLoading(false);
      return;
    }

    if (!formData.client_phone.trim()) {
      setError('Please enter your phone number');
      setLoading(false);
      return;
    }

    if (!formData.appointment_date) {
      setError('Please select a date');
      setLoading(false);
      return;
    }

    if (!formData.appointment_time) {
      setError('Please select a time');
      setLoading(false);
      return;
    }

    try {
      const payload = {
        client_name: formData.client_name.trim(),
        client_email: formData.client_email.trim(),
        client_phone: formData.client_phone.trim(),
        appointment_date: formData.appointment_date,
        appointment_time: formData.appointment_time,
        duration_minutes: formData.duration_minutes,
        notes: formData.notes.trim(),
      };

      if (formData.practice_area) {
        payload.practice_area = formData.practice_area;
      }

      const response = await fetch(`${API_BASE}/appointments/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Failed to book appointment');
      }

      setSuccess('✓ Appointment booked successfully! Check your email for confirmation.');
      
      // Reset form
      setFormData({
        client_name: '',
        client_email: '',
        client_phone: '',
        practice_area: '',
        appointment_date: '',
        appointment_time: '',
        duration_minutes: 60,
        notes: ''
      });
      
      setAvailableSlots([]);
      
      // Reload dates
      setTimeout(() => loadAvailableDates(), 1000);

    } catch (err) {
      setError(err.message || 'Failed to book appointment. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-200 px-5 sm:px-20 py-10 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-10 sm:p-16">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Book an Appointment</h1>
        <p className="text-gray-600 mb-8 text-black">Schedule a consultation with our legal team</p>

        {error && <div className="p-4 mb-5 rounded-lg bg-red-50 border-l-4 border-red-600 text-red-700 font-medium animate-in fade-in slide-in-from-top">{error}</div>}
        {success && <div className="p-4 mb-5 rounded-lg bg-green-50 border-l-4 border-green-600 text-green-700 font-medium animate-in fade-in slide-in-from-top">{success}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          {/* Personal Information */}
          <div className="border-b pb-5 last:border-b-0">
            <h2 className="text-lg font-semibold text-gray-800 mb-5">Your Information</h2>
            
            <div className="flex flex-col gap-2 mb-5 last:mb-0">
              <label htmlFor="client_name" className="text-gray-700 font-medium text-sm uppercase tracking-wide">Full Name *</label>
              <input
                id="client_name"
                type="text"
                name="client_name"
                value={formData.client_name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                required
                className="px-4 py-3 border-2 border-gray-300 rounded-lg text-black font-inherit transition-all bg-gray-50 focus:outline-none focus:border-amber-600 focus:bg-white focus:ring-4 focus:ring-amber-100 placeholder:text-gray-400"
              />
            </div>

            <div className="flex flex-col gap-2 mb-5 last:mb-0">
              <label htmlFor="client_email" className="text-gray-700 font-medium text-sm uppercase tracking-wide">Email Address *</label>
              <input
                id="client_email"
                type="email"
                name="client_email"
                value={formData.client_email}
                onChange={handleInputChange}
                placeholder="your@email.com"
                required
                className="px-4 py-3 border-2 border-gray-300 rounded-lg text-black font-inherit transition-all bg-gray-50 focus:outline-none focus:border-amber-600 focus:bg-white focus:ring-4 focus:ring-amber-100 placeholder:text-gray-400"
              />
            </div>

            <div className="flex flex-col gap-2 mb-5 last:mb-0">
              <label htmlFor="client_phone" className="text-gray-700 font-medium text-sm uppercase tracking-wide">Phone Number *</label>
              <input
                id="client_phone"
                type="tel"
                name="client_phone"
                value={formData.client_phone}
                onChange={handleInputChange}
                placeholder="+1 (555) 123-4567"
                required
                className="px-4 py-3 border-2 border-gray-300 rounded-lg text-black font-inherit transition-all bg-gray-50 focus:outline-none focus:border-amber-600 focus:bg-white focus:ring-4 focus:ring-amber-100 placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Appointment Details */}
          <div className="border-b pb-5 last:border-b-0">
            <h2 className="text-lg font-semibold text-gray-800 mb-5">Appointment Details</h2>

            <div className="flex flex-col gap-2 mb-5 last:mb-0">
              <label htmlFor="practice_area" className="text-gray-700 font-medium text-sm uppercase tracking-wide">Practice Area (Optional)</label>
              <select
                id="practice_area"
                name="practice_area"
                value={formData.practice_area}
                onChange={handleInputChange}
                className="px-4 py-3 border-2 border-gray-300 rounded-lg text-black font-inherit transition-all bg-gray-50 focus:outline-none focus:border-amber-600 focus:bg-white focus:ring-4 focus:ring-amber-100"
              >
                <option value="">Select a practice area</option>
                {practiceAreas.map((area) => (
                  <option key={area.id} value={area.id}>
                    {area.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2 mb-5 last:mb-0">
              <label htmlFor="duration_minutes" className="text-gray-700 font-medium text-sm uppercase tracking-wide">Session Duration</label>
              <select
                id="duration_minutes"
                name="duration_minutes"
                value={formData.duration_minutes}
                onChange={handleInputChange}
                className="px-4 py-3 border-2 border-gray-300 rounded-lg text-black font-inherit transition-all bg-gray-50 focus:outline-none focus:border-amber-600 focus:bg-white focus:ring-4 focus:ring-amber-100"
              >
                <option value={30}>30 minutes</option>
                <option value={60}>1 hour</option>
                <option value={90}>1.5 hours</option>
                <option value={120}>2 hours</option>
              </select>
            </div>

            {/* Date Selection */}
            <div className="flex flex-col gap-2 mb-5 last:mb-0">
              <label htmlFor="appointment_date" className="text-gray-700 font-medium text-sm uppercase tracking-wide">Preferred Date *</label>
              {loading && !availableDates.length ? (
                <div className="px-4 py-3 bg-blue-50 border-l-4 border-blue-600 rounded text-blue-700 text-sm font-medium animate-pulse">Loading available dates...</div>
              ) : (
                <select
                  id="appointment_date"
                  name="appointment_date"
                  value={formData.appointment_date}
                  onChange={(e) => handleDateChange(e.target.value)}
                  required
                  className="px-4 py-3 border-2 border-gray-300 rounded-lg text-black font-inherit transition-all bg-gray-50 focus:outline-none focus:border-amber-600 focus:bg-white focus:ring-4 focus:ring-amber-100"
                >
                  <option value="">Select a date</option>
                  {availableDates.map((date) => (
                    <option key={date.date} value={date.date}>
                      {new Date(date.date + 'T00:00:00').toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })} ({date.slots_count} {date.slots_count === 1 ? 'slot' : 'slots'})
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Time Selection */}
            {formData.appointment_date && (
              <div className="flex flex-col gap-2 mb-5 last:mb-0">
                <label htmlFor="appointment_time" className="text-gray-700 font-medium text-sm uppercase tracking-wide">Preferred Time *</label>
                {loading ? (
                  <div className="px-4 py-3 bg-blue-50 border-l-4 border-blue-600 rounded text-blue-700 text-sm font-medium animate-pulse">Loading available times...</div>
                ) : availableSlots.length > 0 ? (
                  <select
                    id="appointment_time"
                    name="appointment_time"
                    value={formData.appointment_time}
                    onChange={handleInputChange}
                    required
                    className="px-4 py-3 border-2 border-gray-300 rounded-lg text-black font-inherit transition-all bg-gray-50 focus:outline-none focus:border-amber-600 focus:bg-white focus:ring-4 focus:ring-amber-100"
                  >
                    <option value="">Select a time</option>
                    {availableSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {new Date(`2000-01-01T${slot}:00`).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: true
                        })}
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className="px-4 py-3 bg-red-50 border-l-4 border-red-600 rounded text-red-700 text-sm font-medium">No available times for this date</div>
                )}
              </div>
            )}
          </div>

          {/* Additional Notes */}
          <div className="border-b pb-5 last:border-b-0">
            <h2 className="text-lg font-semibold text-gray-800 mb-5">Additional Information</h2>

            <div className="flex flex-col gap-2 mb-5 last:mb-0">
              <label htmlFor="notes" className="text-gray-700 font-medium text-sm uppercase tracking-wide">Notes or Message (Optional)</label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Tell us about your legal matter..."
                rows={5}
                className="px-4 py-3 border-2 border-gray-300 rounded-lg text-black font-inherit transition-all bg-gray-50 focus:outline-none focus:border-amber-600 focus:bg-white focus:ring-4 focus:ring-amber-100 placeholder:text-gray-400 resize-vertical"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 mt-8">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-8 py-4 bg-gradient-to-r from-amber-700 to-amber-900 text-white border-0 rounded-lg text-black font-semibold cursor-pointer transition-all shadow-lg shadow-amber-700/20 uppercase tracking-wide hover:not-disabled:translate-y-[-2px] hover:not-disabled:shadow-xl hover:not-disabled:shadow-amber-700/30 active:not-disabled:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Booking...' : 'Book Appointment'}
            </button>
          </div>

          <p className="text-gray-400 text-xs text-center mt-5 mb-0">
            * Required fields. A confirmation email will be sent to your provided email address.
          </p>
        </form>
      </div>
    </div>
  );
}
