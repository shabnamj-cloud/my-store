"use client";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "../context/UserContext"; // حتما ایمپورت کن
import "../../css/authpages.css";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgot, setIsForgot] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const { setUser } = useContext(UserContext); // 👈 گرفتن context

  const toggleForm = () => {
    setIsLogin((prev) => !prev);
    setIsForgot(false);
    setMessage("");
  };

  const toggleForgot = () => {
    setIsForgot(true);
    setIsLogin(false);
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let endpoint = "";
    let payload = {};

    if (isForgot) {
      endpoint = "/api/auth/forgot";
      payload = { email };
    } else if (isLogin) {
      endpoint = "/api/auth/login";
      payload = { email, password };
    } else {
      endpoint = "/api/auth/signup";
      payload = { name, email, password };
    }

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");

      setMessage(data.message);

      if (!isForgot) {
        // ذخیره در localStorage
        localStorage.setItem("user", JSON.stringify(data.user));

        // 👇 اینجا کانتکست رو هم آپدیت کن
        setUser(data.user);

        setTimeout(() => {
          router.push("/dashboard");
        }, 500);
      }
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>{isForgot ? "Forgot Password" : isLogin ? "Login" : "Sign Up"}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && !isForgot && (
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
              />
            </div>
          )}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          {!isForgot && (
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
          )}
          <button type="submit" className="btn-submit">
            {isForgot ? "Reset Password" : isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        {message && <p className="form-message">{message}</p>}
        <p className="switch-form">
          {isForgot ? (
            <span onClick={() => setIsForgot(false)} className="link">
              Back to Login
            </span>
          ) : (
            <>
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <span onClick={toggleForm} className="link">
                {isLogin ? "Sign Up" : "Login"}
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
