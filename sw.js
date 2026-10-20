// 旧アドレス(github.io)用: 古い Service Worker を置き換えて自分自身を解除し、キャッシュを消して新アドレスへ移す
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      // キャッシュは同じドメインの他アプリと共有なので、旧コエリフト(このスコープ)の分だけ消す
      const scope = self.registration.scope;
      for (const k of await caches.keys()) if (k.includes(scope)) await caches.delete(k);
      await self.registration.unregister();
      const clients = await self.clients.matchAll({ type: 'window' });
      for (const c of clients) c.navigate('https://koelift.pages.dev/');
    })(),
  );
});
