const PRODUCTS = [];
const VIDEOS = [];

function escapeHtml(value = '') {
  return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
function isWebUrl(value) {
  try {
    const u = new URL(value);
    return u.protocol === 'https:' || u.protocol === 'http:';
  } catch (e) { return false; }
}
function renderProducts() {
  const grid = document.getElementById('product-grid');
  if (!grid) return;
  if (!PRODUCTS.length) {
    grid.innerHTML = '<article class="product-empty"><div class="product-empty-icon">↗</div><span class="product-empty-kicker">FEATURED PRODUCT PICKS</span><h3>Useful products, explained in video.</h3><p>Product links will be added here after the destination and main product details are checked.</p><div class="inline-actions"><a class="btn btn-primary" href="https://youtube.com/@silentearnnn" target="_blank" rel="noopener">YouTube ↗</a><a class="btn btn-secondary" href="https://www.tiktok.com/@silentearnn" target="_blank" rel="noopener">TikTok ↗</a></div></article>';
    return;
  }
  grid.innerHTML = PRODUCTS.map(function(p) {
    const href = p.affiliateUrl || p.officialUrl || '';
    const linkOkay = isWebUrl(href);
    const imageOkay = p.imageUrl && isWebUrl(p.imageUrl);
    const image = imageOkay ? '<img class="product-image" src="' + escapeHtml(p.imageUrl) + '" alt="' + escapeHtml(p.name) + '" loading="lazy">' : '<div class="product-image-fallback"><span>SE</span><small>' + escapeHtml(p.category || 'FEATURED PRODUCT') + '</small></div>';
    const highlights = Array.isArray(p.highlights) ? p.highlights.slice(0, 4).map(function(h) { return '<li>' + escapeHtml(h) + '</li>'; }).join('') : '';
    const button = linkOkay ? '<a class="btn btn-primary product-action" href="' + escapeHtml(href) + '" target="_blank" rel="nofollow sponsored noopener">' + (p.affiliateUrl ? 'Check product ↗' : 'Official website ↗') + '</a>' : '<span class="product-missing-link">Product link pending</span>';
    const demo = p.videoUrl && isWebUrl(p.videoUrl) ? '<a class="product-video-link" href="' + escapeHtml(p.videoUrl) + '" target="_blank" rel="noopener">Watch the video ↗</a>' : '';
    const disclosure = p.affiliateUrl ? '<p class="product-disclosure">Affiliate link: SilentEarn may earn a commission at no extra cost to you.</p>' : '';
    return '<article class="product-card"><div class="product-card-art">' + image + '<span class="product-chip">' + escapeHtml(p.category || 'FEATURED') + '</span></div><div class="product-card-body"><span class="product-kicker">' + escapeHtml(p.category || 'PRODUCT PICK') + '</span><h3>' + escapeHtml(p.name) + '</h3><p class="product-hook">' + escapeHtml(p.hook || '') + '</p><p>' + escapeHtml(p.description || '') + '</p>' + (highlights ? '<ul class="product-highlights">' + highlights + '</ul>' : '') + '<div class="product-card-bottom">' + (p.priceLabel ? '<span class="product-price-label">' + escapeHtml(p.priceLabel) + '</span>' : '') + button + '</div>' + demo + disclosure + '</div></article>';
  }).join('');
}
function renderVideos() {
  const grid = document.getElementById('video-grid');
  if (!grid) return;
  if (!VIDEOS.length) {
    grid.innerHTML = '<div class="video-empty"><div class="video-empty-mark">▶</div><span class="video-empty-label">VIDEO LIBRARY</span><h3>Watch SilentEarn’s latest videos.</h3><p>Explore product explainers and demonstrations on our official channels.</p><div class="inline-actions"><a class="btn btn-primary" href="https://youtube.com/@silentearnnn" target="_blank" rel="noopener">YouTube ↗</a><a class="btn btn-secondary" href="https://www.tiktok.com/@silentearnn" target="_blank" rel="noopener">TikTok ↗</a></div></div>';
    return;
  }
  grid.innerHTML = VIDEOS.map(function(v) {
    const href = v.videoUrl && isWebUrl(v.videoUrl) ? v.videoUrl : '';
    let image = '';
    if (v.thumbnailUrl && isWebUrl(v.thumbnailUrl)) image = '<img src="' + escapeHtml(v.thumbnailUrl) + '" alt="" loading="lazy">';
    else if (v.platform === 'YouTube' && v.videoId) image = '<img src="https://img.youtube.com/vi/' + encodeURIComponent(v.videoId) + '/hqdefault.jpg" alt="" loading="lazy">';
    else image = '<div class="video-artwork"><span class="video-artwork-mark">SE</span><span class="video-artwork-caption">SILENTEARN VIDEO</span></div>';
    return '<article class="video-card"><a class="video-thumb" href="' + (href ? escapeHtml(href) : '#videos') + '" ' + (href ? 'target="_blank" rel="noopener"' : '') + '>' + image + '<span class="video-play">▶</span><span class="video-platform-badge">' + escapeHtml(v.platform || 'SILENTEARN') + '</span></a><div class="video-body"><span class="video-tag">' + escapeHtml(v.category || v.platform || 'PRODUCT VIDEO') + '</span><h3>' + escapeHtml(v.title) + '</h3><p>' + escapeHtml(v.description || '') + '</p><div class="video-meta"><span>' + escapeHtml(v.duration || 'Video') + '</span><span>SilentEarn</span></div>' + (href ? '<a class="mini-btn" href="' + escapeHtml(href) + '" target="_blank" rel="noopener">Watch video ↗</a>' : '') + '</div></article>';
  }).join('');
}
function initNav() {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', function() {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach(function(a) { a.addEventListener('click', function() { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }); });
}
async function submitForm(form, status, button) {
  if (!form.checkValidity()) { form.reportValidity(); return; }
  const label = button.innerHTML;
  button.disabled = true; button.textContent = 'Sending…'; status.textContent = '';
  try {
    const response = await fetch('/api/contact', {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(Object.fromEntries(new FormData(form).entries()))});
    const data = await response.json().catch(function(){return {};});
    if (!response.ok) throw new Error(data.error || 'Unable to send your message.');
    status.textContent = 'Thanks — your message has been sent to SilentEarn.'; status.style.color = 'var(--success)'; form.reset();
  } catch (error) {
    status.textContent = error.message || 'The message could not be sent. Please try email or WhatsApp.'; status.style.color = 'var(--danger)';
  } finally { button.disabled = false; button.innerHTML = label; }
}
function initContactForm() {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  const button = document.getElementById('submit-btn');
  if (!form || !status || !button) return;
  form.addEventListener('submit', function(e) { e.preventDefault(); submitForm(form, status, button); });
}
document.addEventListener('DOMContentLoaded', function() {
  renderProducts();
  renderVideos();
  initNav();
  initContactForm();
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
});