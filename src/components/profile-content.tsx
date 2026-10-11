"use client";
import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
export default function ProfileContent() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  useEffect(() => {
    if (!isPending && !session) {
      toast.error("প্রোফাইল দেখতে সাইন ইন করুন");
      router.replace("/signin?callbackURL=%2Fprofile");
    }
  }, [isPending, session, router]);
  if (isPending || !session) return <div className="page-loading">প্রোফাইল লোড হচ্ছে…</div>;
  return (
    <section className="profile-page wrap">
      <span className="section-kicker">YOUR ACCOUNT</span>
      <h1>আমার প্রোফাইল</h1>
      <p className="profile-subtitle">আপনার অ্যাকাউন্টের তথ্য দেখুন ও আপডেট করুন।</p>
      <div className="profile-card">
        <div className="profile-avatar">{session.user.name?.charAt(0).toUpperCase() || "ব"}</div>
        <div className="profile-details">
          <span>নাম</span>
          <strong>{session.user.name}</strong>
          <span>ইমেইল</span>
          <strong>{session.user.email}</strong>
          <span>অ্যাকাউন্ট</span>
          <strong className="verified-status">● সক্রিয়</strong>
        </div>
        <Link href="/profile/update" className="btn btn-primary">
          তথ্য আপডেট করুন ↗
        </Link>
      </div>
    </section>
  );
}
