# Abstract Garage & Customs

Marketing site for Abstract Garage & Customs, a private auto repair shop in Aberdeen, NC.

Built with React 19, Vite, Tailwind CSS, Framer Motion, and React Three Fiber (for the 3D Hero model).

## Setup

**Prerequisites:** [Node.js](https://nodejs.org/) 20.19+ or 22.12+ (required by Vite 8) and Git.

On macOS, Node can be installed with Homebrew: `brew install node`.

```bash
git clone https://github.com/j2wicee/abstract-garage.git
cd abstract-garage
npm install
npm run dev
```

The dev server runs at http://localhost:5173.

### Booking form (EmailJS)

The contact form sends booking requests through [EmailJS](https://www.emailjs.com/). Copy `.env.example` to `.env.local` and fill in the service ID, template ID, and public key from the EmailJS dashboard. The template can use these variables: `{{from_name}}`, `{{phone}}`, `{{email}}`, `{{vehicle}}`, `{{service}}`, `{{message}}`.

`.env.local` is gitignored. When deploying, set the same three `VITE_EMAILJS_*` variables in the hosting provider's environment settings.

### Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the dev server with hot reload |
| `npm run build`   | Build for production into `dist/`    |
| `npm run preview` | Serve the production build locally   |
| `npm run lint`    | Run ESLint                           |

## Editing content

Most content lives in two files, so you rarely need to touch the components:

- **`src/data/business.js`**: phone, email, hours, owner name and photo, social links, and the site URL. These feed the header, contact section, footer, and the search engine data in `index.html`.
- **`src/data/content.js`**: Recent Work photos and customer reviews.

Put images in `public/images/` (e.g. `public/images/work/camry-brakes.jpg`) and reference them as `/images/work/camry-brakes.jpg`. Resize them to around 1600px wide before adding them.

The **Recent Work** section, **Reviews** section, and **owner photo** stay hidden on the live site until they have real content. In `npm run dev` they always show, with placeholders, so the layout can be checked. Section numbers (`// 01 / Services`, etc.) adjust automatically.

## Before launch

- [ ] Real phone number in `src/data/business.js`
- [ ] Owner confirms hours, "10+ years", "reply within 24 hours", and the service list
- [ ] EmailJS set up and a test booking received
- [ ] Owner photo, work photos, and a few real reviews added
- [ ] Domain bought, `url` set in `src/data/business.js`, site deployed with the `VITE_EMAILJS_*` env vars
- [ ] Add an `og:image` share photo in `index.html`

## Credits

3D model: ["Honda Prelude 1997 Free"](https://sketchfab.com/3d-models/honda-prelude-1997-free-d539a25580d347a6b3447fdc82031280) by [Black Snow](https://sketchfab.com/BlackSnow02), licensed [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Compressed with meshopt for the web. The attribution in the site footer is required by the license; keep it.
