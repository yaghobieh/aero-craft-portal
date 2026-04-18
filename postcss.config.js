import { aerocraftPlugin } from '@forgedevstack/aerocraft/postcss';

export default {
  plugins: [
    aerocraftPlugin({
      prefix: '',
      separator: '-',
      mode: 'standalone',
      groups: 'all',
      responsive: true,
    }),
  ],
};
