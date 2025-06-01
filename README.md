# FormPilot

FormPilot is an AI-powered form builder that lets you create, manage, and analyze forms in seconds. Describe your form, and our AI generates a ready-to-use form instantly. Perfect for surveys, contact forms, signups, and more.

## Features
- **AI Form Generation:** Describe your form and let AI build it for you.
- **Instant Previews:** See your form as you build it.
- **Real-time Editing:** Edit fields, themes, and layouts on the fly.
- **Response Management:** View and manage all form responses in one dashboard.
- **Analytics:** Track form performance and engagement with live charts.
- **Export to Excel:** Download responses for offline analysis.
- **User Authentication:** Secure sign-in and user management with Clerk.
- **Modern UI:** Responsive, accessible, and beautiful design with Tailwind CSS and Radix UI.
- **Upgrade Plans:** Unlock premium features with a Pro plan.

## Tech Stack
- **Framework:** [Next.js 15](https://nextjs.org/) (App Router, Server Actions)
- **Database:** [Neon](https://neon.tech/) (Postgres, Drizzle ORM)
- **AI:** [Google Gemini](https://ai.google.dev/) for form schema generation
- **Authentication:** [Clerk](https://clerk.com/)
- **UI:** [Tailwind CSS](https://tailwindcss.com/), [Radix UI](https://www.radix-ui.com/), [Lucide Icons](https://lucide.dev/)
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/)
- **Charts:** [Recharts](https://recharts.org/)
- **Other:** Stripe (payments), Sonner (toasts), Excel export, Framer Motion

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Set up environment variables:**
   - Copy `.env.example` to `.env.local` and fill in required values (database, Clerk, Gemini, Stripe, etc).
3. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the app.

## Folder Structure
- `app/` — Next.js app directory (routing, pages, API)
- `components/` — Reusable UI and logic components
- `db/` — Database schema and actions (Drizzle ORM)
- `lib/` — Utility functions, constants, AI integration
- `public/` — Static assets (images, logo)
- `store/` — Zustand state management

## Deployment
Deploy easily on [Vercel](https://vercel.com/) or your preferred platform.

## License
MIT

---
FormPilot — From Idea to Form in One Click.
