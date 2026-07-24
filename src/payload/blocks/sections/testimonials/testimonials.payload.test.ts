import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { testimonialsSectionPayloadConfig } from './testimonials.payload';

// The payload config is exported data; we inspect its observable shape (slug,
// interfaceName, imageURL, fields) rather than any implementation detail.
// Correctness of the hand-edited `TestimonialsBlock` interface + the
// `blockType` union is additionally enforced by `tsc --noEmit` (TC-015).
const fields = testimonialsSectionPayloadConfig.fields as unknown as Array<Record<string, unknown>>;
const fieldByName = (name: string) => fields.find((f) => f.name === name);

describe('testimonialsSectionPayloadConfig', () => {
  // AC-006 / TC-009
  it('should declare slug "testimonials" and interfaceName "TestimonialsBlock"', () => {
    expect(testimonialsSectionPayloadConfig.slug).toBe('testimonials');
    expect(testimonialsSectionPayloadConfig.interfaceName).toBe('TestimonialsBlock');
  });

  // AC-007 / TC-009 (config sources its admin thumbnail from the webp import)
  it('should source its admin thumbnail via the imageURL property', () => {
    expect('imageURL' in testimonialsSectionPayloadConfig).toBe(true);
  });

  // AC-006 / TC-009
  it('should declare a localized text heading field', () => {
    const heading = fieldByName('heading');
    expect(heading).toBeDefined();
    expect(heading?.type).toBe('text');
    expect(heading?.localized).toBe(true);
  });

  // AC-006 / TC-009 (subheading is NOT required)
  it('should declare a localized text subheading field that is not required', () => {
    const subheading = fieldByName('subheading');
    expect(subheading).toBeDefined();
    expect(subheading?.type).toBe('text');
    expect(subheading?.localized).toBe(true);
    expect(subheading?.required).toBeFalsy();
  });

  // AC-006 / TC-009
  it('should declare a collapsed array items field', () => {
    const items = fieldByName('items');
    expect(items).toBeDefined();
    expect(items?.type).toBe('array');
    expect((items?.admin as Record<string, unknown> | undefined)?.initCollapsed).toBe(true);
  });

  // AC-006 / TC-009 (image sub-field: upload, relationTo images, required)
  it('should declare a required image upload sub-field related to images', () => {
    const items = fieldByName('items');
    const subFields = items?.fields as Array<Record<string, unknown>>;
    const image = subFields.find((f) => f.name === 'image');
    expect(image?.type).toBe('upload');
    expect(image?.relationTo).toBe('images');
    expect(image?.required).toBe(true);
  });

  // AC-006 / TC-009 (quote sub-field: textarea, required, localized)
  it('should declare a required localized textarea quote sub-field', () => {
    const items = fieldByName('items');
    const subFields = items?.fields as Array<Record<string, unknown>>;
    const quote = subFields.find((f) => f.name === 'quote');
    expect(quote?.type).toBe('textarea');
    expect(quote?.required).toBe(true);
    expect(quote?.localized).toBe(true);
  });

  // AC-006 / TC-009 (name sub-field: text, required, localized)
  it('should declare a required localized text name sub-field', () => {
    const items = fieldByName('items');
    const subFields = items?.fields as Array<Record<string, unknown>>;
    const name = subFields.find((f) => f.name === 'name');
    expect(name?.type).toBe('text');
    expect(name?.required).toBe(true);
    expect(name?.localized).toBe(true);
  });

  // AC-006 / TC-009 (annotation sub-field: text, localized, NOT required)
  it('should declare a localized text annotation sub-field that is not required', () => {
    const items = fieldByName('items');
    const subFields = items?.fields as Array<Record<string, unknown>>;
    const annotation = subFields.find((f) => f.name === 'annotation');
    expect(annotation?.type).toBe('text');
    expect(annotation?.localized).toBe(true);
    expect(annotation?.required).toBeFalsy();
  });
});

describe('testimonials admin thumbnail asset', () => {
  // AC-007 / TC-009
  it('should ship a testimonials.webp thumbnail next to the payload config', () => {
    const webpPath = resolve(
      process.cwd(),
      'src/payload/blocks/sections/testimonials/testimonials.webp',
    );
    expect(existsSync(webpPath)).toBe(true);
  });
});
