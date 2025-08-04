"use client";

import { createContext, useContext, useEffect, useState } from "react";

type User = {
  name: string;
  email: string;
  liked: {
    [key: number]: boolean;
  };
};

interface AuthContextType {
  user: User | null;
  error: string | undefined;
  setUser: (user: User | null) => void;
  setError: (error: string | undefined) => void;
  toggleLike: (id: number) => void;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  pending: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const getUser = () => {
  const user = JSON.parse(localStorage?.getItem("user") ?? "null");
  return user;
};

const saveUser = (user: User | null) => {
  localStorage.setItem("user", JSON.stringify(user));
};

const getUserFromDb = (email: string) => {
  const user = JSON.parse(localStorage?.getItem(email) ?? "null");
  return user ?? { email, name: "John Doe", liked: {} };
};

const saveUserInDb = (user: User) => {
  localStorage.setItem(user.email, JSON.stringify(user));
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [pending, setPending] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const initialUser = getUser();
    if (initialUser) setUser(initialUser);
  }, []);

  useEffect(() => {
    saveUser(user);
  }, [user]);

  const toggleLike = (id: number) => {
    if (user) {
      const oldLiked = { ...user.liked };
      oldLiked[id] = !oldLiked[id];
      setUser({ ...user, liked: oldLiked });
    }
  };

  const signIn = async (email: string, password: string) => {
    setPending(true);
    setError(undefined);
    await new Promise((res) => setTimeout(res, 500));
    const user = getUserFromDb(email);
    if (password === "12345678") {
      setUser(user);
    } else {
      setError("Wrong password");
    }
    setPending(false);
  };

  const signOut = async () => {
    setPending(true);
    await new Promise((res) => setTimeout(res, 500));
    if (user) {
      saveUserInDb(user);
      setUser(null);
    }
    setPending(false);
  };

  return (
    <AuthContext.Provider
      value={{
        error,
        user,
        setError,
        setUser,
        toggleLike,
        signIn,
        pending,
        signOut,
      }}
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
