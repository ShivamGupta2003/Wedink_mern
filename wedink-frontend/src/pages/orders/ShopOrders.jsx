// // import { useState, useEffect } from 'react'
// // import { useParams } from 'react-router-dom'
// // import Layout from '../../components/Layout'
// // import { useFlash } from '../../context/FlashContext'
// // import api from '../../services/api'

// // export default function ShopOrders() {
// //   const { id } = useParams()
// //   const { showSuccess, showError } = useFlash()

// //   const [bookings, setBookings] = useState([])
// //   const [shop, setShop] = useState(null)
// //   const [loading, setLoading] = useState(true)

// //   useEffect(() => {
// //     api.get(`/bookings/shop/${id}/orders`)
// //       .then(res => {
// //         setBookings(res.data.bookings)
// //         setShop(res.data.shop)
// //       })
// //       .catch(() => showError('Failed to load orders'))
// //       .finally(() => setLoading(false))
// //   }, [id])

// //   const handleDelete = async (bookingId) => {
// //     if (!window.confirm('Delete this booking?')) return
// //     try {
// //       await api.delete(`/bookings/shop/${id}/orders/${bookingId}`)
// //       setBookings(prev => prev.filter(b => b._id !== bookingId))
// //       showSuccess('Booking deleted successfully.')
// //     } catch { showError('Failed to delete booking') }
// //   }

// //   const handleStatusUpdate = async (bookingId, status) => {
// //     try {
// //       const res = await api.put(`/bookings/shop/${id}/orders/${bookingId}`, { status })
// //       setBookings(prev => prev.map(b => b._id === bookingId ? { ...b, status: res.data.booking.status } : b))
// //       showSuccess('Booking status updated.')
// //     } catch { showError('Failed to update status') }
// //   }

// //   const statusBadge = (status) => {
// //     const map = { Pending: 'bg-warning', Confirmed: 'bg-primary', Completed: 'bg-success', Cancelled: 'bg-danger' }
// //     return map[status] || 'bg-secondary'
// //   }

// //   if (loading) return (
// //     <Layout>
// //       <div className="d-flex justify-content-center mt-5">
// //         <div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div>
// //       </div>
// //     </Layout>
// //   )

// //   return (
// //     <Layout>
// //       <style>{`
// //         body { background-color: #f8f9fa; }
// //         .card { transition: transform .3s ease, box-shadow .3s ease; overflow: hidden; }
// //         .card:hover { transform: translateY(-10px); box-shadow: 0 15px 30px rgba(0,0,0,.15); }
// //         .btn-danger, .btn-primary { transition: all .3s ease; }
// //         .btn-danger:hover, .btn-primary:hover { transform: scale(1.05); box-shadow: 0 5px 15px rgba(0,0,0,.2); }
// //         .badge { transition: all .3s ease; }
// //         .badge:hover { transform: scale(1.1); opacity: .9; }
// //         .form-select:focus { box-shadow: 0 0 0 .25rem rgba(40,167,69,.25); border-color: #28a745; }
// //       `}</style>

// //       <div className="container mt-5">
// //         <h2 className="text-center mb-4 animate__animated animate__fadeInDown">
// //           Orders for {shop?.shopName}
// //         </h2>

// //         {bookings.length === 0 ? (
// //           <div className="alert alert-warning text-center animate__animated animate__fadeIn">
// //             No orders have been placed for this shop yet.
// //           </div>
// //         ) : (
// //           <div className="row justify-content-center">
// //             {bookings.map((booking) => (
// //               <div key={booking._id} className="col-lg-6 col-md-8 col-sm-12 animate__animated animate__fadeInUp">
// //                 <div className="card shadow-lg mb-4">
// //                   <div className="card-body">
// //                     <div className="d-flex justify-content-between align-items-center mb-3">
// //                       <h5 className="card-title m-0">
// //                         <strong>Card:</strong> {booking.marriageCard?.cardName}
// //                       </h5>
// //                       <span className={`badge ${statusBadge(booking.status)}`}>
// //                         {booking.status}
// //                       </span>
// //                     </div>

// //                     <div className="card-text mb-3">
// //                       <p className="mb-2"><strong>Ordered By:</strong> {booking.user?.username}</p>
// //                       <p className="mb-2"><strong>Customer Phone:</strong> {booking.phoneNumber}</p>
// //                       <p className="mb-2"><strong>Quantity:</strong> {booking.quantity}</p>
// //                       <p className="mb-2">
// //                         <strong>Total Price:</strong> ₹{(booking.quantity * (booking.marriageCard?.price || 0)).toLocaleString('en-IN')}
// //                       </p>
// //                       {booking.customization && (
// //                         <p className="mb-2"><strong>Customization:</strong> {booking.customization}</p>
// //                       )}
// //                     </div>

