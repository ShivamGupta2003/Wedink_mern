
// const express = require("express");
// const router = express.Router({ mergeParams: true });

// if (process.env.NODE_ENV !== "production") {
//   require("dotenv").config();
// }

// const { GoogleGenAI } = require("@google/genai");

// // Initialize Gemini
// const ai = new GoogleGenAI({
//   apiKey: process.env.GEMINI_API_KEY,
// });

// // SYSTEM PROMPT
// const SYSTEM_PROMPT = `You are an AI assistant integrated into a wedding card booking platform called Wedink.
// Your role is to:
// 1. Help users explore, understand, and purchase wedding invitation cards.
// 2. Answer only questions related to wedding cards.
// 3. Politely refuse unrelated questions.

// 🎯 RULES:
// - Keep answers short (2-3 lines).
// - Friendly tone.
// - If unrelated → "I can help you with wedding cards 😊"

// 🧠 SEARCH TRIGGER:
// Return ONLY JSON:
// {"action":"search_cards","filters":{"color":"...","style":"...","keywords":"..."}}
// `;

// // POST /chat
// router.post("/", async (req, res) => {
//   try {
//     const { messages } = req.body;

//     if (!messages || !Array.isArray(messages)) {
//       return res.status(400).json({ error: "messages array is required" });
//     }

//     // Convert messages → Gemini format
//     const contents = messages.map((m) => ({
//       role: m.role === "user" ? "user" : "model",
//       parts: [{ text: m.content }],
//     }));

//     // Call Gemini SDK
//     const response = await ai.models.generateContent({
//       model: "gemini-3-flash-preview",
//       contents: contents,
//       systemInstruction: SYSTEM_PROMPT,
//       generationConfig: {
//         temperature: 0.7,
//         maxOutputTokens: 512,
//       },
//     });

//     const text = response.text || "";

//     let reply = { type: "text", content: text.trim() };

//     // Detect JSON search trigger
//     try {
//       const parsed = JSON.parse(text.trim());
//       if (parsed.action === "search_cards") {
//         reply = { type: "search", filters: parsed.filters };
//       }
//     } catch (e) {}

//     res.json(reply);
//   } catch (err) {
//     console.error("Chat route error:", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// module.exports = router;
const express = require("express");
const router = express.Router({ mergeParams: true });

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const { GoogleGenAI } = require("@google/genai");
const MarriageCard = require("../models/marriageCard"); // adjust path if needed

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const SYSTEM_PROMPT = `You are WedInk's wedding card assistant. You help users find wedding cards.

══════════════════════════════════════
RULE 1 — THE MOST IMPORTANT RULE:
══════════════════════════════════════
If the user mentions ANY of these words → cards, show, suggest, recommend, find, under, budget, price, want, looking, give, cheap, expensive, royal, traditional, modern, floral, gold, simple, design, style:

You MUST reply with ONLY this JSON. No text before it. No text after it. No explanation:
{"action":"recommend_cards","filters":{"theme":"","maxPrice":0,"keywords":""}}

Fill the filters:
- theme → "Royal" or "Traditional" or "Modern" or "" if not clear
- maxPrice → the number (500, 800, 1000 etc) or 0 if not mentioned
- keywords → extra descriptive words or ""

EXAMPLES — you must follow these exactly:
"show me cards under ₹500" → {"action":"recommend_cards","filters":{"theme":"","maxPrice":500,"keywords":""}}
"suggest royal cards" → {"action":"recommend_cards","filters":{"theme":"Royal","maxPrice":0,"keywords":""}}
"cards under 500" → {"action":"recommend_cards","filters":{"theme":"","maxPrice":500,"keywords":""}}
"show mw card under 500" → {"action":"recommend_cards","filters":{"theme":"","maxPrice":500,"keywords":""}}
"I want floral cards" → {"action":"recommend_cards","filters":{"theme":"","maxPrice":0,"keywords":"floral"}}
"give me something nice" → {"action":"recommend_cards","filters":{"theme":"","maxPrice":0,"keywords":""}}
"recommend me something" → {"action":"recommend_cards","filters":{"theme":"","maxPrice":0,"keywords":""}}

══════════════════════════════════════
RULE 2:
══════════════════════════════════════
For greetings like "hi", "hello", "how are you" → reply in 1-2 friendly casual lines only.

══════════════════════════════════════
RULE 3:
══════════════════════════════════════
If completely unrelated to wedding cards → reply: "I can only help with wedding cards 😊"

══════════════════════════════════════
DO NOT write lists. DO NOT write markdown. DO NOT explain card types.
If in doubt → return the JSON.
══════════════════════════════════════`;

