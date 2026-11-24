import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

/*
 * Lagen (van onder naar boven). Een laag mag alleen importeren uit lagen ONDER zich:
 *   lib, hooks → components/ui → components/motion → components/brand → components/sections
 *   → features → components/layout → pages
 * Zo blijven ui en motion herbruikbaar in een volgend project, los van het Slaktrrr-thema.
 * Imports buiten de eigen map gaan altijd via "@/"; binnen dezelfde map via "./".
 */
const layer = (from) => ({ group: from, message: 'Deze import gaat een laag omhoog. Zie de lagen bovenin eslint.config.js.' })
const UP = {
  ui: ['@/components/motion/*', '@/components/brand/*', '@/components/sections/*', '@/components/layout/*', '@/features/*', '@/pages/*'],
  motion: ['@/components/brand/*', '@/components/sections/*', '@/components/layout/*', '@/features/*', '@/pages/*'],
  brand: ['@/components/sections/*', '@/components/layout/*', '@/features/*', '@/pages/*'],
  sections: ['@/components/layout/*', '@/features/*', '@/pages/*'],
  features: ['@/components/layout/*', '@/pages/*'],
  layout: ['@/pages/*'],
  base: ['@/components/*', '@/features/*', '@/pages/*'],
}
const restrict = (files, groups) => ({
  files,
  rules: {
    'no-restricted-imports': ['error', {
      patterns: [
        { group: ['../*'], message: 'Gebruik "@/..." voor imports buiten de eigen map.' },
        ...groups.map((g) => layer([g])),
      ],
    }],
  },
})

export default defineConfig([
  globalIgnores(['dist', 'playwright-report', 'test-results']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
  },
  restrict(['src/**/*.{ts,tsx}'], []),
  restrict(['src/lib/**', 'src/hooks/**'], UP.base),
  restrict(['src/components/ui/**'], UP.ui),
  restrict(['src/components/motion/**'], UP.motion),
  restrict(['src/components/brand/**'], UP.brand),
  restrict(['src/components/sections/**'], UP.sections),
  restrict(['src/features/**'], UP.features),
  restrict(['src/components/layout/**'], UP.layout),
])
