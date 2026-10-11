export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  categoryName: string;
  price: number;
  minPrice: number;
  maxPrice: number;
  change: number;
  unit: string;
  emoji: string;
  description: string;
  markets: { name: string; area: string; price: number; updated: string }[];
};

const BASE_URL = (
  process.env.BAZARDOR_API_URL || "https://openapi.programming-hero.com/api/bazardor"
).replace(/\/$/, "");
const fallback: Product[] = [
  {
    id: "1",
    slug: "miniket-rice",
    name: "মিনিকেট চাল",
    category: "chal",
    categoryName: "চাল ও ডাল",
    price: 72,
    minPrice: 68,
    maxPrice: 78,
    change: 2.1,
    unit: "প্রতি কেজি",
    emoji: "🍚",
    description: "প্রতিদিনের রান্নার জনপ্রিয় সরু চাল।",
    markets: [
      { name: "কারওয়ান বাজার", area: "ঢাকা", price: 70, updated: "সকাল ৮:৩০" },
      { name: "নিউ মার্কেট", area: "ঢাকা", price: 74, updated: "সকাল ৯:১০" },
      { name: "জিন্দাবাজার", area: "সিলেট", price: 72, updated: "সকাল ৯:২০" },
    ],
  },
  {
    id: "2",
    slug: "potato",
    name: "আলু",
    category: "sobji",
    categoryName: "সবজি",
    price: 35,
    minPrice: 30,
    maxPrice: 40,
    change: -3.2,
    unit: "প্রতি কেজি",
    emoji: "🥔",
    description: "দেশি আলুর আজকের বাজারদর।",
    markets: [
      { name: "কারওয়ান বাজার", area: "ঢাকা", price: 32, updated: "সকাল ৮:৩০" },
      { name: "নিউ মার্কেট", area: "ঢাকা", price: 36, updated: "সকাল ৯:১০" },
      { name: "জিন্দাবাজার", area: "সিলেট", price: 37, updated: "সকাল ৯:২০" },
    ],
  },
  {
    id: "3",
    slug: "onion",
    name: "পেঁয়াজ",
    category: "sobji",
    categoryName: "সবজি",
    price: 68,
    minPrice: 60,
    maxPrice: 75,
    change: 4.4,
    unit: "প্রতি কেজি",
    emoji: "🧅",
    description: "দেশি পেঁয়াজের সর্বশেষ আনুমানিক দাম।",
    markets: [
      { name: "কারওয়ান বাজার", area: "ঢাকা", price: 64, updated: "সকাল ৮:৩০" },
      { name: "নিউ মার্কেট", area: "ঢাকা", price: 70, updated: "সকাল ৯:১০" },
      { name: "জিন্দাবাজার", area: "সিলেট", price: 69, updated: "সকাল ৯:২০" },
    ],
  },
  {
    id: "4",
    slug: "green-chili",
    name: "কাঁচা মরিচ",
    category: "sobji",
    categoryName: "সবজি",
    price: 90,
    minPrice: 80,
    maxPrice: 110,
    change: 7.8,
    unit: "প্রতি কেজি",
    emoji: "🌶️",
    description: "তাজা কাঁচা মরিচের বাজারদর।",
    markets: [
      { name: "কারওয়ান বাজার", area: "ঢাকা", price: 85, updated: "সকাল ৮:৩০" },
      { name: "নিউ মার্কেট", area: "ঢাকা", price: 95, updated: "সকাল ৯:১০" },
      { name: "জিন্দাবাজার", area: "সিলেট", price: 90, updated: "সকাল ৯:২০" },
    ],
  },
  {
    id: "5",
    slug: "broiler-chicken",
    name: "ব্রয়লার মুরগি",
    category: "mach-mangsho",
    categoryName: "মাছ ও মাংস",
    price: 190,
    minPrice: 180,
    maxPrice: 205,
    change: -1.8,
    unit: "প্রতি কেজি",
    emoji: "🍗",
    description: "খুচরা বাজারে ব্রয়লার মুরগির আনুমানিক দাম।",
    markets: [
      { name: "কারওয়ান বাজার", area: "ঢাকা", price: 185, updated: "সকাল ৮:৩০" },
      { name: "নিউ মার্কেট", area: "ঢাকা", price: 195, updated: "সকাল ৯:১০" },
      { name: "জিন্দাবাজার", area: "সিলেট", price: 190, updated: "সকাল ৯:২০" },
    ],
  },
  {
    id: "6",
    slug: "hilsa-fish",
    name: "ইলিশ মাছ",
    category: "mach-mangsho",
    categoryName: "মাছ ও মাংস",
    price: 1250,
    minPrice: 1100,
    maxPrice: 1500,
    change: 2.9,
    unit: "প্রতি কেজি",
    emoji: "🐟",
    description: "আকার ও মানভেদে ইলিশ মাছের দাম ভিন্ন হতে পারে।",
    markets: [
      { name: "কারওয়ান বাজার", area: "ঢাকা", price: 1200, updated: "সকাল ৮:৩০" },
      { name: "নিউ মার্কেট", area: "ঢাকা", price: 1300, updated: "সকাল ৯:১০" },
      { name: "জিন্দাবাজার", area: "সিলেট", price: 1250, updated: "সকাল ৯:২০" },
    ],
  },
  {
    id: "7",
    slug: "eggs",
    name: "ডিম",
    category: "dim-dudh",
    categoryName: "ডিম ও দুধ",
    price: 145,
    minPrice: 135,
    maxPrice: 155,
    change: -0.8,
    unit: "প্রতি ডজন",
    emoji: "🥚",
    description: "ফার্মের মুরগির ডিমের ডজনপ্রতি দাম।",
    markets: [
      { name: "কারওয়ান বাজার", area: "ঢাকা", price: 140, updated: "সকাল ৮:৩০" },
      { name: "নিউ মার্কেট", area: "ঢাকা", price: 150, updated: "সকাল ৯:১০" },
      { name: "জিন্দাবাজার", area: "সিলেট", price: 145, updated: "সকাল ৯:২০" },
    ],
  },
  {
    id: "8",
    slug: "soybean-oil",
    name: "সয়াবিন তেল",
    category: "tel-moshla",
    categoryName: "তেল ও মসলা",
    price: 170,
    minPrice: 165,
    maxPrice: 180,
    change: 0,
    unit: "প্রতি লিটার",
    emoji: "🫙",
    description: "বোতলজাত সয়াবিন তেলের খুচরা দাম।",
    markets: [
      { name: "কারওয়ান বাজার", area: "ঢাকা", price: 168, updated: "সকাল ৮:৩০" },
      { name: "নিউ মার্কেট", area: "ঢাকা", price: 172, updated: "সকাল ৯:১০" },
      { name: "জিন্দাবাজার", area: "সিলেট", price: 170, updated: "সকাল ৯:২০" },
    ],
  },
  {
    id: "9",
    slug: "lentils",
    name: "মসুর ডাল",
    category: "chal",
    categoryName: "চাল ও ডাল",
    price: 120,
    minPrice: 110,
    maxPrice: 130,
    change: 1.3,
    unit: "প্রতি কেজি",
    emoji: "🫘",
    description: "দেশি ও আমদানিকৃত মসুর ডালের গড় দাম।",
    markets: [
      { name: "কারওয়ান বাজার", area: "ঢাকা", price: 115, updated: "সকাল ৮:৩০" },
      { name: "নিউ মার্কেট", area: "ঢাকা", price: 125, updated: "সকাল ৯:১০" },
      { name: "জিন্দাবাজার", area: "সিলেট", price: 120, updated: "সকাল ৯:২০" },
    ],
  },
  {
    id: "10",
    slug: "tomato",
    name: "টমেটো",
    category: "sobji",
    categoryName: "সবজি",
    price: 55,
    minPrice: 45,
    maxPrice: 65,
    change: -2.5,
    unit: "প্রতি কেজি",
    emoji: "🍅",
    description: "মৌসুমি টমেটোর বাজারদর।",
    markets: [
      { name: "কারওয়ান বাজার", area: "ঢাকা", price: 50, updated: "সকাল ৮:৩০" },
      { name: "নিউ মার্কেট", area: "ঢাকা", price: 60, updated: "সকাল ৯:১০" },
      { name: "জিন্দাবাজার", area: "সিলেট", price: 55, updated: "সকাল ৯:২০" },
    ],
  },
  {
    id: "11",
    slug: "garlic",
    name: "রসুন",
    category: "tel-moshla",
    categoryName: "তেল ও মসলা",
    price: 210,
    minPrice: 190,
    maxPrice: 230,
    change: 3.5,
    unit: "প্রতি কেজি",
    emoji: "🧄",
    description: "দেশি ও আমদানিকৃত রসুনের আনুমানিক দাম।",
    markets: [
      { name: "কারওয়ান বাজার", area: "ঢাকা", price: 200, updated: "সকাল ৮:৩০" },
      { name: "নিউ মার্কেট", area: "ঢাকা", price: 220, updated: "সকাল ৯:১০" },
      { name: "জিন্দাবাজার", area: "সিলেট", price: 210, updated: "সকাল ৯:২০" },
    ],
  },
  {
    id: "12",
    slug: "ginger",
    name: "আদা",
    category: "tel-moshla",
    categoryName: "তেল ও মসলা",
    price: 230,
    minPrice: 210,
    maxPrice: 250,
    change: -1.2,
    unit: "প্রতি কেজি",
    emoji: "🫚",
    description: "রান্নায় ব্যবহৃত আদার বাজারদর।",
    markets: [
      { name: "কারওয়ান বাজার", area: "ঢাকা", price: 220, updated: "সকাল ৮:৩০" },
      { name: "নিউ মার্কেট", area: "ঢাকা", price: 240, updated: "সকাল ৯:১০" },
      { name: "জিন্দাবাজার", area: "সিলেট", price: 230, updated: "সকাল ৯:২০" },
    ],
  },
];

