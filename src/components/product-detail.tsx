"use client";
import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import type { Product } from "@/lib/products";
import { formatBengaliNumber } from "@/lib/products";
import toast from "react-hot-toast";


export default function ProductDetail({ product }: { product: Product }) {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  useEffect(() => {
    if (!isPending && !session) {
      toast.error("পণ্যের বিস্তারিত দেখতে আগে সাইন ইন করুন");
      router.replace(`/signin?callbackURL=${encodeURIComponent(`/product/${product.slug}`)}`);
    }
  }, [isPending, session, router, product.slug]);
  if (isPending || !session)
    return (
      <div className="page-loading">
        <span className="loading-spinner" /> আপনার অ্যাকাউন্ট যাচাই করা হচ্ছে…
      </div>
    );
  return (
    <section className="detail-page wrap">
      <div className="breadcrumbs">
        <Link href="/">হোম</Link>
        <span>/</span>
        <span>{product.name}</span>
      </div>
      <Link href="/" className="back-link">
        ← সব পণ্যে ফিরে যান
      </Link>
      <div className="detail-summary">
        <div className="detail-emoji">{product.emoji}</div>
        <div className="detail-main">
          <span className="section-kicker">TODAY&apos;s MARKET SNAPSHOT</span>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <div className="detail-tags">
            <span>{product.categoryName}</span>
            <span>{product.unit}</span>
            <span className="live-tag">
              <i /> আজকের আপডেট
            </span>
          </div>
        </div>
        <div className="detail-current">
          <span>আজকের গড় দাম</span>
          <strong>
            {formatBengaliNumber(product.price)} <small>৳</small>
          </strong>
          <span
            className={`change-badge ${product.change > 0 ? "up" : product.change < 0 ? "down" : "flat"}`}
          >
            {product.change > 0 ? "▲" : product.change < 0 ? "▼" : "—"}{" "}
            {formatBengaliNumber(Math.abs(product.change), 1)}%
          </span>
        </div>
      </div>
      <div className="price-stats">
        <div>
          <span>সর্বনিম্ন দাম</span>
          <strong>
            {formatBengaliNumber(product.minPrice)} <small>টাকা</small>
          </strong>
          <em>বাজারে পাওয়া সর্বনিম্ন</em>
        </div>
        <div>
          <span>গড় দাম</span>
          <strong>
            {formatBengaliNumber(product.price)} <small>টাকা</small>
          </strong>
          <em>আজকের আনুমানিক গড়</em>
        </div>
        <div>
          <span>সর্বোচ্চ দাম</span>
          <strong>
            {formatBengaliNumber(product.maxPrice)} <small>টাকা</small>
          </strong>
          <em>বাজারে পাওয়া সর্বোচ্চ</em>
        </div>
      </div>
      <div className="market-section">
        <div className="section-heading">
          <div>
            <span className="section-kicker">COMPARE LOCAL MARKETS</span>
            <h2>বাজারভিত্তিক আজকের দাম</h2>
            <p>বিভিন্ন বাজারে {product.name} এর আনুমানিক দাম তুলনা করুন।</p>
          </div>
          <span className="market-count">
            ⌖ {product.markets.length.toLocaleString("bn-BD")} টি বাজার
          </span>
        </div>
        <div className="market-table-wrap">
          <table className="market-table">
            <thead>
              <tr>
                <th>বাজারের নাম</th>
                <th>এলাকা</th>
                <th>প্রতি এককের দাম</th>
                <th>সর্বশেষ আপডেট</th>
              </tr>
            </thead>
            <tbody>
              {product.markets.map((m, i) => (
                <tr key={`${m.name}-${i}`}>
                  <td>
                    <span className="market-pin">⌖</span>
                    <strong>{m.name}</strong>
                  </td>
                  <td>{m.area}</td>
                  <td className="market-price">{formatBengaliNumber(m.price)} টাকা</td>
                  <td>{m.updated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="data-disclaimer">
          ⓘ এই দামগুলো সম্ভাব্য বাজারদর। দোকান, মান ও এলাকার ভিত্তিতে দাম পরিবর্তিত হতে পারে।
        </p>
      </div>
    </section>
  );
}
