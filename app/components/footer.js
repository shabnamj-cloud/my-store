// components/Footer.js
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-dark text-light pt-5 pb-4">
      <div className="container">
        <div className="row">

          {/* About */}
          <div className="col-md-3 mb-4">
            <h5>About Shop</h5>
            <p>High-quality electronics store offering laptops, smartphones, and more with fast shipping.</p>
          </div>

          {/* Quick Links */}
          <div className="col-md-3 mb-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link href="/" className="text-light text-decoration-none">Home</Link></li>
              <li><Link href="/products" className="text-light text-decoration-none">Products</Link></li>
              <li><Link href="/about" className="text-light text-decoration-none">About Us</Link></li>
              <li><Link href="/contact" className="text-light text-decoration-none">Contact</Link></li>
              <li><Link href="/faq" className="text-light text-decoration-none">FAQ</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="col-md-3 mb-4">
            <h5>Categories</h5>
            <ul className="list-unstyled">
              <li><Link href="/products?category=laptop" className="text-light text-decoration-none">Laptops</Link></li>
              <li><Link href="/products?category=smartphone" className="text-light text-decoration-none">Smartphones</Link></li>
              <li><Link href="/products?category=accessories" className="text-light text-decoration-none">Accessories</Link></li>
              <li><Link href="/products?category=gaming" className="text-light text-decoration-none">Gaming</Link></li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="col-md-3 mb-4">
            <h5>Follow Us</h5>
            <div className="d-flex gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-light fs-4">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-light fs-4">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-light fs-4">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-light fs-4">
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
          </div>

        </div>

        <hr className="border-secondary" />
        <div className="text-center">
          &copy; {new Date().getFullYear()} YourShop. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

