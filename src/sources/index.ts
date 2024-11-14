import type { ObsidianSourcesPlugin } from '../Plugin';

import registerAtlassian from './atlassian';

export default function registerAll(plugin: ObsidianSourcesPlugin) {
  registerAtlassian(plugin);
}
