const learningItems = [
  {
    number: "01",
    title: "生成AIの基礎知識",
    description: "AIなどの生成AIがどのように動くのか、基本的な仕組みを分かりやすく解説します。",
  },
  {
    number: "02",
    title: "AIを使ったゲーム制作手法",
    description: "AIを活用してキャラクターデザイン、ストーリー作成、プログラミングを効率的に行う方法を学びます。",
  },
  {
    number: "03",
    title: "実際のツールの使い方",
    description: "実際にAIツールを操作しながら、ゲーム制作の各工程を体験します。",
  },
  {
    number: "04",
    title: "自由研究での活用方法",
    description: "作ったゲームを自由研究として発表するためのまとめ方、プレゼンテーションの方法も指導します。",
  },
];

export default function LearnSection() {
  return (
    <section id="learn" className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-sm font-bold text-cyber-blue tracking-wider">WHAT YOU'LL LEARN</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2">教室で学べること</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {learningItems.map((item, index) => (
            <div
              key={index}
              className="relative bg-gray-800 rounded-2xl p-8 border border-gray-700 hover:border-cyber-blue transition-colors group"
            >
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-cyber-blue to-cyber-purple rounded-full flex items-center justify-center font-orbitron font-bold text-xl group-hover:scale-110 transition-transform">
                {item.number}
              </div>
              <h3 className="text-xl font-bold mb-3 mt-4">{item.title}</h3>
              <p className="text-gray-400">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}