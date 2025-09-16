import React from "react";
import Link from "next/link";
import Image from "next/image";
import "../../css/hero.css";

export default function HeroOverlap() {
  return (
    <section className="hero hero-overlap">
      <div className="hero-overlay"></div>
      <div className="hero-main-content">
        <div className="hero-text">
          <h1>
            Modern <span>Tech</span> for You
          </h1>
          <p>
            Explore the latest laptops and smartphones with style, comfort, and unbeatable prices.
          </p>
          <div className="hero-buttons">
            <Link href="/products" className="btn-primary">Shop Now</Link>
            <Link href="/contact" className="btn-secondary">Contact Us</Link>
          </div>
        </div>

        <div className="hero-images-stack">
          <Image
            src="https://images.unsplash.com/photo-1558885544-2defc62e2e2b?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Laptop"
            width={600}
            height={480}
            className="stack-img stack-img-1"
            priority
          />
          <Image
            src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Smartphone"
            width={500}
            height={400}
            className="stack-img stack-img-2"
            priority
          />
          <Image
            src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
            alt="Tablet"
            width={450}
            height={300}
            className="stack-img stack-img-3"
            priority
          />
        </div>
      </div>

      <div className="hero-bottom-section">
        <h3 className="playwrite-ca">Ready to find your next favorite device?</h3>
      </div>
    </section>
  );
}