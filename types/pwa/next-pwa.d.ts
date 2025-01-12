declare module "next-pwa" {
	import { NextConfig } from "next";

	interface PWAConfig {
		dest: string;
		register?: boolean;
		skipWaiting?: boolean;
		disable?: boolean;
		[key: string]: any; // Allow additional configuration
	}

	function withPWA(config: NextConfig & { pwa?: PWAConfig }): NextConfig;

	export = withPWA;
}
