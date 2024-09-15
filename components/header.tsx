"use client";
import { CONSTANTS } from "@/text/landing";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Header({ user }: any) {
  const path = usePathname();
  const route = useRouter();

  return (
    <header className="text-sm px-4 lg:px-6 h-14 flex items-center">
      <Link
        href="#"
        className={`hover:font-semibold cursor-pointer hover:text-primary hover:-translate-y-1 hover:scale-125 hover:duration-300 transition-all ease-in-out ${
          path == "/" && "text-primary font-bold"
        }`}
        prefetch={false}
      >
        <BookOpenIcon className="h-6 w-6" />
        <span className="sr-only">{CONSTANTS.HEADER_TITLE}</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link
          href="/"
          className={`hover:font-semibold cursor-pointer hover:text-primary hover:-translate-y-1 hover:scale-125 hover:duration-300 transition-all ease-in-out ${
            path == "/" && "text-primary font-bold"
          }`}
          prefetch={false}
        >
          Main
        </Link>
        <Link
          href="/group"
          className={`hover:font-semibold cursor-pointer hover:text-primary hover:-translate-y-1 hover:scale-125 hover:duration-300 transition-all ease-in-out ${
            path == "/group" && "text-primary font-bold"
          }`}
          prefetch={false}
        >
          Group
        </Link>
        {/* <Link
          href="#"
          className={`hover:font-semibold cursor-pointer hover:text-primary hover:-translate-y-1 hover:scale-125 hover:duration-300 transition-all ease-in-out ${
            path == "/aboutus" && "text-primary font-bold"
          }`}
          prefetch={false}
        >
          {CONSTANTS.ABOUT_US}
        </Link> */}
        {!user && (
          <button className="text-sm font-medium hover:underline underline-offset-4">
            <a href="/api/auth/login">{CONSTANTS.LOGIN}</a>
          </button>
        )}
        {user && (
            <button className="text-sm font-medium hover:underline underline-offset-4">
              <a href="/api/auth/logout">{CONSTANTS.LOGOUT}</a>
            </button>
        )}
      </nav>
    </header>
  );
}

// function HamburgerIcon(props: any) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       fill="none"
//       viewBox="0 0 24 24"
//       strokeWidth="1.5"
//       stroke="currentColor"
//       className="w-6 h-6"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         d="M3.75 5.25h16.5m-16.5 6.75h16.5m-16.5 6.75h16.5"
//       />
//     </svg>
//   );
// }

function BookOpenIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}