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

## Build

```bash
npm run build
```
