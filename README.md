<div align="center">

<img src="https://raw.githubusercontent.com/VimarshS/NotesGenAI/main/client/src/assets/lg.png" alt="NotesGenAI Logo" width="80" height="80" />

# NotesGenAI

### **Ace Every Exam with AI-Powered Notes**

*Transform any topic into structured, exam-ready study material — in seconds.*

<br/>

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express%205-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Google Gemini](https://img.shields.io/badge/Google-Gemini%20AI-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![Stripe](https://img.shields.io/badge/Stripe-Payments-635BFF?style=for-the-badge&logo=stripe&logoColor=white)](https://stripe.com/)
[![Firebase](https://img.shields.io/badge/Firebase-Auth-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

<br/>

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](./LICENSE)
![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen.svg?style=flat-square)
![Made with ❤️](https://img.shields.io/badge/Made%20with-%E2%9D%A4-red.svg?style=flat-square)

</div>

---

## 📌 Overview

**NotesGenAI** is a full-stack SaaS web application that leverages Google Gemini AI to instantly generate structured, exam-focused study notes for any topic. Students simply enter a subject, configure their class level and exam type, and receive a complete study package — including detailed notes, a visual Mermaid flowchart, Recharts data visualizations, short/long exam questions, and a downloadable PDF.

The platform is built around a credit-based monetization model with real Stripe payment integration, Google OAuth authentication via Firebase, a persistent notes history dashboard, and a polished, dark-mode UI.

> 🎯 **Built for students preparing for CBSE, JEE, NEET, and any standard exam format.**

---

## 💡 Why This Project Matters

Most AI tools give you generic summaries. **NotesGenAI is purpose-built for exam preparation**, delivering:

- **Exam-aware content** — outputs are structured around exam frequency and topic weightage
- **Dual modes** — full detailed notes *or* a rapid one-page revision cheat sheet
- **Visual learning** — auto-generated diagrams and charts alongside the text
- **Real monetization** — production-grade Stripe checkout with webhook idempotency
- **Portable** — every note is downloadable as a formatted PDF

It demonstrates a complete, production-ready software lifecycle: AI prompt engineering, secure REST API design, third-party payment integration, OAuth authentication, and a polished consumer UI.

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 🤖 **AI Note Generation** | Generates detailed, exam-focused notes via Google Gemini AI with a carefully engineered structured prompt |
| ⚡ **Exam Revision Mode** | Toggle to switch output to a last-day cheat-sheet format — bullet points, formulas, and key terms only |
| 📊 **Dynamic Charts** | AI selects the most suitable Recharts chart type (bar, line, or pie) based on the topic's nature |
| 🔀 **Mermaid Diagrams** | Auto-generated `graph TD` flowchart diagrams rendered live in the browser |
| 📄 **PDF Export** | One-click server-side PDF generation using PDFKit, with structured sections for notes, questions, and revision points |
| 📂 **Notes History** | Full history dashboard — browse, re-open, and review all previously generated notes |
| 💳 **Stripe Payments** | Real credit-purchase checkout (₹100 / ₹200 / ₹500 plans) with webhook + API fallback for idempotent credit delivery |
| 🔐 **Google OAuth** | Firebase-powered Google Sign-In with JWT session management via HTTP-only cookies |
| 🎨 **Dark UI** | Fully custom dark design system using CSS variables, noise textures, grid backgrounds, and Framer Motion animations |
| 📱 **Responsive Design** | Mobile-first layout with responsive grid breakpoints across all pages |

---

## 🏗️ Tech Stack

### Frontend
| Technology | Version | Role |
|---|---|---|
| React | 19 | UI framework |
| Vite | 7 | Build tool & dev server |
| Redux Toolkit | 2 | Global state management |
| React Router DOM | 7 | Client-side routing |
| Framer Motion (`motion`) | 12 | Page & component animations |
| Tailwind CSS | 4 | Utility-first styling |
| React Markdown | 10 | AI output rendering |
| Mermaid.js | 11 | Flowchart diagram rendering |
| Recharts | 3 | Bar / Line / Pie chart components |
| Firebase | 12 | Google OAuth authentication |
| Axios | 1 | HTTP client |
| React Icons | 5 | Icon library |

### Backend
| Technology | Version | Role |
|---|---|---|
| Node.js + Express | 5 | REST API server |
| MongoDB + Mongoose | 9 | Database & ODM |
| Google Gemini API | `gemini-3-flash-preview` | AI content generation |
| Stripe | 20 | Payment processing & webhooks |
| JSON Web Token | 9 | Session token signing |
| PDFKit | 0.17 | Server-side PDF generation |
| cookie-parser | 1.4 | HTTP-only cookie sessions |
| dotenv | 17 | Environment variable management |

---

## 🔄 Architecture & Workflow

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT (React + Vite)                   │
│                                                                  │
│  Firebase Auth ──► Google OAuth ──► JWT Cookie ──► Redux Store  │
│                                                                  │
│   TopicForm ──► API call ──► Loading progress animation         │
│   FinalResult ◄── AI response ──► Mermaid / Recharts / PDF      │
└────────────────────────────┬────────────────────────────────────┘
                             │ HTTP (Axios, withCredentials)
┌────────────────────────────▼────────────────────────────────────┐
│                       SERVER (Express 5)                         │
│                                                                  │
│  isAuth Middleware (JWT verify) ──► Route protection            │
│                                                                  │
│  POST /api/notes/generate-notes                                  │
│    ├─ Credit check (≥10 required)                               │
│    ├─ buildPrompt() ──► Gemini API                              │
│    ├─ Save to MongoDB Notes collection                          │
│    └─ Deduct 10 credits, return AI response                     │
│                                                                  │
│  POST /api/credit/order ──► Stripe Checkout Session             │
│  GET  /api/credit/verify ──► Idempotent credit top-up           │
│  POST /api/credits/webhook ──► Stripe webhook (raw body)        │
│                                                                  │
│  POST /api/pdf/download ──► PDFKit stream ──► PDF response      │
└────────────────────────────┬────────────────────────────────────┘
                             │
            ┌────────────────┴────────────────┐
            │           MongoDB Atlas          │
            │  users | notes collections       │
            └─────────────────────────────────┘
```

**Data flow for note generation:**
1. User submits topic + options → `TopicForm` calls `POST /api/notes/generate-notes`
2. Server checks JWT cookie → validates user credits → builds structured prompt
3. Prompt is sent to Gemini API → response is parsed from JSON
4. Notes are saved to MongoDB, user credits are decremented
5. Client receives structured JSON → rendered via `FinalResult`, Mermaid, Recharts
6. User can toggle Quick Revision mode or export to PDF

---

## 🖥️ Screenshots / Preview

> 📸 *Screenshots coming soon — run the app locally to see the full UI.*

| Page | Description |
|---|---|
| 🏠 **Home** | Hero section with animated feature cards and how-it-works steps |
| 📝 **Generate** | Topic form (left) + AI result panel (right) with diagrams and charts |
| 📂 **History** | Sidebar note list + full note viewer |
| 💰 **Pricing** | Three-tier credit plans with Stripe checkout |
| ✅ **Payment Success/Failed** | Post-payment credit verification with user feedback |

---

## 🚀 Live Demo

> 🔗 *Deployment will be done soon .*

---

## 🛠️ Installation & Setup

### Prerequisites

Make sure you have the following installed:

- **Node.js** ≥ 18
- **npm** ≥ 9
- **MongoDB** (Atlas or local)
- A **Google Gemini API** key
- A **Firebase** project with Google Sign-In enabled
- A **Stripe** account (test mode works)

---

### 1. Clone the Repository

```bash
git clone https://github.com/VimarshS/NotesGenAI.git
cd NotesGenAI
```

---

### 2. Set Up the Server

```bash
cd server
npm install
```

Create a `.env` file inside the `server/` directory:

```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_google_gemini_api_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_signing_secret
CLIENT_URL=http://localhost:5173
```

Start the development server:

```bash
npm run dev
```

---

### 3. Set Up the Client

```bash
cd ../client
npm install
```

Create a `.env` file inside the `client/` directory:

```env
VITE_FIREBASE_APIKEY=your_firebase_api_key
```

> The Firebase `authDomain`, `projectId`, `appId`, and `messagingSenderId` are already present in `src/utils/firebase.js`. Only the API key needs to be in `.env`.

Start the frontend:

```bash
npm run dev
```

---

### 4. Run Locally

| Service | URL |
|---|---|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:8000 |

> ⚠️ Make sure `serverUrl` in `client/src/App.jsx` points to `http://localhost:8000` for local development.

---

## 🔐 Environment Variables

### Server (`server/.env`)

| Variable | Description |
|---|---|
| `PORT` | Server port (default: `8000`) |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for signing JWTs |
| `GEMINI_API_KEY` | Google Gemini API key |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook endpoint signing secret |
| `CLIENT_URL` | Frontend URL for CORS and Stripe redirects |

### Client (`client/.env`)

| Variable | Description |
|---|---|
| `VITE_FIREBASE_APIKEY` | Firebase project API key |

---

## 📁 Folder Structure

```
NotesGenAI/
│
├── client/                          # React frontend (Vite)
│   ├── public/                      # Static assets
│   ├── src/
│   │   ├── assets/                  # Images and logos
│   │   ├── components/
│   │   │   ├── FinalResult.jsx      # Renders full AI note output
│   │   │   ├── MermaidSetup.jsx     # Mermaid diagram renderer
│   │   │   ├── RechartSetUp.jsx     # Bar / Line / Pie chart renderer
│   │   │   ├── TopicForm.jsx        # Note generation form with toggles
│   │   │   ├── Sidebar.jsx          # Notes result sidebar
│   │   │   ├── Navbar.jsx           # Top navigation bar
│   │   │   └── Footer.jsx           # Page footer
│   │   ├── pages/
│   │   │   ├── Home.jsx             # Landing page with hero + features
│   │   │   ├── Notes.jsx            # Main note generation page
│   │   │   ├── History.jsx          # Saved notes dashboard
│   │   │   ├── Pricing.jsx          # Credit plans + Stripe checkout
│   │   │   ├── Auth.jsx             # Google Sign-In page
│   │   │   ├── PaymentSuccess.jsx   # Post-payment credit verification
│   │   │   └── PaymentFailed.jsx    # Payment cancellation page
│   │   ├── redux/
│   │   │   ├── store.js             # Redux store configuration
│   │   │   └── userSlice.js         # User state + credit updates
│   │   ├── services/
│   │   │   └── api.js               # Axios API calls
│   │   ├── utils/
│   │   │   └── firebase.js          # Firebase auth + Google provider
│   │   ├── App.jsx                  # Root component + route definitions
│   │   ├── App.css                  # Global design system (CSS variables)
│   │   └── main.jsx                 # React entry point
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── server/                          # Node.js backend (Express)
│   ├── controllers/
│   │   ├── auth.controller.js       # Google OAuth sign-in + logout
│   │   ├── generate.controller.js   # AI note generation + credit deduction
│   │   ├── notes.controller.js      # Fetch user notes (list + single)
│   │   ├── credits.controller.js    # Stripe orders, webhook, verify
│   │   ├── pdf.controller.js        # Server-side PDF generation
│   │   └── user.controller.js       # User profile data
│   ├── middleware/
│   │   └── isAuth.js                # JWT cookie authentication middleware
│   ├── models/
│   │   ├── user.model.js            # User schema (credits, notes refs)
│   │   └── notes.model.js           # Notes schema (topic, content, flags)
│   ├── routes/
│   │   ├── auth.route.js            # /api/auth
│   │   ├── genrate.route.js         # /api/notes
│   │   ├── credits.route.js         # /api/credit
│   │   ├── pdf.route.js             # /api/pdf
│   │   └── user.route.js            # /api/user
│   ├── services/
│   │   └── gemini.services.js       # Gemini API fetch + response parser
│   ├── utils/
│   │   ├── connectDb.js             # MongoDB connection
│   │   ├── promptBuilder.js         # Structured AI prompt construction
│   │   └── token.js                 # JWT signing utility
│   ├── index.js                     # Express app entry point
│   └── package.json
```

---

## 💎 Code Highlights

### 1. Prompt Engineering (`server/utils/promptBuilder.js`)
A carefully crafted, 80+ line structured prompt instructs Gemini to return **strictly valid JSON** with sub-topic importance tiers (⭐/⭐⭐/⭐⭐⭐), revision points, exam questions, Mermaid diagram syntax, and Recharts-compatible chart data — all in one inference call.

### 2. Idempotent Stripe Payments (`server/controllers/credits.controller.js`)
Credits are delivered via a dual-path system: a **Stripe webhook** for production and a **session-verify API** as a development fallback. Both paths store the `payment_intent` ID in the user record to prevent double credit delivery — a real-world safeguard most student projects omit.

### 3. Mermaid Node Sanitization (`client/src/components/MermaidSetup.jsx`)
A `fixNodes()` function re-maps AI-generated Mermaid node labels to safe `N1["label"]` format before rendering, preventing syntax errors caused by special characters in raw AI output.

### 4. Real-time Progress Animation (`client/src/components/TopicForm.jsx`)
During generation, a fake-but-convincing progress bar with step-labeled text (`Analysing topic… → Writing notes… → Almost done…`) uses a `setInterval` with random increments and caps at 95% — a UX detail that significantly improves perceived performance.

### 5. Route Guards (`client/src/App.jsx`)
All protected pages use `<Navigate to="/auth" replace/>` if `userData` is `null` in Redux state, ensuring unauthenticated users are redirected without leaving history entries — a clean session management pattern.

---

## 🧩 Challenges Solved

| Challenge | Solution |
|---|---|
| **Gemini returns invalid JSON** | `promptBuilder` uses strict prompt constraints; `gemini.services.js` strips markdown fences before `JSON.parse()` |
| **Duplicate credit delivery on payment** | Idempotency check using `processedPayments[]` array storing `payment_intent` IDs in the user document |
| **Stripe webhook requires raw body** | Stripe webhook route is registered *before* `express.json()` middleware with `express.raw()` — correctly isolated |
| **Mermaid crashes on special chars** | Pre-render sanitization with `fixNodes()` wraps all node labels in safe quoted format |
| **JWT cookie not sent cross-origin** | `cors({ credentials: true })` + `axios({ withCredentials: true })` + `httpOnly: true, secure: true` cookie configuration |
| **Credits UI out of sync post-generation** | `updateCredits` Redux action is dispatched immediately after the API response, keeping the Navbar credit badge live |

---

## ⚡ Performance & Optimization Notes

- **Vite 7** with React Fast Refresh ensures near-instant HMR during development
- **Framer Motion** animations are configured with `whileInView` + `viewport: { once: true }` to avoid re-triggering on scroll
- **MongoDB queries** use `.select()` to return only necessary fields on the history list endpoint, avoiding large `content` payloads in the sidebar
- **Gemini response caching** is left as a future enhancement — currently each generation is a fresh API call
- **Stripe Checkout** uses hosted sessions, offloading PCI compliance to Stripe's infrastructure
- **PDF generation** is fully server-side (PDFKit streams directly to `res`), keeping binary work off the client

---

## 🔭 Future Improvements

- [ ] 🌐 **Live deployment** on Vercel (frontend) + Railway/Render (backend)
- [ ] 🔁 **Gemini response caching** — cache identical topic+options combinations in Redis
- [ ] 📎 **Image upload** — allow students to upload a chapter scan for AI extraction
- [ ] 🗑️ **Delete notes** — add delete functionality to the history dashboard
- [ ] 🌍 **Multi-language support** — generate notes in Hindi, Spanish, etc.
- [ ] 🧪 **Unit & integration tests** — Jest + Supertest for API routes, Vitest for components
- [ ] 📧 **Email receipts** — send Stripe payment confirmations via Nodemailer
- [ ] 🌙 **Light mode** — toggle between dark and light design themes
- [ ] 📊 **Analytics dashboard** — track notes generated, credits used, and topics per user

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

```bash
# 1. Fork the repository
# 2. Create your feature branch
git checkout -b feature/your-feature-name

# 3. Commit your changes
git commit -m "feat: add your feature"

# 4. Push to your branch
git push origin feature/your-feature-name

# 5. Open a Pull Request
```

Please make sure your code:
- Follows the existing code style
- Does not break existing functionality
- Includes comments for any complex logic

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details.

---

## 👨‍💻 About the Developer

**NotesGenAI** was designed and built by **Vimarsh S** — a full-stack developer passionate about building AI-powered products that solve real student problems.

This project demonstrates hands-on experience with:
- 🤖 Prompt engineering & LLM integration
- 💳 Production payment flows (Stripe)
- 🔐 OAuth + JWT authentication
- ⚛️ Modern React patterns (Redux Toolkit, React Router v7, Framer Motion)
- 🖥️ REST API design & MongoDB modeling
- 🎨 Custom dark UI/UX design systems

---

## 🌐 Connect With Me

<div align="center">

[![GitHub](https://img.shields.io/badge/GitHub-VimarshS-181717?style=for-the-badge&logo=github)](https://github.com/VimarshS)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/)
[![Email](https://img.shields.io/badge/Email-Contact-EA4335?style=for-the-badge&logo=gmail)](mailto:)

</div>

---

## ⭐ Star This Repo

If **NotesGenAI** helped you, inspired you, or impressed you — please consider giving it a star!

<div align="center">

[![Star this repo](https://img.shields.io/github/stars/VimarshS/NotesGenAI?style=social)](https://github.com/VimarshS/NotesGenAI)

**Stars motivate continued development and help other students discover this tool. 🙌**

</div>

---

<div align="center">

<sub>Built with ❤️ using React · Node.js · MongoDB · Google Gemini · Stripe · Firebase</sub>

<sub>© 2025 Vimarsh S · MIT License</sub>

</div>
