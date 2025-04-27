import RichText from '@/_old/components/RichText';
import React from 'react';

import type { Post } from '@/payload.types';

import { cn } from '@/utils/tailwind';
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import { Card } from '../../components/Card';

export type RelatedPostsProps = {
  className?: string;
  docs?: Post[];
  introContent?: SerializedEditorState;
};

export const RelatedPosts: React.FC<RelatedPostsProps> = (props) => {
  const { className, docs, introContent } = props;

  return (
    <div className={cn('lg:container', className)}>
      {introContent && <RichText data={introContent} enableGutter={false} />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-stretch">
        {docs?.map((doc, index) => {
          if (typeof doc === 'string') return null;

          return <Card key={index} doc={doc} relationTo="posts" showCategories />;
        })}
      </div>
    </div>
  );
};
