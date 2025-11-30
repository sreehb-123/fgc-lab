# Lab CMS

A modern, dynamic Content Management System (CMS) built with **React** (Frontend) and **Strapi** (Backend) for managing and displaying lab/research website content. This project features a component-based architecture with customizable sections, real-time content editing, and a responsive UI.

---

## 🚀 Features

### Frontend
- **Dynamic Page Rendering**: Pages are fetched from Strapi and rendered dynamically based on content type
- **Component-Based Sections**:
  - **Text Section**: Rich text content with optional links and dates
  - **Cards Section**: Display information in card grids with vertical accent borders
  - **Faculty Cards**: Showcase team members with photos, roles, and contact info
  - **Table Section**: Display tabular data with status indicators
  - **Carousel Section**: Image carousels with captions
  - **Gallery Section**: Multiple layout options (Grid, Masonry, Carousel)
- **Horizontal Navigation**: Auto-generated section navigation that appears on scroll
- **Responsive Design**: Mobile-first design with Tailwind CSS v4
- **Color Palette**: Professional design with Primary (#1A237E), Secondary (#3949AB), Accent (#00A3A1)
- **Smooth Animations**: Fade-in effects and hover transitions

### Backend (Strapi)
- **Headless CMS**: RESTful API for content management
- **Dynamic Zones**: Flexible section composition for pages
- **Component Library**: Reusable content components
- **SQLite Database**: Lightweight, file-based database
- **Media Upload**: Image and file management

---

## 📁 Project Structure

```
fgc-lab/
├── Frontend/                    # React frontend application
│   ├── src/
│   │   ├── api/                # API integration (Axios)
│   │   ├── components/
│   │   │   ├── sections/      # Section components (Cards, Text, Table, etc.)
│   │   │   ├── Navbar.jsx     # Main navigation bar
│   │   │   ├── Footer.jsx     # Footer component
│   │   │   └── HorizontalNav.jsx  # Scroll-based section nav
│   │   ├── context/           # React Context (Page, Auth)
│   │   ├── pages/             # Page components
│   │   ├── utils/             # Utility functions (formatter)
│   │   └── index.css          # Global styles & color palette
│   ├── package.json
│   └── vite.config.js
│
├── backend/                    # Strapi backend
│   ├── src/
│   │   ├── api/
│   │   │   └── page/          # Page content type
│   │   └── components/
│   │       └── sections/      # Section components schema
│   ├── config/                # Strapi configuration
│   ├── database/              # Database files
│   └── package.json
│
└── README.md
```

---

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **React Router v7** - Client-side routing
- **Tailwind CSS v4** - Utility-first CSS framework
- **Vite** - Build tool and dev server

### Backend
- **Strapi v5.28** - Headless CMS
- **SQLite (better-sqlite3)** - Database
- **Node.js 18+** - Runtime
- **TypeScript** - Type safety

---

## 📦 Installation & Setup

### Prerequisites
- Node.js >= 18.0.0 (and <= 22.x.x)
- npm >= 6.0.0

### 1. Clone the Repository
```bash
git clone https://github.com/sreehb-123/fgc-lab
cd fgc-lab
```

### 2. Backend Setup (Strapi)
```bash
cd backend
npm install
npm run develop
```

Strapi admin panel will be available at: `http://localhost:1337/admin`

**First-time setup:**
1. Create an admin account
2. Navigate to Content-Type Builder
3. The `Page` content type with dynamic sections should already be configured
4. Create pages and add sections via Content Manager

### 3. Frontend Setup (React)
```bash
cd Frontend
npm install
```

Create a `.env` file in the `Frontend` directory:
```env
VITE_API_BASE_URL=http://localhost:1337/api
```

Start the development server:
```bash
npm run dev
```

Frontend will be available at: `http://localhost:5173`

---

## 📄 Content Structure

### Page Content Type
Each page consists of:
- **Title**: Page title
- **Slug**: URL-friendly identifier (e.g., "home", "research")
- **Sections**: Dynamic zone containing various section components

### Available Section Components

#### 1. Text Section
Rich text content with optional metadata:
- Title, Date, Date Range
- Rich text content (via Strapi Blocks)
- Optional link with description

#### 2. Cards Section
Grid of information cards:
- Section title and subtitle
- Subsections with card grids
- Each card: Title, Subtitle, Info, Number
- Alternating accent colors

#### 3. Faculty Cards Section
Display team members:
- Large profile image
- Name, Role, Description
- Email contact link

#### 4. Table Section
Tabular data display:
- Column headers
- Rows with status indicators
- Color-coded status badges (Completed, Pending, Delayed, etc.)

#### 5. Carousel Section
Image slideshow:
- Auto-playing carousel
- Image with caption
- Configurable transition speed

#### 6. Gallery Section
Image gallery with layout options:
- **Grid**: Responsive grid layout
- **Masonry**: Pinterest-style layout
- **Carousel**: Slideshow format

---

## 🔧 Configuration

### Frontend Configuration (`Frontend/vite.config.js`)
```javascript
export default defineConfig({
  plugins: [react(),tailwindcss()],
})
```

### Backend Configuration (`backend/config/server.ts`)
Configure CORS, host, and port settings for the Strapi backend.

---

## 🚀 Deployment

### Frontend (Netlify/Vercel)
```bash
cd Frontend
npm run build
```
Deploy the `dist/` folder to your hosting provider.

**Environment Variable:**
- `VITE_API_BASE_URL`: Your production Strapi API URL

### Backend (Strapi Cloud/Railway/Heroku)
```bash
cd backend
npm run build
npm start
```

Configure production database and environment variables as per your hosting provider.

---

## 📝 Usage

### Creating a New Page
1. Go to Strapi Admin Panel (`/admin`)
2. Navigate to **Content Manager > Pages**
3. Click **Create new entry**
4. Add a title (slug auto-generates)
5. Add sections using the **Dynamic Zone**
6. Save and Publish

### Accessing Pages in Frontend
Pages are accessible via their slug:
- `http://localhost:5173/` → Home page
- `http://localhost:5173/research` → Research page
- `http://localhost:5173/about` → About page

---

## 🎯 Key Features Explained

### Dynamic Navigation
- **Navbar**: Fixed top navigation with dropdown for pages and sections
- **HorizontalNav**: Appears on scroll, shows page sections for quick navigation

### Responsive Design
- Mobile-first approach with breakpoints: `sm`, `md`, `lg`, `xl`
- Cards adapt from 1 column (mobile) to 2-3 columns (desktop)
- Horizontal overflow handling for tables on mobile

### Section Rendering
The `SectionRenderer` component (`Frontend/src/components/SectionRenderrer.jsx`) dynamically renders sections based on their type (`__component` field from Strapi).

---

## 🔍 API Endpoints

### Get Page by Slug
```
GET /api/pages?filters[slug][$eq]=home&populate[sections][on][sections.card-section][populate][subSection][populate]=*&...
```

Returns page data with all nested sections populated.

---

## 📜 License

This project is private and proprietary.

---

## 👥 Team

**NextGen Lab** - © All rights reserved.

---

## 📚 Resources

- [React Documentation](https://react.dev/)
- [Strapi Documentation](https://docs.strapi.io/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Vite Documentation](https://vite.dev/)

---

**Happy Coding! 🚀**

