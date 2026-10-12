const PRODUCTS = []; // Add only researched, real products and verified destinations.
const RESOURCES = [
  { id:'reality-check', title:'The Product Reality Check Worksheet', category:'BUYING SMART', description:'A practical worksheet to define your need, verify a product, compare trade-offs, and make a considered decision.', href:'product-reality-check.html', fileUrl:'assets/silenteearn-reality-check-worksheet.pdf.b64', fileName:'SilentEarn-Product-Reality-Check.pdf', status:'Free printable guide', cta:'Download PDF' },
  { id:'skill-planner', title:'Digital Skill Path Planner', category:'LEARNING', description:'A guided planner for comparing a skill, learning requirements, practice opportunities, and next steps.', href:'', status:'In preparation', cta:'Coming soon' },
  { id:'affiliate-checklist', title:'Before You Buy: AI Tool Checklist', category:'AI TOOLS', description:'A compact checklist for checking pricing, limitations, privacy, and suitability before signing up.', href:'', status:'In preparation', cta:'Coming soon' }
];
const SKILL_PATHS = [
  { id:'path-ai', title:'AI Tools Beginner Path', level:'START HERE', duration:'3 stages', description:'Define one task, compare a small number of tools, and practise with a real example before paying.', steps:['Choose a task you actually need to complete','Compare free plans, limits, and privacy','Test a simple workflow and write down the result'] },
  { id:'path-skills', title:'Digital Skill Explorer', level:'BUILD A SKILL', duration:'4 stages', description:'Choose a realistic skill by looking at demand, learning time, practice options, and the type of work you enjoy.', steps:['List problems people pay to solve','Compare learning costs and practice access','Create one small sample of your work','Ask for feedback before buying more tools'] },
  { id:'path-products', title:'Smart Product Research', level:'BUY WITH CARE', duration:'3 stages', description:'Learn to evaluate AI software and online services without being distracted by hype or affiliate claims.', steps:['State your actual problem and budget','Verify product details and recurring costs','Compare alternatives and decide whether to wait'] }
];
const WINS = {
  ai:[
    {title:'Give one AI tool a specific job',description:'Choose one task you already do. Ask an AI tool to help with that task, then check its output for errors before using it.',time:'5–10 minutes'},
    {title:'Compare one free-plan limit',description:'Open the official pricing page of a tool you use. Write down one limit that might matter before you depend on it.',time:'5 minutes'},
    {title:'Save a reusable prompt',description:'Turn one repeated instruction into a clear prompt. Include the goal, context, constraints, and what a good answer should contain.',time:'10 minutes'}
  ],
  product:[
    {title:'Check the full price',description:'Find the official pricing page for one product. Note the billing period, renewal price, free-plan limits, and any required add-ons.',time:'5–10 minutes'},
    {title:'Find one meaningful alternative',description:'Search for one alternative to a product you are considering. Compare the use case, limits, and total cost—not just the headline feature.',time:'10 minutes'},
    {title:'Write your deal-breaker',description:'Before buying, write down the one feature, privacy condition, or price limit that would make the product unsuitable for you.',time:'5 minutes'}
  ],
  skill:[
    {title:'Pick one skill to investigate',description:'Choose a skill you might want to learn. Find one beginner lesson and one small practice task you can finish without paying.',time:'10 minutes'},
    {title:'Create a tiny sample',description:'Practise one useful skill by making a small example of your work. Save it so you can compare your progress later.',time:'10–15 minutes'},
    {title:'Ask what the work requires',description:'Find three real job posts or service requests for a skill you are considering. Note which requirements appear repeatedly.',time:'10 minutes'}
  ],
  business:[
    {title:'Identify one costly problem',description:'Think of a person or small business you understand. Write down one repeated task that wastes time and how you might research a better method.',time:'10 minutes'},
    {title:'Make an honest offer draft',description:'Describe one problem you could help solve, the exact deliverable, how long it takes, and what information you still need before quoting a price.',time:'10 minutes'},
    {title:'Check real demand',description:'Look for recent buyer requests or job posts related to your idea. Record the actual needs and avoid assuming interest means someone will pay.',time:'10–15 minutes'}
  ]
};
const SAVED_KEY = 'silentearn-reading-list-v1';
function escapeHtml(value) {
  return String(value == null ? '' : value).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}
