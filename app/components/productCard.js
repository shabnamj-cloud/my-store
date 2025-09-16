import Link from 'next/link';
import { useState } from 'react';
import '../../css/ProductCard.css';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const [showNotification, setShowNotification] = useState(false);
  const { addToCart } = useCart();

  // تابع کمکی برای تبدیل قیمت از فرمت MongoDB
  const parseMongoNumber = (value) => {
    if (!value) return 0;
    if (typeof value === 'number') return value;
    if (typeof value === 'string') return parseInt(value);
    if (value.$numberInt) return parseInt(value.$numberInt);
    if (value.$numberDouble) return parseFloat(value.$numberDouble);
    return 0;
  };

  const productPrice = parseMongoNumber(product.price);
  const originalPrice = parseMongoNumber(product.originalPrice);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart(product, 1);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  return (
    <div className="product-card">
      <Link href={`/products/${product._id?.$oid || product._id}`}>
        <div className="product-image">
          <img 
            src={product.image} 
            alt={product.name}
            onError={(e) => {
              e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"><rect width="300" height="200" fill="%23f3f4f6"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="14" fill="%239ca3af">Product Image</text></svg>';
            }}
          />
          <div className="product-brand">{product.brand}</div>
          {product.discount && (
            <span className="discount-badge">-{product.discount}%</span>
          )}
        </div>
      </Link>
      
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-specs">{product.specs}</p>
        
        <div className="product-price-container">
          <span className="product-price">${productPrice?.toLocaleString()}</span>
          {originalPrice && originalPrice > productPrice && (
            <span className="original-price">${originalPrice.toLocaleString()}</span>
          )}
        </div>
        
        <div className="product-rating">
          <span className="stars">★★★★☆</span>
          <span className="rating-count">(142)</span>
        </div>
        
        <div className="product-actions">
          <Link href={`/products/${product._id?.$oid || product._id}`} className="view-details-btn">
            View Details
          </Link>
          <button 
            className="add-to-cart-btn"
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>

      {showNotification && (
        <div className="card-notification">
          ✓ Added to cart
        </div>
      )}
    </div>
  );
};

export default ProductCard;