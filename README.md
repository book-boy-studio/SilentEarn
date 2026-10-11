# SilentEarn — YouTube & TikTok Video Brand

SilentEarn is a video-first educational brand focused exclusively on YouTube and TikTok.

## Brand identity
- Brand: SilentEarn
- Positioning: AI • Digital Skills • Real Opportunities
- Philosophy: Learn. Build. Earn. Grow.
- Niche: AI tools, digital skills, freelancing, productivity, and realistic online opportunities.
- Visual palette: Midnight navy (#0B1220), electric teal (#18C6B4), soft white (#F7F9FC), and slate gray (#64748B).
- Editing workflow: CapCut only. Do not recommend VN or other editing apps.

## Website purpose
This website acts as SilentEarn's official home base for:
- Direct links to the official YouTube and TikTok channels.
- A video library featuring actual, published videos.
- An explanation of SilentEarn's educational topics and approach.
- Relevant product/affiliate links for tools mentioned in videos.
- Contact details, affiliate disclosure, privacy information, and terms.

The website is not a blog, PDF/e-book library, newsletter funnel, or multi-platform content hub.

## Add published videos
Edit the `VIDEOS` array in `script.js`. Only add videos that have actually been published on YouTube or TikTok. Fields:
- `platform`: `YouTube` or `TikTok`
- `title`: published title
- `description`: accurate summary
- `videoUrl`: real public video URL
- `videoId`: YouTube video ID, when applicable
- `thumbnailUrl`: optional publicly accessible thumbnail/image URL
- `category` and `duration`: optional labels

Do not add invented video titles as published content, guessed links, fake metrics, or fabricated descriptions. If no videos have been added, the website shows a channel links empty state.

## Product links mentioned in videos
The current homepage provides a product/affiliate information section. Only add product destinations after verifying the official URL and relevant product details. Disclose affiliate relationships clearly. Do not invent testimonials, prices, testing experience, discounts, or expected results. The user may add a product-links data structure later if a dedicated listing is needed.

## Official channels
- YouTube: https://youtube.com/@silentearnnn
- TikTok: https://www.tiktok.com/@silentearnn

No other social platforms should be presented as SilentEarn content channels.

## Contact form and email
The contact endpoint is `/api/contact`. Configure these Vercel environment variables:
- `RESEND_API_KEY`
- `EMAIL_TO` (defaults to `SilentEarnn@email.com`)
- `EMAIL_FROM` (must be a sender supported by your Resend account)

The contact form is for messages about video ideas, questions, corrections, product links, and partnerships. There is no newsletter signup in the current website.

## Deployment
The repository is designed for Vercel. After commits deploy, test the live homepage on mobile and desktop; check both channel links, navigation, contact form, and legal pages. A successful GitHub commit does not alone confirm deployment success.
