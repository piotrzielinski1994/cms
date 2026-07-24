import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { contentSectionPayloadConfig } from './content.payload';

// The payload config is exported data; we inspect its observable shape (slug,
// interfaceName, imageURL, fields) rather than any implementation detail.
// Correctness of the hand-edited `ContentBlock` interface + the `blockType`
// union is additionally enforced by `tsc --noEmit` in the full suite (TC-016).
const fields = contentSectionPayloadConfig.fields as unknown as Array<Record<string, unknown>>;
const fieldByName = (name: string) => fields.find((f) => f.name === name);

describe('contentSectionPayloadConfig', () => {
  // AC-006 / TC-010
  it('should declare slug "content" and interfaceName "ContentBlock"', () => {
    expect(contentSectionPayloadConfig.slug).toBe('content');
    expect(contentSectionPayloadConfig.interfaceName).toBe('ContentBlock');
  });

  // AC-007 / TC-010 (config sources its admin thumbnail from the webp import)
  it('should source its admin thumbnail via the imageURL property', () => {
    expect('imageURL' in contentSectionPayloadConfig).toBe(true);
  });

  // AC-006 / TC-010 (heading is NOT required)
  it('should declare a localized text heading field that is not required', () => {
    const heading = fieldByName('heading');
    expect(heading).toBeDefined();
    expect(heading?.type).toBe('text');
    expect(heading?.localized).toBe(true);
    expect(heading?.required).toBeFalsy();
  });

  // AC-006 / TC-010 (subheading is NOT required)
  it('should declare a localized text subheading field that is not required', () => {
    const subheading = fieldByName('subheading');
    expect(subheading).toBeDefined();
    expect(subheading?.type).toBe('text');
    expect(subheading?.localized).toBe(true);
    expect(subheading?.required).toBeFalsy();
  });

  // AC-006 / TC-010 (content is a required, localized richText field)
  it('should declare a required localized richText content field', () => {
    const content = fieldByName('content');
    expect(content).toBeDefined();
    expect(content?.type).toBe('richText');
    expect(content?.required).toBe(true);
    expect(content?.localized).toBe(true);
  });
});

describe('content admin thumbnail asset', () => {
  // AC-007 / TC-010
  it('should ship a content.webp thumbnail next to the payload config', () => {
    const webpPath = resolve(process.cwd(), 'src/payload/blocks/sections/content/content.webp');
    expect(existsSync(webpPath)).toBe(true);
  });
});
