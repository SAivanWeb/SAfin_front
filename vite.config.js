import { fileURLToPath, URL } from 'node:url'
import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: 'auto',
      devOptions: { enabled:true },
      workbox: {
        runtimeCaching: [],
      },
      includeAssets:
          ['fonts/*.ttf','images/*.png','css/*.css'],
      manifest: {
        "short_name": "SAfin",
        "name": "SAfin",
        "start_url":"/",
        "display": "standalone",
        "theme_color": "#fff",
        "background_color": "#fff",
        "orientation": "portrait",
        "icons": [
          { "src": "/icon-192x192.png", "sizes": "192x192", "type": "image/png" },
          { "src": "/icon-512x512.png", "sizes": "512x512", "type": "image/png" },
          {
            "src": "/icon-512x512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "maskable"
          }
        ],
        "screenshots": [
          {
            "src": "/screen-1280x720.png",
            "sizes": "1280x720",
            "type": "image/png",
            "form_factor": "wide",
            "label": "Главная страница"
          },
          {
            "src": "/screen-580x960.png",
            "sizes": "580x960",
            "type": "image/png",
            "label": "Главная страница"
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})