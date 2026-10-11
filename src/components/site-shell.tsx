"use client";
import Link from "next/link";
import type { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { getCategoriesClient, getProductsClient } from "@/lib/products-client";
import type { Product } from "@/lib/products";
import toast from "react-hot-toast";

export function Navbar() {
  const path = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [categories, setCategories] = useState<{ slug: string; name: string; emoji: string }[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    getCategoriesClient().then(setCategories);
    getProductsClient().then(setProducts);
  }, []);
  const date = new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(new Date());
  async function signOut() {
    try {
      await authClient.signOut();
      toast.success("সফলভাবে সাইন আউট হয়েছে");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("সাইন আউট করা যায়নি");
    }
  }
  return (
    <header className="site-header">
      <div className="nav-main wrap">
        <Link href="/" className="brand">
          <span className="brand-mark">🛒</span>
          <span>
            <strong>বাজার দর</strong>
            <small>{date}</small>
          </span>
        </Link>
        <button
          className="mobile-menu"
          aria-label="মেনু খুলুন"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
        <div className="nav-actions">
          {isPending ? (
            <span className="nav-loading" />
          ) : session?.user ? (
            <>
              <Link className="profile-link" href="/profile">
                {session.user.name || "আমার প্রোফাইল"}
              </Link>
              <button className="btn btn-outline btn-small" onClick={signOut}>
                সাইন আউট
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-outline btn-small" href="/signin">
                সাইন ইন
              </Link>
              <Link className="btn btn-primary btn-small" href="/signup">
                সাইন আপ <span>↗</span>
              </Link>
            </>
          )}
        </div>
      </div>
      <nav className={`category-nav ${menuOpen ? "is-open" : ""}`} aria-label="পণ্যের বিভাগ">
        <div className="wrap category-nav-inner">
          <Link
            href="/"
            className={`nav-category ${path === "/" ? "active" : ""}`}
            onClick={() => setMenuOpen(false)}
          >
            ⌂ <span>সব পণ্য</span>
          </Link>
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/category/${encodeURIComponent(c.slug)}`}
              className={`nav-category ${path === `/category/${c.slug}` ? "active" : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              {c.emoji} <span>{c.name}</span>
            </Link>
          ))}
        </div>
      </nav>
      <div className="ticker">
        <div className="ticker-track">
          {[...products, ...products].map((p, i) => (
            <span className="ticker-item" key={`${p.id}-${i}`}>
              <b>
                {p.emoji} {p.name}
              </b>
              <span>{p.price.toLocaleString("bn-BD")} টাকা</span>
              <em className={p.change > 0 ? "up" : p.change < 0 ? "down" : "flat"}>
                {p.change > 0 ? "▲" : p.change < 0 ? "▼" : "—"}{" "}
                {Math.abs(p.change).toLocaleString("bn-BD", { maximumFractionDigits: 1 })}%
              </em>
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-inner">
        <p>
          <strong>বাজার দর</strong> — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>
        <p>সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</p>
      </div>
    </footer>
  );
}
export function SiteFrame({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="main-content">{children}</main>
      <Footer />
    </>
  );
}
