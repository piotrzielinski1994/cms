import { describe, expect, it } from 'vitest';
import { en } from './en';
import { pl } from './pl';

// AC-006 / AC-013 / TC-012: exactly ONE new admin-locale key `fields.icon` is
// added to BOTH locales, keeping `pl satisfies typeof en` intact (the deeper
// compile-time guarantee is enforced by `tsc --noEmit`; here we assert the
// observable exported locale data carries the key in both languages).
describe('features admin locale key', () => {
  it('should define a fields.icon label in the en locale', () => {
    const fields = en.fields as Record<string, unknown>;
    expect(typeof fields.icon).toBe('string');
    expect((fields.icon as string).length).toBeGreaterThan(0);
  });

  it('should define a fields.icon label in the pl locale', () => {
    const fields = pl.fields as Record<string, unknown>;
    expect(typeof fields.icon).toBe('string');
    expect((fields.icon as string).length).toBeGreaterThan(0);
  });
});
