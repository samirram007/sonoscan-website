# Project knowledge

This file gives Freebuff context about your project: goals, commands, conventions, and gotchas.

## Project Overview
- **Name**: sonoscan-website — a medical clinic website for **Sonoscan Healthcare** (title/meta in `index.html`), a diagnostic center with branches across West Bengal
- **Stack**: React 19 + TypeScript 6 + Vite 8 + TanStack Router v1 + Tailwind CSS v4 + Oxlint
- **Package manager**: pnpm (see `pnpm-lock.yaml`)

## Commands
- `pnpm dev` — Start Vite dev server on port 5173 (host 0.0.0.0)
- `pnpm build` — Run `tsc -b` then `vite build`
- `pnpm lint` — Run oxlint (no ESLint used)
- `pnpm preview` — Preview the production build

## Architecture

### Key directories
- `src/routes/` — **TanStack Router v1 file-based routing** (Vite plugin `@tanstack/router-plugin`). Each file maps to a route via `createFileRoute`; folder-per-route structure:
  - `index.tsx` (`/`), `about.tsx`, `appointments.tsx`, `gallery.tsx`, `contact.tsx`, `privacy.tsx`, `terms.tsx`, `cookies.tsx`, `outdoor-doctor.tsx`, `career.tsx` (NOTE: the `/pricing` route and `src/features/pricing/PricingPage.tsx` were **removed entirely** — the page is no longer in any menu; service pricing data still lives in `data/services.ts` for the `/services` listing + detail pages)
  - `departments/index.tsx` (`/departments`) + `departments/$id.tsx` (`/departments/$id`) — **folder-based** (matches services/doctors convention). NOTE: there must NOT be a `departments.tsx` layout file — it used to render the listing without an `<Outlet/>`, which swallowed the `$id` child route (the detail page never mounted). If a change to the routes folder ever leaves `routeTree.gen.ts` referencing a deleted route, stop the dev server and run `vite build` to regenerate it cleanly
  - `services/index.tsx` (`/services`), `services/$id.tsx` (`/services/$id`), `services/kolkata|malda|balurghat|gangarampur.tsx` (static branch routes)
  - `doctors/index.tsx` (`/doctors`), `doctors/$slug.tsx` (`/doctors/$slug`)
  - All routes except `/` are lazy-loaded via `lazyRouteComponent(() => import('../../features/...'))`
- `src/data/departments.ts` — `departments` (11 depts w/ services, `branchIds` + `sections`) + `outdoorDoctorDepartments` (21 OPD specialty names, used to order the outdoor-doctor page)
- `src/data/diagnosticDepartments.ts` — Generated from `diagnostic-doctor.php` + its `services.php?d=...` detail pages (Kolkata default): 10 diagnostic departments with `branchIds` (per-branch availability from source) and `sections` (procedure title, description, tests, img). Merged into `departments` in `data/departments.ts`
- `src/data/diagnosticBranchDepartments.ts` — Generated per-branch content for the same 10 departments: keyed `branchId -> deptId -> { sourceTitle, intro, sections: {title, description, tests, img} }`. Sourced from `services.php?d=<DEPT>&c=<Branch>` (fetched all 4 branches). Used by DepartmentDetailPage so each department shows its own branch-wise sections + images based on the selected branch
- New pages: `src/features/outdoor/OutdoorDoctorPage.tsx` (`/outdoor-doctor`, OPD schedule grouped by dept w/ branch filter via `useBranch` + search, uses **real OPD roster** from `data/outdoorDoctors.ts`), `src/features/career/CareerPage.tsx` (`/career`, Why Join Us + openings + application form), `src/features/departments/DepartmentsPage.tsx` (`/departments`, anchor-nav linking to detail pages + availability matrix using authoritative `branchIds` + **branch-filtered card grid** — mirrors the source site's branch-aware department listing: only departments available at the selected branch are shown, in the source's display order, using per-branch images/test counts from `diagnosticBranchDepartments`), `src/features/departments/DepartmentDetailPage.tsx` (`/departments/$id`, **branch-aware**: branch switcher pills + per-branch sections/images from `diagnosticBranchDepartments`, availability cards that switch the branch, prev/next nav)
  - **Departments availability matrix enhancements**: column headers are clickable **radiogroup buttons** (WAI-ARIA `role=radiogroup`/`role=radio`, `aria-checked`, roving tabindex + Arrow/Home/End keyboard nav) that call `setSelectedBranch` — no longer links to branch pages. Rows **auto-sort** so departments available at the selected branch appear first (stable sort, source order kept within groups). Each column shows an "X of N departments" count under the branch name + a small **"View branch"** `<Link>` to `/services/$id` so branch pages stay one click away
