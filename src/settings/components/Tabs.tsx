import { styled } from '@macaron-css/solid';
import { For } from 'solid-js';

import { Tab } from './Tab';

const Root = styled('div', {
  base: {
    display: 'flex',
    flexDirection: 'row',
    background: 'var(--background-secondary)',
    height: 'calc(24px + 2 * var(--size-2-3))', // modal-close-button + padding
    borderBottom: 'var(--tab-outline-width) solid var(--tab-outline-color)',
    paddingTop: 'var(--size-2-3)',
    paddingLeft: 'var(--size-2-3)',
    paddingRight: 'calc(24px + 2 * var(--size-2-3))',
    selectors: {
      '&': {
        marginTop: 'calc(-1 * var(--size-4-8))',
        marginLeft: 'calc(-1 * var(--size-4-12))',
        marginRight: 'calc(-1 * var(--size-4-12))',
        marginBottom: 'var(--size-4-8)',
      },
      '.is-tablet.theme-dark &': {
        background: 'var(--background-primary)',
      },
      '.is-phone &': {
        marginTop: 'calc(-1 * var(--size-4-5))',
        marginLeft:
          'calc(-1 * max(var(--size-4-5), var(--safe-area-inset-left)))',
        marginRight:
          'calc(-1 * max(var(--size-4-5), var(--safe-area-inset-right)))',
        marginBottom: 'var(--size-4-5)',
      },
    },
  },
});

interface Props<TTabId extends string> {
  /** a map of tab ids to their titles. */
  tabs: Record<TTabId, string>;

  /** the currently active tab id. */
  activeTab: () => TTabId;

  /** Triggered when the active tab changes */
  onChange: (tabId: TTabId) => void;
}

export function Tabs<TTabId extends string>({
  tabs,
  activeTab,
  onChange,
}: Props<TTabId>) {
  return (
    <Root>
      <For each={Object.entries(tabs) as [TTabId, string][]}>
        {([key, title]) => (
          <Tab
            title={title}
            isActive={() => key === activeTab()}
            setActive={() => onChange(key)}
          />
        )}
      </For>
    </Root>
  );
}
