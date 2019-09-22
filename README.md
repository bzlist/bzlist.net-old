# BZList

[![GitHub license](https://img.shields.io/github/license/bzlist/bzlist.net.svg)](https://github.com/bzlist/bzlist.net/blob/master/LICENSE)
![GitHub package.json version](https://img.shields.io/github/package-json/v/bzlist/bzlist.net.svg)
[![Build Status](https://travis-ci.org/bzlist/bzlist.net.svg?branch=master)](https://travis-ci.org/bzlist/bzlist.net)
[![GitHub Build Status](https://github.com/bzlist/bzlist.net/workflows/Build/badge.svg)](https://github.com/bzlist/bzlist.net/actions)
[![IRC #bzlist](https://img.shields.io/badge/IRC-%23bzlist-blue.svg)](http://webchat.freenode.net/?channels=#bzlist)

Socket.io + Angular = *(kind of)* real-time server stats for BZFlag.

The changelog can be found [here](CHANGELOG.md) and the offical site at [bzlist.net](https://bzlist.net).

## Get started

It's easy to get started, just follow the few steps below.

### Get the code

You can get the code by either cloning the reposity (which is recommended) or downloading it as a ZIP file.

To clone the repository run the following (you must have Git installed).
```sh
git clone https://github.com/bzlist/bzlist.net.git
cd bzlist.net
```

The ZIP file can be found at https://github.com/bzlist/bzlist.net/archive/master.zip.

### Install npm packages

Install the `npm` packages and verify everything is working:

```sh
npm install
```

### Run!

To see it in action run `npm start` which builds and compiles the application, watches for changes to source files, and runs the Angular dev server on port `4200`. Shut it down with `Ctrl+C`.

### Useful npm scripts

These are the most useful commands defined in `package.json`:

| Command | Description |
| ------- | ----------- |
| start | Runs the TypeScript compiler, asset copier, and dev server all at the same time in "watch mode." |
| build:prod | Runs the TypeScript compiler with optimizations and asset copier once and outputs it into `dist/browser`. |
| build:stats && (npm run stats-es5 or stats-2015) | Builds the app and generates stats into `dist` and opens the stats in your browser. |
| build:gh-pages | The same as `build:prod` and adds the prefix `bzlist.net` for use with GitHub Pages. |
| build:ssr | Builds with server-side rendering. |
| deploy:gh-pages | Deploys to GitHub Pages. |
| deploy:firebase | Deploys everything configured to Firebase. |
| deploy:firebase:hosting | Deploys `dist/browser` to Firebase Hosting. |
| deploy:firebase:ssr | Deploys the SSR function to Firebase, deletes `dist/browser/index.html` and deploys hosting. |

*Note: If you deploy with server-side renderering you must delete `dist/browser/index.html` after compiling the `ssr` function and before deploying to hosting. This is done automatically with `npm run deploy:firebase:ssr`.*
