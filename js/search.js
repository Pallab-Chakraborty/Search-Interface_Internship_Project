function triggerSearch() {
  state.query = searchInput.value.trim();
  if (!state.query) { searchInput.focus(); return; }
  state.page = 1;
  closeSuggest();
  closeCatDropdown();
  saveHistory(state.query);
  runSearch();
}

function runSearch() {
  state.hasSearched = true;
  state.loading = true;
  showLoading();
  enterResultsMode();

  setTimeout(() => {
    const q = state.query.toLowerCase();
    const catId = state.category;

    let results = RESULT_DATA.filter(r => {
      const matchQ = !q ||
        r.title.toLowerCase().includes(q) ||
        r.desc.toLowerCase().includes(q) ||
        r.source.toLowerCase().includes(q) ||
        r.tags.some(t => t.text.toLowerCase().includes(q));
      const matchCat = catId === 'everything' || r.cat === catId;
      const matchRemote = !state.filters.has('remote') || r.tags.some(t => t.text.toLowerCase().includes('remote'));
      const matchFull = !state.filters.has('fulltime') || r.tags.some(t => t.text.toLowerCase().includes('full-time') || t.text.toLowerCase().includes('full time'));
      const matchContract = !state.filters.has('contract') || (r.badge === 'CONTRACT' || r.tags.some(t => t.text.toLowerCase().includes('contract')));
      const matchSenior = !state.filters.has('senior') || r.title.toLowerCase().includes('senior');
      return matchQ && matchCat && matchRemote && matchFull && matchContract && matchSenior;
    });

    if (state.sortBy === 'views') results.sort((a,b) => parseInt(b.meta.views) - parseInt(a.meta.views));

    state.results = results;
    state.loading = false;
    renderResults();
    renderStats();
    renderPagination();
    renderRecent();
  }, 650);
}

// ═══════════════════════════════════════════════════
// LAYOUT MODE
// ═══════════════════════════════════════════════════
function enterResultsMode() {
  page.classList.add('has-results');
  heroBlock.style.cssText = 'margin-bottom:16px;';
  heroBlock.querySelector('.hero-title').style.fontSize = '1.6rem';
  heroBlock.querySelector('.hero-title').style.letterSpacing = '-1px';
  heroBlock.querySelector('.hero-title').style.marginBottom = '0';
  heroBlock.querySelector('.hero-eyebrow').style.display = 'none';
  heroBlock.querySelector('.hero-sub').style.display = 'none';
}

