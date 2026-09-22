\# WedInk 💌



\*\*WedInk\*\* is a full-stack MERN (MongoDB, Express, React, Node) marketplace for wedding/marriage invitation card shops. Shop owners can list their business, upload marriage card designs, and manage bookings, while customers can browse shops, order customized cards, and get AI-powered card recommendations via an integrated chatbot.



\---



\## 🧱 Tech Stack



\### Frontend (`wedink-frontend/`)

\- \*\*React 18\*\* with \*\*React Router v6\*\*

\- \*\*Vite 5\*\* — build tool \& dev server (dev proxy to backend)

\- \*\*Axios\*\* — API requests (with credentials for session cookies)



\### Backend (`wedink-backend/`)

\- \*\*Node.js\*\* (v22.12.0) + \*\*Express 4\*\*

\- \*\*MongoDB\*\* with \*\*Mongoose\*\*

\- \*\*Passport.js\*\* (`passport-local`, `passport-local-mongoose`) — session-based authentication

\- \*\*express-session\*\* + \*\*connect-mongo\*\* — session storage in MongoDB

\- \*\*Cloudinary\*\* + \*\*Multer\*\* — image upload \& storage

\- \*\*Joi\*\* — request validation

\- \*\*Google Gemini API\*\* (`@google/genai`) — AI chatbot for card recommendations

\- \*\*CORS\*\* — configured for cross-origin cookie-based auth with the React frontend



\---



\## ✨ Features



\- 🏪 Shop owners can \*\*register a shop\*\* (one shop per user) with image, location, and contact details

\- 💌 Shop owners can \*\*create, edit, and delete marriage cards\*\* (theme, material, price, size, image)

\- 🔍 Browse and \*\*search shops\*\* by name

\- ⭐ \*\*Reviews\*\* — customers can rate and review shops

\- 📅 \*\*Bookings\*\* — customers can book a card, specify quantity and customization, and track order status

\- 📦 \*\*Order management\*\* — shop owners can view, update status/due amount, and delete bookings for their shop

\- 👤 \*\*Session-based authentication\*\* via Passport.js, with MongoDB-backed sessions

\- 🤖 \*\*AI chatbot\*\* (Google Gemini) that recommends marriage cards based on natural-language requests (theme, budget, keywords)

\- ☁️ Card and shop images hosted on \*\*Cloudinary\*\*



\---



\## 🔌 API Endpoints



\### Auth — `/auth`

| Method | Endpoint       | Access | Description                          |

|--------|-----------------|--------|----------------------------------------|

| GET    | `/auth/me`      | Public | Get current session user               |

| POST   | `/auth/signup`  | Public | Register a new user                    |

| POST   | `/auth/login`   | Public | Log in                                  |

| GET    | `/auth/logout`  | Public | Log out                                 |



\### Listings (Shops) — `/listings`

| Method | Endpoint                    | Access        | Description                          |

|--------|-------------------------------|---------------|-----------------------------------------|

| GET    | `/listings`                  | Authenticated | Get all shops (optional `shopName` filter) |

| POST   | `/listings`                  | Authenticated | Register a new shop (with image)        |

| GET    | `/listings/:id`               | Authenticated | Get shop details + reviews              |

| PUT    | `/listings/:id`               | Owner only    | Update shop                             |

| DELETE | `/listings/:id`               | Owner only    | Delete shop                             |

| POST   | `/listings/:id/reviews`       | Authenticated | Add a review                            |

| DELETE | `/listings/:id/reviews/:reviewId` | Author only | Delete a review                     |



\### Marriage Cards — `/listings/:id/Mcard`

| Method | Endpoint                  | Access        | Description                    |

|--------|-----------------------------|---------------|----------------------------------|

| GET    | `/listings/:id/Mcard`       | Authenticated | Get all cards for a shop        |

| POST   | `/listings/:id/Mcard`       | Owner only    | Create a new card (with image)  |

| GET    | `/listings/:id/Mcard/:cardId` | Authenticated | Get a single card             |

| PUT    | `/listings/:id/Mcard/:cardId` | Owner only  | Update a card                   |

| DELETE | `/listings/:id/Mcard/:cardId` | Owner only  | Delete a card                   |



\### Bookings — `/listings/:id/Mcard/:cardId/book` and `/bookings`

| Method | Endpoint                                       | Access                  | Description                          |

|--------|--------------------------------------------------|--------------------------|-----------------------------------------|

| GET    | `/listings/:id/Mcard/:cardId/book`                | Authenticated            | Get booking form data                  |

| POST   | `/listings/:id/Mcard/:cardId/book`                | Authenticated            | Place a booking                        |

| GET    | `/bookings/user`                                  | Authenticated            | Get logged-in user's bookings          |

