import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  function onLogin(user) {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  }

  function onLogout() {
    localStorage.removeItem("user");
    setUser(null);
  }

  function isAdmin() {
    return user && user.role === "admin";
  }


  const value = {
    user,
    onLogin,
    onLogout,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  return useContext(AuthContext);
}
