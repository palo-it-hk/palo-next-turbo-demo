import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';

import { getProductById } from 'frontend-api/products';

type Params = {
  params: { id: string };
};

export async function generateMetadata(
  { params }: Params,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  let productTitle = '';

  // read route params
  const id = params.id;

  // fetch data
  await getProductById(id).then((product) => {
    productTitle = product.title;
  });
  // optionally access and extend (rather than replace) parent metadata
  // The error: metadata.metadataBase is not set for resolving social open graph or twitter images, fallbacks to "http://localhost:3000". See https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadatabase
  // occurs because the parent layout don't have the metadatabase set
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: productTitle,
    openGraph: {
      images: [
        `https://i.dummyjson.com/data/products/${id}/1.jpg`,
        ...previousImages,
      ],
    },
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  // Don't feel bad for fetching the same thing more than once.
  // Fetch requests are automatically memoized for the same data across generateMetadata,
  // generateStaticParams, Layouts, Pages, and Server Components.
  // React cache can be used if fetch is unavailable.
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <>
      <p>Product name is : {product.title}</p>
    </>
  );
}
