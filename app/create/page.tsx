"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import DeleteIconSrc from "./delete.svg"; // Ensure you have this icon or remove the import if using text

// --- DEFAULT DATA ---
const DEFAULT_NO_ANSWERS = [
  "No, {name} 😔",
  "Are you sure, {name}?",
  "Really sure, {name}? 🥺",
  "Like… super duper sure, {name}?",
  "Think once more, {name} 💭",
  "{name} believes in second chances, you know ✨",
  "Why so cold, {name} ❄️",
  "Can we talk it out, {name}? 💬",
  "I won’t ask again, {name}… maybe 🙈",
  "Oof, that hurt a little, {name} 💔",
  "Okay now you’re being mean, {name} 😤",
  "Why are you doing this to me, {name} 😢",
  "Please give me a chance, {name} 🫶",
  "I’m begging you, {name} 😭",
  "Please stop, {name} 🥹",
  "Okay… let’s start over, {name} 💖"
];

const DEFAULT_CONFIRMATIONS = [
  "Pakka na? 🤨",
  "Are you sure u love me? 🥺",
  "Lock kar diya jaye? 🔒",
  "Pinky promise? 🤙"
];

export default function CreatePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // --- States ---
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [answersNo, setAnswersNo] = useState<string[]>([""]);
  const [confirmations, setConfirmations] = useState<string[]>([""]);

  const [removeDefaultsNo, setRemoveDefaultsNo] = useState(false);
  const [removeDefaultsConf, setRemoveDefaultsConf] = useState(false);

  const [midBanner, setMidBanner] = useState<File | null>(null);
  const [yesBanner, setYesBanner] = useState<File | null>(null);
  const [noBanner, setNoBanner] = useState<File | null>(null);

  // --- Helpers ---
  const handleNoChange = (index: number, value: string) => {
    const newArr = [...answersNo];
    newArr[index] = value;
    setAnswersNo(newArr);
  };

  const handleConfChange = (index: number, value: string) => {
    const newArr = [...confirmations];
    newArr[index] = value;
    setConfirmations(newArr);
  };

  const addNoField = () => setAnswersNo([...answersNo, ""]);
  const addConfField = () => setConfirmations([...confirmations, ""]);

  const removeNoField = (index: number) => {
    if (answersNo.length === 1) setAnswersNo([""]);
    else setAnswersNo(answersNo.filter((_, i) => i !== index));
  };

  const removeConfField = (index: number) => {
    if (confirmations.length === 1) setConfirmations([""]);
    else setConfirmations(confirmations.filter((_, i) => i !== index));
  };

  const getPlaceholder = (list: string[], index: number) => {
    const text = list[index] || "Custom message...";
    return text.replace(/{name}/g, name || "Shrija"); 
  };

  // --- Submit Logic ---
  async function handleSubmit() {
    if (!name) return alert("Please enter the name!");

    if (removeDefaultsNo) {
      const validNo = answersNo.filter((s) => s.trim() !== "");
      if (validNo.length < 3) return alert("Please add at least 3 custom 'No' messages if you remove defaults!");
    }

    if (removeDefaultsConf) {
      const validConf = confirmations.filter((s) => s.trim() !== "");
      if (validConf.length < 3) return alert("Please add at least 3 custom confirmation steps if you remove defaults!");
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("title", title);
      formData.append("success_message", successMessage);
      formData.append("remove_defaults_no", removeDefaultsNo.toString());
      formData.append("remove_defaults_conf", removeDefaultsConf.toString());

      const processedNo = answersNo.map((text, index) => {
        if ((!text || text.trim() === "") && !removeDefaultsNo) {
          const def = DEFAULT_NO_ANSWERS[index] || "Please?";
          return def.replace(/{name}/g, name);
        }
        return text;
      });

      const processedConf = confirmations.map((text, index) => {
        if ((!text || text.trim() === "") && !removeDefaultsConf) {
          const def = DEFAULT_CONFIRMATIONS[index] || "Are you sure?";
          return def.replace(/{name}/g, name);
        }
        return text;
      });

      formData.append("answers_no", JSON.stringify(processedNo));
      formData.append("confirmation_messages", JSON.stringify(processedConf));

      if (midBanner) formData.append("mid_banner", midBanner);
      if (yesBanner) formData.append("yes_banner", yesBanner);
      if (noBanner) formData.append("no_banner", noBanner);

      const res = await fetch("/api/create", { method: "POST", body: formData });
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      router.push(`/pay/${data.userId}`);
    } catch (e) {
      console.error(e);
      alert("Error creating link");
      setLoading(false);
    }
  }

  // --- Inline Styles for Consistency ---
  // Using inline styles guarantees the look even if globals.css has conflicts
  const inputStyle = {
    width: "100%",
    padding: "14px 18px",
    borderRadius: "16px",
    border: "2px solid #fce7f3",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    fontSize: "1rem",
    marginTop: "8px",
    outline: "none",
    fontFamily: "inherit",
    boxShadow: "0 2px 10px rgba(0,0,0,0.02)"
  };

  const labelStyle = {
    display: "block",
    fontWeight: "700",
    color: "#4b5563",
    marginBottom: "5px",
    fontSize: "1.05rem"
  };

  return (
    <div className="container">
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1>Customize Your Valentine 💖</h1>
        <h2>Make it personal, funny, and cute!</h2>
      </div>

      {/* 1. THE BASICS */}
      <div className="glass-section" style={{ marginBottom: "30px" }}>
        <h3>1. The Basics</h3>
        
        <div className="grid gap-6 md:grid-cols-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '20px' }}>
          <div>
            <label style={labelStyle}>Partner's Name</label>
            <input 
              style={inputStyle}
              value={name} 
              onChange={e => setName(e.target.value)} 
              placeholder="e.g. Shrija" 
            />
          </div>
          <div>
            <label style={labelStyle}>Page Title</label>
            <input 
              style={inputStyle}
              value={title} 
              onChange={e => setTitle(e.target.value)} 
              placeholder="Default: I love you" 
            />
          </div>
        </div>

        <div>
          <label style={labelStyle}>Success Message</label>
          <textarea 
            style={{ ...inputStyle, minHeight: "100px", resize: "vertical" }}
            value={successMessage} 
            onChange={e => setSuccessMessage(e.target.value)} 
            placeholder="Default: Yippeee I Loveeee youuuuuuuuuuuuuu 🌹" 
          />
        </div>
      </div>

      {/* 2. CUSTOM MESSAGES */}
      <div className="glass-section" style={{ marginBottom: "30px" }}>
        <h3>2. Custom Messages</h3>
        
        {/* No Messages Section */}
        <div style={{ marginBottom: "35px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px", flexWrap: "wrap", gap: "10px" }}>
            <label style={{ ...labelStyle, color: "#ef4444", marginBottom: 0 }}>
              "No" Button Messages 😢
            </label>
            
            <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", background: "#fef2f2", padding: "8px 16px", borderRadius: "50px", border: "1px solid #fee2e2" }}>
              <input
                type="checkbox"
                checked={removeDefaultsNo}
                onChange={e => setRemoveDefaultsNo(e.target.checked)}
                // FIXED: Removed duplicate 'width' property
                style={{ width: "18px", height: "18px", accentColor: "#ef4444", cursor: "pointer" }}
              />
              <span style={{ fontSize: "0.85rem", fontWeight: "700", color: "#dc2626" }}>Remove Defaults</span>
            </label>
          </div>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {answersNo.map((text, index) => (
              <div key={index} style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <input
                  type="text"
                  value={text}
                  onChange={(e) => handleNoChange(index, e.target.value)}
                  placeholder={getPlaceholder(DEFAULT_NO_ANSWERS, index)}
                  style={{ ...inputStyle, marginTop: 0 }}
                />
                <button
                  onClick={() => removeNoField(index)}
                  style={{ background: "none", border: "none", cursor: "pointer", padding: "8px" }}
                  title="Remove"
                >
                  <Image src={DeleteIconSrc} alt="delete" width={24} height={24} />
                </button>
              </div>
            ))}
            <button 
              onClick={addNoField} 
              className="add-line-btn" 
              style={{ color: "#ef4444", borderColor: "#fca5a5", marginTop: "10px", alignSelf: "flex-start" }}
            >
              + Add Line
            </button>
          </div>
        </div>

        {/* Yes Messages Section */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px", flexWrap: "wrap", gap: "10px" }}>
            <label style={{ ...labelStyle, color: "#16a34a", marginBottom: 0 }}>
              "Yes" Button Messages 🥺
            </label>
            
            <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", background: "#f0fdf4", padding: "8px 16px", borderRadius: "50px", border: "1px solid #dcfce7" }}>
              <input 
                type="checkbox" 
                checked={removeDefaultsConf} 
                onChange={e => setRemoveDefaultsConf(e.target.checked)}
                style={{ width: "18px", height: "18px", accentColor: "#16a34a", cursor: "pointer" }}
              />
              <span style={{ fontSize: "0.85rem", fontWeight: "700", color: "#16a34a" }}>Remove Defaults</span>
            </label>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {confirmations.map((text, index) => (
              <div key={index} style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <span style={{ fontSize: "0.9rem", color: "#9ca3af", fontFamily: "monospace", width: "20px", textAlign: "center" }}>
                  {index + 1}.
                </span>
                <input
                  value={text}
                  onChange={(e) => handleConfChange(index, e.target.value)}
                  placeholder={getPlaceholder(DEFAULT_CONFIRMATIONS, index)}
                  style={{ ...inputStyle, marginTop: 0 }}
                />
                <button 
                  onClick={() => removeConfField(index)} 
                  style={{ background: "none", border: "none", cursor: "pointer", padding: "8px" }}
                  title="Remove"
                >
                  <Image src={DeleteIconSrc} alt="delete" width={24} height={24} />
                </button>
              </div>
            ))}
            <button 
              onClick={addConfField} 
              className="add-line-btn" 
              style={{ color: "#16a34a", borderColor: "#86efac", marginTop: "10px", alignSelf: "flex-start" }}
            >
              + Add Step
            </button>
          </div>
        </div>
      </div>

      {/* 3. IMAGES */}
      <div className="glass-section" style={{ marginBottom: "40px" }}>
        <h3>3. Upload Gifs or Images (Optional)</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          <div>
            <label style={labelStyle}>Mid/Start Gif 🐻</label>
            <input 
              type="file" 
              onChange={e => setMidBanner(e.target.files?.[0] || null)} 
              style={{ ...inputStyle, padding: "10px", fontSize: "0.9rem" }}
            />
          </div>
          <div>
            <label style={labelStyle}>Yes Gif ✅</label>
            <input 
              type="file" 
              onChange={e => setYesBanner(e.target.files?.[0] || null)} 
              style={{ ...inputStyle, padding: "10px", fontSize: "0.9rem", borderColor: "#dcfce7" }}
            />
          </div>
          <div>
            <label style={labelStyle}>No Gif ❌</label>
            <input 
              type="file" 
              onChange={e => setNoBanner(e.target.files?.[0] || null)} 
              style={{ ...inputStyle, padding: "10px", fontSize: "0.9rem", borderColor: "#fee2e2" }}
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button onClick={handleSubmit} disabled={loading} className="big-btn">
        {loading ? "Processing..." : "Confirm order and pay 💳"}
      </button>
    </div>
  );
}