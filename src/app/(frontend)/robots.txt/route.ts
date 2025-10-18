import { clientEnv } from '@/config/env.client.config';
import { contentLocales } from '@/config/store/locales.config';
import { NextResponse } from 'next/server';

const robotsTxt = `# *
User-agent: *
Disallow: /admin/*

# Host
Host: ${clientEnv.publicUrl}

# Sitemaps
${contentLocales
  .map((locale) => `Sitemap: ${clientEnv.publicUrl}/${locale}/sitemap.xml`)
  .join('\n')}
`;

export async function GET() {
  return new NextResponse(robotsTxt, { headers: { 'Content-Type': 'text/plain' } });
}
