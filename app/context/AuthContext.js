// // import { useContext, createContext, useState, useEffect } from "react";
// // import {
// //   signInWithPopup,
// //   signOut,
// //   onAuthStateChanged,
// //   GoogleAuthProvider,
// // } from "firebase/auth";
// // import { app } from "../firebase";

// // const AuthContext = createContext();
// // const auth = app.getAuth()
// // export const AuthContextProvider = ({ children }) => {
// //   const [user, setUser] = useState(null);

// //   const googleSignIn = () => {
// //     var provider = new firebase.auth.GoogleAuthProvider();
// //     firebase.auth()
// //   .signInWithPopup(provider)
// //   }

// //   const logOut = () => {
// //     firebase.auth.signOut()
// //   };

// //   useEffect(() => {
// //     const unsubscribe = app.auth().onAuthStateChanged(auth, (currentUser) => {
// //       setUser(currentUser);
// //     });
// //     return () => unsubscribe();
// //   }, [user]);

// //   return (
// //     <AuthContext.Provider value={{ user, googleSignIn, logOut }}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };

import React, { useContext, createContext, useState, useEffect } from 'react';
import { EmailContext } from "../context/EmailContext";
import firebase from "firebase/app";
import app from "../firebase";
// Create Auth Context
export const AuthContext = createContext();

// Create Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user,setUser] = useState(null)
  const [loading, setLoading] = useState(true);

  // Function to handle Google Sign-In
  const signIn = async () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope("profile");
    provider.addScope("email");
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        // This gives you a Google Access Token.
        var token = result.credential.accessToken;
        // The signed-in user info.
        setUser(result.user);
        // set session storage here
        sessionStorage.setItem("email", user.email);
        sessionStorage.setItem("name", user.displayName);
      });
};
  // Function to handle Sign-Out
  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Redirect to home page
        console.log("SignOut")
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    // Clean up subscription
    return () => unsubscribe();
  }, []);

  // Render Auth Provider with Auth Context value
  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};