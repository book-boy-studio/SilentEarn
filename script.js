const SOCIAL_LINKS = {
  youtube: '',
  facebook: '',
  tiktok: ''
};

/*
  VIDEO LIBRARY
  Add a real YouTube video ID when each SilentEarn video is published.
  Example: "dQw4w9WgXcQ"
  Add transcriptUrl later when a written transcript page/file exists.
*/
const VIDEOS = [
  {
    title: 'How to Use AI to Build a Real Digital Skill',
    tag: 'AI + DIGITAL SKILLS',
    description: 'A practical introduction to turning AI tools into a useful skill you can improve and offer.',
    duration: 'Featured',
    videoId: '',
    videoUrl: '',
    transcriptUrl: ''
  },
  {
    title: 'AI Side Hustles: What Is Actually Worth Learning?',
    tag: 'AI + SIDE HUSTLES',
    description: 'A realistic framework for evaluating AI-powered opportunities without chasing hype.',
    duration: 'Featured',
    videoId: '',
    videoUrl: '',
    transcriptUrl: ''
  },
  {
    title: 'How to Start Freelancing With AI as a Beginner',
    tag: 'FREELANCING',
    description: 'A beginner-friendly roadmap for learning a service, building samples, and approaching real clients.',
    duration: 'Featured',
    videoId: '',
    videoUrl: '',
    transcriptUrl: ''
  }
];

const RESOURCES = [
  {
    icon: '🧭',
    title: 'AI Side-Hustle Starter Guide',
    description: 'A simple framework for comparing opportunities, choosing a skill, and planning your first steps.',
    href: '#products',
    label: 'Explore products'
  },
  {
    icon: '📝',
    title: 'Video Notes & Checklists',
    description: 'Save the key ideas from SilentEarn videos in practical, easy-to-review formats.',
    href: '#video-library',
    label: 'Browse video library'
  },
  {
    icon: '⚙️',
    title: 'AI Workflow Templates',
    description: 'Reusable workflows and prompt systems that help turn AI into a practical work tool.',
    href: '#products',
    label: 'View tools'
  }
];

const AI_TOOLS = [
  {
    icon: '✍️',
    title: 'Writing & Research',
    description: 'Tools for research, outlining, drafting, editing, summarizing, and content workflows.',
    status: 'Recommended tools will be added'
  },
  {
    icon: '🎬',
    title: 'Video & Creative',
    description: 'Tools for scripting, voice, visuals, editing, thumbnails, and video production.',
    status: 'Recommended tools will be added'
  },
  {
    icon: '⚡',
    title: 'Automation & Productivity',
    description: 'Tools for repetitive work, planning, organization, workflow automation, and efficiency.',
    status: 'Recommended tools will be added'
  }
];

const RECOMMENDATIONS = [
  {
    label: 'AI TOOLS',
    title: 'Useful AI tools',
    description: 'Curated tools that SilentEarn finds useful for specific jobs and workflows.',
    href: '#tools',
    labelButton: 'See toolbox'
  },
  {
    label: 'CREATOR TOOLS',
    title: 'Video-creation resources',
    description: 'Future recommendations for voice, editing, visuals, thumbnails, and production.',
    href: '#tools',
    labelButton: 'See resources'
  },
  {
    label: 'DIGITAL WORK',
    title: 'Freelancing resources',
    description: 'Practical services, learning resources, and tools that support digital work.',
    href: '#resources',
    labelButton: 'Explore resources'
  }
];

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
  return String(value).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
}

function videoUrl(video) {
  return video.videoUrl || (video.videoId ? `https://www.youtube.com/watch?v=${video.videoId}` : '');
}

function thumbnailMarkup(video) {
  if (video.videoId) {
    return `<img src="https://img.youtube.com/vi/${encodeURIComponent(video.videoId)}/hqdefault.jpg" alt="" loading="lazy" />`;
  }
  return '<div class="play" aria-hidden="true">▶</div><span class="coming">Add published video</span>';
}

function renderVideos() {
  const grid = document.getElementById('video-grid');
  const transcriptGrid = document.getElementById('transcript-grid');
  if (!grid) return;

  grid.innerHTML = VIDEOS.map(video => {
    const watch = videoUrl(video);
    const watchButton = watch
      ? `<a class="mini-btn" href="${watch}" target="_blank" rel="noopener">Watch on YouTube ↗</a>`
      : '<span class="mini-btn disabled">Publish video first</span>';
    const transcriptButton = video.transcriptUrl
      ? `<a class="mini-btn" href="${video.transcriptUrl}">Transcript</a>`
      : '<span class="mini-btn disabled">Transcript coming</span>';
    return `
      <article class="video-card">
        <div class="video-thumb">${thumbnailMarkup(video)}${video.videoId ? '<div class="play" aria-hidden="true">▶</div>' : ''}</div>
        <div class="video-body">
          <span class="video-tag">${escapeHtml(video.tag)}</span>
          <h3>${escapeHtml(video.title)}</h3>
          <p>${escapeHtml(video.description)}</p>
          <div class="video-meta"><span>${escapeHtml(video.duration)}</span><span>SilentEarn</span></div>
          <div class="video-links">${watchButton}${transcriptButton}</div>
        </div>
      </article>`;
  }).join('');

  if (transcriptGrid) {
    transcriptGrid.innerHTML = VIDEOS.map(video => {
      const link = video.transcriptUrl
        ? `<a class="mini-btn" href="${video.transcriptUrl}">Read transcript →</a>`
        : '<span class="mini-btn disabled">Add transcript link</span>';
      return `
        <article class="transcript-card">
          <span class="video-tag">${escapeHtml(video.tag)}</span>
          <h4>${escapeHtml(video.title)}</h4>
          <p>Written notes and transcript space for this video.</p>
          ${link}
        </article>`;
    }).join('');
  }
}

