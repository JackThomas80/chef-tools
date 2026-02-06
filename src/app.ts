import "dotenv/config";
import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
const PORT = Number(process.env.PORT ?? 3001);
const openAiApiKey = process.env.OPENAI_API_KEY;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const openai = openAiApiKey
  ? new OpenAI({ apiKey: openAiApiKey })
  : null;

app.post("/chat", async (req, res) => {
  const message = req.body?.message;

  if (typeof message !== "string" || !message.trim()) {
    return res.status(400).json({ reply: "Please provide a non-empty message." });
  }

  if (!openai) {
    return res.status(503).json({
      reply: "ChefGPT is not configured yet. Add OPENAI_API_KEY to enable chat.",
    });
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are ChefGPT, a helpful AI sous-chef." },
        { role: "user", content: message.trim() },
      ],
    });

    const reply = response.choices[0].message?.content || "🤖 ChefGPT: I didn't get that.";
    return res.json({ reply });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ reply: "🔥 ChefGPT burned the kitchen! Try again." });
  }
});

// Health check
app.get("/health", (_req, res) => res.json({ status: "ok", app: "ChefGPT" }));

app.listen(PORT, () => {
  console.log(`ChefGPT running on http://localhost:${PORT}`);
  if (!openai) {
    console.warn("OPENAI_API_KEY is not set. /chat will return 503 until configured.");
  }
});
