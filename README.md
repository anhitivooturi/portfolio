# Anhiti Vooturi Portfolio

A dark, high-tech portfolio for Anhiti Vooturi, built with Next.js 14 and TypeScript. The hero uses React Three Fiber and Three.js for an interactive neural constellation. The interface also includes a boot sequence, command palette, cursor treatment, and scroll reveals.

## Local development

```bash
npm install
npm run dev
```

## Editing the site

- Page content and project details: `components/Portfolio.tsx`.
- The interactive 3D scene: `components/NeuralHero.tsx`.
- Boot sequence, cursor, and command palette: `components/Hud.tsx`.
- Colors, layout, responsive rules, and reduced-motion behavior: `app/globals.css`.
- Metadata and Person structured data: `app/layout.tsx`.
- Replace `public/resume.pdf` with the latest resume when needed.

## Deploying

Deploy to Vercel as a standard Next.js app. Vercel detects the framework and uses the configured build command automatically.
