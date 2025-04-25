import { createContext, useContext, useState } from "react";
const userContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState("");
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
