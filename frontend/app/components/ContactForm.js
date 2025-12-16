'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('http://localhost:8000/api/contact/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });

      // Clear success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
      console.error('Contact form error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-amber-900 mb-2">
          Your Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border-2 border-amber-300 rounded-lg focus:outline-none focus:border-amber-700 bg-white text-amber-900 placeholder-amber-600"
          placeholder="John Doe"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-amber-900 mb-2">
          Your Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border-2 border-amber-300 rounded-lg focus:outline-none focus:border-amber-700 bg-white text-amber-900 placeholder-amber-600"
          placeholder="john@example.com"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-amber-900 mb-2">
          Your Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows="6"
          className="w-full px-4 py-3 border-2 border-amber-300 rounded-lg focus:outline-none focus:border-amber-700 bg-white text-amber-900 placeholder-amber-600 resize-none"
          placeholder="Tell us about your legal needs..."
        />
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          Thank you! Your message has been sent successfully. We'll get back to you soon.
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-amber-800 hover:bg-amber-900 disabled:bg-amber-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
      >
        {loading ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
