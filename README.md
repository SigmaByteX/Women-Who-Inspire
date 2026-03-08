# 🌸 Women Who Inspire

> A full-stack web application celebrating inspiring women around the world, built for International Women's Day.

![Tech Stack](https://img.shields.io/badge/React-18-blue) ![Node.js](https://img.shields.io/badge/Node.js-Express-green) ![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-brightgreen)

---

## ✨ Features

- **Home Page** — Hero section, Woman of the Day feature, category grid
- **Explore Page** — Responsive card grid with search & field filtering
- **Story Detail Page** — Full biography, achievements, quote, like system
- **Add Story Form** — Submit new inspiring women with validation
- **Like System** — Like counts persisted in MongoDB + localStorage
- **Search & Filter** — Live search by name, filter by field/category

---

## 🗂 Folder Structure

```
women-who-inspire/
├── backend/
│   ├── models/
│   │   └── Woman.js          # Mongoose schema
│   ├── routes/
│   │   └── women.js          # REST API routes
│   ├── server.js             # Express entry point
│   ├── seed.js               # Sample data seeder
│   ├── .env.example          # Environment variables template
│   └── package.json
│
└── frontend/
    ├── public/
    │   └── index.html
    └── src/
        ├── components/
        │   ├── Navbar.jsx + .css
        │   ├── WomanCard.jsx + .css
        │   └── SearchFilter.jsx + .css
        ├── pages/
        │   ├── Home.jsx + .css
        │   ├── Explore.jsx + .css
        │   ├── Story.jsx + .css
        │   └── AddStory.jsx + .css
        ├── hooks/
        │   └── useWomen.js   # Custom React hooks
        ├── utils/
        │   └── api.js        # Axios API client
        ├── App.js            # Router & layout
        └── App.css           # Global design system
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

### 1. Clone & Install

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Configure Environment

```bash
cd backend
cp .env.example .env
# Edit .env with your MongoDB URI
```

**backend/.env:**
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/women-who-inspire
CLIENT_URL=http://localhost:3000
NODE_ENV=development
```

### 3. Seed the Database

```bash
cd backend
npm run seed
```

This seeds 6 inspiring women: Kalpana Chawla, Marie Curie, Indra Nooyi, Malala Yousafzai, Serena Williams, and Ada Lovelace.

### 4. Start the Application

**Terminal 1 — Backend:**
```bash
cd backend
npm run dev
# → Running on http://localhost:5000
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm start
# → Running on http://localhost:3000
```

---

## 📡 API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/women` | Get all women (supports `?search=`, `?field=`, `?page=`, `?limit=`) |
| GET | `/api/women/featured` | Get "Woman of the Day" |
| GET | `/api/women/:id` | Get single story |
| POST | `/api/women` | Add new inspiring woman |
| PATCH | `/api/women/:id/like` | Increment like count |
| PUT | `/api/women/:id` | Update a story |
| DELETE | `/api/women/:id` | Delete a story |
| GET | `/api/health` | Health check |

### Example API Calls

```bash
# Get all women in Science
curl http://localhost:5000/api/women?field=Science

# Search by name
curl http://localhost:5000/api/women?search=Malala

# Get featured woman
curl http://localhost:5000/api/women/featured

# Like a story
curl -X PATCH http://localhost:5000/api/women/<id>/like

# Add a new story
curl -X POST http://localhost:5000/api/women \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Amelia Earhart",
    "field": "Science",
    "nationality": "American",
    "birthYear": 1897,
    "photoUrl": "https://...",
    "shortDescription": "First female aviator to fly solo across the Atlantic Ocean.",
    "biography": "...",
    "achievements": ["First woman to fly solo across the Atlantic", "Set altitude record for autogiros"],
    "quote": "The most difficult thing is the decision to act, the rest is merely tenacity."
  }'
```

---

## 🗄 MongoDB Schema

```js
{
  name: String,                    // required
  field: String (enum),            // required — Science, Technology, Sports, etc.
  photoUrl: String,                // required
  shortDescription: String,        // required, max 300 chars
  biography: String,               // required
  achievements: [String],
  quote: String,                   // max 500 chars
  gallery: [{ url, caption }],
  likes: Number,                   // default 0
  nationality: String,
  birthYear: Number,
  deathYear: Number,
  isFeatured: Boolean,             // "Woman of the Day"
  tags: [String],
  createdAt, updatedAt             // auto timestamps
}
```

---

## 🎨 Design System

- **Display Font**: Cormorant Garamond (serif, editorial feel)
- **Body Font**: DM Sans (clean, modern)
- **Primary Color**: Purple (#7c3aed)
- **Accent Color**: Rose (#f43f5e)
- **Theme**: Luxury editorial meets empowerment

---

## 🌱 Seed Data

The included seed covers:

| Name | Field | Nationality |
|------|-------|-------------|
| Kalpana Chawla | Science | Indian-American |
| Marie Curie | Science | Polish-French |
| Indra Nooyi | Business | Indian-American |
| Malala Yousafzai | Activism | Pakistani |
| Serena Williams | Sports | American |
| Ada Lovelace | Technology | British |

---

## 🔮 Possible Extensions

- **Auth** — User accounts with JWT for persistent likes
- **Comments** — Discussion section per story
- **Image Upload** — Cloudinary/S3 integration instead of URL
- **Admin Dashboard** — Manage/approve submissions
- **Internationalization** — Multi-language support
- **Email Newsletter** — "Woman of the Week" subscription

---

*Made with 💜 to celebrate women everywhere — International Women's Day*
