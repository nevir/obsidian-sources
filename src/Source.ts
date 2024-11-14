/**
 * A specific type of data source.
 */
export abstract class Source<TSettings = unknown> {
  /**
   * Construct a new instance of this source, with any previously persisted
   * settings.
   *
   * `onChange` must be called whenever the settings are updated.
   */
  constructor(
    protected onChange: (newSettings: TSettings) => void,
    protected settings?: TSettings,
  ) {}

  /**
   * Called when the data source is being configured via the settings UI.
   *
   * This method should render the settings UI into the provided container,
   * and should call `onChange` whenever the settings are updated.
   */
  abstract renderSettings(containerEl: HTMLElement): void;
}
