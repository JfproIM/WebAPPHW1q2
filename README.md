# 響應式圖片畫廊 - 作業一第二題

## 專案概述

這是一個響應式圖片畫廊，能夠根據不同螢幕尺寸自動調整圖片排列方式。專案使用純HTML、CSS和JavaScript實現，無需任何外部框架。

## 檔案結構

```
Q2/
├── index.html          # 主HTML檔案
├── style.css           # CSS樣式檔案
├── script.js           # JavaScript功能檔案
├── README.md           # 說明檔案
└── image/              # 圖片資料夾
    ├── DSC07980.jpg
    ├── DSC07982.jpg
    ├── DSC07983.jpg
    ├── DSC07989.jpg
    ├── DSC07990.jpg
    └── DSC07995.jpg
```

## 響應式佈局設計

### 桌面版 (769px 以上)
- **佈局**: 2列3欄 (2×3 grid)
- **圖片比例**: 正方形 (1:1)
- **標題字體**: 3rem

### 平板版 (481px - 768px)
- **佈局**: 3列2欄 (3×2 grid)
- **圖片比例**: 正方形 (1:1)
- **標題字體**: 2rem

### 手機版 (480px 以下)
- **佈局**: 6列1欄 (6×1 grid)
- **圖片比例**: 16:9 (橫向矩形)
- **標題字體**: 1.5rem

## 功能特色

### 基本功能
- ✅ 響應式設計，自動適應不同螢幕尺寸
- ✅ 圖片重新排列（非縮放）
- ✅ 優雅的載入動畫
- ✅ 圖片懸停效果

### 進階功能
- ✅ 圖片點擊放大（燈箱效果）
- ✅ 鍵盤導航（左右箭頭、ESC鍵）
- ✅ 圖片載入狀態指示
- ✅ 載入失敗處理
- ✅ 觸控設備支援

## 技術實現

### CSS Grid 佈局
使用CSS Grid實現響應式佈局：
```css
/* 桌面版 - 2列3欄 */
@media screen and (min-width: 769px) {
    .gallery {
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(3, 1fr);
    }
}

/* 平板版 - 3列2欄 */
@media screen and (min-width: 481px) and (max-width: 768px) {
    .gallery {
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(2, 1fr);
    }
}

/* 手機版 - 6列1欄 */
@media screen and (max-width: 480px) {
    .gallery {
        grid-template-columns: 1fr;
        grid-template-rows: repeat(6, 1fr);
    }
}
```

### JavaScript 功能
- **圖片載入管理**: 監聽載入狀態，提供視覺回饋
- **燈箱效果**: 點擊圖片放大檢視
- **鍵盤導航**: 支援左右箭頭切換圖片
- **響應式監聽**: 即時更新佈局資訊

## 瀏覽器相容性

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ 行動瀏覽器

## 使用方式

1. 直接在瀏覽器中開啟 `index.html`
2. 調整瀏覽器視窗大小測試響應式效果
3. 點擊圖片查看放大效果
4. 使用鍵盤左右箭頭導航

## 開發說明

### 添加新圖片
1. 將圖片放入 `image/` 資料夾
2. 在 `index.html` 中添加對應的 `<div class="gallery-item">` 元素
3. 更新CSS中的 `grid-template-rows` 數量（如需要）

### 修改佈局
在 `style.css` 中調整對應媒體查詢的 `grid-template-columns` 和 `grid-template-rows` 屬性。

### 自訂樣式
- 修改 `.gallery-item` 類別調整圖片容器樣式
- 修改 `.gallery-item:hover` 調整懸停效果
- 修改 `h1` 類別調整標題樣式

## 效能優化

- 使用 `loading="lazy"` 延遲載入圖片
- CSS動畫使用 `transform` 而非位置屬性
- 圖片使用 `object-fit: cover` 保持比例
- JavaScript事件使用防抖動處理

## 注意事項

1. 確保所有圖片檔案存在於 `image/` 資料夾中
2. 圖片檔案名稱必須與HTML中的路徑一致
3. 建議圖片檔案大小適中以確保載入速度
4. 在不同裝置上測試響應式效果

## 更新日誌

### v1.0.0 (2024-01-XX)
- 初始版本發布
- 實現基本響應式佈局
- 添加燈箱效果
- 支援鍵盤導航

---

**作者**: 學生  
**課程**: WebAPP開發  
**作業**: 作業一第二題