| GET    | `/bookings/shop/:shopId/orders`                   | Shop owner only          | Get all orders for a shop              |

| PUT    | `/bookings/shop/:shopId/orders/:bookingId`         | Shop owner only          | Update booking status / due amount     |

| DELETE | `/bookings/shop/:shopId/orders/:bookingId`         | Booking user or shop owner | Delete a booking                      |



\### Chat — `/api/chat`

| Method | Endpoint      | Access | Description                                  |

|--------|----------------|--------|-------------------------------------------------|

| POST   | `/api/chat`    | Public | AI chatbot — recommends cards based on user prompt |



\### Health Check

| Method | Endpoint  | Description        |

|--------|------------|----------------------|

| GET    | `/health`  | Returns `{ status: "ok" }` |



\---



\## ⚙️ Setup \& Installation



\### Prerequisites

\- Node.js v22.12.0 (see `engines` in backend `package.json`)

\- MongoDB (local or Atlas)

\- A Cloudinary account

\- A Google Gemini API key (for the chatbot)



\### 1. Backend Setup



```bash

cd wedink-backend

npm install

```



Create a `.env` file in `wedink-backend/`:



```env

NODE\_ENV=development

PORT=8080



ATLASDB\_URL=<your-mongodb-connection-string>

SESSION\_SECRET=<your-session-secret>



CLOUDINARY\_CLOUD\_NAME=<your-cloudinary-cloud-name>

CLOUDINARY\_API\_KEY=<your-cloudinary-api-key>

CLOUDINARY\_API\_SECRET=<your-cloudinary-api-secret>



GEMINI\_API\_KEY=<your-google-gemini-api-key>



CLIENT\_ORIGIN=http://localhost:3000

```



Run the backend:

```bash

node app.js

```



The API will run on \*\*`http://localhost:8080`\*\*.



\### 2. Frontend Setup



```bash

cd wedink-frontend

npm install

npm run dev

```



The app will run on \*\*`http://localhost:3000`\*\*, with `/auth`, `/listings`, `/bookings`, and `/health` proxied to the backend on port `8080` (see `vite.config.js`).



\---



\## 🔐 Security Notes



\- Sessions are stored in MongoDB via `connect-mongo` and signed with `SESSION\_SECRET`.

\- Passwords are hashed via `passport-local-mongoose`.

\- CORS is restricted to `CLIENT\_ORIGIN` (defaults to `http://localhost:3000`) with `credentials: true` to allow session cookies.

\- Route-level guards enforce ownership: shop owners can only edit/delete their own shops and cards; review authors can only delete their own reviews; bookings can be modified by the booking user or the relevant shop owner.

\- Cookies are `httpOnly`; enable the `secure` flag in `app.js` before deploying over HTTPS.



\---



\## 🧭 Frontend Routes



| Route                                          | Access     | Page              |

|--------------------------------------------------|------------|---------------------|

| `/`                                              | Public     | Front page           |

| `/login`                                          | Public     | Login                |

| `/signup`                                         | Public     | Signup               |

| `/profile`                                        | Protected  | User profile         |

| `/listings`                                       | Protected  | Shop listings index  |

| `/listings/new`                                   | Protected  | Register new shop    |

| `/listings/:id`                                   | Protected  | Shop detail          |

| `/listings/:id/edit`                              | Protected  | Edit shop            |

| `/listings/:id/Mcard`                             | Protected  | Shop's card catalog  |

| `/listings/:id/Mcard/new`                         | Protected  | Add new card         |

| `/listings/:id/Mcard/:cardId`                     | Protected  | Card detail          |

| `/listings/:id/Mcard/:cardId/edit`                | Protected  | Edit card             |

| `/listings/:id/Mcard/:cardId/book`                | Protected  | Book a card           |

| `/users/bookings`                                 | Protected  | User's bookings       |

| `/listings/:id/orders`                            | Protected  | Shop's orders         |

| `\*`                                               | —          | 404 error page        |



\---



\## 🤖 AI Chatbot



The `/api/chat` endpoint uses Google's Gemini model to:

1\. Detect whether the user is asking for card recommendations (theme, price, keywords).

2\. Query MongoDB for matching marriage cards and rank them with a match-score algorithm.

3\. Generate a short, friendly reply introducing the results.



Falls back to showing all available cards if no exact matches are found.



\---



\## 🚀 Future Improvements



\- Complete Razorpay payment integration (`bookingRoutes.js` currently has a placeholder/fake order flow)

\- Move from session-based auth to JWT for better API/mobile support

\- Admin dashboard for platform-wide moderation

\- Pagination for listings and cards

\- Notification system for booking status updates



\---



\## 📄 License



No license specified.

