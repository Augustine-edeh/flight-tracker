"use client";

import { useState } from "react";
import Header from "./components/Header";
import useAircraftStore from "./stores/aircraftStore"; // Import the Zustand store

import dynamic from "next/dynamic";

const MapView = dynamic(() => import("./components/MapView"), {
  ssr: false,
});

const HomePage = () => {
  const [showError, setShowError] = useState(true);

  const { error } = useAircraftStore();

  return (
    <main className="flex flex-col h-dvh w-full">
      <div className="absolut e flex justify-between top-0 left-0 right-0 z-[1000] bg-red-500 text-white px-4 py -2 shadow-md">
        {error && showError && (
          <>
            <p className="text-sm font-medium truncate">⚠️ {error}</p>
            <button
              onClick={() => setShowError(false)}
              className="text-white font-bold cursor-pointer"
            >
              ✕
            </button>
          </>
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
