# BZList

[![GitHub license](https://img.shields.io/github/license/bzlist/client.svg)](https://github.com/bzlist/client/blob/master/LICENSE)
![GitHub package.json version](https://img.shields.io/github/package-json/v/bzlist/client.svg)
[![GitHub issues](https://img.shields.io/github/issues/bzlist/client.svg)](https://github.com/bzlist/client/issues)
[![Website](https://img.shields.io/website/https/bzlist.net.svg)](https://bzlist.net)
[![Build Status](https://travis-ci.org/bzlist/client.svg?branch=master)](https://travis-ci.org/bzlist/client)
[![IRC #bzlist](https://img.shields.io/badge/IRC-%23bzlist-blue.svg)](http://webchat.freenode.net/?channels=#bzlist)

Firebase + Angular = *(kind of)* real-time server stats for BZFlag.

The changelog can be found [here](CHANGELOG.md) and the offical site at [bzlist.net](https://bzlist.net).

## Get started

### Clone the repository
Clone the repository.

```sh
git clone https://github.com/bzlist/bzlist.net.git
cd bzlist.net
```

### Install npm packages

Install the `npm` packages and verify everything is working:

```sh
npm install
npm start
```

The `npm start` command builds and compiles the application, watches for changes to source files, and runs the Angular dev server on port `4200`.

Shut it down manually with `Ctrl+C`.

### npm scripts

These are the most useful commands defined in `package.json`:

- `npm start` - runs the TypeScript compiler, asset copier, and dev server all at the same time in "watch mode."
- `npm run build:prod` - runs the TypeScript compiler with optimizations and asset copier once and outputs it into `dist/browser`.
- `npm run build:stats && npm run stats` - builds the app and generates stats into `dist` and opens the stats in your browser.
- `npm run build:gh-pages` - the same as `build:prod` and adds the prefix `client` for use with GitHub Pages.
- `npm run build:ssr` - builds with server-side rendering.
- `npm run deploy:gh-page` - deploys to GitHub Pages.
- `npm run deploy:firebase` - deploys everything configured to Firebase.
- `npm run deploy:firebase:hosting` - deploys `dist/browser` to Firebase Hosting.
- `npm run deploy:firebase:ssr` - deploys the SSR function to Firebase and deletes `dist/browser/index.html`.

*Note: If you deploy with server-side renderering you must delete `dist/browser/index.html` after compiling the `ssr` function and before deploying to hosting. This is done automatically with `npm run deploy:firebase:ssr`.*