# SilentEarn — Video-First Vercel Website

SilentEarn is now positioned as a **video-first digital education brand**. The website supports the YouTube, Facebook, and TikTok content business with video discovery, transcripts, useful resources, AI tools, affiliate recommendations, digital products, custom solutions, email signup, WhatsApp, and contact.

## Main website sections

- Featured video library
- Video transcripts and notes
- Useful resources
- AI tools toolbox
- Affiliate/recommendation area
- Digital products
- Custom digital solutions
- About SilentEarn
- Email signup
- Contact + WhatsApp
- FAQ, privacy, terms, affiliate disclosure

## Update your video content

Open `script.js` and edit the `VIDEOS` array.

For each published video you can add:
- `title`
- `tag`
- `description`
- `videoId`
- `videoUrl`
- `transcriptUrl`

When `videoId` is present, the site automatically uses the YouTube thumbnail and watch link.

## Add your social links

In `script.js`, update:

```js
const SOCIAL_LINKS = {
  youtube: '',
  facebook: '',
  tiktok: ''
};
```

Paste your real channel/page URLs there after they are ready.

## Add AI tools and affiliate recommendations

Edit the `AI_TOOLS` and `RECOMMENDATIONS` arrays in `script.js`.

Use real product names and links only after you have personally verified them and, where applicable, joined the relevant affiliate program.

## Digital products

Edit the `PRODUCTS` array in `script.js`.

Each product supports:
- `price`
- `checkoutUrl`
- `name`
- `description`
- `features`

If `checkoutUrl` is empty, the product button opens WhatsApp with a prefilled order message.

## Email signup

The newsletter form currently sends a signup notification to the SilentEarn inbox through `/api/contact`.

For a full automated mailing list, connect a newsletter provider later and replace the current form handling with that provider's API.

## Contact email

The contact endpoint uses these Vercel environment variables:

- `RESEND_API_KEY`
- `EMAIL_TO` = `SilentEarnn@email.com`
- `EMAIL_FROM` = a sender supported by your Resend account

## Important

Replace placeholder/sample content, prices, checkout links, video IDs, social URLs, and recommendation links with your real assets before publishing.
