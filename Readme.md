# Monorepo Modular React Apps (CRA + Webpack + Yarn Workspaces)

This repository is a **real-world example of using a monorepo to build multiple React applications that share business logic**, without publishing internal npm packages or duplicating code.

The core idea is simple:

> **Apps focus on product and UI.  
> Packages focus on reusable domain logic.  
> Tooling focuses on build infrastructure.**

---

## Why this Monorepo

In many projects, multiple applications need to share the same business logic (for example: user models, permission rules, or data-fetching conventions).

Common alternatives and their problems:

- ❌ Copy-paste code → hard to maintain
- ❌ Publish private npm packages → heavy workflow and version management
- ❌ Tight coupling between apps → fragile architecture

This monorepo solves the problem by **co-locating apps and shared domain packages in a single repository**, while keeping **clear dependency boundaries**.

---

## Tech Stack

- React 18
- Webpack 5 (customized CRA tooling)
- Yarn v1 Workspaces
- Node.js v16

---

## Repository Structure

```
.
├── apps/        # Runnable applications (product shells)
│   ├── app-d
│   └── app-e
│
├── packages/    # Reusable capabilities (business logic)
│   └── domain-user
│
├── tooling/     # Build system & engineering tools
│   └── cra-config
│
├── scripts/     # Repo-level scripts (build, generators)
└── package.json # Workspace root & shared runtime deps
```

### apps/

Each folder under `apps/` is a **standalone React application**:

- Can be developed and run independently
- Contains routing, UI, and product-specific logic
- **Must NOT contain reusable business rules**

Examples:
- `app-d`: Uses user domain data + permission rules
- `app-e`: Uses user domain data only (read-only view)

---

### packages/

Packages represent **shared, reusable capabilities**.

They:
- Contain domain logic and business rules
- Have no dependency on specific apps
- Are consumed by multiple apps via Yarn workspaces

#### Example: `@repo/domain-user`

This package defines:
- How to fetch a user
- What a user means
- Business rules such as permission checks

Changing logic here automatically affects **all apps that depend on it**.

---

### tooling/

`tooling/` contains **build infrastructure**, not application code:

- Custom CRA + Webpack configuration
- Babel, loaders, dev-server, etc.

The tooling layer is intentionally isolated so it can be replaced later (e.g. Vite, Rspack, Next.js) without touching business logic.

---

## Setup

Install dependencies once at the repo root:

```bash
yarn install
```

Yarn workspaces will hoist shared dependencies and link internal packages automatically.

---

## Running Apps in Development

Each app can be run independently:

```bash
yarn workspace app-d start
yarn workspace app-e start
```

Hot reloading is enabled.

---

## Building

Build all applications using the shared tooling:

```bash
sh scripts/build.sh
```

Each app is built independently, but shares cached dependencies and tooling.

---

## Demonstrating the Value of Monorepo

This repo intentionally includes **two apps using the same domain package differently**:

- `app-d`: Displays user data and checks access permissions
- `app-e`: Displays user identity only

Both apps depend on:

```js
@repo/domain-user
```

Modify a business rule in `packages/domain-user`, and both apps update immediately — **without publishing, versioning, or duplication**.

---

## Design Principles

- Apps depend on packages, never the other way around
- Domain logic lives in one place
- Tooling is replaceable
- Dependencies are placed according to responsibility

---

## Summary

This repository demonstrates how to:

- Structure a monorepo for multiple React apps
- Share domain logic safely and cleanly
- Avoid private npm packages for internal code
- Keep build tooling isolated from business logic

It is designed to be **readable, extensible, and production-oriented**, not just a demo.

Feel free to explore, adapt, and build on top of it.
