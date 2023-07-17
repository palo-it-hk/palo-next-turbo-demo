import { notFound } from 'next/navigation';
import { Product } from 'store/product';

export async function generateStaticParams() {
  const res = await fetch('https://dummyjson.com/products/');

  const data: { products: Product[] } = await res.json();

  const products = data.products;

  // 100 versions of this page will be statically generated
  // using the `params` returned by `generateStaticParams`
  // - /product/1
  // - /product/2
  // - /product/3
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

async function getProductById(id: string) {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  if (res.ok) {
    return res.json();
  }
}

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  const product: Product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <>
      <p>Product name is : {product.title}</p>
    </>
  );
}
