"use client";

import { createContext, useContext, useState } from "react";

type User = {
  name: string;
  email: string;
  password: string;
  liked: {
    [key: number]: boolean;
  };
};

interface AuthContextType {
  user: User | null;
  error: string | null;
  setUser: (user: User | null) => void;
  setError: (error: string | null) => void;
  toggleLike: (id: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>({
    email: "test@test.com",
    password: "123",
    name: "test",
    liked: {},
  });
  const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   const initialUser = getUser();

  //   if (initialUser) setUser(initialUser);
  // }, []);

  const toggleLike = (id: number) => {
    if (user) {
      const oldLiked = { ...user.liked };
      oldLiked[id] = !oldLiked[id];
      setUser({ ...user, liked: oldLiked });
    }
  };

  return (
    <AuthContext.Provider
      value={{ error, user, setError, setUser, toggleLike }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("");
  }
  return context;
};
