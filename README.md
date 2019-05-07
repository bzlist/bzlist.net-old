# BZList

[![GitHub license](https://img.shields.io/github/license/bzlist/client.svg)](https://github.com/bzlist/client/blob/master/LICENSE)
![GitHub package.json version](https://img.shields.io/github/package-json/v/bzlist/client.svg)
[![GitHub issues](https://img.shields.io/github/issues/bzlist/client.svg)](https://github.com/bzlist/client/issues)
[![GitHub forks](https://img.shields.io/github/forks/bzlist/client.svg)](https://github.com/bzlist/client/network)
[![GitHub stars](https://img.shields.io/github/stars/bzlist/client.svg)](https://github.com/bzlist/client/stargazers)
![GitHub top language](https://img.shields.io/github/languages/top/bzlist/client.svg)
[![Website](https://img.shields.io/website/https/bzlist.net.svg)](https://bzlist.net)

Firebase + Angular = *(kind of)* real-time server stats for BZFlag.

The changelog can be found [here](CHANGELOG.md) and the offical site at [bzlist.net](https://bzlist.net).

## Get started

### Clone the repository

(Optional) make a dedicated directory for BZList.

```sh
mkdir bzlist
cd bzlist
```

Clone the repository.

```sh
git clone https://github.com/bzlist/client.git
cd client
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
- `npm run deploy:firebase` - deploys `dist/browser` to Firebase Hosting and functions to Firebase Functions.
- `npm run deploy:firebase:hosting` - deploys `dist/browser` to Firebase Hosting.
- `npm run deploy:firebase:ssr` - deploys `dist/browser` to Firebase Hosting and SSR function.

*Note: If you deploy with server-side renderering you must delete `dist/browser/index.html` after compiling the `ssr` function and before deploying to hosting.*