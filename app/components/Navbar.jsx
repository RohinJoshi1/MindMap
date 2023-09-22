
import React, { useState, useEffect } from "react";
import Link from "next/link";
// import { UserAuth } from "../context/AuthContext";
import { EmailContext } from "../context/EmailContext";
import firebase from "firebase/app";
import app from "../firebase";

const Navbar = () => {
//   const { user, googleSignIn, logOut } = UserAuth();
  const [user,setUser] = useState("")
  const [loading, setLoading] = useState(true);

  const handleSignIn = async () => {
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

  const handleSignOut = () => {
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
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };
    checkAuthentication();
  }, [user]);

  return (
    <div className="h-20 w-full border-b-2 flex items-center justify-between p-2">
      <ul className="flex">
        <li className="p-2 cursor-pointer">
          <Link href="/">Home</Link>
        </li>
        <li className="p-2 cursor-pointer">
          <Link href="/about">About</Link>
        </li>

        {!user ? null : (
          <li className="p-2 cursor-pointer">
            <Link href="/profile">Profile</Link>
          </li>
        )}
      </ul>

      {loading ? null : !user ? (
        <ul className="flex">
          <li onClick={handleSignIn} className="p-2 cursor-pointer">
            Login
          </li>
          <li onClick={handleSignIn} className="p-2 cursor-pointer">
            Sign up
          </li>
        </ul>
      ) : (
        <div>
          <p>Welcome, {user.displayName}</p>
          <p className="cursor-pointer" onClick={handleSignOut}>
            Sign out
          </p>
        </div>
      )}
    </div>
  );
};

export default Navbar;