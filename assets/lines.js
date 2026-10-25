(function(){
  'use strict';
  var buttons = document.querySelectorAll('.facs-tool--lines');

  function toggleLines(){
    var on = document.body.classList.toggle('show-lines');
    buttons.forEach(function(b){ b.classList.toggle('is-on', on); });
  }
  buttons.forEach(function(b){ b.addEventListener('click', toggleLines); });

  var colourChips = document.querySelectorAll('.chip--colour');
  function syncColour(){
    var on = Array.from(colourChips).some(function(c){ return !c.classList.contains('is-off'); });
    document.body.classList.toggle('ln-layout', on);
    if(on && !document.body.classList.contains('show-lines')) toggleLines();
  }
  colourChips.forEach(function(c){ c.addEventListener('click', syncColour); });

  document.addEventListener('keydown', function(e){
    var tag = (e.target && e.target.tagName) || '';
    if(tag === 'SELECT' || tag === 'INPUT' || tag === 'TEXTAREA') return;
    if(e.metaKey || e.ctrlKey || e.altKey) return;
    if(e.key === 'l' || e.key === 'L') toggleLines();
    if(e.key === 'c' || e.key === 'C'){
      colourChips.forEach(function(c){ c.classList.toggle('is-off'); });
      syncColour();
    }
  });

  function visibleLine(page, id){
    return Array.from(page.querySelectorAll('.ln[data-ln="' + id + '"]'))
      .find(function(el){ return el.offsetParent !== null; });
  }

  document.querySelectorAll('article.page').forEach(function(page){
    function hot(el, on){
      page.querySelectorAll('[data-ln="' + el.dataset.ln + '"]')
        .forEach(function(x){ x.classList.toggle('is-hot', on); });
    }
    page.addEventListener('mouseover', function(e){
      var el = e.target.closest('[data-ln]');
      if(el) hot(el, true);
    });
    page.addEventListener('mouseout', function(e){
      var el = e.target.closest('[data-ln]');
      if(el) hot(el, false);
    });
    page.addEventListener('click', function(e){
      var g = e.target.closest('.ln-g');
      if(!g) return;
      var line = visibleLine(page, g.dataset.ln);
      if(!line) return;
      line.scrollIntoView({ behavior:'smooth', block:'center' });
      line.classList.add('is-flash');
      setTimeout(function(){ line.classList.remove('is-flash'); }, 1600);
    });
  });

  document.querySelectorAll('.chip[data-scope="line"]').forEach(function(chip){
    chip.addEventListener('click', function(){
      document.body.classList.toggle('hide-ln-' + chip.dataset.type, chip.classList.contains('is-off'));
    });
  });

  var zooms = [1, 1.3, 1.6, 2, 2.5], zoom = 0;
  function setZoom(step){
    zoom = Math.max(0, Math.min(zooms.length - 1, zoom + step));
    document.body.style.setProperty('--doc-zoom', zooms[zoom]);
    document.querySelectorAll('.lp-zoom-readout').forEach(function(r){ r.textContent = Math.round(zooms[zoom] * 100) + '%'; });
  }
  document.querySelectorAll('.lp-page').forEach(function(canvas){
    var bar = document.createElement('div');
    bar.className = 'lp-zoom';
    bar.innerHTML = '<button type="button" class="facs-tool" data-step="-1" title="Smaller text">A&minus;</button>'
      + '<span class="lp-zoom-readout">100%</span>'
      + '<button type="button" class="facs-tool" data-step="1" title="Larger text">A+</button>';
    bar.addEventListener('click', function(e){
      var b = e.target.closest('[data-step]');
      if(b) setZoom(parseInt(b.dataset.step, 10));
    });
    canvas.parentNode.insertBefore(bar, canvas);
  });

  document.querySelectorAll('.journal-select').forEach(function(sel){
    sel.addEventListener('change', function(){ location.href = sel.value; });
  });
})();
