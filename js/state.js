let state = {
  query: '',
  category: 'everything',
  sortBy: 'relevance',
  filters: new Set(),
  results: [],
  loading: false,
  page: 1,
  hasSearched: false,
  liked: new Set(),
  history: JSON.parse(localStorage.getItem('nex_history') || '[]'),
};

// ═══════════════════════════════════════════════════
// ELEMENTS
// ═══════════════════════════════════════════════════
const $ = id => document.getElementById(id);
const searchInput   = $('search-input');
const searchWrap    = $('search-wrap');
const catBtn        = $('cat-btn');
const catLabel      = $('cat-label');
const catIconEl     = $('cat-icon-el');
const catDropdown   = $('cat-dropdown');
const catChevron    = $('cat-chevron');
const suggestPanel  = $('suggestions-panel');
const clearBtn      = $('clear-btn');
const voiceBtn      = $('voice-btn');
const voiceIcon     = $('voice-icon');
const filterRow     = $('filter-row');
const recentRow     = $('recent-row');
const statsBar      = $('stats-bar');
const resultsWrap   = $('results-wrap');
const pagination    = $('pagination');
const page          = $('page');
const heroBlock     = $('hero-block');
const toast         = $('toast');
const toastMsg      = $('toast-msg');
