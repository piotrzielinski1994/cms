# cms

Personal CMS / e-commerce playground built on Next.js 16 + Payload CMS. Test bed for ADD methodology trial.

## Methodology

This project follows **Agent Driven Development (ADD)** — specs drive agents, humans architect and decide, trust-but-verify ensures quality.

- **PRD:** docs/prd.md
- **Specs:** specs/
- **Plans:** docs/plans/
- **Config:** .add/config.json
- **Rules:** .claude/rules/ (10 ADD rules)

Document hierarchy: PRD → Spec → Plan → User Test Cases → Automated Tests → Implementation

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Language | TypeScript | 5.x |
| Framework | Next.js (App Router) | 16.2.6 |
| CMS | Payload | latest |
| UI | React | 19 |
| Bundler | Turbopack | (Next built-in) |
| Database | MongoDB | latest (docker-compose) |
| Test | Vitest + Testing Library + vitest-axe | latest |
| Lint | ESLint | flat config |
| Runtime | Node | 22.x |

## Commands

### Development
```
npm start              # Start local dev (next dev, port 3000)
npm run start:db       # Start MongoDB (docker compose up)
npm run build          # Production build
npm run serve          # next start (after build)
npm test               # next typegen + tsc --noEmit + vitest run --coverage
npm run test:watch     # vitest watch
npm run ts             # tsc --noEmit
npm run lint           # eslint .
npm run lint:fix       # eslint . --fix
npm run storybook      # Storybook dev (port 3001)
npm run payload        # Payload CLI
npm run generate:types # payload generate:types
```

### ADD Workflow
```
/add:spec {feature}                  # Create feature specification
/add:plan specs/{feature}.md         # Create implementation plan
/add:tdd-cycle specs/{feature}.md    # Execute TDD cycle
/add:verify                          # Run quality gates
/add:retro                           # Capture learnings
```

## Architecture

### Key Directories
```
src/
  app/(frontend)/[locale]/   # App Router pages, locale-scoped
  components/                # Shared UI (basic, advanced, layout)
  features/                  # Feature modules (checkout, etc.)
  payload/                   # Payload CMS config (collections, blocks, globals)
  providers/                 # React providers (theme, locale, ecommerce)
  store/                     # Client stores (zustand etc.)
  config/                    # Routing, env, i18n, storybook
  utils/                     # Helpers (tailwind, html, tests)
specs/                       # ADD feature specs
docs/plans/                  # ADD implementation plans
.add/                        # ADD config + learnings
.claude/rules/               # ADD methodology rules
```

### Environments

- **Local:** Tier 1 only. http://localhost:3000. Mongo via docker-compose.
- **Production:** none (playground)

## Quality Gates

- **Mode:** standard
- **Coverage threshold:** 80%
- **Type checking:** blocking (`npm run ts` / inside `npm test`)
- **E2E required:** no
- **Lint:** blocking (eslint flat config)

All gates defined in `.add/config.json`. Run `/add:verify` to check.

## Source Control

- **Git host:** GitHub (git@github.com:piotrzielinski1994/cms.git)
- **Default branch:** main
- **Branching:** feature branches off `main`
- **Commits:** conventional commits (feat:, fix:, test:, refactor:, docs:)
- **CI/CD:** GitHub Actions (.github/workflows/{on-dependabot,on-merge,on-release}.yaml)

## Collaboration

- **Autonomy level:** balanced
- **Review gates:** PR review (solo)
- **Deploy approval:** N/A (Tier 1)

## Conventions

- No code comments unless solution non-obvious
- Boolean naming as questions (`isValid`, `hasData`)
- Guard clauses over nesting
- Prefer types over interfaces (except function signatures)
- Test naming: `it("should X if Y")`
- No `any`
- ADR-style error handling (no try/catch ifology)
