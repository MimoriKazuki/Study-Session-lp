'use client'

import { useState, useEffect } from 'react'
import { isSupabaseConfigured, getApplications } from '@/lib/supabase'

export default function TestSupabase() {
  const [isConnected, setIsConnected] = useState<boolean | null>(null)
  const [testResult, setTestResult] = useState<string>('')
  const [applicationCount, setApplicationCount] = useState<number | null>(null)

  useEffect(() => {
    checkConnection()
  }, [])

  const checkConnection = async () => {
    // Supabaseが設定されているかチェック
    const configured = isSupabaseConfigured()
    setIsConnected(configured)

    if (configured) {
      setTestResult('Supabase環境変数が設定されています')
      
      // データ取得テスト
      try {
        const result = await getApplications()
        if (result.success) {
          setApplicationCount(result.data?.length || 0)
          setTestResult(prev => prev + '\n✅ データベース接続成功')
        } else {
          setTestResult(prev => prev + '\n❌ データベース接続エラー: ' + JSON.stringify(result.error))
        }
      } catch (error) {
        setTestResult(prev => prev + '\n❌ 接続エラー: ' + error)
      }
    } else {
      setTestResult('❌ Supabase環境変数が設定されていません\n\n以下の環境変数を.env.localファイルに設定してください:\n- NEXT_PUBLIC_SUPABASE_URL\n- NEXT_PUBLIC_SUPABASE_ANON_KEY')
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Supabase接続テスト</h1>
        
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">接続状態</h2>
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-4 h-4 rounded-full ${isConnected === true ? 'bg-green-500' : isConnected === false ? 'bg-red-500' : 'bg-gray-500'}`} />
            <span className="text-lg">
              {isConnected === true ? '接続可能' : isConnected === false ? '未接続' : '確認中...'}
            </span>
          </div>
          
          {applicationCount !== null && (
            <div className="mt-4 p-4 bg-gray-700 rounded">
              <p className="text-sm text-gray-300">現在の申込データ数: <span className="font-bold text-white">{applicationCount}件</span></p>
            </div>
          )}
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">詳細情報</h2>
          <pre className="whitespace-pre-wrap text-sm font-mono bg-gray-900 p-4 rounded overflow-x-auto">
            {testResult}
          </pre>
        </div>

        <div className="mt-6 bg-blue-900 rounded-lg p-6">
          <h3 className="text-lg font-bold mb-3">Supabaseセットアップ手順</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li><a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">supabase.com</a> でアカウントを作成</li>
            <li>新しいプロジェクトを作成</li>
            <li>Settings → API からProject URLとanon keyを取得</li>
            <li>.env.localファイルに環境変数を設定</li>
            <li>SQL Editorで /supabase/schema.sql の内容を実行</li>
            <li>開発サーバーを再起動（npm run dev）</li>
          </ol>
        </div>

        <button
          onClick={() => window.location.href = '/'}
          className="mt-6 px-6 py-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
        >
          ホームに戻る
        </button>
      </div>
    </div>
  )
}