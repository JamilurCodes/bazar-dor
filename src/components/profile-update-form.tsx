"use client";
import { useEffect, useState } from "react";
import type { FormEventHandler } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function ProfileUpdateForm() {
  const { data: session, isPending } = authClient.useSession();
  const [name, setName] = useState(() => session?.user.name ?? "");
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      toast.error("তথ্য আপডেট করতে সাইন ইন করুন");
      router.replace("/signin?callbackURL=%2Fprofile%2Fupdate");
    }
  }, [isPending, session, router]);

  const currentName = name || session?.user.name || "";

  const submit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const trimmedName = currentName.trim();

    if (trimmedName.length < 2) {
      toast.error("নাম কমপক্ষে ২ অক্ষরের হতে হবে");
      return;
    }

    setBusy(true);
    try {
      const result = await authClient.updateUser({ name: trimmedName });
      if (result.error) {
        toast.error(result.error.message || "তথ্য আপডেট করা যায়নি");
        return;
      }
      toast.success("আপনার তথ্য আপডেট হয়েছে");
      router.push("/profile");
      router.refresh();
    } catch {
      toast.error("তথ্য আপডেট করা যায়নি");
    } finally {
      setBusy(false);
    }
  };

  if (isPending || !session) return <div className="page-loading">অ্যাকাউন্ট যাচাই করা হচ্ছে…</div>;

  return (
    <section className="profile-page wrap">
      <Link href="/profile" className="back-link">
        ← প্রোফাইলে ফিরে যান
      </Link>
      <span className="section-kicker">ACCOUNT SETTINGS</span>
      <h1>ব্যক্তিগত তথ্য আপডেট</h1>
      <p className="profile-subtitle">আপনার প্রোফাইলের নাম পরিবর্তন করুন।</p>
      <form className="update-card" onSubmit={submit}>
        <label>
          আপনার নাম
          <input
            value={currentName}
            onChange={(e) => setName(e.target.value)}
            required
            minLength={2}
            maxLength={80}
            placeholder="আপনার পুরো নাম"
          />
        </label>
        <p className="form-hint">এই নামটি আপনার প্রোফাইলে দেখানো হবে।</p>
        <div className="update-actions">
          <Link href="/profile" className="btn btn-outline">
            বাতিল
          </Link>
          <button className="btn btn-primary" disabled={busy}>
            {busy ? "আপডেট হচ্ছে…" : "তথ্য আপডেট করুন ↗"}
          </button>
        </div>
      </form>
    </section>
  );
}
