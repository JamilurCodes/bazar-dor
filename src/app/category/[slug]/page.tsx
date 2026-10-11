import CategoryContent from "@/components/category-content";
import { SiteFrame } from "@/components/site-shell";
export const dynamicParams = true;
export default async function CategoryPage({ params }: { params: Promise<{slug:string}> }) { const {slug}=await params; return <SiteFrame><CategoryContent slug={slug}/></SiteFrame>; }
