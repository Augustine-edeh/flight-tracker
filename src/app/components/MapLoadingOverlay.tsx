const MapLoadingOverlay = () => {
  return (
    <div
      className="loading-container absolute inset-0 z-[1000] bg-black/60 backdrop-blur-sm flex items-center justify-center text-white"
      aria-label="Loading aircraft data"
    >
      <div className="radar relative">
        <div className="sweep"></div>
        <div className="blip blip-one size-2"></div>
        <div className="blip blip-two size-1.5"></div>
        <div className="blip blip-three size-1"></div>
      </div>

      <p
        className="ml-4 text-blue-600 text-lg font-semibold animate-pulse"
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

        .blip {
          position: absolute;
          background-color: #00ff00;
          border-radius: 50%;
          box-shadow: 0 0 6px 2px #00ff00;
          animation: blip-pulse 1.5s infinite;
        }

        .blip-one {
          top: 30%;
          left: 40%;
          animation-delay: 0s;
        }

        .blip-two {
          top: 60%;
          left: 55%;
          animation-delay: 0.75s;
        }
        .blip-three {
          top: 15%;
          left: 75%;
          animation-delay: 1.2s;
        }

        @keyframes rotate-sweep {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes blip-pulse {
          0% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.3;
            transform: scale(1.6);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default MapLoadingOverlay;