- **`src/data/outdoorDoctors.ts`** — Real OPD (outdoor doctor) roster scraped from `https://www.sonoscanhealthcare.net/sono/opd-doctor.php` + per-branch `opd-doctor-<branch>.php` pages (fetched 2026-08). **370 doctors across 4 branches** (kolkata 91, malda 175, balurghat 46, gangarampur 58) — branch sections were regenerated from the live pages with names, qualifications and schedules in full sync. Exports: `outdoorDoctorGroups` (Record<branchId, OpdDepartmentGroup[]> with `{id, name, doctors: {name, qualification, schedule: {day, time}[]}}`), `opdAppointmentDoctors` (flat `OpdAppointmentDoctor[]` merged by name with per-branch `slots`, used by AppointmentsPage), `opdDepartmentsByBranch` (branch → canonical department names, used by DepartmentsPage). `outdoorDoctorDepartments` in `data/departments.ts` was expanded to the real department names for ordering
  - Route tree is auto-generated to `src/routeTree.gen.ts` by the plugin; `main.tsx` creates the router from it (`createRouter({ routeTree })`) and declares the `Register` module
  - 404 page handled via `notFoundComponent` on root route
- `src/features/` — Feature modules, each with its own page component and optional schema
- `src/features/` — Feature modules, each with its own page component and optional schema
  - `ui/` — Reusable UI components: Layout (Navbar, SplashScreen, Footer), DoctorCard, DoctorSection, BrandWave, CountUp, Reveal, SEO, ServiceIcons, OutdoorDoctorCard, PageFallback, BranchSelector
- `src/data/` — Static data modules (appointments, contact, doctors, gallery, home, services, **branches**)
- `src/context/` — React context providers (**BranchContext** shares selected branch across navbar + pages)
- `src/features/branches/` — Branch detail page component (**BranchDetailPage**)
- `src/main.tsx` — Entry point, creates root and renders `<RouterProvider>`
- `knowledge.md` — This file. Cached at conversation start; keep updated with new architecture info.
- `src/index.css` — All Tailwind v4 setup (`@import "tailwindcss"`, `@theme` directive) + custom animations

### Navbar features
- **Location/branch selector** in the dark top bar — dropdown (click-toggle) with 4 branches (Kolkata, Malda, Balurghat, Gangarampur). State: `selectedBranch` from `useBranch()` context. Styled with `animate-fade-in-down`.
- **Services dropdown** in the main nav — hover+focus driven, shows 4 branches with map pin icons + address subtext linking to `/services/$id` detail pages, plus "View All Branches". Mobile has an accordion-style expand.
- **Main nav order** (desktop + mobile, identical): Home → About → Services (dropdown) → **Outdoor Doctor** → Departments → Gallery → Career → Contact Us → Book Appointment CTA. **Pricing was removed from the menu** and the `/pricing` page deleted. The nav is defined in `src/features/ui/Layout.tsx` (`Navbar` component; `NavLink`/`MobileNavLink` helpers).

### Footer features (`Footer` in `src/features/ui/Layout.tsx`)
- **Brand logo** uses `../images/logo.png` (same asset as navbar/splash) inside a `w-56 h-20` flex-centered `object-contain` box — matches navbar logo proportions.
- **Quick Links** mirror the nav order: Home → About Us → Our Services → Outdoor Doctor → Departments → Gallery → Career → Contact Us → Book Appointment (all static top-level routes).
- Floating action buttons in the bottom-right: **Call** (`fixed bottom-52 right-8`), **WhatsApp** (`fixed bottom-36 right-8`), **ScrollToTop** (`bottom-8`) — Call/WhatsApp are stacked with an ~8px gap.

### Services — Sonoscan Diagnostic Services
- **4 services** defined in `servicesData` in `src/data/services.ts`, updated to match Sonoscan Healthcare's actual diagnostic offerings. Note: service **IDs** are legacy (`primary-care`, `mental-health`, `dental-care`, `eye-care`) and cannot be changed without breaking routing. Display titles, descriptions, and content are all Sonoscan-specific:

  | Route & Legacy ID | Display Title | Hero Image | Icon | Doctors Referenced |
  |---|---|---|---|---|
  | `/services/primary-care` (`id: primary-care`) | **Pathology & Lab Diagnostics** | Lab/microscope (lab scene) | 🔬 | Dr. Debasis Banerjee, Dr. Susruta Sen |
  | `/services/mental-health` (`id: mental-health`) | **Radiology & Imaging** | MRI/CT scan room (medical scan) | 🩻 | Dr. Sanjukta Sarkar, Dr. Suman Saraogi |
  | `/services/dental-care` (`id: dental-care`) | **Multi-Specialty OPD** | Doctor consultation (stethoscope) | ❤️ | Dr. Malay Acharya, Dr. Bipul Barman |
  | `/services/eye-care` (`id: eye-care`) | **Health Check Packages** | Health checkup/medical | 🏥 | Dr. Shankar Prasad Saha, Dr. Tuhin Mitra |

