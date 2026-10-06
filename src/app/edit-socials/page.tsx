"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Code, Activity } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function EditSocials() {
  const router = useRouter();
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [leetcode, setLeetcode] = useState("");
  const [codeforces, setCodeforces] = useState("");
  
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    async function loadProfile() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        router.push("/login");
        return;
      }
      setUserId(session.user.id);
      
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();
        
      if (profile) {
        setGithub(profile.github || "");
        setLinkedin(profile.linkedin || "");
        setLeetcode(profile.leetcode || "");
        setCodeforces(profile.codeforces || "");
      }
      setLoading(false);
    }
    loadProfile();
  }, [router]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;
    
    setIsUpdating(true);
    setError(null);

    try {
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          github: github,
          linkedin: linkedin,
          leetcode: leetcode,
          codeforces: codeforces,
          updated_at: new Date().toISOString()
        })
        .eq("id", userId);

      if (profileError) {
        throw profileError;
      }

      router.push("/profile");
      
    } catch (err: any) {
      setError(err.message || "An error occurred during update.");
      setIsUpdating(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-black">
        <div className="w-12 h-12 border-4 border-[#FFD60A]/30 border-t-[#FFD60A] rounded-full animate-spin" />
      </main>
    );
  }

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center p-4 bg-black overflow-hidden font-sans py-20">
      <div className="w-full max-w-2xl z-10 space-y-6">
        <Link href="/profile" className="text-gray-400 hover:text-white transition flex items-center gap-2 group w-fit">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Profile</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full bg-[#050505] border border-gray-800 p-6 sm:p-10 shadow-2xl rounded-2xl sm:rounded-none"
        >
          <div className="mb-6 sm:mb-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tighter">
              Edit Socials
            </h2>
          </div>

          {error && (
            <div className="mb-6 p-3 border border-[#D90429]/50 bg-[#D90429]/10 text-[#D90429] text-xs font-bold rounded">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleUpdate}>
            <div className="space-y-4">
              <h3 className="text-xs font-bold tracking-widest text-gray-400 border-b border-gray-800 pb-2">DEVELOPER LINKS</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">GitHub Link / Username</label>
                  <div className="relative">
                    <FaGithub className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                    <input type="text" placeholder="github.com/username" value={github} onChange={(e) => setGithub(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-black border border-gray-800 text-sm focus:outline-none focus:border-[#FFD60A] text-gray-200 transition-colors" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">LinkedIn Link</label>
                  <div className="relative">
                    <FaLinkedin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                    <input type="text" placeholder="linkedin.com/in/username" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-black border border-gray-800 text-sm focus:outline-none focus:border-[#FFD60A] text-gray-200 transition-colors" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">LeetCode Link</label>
                  <div className="relative">
                    <Code className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                    <input type="text" placeholder="leetcode.com/username" value={leetcode} onChange={(e) => setLeetcode(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-black border border-gray-800 text-sm focus:outline-none focus:border-[#FFD60A] text-gray-200 transition-colors" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Codeforces Link</label>
                  <div className="relative">
                    <Activity className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                    <input type="text" placeholder="codeforces.com/profile/username" value={codeforces} onChange={(e) => setCodeforces(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-black border border-gray-800 text-sm focus:outline-none focus:border-[#FFD60A] text-gray-200 transition-colors" />
                  </div>
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isUpdating}
              className="w-full py-4 mt-6 bg-[#FFD60A] text-black font-bold tracking-widest text-sm transition-colors hover:bg-white disabled:opacity-50 flex items-center justify-center"
            >
              {isUpdating ? "UPDATING..." : "SAVE SOCIALS"}
            </button>
          </form>
        </motion.div>
      </div>
    </main>
  );
}
