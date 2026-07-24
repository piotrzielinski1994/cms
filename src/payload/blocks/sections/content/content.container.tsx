import { RichText } from '@payloadcms/richtext-lexical/react';
import { Content } from '@/components/sections/content/content';
import type { ContentBlock } from '@/payload/payload.types';

const ContentContainer = ({ heading, subheading, content }: ContentBlock) => {
  return (
    <Content
      heading={heading ?? undefined}
      subheading={subheading ?? undefined}
      content={<RichText data={content} />}
    />
  );
};

export { ContentContainer };
