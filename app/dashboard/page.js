"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const CustomerDashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      router.push("/authpage");
      return;
    }
    setUser(storedUser);

    // نمونه داده سفارش‌ها
    setOrders([
      { id: "1001", date: "2025-09-01", total: "$120", status: "Processing" },
      { id: "1002", date: "2025-09-03", total: "$250", status: "Shipped" },
      { id: "1003", date: "2025-09-05", total: "$80", status: "Delivered" }
    ]);
  }, []);

  if (!user) return <div style={{ padding: "2rem" }}>Loading...</div>;

  const cardStyle = {
    padding: "1.5rem",
    margin: "1rem 0",
    background: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
  };

  const buttonStyle = {
    padding: "0.5rem 1rem",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      {/* Navbar */}
      <nav style={{ marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>My Dashboard</h2>
     
      </nav>

      {/* User Info */}
      <div style={cardStyle}>
        <h3>Hello, {user.name}!</h3>
        <p><strong>Email:</strong> {user.email}</p>
        <button
          style={{ ...buttonStyle, background: "#0070f3", color: "white", marginTop: "1rem" }}
        >
          Edit Profile
        </button>
      </div>

      {/* Orders */}
      <div style={{ marginTop: "2rem" }}>
        <h3>Recent Orders</h3>
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1rem" }}>
          <thead>
            <tr>
              <th style={{ borderBottom: "1px solid #ddd", padding: "0.5rem" }}>Order ID</th>
              <th style={{ borderBottom: "1px solid #ddd", padding: "0.5rem" }}>Date</th>
              <th style={{ borderBottom: "1px solid #ddd", padding: "0.5rem" }}>Total</th>
              <th style={{ borderBottom: "1px solid #ddd", padding: "0.5rem" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td style={{ padding: "0.5rem" }}>{order.id}</td>
                <td style={{ padding: "0.5rem" }}>{order.date}</td>
                <td style={{ padding: "0.5rem" }}>{order.total}</td>
                <td style={{ padding: "0.5rem" }}>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Wishlist / Favorites */}
      <div style={{ marginTop: "2rem" }}>
        <h3>Wishlist</h3>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <div style={cardStyle}>Product A</div>
          <div style={cardStyle}>Product B</div>
          <div style={cardStyle}>Product C</div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
