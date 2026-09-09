(function(){
  if(window.NEL_B2B_UI_V121)return;window.NEL_B2B_UI_V121=true;
  var seq=0;
  function api(){return String((window.NEL_B2B_CONFIG&&window.NEL_B2B_CONFIG.apiUrl)||'')}
  function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,function(m){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot',"'":'&#39;'}[m]})}
  function money(v){return '₹'+Number(v||0).toLocaleString('en-IN',{maximumFractionDigits:2})}
  function jsonpRpc(method,args){
    args=Array.isArray(args)?args:[];
    return new Promise(function(resolve,reject){
      var id='b2b121-'+Date.now()+'-'+(++seq),cb='__nelB2BJsonp'+Date.now()+seq+Math.floor(Math.random()*10000),script=document.createElement('script'),done=false,timer;
      function cleanup(){if(done)return;done=true;clearTimeout(timer);try{delete window[cb]}catch(e){window[cb]=undefined}try{script.remove()}catch(e){}}
      window[cb]=function(payload){cleanup();payload=payload||{};if(payload.ok)resolve(payload.result);else reject(new Error(payload.error||'Request failed.'))};
      script.async=true;script.onerror=function(){cleanup();reject(new Error('Unable to connect. Please check internet and retry.'))};
      var req={method:String(method||''),args:args,requestId:id};
      script.src=api()+'?jsonp=1&callback='+encodeURIComponent(cb)+'&payload='+encodeURIComponent(JSON.stringify(req))+'&v=1210&_='+Date.now();
      timer=setTimeout(function(){cleanup();reject(new Error('Connection timed out. Please retry.'))},18000);
      document.head.appendChild(script);
    });
  }
  function rateObj(){
    try{
      if(typeof DATA==='undefined'||!DATA)return null;
      if(Array.isArray(DATA.marketRates)&&DATA.marketRates.length)return DATA.marketRates[0];
      if(DATA.marketRate&&typeof DATA.marketRate==='object')return DATA.marketRate;
      if(DATA.market&&typeof DATA.market==='object')return DATA.market;
    }catch(e){}
    return null;
  }
  function comparable(rateUnit,productUnit){
    var r=String(rateUnit||'').toLowerCase().replace(/₹|rs\.?|rupees?|\s+/g,''),p=String(productUnit||'').toLowerCase().replace(/\s+/g,'');
    if(!r||!p)return false;
    if(/kg|quintal|ton|dozen|100|50|25/.test(r))return false;
    return /(pc|pcs|piece|pieces|no|nos|number|each)/.test(r)&&/(pc|pcs|piece|pieces|no|nos|each)/.test(p);
  }
  function marketValue(r){return Number((r&&(r.modalRate||r.maxRate||r.minRate))||0)}
  function addStyles(){
    if(document.getElementById('nel121css'))return;
    var s=document.createElement('style');s.id='nel121css';s.textContent='\
    .actions{display:none!important}.nel-menu-wrap{max-width:860px;margin:9px auto 0;border-top:1px solid #ffffff2b;padding-top:8px}.nel-menu{display:flex;gap:7px;overflow-x:auto;scrollbar-width:none}.nel-menu::-webkit-scrollbar{display:none}.nel-menu button,.nel-menu a{flex:0 0 auto;border:1px solid #ffffff38;background:#ffffff13;color:#fff;border-radius:10px;padding:8px 11px;font-size:10px;font-weight:900;text-decoration:none}.nel-location{font-size:10px!important;opacity:.92!important;margin-top:2px}.nel-banners{display:grid;grid-auto-flow:column;grid-auto-columns:min(88%,620px);gap:10px;overflow:auto;scroll-snap-type:x mandatory;scrollbar-width:none;margin:0 0 11px}.nel-banners::-webkit-scrollbar{display:none}.nel-banner{scroll-snap-align:start;min-height:132px;border-radius:20px;padding:17px;background:linear-gradient(135deg,#0b2a42,#0f7883);color:#fff;position:relative;overflow:hidden;box-shadow:0 12px 30px rgba(18,58,90,.14)}.nel-banner:nth-child(2n){background:linear-gradient(135deg,#175b62,#287f71)}.nel-banner b{display:block;font-size:21px;line-height:1.08;max-width:72%}.nel-banner small{display:block;margin-top:6px;max-width:72%;opacity:.9;line-height:1.35}.nel-banner em{display:inline-block;margin-top:10px;font-style:normal;font-size:10px;font-weight:900;padding:6px 8px;border-radius:8px;background:#ffffff25}.nel-banner img{position:absolute;right:5px;bottom:0;width:31%;height:100%;object-fit:contain}.nel-summary{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px}.nel-summary .metric{min-height:72px}.nel-market-card{border:1px solid #c9e0e4;background:linear-gradient(135deg,#eaf7f8,#f9fcfd);border-radius:13px;padding:9px 10px;margin-top:8px}.nel-market-card span{display:block;font-size:9px;color:#647781;text-transform:uppercase;font-weight:850}.nel-market-card b{display:block;font-size:15px;color:#0f7883;margin-top:2px}.nel-market-card small{display:block;color:#77858e;font-size:8px;margin-top:2px}.nel-no-credit-note{font-size:9px;color:#6b7883;margin-top:10px}.market{margin-bottom:11px}.market.empty{display:block}.market.empty .marketRate{text-align:left;font-size:14px;margin-top:5px;color:#6b7883}@media(max-width:430px){.nel-summary{grid-template-columns:1fr 1fr}.nel-banner{min-height:122px}.nel-menu button,.nel-menu a{padding:7px 9px}}';document.head.appendChild(s);
  }
  function setupHeader(){
    var header=document.querySelector('header.top'),topin=header&&header.querySelector('.topin'),brand=header&&header.querySelector('.brand');if(!header||!topin||!brand)return;
    var small=brand.querySelector('small');if(small){small.id='nelHeaderLocation';small.classList.add('nel-location');small.textContent='Wholesale ordering · Sri Govindadri Ventures'}
    if(!document.getElementById('nelMenuWrap')){
      var wrap=document.createElement('div');wrap.id='nelMenuWrap';wrap.className='nel-menu-wrap hidden';var bar=document.createElement('div');bar.className='nel-menu';bar.id='nelMenuBar';wrap.appendChild(bar);header.appendChild(wrap);
      ['legalBtn','installBtn','logoutBtn'].forEach(function(id){var x=document.getElementById(id);if(x){x.classList.remove('iconBtn');bar.appendChild(x)}});
      var support=document.createElement('a');support.id='nelSupportBtn';support.textContent='Support';support.href='tel:'+String((window.NEL_B2B_CONFIG&&window.NEL_B2B_CONFIG.supportPhone)||'7411807675');bar.insertBefore(support,document.getElementById('installBtn')||null);
    }
  }
  function showMenu(){var m=document.getElementById('nelMenuWrap');if(m)m.classList.remove('hidden');var install=document.getElementById('installBtn');if(install)install.classList.remove('hidden');var logoutBtn=document.getElementById('logoutBtn');if(logoutBtn)logoutBtn.classList.remove('hidden')}
  function hideMenu(){var m=document.getElementById('nelMenuWrap');if(m)m.classList.add('hidden')}
  function setHeaderLocation(v){var x=document.getElementById('nelHeaderLocation');if(!x)return;var loc=[v&&v.area].filter(Boolean).join(', ');x.textContent=loc?'📍 '+loc:'Wholesale ordering · Sri Govindadri Ventures'}
  function ensureBannerHost(){var home=document.getElementById('homeView'),hero=document.getElementById('hero');if(!home||!hero)return null;var host=document.getElementById('nelB2BBanners');if(!host){host=document.createElement('div');host.id='nelB2BBanners';host.className='nel-banners';home.insertBefore(host,hero)}return host}
  function renderBanners(){
    var host=ensureBannerHost();if(!host)return;var bs=[];try{bs=(DATA&&Array.isArray(DATA.banners))?DATA.banners:[]}catch(e){}
    if(!bs.length){host.innerHTML='<div class="nel-banner"><b>Fresh wholesale ordering</b><small>Reliable tender coconut supply for your business.</small><em>Native Elaneeru Business</em></div>';return}
    host.innerHTML=bs.map(function(b){return '<div class="nel-banner"><b>'+esc(b.title||'Native Elaneeru Business')+'</b><small>'+esc(b.subtitle||'')+'</small>'+(b.offerText?'<em>'+esc(b.offerText)+'</em>':'')+(b.imageUrl?'<img src="'+esc(b.imageUrl)+'" alt="">':'')+'</div>'}).join('');
  }
  function renderMarketAlways(){
    var host=document.getElementById('marketBox');if(!host)return;var r=rateObj();
    if(!r||!marketValue(r)){host.innerHTML='<div class="market empty"><div><small>MARKET PRICE</small><strong>Latest Tender Coconut benchmark</strong></div><div class="marketRate">Awaiting latest market update</div></div>';return}
    host.innerHTML='<div class="market"><div><small>LATEST MARKET PRICE</small><strong>'+esc(r.market||'Tender Coconut Market')+'</strong><small>'+esc([r.district,r.state,r.source,r.rateDate].filter(Boolean).join(' · '))+'</small></div><div class="marketRate">'+money(marketValue(r))+'<small>'+esc(r.rateUnit||'')+'</small></div></div>';
  }
  function card121(p){
    var q=0;try{q=(CART[p.productId]&&CART[p.productId].qty)||0}catch(e){}
    var standard=Number(p.standardPrice||p.price||0),your=Number(p.price||0),save=Math.max(0,Number(p.savingsPerUnit||standard-your)),pct=Number(p.savingsPercent||0),r=rateObj(),mv=marketValue(r),marketHtml='';
    if(r&&mv){
      if(comparable(r.rateUnit,p.unit)){
        var ms=Math.max(0,mv-your),mp=mv?Math.round(ms*1000/mv)/10:0;
        marketHtml='<div class="nel-market-card"><span>Market Price</span><b>'+money(mv)+' / '+esc(p.unit||'pc')+'</b><small>'+esc([r.market,r.source,r.rateDate].filter(Boolean).join(' · '))+'</small></div>'+(ms>0?'<span class="marketSave">'+money(ms)+' below market · '+mp+'%</span>':'');
      }else{
        marketHtml='<div class="nel-market-card"><span>Market Benchmark</span><b>'+money(mv)+' '+esc(r.rateUnit||'')+'</b><small>'+esc([r.market,r.source,r.rateDate].filter(Boolean).join(' · '))+'</small></div>';
      }
    }else marketHtml='<div class="nel-market-card"><span>Market Price</span><b>Awaiting latest update</b></div>';
    var visual=p.imageUrl?'<img src="'+esc(p.imageUrl)+'" alt="'+esc(p.productName)+'" onerror="this.remove();this.parentNode.textContent=\'🥥\'">':'🥥';
    return '<div class="product"><div class="visual">'+visual+'</div><div class="pname">'+esc(p.productName)+'</div>'+marketHtml+'<div class="standard">Standard Price '+money(standard)+' / '+esc(p.unit||'pc')+'</div><div class="your">Your Price '+money(your)+' / '+esc(p.unit||'pc')+'</div>'+(save>0?'<span class="save">You Save '+money(save)+' / '+esc(p.unit||'pc')+(pct?' · '+pct+'%':'')+'</span>':'')+'<div class="rules">MOQ '+Number(p.moq||1)+' · Order in steps of '+Number(p.qtyStep||1)+'</div><div class="qty"><input id="qty_'+esc(p.productId)+'" type="number" inputmode="numeric" min="'+Number(p.moq||1)+'" step="'+Number(p.qtyStep||1)+'" value="'+(q||Number(p.moq||1))+'"><button class="add" onclick="add(\''+String(p.productId||'').replace(/'/g,"\\'")+'\')">'+(q?'Update':'Add')+'</button></div></div>';
  }
  function renderCart121(){
    var xs=[];try{xs=Object.values(CART)}catch(e){}var subtotal=xs.reduce(function(a,x){return a+x.qty*Number(x.product.price||0)},0),qty=xs.reduce(function(a,x){return a+x.qty},0);
    var bar=document.getElementById('cartBar');if(bar)bar.classList.toggle('show',xs.length>0);if(document.getElementById('cartSummary'))document.getElementById('cartSummary').textContent=qty+' pcs';if(document.getElementById('cartAmount'))document.getElementById('cartAmount').textContent=money(subtotal);
    if(document.getElementById('cartItems'))document.getElementById('cartItems').innerHTML=xs.map(function(x){return '<div class="cartItem"><div><b>'+esc(x.product.productName)+'</b><div class="muted">'+x.qty+' × '+money(x.product.price)+'</div></div><div style="text-align:right"><b>'+money(x.qty*x.product.price)+'</b><br><button class="mini" onclick="removeItem(\''+esc(x.product.productId)+'\')">Remove</button></div></div>'}).join('');
    if(document.getElementById('subtotal'))document.getElementById('subtotal').textContent=money(subtotal);if(document.getElementById('total'))document.getElementById('total').textContent=money(subtotal);var pay=document.getElementById('payment');if(pay)pay.innerHTML='<option value="COD">Cash on Delivery</option>';
  }
  async function placeOrder121(){
    var items=[];try{items=Object.values(CART).map(function(x){return {productId:x.product.productId,quantity:x.qty}})}catch(e){}
    if(!items.length){if(typeof toast==='function')toast('Cart is empty');return}
    var btn=document.getElementById('placeBtn');if(btn){btn.disabled=true;btn.textContent='Placing…'}
    try{
      var v=(DATA&&DATA.vendor)||{},r=await jsonpRpc('placeB2BOrderV9',[TOKEN,{items:items,paymentType:'COD',deliverySlot:(document.getElementById('slot')||{}).value||'',deliveryAddress:v.address||v.area||'',area:v.area||'',deliveryCharge:0}]);
      CART={};if(typeof closeCart==='function')closeCart();if(typeof refresh==='function')await refresh();if(typeof showView==='function')showView('orders');if(typeof toast==='function')toast('Order placed · '+(r&&r.orderId?r.orderId:'Success'));
    }catch(e){if(typeof toast==='function')toast(e.message||'Order could not be placed. Please retry.')}
    finally{if(btn){btn.disabled=false;btn.textContent='Place Order'}}
  }
  function orderCard121(o){return '<div class="order"><div class="orderTop"><div><b>'+esc(o.orderId)+'</b> <span class="badge">'+esc(o.status||'')+'</span><div class="muted">'+esc(o.orderedAt||'')+'</div><div class="muted">'+(o.items||[]).map(function(i){return esc(i.productName)+' × '+Number(i.quantity||0)}).join(' · ')+'</div></div><b>'+money(o.amount)+'</b></div><div style="margin-top:8px"><button class="mini" onclick="invoice(\''+esc(o.orderId)+'\')">🧾 Invoice</button> <button class="mini" onclick="track(\''+esc(o.orderId)+'\')">📍 Track</button></div></div>'}
  function invoiceHtml121(d){var l=d.legal||{},rows=(d.items||[]).map(function(x,i){return '<tr><td>'+(i+1)+'</td><td>'+esc(x.productName)+'</td><td>'+esc(x.hsn)+'</td><td>'+x.qty+'</td><td>'+money(x.rate)+'</td><td>'+money(x.lineAmount)+'</td></tr>'}).join('');return '<!doctype html><html><head><meta charset="utf-8"><title>'+esc(d.invoiceNo)+'</title><style>body{font-family:Arial,sans-serif;margin:28px;color:#172634}.brand{font-size:24px;font-weight:900;color:#123a5a}.muted{color:#687683;font-size:12px}table{width:100%;border-collapse:collapse;margin-top:18px}th,td{padding:9px;border-bottom:1px solid #dde5ea;font-size:12px;text-align:left}.right{text-align:right}.total{font-size:18px;font-weight:900}@media print{button{display:none}body{margin:12mm}}</style></head><body><div class="brand">Native Elaneeru</div><b>'+esc(l.legalName||'Sri Govindadri Ventures')+'</b><div class="muted">'+esc(l.businessAddress||'')+'</div><h2>'+esc(d.documentType||'Commercial Invoice / Receipt')+'</h2><div class="muted">Invoice '+esc(d.invoiceNo)+' · '+esc(d.invoiceDate)+'<br>Order '+esc(d.orderId)+'</div><p><b>'+esc(d.partyName)+'</b><br><span class="muted">'+esc(d.address)+' · '+esc(d.mobile)+'</span></p><table><tr><th>#</th><th>Product</th><th>HSN</th><th>Qty</th><th>Rate</th><th>Amount</th></tr>'+rows+'</table><p class="right total">Total '+money(d.total)+'</p><div class="muted">FSSAI: '+esc(l.fssaiNo||'Application Pending')+'<br>GST: '+esc(l.gstin||'Not registered')+'<br>Grievance Officer: '+esc(l.grievanceOfficer||'')+' · '+esc(l.grievanceEmail||'')+'<br>Customer care: '+esc(l.supportPhone||'')+'</div><button onclick="print()" style="margin-top:18px">Print / Save PDF</button></body></html>'}
  function patch(){
    addStyles();setupHeader();window.rpc=jsonpRpc;try{rpc=jsonpRpc}catch(e){}
    try{productCard=card121;window.productCard=card121}catch(e){}
    try{renderCart=renderCart121;window.renderCart=renderCart121}catch(e){}
    try{placeOrder=placeOrder121;window.placeOrder=placeOrder121}catch(e){}
    try{orderCard=orderCard121;window.orderCard=orderCard121}catch(e){}
    try{invoiceHtml=invoiceHtml121;window.invoiceHtml=invoiceHtml121}catch(e){}
    try{
      if(typeof render==='function'&&!render.__nel121){var baseRender=render,wrappedRender=function(){var out=baseRender.apply(this,arguments),v=(DATA&&DATA.vendor)||{},t=(DATA&&DATA.target)||null;setHeaderLocation(v);showMenu();renderBanners();renderMarketAlways();var hero=document.getElementById('hero');if(hero)hero.innerHTML='<h1>'+esc(v.businessName||'Business Account')+'</h1><div class="muted">'+esc(v.ownerName||'')+'</div><div class="nel-summary"><div class="metric"><span>Payment</span><b style="font-size:14px">Cash on Delivery</b></div><div class="metric"><span>Business Area</span><b style="font-size:14px">'+esc(v.area||'—')+'</b></div></div>'+(t?'<div class="target"><b>'+esc(t.name||'Business Target')+'</b><div class="muted">'+Number(t.achievedQty||0)+' / '+Number(t.targetQty||0)+' pcs · '+Number(t.percent||0)+'%</div><div class="progress"><span style="width:'+Math.min(100,Number(t.percent||0))+'%"></span></div>'+(t.rewardText?'<div class="muted" style="margin-top:5px">'+esc(t.rewardText)+'</div>':'')+'</div>':'');var products=document.getElementById('products');if(products)products.innerHTML=(DATA.products||[]).map(card121).join('')||'<div class="card">No live B2B products.</div>';var orders=document.getElementById('orders');if(orders)orders.innerHTML=(DATA.orders||[]).map(orderCard121).join('')||'<div class="muted">No orders yet.</div>';var profile=document.getElementById('profile');if(profile)profile.innerHTML='<b style="font-size:18px">'+esc(v.businessName||'')+'</b><div class="muted" style="margin-top:6px">'+esc(v.ownerName||'')+'<br>'+esc(v.mobile||'')+'<br>'+esc(v.address||'')+'</div><div class="metric" style="margin-top:12px"><span>Payment</span><b style="font-size:14px">Cash on Delivery</b></div><div class="muted" style="margin-top:11px">Support: '+esc((window.NEL_B2B_CONFIG&&window.NEL_B2B_CONFIG.supportPhone)||'')+' · WhatsApp: '+esc((window.NEL_B2B_CONFIG&&window.NEL_B2B_CONFIG.supportWhatsApp)||'')+'</div>';renderCart121();return out};wrappedRender.__nel121=true;render=wrappedRender;window.render=wrappedRender}
    }catch(e){}
    try{if(typeof logout==='function'&&!logout.__nel121){var baseLogout=logout,wl=function(){hideMenu();var x=document.getElementById('nelHeaderLocation');if(x)x.textContent='Wholesale ordering · Sri Govindadri Ventures';return baseLogout.apply(this,arguments)};wl.__nel121=true;logout=wl;window.logout=wl}}catch(e){}
    try{if(typeof login==='function'&&!login.__nel121){var baseLogin=login,wi=async function(){var r=await baseLogin.apply(this,arguments);if(typeof TOKEN!=='undefined'&&TOKEN)showMenu();return r};wi.__nel121=true;login=wi;window.login=wi;var lb=document.getElementById('loginBtn');if(lb)lb.onclick=wi}}catch(e){}
    if(typeof DATA!=='undefined'&&DATA){try{render()}catch(e){}}
  }
  window.addEventListener('load',function(){patch();setTimeout(patch,250);setTimeout(patch,900)},true);
})();
