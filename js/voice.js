voiceBtn.addEventListener('click', () => {
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    showToast('Voice search not supported in this browser', 'fa-solid fa-triangle-exclamation', '#f5c542');
    return;
  }
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const rec = new SpeechRecognition();
  rec.lang = 'en-US'; rec.interimResults = true;
  voiceBtn.classList.add('listening');
  voiceIcon.className = 'fa-solid fa-circle-dot';
  showToast('Listening… Speak now', 'fa-solid fa-microphone', '#ff4444');

  rec.onresult = e => {
    const transcript = e.results[0][0].transcript;
    searchInput.value = transcript;
    state.query = transcript;
    updateClear();
  };
  rec.onend = () => {
    voiceBtn.classList.remove('listening');
    voiceIcon.className = 'fa-solid fa-microphone';
    if (state.query) triggerSearch();
  };
  rec.onerror = () => {
    voiceBtn.classList.remove('listening');
    voiceIcon.className = 'fa-solid fa-microphone';
    showToast('Voice search cancelled', 'fa-solid fa-xmark', 'var(--text3)');
  };
  rec.start();
});

