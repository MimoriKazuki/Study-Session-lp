"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Hero() {
  const [isClient, setIsClient] = useState(false);
  const [countdown, setCountdown] = useState({ days: 29, hours: 12, minutes: 45, seconds: 30 });

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 pt-20">
      {/* 動的な背景エフェクト */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cdefs%3E%3Cpattern%20id%3D%22grid%22%20width%3D%2260%22%20height%3D%2260%22%20patternUnits%3D%22userSpaceOnUse%22%3E%3Cpath%20d%3D%22M%2060%200%20L%200%200%200%2060%22%20fill%3D%22none%22%20stroke%3D%22rgba(255%2C255%2C255%2C0.05)%22%20stroke-width%3D%221%22%2F%3E%3C%2Fpattern%3E%3C%2Fdefs%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22url(%23grid)%22%20%2F%3E%3C%2Fsvg%3E')] opacity-50"></div>
      </div>
      
      {/* プレミアムな光のエフェクト */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "2s" }}></div>
      </div>
      
      {/* ゲームキャラクター風の装飾 */}
      {isClient && (
        <>
          <div className="absolute top-10 left-10 animate-bounce">
            <div className="text-6xl transform rotate-12 drop-shadow-2xl">🎮</div>
          </div>
          <div className="absolute top-20 right-20 animate-bounce" style={{ animationDelay: "0.5s" }}>
            <div className="text-6xl transform -rotate-12 drop-shadow-2xl">🚀</div>
          </div>
          <div className="absolute bottom-20 left-20 animate-bounce" style={{ animationDelay: "1s" }}>
            <div className="text-6xl transform rotate-6 drop-shadow-2xl">🎯</div>
          </div>
          <div className="absolute bottom-10 right-10 animate-bounce" style={{ animationDelay: "1.5s" }}>
            <div className="text-6xl transform -rotate-6 drop-shadow-2xl">⚡</div>
          </div>
        </>
      )}

      {/* キラキラエフェクト */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* コンテンツ */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* 限定バッジ */}
        <div className="inline-block mb-6">
          <div className="relative">
            <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-10 py-4 rounded-full font-black text-lg animate-pulse shadow-2xl premium-shadow">
              🔥 夏休み限定！無料参加！40名だけの特別企画 🔥
            </div>
            <div className="absolute -top-2 -right-2 bg-yellow-400 text-black text-sm font-black px-4 py-2 rounded-full transform rotate-12 shadow-lg">
              急げ！
            </div>
          </div>
        </div>
        
        <h1 className="mb-8">
          <span className="block text-5xl md:text-7xl lg:text-8xl font-black text-white mb-4 transform hover:scale-105 transition-transform">
            <span className="inline-block animate-bounce drop-shadow-2xl" style={{ animationDelay: "0.1s" }}>君</span>
            <span className="inline-block animate-bounce drop-shadow-2xl" style={{ animationDelay: "0.2s" }}>も</span>
            <span className="inline-block animate-bounce drop-shadow-2xl" style={{ animationDelay: "0.3s" }}>今</span>
            <span className="inline-block animate-bounce drop-shadow-2xl" style={{ animationDelay: "0.4s" }}>日</span>
            <span className="inline-block animate-bounce drop-shadow-2xl" style={{ animationDelay: "0.5s" }}>か</span>
            <span className="inline-block animate-bounce drop-shadow-2xl" style={{ animationDelay: "0.6s" }}>ら</span>
          </span>
          <span className="block text-4xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent animate-pulse drop-shadow-2xl">
            ゲームクリエイター！
          </span>
        </h1>
        
        <p className="text-2xl md:text-3xl text-white mb-12 max-w-3xl mx-auto font-bold drop-shadow-lg">
          AIを使って、キミだけの
          <span className="text-yellow-400 text-shadow-lg">ゲーム</span>
          を作っちゃおう！
        </p>

        {/* カウントダウンタイマー */}
        <div className="mb-12">
          <p className="text-white text-lg mb-4 font-bold">締切まで残り</p>
          <div className="flex justify-center gap-4">
            <div className="glass-effect rounded-lg p-4 border-2 border-yellow-400 premium-shadow min-w-[80px]">
              <div className="text-3xl font-black text-yellow-400">{countdown.days}</div>
              <div className="text-sm text-white">日</div>
            </div>
            <div className="glass-effect rounded-lg p-4 border-2 border-yellow-400 premium-shadow min-w-[80px]">
              <div className="text-3xl font-black text-yellow-400">{countdown.hours}</div>
              <div className="text-sm text-white">時間</div>
            </div>
            <div className="glass-effect rounded-lg p-4 border-2 border-yellow-400 premium-shadow min-w-[80px]">
              <div className="text-3xl font-black text-yellow-400">{countdown.minutes}</div>
              <div className="text-sm text-white">分</div>
            </div>
            <div className="glass-effect rounded-lg p-4 border-2 border-yellow-400 premium-shadow min-w-[80px]">
              <div className="text-3xl font-black text-yellow-400">{countdown.seconds}</div>
              <div className="text-sm text-white">秒</div>
            </div>
          </div>
        </div>
        
        {/* イベント情報 */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <div className="glass-effect rounded-2xl px-8 py-6 transform hover:scale-105 transition-transform premium-shadow">
            <span className="text-yellow-400 text-lg font-bold">開催日</span>
            <p className="text-white font-black text-2xl">7月31日(木)</p>
          </div>
          <div className="glass-effect rounded-2xl px-8 py-6 transform hover:scale-105 transition-transform premium-shadow">
            <span className="text-yellow-400 text-lg font-bold">時間</span>
            <p className="text-white font-black text-2xl">13:30-15:30</p>
          </div>
          <div className="glass-effect rounded-2xl px-8 py-6 transform hover:scale-105 transition-transform premium-shadow">
            <span className="text-yellow-400 text-lg font-bold">定員</span>
            <p className="text-white font-black text-2xl">
              <span className="text-red-400">たった</span>40名！
            </p>
          </div>
        </div>
        
        {/* CTA ボタン */}
        <a
          href="#application"
          className="inline-flex items-center gap-3 px-12 py-6 bg-gradient-to-r from-yellow-400 to-pink-500 text-black font-black text-2xl rounded-full transform transition-all hover:scale-110 hover:rotate-3 shadow-2xl animate-pulse premium-shadow"
        >
          <span>今すぐ申し込む</span>
          <span className="text-3xl">🚀</span>
        </a>
        
        <p className="mt-6 text-white text-lg font-bold">
          ⚠️ 毎年すぐに満席になります！お早めに！
        </p>

      </div>
      
      {/* スクロール指示（よりポップに） */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white">
        <div className="flex flex-col items-center animate-bounce">
          <span className="text-lg font-bold mb-2 drop-shadow-lg">詳細を見る</span>
          <div className="text-3xl drop-shadow-lg">👇</div>
        </div>
      </div>
    </header>
  );
}