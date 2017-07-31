/* eslint-env node */
'use strict';

module.exports = function(/* environment, appConfig */) {
  // See https://github.com/san650/ember-web-app#documentation for a list of
  // supported properties

  return {
    lang: "ru",
    name: "bss football",
    short_name: "bss football",
    description: "",
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#00bfff",
    orientation: "portrait",
    icons: [
      {
        src: '/images/icon180.png',
        sizes: '180x180'
      },
      {
        src: '/images/icon120.png',
        sizes: '120x120'
      },
      {
        src: '/images/icon76.png',
        sizes: '76x76'
      },
      {
        src: '/images/icon32.png',
        sizes: '32x32',
        targets: ['favicon']
      }
    ]
  };
}
