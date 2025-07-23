import '@testing-library/jest-dom';
import { expect, vi } from 'vitest';
import * as matchers from 'vitest-axe/matchers';

expect.extend(matchers);

HTMLCanvasElement.prototype.getContext = vi.fn();
HTMLDialogElement.prototype.show = vi.fn();
HTMLDialogElement.prototype.showModal = vi.fn();
HTMLDialogElement.prototype.close = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: vi.fn().mockReturnValue({}),
  redirect: vi.fn(),
  permanentRedirect: vi.fn(),
  usePathname: vi.fn(),
  useParams: vi.fn(),
}));

Object.defineProperty(window, 'matchMedia', {
  value: () => ({
    matches: false,
    addEventListener: () => {},
    removeEventListener: () => {},
  }),
});

Object.defineProperty(window, 'DataTransfer', {
  value: function () {
    this.items = [];
    this.items.add = (file: File) => this.items.push(file);
  },
});

Object.defineProperty(window, 'DragEvent', {
  value: (type: string, eventInitDict: EventInit & { dataTransfer?: DataTransfer }) => {
    const event = new Event(type, eventInitDict) as Event & { dataTransfer: DataTransfer };
    event.dataTransfer = eventInitDict?.dataTransfer ?? new window.DataTransfer();
    return event;
  },
});
