"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";
import { FaTrash, FaPlus, FaMinus, FaShoppingCart } from "react-icons/fa";
import "../../css/checkout.css";

export default function CartPage() {
  const { products, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const router = useRouter();

  const handleQuantityChange = (id, qty) => {
    if (qty <= 0) removeFromCart(id);
    else updateQuantity(id, qty);
  };

  const handleCheckout = () => router.push("/checkout/shipping");

  if (!products.length) return (
    <div className="cart-container empty-state">
      <FaShoppingCart size={64} className="cart-icon"/>
      <h1>Your Cart is Empty</h1>
      <p>Looks like you haven’t added any products yet.</p>
      <Link href="/products" className="continue-shopping-btn">Continue Shopping</Link>
    </div>
  );

  return (
    <div className="cart-container">
      <h1>🛒 Shopping Cart</h1>
      <div className="cart-content">
        <div className="cart-products">
          {products.map(p => (
            <div key={p.id} className="cart-product">
              <div className="product-details">
                <h3>{p.name}</h3>
                <p className="product-price">${p.price.toLocaleString()}</p>
                {!p.inStock && <p className="out-of-stock">Out of Stock</p>}
              </div>
              <div className="quantity-controls">
                <button className="qty-btn minus" disabled={p.quantity<=1} onClick={()=>handleQuantityChange(p.id,p.quantity-1)}><FaMinus size={14}/></button>
                <span className="qty-value">{p.quantity}</span>
                <button className="qty-btn plus" disabled={p.quantity >= (p.stock||10)} onClick={()=>handleQuantityChange(p.id,p.quantity+1)}><FaPlus size={14}/></button>
                <button className="qty-btn trash" onClick={()=>removeFromCart(p.id)}><FaTrash size={14}/></button>
              </div>
              <div className="product-total">${(p.price*p.quantity).toLocaleString()}</div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-item"><span>Subtotal:</span><span>${getCartTotal().toLocaleString()}</span></div>
          <div className="summary-item"><span>Shipping:</span><span>{getCartTotal()>500?"Free":"$10.00"}</span></div>
          <div className="summary-item total"><span>Total:</span><span>${getCartTotal().toLocaleString()}</span></div>
          <button onClick={handleCheckout} className="checkout-btn">✅ Proceed to Checkout</button>
          <button onClick={clearCart} className="clear-cart-btn">🗑️ Clear Cart</button>
          <Link href="/products" className="continue-shopping-link">← Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
}
