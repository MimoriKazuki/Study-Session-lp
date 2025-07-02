# 画像設定ガイド

## 三森一輝の写真を追加する方法

### 1. 画像ファイルの準備

1. 画像ファイル（例: `mimori.jpg`）を用意
2. 推奨サイズ: 500x500px以上の正方形
3. 推奨フォーマット: JPG, PNG, WebP

### 2. 画像ファイルの配置

```bash
# publicフォルダに画像を配置
cp [画像ファイルのパス] public/mimori.jpg
```

### 3. コンポーネントの更新

`components/InstructorSection.tsx`の22-24行目のコメントを解除し、以下のように修正:

```tsx
{/* 変更前 */}
{/* <img src="/mimori.jpg" alt="三森一輝" className="w-full h-full object-cover" /> */}
<div className="text-8xl">👨‍💼</div>

{/* 変更後 */}
<img src="/mimori.jpg" alt="三森一輝" className="w-full h-full object-cover" />
{/* <div className="text-8xl">👨‍💼</div> */}
```

### 4. 確認

ブラウザで http://localhost:3000 にアクセスし、講師紹介セクションで画像が表示されることを確認してください。

## 注意事項

- 画像は`public`フォルダに配置する必要があります
- パスは`/`から始まる絶対パスで指定します（`public`は省略）
- 画像が大きすぎる場合は、事前に圧縮することをお勧めします