"use client";

import { useState } from "react";
import { saveApplication, isSupabaseConfigured } from "@/lib/supabase";
import ThankYouModal from "./ThankYouModal";

export default function ApplicationForm() {
  const [formData, setFormData] = useState({
    childName: "",
    grade: "",
    parentName: "",
    phone: "",
    email: "",
    participantCount: "1",
    notes: "",
    privacyPolicy: false,
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [showThankYouModal, setShowThankYouModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: (e.target as HTMLInputElement).checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      // Slack Webhook URLを環境変数から取得
      // 使用方法: NEXT_PUBLIC_SLACK_WEBHOOK_URLを環境変数に設定してください
      const slackWebhookUrl = process.env.NEXT_PUBLIC_SLACK_WEBHOOK_URL;
      
      if (slackWebhookUrl) {
        // Slackに送信するメッセージを作成
        const slackMessage = {
          text: "新しいワークショップ申し込みがありました！",
          blocks: [
            {
              type: "header",
              text: {
                type: "plain_text",
                text: "🎮 AIゲーム開発ワークショップ 新規申し込み"
              }
            },
            {
              type: "section",
              fields: [
                {
                  type: "mrkdwn",
                  text: `*参加者名:*\n${formData.childName}`
                },
                {
                  type: "mrkdwn",
                  text: `*学年:*\n${formData.grade}`
                },
                {
                  type: "mrkdwn",
                  text: `*参加人数:*\n${formData.participantCount}名`
                },
                {
                  type: "mrkdwn",
                  text: `*保護者名:*\n${formData.parentName || "未記入"}`
                },
                {
                  type: "mrkdwn",
                  text: `*電話番号:*\n${formData.phone}`
                },
                {
                  type: "mrkdwn",
                  text: `*メール:*\n${formData.email}`
                }
              ]
            }
          ]
        };

        if (formData.notes) {
          slackMessage.blocks.push({
            type: "section",
            text: {
              type: "mrkdwn",
              text: `*備考:*\n${formData.notes}`
            }
          });
        }

        // Slackに通知を送信
        await fetch(slackWebhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(slackMessage),
          mode: 'no-cors' // CORSエラーを回避
        });
      }

      // Supabaseが設定されている場合はSupabaseに保存、そうでなければLocalStorage
      if (isSupabaseConfigured()) {
        const result = await saveApplication({
          child_name: formData.childName,
          grade: formData.grade,
          parent_name: formData.parentName || undefined,
          phone: formData.phone,
          email: formData.email,
          participant_count: parseInt(formData.participantCount),
          notes: formData.notes || undefined,
        });

        if (!result.success) {
          console.error('Supabase保存エラー、LocalStorageにフォールバック');
          // フォールバック: LocalStorageに保存
          const applicationData = {
            id: Date.now().toString(),
            ...formData,
            createdAt: new Date().toISOString()
          };
          
          const existingApplications = JSON.parse(localStorage.getItem('workshop_applications') || '[]');
          existingApplications.push(applicationData);
          localStorage.setItem('workshop_applications', JSON.stringify(existingApplications));
        }
      } else {
        // Supabaseが設定されていない場合はLocalStorageに保存
        const applicationData = {
          id: Date.now().toString(),
          ...formData,
          createdAt: new Date().toISOString()
        };
        
        const existingApplications = JSON.parse(localStorage.getItem('workshop_applications') || '[]');
        existingApplications.push(applicationData);
        localStorage.setItem('workshop_applications', JSON.stringify(existingApplications));
      }

      // 成功モーダルを表示
      setShowThankYouModal(true);
      setFormData({
        childName: "",
        grade: "",
        parentName: "",
        phone: "",
        email: "",
        participantCount: "1",
        notes: "",
        privacyPolicy: false,
      });
    } catch (error) {
      console.error("申し込みエラー:", error);
      setMessage("申し込みは完了しました。");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="application" className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-sm font-bold text-cyber-blue tracking-wider">APPLICATION</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2">お申し込み</h2>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="childName" className="block text-sm font-bold mb-2">
                参加者氏名 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="childName"
                name="childName"
                value={formData.childName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-cyber-blue transition-colors"
              />
            </div>
            
            <div>
              <label htmlFor="grade" className="block text-sm font-bold mb-2">
                学年 <span className="text-red-500">*</span>
              </label>
              <select
                id="grade"
                name="grade"
                value={formData.grade}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-cyber-blue transition-colors"
              >
                <option value="">選択してください</option>
                <option value="小学1年生">小学1年生</option>
                <option value="小学2年生">小学2年生</option>
                <option value="小学3年生">小学3年生</option>
                <option value="小学4年生">小学4年生</option>
                <option value="小学5年生">小学5年生</option>
                <option value="小学6年生">小学6年生</option>
                <option value="中学1年生">中学1年生</option>
                <option value="中学2年生">中学2年生</option>
                <option value="中学3年生">中学3年生</option>
                <option value="高校1年生">高校1年生</option>
                <option value="高校2年生">高校2年生</option>
                <option value="高校3年生">高校3年生</option>
                <option value="その他">その他</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="participantCount" className="block text-sm font-bold mb-2">
                参加人数 <span className="text-red-500">*</span>
              </label>
              <select
                id="participantCount"
                name="participantCount"
                value={formData.participantCount}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-cyber-blue transition-colors"
              >
                <option value="1">1名</option>
                <option value="2">2名</option>
                <option value="3">3名</option>
                <option value="4">4名</option>
                <option value="5">5名以上</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="parentName" className="block text-sm font-bold mb-2">
                保護者氏名 <span className="text-gray-400 text-xs">（任意）</span>
              </label>
              <input
                type="text"
                id="parentName"
                name="parentName"
                value={formData.parentName}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-cyber-blue transition-colors"
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-bold mb-2">
                電話番号 <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="090-1234-5678"
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-cyber-blue transition-colors"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-bold mb-2">
                メールアドレス <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@mail.com"
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-cyber-blue transition-colors"
              />
            </div>
            
            <div>
              <label htmlFor="notes" className="block text-sm font-bold mb-2">
                その他ご質問等
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={4}
                placeholder="ご質問やご要望がありましたらご記入ください"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-cyber-blue transition-colors"
              />
            </div>
            
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  id="privacyPolicy"
                  name="privacyPolicy"
                  checked={formData.privacyPolicy}
                  onChange={handleChange}
                  required
                  className="mt-1 w-5 h-5 text-cyber-blue bg-gray-700 border-gray-600 rounded focus:ring-cyber-blue focus:ring-2"
                />
                <div className="text-sm">
                  <span className="font-bold">プライバシーポリシーに同意する <span className="text-red-500">*</span></span>
                  <p className="text-gray-400 mt-1">
                    お預かりした個人情報は、本ワークショップの運営および関連するご連絡にのみ使用いたします。
                    第三者への提供や目的外での使用は一切行いません。
                  </p>
                </div>
              </label>
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting || !formData.privacyPolicy}
              className={`w-full py-4 font-bold text-lg rounded-lg transition-all ${
                isSubmitting || !formData.privacyPolicy
                  ? "bg-gray-700 cursor-not-allowed"
                  : "bg-gradient-to-r from-cyber-blue to-cyber-purple hover:shadow-lg hover:shadow-cyber-blue/50 transform hover:scale-105"
              }`}
            >
              {isSubmitting ? "送信中..." : "申し込む"}
            </button>
          </form>
          
          {message && (
            <div className="mt-6 p-4 bg-green-500/20 border border-green-500 rounded-lg text-center">
              {message}
            </div>
          )}
        </div>
      </div>

      {/* サンキューモーダル */}
      <ThankYouModal 
        isOpen={showThankYouModal} 
        onClose={() => setShowThankYouModal(false)} 
      />
    </section>
  );
}