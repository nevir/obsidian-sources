import { createSignal, For } from 'solid-js';
import type { ObsidianSourcesPlugin } from '../../Plugin';
import { getSourceTypeClass } from '../../SourceType';

export function DataSourcesPage({ plugin }: { plugin: ObsidianSourcesPlugin }) {
  const [sources, setSources] = createSignal(plugin.sources);
  const [expandedSource, setExpandedSource] = createSignal<number>(-1);

  const addSource = (sourceType: string) => {
    plugin.addSource(sourceType);
    setSources([...plugin.sources]);
    console.log('added source:', plugin.sources, sources);
    setExpandedSource(plugin.sources.length - 1);
  };

  return (
    <div>
      <For each={sources()}>
        {(source, index) => (
          <div>
            <div onClick={() => setExpandedSource(index())}>
              source {index()}: {getSourceTypeClass(source).displayName}
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
