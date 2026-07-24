import { describe, expect, it } from 'vitest';
import { Pages } from './pages';

// Recursively collect every block `slug` declared anywhere in a field tree,
// so the assertion survives restructuring of the tabs/field nesting.
type UnknownRecord = Record<string, unknown>;

const collectBlockSlugs = (fields: unknown): string[] => {
  if (!Array.isArray(fields)) return [];
  const slugs: string[] = [];
  for (const field of fields as UnknownRecord[]) {
    if (Array.isArray(field.blocks)) {
      for (const block of field.blocks as UnknownRecord[]) {
        if (typeof block.slug === 'string') slugs.push(block.slug);
      }
    }
    if (Array.isArray(field.fields)) slugs.push(...collectBlockSlugs(field.fields));
    if (Array.isArray(field.tabs)) {
      for (const tab of field.tabs as UnknownRecord[]) {
        slugs.push(...collectBlockSlugs(tab.fields));
      }
    }
  }
  return slugs;
};

describe('Pages collection', () => {
  // AC-010 / TC-017: the features block config is registered in the sections
  // field so editors can add a Features block and its blockType joins the union.
  it('should register the "features" block in the sections blocks array', () => {
    const slugs = collectBlockSlugs(Pages.fields);
    expect(slugs).toContain('features');
  });
});
