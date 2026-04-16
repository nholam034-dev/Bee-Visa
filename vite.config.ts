import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, (process as any).cwd(), '');
  
  return {
    plugins: [react()],
    base: '/',
    define: {
      // Gemini API Key
      'process.env.API_KEY': JSON.stringify(process.env.API_KEY || env.API_KEY || env.VITE_FIREBASE_API_KEY),
      // Firebase Config — inject tất cả biến môi trường
      'process.env.VITE_FIREBASE_API_KEY': JSON.stringify(process.env.VITE_FIREBASE_API_KEY || env.VITE_FIREBASE_API_KEY),
      'process.env.VITE_FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.VITE_FIREBASE_AUTH_DOMAIN || env.VITE_FIREBASE_AUTH_DOMAIN),
      'process.env.VITE_FIREBASE_PROJECT_ID': JSON.stringify(process.env.VITE_FIREBASE_PROJECT_ID || env.VITE_FIREBASE_PROJECT_ID),
      'process.env.VITE_FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.VITE_FIREBASE_STORAGE_BUCKET || env.VITE_FIREBASE_STORAGE_BUCKET),
      'process.env.VITE_FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || env.VITE_FIREBASE_MESSAGING_SENDER_ID),
      'process.env.VITE_FIREBASE_APP_ID': JSON.stringify(process.env.VITE_FIREBASE_APP_ID || env.VITE_FIREBASE_APP_ID),
      // Fallback object process.env rỗng để tránh lỗi runtime
      'process.env': {} 
    },
    server: {
      host: true,
      watch: {
        usePolling: true
      }
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
      emptyOutDir: true,
      rollupOptions: {
        output: {
          manualChunks: {
            // Tách Firebase SDK ra chunk riêng (~200KB) — cache lâu dài
            firebase: ['firebase/app', 'firebase/auth', 'firebase/firestore', 'firebase/storage'],
            // Tách React core ra chunk riêng (~140KB)
            react: ['react', 'react-dom'],
            // Tách Google GenAI SDK
            genai: ['@google/genai'],
          }
        }
      }
    }
  }
})