// ── Real match % calculator ──────────────────────────────────────────────
function calcMatch(card, filters) {
  let score = 0;
  let total = 0;

  if (filters.theme && filters.theme !== "") {
    total += 40;
    if (card.theme === filters.theme) score += 40;
  }

  if (filters.maxPrice && filters.maxPrice > 0) {
    total += 40;
    if (card.price <= filters.maxPrice) {
      const ratio = card.price / filters.maxPrice;
      if (ratio <= 0.5) score += 30;
      else if (ratio <= 0.8) score += 38;
      else score += 40;
    }
  }

  if (filters.keywords && filters.keywords !== "") {
    total += 20;
    const kw = filters.keywords.toLowerCase();
    const haystack = `${card.cardName} ${card.description || ""} ${card.material}`.toLowerCase();
    if (haystack.includes(kw)) score += 20;
  }

  if (total === 0) return 85;
  return Math.round((score / total) * 100);
}

// ── POST /api/chat ────────────────────────────────────────────────────────
router.post("/", async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "messages array is required" });
    }

    const contents = messages.map((m) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    }));

    // ── STEP 1: Gemini detects intent ──
    const intentResponse = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: contents,
      systemInstruction: SYSTEM_PROMPT,
      generationConfig: {
        temperature: 0,
        maxOutputTokens: 256,
      },
    });

    const raw = (intentResponse.text || "").trim();

    // ── STEP 2: Try to parse JSON ──
    try {
      const cleaned = raw.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(cleaned);

      // ── RECOMMENDATION FLOW ──
      if (parsed.action === "recommend_cards") {
        const { theme, maxPrice, keywords } = parsed.filters || {};

        // Build MongoDB query
        const query = {};
        if (theme && theme !== "") query.theme = theme;
        if (maxPrice && maxPrice > 0) query.price = { $lte: maxPrice };
        if (keywords && keywords !== "") {
          query.$or = [
            { cardName: { $regex: keywords, $options: "i" } },
            { description: { $regex: keywords, $options: "i" } },
            { material: { $regex: keywords, $options: "i" } },
          ];
        }

        // Fetch from DB
        let cards = await MarriageCard.find(query)
          .populate("shop", "shopName location")
          .limit(8)
          .lean();

        // Fallback — if no results, show all cards
        let usedFallback = false;
        if (!cards.length) {
          cards = await MarriageCard.find({})
            .populate("shop", "shopName location")
            .limit(8)
            .lean();
          usedFallback = true;
        }

        if (!cards.length) {
          return res.json({
            type: "text",
            content: "Hmm, no cards in the store yet! Check back soon 😊",
          });
        }

        // Calculate real match % and sort
        const cardsWithMatch = cards
          .map((card) => ({
            id: card._id,
            cardName: card.cardName,
            price: card.price,
            theme: card.theme,
            material: card.material,
            size: card.size || "",
            image: card.image?.url || null,
            shopName: card.shop?.shopName || "",
            shopId: card.shop?._id || null,
            match: calcMatch(card, parsed.filters || {}),
          }))
          .sort((a, b) => b.match - a.match);

        // ── STEP 3: Gemini writes friendly intro ──
        const cardSummary = cardsWithMatch
          .slice(0, 3)
          .map((c) => `${c.cardName} (₹${c.price}, ${c.theme})`)
          .join(", ");

        const introResponse = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: [
            ...contents,
            {
              role: "user",
              parts: [
                {
                  text: usedFallback
                    ? `No exact matches found but showing all available cards: ${cardSummary}. Write ONE short casual friendly sentence about this. Max 15 words. No markdown.`
                    : `Cards found: ${cardSummary}. Write ONE short casual friendly sentence introducing these results. Max 15 words. No markdown.`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.8,
            maxOutputTokens: 60,
          },
        });

        const introMessage =
          introResponse.text?.trim() ||
          `Here are ${cardsWithMatch.length} cards picked just for you! ✨`;

        return res.json({
          type: "cards",
          message: introMessage,
          cards: cardsWithMatch,
        });
      }

      // ── SEARCH FLOW ──
      if (parsed.action === "search_cards") {
        return res.json({ type: "search", filters: parsed.filters });
      }
    } catch (e) {
      // Not JSON — normal text reply
    }

    // ── NORMAL TEXT REPLY ──
    return res.json({ type: "text", content: raw });
  } catch (err) {
    console.error("Chat route error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;