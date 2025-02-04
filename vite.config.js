import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  base: "/block-front/",
  plugins: [
    vue(),
    vueDevTools(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true, // Habilitar PWA no modo desenvolvimento, opcional
      },
      manifest: {
        name: "Frieren",
        short_name: "Frieren",
        description: "Uma aplicação Vue 3 transformada em PWA!",
        theme_color: "#447c7f",
        display: "standalone",
        display_override: ["minimal-ui", "fullscreen"],
        screenshots: [
          {
            src: "/assets/screenshot1.png",
            sizes: "1280x720",
            type: "image/png",
            purpose: "any",
            form_factor: "wide",
          },
          {
            src: "/assets/screenshot2.png",
            sizes: "360x640",
            type: "image/png",
            purpose: "any",
            form_factor: "narrow",
          },
        ],
        icons: [
          {
            src: "/assets/logo-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/assets/logo-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
