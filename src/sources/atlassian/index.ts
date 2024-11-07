import type { Source } from '../../Source';

import { AtlassianSettingsView, type AtlassianSettings } from './settings';

export default {
  type: 'atlassian',
  name: 'Atlassian',
  icon: 'atlassian',
  identifier: (settings: AtlassianSettings) =>
    `${settings.owner.displayName} (${settings.siteUrl})`,
  settingsView: AtlassianSettingsView,
} satisfies Source<AtlassianSettings>;
