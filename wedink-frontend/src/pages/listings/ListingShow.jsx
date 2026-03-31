// import { useState, useEffect } from 'react'
// import { useParams, useNavigate, Link } from 'react-router-dom'
// import Layout from '../../components/Layout'
// import { useAuth } from '../../context/AuthContext'
// import { useFlash } from '../../context/FlashContext'
// import api from '../../services/api'

// export default function ListingShow() {
//   const { id } = useParams()
//   const { curruser } = useAuth()
//   const { showSuccess, showError } = useFlash()
//   const navigate = useNavigate()

//   const [listing, setListing] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [review, setReview] = useState({ rating: 3, comment: '' })
//   const [submitting, setSubmitting] = useState(false)

//   useEffect(() => {
//     api.get(`/listings/${id}`)
//       .then(res => setListing(res.data.listing))
//       .catch(() => { showError('Shop not found'); navigate('/listings') })
//       .finally(() => setLoading(false))
//   }, [id])

//   const handleDelete = async () => {
//     if (!window.confirm('Delete this shop?')) return
//     try {
//       await api.delete(`/listings/${id}`)
//       showSuccess('Shop deleted successfully!')
//       navigate('/listings')
//     } catch { showError('Failed to delete shop') }
//   }

//   const handleReviewSubmit = async (e) => {
//     e.preventDefault()
//     setSubmitting(true)

//     try {
//       // ✅ FIX: send review directly (NOT { review })
//       const res = await api.post(`/listings/${id}/reviews`, review)

//       // update UI instantly
//       setListing(prev => ({
//         ...prev,
//         reviews: [...prev.reviews, res.data.review]
//       }))

//       // reset form
//       setReview({ rating: 3, comment: '' })

//       showSuccess('Review added!')

//     } catch (err) {
//       console.log(err.response?.data) // debug
//       showError(err.response?.data?.message || 'Failed to add review')
//     } finally {
//       setSubmitting(false)
//     }
//   }

//   const handleDeleteReview = async (reviewId) => {
//     try {
//       await api.delete(`/listings/${id}/reviews/${reviewId}`)
//       setListing(prev => ({ ...prev, reviews: prev.reviews.filter(r => r._id !== reviewId) }))
//       showSuccess('Review deleted!')
//     } catch { showError('Failed to delete review') }
//   }

//   if (loading) return <Layout><div className="d-flex justify-content-center mt-5"><div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div></div></Layout>
//   if (!listing) return null

//   const isOwner = curruser && listing.owner && curruser._id === listing.owner._id

//   return (
//     <Layout>
//       <style>{`
//         body { background:linear-gradient(135deg,#fff9f9 0%,#fff5f6 100%); font-family:'Segoe UI',system-ui,-apple-system,sans-serif; }
//         .listing-container { background:white; padding:2.5rem; border-radius:20px; box-shadow:0 20px 40px rgba(0,0,0,.08); border:1px solid rgba(212,175,55,.3); max-width:1100px; margin:2rem auto; }
//         .page-title { color:#d4af37; font-size:2.5rem; font-weight:700; text-align:center; margin-bottom:2rem; font-family:'Georgia',serif; position:relative; }
//         .page-title::after { content:''; display:block; width:100px; height:3px; background:linear-gradient(90deg,transparent,#d4af37,transparent); margin:1rem auto; }
//         .listing-details { list-style:none; padding:0; }
//         .listing-details li { font-size:1.1rem; padding:.8rem 0; color:#555; border-bottom:1px solid #f0f0f0; }
//         .listing-details li:last-child { border-bottom:none; }
//         .price { font-size:1.5rem; font-weight:bold; color:#d4af37; padding:1rem; background:#fff9e6; border-radius:10px; text-align:center; margin:1rem 0; }
//         .listing-img { width:100%; border-radius:15px; object-fit:cover; height:400px; box-shadow:0 10px 20px rgba(0,0,0,.1); transition:transform .3s ease; }
//         .listing-img:hover { transform:scale(1.02); }
//         .review-section { background:white; padding:2rem; border-radius:15px; margin-top:2rem; box-shadow:0 10px 20px rgba(0,0,0,.05); }
//         .review-card { background:#fff; border-radius:15px; padding:1.5rem; margin-bottom:1rem; border:1px solid #f0f0f0; transition:transform .3s ease; }
//         .review-card:hover { transform:translateY(-5px); }
//         .review-author { color:#8d1f40; font-weight:600; font-size:1.1rem; margin-bottom:.5rem; }
//         .rating-stars { color:#ffd700; font-size:1.2rem; }
//         .review-form { background:#fff; padding:2rem; border-radius:15px; box-shadow:0 10px 20px rgba(0,0,0,.05); }
//         @media(max-width:768px) { .listing-container{padding:.7rem;margin:0;} .page-title{font-size:2rem;} .listing-img{height:300px;} }
//       `}</style>

