# CODE QUALITY REPORT

**Heure du test :** 08/04/2026 12:42:06

<div class="summary"><div class="summary-left"><div class="summary-item pass"style="color:white!important"> Réussis : 53</div><div class="summary-item fail"style="color:white!important"> Échoués : 0</div><div class="summary-item ignored"style="color:white!important"> Ignorés : 4</div><div class="summary-item generated"style="color:white!important"> Générés : 1</div></div><div class="summary-divider"></div><div class="summary-rate" style="color:white!important">📊 Taux : 93%</div></div>

## ℹ  INFORMATION DU PROJET

| Test | Statut |
|------|--------|
| Nom du projet : cedevs | <span class="ok"><span class="dot dot-ok"></span> OK</span> |
| Version : 1.0.0 | <span class="ok"><span class="dot dot-ok"></span> OK</span> |
| Node.js | <span class="ok"><span class="dot dot-ok"></span> OK</span> |
| npm | <span class="ok"><span class="dot dot-ok"></span> OK</span> |
| Biome | <span class="ok"><span class="dot dot-ok"></span> OK</span> |

## 🐳  VÉRIFICATION DOCKER

| Test | Statut |
|------|--------|
| Docker installé | <span class="ok"><span class="dot dot-ok"></span> OK</span> |
| Docker Compose | <span class="ok"><span class="dot dot-ok"></span> OK</span> |
| PostgreSQL en cours d'exécution | <span class="ok"><span class="dot dot-ok"></span> OK</span> |

## 🗄  VÉRIFICATION BASE DE DONNÉES

| Test | Statut |
|------|--------|
| Connexion à PostgreSQL | <span class="ok"><span class="dot dot-ok"></span> OK</span> |
| Table 'users' existe | <span class="ok"><span class="dot dot-ok"></span> OK</span> |

## ⚙  VÉRIFICATION SERVER

| Test | Statut |
|------|--------|
| server/.env | <span class="ok"><span class="dot dot-ok"></span> OK</span> |
| server/src/index.ts | <span class="ok"><span class="dot dot-ok"></span> OK</span> |
| Package 'express' installé | <span class="ok"><span class="dot dot-ok"></span> OK</span> |
| Package 'pg' installé | <span class="ok"><span class="dot dot-ok"></span> OK</span> |

## 🎨  VÉRIFICATION FRONTEND (Web)

| Test | Statut |
|------|--------|
| Dossier web/ | <span class="ok"><span class="dot dot-ok"></span> OK</span> |
| Fichiers TypeScript/TSX | <span class="ok"><span class="dot dot-ok"></span> OK</span> |
| package.json | <span class="ok"><span class="dot dot-ok"></span> OK</span> |

## 🎨  VÉRIFICATION FRONTEND (Mobile)

| Test | Statut |
|------|--------|
| Dossier mobile/ | <span class="ok"><span class="dot dot-ok"></span> OK</span> |
| package.json | <span class="ok"><span class="dot dot-ok"></span> OK</span> |

## ⚙  VÉRIFICATION CONFIGURATION

| Test | Statut |
|------|--------|
| docker-compose.yml | <span class="ok"><span class="dot dot-ok"></span> OK</span> |
| .gitignore | <span class="ok"><span class="dot dot-ok"></span> OK</span> |

## 📁  VÉRIFICATION MONOREPO

| Test | Statut |
|------|--------|
| 4 package.json détectés | <span class="ok"><span class="dot dot-ok"></span> OK</span> |

## 🔌  VÉRIFICATION API

| Test | Statut |
|------|--------|
| Backend accessible | <span class="ok"><span class="dot dot-ok"></span> OK</span> |

## 🚀  LIAISONS ENTRE WORKSPACES

| Test | Statut |
|------|--------|
| server/.env présent | <span class="ok"><span class="dot dot-ok"></span> OK</span> |
| web/.env présent | <span class="ok"><span class="dot dot-ok"></span> OK</span> |
| .env (racine) présent | <span class="ok"><span class="dot dot-ok"></span> OK</span> |
| Cohérence ports server ↔ web | <span class="ok"><span class="dot dot-ok"></span> OK</span> |
| Cohérence PGDATABASE server ↔ docker | <span class="ok"><span class="dot dot-ok"></span> OK</span> |
| server → DB (SELECT 1) | <span class="ok"><span class="dot dot-ok"></span> OK</span> |
| server → DB (table users) | <span class="ok"><span class="dot dot-ok"></span> OK</span> |
| web → server (GET /api/health) | <span class="ok"><span class="dot dot-ok"></span> OK</span> |
| express installé (server) | <span class="ok"><span class="dot dot-ok"></span> OK</span> |
| pg installé (server) | <span class="ok"><span class="dot dot-ok"></span> OK</span> |
| react installé (web) | <span class="ok"><span class="dot dot-ok"></span> OK</span> |
| React Native (non configuré) | <span class="ignored"><span class="dot dot-ignored"></span> IGNORÉ</span> |
| Cloudinary configuré | <span class="ignored"><span class="dot dot-ignored"></span> IGNORÉ</span> |
| EmailJS configuré | <span class="ignored"><span class="dot dot-ignored"></span> IGNORÉ</span> |

