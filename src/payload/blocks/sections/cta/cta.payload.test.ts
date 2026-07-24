import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { ctaSectionPayloadConfig } from './cta.payload';

// The payload config is exported data; we inspect its observable shape (slug,
// interfaceName, fields) rather than any implementation detail. Correctness of
// the generated `CtaBlock` interface and the `blockType` union is additionally
// enforced by `next typegen` + `tsc --noEmit` in the full suite (TC-008).
const fields = ctaSectionPayloadConfig.fields as unknown as Array<Record<string, unknown>>;
const fieldByName = (name: string) => fields.find((f) => f.name === name);

describe('ctaSectionPayloadConfig', () => {
  // AC-006
  it('should declare slug "cta" and interfaceName "CtaBlock"', () => {
    expect(ctaSectionPayloadConfig.slug).toBe('cta');
    expect(ctaSectionPayloadConfig.interfaceName).toBe('CtaBlock');
  });

  // AC-006
  it('should declare a localized text heading field', () => {
    const heading = fieldByName('heading');
    expect(heading).toBeDefined();
    expect(heading?.type).toBe('text');
    expect(heading?.localized).toBe(true);
  });

  // AC-006 (subheading is NOT required, unlike hero-1)
  it('should declare a localized text subheading field that is not required', () => {
    const subheading = fieldByName('subheading');
    expect(subheading).toBeDefined();
    expect(subheading?.type).toBe('text');
    expect(subheading?.localized).toBe(true);
    expect(subheading?.required).toBeFalsy();
  });

  // AC-006
  it('should declare a collapsed array buttons field with label, reference and selector sub-fields', () => {
    const buttons = fieldByName('buttons');
    expect(buttons).toBeDefined();
    expect(buttons?.type).toBe('array');
    expect((buttons?.admin as Record<string, unknown> | undefined)?.initCollapsed).toBe(true);

    const subFields = buttons?.fields as Array<Record<string, unknown>>;
    const subByName = (name: string) => subFields.find((f) => f.name === name);

    const label = subByName('label');
    expect(label?.type).toBe('text');
    expect(label?.required).toBe(true);
    expect(label?.localized).toBe(true);

    const reference = subByName('reference');
    expect(reference?.type).toBe('relationship');
    expect(reference?.relationTo).toEqual(['pages']);
    expect(reference?.required).toBe(true);

    const selector = subByName('selector');
    expect(selector?.type).toBe('text');
  });

  // AC-007 (config sources its admin thumbnail from the webp import)
  it('should source its admin thumbnail via the imageURL property', () => {
    expect('imageURL' in ctaSectionPayloadConfig).toBe(true);
  });
});

describe('cta admin thumbnail asset', () => {
  // AC-007
  it('should ship a cta.webp thumbnail next to the payload config', () => {
    const webpPath = resolve(process.cwd(), 'src/payload/blocks/sections/cta/cta.webp');
    expect(existsSync(webpPath)).toBe(true);
  });
});
