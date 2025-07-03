'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { saveApplication, isSupabaseConfigured } from '@/lib/supabase'

interface LocalApplication {
  id: string
  childName: string
  grade: string
  parentName?: string
  phone: string
  email: string
  participantCount: string
  notes?: string
  createdAt: string
}

export default function MigratePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [localData, setLocalData] = useState<LocalApplication[]>([])
  const [isMigrating, setIsMigrating] = useState(false)
  const [migrationResults, setMigrationResults] = useState<{
    success: number
    failed: number
    errors: string[]
  }>({ success: 0, failed: 0, errors: [] })
  const router = useRouter()

  const ADMIN_PASSWORD = 'admin2025'

  useEffect(() => {
    if (isAuthenticated) {
      // LocalStorageからデータを読み込む
      const saved = localStorage.getItem('workshop_applications')
      if (saved) {
        setLocalData(JSON.parse(saved))
      }
    }
  }, [isAuthenticated])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
    } else {
      alert('パスワードが違います')
    }
  }

  const handleMigration = async () => {
    if (!isSupabaseConfigured()) {
      alert('Supabaseが設定されていません。環境変数を設定してください。')
      return
    }

    if (!confirm(`${localData.length}件のデータをSupabaseに移行します。よろしいですか？`)) {
      return
    }

    setIsMigrating(true)
    const results = { success: 0, failed: 0, errors: [] as string[] }

    for (const app of localData) {
      try {
        const result = await saveApplication({
          child_name: app.childName,
          grade: app.grade,
          parent_name: app.parentName,
          phone: app.phone,
          email: app.email,
          participant_count: parseInt(app.participantCount),
          notes: app.notes,
        })

        if (result.success) {
          results.success++
        } else {
          results.failed++
          results.errors.push(`${app.childName}: データ保存エラー`)
        }
      } catch (error) {
        results.failed++
        results.errors.push(`${app.childName}: ${error}`)
      }
    }

    setMigrationResults(results)
    setIsMigrating(false)

    if (results.failed === 0) {
      if (confirm('移行が完了しました。LocalStorageのデータを削除しますか？')) {
        localStorage.removeItem('workshop_applications')
        alert('LocalStorageのデータを削除しました')
      }
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-gray-800 rounded-lg p-8 max-w-md w-full">
          <h1 className="text-2xl font-bold text-white mb-6">データ移行ツール - ログイン</h1>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="パスワードを入力"
              className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors"
            >
              ログイン
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-gray-900 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">データ移行ツール</h1>
          <button
            onClick={() => router.push('/admin')}
            className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition-colors"
          >
            管理画面に戻る
          </button>
        </div>
      </div>

      <div className="container mx-auto p-6">
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">LocalStorage → Supabase 移行</h2>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">現在の状態</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">LocalStorageのデータ数</p>
                <p className="text-2xl font-bold">{localData.length}件</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Supabase接続状態</p>
                <p className={`text-2xl font-bold ${isSupabaseConfigured() ? 'text-green-600' : 'text-red-600'}`}>
                  {isSupabaseConfigured() ? '接続可能' : '未設定'}
                </p>
              </div>
            </div>
          </div>

          {!isSupabaseConfigured() && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <h4 className="font-bold text-yellow-800 mb-2">Supabaseが設定されていません</h4>
              <p className="text-sm text-yellow-700">
                以下の環境変数を設定してください：
              </p>
              <ul className="list-disc list-inside text-sm text-yellow-700 mt-2">
                <li>NEXT_PUBLIC_SUPABASE_URL</li>
                <li>NEXT_PUBLIC_SUPABASE_ANON_KEY</li>
              </ul>
            </div>
          )}

          <button
            onClick={handleMigration}
            disabled={isMigrating || localData.length === 0 || !isSupabaseConfigured()}
            className={`px-6 py-3 rounded-lg font-bold transition-colors ${
              isMigrating || localData.length === 0 || !isSupabaseConfigured()
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isMigrating ? '移行中...' : 'データを移行する'}
          </button>
        </div>

        {migrationResults.success > 0 || migrationResults.failed > 0 ? (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-bold mb-4">移行結果</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">成功</p>
                <p className="text-2xl font-bold text-green-600">{migrationResults.success}件</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">失敗</p>
                <p className="text-2xl font-bold text-red-600">{migrationResults.failed}件</p>
              </div>
            </div>
            
            {migrationResults.errors.length > 0 && (
              <div className="mt-4">
                <h4 className="font-medium mb-2">エラー詳細</h4>
                <div className="bg-red-50 border border-red-200 rounded p-3">
                  <ul className="list-disc list-inside text-sm text-red-700">
                    {migrationResults.errors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  )
}