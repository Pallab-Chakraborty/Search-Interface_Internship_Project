function renderCatDropdown() {
  catDropdown.innerHTML = `<div class="cat-dropdown-header">Browse Categories</div>`;
  CATEGORIES.forEach(cat => {
    const div = document.createElement('div');
    div.className = 'cat-item' + (cat.id === state.category ? ' active' : '');
    div.innerHTML = `
      <div class="cat-icon" style="background:${cat.color}22;color:${cat.color}">
        <i class="${cat.icon}"></i>
      </div>
      <span>${cat.label}</span>
      <span class="cat-count">${cat.count}</span>`;
    div.addEventListener('click', () => selectCategory(cat));
    catDropdown.appendChild(div);
  });
}

function selectCategory(cat) {
  state.category = cat.id;
  catLabel.textContent = cat.label;
  catIconEl.className = cat.icon;
  catIconEl.style.fontSize = '0.75rem';
  closeCatDropdown();
  renderFilters();
  if (state.hasSearched) runSearch();
}

function openCatDropdown() {
  renderCatDropdown();
  catDropdown.classList.add('open');
  catBtn.classList.add('open');
  closeSuggest();
}
function closeCatDropdown() {
  catDropdown.classList.remove('open');
  catBtn.classList.remove('open');
}

catBtn.addEventListener('click', e => {
  e.stopPropagation();
  catDropdown.classList.contains('open') ? closeCatDropdown() : openCatDropdown();
});

