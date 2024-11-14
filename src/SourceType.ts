export interface SourceTypeClass<TSettings = unknown> {
  /** A globally unique string that identifies this source type. */
  key: string;

  /** A human-readable name for this source type. */
  name: string;

  /**
   * Construct a new instance of this source, with any previously persisted
   * settings.
   *
   * `onChange` must be called whenever the settings are updated.
   */
  new (
    onChange: (newSettings: TSettings) => void,
    settings?: TSettings,
  ): SourceType;
}

export interface SourceType {
  /**
   * Called when the data source is being configured via the settings UI.
   *
   * This method should render the settings UI into the provided container,
   * and should call `onChange` whenever the settings are updated.
   */
  renderSettings(containerEl: HTMLElement): void;
}

// /**
//  * Static configuration for a source type
//  */
// export interface SourceTypeConfig {
//   /** A globally unique string that identifies this source type. */
//   key: string;

//   /** A human-readable name for this source type. */
//   name: string;
// }

// /**
//  * A specific type of data source.
//  */
// export abstract class SourceType<TSettings = unknown> {
// /**
//  * Construct a new instance of this source, with any previously persisted
//  * settings.
//  *
//  * `onChange` must be called whenever the settings are updated.
//  */
//   constructor(
//     protected onChange: (newSettings: TSettings) => void,
//     protected settings?: TSettings,
//   ) {}

//   /**
//    * Called when the data source is being configured via the settings UI.
//    *
//    * This method should render the settings UI into the provided container,
//    * and should call `onChange` whenever the settings are updated.
//    */
//   abstract renderSettings(containerEl: HTMLElement): void;
// }
