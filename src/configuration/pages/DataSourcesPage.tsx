import { createSignal, For } from 'solid-js';
import type { ObsidianSourcesPlugin } from '../../Plugin';

export function DataSourcesPage({ plugin }: { plugin: ObsidianSourcesPlugin }) {
  const [expandedSource, setExpandedSource] = createSignal<number>(-1);

  const addSource = (sourceType: string) => {
    plugin.addSource(sourceType);
    setExpandedSource(plugin.sources.length - 1);
  };

  return (
    <div>
      <For each={plugin.sources}>
        {(source, index) => (
          <div>
            <div onClick={() => setExpandedSource(index())}>
              source {index()}
            </div>
            {expandedSource() === index() && (
              <div ref={el => source.renderSettings(el)} />
            )}
          </div>
        )}
      </For>
      <div>
        <button onClick={() => addSource('atlassian')}>Add Source</button>
      </div>
    </div>
  );
}
