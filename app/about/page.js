"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "../../css/AboutPage.css";

const AboutPage = () => {
  const [stats, setStats] = useState([
    { number: 10000, label: "Happy Customers", suffix: "+" },
    { number: 5000, label: "Products Sold", suffix: "+" },
    { number: 12, label: "Years Experience", suffix: "" },
    { number: 98, label: "Satisfaction Rate", suffix: "%" },
  ]);

  return (
    <div className="about-container">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-content">
          <h1>About TechHub</h1>
          <p>Your trusted partner for cutting-edge technology since 2012</p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-content">
            <div className="mission-text">
              <h2>Our Mission</h2>
              <p>
                At TechHub, we believe that everyone deserves access to the latest technology
                at affordable prices. Our mission is to bridge the gap between innovation and
                accessibility, bringing you the best laptops, smartphones, and tech accessories
                from leading brands around the world.
              </p>
              <p>
                We carefully curate our product selection to ensure quality, performance, and
                value for money. Whether you're a student, professional, or tech enthusiast,
                we have the perfect device to meet your needs.
              </p>
            </div>
            <div className="mission-image">
              <Image
                src="https://images.unsplash.com/photo-1558885544-2defc62e2e2b"
                alt="Our mission"
                width={500}
                height={400}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <h2>Why Choose TechHub?</h2>
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-number">
                  {stat.number}{stat.suffix}
                </div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-item">
              <div className="value-icon">✓</div>
              <h3>Quality Assurance</h3>
              <p>Every product undergoes rigorous testing to ensure it meets our high standards.</p>
            </div>
            <div className="value-item">
              <div className="value-icon">🛡️</div>
              <h3>Warranty Protection</h3>
              <p>Comprehensive warranty on all products with easy claim process.</p>
            </div>
            <div className="value-item">
              <div className="value-icon">🚚</div>
              <h3>Fast Delivery</h3>
              <p>Free shipping on orders over $500 with next-day delivery option.</p>
            </div>
            <div className="value-item">
              <div className="value-icon">💬</div>
              <h3>Expert Support</h3>
              <p>Our tech experts are available 7 days a week to assist you.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <h2>Meet Our Leadership</h2>
          <div className="team-grid">
            <div className="team-member">
              <Image
                src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="CEO"
                width={200}
                height={200}
                className="team-photo"
              />
              <h3>Michael Chen</h3>
              <p>Founder & CEO</p>
            </div>
            <div className="team-member">
              <Image
                src="https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dhoto-1568602471122-7832951cc4c5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="CTO"
                width={200}
                height={200}
                className="team-photo"
              />
              <h3>John Johnson</h3>
              <p>Chief Technology Officer</p>
            </div>
            <div className="team-member">
              <Image
                src="https://images.unsplash.com/photo-1649123245135-4db6ead931b5?q=80&w=725&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="CMO"
                width={200}
                height={200}
                className="team-photo"
              />
              <h3>David Martinez</h3>
              <p>Chief Marketing Officer</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <div className="container">
          <h2>Ready to Find Your Perfect Device?</h2>
          <p>Explore our curated collection of laptops and smartphones</p>
          <Link href="/products" className="cta-button">
            Shop Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
