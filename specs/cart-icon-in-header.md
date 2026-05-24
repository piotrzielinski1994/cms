# Spec: Cart icon in header nav

**Version:** 0.1.0
**Created:** 2026-05-24
**PRD Reference:** docs/prd.md
**Status:** Draft

## 1. Overview

Move the cart drawer trigger (cart icon button) from being a sibling of the header (rendered in `src/app/(frontend)/[locale]/layout.tsx`) into the header's nav list (`src/components/layout/header/scaffold/navbar.tsx`) as the last `<li>`. The drawer panel itself continues to render alongside the trigger inside `CartDrawer` (no split). DOM position of the drawer is irrelevant because it uses `fixed inset-0`.

### User Story

As a site visitor, I want the cart icon to live inside the header navigation as the last item, so that the header looks cohesive and the cart access matches conventional e-commerce patterns.

## 2. Acceptance Criteria

| ID | Criterion | Priority |
|----|-----------|----------|
| AC-001 | Cart icon button renders inside `<nav><ul>` of `HeaderNav`, as the last `<li>` after all link items | Must |
| AC-002 | Cart icon is no longer rendered as direct child of `<body>`/Providers in `layout.tsx` | Must |
| AC-003 | Clicking the cart icon opens the drawer; drawer renders correctly regardless of DOM position | Must |
| AC-004 | Existing nav links continue to render in correct order before the cart icon | Must |
| AC-005 | Cart icon's accessibility attributes preserved: `aria-label` from translations, focus-visible outline, button semantics | Must |
| AC-006 | Quantity badge still renders when `totalQuantity > 0` | Must |
| AC-007 | No visual divider, margin, or spacing change between last nav link and cart icon (same flow as other links) | Should |
| AC-008 | Cart icon visible at all viewport sizes — same as desktop on mobile | Should |
| AC-009 | TypeScript build clean (`tsc --noEmit`), lint clean | Must |

## 3. User Test Cases

### TC-001: Cart icon renders as last nav item

**Precondition:** Site is running locally at http://localhost:3000, header has nav items defined.
**Steps:**
1. Open homepage.
2. Inspect the `<header>` element.
3. Inspect the `<nav><ul>` inside it.
**Expected Result:** Last `<li>` of the nav `<ul>` contains the cart icon button (`<button aria-label="open cart">` or equivalent translated label) with the `ShoppingCart` icon.
**Screenshot Checkpoint:** tests/screenshots/cart-icon-in-header/step-01-rendered.png
**Maps to:** TBD

### TC-002: Cart icon is not a sibling of header

**Precondition:** Same as TC-001.
**Steps:**
1. Inspect direct children of `<body>` / Providers wrapper.
**Expected Result:** No `CartDrawer` button is rendered as sibling of the header. The header is the only place the trigger appears.
**Screenshot Checkpoint:** tests/screenshots/cart-icon-in-header/step-02-no-sibling.png
**Maps to:** TBD

### TC-003: Drawer opens on click

**Precondition:** Same as TC-001.
**Steps:**
1. Click the cart icon button in the header.
2. Observe the drawer.
**Expected Result:** Drawer slides in from the right, body scroll is locked, `aria-label` of `<aside>` matches the translation.
**Screenshot Checkpoint:** tests/screenshots/cart-icon-in-header/step-03-open.png
**Maps to:** TBD

### TC-004: Quantity badge displays

**Precondition:** Cart has at least 1 item (mock or seeded).
**Steps:**
1. Render header.
**Expected Result:** Cart icon shows badge with total quantity in top-right corner.
**Screenshot Checkpoint:** tests/screenshots/cart-icon-in-header/step-04-badge.png
**Maps to:** TBD

### TC-005: Existing links unaffected

**Precondition:** Header `items` prop has N nav links.
**Steps:**
1. Render header.
2. Count `<li>` children of nav `<ul>`.
**Expected Result:** N+1 `<li>` items. First N are link items in original order; last is cart icon.
**Screenshot Checkpoint:** tests/screenshots/cart-icon-in-header/step-05-order.png
**Maps to:** TBD

## 4. Data Model

N/A — purely UI/composition change. No new entities, no schema change.

## 5. API Contract

N/A — no new endpoints.

## 6. UI Behavior

### States

- **Loading:** N/A — header renders synchronously; cart hook (`useCart`) reads from client store.
- **Empty cart:** Icon visible, no badge.
- **Non-empty cart:** Icon visible, badge with `totalQuantity` (top-right, primary background).
- **Drawer open:** Body scroll locked, drawer panel right-side, overlay dim.
- **Drawer closed:** Default header state.

### Screenshot Checkpoints

| Step | Description | Path |
|------|-------------|------|
| 1 | Header with cart as last nav <li>, empty cart | tests/screenshots/cart-icon-in-header/step-01-rendered.png |
| 2 | DOM tree confirming cart not sibling of header | tests/screenshots/cart-icon-in-header/step-02-no-sibling.png |
| 3 | Drawer open after cart click | tests/screenshots/cart-icon-in-header/step-03-open.png |
| 4 | Cart icon with quantity badge | tests/screenshots/cart-icon-in-header/step-04-badge.png |
| 5 | Nav order: links then cart | tests/screenshots/cart-icon-in-header/step-05-order.png |

## 7. Edge Cases

| Case | Expected Behavior |
|------|-------------------|
| `items` array is empty | Nav renders only the cart `<li>` |
| Cart hook returns no data | Icon renders, no badge |
| Drawer was open during navigation | Existing `useEffect` on `pathname` closes it (unchanged behavior) |
| `useCart` throws or is unavailable | Component fails — same behavior as today; not in scope to add fallback |

## 8. Dependencies

- `lucide-react` (ShoppingCart icon) — already present
- `@payloadcms/plugin-ecommerce/client/react` (`useCart`) — already present
- `next-intl` (`useTranslations`) — already present
- Existing `HeaderNav` component contract: `items: Array<{id, label, href}>`

## 9. Infrastructure Prerequisites

| Category | Requirement |
|----------|-------------|
| Environment variables | None new |
| Registry images | N/A (Tier 1 local) |
| Cloud quotas | N/A |
| Network reachability | N/A |
| CI status | N/A |
| External secrets | N/A |
| Database migrations | N/A |

**Verification before implementation:** Run `npm run dev`, confirm app boots and header renders.

## 10. Revision History

| Date | Version | Author | Changes |
|------|---------|--------|---------|
| 2026-05-24 | 0.1.0 | Piotr Zieliński | Initial spec from /add:spec interview |
