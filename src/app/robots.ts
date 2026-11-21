import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3102';
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/fr/admin-demo', '/en/admin-demo', '/ar/admin-demo'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

