/* SPEDAR expanded website — vanilla JavaScript, GitHub Pages compatible. */
(function () {
  'use strict';
  var doc = document;
  var lib = window.SPEDAR_LIBRARY || { categories: [], sectors: [] };
  var selected = [];
  var siteRoot = new URL('../../', document.currentScript.src).pathname;
  function localPage(page){return siteRoot+page;}
  function q(s,ctx){return (ctx||doc).querySelector(s);}
  function qa(s,ctx){return Array.prototype.slice.call((ctx||doc).querySelectorAll(s));}
  function el(t,cls,txt){var e=doc.createElement(t);if(cls)e.className=cls;if(txt!==undefined)e.textContent=txt;return e;}
  function esc(x){return String(x).replace(/[&<>"']/g,function(m){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m];});}
  function path(){return (window.location.pathname||'').split('/').pop()||'index.html';}
  function addNav(){
    var menu=q('#services-menu');
    if(menu){
      var block=q('.sp-pro-dropdown-links',menu);
      if(!block){
        block=el('div','sp-pro-dropdown-links');
        [['industry-esg.html','Environmental & ESG'],['service-directory.html','Complete Service Directory'],['sectors.html','Sectors & Applications'],['project-brief.html','Project Enquiry'],['faq.html','FAQs']].forEach(function(pair){var a=el('a',null,pair[1]);a.href=localPage(pair[0]);block.appendChild(a);});
        menu.appendChild(block);
      }
    }
    var columns=qa('.footer-col');
    columns.forEach(function(col){var h=q('h2',col);if(!h||h.textContent.trim().toLowerCase()!=='company')return;var ul=q('ul',col);if(!ul)return;
      [['industry-esg.html','Environmental & ESG services'],['service-directory.html','Complete service directory'],['sectors.html','Sectors & applications'],['project-brief.html','Project enquiry'],['collaborate.html','Careers & collaboration'],['faq.html','FAQs']].forEach(function(pair){if(q('a[href="'+pair[0]+'"]',ul))return;var li=el('li');var a=el('a',null,pair[1]);a.href=localPage(pair[0]);li.appendChild(a);ul.appendChild(li);});
    });
    if(path()==='services.html'){var main=q('main');var hero=main&&q('.page-hero',main);if(hero&&!q('.sp-pro-quickrail')){
      var band=el('div','sp-pro-quickrail');band.innerHTML='<div class="wrap sp-pro-quickrail__inner"><p><strong>Explore the expanded catalogue:</strong> '+countTotal()+' service topics across '+lib.categories.length+' disciplines</p><a href="service-directory.html">Open the searchable service directory ↗</a></div>';
      hero.insertAdjacentElement('afterend',band);
    }}
  }
  function countTotal(){return lib.categories.reduce(function(n,c){return n+c.items.length;},0);}
  function legacyServices(){
    if(path()!=='services.html'||q('.sp-legacy-directory')||!lib.categories.length)return;
    var main=q('main');if(!main)return;
    var sec=el('section','sp-legacy-directory');sec.id='expanded-service-areas';
    var wrap=el('div','wrap');var head=el('div');head.innerHTML='<span class="sp-eyebrow">EXPANDED CONSULTANCY DIRECTORY</span><h2>Specialist disciplines and service topics</h2><p>Browse detailed service areas. SPEDAR offers these multidisciplinary services; specialist or regulated assignments require appropriately qualified practitioners.</p>';
    wrap.appendChild(head);var grid=el('div','sp-legacy-directory__grid');
    lib.categories.forEach(function(c){var d=el('details');d.innerHTML='<summary>'+esc(c.name)+' <small>('+c.items.length+')</small></summary><p>'+esc(c.intro)+'</p><ul>'+c.items.map(function(x){return '<li>'+esc(x.name)+'</li>';}).join('')+'</ul>';grid.appendChild(d);});
    wrap.appendChild(grid);var link=el('a','btn btn--primary','Search and shortlist services');link.href=localPage('service-directory.html');wrap.appendChild(link);
    sec.appendChild(wrap);main.appendChild(sec);
  }
  function renderSelected(){
    var tray=q('#sp-lib-tray');if(!tray)return;
    tray.hidden=selected.length===0;
    var n=q('#sp-lib-selected-count');if(n)n.textContent=String(selected.length);
    qa('.sp-lib-add').forEach(function(b){var on=selected.indexOf(b.getAttribute('data-service'))>=0;b.setAttribute('aria-pressed',String(on));b.textContent=on?'✓':'+';});
    var anchor=q('#sp-lib-enquire');if(anchor)anchor.href=localPage('project-brief.html')+(selected.length?'?services='+encodeURIComponent(selected.join('\n')):'');
  }
  function serviceDirectory(){
    var root=q('#service-directory');if(!root)return;
    var input=q('#sp-service-search'),cat=q('#sp-service-category'),pathway=q('#sp-service-pathway');
    function filter(){
      var search=(input.value||'').trim().toLowerCase();var c=cat.value;var p=pathway.value;var count=0;
      qa('.sp-lib-group',root).forEach(function(group){
        var matches=0;
        qa('.sp-lib-item',group).forEach(function(item){
          var text=item.textContent.toLowerCase();var good=(!search||text.indexOf(search)>-1)&& (p==='all'||item.getAttribute('data-support')===p);
          item.hidden=!good;if(good)matches++;
        });
        var groupOkay=(c==='all'||group.getAttribute('data-category')===c)&&matches>0;
        group.hidden=!groupOkay;
        if(groupOkay)count+=matches;
        if(search.length>1&&groupOkay)group.open=true;
      });
      q('#sp-service-result-count').textContent=count+' matching service topic'+(count===1?'':'s');
      q('.sp-lib-no-results').hidden=count>0;
    }
    [input,cat,pathway].forEach(function(x){if(x)x.addEventListener(x===input?'input':'change',filter);});
    var reset=q('#sp-clear-filters');if(reset)reset.addEventListener('click',function(){input.value='';cat.value='all';pathway.value='all';filter();});
    qa('.sp-lib-add',root).forEach(function(b){b.addEventListener('click',function(){var name=b.getAttribute('data-service');var i=selected.indexOf(name);if(i>=0){selected.splice(i,1);}else if(selected.length<12){selected.push(name);}else{alert('You can shortlist up to 12 topics. Remove one before adding another.');}renderSelected();});});
    var clear=q('#sp-lib-clear');if(clear)clear.addEventListener('click',function(){selected=[];renderSelected();});
    var copy=q('#sp-lib-copy');if(copy)copy.addEventListener('click',function(){var value=selected.join('\n');if(!value)return;
      if(navigator.clipboard&&window.isSecureContext){navigator.clipboard.writeText(value).then(function(){copy.textContent='Copied';},function(){copy.textContent='Copy unavailable';});}
      else {var t=el('textarea');t.value=value;doc.body.appendChild(t);t.select();try{doc.execCommand('copy');copy.textContent='Copied';}catch(e){copy.textContent='Copy unavailable';}t.remove();}
    });
    var params=new URLSearchParams(window.location.search);var initial=params.get('category');if(initial&&Array.from(cat.options).some(function(x){return x.value===initial;})){cat.value=initial;filter();}
    renderSelected();
  }
  function sectors(){var buttons=qa('.sp-sector-filter');if(!buttons.length)return;var cards=qa('.sp-market-card');var status=q('#sp-sector-count');
    buttons.forEach(function(b){b.addEventListener('click',function(){var f=b.getAttribute('data-filter');buttons.forEach(function(x){x.setAttribute('aria-pressed',String(x===b));});var n=0;cards.forEach(function(c){var on=f==='all'||c.getAttribute('data-sector')===f;c.hidden=!on;if(on)n++;});if(status)status.textContent='Showing '+n+' sector'+(n===1?'':'s');});});}
  function brief(){var form=q('#sp-project-form');if(!form)return;
    var params=new URLSearchParams(window.location.search),s=params.get('services');if(s){q('#sp-selected-services').value=s.slice(0,1800);}
    form.addEventListener('submit',function(ev){ev.preventDefault();if(!form.reportValidity())return;
      var fd=new FormData(form);var fields=[['Name','name'],['Organisation','organisation'],['Reply email','email'],['Phone','phone'],['Location','location'],['Timeline','timeline'],['Focus','focus'],['Services','services'],['Project description','description'],['Documents / ToR','docs']];
      var msg='PROJECT ENQUIRY — SPEDAR CONSULTANTS\n\n'+fields.map(function(f){return f[0]+': '+(fd.get(f[1])||'Not specified');}).join('\n\n');
      var url='mailto:info@spedar.com?subject='+encodeURIComponent('Project enquiry – '+(fd.get('organisation')||fd.get('name'))) +'&body='+encodeURIComponent(msg);
      q('#sp-form-status').textContent='Your email app should open. Please review the draft and press Send in your email app. If no app opens, copy your notes and email info@spedar.com directly.';
      window.location.href=url;
    });
  }
  function init(){addNav();legacyServices();serviceDirectory();sectors();brief();}
  if(doc.readyState==='loading')doc.addEventListener('DOMContentLoaded',init);else init();
})();
