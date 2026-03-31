if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const cors = require("cors");

const chatRouter = require("./routes/chat.js");

const User = require("./models/user");
const ExpressError = require("./utils/ExpressError");

// ── Route files ───────────────────────────────────────────
const authRoutes = require("./routes/auth");
const listingRoutes = require("./routes/listings");
const cardRoutes = require("./routes/cards");
const bookingRoutes = require("./routes/bookings");

const app = express();

// ════════════════════════════════════════════════════════════
//  DATABASE
// ════════════════════════════════════════════════════════════
mongoose
  .connect(process.env.ATLASDB_URL)
  .then(() => console.log("✅  Connected to MongoDB"))
  .catch((err) => console.error("❌  MongoDB connection error:", err));

// ════════════════════════════════════════════════════════════
//  CORS  — allow React dev server (port 3000) to send cookies
// ════════════════════════════════════════════════════════════
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
    credentials: true, // REQUIRED: allows session cookies cross-origin
  })
);

// ════════════════════════════════════════════════════════════
//  BODY PARSERS
// ════════════════════════════════════════════════════════════
app.use(express.json());                        // JSON bodies from React (axios)
app.use(express.urlencoded({ extended: true })); // form-data (multer file uploads)

// ════════════════════════════════════════════════════════════
//  SESSION
// ════════════════════════════════════════════════════════════
const store = MongoStore.create({
  mongoUrl: process.env.ATLASDB_URL,
  crypto: { secret: process.env.SESSION_SECRET },
  touchAfter: 24 * 60 * 60,
});

store.on("error", (err) => console.error("Session store error:", err));

app.use(
  session({
    store,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,       // false = don't save empty sessions
    cookie: {
      httpOnly: true,
      // secure: true,              // uncomment when deploying on HTTPS
      expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

// ════════════════════════════════════════════════════════════
//  PASSPORT
// ════════════════════════════════════════════════════════════
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ════════════════════════════════════════════════════════════
//  ROUTES
// ════════════════════════════════════════════════════════════


// Health check
app.get("/health", (req, res) => res.json({ status: "ok" }));
app.use('/api/chat', chatRouter);
// Auth  →  /auth/me, /auth/login, /auth/signup, /auth/logout
app.use("/auth", authRoutes);


// Listings  →  /listings  (CRUD + reviews)
app.use("/listings", listingRoutes);

// Marriage Cards  →  /listings/:id/Mcard  (CRUD)
app.use("/listings/:id/Mcard", cardRoutes);

// Bookings — three mounting points:
//   /listings/:id/Mcard/:cardId/book   (place + get form data)
//   /bookings/user                     (user's own bookings)
//   /bookings/shop/:shopId/orders      (shop owner orders)
app.use("/listings/:id/Mcard/:cardId/book", bookingRoutes);
app.use("/bookings", bookingRoutes);

// ════════════════════════════════════════════════════════════
//  404 handler
// ════════════════════════════════════════════════════════════
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Route not found"));
});

// ════════════════════════════════════════════════════════════
//  GLOBAL ERROR HANDLER
// ════════════════════════════════════════════════════════════
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;
  console.error(`[${statusCode}] ${message}`);
  res.status(statusCode).json({ message });
});

// ════════════════════════════════════════════════════════════
//  START
// ════════════════════════════════════════════════════════════
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀  Server running on http://localhost:${PORT}`);
});
