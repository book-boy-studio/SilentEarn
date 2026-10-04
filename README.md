# SilentEarn — Vercel-ready website

A lightweight, responsive SilentEarn website built with plain HTML/CSS/JS plus one Vercel serverless function for the contact form.

## Included
- SilentEarn brand hero and positioning
- Digital products store section
- Custom digital products/services section
- Blog/learning section
- FAQ accordion
- Contact form
- WhatsApp CTA with +2348110845979
- Affiliate disclosure
- Privacy and terms pages
- Vercel serverless email endpoint using Resend

## Deploy to Vercel
1. Upload this folder to a GitHub repository.
2. Import the repository into Vercel.
3. Vercel can deploy it as a static site with the `api/contact.js` function.
4. Add these Environment Variables in Vercel:

   - `RESEND_API_KEY` = your Resend API key
   - `EMAIL_TO` = `SilentEarnn@email.com` (or another inbox you control)
   - `EMAIL_FROM` = a sender supported by your Resend account, e.g. `SilentEarn Website <hello@yourdomain.com>`

5. Redeploy.

### Email sender note
For a production domain, verify a domain in Resend and use a sender address on that verified domain. The default `onboarding@resend.dev` is intended for testing.

## Digital product checkout
Open `script.js` and edit the `PRODUCTS` array.

Each product supports:
- `price`
- `checkoutUrl`
- `name`
- `description`
- `features`

If `checkoutUrl` is empty, the product button automatically opens WhatsApp with a prefilled order message. Add your Paystack/Payhip/Gumroad/Lemon Squeezy checkout URL when ready.

## Important
The sample products and prices are placeholders for launch design. Replace them with your real products, pricing, delivery terms, and checkout links before publishing.
