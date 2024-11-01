/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: (config, { isServer }) => {
		if (!isServer) {
			// Don't attempt to load node-specific modules on the client-side
			config.resolve.fallback = {
				...config.resolve.fallback, // if you have existing fallbacks
				fs: false,
				net: false,
				tls: false,
				child_process: false,
				path: false,
			};
		}
		return config;
	},
};

export default nextConfig;
