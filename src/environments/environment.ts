// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  bzWebLoginURL: "https://my.bzflag.org/weblogin.php?action=weblogin&url=http%3A%2F%2Flocalhost%3A4200%2Faccount%3Fusername%3D%25USERNAME%25%26token%3D%25TOKEN%25",
  version: `${require("../../package.json").version}-DEV`
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
