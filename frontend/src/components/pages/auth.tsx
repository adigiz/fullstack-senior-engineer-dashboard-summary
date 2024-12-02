import { Navigate } from "react-router-dom";
import LoginPage from "./login-page";
import { useAuth } from "@/hooks/use-auth";

const AuthPage = () => {
  const auth = useAuth();

  console.log("exec");

  return auth.isLoggedIn ? <Navigate to="/dashboard" replace /> : <LoginPage />;
};

export default AuthPage;
