import { resolve } from 'path';
import { existsSync } from 'fs';

import exampleRoute from './server/routes/example';

export default function (kibana) {
  return new kibana.Plugin({
    require: ['elasticsearch'],
    name: 'aplugin_700',
    uiExports: {
      app: {
        title: 'Aplugin 700',
        description: 'An awesome Kibana plugin',
        main: 'plugins/aplugin_700/app',
      },
      hacks: [
        'plugins/aplugin_700/hack'
      ],
      styleSheetPaths: [resolve(__dirname, 'public/app.scss'), resolve(__dirname, 'public/app.css')].find(p => existsSync(p)),
    },

    config(Joi) {
      return Joi.object({
        enabled: Joi.boolean().default(true),
      }).default();
    },

    init(server, options) { // eslint-disable-line no-unused-vars
      // Add server routes and initialize the plugin here
      exampleRoute(server);
    }
  });
}
