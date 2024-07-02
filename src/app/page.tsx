import { fetchProducts } from "./data/fetchProducts";
import { fetchCategories } from "./data/fetchCategories";
import { ProductGrid } from "./components/ProductGrid";

export default async function Home() {
  const categories = await fetchCategories();
  const products = await fetchProducts();

  return (
    <>
      <ProductGrid categories={categories} products={products} />
    </>
  );
}
