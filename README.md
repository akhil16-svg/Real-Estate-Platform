# 🏠 RealEstatePro — Full-Stack Property Listing Platform

A full-stack web application where users can browse, list, save, and chat about real estate properties. Built with React, Node.js, MongoDB, Socket.io, and Leaflet maps.

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [How It Works](#how-it-works)
- [Setup Instructions](#setup-instructions)
- [Environment Variables](#environment-variables)
- [API Overview](#api-overview)
- [Screenshots](#screenshots)
- [Future Improvements](#future-improvements)

---

## ✨ Features

- **User Authentication** — Register, log in, and log out securely using JWT (stored in HTTP-only cookies)
- **Create Property Listings** — Add properties with title, price, address, city, bedrooms, bathrooms, coordinates, and images
- **Image Upload** — Upload multiple property images via Cloudinary
- **Search & Filter** — Search properties by city, type (buy/rent), property kind, price range, and number of bedrooms
- **Interactive Map** — View all matching properties on a Leaflet map with clickable pins and popups
- **Save Properties** — Logged-in users can save and unsave favourite listings
- **Real-Time Chat** — Message other users in real time using Socket.io
- **User Profile** — View and update your profile, see your own listings and saved posts

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, React Router v6, Vite |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (via Prisma ORM) |
| **Authentication** | JWT (JSON Web Tokens) + HTTP-only cookies |
| **Real-Time Chat** | Socket.io |
| **Maps** | Leaflet, React-Leaflet |
| **Image Upload** | Cloudinary |
| **Styling** | Plain CSS (modular per component) |

---

## 📁 Project Structure

```
Real-Estate-Platform/
│
├── frontend/                          # React client (Vite)
│   ├── public/                        # Static assets (logo, placeholder images)
│   ├── src/
│   │   ├── components/                # Reusable UI components
│   │   │   ├── card/                  # Property card shown in listings
│   │   │   ├── chat/                  # Real-time chat UI
│   │   │   ├── filter/                # Search filter bar
│   │   │   ├── layout/                # Page layout wrapper (Navbar + Outlet)
│   │   │   ├── map/                   # Leaflet map wrapper
│   │   │   ├── navbar/                # Top navigation bar
│   │   │   ├── pin/                   # Map pin / popup
│   │   │   ├── requireAuth/           # Route guard (redirect if not logged in)
│   │   │   ├── searchBar/             # Home page search bar
│   │   │   └── slider/                # Image slider / lightbox
│   │   ├── context/
│   │   │   ├── AuthContext.jsx        # Global auth state (currentUser)
│   │   │   └── SocketContext.jsx      # Socket.io connection & online users
│   │   ├── lib/
│   │   │   ├── apiRequest.js          # Axios instance with base URL & credentials
│   │   │   └── loaders.js             # React Router data loaders
│   │   ├── pages/
│   │   │   ├── homePage/              # Landing page with search
│   │   │   ├── listPage/              # Property list + map
│   │   │   ├── singlePage/            # Single property detail
│   │   │   ├── profilePage/           # User profile, listings, saved posts, chat
│   │   │   ├── profileUpdatePage/     # Edit profile form
│   │   │   ├── newPostPage/           # Create new property listing
│   │   │   ├── updatePostPage/        # Edit existing listing
│   │   │   ├── login/                 # Login form
│   │   │   └── register/              # Registration form
│   │   ├── App.jsx                    # Route definitions
│   │   ├── main.jsx                   # React entry point
│   │   └── index.css                  # Global CSS variables and resets
│   ├── .env.example                   # Frontend env template
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── backend/                           # Express API server
│   ├── controllers/                   # Business logic
│   │   ├── auth.controller.js         # Register, login, logout
│   │   ├── post.controller.js         # CRUD for property listings
│   │   ├── user.controller.js         # User profile, saved posts, notifications
│   │   ├── chat.controller.js         # Chat rooms
│   │   └── message.controller.js      # Messages within chats
│   ├── middleware/
│   │   └── verifyToken.js             # JWT verification middleware
│   ├── routes/                        # Express routers
│   │   ├── auth.route.js
│   │   ├── post.route.js
│   │   ├── user.route.js
│   │   ├── chat.route.js
│   │   └── message.route.js
│   ├── prisma/
│   │   └── schema.prisma              # Database schema (MongoDB via Prisma)
│   ├── lib/
│   │   └── prisma.js                  # Prisma client singleton
│   ├── socket/
│   │   └── index.js                   # Socket.io server setup
│   ├── utils/
│   │   └── cloudinary.js              # Cloudinary configuration & upload helper
│   ├── .env.example                   # Backend env template
│   ├── app.js                         # Express app entry point
│   └── package.json
│
├── .github/
│   └── workflows/
│       └── ci.yml                     # GitHub Actions CI (install + build)
│
├── .gitignore
└── README.md
```

---

## ⚙️ How It Works

### User Authentication
1. A new user fills in the **Register** form (username, email, password).
2. The backend hashes the password with `bcrypt` and stores the user in MongoDB.
3. On **Login**, the backend verifies the password, creates a JWT, and sends it in an HTTP-only cookie.
4. The frontend stores the user object in `localStorage` via `AuthContext`.
5. Protected routes are guarded by the `RequireAuth` component — if no user is logged in, they are redirected to `/login`.
6. The JWT cookie is verified on every protected API call by the `verifyToken` middleware.

### Creating a Property Listing
1. A logged-in user opens the **Add Property** page.
2. They fill in details (title, price, address, bedrooms, etc.) and upload images.
3. Images are uploaded directly to **Cloudinary** from the browser; the returned secure URLs are stored.
4. The form data is sent as a `POST /api/posts` request.
5. The backend creates a `Post` and a linked `PostDetail` in MongoDB via Prisma.

### Uploading Images
- The frontend sends each image file directly to Cloudinary's upload API using an unsigned upload preset.
- Cloudinary returns a `secure_url` which is stored in the post's `images` array.
- No image files are stored on the server.

### Searching & Filtering Properties
1. The user types a city or selects filters (type, property kind, price range, bedrooms) on the **List** page.
2. Filter values are stored as URL query parameters.
3. React Router's data loader fetches `GET /api/posts?city=...&type=...` with those params.
4. The backend queries MongoDB using Prisma's `where` clauses and returns matching posts.

### Showing Properties on the Map
- Every property stores `latitude` and `longitude` fields.
- The `Map` component renders a Leaflet `MapContainer` and places a `Marker` (pin) for each property.
- Clicking a pin shows a popup with the property image, title, and price linking to the detail page.

### Real-Time Chat
1. When a logged-in user opens their **Profile**, existing chats are loaded from the API.
2. Clicking a chat opens the `Chat` component and loads the message history.
3. On mount, the client emits `newUser` to the Socket.io server with their user ID.
4. Sending a message calls `POST /api/messages/:chatId` and then emits `sendMessage` over the socket.
5. The receiver's client listens for `getMessage` events and appends the new message instantly.

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js v18+
- A MongoDB Atlas cluster (free tier works)
- A Cloudinary account (free tier works)

### 1. Clone the repository
```bash
git clone https://github.com/akhil16-svg/Real-Estate-Platform.git
cd Real-Estate-Platform
```

### 2. Set up the Backend
```bash
cd backend
npm install
```

Copy the example environment file and fill in your values:
```bash
cp .env.example .env
```

Generate the Prisma client:
```bash
npx prisma generate
```

Start the backend server:
```bash
npm run dev
# Server runs on http://localhost:8800
```

### 3. Set up the Frontend
Open a new terminal:
```bash
cd frontend
npm install
```

Copy the example environment file:
```bash
cp .env.example .env
```

Start the frontend dev server:
```bash
npm run dev
# App runs on http://localhost:5173
```

---

## 🔐 Environment Variables

### `backend/.env`
| Variable | Description |
|---|---|
| `DATABASE_URL` | MongoDB connection string from Atlas |
| `JWT_SECRET_KEY` | A long, random secret string for signing JWTs and CSRF tokens |
| `CLOUDINARY_CLOUD_NAME` | Your Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Your Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Your Cloudinary API secret |
| `CLIENT_URL` | Frontend URL for CORS (e.g. `http://localhost:5173`) |
| `PORT` | Port for the backend server (default: `8800`) |

### `frontend/.env`
| Variable | Description |
|---|---|
| `VITE_API_URL` | Backend API base URL (e.g. `http://localhost:8800/api`) |
| `VITE_SOCKET_URL` | Backend Socket.io URL (e.g. `http://localhost:8800`) |
| `VITE_CLOUDINARY_NAME` | Your Cloudinary cloud name |
| `VITE_CLOUDINARY_PRESET` | Your Cloudinary unsigned upload preset name |

---

## 🔌 API Overview

All routes are prefixed with `/api`.

### Auth — `/api/auth`
| Method | Endpoint | Description | Auth required |
|---|---|---|---|
| `POST` | `/register` | Create a new user account | No |
| `POST` | `/login` | Log in and receive a JWT cookie | No |
| `POST` | `/logout` | Clear the JWT cookie | No |

### Posts — `/api/posts`
| Method | Endpoint | Description | Auth required |
|---|---|---|---|
| `GET` | `/` | Get all posts (supports query filters) | No |
| `GET` | `/:id` | Get a single post with details | No |
| `POST` | `/` | Create a new property listing | ✅ Yes |
| `PUT` | `/:id` | Update a listing (owner only) | ✅ Yes |
| `DELETE` | `/:id` | Delete a listing (owner only) | ✅ Yes |

### Users — `/api/users`
| Method | Endpoint | Description | Auth required |
|---|---|---|---|
| `GET` | `/:id` | Get user info | ✅ Yes |
| `PUT` | `/:id` | Update profile (own account only) | ✅ Yes |
| `DELETE` | `/:id` | Delete account (own account only) | ✅ Yes |
| `POST` | `/save` | Save or unsave a post | ✅ Yes |
| `GET` | `/profilePosts` | Get own posts and saved posts | ✅ Yes |
| `GET` | `/notification` | Get unread chat count | ✅ Yes |

### Chats — `/api/chats`
| Method | Endpoint | Description | Auth required |
|---|---|---|---|
| `GET` | `/` | Get all chats for current user | ✅ Yes |
| `GET` | `/:id` | Get a single chat with messages | ✅ Yes |
| `POST` | `/` | Start a new chat | ✅ Yes |
| `PUT` | `/:id` | Mark chat as read | ✅ Yes |

### Messages — `/api/messages`
| Method | Endpoint | Description | Auth required |
|---|---|---|---|
| `POST` | `/:chatId` | Send a message in a chat | ✅ Yes |

---

## 📸 Screenshots

> _Screenshots will be added after the first deployment._

| Page | Preview |
|---|---|
| Home | _coming soon_ |
| Property List | _coming soon_ |
| Property Detail | _coming soon_ |
| User Profile | _coming soon_ |
| Real-Time Chat | _coming soon_ |

---

## 🔭 Future Improvements

- [ ] **Pagination** — Load properties in batches instead of all at once
- [ ] **Advanced filters** — Add floor count, furnished/unfurnished, parking, etc.
- [ ] **Image compression** — Compress images before uploading to Cloudinary
- [ ] **Admin dashboard** — Manage all users and listings
- [ ] **Email notifications** — Notify users when they receive a new message
- [ ] **Deployment** — Deploy frontend to Vercel and backend to Railway or Render
- [ ] **Unit & integration tests** — Add test coverage with Vitest and Supertest

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
