import React, { useState } from 'react';

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Burger button */}
      <button
        onClick={toggleMenu}
        className="z-10 relative text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
      >
        <span className="sr-only">Open menu</span>
        <svg
          className="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Menu items */}
      {isOpen && (
        <div className="fixed inset-x-0 top-14 mt-7 shadow-lg bg-white text-black focus:outline-none">
          <div className="py-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            
           <a 
              href="#"
              className="block px-4 py-2 text-sm hover:bg-gray-800 press-start-2p-regular"
              role="menuitem"
            >
              Dashboard
            </a>
            
           <a 
              href="#"
              className="block px-4 py-2 text-sm hover:bg-gray-800 press-start-2p-regular"
              role="menuitem"
            >
              Airdrop
            </a>
            
           <a 
              href="#"
              className="block px-4 py-2 text-sm hover:bg-gray-800 press-start-2p-regular"
              role="menuitem"
            >
              Transfer
            </a>
           <a 
              href="#"
              className="block px-4 py-2 text-sm hover:bg-gray-800 press-start-2p-regular"
              role="menuitem"
            >
              Merchant
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default BurgerMenu;