# Instructor Assistant Web

AI-powered teaching workspace for educators — built with Next.js 15, TypeScript, Tailwind CSS, and an atomic component system.

## Getting started

```bash
npm install
npm run dev
```

Open <http://localhost:3000>. The landing page links into the demo app at `/dashboard`.

## Available scripts

| Script              | Description                          |
| ------------------- | ------------------------------------ |
| `npm run dev`       | Start the dev server on port 3000.   |
| `npm run build`     | Production build.                    |
| `npm run start`     | Serve the production build.          |
| `npm run lint`      | Run Next/ESLint checks.              |
| `npm run typecheck` | Run TypeScript without emitting.     |

## Architecture

The project follows **Atomic Design** — components are layered from smallest to largest, with strict one-way dependencies (atoms → molecules → organisms → templates → pages).

```
src/
├── app/                       # Next.js App Router pages
│   ├── (app)/                 # Authenticated app — uses AppShell layout
│   │   ├── dashboard/
│   │   ├── courses/
│   │   ├── students/
│   │   ├── assignments/
│   │   ├── schedule/
│   │   ├── messages/
│   │   ├── assistant/
│   │   └── settings/
│   ├── login/                 # Auth pages — use AuthLayout
│   ├── signup/
│   └── page.tsx               # Marketing landing
├── components/
│   ├── atoms/                 # Button, Input, Badge, Avatar, …
│   ├── molecules/             # Card, FormField, SearchBar, Tabs, …
│   ├── organisms/             # Sidebar, TopBar, AssistantPanel, …
│   └── templates/             # AppShell, AuthLayout
├── lib/
│   ├── cn.ts                  # clsx + tailwind-merge helper
│   └── mock.ts                # Demo data
└── styles/
    ├── tokens.css             # CSS variables (the design system)
    └── globals.css            # Tailwind layers + base resets
```

## Styling system

Three layers give us both global control and per-instance flexibility:

### 1. Design tokens (`src/styles/tokens.css`)

Every colour, radius, shadow, and font is a CSS variable on `:root`. Override **one** variable and the whole app updates. A `[data-theme="dark"]` block ships out of the box; add more themes by adding more selectors.

```css
:root {
  --color-primary: 79 70 229;
  --radius-md: 0.5rem;
  /* … */
}
```

### 2. Tailwind config (`tailwind.config.ts`)

Tailwind utilities read from those CSS vars (`bg-primary`, `text-text-muted`, `rounded-lg`, …). The `<alpha-value>` placeholder means every colour utility supports `/50` alpha syntax (`bg-primary/20`).

### 3. Component variants (`class-variance-authority`)

Each atomic component exposes variants via `cva`. For example, `Button`:

```tsx
<Button variant="primary" size="lg" />
<Button variant="outline" />
<Button variant="ghost" leftIcon={<Icon />} />
<Button className="rounded-full" />  {/* per-instance override */}
```

To change *all* buttons globally → edit the `buttonVariants` definition once. To re-skin *just one* button → pass `className`; `tailwind-merge` resolves conflicts so the override wins.

### Adding a new component

1. Create `src/components/atoms/Foo.tsx` (or `molecules/`, …).
2. If it has visual variants, define them with `cva` and export the variants object too — consumers can extend it.
3. Re-export from the layer's `index.ts`.
4. Compose into a molecule or organism — never reach down past your layer.

## Theming

Toggle dark mode by setting `data-theme="dark"` on `<html>`. The TopBar has a built-in toggle that persists to `localStorage`.

To add a new theme:

```css
:root[data-theme="ocean"] {
  --color-primary: 14 165 233;
  --color-bg: 245 250 255;
  /* … */
}
```

No component changes needed — they all read from the variables.

## Pages

| Route               | What it shows                                                 |
| ------------------- | ------------------------------------------------------------- |
| `/`                 | Marketing landing page                                        |
| `/login`            | Sign-in form with SSO buttons                                 |
| `/signup`           | New account form                                              |
| `/dashboard`        | Overview: stats, courses, today's schedule, at-risk students  |
| `/courses`          | Tabbed grid of all courses (active / drafts / archived)       |
| `/courses/[id]`     | Single course detail with students & assignments              |
| `/students`         | Filterable student roster table                               |
| `/assignments`      | Tabbed assignment list with submission progress               |
| `/schedule`         | Weekly calendar view                                          |
| `/messages`         | Two-column inbox + thread view                                |
| `/assistant`        | Full-height AI chat panel                                     |
| `/settings`         | Profile / Preferences / Notifications / Billing tabs          |

## Tech

- **Next.js 15** (App Router, React 19)
- **TypeScript**, strict
- **Tailwind CSS 3** with CSS-variable tokens
- **class-variance-authority** for component variants
- **tailwind-merge** + **clsx** for safe class composition
- **lucide-react** for icons
