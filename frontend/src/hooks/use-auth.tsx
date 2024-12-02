import AuthContext from "@/contexts/auth-context";
import React from "react";

// Custom hook to use the auth context
export const useAuth = () => {
  const context = React.useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
