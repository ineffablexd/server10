"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

const UPI_ID = "itsvsharma714-1@okicici"; // Replace with actual UPI ID
const TELEGRAM_USERNAME = "@ineffabletg";
const TELEGRAM_URL = "https://t.me/ineffabletg";
const WHATSAPP_NUMBER = "+9412314053";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=Hi, I've sent the payment proof for Valentine links. Please verify and send me my link!`;
const INSTAGRAM_USERNAME = "valentine_links";
const INSTAGRAM_URL = "https://instagram.com/valentine_links";

export default function PayPage() {
  const params = useParams();
  const userId = params.userId as string;
  const [copied, setCopied] = useState(false);

  const handleCopyUPI = () => {
    navigator.clipboard.writeText(UPI_ID);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyUserId = () => {
    navigator.clipboard.writeText(userId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-red-100 py-10 px-4 font-sans">
      <div className="max-w-2xl mx-auto">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-8">
          <h1 className="text-5xl md:text-6xl font-extrabold text-[#ff5fa2] drop-shadow-sm font-serif">
            Complete Payment 💳
          </h1>
          <p className="text-lg text-slate-700">Send proof to get your Valentine link!</p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl border-2 border-pink-200 p-8 space-y-8">
          
          {/* Pricing Section */}
          <div className="text-center space-y-2 bg-gradient-to-r from-pink-50 to-red-50 p-6 rounded-2xl border-2 border-pink-200">
            <div className="flex items-center justify-center gap-4">
              <span className="text-3xl line-through text-slate-400 font-semibold">₹250</span>
              <span className="text-4xl md:text-5xl font-extrabold text-[#ff5fa2]">₹99</span>
            </div>
            <p className="text-sm text-slate-600 font-medium">Special Offer - Pay Only</p>
          </div>
          
          {/* Payment Image Section */}
          <div className="flex justify-center">
            <img 
              src="/payment-qr.png" 
              alt="Payment QR Code" 
              className="w-64 h-64 rounded-2xl shadow-lg border-4 border-pink-100 object-cover"
            />
          </div>

          {/* UPI ID Section */}
          <div className="space-y-3 bg-gradient-to-r from-pink-50 to-red-50 p-6 rounded-2xl border border-pink-200">
            <p className="text-sm font-bold text-slate-600 uppercase tracking-wider">📱 UPI ID</p>
            <div className="flex items-center gap-3 bg-white p-4 rounded-xl border border-pink-300">
              <code className="flex-1 font-mono text-lg font-semibold text-slate-800">
                {UPI_ID}
              </code>
              <button
                onClick={handleCopyUPI}
                className="px-4 py-2 bg-[#ff5fa2] hover:bg-[#e04f8e] text-white font-bold rounded-lg transition transform hover:scale-105 active:scale-95 text-sm"
              >
                {copied ? "✓ Copied" : "Copy"}
              </button>
            </div>
          </div>

          {/* User ID Section */}
          <div className="space-y-3 bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-2xl border border-purple-200">
            <p className="text-sm font-bold text-slate-600 uppercase tracking-wider">👤 Your Folder ID</p>
            <p className="text-sm text-slate-600 mb-2">Send payment proof using this ID so we know it's you:</p>
            <div className="flex items-center gap-3 bg-white p-4 rounded-xl border border-purple-300">
              <code className="flex-1 font-mono text-lg font-semibold text-slate-800 break-all">
                {userId}
              </code>
              <button
                onClick={handleCopyUserId}
                className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-lg transition transform hover:scale-105 active:scale-95 text-sm whitespace-nowrap"
              >
                {copied ? "✓ Copied" : "Copy"}
              </button>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg space-y-3">
            <h3 className="font-bold text-lg text-blue-900">📋 Steps:</h3>
            <ol className="space-y-2 text-slate-700 list-decimal list-inside">
              <li>Take a screenshot of your payment/transaction</li>
              <li>Send it via one of the options below with your Folder ID</li>
              <li>We'll verify and send you your Valentine link!</li>
            </ol>
          </div>

          {/* Social Media Buttons */}
          <div className="space-y-4">
            <p className="text-center font-bold text-slate-700">Send payment proof to:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Telegram */}
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 active:translate-y-0"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.22-.054-.338-.373-.118l-6.87 4.32-2.96-.924c-.643-.204-.658-.643.136-.953l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                </svg>
                <span>Telegram</span>
              </a>

              {/* WhatsApp */}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 active:translate-y-0"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371 0-.57 0-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.006a6.506 6.506 0 00-6.487 6.513 6.513 6.513 0 001.143 3.852L5.031 20l4.126-1.082a6.531 6.531 0 003.138.796h.006c3.584 0 6.486-2.902 6.486-6.487 0-1.679-.667-3.258-1.775-4.425a6.47 6.47 0 00-4.595-1.914m10.929-10.55c-5.093-5.091-13.46-5.091-18.551 0C2.001 3.9 1 8.57 1 13.016s1.001 9.117 2.836 10.952c2.835 2.835 6.542 4.258 10.419 4.258 3.877 0 7.585-1.423 10.419-4.257C23.999 22.134 25 17.463 25 13.016S23.999 3.917 21.164 1.082"/>
                </svg>
                <span>WhatsApp</span>
              </a>

              {/* Instagram */}
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 hover:from-pink-600 hover:via-red-600 hover:to-yellow-600 text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 active:translate-y-0"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.266.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.322a1.44 1.44 0 110-2.881 1.44 1.44 0 010 2.881z"/>
                </svg>
                <span>Instagram</span>
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="text-center space-y-2 text-sm text-slate-600 bg-slate-50 p-4 rounded-lg border border-slate-200">
            <p><strong>Telegram:</strong> {TELEGRAM_USERNAME}</p>
            <p><strong>WhatsApp:</strong> {WHATSAPP_NUMBER}</p>
            <p><strong>Instagram:</strong> @{INSTAGRAM_USERNAME}</p>
          </div>

          {/* Note */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
            <p className="text-sm text-yellow-900">
              💡 <strong>Tip:</strong> Keep your Folder ID handy! You'll need it to prove it's your payment when contacting us.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
