import { render } from 'solid-js/web';
import type { SourceType } from '../../SourceType';

interface Settings {
  /**
   * The base URL of the Atlassian Cloud instance that this data source is
   * connected to.
   */
  siteUrl: string;

  /**
   * An API token used to authenticate the user with Atlassian Cloud.
   */
  token: string;

  /**
   * Cached metadata about the user that owns the token.
   */
  owner: {
    /**
     * The display name of the user that owns the token.
     */
    displayName: string;

    /**
     * The user's avatar URL.
     */
    avatarUrl: string;
  };
}

const SettingsView = ({ settings }: { settings?: Settings }) => {
  return <div>Atlassian settings: {JSON.stringify(settings)}</div>;
};

export class AtlassianSource implements SourceType {
  static key = 'atlassian';
  static displayName = 'Atlassian';

  constructor(
    private onChange: (newSettings: Settings) => void,
    private settings?: Settings,
  ) {}

  renderSettings(containerEl: HTMLElement): void {
    render(() => <SettingsView settings={this.settings} />, containerEl);
  }
}
