import * as obsidian from 'obsidian';

import { DEFAULT_SETTINGS, type Settings } from './configuration/Settings';
import { SettingsTab } from './configuration/ConfigurationView';
import type { SourceType, SourceTypeClass } from './SourceType';

import registerAll from './sources';

export class ObsidianSourcesPlugin extends obsidian.Plugin {
  settings: Settings = DEFAULT_SETTINGS;
  sources: SourceType[] = [];
  sourceTypes: Record<string, SourceTypeClass> = {};

  override async onload() {
    registerAll(this);

    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    this.addSettingTab(new SettingsTab(this.app, this));
    this.registerObsidianProtocolHandler('sources/oauth', (params: unknown) => {
      console.warn('obsidian://sources called with', params);
    });
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
  registerSourceType(sourceType: SourceTypeClass<any>): void {
    if (this.sourceTypes[sourceType.key]) {
      console.warn(
        'Source',
        sourceType.key,
        'already registered. Overwriting:',
        this.sourceTypes[sourceType.key],
      );
    } else {
      console.info('Registered source type:', sourceType);
    }

    this.sourceTypes[sourceType.key] = sourceType;
  }

  addSource(key: string): SourceType {
    const sourceType = this.sourceTypes[key];
    if (!sourceType) {
      throw new Error(`Unknown source type: ${sourceType}`);
    }

    const newSource = new sourceType(newSettings => {
      this.setSettings({ [key]: newSettings });
    });
    this.sources.push(newSource);

    return newSource;
  }
}
