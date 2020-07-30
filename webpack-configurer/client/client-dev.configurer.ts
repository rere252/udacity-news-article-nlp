import { ClientBaseConfigurer } from './client-base.configurer';
import { Mode } from '../mode.type';
import { Configuration } from 'webpack';

export class ClientDevConfigurer extends ClientBaseConfigurer {
  getMode(): Mode {
    return 'development';
  }

  getConfig(): Configuration {
    return {
      ...super.getConfig(),
      devServer: {
        // Watching the whole output folder so that server changes would also
        // trigger reloads.
        contentBase: this.distPath,
        watchContentBase: true,
        proxy: {
          '/api': {
            target: 'http://localhost:8081',
            changeOrigin: true
          }
        }
      }
    };
  }
}
