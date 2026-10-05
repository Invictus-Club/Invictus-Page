"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PublicProfile() {
  const params = useParams();
  const username = params.username as string;
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    async function fetchAndCompile() {
      if (!username) return;
      
      // 1. Fetch profile by username
      const { data: profile, error: dbError } = await supabase
        .from("profiles")
        .select("*")
        .eq("username", username)
        .single();

      if (dbError || !profile) {
        setError("Developer profile not found or username is invalid.");
        setLoading(false);
        return;
      }

      const fullName = profile.full_name || "Invictus Developer";
      
      const extractUsername = (url: string | null) => {
        if (!url) return "";
        const parts = url.split('/').filter(Boolean);
        return parts[parts.length - 1] || "";
      };
      
      const ghUsername = extractUsername(profile.github);

      // 2. Fetch the HTML template
      const res = await fetch("/portfolio-profile.html?t=" + Date.now());
      let html = await res.text();

      // Fix relative paths
      const baseUrl = window.location.origin + "/";
      html = html.replace("<head>", `<head>\n  <base href="${baseUrl}" />`);

      // 3. Compile the template
      html = html.replace(/Yash B Koparde/gi, fullName);
      html = html.replace(/YASH B KOPARDE/g, fullName.toUpperCase());
      html = html.replace(/Yash Koparde/gi, fullName);
      
      const finalGh = ghUsername || "NoGithubProvided";
      html = html.replace(/yashkoparde/g, finalGh);

      // Avatar
      if (ghUsername) {
        html = html.replace(/https:\/\/avatars\.githubusercontent\.com\/u\/231705073\?v=4/g, `https://github.com/${ghUsername}.png`);
      } else {
        html = html.replace(/https:\/\/avatars\.githubusercontent\.com\/u\/231705073\?v=4/g, `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=random`);
      }

      // PREVENT template's built-in JavaScript from overwriting
      html = html.replace(/document\.getElementById\('user-name'\)\.innerText = [^;]+;/g, "");
      html = html.replace(/document\.getElementById\('user-handle'\)\.innerText = [^;]+;/g, "");
      html = html.replace(/document\.getElementById\('user-bio'\)\.innerText = [^;]+;/g, "");

      // Replace Hackathons grid for non-Yash users
      if (username !== 'yashkoparde') {
        html = html.replace(/<div id="hackathons-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">[\s\S]*?<\/div>/g,
          `<div id="hackathons-grid" class="flex flex-col items-center justify-center p-12 border border-dashed border-gray-800 rounded-2xl w-full">
             <p class="text-gray-500 font-mono text-sm mb-4">No hackathons added yet.</p>
             <button class="px-4 py-2 bg-indigo-600/80 text-white rounded text-xs font-bold transition hover:bg-indigo-500">+ ADD HACKATHON</button>
           </div>`);
           
        // Disable the data/hackathons.js script
        html = html.replace(/<script src="data\/hackathons\.js"><\/script>/g, "");
      }

      // Handle LeetCode
      if (profile.leetcode) {
        const lcUrl = profile.leetcode.includes('http') ? profile.leetcode : `https://${profile.leetcode}`;
        html = html.replace(/href="https:\/\/leetcode\.com\/u\/[^"]+"/g, `href="${lcUrl}"`);
      } else {
        html = html.replace(/href="https:\/\/leetcode\.com\/u\/[^"]+"/g, `href="#"`);
      }

      // Handle Codeforces
      if (profile.codeforces) {
        const cfUrl = profile.codeforces.includes('http') ? profile.codeforces : `https://${profile.codeforces}`;
        html = html.replace(/href="https:\/\/codeforces\.com\/profile\/[^"]+"/g, `href="${cfUrl}"`);
      } else {
        html = html.replace(/href="https:\/\/codeforces\.com\/profile\/[^"]+"/g, `href="#"`);
      }
      
      // We don't have email in public profile, so assume not President
      html = html.replace(/President at Invictus/g, "Invictus Member");

      setHtmlContent(html);
      setLoading(false);
    }

    fetchAndCompile();
  }, [username]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-black">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#FFD60A]/30 border-t-[#FFD60A] rounded-full animate-spin" />
          <p className="text-gray-400 text-sm font-bold tracking-widest uppercase animate-pulse">Loading Profile...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-black p-4 text-center">
        <div className="w-16 h-16 bg-[#D90429]/10 text-[#D90429] flex items-center justify-center rounded-full mb-6">
          <span className="text-2xl font-black">!</span>
        </div>
        <h1 className="text-3xl font-black text-white tracking-tighter uppercase mb-4">Profile Not Found</h1>
        <p className="text-gray-500 mb-8">{error}</p>
        <Link href="/">
          <button className="bg-[#FFD60A] text-black px-6 py-3 text-sm font-bold tracking-widest hover:bg-white transition-colors">
            RETURN HOME
          </button>
        </Link>
      </main>
    );
  }

  return (
    <main className="relative w-full h-screen bg-black overflow-hidden">
      {/* Floating Action Button */}
      <div className="absolute top-6 right-6 z-40">
        <Link href="/">
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-black border border-gray-800 text-white rounded hover:bg-gray-900 transition-colors shadow-xl">
            <ArrowLeft size={16} />
            <span className="text-xs font-bold tracking-widest hidden sm:block">INVICTUS HOME</span>
          </button>
        </Link>
      </div>

      <iframe 
        srcDoc={htmlContent}
        className="w-full h-full border-none"
        title={`${username}'s Profile`}
      />
    </main>
  );
}
