// 👇 THESE TWO LINES ARE NON-NEGOTIABLE
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// 1. DEFINE YOUR DEFAULTS
const DEFAULTS = {
  title: "I love you",
  question_heading: "Will you be my valentine? 🌹",
  no_button: "No",
  yes_button: "Yes 💖",
  success_message: "Yippeee I Loveeee youuuuuuuuuuuuuu 🌹🌹🌹🌹🌹",
  creator_text: "Created with Valentinelinks;)",
  creator_link: "https://github.com/ineffablexd",
  answers_no: [
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
  ],
  confirmation_messages: [
    "Pakka na? 🤨",
    "Are you sure u love me? 🥺",
    "Lock kar diya jaye? 🔒",
    "Pinky promise? 🤙"
  ],
  emojis: {
    love: ["❤️", "💖", "💕", "🌹", "🥰", "😍", "💌", "💓"],
    sad: ["😢", "😭", "💔", "🥺", "😞", "😣", "😓", "😿"],
    happy: ["❤️", "😘", "💋", "💑", "💏", "😻", "💍", "💒"]
  },
  images: {
    banner_no: [
      "public/images/no2.gif",
      "public/images/no3.gif",
      "public/images/no4.gif",
      "public/images/no5.gif",
      "public/images/no6.gif",
      "public/images/no7.gif",
      "public/images/no8.gif",
      "public/images/no9.gif"
    ],
    banner_yes: [
      "public/images/yes.gif",
      "public/images/yes2.gif",
      "public/images/yes3.gif",
      "public/images/yes4.gif",
      "public/images/yes5.gif",
      "public/images/yes6.gif",
      "public/images/yes7.gif",
      "public/images/yes8.gif",
      "public/images/yes9.gif"
    ],
    banner_mid: [
      "public/images/mid.gif",
      "public/images/mid2.gif",
      "public/images/mid3.gif",
      "public/images/mid4.gif",
      "public/images/mid5.gif",
      "public/images/mid6.gif",
      "public/images/mid7.gif",
      "public/images/mid8.gif",
      "public/images/mid9.gif"
    ]
  }
};

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    // --- 1. GET USER INPUTS ---
    const nameInput = (formData.get("name") as string) || "My Love";
    const titleInput = formData.get("title") as string;
    const successInput = formData.get("success_message") as string;
    
    // Get the arrays the user submitted
    const answersNoInput = JSON.parse((formData.get("answers_no") as string) || "[]");
    const confirmationsInput = JSON.parse((formData.get("confirmation_messages") as string) || "[]");

    // --- 2. MERGE LOGIC ---
    
    // A. Helper to process the Default List (replace {name})
    const processedDefaultsNo = DEFAULTS.answers_no.map(s => s.replace(/{name}/g, nameInput));
    const processedDefaultsConf = DEFAULTS.confirmation_messages.map(s => s.replace(/{name}/g, nameInput));

    // B. OVERLAY Logic: 
    // Start with a copy of the full default list
    const finalAnswersNo = [...processedDefaultsNo];
    const finalConfirmations = [...processedDefaultsConf];

    // Loop through user input and overwrite the specific index
    // If user provided 2 items, we overwrite index 0 and 1. Index 2+ remains Default.
    if (answersNoInput.length > 0) {
      answersNoInput.forEach((msg: string, index: number) => {
        if (msg && msg.trim() !== "") {
          // If index is within bounds, replace it
          if (index < finalAnswersNo.length) {
            finalAnswersNo[index] = msg;
          } else {
            // If user added MORE lines than we have defaults, append them
            finalAnswersNo.push(msg);
          }
        }
      });
    }

    if (confirmationsInput.length > 0) {
      confirmationsInput.forEach((msg: string, index: number) => {
        if (msg && msg.trim() !== "") {
          if (index < finalConfirmations.length) {
            finalConfirmations[index] = msg;
          } else {
            finalConfirmations.push(msg);
          }
        }
      });
    }

    // --- 3. STRINGS ---
    const finalTitle = titleInput || DEFAULTS.title;
    const finalQuestion = `${nameInput}, ${DEFAULTS.question_heading}`;
    const finalSuccess = successInput || DEFAULTS.success_message;
    
    // --- 4. GENERATE CUSTOM ID (name_Valentine_xxxxx) ---
    const safeName = nameInput.replace(/[^a-zA-Z0-9]/g, "_");
    const randomNum = Math.floor(10000 + Math.random() * 90000); 
    const userId = `${safeName}_Valentine_${randomNum}`;

    // --- 5. FILE SAVING LOGIC ---
    const midFile = formData.get("mid_banner") as File | null;
    const yesFile = formData.get("yes_banner") as File | null;
    const noFile = formData.get("no_banner") as File | null;

    const userDir = path.join(process.cwd(), "data/users", userId);
    const imageDir = path.join(userDir, "images");

    if (!fs.existsSync(imageDir)) fs.mkdirSync(imageDir, { recursive: true });

    async function resolveImages(file: File | null, renameTo: string, defaultList: string[]) {
      if (!file) return defaultList; 

      const buffer = Buffer.from(await file.arrayBuffer());
      const fileName = `${renameTo}.gif`; 
      
      fs.writeFileSync(path.join(imageDir, fileName), buffer);
      return [`images/${fileName}`]; 
    }

    const bannerMid = await resolveImages(midFile, "mid", DEFAULTS.images.banner_mid);
    const bannerYes = await resolveImages(yesFile, "yes", DEFAULTS.images.banner_yes);
    const bannerNo = await resolveImages(noFile, "no", DEFAULTS.images.banner_no);

    // --- 6. CREATE FINAL JSON ---
    const stringsData = {
      title: finalTitle,
      question_heading: finalQuestion,
      no_button: DEFAULTS.no_button,
      yes_button: DEFAULTS.yes_button,
      success_message: finalSuccess,
      creator_text: DEFAULTS.creator_text,
      creator_link: DEFAULTS.creator_link,
      answers_no: finalAnswersNo, // <--- Using the Merged List
      confirmation_messages: finalConfirmations, // <--- Using the Merged List
      emojis: DEFAULTS.emojis,
      images: {
        banner_no: bannerNo,
        banner_yes: bannerYes,
        banner_mid: bannerMid
      }
    };

    fs.writeFileSync(path.join(userDir, "strings.json"), JSON.stringify(stringsData, null, 2));

    return NextResponse.json({ success: true, userId });

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}