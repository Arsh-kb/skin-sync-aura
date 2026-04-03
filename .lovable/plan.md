

# CosmetiQ AI — Visual-First Expansion + Responsive Layout + New Modules

## What's Changing

This plan merges the previously approved feature expansion (responsive layout, 4 new pages) with the new **Visual Dominance Priority** rules. Every screen will be redesigned away from dashboard patterns toward an editorial, image-heavy, luxury skincare aesthetic.

---

## Visual Dominance Rules (Applied Globally)

These override all layout decisions:

- **Hero-first**: Every page opens with a large image section (40-60vh), text overlaid on image with gradient
- **No stat grids**: Replace uniform card rows with staggered, mixed-size layouts
- **50%+ image weight**: Product cards are image-dominant with overlaid text
- **Non-grid layouts**: Horizontal scroll carousels, staggered masonry, mixed card sizes
- **Overlay text**: Names, brands, tags render ON images with blur/gradient backing
- **Depth/layering**: Cards overlap slightly, floating elements, soft shadows
- **Emotional over analytical**: Calm, touchable, premium — not data-heavy

---

## 1. Responsive AppLayout

**Mobile (<768px)**: Bottom glassmorphic tab bar (current, extended with new tabs — scrollable)

**Desktop (md+)**: Left sidebar (~240px) with:
- Logo "CosmetiQ AI" at top
- Nav items with icons: Home, Shelf, Routine, Compare, Conflicts, Shop, Advisory, Guardian, Progress
- Active state: rose/taupe pill highlight
- Cream/linen background, soft right border

Content area: Remove `max-w-md` constraint → `max-w-6xl` on desktop

---

## 2. Dashboard Redesign (Visual-First)

Replace current stat-card layout with editorial flow:

- **Full-bleed hero** (50-60vh): Lifestyle skincare image, greeting overlaid ("Good evening, Sarah"), safety score ring floating in corner
- **Horizontal scroll carousel**: "Your Routine" — large overlapping product cards with images, product name overlaid
- **Staggered insight section**: One large "Skin Status" glass card (overlapping hero edge) + one smaller "Daily Tip" card beside it — NOT a uniform grid
- **Conflict alert**: Floating banner with blur background, not a boxed card
- **Quick actions**: Floating pill buttons overlaid near bottom of hero, not a grid section

---

## 3. Digital Shelf Redesign

- **Hero**: Large skincare lifestyle image (40vh) with "Your Collection" overlaid
- **Product cards**: Image-dominant (70% image, 30% overlay info). Product name + brand + safety badge rendered ON the image with gradient overlay at bottom
- **Layout**: Staggered 2-column masonry on mobile, 3-column mixed sizes on desktop (alternate large/small cards)
- **Horizontal scroll section**: "Actives" / "Hydrators" / "Exfoliants" category carousels with circular product thumbnails
- **Filter pills**: Floating over hero bottom edge

---

## 4. Routine Page Redesign → "Routine Sequencer"

- **Hero**: Soft skincare image with "Routine Sequencer" overlaid, AM/PM toggle pills floating
- **Timeline cards**: Each step is a wide card with product image taking 60% width, info overlaid
- **Connectors**: Animated safety lines between cards (green/yellow/red glow)
- **Timing annotations**: "Wait 1-2 min" badges floating between steps
- **Auto-sort button** and timing guide card at bottom

---

## 5. New Page: Conflicts (`/conflicts`)

- **Hero**: Skincare texture close-up image with "Ingredient Conflicts" overlaid
- **Compatibility matrix**: Soft glassmorphic table with colored dots (green/yellow/red)
- **Common conflicts section**: Staggered cards (not grid) showing conflict pairs with severity badges, explanation text, and fix suggestions
- **Status summary**: Floating glass card overlapping hero edge

---

## 6. New Page: Shop (`/shop`)

- **Hero**: Product photography collage with "Smart Marketplace" overlaid
- **Product cards**: Large image-first cards with brand, name, match score %, price overlaid on image
- **Layout**: Horizontal scroll carousel for "Top Matches" + staggered grid below
- **Concern filter pills**: Floating horizontally scrollable (Oily Skin, Acne, Anti-aging, etc.)
- **"+ Add" and "Buy" buttons**: Overlaid on card bottom with blur backing

---

## 7. New Page: Advisory (`/advisory`)

- **Hero**: Fresh foods/ingredients lifestyle image with "Skin Nutrition" overlaid
- **Two tabs**: "Nutrition Guide" / "Safe DIY Filter" as floating pills
- **Nutrition cards**: Large image + concern title overlaid, recommended foods listed below
- **Staggered layout**: Alternating large/small cards, not uniform grid

---

## 8. New Page: Progress (`/progress`)

- **Hero**: Soft glowing skin close-up with "Your Journey" overlaid
- **Photo journal**: 4 large overlapping card slots (Week 1-4) with camera icon placeholder
- **Daily rating**: Floating glass card with star icons
- **Streak grid**: GitHub-style dots in warm tones (champagne → deep clay)
- **Effectiveness ring**: Floating over a blurred background section

---

## 9. Data Additions (`mockData.ts`)

- AM/PM routine arrays (separate product sets)
- Marketplace products (6-8 items with prices, match scores, concern tags)
- Advisory content (skin concerns + food recommendations)
- Progress mock data (streak array, effectiveness score)

---

## Files Summary

| File | Action |
|------|--------|
| `src/components/AppLayout.tsx` | Rewrite — responsive sidebar + bottom tabs |
| `src/pages/Dashboard.tsx` | Rewrite — visual-first editorial layout |
| `src/pages/Shelf.tsx` | Rewrite — masonry, image-dominant cards |
| `src/pages/Routine.tsx` | Rewrite — sequencer with hero + AM/PM |
| `src/pages/Conflicts.tsx` | Create |
| `src/pages/Shop.tsx` | Create |
| `src/pages/Advisory.tsx` | Create |
| `src/pages/Progress.tsx` | Create |
| `src/components/ProductCard.tsx` | Rewrite — image-first with overlay text |
| `src/data/mockData.ts` | Extend with new data arrays |
| `src/App.tsx` | Add 4 new routes |
| `src/index.css` | Add masonry/stagger utilities |

