import "dotenv/config";
import cors from "cors";
import express from "express";
import OpenAI from "openai";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = Number(process.env.PORT) || 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const staticDir = path.resolve(__dirname, "../src/public");

app.use(cors());
app.use(express.json());
app.use(express.static(staticDir));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are ChefGPT, a helpful AI sous-chef." },
        { role: "user", content: message },
      ],
    });

    const reply = response.choices[0].message?.content || "🤖 ChefGPT: I didn't get that.";
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "🔥 ChefGPT burned the kitchen! Try again." });
  }
});

app.get("/health", (_req, res) => res.json({ status: "ok", app: "ChefGPT" }));

if (process.env.VERCEL !== "1") {
  app.listen(PORT, () => console.log(`ChefGPT running on http://localhost:${PORT}`));
}

export default app;
