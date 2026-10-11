/*
  SilentEarn video library.
  Add only real, published YouTube or TikTok videos here.
  YouTube example:
  { platform: 'YouTube', title: 'Video title', description: 'A clear summary.', videoUrl: 'https://www.youtube.com/watch?v=VIDEO_ID', videoId: 'VIDEO_ID', thumbnailUrl: '' }
  TikTok example:
  { platform: 'TikTok', title: 'Video title', description: 'A clear summary.', videoUrl: 'https://www.tiktok.com/@silentearnn/video/REAL_ID', videoId: '', thumbnailUrl: 'https://...' }
  Do not publish placeholder claims or guessed URLs.
*/
const VIDEOS = [];

function escapeHtml(value = '') {
  return String(value).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
}

function videoThumbnail(video) {
  if (video.thumbnailUrl) {
    return `<img src="${escapeHtml(video.thumbnailUrl)}" alt="" loading="lazy" />`;
  }
  if (video.platform === 'YouTube' && video.videoId) {
    return `<img src="https://img.youtube.com/vi/${encodeURIComponent(video.videoId)}/hqdefault.jpg" alt="" loading="lazy" />`;
  }
  return '<div class="video-artwork"><span class="video-artwork-mark">SE</span><span class="video-artwork-caption">SILENTEARN VIDEO</span></div>';
}

function renderVideos() {
  const grid = document.getElementById('video-grid');
  if (!grid) return;

  if (!VIDEOS.length) {
    grid.innerHTML = `
      <div class="video-empty">
        <div class="video-empty-mark">▶</div>
        <span class="video-empty-label">VIDEO LIBRARY</span>
        <h3>New lessons will appear here.</h3>
        <p>Visit the official channels for SilentEarn's latest videos. Published videos can be added to this website as the library grows.</p>
        <div class="inline-actions">
          <a class="btn btn-primary" href="https://youtube.com/@silentearnnn" target="_blank" rel="noopener">YouTube channel ↗</a>
          <a class="btn btn-secondary" href="https://www.tiktok.com/@silentearnn" target="_blank" rel="noopener">TikTok profile ↗</a>
        </div>
      </div>`;
    return;
  }

  grid.innerHTML = VIDEOS.map(video => {
    const url = video.videoUrl || '#';
    const linkLabel = video.videoUrl ? 'Watch video ↗' : 'Link coming soon';
    return `
      <article class="video-card">
        <a class="video-thumb" href="${escapeHtml(url)}" ${video.videoUrl ? 'target="_blank" rel="noopener"' : 'aria-disabled="true"'} aria-label="${escapeHtml('Open ' + video.title)}">
          ${videoThumbnail(video)}
          <span class="video-play">▶</span>
          <span class="video-platform-badge">${escapeHtml(video.platform || 'SilentEarn')}</span>
        </a>
        <div class="video-body">
          <span class="video-tag">${escapeHtml(video.category || video.platform || 'SILENTEARN')}</span>
          <h3>${escapeHtml(video.title)}</h3>
          <p>${escapeHtml(video.description || '')}</p>
          <div class="video-meta"><span>${escapeHtml(video.duration || 'Video')}</span><span>SilentEarn</span></div>
          <a class="mini-btn ${video.videoUrl ? '' : 'disabled'}" href="${escapeHtml(url)}" ${video.videoUrl ? 'target="_blank" rel="noopener"' : 'aria-disabled="true"'}>${linkLabel}</a>
        </div>
      </article>`;
  }).join('');
}

function initNav() {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }));
}

async function submitSilentEarnForm(form, status, button, successMessage) {
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const originalButton = button.innerHTML;
  button.disabled = true;
  button.textContent = 'Sending…';
  status.textContent = '';

  try {
    const payload = Object.fromEntries(new FormData(form).entries());
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload)
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || 'Unable to send your message.');
    status.textContent = successMessage;
    status.style.color = 'var(--success)';
    form.reset();
  } catch (error) {
    status.textContent = error.message || 'The message could not be sent. Please try the contact email or WhatsApp link.';
    status.style.color = 'var(--danger)';
  } finally {
    button.disabled = false;
    button.innerHTML = originalButton;
  }
}

function initContactForm() {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  const button = document.getElementById('submit-btn');
  if (!form || !status || !button) return;

  form.addEventListener('submit', async event => {
    event.preventDefault();
    await submitSilentEarnForm(form, status, button, 'Thanks — your message has been sent to SilentEarn.');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderVideos();
  initNav();
  initContactForm();
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
});