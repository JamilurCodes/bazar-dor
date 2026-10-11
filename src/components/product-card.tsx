import Link from "next/link";
import type { Product } from "@/lib/products";
import { formatBengaliNumber } from "@/lib/products";
export function ProductCard({ product }: { product: Product }) {
  const trend = product.change > 0 ? "up" : product.change < 0 ? "down" : "flat";
  return (
    <Link
      className="product-card"
      href={`/product/${encodeURIComponent(product.slug)}`}
      aria-label={`${product.name} বিস্তারিত দেখুন`}
    >
      <div className="product-art">
        <span className="product-emoji">{product.emoji}</span>
        <span className={`change-badge ${trend}`}>
          {trend === "up" ? "▲" : trend === "down" ? "▼" : "—"}{" "}
          {formatBengaliNumber(Math.abs(product.change), 1)}%
        </span>
      </div>
      <div className="product-copy">
        <div className="product-name-row">
          <h3>{product.name}</h3>
          <span className="card-arrow">↗</span>
        </div>
        <p className="muted unit">{product.unit}</p>
        <div className="price-bottom">
          <div>
            <span className="muted price-label">আজকের দাম</span>
            <strong className="price">
              {formatBengaliNumber(product.price)} <small>টাকা</small>
            </strong>
          </div>
          <span className="card-detail">
            বিস্তারিত <span>→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="product-grid">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
export function ProductSkeletons() {
  return (
    <div className="product-grid">
      {Array.from({ length: 8 }, (_, i) => (
        <div className="product-skeleton" key={i}>
          <div className="skeleton-art" />
          <div className="skeleton-line wide" />
          <div className="skeleton-line" />
          <div className="skeleton-line short" />
        </div>
      ))}
    </div>
  );
}
