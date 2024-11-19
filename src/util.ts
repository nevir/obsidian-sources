import type { OldSourceType, OldSourceTypeClass } from '../api/OldSourceType';

/**
 * Helper to grab the soruce type class, with proper typing
 */

export function getSourceTypeClass(
  sourceType: OldSourceType,
): OldSourceTypeClass {
  return sourceType.constructor as OldSourceTypeClass;
}
