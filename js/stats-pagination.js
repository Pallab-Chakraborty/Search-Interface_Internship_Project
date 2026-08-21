function renderStats() {
  const total = state.results.length;
  statsBar.style.display = 'flex';
  statsBar.innerHTML = `
    <div class="stats-count">Found <strong>${total}</strong> result${total !== 1 ? 's' : ''} for "<strong style="color:var(--text)">${state.query}</strong>"</div>
    <div class="stats-sort">
      Sort:
      <button class="sort-btn ${state.sortBy==='relevance'?'active':''}" id="sort-rel">Relevance</button>
      <button class="sort-btn ${state.sortBy==='views'?'active':''}" id="sort-views">Most Viewed</button>
    </div>`;

  statsBar.querySelector('#sort-rel').addEventListener('click', () => { state.sortBy='relevance'; state.page=1; renderStats(); renderResults(); renderPagination(); });
  statsBar.querySelector('#sort-views').addEventListener('click', () => { state.sortBy='views'; state.page=1; runSearch(); });
}

// ═══════════════════════════════════════════════════
// PAGINATION
// ═══════════════════════════════════════════════════
function renderPagination() {
  const PER_PAGE = 5;
  const totalPages = Math.ceil(state.results.length / PER_PAGE);
  if (totalPages <= 1) { pagination.style.display = 'none'; return; }

  pagination.style.display = 'flex';
  pagination.innerHTML = '';

  const prevBtn = document.createElement('button');
  prevBtn.className = 'page-btn';
  prevBtn.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';
  prevBtn.disabled = state.page === 1;
  prevBtn.addEventListener('click', () => { state.page--; renderResults(); renderPagination(); window.scrollTo({top: 0, behavior:'smooth'}); });
  pagination.appendChild(prevBtn);

  for (let p = 1; p <= totalPages; p++) {
    const btn = document.createElement('button');
    btn.className = 'page-btn' + (p === state.page ? ' active' : '');
    btn.textContent = p;
    btn.addEventListener('click', () => { state.page = p; renderResults(); renderPagination(); window.scrollTo({top: 0, behavior:'smooth'}); });
    pagination.appendChild(btn);
  }

  const nextBtn = document.createElement('button');
  nextBtn.className = 'page-btn';
  nextBtn.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';
  nextBtn.disabled = state.page === totalPages;
  nextBtn.addEventListener('click', () => { state.page++; renderResults(); renderPagination(); window.scrollTo({top: 0, behavior:'smooth'}); });
  pagination.appendChild(nextBtn);
}

