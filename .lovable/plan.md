

# CosmetiQ AI — Expert-Level UX Features + 3D Visuals

## Features to Implement

From the approved list (excluding #6 Social Proof):

1. **Skin Profile Onboarding** — 3-step animated quiz
2. **Before/After Comparison Slider** — draggable split-view on Progress page
3. **Product Scanner Simulation** — fullscreen scan modal with ingredient reveal
4. **Time-Aware In-App Nudges** — contextual banners on Dashboard
5. **Ingredient Encyclopedia Modal** — bottom sheet on ingredient tap
7. **Micro-Animations & Delight** — count-up scores, shake on conflict, enhanced transitions

Plus: **3D visuals and rich imagery** wherever possible.

---

## Technical Plan

### 1. Onboarding Page (`/onboarding`)

New `src/pages/Onboarding.tsx`:
- 3-step full-screen flow: Skin Type → Concerns → Goals
- Each step has a full-bleed lifestyle image background with gradient overlay
- Floating selection pills (Normal/Oily/Dry/Combo, then Acne/Aging/Dullness/Sensitivity, then Glow/Repair/Prevent/Balance)
- Animated step indicator dots
- "Skip" option in corner; "Next" CTA pill at bottom
- On complete, stores profile in localStorage and navigates to `/`
- Add route in `App.tsx`; show onboarding if no profile exists

### 2. Before/After Slider on Progress Page

New `src/components/BeforeAfterSlider.tsx`:
- Two placeholder images side-by-side with a draggable vertical divider
- Uses mouse/touch events for slider position (no extra deps)
- Week selector pills above (Week 1 vs Week 4)
- "Your Transformation" heading with emotional copy
- Integrated into `Progress.tsx` as a new section between photo journal and daily rating

### 3. Scanner Modal

New `src/components/ScannerModal.tsx`:
- Triggered by a floating FAB on Shelf page (bottom-right, glassmorphic, camera icon)
- Opens fullscreen dialog with simulated camera viewfinder (animated scanning line)
- After 2s animation, reveals: product name, ingredient chips with safety colors, animated safety score ring (count-up from 0)
- "Add to Shelf" CTA at bottom
- Uses existing Dialog component

### 4. Time-Aware Nudges

New `src/components/TimeNudge.tsx`:
- Reads `new Date().getHours()` to determine time period
- Morning (6-11): Sunrise gradient banner — "Start your AM routine"
- Midday (11-15): Amber banner — "UV is high — reapply SPF"
- Evening (17-22): Moon gradient — "Wind down with your PM routine"
- Night (22-6): Subtle — "Rest mode — skin repairs overnight"
- Integrated into Dashboard between hero and category circles
- Glassmorphic floating banner with icon + text + CTA button

### 5. Ingredient Encyclopedia

New `src/components/IngredientSheet.tsx`:
- Uses Drawer (vaul) component for bottom sheet
- Props: ingredient name, opens with details
- Shows: name, category badge, description, skin types, conflicts list, "Found in X of your products" count
- Warm blush background with large serif heading
- Add `ingredientEncyclopedia` data to `mockData.ts` (10-12 common ingredients with descriptions)
- Wire up: make ingredient chips clickable in ProductCard, Routine step cards, and Conflicts page

### 6. 3D Visuals & Rich Imagery

- **3D Rotating Product on Dashboard**: Use `@react-three/fiber@^8.18` + `@react-three/drei@^9.122.0` to render a floating 3D cylinder (product bottle) with soft lighting on the Dashboard hero section (desktop only). Fallback to static image on mobile/when WebGL unavailable.
- **3D Molecule on Conflicts page**: A simple rotating icosahedron geometry representing "molecular analysis" in the hero section
- **Parallax depth**: CSS `perspective` + `translateZ` on hero images for subtle depth on scroll
- **Animated gradient orbs**: Additional `.deco-circle` elements with varied colors and sizes on every page

### 7. Micro-Animations & Delight

In `src/index.css`:
- `@keyframes count-up` — used via JS in SafetyScoreRing (already has animated score, enhance with easing)
- `@keyframes shake` — `transform: translateX(-2px) → 2px → 0` for conflict detection
- `.animate-shake` class
- Enhanced SafetyScoreRing: smoother count-up with requestAnimationFrame instead of setTimeout
- Add `animate-fade-in` utility for ingredient sheet content

### 8. Data Additions (`mockData.ts`)

- `skinProfileOptions` object with types/concerns/goals arrays
- `ingredientEncyclopedia`: Record of ingredient name → { category, description, skinTypes, benefits, caution }
- `scannerDemoProduct` object for scanner simulation result

---

## Files Summary

| File | Action |
|------|--------|
| `src/pages/Onboarding.tsx` | Create — 3-step skin profile quiz |
| `src/components/BeforeAfterSlider.tsx` | Create — draggable comparison slider |
| `src/components/ScannerModal.tsx` | Create — product scan simulation |
| `src/components/IngredientSheet.tsx` | Create — ingredient encyclopedia bottom sheet |
| `src/components/TimeNudge.tsx` | Create — time-aware contextual banners |
| `src/components/Scene3D.tsx` | Create — 3D product/molecule visuals |
| `src/pages/Dashboard.tsx` | Update — add TimeNudge, 3D product visual |
| `src/pages/Progress.tsx` | Update — add BeforeAfterSlider section |
| `src/pages/Shelf.tsx` | Update — add Scanner FAB, ingredient tap handlers |
| `src/pages/Conflicts.tsx` | Update — add 3D molecule, shake animation |
| `src/components/SafetyScoreRing.tsx` | Update — smoother count-up animation |
| `src/components/ProductCard.tsx` | Update — clickable ingredient chips |
| `src/data/mockData.ts` | Extend — encyclopedia, profile options, scanner data |
| `src/App.tsx` | Add `/onboarding` route |
| `src/index.css` | Add shake, parallax, enhanced animation utilities |
| `package.json` | Add `@react-three/fiber@^8.18`, `@react-three/drei@^9.122.0`, `three@^0.160` |

