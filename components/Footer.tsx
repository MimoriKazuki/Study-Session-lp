export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h4 className="text-xl font-bold mb-4">主催</h4>
            <p className="text-gray-400">LandBridge株式会社</p>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-4">お問い合わせ</h4>
            <p className="text-gray-400">Email: info@landbridge.co.jp</p>
            <p className="text-gray-400">Tel: 090-3221-6638</p>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400">
            &copy; 2025 LandBridge株式会社. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}