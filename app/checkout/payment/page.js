"use client";
import { useRouter } from "next/navigation";
import { useCart } from "../../context/CartContext";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "@/css/Checkout.css";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

function CheckoutForm({ totalAmount }) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const { products, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  const shippingInfo = JSON.parse(localStorage.getItem("shippingInfo") || "{}");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    try {
      // ثبت سفارش و دریافت clientSecret
      const res = await fetch("/api/place-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          products,
          shippingInfo,
          paymentMethod: "Credit Card",
          totalAmount,
        }),
      });

      const data = await res.json();

      if (!data.success) throw new Error(data.message);

      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        alert(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        clearCart();
        router.push("/checkout/success");
      }

    } catch (err) {
      console.error(err);
      alert("Payment failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <CardElement options={{ hidePostalCode: true }} />
      <button type="submit" className="checkout-btn" disabled={loading || !stripe}>
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
}

export default function PaymentPage() {
  const { getCartTotal } = useCart();
  return (
    <div className="checkout-container">
      <h1>💳 Payment</h1>
      <Elements stripe={stripePromise}>
        <CheckoutForm totalAmount={getCartTotal()} />
      </Elements>
    </div>
  );
}
