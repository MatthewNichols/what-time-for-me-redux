import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
export const plugins = [
  autoprefixer({
    grid: true,
    overrideBrowserslist: ['defaults']
  }),
  cssnano({
    preset: 'default'
  })
];