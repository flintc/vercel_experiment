/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: "/movie",
        has: [
          {
            type: "query",
            key: "id",
            // the page value will not be available in the
            // destination since value is provided and doesn't
            // use a named capture group e.g. (?<page>home)
            value: "62",
          },
        ],
        destination: "/foo",
        permanent: false,
      },
    ];
  },
  // redirects: {
  //   source: "/movie",
  //   has: [
  //     {
  //       type: "query",
  //       key: "id",
  //       // the page value will not be available in the
  //       // destination since value is provided and doesn't
  //       // use a named capture group e.g. (?<page>home)
  //       // value: "home",
  //     },
  //   ],
  //   permanent: false,
  //   destination: "/foo",
  // },
};

module.exports = nextConfig;
