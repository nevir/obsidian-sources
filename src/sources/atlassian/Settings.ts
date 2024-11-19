export interface Settings {
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
