import React from "react";

export default function Header() {
  return (
    <header className="bg-gray-200 dark:bg-gray-800 text-black dark:text-white shadow-md lg:py-3 py-2.5 2xl:px-5 lg:px-4 px-3 flex items-center justify-between border-b border-gray-300 dark:border-gray-600">
      <p className="fontSizeFrom2xl font-bold text-primary-colors">
        Simple Trading Terminal
      </p>
    </header>
  );
}
