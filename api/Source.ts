import type { SourceActions } from './SourceActions';

/**
 * A connection to a remote service.
 */
export interface Source {
  /**
   * Renders a human-readable and unique identifier for this data source.
   *
   * Often, this will be the username or email address of the user that this
   * data source is connected to.
   *
   * Return undefined when source is not yet authenticated.
   */
  identity(): string | undefined;

  /**
   * Called when the data source is being configured via the settings UI.
   *
   * This method should render the settings UI into the provided container,
   * and should call `onChange` whenever the settings are updated.
   */
  renderSettings(containerEl: HTMLElement): void;
}

/**
 * Sources must define some static properties and conform to a standard
 * constructor signature.
 */
export interface SourceConstructor<TState = any> {
  /** A globally unique string that identifies this type of data source. */
  key: string;

  /** A human-readable name for this type of data source. */
  displayName: string;

  /**
   * Construct a new instance of this source, with any persisted state.
   */
  new (actions: SourceActions<TState>, settings?: TState): Source;
}
