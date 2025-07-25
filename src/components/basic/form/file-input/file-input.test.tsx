import { en } from '@/payload/locale/en';
import { withProviders } from '@/utils/tests';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ComponentProps } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { axe } from 'vitest-axe';
import { FileInput } from './file-input';

const t = en.frontend;

describe('FileInput', () => {
  const defaultProps = {
    name: 'file-input',
    fileNames: ['file-1.webp', 'file-2.webp'],
    onClear: vi.fn(),
    onChange: vi.fn(),
  } satisfies ComponentProps<typeof FileInput>;

  it('should have no accessibility violations', async () => {
    const { container } = render(withProviders(<FileInput {...defaultProps} />));
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should match the snapshot', () => {
    const { container } = render(withProviders(<FileInput {...defaultProps} />));
    expect(container).toMatchSnapshot();
  });

  describe('Interactivity', () => {
    it('should call onChange when file is dropped', async () => {
      const newFileName = 'file-3.webp';
      const { getByLabelText } = render(withProviders(<FileInput {...defaultProps} />));

      const label = getByLabelText(t.component.uploadInput.clickToUpload);
      const input = label.querySelector('input') as HTMLInputElement;
      const file = new File(['file contents'], newFileName, { type: 'image/webp' });

      await userEvent.upload(input, file);

      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);

      await userEvent.pointer([{ target: label, keys: '[DragEnter]' }]);
      label.dispatchEvent(
        new DragEvent('drop', {
          bubbles: true,
          cancelable: true,
          dataTransfer,
        }),
      );

      const calledEvent = defaultProps.onChange.mock.calls[0][0];
      expect(calledEvent.target.files![0].name).toBe(newFileName);
      expect(defaultProps.onChange).toHaveBeenCalled();
    });

    it('should call onClear when close button is clicked', async () => {
      const { getByRole } = render(withProviders(<FileInput {...defaultProps} />));
      const button = getByRole('button', { name: t.close });

      await userEvent.click(button);

      expect(defaultProps.onClear).toHaveBeenCalled();
    });
  });

  describe('Keyboard', () => {
    it('should move focus with arrow keys', async () => {
      const { getByRole, getByLabelText } = render(withProviders(<FileInput {...defaultProps} />));
      const input = getByLabelText(t.component.uploadInput.clickToUpload).querySelector('input');

      // Focus input
      await userEvent.tab();
      expect(document.activeElement).toBe(input);

      // Focus clear button
      await userEvent.tab();
      expect(document.activeElement).toBe(getByRole('button', { name: t.close }));

      // Move out of component
      await userEvent.tab();
      expect(document.activeElement).toBe(document.body);
    });
  });
});
