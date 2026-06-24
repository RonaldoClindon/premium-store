# LUXE | Premium Curated E-Commerce Store

**LUXE** is a high-end, responsive product catalog listing website built using **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**. It fetches data dynamically from the [Fake Store API](https://fakestoreapi.com/products) and presents it in a premium dark-themed interface inspired by luxury retail brands.

This application has been developed to fulfill a technical evaluation exam and demonstrates clean coding practices, modular component structures, and fluid user experiences.

---

## ✨ Features Implemented

1. **Premium Aesthetic & Layout**:
   - Dark-first aesthetic with deep slate/zinc background gradients.
   - Glassmorphism UI panels with backdrop blurs (`backdrop-filter`) and gold accent glows on hover.
   - Responsive layouts optimized for Desktop, Tablet, and Mobile devices.

2. **Core Requirements**:
   - **Product Images**: Loaded inside padded, white container headers to preserve original aspect ratios against dark backgrounds.
   - **Product Titles**: Truncated to 2 lines for uniform card alignments.
   - **Short Descriptions**: Clean summaries of each item.
   - **Dynamic Categorization & Badges**: Categories are formatted and displayed as modern badges.
   - **Price formatting**: Clear luxury font styling with decimal alignment.
   - **Interactive Modal**: Clicking "View Details" opens a slide-up dialog showing full description, ratings, price, and dummy transaction controls (quantity selector, Checkout CTAs).

3. **Bonus Features**:
   - **Real-time Live Search**: Instant title search that updates the product grid as the user types.
   - **Dynamic Category Filter**: Pill-based category buttons generated dynamically from the API datasets.
   - **Pagination / Load More**: Displays products in batches of 8, with progress status tracking how many items remain.
   - **Fractional Ratings**: Computes and renders star ratings supporting half-stars (e.g., 3.9 stars translates to 3 full and 1 half-star).
   - **Custom Floating Notifications**: Adding items to the cart displays a custom-designed toast notification with smooth entry/exit animations.

4. **Loading & Error Handling**:
   - **Shimmering Card Skeletons**: Renders matching layout skeletons on initialization to eliminate layout shifts (CLS).
   - **Error Handling**: Displays a warning interface with a reconnect/retry button to re-trigger API fetching if offline.

---

## 🛠️ Tech Stack & Dependencies

- **Framework**: [Next.js 14](https://nextjs.org/) (React 18, App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strictly typed schemas)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)

---

## 🚀 Getting Started

Follow these steps to run the application locally:

### 1. Installation
Navigate into the project directory and install the dependencies:
```bash
cd ecommerce-store
npm install
```

### 2. Running in Development Mode
Start the local development server:
```bash
npm run dev
```
Open your browser and visit [http://localhost:3000](http://localhost:3000) to view the application.

---

## 📦 Production Build & Static Export

The project is configured for static exports, meaning `npm run build` will compile the code and generate static HTML/CSS/JS files inside the `/out` directory.

To build the project:
```bash
npm run build
```

This static bundle (`/out`) can be hosted on any static provider such as **GitHub Pages**, **Vercel**, **Netlify**, or **Cloudflare Pages**.

---

## 🌐 Deploying to GitHub Pages

If you wish to host this project directly on GitHub Pages:

### Step 1: Configure Base Path (If using a repository subpath)
If your website will live at `https://<username>.github.io/<repo-name>`, update your `next.config.mjs` to include the `basePath` property:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: '/repo-name',
  assetPrefix: '/repo-name/',
};

export default nextConfig;
```

### Step 2: Push code to GitHub
Verify that the `ecommerce-store` directory is added to your git tracking and commit the changes:
```bash
git add .
git commit -m "feat: Add LUXE premium product listing page"
git push origin main
```

### Step 3: Deploy the static folder
You can use the `gh-pages` helper package to automatically deploy the `/out` directory:
1. Install it: `npm install -D gh-pages`
2. Add these scripts to `package.json`:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d out"
   }
   ```
3. Run deploy: `npm run deploy`
