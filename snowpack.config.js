// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    /* ... */
  },
  plugins: [
    // 'snowpack_plugin',
    // ['snowpack_plugin', { optionA: 'foo', optionB: true}],
    ["@snowpack/plugin-optimize", {minifyJS: true, minifyCSS: true}]
  ],
  packageOptions: {
    /* ... */
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    /* ... */
  },
};
