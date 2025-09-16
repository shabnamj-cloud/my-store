"use client";
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import '../../css/ContactPage.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you within 24 hours.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="contact-container">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="hero-content">
          <h1>Contact Us</h1>
          <p>We're here to help with all your tech needs</p>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="contact-info-section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-methods">
              <h2>Get in Touch</h2>
              <div className="contact-method">
                <div className="method-icon">📍</div>
                <div className="method-details">
                  <h3>Visit Our Store</h3>
                  <p>123 Tech Avenue, Silicon Valley, CA 94301</p>
                  <p className="hours">Open Mon-Sat: 9AM - 8PM</p>
                </div>
              </div>
              <div className="contact-method">
                <div className="method-icon">📞</div>
                <div className="method-details">
                  <h3>Call Us</h3>
                  <p>+1 (555) 123-TECH</p>
                  <p className="hours">Available 24/7 for support</p>
                </div>
              </div>
              <div className="contact-method">
                <div className="method-icon">✉️</div>
                <div className="method-details">
                  <h3>Email Us</h3>
                  <p>support@techhub.com</p>
                  <p>sales@techhub.com</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form-container">
              <h2>Send us a Message</h2>
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="product-inquiry">Product Inquiry</option>
                    <option value="technical-support">Technical Support</option>
                    <option value="warranty-claim">Warranty Claim</option>
                    <option value="order-issue">Order Issue</option>
                    <option value="general-question">General Question</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="submit-button">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>What is your return policy?</h3>
              <p>We offer a 30-day return policy on all products. Items must be in original condition with all accessories and packaging.</p>
            </div>
            <div className="faq-item">
              <h3>Do you offer international shipping?</h3>
              <p>Yes, we ship to over 50 countries worldwide. Shipping costs and delivery times vary by location.</p>
            </div>
            <div className="faq-item">
              <h3>How long does warranty last?</h3>
              <p>Standard warranty is 1 year for all products, extendable to 2 or 3 years for selected items.</p>
            </div>
            <div className="faq-item">
              <h3>Can I track my order?</h3>
              <p>Yes, once your order ships, you'll receive a tracking number via email to monitor your delivery.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <div className="container">
          <h2>Visit Our Store</h2>
          <div className="map-container">
            <div className="map-placeholder">
              <Image
                src="/store-map.jpg"
                alt="Store location map"
                width={800}
                height={400}
              />
              <div className="map-overlay">
                <h3>TechHub Flagship Store</h3>
                <p>123 Tech Avenue, Silicon Valley, CA 94301</p>
                <p>Free parking available • Wheelchair accessible</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;