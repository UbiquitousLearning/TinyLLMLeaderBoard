import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import externalGlobals from 'rollup-plugin-external-globals'
import { visualizer } from "rollup-plugin-visualizer";
export default defineConfig({
  plugins: [react(), visualizer(
    {
      // emitFile: true,
      // filename: "stats.html",
      open: true,  // 打包后自动打开页面
      gzipSize: true,  // 查看 gzip 压缩大小
      brotliSize: true // 查看 brotli 压缩大小
    }
  )],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      external: ['echarts/*'],
      plugins: [
        externalGlobals({
          'echarts': 'echarts'
        })
      ]
    }
  },base: "TinyLLMLeaderBoard",
})
