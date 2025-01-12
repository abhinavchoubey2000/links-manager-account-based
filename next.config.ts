import type { NextConfig } from "next";
import withPWA from "next-pwa"
const nextConfig: NextConfig = {
  /* config options here */
};
export const pwa = withPWA({
	pwa: {
		dest: "public", // Output directory for PWA files
		register: true, // Register the service worker
		skipWaiting: true, // Skip waiting and activate the service worker immediately
	},
});
export default nextConfig;
