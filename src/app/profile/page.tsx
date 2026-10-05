"use client";

import { LogOut, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";

export default function Profile() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [htmlContent, setHtmlContent] = useState("");

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const loadAndCompileTemplate = async () => {
    setLoading(true);
    // 1. Get user data
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push("/login");
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    const fullName = profile?.full_name || user.user_metadata.full_name || "Developer";
    
    // Extract github username
    const extractUsername = (url: string | null) => {
      if (!url) return "";
      const parts = url.split('/').filter(Boolean);
      return parts[parts.length - 1] || "";
    };
    
    const ghUsername = extractUsername(profile?.github);

    // 2. Fetch the base HTML template
    const res = await fetch("/portfolio-profile.html?t=" + Date.now());
    let html = await res.text();

    // Fix relative paths in srcDoc by injecting a base tag
    const baseUrl = window.location.origin + "/";
    html = html.replace("<head>", `<head>\n  <base href="${baseUrl}" />`);

    // 3. Compile the template (Server-side simulation via SrcDoc)
    html = html.replace(/Yash B Koparde/gi, fullName);
    html = html.replace(/YASH B KOPARDE/g, fullName.toUpperCase());
    html = html.replace(/Yash Koparde/gi, fullName);
    
    // Handle GitHub username globally to prevent fetching Yash's repos for other users
    const finalGh = ghUsername || "NoGithubProvided";
    html = html.replace(/yashkoparde/g, finalGh);

    // Replace the avatar explicitly
    if (ghUsername) {
      html = html.replace(/https:\/\/avatars\.githubusercontent\.com\/u\/231705073\?v=4/g, `https://github.com/${ghUsername}.png`);
    } else {
      html = html.replace(/https:\/\/avatars\.githubusercontent\.com\/u\/231705073\?v=4/g, `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=random`);
    }

    // PREVENT the template's built-in JavaScript from overwriting our injected Full Name and Title
    html = html.replace(/document\.getElementById\('user-name'\)\.innerText = [^;]+;/g, "");
    html = html.replace(/document\.getElementById\('user-handle'\)\.innerText = [^;]+;/g, "");
    html = html.replace(/document\.getElementById\('user-bio'\)\.innerText = [^;]+;/g, "");

    // Replace Hackathons grid for non-Yash users
    if (user.email !== 'yashkoparde2022@gmail.com') {
      html = html.replace(/<div id="hackathons-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">[\s\S]*?<\/div>/g,
        `<div id="hackathons-grid" class="flex flex-col items-center justify-center p-12 border border-dashed border-gray-800 rounded-2xl w-full">
           <p class="text-gray-500 font-mono text-sm mb-4">No hackathons added yet.</p>
           <button class="px-4 py-2 bg-indigo-600/80 text-white rounded text-xs font-bold transition hover:bg-indigo-500" onclick="alert('Hackathon editor coming soon!')">+ ADD HACKATHON</button>
         </div>`);
         
      // Disable the data/hackathons.js script
      html = html.replace(/<script src="data\/hackathons\.js"><\/script>/g, "");
    }

    // Handle LeetCode
    if (profile?.leetcode) {
      const lcUrl = profile.leetcode.includes('http') ? profile.leetcode : `https://${profile.leetcode}`;
      html = html.replace(/href="https:\/\/leetcode\.com\/u\/[^"]+"/g, `href="${lcUrl}"`);
    } else {
      html = html.replace(/href="https:\/\/leetcode\.com\/u\/[^"]+"/g, `href="#"`);
    }

    // Handle Codeforces
    if (profile?.codeforces) {
      const cfUrl = profile.codeforces.includes('http') ? profile.codeforces : `https://${profile.codeforces}`;
      html = html.replace(/href="https:\/\/codeforces\.com\/profile\/[^"]+"/g, `href="${cfUrl}"`);
    } else {
      html = html.replace(/href="https:\/\/codeforces\.com\/profile\/[^"]+"/g, `href="#"`);
    }
    
    // Replace "President at Invictus" if not Yash
    if (!user.email?.includes('yashkoparde2022')) {
      html = html.replace(/President at Invictus/g, "Invictus Member");
    }

    setHtmlContent(html);
    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadAndCompileTemplate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-black">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#FFD60A]/30 border-t-[#FFD60A] rounded-full animate-spin" />
          <p className="text-gray-400 text-sm font-bold tracking-widest uppercase animate-pulse">Compiling Custom Template...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="relative w-full h-screen bg-black overflow-hidden font-sans">
      {/* Floating Action Buttons overlaid on the iframe */}
      <div className="absolute top-6 right-6 z-40 flex items-center gap-4">
        <button 
          onClick={() => router.push("/")}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-black border border-gray-800 text-white rounded hover:bg-gray-900 transition-colors shadow-xl"
        >
          <ArrowLeft size={16} />
          <span className="text-xs font-bold tracking-widest hidden sm:block">HOME</span>
        </button>
        <button 
          onClick={handleSignOut}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-[#D90429] text-white rounded hover:bg-[#b00220] transition-colors shadow-xl"
        >
          <LogOut size={16} />
          <span className="text-xs font-bold tracking-widest hidden sm:block">SIGN OUT</span>
        </button>
        <button 
          onClick={() => router.push("/create-profile")}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-[#FFD60A]/80 text-black rounded hover:bg-[#FFD60A] transition-colors shadow-xl"
        >
          Edit Socials
        </button>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="w-full h-full">
        <iframe 
          srcDoc={htmlContent}
          className="w-full h-full border-none"
          title="Invictus Profile"
        />
      </motion.div>
    </main>
  );
}
