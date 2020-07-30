import { ClientBaseConfigurer } from './client-base.configurer';
import { Mode } from '../mode.type';

export class ClientProdConfigurer extends ClientBaseConfigurer {
  getMode(): Mode {
    return 'production';
  }
}
