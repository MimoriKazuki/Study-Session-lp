'use client'

import { useState } from 'react'

export default function TestSlack() {
  const [isSending, setIsSending] = useState(false)
  const [message, setMessage] = useState('')

  const sendTestNotification = async () => {
    setIsSending(true)
    setMessage('')

    try {
      const slackWebhookUrl = process.env.NEXT_PUBLIC_SLACK_WEBHOOK_URL

      if (!slackWebhookUrl) {
        setMessage('❌ Slack Webhook URLが設定されていません')
        setIsSending(false)
        return
      }

      const testData = {
        text: "テスト通知",
        blocks: [
          {
            type: "header",
            text: {
              type: "plain_text",
              text: "🧪 Slackテスト通知"
            }
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "これはテスト通知です。正常に受信できています！"
            }
          },
          {
            type: "section",
            fields: [
              {
                type: "mrkdwn",
                text: `*送信日時:*\n${new Date().toLocaleString('ja-JP')}`
              },
              {
                type: "mrkdwn",
                text: "*ステータス:*\n✅ 成功"
              }
            ]
          }
        ]
      }

      await fetch(slackWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData),
        mode: 'no-cors'
      })

      setMessage('✅ テスト通知を送信しました！Slackを確認してください。')
    } catch (error) {
      console.error('エラー:', error)
      setMessage('❌ エラーが発生しました')
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-white mb-6">Slack通知テスト</h1>
        
        <div className="mb-6">
          <p className="text-gray-300 mb-4">
            このボタンをクリックすると、設定されたSlackチャンネルにテスト通知が送信されます。
          </p>
          
          <div className="bg-gray-700 rounded p-4 mb-4">
            <p className="text-sm text-gray-400">Webhook URL:</p>
            <p className="text-xs text-gray-500 break-all">
              {process.env.NEXT_PUBLIC_SLACK_WEBHOOK_URL ? 
                '✅ 設定済み' : 
                '❌ 未設定'
              }
            </p>
          </div>
        </div>

        <button
          onClick={sendTestNotification}
          disabled={isSending}
          className={`w-full py-3 rounded-lg font-bold transition-all ${
            isSending 
              ? 'bg-gray-600 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {isSending ? '送信中...' : 'テスト通知を送信'}
        </button>

        {message && (
          <div className={`mt-4 p-4 rounded-lg ${
            message.includes('✅') ? 'bg-green-900' : 'bg-red-900'
          }`}>
            <p className="text-white text-sm">{message}</p>
          </div>
        )}

        <div className="mt-6 text-center">
          <a 
            href="/"
            className="text-blue-400 hover:text-blue-300 text-sm"
          >
            ← トップページに戻る
          </a>
        </div>
      </div>
    </div>
  )
}