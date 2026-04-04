

# CosmetiQ AI — Visual & Engagement Upgrade

## What the Reference Images Show

The uploaded references are premium skincare brand websites and mobile apps with these standout traits the current app lacks:

1. **Dramatic hero imagery with model/face photography** — large close-ups of faces, not just product shots
2. **Warm pink/blush gradient washes** — soft pink-to-cream backgrounds, not just neutral linen
3. **Floating product photography with depth** — products appear to "pop out" with shadows and slight rotation
4. **Category browsing with circular thumbnails** — "Face", "Body", "Hair", "Gifts" style category selectors
5. **Trending/Popular sections** with horizontal cards featuring product image + title + short description on warm blush backgrounds
6. **Split-screen layouts** — image on one side, content on the other (not stacked)
7. **Decorative elements** — floral accents, soft bokeh, ornamental corners
8. **Onboarding/splash feel** — the first screen feels like a brand campaign, not a tool

## What Needs to Change

The current app is well-structured but still feels **tool-like**. The upgrade focuses on making it feel like a **luxury brand experience** users want to open daily.

---

## Plan

### 1. Enhanced Color System & Gradients

Add warm pink gradient washes to `index.css`:
- New gradient utilities: `gradient-blush` (soft pink → cream), `gradient-warm` (peach → champagne)
- Rose-tinted glassmorphism variant: `glass-rose` with `bg-pink-50/40 backdrop-blur-xl`
- Soft pink background sections instead of uniform linen everywhere

### 2. Dashboard → Brand Campaign Landing

Rewrite `Dashboard.tsx` to feel like a beauty brand homepage:
- **Split hero** (desktop): Left side — large greeting text with "Your skin deserves molecular intelligence" tagline + CTA buttons; Right side — face/model close-up image with floating product cards orbiting around it
- **Mobile**: Full-bleed face close-up with greeting overlaid, floating circular category selectors below ("Routine", "Shelf", "Compare", "Guardian") like the reference app
- **"Trending for You" section**: Horizontal cards on warm blush backgrounds with product image + title + one-line benefit (like the Cream/Facial Serum/Lipstick reference cards)
- **Remove analytical stat cards** — replace with a single elegant "Skin Status" floating badge with the safety ring embedded
- **Decorative soft-focus bokeh circles** as background elements (CSS pseudo-elements with radial gradients)

### 3. Digital Shelf → Product Discovery Experience

Update `Shelf.tsx`:
- **Circular category selector row** at top: "Actives", "Hydrators", "Exfoliants", "Cleansers" with product thumbnail in each circle (like the Face/Body/Hair/Gifts reference)
- **"Popular Products" horizontal scroll** with larger cards that have warm blush backgrounds instead of plain glass
- **Product cards**: Add subtle rotation/tilt on hover, warmer pink-tinted gradient overlays instead of neutral ones
- Keep masonry grid but add alternating blush/champagne background tints to cards

### 4. Shop → Split-Screen Premium Marketplace

Update `Shop.tsx`:
- **Desktop hero**: Split layout — left side has headline "Care for Your Skin" with filter pills + CTA; right side has large model/face image with floating product cards overlaid (like CAREON reference)
- **"Special Offer" floating card** with gradient blush background overlapping the hero
- **Product cards**: Warmer, with blush gradient backgrounds instead of plain glass. Price tag as a floating pill badge

### 5. New Component: CategoryCircle

Reusable circular thumbnail selector used on Dashboard and Shelf:
- Circular image container with soft border
- Label below
- Active state: rose ring highlight
- Used for: product categories, routine shortcuts, skin concerns

### 6. New Component: TrendingCard

Horizontal card with:
- Product image on left (40%)
- Warm blush/champagne background
- Title + short description on right
- Subtle arrow or "Learn more" link
- Used on Dashboard "Trending" section and Advisory page

### 7. Advisory Page Enhancement

Update `Advisory.tsx`:
- Replace plain list layout with **TrendingCard** style for nutrition items
- Add warm blush section backgrounds alternating with cream
- Larger food imagery in each card

### 8. Progress Page Enhancement

Update `Progress.tsx`:
- Photo journal slots: Use warm gradient backgrounds (pink → cream) instead of plain glass
- Add motivational quotes/messages that rotate
- Streak grid: Use warm rose tones instead of primary-only (gradient from champagne → deep clay)

### 9. Global Polish

In `index.css` and `tailwind.config.ts`:
- Add `glass-rose` utility
- Add `gradient-blush`, `gradient-warm` utilities  
- Add decorative bokeh/blur circle CSS (`.deco-circle`) for background ambiance
- Add `card-tilt` hover animation (subtle 1-2deg rotation)
- Enhance `hover-lift` with slight scale(1.02) in addition to translateY

---

## Files Summary

| File | Action |
|------|--------|
| `src/index.css` | Add gradient utilities, glass-rose, decorative styles |
| `tailwind.config.ts` | Add rose/blush color extensions |
| `src/components/CategoryCircle.tsx` | Create — circular category selector |
| `src/components/TrendingCard.tsx` | Create — horizontal product/info card |
| `src/pages/Dashboard.tsx` | Rewrite — split hero, category circles, trending section |
| `src/pages/Shelf.tsx` | Update — add category circles, blush-tinted cards |
| `src/pages/Shop.tsx` | Update — split hero, special offer card |
| `src/pages/Advisory.tsx` | Update — trending card layout |
| `src/pages/Progress.tsx` | Update — warmer gradients, motivational text |

