"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <div className="floating-hearts" />
      
      <h1 className="text-6xl md:text-8xl font-title text-red-500 mb-4 drop-shadow-sm">
        Valentine Links
      </h1>
      
      <p className="font-romantic text-2xl md:text-4xl text-pink-600 mb-12">
        Create valentine links for your boyfriend and girlfriend
      </p>

      {/* Boy Character Quote Section */}
      <div className="bg-white p-6 rounded-2xl shadow-xl border-2 border-pink-200 max-w-md relative mb-12">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-5xl">👦🏻</div>
        <p className="text-lg italic font-medium text-slate-600">
          "Hey! Impress your girlfriend by giving her a personalized link. 
          It's the cutest way to ask her out! ❤️"
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
        <Link 
          href="/create"
          className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-8 rounded-full transition-all transform hover:scale-105 shadow-lg"
        >
          Create Link
        </Link>
        <button 
          onClick={() => window.open('https://ineffablexd.github.io/valentine/', '_blank')}
          className="flex-1 bg-white border-2 border-pink-400 text-pink-500 hover:bg-pink-50 font-bold py-4 px-8 rounded-full transition-all"
        >
          See Example
        </button>
      </div>
    </main>
  );
}