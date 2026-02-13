import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/Daily_wins/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon-192.png', 'icon-512.png'],
      manifest: {
        name: 'Daily Wins',
        short_name: 'DailyWins',
        description: 'Daily Wins Task Tracker',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/Daily_wins/',
        scope: '/Daily_wins/',
        icons: [
          {
            src: '/Daily_wins/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/Daily_wins/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})
