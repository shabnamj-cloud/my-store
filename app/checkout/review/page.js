"use client";
import { useRouter } from "next/navigation";
import { useCart } from "../../context/CartContext";
import "../../../css/Checkout.css";
import { useState } from "react";

export default function ReviewPage() {
  const router = useRouter();
  const { products, getCartTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  // فرض می‌کنیم اطلاعات shipping + payment تو Context یا localStorage هست
  const shippingInfo = JSON.parse(localStorage.getItem("shippingInfo") || "{}");
  const paymentMethod = localStorage.getItem("paymentMethod") || "Credit Card";

  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      // 🚨 درخواست به سرور برای ثبت سفارش + پردازش واقعی پرداخت
      const res = await fetch("/api/place-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ products, shippingInfo, paymentMethod }),
      });

      const data = await res.json();

      if (data.success) {
        clearCart(); // سبد رو خالی کن
        router.push("/checkout/success"); // رفتن به صفحه موفقیت
      } else {
        alert("Order failed: " + data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-container">
      <h1>📝 Review Your Order</h1>

      <div className="review-section">
        <h2>Shipping Information</h2>
        <p><strong>Name:</strong> {shippingInfo.fullName}</p>
        <p><strong>Address:</strong> {shippingInfo.address}</p>
        <p><strong>Phone:</strong> {shippingInfo.phone}</p>
      </div>

      <div className="review-section">
        <h2>Payment Method</h2>
        <p>{paymentMethod}</p>
      </div>

      <div className="review-section">
        <h2>Order Items</h2>
        {products.map((product) => (
          <div key={product.id} className="review-item">
            <span>{product.name} (x{product.quantity})</span>
            <span>${(product.price * product.quantity).toLocaleString()}</span>
          </div>
        ))}
      </div>

      <div className="review-section total">
        <h2>Total:</h2>
        <p>${getCartTotal().toLocaleString()}</p>
      </div>

      <button
        onClick={handlePlaceOrder}
        className="checkout-btn"
        disabled={loading}
      >
        {loading ? "Processing Payment..." : "✅ Place Order"}
      </button>
    </div>
  );
}
