(function(){
  if(window.NEL_B2B_UI_V122)return;window.NEL_B2B_UI_V122=true;
  function $(id){return document.getElementById(id)}
  function addCss(){
    if($('nel122css'))return;
    var s=document.createElement('style');s.id='nel122css';s.textContent='\
      #nelMenuWrap{display:none!important}.actions{display:none!important}.nel122-menuBtn{border:1px solid #ffffff42;background:#ffffff17;color:#fff;border-radius:11px;padding:9px 11px;font-weight:900;font-size:11px;white-space:nowrap}.nel122-sheet{position:fixed;inset:0;background:#0007;z-index:180;display:none;align-items:flex-end}.nel122-sheet.show{display:flex}.nel122-box{width:100%;max-width:520px;margin:auto;background:#fff;border-radius:24px 24px 0 0;padding:12px 14px calc(20px + env(safe-area-inset-bottom));box-shadow:0 -20px 50px #0002}.nel122-grab{width:44px;height:4px;background:#d7dde1;border-radius:99px;margin:2px auto 12px}.nel122-title{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px}.nel122-title b{font-size:18px;color:#123a5a}.nel122-close{border:0;background:#edf3f6;color:#123a5a;border-radius:10px;padding:8px 11px;font-weight:900}.nel122-item{width:100%;border:1px solid #dbe4ea;background:#fff;border-radius:14px;padding:13px 14px;margin-top:8px;text-align:left;color:#172634;font-weight:850;display:flex;align-items:center;justify-content:space-between}.nel122-item span{font-size:17px}.nel122-item.danger{color:#b42318}.nel122-sub{font-size:10px;color:#6b7883;font-weight:600;margin-top:2px}.nel122-hidden{display:none!important}';document.head.appendChild(s);
  }
  function scrubCredit(){
    document.querySelectorAll('.metric').forEach(function(el){var t=(el.textContent||'').toLowerCase();if(t.includes('credit')||t.includes('outstanding'))el.remove()});
    document.querySelectorAll('#hero .credit,#profile .credit').forEach(function(el){var txt=(el.textContent||'').toLowerCase();if(txt.includes('credit')||txt.includes('outstanding')){
      Array.from(el.querySelectorAll('.metric')).forEach(function(m){var t=(m.textContent||'').toLowerCase();if(t.includes('credit')||t.includes('outstanding'))m.remove()});
      if(!el.querySelector('.metric'))el.remove();
    });
    document.querySelectorAll('option').forEach(function(o){if((o.textContent||'').toLowerCase().includes('credit'))o.remove()});
  }
  function ensureMenu(){
    var topin=document.querySelector('header.top .topin');if(!topin)return;
    var old=$('nel122MenuBtn');if(!old){
      var btn=document.createElement('button');btn.id='nel122MenuBtn';btn.className='nel122-menuBtn hidden';btn.textContent='☰ Menu';btn.onclick=function(){var sh=$('nel122Sheet');if(sh)sh.classList.add('show')};topin.appendChild(btn);
    }
    if(!$('nel122Sheet')){
      var sh=document.createElement('div');sh.id='nel122Sheet';sh.className='nel122-sheet';sh.innerHTML='<div class="nel122-box"><div class="nel122-grab"></div><div class="nel122-title"><b>Business Menu</b><button class="nel122-close" id="nel122Close">Close</button></div><button class="nel122-item" id="nel122Legal">FSSAI / Legal <span>›</span></button><a class="nel122-item" id="nel122Support" style="text-decoration:none" href="tel:'+String((window.NEL_B2B_CONFIG&&window.NEL_B2B_CONFIG.supportPhone)||'7411807675')+'">Support <span>☎</span></a><button class="nel122-item" id="nel122Install">Install App <span>⇩</span></button><button class="nel122-item danger" id="nel122Logout">Logout <span>↪</span></button></div>';
      document.body.appendChild(sh);
      $('nel122Close').onclick=function(){sh.classList.remove('show')};sh.onclick=function(e){if(e.target===sh)sh.classList.remove('show')};
      $('nel122Legal').onclick=function(){sh.classList.remove('show');var b=$('legalBtn');if(b)b.click()};
      $('nel122Install').onclick=function(){sh.classList.remove('show');var b=$('installBtn');if(b)b.click()};
      $('nel122Logout').onclick=function(){sh.classList.remove('show');var b=$('logoutBtn');if(b)b.click()};
    }
  }
  function sync(){
    addCss();ensureMenu();scrubCredit();
    var logged=!!($('app')&&!$('app').classList.contains('hidden'));
    var btn=$('nel122MenuBtn');if(btn)btn.classList.toggle('hidden',!logged);
    ['legalBtn','installBtn','logoutBtn'].forEach(function(id){var x=$(id);if(x)x.classList.add('nel122-hidden')});
  }
  window.addEventListener('load',function(){sync();[100,350,900,1800].forEach(function(ms){setTimeout(sync,ms)});var mo=new MutationObserver(function(){sync()});mo.observe(document.body,{subtree:true,childList:true,characterData:true})},{once:true});
})();
