import '@testing-library/jest-dom';
import { expect, vi } from 'vitest';
import * as matchers from 'vitest-axe/matchers';

expect.extend(matchers);

HTMLCanvasElement.prototype.getContext = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: vi.fn().mockReturnValue({}),
  redirect: vi.fn(),
  permanentRedirect: vi.fn(),
  usePathname: vi.fn(),
  useParams: vi.fn(),
}));
