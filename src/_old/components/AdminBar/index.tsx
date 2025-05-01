'use client';

import { Container } from '@/components/basic/container';
import { Section } from '@/components/basic/section';
import { clientEnv } from '@/config/env.client.config';
import { cn } from '@/utils/tailwind';
import type { PayloadAdminBarProps, PayloadMeUser } from '@payloadcms/admin-bar';
import { PayloadAdminBar } from '@payloadcms/admin-bar';
import { useRouter, useSelectedLayoutSegments } from 'next/navigation';
import React, { useState } from 'react';
import './index.scss';

const baseClass = 'admin-bar';

const collectionLabels = {
  pages: {
    plural: 'Pages',
    singular: 'Page',
  },
  posts: {
    plural: 'Posts',
    singular: 'Post',
  },
  projects: {
    plural: 'Projects',
    singular: 'Project',
  },
};

const Title: React.FC = () => <span>Dashboard</span>;

export const AdminBar: React.FC<{
  adminBarProps?: PayloadAdminBarProps;
}> = (props) => {
  const { adminBarProps } = props || {};
  const segments = useSelectedLayoutSegments();
  const [show, setShow] = useState(false);
  const collection = (
    collectionLabels[segments?.[1] as keyof typeof collectionLabels] ? segments[1] : 'pages'
  ) as keyof typeof collectionLabels;
  const router = useRouter();

  const onAuthChange = React.useCallback((user: PayloadMeUser) => {
    setShow(Boolean(user?.id));
  }, []);

  return (
    <Section className="py-2 bg-black text-white">
      <Container
        className={cn(baseClass, {
          block: show,
          hidden: !show,
        })}
      >
        <PayloadAdminBar
          {...adminBarProps}
          className="py-2 text-white"
          classNames={{
            controls: 'font-medium text-white',
            logo: 'text-white',
            user: 'text-white',
          }}
          cmsURL={clientEnv.publicUrl}
          collectionSlug={collection}
          collectionLabels={{
            plural: collectionLabels[collection]?.plural || 'Pages',
            singular: collectionLabels[collection]?.singular || 'Page',
          }}
          logo={<Title />}
          onAuthChange={onAuthChange}
          onPreviewExit={() => {
            fetch('/next/exit-preview').then(() => {
              router.push('/');
              router.refresh();
            });
          }}
          style={{
            backgroundColor: 'transparent',
            padding: 0,
            position: 'relative',
            zIndex: 'unset',
          }}
        />
      </Container>
    </Section>
  );
};
