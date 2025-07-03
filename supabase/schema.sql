-- Supabase データベーススキーマ
-- このファイルをSupabase DashboardのSQL Editorで実行してください

-- 申込者情報テーブル
CREATE TABLE IF NOT EXISTS applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  child_name VARCHAR(100) NOT NULL,
  grade VARCHAR(50) NOT NULL,
  parent_name VARCHAR(100),
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(255) NOT NULL,
  participant_count INTEGER NOT NULL DEFAULT 1,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Row Level Security (RLS) を有効化
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- ポリシーを削除してから再作成（既存のポリシーがある場合のエラーを回避）
DROP POLICY IF EXISTS "Enable read access for all users" ON applications;
DROP POLICY IF EXISTS "Enable insert for all users" ON applications;
DROP POLICY IF EXISTS "Enable delete for all users" ON applications;

-- ポリシー：誰でも読み取り可能（管理画面用）
CREATE POLICY "Enable read access for all users" ON applications
  FOR SELECT USING (true);

-- ポリシー：誰でも挿入可能（申込フォーム用）
CREATE POLICY "Enable insert for all users" ON applications
  FOR INSERT WITH CHECK (true);

-- ポリシー：誰でも削除可能（管理画面用）
CREATE POLICY "Enable delete for all users" ON applications
  FOR DELETE USING (true);

-- 更新日時の自動更新関数
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- 更新日時の自動更新トリガー
CREATE TRIGGER update_applications_updated_at 
  BEFORE UPDATE ON applications 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- パフォーマンス向上のためのインデックス
CREATE INDEX IF NOT EXISTS idx_applications_email ON applications(email);
CREATE INDEX IF NOT EXISTS idx_applications_created_at ON applications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_applications_child_name ON applications(child_name);

-- 統計情報用のビュー
CREATE OR REPLACE VIEW application_statistics AS
SELECT 
  COUNT(*) as total_applications,
  SUM(participant_count) as total_participants,
  COUNT(DISTINCT DATE(created_at)) as days_with_applications,
  MIN(created_at) as first_application,
  MAX(created_at) as latest_application
FROM applications;

-- 日別申込数のビュー
CREATE OR REPLACE VIEW daily_applications AS
SELECT 
  DATE(created_at) as application_date,
  COUNT(*) as application_count,
  SUM(participant_count) as participant_count
FROM applications
GROUP BY DATE(created_at)
ORDER BY application_date DESC;