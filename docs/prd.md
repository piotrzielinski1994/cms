# cms — Product Requirements Document

**Version:** 0.1.0
**Created:** 2026-05-24
**Author:** Piotr Zieliński
**Status:** Draft (quick-init 1-pager)

## 1. Problem Statement

Personal CMS + e-commerce playground built on Payload CMS + Next.js. Used to test patterns (themes, locales, blocks, checkout) and serve as canvas for ADD methodology trial.

## 2. Target Users

Solo dev (self). Visitors of the rendered site (locale-aware reader, optional shopper).

## 3. Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Local dev runs cleanly | 100% | `npm run dev` boot |
| Type check clean | 100% | `tsc --noEmit` |
| Header nav usable | passes manual test | Visual + screenshot |

## 4. Scope

### In Scope (MVP)
- Existing Payload CMS pages, blocks, locales
- Header/footer layout
- Cart drawer + checkout flow

### Out of Scope
- Multi-tenant
- Production deploy
- Payment gateway integration

## 5. Architecture

### Tech Stack

| Layer | Technology | Version | Notes |
|-------|-----------|---------|-------|
| Language | TypeScript | 5.x | strict |
| Framework | Next.js (App Router) | 15 | turbopack |
| CMS | Payload | latest | local API |
| Database | MongoDB | n/a | Payload default |
| Test | Vitest | latest | unit + react testing library |

### Infrastructure

| Component | Choice | Notes |
|-----------|--------|-------|
| Git Host | github | local clone |
| Cloud Provider | none | local only |
| CI/CD | github-actions | minimal |
| Containers | docker-compose | mongo |

### Environment Strategy

| Environment | Purpose | URL | Deploy Trigger |
|-------------|---------|-----|----------------|
| Local | Dev + tests | http://localhost:3000 | Manual |

**Environment Tier:** 1 (local only)

## 6. Milestones & Roadmap

### Current Maturity: alpha

### Roadmap

| Milestone | Goal | Target Maturity | Status | Success Criteria |
|-----------|------|-----------------|--------|------------------|
| M1: ADD trial | Validate ADD on small UI fix | alpha | NOW | First spec → cycle done |

### Maturity Promotion Path

| From | To | Requirements |
|------|-----|-------------|
| alpha → beta | Feature specs for user-facing features, 50%+ coverage, PR workflow, TDD evidence |

## 7. Key Features

### Feature 1: Cart icon in header
Move CartDrawer trigger from layout root into header nav as last `<li>`.

## 8. Non-Functional Requirements

- **Performance:** No regression vs current
- **Accessibility:** Preserve aria labels, focus states, button semantics

## 9. Open Questions

- None at this time

## 10. Revision History

| Date | Version | Author | Changes |
|------|---------|--------|---------|
| 2026-05-24 | 0.1.0 | Piotr Zieliński | Initial draft from /add:init --quick |