## ⚠  SÉCURITÉ

| Test | Statut |
|------|--------|
| JWT_SECRET robuste | <span class="ok"><span class="dot dot-ok"></span> OK</span> |
| NODE_ENV défini (server) | <span class="ok"><span class="dot dot-ok"></span> OK</span> |
| .env dans .gitignore | <span class="ok"><span class="dot dot-ok"></span> OK</span> |
| .env.sample présent | <span class="ok"><span class="dot dot-ok"></span> OK</span> |
| CORS CLIENT_URL défini | <span class="ignored"><span class="dot dot-ignored"></span> IGNORÉ</span> |

## ⚙  QUALITÉ DU CODE

| Test | Statut |
|------|--------|
| Biome check (40 fichiers) | <span class="ok"><span class="dot dot-ok"></span> OK</span> |
| TypeScript (tsc --noEmit) | <span class="ok"><span class="dot dot-ok"></span> OK</span> |
| Script "dev" dans package.json | <span class="ok"><span class="dot dot-ok"></span> OK</span> |
| Script "dev" dans server/package.json | <span class="ok"><span class="dot dot-ok"></span> OK</span> |
| Script "build" dans server/package.json | <span class="ok"><span class="dot dot-ok"></span> OK</span> |
| Script "start" dans server/package.json | <span class="ok"><span class="dot dot-ok"></span> OK</span> |
| Script "dev" dans web/package.json | <span class="ok"><span class="dot dot-ok"></span> OK</span> |
| Script "build" dans web/package.json | <span class="ok"><span class="dot dot-ok"></span> OK</span> |
| Pas de console.log (server/src) | <span class="ok"><span class="dot dot-ok"></span> OK</span> |

## ⚙  TESTS

| Test | Statut |
|------|--------|
| npm test (racine) | <span class="ok"><span class="dot dot-ok"></span> OK</span> |
| npm test (server) | <span class="ok"><span class="dot dot-ok"></span> OK</span> |
| npm test (web) | <span class="ok"><span class="dot dot-ok"></span> OK</span> |

## 📁  GIT / CI

| Test | Statut |
|------|--------|
| Git initialisé (.git/) | <span class="ok"><span class="dot dot-ok"></span> OK</span> |

## 📊  PERFORMANCE

| Test | Statut |
|------|--------|
| Temps réponse API : 50ms | <span class="ok"><span class="dot dot-ok"></span> OK</span> |
| Build size : 513K | <span class="ok"><span class="dot dot-ok"></span> OK</span> |
| Pipeline CI (.github/workflows/ci.yml) | <span class="generated"><span class="dot dot-generated"></span> GÉNÉRÉ</span> |



