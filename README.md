
# ScholarAI 📚🤖
An AI-powered research assistant that helps you **read, analyze, and organize academic papers** with ease. Built with **React + TypeScript + Vite**, ScholarAI integrates **Google Gemini API** to make research faster, smarter, and more interactive.

---

## ✨ Features
- 🔍 **Smart Analysis**: Upload research papers and get AI-powered summaries & insights.
- 🗂 **Project Management**: Save and revisit your past analyses with a clean dashboard.
- 📑 **History Tracking**: Keep track of all your queries and paper reviews.
- 📊 **Visual Displays**: Interactive analysis view with clear topic segmentation.
- ⚡ **Modern UI**: Tailwind CSS for responsive and sleek design.
- 🔐 **Secure API Handling**: Environment variable-based API key management.

---

## 🛠 Tech Stack
- **Frontend**: React 19, TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS, PostCSS, Autoprefixer
- **AI Integration**: Google Gemini API
- **Deployment**: Vercel

---

## 🚀 Deploying Your ScholarAI Application

This guide provides step-by-step instructions on how to take your ScholarAI application from this development sandbox to a live website on the internet.

### Overview of the Process
To deploy the app, you will:
1. Set up a standard web development project on your local computer.
2. Install a build tool (Vite) and other dependencies.
3. Configure environment variables for API keys.
4. Deploy on Vercel.

---

### Step 1: Set Up The Project Locally
```bash
# Clone the repo
git clone https://github.com/swastim01/ScholarAI.git
cd ScholarAI

# Install dependencies
npm install
````

---

### Step 2: Configuration

**Vite config (`vite.config.ts`)**

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

**Tailwind config (`tailwind.config.js`)**

```js
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

**PostCSS config (`postcss.config.js`)**

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

**Global Styles (`index.css`)**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

### Step 3: Environment Variables

Create a `.env` file in your project root:

```env
VITE_API_KEY=YOUR_GEMINI_API_KEY_HERE
```

Update `services/geminiService.ts`:

```ts
const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_API_KEY,
});
```

---

### Step 4: Deploy to Vercel

1. Push your code to GitHub.
2. Go to [Vercel](https://vercel.com) → Import Project → Select your repo.
3. Add `VITE_API_KEY` in **Project Settings → Environment Variables**.
4. Deploy 🎉

You’ll get a live URL like:
👉 [https://scholarai.vercel.app](https://scholarai.vercel.app)

---

## 🤝 Contributing

Contributions are welcome! If you’d like to improve ScholarAI:

* Fork the repo
* Create a new branch
* Submit a PR 🚀

---

## 📜 License

This project is licensed under the MIT License.