//       <div>
//         <div className="listing-container">
//           <h1 className="page-title">Shop Details</h1>
//           <div className="row g-4">
//             <div className="col-md-6">
//               <img src={listing.image.url} alt="Shop" className="listing-img" />
//             </div>
//             <div className="col-md-6">
//               <div className="card h-100" style={{ padding: '1.5rem', borderRadius: '15px', border: 'none', boxShadow: '0 10px 20px rgba(0,0,0,.05)' }}>
//                 <ul className="listing-details">
//                   <li><strong>Shop Name:</strong> {listing.shopName}</li>
//                   <li><strong>Shop Owner:</strong> {listing.owner?.username}</li>
//                   <li><strong>Shop Email:</strong> {listing.owner?.email}</li>
//                   <li><strong>Contact no.:</strong> {listing.phoneNumber}</li>
//                   <li><strong>Description:</strong> {listing.description}</li>
//                   <li><strong>Location:</strong> {listing.location}</li>
//                   <li><strong>Country:</strong> {listing.country}</li>
//                 </ul>
//                 <div className="price">
//                   <Link to={`/listings/${listing._id}/Mcard`} className="btn btn-primary mt-3">Visit Shop</Link>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="text-center mt-4">
//             {isOwner && (
//               <>
//                 <Link to={`/listings/${listing._id}/edit`} className="btn btn-primary me-3 mt-3">Edit Listing</Link>
//                 <button className="btn btn-secondary me-3 mt-3" onClick={handleDelete}>Delete Card</button>
//                 <Link to={`/listings/${listing._id}/orders`} className="btn btn-primary me-3 mt-3">Orders</Link>
//               </>
//             )}
//           </div>
//         </div>

//         {/* Reviews */}
//         <div className="review-section" style={{ maxWidth: 1100, margin: '0 auto' }}>
//           {curruser && (
//             <div className="review-form mb-5">
//               <h4 className="mb-4">Share Your Experience</h4>
//               <form onSubmit={handleReviewSubmit} noValidate>
//                 <div className="mb-4">
//                   <label className="form-label">Rating</label>
//                   <input type="range" min="1" max="5" className="form-range"
//                     value={review.rating}
//                     onChange={e => setReview({ ...review, rating: Number(e.target.value) })} />
//                   <span className="text-muted">{review.rating} / 5</span>
//                 </div>
//                 <div className="mb-4">
//                   <label className="form-label">Your Review</label>
//                   <textarea rows="4" className="form-control" required
//                     value={review.comment}
//                     onChange={e => setReview({ ...review, comment: e.target.value })} />
//                 </div>
//                 <button className="btn btn-secondary" disabled={submitting}>
//                   {submitting ? 'Submitting...' : 'Submit Review'}
//                 </button>
//               </form>
//             </div>
//           )}

//           <h4 className="mb-4">Customer Reviews</h4>
//           <div className="row g-4">
//             {listing.reviews.map(rev => (
//               <div key={rev._id} className="col-lg-4 col-md-6">
//                 <div className="review-card">
//                   <div className="review-author">@{rev.author?.username}</div>
//                   <div className="rating-stars mb-2">
//                     {'★'.repeat(rev.rating)}{'☆'.repeat(5 - rev.rating)}
//                     <span className="text-muted ms-2">({rev.rating} stars)</span>
//                   </div>
//                   <p className="mb-3">{rev.comment}</p>
//                   <button className="btn btn-sm btn-primary w-100" onClick={() => handleDeleteReview(rev._id)}>
//                     Delete Review
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </Layout>
//   )
// }
import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import Layout from '../../components/Layout'
import { useAuth } from '../../context/AuthContext'
import { useFlash } from '../../context/FlashContext'
import api from '../../services/api'

