import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  deleteDoc,
  getDocs,
  getFirestore,
  runTransaction,
} from "firebase/firestore";
import { getDoc, setDoc, doc, collection, addDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

async function userExists(uid) {
  try {
    const docRef = doc(firestore, "users", uid);
    const res = await getDoc(docRef);
    return res.exists();
  } catch (error) {
    console.log("Error checking if user exists", error);
    return false;
  }
}

async function createUser(user) {
  try {
    const isRegistered = await userExists(user.email);
    const response = {};
    if (isRegistered) {
      console.log("User already exists");
      response.status = "error";
      response.message = "User already exists";
      return response;
    }

    await registerNewUser({
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      uid: user.uid,
    });

    return { status: "success", message: "User created successfully" };
  } catch (error) {
    console.log("Error creating user", error);
    return { status: "error", message: "Error creating user" };
  }
}

async function registerNewUser(user) {
  try {
    const collectionRef = collection(firestore, "users");
    const docRef = doc(collectionRef, user.uid);
    await setDoc(docRef, user);
  } catch (error) {
    console.log("Error registering new user", error);
  }
}

async function newMessage(user_uid, message) {
  const response = {};
  try {
    const userRef = doc(firestore, "users", user_uid);
    const messageCollection = collection(userRef, "messages");
    const messageRef = doc(messageCollection, message.timestamp.toString());
    message.index = message.timestamp.toString();

    await runTransaction(firestore, async (transaction) => {
      transaction.set(messageRef, message);
    });

    console.log("Message added for user: ", user_uid);
    response.status = "success";
  } catch (error) {
    console.error("Error adding message: ", error);
    response.status = "error";
  } finally {
    return response;
  }
}

async function updateMessage(user_uid, message) {
  const response = {};
  try {
    console.log(
      "Updating message for user: ",
      user_uid,
      " with message: ",
      message
    );
    const userRef = doc(firestore, "users", user_uid);
    const messageCollection = collection(userRef, "messages");
    const messageRef = doc(messageCollection, message.index);

    await runTransaction(firestore, async (transaction) => {
      transaction.set(messageRef, message);
    });

    console.log("Message updated for user: ", user_uid);
    response.status = "success";
  } catch (error) {
    console.error("Error updating message: ", error);
    response.status = "error";
  } finally {
    return response;
  }
}

export { firestore, auth, storage, createUser, newMessage, updateMessage };
