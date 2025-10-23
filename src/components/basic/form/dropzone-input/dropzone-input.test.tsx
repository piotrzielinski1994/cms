import { en } from '@/payload/locale/en';
import { withProviders } from '@/utils/tests';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ComponentProps } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { axe } from 'vitest-axe';
import { DropzoneInput } from './dropzone-input';

const t = en.frontend.component.uploadInput;

describe('DropzoneInput', () => {
  const defaultProps = {
    name: 'dropzone-input',
    fileNames: ['file-1.webp', 'file-2.webp'],
    onFileRemove: vi.fn(),
    onChange: vi.fn(),
    t: {
      clickToUpload: t.clickToUpload,
      orDragAndDrop: t.orDragAndDrop,
      fileExtensions: t.extensions.image,
    },
  } satisfies ComponentProps<typeof DropzoneInput>;

  it('should have no accessibility violations', async () => {
    const { container } = render(withProviders(<DropzoneInput {...defaultProps} />));
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should match the snapshot', () => {
    const { container } = render(withProviders(<DropzoneInput {...defaultProps} />));
    expect(container).toMatchSnapshot();
  });

  describe('Interactivity', () => {
    it('should call onChange when file is dropped', async () => {
      const newFileName = 'file-3.webp';
      const { getByText } = render(withProviders(<DropzoneInput {...defaultProps} />));

      const input = getByText(t.clickToUpload)
        .closest('label')!
        .querySelector('input') as HTMLInputElement;
      const label = input.closest('label')!;
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

    it('should call onFileRemove when a button is clicked', async () => {
      const { getByRole } = render(withProviders(<DropzoneInput {...defaultProps} />));
      const button = getByRole('button', { name: defaultProps.fileNames[1] });

      await userEvent.click(button);

      expect(defaultProps.onFileRemove).toHaveBeenCalledWith(defaultProps.fileNames[1], 1);
    });
  });

  describe('Keyboard', () => {
    it('should move focus with arrow keys', async () => {
      const { getByText, getAllByRole } = render(
        withProviders(<DropzoneInput {...defaultProps} />),
      );
      const input = getByText(t.clickToUpload).closest('label')!.querySelector('input');
      const buttons = getAllByRole('button');

      // Focus input
      await userEvent.tab();
      expect(document.activeElement).toBe(input);

      // Navigate across buttons (files)
      await userEvent.tab();
      expect(document.activeElement).toBe(buttons[0]);

      await userEvent.keyboard('{ArrowDown}');
      expect(document.activeElement).toBe(buttons[1]);

      await userEvent.keyboard('{ArrowUp}');
      expect(document.activeElement).toBe(buttons[0]);

      await userEvent.keyboard('{ArrowRight}');
      expect(document.activeElement).toBe(buttons[1]);

      await userEvent.keyboard('{ArrowLeft}');
      expect(document.activeElement).toBe(buttons[0]);

      // Move out of component
      await userEvent.tab();
      expect(document.activeElement).toBe(document.body);
    });
  });
});
