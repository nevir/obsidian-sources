import { createSignal, For } from 'solid-js';

import type { ObsidianSourcesPlugin } from '../../Plugin';
import { getSourceTypeClass } from '../../util';

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
      <form
        onSubmit={event => {
          const data = new FormData(event.currentTarget);
          addSource(data.get('sourceType') as string);
          event.preventDefault();
        }}
      >
        <select name='sourceType'>
          <For each={Object.values(plugin.sourceTypes)}>
            {sourceType => (
              <option value={sourceType.key}>{sourceType.displayName}</option>
            )}
          </For>
        </select>
        <button type='submit'>Add Source</button>
      </form>
    </div>
  );
}
