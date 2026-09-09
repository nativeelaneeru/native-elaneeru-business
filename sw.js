const CACHE='native-elaneeru-business-v1.3.0';
const SHELL=['./','./index.html','./app-v130.js','./manifest.webmanifest','./icons/native-elaneeru.svg'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(SHELL)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
function updateCache(request,key){return fetch(request,{cache:'no-store'}).then(r=>{if(r&&r.ok){const copy=r.clone();caches.open(CACHE).then(c=>c.put(key||request,copy)).catch(()=>{})}return r})}
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  const url=new URL(event.request.url);
  if(url.origin!==self.location.origin)return;
  if(event.request.mode==='navigate'){
    event.respondWith(caches.match('./index.html').then(hit=>{const fresh=updateCache(event.request,'./index.html').catch(()=>null);return hit||fresh.then(r=>r||Response.error())}));
    return;
  }
  event.respondWith(caches.match(event.request,{ignoreSearch:true}).then(hit=>{const fresh=updateCache(event.request).catch(()=>null);return hit||fresh.then(r=>r||Response.error())}));
});
self.addEventListener('message',event=>{if(event.data==='SKIP_WAITING')self.skipWaiting()});
