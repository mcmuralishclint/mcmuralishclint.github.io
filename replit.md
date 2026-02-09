# Muralish Clinton Portfolio

## Overview

This is a personal portfolio website for Muralish Clinton, a strategic technology leader. The application is a full-stack TypeScript project with a React frontend and Express backend. It currently serves as a single-page portfolio site with light/dark theme support and smooth animations. The backend includes a basic user storage system with PostgreSQL schema defined but currently using in-memory storage.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Framework**: React 18 with TypeScript, bundled by Vite
- **Routing**: Wouter (lightweight client-side router) — currently two routes: `/` (portfolio page) and a 404 catch-all
- **Styling**: Tailwind CSS with CSS variables for theming (light/dark mode), configured in `client/src/index.css`
- **UI Components**: shadcn/ui (new-york style) — extensive component library in `client/src/components/ui/` built on Radix UI primitives
- **State Management**: TanStack React Query for server state, React Context for theme state
- **Animations**: Framer Motion for scroll/fade animations
- **Icons**: Lucide React and React Icons (specifically `react-icons/si` for brand icons like GitHub)
- **Path aliases**: `@/` maps to `client/src/`, `@shared/` maps to `shared/`

### Backend
- **Framework**: Express 5 running on Node.js with TypeScript (via tsx)
- **Server entry**: `server/index.ts` creates an HTTP server, registers API routes, and serves static files or sets up Vite dev middleware
- **API pattern**: All API routes should be prefixed with `/api` and registered in `server/routes.ts`
- **Dev mode**: Vite dev server runs as middleware with HMR via `server/vite.ts`
- **Production**: Client is built to `dist/public/`, server is bundled via esbuild to `dist/index.cjs`

### Data Storage
- **Schema**: Defined in `shared/schema.ts` using Drizzle ORM with PostgreSQL dialect
- **Current tables**: `users` table with `id` (UUID), `username`, and `password`
- **Validation**: Zod schemas generated from Drizzle schemas via `drizzle-zod`
- **Runtime storage**: Currently uses `MemStorage` (in-memory Map) in `server/storage.ts` — implements an `IStorage` interface that can be swapped for a database-backed implementation
- **Database config**: `drizzle.config.ts` points to `DATABASE_URL` env variable for PostgreSQL; migrations output to `./migrations`
- **Schema push**: Use `npm run db:push` to push schema to database

### Build System
- **Dev**: `npm run dev` — runs tsx with Vite dev middleware for HMR
- **Build**: `npm run build` — runs `script/build.ts` which builds the client with Vite and bundles the server with esbuild
- **Start**: `npm start` — runs the production bundle from `dist/index.cjs`
- **Type check**: `npm run check` — runs TypeScript compiler in noEmit mode

### Key Design Decisions
1. **Shared schema directory** (`shared/`): Contains types and schemas used by both client and server, ensuring type safety across the stack
2. **Storage interface pattern**: The `IStorage` interface in `server/storage.ts` abstracts data access, making it easy to swap from in-memory to PostgreSQL without changing route handlers
3. **Single-page app with server fallback**: In production, all non-API routes fall through to `index.html` for client-side routing
4. **CSS variables for theming**: Theme colors are defined as HSL CSS variables, enabling runtime light/dark mode switching without rebuilding

## External Dependencies

- **PostgreSQL**: Database (configured via `DATABASE_URL` environment variable). Drizzle ORM is the query builder/ORM. The database needs to be provisioned and the `DATABASE_URL` env var set before running `db:push`
- **connect-pg-simple**: Session store for PostgreSQL (available but not currently wired up)
- **Google Fonts**: Fonts loaded externally — Architects Daughter, DM Sans, Fira Code, Geist Mono
- **Replit plugins**: `@replit/vite-plugin-runtime-error-modal`, `@replit/vite-plugin-cartographer`, and `@replit/vite-plugin-dev-banner` are used in development on Replit
- **No external auth or third-party APIs** are currently integrated, though dependencies for passport, nodemailer, stripe, openai, and Google Generative AI exist in the build allowlist suggesting future integration plans