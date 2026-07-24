import { existsSync, readFileSync } from 'node:fs';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import { withProviders } from '@/utils/tests';
import { Popover, styles } from './popover';

const TRIGGER = 'Details';
const CONTENT = 'Popover body content';
const CLOSE_LABEL = 'Dismiss details';

type PopoverArgs = {
  contentClassName?: string;
  closeLabel?: string;
  withClose?: boolean;
};

const Widget = ({ contentClassName, closeLabel, withClose = true }: PopoverArgs = {}) => (
  <div>
    <Popover.Root>
      <Popover.Trigger>{TRIGGER}</Popover.Trigger>
      <Popover.Content className={contentClassName} aria-label="Details bubble">
        <p>{CONTENT}</p>
        {withClose && <Popover.Close aria-label={closeLabel ?? CLOSE_LABEL}>x</Popover.Close>}
      </Popover.Content>
    </Popover.Root>
    <span data-testid="outside">outside surface</span>
  </div>
);

const renderPopover = (args: PopoverArgs = {}) => render(withProviders(<Widget {...args} />));

const classesOf = (el: Element) => new Set(el.className.split(/\s+/).filter(Boolean));

describe('Popover', () => {
  // TC-007 (AC-006, AC-008): named import resolves and the popover is closed by default -
  // only the trigger is in the DOM, no role="dialog" is mounted yet.
  it('should render only the trigger and mount no dialog if not yet opened', () => {
    const { getByRole, queryByRole, queryByText } = renderPopover();

    expect(getByRole('button', { name: TRIGGER })).toBeInTheDocument();
    expect(queryByRole('dialog')).toBeNull();
    expect(queryByText(CONTENT)).toBeNull();
  });

  // TC-008 (AC-007, AC-008): clicking the trigger opens a portalled role="dialog"
  // holding the caller content.
  it('should open a portalled dialog with the caller content if the trigger is clicked', async () => {
    const user = userEvent.setup();
    const { getByRole, findByRole, findByText } = renderPopover();

    await user.click(getByRole('button', { name: TRIGGER }));

    const dialog = await findByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(await findByText(CONTENT)).toBeInTheDocument();
  });

  // TC-008 (AC-008): Escape dismisses the popover and returns focus to the trigger.
  it('should dismiss and return focus to the trigger if Escape is pressed', async () => {
    const user = userEvent.setup();
    const { getByRole, findByRole, queryByRole } = renderPopover();
    const trigger = getByRole('button', { name: TRIGGER });

    await user.click(trigger);
    await findByRole('dialog');
    await user.keyboard('{Escape}');

    expect(queryByRole('dialog')).toBeNull();
    expect(trigger).toHaveFocus();
  });

  // TC-008 (AC-007, AC-008): activating the Close sub-part dismisses the popover and
  // returns focus to the trigger.
  it('should dismiss and return focus to the trigger if the Close sub-part is activated', async () => {
    const user = userEvent.setup();
    const { getByRole, findByRole, queryByRole } = renderPopover();
    const trigger = getByRole('button', { name: TRIGGER });

    await user.click(trigger);
    await findByRole('dialog');
    await user.click(getByRole('button', { name: CLOSE_LABEL }));

    expect(queryByRole('dialog')).toBeNull();
    expect(trigger).toHaveFocus();
  });

  // TC-008 (AC-008): clicking outside the content dismisses the popover.
  it('should dismiss if a click lands outside the content', async () => {
    const user = userEvent.setup();
    const { getByRole, findByRole, queryByRole, getByTestId } = renderPopover();

    await user.click(getByRole('button', { name: TRIGGER }));
    await findByRole('dialog');
    await user.click(getByTestId('outside'));

    expect(queryByRole('dialog')).toBeNull();
  });

  // TC-009 (AC-007, AC-009): the Close accessible name is caller-supplied (via aria-label),
  // not a hardcoded string.
  it('should give the Close control the caller-supplied accessible name', async () => {
    const user = userEvent.setup();
    const callerLabel = 'Custom close label';
    const { getByRole, findByRole, queryByRole } = renderPopover({ closeLabel: callerLabel });

    await user.click(getByRole('button', { name: TRIGGER }));
    await findByRole('dialog');

    expect(getByRole('button', { name: callerLabel })).toBeInTheDocument();
    expect(queryByRole('button', { name: CLOSE_LABEL })).toBeNull();
  });

  // AC-007: the compound exposes and renders every required sub-part
  // (Root, Trigger, Content, Close, Anchor, Arrow).
  it('should render every compound sub-part if hand-composed', async () => {
    const user = userEvent.setup();
    const { getByRole, findByRole } = render(
      withProviders(
        <Popover.Root>
          <Popover.Anchor asChild>
            <span data-testid="anchor">anchor</span>
          </Popover.Anchor>
          <Popover.Trigger>{TRIGGER}</Popover.Trigger>
          <Popover.Content aria-label="Details bubble">
            <p>{CONTENT}</p>
            <Popover.Arrow data-testid="arrow" />
            <Popover.Close aria-label={CLOSE_LABEL}>x</Popover.Close>
          </Popover.Content>
        </Popover.Root>,
      ),
    );

    expect(getByRole('button', { name: TRIGGER })).toBeInTheDocument();
    await user.click(getByRole('button', { name: TRIGGER }));

    const dialog = await findByRole('dialog');
    expect(
      dialog.querySelector('[data-testid="arrow"]') ?? dialog.querySelector('svg'),
    ).not.toBeNull();
    expect(getByRole('button', { name: CLOSE_LABEL })).toBeInTheDocument();
  });

  // TC-010 (AC-009): caller className on Content extends the base styles classes
  // without dropping them.
  it('should merge caller className into Content without dropping base classes', async () => {
    const user = userEvent.setup();

    const base = renderPopover();
    await user.click(base.getByRole('button', { name: TRIGGER }));
    const baseDialog = await base.findByRole('dialog');
    const baseClasses = classesOf(baseDialog);

    const custom = renderPopover({ contentClassName: 'custom-x' });
    const triggers = custom.getAllByRole('button', { name: TRIGGER });
    await user.click(triggers[triggers.length - 1]);
    const customDialogs = await custom.findAllByRole('dialog');
    const customDialog = customDialogs[customDialogs.length - 1];

    expect(customDialog.classList.contains('custom-x')).toBe(true);
    for (const cls of baseClasses) {
      expect(customDialog.classList.contains(cls)).toBe(true);
    }
  });

  // AC-006 / AC-009: the module exports a styles object alongside the component.
  it('should export a styles object', () => {
    expect(styles).toBeDefined();
    expect(typeof styles).toBe('object');
  });

  // TC-011 (AC-010): purity - renders with caller-only content without throwing, and the
  // module neither reads i18n (useTranslations) nor has a *.container.tsx sibling.
  it('should render with caller-only content and stay free of i18n and any container file', () => {
    expect(() => renderPopover()).not.toThrow();

    const dir = 'src/components/advanced/popover';
    const source = readFileSync(`${dir}/popover.tsx`, 'utf8');
    expect(source).not.toMatch(/useTranslations/);
    expect(existsSync(`${dir}/popover.container.tsx`)).toBe(false);
  });

  // TC-012 (AC-013): the open popover has no accessibility violations.
  it('should have no accessibility violations if the popover is open', async () => {
    const user = userEvent.setup();
    const { getByRole, findByRole } = renderPopover();

    await user.click(getByRole('button', { name: TRIGGER }));
    const dialog = await findByRole('dialog');

    const results = await axe(dialog);
    expect(results).toHaveNoViolations();
  });

  // TC-013 (AC-013): the closed (default) render matches the committed snapshot.
  it('should match the snapshot in its closed state', () => {
    const { container } = renderPopover();
    expect(container).toMatchSnapshot();
  });
});
