# SilentEarn — Blog-First Affiliate Publishing Website

SilentEarn is a blogging-first digital publishing brand focused on AI tools, digital skills, freelancing, productivity, and realistic online opportunities.

## Brand identity
- Brand: SilentEarn
- Positioning: AI • Digital Skills • Real Opportunities
- Philosophy: Learn. Build. Earn. Grow.
- Primary visual palette: midnight navy (#0b1220), electric teal (#18c6b4), soft white (#f7f9fc), and slate gray (#64748b).

## Website goals
- Publish useful SEO articles, tutorials, product reviews, comparisons, and guides.
- Promote relevant affiliate products with accurate information and clear disclosures.
- Build a library of genuinely useful free PDF guides and e-books.
- Support content distribution across YouTube, Facebook, TikTok, Instagram, Pinterest, X, LinkedIn, WhatsApp, and email.
- Provide contact and partnership options.
- Avoid unsupported claims, fake reviews, guaranteed income claims, and unverified product pricing.

## Add blog articles
Edit the `ARTICLES` array in `script.js`. Each article has `category`, `title`, `description`, `status`, and `href`. Only use `status: 'Published'` and a live article URL after the article has actually been published.

## Add free PDF resources
Edit the `RESOURCES` array in `script.js`. Add a working download URL only after the PDF exists and has been checked. Do not advertise automatic delivery until the delivery system is configured.

## Add product recommendations
Edit the `RECOMMENDATIONS` array in `script.js`. Add only products that have been checked and use the correct product or affiliate URL. Supported fields include `category`, `title`, `description`, `href`, and `disclosure`. Set disclosure to true when the link is an affiliate link. Keep the public disclosure visible.

## Social profiles
Known profiles:
- YouTube: https://youtube.com/@silentearnnn
- Facebook: https://www.facebook.com/SilentEarn
- TikTok: https://www.tiktok.com/@silentearnn
- WhatsApp: https://wa.me/2348110845979

For Instagram, Pinterest, X, and LinkedIn, replace the generic platform destinations in `index.html` with the actual SilentEarn profile URLs once those accounts are confirmed. Do not guess usernames.

## Contact form and email
The contact endpoint is `/api/contact`. Configure these environment variables in Vercel:
- `RESEND_API_KEY`
- `EMAIL_TO` (defaults to `SilentEarnn@email.com`)
- `EMAIL_FROM` (must be a sender supported by your Resend account)

The newsletter form currently sends a request to the contact endpoint; it is not an automated email subscription system. Connect a newsletter provider before advertising automatic signup or PDF delivery.

## Deploy
The repository is designed for Vercel. Commits to the connected deployment branch may trigger a deployment automatically. Confirm the build and test the live site after deployment.
