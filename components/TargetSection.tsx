"use client";

import { useEffect, useState } from "react";

const targets = [
  {
    icon: "🎮",
    title: "ゲームが大好き",
    description: "マイクラ、フォトナ、ポケモン...好きなゲームを自分で作れるようになる！",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: "💻",
    title: "YouTuberに憧れる",
    description: "自作ゲームでゲーム実況！友達に自慢できちゃう！",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: "🚀",
    title: "新しいことが好き",
    description: "最新のAI技術をいち早く体験！未来のスキルを身につけよう",
    color: "from-green-500 to-teal-500",
  },
  {
    icon: "📚",
    title: "自由研究で1位を狙う",
    description: "「AIでゲーム作りました」なんて、クラスで話題独占！",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: "🎨",
    title: "想像力がスゴイ",
    description: "頭の中のアイデアを、AIの力で本物のゲームに！",
    color: "from-indigo-500 to-purple-500",
  },
];

export default function TargetSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <section id="target" className="py-20 bg-gradient-to-b from-gray-900 to-purple-900 relative overflow-hidden">
      {/* 背景装飾 */}
      {isClient && (
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-purple-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-64 h-64 bg-cyan-500 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "2s" }}></div>
        </div>
      )}

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="text-sm font-bold text-yellow-400 tracking-wider animate-pulse">CHECK!</span>
          <h2 className="text-4xl md:text-6xl font-black text-white mt-2">
            <span className="inline-block transform hover:rotate-3 transition-transform">こんな子に</span>
            <span className="inline-block transform hover:-rotate-3 transition-transform text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500">ぴったり！</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {targets.map((target, index) => (
            <div
              key={index}
              className="relative group transform transition-all hover:scale-105"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* カードの光るエフェクト */}
              <div className={`absolute inset-0 bg-gradient-to-r ${target.color} rounded-3xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity`}></div>
              
              {/* カード本体 */}
              <div className="relative bg-gray-800 rounded-3xl p-8 border-2 border-gray-700 group-hover:border-white/50 transition-all">
                {/* キラキラエフェクト */}
                {hoveredIndex === index && (
                  <>
                    <div className="absolute top-2 right-2 w-4 h-4 bg-white rounded-full animate-ping"></div>
                    <div className="absolute bottom-2 left-2 w-3 h-3 bg-yellow-400 rounded-full animate-ping" style={{ animationDelay: "0.5s" }}></div>
                  </>
                )}
                
                <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform">{target.icon}</div>
                <h3 className="text-2xl font-bold mb-3 text-white">{target.title}</h3>
                <p className="text-gray-300 leading-relaxed">{target.description}</p>
                
                {/* NEW!バッジ */}
                <div className="absolute -top-3 -right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full transform rotate-12 animate-bounce">
                  HOT!
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 参加促進メッセージ */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full px-8 py-4 transform hover:scale-105 transition-transform">
            <p className="text-black font-bold text-xl">
              1つでも当てはまったら、今すぐ参加しよう！ 🎯
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}