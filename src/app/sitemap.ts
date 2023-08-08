import { readdir } from 'fs/promises';
import { MetadataRoute } from 'next';

async function routeFinder(src: string, allDir: string[] = []) {
  const dirents = (await readdir(src, { withFileTypes: true })).filter(
    (direct) => direct.isDirectory(),
  );

  for (const dirent of dirents) {
    if (dirent.name === 'api') {
      continue;
    }
    if (!/[()\[]/.test(dirent.name)) {
      allDir.push(dirent.name);
    }
    await routeFinder(`${src}/${dirent.name}`, allDir);
  }

  return allDir;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteMap: MetadataRoute.Sitemap = [];

  await routeFinder('./src/app').then((routes) => {
    routes.forEach((route) => {
      siteMap.push({
        url: `http://localhost:3000/${route}`,
        lastModified: new Date(),
      });
    });
  });

  return siteMap;
}
