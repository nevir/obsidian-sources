import type { Source } from '../../Source';

import { GitHubSettingsView, type GitHubSettings } from './settings';

export default {
  type: 'github',
  name: 'GitHub',
  icon: 'github',
  identifier: (settings: GitHubSettings) => settings.owner.username,
  settingsView: GitHubSettingsView,
} satisfies Source<GitHubSettings>;
