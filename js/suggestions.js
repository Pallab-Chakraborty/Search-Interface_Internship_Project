let kbdIndex = -1;

function getSuggestions(q) {
  if (!q) return null;
  const key = Object.keys(SUGGEST_MAP).find(k => q.toLowerCase().includes(k));
  return key ? SUGGEST_MAP[key] : null;
}

function renderSuggest() {
  const q = searchInput.value.trim();
  suggestPanel.innerHTML = '';
  kbdIndex = -1;

  if (!q) {
    // Show history + trending when empty and focused
    let html = '';
    if (state.history.length) {
      html += `<div class="panel-section"><div class="panel-label"><i class="fa-solid fa-clock-rotate-left"></i>Recent Searches</div>`;
      state.history.slice(0, 4).forEach(h => {
        html += `<div class="suggestion-item" data-val="${h}">
          <div class="s-icon" style="color:var(--text3)"><i class="fa-solid fa-clock-rotate-left"></i></div>
          <div class="s-text"><div class="s-main">${h}</div></div>
          <span class="s-badge" style="background:var(--bg3);color:var(--text3)">History</span>
        </div>`;
      });
      html += '</div>';
    }
    html += `<div class="panel-section"><div class="panel-label"><i class="fa-solid fa-fire"></i>Trending Now</div>
      <div class="trending-tags">
        ${TRENDING.map(t => `<span class="trend-tag" data-val="${t}"><i class="fa-solid fa-arrow-trend-up"></i>${t}</span>`).join('')}
      </div></div>`;
    html += `<div class="kbd-hint-bar">
      <div class="kh-item"><kbd class="kbd">↑↓</kbd> Navigate</div>
      <div class="kh-item"><kbd class="kbd">↵</kbd> Select</div>
      <div class="kh-item"><kbd class="kbd">Esc</kbd> Close</div>
    </div>`;
    suggestPanel.innerHTML = html;
    bindSuggestClicks();
    suggestPanel.classList.add('open');
    return;
  }

  const matches = getSuggestions(q);
  if (!matches) { suggestPanel.classList.remove('open'); return; }

  let html = `<div class="panel-section"><div class="panel-label"><i class="fa-solid fa-magnifying-glass"></i>Suggestions</div>`;
  matches.forEach(m => {
    html += `<div class="suggestion-item" data-val="${m}">
      <div class="s-icon"><i class="fa-solid fa-magnifying-glass" style="color:var(--cyan)"></i></div>
      <div class="s-text"><div class="s-main">${highlight(m, q)}</div></div>
    </div>`;
  });
  html += '</div>';
  html += `<div class="kbd-hint-bar">
    <div class="kh-item"><kbd class="kbd">↑↓</kbd> Navigate</div>
    <div class="kh-item"><kbd class="kbd">↵</kbd> Select</div>
    <div class="kh-item"><kbd class="kbd">Esc</kbd> Close</div>
  </div>`;
  suggestPanel.innerHTML = html;
  bindSuggestClicks();
  suggestPanel.classList.add('open');
}

function bindSuggestClicks() {
  suggestPanel.querySelectorAll('[data-val]').forEach(el => {
    el.addEventListener('mousedown', e => {
      e.preventDefault();
      const val = el.dataset.val;
      searchInput.value = val;
      state.query = val;
      updateClear();
      closeSuggest();
      triggerSearch();
    });
  });
}

function closeSuggest() {
  suggestPanel.classList.remove('open');
  kbdIndex = -1;
}

// Keyboard navigation in suggestions
searchInput.addEventListener('keydown', e => {
  const items = [...suggestPanel.querySelectorAll('.suggestion-item')];
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    kbdIndex = Math.min(kbdIndex + 1, items.length - 1);
    items.forEach((el, i) => el.classList.toggle('kbd-focus', i === kbdIndex));
    if (items[kbdIndex]) searchInput.value = items[kbdIndex].dataset.val || '';
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    kbdIndex = Math.max(kbdIndex - 1, -1);
    items.forEach((el, i) => el.classList.toggle('kbd-focus', i === kbdIndex));
    if (kbdIndex === -1) searchInput.value = state.query;
    else if (items[kbdIndex]) searchInput.value = items[kbdIndex].dataset.val || '';
  } else if (e.key === 'Escape') {
    closeSuggest();
    closeCatDropdown();
  } else if (e.key === 'Enter') {
    if (kbdIndex >= 0 && items[kbdIndex]) {
      searchInput.value = items[kbdIndex].dataset.val || '';
    }
    triggerSearch();
    closeSuggest();
  }
});

