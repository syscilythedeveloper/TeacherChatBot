"use client";
import { auth, firestore } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDocs } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(auth.currentUser);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      console.log("user changed", user);
      if (user) {
        setIsLoggedIn(true);

        setUser(user);
      } else {
        setIsLoggedIn(false);
      }
      setIsLoading(false);
    });
    // Fetch items whenever refresh is toggled or user changes
  }, [user]); // Only depend on refresh and user

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn,
        isLoading,
        messages,
        setMessages,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
