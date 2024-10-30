import * as obsidian from 'obsidian';

import { SettingsTab } from './SettingsTab';
import { DEFAULT_SETTINGS, Settings } from './Settings';

export class Plugin extends obsidian.Plugin {
  settings: Settings = DEFAULT_SETTINGS;

  override async onload() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    this.addSettingTab(new SettingsTab(this.app, this));
  }

  override async onunload() {
  }

  async setSetting<TSetting extends keyof Settings>(
    setting: TSetting,
    value: Settings[TSetting]
  ): Promise<void> {
    await this.setSettings({ [setting]: value });
  }

  async setSettings(newSettings: Partial<Settings>): Promise<void> {
    console.info('Updating settings:', newSettings);
    this.settings = { ...this.settings, ...newSettings };
    await this.saveData(this.settings);
  }
}
