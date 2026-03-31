import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { FlashProvider } from './context/FlashContext'
import ProtectedRoute from './components/ProtectedRoute'

// Pages
import FrontPage from './pages/listings/FrontPage'
import ListingsIndex from './pages/listings/ListingsIndex'
import ListingShow from './pages/listings/ListingShow'
import ListingNew from './pages/listings/ListingNew'
import ListingEdit from './pages/listings/ListingEdit'

import CardIndex from './pages/cards/CardIndex'
import CardShow from './pages/cards/CardShow'
import CardNew from './pages/cards/CardNew'
import CardEdit from './pages/cards/CardEdit'

import BookNew from './pages/orders/BookNew'
import UserBookings from './pages/orders/UserBookings'
import ShopOrders from './pages/orders/ShopOrders'
import Profile from './pages/users/Profile'
import Login from './pages/users/Login'
import Signup from './pages/users/Signup'

import ErrorPage from './pages/listings/ErrorPage'

export default function App() {
  return (
    <BrowserRouter>
      <FlashProvider>
        <AuthProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<FrontPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

            {/* Protected routes - require login */}
            <Route path="/listings" element={<ProtectedRoute><ListingsIndex /></ProtectedRoute>} />
            <Route path="/listings/new" element={<ProtectedRoute><ListingNew /></ProtectedRoute>} />
            <Route path="/listings/:id" element={<ProtectedRoute><ListingShow /></ProtectedRoute>} />
            <Route path="/listings/:id/edit" element={<ProtectedRoute><ListingEdit /></ProtectedRoute>} />

            <Route path="/listings/:id/Mcard" element={<ProtectedRoute><CardIndex /></ProtectedRoute>} />
            <Route path="/listings/:id/Mcard/new" element={<ProtectedRoute><CardNew /></ProtectedRoute>} />
            <Route path="/listings/:id/Mcard/:cardId" element={<ProtectedRoute><CardShow /></ProtectedRoute>} />
            <Route path="/listings/:id/Mcard/:cardId/edit" element={<ProtectedRoute><CardEdit /></ProtectedRoute>} />

            <Route path="/listings/:id/Mcard/:cardId/book" element={<ProtectedRoute><BookNew /></ProtectedRoute>} />
            <Route path="/users/bookings" element={<ProtectedRoute><UserBookings /></ProtectedRoute>} />
            <Route path="/listings/:id/orders" element={<ProtectedRoute><ShopOrders /></ProtectedRoute>} />

            {/* 404 */}
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </AuthProvider>
      </FlashProvider>
    </BrowserRouter>
  )
}
