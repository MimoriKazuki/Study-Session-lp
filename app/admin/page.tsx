'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface Application {
  id: string
  childName: string
  grade: string
  parentName: string
  phone: string
  email: string
  participantCount: string
  notes: string
  createdAt: string
}

export default function AdminDashboard() {
  const [applications, setApplications] = useState<Application[]>([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null)
  const [activeTab, setActiveTab] = useState<'applications' | 'settings'>('applications')
  const [instructorImage, setInstructorImage] = useState<string>('/mimori-profile.png')
  const router = useRouter()

  // 簡易認証
  const ADMIN_PASSWORD = 'admin2025' // 実際の運用では環境変数に設定

  useEffect(() => {
    // ローカルストレージから申し込みデータを取得
    const loadApplications = () => {
      const saved = localStorage.getItem('workshop_applications')
      if (saved) {
        setApplications(JSON.parse(saved))
      }
    }

    if (isAuthenticated) {
      loadApplications()
      // 保存された画像URLを読み込み
      const savedImage = localStorage.getItem('instructor_image')
      if (savedImage) {
        setInstructorImage(savedImage)
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

  const filteredApplications = applications.filter(app => 
    app.childName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.phone.includes(searchTerm) ||
    app.parentName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalParticipants = applications.reduce((sum, app) => 
    sum + parseInt(app.participantCount), 0
  )

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // ファイルサイズチェック（3MB以下）
    if (file.size > 3 * 1024 * 1024) {
      alert('ファイルサイズは3MB以下にしてください')
      return
    }

    // 画像ファイルチェック
    if (!file.type.startsWith('image/')) {
      alert('画像ファイルを選択してください')
      return
    }

    try {
      // 画像を圧縮してからBase64に変換
      const img = new Image()
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      
      const reader = new FileReader()
      reader.onloadend = () => {
        img.onload = () => {
          // 最大サイズを800pxに制限（画質向上のため）
          const MAX_SIZE = 800
          let width = img.width
          let height = img.height
          
          if (width > height) {
            if (width > MAX_SIZE) {
              height = height * (MAX_SIZE / width)
              width = MAX_SIZE
            }
          } else {
            if (height > MAX_SIZE) {
              width = width * (MAX_SIZE / height)
              height = MAX_SIZE
            }
          }
          
          canvas.width = width
          canvas.height = height
          
          if (ctx) {
            // アンチエイリアシングを有効にして高品質に描画
            ctx.imageSmoothingEnabled = true
            ctx.imageSmoothingQuality = 'high'
            ctx.drawImage(img, 0, 0, width, height)
            
            // WebP形式で圧縮（品質95%で高画質を維持）
            let compressedBase64 = canvas.toDataURL('image/webp', 0.95)
            
            // WebPがサポートされていない場合はJPEGを使用
            if (compressedBase64.indexOf('image/webp') === -1) {
              compressedBase64 = canvas.toDataURL('image/jpeg', 0.95)
            }
            
            try {
              setInstructorImage(compressedBase64)
              localStorage.setItem('instructor_image', compressedBase64)
              
              // InstructorSectionコンポーネントを更新するためのイベント
              window.dispatchEvent(new CustomEvent('instructorImageUpdate', { 
                detail: { imageUrl: compressedBase64 } 
              }))
              
              alert('画像を更新しました')
            } catch (storageError) {
              console.error('ストレージエラー:', storageError)
              alert('画像の保存に失敗しました。画像サイズが大きすぎる可能性があります。')
            }
          }
        }
        
        img.src = reader.result as string
      }
      
      reader.readAsDataURL(file)
    } catch (error) {
      console.error('画像アップロードエラー:', error)
      alert('画像のアップロードに失敗しました')
    }
  }

  const exportToCSV = () => {
    const headers = ['ID', '参加者名', '学年', '保護者名', '電話番号', 'メール', '参加人数', '備考', '申込日時']
    const csvContent = [
      headers.join(','),
      ...applications.map(app => [
        app.id,
        app.childName,
        app.grade,
        app.parentName || '',
        app.phone,
        app.email,
        app.participantCount,
        app.notes || '',
        new Date(app.createdAt).toLocaleString('ja-JP')
      ].map(field => `"${field}"`).join(','))
    ].join('\n')

    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `workshop_applications_${new Date().toISOString().split('T')[0]}.csv`
    link.click()
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-gray-800 rounded-lg p-8 max-w-md w-full">
          <h1 className="text-2xl font-bold text-white mb-6">管理画面ログイン</h1>
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
      {/* ヘッダー */}
      <div className="bg-gray-900 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">🎮 ワークショップ申込管理</h1>
          <button
            onClick={() => router.push('/')}
            className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition-colors"
          >
            LPに戻る
          </button>
        </div>
      </div>

      <div className="container mx-auto p-6">
        {/* タブ切り替え */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('applications')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'applications'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              申込管理
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'settings'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              設定
            </button>
          </div>
        </div>

        {activeTab === 'applications' ? (
          <>
            {/* 統計情報 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-500 text-sm">総申込数</h3>
            <p className="text-3xl font-bold text-gray-800">{applications.length}件</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-500 text-sm">総参加人数</h3>
            <p className="text-3xl font-bold text-gray-800">{totalParticipants}名</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-500 text-sm">残り枠</h3>
            <p className="text-3xl font-bold text-red-600">{40 - totalParticipants}名</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-500 text-sm">充足率</h3>
            <p className="text-3xl font-bold text-blue-600">{Math.round((totalParticipants / 40) * 100)}%</p>
          </div>
        </div>

        {/* 検索とエクスポート */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex gap-4 items-center">
            <input
              type="text"
              placeholder="名前、メール、電話番号で検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={exportToCSV}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              CSV出力
            </button>
          </div>
        </div>

        {/* 申込一覧 */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">参加者</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">学年</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">保護者</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">連絡先</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">人数</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">申込日時</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredApplications.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                      申込データがありません
                    </td>
                  </tr>
                ) : (
                  filteredApplications.map((app) => (
                    <tr key={app.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{app.childName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {app.grade}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {app.parentName || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{app.email}</div>
                        <div className="text-sm text-gray-500">{app.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {app.participantCount}名
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(app.createdAt).toLocaleString('ja-JP')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => setSelectedApplication(app)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          詳細
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
          </>
        ) : (
          /* 設定タブ */
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-6">サイト設定</h2>
            
            {/* 講師画像設定 */}
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-4">講師画像</h3>
              <div className="flex items-center gap-6">
                <div className="relative">
                  <img
                    src={instructorImage}
                    alt="講師画像プレビュー"
                    className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
                  />
                </div>
                <div>
                  <label className="block">
                    <span className="sr-only">画像を選択</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-50 file:text-blue-700
                        hover:file:bg-blue-100
                        cursor-pointer"
                    />
                  </label>
                  <p className="mt-2 text-sm text-gray-500">
                    推奨: 正方形の画像、3MB以下
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    対応形式: JPG, PNG, GIF, WebP
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-medium mb-4">注意事項</h3>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                <li>画像は自動的にBase64形式で保存されます</li>
                <li>拡張子に関わらず、すべての画像形式に対応します</li>
                <li>変更は即座にサイトに反映されます</li>
                <li>元の画像に戻したい場合は、再度アップロードしてください</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* 詳細モーダル */}
      {selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4">申込詳細</h2>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-500">参加者名</label>
                <p className="font-medium">{selectedApplication.childName}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">学年</label>
                <p className="font-medium">{selectedApplication.grade}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">保護者名</label>
                <p className="font-medium">{selectedApplication.parentName || '-'}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">電話番号</label>
                <p className="font-medium">{selectedApplication.phone}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">メールアドレス</label>
                <p className="font-medium">{selectedApplication.email}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">参加人数</label>
                <p className="font-medium">{selectedApplication.participantCount}名</p>
              </div>
              {selectedApplication.notes && (
                <div>
                  <label className="text-sm text-gray-500">備考</label>
                  <p className="font-medium">{selectedApplication.notes}</p>
                </div>
              )}
              <div>
                <label className="text-sm text-gray-500">申込日時</label>
                <p className="font-medium">{new Date(selectedApplication.createdAt).toLocaleString('ja-JP')}</p>
              </div>
            </div>
            <button
              onClick={() => setSelectedApplication(null)}
              className="mt-6 w-full py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
            >
              閉じる
            </button>
          </div>
        </div>
      )}
    </div>
  )
}