import * as obsidian from 'obsidian';
// import ksuid from 'ksuid';

import type { Source, SourceConstructor as SourceType } from '../api';

import { DEFAULT_SETTINGS, type Settings } from './configuration/Settings';
import { SettingsTab } from './configuration/ConfigurationView';
import registerAll from './sources';
import { Actions } from './Actions';

export class ObsidianSourcesPlugin extends obsidian.Plugin {
  settings: Settings = DEFAULT_SETTINGS;
  // sources: Source[] = [];
  // sourceTypes: Record<string, SourceConstructor<any>> = {};

  private registeredSourceTypesByKey: Record<string, SourceType> = {};
  private sourcesById: Record<string, Source> = {};

  // Obsidian Plugin Lifecycle
  // =========================

  override async onload() {
    registerAll(this);

    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    this.addSettingTab(new SettingsTab(this.app, this));

    this.registerObsidianProtocolHandler(
      'sources/oauth/callback',
      (params: unknown) => {
        console.warn('obsidian://sources called with', params);
      },
    );
  }

  override async onunload() {}

  // Sources
  // =======

  /**
   * Return all sources that have been added to this plugin.
   */
  get sources(): Source[] {
    return Object.values(this.sourcesById);
  }

  /**
   * Append a new instance of the specified source type to our active sources.
   */
  addSource(type: string): Source {
    const sourceType = this.registeredSourceTypesByKey[type];
    if (!sourceType) {
      throw new Error(`Unknown source type: ${type}`);
    }

    const sourceId = '123';
    // const sourceId = ksuid.randomSync().string;
    const newSource = new sourceType(new Actions(type, sourceId));
    this.sourcesById[sourceId] = newSource;

    return newSource;
  }

  // Source Types
  // ============

  /**
   * Return all source types that have been registered with this plugin.
   */
  get sourceTypes(): SourceType[] {
    return Object.values(this.registeredSourceTypesByKey);
  }

  /**
   * The eventual public API for registering a data source implementation.
   *
   * For now, we just call it interally for each source that's bundled with this
   * plugin.
   */
  registerSourceType(sourceType: SourceType): void {
    if (this.registeredSourceTypesByKey[sourceType.key]) {
      console.warn(
        'Source',
        sourceType.key,
        'already registered. Overwriting:',
        this.registeredSourceTypesByKey[sourceType.key],
      );
    } else {
      console.info('Registered source type:', sourceType.key);
    }

    this.registeredSourceTypesByKey[sourceType.key] = sourceType;
  }

  // Misc Crap
  // =========

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
}
