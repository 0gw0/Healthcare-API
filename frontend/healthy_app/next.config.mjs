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
	plugins: [import('flowbite/plugin.js')],
	content: ['./node_modules/flowbite/**/*.js'],
};

export default nextConfig;
