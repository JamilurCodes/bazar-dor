"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/products";
import { getProductsClient } from "@/lib/products-client";
import { ProductGrid, ProductSkeletons } from "@/components/product-card";

export default function HomeContent({ initialProducts }: { initialProducts: Product[] }) {
  const [products, setProducts] = useState(initialProducts);
  const [loading, setLoading] = useState(initialProducts.length === 0);
  useEffect(() => {
    let live = true;
    getProductsClient()
      .then((data) => {
        if (live && data.length) setProducts(data);
      })
      .finally(() => {
        if (live) setLoading(false);
      });
    return () => {
      live = false;
    };
  }, []);
  const risers = useMemo(
    () =>
      [...products]
        .filter((p) => p.change > 0)
        .sort((a, b) => b.change - a.change)
        .slice(0, 6),
    [products],
  );
  const fallers = useMemo(
    () =>
      [...products]
        .filter((p) => p.change < 0)
        .sort((a, b) => a.change - b.change)
        .slice(0, 6),
    [products],
  );
  return (
    <>
      <section className="hero wrap">
        <div className="hero-copy">
          <span className="eyebrow">
            <span className="live-dot" /> বাংলাদেশের দৈনিক বাজারদর
          </span>
          <h1>
            বাজারের হিসাব,
            <br />
            <span>থাকুক আপনার</span> হাতেই।
          </h1>
          <p>
            চাল, ডাল, মাছ, মাংস ও নিত্যপ্রয়োজনীয় পণ্যের দাম জানুন এক জায়গায়। সঠিক তথ্য নিন,
            সচেতন সিদ্ধান্ত নিন।
          </p>
          <div className="hero-actions">
            <a href="#সব-পণ্য" className="btn btn-primary btn-large">
              আজকের বাজারদর দেখুন <span>↘</span>
            </a>
            <span className="hero-note">✦ সহজ • স্বচ্ছ • প্রতিদিন</span>
          </div>
          <div className="hero-stats">
            <div>
              <strong>{products.length ? products.length.toLocaleString("bn-BD") : "১২+"}</strong>
              <span>নিত্যপণ্য</span>
            </div>
            <div>
              <strong>০৬</strong>
              <span>বাজার অঞ্চল</span>
            </div>
            <div>
              <strong>প্রতিদিন</strong>
              <span>দাম আপডেট</span>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-orbit orbit-one" />
          <div className="hero-orbit orbit-two" />
          <div className="hero-image-frame">
            <Image
              src="/bazar-hero.png"
              alt="তাজা শাকসবজি ও বাজারের পণ্য"
              fill
              priority
              sizes="(max-width: 800px) 90vw, 50vw"
              className="hero-image"
            />
          </div>
          <div className="floating-price float-top">
            <span>🥬</span>
            <div>
              <small>তাজা সবজি</small>
              <strong>প্রতিদিনের দর</strong>
            </div>
            <b>↗</b>
          </div>
          <div className="floating-price float-bottom">
            <span className="mini-chart">↗</span>
            <div>
              <small>বাজার আপডেট</small>
              <strong>এক নজরে সব দাম</strong>
            </div>
          </div>
          <span className="hero-spark spark-one">✳</span>
          <span className="hero-spark spark-two">✦</span>
        </div>
      </section>
      <section className="trust-strip">
        <div className="wrap trust-inner">
          <span>✳ নির্ভরযোগ্য বাজার তথ্য</span>
          <span>◷ প্রতিদিনের দর</span>
          <span>⌖ একাধিক বাজারের তুলনা</span>
          <span>♡ সচেতন কেনাকাটা</span>
        </div>
      </section>
      <section className="section wrap">
        <div className="section-heading">
          <div>
            <span className="section-kicker">MARKET MOVEMENT</span>
            <h2>
              আজ দাম বেড়েছে <span className="heading-up">↗</span>
            </h2>
            <p>যেসব পণ্যের দাম আজ ঊর্ধ্বমুখী</p>
          </div>
          <span className="section-side-note">সর্বশেষ বাজার পর্যবেক্ষণ</span>
        </div>
        {loading ? (
          <ProductSkeletons />
        ) : risers.length ? (
          <ProductGrid products={risers} />
        ) : (
          <p className="empty-inline">এই মুহূর্তে দাম বৃদ্ধির তথ্য নেই।</p>
        )}
      </section>
      <section className="section section-soft">
        <div className="wrap">
          <div className="section-heading">
            <div>
              <span className="section-kicker">BETTER VALUE</span>
              <h2>
                আজ দাম কমেছে <span className="heading-down">↘</span>
              </h2>
              <p>কম দামে কেনাকাটার সুযোগ খুঁজে নিন</p>
            </div>
            <span className="section-side-note">সাশ্রয়ের দিকে নজর দিন</span>
          </div>
          {loading ? (
            <ProductSkeletons />
          ) : fallers.length ? (
            <ProductGrid products={fallers} />
          ) : (
            <p className="empty-inline">এই মুহূর্তে দাম কমার তথ্য নেই।</p>
          )}
        </div>
      </section>
      <section id="সব-পণ্য" className="section wrap all-products">
        <div className="section-heading">
          <div>
            <span className="section-kicker">THE DAILY ESSENTIALS</span>
            <h2>
              সব পণ্য, <span className="highlight-text">এক নজরে।</span>
            </h2>
            <p>প্রয়োজনীয় পণ্যের বর্তমান দাম ও বাজারের পরিবর্তন দেখুন।</p>
          </div>
          <span className="product-count">
            {products.length.toLocaleString("bn-BD")} টি পণ্য <span>✳</span>
          </span>
        </div>
        {loading ? (
          <ProductSkeletons />
        ) : products.length ? (
          <ProductGrid products={products} />
        ) : (
          <p className="empty-inline">পণ্যের তথ্য লোড করা যায়নি। কিছুক্ষণ পর আবার চেষ্টা করুন।</p>
        )}
      </section>
      <section className="cta-band wrap">
        <div>
          <span className="section-kicker">SMART SHOPPING STARTS HERE</span>
          <h2>
            দাম জানুন। পরিকল্পনা করুন।
            <br />
            সাশ্রয়ী থাকুন।
          </h2>
          <p>বাজারে যাওয়ার আগে আজকের দাম দেখে নিন।</p>
        </div>
        <Link href="/signup" className="btn btn-light">
          বিনামূল্যে অ্যাকাউন্ট খুলুন <span>↗</span>
        </Link>
        <span className="cta-decoration">৳</span>
      </section>
    </>
  );
}
