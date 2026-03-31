

// import { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
// import Layout from '../../components/Layout'
// import { useFlash } from '../../context/FlashContext'
// import api from '../../services/api'

// export default function UserBookings() {
//   const { showSuccess, showError } = useFlash()
//   const [bookings, setBookings] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [payModal, setPayModal] = useState(null)
//   const [payMethod, setPayMethod] = useState('qr')
//   const [payDone, setPayDone] = useState(false)

//   useEffect(() => {
//     api.get('/bookings/user')
//       .then(res => setBookings(res.data.bookings))
//       .catch(() => showError('Failed to load your bookings'))
//       .finally(() => setLoading(false))
//   }, [])

//   const handleDelete = async (booking) => {
//     if (!window.confirm('Delete this booking?')) return
//     try {
//       await api.delete(`/bookings/shop/${booking.shop._id}/orders/${booking._id}`)
//       setBookings(prev => prev.filter(b => b._id !== booking._id))
//       showSuccess('Booking deleted successfully.')
//     } catch { showError('Failed to delete booking') }
//   }

//   const handlePayNow = (booking) => {
//     setPayModal(booking)
//     setPayMethod('qr')
//     setPayDone(false)
//   }

//   const handleConfirmPay = () => {
//     setPayDone(true)
//     setTimeout(() => {
//       setPayModal(null)
//       setPayDone(false)
//       showSuccess(payMethod === 'cod' ? 'COD order placed!' : 'Payment confirmed!')
//     }, 2000)
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

//   const total = payModal ? payModal.quantity * (payModal.marriageCard?.price || 0) : 0

//   const css = `
//     @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600&family=DM+Sans:wght@300;400;500;600&family=Space+Mono&display=swap');

//     .ub-root { min-height: 100vh; background: #080808; font-family: 'DM Sans', sans-serif; color: #e2e2e2; }

//     /* HERO */
//     .ub-hero { position: relative; padding: 40px 0 0; overflow: hidden; }
//     .ub-hero-glow { position: absolute; top: -100px; left: 50%; transform: translateX(-50%); width: 800px; height: 500px; background: radial-gradient(ellipse, rgba(201,169,110,0.1) 0%, transparent 68%); pointer-events: none; z-index: 0; }
//     .ub-hero-grid { position: absolute; inset: 0; z-index: 0; background-image: linear-gradient(rgba(201,169,110,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(201,169,110,0.035) 1px, transparent 1px); background-size: 56px 56px; mask-image: radial-gradient(ellipse 80% 100% at center top, black 20%, transparent 75%); pointer-events: none; }
//     .ub-hero-inner { position: relative; z-index: 1; max-width: 1100px; margin: 0 auto; padding: 0 28px 40px; }
//     .ub-eyebrow { font-size: 0.65rem; font-weight: 600; color: rgba(201,169,110,0.55); text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 8px; }
//     .ub-hero-title { font-family: 'Cormorant Garamond', serif; font-size: 2.4rem; font-weight: 600; color: #fff; line-height: 1.08; }

//     /* MAIN */
//     .ub-main { max-width: 1100px; margin: 0 auto; padding: 0 28px 80px; }
//     .ub-divider { height: 1px; background: linear-gradient(to right, transparent, rgba(201,169,110,0.2), transparent); margin: 0 0 36px; }

//     /* EMPTY */
//     .ub-empty { text-align: center; padding: 60px 20px; background: rgba(255,255,255,0.02); border: 1px solid rgba(201,169,110,0.12); border-radius: 20px; }
//     .ub-empty-icon { width: 56px; height: 56px; border-radius: 16px; background: rgba(201,169,110,0.08); border: 1px solid rgba(201,169,110,0.15); display: flex; align-items: center; justify-content: center; color: #c9a96e; font-size: 20px; margin: 0 auto 18px; }
//     .ub-empty-title { font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; font-weight: 600; color: #fff; margin-bottom: 8px; }
//     .ub-empty-sub { font-size: 0.875rem; color: rgba(255,255,255,0.3); font-weight: 300; }

//     /* GRID */
//     .ub-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 20px; }

//     /* CARD */
//     .ub-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(201,169,110,0.18); border-radius: 20px; overflow: hidden; transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease; }
//     .ub-card:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(0,0,0,0.45); border-color: rgba(201,169,110,0.32); }
//     .ub-card-header { padding: 20px 22px 16px; border-bottom: 1px solid rgba(201,169,110,0.1); display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }
//     .ub-card-name { font-family: 'Cormorant Garamond', serif; font-size: 1.25rem; font-weight: 600; color: #fff; line-height: 1.2; }
//     .ub-status-badge { padding: 4px 12px; border-radius: 20px; font-size: 0.65rem; font-weight: 600; letter-spacing: 0.07em; text-transform: uppercase; white-space: nowrap; flex-shrink: 0; }
//     .ub-card-body { padding: 18px 22px 20px; }
//     .ub-detail-list { display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px; }
//     .ub-detail-row { display: flex; align-items: flex-start; gap: 10px; }
//     .ub-detail-icon { width: 28px; height: 28px; border-radius: 7px; background: rgba(201,169,110,0.07); border: 1px solid rgba(201,169,110,0.13); display: flex; align-items: center; justify-content: center; color: #c9a96e; font-size: 11px; flex-shrink: 0; margin-top: 1px; }
//     .ub-detail-label { font-size: 0.62rem; font-weight: 600; color: rgba(255,255,255,0.25); text-transform: uppercase; letter-spacing: 0.09em; margin-bottom: 1px; }
//     .ub-detail-value { font-size: 0.845rem; color: rgba(255,255,255,0.65); font-weight: 300; }
//     .ub-price-row { display: flex; align-items: center; gap: 12px; padding: 13px 16px; border-radius: 12px; background: rgba(201,169,110,0.07); border: 1px solid rgba(201,169,110,0.16); margin-bottom: 18px; }
//     .ub-price-label { font-size: 0.62rem; font-weight: 600; color: rgba(255,255,255,0.28); text-transform: uppercase; letter-spacing: 0.09em; }
//     .ub-price-val { font-family: 'Cormorant Garamond', serif; font-size: 1.55rem; font-weight: 600; color: #e8c98a; line-height: 1; }
//     .ub-btn-danger { display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 11px 18px; background: transparent; color: rgba(239,68,68,0.75); font-size: 0.845rem; border-radius: 10px; border: 1px solid rgba(239,68,68,0.22); cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.2s; }
//     .ub-btn-danger:hover { background: rgba(239,68,68,0.07); border-color: rgba(239,68,68,0.45); color: #f87171; }
//     .ub-btn-pay { display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 11px 18px; margin-top: 10px; background: rgba(201,169,110,0.1); color: #e8c98a; font-size: 0.845rem; border-radius: 10px; border: 1px solid rgba(201,169,110,0.3); cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.2s; }
//     .ub-btn-pay:hover { background: rgba(201,169,110,0.18); border-color: rgba(201,169,110,0.55); }

