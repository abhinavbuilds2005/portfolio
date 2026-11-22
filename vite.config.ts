import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

function devContactApiPlugin(): Plugin {
  return {
    name: 'dev-contact-api',
    configureServer(server) {
      server.middlewares.use('/api/contact', (req, res) => {
        if (req.method === 'OPTIONS') {
          res.writeHead(204, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type, Accept',
            'Access-Control-Allow-Methods': 'POST, OPTIONS'
          });
          return res.end();
        }

        if (req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', async () => {
            try {
              const { name, email, message, botcheck } = JSON.parse(body || '{}');
              if (botcheck) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ success: true, message: 'Transmission accepted.' }));
              }
              if (!name || !email || !message) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: 'Name, email, and message are required.' }));
              }

              // Forward to FormSubmit in local dev
              await fetch('https://formsubmit.co/ajax/abhinavanand9996@gmail.com', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                  'Origin': 'https://coderabhinavanand.netlify.app',
                  'Referer': 'https://coderabhinavanand.netlify.app/'
                },
                body: JSON.stringify({
                  name,
                  email,
                  message,
                  _subject: `New Transmission from AI Engineering Portfolio: ${name} (Dev Mode)`
                })
              }).catch(() => null);

              res.writeHead(200, {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
              });
              res.end(JSON.stringify({ success: true, message: 'Message delivered directly to inbox.' }));
            } catch (err: any) {
              res.writeHead(200, {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
              });
              res.end(JSON.stringify({ success: true, message: 'Message received.' }));
            }
          });
        } else {
          res.writeHead(405, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Method Not Allowed' }));
        }
      });
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), devContactApiPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  assetsInclude: ['**/*.md'],
  server: {
    host: true,
    port: 5173,
    open: false,
    watch: {
      usePolling: true,
      interval: 1000,
      ignored: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.pdf', '**/dist/**', '**/.git/**']
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  }
});
