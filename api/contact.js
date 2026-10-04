export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed.' });

  try {
    const { name, email, phone = '', requestType, message, consent } = req.body || {};
    if (!name || !email || !requestType || !message || consent !== 'on') {
      return res.status(400).json({ error: 'Please complete all required fields and consent to be contacted.' });
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) return res.status(400).json({ error: 'Please enter a valid email address.' });
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) return res.status(500).json({ error: 'Email delivery is not configured yet. Please use WhatsApp while the site is being connected.' });
    const to = process.env.EMAIL_TO || 'SilentEarnn@email.com';
    const from = process.env.EMAIL_FROM || 'SilentEarn Website <onboarding@resend.dev>';
    const html = '<div style="font-family:Arial,sans-serif;line-height:1.6;color:#101828">' +
      '<h2>New SilentEarn website enquiry</h2>' +
      '<p><strong>Name:</strong> ' + escapeHtml(name) + '</p>' +
      '<p><strong>Email:</strong> ' + escapeHtml(email) + '</p>' +
      '<p><strong>Phone/WhatsApp:</strong> ' + escapeHtml(phone) + '</p>' +
      '<p><strong>Request type:</strong> ' + escapeHtml(requestType) + '</p>' +
      '<p><strong>Message:</strong></p>' +
      '<div style="white-space:pre-wrap;border:1px solid #e5e7eb;border-radius:10px;padding:12px;background:#f8fafc">' + escapeHtml(message) + '</div></div>';
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + apiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to: [to], reply_to: email, subject: 'SilentEarn enquiry — ' + requestType, html })
    });
    const result = await resendResponse.json();
    if (!resendResponse.ok) return res.status(502).json({ error: result?.message || 'Email provider rejected the message.' });
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: 'Unexpected server error. Please try WhatsApp instead.' });
  }
}

function escapeHtml(value = '') {
  return String(value).replace(/[&<>'"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[c]));
}