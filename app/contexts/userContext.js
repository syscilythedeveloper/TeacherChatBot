"use client";
import { auth, firestore } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDocs } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext();

async function fetchMessages(user) {
  const messages = [];
  const userRef = doc(firestore, "users", user.uid);
  const messageCollection = collection(userRef, "messages");
  const messagesSnapshot = await getDocs(messageCollection);

  console.log("messages snapshot", messagesSnapshot);

  messagesSnapshot.forEach((doc) => {
    messages.push(doc.data());
  });

  return messages;
}

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

        fetchMessages(user).then((messages) => {
          console.log("messages fetched", messages);
          setMessages(messages);
        });

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
