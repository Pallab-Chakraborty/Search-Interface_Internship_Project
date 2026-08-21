const FILTERS = [
  { id:'remote',    label:'Remote',     icon:'fa-solid fa-wifi' },
  { id:'fulltime',  label:'Full-time',  icon:'fa-solid fa-briefcase' },
  { id:'contract',  label:'Contract',   icon:'fa-solid fa-file-contract' },
  { id:'senior',    label:'Senior',     icon:'fa-solid fa-star' },
  { id:'new',       label:'New Today',  icon:'fa-solid fa-bolt', special: true },
];

function renderFilters() {
  filterRow.innerHTML = '';
  FILTERS.forEach(f => {
    const btn = document.createElement('button');
    btn.className = 'filter-chip' + (state.filters.has(f.id) ? ' active' : '') + (f.special ? ' special' : '');
    btn.innerHTML = `<i class="${f.icon}"></i>${f.label}`;
    btn.addEventListener('click', () => {
      state.filters.has(f.id) ? state.filters.delete(f.id) : state.filters.add(f.id);
      renderFilters();
      if (state.hasSearched) runSearch();
    });
    filterRow.appendChild(btn);
  });
}

