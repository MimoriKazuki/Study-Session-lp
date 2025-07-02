const scheduleItems = [
  {
    time: "13:30 - 14:00",
    title: "生成AIの基礎講座",
    description: "AIの仕組みと可能性について楽しく学ぼう",
  },
  {
    time: "14:00 - 15:00",
    title: "ゲーム制作体験",
    description: "実際にAIを使ってオリジナルゲームを作成",
  },
  {
    time: "15:00 - 15:30",
    title: "作品発表・質疑応答",
    description: "みんなの作品を共有して、講師への質問タイム",
  },
];

export default function ScheduleSection() {
  return (
    <section id="schedule" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-sm font-bold text-gray-500 tracking-wider">TIME SCHEDULE</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2">当日のタイムスケジュール</h2>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyber-blue via-cyber-purple to-cyber-pink"></div>
            
            {/* Timeline items */}
            <div className="space-y-12">
              {scheduleItems.map((item, index) => (
                <div key={index} className="relative flex items-start">
                  {/* Timeline dot */}
                  <div className="absolute left-8 w-4 h-4 bg-white border-4 border-cyber-blue rounded-full transform -translate-x-1/2 z-10"></div>
                  
                  {/* Content */}
                  <div className="ml-20 bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow w-full">
                    <div className="text-cyber-blue font-bold text-sm mb-2">{item.time}</div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}