// //                     <div className="row g-2">
// //                       <div className="col-md-6">
// //                         <button
// //                           className="btn btn-secondary w-100"
// //                           onClick={() => handleDelete(booking._id)}
// //                         >
// //                           Delete Booking
// //                         </button>
// //                       </div>
// //                       <div className="col-md-6">
// //                         <div className="input-group">
// //                           <select
// //                             className="form-select"
// //                             value={booking.status}
// //                             onChange={e => handleStatusUpdate(booking._id, e.target.value)}
// //                           >
// //                             <option value="Pending">Pending</option>
// //                             <option value="Confirmed">Confirmed</option>
// //                             <option value="Completed">Completed</option>
// //                             <option value="Cancelled">Cancelled</option>
// //                           </select>
// //                           <button
// //                             className="btn btn-primary"
// //                             onClick={() => handleStatusUpdate(booking._id, booking.status)}
// //                           >
// //                             Update
// //                           </button>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         )}
// //       </div>
// //     </Layout>
// //   )
// // }
// import { useState, useEffect } from 'react'
// import { useParams } from 'react-router-dom'
// import Layout from '../../components/Layout'
// import { useFlash } from '../../context/FlashContext'
// import api from '../../services/api'

// export default function ShopOrders() {
//   const { id } = useParams()
//   const { showSuccess, showError } = useFlash()

//   const [bookings, setBookings] = useState([])
//   const [shop, setShop] = useState(null)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     api.get(`/bookings/shop/${id}/orders`)
//       .then(res => {
//         setBookings(res.data.bookings)
//         setShop(res.data.shop)
//       })
//       .catch(() => showError('Failed to load orders'))
//       .finally(() => setLoading(false))
//   }, [id])

//   const handleDelete = async (bookingId) => {
//     if (!window.confirm('Delete this booking?')) return
//     try {
//       await api.delete(`/bookings/shop/${id}/orders/${bookingId}`)
//       setBookings(prev => prev.filter(b => b._id !== bookingId))
//       showSuccess('Booking deleted successfully.')
//     } catch { showError('Failed to delete booking') }
//   }

//   const handleStatusUpdate = async (bookingId, status) => {
//     try {
//       const res = await api.put(`/bookings/shop/${id}/orders/${bookingId}`, { status })
//       setBookings(prev => prev.map(b => b._id === bookingId ? { ...b, status: res.data.booking.status } : b))
//       showSuccess('Booking status updated.')
//     } catch { showError('Failed to update status') }
//   }

//   const statusStyle = (status) => {
//     const map = {
//       Pending: { bg: 'rgba(234,179,8,0.12)', border: 'rgba(234,179,8,0.35)', color: '#f5d060' },
//       Confirmed: { bg: 'rgba(59,130,246,0.12)', border: 'rgba(59,130,246,0.35)', color: '#7eb4f7' },
//       Completed: { bg: 'rgba(201,169,110,0.12)', border: 'rgba(201,169,110,0.3)', color: '#e8c98a' },
//       Cancelled: { bg: 'rgba(239,68,68,0.10)', border: 'rgba(239,68,68,0.3)', color: '#f87171' },
//     }
//     return map[status] || { bg: 'rgba(255,255,255,0.06)', border: 'rgba(255,255,255,0.12)', color: '#aaa' }
//   }

//   if (loading) return (
//     <Layout>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');
//         .so-root { min-height: 100vh; background: #080808; font-family: 'DM Sans', sans-serif; }
//         .so-loading { min-height: 60vh; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 14px; color: rgba(255,255,255,0.25); font-size: 0.875rem; }
//         .so-spinner { width: 38px; height: 38px; border: 2px solid rgba(201,169,110,0.15); border-top-color: #c9a96e; border-radius: 50%; animation: soSpin 0.8s linear infinite; }
//         @keyframes soSpin { to { transform: rotate(360deg); } }
//       `}</style>
//       <div className="so-root">
//         <div className="so-loading">
//           <div className="so-spinner" />
//           <span>Loading orders…</span>
//         </div>
//       </div>
//     </Layout>
//   )

//   return (
//     <Layout>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');

//         .so-root {
//           min-height: 100vh;
//           background: #080808;
//           font-family: 'DM Sans', sans-serif;
//           color: #e2e2e2;
//         }