//     /* PAYMENT MODAL OVERLAY */
//     .pm-overlay {
//       position: fixed; inset: 0; z-index: 999;
//       background: rgba(0,0,0,0.75);
//       backdrop-filter: blur(6px);
//       display: flex; align-items: center; justify-content: center; padding: 20px;
//     }
//     .pm-modal {
//       width: 100%; max-width: 400px;
//       background: #111;
//       border: 1px solid rgba(201,169,110,0.22);
//       border-radius: 22px; overflow: hidden;
//       animation: pmSlideUp 0.28s ease;
//     }
//     @keyframes pmSlideUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }

//     .pm-header {
//       background: linear-gradient(135deg, #110e07 0%, #1a1505 60%, #1f1a08 100%);
//       border-bottom: 1px solid rgba(201,169,110,0.15);
//       padding: 22px 24px 18px;
//       display: flex; align-items: flex-start; justify-content: space-between;
//     }
//     .pm-header-left {}
//     .pm-header-eyebrow { font-size: 0.6rem; font-weight: 600; color: rgba(201,169,110,0.5); text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 4px; }
//     .pm-header-name { font-family: 'Cormorant Garamond', serif; font-size: 1.2rem; font-weight: 600; color: #fff; }
//     .pm-header-amount { font-family: 'Space Mono', monospace; font-size: 1.5rem; color: #e8c98a; margin-top: 6px; }
//     .pm-close { background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.1); color: rgba(255,255,255,0.5); width: 30px; height: 30px; border-radius: 50%; cursor: pointer; font-size: 14px; display: flex; align-items: center; justify-content: center; transition: all 0.2s; flex-shrink: 0; }
//     .pm-close:hover { background: rgba(255,255,255,0.12); color: #fff; }

//     .pm-tabs { display: flex; gap: 0; border-bottom: 1px solid rgba(201,169,110,0.12); }
//     .pm-tab { flex: 1; padding: 14px; text-align: center; background: transparent; border: none; font-family: 'DM Sans', sans-serif; font-size: 0.82rem; font-weight: 500; color: rgba(255,255,255,0.35); cursor: pointer; transition: all 0.2s; border-bottom: 2px solid transparent; margin-bottom: -1px; display: flex; align-items: center; justify-content: center; gap: 7px; }
//     .pm-tab.active { color: #e8c98a; border-bottom-color: #c9a96e; }
//     .pm-tab:hover:not(.active) { color: rgba(255,255,255,0.6); }

//     .pm-body { padding: 24px; }

//     .pm-qr-wrap { display: flex; flex-direction: column; align-items: center; gap: 0; }
//     .pm-qr-box {
//       width: 168px; height: 168px;
//       background: #fff; border-radius: 14px;
//       padding: 10px; margin-bottom: 14px;
//       display: flex; align-items: center; justify-content: center;
//     }
//     .pm-qr-img {
//       width: 148px; height: 148px;
//       object-fit: contain; border-radius: 6px;
//     }
//     .pm-qr-hint { font-size: 0.75rem; color: rgba(255,255,255,0.35); text-align: center; margin-bottom: 16px; line-height: 1.5; }
//     .pm-upi-id {
//       font-family: 'Space Mono', monospace; font-size: 0.78rem;
//       color: #c9a96e; background: rgba(201,169,110,0.07);
//       border: 1px solid rgba(201,169,110,0.18); border-radius: 8px;
//       padding: 8px 14px; margin-bottom: 18px; letter-spacing: 0.04em;
//     }

//     .pm-cod-wrap { display: flex; flex-direction: column; gap: 14px; }
//     .pm-cod-info-box {
//       background: rgba(201,169,110,0.06); border: 1px solid rgba(201,169,110,0.16);
//       border-radius: 14px; padding: 18px 16px; display: flex; gap: 14px; align-items: flex-start;
//     }
//     .pm-cod-icon { font-size: 22px; margin-top: 2px; flex-shrink: 0; }
//     .pm-cod-title { font-size: 0.875rem; font-weight: 600; color: #e8c98a; margin-bottom: 5px; }
//     .pm-cod-desc { font-size: 0.78rem; color: rgba(255,255,255,0.4); line-height: 1.55; font-weight: 300; }
//     .pm-cod-steps { display: flex; flex-direction: column; gap: 10px; }
//     .pm-cod-step { display: flex; align-items: center; gap: 12px; }
//     .pm-cod-num { width: 24px; height: 24px; border-radius: 50%; background: rgba(201,169,110,0.12); border: 1px solid rgba(201,169,110,0.25); color: #c9a96e; font-size: 0.65rem; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
//     .pm-cod-step-txt { font-size: 0.8rem; color: rgba(255,255,255,0.45); font-weight: 300; }

