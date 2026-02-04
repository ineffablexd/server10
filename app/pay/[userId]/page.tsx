"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

// --- CONSTANTS ---
const UPI_ID = "itsvsharma714-1@okicici"; 
const TELEGRAM_USERNAME = "@ineffabletg";
const TELEGRAM_URL = "https://t.me/ineffabletg";
const WHATSAPP_NUMBER = "+9412314053";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=Hi, I've sent the payment proof for Valentine links. Please verify and send me my link!`;
const INSTAGRAM_USERNAME = "valentine_links";
const INSTAGRAM_URL = "https://instagram.com/valentine_links";

export default function PayPage() {
  const params = useParams();
  const userId = params.userId as string;
  
  const [copiedUPI, setCopiedUPI] = useState(false);
  const [copiedID, setCopiedID] = useState(false);

  const handleCopyUPI = () => {
    navigator.clipboard.writeText(UPI_ID);
    setCopiedUPI(true);
    setTimeout(() => setCopiedUPI(false), 2000);
  };

  const handleCopyUserId = () => {
    navigator.clipboard.writeText(userId);
    setCopiedID(true);
    setTimeout(() => setCopiedID(false), 2000);
  };

  return (
    <main className="container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      
      <div style={{ width: '100%', maxWidth: '600px' }}>
        
        {/* --- HEADER --- */}
        <div style={{ marginBottom: '25px', textAlign: 'center' }}>
          {/* Changed emoji to Sparkles to avoid 'pink box' glitch */}
          <h1>Complete Payment ✨</h1>
          <h2>Send proof to unlock your Valentine link!</h2>
        </div>

        {/* --- GLASS CARD --- */}
        <div className="glass-section" style={{ padding: '40px 25px', textAlign: 'center' }}>
          
          {/* 1. PRICING (Centered & Strikethrough) */}
          <div style={{ marginBottom: '30px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
              <span style={{ textDecoration: 'line-through', color: '#94a3b8', fontSize: '1.6rem', fontWeight: 'bold' }}>
                ₹250
              </span>
              <span style={{ color: '#db2777', fontSize: '2.8rem', fontWeight: '900', fontFamily: 'var(--font-baloo)' }}>
                ₹99
              </span>
            </div>
            <div style={{ background: '#fce7f3', color: '#db2777', display: 'inline-block', padding: '5px 15px', borderRadius: '50px', fontSize: '0.85rem', fontWeight: 'bold', marginTop: '5px' }}>
              ⚡ Limited Time Offer
            </div>
          </div>
          
          {/* 2. BIG QR CODE (Centered) */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '30px' }}>
            <div style={{ 
              background: 'white', 
              padding: '15px', 
              borderRadius: '20px', 
              boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
              border: '2px solid #fbcfe8'
            }}>
              <img 
                src="/payment-qr.png" 
                alt="Payment QR Code" 
                style={{ 
                  display: 'block',
                  width: '220px', /* Bigger size */
                  height: '220px', 
                  objectFit: 'contain',
                  borderRadius: '10px' 
                }}
              />
            </div>
            <p style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#64748b', marginTop: '12px', letterSpacing: '1px' }}>
              SCAN TO PAY
            </p>
          </div>

          {/* 3. COPY DETAILS (UPI & ID) */}
          <div style={{ textAlign: 'left', background: 'rgba(255,255,255,0.6)', padding: '20px', borderRadius: '15px', marginBottom: '30px' }}>
            
            {/* UPI ID */}
            <div style={{ marginBottom: '15px' }}>
              <p style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase', marginBottom: '5px' }}>📱 UPI ID</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'white', padding: '10px', borderRadius: '10px', border: '1px solid #fce7f3' }}>
                <code style={{ flex: 1, fontFamily: 'monospace', fontSize: '1rem', fontWeight: 'bold', color: '#334155', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {UPI_ID}
                </code>
                <button
                  onClick={handleCopyUPI}
                  style={{ 
                    background: copiedUPI ? '#22c55e' : '#ec4899', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '8px', 
                    padding: '8px 16px', 
                    fontSize: '0.8rem', 
                    fontWeight: 'bold', 
                    cursor: 'pointer',
                    transition: '0.2s'
                  }}
                >
                  {copiedUPI ? "✓" : "Copy"}
                </button>
              </div>
            </div>

            {/* Folder ID */}
            <div>
              <p style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase', marginBottom: '5px' }}>👤 Your Folder ID</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#faf5ff', padding: '10px', borderRadius: '10px', border: '1px solid #e9d5ff' }}>
                <code style={{ flex: 1, fontFamily: 'monospace', fontSize: '1rem', fontWeight: 'bold', color: '#7e22ce', wordBreak: 'break-all' }}>
                  {userId}
                </code>
                <button
                  onClick={handleCopyUserId}
                  style={{ 
                    background: copiedID ? '#22c55e' : '#a855f7', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '8px', 
                    padding: '8px 16px', 
                    fontSize: '0.8rem', 
                    fontWeight: 'bold', 
                    cursor: 'pointer',
                    transition: '0.2s'
                  }}
                >
                  {copiedID ? "✓" : "Copy"}
                </button>
              </div>
              <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '6px', fontStyle: 'italic' }}>
                *Send this ID with your screenshot so we can identify you.
              </p>
            </div>
          </div>

          {/* 4. SOCIAL BUTTONS */}
          <div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '15px' }}>Send screenshot via 👇</h3>
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
              {/* Telegram */}
              <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#0088cc', color: 'white', padding: '10px 20px', borderRadius: '50px', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 'bold' }}>
                <svg style={{ width: '18px', height: '18px', fill: 'currentColor' }} viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                Telegram
              </a>

              {/* WhatsApp */}
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#25D366', color: 'white', padding: '10px 20px', borderRadius: '50px', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 'bold' }}>
                <svg style={{ width: '18px', height: '18px', fill: 'currentColor' }} viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371 0-.57 0-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.006a6.506 6.506 0 00-6.487 6.513 6.513 6.513 0 001.143 3.852L5.031 20l4.126-1.082a6.531 6.531 0 003.138.796h.006c3.584 0 6.486-2.902 6.486-6.487 0-1.679-.667-3.258-1.775-4.425a6.47 6.47 0 00-4.595-1.914m10.929-10.55c-5.093-5.091-13.46-5.091-18.551 0C2.001 3.9 1 8.57 1 13.016s1.001 9.117 2.836 10.952c2.835 2.835 6.542 4.258 10.419 4.258 3.877 0 7.585-1.423 10.419-4.257C23.999 22.134 25 17.463 25 13.016S23.999 3.917 21.164 1.082"/></svg>
                WhatsApp
              </a>

              {/* Instagram */}
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)', color: 'white', padding: '10px 20px', borderRadius: '50px', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 'bold' }}>
                <svg style={{ width: '18px', height: '18px', fill: 'currentColor' }} viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.266.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.322a1.44 1.44 0 110-2.881 1.44 1.44 0 010 2.881z"/></svg>
                Instagram
              </a>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}