//         /* ── HERO BAND ── */
//         .so-hero { position: relative; padding: 40px 0 0; overflow: hidden; }
//         .so-hero-glow {
//           position: absolute; top: -100px; left: 50%; transform: translateX(-50%);
//           width: 800px; height: 500px;
//           background: radial-gradient(ellipse, rgba(201,169,110,0.1) 0%, transparent 68%);
//           pointer-events: none; z-index: 0;
//         }
//         .so-hero-grid {
//           position: absolute; inset: 0; z-index: 0;
//           background-image:
//             linear-gradient(rgba(201,169,110,0.035) 1px, transparent 1px),
//             linear-gradient(90deg, rgba(201,169,110,0.035) 1px, transparent 1px);
//           background-size: 56px 56px;
//           mask-image: radial-gradient(ellipse 80% 100% at center top, black 20%, transparent 75%);
//           pointer-events: none;
//         }
//         .so-hero-inner {
//           position: relative; z-index: 1;
//           max-width: 1100px; margin: 0 auto; padding: 0 28px 40px;
//         }
//         .so-eyebrow {
//           font-size: 0.65rem; font-weight: 600; color: rgba(201,169,110,0.55);
//           text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 8px;
//         }
//         .so-hero-title {
//           font-family: 'Cormorant Garamond', serif;
//           font-size: 2.4rem; font-weight: 600; color: #fff; line-height: 1.08;
//         }
//         .so-hero-sub {
//           font-size: 0.845rem; color: rgba(255,255,255,0.3); font-weight: 300; margin-top: 6px;
//         }

//         /* ── MAIN ── */
//         .so-main { max-width: 1100px; margin: 0 auto; padding: 0 28px 80px; }

//         /* ── DIVIDER ── */
//         .so-divider { height: 1px; background: linear-gradient(to right, transparent, rgba(201,169,110,0.2), transparent); margin: 0 0 36px; }

//         /* ── EMPTY STATE ── */
//         .so-empty {
//           text-align: center; padding: 60px 20px;
//           background: rgba(255,255,255,0.02);
//           border: 1px solid rgba(201,169,110,0.12);
//           border-radius: 20px;
//         }
//         .so-empty-icon {
//           width: 56px; height: 56px; border-radius: 16px;
//           background: rgba(201,169,110,0.08); border: 1px solid rgba(201,169,110,0.15);
//           display: flex; align-items: center; justify-content: center;
//           color: #c9a96e; font-size: 20px; margin: 0 auto 18px;
//         }
//         .so-empty-title {
//           font-family: 'Cormorant Garamond', serif;
//           font-size: 1.5rem; font-weight: 600; color: #fff; margin-bottom: 8px;
//         }
//         .so-empty-sub { font-size: 0.875rem; color: rgba(255,255,255,0.3); font-weight: 300; }

//         /* ── GRID ── */
//         .so-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
//           gap: 20px;
//         }

//         /* ── ORDER CARD ── */
//         .so-card {
//           background: rgba(255,255,255,0.03);
//           border: 1px solid rgba(201,169,110,0.18);
//           border-radius: 20px; overflow: hidden;
//           transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
//         }
//         .so-card:hover {
//           transform: translateY(-4px);
//           box-shadow: 0 16px 40px rgba(0,0,0,0.45);
//           border-color: rgba(201,169,110,0.32);
//         }

//         /* ── CARD HEADER ── */
//         .so-card-header {
//           padding: 20px 22px 16px;
//           border-bottom: 1px solid rgba(201,169,110,0.1);
//           display: flex; align-items: flex-start; justify-content: space-between; gap: 12px;
//         }
//         .so-card-name {
//           font-family: 'Cormorant Garamond', serif;
//           font-size: 1.25rem; font-weight: 600; color: #fff; line-height: 1.2;
//         }
//         .so-status-badge {
//           padding: 4px 12px; border-radius: 20px; font-size: 0.65rem;
//           font-weight: 600; letter-spacing: 0.07em; text-transform: uppercase;
//           white-space: nowrap; flex-shrink: 0;
//         }

//         /* ── CARD BODY ── */
//         .so-card-body { padding: 18px 22px 20px; }
//         .so-detail-list { display: flex; flex-direction: column; gap: 10px; margin-bottom: 18px; }
//         .so-detail-row { display: flex; align-items: flex-start; gap: 10px; }
//         .so-detail-icon {
//           width: 28px; height: 28px; border-radius: 7px;
//           background: rgba(201,169,110,0.07); border: 1px solid rgba(201,169,110,0.13);
//           display: flex; align-items: center; justify-content: center;
//           color: #c9a96e; font-size: 11px; flex-shrink: 0; margin-top: 1px;
//         }
//         .so-detail-label {
//           font-size: 0.62rem; font-weight: 600; color: rgba(255,255,255,0.25);
//           text-transform: uppercase; letter-spacing: 0.09em; margin-bottom: 1px;
//         }
//         .so-detail-value { font-size: 0.845rem; color: rgba(255,255,255,0.65); font-weight: 300; }

