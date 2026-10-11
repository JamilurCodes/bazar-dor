import { notFound } from "next/navigation";
import { getProducts } from "@/lib/products";
import ProductDetail from "@/components/product-detail";
import { SiteFrame } from "@/components/site-shell";
export const dynamicParams = true;
export default async function ProductPage({params}:{params:Promise<{slug:string}>}) { const {slug}=await params; const products=await getProducts(); const product=products.find(p=>p.slug===decodeURIComponent(slug)||p.id===decodeURIComponent(slug)); if(!product)notFound(); return <SiteFrame><ProductDetail product={product}/></SiteFrame>; }
