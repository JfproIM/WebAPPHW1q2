// 響應式圖片畫廊 JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // 獲取所有圖片元素
    const images = document.querySelectorAll('.gallery-item img');
    
    // 圖片載入處理
    images.forEach((img, index) => {
        // 當圖片載入完成時
        img.addEventListener('load', function() {
            this.classList.add('loaded');
            console.log(`圖片 ${index + 1} 載入完成`);
        });
        
        // 當圖片載入失敗時
        img.addEventListener('error', function() {
            console.error(`圖片 ${index + 1} 載入失敗:`, this.src);
            // 可以添加錯誤處理，例如顯示預設圖片
            this.alt = '圖片載入失敗';
        });
    });
    
    // 視窗大小改變時的處理
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            updateLayoutInfo();
        }, 250);
    });
    
    // 更新佈局資訊
    function updateLayoutInfo() {
        const width = window.innerWidth;
        let layoutInfo = '';
        
        if (width > 768) {
            layoutInfo = '桌面版佈局：2列3欄';
        } else if (width >= 481 && width <= 768) {
            layoutInfo = '平板版佈局：3列2欄';
        } else {
            layoutInfo = '手機版佈局：6列1欄';
        }
        
        console.log(`當前螢幕寬度: ${width}px, ${layoutInfo}`);
    }
    
    // 初始化佈局資訊
    updateLayoutInfo();
    
    // 圖片點擊放大功能
    images.forEach((img, index) => {
        img.addEventListener('click', function() {
            createLightbox(this, index);
        });
    });
    
    // 建立燈箱效果
    function createLightbox(img, index) {
        // 建立燈箱容器
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <span class="lightbox-close">&times;</span>
                <img src="${img.src}" alt="${img.alt}">
                <div class="lightbox-nav">
                    <button class="lightbox-prev" ${index === 0 ? 'disabled' : ''}>❮</button>
                    <span class="lightbox-counter">${index + 1} / ${images.length}</span>
                    <button class="lightbox-next" ${index === images.length - 1 ? 'disabled' : ''}>❯</button>
                </div>
            </div>
        `;
        
        // 添加燈箱樣式
        const lightboxStyles = `
            .lightbox {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.9);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            .lightbox.show {
                opacity: 1;
            }
            
            .lightbox-content {
                position: relative;
                max-width: 90%;
                max-height: 90%;
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            
            .lightbox img {
                max-width: 100%;
                max-height: 80vh;
                object-fit: contain;
                border-radius: 8px;
            }
            
            .lightbox-close {
                position: absolute;
                top: -40px;
                right: 0;
                color: white;
                font-size: 30px;
                cursor: pointer;
                user-select: none;
            }
            
            .lightbox-nav {
                display: flex;
                align-items: center;
                gap: 20px;
                margin-top: 20px;
            }
            
            .lightbox-prev,
            .lightbox-next {
                background: rgba(255, 255, 255, 0.2);
                border: none;
                color: white;
                font-size: 20px;
                padding: 10px 15px;
                border-radius: 5px;
                cursor: pointer;
                transition: background-color 0.3s ease;
            }
            
            .lightbox-prev:hover:not(:disabled),
            .lightbox-next:hover:not(:disabled) {
                background: rgba(255, 255, 255, 0.3);
            }
            
            .lightbox-prev:disabled,
            .lightbox-next:disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }
            
            .lightbox-counter {
                color: white;
                font-size: 16px;
            }
            
            @media (max-width: 480px) {
                .lightbox-nav {
                    gap: 10px;
                }
                
                .lightbox-prev,
                .lightbox-next {
                    padding: 8px 12px;
                    font-size: 16px;
                }
                
                .lightbox-counter {
                    font-size: 14px;
                }
            }
        `;
        
        // 添加樣式到頁面
        if (!document.getElementById('lightbox-styles')) {
            const style = document.createElement('style');
            style.id = 'lightbox-styles';
            style.textContent = lightboxStyles;
            document.head.appendChild(style);
        }
        
        // 添加到頁面
        document.body.appendChild(lightbox);
        
        // 顯示燈箱
        setTimeout(() => {
            lightbox.classList.add('show');
        }, 10);
        
        // 關閉燈箱
        function closeLightbox() {
            lightbox.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(lightbox);
            }, 300);
        }
        
        // 事件監聽器
        lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
        
        // 鍵盤事件
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft' && index > 0) {
                closeLightbox();
                setTimeout(() => {
                    images[index - 1].click();
                }, 300);
            } else if (e.key === 'ArrowRight' && index < images.length - 1) {
                closeLightbox();
                setTimeout(() => {
                    images[index + 1].click();
                }, 300);
            }
        });
        
        // 上一張/下一張按鈕
        const prevBtn = lightbox.querySelector('.lightbox-prev');
        const nextBtn = lightbox.querySelector('.lightbox-next');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                if (index > 0) {
                    closeLightbox();
                    setTimeout(() => {
                        images[index - 1].click();
                    }, 300);
                }
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                if (index < images.length - 1) {
                    closeLightbox();
                    setTimeout(() => {
                        images[index + 1].click();
                    }, 300);
                }
            });
        }
    }
    
    // 預載入圖片
    function preloadImages() {
        images.forEach(img => {
            if (img.complete) {
                img.classList.add('loaded');
            }
        });
    }
    
    // 初始化預載入
    preloadImages();
    
    console.log('響應式圖片畫廊已初始化');
});