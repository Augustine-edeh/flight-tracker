"use client";

import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showSearch && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showSearch]);

  return (
    <header className="absolute top-0 left-0 right-0 bg-[#273e56] text-white py-2 z-50 px-4 flex justify-between items-center">
      <h1 className="text-2xl font-semibold text-center flex-1">
        Flight Tracker
      </h1>

      <div className="flex items-center space-x-2 relative">
        <div
          className={`transition-all duration-300 ease-in-out flex items-center overflow -hidden ${
            showSearch ? "w-48 opacity-100 mr-2" : "w-0 opacity-0"
          }`}
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Search..."
            className="bg-white text-black px-3 py-1 rounded-md w-full text-sm outline-1 outline-green-400"
          />
        </div>

        <button
          onClick={() => setShowSearch((prev) => !prev)}
          className="text-white hover:text-gray-300 transition cursor-pointer"
        >
          <Search className="size-5" />
        </button>
      </div>
    </header>
  );
};

export default Header;
