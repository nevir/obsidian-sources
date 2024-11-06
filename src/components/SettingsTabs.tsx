import { style } from '@macaron-css/core';
import { styled } from '@macaron-css/solid';
import { createSignal, For } from 'solid-js';

const container = style({
  display: 'flex',
  flexDirection: 'row',
  background: 'var(--background-secondary)',
  height: 'calc(24px + 2 * var(--size-2-3))', // modal-close-button + padding
  borderBottom: 'var(--tab-outline-width) solid var(--tab-outline-color)',
  padding: 'var(--size-2-3) calc(24px + 2 * var(--size-2-3)) 0 var(--size-2-3)',
  selectors: {
    '&': {
      margin: 'calc(-1 * var(--size-4-8)) calc(-1 * var(--size-4-12)) 0',
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
    },
  },
});

export const SettingsTabs = ({ tabs }: { tabs: string[] }) => {
  const [activeTab, setActiveTab] = createSignal(tabs[0]);

  return (
    <div class={container}>
      <For each={tabs}>
        {tab => (
          <Tab
            title={tab}
            isActive={() => tab === activeTab()}
            setActive={() => setActiveTab(tab)}
          />
        )}
      </For>
    </div>
  );
};

const SettingsTab = styled('div', {
  base: {
    padding: 'var(--size-2-3) var(--size-2-3) 0 var(--size-2-3)',
    border: 'var(--tab-outline-width) solid transparent',
    borderBottomWidth: 0,
    marginBottom: 'calc(-1 * var(--tab-outline-width))',
    borderTopLeftRadius: 'var(--size-2-3)',
    borderTopRightRadius: 'var(--size-2-3)',
    fontSize: 'var(--tab-font-size)',
    fontWeight: 'var(--tab-font-weight)',
  },
  variants: {
    isActive: {
      true: {
        background: 'var(--background-primary)',
        borderColor: 'var(--tab-outline-color)',
        selectors: {
          '.is-tablet.theme-dark &': {
            background: 'var(--background-secondary)',
          },
        },
      },
    },
  },
});

export const Tab = ({
  title,
  isActive,
  setActive,
}: { title: string; isActive: () => boolean; setActive: () => void }) => {
  return (
    <SettingsTab
      aria-label={title}
      isActive={isActive()}
      onClick={setActive}
      onKeyPress={setActive}
    >
      {title}
    </SettingsTab>
  );
};
