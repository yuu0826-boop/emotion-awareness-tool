# 快速開始指南 - 5分鐘部署完成

## 🚀 最快速方法（推薦給不熟悉技術的使用者）

### 準備工作（2分鐘）
1. 註冊 Vercel 帳號
   - 前往：https://vercel.com
   - 點擊「Sign Up」
   - 用 Google 或 GitHub 帳號註冊（免費）

2. 下載並解壓縮專案檔案
   - 解壓縮 `emotion-tool-vercel.zip`
   - 得到 `emotion-tool-vercel` 資料夾

### 部署步驟（3分鐘）

#### 選項 A：直接拖曳上傳（最簡單）
1. 登入 https://vercel.com
2. 將整個 `emotion-tool-vercel` 資料夾**直接拖曳**到 Vercel 網站
3. 等待部署完成（約1-2分鐘）
4. 完成！獲得你的網址

#### 選項 B：透過 GitHub（推薦，方便日後更新）
1. 登入 https://github.com
2. 創建新 Repository（名稱：emotion-awareness-tool）
3. 上傳 `emotion-tool-vercel` 資料夾內的所有檔案
4. 回到 Vercel，選擇「Import Git Repository」
5. 選擇剛才的 Repository
6. 點擊「Deploy」
7. 完成！

---

## 📋 檔案清單確認

確認你的資料夾包含這些檔案：

```
emotion-tool-vercel/
├── 📄 package.json          (套件設定)
├── 📄 vite.config.js        (建置工具設定)
├── 📄 tailwind.config.js    (樣式設定)
├── 📄 postcss.config.js     (CSS 處理設定)
├── 📄 index.html            (網頁入口)
├── 📄 .gitignore            (Git 忽略清單)
├── 📄 README.md             (專案說明)
├── 📄 DEPLOY.md             (詳細部署教學)
└── 📁 src/
    ├── 📄 main.jsx          (React 入口)
    ├── 📄 index.css         (全域樣式)
    └── 📄 App.jsx           (主程式)
```

---

## ✅ 部署成功後

你會獲得一個網址，例如：
```
https://emotion-awareness-tool.vercel.app
```

### 你可以：
- ✨ 直接分享這個網址給任何人使用
- 📱 在手機、平板、電腦上使用
- 🔒 資料儲存在使用者的瀏覽器（隱私安全）
- 🆓 完全免費使用

### 自訂網址（選用）
1. 在 Vercel Dashboard 點擊你的專案
2. Settings → Domains
3. 可以改成你喜歡的子網域，例如：
   - `emotion-tool.vercel.app`
   - `劉心理師-情緒工具.vercel.app`

---

## 🔄 如何更新內容

### 方法 1：如果用 GitHub
1. 修改檔案
2. 上傳到 GitHub
3. Vercel 會自動重新部署（約1分鐘）

### 方法 2：如果直接上傳
1. 修改檔案
2. 重新拖曳到 Vercel
3. 覆蓋舊版本

---

## 💡 小技巧

### 測試本地版本（選用）
如果你想在部署前先在電腦測試：

```bash
# 1. 安裝 Node.js (https://nodejs.org)

# 2. 進入專案資料夾
cd emotion-tool-vercel

# 3. 安裝套件
npm install

# 4. 啟動測試伺服器
npm run dev

# 5. 開啟瀏覽器訪問 http://localhost:5173
```

---

## ❓ 常見問題快速解答

**Q: 需要付費嗎？**
A: 不需要！個人使用完全免費。

**Q: 使用者需要帳號嗎？**
A: 不需要！任何人開啟網址就能直接使用。

**Q: 資料會上傳到雲端嗎？**
A: 不會！所有資料儲存在使用者自己的瀏覽器。

**Q: 可以在手機使用嗎？**
A: 可以！網站會自動適應手機螢幕。

**Q: 部署失敗怎麼辦？**
A: 
1. 檢查所有檔案都已上傳
2. 查看 Vercel 的 Build Logs（錯誤訊息）
3. 確認 package.json 格式正確

---

## 📞 需要詳細教學？

請查看 `DEPLOY.md` 檔案，裡面有：
- 圖文並茂的詳細步驟
- 三種不同部署方法
- 完整的疑難排解

---

**準備好了嗎？開始部署吧！** 🚀

只需要 5 分鐘，你就能擁有自己的情緒覺察工具網站！
