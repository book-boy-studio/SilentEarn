const SOCIAL_LINKS = {
  youtube: 'https://youtube.com/@silentearnnn',
  facebook: 'https://www.facebook.com/SilentEarn',
  tiktok: 'https://www.tiktok.com/@silentearnn',
  instagram: 'https://www.instagram.com/',
  pinterest: 'https://www.pinterest.com/',
  x: 'https://x.com/',
  linkedin: 'https://www.linkedin.com/',
  whatsapp: 'https://wa.me/2348110845979'
};

/* Add a real published article URL before changing status to published. */
const ARTICLES = [
  {category:'AI TOOLS',title:'How to Evaluate an AI Tool Before Paying for It',description:'A practical checklist for checking features, pricing, limitations, privacy, and whether a tool fits your needs.',status:'Planned',href:'#contact'},
  {category:'DIGITAL SKILLS',title:'Choosing a Digital Skill: Questions to Ask Before You Start',description:'Compare learning time, demand, costs, available practice, and realistic ways to build experience.',status:'Planned',href:'#contact'},
  {category:'PRODUCT RESEARCH',title:'How to Read Product Reviews and Compare Alternatives',description:'Learn how to look beyond marketing claims and make a more informed purchasing decision.',status:'Planned',href:'#contact'}
];

const RESOURCES = [
  {icon:'📘',title:'AI Tool Evaluation Checklist',description:'A planned free checklist for comparing features, pricing, privacy, and limitations before signing up.',status:'Coming soon'},
  {icon:'🧭',title:'Digital Skill Planning Worksheet',description:'A planned worksheet to help you compare skills, practice options, costs, and next steps.',status:'Coming soon'},
  {icon:'🔎',title:'Product Research Guide',description:'A planned guide to checking product claims, reading terms, and comparing alternatives.',status:'Coming soon'}
];

/* Only add real, verified recommendations and supplied affiliate URLs here. */
const RECOMMENDATIONS = [];

function escapeHtml(value = '') {
  return String(value).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
}

function renderArticles() {
  const grid = document.getElementById('article-grid');
  if (!grid) return;
  grid.innerHTML = ARTICLES.map(article => `
    <article class="article-card">
      <div class="article-art"><span>SE</span><small>${escapeHtml(article.category)}</small></div>
      <div class="article-body"><span class="article-status">${escapeHtml(article.status)}</span><h3>${escapeHtml(article.title)}</h3><p>${escapeHtml(article.description)}</p><a class="mini-btn" href="${escapeHtml(article.href)}">${article.status === 'Published' ? 'Read article' : 'Suggest this topic'} →</a></div>
    </article>`).join('');
}

function renderResources() {
  const grid = document.getElementById('resource-grid');
  if (!grid) return;
  grid.innerHTML = RESOURCES.map(item => `
    <article class="resource-card"><span>${item.icon}</span><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.description)}</p><div class="resource-status">${escapeHtml(item.status)}</div></article>`).join('');
}

function renderRecommendations() {
  const grid = document.getElementById('recommendation-grid');
  if (!grid) return;
  if (!RECOMMENDATIONS.length) {
    grid.innerHTML = '<article class="recommendation-empty"><span>🔎</span><h3>Recommendations are being curated</h3><p>SilentEarn will add products after checking the official details, intended audience, important limitations, and the correct destination or affiliate link.</p><a class="mini-btn" href="#contact">Ask about a product →</a></article>';
    return;
  }
  grid.innerHTML = RECOMMENDATIONS.map(item => `
    <article class="recommendation-card"><span class="rec-label">${escapeHtml(item.category || 'RECOMMENDATION')}</span><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.description)}</p>${item.disclosure ? '<p class="product-disclosure">Affiliate link: SilentEarn may earn a commission at no extra cost to you.</p>' : ''}<a class="mini-btn" href="${escapeHtml(item.href)}" target="_blank" rel="nofollow sponsored noopener">View official details ↗</a></article>`).join('');
}

function initNav() {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }));
}

function showToast(message, type = '') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 4200);
}

async function submitSilentEarnForm(form, status, button, successMessage) {
  if (!form.checkValidity()) {
    form.reportValidity();
    return false;
  }
  button.disabled = true;
  const original = button.innerHTML;
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
    if (!response.ok) throw new Error(data.error || 'Unable to send the form.');
    status.textContent = successMessage;
    status.style.color = 'var(--success)';
    showToast('Message sent.', 'success');
    form.reset();
    return true;
  } catch (error) {
    status.textContent = error.message || 'Something went wrong. Please use WhatsApp instead.';
    status.style.color = 'var(--danger)';
    showToast('The form could not be sent. WhatsApp is available as a fallback.', 'error');
    return false;
  } finally {
    button.disabled = false;
    button.innerHTML = original;
  }
}

function initForm() {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  const button = document.getElementById('submit-btn');
  if (!form || !status || !button) return;
  form.addEventListener('submit', async event => {
    event.preventDefault();
    await submitSilentEarnForm(form, status, button, 'Thanks — your message has been sent to SilentEarn.');
  });
}

function initNewsletter() {
  const form = document.getElementById('newsletter-form');
  const status = document.getElementById('newsletter-status');
  const button = document.getElementById('newsletter-btn');
  if (!form || !status || !button) return;
  form.addEventListener('submit', async event => {
    event.preventDefault();
    await submitSilentEarnForm(form, status, button, 'Your request was sent. This form is not yet an automated newsletter subscription.');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderArticles();
  renderResources();
  renderRecommendations();
  initNav();
  initForm();
  initNewsletter();
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
});