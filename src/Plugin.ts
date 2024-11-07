import * as obsidian from 'obsidian';

import { DEFAULT_SETTINGS, type Settings } from './configuration/Settings';
import { SettingsTab } from './configuration/ConfigurationView';
import type { Source } from './Source';

import atlassian from './sources/atlassian';
import github from './sources/github';

export interface ConfiguredSource {
  type: string;
  settings: any;
}

export class Plugin extends obsidian.Plugin {
  settings: Settings = DEFAULT_SETTINGS;
  sources: Record<string, Source> = {};
  configuredSources: ConfiguredSource[] = [];

  override async onload() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    this.addSettingTab(new SettingsTab(this.app, this));

    this.registerSource(atlassian);
    this.registerSource(github);
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
  registerSource(source: Source): void {
    if (this.sources[source.type]) {
      console.warn(
        'Source',
        source.type,
        'already registered. Overwriting:',
        this.sources[source.type],
      );
    } else {
      console.info('Registering source:', source.type, source);
    }

    this.sources[source.type] = source;
  }

  /**
   * Get the list of configured data sources.
   */
  getConfiguredSources(): ConfiguredSource[] {
    return this.configuredSources;
  }
}
