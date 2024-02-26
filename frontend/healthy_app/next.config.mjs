/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: "/callback",
                destination: "/",
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
