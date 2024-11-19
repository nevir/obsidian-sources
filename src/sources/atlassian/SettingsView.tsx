import type { Settings } from './Settings';

export const SettingsView = ({ settings }: { settings?: Settings }) => {
  return <div>Current settings: {JSON.stringify(settings)}</div>;
};
