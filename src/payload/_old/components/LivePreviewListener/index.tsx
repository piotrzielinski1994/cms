'use client';

import { RefreshRouteOnSave as PayloadLivePreview } from '@payloadcms/live-preview-react';
import { useRouter } from 'next/navigation';
import type React from 'react';
import { clientEnv } from '@/config/env.client.config';

export const LivePreviewListener: React.FC = () => {
  const router = useRouter();
  return <PayloadLivePreview refresh={router.refresh} serverURL={clientEnv.publicUrl} />;
};
