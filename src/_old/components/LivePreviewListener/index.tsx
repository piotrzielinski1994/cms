'use client';

import { clientEnv } from '@/config/env.client.config';
import { RefreshRouteOnSave as PayloadLivePreview } from '@payloadcms/live-preview-react';
import { useRouter } from 'next/navigation';
import React from 'react';

export const LivePreviewListener: React.FC = () => {
  const router = useRouter();
  return <PayloadLivePreview refresh={router.refresh} serverURL={clientEnv.publicUrl} />;
};
