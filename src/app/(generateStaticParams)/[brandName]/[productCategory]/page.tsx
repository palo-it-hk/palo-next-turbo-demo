import { Product } from 'store/product.type';
import {
  createProductDirectory,
  generateProductParams,
} from 'utils/productHelper';

export async function generateStaticParams() {
  const res = await fetch('https://dummyjson.com/products?limit=30');

  const data: { products: Product[] } = await res.json();

  const products = data.products;

  const productDirectory = createProductDirectory(products);

  // Multiple versions of this page will be statically generated
  // using the `params` returned by `generateStaticParams`
  // - /Apple/laptops
  // - /Hemani Tea/skincare
  // - /fauji/groceries ...etc
  return generateProductParams(productDirectory);
}

export default async function Page({
  params,
}: {
  params: { brandName: string; productCategory: string };
}) {
  const { brandName, productCategory } = params;

  // lets say a page such as '/loreal/laptops' should not exist.
  // Its up to you to check add your own checking logic.
  // The purpose of generateStaticParams is to generate routes in build time
  // if you hit a route that is not generated with generateStaticParams
  // it will be generated on each request.
  // You can test it out with the following console log on a page that is
  // generated on build time and one on request.
  console.log('if already statically generated, I should not show');

  return (
    <>
      <p>
        This page is for the brand
        <span className="font-bold">{brandName}</span> and it{"'"}s category of{' '}
        <span className="font-bold">{productCategory}</span> products.
      </p>
    </>
  );
}
