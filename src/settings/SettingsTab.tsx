import * as obsidian from 'obsidian';
import { createSignal } from 'solid-js';
import { render } from 'solid-js/web';

import type { Plugin } from '../Plugin';
import { SettingsTabs } from '../components/SettingsTabs';
// import { Tabs } from '../components/Tabs';

const SettingsView = ({ plugin }: { plugin: Plugin }) => {
  const [thing, setThing] = createSignal('');

  return (
    <div>
      <SettingsTabs tabs={['General', 'Advanced']} />
      {/* <div
        style={{
          margin: 'calc(-1 * var(--size-4-8)) calc(-1 * var(--size-4-12)) 0',
          padding: 'var(--size-4-3) var(--size-4-3) 0',
          'border-bottom': '1px solid var(--background-modifier-border)',
        }}
      >
        <Tabs tabs={['General', 'Advanced']} />
      </div> */}

      <h1>Settings: 123</h1>
      <input value={thing()} oninput={e => setThing(e.target.value)} />
      <p>{thing()}</p>
    </div>
  );
};

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

    // new obsidian.Setting(containerEl)
    //   .setName(`Thingy`)
    //   .setDesc(`It does a thingy`)
    //   .addText(text =>
    //     text.setValue(settings.thingy || '').onChange(value => {
    //       this.plugin.setSetting(
    //         'thingy',
    //         value.trim() === '' ? undefined : value,
    //       );
    //     }),
    //   );

    // new obsidian.Setting(containerEl)
    //   .setName(`Required`)
    //   .setDesc(`What's your favorite number?`)
    //   .addSlider(slider =>
    //     slider
    //       .setLimits(0, 100, 1)
    //       .setValue(this.plugin.settings.required)
    //       .onChange(value => {
    //         this.plugin.setSetting('required', value);
    //       }),
    //   );
  }
}
