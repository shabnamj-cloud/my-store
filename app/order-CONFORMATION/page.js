"use client";
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import './OrderConfirmation.css';

const OrderConfirmation = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order_id');
  
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // داده‌های نمونه - در حالت واقعی از API دریافت می‌شود
  const sampleOrder = {
    id: orderId || 'ORD-123456',
    date: new Date().toLocaleDateString(),
    status: 'confirmed',
    items: [
      {
        id: 1,
        name: 'MacBook Pro 16"',
        price: 2499,
        quantity: 1,
        image: '/api/placeholder/80/80',
        brand: 'Apple'
      },
      {
        id: 2, 
        name: 'Wireless Mouse',
        price: 79,
        quantity: 2,
        image: '/api/placeholder/80/80',
        brand: 'Logitech'
      }
    ],
    shipping: {
      method: 'express',
      cost: 15,
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      address: {
        firstName: 'John',
        lastName: 'Doe',
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'United States'
      }
    },
    payment: {
      method: 'credit_card',
      cardLast4: '1234',
      total: 2672,
      subtotal: 2657,
      tax: 212.56,
      shipping: 15
    }
  };

  useEffect(() => {
    // شبیه‌سازی دریافت اطلاعات سفارش از API
    const timer = setTimeout(() => {
      setOrder(sampleOrder);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="confirmation-container">
        <div className="loading">Loading order details...</div>
      </div>
    );
  }

  return (
    <div className="confirmation-container">
      <div className="confirmation-header">
        <div className="success-icon">✅</div>
        <h1>Order Confirmed!</h1>
        <p className="order-number">Order #: {order.id}</p>
        <p className="confirmation-message">
          Thank you for your purchase. We've sent a confirmation email with your order details.
        </p>
      </div>

      <div className="confirmation-content">
        {/* خلاصه سفارش */}
        <div className="order-summary">
          <h2>Order Summary</h2>
          <div className="order-items">
            {order.items.map((item) => (
              <div key={item.id} className="order-item">
                <div className="item-image">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={60}
                    height={60}
                  />
                </div>
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p>{item.brand}</p>
                  <span className="quantity">Qty: {item.quantity}</span>
                </div>
                <div className="item-price">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div className="order-totals">
            <div className="total-row">
              <span>Subtotal</span>
              <span>${order.payment.subtotal.toFixed(2)}</span>
            </div>
            <div className="total-row">
              <span>Shipping</span>
              <span>${order.payment.shipping.toFixed(2)}</span>
            </div>
            <div className="total-row">
              <span>Tax</span>
              <span>${order.payment.tax.toFixed(2)}</span>
            </div>
            <div className="total-row final-total">
              <span>Total</span>
              <span>${order.payment.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* اطلاعات حمل‌ونقل */}
        <div className="shipping-info">
          <h2>Shipping Information</h2>
          <div className="info-card">
            <h3>Delivery Address</h3>
            <p>
              {order.shipping.address.firstName} {order.shipping.address.lastName}<br />
              {order.shipping.address.street}<br />
              {order.shipping.address.city}, {order.shipping.address.state} {order.shipping.address.zipCode}<br />
              {order.shipping.address.country}
            </p>
            
            <div className="delivery-estimate">
              <h3>Estimated Delivery</h3>
              <p className="delivery-date">{order.shipping.estimatedDelivery}</p>
              <p className="shipping-method">
                {order.shipping.method === 'express' ? 'Express Shipping' : 'Standard Shipping'}
              </p>
            </div>
          </div>
        </div>

        {/* اطلاعات پرداخت */}
        <div className="payment-info">
          <h2>Payment Information</h2>
          <div className="info-card">
            <h3>Payment Method</h3>
            <p>
              {order.payment.method === 'credit_card' ? 'Credit Card' : 'PayPal'}<br />
              {order.payment.method === 'credit_card' && `Ending in •••• ${order.payment.cardLast4}`}
            </p>
            
            <div className="payment-status">
              <h3>Payment Status</h3>
              <p className="status-badge confirmed">Confirmed</p>
            </div>
          </div>
        </div>

        {/*下一步 اقدامات */}
        <div className="next-actions">
          <h2>What's Next?</h2>
          <div className="action-steps">
            <div className="action-step">
              <span className="step-number">1</span>
              <div className="step-content">
                <h4>Order Processing</h4>
                <p>We're preparing your order for shipment.</p>
              </div>
            </div>
            <div className="action-step">
              <span className="step-number">2</span>
              <div className="step-content">
                <h4>Shipping</h4>
                <p>You'll receive a tracking number once shipped.</p>
              </div>
            </div>
            <div className="action-step">
              <span className="step-number">3</span>
              <div className="step-content">
                <h4>Delivery</h4>
                <p>Your order will arrive by {order.shipping.estimatedDelivery}.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* دکمه‌های اقدام */}
      <div className="action-buttons">
        <Link href="/products" className="continue-shopping-btn">
          Continue Shopping
        </Link>
        <button className="track-order-btn">
          Track Your Order
        </button>
        <button className="download-invoice-btn">
          Download Invoice
        </button>
      </div>

      {/* پشتیبانی */}
      <div className="support-section">
        <h3>Need Help?</h3>
        <p>Our customer support team is here to help with your order.</p>
        <div className="support-options">
          <div className="support-option">
            <span className="support-icon">📧</span>
            <span>support@yourstore.com</span>
          </div>
          <div className="support-option">
            <span className="support-icon">📞</span>
            <span>+1 (555) 123-4567</span>
          </div>
          <div className="support-option">
            <span className="support-icon">💬</span>
            <span>Live Chat</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;