//     .pm-confirm-btn {
//       width: 100%; padding: 13px;
//       background: linear-gradient(135deg, #c9a96e 0%, #a8853c 100%);
//       border: none; border-radius: 12px;
//       font-family: 'DM Sans', sans-serif; font-size: 0.9rem; font-weight: 600;
//       color: #0d0a04; cursor: pointer; transition: opacity 0.2s, transform 0.15s;
//       display: flex; align-items: center; justify-content: center; gap: 8px;
//     }
//     .pm-confirm-btn:hover { opacity: 0.9; transform: translateY(-1px); }
//     .pm-confirm-btn:active { transform: scale(0.98); }

//     .pm-success { display: flex; flex-direction: column; align-items: center; padding: 32px 24px; text-align: center; }
//     .pm-success-ring { width: 64px; height: 64px; border-radius: 50%; background: rgba(201,169,110,0.1); border: 1px solid rgba(201,169,110,0.3); display: flex; align-items: center; justify-content: center; font-size: 24px; margin-bottom: 16px; }
//     .pm-success-title { font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; font-weight: 600; color: #fff; margin-bottom: 6px; }
//     .pm-success-sub { font-size: 0.82rem; color: rgba(255,255,255,0.35); }

//     @media (max-width: 640px) { .ub-grid { grid-template-columns: 1fr; } .ub-hero-title { font-size: 1.8rem; } }
//   `

//   if (loading) return (
//     <Layout>
//       <style>{css}</style>
//       <div className="ub-root">
//         <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 14, color: 'rgba(255,255,255,0.25)', fontSize: '0.875rem' }}>
//           <div style={{ width: 38, height: 38, border: '2px solid rgba(201,169,110,0.15)', borderTopColor: '#c9a96e', borderRadius: '50%', animation: 'ubSpin 0.8s linear infinite' }} />
//           <span>Loading your bookings…</span>
//         </div>
//       </div>
//     </Layout>
//   )

//   return (
//     <Layout>
//       <style>{css}</style>
//       <div className="ub-root">

//         {/* HERO */}
//         <section className="ub-hero">
//           <div className="ub-hero-glow" />
//           <div className="ub-hero-grid" />
//           <div className="ub-hero-inner">
//             <div className="ub-eyebrow">Marriage Card Shop</div>
//             <div className="ub-hero-title">Your Bookings</div>
//           </div>
//         </section>

//         <div className="ub-main">
//           <div className="ub-divider" />

//           {bookings.length === 0 ? (
//             <div className="ub-empty">
//               <div className="ub-empty-icon"><i className="fas fa-bookmark" /></div>
//               <div className="ub-empty-title">No Bookings Yet</div>
//               <div className="ub-empty-sub">You haven't made any bookings. Browse shops to get started.</div>
//             </div>
//           ) : (
//             <div className="ub-grid">
//               {bookings.map((booking) => {
//                 const st = statusStyle(booking.status)
//                 const total = booking.quantity * (booking.marriageCard?.price || 0)
//                 return (
//                   <div key={booking._id} className="ub-card">
//                     <div className="ub-card-header">
//                       <div className="ub-card-name">{booking.marriageCard?.cardName}</div>
//                       <div className="ub-status-badge" style={{ background: st.bg, border: `1px solid ${st.border}`, color: st.color }}>{booking.status}</div>
//                     </div>
//                     <div className="ub-card-body">
//                       <div className="ub-detail-list">
//                         {[
//                           { icon: 'fa-store', label: 'Shop', val: booking.shop?.shopName },
//                           { icon: 'fa-layer-group', label: 'Quantity', val: booking.quantity },
//                           { icon: 'fa-phone', label: 'Shop Phone', val: booking.shop?.phoneNumber },
//                           booking.customization && { icon: 'fa-pen-nib', label: 'Customization', val: booking.customization },
//                         ].filter(Boolean).map(d => (
//                           <div className="ub-detail-row" key={d.label}>
//                             <div className="ub-detail-icon"><i className={`fas ${d.icon}`} /></div>
//                             <div>
//                               <div className="ub-detail-label">{d.label}</div>
//                               <div className="ub-detail-value">{d.val}</div>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                       <div className="ub-price-row">
//                         <div className="ub-detail-icon"><i className="fas fa-tag" /></div>
//                         <div>
//                           <div className="ub-price-label">Total Price</div>
//                           <div className="ub-price-val">₹ {total.toLocaleString('en-IN')}</div>
//                         </div>
//                       </div>
//                       <button className="ub-btn-danger" onClick={() => handleDelete(booking)}>
//                         <i className="fas fa-trash" style={{ fontSize: 11 }} /> Delete Booking
//                       </button>
//                       {booking.status === 'Pending' && (
//                         <button className="ub-btn-pay" onClick={() => handlePayNow(booking)}>
//                           <i className="fas fa-credit-card" style={{ fontSize: 11 }} /> Pay Now
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 )
//               })}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* PAYMENT MODAL */}
//       {payModal && (
//         <div className="pm-overlay" onClick={(e) => { if (e.target.classList.contains('pm-overlay')) setPayModal(null) }}>
//           <div className="pm-modal">

//             {/* Header */}
//             <div className="pm-header">
//               <div className="pm-header-left">
//                 <div className="pm-header-eyebrow">Complete Payment</div>
//                 <div className="pm-header-name">{payModal.marriageCard?.cardName}</div>
//                 <div className="pm-header-amount">₹ {total.toLocaleString('en-IN')}</div>
//               </div>
//               <button className="pm-close" onClick={() => setPayModal(null)}>✕</button>
//             </div>

