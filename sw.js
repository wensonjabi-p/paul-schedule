const CACHE_NAME = 'pb-schedule-v8';
const ASSETS = ['./', './index.html', './manifest.json'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((c) => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => { if (k !== CACHE_NAME) return caches.delete(k); }))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  // GET 요청만 처리 (POST 등 API 호출은 서비스워커를 거치지 않고 바로 네트워크로)
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  // 외부 도메인(API 등)은 캐시하지 않음
  if (url.origin !== self.location.origin) return;

  // HTML은 네트워크 우선(최신 버전 보장), 실패 시 캐시
  if (e.request.mode === 'navigate' || url.pathname.endsWith('index.html') || url.pathname.endsWith('/')) {
    e.respondWith(
      fetch(e.request).then((res) => {
        const clone = res.clone();
        caches.open(CACHE_NAME).then((c) => c.put(e.request, clone));
        return res;
      }).catch(() => caches.match(e.request).then((r) => r || caches.match('./index.html')))
    );
    return;
  }

  // 기타 정적 자산은 캐시 우선
  e.respondWith(
    caches.match(e.request).then((r) => {
      return r || fetch(e.request).then((res) => {
        return caches.open(CACHE_NAME).then((c) => {
          c.put(e.request, res.clone());
          return res;
        });
      });
    })
  );
});

self.addEventListener('push', (e) => {
  const data = e.data ? e.data.json() : {};
  e.waitUntil(
    self.registration.showNotification(data.title || 'Paul Bhang', {
      body: data.body || '수업이 곧 시작합니다!',
      icon: './icon-192.png',
      badge: './icon-192.png',
      tag: data.tag || 'pb-schedule',
      requireInteraction: true,
    })
  );
});

self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  e.waitUntil(clients.openWindow('./'));
});
