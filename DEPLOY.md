# Vercel 部署教學

## 方法一：透過 Vercel 網站部署（最簡單，推薦）

### 步驟 1: 註冊 Vercel 帳號
1. 前往 https://vercel.com
2. 點擊右上角 "Sign Up"
3. 選擇用 GitHub、GitLab 或 Email 註冊（建議用 GitHub）
4. 完成註冊流程

### 步驟 2: 準備專案檔案
1. 下載整個 `emotion-tool-vercel` 資料夾
2. 確認資料夾內有以下檔案：
   ```
   emotion-tool-vercel/
   ├── package.json
   ├── vite.config.js
   ├── tailwind.config.js
   ├── postcss.config.js
   ├── index.html
   ├── .gitignore
   ├── README.md
   └── src/
       ├── main.jsx
       ├── index.css
       └── App.jsx
   ```

### 步驟 3: 上傳到 GitHub（推薦）

#### 3-1. 安裝 Git（如果還沒有）
- Windows: 下載 https://git-scm.com/download/win
- Mac: 終端機執行 `git --version`（會自動安裝）

#### 3-2. 創建 GitHub Repository
1. 登入 https://github.com
2. 點擊右上角 "+" → "New repository"
3. Repository name: `emotion-awareness-tool`
4. 選擇 "Public" 或 "Private"
5. **不要** 勾選 "Add a README file"
6. 點擊 "Create repository"

#### 3-3. 上傳專案到 GitHub
打開終端機（Terminal/命令提示字元），執行：

```bash
# 進入專案資料夾
cd emotion-tool-vercel

# 初始化 Git
git init

# 加入所有檔案
git add .

# 提交
git commit -m "Initial commit"

# 連結到 GitHub（替換成你的 GitHub 用戶名）
git remote add origin https://github.com/你的用戶名/emotion-awareness-tool.git

# 推送到 GitHub
git branch -M main
git push -u origin main
```

### 步驟 4: 在 Vercel 部署

1. 登入 https://vercel.com
2. 點擊 "Add New..." → "Project"
3. 選擇 "Import Git Repository"
4. 找到你剛才創建的 `emotion-awareness-tool` repository
5. 點擊 "Import"
6. 設定如下：
   - **Framework Preset**: Vite
   - **Root Directory**: ./
   - **Build Command**: `npm run build` (通常自動偵測)
   - **Output Directory**: `dist` (通常自動偵測)
7. 點擊 "Deploy"
8. 等待 2-3 分鐘，部署完成！

### 步驟 5: 獲得網址
部署完成後，你會看到：
```
🎉 Your project has been deployed!
https://emotion-awareness-tool.vercel.app
```

這就是你的工具網址！任何人都可以直接使用，不需要帳號。

---

## 方法二：使用 Vercel CLI（進階）

### 1. 安裝 Node.js
下載並安裝 https://nodejs.org （選擇 LTS 版本）

### 2. 安裝 Vercel CLI
```bash
npm install -g vercel
```

### 3. 登入 Vercel
```bash
vercel login
```

### 4. 部署
```bash
cd emotion-tool-vercel
vercel
```

跟隨指示完成部署即可。

---

## 方法三：直接上傳壓縮檔（最快速）

如果不想用 Git：

1. 將整個 `emotion-tool-vercel` 資料夾壓縮成 .zip
2. 登入 Vercel
3. 拖曳 .zip 檔到 Vercel 網站
4. 完成！

---

## 常見問題

### Q1: 部署後顯示錯誤
**A**: 檢查以下項目：
- 確認所有檔案都已上傳
- 確認 package.json 檔案格式正確
- 查看 Vercel 的 Build Logs 找出具體錯誤

### Q2: 如何更新網站內容？
**A**: 
- 如果用 GitHub: 修改程式碼後 push，Vercel 會自動重新部署
- 如果用 CLI: 執行 `vercel --prod`
- 如果直接上傳: 重新上傳新的壓縮檔

### Q3: 可以自訂網址嗎？
**A**: 可以！
1. 在 Vercel Dashboard 進入你的專案
2. 點擊 "Settings" → "Domains"
3. 可以設定 Vercel 的子網域或連結自己的網域

### Q4: 費用問題？
**A**: 
- 個人使用完全免費
- 每月流量配額很充足
- 超過配額才需要付費（一般個人用途不會超過）

### Q5: 資料儲存在哪裡？
**A**: 
- 使用者的資料儲存在他們自己的瀏覽器 localStorage
- 不會上傳到任何伺服器
- 隱私安全

---

## 需要協助？

如果遇到問題，可以：
1. 查看 Vercel 官方文件: https://vercel.com/docs
2. 查看專案的 Build Logs
3. 確認所有檔案都已正確上傳

---

祝您部署順利！🎉
