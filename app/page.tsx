"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-red-100 flex flex-col items-center justify-center p-6 font-sans">
      <div className="floating-hearts" />
      
      <div className="max-w-2xl mx-auto text-center space-y-8">
        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl border-2 border-pink-200 p-8 space-y-8">
          
          {/* Header */}
          <div className="space-y-3">
            <h1 className="text-5xl md:text-7xl font-extrabold text-[#ff5fa2] drop-shadow-sm font-serif">
              Valentine Links 💖
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 font-medium">
              Create personalized valentine links for your boyfriend and girlfriend
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
            {/* Card 1 */}
            <div className="bg-gradient-to-br from-pink-50 to-red-50 p-6 rounded-2xl border border-pink-200 space-y-2">
              <div className="text-4xl mb-2">👦🏻</div>
              <h3 className="text-lg font-bold text-slate-700">For Him</h3>
              <p className="text-sm text-slate-600">Create a cute link to impress your boyfriend with personalized messages</p>
            </div>

            {/* Card 2 */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-200 space-y-2">
              <div className="text-4xl mb-2">👧🏻</div>
              <h3 className="text-lg font-bold text-slate-700">For Her</h3>
              <p className="text-sm text-slate-600">Make her smile with an interactive and romantic valentine link</p>
            </div>
          </div>

          {/* Testimonial/Quote Section */}
          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg space-y-3">
            <p className="text-lg italic font-medium text-slate-700">
              "Make Valentine's Day special with a personalized link that shows how much they mean to you! ❤️"
            </p>
            <p className="text-sm text-slate-600">- Impress your special someone today</p>
          </div>

          {/* Pricing Section */}
          <div className="text-center space-y-2 bg-gradient-to-r from-pink-50 to-red-50 p-6 rounded-2xl border-2 border-pink-200">
            <div className="flex items-center justify-center gap-4">
              <span className="text-2xl line-through text-slate-400 font-semibold">₹250</span>
              <span className="text-4xl font-extrabold text-[#ff5fa2]">₹99</span>
            </div>
            <p className="text-sm text-slate-600 font-medium">Special Offer - Get Your Link Now</p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link 
              href="/create"
              className="flex-1 bg-gradient-to-r from-[#ff5fa2] to-red-500 hover:from-[#e04f8e] hover:to-red-600 text-white font-bold py-4 px-8 rounded-2xl transition-all transform hover:scale-105 shadow-lg active:scale-95"
            >
              🎨 Create Your Link
            </Link>
            <button 
              onClick={() => window.open('https://ineffablexd.github.io/valentine/', '_blank')}
              className="flex-1 bg-white border-2 border-[#ff5fa2] text-[#ff5fa2] hover:bg-pink-50 font-bold py-4 px-8 rounded-2xl transition-all transform hover:scale-105 shadow-lg active:scale-95"
            >
              👀 See Example
            </button>
          </div>

          {/* Info Box */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg space-y-1">
            <p className="text-sm text-yellow-900 font-medium">
              ✨ <strong>Limited Time Offer:</strong> Get your personalized valentine link for just ₹99 today!
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}