"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { Product } from "@/lib/products";
import { getProductsClient } from "@/lib/products-client";
import { ProductGrid, ProductSkeletons } from "@/components/product-card";

const titles: Record<string, string> = {
  chal: "চাল ও ডাল",
  sobji: "সবজি",
  "mach-mangsho": "মাছ ও মাংস",
  "dim-dudh": "ডিম ও দুধ",
  "tel-moshla": "তেল ও মসলা",
  others: "অন্যান্য পণ্য",
};

export default function CategoryContent({ slug }: { slug: string }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("default");
  useEffect(() => {
    let active = true;
    getProductsClient()
      .then((d) => {
        if (active) setProducts(d);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);
  const filtered = useMemo(() => {
    const list = products.filter(
      (p) =>
        p.category.toLowerCase() === decodeURIComponent(slug).toLowerCase() ||
        p.categoryName.toLowerCase() === decodeURIComponent(slug).toLowerCase(),
    );
    if (sort === "asc") list.sort((a, b) => a.price - b.price);
    if (sort === "desc") list.sort((a, b) => b.price - a.price);
    return list;
  }, [products, slug, sort]);
  const title = titles[slug] || filtered[0]?.categoryName || slug;
  return (
    <section className="category-page wrap">
      <div className="breadcrumbs">
        <Link href="/">হোম</Link>
        <span>/</span>
        <span>{title}</span>
      </div>
      <div className="category-hero">
        <div>
          <span className="section-kicker">EXPLORE CATEGORY</span>
          <h1>{title}</h1>
          <p>এই বিভাগের পণ্যের আজকের দাম ও বাজার পরিবর্তন দেখুন।</p>
        </div>
        <span className="category-hero-emoji">
          {slug === "chal"
            ? "🌾"
            : slug === "mach-mangsho"
              ? "🐟"
              : slug === "dim-dudh"
                ? "🥚"
                : slug === "tel-moshla"
                  ? "🧂"
                  : "🥬"}
        </span>
      </div>
      <div className="category-toolbar">
        <div>
          <h2>পণ্যের তালিকা</h2>
          <p>
            {loading
              ? "তথ্য আনা হচ্ছে…"
              : `${filtered.length.toLocaleString("bn-BD")} টি পণ্য পাওয়া গেছে`}
          </p>
        </div>
        <label className="sort-label">
          সাজান:
          <select
            className="select select-bordered"
            aria-label="দাম অনুযায়ী পণ্য সাজান"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="default">ডিফল্ট</option>
            <option value="asc">দাম: কম থেকে বেশি</option>
            <option value="desc">দাম: বেশি থেকে কম</option>
          </select>
          <span>⌄</span>
        </label>
      </div>
      {loading ? (
        <ProductSkeletons />
      ) : filtered.length ? (
        <ProductGrid products={filtered} />
      ) : (
        <div className="empty-state">
          <span>🔎</span>
          <h2>এই বিভাগে পণ্য পাওয়া যায়নি</h2>
          <p>অন্য বিভাগ দেখুন অথবা হোম পেজে ফিরে যান।</p>
          <Link className="btn btn-primary" href="/">
            হোম পেজে ফিরে যান ↗
          </Link>
        </div>
      )}
    </section>
  );
}
