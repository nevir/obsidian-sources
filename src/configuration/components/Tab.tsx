import { styled } from '@macaron-css/solid';

const Root = styled('div', {
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
      false: {
        selectors: {
          '&:hover': {
            background: 'var(--background-modifier-hover)',
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
    <Root
      aria-label={title}
      isActive={isActive()}
      onClick={setActive}
      onKeyPress={setActive}
    >
      {title}
    </Root>
  );
};
