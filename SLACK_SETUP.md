# Slack連携の設定方法

## 概要
申し込みフォームから送信されたデータをSlackに通知する機能の設定方法です。

## 設定手順

### 1. Slack Incoming Webhookの設定

1. Slackワークスペースにログイン
2. [Slack App Directory](https://slack.com/apps/A0F7XDUAZ-incoming-webhooks)にアクセス
3. 「Add to Slack」をクリック
4. 通知を送信したいチャンネルを選択
5. 「Add Incoming WebHooks integration」をクリック
6. Webhook URLをコピー

### 2. 環境変数の設定

1. `.env.local.example`を`.env.local`にコピー:
   ```bash
   cp .env.local.example .env.local
   ```

2. `.env.local`ファイルを開き、Webhook URLを設定:
   ```
   NEXT_PUBLIC_SLACK_WEBHOOK_URL=https://hooks.slack.com/services/XXXXXXXXX/XXXXXXXXX/XXXXXXXXXXXXXXXXXXXXXXXX
   ```

3. 開発サーバーを再起動:
   ```bash
   npm run dev
   ```

## 通知内容

申し込みがあると、以下の情報がSlackに通知されます：

- 参加者名
- 学年
- 参加人数
- 保護者名（任意）
- 電話番号
- メールアドレス
- 備考（任意）

## 注意事項

- `.env.local`ファイルは絶対にGitにコミットしないでください
- Webhook URLは外部に公開しないよう注意してください
- 本番環境では、Vercelなどのホスティングサービスの環境変数設定を使用してください

## トラブルシューティング

### 通知が届かない場合

1. Webhook URLが正しく設定されているか確認
2. ブラウザの開発者ツールでエラーが出ていないか確認
3. Slackのチャンネルで通知が有効になっているか確認