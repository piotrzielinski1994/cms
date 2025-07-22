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

class DataTransferItemList {
  items: File[] = [];
  add(file: File) {
    this.items.push(file);
  }
}

class DataTransfer {
  items = new DataTransferItemList();
  constructor() {}
}

global.DataTransfer = DataTransfer;

class DragEvent extends Event {
  dataTransfer: DataTransfer;
  constructor(type: string, eventInitDict: any = {}) {
    super(type, eventInitDict);
    this.dataTransfer = eventInitDict.dataTransfer || new DataTransfer();
  }
}

global.DragEvent = DragEvent;
