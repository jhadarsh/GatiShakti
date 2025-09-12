import { useState, useRef, useEffect } from "react";

const headlines = [
  "AI-Powered Traffic Monitoring 2025: Real-time vehicle detection and speed analysis now active across major highways - enhanced road safety through intelligent surveillance systems.",
  "Smart Traffic Management Alert: New IoT-based traffic flow optimization and congestion prediction systems deployed - reducing travel time by up to 30% with adaptive signal control."
];

export default function NoticeBar() {
  const [isPlaying, setIsPlaying] = useState(true);
  const tickerRef = useRef(null);
  const scrollPos = useRef(0);
  const requestId = useRef(null);
  const speed = 1;

  useEffect(() => {
    const ticker = tickerRef.current;

    const step = () => {
      if (!ticker || !isPlaying) return;

      scrollPos.current += speed;
      if (scrollPos.current >= ticker.scrollWidth / 2) {
        scrollPos.current = 0;
      }
      ticker.style.transform = `translateX(-${scrollPos.current}px)`;
      requestId.current = requestAnimationFrame(step);
    };

    if (isPlaying) {
      requestId.current = requestAnimationFrame(step);
    } else if (requestId.current) {
      cancelAnimationFrame(requestId.current);
    }

    return () => cancelAnimationFrame(requestId.current);
  }, [isPlaying]);

  const togglePlay = () => setIsPlaying(p => !p);

  return (
    <section
      className="relative h-12 w-full flex items-center overflow-hidden 
                 bg-gradient-to-r from-[#4E4B92] via-[#5A57A8] to-indigo-700 shadow-lg"
      style={{
        fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif"
      }}
    >
      {/* Animated background overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.1) 50%, transparent 50%, transparent 75%, rgba(255,255,255,0.1) 75%)',
          backgroundSize: '20px 20px',
          animation: 'shimmer 4s linear infinite'
        }}
      />
      
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-20px); }
          100% { transform: translateX(20px); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.4); }
          50% { box-shadow: 0 0 30px rgba(139, 92, 246, 0.7); }
        }
      `}</style>
      
      {/* Disclaimer Label */}
      <div
        className="relative z-10 bg-gradient-to-br from-[#4E4B92] via-indigo-700 to-[#2F2B70] text-white font-bold h-full min-w-40 flex items-center justify-center text-sm tracking-wide uppercase"
        style={{
          clipPath: "polygon(0 0, 85% 0, 100% 50%, 85% 100%, 0 100%)",
          textShadow: "0 2px 4px rgba(0,0,0,0.3)",
          userSelect: "none"
        }}
      >
        <div className="flex items-center gap-2">
          <span className="text-yellow-300 text-lg">⚠️</span>
          Notice
        </div>
      </div>
      
      {/* Ticker Container */}
      <div className="relative z-10 flex-1 overflow-hidden h-full flex items-center">
        {/* Gradient fade edges */}
        <div className="absolute left-0 top-0 w-8 h-full bg-gradient-to-r from-[#4E4B92] to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 w-8 h-full bg-gradient-to-l from-indigo-700 to-transparent z-20 pointer-events-none" />
        
        <ul
          ref={tickerRef}
          className="inline-flex p-0 m-0 list-none"
          style={{
            minWidth: "200%",
            userSelect: "none",
            willChange: "transform"
          }}
        >
          {[...headlines ].map((headline ) => (
            <li
            
              className="px-12 text-white font-medium text-base cursor-default flex items-center"
              style={{
                textShadow: "0 2px 6px rgba(0,0,0,0.4)"
              }}
            >
             
              {headline}
            </li>
          ))}
        </ul>
      </div>
      
      {/* Control Button */}
      <div className="relative z-10 h-full flex items-center mr-4">
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause ticker" : "Play ticker"}
          className="group relative bg-white/90 backdrop-blur-sm text-purple-600 hover:text-purple-700 transition-all duration-300 border-0 rounded-lg px-4 py-2 cursor-pointer font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
          style={{
            userSelect: "none",
            animation: isPlaying ? 'pulse-glow 2s infinite' : 'none'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(255,255,255,1)';
            e.currentTarget.style.transform = 'scale(1.1) translateY(-1px)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.9)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <div className="flex items-center justify-center w-6 h-6">
            {isPlaying ? (
              <span className="text-red-500">⏸️</span>
            ) : (
              <span className="text-green-500">▶️</span>
            )}
          </div>
          
          {/* Tooltip */}
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
            {isPlaying ? "Pause" : "Play"}
          </div>
        </button>
      </div>
      
      {/* Updated decorative borders with your color scheme */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#726279] via-[#3934A0] to-[#13B683]" />
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#13B683] via-[#3934A0] to-[#726279]" />
    </section>
  );
}
