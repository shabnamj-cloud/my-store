// app/search/page.js
"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query) {
      setLoading(true);
      // فرستادن query به صورت key=value به API
      fetch(`/api/products?search=${encodeURIComponent(query)}`)
        .then((res) => res.json())
        .then((data) => {
          setResults(data);
          console.log("Fetched products:", data); // برای بررسی لینک‌ها و داده‌ها
        })
        .finally(() => setLoading(false));
    } else {
      // اگر query خالی بود، لیست نتایج خالی شود
      setResults([]);
    }
  }, [query]);

  return (
    <div className="container py-4">
      <h2 className="mb-4">
        Search results for: <span className="text-primary">"{query}"</span>
      </h2>

      {loading ? (
        <p>Loading...</p>
      ) : results.length > 0 ? (
        <div className="row g-4">
          {results.map((p) => (
            <div key={p._id} className="col-md-4 col-lg-3">
              <div className="card h-100 shadow-sm">
                {/* Product Image */}
                <Link href={`/products/${p._id?.$oid || p._id}`}>
                  <div
                    className="position-relative"
                    style={{ height: "200px", overflow: "hidden" }}
                  >
                    {p.image && (
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    )}
                  </div>
                </Link>

                {/* Product Info */}
                <div className="card-body d-flex flex-column">
                  <h6 className="card-title fw-bold">{p.name}</h6>
                  <p className="card-text text-muted mb-1">{p.brand}</p>
                  <p className="fw-bold text-success">
                    {p.price
                      ? `$${p.price.toLocaleString()}`
                      : "Price not available"}
                  </p>
                  <Link
                    href={`/products/${p._id?.$oid || p._id}`}
                    className="btn btn-primary mt-auto"
                  >
                    View Details
                  </Link>
                  {/* نمایش لینک واقعی برای بررسی */}
                  <p className="text-muted mt-2">{`/products/${p._id}`}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted mt-3">No products found.</p>
      )}
    </div>
  );
}
