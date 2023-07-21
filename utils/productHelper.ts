import { Product, ProductParams } from 'store/product';

export function createProductDirectory(listOfProducts: Product[]): {
  [key: string]: string[];
} {
  const productDirectory: any = {};

  for (let product of listOfProducts) {
    const brand = product.brand;

    // check if a brand exists in the productDirectory
    if (!productDirectory[brand]) {
      productDirectory[brand] = [];
    }

    // check if the category already exists in the array
    if (
      !productDirectory[brand].find(
        (category: string) => category === product.category,
      )
    ) {
      productDirectory[brand].push(product.category);
    }
  }

  return productDirectory;
}

export function generateProductParams(productDirectory: {
  [key: string]: string[];
}): ProductParams[] {
  const result: ProductParams[] = [];

  for (let brand in productDirectory) {
    const categories = productDirectory[brand];
    for (let category of categories) {
      const params = { brandName: '', productCategory: '' };
      params.brandName = brand;
      params.productCategory = category;
      result.push(params);
    }
  }
  return result;
}
