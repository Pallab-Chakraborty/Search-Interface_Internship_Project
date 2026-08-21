let debounceTimer;

searchInput.addEventListener('input', () => {
  state.query = searchInput.value;
  updateClear();
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(renderSuggest, 120);
});

searchInput.addEventListener('focus', () => {
  searchWrap.classList.add('focused');
  closeCatDropdown();
  renderSuggest();
});

searchInput.addEventListener('blur', () => {
  searchWrap.classList.remove('focused');
  setTimeout(closeSuggest, 200);
});

function updateClear() {
  clearBtn.classList.toggle('visible', !!searchInput.value);
}

clearBtn.addEventListener('click', () => {
  searchInput.value = '';
  state.query = '';
  updateClear();
  searchInput.focus();
  renderSuggest();
});

