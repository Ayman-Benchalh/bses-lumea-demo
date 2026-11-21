import { MetadataRoute } from 'next';
import { INITIAL_PRODUCTS } from '@/data/products';
import { INITIAL_ARTICLES } from '@/data/articles';
import { LOCALES } from '@/i18n/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3102';
  const routes: MetadataRoute.Sitemap = [];

  LOCALES.forEach((locale) => {
    // Core pages
    routes.push(
      {
        url: `${baseUrl}/${locale}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1.0,
      },
      {
        url: `${baseUrl}/${locale}/shop`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      },
      {
        url: `${baseUrl}/${locale}/routine-finder`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
      },
      {
        url: `${baseUrl}/${locale}/journal`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      },
      {
        url: `${baseUrl}/${locale}/design-system`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      }
    );

    // Products
    INITIAL_PRODUCTS.forEach((product) => {
      routes.push({
        url: `${baseUrl}/${locale}/product/${product.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    });

    // Articles
    INITIAL_ARTICLES.forEach((article) => {
      routes.push({
        url: `${baseUrl}/${locale}/journal/${article.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    });
  });

  return routes;
}