- **Pricing tiers** use real Sonoscan ₹ amounts:
  - Pathology: ₹1,250 (Basic) / ₹1,750 (Advanced) / ₹3,350 (Comprehensive)
  - Radiology: ₹250 (X-Ray) / ₹1,200 (USG) / ₹4,500 (MRI)
  - Multi-Specialty OPD: ₹500 (Consultation) / ₹800 (ECG) / ₹2,090 (Echo)
  - Health Check: ₹1,250 (Basic) / ₹3,350 (Executive) / ₹5,800 (Master)
- **Hero images** per service detail page are defined in `heroImageMap` in `ServiceDetailPage.tsx` — one Unsplash URL per service ID
- **`serviceCards: ServiceCard[]`** — Simplified card data for the home page and footer (mirrors `servicesData`)
- **`pricingPlans`** (3 plans) & **`planFeatures`** (9 features) — Power the pricing comparison table on `/services` listing page (Monthly/Yearly toggle). Plans: Basic ₹1,250 → ₹1,150/yr, Executive ₹3,350 → ₹3,050/yr (popular), Master ₹5,800 → ₹5,200/yr
- **Branch service lists** still use legacy names (`'Primary Care'`, `'Mental Health'`, `'Dental Care'`, `'Eye Care'`) which are mapped to the actual service IDs via slugification in `BranchDetailPage.tsx`
- **Listing page** at `/services` — 2×2 card grid, each card is a single `<Link>` to `/services/$id`
- **Detail pages** at `/services/$id` — custom hero per service, description, pricing sidebar, specialists, prev/next nav
- Footer's "Our Services" section and Navbar dropdown both match the 4-service data

### Doctor Profile Page Enhancements
- **5 new features** added to `DoctorProfile.tsx`:
  1. **Quick Stats** — Hero section now shows years of experience (computed from earliest education year), consultation fee (₹500 for consultants, ₹800 for senior consultants), and patient count (5,000+)
  2. **Career Timeline** — Visual timeline in the left column showing education history in reverse chronological order (oldest → newest), with relative "X years ago" labels and timeline dot markers connected by a violet line
  3. **Patient Reviews** — Sidebar section showing 2-3 curated patient reviews per senior doctor, with gold star ratings, quoted comments, and dates. Only renders when `doctor.reviews` is non-empty
  4. **OPD Schedule Calendar** — Replaced the simple day badges with a visual weekly grid (Mo-Sa) showing green/gray dot indicators for available/unavailable days at the selected branch, plus a branch legend below showing day schedules across all branches the doctor visits
  5. **Related Doctors** — Section at the bottom of the page showing up to 6 other doctors in the same specialty at the current branch, with profile images and links to their profiles. "View all X specialists" link if more than 6 exist
- **Schema** (`src/features/doctors/schema.ts`): Added `PatientReviewSchema` (name, rating, date, comment) and optional `reviews` field to `DoctorSchema`
- **Review data**: 8 senior doctors (those with bios) have 2-3 realistic patient reviews each in `doctors.ts`