//             {!payDone ? (
//               <>
//                 {/* Tabs */}
//                 <div className="pm-tabs">
//                   <button className={`pm-tab${payMethod === 'qr' ? ' active' : ''}`} onClick={() => setPayMethod('qr')}>
//                     <i className="fas fa-qrcode" style={{ fontSize: 13 }} /> Scan & Pay
//                   </button>
//                   <button className={`pm-tab${payMethod === 'cod' ? ' active' : ''}`} onClick={() => setPayMethod('cod')}>
//                     <i className="fas fa-hand-holding-usd" style={{ fontSize: 13 }} /> Cash on Delivery
//                   </button>
//                 </div>

//                 <div className="pm-body">
//                   {/* QR Panel */}
//                   {payMethod === 'qr' && (
//                     <div className="pm-qr-wrap">
//                       <div className="pm-qr-box">
//                         <img
//                           src="/image.jpeg"
//                           alt="QR Code"
//                           className="pm-qr-img"
//                         />
//                       </div>
//                       <div className="pm-qr-hint">
//                         Open any UPI app and scan this code<br />to pay ₹ {total.toLocaleString('en-IN')}
//                       </div>
//                       <div className="pm-upi-id">shopnow@upi</div>
//                       <button className="pm-confirm-btn" onClick={handleConfirmPay}>
//                         <i className="fas fa-check-circle" style={{ fontSize: 14 }} /> I've Paid
//                       </button>
//                     </div>
//                   )}

//                   {/* COD Panel */}
//                   {payMethod === 'cod' && (
//                     <div className="pm-cod-wrap">
//                       <div className="pm-cod-info-box">
//                         <div className="pm-cod-icon">💵</div>
//                         <div>
//                           <div className="pm-cod-title">Pay when you receive</div>
//                           <div className="pm-cod-desc">Keep ₹ {total.toLocaleString('en-IN')} ready in cash at the time of delivery or pickup from the shop.</div>
//                         </div>
//                       </div>
//                       <div className="pm-cod-steps">
//                         {[
//                           'Your order will be confirmed immediately',
//                           'Shop prepares your marriage cards',
//                           'Pay cash on delivery or shop pickup',
//                         ].map((txt, i) => (
//                           <div className="pm-cod-step" key={i}>
//                             <div className="pm-cod-num">{i + 1}</div>
//                             <div className="pm-cod-step-txt">{txt}</div>
//                           </div>
//                         ))}
//                       </div>
//                       <button className="pm-confirm-btn" onClick={handleConfirmPay}>
//                         <i className="fas fa-check-circle" style={{ fontSize: 14 }} /> Confirm COD Order
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </>
//             ) : (
//               <div className="pm-success">
//                 <div className="pm-success-ring">✓</div>
//                 <div className="pm-success-title">{payMethod === 'cod' ? 'Order Confirmed!' : 'Payment Received!'}</div>
//                 <div className="pm-success-sub">{payMethod === 'cod' ? 'Pay cash at delivery' : 'Thank you for your payment'}</div>
//               </div>
//             )}

//           </div>
//         </div>
//       )}
//     </Layout>
//   )
// }


import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Layout from '../../components/Layout'
import { useFlash } from '../../context/FlashContext'
import api from '../../services/api'

const RECEIVER_EMAIL = 'shivamgupta90353@gmail.com'

