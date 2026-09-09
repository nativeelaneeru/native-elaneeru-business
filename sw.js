const CACHE='native-elaneeru-business-v1.0.0';
const SHELL=['./','./index.html','./config.js','./manifest.webmanifest','./icons/native-elaneeru.svg'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(SHELL)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
function networkFirst(request){return fetch(request,{cache:'no-store'}).then(r=>{if(r&&r.ok){const copy=r.clone();caches.open(CACHE).then(c=>c.put(request,copy)).catch(()=>{})}return r}).catch(()=>caches.match(request))}
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  const url=new URL(event.request.url);
  if(url.origin!==self.location.origin)return;
  if(event.request.mode==='navigate'){event.respondWith(networkFirst(event.request).catch(()=>caches.match('./index.html')));return}
  if(url.pathname.endsWith('/config.js')){event.respondWith(networkFirst(event.request));return}
  event.respondWith(caches.match(event.request).then(hit=>hit||networkFirst(event.request)));
});
self.addEventListener('message',event=>{if(event.data==='SKIP_WAITING')self.skipWaiting()});