### Doctor Data — Real Sonoscan Healthcare
- **Source**: Fetched from `https://www.sonoscanhealthcare.net/sono/` — specifically the "Doctors With Us" (doctor-with-us.php) and "OPD Doctor Consultation" (opd-doctor.php) pages
- **44 real doctors** organized into **8 departments** (matching the live `doctor-with-us.php` structure):
  - **Pathology** (8 doctors) — Dr. Soma Ray, Dr. Debasis Banerjee, Dr. Susruta Sen, Dr. Subhranshu Mandal, Dr. Souvik Dutta, Dr. Molay Roy, Dr. Rituparna Haldar, Dr. Lahari Banik
  - **Radiology & Imaging** (14 doctors) — Dr. Sanjukta Sarkar, Dr. Pulastya Sanyal, Dr. M. Chaudhuri, Dr. A. Indu Ghosh, Dr. A. Ganeriwala, Dr. Suman Saraogi, Dr. A. Banerjee, Dr. Saba Faiz, Dr. Suparna Sahu, Dr. Amrita Ganguly, Dr. Debraj Saha, Dr. Devpriya Pradhan, Dr. Sayantani Ghosh, Dr. Sankhadeep Saha
  - **Cardiology** (9 doctors) — Dr. Malay Acharya, Dr. Santanu De, Dr. Subhra Aditya, Dr. Biswarup Sarkar, Dr. Lina Mukhopadhyay, Dr. Soumyojit Saha, Dr. Debabrata Sarkar, Dr. Kapildev Mondal, Dr. Dharmendra Kumar Singh
  - **Paediatric Cardiology** (2 doctors) — Dr. Shyamajit Samaddar, Dr. Lopamudra Mishra
  - **Gastroenterology** (4 doctors) — Dr. Bipul Barman, Dr. Debasis Sardar, Dr. Tuhin Mitra, Dr. Sugata Narayan Biswas
  - **Neurology** (3 doctors) — Dr. Shankar Prasad Saha, Dr. Arindam Das, Dr. Barun Kumar Sen
  - **E.N.T** (2 doctors) — Dr. Souvik Roychowdhury, Dr. Diptanshu Mukherjee
  - **PFT** (2 doctors) — Dr. Priyanka Ghosh, Dr. Shelley Shamim (Pulmonary Function Test / pulmonology — synced from the live site's separate PFT department; Dr. Priyanka Ghosh also appears under Chest Medicine/Pulmonology in the OPD roster)
- **Three export formats** from `src/data/doctors.ts`:
  - **`doctorsData: Record<string, Doctor>`** — Full profiles keyed by slug (includes bio, education, certifications for ~15 senior doctors; others have minimal optional data). Used by `DoctorProfile.tsx`.
  - **`teamMembers: TeamMember[]`** — Simplified list for cards (name, role, specialty, initials, slug, branchIds, image). Used by `DoctorCard`, `DoctorSection`, `DoctorsPage`, `BranchSelector`.
  - **`appointmentDoctors: AppointmentDoctor[]`** — Doctors for appointment booking flow (name, specialty string, initials, branchSchedule, branchIds). Used by `AppointmentsPage` and `BranchDetailPage`.
- **Schema** (`src/features/doctors/schema.ts`): Fields `bio`, `education`, `certifications`, `specialties`, `languages`, `publications`, `funFact` are all optional — the source data only provides names, qualifications, and availability, not full biographies for all 44 doctors
- **Profile images** — Specialty-based Unsplash photos via `specialtyImageMap` in `doctors.ts`. Fallback chain: `doc.image` → `specialtyImageMap[doc.specialty]` → `defaultDoctorImage`. Each department gets a distinct portrait:
  - Pathology → `photo-1559839734` (female doctor)
  - Radiology → `photo-1612349317150` (male doctor)
  - Cardiology → `photo-1594824476967` (female doctor)
  - Paediatric Cardiology → `photo-1527613426441` (female with child)
  - Gastroenterology → `photo-1622253692010` (male doctor)
  - Neurology → `photo-1612531386530` (male doctor)
  - ENT → `photo-1588776814546` (male doctor)
  - PFT → `photo-1582750433449` (female doctor)
  - Fallback: `defaultDoctorImage` (`photo-1612349317150`, generic male doctor)

### Branches
- **4 branches** defined in `src/data/branches.ts` with `Branch` interface: `id`, `name`, `address`, `phone`, `email`, `hours`, `image`, `description`, `services[]`, `doctorCount`, `lat`, `lng`
- **BranchContext** (`src/context/BranchContext.tsx`) — React context that shares the globally selected branch across the app:
  - `BranchProvider` wraps `RootLayout` (set once, available everywhere)
  - `useBranch()` hook returns `{ selectedBranch, setSelectedBranch }`
  - Defaults to first branch (Kolkata)
  - **Used by**: navbar location selector, appointments booking flow, contact page
- **Detail pages** at `/services/kolkata`, `/services/malda`, `/services/balurghat`, `/services/gangarampur` — static route files (`services/<branch>.tsx`) that take priority over the dynamic `/services/$id` automatically (TanStack ranks static segments above dynamic). Branch IDs (kolkata, malda, etc.) don't overlap with service IDs (primary-care, mental-health, etc.)
- **BranchDetailPage** (lazy-loaded ~16 kB) reads the branch ID from `useLocation().pathname` and renders: hero with background image + breadcrumb + quick stats, about description, services available grid (checkmarked items), "Why Visit" benefits cards, contact info sidebar (address/phone/email), working hours, quick facts gradient card, booking CTA, and prev/next branch navigation
- **Contact page integration** — `BranchLocationBar` component shows selected branch name + address with "Switch Branch" dropdown (hover/focus). "Visit Us" / "Call Us" / "Email Us" cards display dynamic branch data. Sidebar has OpenStreetMap embed (via lat/lng coordinates), contact info, hours, and branch detail link
- **Appointments filtering** — Doctors filtered by `branchIds` on each `OpdAppointmentDoctor`. Changing branch resets doctor selection + step via `useEffect`. `BookingData` snapshot captures branch info at submission time. **Time slots now come from the doctor's real OPD windows** (`branchSchedule[].slots`) for the selected weekday, falling back to generic `timeSlots` only when the doctor has no OPD schedule

### Branch Doctor Counts (updated to match real data)
- **Kolkata**: 44 doctors (all specialties — full roster)
- **Malda**: 17 doctors (pathology, radiology, cardiology, gastro, neuro, ENT, PFT covering North Bengal)
- **Balurghat**: 5 doctors (pathology, radiology, cardiology) — Dr. Debasis Banerjee, Dr. Rituparna Haldar, Dr. A. Indu Ghosh, Dr. Amrita Ganguly, Dr. Kapildev Mondal
- **Gangarampur**: 5 doctors (pathology, radiology, gastro, neuro, PFT) — Dr. Susruta Sen, Dr. Suman Saraogi, Dr. Shankar Prasad Saha, Dr. Tuhin Mitra, Dr. Priyanka Ghosh
- `doctorCount` in `branches.ts` reflects these numbers (displayed as **"Total Staff"** on branch pages, while the dynamic `branchDoctors.length` value is shown as **"Doctors"**)

### Data flow
- No state management library; component-local state with `useState`/`useEffect`
- No API layer yet; static content only (pages are informational)

## Conventions

### Styling
- **Tailwind CSS v4**: no PostCSS config, uses `@import "tailwindcss"` and `@theme {}` directive in CSS
- Custom color tokens: `--color-bg-base`, `--color-bg-surface`, `--color-bg-card`, `--color-bg-elevated`
- Violet/purple theme with custom violet shades from 50–950
- All custom animations defined in `index.css` as `@keyframes` and `.animate-*` utility classes
- Font: Inter (loaded from Google Fonts via `<link>` in `index.html`)

### Linting
- **Oxlint** (not ESLint) — configured in `.oxlintrc.json`
- Rules: `react/rules-of-hooks` (error), `react/only-export-components` (warn)

### TypeScript gotchas
- `verbatimModuleSyntax: true` — must use `import type` for type-only imports
- `erasableSyntaxOnly: true` — no enums, no namespaces
- `noUnusedLocals: true` / `noUnusedParameters: true` — no unused vars allowed
- `allowArbitraryExtensions: true` enabled
- Types from `vite/client` available globally

### File-based routing pattern
- Routes are defined by file location + `createFileRoute('<path>')({ component })` in each file. No manual `createRoute`/`createRouter` tree — the plugin generates `src/routeTree.gen.ts` (committed, not gitignored) on `vite dev`/`vite build`.
- Feature pages are lazy-loaded with `lazyRouteComponent(() => import('<feature>'))` (matches default exports).
- Dynamic params use `$` notation in the filename: `services/$id.tsx` → `/services/$id`, `doctors/$slug.tsx` → `/doctors/$slug`. Feature pages read params via typed `useParams({ from: '/services/$id' })` — route IDs are unchanged from the code-based setup.
- Static files (e.g. `services/kolkata.tsx`) automatically outrank dynamic ones (`services/$id.tsx`).
- Import paths inside subfolders need `../../features/...` (files one level deeper).
- Plugin version: `@tanstack/router-plugin` (currently 1.168.x) — lags the router minor version slightly; that's expected. Runs before `react()` in the Vite plugins array.
- Adding a route = create a file in `src/routes/`; the plugin picks it up on next dev/build.

### Build & dev
- Vite dev server: port 5173, host 0.0.0.0 (accessible on LAN)
- React plugin: `@vitejs/plugin-react`
- Tailwind plugin: `@tailwindcss/vite`
- `appType: 'spa'` in vite config

### Things to avoid
- Do NOT install ESLint or Prettier — oxlint handles linting, Tailwind class ordering is not enforced
- Do NOT use `enum` or `namespace` keywords (TypeScript `erasableSyntaxOnly`)
- Do NOT run `tsc` without `-b` flag (project references require `tsc -b`)
