import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { copyFileSync, mkdirSync, readdirSync, statSync } from "fs";
import { join, relative } from "path";

function safeCopyPublicPlugin() {
  return {
    name: "safe-copy-public",
    closeBundle() {
      const src = join(process.cwd(), "public");
      const dest = join(process.cwd(), "dist");
      function copyDir(srcDir, destDir) {
        let entries;
        try {
          entries = readdirSync(srcDir);
        } catch {
          return;
        }
        mkdirSync(destDir, { recursive: true });
        for (const entry of entries) {
          const srcPath = join(srcDir, entry);
          const destPath = join(destDir, entry);
          try {
            const stat = statSync(srcPath);
            if (stat.isDirectory()) {
              copyDir(srcPath, destPath);
            } else {
              copyFileSync(srcPath, destPath);
            }
          } catch {
            // skip inaccessible files
          }
        }
      }
      copyDir(src, dest);
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), safeCopyPublicPlugin()],
  build: {
    copyPublicDir: false,
  },
});
