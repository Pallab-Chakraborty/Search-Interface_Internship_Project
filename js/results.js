function showLoading() {
  resultsWrap.innerHTML = Array(4).fill(0).map((_,i) => `
    <div class="skeleton-card" style="animation-delay:${i*0.07}s">
      <div class="skel skel-icon"></div>
      <div class="skel-body">
        <div class="skel skel-line w30"></div>
        <div class="skel skel-line w75"></div>
        <div class="skel skel-line w90"></div>
        <div class="skel skel-line w60"></div>
      </div>
    </div>`).join('');
  statsBar.style.display = 'none';
  pagination.style.display = 'none';
}

// ═══════════════════════════════════════════════════
// RENDER RESULTS
// ═══════════════════════════════════════════════════
function renderResults() {
  const q = state.query;
  resultsWrap.innerHTML = '';

  if (!state.results.length) {
    resultsWrap.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon"><i class="fa-solid fa-magnifying-glass"></i></div>
        <div class="empty-title">No results for "${q}"</div>
        <div class="empty-sub">Try a different keyword, category, or remove some filters.</div>
      </div>`;
    return;
  }

  const PER_PAGE = 5;
  const start = (state.page - 1) * PER_PAGE;
  const paged = state.results.slice(start, start + PER_PAGE);

  paged.forEach((r, i) => {
    const card = document.createElement('div');
    card.className = 'result-card';
    card.style.animationDelay = `${i * 0.07}s`;
    const isLiked = state.liked.has(r.title);

    card.innerHTML = `
      <div class="result-icon" style="background:${r.iconBg};color:${r.iconColor}">
        <i class="${r.icon}"></i>
      </div>
      <div class="result-body">
        <div class="result-top">
          <span class="result-source">${r.source}</span>
          ${r.badge ? `<span class="result-badge" style="background:${r.badgeBg};color:${r.badgeColor}">${r.badge}</span>` : ''}
        </div>
        <div class="result-title">${highlight(r.title, q)}</div>
        <div class="result-desc">${r.desc}</div>
        <div class="result-meta">
          ${r.tags.map(t => `<span class="result-tag"><i class="${t.icon}"></i>${t.text}</span>`).join('')}
          <div class="result-action">
            <button class="icon-btn" title="Views"><i class="fa-solid fa-eye"></i> ${r.meta.views}</button>
            <button class="icon-btn ${isLiked ? 'liked' : ''} like-btn" title="Save"><i class="fa-${isLiked ? 'solid' : 'regular'} fa-heart"></i></button>
            <button class="icon-btn share-btn" title="Share"><i class="fa-solid fa-arrow-up-from-bracket"></i></button>
          </div>
        </div>
      </div>`;

    // Like
    card.querySelector('.like-btn').addEventListener('click', e => {
      e.stopPropagation();
      if (state.liked.has(r.title)) {
        state.liked.delete(r.title);
        showToast('Removed from saved', 'fa-regular fa-heart', 'var(--text2)');
      } else {
        state.liked.add(r.title);
        showToast('Saved!', 'fa-solid fa-heart', '#ff6b9d');
      }
      renderResults();
    });

    // Share
    card.querySelector('.share-btn').addEventListener('click', e => {
      e.stopPropagation();
      navigator.clipboard?.writeText(r.title).then(() => {
        showToast('Copied to clipboard!', 'fa-solid fa-copy');
      }).catch(() => {
        showToast('Link copied!', 'fa-solid fa-copy');
      });
    });

    resultsWrap.appendChild(card);
  });
}

