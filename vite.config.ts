import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { spawn, type ChildProcess } from 'child_process';
import net from 'net';
import path from 'path';
import { defineConfig, type Plugin } from 'vite';

let fastapiProcess: ChildProcess | null = null;
const FASTAPI_PORT = Number(process.env.FASTAPI_PORT || 8765);

function isPortListening(port: number, host = '127.0.0.1'): Promise<boolean> {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    socket.setTimeout(400);
    socket.once('connect', () => {
      socket.destroy();
      resolve(true);
    });
    socket.once('timeout', () => {
      socket.destroy();
      resolve(false);
    });
    socket.once('error', () => {
      socket.destroy();
      resolve(false);
    });
    socket.connect(port, host);
  });
}

function fastApiBackendPlugin(port: number): Plugin {
  return {
    name: 'fastapi-backend-launcher',
    configureServer() {
      void (async () => {
        const running = await isPortListening(port);
        if (!running && !fastapiProcess) {
          fastapiProcess = spawn(
            'python3',
            ['-m', 'uvicorn', 'main:app', '--host', '127.0.0.1', '--port', String(port)],
            {
              cwd: path.resolve(__dirname, 'backend'),
              stdio: 'ignore',
              detached: false,
            }
          );
          fastapiProcess.on('exit', () => {
            fastapiProcess = null;
          });
        }
      })();
    },
  };
}

export default defineConfig(() => {
  const backendTarget = `http://127.0.0.1:${FASTAPI_PORT}`;

  return {
    plugins: [react(), tailwindcss(), fastApiBackendPlugin(FASTAPI_PORT)],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
      proxy: {
        '/api': {
          target: backendTarget,
          changeOrigin: true,
        },
      },
    },
    preview: {
      proxy: {
        '/api': {
          target: backendTarget,
          changeOrigin: true,
        },
      },
    },
  };
});
