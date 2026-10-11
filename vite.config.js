import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// Serves api/admin.js during `npm run dev` the same way Vercel does in production.
function devApi() {
  return {
    name: 'dev-api',
    configureServer(server) {
      Object.assign(process.env, loadEnv('development', process.cwd(), ''));
      server.middlewares.use('/api/admin', async (req, res) => {
        let raw = '';
        for await (const chunk of req) raw += chunk;
        let body = {};
        try { body = JSON.parse(raw || '{}'); } catch { /* handler rejects */ }
        const shim = {
          status(code) { res.statusCode = code; return shim; },
          setHeader: (k, v) => res.setHeader(k, v),
          json(obj) { res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(obj)); },
        };
        const mod = await server.ssrLoadModule('/api/admin.js');
        await mod.default({ method: req.method, body }, shim);
      });
    },
  };
}

export default defineConfig({ plugins: [react(), devApi()] });
