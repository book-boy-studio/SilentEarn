# SilentEarn — The Quiet Advantage

SilentEarn is a blogging-first digital publishing and product-discovery brand focused on AI tools, digital skills, freelancing, and realistic online opportunities.

## Brand
- **Name:** SilentEarn
- **Positioning:** AI • Digital Skills • Real Opportunities
- **Philosophy:** Learn. Build. Earn. Grow.
- **Signature idea:** The Quiet Advantage — less hype, better questions, more useful decisions.
- **Palette:** Midnight navy (#0B1220), electric teal (#18C6B4), soft white (#F7F9FC), slate gray (#64748B).

## Website features
- SilentEarn Reality Check: explains what readers should verify before choosing a product.
- Find My Tool: interactive questionnaire that gives a helpful starting point without pretending an unverified product is recommended.
- One Useful Win: small practical actions by topic.
- Free Resource Vault: includes the printable Product Reality Check worksheet and clearly labels unfinished resources.
- Skill paths: step-by-step learning plans.
- Save for Later: local browser reading list; it is not synced across devices.
- SilentEarn Notes: signup-request form. Automated newsletter subscription is not active until a provider is connected.
- Revenue pathways: affiliate partnerships, validated digital products, and transparent company partnerships.
- Contact form, WhatsApp, affiliate disclosure, privacy, and terms.

## Blog articles
The homepage reads the `ARTICLES` array in `script.js`. The first article is `how-to-evaluate-ai-tools-before-paying.html`. Add only published, complete articles, with accurate summaries and working URLs.

## Official creator and logo assets\nThe owner has supplied official creator photographs and the exact SilentEarn logo. See `SILENTEARN_OFFICIAL_BRAND_ASSET_RULES.md` for authoritative handling rules. The originals are preserved in the downloadable SilentEarn Official Brand Assets pack; the website does not use these images until the display copies are added to the repository under the documented asset paths and the markup is updated. Never substitute a generated creator or a redesigned logo.\n\n## Add a product
Edit the `PRODUCTS` array near the top of `script.js`. Do not add fake data or placeholders as if they are published products. Each real product can include:
- `name`, `category`, and `description`
- `affiliateUrl` or `officialUrl` (never mislabel an ordinary URL as an affiliate link)
- `bestFor`, `notFor`, `priceNotes`
- `pros` and `cons` based on verified details
- `verifiedDate` and `sourceUrls` for internal tracking

Before adding a product, research the official feature list, pricing and billing, limitations, refund/cancellation terms, privacy, relevant availability, and credible independent sources. Never invent personal testing, testimonials, earnings, or guaranteed results. Affiliate cards show a disclosure.

## Resources
The first resource is `product-reality-check.html`, a mobile-friendly worksheet with a Print / Save as PDF control. On Android, use the browser print interface and select Save as PDF when available. Other resources remain marked as in preparation until their files genuinely exist.

Edit the `RESOURCES` array in `script.js` when adding a resource. Confirm every download or destination works before marking an item as ready.

## Learning paths and One Useful Win
Edit the `SKILL_PATHS` and `WINS` objects in `script.js` to expand the learning paths and short practical actions. Save for Later uses localStorage in the current browser/device; it does not collect an account or sync to a server.

## Monetization plan
1. Affiliate links: relevant product recommendations and product research, with clear disclosure.
2. Digital products: build free resources first; develop paid e-books or templates after validating demand.
3. Company partnerships: seek affiliate programme terms, product access, reader offers, and disclosed sponsored educational coverage from relevant software companies.

Do not promise a specific income outcome. Do not claim traffic, customers, performance, or audience metrics without evidence.

## Social channels
Previously shared profiles:
- YouTube: https://youtube.com/@silentearnnn
- Facebook: https://www.facebook.com/SilentEarn
- TikTok: https://www.tiktok.com/@silentearnn
- WhatsApp: https://wa.me/2348110845979

Instagram, Pinterest, X, and LinkedIn are listed as intended distribution platforms; replace generic destinations in `index.html` with actual SilentEarn profile URLs when confirmed.

## Contact form and newsletter
The API endpoint is `/api/contact`. Configure these Vercel environment variables:
- `RESEND_API_KEY`
- `EMAIL_TO` (defaults to `SilentEarnn@email.com`)
- `EMAIL_FROM` (must be supported by your Resend account)

The SilentEarn Notes form currently sends a contact request. It does not automatically subscribe users to a mailing list or deliver PDF files. Connect a newsletter provider, consent process, and unsubscribe mechanism before promising automated email delivery.

## Revenue-inspired outreach
See `SILENTEARN_REVENUE_AND_ENGAGEMENT_PLAYBOOK.md` for the revenue strategy and outreach process. See `SILENTEARN_CLAUDE_PROJECT_ADDENDUM.md` for instructions you can add to your Claude Project Knowledge.

## Deployment checklist
After deployment:
- Test mobile and desktop navigation.
- Test Find My Tool, One Useful Win, save/remove reading-list items, and the printable worksheet.
- Test the contact form and the newsletter request form.
- Verify every product URL, disclosure, and resource file.
- Replace generic social destinations with confirmed brand profiles.
- Confirm the Vercel deployment actually succeeded; a GitHub commit alone does not prove the live site is working.


## Link in bio
SilentEarn's owned, Linktree-style page is `links.html`. Use the live full URL (your website domain plus `/links.html`) as the website link in social profiles after deployment. This is a SilentEarn page hosted on the brand's own website, not a separately created third-party Linktree account. Keep it updated as official profiles are confirmed.

Current confirmed profile destinations:
- YouTube: https://youtube.com/@silentearnnn
- Facebook: https://www.facebook.com/SilentEarn
- TikTok: https://www.tiktok.com/@silentearnn
- WhatsApp: https://wa.me/2348110845979

Instagram, Pinterest, X, and LinkedIn are labelled as upcoming until the owner supplies the actual SilentEarn profile URLs. Do not use generic platform homepages as official profile links.

## Official web assets
- Full exact logo for dark/light presentation: `assets/brand/silenteearn-official-logo.webp`
- Symbol derivative for compact brand contexts: `assets/brand/silenteearn-official-symbol.webp`
- Primary creator portrait: `assets/creator/silenteearn-creator-portrait.webp`

These are derivatives from the owner's supplied official files; keep the originals preserved in the brand asset bundle and never substitute a generated creator or logo.
