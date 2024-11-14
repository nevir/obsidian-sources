import type { ObsidianSourcesPlugin } from '../../Plugin';

import { AtlassianSource } from './AtlassianSource';

export default function registerAtlassian(plugin: ObsidianSourcesPlugin) {
  plugin.registerSourceType('atlassian', AtlassianSource);
}
