"use client";
import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";

interface User {
  email: string;
  name: string;
}

interface UserContextProps {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  isLoggedIn: boolean;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser) {
      setUserState(JSON.parse(storedUser));
    }

    setIsLoggedIn(!!token);
  }, []);

  const setUser = (user: User) => {
    setUserState(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const clearUser = () => {
    setUserState(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <UserContext.Provider value={{ user, setUser, clearUser, isLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
