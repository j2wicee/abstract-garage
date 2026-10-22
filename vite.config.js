import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { structuredData } from "./src/data/business.js";

// Adds schema.org AutoRepair data to index.html so search engines can show
// the shop's hours, phone, and location. Built from src/data/business.js.
function businessStructuredData() {
  return {
    name: "business-structured-data",
    transformIndexHtml() {
      return [
        {
          tag: "script",
          attrs: { type: "application/ld+json" },
          children: JSON.stringify(structuredData()),
          injectTo: "head",
        },
      ];
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), businessStructuredData()],
});
