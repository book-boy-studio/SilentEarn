const PRODUCTS = [
  {
    name: 'AI Side Hustle Starter Kit',
    badge: 'Beginner toolkit',
    description: 'A practical starter system for choosing an AI-powered side hustle, building the right skill, and taking the first steps.',
    features: ['Opportunity framework', 'Skill + tool checklist', '7-day action plan', 'Client-ready starter prompts'],
    price: '₦7,500',
    checkoutUrl: '',
    whatsappLabel: 'Order via WhatsApp'
  },
  {
    name: 'AI Freelance Writer Toolkit',
    badge: 'Freelancing',
    description: 'A focused toolkit for beginners who want to build an AI-assisted freelance writing workflow and approach clients professionally.',
    features: ['Niche & offer worksheet', 'Portfolio starter plan', 'Prompt library', 'Outreach templates'],
    price: '₦12,500',
    checkoutUrl: '',
    whatsappLabel: 'Get the toolkit'
  },
  {
    name: 'AI Content System for Small Businesses',
    badge: 'Business toolkit',
    description: 'A repeatable content workflow for small businesses that want to plan, create, and repurpose useful content with AI.',
    features: ['Content pillars', '30-day planner', 'Prompt workflows', 'Repurposing checklist'],
    price: '₦19,500',
    checkoutUrl: '',
    whatsappLabel: 'Request the system'
  }
];

const whatsappNumber = '2348110845979';

function escapeHtml(value = '') {
  return value.replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
}

function renderProducts() {
  const grid = document.getElementById('product-grid');
  if (!grid) return;
  grid.innerHTML = PRODUCTS.map((p, index) => {
    const message = encodeURIComponent(`Hello SilentEarn, I want to order the ${p.name} (${p.price}). Please send me the next steps.`);
    const href = p.checkoutUrl || `https://wa.me/${whatsappNumber}?text=${message}`;
    const target = p.checkoutUrl ? 'target="_blank" rel="noopener"' : 'target="_blank" rel="noopener"';
    return `
      <article class="product-card">
        <div class="product-badge">${escapeHtml(p.badge)}</div>
        <h3>${escapeHtml(p.name)}</h3>
        <p>${escapeHtml(p.description)}</p>
        <ul class="product-features">${p.features.map(f => `<li>${escapeHtml(f)}</li>`).join('')}</ul>
        <div class="product-bottom">
          <div><div class="price">${escapeHtml(p.price)}</div><div class="product-note">Digital delivery</div></div>
          <a class="btn btn-primary" href="${href}" ${target}>${escapeHtml(p.whatsappLabel)} <span>→</span></a>
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
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
}

function showToast(message, type = '') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 4200);
}

function initForm() {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  const button = document.getElementById('submit-btn');
  if (!form) return;
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    button.disabled = true;
    button.textContent = 'Sending…';
    status.textContent = '';
    const payload = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || 'Unable to send the form.');
      status.textContent = 'Thanks — your message has been sent to SilentEarn.';
      status.style.color = 'var(--success)';
      showToast('Message sent successfully.', 'success');
      form.reset();
    } catch (error) {
      status.textContent = error.message || 'Something went wrong. Please use WhatsApp instead.';
      status.style.color = 'var(--danger)';
      showToast('The form could not be sent. WhatsApp is available as a fallback.', 'error');
    } finally {
      button.disabled = false;
      button.innerHTML = 'Send message <span>→</span>';
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  initNav();
  initForm();
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
});
