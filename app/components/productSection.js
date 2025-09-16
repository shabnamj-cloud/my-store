// ProductSection.js (نسخه ساده شده)
"use client";
import { useState } from 'react';
import ProductCard from './productCard';
import Pagination from './pagination';
import '../../css/ProductSection.css';

const ProductSection = ({ 
  title, 
  products, 
  itemsPerPage = 6 // مقدار ثابت برای تعداد محصولات در هر صفحه
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  // محاسبه محصولات صفحه جاری
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // تغییر صفحه
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="product-section">
      <div className="section-header">
        <h2>{title}</h2>
        <span className="product-count">({products.length} products)</span>
      </div>

      <div className="products-grid">
        {currentProducts.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {products.length > itemsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          paginate={paginate}
          itemsPerPage={itemsPerPage}
          totalItems={products.length}
        />
      )}
    </section>
  );
};

export default ProductSection;