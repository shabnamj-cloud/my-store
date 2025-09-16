"use client";

import React from "react";
import Link from "next/link";

const phoneCategories = [
  {
    id: 1,
    title: "Flagship Phones",
    subcategory: "flagship",
    description: "Top-tier smartphones with the latest technology and features.",
    image:
      "https://images.unsplash.com/photo-1642944082139-0568f49d8514?q=80&w=1613&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    title: "Budget Phones",
    subcategory: "budget",
    description: "Affordable smartphones without compromising on quality.",
    image:
      "https://images.unsplash.com/photo-1640720930833-e6c12967a15d?q=80&w=1477&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    title: "Gaming Phones",
    subcategory: "gaming",
    description: "High-performance phones optimized for mobile gaming.",
    image:
      "https://images.unsplash.com/photo-1732020883994-0dbe997c1662?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    title: "Camera Phones",
    subcategory: "camera",
    description: "Capture every detail with advanced mobile photography.",
    image:
      "https://images.unsplash.com/photo-1658837721890-fc4b47a6f0e2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const PhoneCategoriesSection = () => {
  return (
    <section className="categories-section">
      <div className="categories-hero-text">
        <h2>Explore Our Mobile Phone Categories</h2>
        <p>Choose from flagship, budget, gaming, and camera phones.</p>
      </div>

      <div className="categories-grid">
        {phoneCategories.map((category) => (
          <Link
            key={category.id}
            href={`/products?category=smartphone&subcategory=${encodeURIComponent(
              category.subcategory
            )}`}
            className="category-card-link"
          >
            <div className="category-card">
              <img src={category.image} alt={category.title} />
              <div className="overlay">
                <h3>{category.title}</h3>
                <p>{category.description}</p>
                <div className="view-products-btn">View Products</div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <style jsx>{`
        .categories-section {
          padding: 60px 20px;
          background: linear-gradient(135deg, #f0f3ff, #d9e2ff);
          text-align: center;
        }

        .categories-hero-text h2 {
          font-size: 2.5rem;
          font-weight: bold;
          color: #3b82f6;
          margin-bottom: 10px;
        }

        .categories-hero-text p {
          font-size: 1.2rem;
          color: #374151;
        }

        .categories-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
          margin-top: 40px;
        }

        @media (min-width: 768px) {
          .categories-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        .category-card-link {
          text-decoration: none;
          display: block;
          border-radius: 15px;
          overflow: hidden;
          transition: transform 0.3s ease;
        }

        .category-card-link:hover {
          transform: scale(1.05);
        }

        .category-card {
          position: relative;
          cursor: pointer;
          height: 370px;
        }

        .category-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.4);
          color: #fff;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          padding: 20px;
          transition: background 0.3s ease;
        }

        .category-card-link:hover .overlay {
          background: rgba(0, 0, 0, 0.6);
        }

        .overlay h3 {
          font-size: 1.8rem;
          margin-bottom: 10px;
        }

        .overlay p {
          font-size: 1rem;
          margin-bottom: 15px;
        }

        .view-products-btn {
          padding: 10px 20px;
          background-color: #3b82f6;
          color: white;
          border-radius: 5px;
          font-weight: bold;
          transition: background-color 0.3s ease;
        }

        .category-card-link:hover .view-products-btn {
          background-color: #2563eb;
        }
      `}</style>
    </section>
  );
};

export default PhoneCategoriesSection;