import axios from 'axios'

// Vite proxies /auth, /listings, /bookings → Express :8080
const api = axios.create({
  baseURL: '/',
  withCredentials: true, // CRITICAL: sends session cookies with every request
  // No Content-Type here — axios sets it automatically per request type
})

export default api