function renderResources() {
  const grid = document.getElementById('resource-grid');
  if (!grid) return;
  grid.innerHTML = RESOURCES.map(item => `
    <article class="resource-card">
      <span>${item.icon}</span>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.description)}</p>
      <a class="mini-btn" href="${item.href}">${escapeHtml(item.label)} →</a>
    </article>`).join('');
}

function renderTools() {
  const grid = document.getElementById('tool-grid');
  if (!grid) return;
  grid.innerHTML = AI_TOOLS.map(item => `
    <article class="tool-card">
      <span>${item.icon}</span>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.description)}</p>
      <div class="tool-status">${escapeHtml(item.status)}</div>
    </article>`).join('');
}

function renderRecommendations() {
  const grid = document.getElementById('recommendation-grid');
  if (!grid) return;
  grid.innerHTML = RECOMMENDATIONS.map(item => `
    <article class="recommendation-card">
      <span class="rec-label">${escapeHtml(item.label)}</span>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.description)}</p>
      <a class="mini-btn" href="${item.href}">${escapeHtml(item.labelButton)} →</a>
    </article>`).join('');
}

function renderProducts() {
  const grid = document.getElementById('product-grid');
  if (!grid) return;
  grid.innerHTML = PRODUCTS.map(p => {
    const message = encodeURIComponent(`Hello SilentEarn, I want to order the ${p.name} (${p.price}). Please send me the next steps.`);
    const href = p.checkoutUrl || `https://wa.me/${whatsappNumber}?text=${message}`;
    return `
      <article class="product-card">
        <div class="product-badge">${escapeHtml(p.badge)}</div>
        <h3>${escapeHtml(p.name)}</h3>
        <p>${escapeHtml(p.description)}</p>
        <ul class="product-features">${p.features.map(f => `<li>${escapeHtml(f)}</li>`).join('')}</ul>
        <div class="product-bottom">
          <div><div class="price">${escapeHtml(p.price)}</div><div class="product-note">Digital delivery</div></div>
          <a class="btn btn-primary" href="${href}" target="_blank" rel="noopener">${escapeHtml(p.whatsappLabel)} <span>→</span></a>
        </div>
      </article>`;
  }).join('');
}

function setSocialLinks() {
  const configs = [
    ['.js-youtube-link', SOCIAL_LINKS.youtube],
    ['.js-facebook-link', SOCIAL_LINKS.facebook],
    ['.js-tiktok-link', SOCIAL_LINKS.tiktok]
  ];
  configs.forEach(([selector, url]) => {
    document.querySelectorAll(selector).forEach(link => {
      if (url) {
        link.href = url;
        link.target = '_blank';
        link.rel = 'noopener';
      } else {
        link.href = '#video-library';
        link.removeAttribute('target');
      }
    });
  });
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

async function submitSilentEarnForm(form, status, button, successMessage) {
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

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
    if (!response.ok) throw new Error(data.error || 'Unable to send the form.');
    status.textContent = successMessage;
    status.style.color = 'var(--success)';
    showToast('Done.', 'success');
    form.reset();
  } catch (error) {
    status.textContent = error.message || 'Something went wrong. Please use WhatsApp instead.';
    status.style.color = 'var(--danger)';
    showToast('The form could not be sent. WhatsApp is available as a fallback.', 'error');
  } finally {
    button.disabled = false;
    button.innerHTML = 'Submit <span>→</span>';
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
    button.innerHTML = 'Send message <span>→</span>';
  });
}

function initNewsletter() {
  const form = document.getElementById('newsletter-form');
  const status = document.getElementById('newsletter-status');
  const button = document.getElementById('newsletter-btn');
  if (!form || !status || !button) return;

  form.addEventListener('submit', async event => {
    event.preventDefault();
    await submitSilentEarnForm(form, status, button, 'You’re on the SilentEarn email list.');
    button.innerHTML = 'Join the list <span>→</span>';
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderVideos();
  renderResources();
  renderTools();
  renderRecommendations();
  renderProducts();
  setSocialLinks();
  initNav();
  initForm();
  initNewsletter();

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
});
