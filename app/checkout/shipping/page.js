"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "../../../css/Checkout.css";

export default function ShippingPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 🚨 اینجا می‌تونی اطلاعات رو ذخیره کنی (Context / localStorage / API)
    console.log("Shipping Info:", form);
    router.push("/checkout/payment"); // مرحله بعد
  };

  return (
    <div className="checkout-container">
      <h1>📦 Shipping Information</h1>

      <form onSubmit={handleSubmit} className="checkout-form">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Street Address"
          value={form.address}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="postalCode"
          placeholder="Postal Code"
          value={form.postalCode}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={form.country}
          onChange={handleChange}
          required
        />

        <button type="submit" className="checkout-btn">
          Continue to Payment →
        </button>
      </form>
    </div>
  );
}
