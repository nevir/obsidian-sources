import type { ObsidianSourcesPlugin } from '../../Plugin';

import { AtlassianSource } from './Source';

export default function registerAtlassian(plugin: ObsidianSourcesPlugin) {
  plugin.registerSourceType(AtlassianSource);
}
