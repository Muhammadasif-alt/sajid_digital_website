"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck, Loader2, Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-navy-dark relative overflow-hidden px-4">
      {/* Decorative gold glow */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-gold/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-gold/10 rounded-full blur-[100px]" />

      <div className="relative w-full max-w-md">
        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
          <div className="flex flex-col items-center mb-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="SAJAD Digital Services" className="h-20 w-auto object-contain mb-3" />
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-gold" /> Admin Login
            </h1>
            <p className="text-sm text-white/50 mt-1">Sign in to manage your website</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label className="text-white/70">Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@talentbridge.com"
                required
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-gold/50"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white/70">Password</Label>
              <div className="relative">
                <Input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢"
                  required
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-gold/50 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                >
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gold hover:bg-gold-light text-navy-dark font-semibold h-11"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign In"}
            </Button>
          </form>
        </div>

        <p className="text-center text-white/30 text-xs mt-6">
          SAJAD Digital Services Admin &middot; Authorized access only
        </p>
      </div>
    </div>
  );
}
