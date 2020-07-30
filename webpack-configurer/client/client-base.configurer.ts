import { BaseConfigurer } from '../base.configurer';
import { RuleSetRule, RuleSetUse, Plugin } from 'webpack';
import HtmlWebpackPlugin = require('html-webpack-plugin');

export abstract class ClientBaseConfigurer extends BaseConfigurer {
  getOutputFolderName(): string {
    return 'client';
  }

  getEntryFilePath(): string {
    return './src/client/ts/client.ts';
  }

  getPlugins(): Plugin[] {
    return [
      ...super.getPlugins(),
      new HtmlWebpackPlugin({
        template: './src/client/html/index.html'
      })
    ];
  }

  getRules(): RuleSetRule[] {
    return [...super.getRules(), this.getStylesRule()];
  }

  private getStylesRule(): RuleSetRule {
    return {
      test: /\.scss$/,
      use: this.getStyleLoaders()
    };
  }

  /**
   * Keep in mind that loaders are executed from right to left (or bottom to top).
   */
  getStyleLoaders(): RuleSetUse {
    return ['css-loader', 'sass-loader'];
  }
}
