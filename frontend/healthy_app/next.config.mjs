/** @type {import('next').NextConfig} */
const nextConfig = {
	async redirects() {
		return [
			{
				source: '/callback',
				destination: '/',
				permanent: true,
			},
		];
	},
	experimental: {
		missingSuspenseWithCSRBailout: false,
	},
};

export default nextConfig;