<style>
body { font-family: "Segoe UI", sans-serif; font-size: 13px; color: black; max-width: 900px; margin: 0 auto; padding: 2rem; } .ok { color: #16a34a; font-weight: 700; } .fail { color: #dc2626; font-weight: 700; } .generated { color: #006666; font-weight: 700; } h1 { font-size: 24px; font-weight: 700; color: black; border-bottom: 3px solid #006666; padding-bottom: 0.5rem; margin-bottom: 0.25rem; } h1 + p { color: #006666; font-size: 12px; margin-top: 0; margin-bottom: 2rem; } h2 { font-size: 14px; font-weight: 600; color: white; background: #006666; padding: 6px 14px; border-radius: 6px; margin-top: 1.8rem; margin-bottom: 0.5rem; } h3 { font-size: 13px; font-weight: 600; color: #006666; border-left: 3px solid #006666; padding-left: 10px; margin-top: 1.2rem; } table { width: 100%; border-collapse: collapse; margin-bottom: 0.5rem; font-size: 12.5px; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 4px rgba(0,0,0,0.06); } thead tr { color: #006666; font-weight: 600; } th, td { padding: 7px 14px; text-align: left; border-bottom: 1px solid #e5e7eb; } tr:last-child td { border-bottom: none; } tr:nth-child(even) td { background: #fafafa; } td:last-child { font-weight: 500; white-space: nowrap; width: 120px; } code { color: black !important; padding: 1px 6px; border-radius: 4px; font-size: 12px; font-family: "Cascadia Code", "Fira Code", monospace; } pre { padding: 1rem 1.2rem; border-radius: 8px; font-size: 11.5px; overflow-x: auto; line-height: 1.6; font-family: "Cascadia Code", "Fira Code", monospace; } pre code { background: none; color: black; padding: 0; font-size: inherit; } strong { color: black; } p { margin: 0.3rem 0; } .summary { background: linear-gradient(135deg, #006666 0%, #004d4d 100%); color: white; padding: 1.5rem; border-radius: 8px; margin: 2rem 0; font-size: 14px; line-height: 1.8; display: flex; flex-direction: row; align-items: center; gap: 1.5rem; } .summary-left { display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem 2rem; flex: 2; } .summary-item { display: flex; align-items: center; font-weight: 500; } .summary-item::before { content: ''; display: inline-block; width: 12px; height: 12px; margin-right: 8px; border-radius: 50%; background: rgba(255,255,255,0.2); } .summary-item.pass::before { background: #16a34a; box-shadow: 0 0 6px rgba(22, 163, 74, 0.5); } .summary-item.fail::before { background: #dc2626; box-shadow: 0 0 6px rgba(220, 38, 38, 0.5); } .summary-item.ignored::before { background: #f59e0b; box-shadow: 0 0 6px rgba(245, 158, 11, 0.5); } .summary-item.generated::before { background: #4dd9ff; box-shadow: 0 0 6px rgba(77, 217, 255, 0.5); } .summary-divider { width: 2px; background: rgba(255,255,255,0.2); align-self: stretch; } .summary-rate { font-size: 20px; font-weight: 700; flex: 1; text-align: center; } .dot { display: inline-block; width: 11px; height: 11px; border-radius: 50%; margin-right: 6px; vertical-align: middle; position: relative; top: -1px; } .dot-ok { background: #16a34a; box-shadow: 0 0 5px rgba(22,163,74,0.5); } .dot-fail { background: #dc2626; box-shadow: 0 0 5px rgba(220,38,38,0.5); } .dot-ignored { background: #f59e0b; box-shadow: 0 0 5px rgba(245,158,11,0.5); } .dot-generated { background: #4dd9ff; box-shadow: 0 0 5px rgba(77,217,255,0.5);}
</style>## 📁  ARBORESCENCE DU PROJET

```
.
├── .env
├── .env.sample
├── .github
│   └── workflows
│       └── ci.yml
├── .gitignore
├── .vscode
│   └── settings.json
├── biome.json
├── docker-compose.yml
├── mobile
│   ├── package.json
│   └── src
│       ├── App.tsx
│       ├── components
│       │   ├── Footer
│       │   │   └── Footer.tsx
│       │   └── Header
│       │       └── Header.tsx
│       ├── constants
│       ├── main.tsx
│       ├── pages
│       ├── styles
│       │   └── index.css
│       └── utils
├── package-lock.json
├── package.json
├── README.md
├── server
│   ├── .env
│   ├── .env.sample
│   ├── database
│   │   └── script
│   │       └── schema.sql
│   ├── package.json
│   ├── src
│   │   ├── database
│   │   │   ├── client.ts
│   │   │   └── init-db.ts
│   │   ├── index.ts
│   │   └── routes
│   │       └── health.router.ts
│   └── tsconfig.json
├── setup
│   ├── constants.ts
│   ├── exports_writings
│   │   ├── export_writings_all.ts
│   │   ├── export_writings_gitDiff.ts
│   │   └── export_writings_noCommit.ts
│   ├── liveApp.ts
│   ├── resources
│   │   └── resources.md
│   ├── update-package-name.ts
│   └── verify_monorepo
│       ├── verify-report-2026-04-08.md
│       └── verify_monorepo.ts
├── tsconfig.json
└── web
    ├── .env
    ├── .env.sample
    ├── .gitignore
    ├── index.html
    ├── package.json
    ├── public
    ├── README.md
    ├── src
    │   ├── App.tsx
    │   ├── assets
    │   ├── components
    │   │   ├── footer
    │   │   │   └── Footer.tsx
    │   │   ├── header
    │   │   │   └── Header.tsx
    │   │   └── layout
    │   │       └── Layout.tsx
    │   ├── global.css
    │   ├── main.tsx
    │   ├── pages
    │   │   ├── homePage
    │   │   │   ├── HomePage.css
    │   │   │   └── HomePage.tsx
    │   │   └── notFoundPage
    │   │       ├── NotFoundPage.css
    │   │       └── NotFoundPage.tsx
    │   ├── router.tsx
    │   └── vite-env.d.ts
    ├── tsconfig.app.json
    ├── tsconfig.json
    ├── tsconfig.node.json
    ├── tsconfig.tsbuildinfo
    └── vite.config.ts
```

