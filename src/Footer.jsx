import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white rounded-lg shadow m-4">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="flex items-center justify-between">
          <a
            href="https://flowbite.com/"
            className="flex items-center mb-4 sm:mb-0"
          >
            <span className="self-center text-2xl font-semibold whitespace-nowrap">
              Shuffler
            </span>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500">
            <li>
              <a
                href="https://www.instagram.com/tanmayok/"
                className="mr-4 hover:underline md:mr-6"
              >
                Linkedin
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/tanmayok/"
                className="mr-4 hover:underline md:mr-6"
              >
                Instagram
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center">
          © Created by
          <a
            href="https://www.instagram.com/tanmayok/"
            className="hover:underline"
          >
            Tanmay Patil
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
