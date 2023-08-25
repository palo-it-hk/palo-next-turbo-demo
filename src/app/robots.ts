import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private-page/', 'with-middleware'],
    },
    sitemap: 'https://localhost:3000/sitemap.xml',
  };
}
