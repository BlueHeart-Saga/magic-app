# 🎩 Magics OF Python

A modern, fast, and responsive web application built with React, Vite, Tailwind CSS, and Framer Motion. This app features interactive math tricks and logic games with a premium dark-mode aesthetic.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation
1. Clone the repository
2. Run `npm install`
3. Run `npm run dev` to start the development server.

## 🌐 Deployment to Vercel

This project is fully optimized for Vercel lightweight frontend hosting.

### Step-by-Step Vercel Deployment

1. **Commit and Push to GitHub:**
   Make sure all your files are committed and pushed to your own GitHub repository.
   ```bash
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/magics-of-python.git
   git push -u origin main
   ```

2. **Connect to Vercel:**
   - Go to [Vercel.com](https://vercel.com/) and log in with your GitHub account.
   - Click **Add New Project**.
   - Find your `magics-of-python` repository and click **Import**.

3. **Configure Build Settings:**
   - Vercel automatically detects that you are using Vite!
   - Ensure the preset says **Vite**.
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
   - Click **Deploy**.

4. **Continuous Deployment:**
   - Vercel automatically creates a CI/CD pipeline. Every future push you make to your `main` branch will automatically trigger a new deployment seamlessly!

### Bonus: Setting up a Custom Domain
Once deployed, Vercel gives you a `.vercel.app` domain. To add a custom domain:
1. Go to your Vercel Project Dashboard.
2. Click **Settings** > **Domains**.
3. Type in your custom domain (e.g., `magicsofpython.com`) and click **Add**.
4. Follow the provided DNS instructions to configure your domain registrar's A records or nameservers to point to Vercel.

## 📈 Performance & SEO
- Contains custom SEO Meta Tags, Open Graph previews, and viewport scaling elements.
- Optimized rendering with React component lazy loading via Vite chunks.
- Smooth animations executed efficiently using Framer Motion SVG and CSS utilities avoiding DOM reflows.
