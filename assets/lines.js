(function(){
  'use strict';
  var buttons = document.querySelectorAll('.facs-tool--lines');

  function toggleLines(){
    var on = document.body.classList.toggle('show-lines');
    buttons.forEach(function(b){ b.classList.toggle('is-on', on); });
  }
  buttons.forEach(function(b){ b.addEventListener('click', toggleLines); });

  document.addEventListener('keydown', function(e){
    var tag = (e.target && e.target.tagName) || '';
    if(tag === 'SELECT' || tag === 'INPUT' || tag === 'TEXTAREA') return;
    if(e.metaKey || e.ctrlKey || e.altKey) return;
    if(e.key === 'l' || e.key === 'L') toggleLines();
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

  document.querySelectorAll('.journal-select').forEach(function(sel){
    sel.addEventListener('change', function(){ location.href = sel.value; });
  });
})();
