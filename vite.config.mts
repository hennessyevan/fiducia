/// <reference types='vitest' />
import react from '@vitejs/plugin-react'
import tsConfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vite'
import crossOriginIsolation from 'vite-plugin-cross-origin-isolation'
import mkcert from 'vite-plugin-mkcert'
import { VitePWA } from 'vite-plugin-pwa'
import glsl from 'vite-plugin-glsl'
import manifest from './manifest'

const oneYearInSeconds = 60 * 60 * 24 * 365

export default defineConfig({
  root: __dirname,
  assetsInclude: ['**/*.sqlite'],

  server: {
    port: 4200,
    host: true,
    headers: {
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Strict-Transport-Security': `max-age=${oneYearInSeconds}`,
    },
  },

  plugins: [
    react(),
    glsl(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      manifest,
      pwaAssets: {
        preset: {
          transparent: {
            sizes: [64, 192, 512, 1024],
            favicons: [[48, 'favicon.ico']],
          },
          maskable: {
            padding: 0,
            sizes: [180, 512, 1024],
          },
          apple: {
            padding: 0,
            sizes: [180, 512, 1024],
          },
        },
        image: 'public/logo.png',
        overrideManifestIcons: true,
      },
      selfDestroying: true,
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,wasm,obj}'],
      },
    }),
    tsConfigPaths(),
    mkcert(),
    crossOriginIsolation(),
  ],

  optimizeDeps: {
    exclude: ['sqlocal'],
  },

  // Uncomment this if you are using workers.
  worker: {
    plugins: () => [tsConfigPaths()],
  },

  build: {
    outDir: './dist',
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },

  // test: {
  //   globals: true,
  //   environment: 'jsdom',
  //   include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],

  //   reporters: ['default'],
  //   coverage: {
  //     reportsDirectory: './coverage',
  //     provider: 'v8',
  //   },
  // },
})
