// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

class ConfigModel {
  ServerUrl: string;
  FrontendUrl: string;
}

declare var herbalifeConfig: ConfigModel;

export const environment = {
  production: false,
  SERVER_URL: herbalifeConfig.ServerUrl,
  FRONTEND_URL: herbalifeConfig.FrontendUrl,
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
