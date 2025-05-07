/**
 * @type {import('next').NextConfig}
 */
module.exports = {  
  output: 'export',  
  images: {  
      unoptimized: true,  
  },  
};

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  trailingSlash: true,
};

export default nextConfig;
