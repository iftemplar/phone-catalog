# 📦 Phone Store App

## Initial Setup

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🏗️ Architecture & Project Structure

This project is built with Next.js 13+ using the App Router. It follows a modular structure, with clear separation of concerns between data fetching, components, context, and utilities.

```
scripts/                    # Utility scripts for API data/images
├── fetch-homepage.mjs      # Fetches product list for home page
├── download-Home-images.mjs
├── fetch-phoneDetails.mjs  # Fetches detailed product specs
├── download-PhoneDetails-images.mjs

src/
├── app/                    # Next.js app directory with routes
│   └── phones/[id]/        # Dynamic route for product detail
├── components/             # All React components
│   ├── Cart/               # Cart view component
│   ├── Header/             # Top navigation bar
│   ├── HomeClient/         # Home page logic and grid rendering
│   ├── PhoneCard/          # Single phone card for listing
│   ├── PhoneDetail/        # Product detail view
│   └── SearchBar/          # Search input component
├── context/
│   └── CartContext.tsx     # Cart state management with localStorage
├── data/                   # Local JSON fallbacks for offline mode
│   ├── Home-local.json
│   ├── Home-local-ready.json
│   ├── PhoneDetails-local.json
│   └── PhoneDetails-local-ready.json
├── lib/                    # Utility functions (e.g., fetchPhones.ts)
├── types/                  # TypeScript types
├── utils/
│   └── trimImages.mjs      # Custom tool for trimming image borders
public/
├── images/                 # Raw images from API
├── images-trimmed/         # Locally processed images (no transparent borders)
├── icons/                  # UI icons (e.g., cart)
├── logo.svg                # Project logo
└── no-image.jpg            # Fallback image
```

---

## 💡 Key Architecture Concepts

### 📡 Data Fetching

- API data is fetched at runtime with fallback to `src/data/*.json` if offline.
- Scripts in `scripts/` allow pre-fetching and saving local data for development or offline testing.

### 🛒 Cart State

- Managed via `CartContext` using **React Context API**.
- State is persisted in **localStorage**, so the cart remains intact on refresh.
- Quantity per item is tracked and adjustable via **increment/decrement** controls.
- Items are uniquely identified using their **id + selected options**.

---

### 🔌 Offline Support

- If the API is unavailable, the app uses local **JSON** and **image assets**.
- Easy to toggle or simulate offline mode for testing.

---

### 🖼️ Image Handling

- Images from API are downloaded and processed using **sharp**.
- Transparent borders are trimmed and saved to `public/images-trimmed/` for consistent UI.
- Components use trimmed images automatically if available.

---

### 🌐 Routing

- Uses **App Router** with dynamic routes (e.g., `/phones/[id]`).
- Navigation is smooth with **Next.js Link**.

---

### 🎨 Styling

- **CSS Modules** (`*.module.css`) scoped per component.
- Includes **responsive design** and custom **hover animations**.

---

# 🔌 Offline Mode Support

This project supports offline usage for development and testing. It allows you to work without accessing the live API by falling back to local JSON data and pre-downloaded images. You don't need to do anything - the local files ready for offline mode are already included in the project.

## 🚀 Getting Started

Generate and download all local data and images:

```bash
node scripts/fetch-homepage.mjs
node scripts/download-Home-images.mjs

node scripts/fetch-phoneDetails.mjs
node scripts/download-PhoneDetails-images.mjs
```

These scripts will:

- Save product data into `src/data/`
- Save images into `public/images/`

---

## 🖼️ Image Trimming Tool

To ensure images from the API look consistent (removing transparent borders), we use a custom script that trims transparent areas.

### How It Works:

- Input: `/public/images`
- Output: `/public/images-trimmed`
- Trims transparent padding from `.webp`, `.png`, `.jpg`.

### Usage:

1. Place your raw images in `public/images` by running the download script.

```bash
node scripts/download-Home-images.mjs
```

2. Run the script:

```bash
node src/utils/trimImages.mjs
```

Trimmed images will be saved in public/images-trimmed.

---

## ✅ How to Test It's Working

You can verify offline mode by editing the local JSON data.

For example:

- Add `"[local]"` to a phone name in `Home-local.json`
- Refresh the page
- If the "[local]" text appears — you're running in offline mode

---

## 📌 Notes

- Environment variables `NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_API_KEY` are required for live API calls.
- When API is available and functioning, local fallback is bypassed.
- Scripts use the same API endpoints as your app — check network or `.env` config if something doesn't match.

---

## 🛒 Bonus Features

### Quantity Counter in Cart:

- Users can now increase or decrease the quantity of each product directly in the cart.
- The cart UI displays live quantity updates for each item.
- If quantity reaches zero, the item is automatically removed.
- Total price dynamically adjusts based on quantity.
- Eliminar button still allows to remove the item completely.

---

## 🚧 Future Improvements

Due to time constraints, the following features are not fully implemented but can be added easily thanks to the current modular structure:

- **Similar Products Slider**:  
  The "Similar products" section is currently displayed as a static grid. I plan to enhance this section with a responsive, touch-friendly slider for better user experience.

- **Testing**:  
  Unit and integration tests were not included in this version. The architecture is designed with testability in mind, and I plan to add tests for key components (e.g., `CartContext`, `CartClient`) using **Jest** and **React Testing Library**.

- **Accessibility (a11y)**:  
  Basic accessibility support is present (e.g., `alt` text, some `aria-labels`), but further improvements are needed. I intend to enhance keyboard navigation support and ensure full compliance with WCAG standards.

---
