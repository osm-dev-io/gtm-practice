"use client";

import { useState } from "react";
import { pushToDataLayer } from "@/components/DataLayerPush";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    pushToDataLayer("form_submit", {
      form_name: "contact",
      form_subject: formData.subject,
    });
    setSubmitted(true);
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Contact Us</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <div className="bg-white rounded-lg shadow p-8">
          <h2 className="text-xl font-semibold mb-4">Send a Message</h2>
          {submitted ? (
            <div id="form-success" className="text-green-600 font-medium py-8 text-center">
              Thank you! Your message has been sent. (Check dataLayer for the event)
            </div>
          ) : (
            <form id="contact-form" onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  required
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  onFocus={() => pushToDataLayer("form_field_focus", { field_name: "name" })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  required
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  onFocus={() => pushToDataLayer("form_field_focus", { field_name: "email" })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Subject</label>
                <select
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.subject}
                  onChange={(e) => {
                    setFormData({ ...formData, subject: e.target.value });
                    pushToDataLayer("form_field_change", {
                      field_name: "subject",
                      field_value: e.target.value,
                    });
                  }}
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="support">Support</option>
                  <option value="feedback">Feedback</option>
                  <option value="partnership">Partnership</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Message</label>
                <textarea
                  required
                  rows={4}
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  onFocus={() => pushToDataLayer("form_field_focus", { field_name: "message" })}
                />
              </div>
              <button
                type="submit"
                id="contact-submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium"
              >
                Send Message
              </button>
            </form>
          )}
        </div>

        {/* Sidebar with clickable elements */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold mb-3">Quick Contact</h3>
            <div className="space-y-3 text-sm">
              <a
                href="tel:+1234567890"
                className="flex items-center gap-2 text-blue-600 hover:underline"
                onClick={() => pushToDataLayer("phone_click")}
              >
                📞 +1 (234) 567-890
              </a>
              <a
                href="mailto:hello@gtm-practice.com"
                className="flex items-center gap-2 text-blue-600 hover:underline"
                onClick={() => pushToDataLayer("email_click")}
              >
                ✉️ hello@gtm-practice.com
              </a>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold mb-3">Follow Us</h3>
            <div className="flex gap-3">
              {["Twitter", "LinkedIn", "GitHub", "YouTube"].map((platform) => (
                <button
                  key={platform}
                  className="px-3 py-2 bg-gray-100 rounded hover:bg-gray-200 transition text-sm"
                  onClick={() =>
                    pushToDataLayer("social_click", { social_platform: platform.toLowerCase() })
                  }
                >
                  {platform}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold mb-3">Rate Your Experience</h3>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  className="text-3xl text-gray-300 hover:text-yellow-400 transition"
                  onClick={() => pushToDataLayer("rating_click", { rating_value: star })}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          {/* File Download */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold mb-3">Resources</h3>
            <button
              id="download-btn"
              className="text-blue-600 hover:underline text-sm"
              onClick={() =>
                pushToDataLayer("file_download", {
                  file_name: "gtm-guide.pdf",
                  file_type: "pdf",
                })
              }
            >
              📄 Download GTM Guide (PDF)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
