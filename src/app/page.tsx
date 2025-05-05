"use client";

import Header from "./components/Header";
import MapView from "./components/MapView";

const HomePage = () => {
  return (
    <main className="h-dvh w-full">
      {/* <header className="text-white bg-black/70 text-center py-1.5 absolute right-0 left-0 z-50">
        <p>Flight Tracker App</p>
      </header> */}

      <Header />

      <MapView />
    </main>
  );
};

export default HomePage;
