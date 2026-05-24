# Implementation Plan: Cart icon in header nav

**Spec Version:** 0.1.0
**Spec File:** specs/cart-icon-in-header.md
**Created:** 2026-05-24
**Team Size:** Solo
**Estimated Duration:** ~30 min

## Overview

Move `CartDrawer` trigger from being sibling of `<HeaderContainer>` in `layout.tsx` into the last `<li>` of `HeaderNav`. Drawer panel stays inside `CartDrawer` (fixed positioning makes DOM location irrelevant).

## Objectives

- Cart trigger lives inside header nav as last item
- No regression to drawer behavior
- No breaking change to `HeaderNav` API for callers

## Success Criteria

- All 9 ACs met
- Vitest suite green (incl. updated `header.test.tsx`)
- `tsc --noEmit` clean
- `npm run lint` clean
- Manual: drawer opens, badge shows, focus ring intact

## Acceptance Criteria Analysis

### AC-001 + AC-002: cart icon in nav, not in layout root
- **Complexity:** Simple
- **Effort:** 15 min
- **Tasks:** TASK-001, TASK-002
- **Risks:** Layout file has many siblings; need to be precise about delete

### AC-003: drawer opens on click
- **Complexity:** Simple (no logic change)
- **Effort:** included in TASK-002
- **Risks:** None — drawer state stays within `CartDrawer`, fixed positioning unaffected

### AC-004 + AC-007: link order unchanged, no spacer
- **Complexity:** Simple
- **Effort:** included in TASK-002
- **Tests:** TASK-005

### AC-005 + AC-006: a11y + badge preserved
- **Complexity:** Simple (no change to `CartDrawer` internals)
- **Effort:** verification only
- **Tests:** TASK-005

### AC-008: same on mobile
- **Complexity:** Simple
- **Effort:** none (no responsive logic added)

### AC-009: type/lint clean
- **Complexity:** Simple
- **Effort:** TASK-006

## Implementation Phases

### Phase 1: Test (RED) — 10 min

| Task ID | Description | Effort | Deps |
|---------|-------------|--------|------|
| TASK-005 | Update `src/components/layout/header/header.test.tsx` (and snapshot if applicable): assert cart button rendered as last `<li>` of nav with N+1 items, badge renders when quantity > 0, no cart sibling outside header | 10 min | spec |

Expected: tests fail (RED).

### Phase 2: Implementation (GREEN) — 10 min

| Task ID | Description | Effort | Deps |
|---------|-------------|--------|------|
| TASK-001 | `layout.tsx`: remove `<CartDrawer />` rendering and import | 2 min | TASK-005 |
| TASK-002 | `navbar.tsx`: import `CartDrawer`, append `<li className="contents"><CartDrawer /></li>` after the items map | 5 min | TASK-001 |
| TASK-003 | Verify `CartDrawer` interior unchanged | 1 min | TASK-002 |
| TASK-004 | Run `npm test` — confirm GREEN | 2 min | TASK-002 |

### Phase 3: Verify — 10 min

| Task ID | Description | Effort | Deps |
|---------|-------------|--------|------|
| TASK-006 | `npx tsc --noEmit` + `npm run lint` clean | 3 min | Phase 2 |
| TASK-007 | Manual: `npm run dev`, open localhost:3000, confirm cart in nav, click → drawer opens, navigate → drawer closes | 7 min | TASK-006 |

## Effort Summary

| Phase | Hours | Days (solo) |
|-------|-------|-------------|
| Phase 1 (RED) | 0.17 | <1d |
| Phase 2 (GREEN) | 0.17 | <1d |
| Phase 3 (VERIFY) | 0.17 | <1d |
| **Total** | **~0.5h** | **<1d** |

## Dependencies

External: none. Internal: existing `HeaderNav`, `CartDrawer`, `useCart` hook.

## Parallelization

Solo — sequential.

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|-----------|
| `<ul>` uses `className="contents"` — adding `<li className="contents">` for a flex child (`button`) could shift layout | Low | Low | Inspect computed flex layout; cart button has `relative p-2` which works as direct flex item via `contents` propagation |
| Snapshot test stale after change | High | Low | Delete + regenerate snapshot or update assertion-based test |
| Drawer body-scroll-lock effect runs twice if accidentally rendered both places | Low | Medium | Ensure full removal from `layout.tsx` |
| Storybook story for header may break | Medium | Low | Update `header.stories.tsx` if it imports/asserts cart presence |

## Testing Strategy

1. **Unit (vitest)** — update `header.test.tsx` to assert nav structure includes cart as last child
2. **Manual** — `npm run dev`, click trigger, verify drawer opens, verify badge with seeded cart
3. **Quality gates** — tsc, lint

## Deliverables

- Modified: `src/app/(frontend)/[locale]/layout.tsx`
- Modified: `src/components/layout/header/scaffold/navbar.tsx`
- Modified: `src/components/layout/header/header.test.tsx` (and `.snap` if used)

## Plan History

- 2026-05-24: Initial plan
