# SilentEarn — Product Promotion Video Brand

SilentEarn is a product-first video brand focused exclusively on YouTube and TikTok.

## Brand
- **Name:** SilentEarn
- **Positioning:** AI • Digital Skills • Real Opportunities
- **Philosophy:** Learn. Build. Earn. Grow.
- **Business model:** Research relevant products and promote them through clear product-focused videos and affiliate links.
- **Editing:** CapCut only. Do not recommend VN.
- **Visual identity:** Midnight navy (#0B1220), electric teal (#18C6B4), soft white (#F7F9FC), slate gray (#64748B).

## Website purpose
The website is a product discovery hub supporting SilentEarn's YouTube and TikTok videos. It provides:
- Featured products and their official or verified affiliate destinations.
- Published YouTube/TikTok videos connected to products.
- A concise product-discovery approach.
- Contact and relevant legal information.

It is not intended as a blog, e-book/PDF shop, newsletter funnel, or multi-platform social content hub.

## Add products
Edit the `PRODUCTS` array in `script.js`. Each item can include:
- `name`: accurate product name.
- `category`: product category.
- `hook`: concise, truthful benefit/positioning line.
- `description`: clear summary based on verified information.
- `highlights`: optional list of real features.
- `affiliateUrl`: your valid affiliate link, if you have joined that program.
- `officialUrl`: official product URL when no affiliate link is being used.
- `priceLabel`: optional current price only after checking.
- `imageUrl`: product image URL you have permission to use.
- `videoUrl`: published SilentEarn video related to the product.

Do not invent products, prices, product features, personal tests, testimonials, or results. Avoid adding a card until the product name, details, and destination have been checked. Affiliate links automatically display a short disclosure on the product card.

## Add published videos
Edit the `VIDEOS` array in `script.js`. Only include videos actually published on YouTube or TikTok.
Fields: `platform`, `title`, `description`, `videoUrl`, `videoId`, `thumbnailUrl`, `category`, and `duration`.
Use real public video URLs. Do not add placeholder videos as if they were already published.

## Official channels
- YouTube: https://youtube.com/@silentearnnn
- TikTok: https://www.tiktok.com/@silentearnn

No other social platforms are official SilentEarn content channels.

## Affiliate disclosure
Keep disclosures clear, short, and close to affiliate recommendations. The site currently uses this concise wording: "Some product links are affiliate links. If you buy through an eligible link, SilentEarn may earn a commission at no extra cost to you."

## Contact form
The endpoint is `/api/contact`. Configure in Vercel:
- `RESEND_API_KEY`
- `EMAIL_TO` (defaults to `SilentEarnn@email.com`)
- `EMAIL_FROM` (must be supported by the Resend account)

## Deployment
After deployment, check the homepage on Android/mobile and desktop, click the YouTube and TikTok links, test navigation, check product destination URLs, and submit the contact form. A successful commit does not itself prove that the live deployment succeeded.
