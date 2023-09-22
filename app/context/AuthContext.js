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

// import React, { createContext, useState, useEffect } from 'react';
// import firebase from 'firebase/app';
// import 'firebase/auth';
// import app from "../firebase"

// // Create Auth Context
// export const AuthContext = createContext();

// // Create Auth Provider Component
// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Function to handle Google Sign-In
//   const signInWithGoogle = () => {
//     const provider = new firebase.auth.GoogleAuthProvider();
//     firebase.auth().signInWithPopup(provider);
//   };

//   // Function to handle Sign-Out
//   const signOut = () => {
//     firebase.auth().signOut();
//   };

//   useEffect(() => {
//     // Listen for authentication state changes
//     const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
//       setCurrentUser(user);
//       setLoading(false);
//     });

//     // Clean up subscription
//     return () => unsubscribe();
//   }, []);

//   // Render Auth Provider with Auth Context value
//   return (
//     <AuthContext.Provider
//       value={{
//         currentUser,
//         loading,
//         signInWithGoogle,
//         signOut,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const UserAuth = () => {
//   return useContext(AuthContext);
// };