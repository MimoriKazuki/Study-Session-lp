# Supabase セットアップガイド

## 1. Supabaseプロジェクトの作成

1. [Supabase](https://supabase.com)にアクセス
2. 「Start your project」をクリック
3. GitHubまたはメールでサインアップ
4. 新しいプロジェクトを作成
   - Project name: `study-session-lp`
   - Database Password: 強力なパスワードを設定（保存しておく）
   - Region: `Northeast Asia (Tokyo)`

## 2. データベーステーブルの作成

Supabase DashboardのSQL Editorで以下のSQLを実行：

```sql
-- 申込者情報テーブル
CREATE TABLE applications (
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

-- 管理者用の読み取りポリシー（認証なしで一旦全て許可）
CREATE POLICY "Enable read access for all users" ON applications
  FOR SELECT USING (true);

-- 申込フォームからの挿入を許可
CREATE POLICY "Enable insert for all users" ON applications
  FOR INSERT WITH CHECK (true);

-- 更新日時の自動更新トリガー
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_applications_updated_at BEFORE UPDATE
  ON applications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- インデックスの作成（検索パフォーマンス向上）
CREATE INDEX idx_applications_email ON applications(email);
CREATE INDEX idx_applications_created_at ON applications(created_at DESC);
```

## 3. 環境変数の設定

1. Supabase Dashboardで「Settings」→「API」を開く
2. 以下の値をコピー：
   - `URL`: プロジェクトのURL
   - `anon public`: 公開APIキー

3. `.env.local`に追加：
```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## 4. Vercelへの環境変数追加

1. Vercel Dashboardで「Settings」→「Environment Variables」
2. 以下を追加：
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 5. 管理画面の認証設定（オプション）

より安全な管理画面にするため、Supabase Authを使用：

```sql
-- 管理者テーブル（必要に応じて）
CREATE TABLE admins (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 管理者のみ申込データの更新・削除を許可
CREATE POLICY "Enable update for admin users" ON applications
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM admins WHERE id = auth.uid()
    )
  );

CREATE POLICY "Enable delete for admin users" ON applications
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM admins WHERE id = auth.uid()
    )
  );
```

## データ移行

既存のLocalStorageデータをSupabaseに移行する場合：

1. 管理画面から「データ移行」機能を使用（実装予定）
2. または、CSV出力→Supabase Dashboardでインポート

## トラブルシューティング

### 接続エラーの場合
- 環境変数が正しく設定されているか確認
- Supabaseプロジェクトが稼働しているか確認

### データが保存されない場合
- RLSポリシーを確認
- ブラウザのコンソールでエラーを確認