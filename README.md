# WedInk

WedInk is a full-stack MERN marketplace for wedding and marriage invitation card shops. Shop owners can register their shops, manage invitation card designs, and handle customer bookings. Customers can browse shops, explore cards, place customized bookings, review shops, and get AI-powered card recommendations.

## Features

- Shop registration and management
- Marriage card listing and management
- Shop search and browsing
- Customer reviews and ratings
- Card booking and order management
- Session-based authentication with Passport.js
- MongoDB-backed sessions
- Cloudinary image uploads
- AI-powered card recommendations using Google Gemini
- Role and ownership-based authorization
- Request validation using Joi

## Tech Stack

### Frontend

- React 18
- React Router v6
- Vite
- Axios

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Passport.js
- Express Session
- Connect Mongo
- Multer
- Cloudinary
- Joi
- Google Gemini API

## Architecture

```text
React Frontend
      |
    Axios
      |
Express REST API
      |
  Middleware
      |
Application Logic
      |
    Mongoose
      |
   MongoDB
   /     \
Sessions  Data

External Services:
- Cloudinary → Image Storage
- Google Gemini → AI Recommendations
