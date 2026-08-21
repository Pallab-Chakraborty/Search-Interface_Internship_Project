document.addEventListener('click', e => {
  if (!e.target.closest('#cat-btn') && !e.target.closest('#cat-dropdown')) closeCatDropdown();
});

// ═══════════════════════════════════════════════════
// GLOBAL KEYBOARD
// ═══════════════════════════════════════════════════
document.addEventListener('keydown', e => {
  if (e.key === '/' && document.activeElement !== searchInput) {
    e.preventDefault();
    searchInput.focus();
    showToast('/ to focus search', 'fa-solid fa-keyboard');
  }
});

// ═══════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════
renderFilters();
renderRecent();

// Press / hint
setTimeout(() => {
  if (!state.hasSearched) showToast('Press / to focus search', 'fa-solid fa-keyboard', 'var(--violet2)');
}, 2000);
