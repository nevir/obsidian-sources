import { render } from 'solid-js/web';

import { SourceType } from '../../SourceType';

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
  return <div>settings: {JSON.stringify(settings)}</div>;
};

export class AtlassianSource extends SourceType<Settings> {
  override renderSettings(containerEl: HTMLElement): void {
    render(() => <SettingsView settings={this.settings} />, containerEl);
  }
}
