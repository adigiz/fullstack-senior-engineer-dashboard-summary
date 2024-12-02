import { AuthContextType } from "@/types/auth-context";
import { createContext } from "react";

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export default AuthContext;
