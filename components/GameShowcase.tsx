"use client";

import { useState } from "react";

const games = [
  {
    title: "じゃんけんバトル",
    description: "AIと対戦！必殺技もあるよ",
    emoji: "✊",
    color: "from-purple-500 to-blue-500",
    difficulty: "★☆☆",
    features: ["簡単操作", "必殺技システム", "スコアランキング"],
  },
  {
    title: "迷路脱出ゲーム",
    description: "自動生成される迷路を攻略",
    emoji: "🏃",
    color: "from-green-500 to-teal-500",
    difficulty: "★★☆",
    features: ["ランダム迷路", "タイムアタック", "アイテム収集"],
  },
  {
    title: "宝探しアドベンチャー",
    description: "島を探検して宝物をゲット",
    emoji: "💎",
    color: "from-orange-500 to-red-500",
    difficulty: "★★☆",
    features: ["探検要素", "ストーリーモード", "キャラクター成長"],
  },
  {
    title: "シューティングゲーム",
    description: "敵を倒してハイスコアを狙え",
    emoji: "🚀",
    color: "from-indigo-500 to-purple-500",
    difficulty: "★★★",
    features: ["パワーアップ", "ボスバトル", "連続コンボ"],
  },
];

export default function GameShowcase() {
  const [selectedGame, setSelectedGame] = useState(0);

  return (
    <section id="games" className="py-20 bg-gradient-to-b from-purple-900 to-gray-900 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-sm font-bold text-cyan-400 tracking-wider">GAMES</span>
          <h2 className="text-4xl md:text-6xl font-black text-white mt-2">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              どんなゲームが作れるの？
            </span>
          </h2>
          <p className="text-xl text-gray-300 mt-4">AIを使えば、こんなゲームが2時間で作れちゃう！</p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* ゲーム詳細表示 */}
          <div className="relative mb-12">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 blur-3xl opacity-30"></div>
            <div className="relative bg-gray-800 rounded-3xl p-8 border-4 border-gray-700 shadow-2xl">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* ゲーム画面 */}
                <div className="bg-gray-900 rounded-2xl aspect-video flex items-center justify-center">
                  <div className={`text-center p-12 bg-gradient-to-br ${games[selectedGame].color} rounded-2xl w-full h-full flex flex-col justify-center`}>
                    <div className="text-8xl mb-4 animate-bounce">{games[selectedGame].emoji}</div>
                    <h3 className="text-3xl font-bold text-white mb-2">{games[selectedGame].title}</h3>
                    <p className="text-xl text-white/80">{games[selectedGame].description}</p>
                  </div>
                </div>
                
                {/* ゲーム情報 */}
                <div className="text-white">
                  <h3 className="text-3xl font-bold mb-4">{games[selectedGame].title}</h3>
                  <div className="mb-4">
                    <span className="text-gray-400">難易度：</span>
                    <span className="text-2xl text-yellow-400">{games[selectedGame].difficulty}</span>
                  </div>
                  <p className="text-lg text-gray-300 mb-6">{games[selectedGame].description}</p>
                  <div className="space-y-2">
                    <p className="font-bold text-cyan-400 mb-2">ゲームの特徴：</p>
                    {games[selectedGame].features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <span className="text-green-400">✓</span>
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ゲーム選択ボタン */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {games.map((game, index) => (
              <button
                key={index}
                onClick={() => setSelectedGame(index)}
                className={`p-6 rounded-2xl border-2 transition-all transform hover:scale-105 ${
                  selectedGame === index
                    ? "bg-gradient-to-r " + game.color + " border-white text-white"
                    : "bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-500"
                }`}
              >
                <div className="text-4xl mb-2">{game.emoji}</div>
                <div className="font-bold">{game.title}</div>
                <div className="text-sm mt-1">{game.difficulty}</div>
              </button>
            ))}
          </div>
        </div>

        {/* 作り方のステップ */}
        <div className="mt-20 max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-white text-center mb-12">ゲーム制作の3ステップ</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800 rounded-2xl p-6 text-center">
              <div className="text-5xl mb-4">💭</div>
              <h4 className="text-xl font-bold text-white mb-2">STEP 1</h4>
              <p className="text-gray-300">アイデアを考える</p>
              <p className="text-sm text-gray-400 mt-2">どんなゲームを作りたいか想像しよう</p>
            </div>
            <div className="bg-gray-800 rounded-2xl p-6 text-center">
              <div className="text-5xl mb-4">🤖</div>
              <h4 className="text-xl font-bold text-white mb-2">STEP 2</h4>
              <p className="text-gray-300">AIに相談する</p>
              <p className="text-sm text-gray-400 mt-2">AIがコードを自動生成</p>
            </div>
            <div className="bg-gray-800 rounded-2xl p-6 text-center">
              <div className="text-5xl mb-4">🎮</div>
              <h4 className="text-xl font-bold text-white mb-2">STEP 3</h4>
              <p className="text-gray-300">遊んで改良する</p>
              <p className="text-sm text-gray-400 mt-2">実際に遊んでもっと楽しくしよう</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}