import * as obsidian from 'obsidian';

import { DEFAULT_SETTINGS, type Settings } from './configuration/Settings';
import { SettingsTab } from './configuration/ConfigurationView';
import type { SourceType, SourceTypeConfig } from './SourceType';

import registerAll from './sources';

export class ObsidianSourcesPlugin extends obsidian.Plugin {
  settings: Settings = DEFAULT_SETTINGS;
  sources: SourceType[] = [];
  sourceTypes: Record<
    string,
    { constructor: typeof SourceType; config: SourceTypeConfig }
  > = {};

  override async onload() {
    registerAll(this);

    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    this.addSettingTab(new SettingsTab(this.app, this));
  }

  override async onunload() {}

  async setSetting<TSetting extends keyof Settings>(
    setting: TSetting,
    value: Settings[TSetting],
  ): Promise<void> {
    await this.setSettings({ [setting]: value });
  }

  async setSettings(newSettings: Partial<Settings>): Promise<void> {
    console.info('Updating settings:', newSettings);
    this.settings = { ...this.settings, ...newSettings };
    await this.saveData(this.settings);
  }

  /**
   * The eventual public API for registering a data source implementation.
   *
   * For now, we just call it interally for each source that's bundled with this
   * plugin.
   */
  registerSourceType(
    source: typeof SourceType<any>,
    config: SourceTypeConfig,
  ): void {
    if (this.sourceTypes[config.key]) {
      console.warn(
        'Source',
        config.key,
        'already registered. Overwriting:',
        this.sourceTypes[config.key],
      );
    } else {
      console.info('Registered source type:', config);
    }

    this.sourceTypes[config.key] = { constructor: source, config };
  }
}
