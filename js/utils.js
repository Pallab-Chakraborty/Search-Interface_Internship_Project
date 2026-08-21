function highlight(text, query) {
  if (!query) return text;
  const re = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')})`, 'gi');
  return text.replace(re, '<mark>$1</mark>');
}

let toastTimer;
function showToast(msg, icon = 'fa-solid fa-check-circle', color = 'var(--cyan)') {
  toastMsg.textContent = msg;
  toast.querySelector('i').className = icon;
  toast.querySelector('i').style.color = color;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}

function saveHistory(q) {
  if (!q.trim()) return;
  state.history = [q, ...state.history.filter(h => h !== q)].slice(0, 8);
  localStorage.setItem('nex_history', JSON.stringify(state.history));
}