const bnDigits = (value: string | number) =>
  String(value).replace(/[০-৯]/g, (d) => String("০১২৩৪৫৬৭৮৯".indexOf(d)));
const numeric = (v: unknown, fallbackValue = 0) => {
  if (typeof v === "number" && Number.isFinite(v)) return v;
  if (typeof v === "string") {
    const n = Number(bnDigits(v).replace(/[^\d.-]/g, ""));
    return Number.isFinite(n) ? n : fallbackValue;
  }
  return fallbackValue;
};
const text = (...values: unknown[]) => {
  const found = values.find((v) => typeof v === "string" && v.trim());
  return found ? String(found) : "";
};
const emojiFor = (name: string) =>
  /চাল|rice/i.test(name)
    ? "🍚"
    : /ডাল|lentil/i.test(name)
      ? "🫘"
      : /আলু|potato/i.test(name)
        ? "🥔"
        : /পেঁয়াজ|onion/i.test(name)
          ? "🧅"
          : /মরিচ|chili/i.test(name)
            ? "🌶️"
            : /মাছ|fish/i.test(name)
              ? "🐟"
              : /মুরগি|chicken/i.test(name)
                ? "🍗"
                : /ডিম|egg/i.test(name)
                  ? "🥚"
                  : /রসুন|garlic/i.test(name)
                    ? "🧄"
                    : /আদা|ginger/i.test(name)
                      ? "🫚"
                      : /তেল|oil/i.test(name)
                        ? "🫙"
                        : "🥬";
