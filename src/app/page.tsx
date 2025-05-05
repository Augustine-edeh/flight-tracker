"use client";

import Header from "./components/Header";

import dynamic from "next/dynamic";

const MapView = dynamic(() => import("./components/MapView"), {
  ssr: false,
});

const HomePage = () => {
  return (
    <main className="h-dvh w-full">
      <Header />

      <MapView />
    </main>
  );
};

export default HomePage;
