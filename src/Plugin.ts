import * as obsidian from 'obsidian';

import { DEFAULT_SETTINGS, type Settings } from './configuration/Settings';
import { SettingsTab } from './configuration/ConfigurationView';
import type { Source } from './Source';

import registerAll from './sources';

export class ObsidianSourcesPlugin extends obsidian.Plugin {
  settings: Settings = DEFAULT_SETTINGS;
  sourceTypes: Record<string, typeof Source> = {};

  override async onload() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    this.addSettingTab(new SettingsTab(this.app, this));

    registerAll(this);
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
  registerSourceType(type: string, source: typeof Source<any>): void {
    if (this.sourceTypes[type]) {
      console.warn(
        'Source',
        type,
        'already registered. Overwriting:',
        this.sourceTypes[type],
      );
    } else {
      console.info('Registered source type:', type);
    }

    this.sourceTypes[type] = source;
  }
}
