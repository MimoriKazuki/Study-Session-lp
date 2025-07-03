# Vercelデプロイ手順

## 1. Vercelアカウントの準備

1. [Vercel](https://vercel.com)にアクセス
2. GitHubアカウントでサインイン

## 2. プロジェクトのインポート

### 方法A: Vercel CLIを使用（推奨）

```bash
# Vercel CLIをインストール
npm i -g vercel

# プロジェクトディレクトリで実行
vercel

# プロンプトに従って設定
# - Set up and deploy: Y
# - Which scope: 個人アカウントを選択
# - Link to existing project?: N
# - Project name: study-session-lp（または任意の名前）
# - In which directory is your code located?: ./
# - Override settings?: N
```

### 方法B: Vercelダッシュボードから

1. [Vercel Dashboard](https://vercel.com/dashboard)にアクセス
2. 「New Project」をクリック
3. GitHubリポジトリ「MimoriKazuki/Study-Session-lp」をインポート
4. 設定はデフォルトのままでOK
5. 「Deploy」をクリック

## 3. 環境変数の設定

デプロイ後、以下の手順で環境変数を設定：

1. Vercelダッシュボードでプロジェクトを選択
2. 「Settings」→「Environment Variables」
3. 以下を追加：
   - Name: `NEXT_PUBLIC_SLACK_WEBHOOK_URL`
   - Value: Slackのwebhook URL
   - Environment: Production, Preview, Development

## 4. カスタムドメイン（オプション）

1. 「Settings」→「Domains」
2. カスタムドメインを追加
3. DNSレコードを設定

## デプロイ後のURL

- 本番環境: `https://[プロジェクト名].vercel.app`
- 例: `https://study-session-lp.vercel.app`

## 自動デプロイ

GitHubにプッシュすると自動的にデプロイされます：
- `main`ブランチ → 本番環境
- その他のブランチ → プレビュー環境

## トラブルシューティング

### ビルドエラーの場合
1. ローカルで`npm run build`が成功するか確認
2. Node.jsバージョンを確認（18.x以上推奨）

### 環境変数が反映されない場合
1. 環境変数設定後、再デプロイを実行
2. `NEXT_PUBLIC_`プレフィックスを確認