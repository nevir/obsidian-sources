import { render } from 'solid-js/web';

import type { Source, SourceActions } from '../../../api';

import { SettingsView } from './SettingsView';
import type { Settings } from './Settings';

export class AtlassianSource implements Source {
  static key = 'atlassian';
  static displayName = 'Atlassian';

  constructor(
    private actions: SourceActions<Settings>,
    private settings?: Settings,
  ) {}

  identity() {
    return this.settings?.owner?.displayName;
  }

  renderSettings(containerEl: HTMLElement) {
    render(() => <SettingsView />, containerEl);
  }
}
