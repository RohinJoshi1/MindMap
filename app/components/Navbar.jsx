import React, { useState, useEffect } from "react";
import Link from "next/link";
import { UserAuth } from "../context/AuthContext";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
  const { user, googleSignIn, logOut } = UserAuth();
  const [loading, setLoading] = useState(true);

  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };
    checkAuthentication();
  }, [user]);

  const navigation = [
    { name: "My Journal", href: "/", current: true },
    { name: "Recommendations", href: "/about", current: false },
    { name: "Profile", href: "/profile", current: false },
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <Disclosure as="nav" className="bg-[#040D12] shadow-slate-700 shadow-md">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-20">
              <div className="flex-shrink-0">
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                  alt="Your Company"
                />
              </div>

              <div className="hidden sm:block">
                <div className="flex space-x-4">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "rounded-md px-3 py-2 text-sm font-medium",
                        item.name === "Profile" && !user ? "cursor-not-allowed" : ""
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>

              <div className="sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              {/* Login and Sign-up buttons for desktop view */}
              <div className="hidden sm:block space-x-4">
                {user ? (
                  <div className="flex items-center space-x-2">
                    <p className="text-white text-sm">Welcome, {user.displayName}</p>
                    <button onClick={handleSignOut} className="text-gray-300 hover:text-white border border-white rounded px-3 py-1">
                      Sign out
                    </button>
                  </div>
                ) : (
                  <div className="flex space-x-4">
                    <button onClick={handleSignIn} className="text-gray-300 hover:text-white">
                      Login
                    </button>
                    <button onClick={handleSignIn} className="text-gray-300 hover:text-white">
                      Sign up
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium",
                    item.name === "Profile" && !user ? "cursor-not-allowed" : ""
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </a>
              ))}

              {/* Login and Sign-up buttons for mobile view */}
              {!user ? (
                <div className="mt-4">
                  <button onClick={handleSignIn} className="w-full block px-4 py-2 text-sm text-center text-gray-300 hover:bg-gray-700 hover:text-white">
                    Login
                  </button>
                  <button onClick={handleSignIn} className="w-full block px-4 py-2 text-sm text-center text-gray-300 hover:bg-gray-700 hover:text-white">
                    Sign up
                  </button>
                </div>
                ) : (
                    <button onClick={handleSignOut} className="w-full block px-4 py-2 text-sm text-center text-gray-300 hover:bg-gray-700 hover:text-white">
                      Sign out
                    </button>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
