import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
      include: /assets/,
    });

    return config;
  },
  // reactStrictMode: false,
};

export default withNextIntl(nextConfig);
