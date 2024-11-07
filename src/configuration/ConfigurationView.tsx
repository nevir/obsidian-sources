import * as obsidian from 'obsidian';
import { createSignal } from 'solid-js';
import { render } from 'solid-js/web';

import type { Plugin } from '../Plugin';

import { Tabs } from './components/Tabs';
import { DataSourcesPage } from './pages/DataSourcesPage';
import { NoteRulesPage } from './pages/NoteRulesPage';
import { SettingsPage } from './pages/SettingsPage';

const TABS = {
  settings: 'Settings',
  dataSources: 'Data Sources',
  noteRules: 'Note Rules',
};

export function SettingsView({ plugin }: { plugin: Plugin }) {
  const [activeTab, setActiveTab] = createSignal<keyof typeof TABS>('settings');

  return (
    <div>
      <Tabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />
      {activeTab() === 'settings' && <SettingsPage />}
      {activeTab() === 'dataSources' && <DataSourcesPage />}
      {activeTab() === 'noteRules' && <NoteRulesPage />}
    </div>
  );
}

export class SettingsTab extends obsidian.PluginSettingTab {
  constructor(
    app: obsidian.App,
    private plugin: Plugin,
  ) {
    super(app, plugin);
  }

  override display(): void {
    const { containerEl } = this;
    // const { settings } = this.plugin;
    containerEl.empty();

    render(() => <SettingsView plugin={this.plugin} />, containerEl);
  }
}
