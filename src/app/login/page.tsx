/* eslint-disable */
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Mail, Lock } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      // Successful login
      router.push("/profile");
    } catch (err: any) {
      setError(err.message || "An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center p-4 bg-black overflow-hidden font-sans py-16">
      <Link href="/" className="absolute top-6 left-6 sm:top-8 sm:left-8 text-slate-400 hover:text-white transition flex items-center gap-2 group z-20">
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-xs sm:text-sm font-semibold">Back to Home</span>
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md p-6 sm:p-10 relative z-10 border border-gray-800 bg-[#050505] shadow-[0_0_50px_rgba(0,0,0,0.8)] rounded-2xl"
      >
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-2 uppercase tracking-tighter">Welcome Back</h2>
          <p className="text-sm text-gray-500 font-medium">Sign in to access your Invictus dashboard.</p>
        </div>

        {error && (
          <div className="mb-4 p-3 border border-[#D90429]/50 bg-[#D90429]/10 text-[#D90429] text-xs font-bold rounded">
            {error}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleLogin}>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input 
                type="email" 
                placeholder="developer@invictus.club" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 bg-black border border-gray-800 text-sm focus:outline-none focus:border-[#FFD60A] text-gray-200 placeholder-gray-700 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between ml-1">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Password</label>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input 
                type="password" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 bg-black border border-gray-800 text-sm focus:outline-none focus:border-[#FFD60A] text-gray-200 placeholder-gray-700 transition-colors"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 mt-4 bg-[#FFD60A] text-black font-bold tracking-widest text-sm transition-colors hover:bg-white disabled:opacity-50"
          >
            {loading ? "AUTHENTICATING..." : "SIGN IN"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-500 font-medium">
          New to Invictus? <Link href="/create-profile" className="text-white hover:text-[#FFD60A] font-bold transition-colors">Create Profile</Link>
        </p>
      </motion.div>
    </main>
  );
}
