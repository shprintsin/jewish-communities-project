import nextra from "nextra";

const withNextra = nextra({
    
    defaultShowCopyCode: true,
    staticImage: true
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    // your existing Next.js config
    distDir: '.next',
    
};

export default withNextra(nextConfig);
