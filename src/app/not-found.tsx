import Link from "next/link";
export default function NotFound() {
  return (
    <section className="not-found wrap">
      <span className="not-found-code">৪০৪</span>
      <div className="not-found-emoji">🧺</div>
      <h1>পাতাটি খুঁজে পাওয়া যায়নি</h1>
      <p>আপনি যে পৃষ্ঠাটি খুঁজছেন সেটি সরানো হয়েছে অথবা ঠিকানাটি ভুল।</p>
      <Link href="/" className="btn btn-primary btn-large">
        হোম পেজে ফিরে যান ↗
      </Link>
    </section>
  );
}
