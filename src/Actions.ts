import type { SourceActions } from '../api';

export class Actions<TState> implements SourceActions<TState> {
  constructor(
    private sourceTypeKey: string,
    private connectionId: string,
  ) {}

  saveState(newState: TState): void {
    throw new Error('Method not implemented.');
  }
  oauthLogin(): Promise<unknown> {
    throw new Error('Method not implemented.');
  }
}
