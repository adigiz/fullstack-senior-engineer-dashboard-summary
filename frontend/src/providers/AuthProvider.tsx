import AuthContext from "@/contexts/auth-context";
import api from "@/services/axios";
import { AuthContextType, User } from "@/types/auth-context";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

// Helper function to decode JWT
const decodeToken = (token: string): User | null => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    const payload = JSON.parse(window.atob(base64));
    return {
      id: payload.sub,
      username: payload.username,
      email: payload.email,
      role: payload.role,
    };
  } catch (error) {
    console.error("Error decoding token", error);
    return null;
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  // Interceptor to add token to requests
  useEffect(() => {
    const interceptor = api.interceptors.request.use(
      (config) => {
        const storedToken = localStorage.getItem("jwt_token");
        if (storedToken) {
          config.headers["Authorization"] = `Bearer ${storedToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Cleanup interceptor
    return () => {
      api.interceptors.request.eject(interceptor);
    };
  }, []);

  // Check for existing token on initial load
  useEffect(() => {
    const storedToken = localStorage.getItem("jwt_token");
    if (storedToken) {
      login(storedToken);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // Login function
  const login = (receivedToken: string) => {
    // Decode and validate token
    const decodedUser = decodeToken(receivedToken);

    if (decodedUser) {
      setUser(decodedUser);
      setToken(receivedToken);
      setIsLoggedIn(true);

      // Persist token in localStorage
      localStorage.setItem("jwt_token", receivedToken);
    } else {
      // Invalid token
      logout();
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setToken(null);
    setIsLoggedIn(false);
    toast.success("Logout success");

    // Remove token from localStorage
    localStorage.removeItem("jwt_token");
  };

  // Context value
  const contextValue: AuthContextType = {
    user,
    token,
    isLoggedIn,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
