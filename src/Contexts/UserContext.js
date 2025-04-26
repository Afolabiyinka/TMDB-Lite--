import { createContext, useContext, useState, useEffect } from "react";
const userContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState("");
  useEffect(() => {
    const storedUser = localStorage.getItem("TmdbUser");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);
  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
}

export function useUser() {
  const context = useContext(userContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
