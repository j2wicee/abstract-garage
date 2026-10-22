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

- [x] Real phone number in `src/data/business.js`
- [ ] Owner confirms hours, "10+ years", "reply within 24 hours", and the service list
- [x] EmailJS set up and a test booking received
- [ ] Owner photo, work photos, and a few real reviews added
- [ ] Domain bought, `url` set in `src/data/business.js`, site deployed with the `VITE_EMAILJS_*` env vars
- [ ] Add an `og:image` share photo in `index.html`

## 3D logo

The hero's 3D logo is built from `design/logo-source.jpg`. `scripts/trace-logo.py` traces the logo's black faces into outlines (`src/data/logo-shapes.json`), and `src/components/HeroScene.jsx` extrudes them into 3D pieces that start apart on different depth "levels" and lock together as you scroll.

To re-trace from a better file (ideally a high-resolution PNG or the original vector art, black faces on a white background):

```bash
python -m pip install numpy opencv-python-headless
python scripts/trace-logo.py design/logo-source.jpg src/data/logo-shapes.json
```

If the number or order of pieces changes, update `LEVELS` in `HeroScene.jsx` to match.
