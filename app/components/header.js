"use client";

import { useState, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserContext } from "../context/UserContext";

export default function Header() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [cartCount, setCartCount] = useState(3);

  const router = useRouter();
  const { user, setUser } = useContext(UserContext);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/authpage");
  };

  const fetchProducts = async (searchTerm) => {
    if (!searchTerm) return setResults([]);
    try {
      const res = await fetch(`/api/products?search=${searchTerm}`);
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?query=${encodeURIComponent(query)}`);
      setShowSuggestions(false);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg shadow-sm px-4 py-2 custom-navbar">
      <Link href="/" className="navbar-brand fw-bold fs-4">
        🛒 MyStore
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarContent"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link" href="/">
              Home
            </Link>
          </li>
          <li className="nav-item dropdown">
            <Link className="nav-link" href="/products">
              Products
            </Link>
            <ul className="dropdown-menu shadow border-0 mt-0">
              <li>
                <h6 className="dropdown-header">Smartphones</h6>
                <Link
                  className="dropdown-item"
                  href="/products?category=smartphone"
                >
                  View all
                </Link>
              </li>
              <hr className="dropdown-divider" />
              <li>
                <h6 className="dropdown-header">Laptops</h6>
                <Link
                  className="dropdown-item"
                  href="/products?category=laptop"
                >
                  View all
                </Link>
              </li>
            </ul>
          </li>
          <li className="nav-item">
            <Link className="nav-link" href="/about">
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" href="/contact">
              Contact
            </Link>
          </li>
        </ul>

        <form
          className="d-flex position-relative mx-auto"
          style={{ maxWidth: "500px", flex: "1" }}
          onSubmit={handleSearch}
        >
          <input
            className="form-control form-control-lg"
            type="search"
            placeholder="Search for products..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowSuggestions(true);
              fetchProducts(e.target.value);
            }}
            onFocus={() => query && setShowSuggestions(true)}
          />
          <button
            type="submit"
            className="btn btn-outline-primary ms-2 d-flex align-items-center"
          >
            🔍
          </button>

          {showSuggestions && query && (
            <div
              className="position-absolute bg-white border shadow rounded mt-2"
              style={{
                top: "100%",
                left: 0,
                right: 0,
                zIndex: 1000,
                maxHeight: "250px",
                overflowY: "auto",
              }}
            >
              {results.length > 0 ? (
                results.map((p, i) => (
                  <Link
                    key={i}
                    href={`/product/${p._id}`}
                    className="d-block px-3 py-2 text-decoration-none text-dark border-bottom"
                    onClick={() => setShowSuggestions(false)}
                  >
                    <div className="fw-bold">{p.name}</div>
                    <small className="text-muted">{p.brand}</small>
                  </Link>
                ))
              ) : (
                <div className="px-3 py-2 text-muted">No products found</div>
              )}
            </div>
          )}
        </form>

        <ul className="navbar-nav ms-3 align-items-center">
          <li className="nav-item me-3 position-relative">
            <Link href="/cart" className="nav-link fs-5">
              🛒
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                style={{ fontSize: "0.7rem" }}
              >
                {cartCount}
              </span>
            </Link>
          </li>

          <li className="nav-item">
            {!user ? (
              <Link className="btn btn-primary px-3 ms-2" href="/authpage">
                Sign Up/Login
              </Link>
            ) : (
              <button
                className="btn btn-warning px-3 ms-2"
                onClick={handleLogout}
              >
                Sign Out
              </button>
            )}
          </li>
        </ul>
      </div>

      <style jsx>{`
        .nav-item.dropdown:hover .dropdown-menu {
          display: block;
          margin-top: 0;
        }
        .custom-navbar {
          background-color: #636368ff; /* مثلا سورمه‌ای تیره */
          color: white;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1030;
          margin-bottom: 0;
        }
      `}</style>
    </nav>
  );
}
