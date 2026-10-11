import { Suspense } from "react";
import AuthForm from "@/components/auth-form";
export default function SignInPage(){return <Suspense fallback={<div className="page-loading">লোড হচ্ছে…</div>}><AuthForm mode="signin"/></Suspense>}