function isWebUrl(value) {
  if (typeof value !== 'string' || !value.trim()) return false;
  try { const u = new URL(value); return u.protocol === 'https:' || u.protocol === 'http:'; }
  catch (e) { return false; }
}
function readSaved() {
  try { const v = JSON.parse(localStorage.getItem(SAVED_KEY) || '[]'); return Array.isArray(v) ? v : []; }
  catch (e) { return []; }
}
function writeSaved(items) {
  try { localStorage.setItem(SAVED_KEY, JSON.stringify(items)); return true; }
  catch (e) { return false; }
}
function toggleSaved(item) {
  const list = readSaved();
  const exists = list.some(function(x){ return x.id === item.id; });
  const next = exists ? list.filter(function(x){ return x.id !== item.id; }) : list.concat([item]);
  if (!writeSaved(next)) { alert('Your browser could not save this item.'); return; }
  renderSaved();
  renderSaveButtons();
}
function isSaved(id) { return readSaved().some(function(x){ return x.id === id; }); }
function renderSaveButtons() {
  document.querySelectorAll('[data-save-id]').forEach(function(btn) {
    const saved = isSaved(btn.getAttribute('data-save-id'));
    btn.setAttribute('aria-pressed', String(saved));
    btn.textContent = saved ? '✓ Saved' : '＋ Save for later';
    btn.classList.toggle('is-saved', saved);
  });
}
function renderSaved() {
  const box = document.getElementById('saved-list');
  if (!box) return;
  const list = readSaved();
  if (!list.length) {
    box.innerHTML = '<div class="saved-empty"><span>▤</span><strong>Your reading list is empty.</strong><p>Save a learning path or resource and it will appear here on this device.</p></div>';
    return;
  }
  box.innerHTML = list.map(function(item) {
    return '<article class="saved-item"><div><span class="saved-type">' + escapeHtml(item.category || 'SILENTEARN') + '</span><h3>' + escapeHtml(item.title) + '</h3><p>' + escapeHtml(item.description) + '</p></div><div class="saved-actions">' + (item.href ? '<a class="mini-btn" href="' + escapeHtml(item.href) + '">Open →</a>' : '') + '<button type="button" class="text-button" data-remove-save="' + escapeHtml(item.id) + '">Remove</button></div></article>';
  }).join('');
  box.querySelectorAll('[data-remove-save]').forEach(function(btn) {
    btn.addEventListener('click', function() { writeSaved(readSaved().filter(function(x){return x.id !== btn.getAttribute('data-remove-save');})); renderSaved(); renderSaveButtons(); });
  });
}
function renderArticles() {
  const grid = document.getElementById('article-grid');
  if (!grid) return;
  if (!ARTICLES.length) {
    grid.innerHTML = '<div class="article-empty"><span>✦</span><h3>The first SilentEarn guides are being prepared.</h3><p>We will publish articles here when they are complete, checked, and ready to read.</p></div>';
    return;
  }
  grid.innerHTML = ARTICLES.map(function(article) {
    const saved = isSaved(article.id);
    return '<article class="article-card"><div class="article-art"><span class="article-art-mark">SE</span><small>' + escapeHtml(article.category || 'SILENTEARN GUIDE') + '</small><strong>Research first.<br>Choose with confidence.</strong></div><div class="article-body"><span class="article-status">Published guide</span><h3>' + escapeHtml(article.title) + '</h3><p>' + escapeHtml(article.description) + '</p><div class="article-meta"><span>' + escapeHtml(article.readTime || 'Practical guide') + '</span><span>' + escapeHtml(article.date || '') + '</span></div><div class="article-card-actions"><a class="btn btn-primary" href="' + escapeHtml(article.href) + '">Read guide →</a><button type="button" class="save-button" data-save-id="' + escapeHtml(article.id) + '" aria-pressed="' + String(saved) + '">' + (saved ? '✓ Saved' : '＋ Save for later') + '</button></div></div></article>';
  }).join('');
  renderSaveButtons();
}
function renderResources() {
  const grid = document.getElementById('resource-grid');
  if (!grid) return;
  grid.innerHTML = RESOURCES.map(function(item) {
    const ready = Boolean(item.href);
    const action = item.fileUrl ? '<button type="button" class="btn btn-secondary" data-download-resource="' + escapeHtml(item.id) + '">' + escapeHtml(item.cta) + ' ↓</button>' : ready ? '<a class="btn btn-secondary" href="' + escapeHtml(item.href) + '">' + escapeHtml(item.cta) + ' →</a>' : '<span class="resource-coming">' + escapeHtml(item.cta) + '</span>';
    const saveBtn = '<button type="button" class="save-button" data-save-id="' + escapeHtml(item.id) + '">' + (isSaved(item.id) ? '✓ Saved' : '＋ Save for later') + '</button>';
    return '<article class="resource-card"><div class="resource-card-top"><span class="resource-icon">▤</span><span class="resource-tag">' + escapeHtml(item.category) + '</span></div><span class="resource-status">' + escapeHtml(item.status) + '</span><h3>' + escapeHtml(item.title) + '</h3><p>' + escapeHtml(item.description) + '</p><div class="resource-card-actions">' + action + saveBtn + '</div></article>';
  }).join('');
  renderSaveButtons();
  grid.querySelectorAll('[data-download-resource]').forEach(function(button) {
    button.addEventListener('click', function() {
      const item = RESOURCES.find(function(resource) { return resource.id === button.getAttribute('data-download-resource'); });
      if (item && item.fileUrl) downloadPdfResource(item, button);
    });
  });
}
async function downloadPdfResource(item, button) {
  const original = button.textContent;
  button.disabled = true;
  button.textContent = 'Preparing PDF…';
  try {
    const response = await fetch(item.fileUrl, {cache:'no-store'});
    if (!response.ok) throw new Error('The PDF file could not be loaded.');
    const encoded = (await response.text()).trim();
    if (!encoded || !/^[A-Za-z0-9+/]+={0,2}$/.test(encoded)) throw new Error('The PDF download file is invalid.');
    const binary = window.atob(encoded);
    if (!binary.startsWith('%PDF-') || !binary.trimEnd().endsWith('%%EOF')) throw new Error('The PDF file did not pass validation.');
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    const blob = new Blob([bytes], {type:'application/pdf'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = item.fileName || 'SilentEarn-Resource.pdf';
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(function(){URL.revokeObjectURL(url);},1500);
    button.textContent = 'Downloaded ✓';
  } catch (error) {
    button.textContent = 'Open printable version ↗';
    button.disabled = false;
    button.onclick = function(){ window.location.href = item.href; };
    const note = document.createElement('p');
    note.className = 'download-fallback-note';
    note.textContent = (error && error.message ? error.message + ' ' : '') + 'Use the printable worksheet instead.';
    button.closest('.resource-card').appendChild(note);
    return;
  } finally {
    if (button.disabled) {
      window.setTimeout(function(){ button.disabled = false; if (button.textContent === 'Downloaded ✓') button.textContent = original; }, 2200);
    }
  }
}
function renderPaths() {
  const grid = document.getElementById('path-grid');
  if (!grid) return;
  grid.innerHTML = SKILL_PATHS.map(function(path) {
    const item = {id:path.id,title:path.title,description:path.description,category:'LEARNING PATH',href:'#paths'};
    return '<article class="path-card"><div class="path-topline"><span class="path-level">' + escapeHtml(path.level) + '</span><span class="path-duration">' + escapeHtml(path.duration) + '</span></div><h3>' + escapeHtml(path.title) + '</h3><p>' + escapeHtml(path.description) + '</p><details class="path-steps"><summary>View the steps</summary><ol>' + path.steps.map(function(s){return '<li>' + escapeHtml(s) + '</li>';}).join('') + '</ol></details><button type="button" class="save-button" data-save-id="' + escapeHtml(item.id) + '">' + (isSaved(item.id) ? '✓ Saved' : '＋ Save path') + '</button></article>';
  }).join('');
  renderSaveButtons();
}
function renderProducts() {
  const grid = document.getElementById('product-grid');
  if (!grid) return;
  if (!PRODUCTS.length) {
    grid.innerHTML = '<div class="product-empty"><div class="product-empty-icon">✦</div><span class="product-empty-kicker">CURATED, NOT CROWDED</span><h3>The next product must earn its place.</h3><p>SilentEarn is building its first researched product picks. This space will show real products only after their claims, current terms, audience fit, and official destination have been checked.</p><a class="mini-btn" href="#contact">Suggest a product →</a></div>';
    return;
  }
  grid.innerHTML = PRODUCTS.map(function(p) {
    const url = p.affiliateUrl || p.officialUrl || '';
    const hrefOkay = isWebUrl(url);
    const pros = Array.isArray(p.pros) ? p.pros : [];
    const cons = Array.isArray(p.cons) ? p.cons : [];
    const best = p.bestFor || 'Not yet verified';
    const notFor = p.notFor || 'Not yet verified';
    const price = p.priceNotes || p.price || 'Check current official pricing';
    const disclosure = p.affiliateUrl ? '<p class="product-disclosure">Disclosure: SilentEarn may earn a commission if you purchase through this affiliate link, at no additional cost to you.</p>' : '';
    return '<article class="product-card"><div class="product-card-head"><span class="product-kicker">' + escapeHtml(p.category || 'PRODUCT RESEARCH') + '</span><span class="reality-pill">Reality Checked</span></div><h3>' + escapeHtml(p.name) + '</h3><p class="product-description">' + escapeHtml(p.description || '') + '</p><div class="reality-facts"><div><span>Best for</span><p>' + escapeHtml(best) + '</p></div><div><span>Think twice if</span><p>' + escapeHtml(notFor) + '</p></div><div><span>Pricing note</span><p>' + escapeHtml(price) + '</p></div></div><div class="pros-cons"><div><strong>Potential strengths</strong><ul>' + (pros.length ? pros.map(function(x){return '<li>' + escapeHtml(x) + '</li>';}).join('') : '<li>Not supplied / not verified</li>') + '</ul></div><div><strong>Limitations to consider</strong><ul>' + (cons.length ? cons.map(function(x){return '<li>' + escapeHtml(x) + '</li>';}).join('') : '<li>Not supplied / not verified</li>') + '</ul></div></div><div class="product-card-bottom">' + (hrefOkay ? '<a class="btn btn-primary" href="' + escapeHtml(url) + '" target="_blank" rel="' + (p.affiliateUrl ? 'nofollow sponsored noopener' : 'noopener') + '">' + (p.affiliateUrl ? 'View product ↗' : 'Official product page ↗') + '</a>' : '<span class="resource-coming">Product URL pending</span>') + '</div>' + disclosure + (p.verifiedDate ? '<small class="verified-date">Details checked: ' + escapeHtml(p.verifiedDate) + '</small>' : '') + '</article>';
  }).join('');
}
function renderFinder() {
  const form = document.getElementById('tool-finder');
  const result = document.getElementById('finder-result');
  if (!form || !result) return;
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const goal = document.getElementById('tool-goal').value;
    const level = document.getElementById('tool-level').value;
    const budget = document.getElementById('tool-budget').value;
    const goals = {
      writing:['Writing and research','Start by testing one research or drafting workflow. Check source quality, privacy terms, export limits, and whether the free plan is enough.'],
      design:['Design and visuals','Compare design tools using one real asset. Check commercial-use rights, export quality, watermark rules, and included credits.'],
      video:['Video and audio','Choose a short sample task. Check output rights, rendering limits, watermarking, voice options, and phone compatibility.'],
      business:['Small-business workflows','Start with one repeated task. Check integrations, data handling, recurring cost, and whether it saves more time than it takes to maintain.'],
      learning:['Learning a digital skill','Choose a learning resource plus a practice task. Prefer a path that lets you create samples, get feedback, and learn without a large upfront payment.'],
      workflow:['Repetitive tasks','Map the steps first, then compare tools with the integrations you already use. Check limits and what happens when automation fails.']
    };
    const levelText = level === 'beginner' ? 'Since you are a beginner, favour simple setup and clear documentation.' : level === 'some' ? 'Test the workflow against your current method before switching fully.' : 'Compare reliability, integration depth, security controls, and total cost.';
    const budgetText = budget === 'free' ? 'Start with a free tier or trial where available; check usage limits and renewal terms before committing.' : budget === 'low' ? 'Compare the total monthly and annual cost, not just the starting price.' : 'Pay only when the expected benefit is clear for your specific use case.';
    result.hidden = false;
    result.innerHTML = '<span class="finder-result-label">YOUR STARTING POINT</span><h3>' + escapeHtml(goals[goal][0]) + '</h3><p>' + escapeHtml(goals[goal][1]) + '</p><p>' + escapeHtml(levelText) + ' ' + escapeHtml(budgetText) + '</p><a class="mini-btn" href="#reality-check">Use the Product Reality Check →</a>';
  });
}
let winIndexes = {ai:0,product:0,skill:0,business:0};
function initUsefulWin() {
  const category = document.getElementById('win-category');
  const button = document.getElementById('new-win');
  const title = document.getElementById('win-title');
  const desc = document.getElementById('win-description');
  const time = document.getElementById('win-time');
  const number = document.querySelector('.win-number');
  const done = document.getElementById('complete-win');
  const complete = document.getElementById('win-complete');
  if (!category || !button || !title || !desc || !time) return;
  function showNext() {
    const key = category.value;
    const list = WINS[key] || WINS.ai;
    const idx = winIndexes[key] % list.length;
    const win = list[idx];
    title.textContent = win.title; desc.textContent = win.description; time.textContent = win.time;
    if (number) number.textContent = String(idx + 1).padStart(2,'0');
    winIndexes[key] = (idx + 1) % list.length;
    if (complete) complete.hidden = true;
  }
  button.addEventListener('click', showNext);
  category.addEventListener('change', showNext);
  if (done) done.addEventListener('click', function(){ if (complete) complete.hidden = false; try { localStorage.setItem('silentearn-last-win-' + category.value, title.textContent); } catch(e) {} });
  showNext();
}
function initSaved() {
  document.querySelectorAll('[data-save-id]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      const id = btn.getAttribute('data-save-id');
      const path = SKILL_PATHS.find(function(x){return x.id===id;});
      const resource = RESOURCES.find(function(x){return x.id===id;});
      const article = ARTICLES.find(function(x){return x.id===id;});
      const item = path ? {id:path.id,title:path.title,description:path.description,category:'LEARNING PATH',href:'#paths'} : resource ? {id:resource.id,title:resource.title,description:resource.description,category:resource.category,href:resource.href} : article ? {id:article.id,title:article.title,description:article.description,category:article.category,href:article.href} : null;
      if (item) toggleSaved(item);
    });
  });
  renderSaved();
}
function initNav() {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  if (!toggle || !nav) return;
  toggle.addEventListener('click',function(){const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});
  nav.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');});});
}
async function sendForm(form,status,button,successMessage) {
  if (!form.checkValidity()) { form.reportValidity(); return; }
  const original=button.innerHTML; button.disabled=true; button.textContent='Sending…'; status.textContent='';
  try {
    const response=await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(Object.fromEntries(new FormData(form).entries()))});
    const data=await response.json().catch(function(){return {};});
    if (!response.ok) throw new Error(data.error || 'Unable to send your request.');
    status.textContent=successMessage;status.style.color='var(--success)';form.reset();
  } catch(error) {
    status.textContent=(error && error.message) || 'The request could not be sent. Please contact SilentEarn by email or WhatsApp.';status.style.color='var(--danger)';
  } finally {button.disabled=false;button.innerHTML=original;}
}
function initForms() {
  const form=document.getElementById('contact-form'),status=document.getElementById('form-status'),button=document.getElementById('submit-btn');
  if(form&&status&&button)form.addEventListener('submit',function(e){e.preventDefault();sendForm(form,status,button,'Thanks. Your message has been sent to SilentEarn.');});
  const nf=document.getElementById('newsletter-form'),ns=document.getElementById('newsletter-status'),nb=document.getElementById('newsletter-btn');
  if(nf&&ns&&nb)nf.addEventListener('submit',function(e){e.preventDefault();sendForm(nf,ns,nb,'Your request was sent to SilentEarn. You are not subscribed until the newsletter system confirms signup.');});
}
document.addEventListener('DOMContentLoaded',function(){
  renderArticles();renderResources();renderPaths();renderProducts();renderFinder();initUsefulWin();initNav();initSaved();initForms();
  const year=document.getElementById('year');if(year)year.textContent=new Date().getFullYear();
});