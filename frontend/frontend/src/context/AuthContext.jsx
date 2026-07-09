import React, { createContext, useState, useEffect } from "react";
import { login as apiLogin, signup as apiSignup } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(true);

  // Initialize auth state
  useEffect(() => {
    // If we have a token, we could optionally fetch user details from a /me endpoint here.
    // For now, we rely on the token and stored user details.
    setLoading(false);
  }, []);

  // Listen for 401 Unauthorized events from the API interceptor
  useEffect(() => {
    const handleUnauthorized = () => {
      logout();
    };
    window.addEventListener("auth:unauthorized", handleUnauthorized);
    return () => window.removeEventListener("auth:unauthorized", handleUnauthorized);
  }, []);

  const login = async (email, password) => {
    try {
      const data = await apiLogin(email, password);
      setToken(data.access_token);
      localStorage.setItem("token", data.access_token);
      
      // The backend login returns the token. 
      // We might not have the user object directly from login based on standard OAuth2.
      // If we don't have a /me endpoint, we can store a generic user object or decode the JWT.
      const userData = { email }; // simplistic placeholder
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.detail || "Login failed. Please check your credentials." 
      };
    }
  };

  const signup = async (username, email, password) => {
    try {
      await apiSignup(username, email, password);
      // Auto-login after successful signup
      return await login(email, password);
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.detail || "Signup failed." 
      };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const value = {
    token,
    user,
    isAuthenticated: !!token,
    login,
    signup,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
