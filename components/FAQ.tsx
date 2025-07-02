"use client";

import { useState } from "react";

const faqs = [
  {
    question: "プログラミング未経験でも大丈夫ですか？",
    answer: "未経験でも大丈夫です！本当に日本語が話せればできるので安心してください。",
  },
  {
    question: "持参するものはありますか？",
    answer: "特に必要ありません。メモを取りたい方は筆記用具があるといいかもしれませんが、持ってこなくても大丈夫です。",
  },
  {
    question: "保護者の同伴は必要ですか？",
    answer: "どちらでも大丈夫です。保護者の方も勉強になると思いますので、来ても来なくてもどちらでもいいです。ただ、お子様が安全に会場まで来られることが大切です。",
  },
  {
    question: "作ったゲームは持ち帰れますか？",
    answer: "ゲーム自体は持ち帰れませんが、ゲームの作り方を教えるセミナー形式となっています。",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-sm font-bold text-gray-500 tracking-wider">FAQ</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2">よくある質問</h2>
        </div>
        
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold text-cyber-blue">Q</span>
                  <h3 className="text-lg font-bold text-left">{faq.question}</h3>
                </div>
                <span className="text-2xl text-gray-400 transition-transform duration-300" style={{
                  transform: openIndex === index ? "rotate(45deg)" : "rotate(0deg)"
                }}>
                  +
                </span>
              </button>
              
              <div
                className={`px-8 overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96 pb-6" : "max-h-0"
                }`}
              >
                <p className="text-gray-600 pl-12">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}