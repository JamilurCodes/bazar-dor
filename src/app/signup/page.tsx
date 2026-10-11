import { Suspense } from "react";
import AuthForm from "@/components/auth-form";
export default function SignUpPage(){return <Suspense fallback={<div className="page-loading">লোড হচ্ছে…</div>}><AuthForm mode="signup"/></Suspense>}