//         /* ── PRICE ROW ── */
//         .so-price-row {
//           display: flex; align-items: center; gap: 12px;
//           padding: 13px 16px; border-radius: 12px;
//           background: rgba(201,169,110,0.07); border: 1px solid rgba(201,169,110,0.16);
//           margin-bottom: 18px;
//         }
//         .so-price-label { font-size: 0.62rem; font-weight: 600; color: rgba(255,255,255,0.28); text-transform: uppercase; letter-spacing: 0.09em; }
//         .so-price-val {
//           font-family: 'Cormorant Garamond', serif;
//           font-size: 1.55rem; font-weight: 600; color: #e8c98a; line-height: 1;
//         }

//         /* ── STATUS UPDATE ROW ── */
//         .so-actions { display: flex; gap: 10px; align-items: stretch; }

//         /* ── SELECT ── */
//         .so-select {
//           flex: 1;
//           background: rgba(255,255,255,0.03);
//           border: 1px solid rgba(255,255,255,0.08);
//           border-radius: 10px;
//           padding: 10px 14px; color: #fff;
//           font-family: 'DM Sans', sans-serif; font-size: 0.845rem; font-weight: 300;
//           outline: none; transition: border-color 0.2s;
//           appearance: none; cursor: pointer;
//         }
//         .so-select:focus { border-color: rgba(201,169,110,0.4); }
//         .so-select option { background: #1a1a1a; color: #e2e2e2; }

//         /* ── UPDATE BUTTON ── */
//         .so-btn-gold {
//           display: inline-flex; align-items: center; gap: 7px; padding: 10px 18px;
//           background: linear-gradient(135deg, #c9a96e, #e8c98a); color: #080808;
//           font-weight: 600; font-size: 0.8rem; border-radius: 10px; border: none;
//           cursor: pointer; font-family: 'DM Sans', sans-serif; letter-spacing: 0.03em;
//           transition: all 0.22s; white-space: nowrap;
//         }
//         .so-btn-gold:hover { opacity: 0.88; transform: translateY(-1px); }

//         /* ── DELETE BUTTON ── */
//         .so-btn-danger {
//           display: inline-flex; align-items: center; gap: 7px; padding: 10px 14px;
//           background: transparent; color: rgba(239,68,68,0.75); font-size: 0.8rem;
//           border-radius: 10px; border: 1px solid rgba(239,68,68,0.22);
//           cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.2s;
//           white-space: nowrap;
//         }
//         .so-btn-danger:hover {
//           background: rgba(239,68,68,0.07);
//           border-color: rgba(239,68,68,0.45);
//           color: #f87171;
//         }

//         @media (max-width: 640px) {
//           .so-grid { grid-template-columns: 1fr; }
//           .so-hero-title { font-size: 1.8rem; }
//           .so-actions { flex-direction: column; }
//         }
//       `}</style>

//       <div className="so-root">
//         {/* ── HERO BAND ── */}
//         <section className="so-hero">
//           <div className="so-hero-glow" />
//           <div className="so-hero-grid" />
//           <div className="so-hero-inner">
//             <div className="so-eyebrow">Marriage Card Shop</div>
//             <div className="so-hero-title">Shop Orders</div>
//             {shop?.shopName && (
//               <div className="so-hero-sub">Managing orders for {shop.shopName}</div>
//             )}
//           </div>
//         </section>

//         <div className="so-main">
//           <div className="so-divider" />

//           {bookings.length === 0 ? (
//             <div className="so-empty">
//               <div className="so-empty-icon"><i className="fas fa-inbox" /></div>
//               <div className="so-empty-title">No Orders Yet</div>
//               <div className="so-empty-sub">No orders have been placed for this shop yet.</div>
//             </div>
//           ) : (
//             <div className="so-grid">
//               {bookings.map((booking) => {
//                 const st = statusStyle(booking.status)
//                 const total = booking.quantity * (booking.marriageCard?.price || 0)
//                 return (
//                   <div key={booking._id} className="so-card">

//                     {/* Header */}
//                     <div className="so-card-header">
//                       <div className="so-card-name">{booking.marriageCard?.cardName}</div>
//                       <div
//                         className="so-status-badge"
//                         style={{ background: st.bg, border: `1px solid ${st.border}`, color: st.color }}
//                       >
//                         {booking.status}
//                       </div>
//                     </div>