export default function ListingShow() {
  const { id } = useParams()
  const { curruser } = useAuth()
  const { showSuccess, showError } = useFlash()
  const navigate = useNavigate()

  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [review, setReview] = useState({ rating: 3, comment: '' })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    api.get(`/listings/${id}`)
      .then(res => setListing(res.data.listing))
      .catch(() => { showError('Shop not found'); navigate('/listings') })
      .finally(() => setLoading(false))
  }, [id])

  const handleDelete = async () => {
    if (!window.confirm('Delete this shop?')) return
    try {
      await api.delete(`/listings/${id}`)
      showSuccess('Shop deleted successfully!')
      navigate('/listings')
    } catch { showError('Failed to delete shop') }
  }

  const handleReviewSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await api.post(`/listings/${id}/reviews`, review)
      setListing(prev => ({ ...prev, reviews: [...prev.reviews, res.data.review] }))
      setReview({ rating: 3, comment: '' })
      showSuccess('Review added!')
    } catch (err) {
      showError(err.response?.data?.message || 'Failed to add review')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteReview = async (reviewId) => {
    try {
      await api.delete(`/listings/${id}/reviews/${reviewId}`)
      setListing(prev => ({ ...prev, reviews: prev.reviews.filter(r => r._id !== reviewId) }))
      showSuccess('Review deleted!')
    } catch { showError('Failed to delete review') }
  }

  const avgRating = listing?.reviews?.length
    ? (listing.reviews.reduce((s, r) => s + r.rating, 0) / listing.reviews.length).toFixed(1)
    : '—'

  const isOwner = curruser && listing?.owner && curruser._id === listing.owner._id

  return (
    <Layout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');

        .ls-root {
          min-height: 100vh;
          background: #080808;
          font-family: 'DM Sans', sans-serif;
          color: #e2e2e2;
        }

        /* ── HERO BAND ── */
        .ls-hero { position: relative; padding: 40px 0 0; overflow: hidden; }
        .ls-hero-glow {
          position: absolute; top: -100px; left: 50%; transform: translateX(-50%);
          width: 800px; height: 500px;
          background: radial-gradient(ellipse, rgba(201,169,110,0.1) 0%, transparent 68%);
          pointer-events: none; z-index: 0;
        }
        .ls-hero-grid {
          position: absolute; inset: 0; z-index: 0;
          background-image:
            linear-gradient(rgba(201,169,110,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,169,110,0.035) 1px, transparent 1px);
          background-size: 56px 56px;
          mask-image: radial-gradient(ellipse 80% 100% at center top, black 20%, transparent 75%);
          pointer-events: none;
        }
        .ls-hero-inner {
          position: relative; z-index: 1;
          max-width: 1100px; margin: 0 auto; padding: 0 28px 40px;
        }
        .ls-breadcrumb {
          display: flex; align-items: center; gap: 8px;
          font-size: 0.72rem; color: rgba(255,255,255,0.25);
          text-transform: uppercase; letter-spacing: 0.08em;
        }
        .ls-breadcrumb a { color: rgba(255,255,255,0.25); text-decoration: none; transition: color 0.18s; }
        .ls-breadcrumb a:hover { color: #c9a96e; }
        .ls-breadcrumb i { font-size: 8px; }

        /* ── MAIN ── */
        .ls-main { max-width: 1100px; margin: 0 auto; padding: 0 28px 80px; }

        /* ── SHOP CARD ── */
        .ls-shop-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(201,169,110,0.18);
          border-radius: 24px; overflow: hidden; margin-bottom: 28px;
        }
        .ls-shop-inner {
          display: grid; grid-template-columns: 1fr 1fr; min-height: 400px;
        }
        .ls-img-side { position: relative; overflow: hidden; }
        .ls-shop-img {
          width: 100%; height: 100%; object-fit: cover; display: block;
          min-height: 360px; transition: transform 0.5s ease;
        }
        .ls-shop-img:hover { transform: scale(1.04); }
        .ls-img-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(120deg, transparent 50%, rgba(8,8,8,0.55) 100%);
        }
        .ls-img-badge {
          position: absolute; top: 18px; left: 18px;
          display: flex; align-items: center; gap: 7px;
          padding: 5px 14px; border-radius: 8px;
          background: rgba(8,8,8,0.78); backdrop-filter: blur(10px);
          border: 1px solid rgba(201,169,110,0.22);
          font-size: 0.65rem; font-weight: 600; color: #c9a96e;
          letter-spacing: 0.08em; text-transform: uppercase;
        }
        .ls-badge-dot {
          width: 6px; height: 6px; border-radius: 50%; background: #c9a96e;
          animation: lsBlink 2s ease-in-out infinite;
        }
        @keyframes lsBlink { 0%,100%{opacity:1;} 50%{opacity:0.2;} }

        .ls-info-side { padding: 36px 38px; display: flex; flex-direction: column; justify-content: space-between; }
        .ls-eyebrow {
          font-size: 0.65rem; font-weight: 600; color: rgba(201,169,110,0.55);
          text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 8px;
        }
        .ls-shop-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.4rem; font-weight: 600; color: #fff;
          line-height: 1.08; margin-bottom: 24px;
        }
        .ls-details-list { display: flex; flex-direction: column; gap: 12px; margin-bottom: 28px; }
        .ls-detail-row { display: flex; align-items: flex-start; gap: 12px; }
        .ls-detail-icon {
          width: 32px; height: 32px; border-radius: 8px;
          background: rgba(201,169,110,0.08); border: 1px solid rgba(201,169,110,0.14);
          display: flex; align-items: center; justify-content: center;
          color: #c9a96e; font-size: 12px; flex-shrink: 0; margin-top: 1px;
        }
        .ls-detail-label {
          font-size: 0.63rem; font-weight: 600; color: rgba(255,255,255,0.26);
          text-transform: uppercase; letter-spacing: 0.09em; margin-bottom: 2px;
        }
        .ls-detail-value { font-size: 0.875rem; color: rgba(255,255,255,0.68); font-weight: 300; line-height: 1.5; }
        .ls-actions { display: flex; gap: 10px; flex-wrap: wrap; }

        /* ── STATS STRIP ── */
        .ls-stats {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 1px; background: rgba(201,169,110,0.08);
          border-radius: 16px; overflow: hidden; margin-bottom: 32px;
          border: 1px solid rgba(201,169,110,0.1);
        }
        .ls-stat { background: #080808; padding: 20px 24px; text-align: center; }
        .ls-stat-val {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem; font-weight: 600; color: #fff; line-height: 1;
        }
        .ls-stat-val.gold { color: #e8c98a; }
        .ls-stat-lbl { font-size: 0.67rem; color: rgba(255,255,255,0.28); text-transform: uppercase; letter-spacing: 0.09em; margin-top: 4px; }

        /* ── DIVIDER ── */
        .ls-divider { height: 1px; background: linear-gradient(to right, transparent, rgba(201,169,110,0.2), transparent); margin: 0 0 36px; }

        /* ── SECTION HEADER ── */
        .ls-sec-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 22px; }
        .ls-sec-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem; font-weight: 600; color: #fff; letter-spacing: 0.01em;
        }
        .ls-sec-title span { font-size: 0.72rem; font-family: 'DM Sans', sans-serif; font-weight: 400; color: rgba(255,255,255,0.25); margin-left: 10px; text-transform: uppercase; letter-spacing: 0.08em; }

        /* ── REVIEW FORM ── */
        .ls-form-card {
          background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px; padding: 28px 30px; margin-bottom: 32px;
        }
        .ls-form-label { font-size: 0.7rem; font-weight: 600; color: rgba(255,255,255,0.3); text-transform: uppercase; letter-spacing: 0.09em; margin-bottom: 10px; display: block; }
        .ls-stars-row { display: flex; align-items: center; gap: 14px; margin-bottom: 20px; }
        .ls-stars { display: flex; gap: 6px; }
        .ls-star {
          width: 36px; height: 36px; border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.03);
          color: rgba(255,255,255,0.2); font-size: 15px;
          cursor: pointer; transition: all 0.18s;
          display: flex; align-items: center; justify-content: center;
        }
        .ls-star.active { background: rgba(201,169,110,0.1); border-color: rgba(201,169,110,0.3); color: #c9a96e; }
        .ls-rating-display {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem; font-weight: 600; color: #e8c98a;
        }
        .ls-textarea {
          width: 100%; background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07); border-radius: 10px;
          padding: 14px 16px; color: #fff;
          font-family: 'DM Sans', sans-serif; font-size: 0.875rem; font-weight: 300;
          resize: vertical; min-height: 100px; outline: none;
          transition: border-color 0.2s; margin-bottom: 20px;
          box-sizing: border-box;
        }
        .ls-textarea::placeholder { color: rgba(255,255,255,0.18); }
        .ls-textarea:focus { border-color: rgba(201,169,110,0.35); }

        /* ── REVIEWS ── */
        .ls-reviews-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px; }
        .ls-review-card {
          background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px; padding: 22px 24px;
          transition: border-color 0.2s, transform 0.2s;
        }
        .ls-review-card:hover { border-color: rgba(201,169,110,0.18); transform: translateY(-3px); }
        .ls-rev-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
        .ls-rev-author { display: flex; align-items: center; gap: 10px; }
        .ls-rev-avatar {
          width: 34px; height: 34px; border-radius: 50%;
          background: linear-gradient(135deg, #c9a96e, #e8c98a);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Cormorant Garamond', serif; font-size: 0.9rem; font-weight: 700; color: #080808; flex-shrink: 0;
        }
        .ls-rev-name { font-size: 0.855rem; font-weight: 500; color: #fff; }
        .ls-rev-handle { font-size: 0.72rem; color: rgba(255,255,255,0.25); margin-top: 1px; }
        .ls-rev-stars { display: flex; gap: 3px; }
        .ls-rev-stars .f { color: #c9a96e; font-size: 11px; }
        .ls-rev-stars .e { color: rgba(255,255,255,0.12); font-size: 11px; }
        .ls-rev-comment { font-size: 0.855rem; color: rgba(255,255,255,0.48); line-height: 1.65; font-weight: 300; margin-bottom: 14px; }
        .ls-rev-delete {
          display: flex; align-items: center; gap: 6px;
          font-size: 0.72rem; color: rgba(239,68,68,0.5);
          background: none; border: 1px solid rgba(239,68,68,0.15);
          border-radius: 6px; padding: 4px 12px; cursor: pointer;
          font-family: 'DM Sans', sans-serif; transition: all 0.18s;
        }
        .ls-rev-delete:hover { color: rgba(239,68,68,0.8); border-color: rgba(239,68,68,0.35); background: rgba(239,68,68,0.05); }

        /* ── BUTTONS ── */
        .ls-btn-gold {
          display: inline-flex; align-items: center; gap: 8px; padding: 11px 24px;
          background: linear-gradient(135deg, #c9a96e, #e8c98a); color: #080808;
          font-weight: 600; font-size: 0.845rem; border-radius: 10px; border: none;
          cursor: pointer; font-family: 'DM Sans', sans-serif; letter-spacing: 0.03em;
          transition: all 0.22s; text-decoration: none;
        }
        .ls-btn-gold:hover { opacity: 0.88; transform: translateY(-1px); color: #080808; }
        .ls-btn-outline {
          display: inline-flex; align-items: center; gap: 8px; padding: 10px 20px;
          background: transparent; color: #c9a96e; font-size: 0.845rem;
          border-radius: 10px; border: 1px solid rgba(201,169,110,0.28);
          cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.2s; text-decoration: none;
        }
        .ls-btn-outline:hover { background: rgba(201,169,110,0.07); border-color: #c9a96e; color: #e8c98a; }
        .ls-btn-danger {
          display: inline-flex; align-items: center; gap: 8px; padding: 10px 18px;
          background: transparent; color: rgba(239,68,68,0.75); font-size: 0.845rem;
          border-radius: 10px; border: 1px solid rgba(239,68,68,0.22);
          cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.2s;
        }
        .ls-btn-danger:hover { background: rgba(239,68,68,0.07); border-color: rgba(239,68,68,0.45); }

        /* ── LOADING ── */
        .ls-loading { min-height: 60vh; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 14px; color: rgba(255,255,255,0.25); font-size: 0.875rem; }
        .ls-spinner { width: 38px; height: 38px; border: 2px solid rgba(201,169,110,0.15); border-top-color: #c9a96e; border-radius: 50%; animation: lsSpin 0.8s linear infinite; }
        @keyframes lsSpin { to { transform: rotate(360deg); } }

        /* ── EMPTY ── */
        .ls-empty { text-align: center; padding: 48px 20px; color: rgba(255,255,255,0.22); }
        .ls-empty i { font-size: 2rem; color: rgba(201,169,110,0.15); margin-bottom: 12px; display: block; }
        .ls-empty p { font-size: 0.875rem; }

        @media (max-width: 768px) {
          .ls-shop-inner { grid-template-columns: 1fr; }
          .ls-shop-img { min-height: 240px; }
          .ls-info-side { padding: 24px 22px; }
          .ls-shop-name { font-size: 1.8rem; }
        }
      `}</style>

      <div className="ls-root">
        {loading ? (
          <div className="ls-loading">
            <div className="ls-spinner" />
            <span>Loading shop…</span>
          </div>
        ) : !listing ? null : (
          <>
            {/* ── HERO BAND ── */}
            <section className="ls-hero">
              <div className="ls-hero-glow" />
              <div className="ls-hero-grid" />
              <div className="ls-hero-inner">
                <div className="ls-breadcrumb">
                  <Link to="/listings">Shops</Link>
                  <i className="fas fa-chevron-right" />
                  <span style={{ color: 'rgba(255,255,255,0.5)' }}>{listing.shopName}</span>
                </div>
              </div>
            </section>

            <div className="ls-main">

              {/* ── SHOP MAIN CARD ── */}
              <div className="ls-shop-card">
                <div className="ls-shop-inner">
                  <div className="ls-img-side">
                    <img src={listing.image.url} alt={listing.shopName} className="ls-shop-img" />
                    <div className="ls-img-overlay" />
                    <div className="ls-img-badge">
                      <div className="ls-badge-dot" />
                      Verified Shop
                    </div>
                  </div>

                  <div className="ls-info-side">
                    <div>
                      <div className="ls-eyebrow">Marriage Card Shop</div>
                      <div className="ls-shop-name">{listing.shopName}</div>
                      <div className="ls-details-list">
                        {[
                          { icon: 'fa-user', label: 'Owner', val: listing.owner?.username },
                          { icon: 'fa-envelope', label: 'Email', val: listing.owner?.email },
                          { icon: 'fa-phone', label: 'Contact', val: listing.phoneNumber },
                          { icon: 'fa-location-dot', label: 'Location', val: `${listing.location}${listing.country ? ', ' + listing.country : ''}` },
                          { icon: 'fa-align-left', label: 'About', val: listing.description },
                        ].filter(d => d.val).map(d => (
                          <div className="ls-detail-row" key={d.label}>
                            <div className="ls-detail-icon"><i className={`fas ${d.icon}`} /></div>
                            <div>
                              <div className="ls-detail-label">{d.label}</div>
                              <div className="ls-detail-value">{d.val}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="ls-actions">
                      <Link className="ls-btn-gold" to={`/listings/${listing._id}/Mcard`}>
                        <i className="fas fa-store" style={{ fontSize: 12 }} /> Visit Shop
                      </Link>
                      {isOwner && (
                        <>
                          <Link className="ls-btn-outline" to={`/listings/${listing._id}/edit`}>
                            <i className="fas fa-pen" style={{ fontSize: 11 }} /> Edit
                          </Link>
                          <Link className="ls-btn-outline" to={`/listings/${listing._id}/orders`}>
                            <i className="fas fa-list-check" style={{ fontSize: 11 }} /> Orders
                          </Link>
                          <button className="ls-btn-danger" onClick={handleDelete}>
                            <i className="fas fa-trash" style={{ fontSize: 11 }} /> Delete
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* ── STATS ── */}
              <div className="ls-stats">
                <div className="ls-stat">
                  <div className="ls-stat-val gold">{listing.marriageCards?.length || 0}</div>
                  <div className="ls-stat-lbl">Cards Listed</div>
                </div>
                <div className="ls-stat">
                  <div className="ls-stat-val">{listing.reviews?.length || 0}</div>
                  <div className="ls-stat-lbl">Reviews</div>
                </div>
                <div className="ls-stat">
                  <div className="ls-stat-val gold">{avgRating}</div>
                  <div className="ls-stat-lbl">Avg Rating</div>
                </div>
              </div>

              <div className="ls-divider" />

              {/* ── REVIEW FORM ── */}
              {curruser && (
                <>
                  <div className="ls-sec-header">
                    <div className="ls-sec-title">Share Your Experience</div>
                  </div>
                  <form className="ls-form-card" onSubmit={handleReviewSubmit}>
                    <label className="ls-form-label">Your Rating</label>
                    <div className="ls-stars-row">
                      <div className="ls-stars">
                        {[1, 2, 3, 4, 5].map(n => (
                          <button
                            key={n}
                            type="button"
                            className={`ls-star${review.rating >= n ? ' active' : ''}`}
                            onClick={() => setReview({ ...review, rating: n })}
                          >
                            <i className="fas fa-star" style={{ fontSize: 14 }} />
                          </button>
                        ))}
                      </div>
                      <div className="ls-rating-display">{review.rating} / 5</div>
                    </div>

                    <label className="ls-form-label">Your Review</label>
                    <textarea
                      className="ls-textarea"
                      placeholder="Share your experience with this shop…"
                      required
                      value={review.comment}
                      onChange={e => setReview({ ...review, comment: e.target.value })}
                    />
                    <button className="ls-btn-gold" type="submit" disabled={submitting}>
                      <i className="fas fa-paper-plane" style={{ fontSize: 12 }} />
                      {submitting ? 'Submitting…' : 'Submit Review'}
                    </button>
                  </form>
                  <div className="ls-divider" />
                </>
              )}

              {/* ── REVIEWS ── */}
              <div className="ls-sec-header">
                <div className="ls-sec-title">
                  Customer Reviews <span>{listing.reviews?.length || 0} total</span>
                </div>
              </div>

              {listing.reviews?.length === 0 ? (
                <div className="ls-empty">
                  <i className="fas fa-comment-slash" />
                  <p>No reviews yet. Be the first to share your experience.</p>
                </div>
              ) : (
                <div className="ls-reviews-grid">
                  {listing.reviews.map(rev => (
                    <div className="ls-review-card" key={rev._id}>
                      <div className="ls-rev-header">
                        <div className="ls-rev-author">
                          <div className="ls-rev-avatar">
                            {(rev.author?.username || 'U')[0].toUpperCase()}
                          </div>
                          <div>
                            <div className="ls-rev-name">{rev.author?.username}</div>
                            <div className="ls-rev-handle">@{rev.author?.username?.toLowerCase()}</div>
                          </div>
                        </div>
                        <div className="ls-rev-stars">
                          {[1, 2, 3, 4, 5].map(n => (
                            <i key={n} className={`fas fa-star ${n <= rev.rating ? 'f' : 'e'}`} />
                          ))}
                        </div>
                      </div>
                      <p className="ls-rev-comment">{rev.comment}</p>
                      {(curruser && (curruser._id === rev.author?._id || isOwner)) && (
                        <button className="ls-rev-delete" onClick={() => handleDeleteReview(rev._id)}>
                          <i className="fas fa-trash" style={{ fontSize: 9 }} /> Delete
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}

            </div>
          </>
        )}
      </div>
    </Layout>
  )
}