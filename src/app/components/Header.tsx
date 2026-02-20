"use client";

import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);

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
        setShowSearchResults(false);
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
      // alert(`Search submitted: ${searchTerm}`);
      setShowSearchResults(true); // Show results (for demonstration)
    }
  };

  return (
    <header className="absolute top-0 left-0 right-0 bg-[#273e56] text-white py-2 z-50 px-4 flex justify-between items-center">
      <h1 className="text-2xl font-semibold text-center flex-1">
        Flight Tracker
      </h1>

      <div className="relative" ref={containerRef}>
        <div className="flex items-center space-x-2">
          <form
            onSubmit={handleSearchSubmit}
            className={clsx(
              "transition-all duration-300 ease-in-out flex items-center overflow-hidden",
              showSearch ? "w-48 opacity-100 mr-2" : "w-0 opacity-0",
            )}
          >
            <Input
              ref={inputRef}
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white text-black px-3 py-1 rounded-md w-full text-sm outline-1 outline-green-400"
            />
          </form>

          <Button
            variant="ghost"
            onClick={() => {
              setShowSearch((prev) => !prev);
              setShowSearchResults(false); // Hide results when toggling search
              // setSearchTerm(""); // clear input on close
            }}
            className="text-white hover:text-gray-300 hover:bg-transparent transition cursor-pointer"
          >
            {showSearch ? (
              <X className="size-5" />
            ) : (
              <Search className="size-5" />
            )}
          </Button>
        </div>

        {showSearchResults && (
          <div className="absolute flex flex-col gap-3 w-full mt-3 p-2 min-h-40 rounded-lg bg-slate-600 shadow-lg">
            <h3 className="text-center">Results</h3>

            <div className="flex-1 flex">
              {true ? ( // Replace with actual loading state
                <p className="flex justify-center items-center gap-2 w-full">
                  <Spinner />
                  Loading...
                </p>
              ) : (
                <ul className="space-y-2 w-full text-black">
                  <li className="p-2 bg-gray-200">Result 1</li>
                  <li className="p-2 bg-gray-200">Result 2</li>
                  <li className="p-2 bg-gray-200">Result 3</li>
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
