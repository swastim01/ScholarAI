# Deploying Your ScholarAI Application

This guide provides step-by-step instructions on how to take your ScholarAI application from this development sandbox to a live website on the internet.

## Overview of the Process

To deploy the app, you will:
1.  Set up a standard web development project on your local computer.
2.  Install a build tool (we'll use Vite) and other dependencies.
3.  Make minor adjustments to the code to handle API keys securely.
4.  Use a hosting service (like Vercel) to build and publish your site.

---

## Step 1: Set Up The Project Locally

1.  **Create a Project Folder**: On your computer, create a new folder for your project (e.g., `scholar-ai-app`).

2.  **Copy All Project Files**: Copy every file and folder from this environment into the new `scholar-ai-app` folder you just created. Your folder should look like this:
    ```
    scholar-ai-app/
    ├── components/
    ├── hooks/
    ├── screens/
    ├── services/
    ├── App.tsx
    ├── constants.ts
    ├── index.html
    ├── ... and so on
    ```

3.  **Initialize a Node.js Project**: Open your terminal, navigate into your `scholar-ai-app` folder, and run this command. This allows you to manage dependencies.
    ```bash
    npm init -y
    ```

4.  **Install Dependencies**: Run the following command to install React, Vite (our build tool), Tailwind CSS, and other necessary packages.
    ```bash
    npm install react@^19.1.1 react-dom@^19.1.1 @google/genai@^1.21.0
    npm install --save-dev vite @vitejs/plugin-react typescript @types/react @types/react-dom tailwindcss postcss autoprefixer
    ```

---

## Step 2: Create Configuration Files

You need to add a few configuration files to your project root for everything to work together. Create the following files inside your `scholar-ai-app` folder.

1.  **`vite.config.ts`** (For our build tool, Vite)
    ```typescript
    import { defineConfig } from 'vite'
    import react from '@vitejs/plugin-react'

    // https://vitejs.dev/config/
    export default defineConfig({
      plugins: [react()],
    })
    ```

2.  **`tailwind.config.js`** (For Tailwind CSS styles)
    ```javascript
    /** @type {import('tailwindcss').Config} */
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

3.  **`postcss.config.js`** (For Tailwind CSS processing)
    ```javascript
    export default {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    }
    ```

4.  **Create a CSS file**: Create a new file `index.css` in your project root and add the following lines. This imports Tailwind's base styles into your project.
    ```css
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    ```

---

## Step 3: Adapt The Source Code

1.  **Update `index.html`**:
    *   Open `index.html` and remove the entire `<script type="importmap">...</script>` block.
    *   Also, remove the `<script src="https://cdn.tailwindcss.com"></script>` tag, as Tailwind is now part of our build process.
    *   Add a link to your new `index.css` file inside the `<head>` section:
        ```html
        <link rel="stylesheet" href="/index.css">
        ```

2.  **Update `geminiService.ts` for API Key**:
    *   To keep your API key secure, we will use environment variables. First, create a file named `.env` in your project root. **Do not share this file publicly.**
        ```
        VITE_API_KEY=YOUR_GEMINI_API_KEY_HERE
        ```
    *   Now, open `services/geminiService.ts` and change how the API key is accessed.
        *   Find: `const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });`
        *   Replace with: `const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY });`

---

## Step 4: Deploy to Vercel

1.  **Push to GitHub**: Initialize a git repository, commit your code, and push it to a new repository on [GitHub](https://github.com).

2.  **Import to Vercel**:
    *   Sign up for a free account at [vercel.com](https://vercel.com) using your GitHub account.
    *   On your dashboard, click "Add New... -> Project" and import your GitHub repository.

3.  **Configure and Deploy**:
    *   Vercel will automatically detect that you're using Vite.
    *   Before deploying, go to the project's **Settings** tab and find **Environment Variables**.
    *   Add a variable with the name `VITE_API_KEY` and paste your Gemini API key as the value.
    *   Go back to the Deployments tab and trigger a new deployment.

Vercel will now build and host your application. Once it's done, you'll have a live URL to share!