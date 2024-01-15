import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
      pages: path.resolve(__dirname, "./src/pages"),
      components: `${path.resolve(__dirname, "./src/components/")}`,
      layouts: path.resolve(__dirname, "./src/layouts"),
      assets: path.resolve(__dirname, "./src/assets"),
      redux: path.resolve(__dirname, "./src/redux"),
      utils: path.resolve(__dirname, "./src/utils"),
      api: path.resolve(__dirname, "./src/api"),
      hooks: path.resolve(__dirname, "./src/hooks"),
    },
  },
});
