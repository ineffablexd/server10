import Link from "next/link";

export default function Home() {
  return (
    // 1. Main Container (Centered Vertically & Horizontally)
    <main className="container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      
      <div style={{ width: '100%', maxWidth: '800px' }}>
        
        {/* 2. Header Title */}
        <div style={{ marginBottom: '30px', textAlign: 'center' }}>
          <h1>Valentine Links 💖</h1>
          <h2>
            Create personalized valentine links for your boyfriend and girlfriend
          </h2>
        </div>

        {/* 3. Main Glass Card */}
        <div className="glass-section" style={{ padding: '40px 30px', textAlign: 'center' }}>
          
          {/* --- SELECTION CARDS --- */}
          <div className="cards" style={{ marginBottom: '30px' }}>
            {/* Card 1: For Him */}
            <Link href="/create?type=him" className="card">
              <div style={{ fontSize: "3.5rem", marginBottom: '10px' }}>👦</div>
              <h4>For Him</h4>
              <p>
                Create a cute link to impress your boyfriend with personalized messages.
              </p>
            </Link>

            {/* Card 2: For Her */}
            <Link href="/create?type=her" className="card">
              <div style={{ fontSize: "3.5rem", marginBottom: '10px' }}>👧</div>
              <h4>For Her</h4>
              <p>
                Make her smile with an interactive and romantic valentine link.
              </p>
            </Link>
          </div>

          {/* --- QUOTE SECTION --- */}
          <blockquote style={{ margin: '30px 0' }}>
            "Make Valentine’s Day special with a personalized link that shows how
            much they mean to you! ❤️"
            <div style={{ marginTop: "10px", fontSize: "0.85rem", fontStyle: "normal", opacity: 0.7, fontWeight: '600' }}>
              - Impress your special someone today
            </div>
          </blockquote>

          {/* --- PRICING SECTION --- */}
          <div className="price-box" style={{ marginBottom: '30px', padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
              <span className="old-price" style={{ textDecoration: 'line-through', color: '#94a3b8', fontSize: '1.5rem', fontWeight: 'bold' }}>
                ₹250
              </span>
              <span className="new-price" style={{ color: '#db2777', fontSize: '2.5rem', fontWeight: '900', fontFamily: 'var(--font-baloo)' }}>
                ₹99
              </span>
            </div>
            <p style={{ color: "#db2777", fontWeight: "700", marginTop: '5px', textTransform: 'uppercase', fontSize: '0.9rem' }}>
              ✨ Limited Time Offer: Get your link today!
            </p>
          </div>

          {/* --- ACTION BUTTONS --- */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            
            {/* Primary: Create Link */}
            <Link href="/create" style={{ width: '100%' }}>
              <button className="big-btn">
                🚀 Create Your Link Now
              </button>
            </Link>

            {/* Secondary: See Sample */}
            <a 
              href="https://ineffablexd.github.io/valentine/" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ width: '100%', textDecoration: 'none' }}
            >
              {/* CSS Class handles the hover effect now */}
              <button className="sample-btn">
                👀 See Sample Link
              </button>
            </a>
            
          </div>

        </div>
      </div>
    </main>
  );
}