function normalize(item: Record<string, unknown>, index: number): Product {
  // The Programming Hero Bazar Dor API uses nameBn, today, and change.pct.
  const name = text(item.nameBn, item.name, item.title) || `পণ্য ${index + 1}`;
  const price = numeric(item.today ?? item.price ?? item.currentPrice, 0);
  const category = text(item.category, item.categorySlug, item.category_slug) || "others";
  const categoryName = text(item.categoryNameBn, item.categoryName, item.category_name) || category;
  const slug = text(item.slug, item.id, item._id) || String(index + 1);
  const changeObject =
    item.change && typeof item.change === "object"
      ? (item.change as Record<string, unknown>)
      : undefined;
  const change = numeric(
    changeObject?.pct ?? item.changePercent ?? item.change_percent ?? item.change,
    0,
  );
  const rawMarkets = Array.isArray(item.markets) ? (item.markets as Record<string, unknown>[]) : [];
  const markets: Product["markets"] = rawMarkets.map((market) => {
    const min = numeric(market.min, price);
    const max = numeric(market.max, min);
    return {
      name: text(market.market, market.name) || "স্থানীয় বাজার",
      area: text(market.division, market.area) || "বাংলাদেশ",
      price: min === max ? min : Math.round((min + max) / 2),
      updated: "আজকের তথ্য",
    };
  });
  const marketMins = rawMarkets
    .map((market) => numeric(market.min, Number.NaN))
    .filter(Number.isFinite);
  const marketMaxes = rawMarkets
    .map((market) => numeric(market.max, Number.NaN))
    .filter(Number.isFinite);
  const unitLabels: Record<string, string> = {
    kg: "প্রতি কেজি",
    g: "প্রতি গ্রাম",
    litre: "প্রতি লিটার",
    liter: "প্রতি লিটার",
    piece: "প্রতি পিস",
    dozen: "প্রতি ডজন",
  };

  return {
    id: String(item.id ?? item._id ?? slug),
    slug,
    name,
    category,
    categoryName,
    price,
    minPrice: numeric(
      item.minPrice ?? item.min_price,
      marketMins.length ? Math.min(...marketMins) : price,
    ),
    maxPrice: numeric(
      item.maxPrice ?? item.max_price,
      marketMaxes.length ? Math.max(...marketMaxes) : price,
    ),
    change,
    unit: unitLabels[text(item.unit).toLowerCase()] || text(item.unit) || "প্রতি কেজি",
    emoji: text(item.image, item.emoji, item.icon) || emojiFor(name),
    description: text(item.description, item.summary) || `${name} এর আজকের বাজারদর।`,
    markets: markets.length ? markets : [],
  };
}
export async function getProducts(): Promise<Product[]> {
  for (const endpoint of [`${BASE_URL}/products`]) {
    try {
      const response = await fetch(endpoint, {
        next: { revalidate: 300 },
        signal: AbortSignal.timeout(5000),
      });
      if (!response.ok) continue;
      const payload: unknown = await response.json();
      const unwrapList = (value: unknown): unknown[] | null => {
        if (Array.isArray(value)) return value;
        if (!value || typeof value !== "object") return null;
        const record = value as Record<string, unknown>;
        for (const key of ["products", "data", "result", "items"]) {
          const nested = record[key];
          if (Array.isArray(nested)) return nested;
          if (nested && typeof nested === "object") {
            const deeper = unwrapList(nested);
            if (deeper) return deeper;
          }
        }
        return null;
      };
      const list = unwrapList(payload);
      if (list?.length)
        return list.map((product, index) => normalize(product as Record<string, unknown>, index));
    } catch (error) {
      console.error("Bazar Dor API request failed:", error);
    }
  }
  console.error("Bazar Dor API returned no recognized product list; showing demo fallback data.");
  return fallback;
}
export async function getCategories() {
  const products = await getProducts();
  const map = new Map<string, { slug: string; name: string; emoji: string }>();
  products.forEach((p) => {
    if (!map.has(p.category))
      map.set(p.category, {
        slug: p.category,
        name: p.categoryName,
        emoji: /চাল|ডাল/.test(p.categoryName)
          ? "🌾"
          : /মাছ|মাংস/.test(p.categoryName)
            ? "🐟"
            : /ডিম|দুধ/.test(p.categoryName)
              ? "🥚"
              : /তেল|মসলা/.test(p.categoryName)
                ? "🧂"
                : "🥬",
      });
  });
  return [...map.values()];
}
export function formatBengaliNumber(value: number, digits = 0) {
  return new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  }).format(value);
}
