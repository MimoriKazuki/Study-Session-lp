'use client'

import { useEffect } from 'react'

interface ThankYouModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ThankYouModal({ isOpen, onClose }: ThankYouModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* オーバーレイ */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-75 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* モーダル本体 */}
      <div className="relative bg-gray-900 rounded-2xl max-w-md w-full p-8 border border-cyber-blue shadow-2xl shadow-cyber-blue/30 animate-fadeInScale">
        {/* 閉じるボタン */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* サクセスアイコン */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center animate-pulse">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* メッセージ */}
        <div className="text-center text-white">
          <h3 className="text-2xl font-bold mb-4">お申込みありがとうございます！</h3>
          <p className="text-lg mb-2">当日お会いできるのを</p>
          <p className="text-lg mb-6">楽しみにしています。</p>
        </div>

        {/* イベント詳細 */}
        <div className="bg-gray-800 rounded-lg p-6 space-y-4">
          <h4 className="text-lg font-bold text-cyber-blue mb-3">イベント詳細</h4>
          
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="text-white">
              <p className="text-sm text-gray-400">開催日時</p>
              <p className="font-bold">7月31日（水）</p>
              <p className="text-sm">13:30〜15:30</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div className="text-white">
              <p className="text-sm text-gray-400">開催場所</p>
              <p className="font-bold">越谷市中央市民会館</p>
              <p className="text-sm">埼玉県越谷市越ヶ谷4-1-1</p>
            </div>
          </div>

        </div>

        {/* 閉じるボタン */}
        <button
          onClick={onClose}
          className="mt-6 w-full py-3 bg-gradient-to-r from-cyber-blue to-cyber-purple text-white font-bold rounded-lg hover:shadow-lg hover:shadow-cyber-blue/50 transition-all transform hover:scale-105"
        >
          閉じる
        </button>
      </div>
    </div>
  )
}