import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import mkcert from 'vite-plugin-mkcert';  // Import the mkcert plugin for HTTPS

const manifestForPlugIn = {
  registerType: 'prompt',
  includeAssets: ['dollar.png', 'coin.png', 'share.png'],  // Include available assets
  manifest: {
    name: 'React-vite-app',  // Full app name
    short_name: 'react-vite-app',  // Shorter version for homescreen
    description: 'I am a simple Vite app',
    icons: [
      {
        src: '/coin.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'favicon',
      },
      {
        src: '/dollar.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'favicon',
      },
      {
        src: '/msz.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'apple touch icon',
      },
      {
        src: '/share.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
    theme_color: '#171717',
    background_color: '#f0e7db',
    display: 'standalone',
    scope: '/',
    start_url: '/',
    orientation: 'portrait',
  },
};

// Vite configuration with HTTPS enabled
export default defineConfig({
  plugins: [
    react(), 
    VitePWA(manifestForPlugIn), 
    mkcert()  // Enable mkcert for HTTPS
  ],
  server: {
    port: 3001,  // Your app will run on port 3000
    https: true,  // Enable HTTPS for local development
  },
});
