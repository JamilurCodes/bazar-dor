import HomeContent from "@/components/home-content";
import { getProducts } from "@/lib/products";
import { SiteFrame } from "@/components/site-shell";


export const revalidate = 300;
export default async function Home() {
  const products = await getProducts();
  return (
    <SiteFrame>
      <HomeContent initialProducts={products} />
    </SiteFrame>
  );
}
