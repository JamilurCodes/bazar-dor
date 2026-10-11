"use client";
import Link from "next/link";
import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function AuthForm({ mode }: { mode: "signin" | "signup" }) {
  const isSignup = mode === "signup";
  const router = useRouter();
  const params = useSearchParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
      return;
    }
    setBusy(true);
    try {
      const result = isSignup
        ? await authClient.signUp.email({ name: name.trim(), email: email.trim(), password })
        : await authClient.signIn.email({ email: email.trim(), password });
      if (result.error) {
        toast.error(result.error.message || "অনুরোধটি সম্পন্ন করা যায়নি");
        return;
      }
      toast.success(
        isSignup ? "অ্যাকাউন্ট তৈরি হয়েছে! এখন সাইন ইন করুন।" : "সফলভাবে সাইন ইন হয়েছে",
      );
      router.push(isSignup ? "/signin" : params.get("callbackURL") || "/");
      router.refresh();
    } catch {
      toast.error("সংযোগে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setBusy(false);
    }
  }
  async function social(provider: "google" | "github") {
    setBusy(true);
    try {
      const result = await authClient.signIn.social({
        provider,
        callbackURL: params.get("callbackURL") || "/",
      });
      if (result.error) toast.error(result.error.message || `${provider} দিয়ে সাইন ইন করা যায়নি`);
    } catch {
      toast.error("এই সামাজিক লগইনটি চালু করতে .env.local-এ OAuth credentials যোগ করুন");
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="auth-layout">
      <div className="auth-aside">
        <Link href="/" className="brand auth-brand">
          <span className="brand-mark">🛒</span>
          <span>
            <strong>বাজার দর</strong>
            <small>সচেতন কেনাকাটার সহজ ঠিকানা</small>
          </span>
        </Link>
        <div className="auth-aside-copy">
          <span className="section-kicker">SMARTER EVERYDAY SHOPPING</span>
          <h1>
            বাজারের সঠিক
            <br />
            <span>সিদ্ধান্ত শুরু</span>
            <br />
            হয় এখানেই।
          </h1>
          <p>আজকের বাজারদর জানুন, একাধিক বাজারের দাম তুলনা করুন।</p>
          <div className="auth-food-row">
            <span>🍚</span>
            <span>🥬</span>
            <span>🐟</span>
            <span>🥚</span>
            <span>🧅</span>
          </div>
        </div>
        <p className="auth-aside-foot">বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>
      </div>
      <div className="auth-panel">
        <div className="auth-form-wrap">
          <Link href="/" className="back-link">
            ← হোম পেজে ফিরে যান
          </Link>
          <span className="section-kicker">YOUR MARKET COMPANION</span>
          <h2>{isSignup ? "নতুন অ্যাকাউন্ট তৈরি করুন" : "আবার স্বাগতম"}</h2>
          <p className="auth-intro">
            {isSignup
              ? "বাজারদরের আপডেট ও তুলনা দেখতে যোগ দিন।"
              : "আপনার অ্যাকাউন্টে সাইন ইন করে চালিয়ে যান।"}
          </p>
          <form onSubmit={submit} className="auth-form">
            {isSignup && (
              <label>
                আপনার নাম
                <input
                  required
                  minLength={2}
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="যেমন: জামিলুর রহমান"
                />
              </label>
            )}
            <label>
              ইমেইল ঠিকানা
              <input
                required
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </label>
            <label>
              পাসওয়ার্ড
              <input
                required
                minLength={8}
                type="password"
                autoComplete={isSignup ? "new-password" : "current-password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="কমপক্ষে ৮ অক্ষর"
              />
            </label>
            <button className="btn btn-primary btn-large auth-submit" disabled={busy}>
              {busy
                ? "অনুগ্রহ করে অপেক্ষা করুন…"
                : isSignup
                  ? "অ্যাকাউন্ট তৈরি করুন ↗"
                  : "সাইন ইন করুন ↗"}
            </button>
          </form>
          <div className="auth-divider">
            <span />
            অথবা
            <span />
          </div>
          <div className="social-buttons">
            <button disabled={busy} onClick={() => social("google")} className="social-btn">
              <b>G</b> Google
            </button>
            <button disabled={busy} onClick={() => social("github")} className="social-btn">
              <b>⌘</b> GitHub
            </button>
          </div>
          <p className="auth-switch">
            {isSignup ? "আগেই অ্যাকাউন্ট আছে?" : "নতুন এখানে?"}{" "}
            <Link href={isSignup ? "/signin" : "/signup"}>
              {isSignup ? "সাইন ইন করুন" : "অ্যাকাউন্ট তৈরি করুন"}
            </Link>
          </p>
          <p className="auth-legal">
            চালিয়ে গেলে আপনি আমাদের ব্যবহারের শর্তাবলিতে সম্মতি দিচ্ছেন।
          </p>
        </div>
      </div>
    </div>
  );
}
