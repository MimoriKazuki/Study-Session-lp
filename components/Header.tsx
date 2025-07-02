"use client";

import { useState, useEffect } from "react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-gray-900/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl md:text-3xl">🎮</span>
            <div>
              <h1 className="text-lg md:text-xl font-bold text-white">AI×ゲーム制作教室</h1>
              <p className="text-xs text-gray-300">夏休み特別企画</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => scrollToSection("target")}
              className="text-white hover:text-yellow-400 transition-colors"
            >
              対象者
            </button>
            <button
              onClick={() => scrollToSection("learn")}
              className="text-white hover:text-yellow-400 transition-colors"
            >
              学べること
            </button>
            <button
              onClick={() => scrollToSection("games")}
              className="text-white hover:text-yellow-400 transition-colors"
            >
              作れるゲーム
            </button>
            <button
              onClick={() => scrollToSection("schedule")}
              className="text-white hover:text-yellow-400 transition-colors"
            >
              スケジュール
            </button>
            <button
              onClick={() => scrollToSection("overview")}
              className="text-white hover:text-yellow-400 transition-colors"
            >
              開催概要
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="text-white hover:text-yellow-400 transition-colors"
            >
              FAQ
            </button>
            <button
              onClick={() => scrollToSection("application")}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-6 py-2 rounded-full hover:scale-105 transition-transform"
            >
              申し込む
            </button>
          </nav>

          {/* モバイルメニューボタン */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* モバイルメニュー */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-gray-900/95 backdrop-blur-md rounded-lg mt-2 p-4 space-y-3">
            <button
              onClick={() => scrollToSection("target")}
              className="block w-full text-left text-white hover:text-yellow-400 transition-colors py-2"
            >
              対象者
            </button>
            <button
              onClick={() => scrollToSection("learn")}
              className="block w-full text-left text-white hover:text-yellow-400 transition-colors py-2"
            >
              学べること
            </button>
            <button
              onClick={() => scrollToSection("games")}
              className="block w-full text-left text-white hover:text-yellow-400 transition-colors py-2"
            >
              作れるゲーム
            </button>
            <button
              onClick={() => scrollToSection("schedule")}
              className="block w-full text-left text-white hover:text-yellow-400 transition-colors py-2"
            >
              スケジュール
            </button>
            <button
              onClick={() => scrollToSection("overview")}
              className="block w-full text-left text-white hover:text-yellow-400 transition-colors py-2"
            >
              開催概要
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="block w-full text-left text-white hover:text-yellow-400 transition-colors py-2"
            >
              FAQ
            </button>
            <button
              onClick={() => scrollToSection("application")}
              className="block w-full text-center bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-6 py-3 rounded-full hover:scale-105 transition-transform mt-4"
            >
              申し込む
            </button>
          </div>
        )}
      </div>
    </header>
  );
}