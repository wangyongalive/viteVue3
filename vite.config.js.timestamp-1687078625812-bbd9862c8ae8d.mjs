// vite.config.js
import path, { join } from "path";
import { defineConfig } from "file:///D:/code/imooc-front/viteVue3/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/code/imooc-front/viteVue3/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import VueSetupExtend from "file:///D:/code/imooc-front/viteVue3/node_modules/vite-plugin-vue-setup-extend/dist/index.mjs";
import { createSvgIconsPlugin } from "file:///D:/code/imooc-front/viteVue3/node_modules/vite-plugin-svg-icons/dist/index.mjs";
var __vite_injected_original_dirname = "D:\\code\\imooc-front\\viteVue3";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
      // 指定symbolId格式
      symbolId: "icon-[name]"
    }),
    VueSetupExtend()
  ],
  // 软链接
  resolve: {
    alias: {
      "@": join(__vite_injected_original_dirname, "/src")
    }
  },
  // 代理
  server: {
    open: true,
    proxy: {
      // 代理所有 /api 的请求，该求情将被代理到 target 中
      "/prod-api": {
        // 代理请求之后的请求地址
        target: "http://localhost:30000",
        // 跨域
        changeOrigin: true
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxjb2RlXFxcXGltb29jLWZyb250XFxcXHZpdGVWdWUzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxjb2RlXFxcXGltb29jLWZyb250XFxcXHZpdGVWdWUzXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9jb2RlL2ltb29jLWZyb250L3ZpdGVWdWUzL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHBhdGgsIHsgam9pbiB9IGZyb20gJ3BhdGgnXHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xyXG5pbXBvcnQgVnVlU2V0dXBFeHRlbmQgZnJvbSAndml0ZS1wbHVnaW4tdnVlLXNldHVwLWV4dGVuZCdcclxuaW1wb3J0IHsgY3JlYXRlU3ZnSWNvbnNQbHVnaW4gfSBmcm9tICd2aXRlLXBsdWdpbi1zdmctaWNvbnMnXHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHBsdWdpbnM6IFtcclxuICAgIHZ1ZSgpLFxyXG4gICAgY3JlYXRlU3ZnSWNvbnNQbHVnaW4oe1xyXG4gICAgICAvLyBcdTYzMDdcdTVCOUFcdTk3MDBcdTg5ODFcdTdGMTNcdTVCNThcdTc2ODRcdTU2RkVcdTY4MDdcdTY1ODdcdTRFRjZcdTU5MzlcclxuICAgICAgaWNvbkRpcnM6IFtwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgJ3NyYy9hc3NldHMvaWNvbnMnKV0sXHJcbiAgICAgIC8vIFx1NjMwN1x1NUI5QXN5bWJvbElkXHU2ODNDXHU1RjBGXHJcbiAgICAgIHN5bWJvbElkOiAnaWNvbi1bbmFtZV0nXHJcbiAgICB9KSxcclxuICAgIFZ1ZVNldHVwRXh0ZW5kKClcclxuICBdLFxyXG4gIC8vIFx1OEY2Rlx1OTRGRVx1NjNBNVxyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgICdAJzogam9pbihfX2Rpcm5hbWUsICcvc3JjJylcclxuICAgIH1cclxuICB9LFxyXG4gIC8vIFx1NEVFM1x1NzQwNlxyXG4gIHNlcnZlcjoge1xyXG4gICAgb3BlbjogdHJ1ZSxcclxuICAgIHByb3h5OiB7XHJcbiAgICAgIC8vIFx1NEVFM1x1NzQwNlx1NjI0MFx1NjcwOSAvYXBpIFx1NzY4NFx1OEJGN1x1NkM0Mlx1RkYwQ1x1OEJFNVx1NkM0Mlx1NjBDNVx1NUMwNlx1ODhBQlx1NEVFM1x1NzQwNlx1NTIzMCB0YXJnZXQgXHU0RTJEXHJcbiAgICAgICcvcHJvZC1hcGknOiB7XHJcbiAgICAgICAgLy8gXHU0RUUzXHU3NDA2XHU4QkY3XHU2QzQyXHU0RTRCXHU1NDBFXHU3Njg0XHU4QkY3XHU2QzQyXHU1NzMwXHU1NzQwXHJcbiAgICAgICAgdGFyZ2V0OiAnaHR0cDovL2xvY2FsaG9zdDozMDAwMCcsXHJcbiAgICAgICAgLy8gXHU4REU4XHU1N0RGXHJcbiAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn0pXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBOFEsT0FBTyxRQUFRLFlBQVk7QUFDelMsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sb0JBQW9CO0FBQzNCLFNBQVMsNEJBQTRCO0FBSnJDLElBQU0sbUNBQW1DO0FBT3pDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLElBQUk7QUFBQSxJQUNKLHFCQUFxQjtBQUFBO0FBQUEsTUFFbkIsVUFBVSxDQUFDLEtBQUssUUFBUSxRQUFRLElBQUksR0FBRyxrQkFBa0IsQ0FBQztBQUFBO0FBQUEsTUFFMUQsVUFBVTtBQUFBLElBQ1osQ0FBQztBQUFBLElBQ0QsZUFBZTtBQUFBLEVBQ2pCO0FBQUE7QUFBQSxFQUVBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssS0FBSyxrQ0FBVyxNQUFNO0FBQUEsSUFDN0I7QUFBQSxFQUNGO0FBQUE7QUFBQSxFQUVBLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE9BQU87QUFBQTtBQUFBLE1BRUwsYUFBYTtBQUFBO0FBQUEsUUFFWCxRQUFRO0FBQUE7QUFBQSxRQUVSLGNBQWM7QUFBQSxNQUNoQjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
