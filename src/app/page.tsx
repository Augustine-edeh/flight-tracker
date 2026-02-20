"use client";

import { useState } from "react";
import Header from "./components/Header";
import useAircraftStore from "./stores/aircraftStore"; // Import the Zustand store

import dynamic from "next/dynamic";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const MapView = dynamic(() => import("./components/MapView"), {
  ssr: false,
});

const HomePage = () => {
  const { error } = useAircraftStore();

  const [showError, setShowError] = useState(true);

  const shouldShowBanner = error && showError;

  return (
    <main className="flex flex-col h-dvh w-full">
      <div
        className={clsx(
          "top-0 left-0 right-0 z-[1000] px-4 py- 2 shadow-md transition-all duration-500 ease-in-out bg-red-500",
          shouldShowBanner
            ? "bg-blue- 500 text-white opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full pointer-events-none",
        )}
      >
        {shouldShowBanner && (
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium truncate">⚠️ {error}</p>
            <Button
              onClick={() => setShowError(false)}
              variant="ghost"
              className="text-white hover:bg-transparent font-bold cursor-pointer"
            >
              <X className="size-5" />
            </Button>
          </div>
        )}
      </div>

      <div className="relative flex-1 h-full w-full">
        <Header />
        <MapView />
      </div>
    </main>
  );
};

export default HomePage;
