import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { featuresSectionPayloadConfig } from './features.payload';

// The payload config is exported data; we inspect its observable shape (slug,
// interfaceName, imageURL, fields) rather than any implementation detail.
// Correctness of the hand-edited `FeaturesBlock` interface + the `blockType`
// union is additionally enforced by `tsc --noEmit` (TC-017).
const fields = featuresSectionPayloadConfig.fields as unknown as Array<Record<string, unknown>>;
const fieldByName = (name: string) => fields.find((f) => f.name === name);
const itemsSubFields = () => {
  const items = fieldByName('items');
  return items?.fields as Array<Record<string, unknown>>;
};
const subFieldByName = (name: string) => itemsSubFields().find((f) => f.name === name);

// The curated icon set (value union == IconName == iconMap keys), per AC-006.
const CURATED_ICON_VALUES = [
  'rocket',
  'zap',
  'shield',
  'sparkles',
  'heart',
  'star',
  'settings',
  'globe',
  'lock',
  'gauge',
];

describe('featuresSectionPayloadConfig', () => {
  // AC-006 / TC-011
  it('should declare slug "features" and interfaceName "FeaturesBlock"', () => {
    expect(featuresSectionPayloadConfig.slug).toBe('features');
    expect(featuresSectionPayloadConfig.interfaceName).toBe('FeaturesBlock');
  });

  // AC-007 / TC-011 (config sources its admin thumbnail from the webp import)
  it('should source its admin thumbnail via the imageURL property', () => {
    expect('imageURL' in featuresSectionPayloadConfig).toBe(true);
  });

  // AC-006 / TC-011
  it('should declare a localized text heading field', () => {
    const heading = fieldByName('heading');
    expect(heading).toBeDefined();
    expect(heading?.type).toBe('text');
    expect(heading?.localized).toBe(true);
  });

  // AC-006 / TC-011 (subheading is NOT required)
  it('should declare a localized text subheading field that is not required', () => {
    const subheading = fieldByName('subheading');
    expect(subheading).toBeDefined();
    expect(subheading?.type).toBe('text');
    expect(subheading?.localized).toBe(true);
    expect(subheading?.required).toBeFalsy();
  });

  // AC-006 / TC-011
  it('should declare a collapsed array items field', () => {
    const items = fieldByName('items');
    expect(items).toBeDefined();
    expect(items?.type).toBe('array');
    expect((items?.admin as Record<string, unknown> | undefined)?.initCollapsed).toBe(true);
  });

  // AC-006 / TC-011 (icon sub-field: select, NOT required, curated options)
  it('should declare a select icon sub-field that is not required with the curated icon options', () => {
    const icon = subFieldByName('icon');
    expect(icon).toBeDefined();
    expect(icon?.type).toBe('select');
    expect(icon?.required).toBeFalsy();

    const options = icon?.options as Array<{ label: string; value: string }>;
    expect(Array.isArray(options)).toBe(true);
    const values = options.map((o) => o.value);
    // The option values equal the curated set exactly (same members, no extras).
    expect([...values].sort()).toEqual([...CURATED_ICON_VALUES].sort());
    // Each option carries a plain (non-empty string) human label.
    for (const option of options) {
      expect(typeof option.label).toBe('string');
      expect(option.label.length).toBeGreaterThan(0);
    }
  });

  // AC-006 / TC-011 (title sub-field: text, required, localized)
  it('should declare a required localized text title sub-field', () => {
    const title = subFieldByName('title');
    expect(title?.type).toBe('text');
    expect(title?.required).toBe(true);
    expect(title?.localized).toBe(true);
  });

  // AC-006 / TC-011 (description sub-field: textarea, localized, NOT required)
  it('should declare a localized textarea description sub-field that is not required', () => {
    const description = subFieldByName('description');
    expect(description?.type).toBe('textarea');
    expect(description?.localized).toBe(true);
    expect(description?.required).toBeFalsy();
  });
});

describe('features admin thumbnail asset', () => {
  // AC-007 / TC-011
  it('should ship a features.webp thumbnail next to the payload config', () => {
    const webpPath = resolve(process.cwd(), 'src/payload/blocks/sections/features/features.webp');
    expect(existsSync(webpPath)).toBe(true);
  });
});
