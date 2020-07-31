import { ServerBaseConfigurer } from './server-base.configurer';
import { Mode } from '../mode.type';
import { Configuration } from 'webpack';
import TerserPlugin = require('terser-webpack-plugin');

export class ServerProdConfigurer extends ServerBaseConfigurer {
  getMode(): Mode {
    return 'production';
  }

  getConfig(): Configuration {
    return {
      ...super.getConfig(),
      optimization: {
        minimizer: [new TerserPlugin()]
      }
    };
  }
}
