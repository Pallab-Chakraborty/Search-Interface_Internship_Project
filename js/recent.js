function renderRecent() {
  recentRow.innerHTML = '';
  if (!state.history.length) return;
  const label = document.createElement('span');
  label.className = 'recent-label';
  label.textContent = 'Recent';
  recentRow.appendChild(label);
  state.history.slice(0, 5).forEach((h, i) => {
    const pill = document.createElement('span');
    pill.className = 'recent-pill';
    pill.innerHTML = `<i class="fa-solid fa-clock-rotate-left"></i>${h}<span class="rm-pill" data-i="${i}"><i class="fa-solid fa-xmark"></i></span>`;
    pill.addEventListener('click', e => {
      if (e.target.closest('.rm-pill')) {
        state.history.splice(i, 1);
        localStorage.setItem('nex_history', JSON.stringify(state.history));
        renderRecent();
        return;
      }
      searchInput.value = h;
      state.query = h;
      updateClear();
      triggerSearch();
    });
    recentRow.appendChild(pill);
  });
}

