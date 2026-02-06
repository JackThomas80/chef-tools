# 🍳 ChefGPT

ChefGPT is an AI-powered culinary assistant — your Michelin-minded digital sous-chef.  
Ask about dishes, ingredients, techniques, substitutions, menus, or food science and get thoughtful, chef-level responses.

Frontend is a lightweight React app.  
Backend is a Node.js + TypeScript Express server deployed on Vercel.

---

## ✨ Features

- 👨‍🍳 AI culinary assistant powered by OpenAI
- 🧠 Knowledge of techniques, flavor pairings, substitutions, and plating
- ⚡ Simple REST API
- 🌍 Vercel-hosted Express backend + static frontend
- 🔐 Secure API key handling (no secrets in GitHub)

---

## 🏗️ Project Structure

ChefGPT/
├── chefgpt-backend/
│ ├── src/
│ │ └── app.ts
│ ├── dist/
│ ├── package.json
│ ├── tsconfig.json
│ └── vercel.json
│
└── chefgpt-frontend/
└── index.html


---

## 🚀 Live Deployment

- Backend + Frontend: Vercel

Deployments are available immediately after a successful Vercel build.

---

## 🔧 Backend Setup (Local)

### Install dependencies
```bash
git clone https://github.com/JackThomas80/chef-tools.git
cd ChefGPT
cd chefgpt-backend
npm install
nano .env
OPENAI_API_KEY=your_openai_api_key_here
PORT=3000

npm run start


http://localhost:3000

Frontend Setup

cd ../chefgpt-frontend
npm install
npm run dev

or simply open index.html
