"use client";

import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showSearch && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showSearch]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setShowSearch(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle form submit (Enter key)
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // ✨ Replace this with your actual filter/search logic
      console.log("Search submitted:", searchTerm);
    }
  };

  return (
    <header className="absolute top-0 left-0 right-0 bg-[#273e56] text-white py-2 z-50 px-4 flex justify-between items-center">
      <h1 className="text-2xl font-semibold text-center flex-1">
        Flight Tracker
      </h1>

      <div className="flex items-center space-x-2 relative" ref={containerRef}>
        <form
          onSubmit={handleSearchSubmit}
          className={`transition-all duration-300 ease-in-out flex items-center overflow-hidden ${
            showSearch ? "w-48 opacity-100 mr-2" : "w-0 opacity-0"
          }`}
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-white text-black px-3 py-1 rounded-md w-full text-sm outline-1 outline-green-400"
          />

          {/* ✕ Clear Icon */}
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm("")}
              className="absolute right-3 text-gray-500 hover:text-black"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </form>

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
