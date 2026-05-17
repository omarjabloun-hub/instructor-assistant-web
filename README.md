# Instructor Assistant — Web

A React frontend for an AI-assisted teaching platform. Implements every view exported from
[Claude Design](https://claude.ai/design): Dashboard, Courses (Course Studio), Create Assessment,
Exam Builder, AI Grader, plus a `/design-system` showcase of the atomic component library.

Stack: **Vite · React 18 · TypeScript · CSS Modules · class-variance-authority · React Router 6**.

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production bundle
npm run preview  # serve the production build
```

## Architecture

```
src/
├── styles/
│   ├── tokens.css       ← All design tokens. Edit this to retheme the app.
│   ├── reset.css
│   └── globals.css
├── lib/
│   ├── cn.ts            ← className joiner (clsx wrapper)
│   ├── icons.tsx        ← Lucide-style inline SVG icons
│   └── types.ts         ← SpectrumColor, format/question color maps
├── components/
│   ├── atoms/           ← Primitives (Button, Chip, Input, Avatar, …)
│   ├── molecules/       ← Composed primitives (NavItem, Tabs, FormField, …)
│   ├── organisms/       ← Page-spanning pieces (Sidebar, Topbar, ClassCard, …)
│   └── templates/       ← AppShell — the 4-cell layout grid
├── pages/
│   ├── Dashboard/
│   ├── Courses/         ← Course Studio (the big one)
│   │   └── parts/       ← Page-specific organisms colocated with the page
│   ├── CreateAssessment/
│   ├── ExamBuilder/
│   ├── AIGrader/
│   └── DesignSystem/
├── App.tsx              ← Routes
└── main.tsx             ← React root + BrowserRouter
```

### Atomic design

Components are organized following Atomic Design with one tweak: page-specific compositions
that aren't reused elsewhere live in `pages/<Page>/parts/`. This keeps the shared library lean
and signals reusability by location.

| Level         | Examples                                              | Reusable? |
| ------------- | ----------------------------------------------------- | --------- |
| **Atoms**     | `Button`, `Chip`, `Input`, `Avatar`, `Card`, `Kbd`    | ✓ Always  |
| **Molecules** | `NavItem`, `Tabs`, `FormField`, `Callout`, `FilterChip` | ✓ Always  |
| **Organisms** | `Sidebar`, `Topbar`, `Brand`, `ClassCard`, `DraftList` | ✓ Cross-page |
| **Templates** | `AppShell`                                            | ✓ All pages |
| **Page parts**| `pages/Courses/parts/CoverBand`, `WeekCard`, etc.     | One page  |

### Styling — three layers of control

**1. App-wide:** change `src/styles/tokens.css` — one file controls colors, type, spacing,
radii, shadows, motion across every screen. The Spectrum palette is 10 named colors, each in
three flavours (text on white, soft bg, solid fill).

**2. Component-wide:** edit `<Component>.module.css`. CSS Modules scope class names per
component; nothing leaks. Variants are declared with [class-variance-authority][cva] for
type-safe combinations:

```tsx
<Button variant="ai" size="sm" leadingIcon={<IconSparkle />}>
  Ask Assistant
</Button>
```

**3. Per-instance:** every component accepts `className` and (where relevant) `style`. Pair
with `cn(...)` from `@/lib/cn` to merge cleanly.

```tsx
<Chip color="purple" className={styles.heavyPad}>Custom</Chip>
```

[cva]: https://cva.style/

### Adding a new color or variant

Add a new tone to `tokens.css`:

```css
--c-indigo-text:  #4338CA;
--c-indigo-bg:    #E0E7FF;
--c-indigo-solid: #6366F1;
```

Then add `indigo` to the `SpectrumColor` union in `src/lib/types.ts` and the variant block in
each consuming component's CSS Module. The CVA recipe in each `.tsx` will pick it up.

### Routes

| Path                   | Page              |
| ---------------------- | ----------------- |
| `/`                    | Dashboard         |
| `/courses`             | Courses (Studio)  |
| `/create-assessment`   | Create Assessment |
| `/exam-builder`        | Exam Builder      |
| `/ai-grader`           | AI Grader         |
| `/design-system`       | Design System     |

## Scripts

| Command            | What it does                                |
| ------------------ | ------------------------------------------- |
| `npm run dev`      | Vite dev server with HMR                    |
| `npm run build`    | TypeScript check + production bundle        |
| `npm run preview`  | Serve the production build locally          |
| `npm run typecheck`| TypeScript only, no build                   |

## Credits

Designs by [Claude Design](https://claude.ai/design) (Spectrum direction). Implementation
preserves the visual system 1:1 while restructuring as a real React app with proper component
boundaries.
