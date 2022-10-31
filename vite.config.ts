import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname)

  return {
    plugins: [
      vue(),
      Components(),
      AutoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/, /\.vue\?vue/, // .vue
          /\.md$/ // .md
        ],
        // global imports to register
        imports: [
          // presets
          'vue',
          'vue-router'
        ],

        // Auto import for module exports under directories
        // by default it only scan one level of modules under the directory
        dirs: [
          // './hooks',
          // './composables' // only root modules
          // './composables/**', // all nested modules
          // ...
        ],

        // Filepath to generate corresponding .d.ts file.
        // Defaults to './auto-imports.d.ts' when `typescript` is installed locally.
        // Set `false` to disable.
        dts: './auto-imports.d.ts',

        // Auto import inside Vue template
        // see https://github.com/unjs/unimport/pull/15 and https://github.com/unjs/unimport/pull/72
        vueTemplate: false,

        // Custom resolvers, compatible with `unplugin-vue-components`
        // see https://github.com/antfu/unplugin-auto-import/pull/23/
        resolvers: [
          /* ... */
        ],

        // Generate corresponding .eslintrc-auto-import.json file.
        // eslint globals Docs - https://eslint.org/docs/user-guide/configuring/language-options#specifying-globals
        eslintrc: {
          enabled: false, // Default `false`
          filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
          globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        }
      })
    ],
    base: env.VITE_APP_PATHNAME
  }
})
