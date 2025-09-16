import React from "react";
import Image from "next/image";
import "../../css/features.css"

const features = [
  {
    title: "Fast Shipping",
    description: "Get your devices delivered quickly and safely.",
    icon: "https://images.unsplash.com/photo-1582469062319-9d6a6a9eb4f2?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // نمونه تصویر
  },
  {
    title: "Premium Quality",
    description: "Only top-quality laptops and smartphones.",
    icon: "https://images.unsplash.com/photo-1713470812508-c276021f1b93?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Best Deals",
    description: "Affordable prices with exclusive discounts.",
    icon: "https://images.unsplash.com/photo-1662063386711-4ea396cccebf?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export default function FeaturesSection() {
  return (
    <section className="features-section">
      <div className="features-container">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="feature-icon">
              <Image
                src={feature.icon}
                alt={feature.title}
                width={120}
                height={120}
                className="icon-img"
                priority
              />
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