export default function UserBookings() {
  const { showSuccess, showError } = useFlash()
  const location = useLocation()
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [payModal, setPayModal] = useState(null)
  const [payMethod, setPayMethod] = useState('qr')
  const [payDone, setPayDone] = useState(false)
  const [payStatus, setPayStatus] = useState(null) // 'success' | 'failed' | null

  // ── Check redirect params from Gmail flow ──────────────────────────────────
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const status = params.get('payment')
    if (status === 'success') {
      setPayStatus('success')
      showSuccess('Payment confirmed! Your booking is being processed.')
      // Clean URL
      window.history.replaceState({}, '', location.pathname)
    } else if (status === 'failed') {
      setPayStatus('failed')
      showError('Payment failed or was not completed.')
      window.history.replaceState({}, '', location.pathname)
    }
  }, [])

  useEffect(() => {
    api.get('/bookings/user')
      .then(res => setBookings(res.data.bookings))
      .catch(() => showError('Failed to load your bookings'))
      .finally(() => setLoading(false))
  }, [])

  const handleDelete = async (booking) => {
    if (!window.confirm('Delete this booking?')) return
    try {
      await api.delete(`/bookings/shop/${booking.shop._id}/orders/${booking._id}`)
      setBookings(prev => prev.filter(b => b._id !== booking._id))
      showSuccess('Booking deleted successfully.')
    } catch { showError('Failed to delete booking') }
  }

  const handlePayNow = (booking) => {
    setPayModal(booking)
    setPayMethod('qr')
    setPayDone(false)
  }

  // ── Build Gmail mailto URL with booking details ────────────────────────────
  const buildGmailMailto = (booking) => {
    const total = booking.quantity * (booking.marriageCard?.price || 0)
    const returnUrl = `${window.location.origin}${window.location.pathname}`

    const subject = `Payment for Booking: ${booking.marriageCard?.cardName} | Order #${booking._id?.slice(-8).toUpperCase()}`

    const body = `Dear Shop Team,

I am writing to confirm my payment for the following booking:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  BOOKING DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Order ID      : #${booking._id?.slice(-8).toUpperCase()}
  Card Name     : ${booking.marriageCard?.cardName}
  Shop Name     : ${booking.shop?.shopName}
  Shop Phone    : ${booking.shop?.phoneNumber}
  Quantity      : ${booking.quantity}
  Price Per Card: ₹${(booking.marriageCard?.price || 0).toLocaleString('en-IN')}
  Total Amount  : ₹${total.toLocaleString('en-IN')}
  Customization : ${booking.customization || 'None'}
  Status        : ${booking.status}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  DELIVERY / RECEIVER ADDRESS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Name    : [Your Full Name]
  Address : [Your Full Delivery Address]
  City    : [City]
  Pincode : [Pincode]
  Phone   : [Your Contact Number]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Payment Method: UPI / QR Code Scan
Payment Amount: ₹${total.toLocaleString('en-IN')}

Please confirm receipt and update my booking status.

After confirming payment, kindly visit:
✅ Payment Success → ${returnUrl}?payment=success
❌ Payment Failed  → ${returnUrl}?payment=failed

Thank you,
[Your Name]`

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(RECEIVER_EMAIL)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    return gmailUrl
  }

  // ── COD confirm (no email needed, direct confirm) ──────────────────────────
  const handleCODConfirm = () => {
    setPayDone(true)
    setTimeout(() => {
      setPayModal(null)
      setPayDone(false)
      showSuccess('COD order placed! Pay cash at delivery.')
    }, 2000)
  }

  // ── Open Gmail then close modal (return URL will handle status) ────────────
  const handleOpenGmail = () => {
    const url = buildGmailMailto(payModal)
    window.open(url, '_blank')
    // Close modal — status will be set when user returns via the link in email
    setPayModal(null)
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

  const total = payModal ? payModal.quantity * (payModal.marriageCard?.price || 0) : 0

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600&family=DM+Sans:wght@300;400;500;600&family=Space+Mono&display=swap');

    .ub-root { min-height: 100vh; background: #080808; font-family: 'DM Sans', sans-serif; color: #e2e2e2; }

    /* PAYMENT STATUS BANNER */
    .ub-status-banner {
      max-width: 1100px; margin: 0 auto 0; padding: 0 28px;
    }
    .ub-banner {
      display: flex; align-items: center; gap: 12px;
      padding: 14px 18px; border-radius: 14px; margin-bottom: 24px;
      animation: ubFadeIn 0.4s ease;
    }
    @keyframes ubFadeIn { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:translateY(0); } }
    .ub-banner.success { background: rgba(34,197,94,0.08); border: 1px solid rgba(34,197,94,0.28); }
    .ub-banner.failed  { background: rgba(239,68,68,0.08);  border: 1px solid rgba(239,68,68,0.28); }
    .ub-banner-icon { font-size: 20px; flex-shrink: 0; }
    .ub-banner-text strong { display: block; font-size: 0.875rem; font-weight: 600; margin-bottom: 2px; }
    .ub-banner.success .ub-banner-text strong { color: #4ade80; }
    .ub-banner.failed  .ub-banner-text strong { color: #f87171; }
    .ub-banner-text span { font-size: 0.78rem; color: rgba(255,255,255,0.38); font-weight: 300; }
    .ub-banner-close { margin-left: auto; background: transparent; border: none; color: rgba(255,255,255,0.25); cursor: pointer; font-size: 14px; padding: 4px 6px; border-radius: 6px; transition: color 0.2s; }
    .ub-banner-close:hover { color: rgba(255,255,255,0.55); }

    /* HERO */
    .ub-hero { position: relative; padding: 40px 0 0; overflow: hidden; }
    .ub-hero-glow { position: absolute; top: -100px; left: 50%; transform: translateX(-50%); width: 800px; height: 500px; background: radial-gradient(ellipse, rgba(201,169,110,0.1) 0%, transparent 68%); pointer-events: none; z-index: 0; }
    .ub-hero-grid { position: absolute; inset: 0; z-index: 0; background-image: linear-gradient(rgba(201,169,110,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(201,169,110,0.035) 1px, transparent 1px); background-size: 56px 56px; mask-image: radial-gradient(ellipse 80% 100% at center top, black 20%, transparent 75%); pointer-events: none; }
    .ub-hero-inner { position: relative; z-index: 1; max-width: 1100px; margin: 0 auto; padding: 0 28px 40px; }
    .ub-eyebrow { font-size: 0.65rem; font-weight: 600; color: rgba(201,169,110,0.55); text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 8px; }
    .ub-hero-title { font-family: 'Cormorant Garamond', serif; font-size: 2.4rem; font-weight: 600; color: #fff; line-height: 1.08; }

    /* MAIN */
    .ub-main { max-width: 1100px; margin: 0 auto; padding: 0 28px 80px; }
    .ub-divider { height: 1px; background: linear-gradient(to right, transparent, rgba(201,169,110,0.2), transparent); margin: 0 0 36px; }

    /* EMPTY */
    .ub-empty { text-align: center; padding: 60px 20px; background: rgba(255,255,255,0.02); border: 1px solid rgba(201,169,110,0.12); border-radius: 20px; }
    .ub-empty-icon { width: 56px; height: 56px; border-radius: 16px; background: rgba(201,169,110,0.08); border: 1px solid rgba(201,169,110,0.15); display: flex; align-items: center; justify-content: center; color: #c9a96e; font-size: 20px; margin: 0 auto 18px; }
    .ub-empty-title { font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; font-weight: 600; color: #fff; margin-bottom: 8px; }
    .ub-empty-sub { font-size: 0.875rem; color: rgba(255,255,255,0.3); font-weight: 300; }

    /* GRID */
    .ub-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 20px; }

    /* CARD */
    .ub-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(201,169,110,0.18); border-radius: 20px; overflow: hidden; transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease; }
    .ub-card:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(0,0,0,0.45); border-color: rgba(201,169,110,0.32); }
    .ub-card-header { padding: 20px 22px 16px; border-bottom: 1px solid rgba(201,169,110,0.1); display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }
    .ub-card-name { font-family: 'Cormorant Garamond', serif; font-size: 1.25rem; font-weight: 600; color: #fff; line-height: 1.2; }
    .ub-status-badge { padding: 4px 12px; border-radius: 20px; font-size: 0.65rem; font-weight: 600; letter-spacing: 0.07em; text-transform: uppercase; white-space: nowrap; flex-shrink: 0; }
    .ub-card-body { padding: 18px 22px 20px; }
    .ub-detail-list { display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px; }
    .ub-detail-row { display: flex; align-items: flex-start; gap: 10px; }
    .ub-detail-icon { width: 28px; height: 28px; border-radius: 7px; background: rgba(201,169,110,0.07); border: 1px solid rgba(201,169,110,0.13); display: flex; align-items: center; justify-content: center; color: #c9a96e; font-size: 11px; flex-shrink: 0; margin-top: 1px; }
    .ub-detail-label { font-size: 0.62rem; font-weight: 600; color: rgba(255,255,255,0.25); text-transform: uppercase; letter-spacing: 0.09em; margin-bottom: 1px; }
    .ub-detail-value { font-size: 0.845rem; color: rgba(255,255,255,0.65); font-weight: 300; }
    .ub-price-row { display: flex; align-items: center; gap: 12px; padding: 13px 16px; border-radius: 12px; background: rgba(201,169,110,0.07); border: 1px solid rgba(201,169,110,0.16); margin-bottom: 18px; }
    .ub-price-label { font-size: 0.62rem; font-weight: 600; color: rgba(255,255,255,0.28); text-transform: uppercase; letter-spacing: 0.09em; }
    .ub-price-val { font-family: 'Cormorant Garamond', serif; font-size: 1.55rem; font-weight: 600; color: #e8c98a; line-height: 1; }
    .ub-btn-danger { display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 11px 18px; background: transparent; color: rgba(239,68,68,0.75); font-size: 0.845rem; border-radius: 10px; border: 1px solid rgba(239,68,68,0.22); cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.2s; }
    .ub-btn-danger:hover { background: rgba(239,68,68,0.07); border-color: rgba(239,68,68,0.45); color: #f87171; }
    .ub-btn-pay { display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 11px 18px; margin-top: 10px; background: rgba(201,169,110,0.1); color: #e8c98a; font-size: 0.845rem; border-radius: 10px; border: 1px solid rgba(201,169,110,0.3); cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.2s; }
    .ub-btn-pay:hover { background: rgba(201,169,110,0.18); border-color: rgba(201,169,110,0.55); }

    /* PAYMENT MODAL OVERLAY */
    .pm-overlay { position: fixed; inset: 0; z-index: 999; background: rgba(0,0,0,0.75); backdrop-filter: blur(6px); display: flex; align-items: center; justify-content: center; padding: 20px; }
    .pm-modal { width: 100%; max-width: 420px; background: #111; border: 1px solid rgba(201,169,110,0.22); border-radius: 22px; overflow: hidden; animation: pmSlideUp 0.28s ease; }
    @keyframes pmSlideUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }

    .pm-header { background: linear-gradient(135deg, #110e07 0%, #1a1505 60%, #1f1a08 100%); border-bottom: 1px solid rgba(201,169,110,0.15); padding: 22px 24px 18px; display: flex; align-items: flex-start; justify-content: space-between; }
    .pm-header-eyebrow { font-size: 0.6rem; font-weight: 600; color: rgba(201,169,110,0.5); text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 4px; }
    .pm-header-name { font-family: 'Cormorant Garamond', serif; font-size: 1.2rem; font-weight: 600; color: #fff; }
    .pm-header-amount { font-family: 'Space Mono', monospace; font-size: 1.5rem; color: #e8c98a; margin-top: 6px; }
    .pm-close { background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.1); color: rgba(255,255,255,0.5); width: 30px; height: 30px; border-radius: 50%; cursor: pointer; font-size: 14px; display: flex; align-items: center; justify-content: center; transition: all 0.2s; flex-shrink: 0; }
    .pm-close:hover { background: rgba(255,255,255,0.12); color: #fff; }

    .pm-tabs { display: flex; border-bottom: 1px solid rgba(201,169,110,0.12); }
    .pm-tab { flex: 1; padding: 14px; text-align: center; background: transparent; border: none; font-family: 'DM Sans', sans-serif; font-size: 0.82rem; font-weight: 500; color: rgba(255,255,255,0.35); cursor: pointer; transition: all 0.2s; border-bottom: 2px solid transparent; margin-bottom: -1px; display: flex; align-items: center; justify-content: center; gap: 7px; }
    .pm-tab.active { color: #e8c98a; border-bottom-color: #c9a96e; }
    .pm-tab:hover:not(.active) { color: rgba(255,255,255,0.6); }

    .pm-body { padding: 24px; }

    /* QR */
    .pm-qr-wrap { display: flex; flex-direction: column; align-items: center; }
    .pm-qr-box { width: 168px; height: 168px; background: #fff; border-radius: 14px; padding: 10px; margin-bottom: 14px; display: flex; align-items: center; justify-content: center; }
    .pm-qr-img { width: 148px; height: 148px; object-fit: contain; border-radius: 6px; }
    .pm-qr-hint { font-size: 0.75rem; color: rgba(255,255,255,0.35); text-align: center; margin-bottom: 12px; line-height: 1.5; }
    .pm-upi-id { font-family: 'Space Mono', monospace; font-size: 0.78rem; color: #c9a96e; background: rgba(201,169,110,0.07); border: 1px solid rgba(201,169,110,0.18); border-radius: 8px; padding: 8px 14px; margin-bottom: 18px; letter-spacing: 0.04em; }

    /* Gmail step box */
    .pm-gmail-info {
      width: 100%; background: rgba(66,133,244,0.07); border: 1px solid rgba(66,133,244,0.2);
      border-radius: 12px; padding: 14px 16px; margin-bottom: 16px;
      display: flex; gap: 12px; align-items: flex-start;
    }
    .pm-gmail-icon { font-size: 18px; flex-shrink: 0; margin-top: 2px; }
    .pm-gmail-title { font-size: 0.8rem; font-weight: 600; color: #7eb4f7; margin-bottom: 4px; }
    .pm-gmail-desc { font-size: 0.73rem; color: rgba(255,255,255,0.38); line-height: 1.55; font-weight: 300; }

    /* Confirm btn — Gmail variant */
    .pm-confirm-btn { width: 100%; padding: 13px; background: linear-gradient(135deg, #c9a96e 0%, #a8853c 100%); border: none; border-radius: 12px; font-family: 'DM Sans', sans-serif; font-size: 0.9rem; font-weight: 600; color: #0d0a04; cursor: pointer; transition: opacity 0.2s, transform 0.15s; display: flex; align-items: center; justify-content: center; gap: 8px; }
    .pm-confirm-btn:hover { opacity: 0.9; transform: translateY(-1px); }
    .pm-confirm-btn:active { transform: scale(0.98); }
    .pm-confirm-btn.gmail { background: linear-gradient(135deg, #4285f4 0%, #2563eb 100%); color: #fff; }

    /* COD */
    .pm-cod-wrap { display: flex; flex-direction: column; gap: 14px; }
    .pm-cod-info-box { background: rgba(201,169,110,0.06); border: 1px solid rgba(201,169,110,0.16); border-radius: 14px; padding: 18px 16px; display: flex; gap: 14px; align-items: flex-start; }
    .pm-cod-icon { font-size: 22px; margin-top: 2px; flex-shrink: 0; }
    .pm-cod-title { font-size: 0.875rem; font-weight: 600; color: #e8c98a; margin-bottom: 5px; }
    .pm-cod-desc { font-size: 0.78rem; color: rgba(255,255,255,0.4); line-height: 1.55; font-weight: 300; }
    .pm-cod-steps { display: flex; flex-direction: column; gap: 10px; }
    .pm-cod-step { display: flex; align-items: center; gap: 12px; }
    .pm-cod-num { width: 24px; height: 24px; border-radius: 50%; background: rgba(201,169,110,0.12); border: 1px solid rgba(201,169,110,0.25); color: #c9a96e; font-size: 0.65rem; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .pm-cod-step-txt { font-size: 0.8rem; color: rgba(255,255,255,0.45); font-weight: 300; }

    /* Success */
    .pm-success { display: flex; flex-direction: column; align-items: center; padding: 32px 24px; text-align: center; }
    .pm-success-ring { width: 64px; height: 64px; border-radius: 50%; background: rgba(201,169,110,0.1); border: 1px solid rgba(201,169,110,0.3); display: flex; align-items: center; justify-content: center; font-size: 24px; margin-bottom: 16px; }
    .pm-success-title { font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; font-weight: 600; color: #fff; margin-bottom: 6px; }
    .pm-success-sub { font-size: 0.82rem; color: rgba(255,255,255,0.35); }

    @keyframes ubSpin { to { transform: rotate(360deg); } }
    @media (max-width: 640px) { .ub-grid { grid-template-columns: 1fr; } .ub-hero-title { font-size: 1.8rem; } }
  `

  if (loading) return (
    <Layout>
      <style>{css}</style>
      <div className="ub-root">
        <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 14, color: 'rgba(255,255,255,0.25)', fontSize: '0.875rem' }}>
          <div style={{ width: 38, height: 38, border: '2px solid rgba(201,169,110,0.15)', borderTopColor: '#c9a96e', borderRadius: '50%', animation: 'ubSpin 0.8s linear infinite' }} />
          <span>Loading your bookings…</span>
        </div>
      </div>
    </Layout>
  )

  return (
    <Layout>
      <style>{css}</style>
      <div className="ub-root">

        {/* HERO */}
        <section className="ub-hero">
          <div className="ub-hero-glow" />
          <div className="ub-hero-grid" />
          <div className="ub-hero-inner">
            <div className="ub-eyebrow">Marriage Card Shop</div>
            <div className="ub-hero-title">Your Bookings</div>
          </div>
        </section>

        <div className="ub-main">

          {/* ── Payment redirect status banner ── */}
          {payStatus && (
            <div className="ub-status-banner">
              <div className={`ub-banner ${payStatus}`}>
                <div className="ub-banner-icon">{payStatus === 'success' ? '✅' : '❌'}</div>
                <div className="ub-banner-text">
                  <strong>{payStatus === 'success' ? 'Payment Confirmed!' : 'Payment Failed'}</strong>
                  <span>{payStatus === 'success' ? 'Your email was sent successfully. The shop will process your order shortly.' : 'Your payment email was not completed. Please try again or contact the shop.'}</span>
                </div>
                <button className="ub-banner-close" onClick={() => setPayStatus(null)}>✕</button>
              </div>
            </div>
          )}

          <div className="ub-divider" />

          {bookings.length === 0 ? (
            <div className="ub-empty">
              <div className="ub-empty-icon"><i className="fas fa-bookmark" /></div>
              <div className="ub-empty-title">No Bookings Yet</div>
              <div className="ub-empty-sub">You haven't made any bookings. Browse shops to get started.</div>
            </div>
          ) : (
            <div className="ub-grid">
              {bookings.map((booking) => {
                const st = statusStyle(booking.status)
                const cardTotal = booking.quantity * (booking.marriageCard?.price || 0)
                return (
                  <div key={booking._id} className="ub-card">
                    <div className="ub-card-header">
                      <div className="ub-card-name">{booking.marriageCard?.cardName}</div>
                      <div className="ub-status-badge" style={{ background: st.bg, border: `1px solid ${st.border}`, color: st.color }}>{booking.status}</div>
                    </div>
                    <div className="ub-card-body">
                      <div className="ub-detail-list">
                        {[
                          { icon: 'fa-store', label: 'Shop', val: booking.shop?.shopName },
                          { icon: 'fa-layer-group', label: 'Quantity', val: booking.quantity },
                          { icon: 'fa-phone', label: 'Shop Phone', val: booking.shop?.phoneNumber },
                          booking.customization && { icon: 'fa-pen-nib', label: 'Customization', val: booking.customization },
                        ].filter(Boolean).map(d => (
                          <div className="ub-detail-row" key={d.label}>
                            <div className="ub-detail-icon"><i className={`fas ${d.icon}`} /></div>
                            <div>
                              <div className="ub-detail-label">{d.label}</div>
                              <div className="ub-detail-value">{d.val}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="ub-price-row">
                        <div className="ub-detail-icon"><i className="fas fa-tag" /></div>
                        <div>
                          <div className="ub-price-label">Total Price</div>
                          <div className="ub-price-val">₹ {cardTotal.toLocaleString('en-IN')}</div>
                        </div>
                      </div>
                      <button className="ub-btn-danger" onClick={() => handleDelete(booking)}>
                        <i className="fas fa-trash" style={{ fontSize: 11 }} /> Delete Booking
                      </button>
                      {booking.status === 'Pending' && (
                        <button className="ub-btn-pay" onClick={() => handlePayNow(booking)}>
                          <i className="fas fa-credit-card" style={{ fontSize: 11 }} /> Pay Now
                        </button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* ── PAYMENT MODAL ── */}
      {payModal && (
        <div className="pm-overlay" onClick={(e) => { if (e.target.classList.contains('pm-overlay')) setPayModal(null) }}>
          <div className="pm-modal">

            {/* Header */}
            <div className="pm-header">
              <div>
                <div className="pm-header-eyebrow">Complete Payment</div>
                <div className="pm-header-name">{payModal.marriageCard?.cardName}</div>
                <div className="pm-header-amount">₹ {total.toLocaleString('en-IN')}</div>
              </div>
              <button className="pm-close" onClick={() => setPayModal(null)}>✕</button>
            </div>

            {!payDone ? (
              <>
                {/* Tabs */}
                <div className="pm-tabs">
                  <button className={`pm-tab${payMethod === 'qr' ? ' active' : ''}`} onClick={() => setPayMethod('qr')}>
                    <i className="fas fa-qrcode" style={{ fontSize: 13 }} /> Scan & Pay
                  </button>
                  <button className={`pm-tab${payMethod === 'cod' ? ' active' : ''}`} onClick={() => setPayMethod('cod')}>
                    <i className="fas fa-hand-holding-usd" style={{ fontSize: 13 }} /> Cash on Delivery
                  </button>
                </div>

                <div className="pm-body">

                  {/* ── QR / Gmail Panel ── */}
                  {payMethod === 'qr' && (
                    <div className="pm-qr-wrap">
                      <div className="pm-qr-box">
                        <img src="/image.jpeg" alt="QR Code" className="pm-qr-img" />
                      </div>
                      <div className="pm-qr-hint">
                        Scan with any UPI app to pay ₹ {total.toLocaleString('en-IN')}
                      </div>
                      <div className="pm-upi-id">shopnow@upi</div>

                      {/* Gmail step info */}
                      <div className="pm-gmail-info">
                        <div className="pm-gmail-icon">✉️</div>
                        <div>
                          <div className="pm-gmail-title">Confirm via Gmail</div>
                          <div className="pm-gmail-desc">
                            After scanning & paying, click below to open Gmail. A pre-filled email with your booking details will be ready — just fill in your delivery address and send it to confirm your payment.
                          </div>
                        </div>
                      </div>

                      {/* Open Gmail button */}
                      <button className="pm-confirm-btn gmail" onClick={handleOpenGmail}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
                          <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.9.732-1.636 1.636-1.636h1.82L12 10.09l8.545-6.27h1.82A1.636 1.636 0 0 1 24 5.457z" />
                        </svg>
                        I've Paid — Send Confirmation Email
                      </button>
                    </div>
                  )}

                  {/* ── COD Panel ── */}
                  {payMethod === 'cod' && (
                    <div className="pm-cod-wrap">
                      <div className="pm-cod-info-box">
                        <div className="pm-cod-icon">💵</div>
                        <div>
                          <div className="pm-cod-title">Pay when you receive</div>
                          <div className="pm-cod-desc">Keep ₹ {total.toLocaleString('en-IN')} ready in cash at the time of delivery or pickup from the shop.</div>
                        </div>
                      </div>
                      <div className="pm-cod-steps">
                        {[
                          'Your order will be confirmed immediately',
                          'Shop prepares your marriage cards',
                          'Pay cash on delivery or shop pickup',
                        ].map((txt, i) => (
                          <div className="pm-cod-step" key={i}>
                            <div className="pm-cod-num">{i + 1}</div>
                            <div className="pm-cod-step-txt">{txt}</div>
                          </div>
                        ))}
                      </div>
                      <button className="pm-confirm-btn" onClick={handleCODConfirm}>
                        <i className="fas fa-check-circle" style={{ fontSize: 14 }} /> Confirm COD Order
                      </button>
                    </div>
                  )}

                </div>
              </>
            ) : (
              <div className="pm-success">
                <div className="pm-success-ring">✓</div>
                <div className="pm-success-title">Order Confirmed!</div>
                <div className="pm-success-sub">Pay cash at delivery or pickup</div>
              </div>
            )}

          </div>
        </div>
      )}
    </Layout>
  )
}