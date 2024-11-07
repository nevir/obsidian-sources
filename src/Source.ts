import type { JSX } from 'solid-js';

/**
 * A Solid component that is used when configuring the source.
 *
 * Settings will be undefined if this is the first time the source is being
 * configured.
 */
export type SourceSettingsView<TSettings> = (props: {
  settings?: TSettings;
  onUpdate: (newSettings: TSettings) => void;
}) => JSX.Element;

/**
 * A specific type of data source.
 */
export interface Source<TSettings = any> {
  /**
   * The unique identifier for the source.
   */
  type: string;

  /**
   * The display name of the source.
   */
  name: string;

  /**
   * An icon (lucide id or URL) to represent the source.
   */
  icon: string;

  /**
   * The text used to identify a specific instance of this source.
   *
   * Typically is a username, account URL, or similar.
   */
  identifier: (settings: TSettings) => string;

  /**
   * A Solid component that is used when configuring the source.
   *
   * Settings will be undefined if this is the first time the source is being
   * configured.
   */
  settingsView: SourceSettingsView<TSettings>;
}
