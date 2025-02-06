import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "/block-front/",
  plugins: [
    vue(),
    vueDevTools(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: { enabled: true },
      manifest: {
        name: "Frieren",
        short_name: "Frieren",
        description: "Uma aplicação Vue 3 transformada em PWA!",
        theme_color: "#447c7f",
        display: "standalone",
        display_override: ["minimal-ui", "fullscreen"],
        icons: [
          { src: "/block-front/assets/logo-192x192.png", sizes: "192x192", type: "image/png" },
          { src: "/block-front/assets/logo-512x512.png", sizes: "512x512", type: "image/png" },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === "document",
            handler: "NetworkFirst", // Pega a versão mais recente quando online
            options: { cacheName: "html-cache" },
          },
          {
            urlPattern: ({ request }) => ["script", "style"].includes(request.destination),
            handler: "CacheFirst", // Usa o cache primeiro para evitar requisições desnecessárias
            options: { cacheName: "static-resources" },
          },
          {
            urlPattern: ({ request }) => request.destination === "image",
            handler: "CacheFirst",
            options: { cacheName: "image-cache", expiration: { maxEntries: 50 } },
          },
          {
            urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com/,
            handler: "CacheFirst",
            options: { cacheName: "google-fonts", expiration: { maxEntries: 30 } },
          },
          {
            urlPattern: /^https:\/\/cdn\.jsdelivr\.net/,
            handler: "CacheFirst",
            options: { cacheName: "cdn-cache", expiration: { maxEntries: 20 } },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
});
