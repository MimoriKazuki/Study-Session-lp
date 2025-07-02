"use client";

import { useEffect, useState } from "react";

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [remainingSlots, setRemainingSlots] = useState(33);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // シミュレート：残り枠を減らす
    const interval = setInterval(() => {
      setRemainingSlots((prev) => Math.max(prev - 1, 7));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const scrollToApplication = () => {
    const element = document.getElementById('application');
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div
      className={`fixed bottom-8 right-8 z-50 transition-all duration-500 ${
        isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
    >
      <button
        onClick={scrollToApplication}
        className="relative group"
      >
        {/* 残り枠表示 */}
        <div className="absolute -top-8 -left-2 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse whitespace-nowrap">
          <span>残り{remainingSlots}名！</span>
        </div>
        
        {/* ボタン本体 */}
        <div className="relative bg-gradient-to-r from-cyan-600 to-purple-600 p-6 rounded-full shadow-2xl transform transition-all hover:scale-110 hover:rotate-3 hover:shadow-cyan-500/50">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-full blur-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative flex flex-col items-center">
            <span className="text-white font-black text-lg drop-shadow-lg">今すぐ</span>
            <span className="text-white font-black text-xl drop-shadow-lg">申込む</span>
          </div>
        </div>
        
        {/* キラキラエフェクト */}
        <div className="absolute -inset-2">
          <div className="absolute top-0 left-0 w-3 h-3 bg-white rounded-full animate-ping"></div>
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-yellow-400 rounded-full animate-ping" style={{ animationDelay: "0.5s" }}></div>
          <div className="absolute top-1/2 right-0 w-3 h-3 bg-cyan-400 rounded-full animate-ping" style={{ animationDelay: "1s" }}></div>
        </div>
        
        {/* ホバー時の光沢効果 */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
      </button>
    </div>
  );
}