const express = require("express");
const router = express.Router({ mergeParams: true });

export const createOrder = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.bookingId)
    if (!booking) return res.status(404).json({ message: 'Booking not found' })
    if (booking.user.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Unauthorized' })
    if (booking.status !== 'Pending')
      return res.status(400).json({ message: 'Only pending bookings can be paid' })

    // Fake order — in real Razorpay: razorpay.orders.create(...)
    const fakeOrder = {
      id: `order_fake_${Date.now()}`,
      amount: booking.quantity * booking.marriageCard.price * 100, // paise
      currency: 'INR',
      bookingId: booking._id,
    }

    res.json({ order: fakeOrder })
  } catch (err) {
    res.status(500).json({ message: 'Failed to create order' })
  }
}


module.exports = router;