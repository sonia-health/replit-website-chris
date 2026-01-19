# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React + TypeScript marketing website for Sonia, an AI-powered emotional support application by bloit, inc. The site promotes Sonia's voice-based wellbeing sessions and includes sections for product info, hiring, research partnerships, and enterprise inquiries.

## Commands

```bash
# Start development server (hot reload)
npm run dev

# Build for production (TypeScript compile + Vite build)
npm run build

# Preview production build locally
npm run preview
```

Note: No test framework or linting tools are currently configured.

## Architecture

**Build Stack:** Vite 3.0.4 with React 18 and TypeScript 4.7

**Entry Flow:** `index.html` → `src/index.tsx` → `src/App.tsx`

**Key Components:**
- `App.tsx` - Main component with tab-based content switching (why/hiring/sonia/research/partnerships). Contains different animation sequences for mobile vs desktop.
- `NavBar.tsx` - Navigation with animated slider indicator that follows selected tab. Receives tab data and handlers from App.
- `MenuButton.tsx` - Mobile hamburger menu toggle
- `Footer.tsx` - Static footer with logo and copyright

**Styling Approach:**
- Component-scoped CSS files (e.g., `App.css`, `NavBar.css`)
- CSS custom properties for theming:
  - `--bora`: #ADD3FF (blue accent)
  - `--coconut`: #F8F6F4 (off-white background)
  - `--forest`: #0F221E (dark green text)
- Mobile breakpoint at 768px

**Static Assets:** Located in `public/` - logos, privacy policy, terms of service, and social sharing images.
