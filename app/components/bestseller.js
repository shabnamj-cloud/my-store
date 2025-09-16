"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Register Swiper modules
SwiperCore.use([Autoplay, Navigation, Pagination]);

const BestSellerSlider = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();

        const oddProducts = data.filter((p) => p.id % 2 !== 0);
        const selected = oddProducts
          .sort(() => 0.5 - Math.random())
          .slice(0, 10);

        setProducts(selected);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div
      className="container-fluid py-5"
      style={{
        background: "linear-gradient(135deg, #f0f3ff, #d9e2ff)",
      }}
    >
      {/* Slider header */}
      <div className="text-center mb-4">
        <h2 className="text-5xl font-extrabold mb-4 text-indigo-700">
          Discover Our Best Sellers!
        </h2>
        <p className="text-muted">
          Check out our most popular products loved by our customers worldwide.
        </p>
      </div>

      {/* Slider */}
      <Swiper
        spaceBetween={20}
        slidesPerView={4}
        loop={true}
        navigation={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            {/* Card */}
            <div
              className="card h-100 shadow-sm border-0"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "15px",
                minHeight: "420px",
              }}
            >
              {/* Image container */}
              <div
                style={{
                  width: "180px",
                  height: "240px",
                  borderRadius: "8px",
                  overflow: "hidden",
                  marginBottom: "15px",
                  backgroundColor: "#fff",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "5px",
                }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain", // تصویر بدون برش
                    backgroundColor: "#fff",
                  }}
                />
              </div>

              {/* Text and button */}
              <div
                className="d-flex flex-column align-items-center"
                style={{ width: "100%" }}
              >
                <h5
                  className="card-title text-center"
                  style={{
                    color: "#000",
                    fontSize: "1.5rem",
                    fontWeight: "700",
                    fontFamily: "var(--bs-body-font-family)",
                    marginBottom: "8px",
                  }}
                >
                  {product.name}
                </h5>
                <p className="text-primary fw-bold mb-2">${product.price}</p>
                <button className="btn btn-primary btn-sm">Add to Cart</button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BestSellerSlider;
