"use client";
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../../context/CartContext';
import '../../../css/ProductDetail.css';

const ProductDetailPage = () => {
  const params = useParams();
  const productId = params?.id;
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showCartNotification, setShowCartNotification] = useState(false);

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        setError('Product ID is missing');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        console.log('🔍 Looking for product with ID:', productId);
        
        const response = await fetch('http://localhost:3000/api/products');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.status}`);
        }
        
        const allProducts = await response.json();
        console.log('✅ Total products received:', allProducts.length);
        console.log('📦 All products:', allProducts); // برای دیباگ
        
        // پیدا کردن محصول بر اساس _id - روش درست
        const foundProduct = allProducts.find(p => {
          // بررسی چندین فرمت مختلف برای _id
          if (p._id && p._id.$oid) {
            return p._id.$oid === productId;
          } else if (typeof p._id === 'string') {
            return p._id === productId;
          }
          return false;
        });
        
        console.log('🔎 Found product:', foundProduct);
        
        if (!foundProduct) {
          console.log('❌ No product found with ID:', productId);
          // بررسی ساختار _id محصولات برای دیباگ
          allProducts.forEach((prod, index) => {
            console.log(`Product ${index} _id:`, prod._id);
            console.log(`Product ${index} _id type:`, typeof prod._id);
            if (prod._id && prod._id.$oid) {
              console.log(`Product ${index} _id.$oid:`, prod._id.$oid);
            }
          });
          throw new Error('Product not found in the products list');
        }
        
        console.log('✅ Product found successfully:', foundProduct.name);
        setProduct(foundProduct);
      } catch (err) {
        console.error('❌ Error fetching product:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  // تابع کمکی برای تبدیل قیمت از فرمت MongoDB
  const parseMongoNumber = (value) => {
    if (!value) return 0;
    if (typeof value === 'number') return value;
    if (typeof value === 'string') return parseInt(value);
    if (value.$numberInt) return parseInt(value.$numberInt);
    if (value.$numberDouble) return parseFloat(value.$numberDouble);
    return 0;
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      
      // نمایش نوتیفیکیشن
      setShowCartNotification(true);
      setTimeout(() => setShowCartNotification(false), 3000);
      
      console.log(`Added ${quantity} of ${product.name} to cart`);
    }
  };

  if (loading) {
    return (
      <div className="product-detail-container">
        <div className="loading">Loading product...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-detail-container">
        <div className="error">
          <h2>Product Not Found</h2>
          <p>{error}</p>
          <Link href="/products" className="back-link">
            ← Back to Products
          </Link>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail-container">
        <div className="error">
          <h2>Product Not Found</h2>
          <Link href="/products" className="back-link">
            ← Back to Products
          </Link>
        </div>
      </div>
    );
  }

  // تبدیل قیمت‌ها با تابع کمکی
  const productPrice = parseMongoNumber(product.price);
  const originalPrice = parseMongoNumber(product.originalPrice);
  const stockCount = parseMongoNumber(product.stock);

  return (
    <div className="product-detail-container">
      {/* نوتیفیکیشن اضافه شدن به سبد خرید */}
      {showCartNotification && (
        <div className="cart-notification">
          <div className="notification-content">
            <span>✓ Added to cart successfully!</span>
            <Link href="/cart" className="view-cart-btn">
              View Cart
            </Link>
          </div>
        </div>
      )}

      <nav className="breadcrumb">
        <Link href="/">Home</Link>
        <span> / </span>
        <Link href="/products">Products</Link>
        <span> / </span>
        <span>{product.name}</span>
      </nav>

      <div className="product-detail">
        {/* گالری تصاویر */}
        <div className="product-gallery">
          {/* <div className="main-image">
            <Image
              src={product.image || '/placeholder-product.jpg'}
              alt={product.name}
              width={500}
              height={500}
              className="product-image"
              onError={(e) => {
                e.target.src = '/placeholder-product.jpg';
              }}
            />
          </div> */}
          
          {product.images && product.images.length > 1 && (
            <div className="image-thumbnails">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <Image
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    width={80}
                    height={80}
                    onError={(e) => {
                      e.target.src = '/placeholder-product.jpg';
                    }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* اطلاعات محصول */}
        <div className="product-info">
          <h1 className="product-title">{product.name}</h1>
          {product.brand && <p className="product-brand">Brand: {product.brand}</p>}
          
          <div className="product-price">
            <span className="current-price">${productPrice?.toLocaleString()}</span>
            {originalPrice && originalPrice > productPrice && (
              <span className="original-price">${originalPrice.toLocaleString()}</span>
            )}
            {product.discount && (
              <span className="discount">-{product.discount}%</span>
            )}
          </div>

          <div className="product-rating">
            <div className="stars">★★★★★</div>
            <span className="rating-text">(4.8/5 • 124 reviews)</span>
          </div>

          <div className="product-description">
            <h3>Description</h3>
            <p>{product.description || 'No description available.'}</p>
          </div>

          {/* مشخصات فنی */}
          {product.specifications && Object.keys(product.specifications).length > 0 && (
            <div className="product-specs">
              <h3>Specifications</h3>
              <div className="specs-grid">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="spec-item">
                    <span className="spec-name">{key}:</span>
                    <span className="spec-value">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* انتخاب تعداد و افزودن به سبد */}
          <div className="purchase-section">
            <div className="quantity-selector">
              <label htmlFor="quantity">Quantity:</label>
              <select
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                disabled={!product.inStock}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>

            <div className="action-buttons">
              <button 
                className="add-to-cart-btn" 
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
              <button 
                className="buy-now-btn"
                disabled={!product.inStock}
              >
                {product.inStock ? 'Buy Now' : 'Out of Stock'}
              </button>
            </div>
          </div>

          {/* اطلاعات اضافی */}
          <div className="product-meta">
            {product.sku && (
              <div className="meta-item">
                <span className="meta-label">SKU:</span>
                <span className="meta-value">{product.sku}</span>
              </div>
            )}
            {product.category && (
              <div className="meta-item">
                <span className="meta-label">Category:</span>
                <span className="meta-value">{product.category}</span>
              </div>
            )}
            {product.subcategory && (
              <div className="meta-item">
                <span className="meta-label">Subcategory:</span>
                <span className="meta-value">{product.subcategory}</span>
              </div>
            )}
            <div className="meta-item">
              <span className="meta-label">In Stock:</span>
              <span className="meta-value">{product.inStock ? `Yes (${stockCount} available)` : 'No'}</span>
            </div>
            {product.releaseYear && (
              <div className="meta-item">
                <span className="meta-label">Release Year:</span>
                <span className="meta-value">{parseMongoNumber(product.releaseYear)}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;