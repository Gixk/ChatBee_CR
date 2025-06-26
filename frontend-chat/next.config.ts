import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   eslint: {
    ignoreDuringBuilds: true, // Desactiva errores de ESLint en el build de producción
  },
};

export default nextConfig;
