export interface SourceActions<TState> {
  /**
   * Called by the source whenever its configuration has changed and should be
   * persisted.
   */
  saveState(newSettings: TState): void;

  /**
   * Open the user's browser and navigate to this source's OAuth login page.
   *
   * Resolves when the user has completed the login process; returning their
   * credentials.
   */
  oauthLogin(): Promise<unknown>;
}
