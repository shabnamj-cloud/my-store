"use client";

import React from "react";
import Link from "next/link";

// نمونه داده دسته‌ها با لینک واقعی تصاویر و ساب‌کتگوری‌ها
const categories = [
  {
    id: 1,
    title: "Gaming Laptops",
    description: "High-performance laptops designed for gaming enthusiasts.",
    image: "https://images.unsplash.com/photo-1640955014216-75201056c829?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    subcategory: "gaming"
  },
  {
    id: 2,
    title: "Office Laptops",
    description: "Reliable and efficient laptops for your professional needs.",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
    subcategory: "office"
  },
  {
    id: 3,
    title: "Ultrabooks",
    description: "Slim, light, and powerful laptops for on-the-go productivity.",
    image: "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=800&q=80",
    subcategory: "ultrabooks"
  },
  {
    id: 4,
    title: "2-in-1 Laptops",
    description: "Convertible laptops that adapt to your lifestyle.",
    image: "https://images.unsplash.com/photo-1565536421951-135eb52b6e5d?q=80&w=1148&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    subcategory: "2-in-1"
  },
];

const CategoriesSection = () => {
  return (
    <>
      <style>
        {`
          .categories-section {
            padding: 60px 20px;
            background: linear-gradient(135deg, #f0f3ff, #d9e2ff);
            text-align: center;
          }

          .categories-hero-text h2 {
            font-size: 3rem;
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
            height: 370px;
          }

          .category-card-link:hover {
            transform: scale(1.05);
          }

          .category-card {
            position: relative;
            height: 100%;
            width: 100%;
            cursor: pointer;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
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
        `}
      </style>

      <section className="categories-section">
        <div className="categories-hero-text">
          <h2>Explore Our Laptop Categories</h2>
          <p>Find the perfect laptop for gaming, work, or portability.</p>
        </div>

        <div className="categories-grid">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              href={`/products?category=laptop&subcategory=${category.subcategory}`}
              className="category-card-link"
            >
              <div
                className="category-card"
                style={{ backgroundImage: `url(${category.image})` }}
              >
                <div className="overlay">
                  <h3>{category.title}</h3>
                  <p>{category.description}</p>
                  <div className="view-products-btn">View Products</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
};

export default CategoriesSection;