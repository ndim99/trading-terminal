import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 2xl:py-6 lg:py-5 py-4 2xl:px-5 lg:px-4 px-3 border-t border-gray-300 dark:border-gray-600">
      <div className="container mx-auto text-center">
        <p className="text-lg font-semibold text-black dark:text-white mb-2">
          Crypto Dashboard
        </p>
        <p className="mb-4">
          Built by Nikola, a front-end engineer specializing in React, Next.js,
          TypeScript, and web3 technologies. Skilled in crafting
          high-performance, optimized user interfaces with a focus on responsive
          design, accessibility, and seamless user experiences. Passionate about
          building scalable, maintainable code and enhancing performance through
          best practices in front-end development.
        </p>
        <div className="flex justify-center space-x-6">
          <a
            href="https://github.com/ndim99"
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/ndim19/"
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            LinkedIn
          </a>
          <a href="mailto:nikola.dimovski666@gmail.com" className="link">
            Contact
          </a>
        </div>
        <p className="text-sm mt-4 text-gray-500">
          &copy; {new Date().getFullYear()} Nikola. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
