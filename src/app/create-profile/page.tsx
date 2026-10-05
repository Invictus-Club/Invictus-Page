/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Mail, Lock, User, Code, Activity } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function CreateProfile() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [leetcode, setLeetcode] = useState("");
  const [codeforces, setCodeforces] = useState("");
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setError(null);

    try {
      let userId = null;
      
      // Check if user is already logged in
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        // User is already logged in, just update their profile
        userId = session.user.id;
      } else {
        // 1. Sign up the user
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              username: username.toLowerCase().replace(/[^a-z0-9]/g, ''),
              github: github,
              linkedin: linkedin,
              leetcode: leetcode,
              codeforces: codeforces
            }
          }
        });

        if (authError) throw authError;
        
        const user = authData.user;
        if (!user) throw new Error("No user returned from signup.");
        userId = user.id;
      }

      // 2. Upsert profile data directly from frontend
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: userId,
          full_name: fullName,
          username: username.toLowerCase().replace(/[^a-z0-9]/g, ''),
          github: github || 'NoGithubProvided',
          linkedin: linkedin,
          leetcode: leetcode,
          codeforces: codeforces,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'id'
        });

      if (profileError) {
        console.error("Profile upsert error:", profileError);
        // We won't throw here to not break the flow, but it should succeed if RLS allows it.
      }

      // 3. Fake delay for "Building Profile..."
      await new Promise(resolve => setTimeout(resolve, 2000));

      // 4. Redirect to their custom site
      router.push("/profile");
      
    } catch (err: any) {
      setError(err.message || "An error occurred during account creation.");
      setIsGenerating(false);
    }
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center p-4 bg-black overflow-hidden font-sans py-20">
      <div className="w-full max-w-2xl z-10 space-y-6">
        <Link href="/" className="text-gray-400 hover:text-white transition flex items-center gap-2 group w-fit">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full bg-[#050505] border border-gray-800 p-8 sm:p-10 shadow-2xl"
        >
          <div className="mb-8">
            <h2 className="text-3xl font-black text-white mb-2 flex items-center gap-3 uppercase tracking-tighter">
              <ShieldCheck className="text-[#FFD60A]" size={32} />
              Join the Movement
            </h2>
            <p className="text-sm text-gray-500 font-medium">
              Create your account and link your identities to auto-generate your elite developer dashboard.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3 border border-[#D90429]/50 bg-[#D90429]/10 text-[#D90429] text-xs font-bold rounded">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleGenerate}>
            
            {/* Account Details */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold tracking-widest text-gray-400 border-b border-gray-800 pb-2">ACCOUNT DETAILS</h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                    <input type="text" placeholder="John Doe" value={fullName} onChange={(e) => setFullName(e.target.value)} required className="w-full pl-10 pr-4 py-3 bg-black border border-gray-800 text-sm focus:outline-none focus:border-[#FFD60A] text-gray-200 transition-colors" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Claim your URL (Username)</label>
                  <div className="relative flex items-center">
                    <span className="absolute left-4 text-gray-500 text-sm font-medium">vtuinvictus.com/p/</span>
                    <input type="text" placeholder="johndoe" value={username} onChange={(e) => setUsername(e.target.value)} required className="w-full pl-36 pr-4 py-3 bg-black border border-gray-800 text-sm focus:outline-none focus:border-[#FFD60A] text-[#FFD60A] font-bold transition-colors" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                    <input type="email" placeholder="developer@invictus.club" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full pl-10 pr-4 py-3 bg-black border border-gray-800 text-sm focus:outline-none focus:border-[#FFD60A] text-gray-200 transition-colors" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                    <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full pl-10 pr-4 py-3 bg-black border border-gray-800 text-sm focus:outline-none focus:border-[#FFD60A] text-gray-200 transition-colors" />
                  </div>
                </div>
              </div>
            </div>

            {/* Developer Links */}
            <div className="space-y-4 pt-4">
              <h3 className="text-xs font-bold tracking-widest text-gray-400 border-b border-gray-800 pb-2">DEVELOPER LINKS</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">GitHub Link</label>
                  <div className="relative">
                    <FaGithub className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                    <input type="text" placeholder="github.com/yashkoparde" value={github} onChange={(e) => setGithub(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-black border border-gray-800 text-sm focus:outline-none focus:border-[#FFD60A] text-gray-200 transition-colors" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">LinkedIn Link</label>
                  <div className="relative">
                    <FaLinkedin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                    <input type="text" placeholder="linkedin.com/in/yash-koparde" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-black border border-gray-800 text-sm focus:outline-none focus:border-[#FFD60A] text-gray-200 transition-colors" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">LeetCode Link</label>
                  <div className="relative">
                    <Code className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                    <input type="text" placeholder="leetcode.com/yashkoparde" value={leetcode} onChange={(e) => setLeetcode(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-black border border-gray-800 text-sm focus:outline-none focus:border-[#FFD60A] text-gray-200 transition-colors" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Codeforces Link</label>
                  <div className="relative">
                    <Activity className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                    <input type="text" placeholder="codeforces.com/profile/yashkoparde" value={codeforces} onChange={(e) => setCodeforces(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-black border border-gray-800 text-sm focus:outline-none focus:border-[#FFD60A] text-gray-200 transition-colors" />
                  </div>
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isGenerating}
              className="w-full py-4 mt-6 bg-[#FFD60A] text-black font-bold tracking-widest text-sm transition-colors hover:bg-white disabled:opacity-50 relative flex items-center justify-center overflow-hidden"
            >
              {isGenerating ? (
                <>
                  <div className="absolute inset-0 bg-[#FFD60A] flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin mr-3" />
                    BUILDING PROFILE...
                  </div>
                </>
              ) : (
                "CREATE CUSTOM SITE"
              )}
            </button>
          </form>
          
          <p className="mt-8 text-center text-sm text-gray-500 font-medium">
            Already have an account? <Link href="/login" className="text-white hover:text-[#FFD60A] font-bold transition-colors">Sign In</Link>
          </p>
        </motion.div>
      </div>
    </main>
  );
}
