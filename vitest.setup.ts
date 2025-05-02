import '@testing-library/jest-dom';
import { vi } from 'vitest';
import 'vitest-axe/extend-expect';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn().mockReturnValue({}),
  redirect: vi.fn(),
  permanentRedirect: vi.fn(),
  usePathname: vi.fn(),
  useParams: vi.fn(),
}));
