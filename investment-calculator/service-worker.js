// 定義快取名稱和需要被快取的檔案列表
const CACHE_NAME = 'investment-calculator-cache-v1';
const urlsToCache = [
  '/', // 代表根目錄，對應到 index.html
  'index.html',
  'manifest.json',
  'icon-192.png',
  'icon-512.png',
  'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js' // 圖表庫也需要快取
];

// 監聽 'install' 事件，當 Service Worker 被安裝時觸發
self.addEventListener('install', event => {
  // 等待快取操作完成
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache); // 將所有指定檔案加入快取
      })
  );
});

// 監聽 'fetch' 事件，當頁面發出請求時觸發
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // 如果在快取中找到對應的回應，就直接回傳快取內容
        if (response) {
          return response;
        }
        // 如果快取中沒有，就透過網路發出請求
        return fetch(event.request);
      })
  );
});