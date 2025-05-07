const MapLoadingOverlay = () => {
  return (
    <div
      className="loading-container absolute inset-0 z-[1000] bg-black/60 backdrop-blur-sm flex items-center justify-center text-white"
      aria-label="Loading aircraft data"
    >
      <div className="radar relative">
        <div className="sweep"></div>
      </div>

      <p
        className="ml-4 text- blue-600 text-lg font-semibold animate-pulse"
        aria-live="polite"
      >
        Loading aircraft data...
      </p>

      <style jsx>{`
        .radar {
          width: 100px;
          height: 100px;
          border: 2px solid #00ff00;
          border-radius: 50%;
          position: relative;
          overflow: hidden;
        }

        .sweep {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: conic-gradient(
            rgba(0, 255, 0, 0.3) 0deg,
            rgba(0, 255, 0, 0.05) 90deg,
            transparent 360deg
          );
          animation: rotate-sweep 2s linear infinite;
        }

        @keyframes rotate-sweep {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default MapLoadingOverlay;
