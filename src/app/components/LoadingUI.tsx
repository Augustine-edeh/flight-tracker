"use client";

const LoadingUI = () => {
  return (
    <div className="loading-container">
      <div className="radar">
        <div className="blip"></div>
      </div>
      <span className="ml-4">Loading Aircraft Data...</span>

      <style jsx>{`
        .loading-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          width: 100%;
          position: absolute;
          top: 0;
          left: 0;
          background-color: rgba(255, 255, 255, 0.7);
        }

        .radar {
          width: 100px;
          height: 100px;
          border: 2px solid #ccc;
          border-radius: 50%;
          position: relative;
          animation: radar-pulse 1.5s infinite ease-out;
        }

        .blip {
          position: absolute;
          top: 10%;
          left: 50%;
          width: 10px;
          height: 10px;
          background-color: #00ff00;
          border-radius: 50%;
          animation: move-blip 2s infinite linear;
        }

        @keyframes radar-pulse {
          0% {
            transform: scale(0.8);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.8;
          }
          100% {
            transform: scale(0.8);
            opacity: 0.5;
          }
        }

        @keyframes move-blip {
          0% {
            transform: translateX(-50px);
          }
          100% {
            transform: translateX(50px);
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingUI;
