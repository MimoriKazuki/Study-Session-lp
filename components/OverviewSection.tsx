const overviewItems = [
  { label: "日時", value: "7月31日（木）13:30-15:30" },
  { label: "定員", value: "40名（先着順）" },
  { label: "対象", value: "小学生〜高校生" },
  { label: "参加費", value: "無料" },
  { label: "持ち物", value: "なし\n（PCは会場で用意）" },
];

export default function OverviewSection() {
  return (
    <section id="overview" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-sm font-bold text-gray-500 tracking-wider">EVENT OVERVIEW</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2">開催概要</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          {overviewItems.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-sm font-bold text-gray-500 mb-2">{item.label}</div>
              <div className="text-lg font-bold text-gray-800 whitespace-pre-line">
                {item.value}
              </div>
            </div>
          ))}
        </div>

        {/* 会場情報を強調 */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-8 shadow-2xl text-white">
            <h3 className="text-3xl font-bold mb-4 text-center">📍 会場アクセス</h3>
            
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 mb-6">
              <h4 className="text-2xl font-bold mb-3">越谷市中央市民会館</h4>
              <p className="text-lg mb-2">〒343-0813 埼玉県越谷市越ヶ谷4-1-1</p>
              <div className="flex items-center gap-2 text-yellow-300 font-bold text-xl">
                <span>🚃</span>
                <span>東武スカイツリーライン「越谷駅」東口より徒歩7分</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h5 className="text-lg font-bold mb-3">🚶 駅からの道順</h5>
                <ol className="text-sm space-y-2">
                  <li>1. 越谷駅東口を出て右方向へ</li>
                  <li>2. 県道49号線を直進（約500m）</li>
                  <li>3. 「越谷市役所前」交差点を左折</li>
                  <li>4. 約200m先の右手に会館があります</li>
                </ol>
              </div>
              
              <div>
                <h5 className="text-lg font-bold mb-3">🚗 お車でお越しの方</h5>
                <ul className="text-sm space-y-2">
                  <li>• 無料駐車場完備（100台）</li>
                  <li>• 国道4号線「越谷市役所前」交差点より3分</li>
                  <li>• カーナビ：「越谷市中央市民会館」で検索</li>
                </ul>
              </div>
            </div>

            {/* Google マップ埋め込み */}
            <div className="mt-6 bg-white/10 backdrop-blur rounded-2xl p-4">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3235.892400000001!2d139.78887!3d35.891700000000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6018906c3e8f33d9%3A0x4f4ffd6e2912f6ec!2z6LaK6LC35biC5Lit5aSu5biC5rCR5Lya6aSo!5e0!3m2!1sja!2sjp!4v1707400000000!5m2!1sja!2sjp"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-xl"
              />
            </div>
            
            <div className="mt-4 text-center">
              <a 
                href="https://www.google.com/maps/place/%E8%B6%8A%E8%B0%B7%E5%B8%82%E4%B8%AD%E5%A4%AE%E5%B8%82%E6%B0%91%E4%BC%9A%E9%A4%A8/@35.8917,139.7909,17z/data=!3m1!4b1!4m6!3m5!1s0x6018906c3e8f33d9:0x4f4ffd6e2912f6ec!8m2!3d35.8917!4d139.7909!16s%2Fg%2F11c4jy8x07?hl=ja"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors"
              >
                <span>🗺️</span>
                <span>Google マップで詳しく見る</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full font-bold shadow-lg">
            <span className="text-2xl">🎉</span>
            <span className="text-lg">参加費無料！今すぐお申し込みください</span>
            <span className="text-2xl">🎉</span>
          </div>
        </div>
      </div>
    </section>
  );
}