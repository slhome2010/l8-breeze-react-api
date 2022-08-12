const CracoAlias = require('craco-alias');
const path = require("path");

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        /* tsConfigPath should point to the file where "paths" are specified */
        tsConfigPath: './tsconfig.paths.json',
        /* baseUrl: '.', */
      },
    },
  ],
  webpack: {
    alias: {
      '@mui/styled-engine': '@mui/styled-engine-sc',
      '@': path.resolve(__dirname, 'src'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@views': path.resolve(__dirname, 'src/views'),
      '@pages': path.resolve(__dirname, 'src/views/pages'),
      '@layouts': path.resolve(__dirname, 'src/views/layouts'),
      '@services': path.resolve(__dirname, 'src/services'),
      // ...etc
    },
  },
};
