"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// --- DEFAULT DATA FOR HINTS ---
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

  // --- 1. Basic Info States ---
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // --- 2. Dynamic List States ---
  const [answersNo, setAnswersNo] = useState<string[]>([""]);
  const [confirmations, setConfirmations] = useState<string[]>([""]);

  // --- 3. Toggles (New Feature) ---
  const [removeDefaultsNo, setRemoveDefaultsNo] = useState(false);
  const [removeDefaultsConf, setRemoveDefaultsConf] = useState(false);

  // --- 4. File States ---
  const [midBanner, setMidBanner] = useState<File | null>(null);
  const [yesBanner, setYesBanner] = useState<File | null>(null);
  const [noBanner, setNoBanner] = useState<File | null>(null);

  // --- HELPERS: List Management ---
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

  // --- SUBMIT ---
  async function handleSubmit() {
    if (!name) return alert("Please enter the name!");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("title", title);
      formData.append("success_message", successMessage);
      
      // Send the Toggle States
      formData.append("remove_defaults_no", removeDefaultsNo.toString());
      formData.append("remove_defaults_conf", removeDefaultsConf.toString());

      // Pre-process Lists
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
      router.push(`/valentine/${data.userId}`);
    } catch (e) {
      console.error(e);
      alert("Error creating link");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#fff0f6] py-10 px-4 font-sans text-slate-800">
      <div className="max-w-3xl mx-auto space-y-8">
        
        <div className="text-center space-y-3 mb-2">
          <h1 className="text-5xl md:text-6xl font-extrabold text-[#ff5fa2] drop-shadow-sm font-serif leading-tight">
            Customize Your Valentine 💖
          </h1>
          <p className="text-lg text-slate-600 font-medium">Make it personal, funny, and cute!</p>
        </div>

        {/* SECTION 1: DETAILS */}
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-pink-100 space-y-6">
          <h2 className="text-2xl font-bold text-slate-700 border-b-2 border-pink-200 pb-3">1. The Basics</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-600">Partner's Name</label>
              <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Shrija" className="w-full p-3 bg-pink-50 border border-pink-200 rounded-xl focus:ring-2 focus:ring-[#ff5fa2] outline-none transition"/>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-600">Page Title</label>
              <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Default: I love you" className="w-full p-3 bg-pink-50 border border-pink-200 rounded-xl focus:ring-2 focus:ring-[#ff5fa2] outline-none transition"/>
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-600">Success Message</label>
            <textarea value={successMessage} onChange={e => setSuccessMessage(e.target.value)} placeholder="Default: Yippeee I Loveeee youuuuuuuuuuuuuu 🌹" className="w-full p-3 bg-pink-50 border border-pink-200 rounded-xl focus:ring-2 focus:ring-[#ff5fa2] outline-none transition h-24 resize-none"/>
          </div>
        </div>

        {/* SECTION 2: MESSAGES */}
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-pink-100 space-y-8">
          <h2 className="text-2xl font-bold text-slate-700 border-b-2 border-pink-200 pb-3">2. Custom Messages</h2>
          
          {/* NO MESSAGES */}
          <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-3">
              <label className="text-lg font-bold text-red-500">"No" Button Messages 😢</label>
              
              {/* TOGGLE SWITCH */}
              <label className="flex items-center gap-2 cursor-pointer bg-red-50 px-3 py-1.5 rounded-full border border-red-100 hover:bg-red-100 transition">
                <input
                  type="checkbox"
                  checked={removeDefaultsNo}
                  onChange={e => setRemoveDefaultsNo(e.target.checked)}
                  className="w-4 h-4 accent-red-500"
                />
                <span className="text-xs font-semibold text-red-600">Remove Default Strings (Use only mine)</span>
              </label>
            </div>
            
            <div className="space-y-3">
              {answersNo.map((text, index) => (
                <div key={index} className="relative w-full">
                  <input
                    type="text"
                    value={text}
                    onChange={(e) => handleNoChange(index, e.target.value)}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-12 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 outline-none transition"
                    placeholder={getPlaceholder(DEFAULT_NO_ANSWERS, index)}
                  />

                  {/* --- UPDATED DELETE BUTTON (Trash Icon) --- */}
                  <button
                    onClick={() => removeNoField(index)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 rounded-full bg-red-500 text-white hover:bg-red-600 transition shadow-md z-10"
                    title="Remove field"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
              <button onClick={addNoField} className="add-line-btn text-sm text-pink-500 font-bold hover:underline">+ Add Line</button>
            </div>
          </div>

          {/* CONFIRMATION MESSAGES */}
          <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-3">
              <label className="text-lg font-bold text-green-600">Confirmation Steps 🥺</label>
              
              {/* TOGGLE SWITCH */}
              <label className="flex items-center gap-2 cursor-pointer bg-green-50 px-3 py-1.5 rounded-full border border-green-100 hover:bg-green-100 transition">
                <input 
                  type="checkbox" 
                  checked={removeDefaultsConf} 
                  onChange={e => setRemoveDefaultsConf(e.target.checked)}
                  className="accent-green-500 w-4 h-4"
                />
                <span className="text-xs font-semibold text-green-600">Remove Default Strings (Use only mine)</span>
              </label>
            </div>

            <div className="space-y-3">
              {confirmations.map((text, index) => (
                <div key={index} className="flex gap-3 items-center">
                   <span className="text-xs text-gray-400 font-mono text-center min-w-[1.5rem]">{index + 1}.</span>
                  <div className="relative flex-1">
                    <input
                      value={text}
                      onChange={(e) => handleConfChange(index, e.target.value)}
                      placeholder={getPlaceholder(DEFAULT_CONFIRMATIONS, index)}
                      className="w-full p-3 pr-12 border border-gray-300 rounded-xl focus:border-green-400 focus:ring-2 focus:ring-green-100 outline-none transition"
                    />
                    
                    {/* --- UPDATED DELETE BUTTON (Trash Icon) --- */}
                    <button 
                      onClick={() => removeConfField(index)} 
                      className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 rounded-full bg-red-500 text-white hover:bg-red-600 transition shadow-md z-10"
                      title="Remove step"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
              <button onClick={addConfField} className="add-line-btn text-sm text-green-500 font-bold hover:underline">+ Add Step</button>
            </div>
          </div>
        </div>

        {/* SECTION 3: IMAGES */}
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-pink-100 space-y-6">
          <h2 className="text-2xl font-bold text-slate-700 border-b-2 border-pink-200 pb-3">3. Upload Images (Optional)</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3 flex flex-col">
              <label className="block text-sm font-semibold text-slate-600">Mid/Start Bear 🐻</label>
              <input type="file" onChange={e => setMidBanner(e.target.files?.[0] || null)} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-pink-50 file:text-pink-700 file:font-medium hover:file:bg-pink-100 transition cursor-pointer flex-1"/>
            </div>
            <div className="space-y-3 flex flex-col">
              <label className="block text-sm font-semibold text-slate-600">Yes Bear ✅</label>
              <input type="file" onChange={e => setYesBanner(e.target.files?.[0] || null)} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-green-50 file:text-green-700 file:font-medium hover:file:bg-green-100 transition cursor-pointer flex-1"/>
            </div>
            <div className="space-y-3 flex flex-col">
              <label className="block text-sm font-semibold text-slate-600">No Bear ❌</label>
              <input type="file" onChange={e => setNoBanner(e.target.files?.[0] || null)} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-red-50 file:text-red-700 file:font-medium hover:file:bg-red-100 transition cursor-pointer flex-1"/>
            </div>
          </div>
        </div>

        <button onClick={handleSubmit} disabled={loading} className="w-full bg-gradient-to-r from-[#ff5fa2] to-[#ff7fb5] hover:from-[#e04f8e] hover:to-[#e6709f] text-white font-bold text-xl py-4 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 disabled:opacity-75 disabled:cursor-not-allowed">
          {loading ? "Generating Your Link..." : "Create Link 🚀"}
        </button>
      </div>
    </div>
  );
}