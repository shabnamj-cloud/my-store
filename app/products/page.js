"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ProductSection from "../components/productSection";
import { useCart } from "../context/CartContext";
import "../../css/ProductsPage.css";

const ProductsPage = () => {
  const [laptops, setLaptops] = useState([]);
  const [smartphones, setSmartphones] = useState([]);
  const [filteredLaptops, setFilteredLaptops] = useState([]);
  const [filteredSmartphones, setFilteredSmartphones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCartNotification, setShowCartNotification] = useState(false);
  const [addedProduct, setAddedProduct] = useState(null);

  const { addToCart } = useCart();
  const API_URL = "http://localhost:3000/api/products";

  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const subcategoryParam = searchParams.get("subcategory");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        let url = API_URL;

        // فقط دسته‌های معتبر
        const validCategories = ["laptop", "smartphone"];

        // اگر category معتبر بود → فیلتر روی API
        if (categoryParam && validCategories.includes(categoryParam.toLowerCase())) {
          url += `?category=${encodeURIComponent(categoryParam)}`;
        }

        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error fetching data: ${response.status}`);

        const data = await response.json();

        let laptopsData = [];
        let smartphonesData = [];

        if (!categoryParam) {
          // حالت بدون کوئری → هر دو دسته
          laptopsData = data.filter((p) => p.category === "laptop");
          smartphonesData = data.filter((p) => p.category === "smartphone");
        } else if (categoryParam.toLowerCase() === "laptop") {
          laptopsData = data;
        } else if (categoryParam.toLowerCase() === "smartphone") {
          smartphonesData = data;
        }

        setLaptops(laptopsData);
        setSmartphones(smartphonesData);
        
        // اعمال فیلتر ساب‌کتگوری اگر وجود دارد
        if (subcategoryParam) {
          setFilteredLaptops(
            laptopsData.filter((p) => 
              p.subcategory && p.subcategory.toLowerCase() === subcategoryParam.toLowerCase()
            )
          );
          setFilteredSmartphones(
            smartphonesData.filter((p) => 
              p.subcategory && p.subcategory.toLowerCase() === subcategoryParam.toLowerCase()
            )
          );
        } else {
          setFilteredLaptops(laptopsData);
          setFilteredSmartphones(smartphonesData);
        }
      } catch (err) {
        setError(err.message);
        setLaptops([]);
        setSmartphones([]);
        setFilteredLaptops([]);
        setFilteredSmartphones([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryParam, subcategoryParam]);

  const handleAddToCart = (product, quantity = 1) => {
    addToCart(product, quantity);
    setAddedProduct(product);
    setShowCartNotification(true);
    setTimeout(() => setShowCartNotification(false), 3000);
    console.log(`Added ${quantity} of ${product.name} to cart`);
  };

  // تعیین عنوان و توضیح صفحه بر اساس category و subcategory
  let pageTitle = "Our Products";
  let pageDescription = "Discover our latest collection of laptops and smartphones";

  if (categoryParam) {
    if (categoryParam.toLowerCase() === "laptop") {
      pageTitle = "Laptops";
      pageDescription = "Explore our latest laptops";
    } else if (categoryParam.toLowerCase() === "smartphone") {
      pageTitle = "Smartphones";
      pageDescription = "Explore our latest smartphones";
    }
  }

  // اگر subcategory وجود دارد، آن را به توضیحات اضافه کن
  if (subcategoryParam) {
    const subcategoryText = subcategoryParam.charAt(0).toUpperCase() + subcategoryParam.slice(1);
    pageTitle = `${subcategoryText} ${pageTitle}`;
    pageDescription = `Explore our ${subcategoryText.toLowerCase()} ${categoryParam || 'products'}`;
  }

  if (loading) return <div className="loading">Loading products...</div>;

  if (error)
    return (
      <div className="products-page">
        <div className="page-header">
          <h1>{pageTitle}</h1>
          <p>{pageDescription}</p>
        </div>
        <div className="error">Error: {error}</div>
      </div>
    );

  return (
    <div className="products-page">
      {showCartNotification && addedProduct && (
        <div className="cart-notification">
          <div className="notification-content">
            <span>✓ {addedProduct.name} added to cart!</span>
          </div>
        </div>
      )}

      <div className="page-header">
        <h1>{pageTitle}</h1>
        <p>{pageDescription}</p>
        {subcategoryParam && (
          <div className="subcategory-filter-info">
            <span>Filtered by: {subcategoryParam}</span>
            <a href={`/products?category=${categoryParam}`} className="clear-filter">
              Clear filter
            </a>
          </div>
        )}
      </div>

      {filteredLaptops.length > 0 && (
        <ProductSection
          title="Laptops"
          products={filteredLaptops}
          itemsPerPageOptions={[6, 9, 12]}
          defaultItemsPerPage={6}
          onAddToCart={handleAddToCart}
        />
      )}

      {filteredSmartphones.length > 0 && (
        <ProductSection
          title="Smartphones"
          products={filteredSmartphones}
          itemsPerPageOptions={[6, 9, 12]}
          defaultItemsPerPage={6}
          onAddToCart={handleAddToCart}
        />
      )}

      {filteredLaptops.length === 0 && filteredSmartphones.length === 0 && !loading && (
        <div className="no-products">
          <h3>No products found</h3>
          <p>
            {subcategoryParam 
              ? `No ${subcategoryParam} products available in this category.` 
              : "Please check back later or contact support if the issue persists."}
          </p>
          {subcategoryParam && (
            <a href={`/products?category=${categoryParam}`} className="clear-filter-btn">
              View all {categoryParam} products
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;