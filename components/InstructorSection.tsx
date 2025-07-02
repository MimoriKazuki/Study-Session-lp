"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function InstructorSection() {
  const [instructorImage, setInstructorImage] = useState('/mimori-profile.png')

  useEffect(() => {
    // ローカルストレージから画像を読み込み
    const savedImage = localStorage.getItem('instructor_image')
    if (savedImage) {
      setInstructorImage(savedImage)
    }

    // 画像更新イベントをリッスン
    const handleImageUpdate = (event: any) => {
      if (event.detail?.imageUrl) {
        setInstructorImage(event.detail.imageUrl)
      }
    }

    window.addEventListener('instructorImageUpdate', handleImageUpdate)
    
    return () => {
      window.removeEventListener('instructorImageUpdate', handleImageUpdate)
    }
  }, [])
  return (
    <section id="instructor" className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-sm font-bold text-cyber-blue tracking-wider">INSTRUCTOR</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2">講師紹介</h2>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-800 rounded-3xl p-8 md:p-12 border border-gray-700 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyber-blue/10 to-cyber-purple/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
              {/* 講師写真 */}
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-64 h-64 bg-gradient-to-br from-cyber-blue to-cyber-purple rounded-full flex items-center justify-center overflow-hidden relative">
                    {instructorImage.startsWith('data:') ? (
                      <img 
                        src={instructorImage} 
                        alt="三森一輝" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Image 
                        src={instructorImage} 
                        alt="三森一輝" 
                        fill
                        className="object-cover"
                        priority
                      />
                    )}
                  </div>
                  <div className="absolute -bottom-4 -right-4 bg-yellow-400 text-black px-4 py-2 rounded-full font-bold transform rotate-6">
                    CEO
                  </div>
                </div>
              </div>
              
              {/* 講師情報 */}
              <div>
                <h3 className="text-3xl font-bold mb-2">三森 一輝</h3>
                <p className="text-cyber-blue font-bold text-lg mb-4">LandBridge株式会社 代表取締役CEO</p>
                
                <div className="space-y-4 text-gray-300">
                  <p>
                    元警察官という異色の経歴を持ち、現在はIT起業家として活躍。2022年にLandBridge株式会社を設立し、最先端のAI技術を活用したシステム開発を手掛ける。
                  </p>
                  <p>
                    ベトナムをはじめとする海外のエンジニアチームと協業し、グローバルなシステム開発会社を経営。AI関連の開発に特に力を入れており、革新的なAIサービスを次々と世に送り出している。
                  </p>
                  <p>
                    「NEXT HR AI面接官」などの先進的なAIプロダクトを開発し、企業のDX推進を支援。地元埼玉県では子供向けAI教育にも積極的に取り組む。
                  </p>
                  <p className="text-sm text-gray-400 italic">
                    「世界と日本の人が働きやすい世の中を作る、世界の架け橋になることが私の理想です。子供たちに最新のAI技術を楽しく学んでもらい、グローバルに活躍できる未来のイノベーターを育てたい！」
                  </p>
                </div>
                
                <div className="mt-6 flex flex-wrap gap-3">
                  <div className="px-4 py-2 bg-cyber-blue/20 border border-cyber-blue/50 rounded-full text-sm">
                    元警察官
                  </div>
                  <div className="px-4 py-2 bg-cyber-purple/20 border border-cyber-purple/50 rounded-full text-sm">
                    海外ビジネス
                  </div>
                  <div className="px-4 py-2 bg-cyber-green/20 border border-cyber-green/50 rounded-full text-sm">
                    AI専門家
                  </div>
                  <div className="px-4 py-2 bg-yellow-400/20 border border-yellow-400/50 rounded-full text-sm">
                    教育者
                  </div>
                </div>
              </div>
            </div>
            
            {/* 実績バッジ */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-700/50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-cyber-blue">50+</div>
                <div className="text-sm text-gray-400">開発プロジェクト</div>
              </div>
              <div className="bg-gray-700/50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-cyber-purple">30+</div>
                <div className="text-sm text-gray-400">AI導入実績</div>
              </div>
              <div className="bg-gray-700/50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-cyber-green">2ヶ国</div>
                <div className="text-sm text-gray-400">海外パートナー</div>
              </div>
              <div className="bg-gray-700/50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-yellow-400">★5.0</div>
                <div className="text-sm text-gray-400">講師評価</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}