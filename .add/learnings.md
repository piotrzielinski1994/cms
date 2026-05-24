# Project Learnings — cms

## Technical Discoveries

- 2026-05-24: withProviders pulls full ecommerce stack including Stripe + Payload ecommerce client. Tests rendering Header fail with v8 OOM unless `@payloadcms/plugin-ecommerce/client/react`, `/payments/stripe`, and `useCart` are mocked. (L-001)

## Architecture Decisions

(none yet)

## What Worked

- `container.querySelectorAll('header nav > ul > li')` direct-child selector is robust nav-structure assertion. N+1 count catches order regressions. (L-002)

## What Didn't Work

- Snapshot tests with radix UI components drift on every run — `aria-controls=radix-_r_X_` ids non-deterministic. Either drop snapshots for radix-using components or normalize ids in custom serializer. (L-003)

## Agent Checkpoints

- 2026-05-24: TDD cycle cart-icon-in-header done. RED 2 fail / 2 pass → GREEN 4/4 pass. Snapshot regenerated. Verify: tsc ✓, vitest ✓ (152/152, 89% line cov), lint ✗ (8 pre-existing repo errors, scope clean).

## Profile Update Candidates

- ADD `--quick` mode fills config defaults blindly. Always run `/add:init --reconfigure` after quick init for non-trivial projects. (L-004 → library)