//                     {/* Body */}
//                     <div className="so-card-body">
//                       <div className="so-detail-list">
//                         {[
//                           { icon: 'fa-user', label: 'Ordered By', val: booking.user?.username },
//                           { icon: 'fa-phone', label: 'Customer Phone', val: booking.phoneNumber },
//                           { icon: 'fa-layer-group', label: 'Quantity', val: booking.quantity },
//                           booking.customization && { icon: 'fa-pen-nib', label: 'Customization', val: booking.customization },
//                         ].filter(Boolean).map(d => (
//                           <div className="so-detail-row" key={d.label}>
//                             <div className="so-detail-icon"><i className={`fas ${d.icon}`} /></div>
//                             <div>
//                               <div className="so-detail-label">{d.label}</div>
//                               <div className="so-detail-value">{d.val}</div>
//                             </div>
//                           </div>
//                         ))}
//                       </div>

//                       {/* Price */}
//                       <div className="so-price-row">
//                         <div className="so-detail-icon"><i className="fas fa-tag" /></div>
//                         <div>
//                           <div className="so-price-label">Total Price</div>
//                           <div className="so-price-val">₹ {total.toLocaleString('en-IN')}</div>
//                         </div>
//                       </div>

//                       {/* Actions */}
//                       <div className="so-actions">
//                         <button className="so-btn-danger" onClick={() => handleDelete(booking._id)}>
//                           <i className="fas fa-trash" style={{ fontSize: 10 }} /> Delete
//                         </button>
//                         <select
//                           className="so-select"
//                           value={booking.status}
//                           onChange={e => handleStatusUpdate(booking._id, e.target.value)}
//                         >
//                           <option value="Pending">Pending</option>
//                           <option value="Confirmed">Confirmed</option>
//                           <option value="Completed">Completed</option>
//                           <option value="Cancelled">Cancelled</option>
//                         </select>
//                         <button
//                           className="so-btn-gold"
//                           onClick={() => handleStatusUpdate(booking._id, booking.status)}
//                         >
//                           <i className="fas fa-check" style={{ fontSize: 10 }} /> Update
//                         </button>
//                       </div>
//                     </div>

//                   </div>
//                 )
//               })}
//             </div>
//           )}
//         </div>
//       </div>
//     </Layout>
//   )
// }



import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../../components/Layout'
import { useFlash } from '../../context/FlashContext'
import api from '../../services/api'

