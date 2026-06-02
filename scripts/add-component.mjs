#!/usr/bin/env node
/**
 * pnpm add:component <ComponentName>
 *
 * Creates the four scaffolded files for a new DS component + page, appends
 * the lazy import, and prints the registry entry to paste manually.
 *
 * Usage:
 *   pnpm add:component MyComponent
 */

import { mkdirSync, writeFileSync, readFileSync, appendFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(fileURLToPath(import.meta.url), '..', '..')

// ── Argument validation ──────────────────────────────────────────────────────

const name = process.argv[2]

if (!name) {
  console.error('Usage: pnpm add:component <ComponentName>')
  process.exit(1)
}

if (!/^[A-Z][A-Za-z0-9]+$/.test(name)) {
  console.error('ComponentName must be PascalCase (e.g. MyComponent).')
  process.exit(1)
}

// ── Derived names ────────────────────────────────────────────────────────────

const camel = name.charAt(0).toLowerCase() + name.slice(1)
const kebab = name
  .replace(/([A-Z])/g, (m, c, i) => (i === 0 ? c.toLowerCase() : `-${c.toLowerCase()}`))
const SCREAMING = kebab.replace(/-/g, '_').toUpperCase()

// ── Paths ────────────────────────────────────────────────────────────────────

const compDir  = join(ROOT, 'src', 'components', name)
const pageDir  = join(ROOT, 'src', 'pages', name)
const tokenFile = join(ROOT, 'src', 'tokens', `${camel}.ts`)
const lazyFile  = join(ROOT, 'src', 'pages', 'lazy.ts')

// ── Guard: do not overwrite ──────────────────────────────────────────────────

for (const p of [compDir, pageDir, tokenFile]) {
  if (existsSync(p)) {
    console.error(`Already exists: ${p}\nAborting to avoid overwrite.`)
    process.exit(1)
  }
}

// ── File content templates ───────────────────────────────────────────────────

const componentTsx = `\
import styles from './${name}.module.css'

export interface ${name}Props {
  className?: string
}

export default function ${name}({ className }: ${name}Props) {
  return (
    <div className={[styles.root, className ?? ''].filter(Boolean).join(' ')}>
      {/* TODO */}
    </div>
  )
}
`

const componentCss = `\
.root {
}
`

const tokenTs = `\
import type { GuidelineDef } from './types'

export const ${SCREAMING}_GUIDELINES: GuidelineDef[] = []
`

const pageTsx = `\
import PageHeader from '../../components/docs/PageHeader/PageHeader'
import Section from '../../components/docs/Section/Section'
import ${name} from '../../components/${name}/${name}'
import styles from './${name}Page.module.css'

export default function ${name}Page() {
  return (
    <div className={styles.page}>
      <PageHeader title="${name}" description="TODO: descrição do componente." />
      <Section title="Playground">
        <${name} />
      </Section>
    </div>
  )
}
`

const pageCss = `\
.page {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-800);
}
`

// ── Write files ──────────────────────────────────────────────────────────────

mkdirSync(compDir, { recursive: true })
mkdirSync(pageDir, { recursive: true })

writeFileSync(join(compDir, `${name}.tsx`), componentTsx)
writeFileSync(join(compDir, `${name}.module.css`), componentCss)
writeFileSync(tokenFile, tokenTs)
writeFileSync(join(pageDir, `${name}Page.tsx`), pageTsx)
writeFileSync(join(pageDir, `${name}Page.module.css`), pageCss)

// ── Append to lazy.ts ────────────────────────────────────────────────────────

const lazyLine = `export const ${name}Page          = lazy(() => import('./${name}/${name}Page'))\n`
appendFileSync(lazyFile, lazyLine)

// ── Print registry entry ─────────────────────────────────────────────────────

console.log(`
✓ Criado src/components/${name}/${name}.tsx
✓ Criado src/components/${name}/${name}.module.css
✓ Criado src/tokens/${camel}.ts
✓ Criado src/pages/${name}/${name}Page.tsx
✓ Criado src/pages/${name}/${name}Page.module.css
✓ Adicionado a src/pages/lazy.ts

Adicione a seguinte entrada em src/pages/registry.tsx dentro do array PAGES:

  {
    path: '/${kebab}',
    label: '${name}',
    icon: 'TODO_icon',
    category: 'TODO_category',
    component: ${name}Page,
  },

Categorias disponíveis: Foundations, Actions, Navigations, Indicators, Inputs,
  Utilities, Alerts, Overlays, Visual resources
`)
