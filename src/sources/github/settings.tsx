import type { SourceSettingsView } from '../../Source';

export interface GitHubSettings {
  /**
   * A (classic) personal access token that can be used to access the user's
   * issues and pull requests on GitHub.
   */
  token: string;

  /**
   * Cached metadata about the user that owns the token.
   */
  owner: {
    /**
     * The username of the user that owns the token.
     */
    username: string;

    /**
     * The user's avatar URL.
     */
    avatarUrl: string;
  };
}

export const GitHubSettingsView: SourceSettingsView<GitHubSettings> = ({
  settings,
}) => {
  return <div>settings: {JSON.stringify(settings)}</div>;
};