export default function ShopOrders() {
  const { id } = useParams()
  const { showSuccess, showError } = useFlash()

  const [bookings, setBookings] = useState([])
  const [shop, setShop] = useState(null)
  const [loading, setLoading] = useState(true)

  // Track local dueAmount edits per booking id
  const [dueAmounts, setDueAmounts] = useState({})

  useEffect(() => {
    api.get(`/bookings/shop/${id}/orders`)
      .then(res => {
        setBookings(res.data.bookings)
        setShop(res.data.shop)
        // Seed dueAmounts map from fetched bookings
        const map = {}
        res.data.bookings.forEach(b => { map[b._id] = b.dueAmount ?? 0 })
        setDueAmounts(map)
      })
      .catch(() => showError('Failed to load orders'))
      .finally(() => setLoading(false))
  }, [id])

  const handleDelete = async (bookingId) => {
    if (!window.confirm('Delete this booking?')) return
    try {
      await api.delete(`/bookings/shop/${id}/orders/${bookingId}`)
      setBookings(prev => prev.filter(b => b._id !== bookingId))
      showSuccess('Booking deleted successfully.')
    } catch { showError('Failed to delete booking') }
  }

  // Unchanged: only updates status
  const handleStatusUpdate = async (bookingId, status) => {
    try {
      const res = await api.put(`/bookings/shop/${id}/orders/${bookingId}`, { status })
      setBookings(prev =>
        prev.map(b => b._id === bookingId ? { ...b, status: res.data.booking.status } : b)
      )
      showSuccess('Booking status updated.')
    } catch { showError('Failed to update status') }
  }

  // New: only updates dueAmount
  const handleDueAmountUpdate = async (bookingId) => {
    const dueAmount = Number(dueAmounts[bookingId])
    if (isNaN(dueAmount) || dueAmount < 0) {
      showError('Please enter a valid due amount.')
      return
    }
    try {
      const res = await api.put(`/bookings/shop/${id}/orders/${bookingId}`, { dueAmount })
      setBookings(prev =>
        prev.map(b => b._id === bookingId ? { ...b, dueAmount: res.data.booking.dueAmount } : b)
      )
      setDueAmounts(prev => ({ ...prev, [bookingId]: res.data.booking.dueAmount }))
      showSuccess('Due amount updated.')
    } catch { showError('Failed to update due amount') }
  }

  const statusStyle = (status) => {
    const map = {
      Pending: { bg: 'rgba(234,179,8,0.12)', border: 'rgba(234,179,8,0.35)', color: '#f5d060' },
      Confirmed: { bg: 'rgba(59,130,246,0.12)', border: 'rgba(59,130,246,0.35)', color: '#7eb4f7' },
      Completed: { bg: 'rgba(201,169,110,0.12)', border: 'rgba(201,169,110,0.3)', color: '#e8c98a' },
      Cancelled: { bg: 'rgba(239,68,68,0.10)', border: 'rgba(239,68,68,0.3)', color: '#f87171' },
    }
    return map[status] || { bg: 'rgba(255,255,255,0.06)', border: 'rgba(255,255,255,0.12)', color: '#aaa' }
  }

  if (loading) return (
    <Layout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');
        .so-root { min-height: 100vh; background: #080808; font-family: 'DM Sans', sans-serif; }
        .so-loading { min-height: 60vh; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 14px; color: rgba(255,255,255,0.25); font-size: 0.875rem; }
        .so-spinner { width: 38px; height: 38px; border: 2px solid rgba(201,169,110,0.15); border-top-color: #c9a96e; border-radius: 50%; animation: soSpin 0.8s linear infinite; }
        @keyframes soSpin { to { transform: rotate(360deg); } }
      `}</style>
      <div className="so-root">
        <div className="so-loading">
          <div className="so-spinner" />
          <span>Loading orders…</span>
        </div>
      </div>
    </Layout>
  )

  return (
    <Layout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');

        .so-root {
          min-height: 100vh;
          background: #080808;
          font-family: 'DM Sans', sans-serif;
          color: #e2e2e2;
        }

        /* ── HERO BAND ── */
        .so-hero { position: relative; padding: 40px 0 0; overflow: hidden; }
        .so-hero-glow {
          position: absolute; top: -100px; left: 50%; transform: translateX(-50%);
          width: 800px; height: 500px;
          background: radial-gradient(ellipse, rgba(201,169,110,0.1) 0%, transparent 68%);
          pointer-events: none; z-index: 0;
        }
        .so-hero-grid {
          position: absolute; inset: 0; z-index: 0;
          background-image:
            linear-gradient(rgba(201,169,110,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,169,110,0.035) 1px, transparent 1px);
          background-size: 56px 56px;
          mask-image: radial-gradient(ellipse 80% 100% at center top, black 20%, transparent 75%);
          pointer-events: none;
        }
        .so-hero-inner {
          position: relative; z-index: 1;
          max-width: 1100px; margin: 0 auto; padding: 0 28px 40px;
        }
        .so-eyebrow {
          font-size: 0.65rem; font-weight: 600; color: rgba(201,169,110,0.55);
          text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 8px;
        }
        .so-hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.4rem; font-weight: 600; color: #fff; line-height: 1.08;
        }
        .so-hero-sub {
          font-size: 0.845rem; color: rgba(255,255,255,0.3); font-weight: 300; margin-top: 6px;
        }

        /* ── MAIN ── */
        .so-main { max-width: 1100px; margin: 0 auto; padding: 0 28px 80px; }

        /* ── DIVIDER ── */
        .so-divider { height: 1px; background: linear-gradient(to right, transparent, rgba(201,169,110,0.2), transparent); margin: 0 0 36px; }

        /* ── EMPTY STATE ── */
        .so-empty {
          text-align: center; padding: 60px 20px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(201,169,110,0.12);
          border-radius: 20px;
        }
        .so-empty-icon {
          width: 56px; height: 56px; border-radius: 16px;
          background: rgba(201,169,110,0.08); border: 1px solid rgba(201,169,110,0.15);
          display: flex; align-items: center; justify-content: center;
          color: #c9a96e; font-size: 20px; margin: 0 auto 18px;
        }
        .so-empty-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem; font-weight: 600; color: #fff; margin-bottom: 8px;
        }
        .so-empty-sub { font-size: 0.875rem; color: rgba(255,255,255,0.3); font-weight: 300; }

        /* ── GRID ── */
        .so-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
          gap: 20px;
        }

        /* ── ORDER CARD ── */
        .so-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(201,169,110,0.18);
          border-radius: 20px; overflow: hidden;
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }
        .so-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(0,0,0,0.45);
          border-color: rgba(201,169,110,0.32);
        }

        /* ── CARD HEADER ── */
        .so-card-header {
          padding: 20px 22px 16px;
          border-bottom: 1px solid rgba(201,169,110,0.1);
          display: flex; align-items: flex-start; justify-content: space-between; gap: 12px;
        }
        .so-card-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.25rem; font-weight: 600; color: #fff; line-height: 1.2;
        }
        .so-status-badge {
          padding: 4px 12px; border-radius: 20px; font-size: 0.65rem;
          font-weight: 600; letter-spacing: 0.07em; text-transform: uppercase;
          white-space: nowrap; flex-shrink: 0;
        }

        /* ── CARD BODY ── */
        .so-card-body { padding: 18px 22px 20px; }
        .so-detail-list { display: flex; flex-direction: column; gap: 10px; margin-bottom: 18px; }
        .so-detail-row { display: flex; align-items: flex-start; gap: 10px; }
        .so-detail-icon {
          width: 28px; height: 28px; border-radius: 7px;
          background: rgba(201,169,110,0.07); border: 1px solid rgba(201,169,110,0.13);
          display: flex; align-items: center; justify-content: center;
          color: #c9a96e; font-size: 11px; flex-shrink: 0; margin-top: 1px;
        }
        .so-detail-label {
          font-size: 0.62rem; font-weight: 600; color: rgba(255,255,255,0.25);
          text-transform: uppercase; letter-spacing: 0.09em; margin-bottom: 1px;
        }
        .so-detail-value { font-size: 0.845rem; color: rgba(255,255,255,0.65); font-weight: 300; }

        /* ── PRICE ROW ── */
        .so-price-row {
          display: flex; align-items: center; gap: 12px;
          padding: 13px 16px; border-radius: 12px;
          background: rgba(201,169,110,0.07); border: 1px solid rgba(201,169,110,0.16);
          margin-bottom: 14px;
        }
        .so-price-label { font-size: 0.62rem; font-weight: 600; color: rgba(255,255,255,0.28); text-transform: uppercase; letter-spacing: 0.09em; }
        .so-price-val {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.55rem; font-weight: 600; color: #e8c98a; line-height: 1;
        }

        /* ── DUE AMOUNT ROW ── */
        .so-due-row {
          display: flex; align-items: center; gap: 10px;
          padding: 12px 14px; border-radius: 12px;
          background: rgba(239,68,68,0.06); border: 1px solid rgba(239,68,68,0.18);
          margin-bottom: 18px;
        }
        .so-due-icon {
          width: 28px; height: 28px; border-radius: 7px;
          background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.2);
          display: flex; align-items: center; justify-content: center;
          color: #f87171; font-size: 11px; flex-shrink: 0;
        }
        .so-due-label {
          font-size: 0.62rem; font-weight: 600; color: rgba(255,255,255,0.28);
          text-transform: uppercase; letter-spacing: 0.09em; margin-bottom: 3px;
        }
        .so-due-input-wrap { display: flex; align-items: center; gap: 8px; flex: 1; }
        .so-due-prefix {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.1rem; color: #f87171; font-weight: 600;
        }
        .so-due-input {
          flex: 1; background: rgba(255,255,255,0.04);
          border: 1px solid rgba(239,68,68,0.22); border-radius: 8px;
          padding: 6px 10px; color: #f87171;
          font-family: 'Cormorant Garamond', serif; font-size: 1.3rem; font-weight: 600;
          outline: none; width: 90px; transition: border-color 0.2s;
        }
        .so-due-input:focus { border-color: rgba(239,68,68,0.5); }
        .so-btn-due {
          display: inline-flex; align-items: center; gap: 6px; padding: 7px 13px;
          background: rgba(239,68,68,0.12); color: #f87171;
          font-weight: 600; font-size: 0.75rem; border-radius: 8px;
          border: 1px solid rgba(239,68,68,0.28);
          cursor: pointer; font-family: 'DM Sans', sans-serif;
          transition: all 0.2s; white-space: nowrap;
        }
        .so-btn-due:hover {
          background: rgba(239,68,68,0.2); border-color: rgba(239,68,68,0.5); color: #fca5a5;
        }

        /* ── STATUS UPDATE ROW ── */
        .so-actions { display: flex; gap: 10px; align-items: stretch; }

        /* ── SELECT ── */
        .so-select {
          flex: 1;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          padding: 10px 14px; color: #fff;
          font-family: 'DM Sans', sans-serif; font-size: 0.845rem; font-weight: 300;
          outline: none; transition: border-color 0.2s;
          appearance: none; cursor: pointer;
        }
        .so-select:focus { border-color: rgba(201,169,110,0.4); }
        .so-select option { background: #1a1a1a; color: #e2e2e2; }

        /* ── UPDATE BUTTON ── */
        .so-btn-gold {
          display: inline-flex; align-items: center; gap: 7px; padding: 10px 18px;
          background: linear-gradient(135deg, #c9a96e, #e8c98a); color: #080808;
          font-weight: 600; font-size: 0.8rem; border-radius: 10px; border: none;
          cursor: pointer; font-family: 'DM Sans', sans-serif; letter-spacing: 0.03em;
          transition: all 0.22s; white-space: nowrap;
        }
        .so-btn-gold:hover { opacity: 0.88; transform: translateY(-1px); }

        /* ── DELETE BUTTON ── */
        .so-btn-danger {
          display: inline-flex; align-items: center; gap: 7px; padding: 10px 14px;
          background: transparent; color: rgba(239,68,68,0.75); font-size: 0.8rem;
          border-radius: 10px; border: 1px solid rgba(239,68,68,0.22);
          cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.2s;
          white-space: nowrap;
        }
        .so-btn-danger:hover {
          background: rgba(239,68,68,0.07);
          border-color: rgba(239,68,68,0.45);
          color: #f87171;
        }

        @media (max-width: 640px) {
          .so-grid { grid-template-columns: 1fr; }
          .so-hero-title { font-size: 1.8rem; }
          .so-actions { flex-direction: column; }
        }
      `}</style>

      <div className="so-root">
        {/* ── HERO BAND ── */}
        <section className="so-hero">
          <div className="so-hero-glow" />
          <div className="so-hero-grid" />
          <div className="so-hero-inner">
            <div className="so-eyebrow">Marriage Card Shop</div>
            <div className="so-hero-title">Shop Orders</div>
            {shop?.shopName && (
              <div className="so-hero-sub">Managing orders for {shop.shopName}</div>
            )}
          </div>
        </section>

        <div className="so-main">
          <div className="so-divider" />

          {bookings.length === 0 ? (
            <div className="so-empty">
              <div className="so-empty-icon"><i className="fas fa-inbox" /></div>
              <div className="so-empty-title">No Orders Yet</div>
              <div className="so-empty-sub">No orders have been placed for this shop yet.</div>
            </div>
          ) : (
            <div className="so-grid">
              {bookings.map((booking) => {
                const st = statusStyle(booking.status)
                const total = booking.quantity * (booking.marriageCard?.price || 0)
                return (
                  <div key={booking._id} className="so-card">

                    {/* Header */}
                    <div className="so-card-header">
                      <div className="so-card-name">{booking.marriageCard?.cardName}</div>
                      <div
                        className="so-status-badge"
                        style={{ background: st.bg, border: `1px solid ${st.border}`, color: st.color }}
                      >
                        {booking.status}
                      </div>
                    </div>

                    {/* Body */}
                    <div className="so-card-body">
                      <div className="so-detail-list">
                        {[
                          { icon: 'fa-user', label: 'Ordered By', val: booking.user?.username },
                          { icon: 'fa-phone', label: 'Customer Phone', val: booking.phoneNumber },
                          { icon: 'fa-layer-group', label: 'Quantity', val: booking.quantity },
                          booking.customization && { icon: 'fa-pen-nib', label: 'Customization', val: booking.customization },
                        ].filter(Boolean).map(d => (
                          <div className="so-detail-row" key={d.label}>
                            <div className="so-detail-icon"><i className={`fas ${d.icon}`} /></div>
                            <div>
                              <div className="so-detail-label">{d.label}</div>
                              <div className="so-detail-value">{d.val}</div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Total Price */}
                      <div className="so-price-row">
                        <div className="so-detail-icon"><i className="fas fa-tag" /></div>
                        <div>
                          <div className="so-price-label">Total Price</div>
                          <div className="so-price-val">₹ {total.toLocaleString('en-IN')}</div>
                        </div>
                      </div>

                      {/* ── DUE AMOUNT (editable) ── */}
                      <div className="so-due-row">
                        <div className="so-due-icon"><i className="fas fa-rupee-sign" /></div>
                        <div style={{ flex: 1 }}>
                          <div className="so-due-label">Due Amount</div>
                          <div className="so-due-input-wrap">
                            <span className="so-due-prefix">₹</span>
                            <input
                              type="number"
                              min="0"
                              className="so-due-input"
                              value={dueAmounts[booking._id] ?? 0}
                              onChange={e =>
                                setDueAmounts(prev => ({ ...prev, [booking._id]: e.target.value }))
                              }
                            />
                            <button
                              className="so-btn-due"
                              onClick={() => handleDueAmountUpdate(booking._id)}
                            >
                              <i className="fas fa-check" style={{ fontSize: 10 }} /> Save
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Status Actions — completely unchanged */}
                      <div className="so-actions">
                        <button className="so-btn-danger" onClick={() => handleDelete(booking._id)}>
                          <i className="fas fa-trash" style={{ fontSize: 10 }} /> Delete
                        </button>
                        <select
                          className="so-select"
                          value={booking.status}
                          onChange={e => handleStatusUpdate(booking._id, e.target.value)}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                        <button
                          className="so-btn-gold"
                          onClick={() => handleStatusUpdate(booking._id, booking.status)}
                        >
                          <i className="fas fa-check" style={{ fontSize: 10 }} /> Update
                        </button>
                      </div>
                    </div>

                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}