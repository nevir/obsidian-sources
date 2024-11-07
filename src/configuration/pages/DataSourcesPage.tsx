import { createSignal } from 'solid-js';
import type { Source } from '../../Source';

interface DataSourcesPageProps {
  sourceTypes: Record<string, Source>;
  sources: { type: string; settings: any }[];
  onUpdate: (sources: { type: string; settings: any }[]) => void;
}

export function DataSourcesPage({
  sourceTypes,
  sources,
  onUpdate,
}: DataSourcesPageProps) {
  const [expandedSource, setExpandedSource] = createSignal<
    number | undefined
  >();
  const [localSources, setLocalSources] =
    createSignal<{ type: string; settings?: any }[]>(sources);
  const [newSourceType, setNewSourceType] = createSignal<string | null>(null);

  const handleAddSource = () => {
    if (newSourceType()) {
      const newSource = sourceTypes[newSourceType()!];
      if (newSource) {
        const newSourceInstance = { type: newSource.type };
        setLocalSources([...localSources(), newSourceInstance]);
        setExpandedSource(localSources().length - 1);
      }
    }
  };

  const handleUpdateSource = (updatedSource: {
    type: string;
    settings: any;
  }) => {
    const updatedSources = localSources().map(source =>
      source.type === updatedSource.type ? updatedSource : source,
    );
    setLocalSources(updatedSources);
    onUpdate(updatedSources as { type: string; settings: any }[]);
  };

  return (
    <div>
      <ul>
        {localSources().map((source, index) => {
          const sourceType = sourceTypes[source.type]!;
          return (
            <li
              key={source.type}
              onClick={() => setExpandedSource(index)}
              onKeyPress={() => setExpandedSource(index)}
            >
              {sourceType.name}
              {source.settings &&
                ` - ${sourceType.identifier(source.settings)}`}
              {expandedSource() === index && (
                <div>
                  {sourceType.settingsView({
                    settings: source.settings,
                    onUpdate: newSettings =>
                      handleUpdateSource({ ...source, settings: newSettings }),
                  })}
                </div>
              )}
            </li>
          );
        })}
      </ul>
      <div>
        <select onChange={e => setNewSourceType(e.currentTarget.value)}>
          <option value=''>Select source type</option>
          {Object.values(sourceTypes).map(sourceType => (
            <option key={sourceType.type} value={sourceType.type}>
              {sourceType.name}
            </option>
          ))}
        </select>
        <button
          type='button'
          onClick={handleAddSource}
          onKeyPress={handleAddSource}
        >
          Add Data Source
        </button>
      </div>
    </div>
  );
}
