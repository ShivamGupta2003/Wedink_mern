// import { useState, useEffect } from 'react'
// import { useParams, useNavigate, Link } from 'react-router-dom'
// import Layout from '../../components/Layout'
// import { useAuth } from '../../context/AuthContext'
// import { useFlash } from '../../context/FlashContext'
// import api from '../../services/api'

// export default function CardShow() {
//   const { id, cardId } = useParams()
//   const { curruser } = useAuth()
//   const { showSuccess, showError } = useFlash()
//   const navigate = useNavigate()

//   const [listing, setListing] = useState(null)
//   const [marriageCard, setMarriageCard] = useState(null)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     api.get(`/listings/${id}/Mcard/${cardId}`)
//       .then(res => {
//         setListing(res.data.listing)
//         setMarriageCard(res.data.marriageCard)
//       })
//       .catch(() => { showError('Card not found'); navigate(`/listings/${id}/Mcard`) })
//       .finally(() => setLoading(false))
//   }, [id, cardId])

//   const handleDelete = async () => {
//     if (!window.confirm('Delete this card?')) return
//     try {
//       await api.delete(`/listings/${id}/Mcard/${cardId}`)
//       showSuccess('Card deleted successfully!')
//       navigate(`/listings/${id}/Mcard`)
//     } catch { showError('Failed to delete card') }
//   }

//   if (loading) return (
//     <Layout>
//       <div className="d-flex justify-content-center mt-5">
//         <div className="spinner-border text-primary" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </div>
//       </div>
//     </Layout>
//   )
//   if (!listing || !marriageCard) return null

//   const isOwner = curruser && listing.owner && curruser._id === listing.owner._id

//   return (
//     <Layout>
//       <style>{`
//         body { background: linear-gradient(135deg, #fff9f9 0%, #fff5f6 100%); font-family: 'Segoe UI', system-ui, -apple-system, sans-serif; }
//         .listing-container { background: white; padding: 2.5rem; border-radius: 20px; box-shadow: 0 20px 40px rgba(0,0,0,.08); border: 1px solid rgba(212,175,55,.3); max-width: 1100px; margin: 1.5rem auto; }
//         .page-title { color: #d4af37; font-size: 2.5rem; font-weight: 700; text-align: center; margin-bottom: 2rem; font-family: 'Georgia', serif; position: relative; }
//         .page-title::after { content: ''; display: block; width: 100px; height: 3px; background: linear-gradient(90deg, transparent, #d4af37, transparent); margin: 1rem auto; }
//         .listing-details { list-style: none; padding: 0; }
//         .listing-details li { font-size: 1.1rem; padding: .8rem 0; color: #555; border-bottom: 1px solid #f0f0f0; }
//         .listing-details li:last-child { border-bottom: none; }
//         .price { font-size: 1.5rem; font-weight: bold; color: #d4af37; padding: 1rem; background: #fff9e6; border-radius: 10px; text-align: center; margin: 1rem 0; }
//         .listing-img { width: 100%; border-radius: 15px; object-fit: cover; height: 400px; box-shadow: 0 10px 20px rgba(0,0,0,.1); transition: transform .3s ease; }
//         .listing-img:hover { transform: scale(1.02); }
//         @media(max-width:768px) { .listing-container{padding:.7rem!important;margin:0!important;} .page-title{font-size:2rem;} .listing-img{height:300px;} }
//       `}</style>

//       <div>
//         <div className="listing-container">
//           <h1 className="page-title">Card Details</h1>

//           <div className="row g-4">
//             {/* Image */}
//             <div className="col-md-6">
//               <img src={marriageCard.image.url} alt="Marriage Card" className="listing-img" />
//             </div>

//             {/* Details */}
//             <div className="col-md-6">
//               <div className="card h-100" style={{ padding: '1.5rem', borderRadius: '15px', border: 'none', boxShadow: '0 10px 20px rgba(0,0,0,.05)' }}>
//                 <ul className="listing-details">
//                   <li><strong>Shop Name:</strong> {listing.shopName}</li>
//                   <li><strong>Card Name:</strong> {marriageCard.cardName}</li>
//                   <li><strong>Description:</strong> {marriageCard.description}</li>
//                   <li><strong>Theme:</strong> {marriageCard.theme}</li>
//                   <li><strong>Material:</strong> {marriageCard.material}</li>
//                   <li><strong>Size:</strong> {marriageCard.size}</li>
//                   <li className="price">Price: ₹ {marriageCard.price.toLocaleString('en-IN')}</li>
//                 </ul>
//               </div>
//             </div>
//           </div>

//           <div className="text-center mt-4">
//             {isOwner ? (
//               <>
//                 <Link to={`/listings/${id}/Mcard/${cardId}/edit`} className="btn btn-primary me-3 mt-3">
//                   Edit Card
//                 </Link>
//                 <button className="btn btn-secondary me-3 mt-3" onClick={handleDelete}>
//                   Delete Card
//                 </button>
//               </>
//             ) : (
//               <div className="price text-center mt-3">
//                 <Link to={`/listings/${id}/Mcard/${cardId}/book`} className="btn btn-primary">
//                   Book Card
//                 </Link>
//               </div>
//             )}
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

export default function CardShow() {
  const { id, cardId } = useParams()
  const { curruser } = useAuth()
  const { showSuccess, showError } = useFlash()
  const navigate = useNavigate()

  const [listing, setListing] = useState(null)
  const [marriageCard, setMarriageCard] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get(`/listings/${id}/Mcard/${cardId}`)
      .then(res => {
        setListing(res.data.listing)
        setMarriageCard(res.data.marriageCard)
      })
      .catch(() => { showError('Card not found'); navigate(`/listings/${id}/Mcard`) })
      .finally(() => setLoading(false))
  }, [id, cardId])

  const handleDelete = async () => {
    if (!window.confirm('Delete this card?')) return
    try {
      await api.delete(`/listings/${id}/Mcard/${cardId}`)
      showSuccess('Card deleted successfully!')
      navigate(`/listings/${id}/Mcard`)
    } catch { showError('Failed to delete card') }
  }

  if (loading) return (
    <Layout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');
        .cs-root { min-height: 100vh; background: #080808; font-family: 'DM Sans', sans-serif; }
        .cs-loading { min-height: 60vh; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 14px; color: rgba(255,255,255,0.25); font-size: 0.875rem; }
        .cs-spinner { width: 38px; height: 38px; border: 2px solid rgba(201,169,110,0.15); border-top-color: #c9a96e; border-radius: 50%; animation: csSpin 0.8s linear infinite; }
        @keyframes csSpin { to { transform: rotate(360deg); } }
      `}</style>
      <div className="cs-root">
        <div className="cs-loading">
          <div className="cs-spinner" />
          <span>Loading card…</span>
        </div>
      </div>
    </Layout>
  )

  if (!listing || !marriageCard) return null

  const isOwner = curruser && listing.owner && curruser._id === listing.owner._id

  return (
    <Layout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');

        .cs-root {
          min-height: 100vh;
          background: #080808;
          font-family: 'DM Sans', sans-serif;
          color: #e2e2e2;
        }

        /* ── HERO BAND ── */
        .cs-hero { position: relative; padding: 40px 0 0; overflow: hidden; }
        .cs-hero-glow {
          position: absolute; top: -100px; left: 50%; transform: translateX(-50%);
          width: 800px; height: 500px;
          background: radial-gradient(ellipse, rgba(201,169,110,0.1) 0%, transparent 68%);
          pointer-events: none; z-index: 0;
        }
        .cs-hero-grid {
          position: absolute; inset: 0; z-index: 0;
          background-image:
            linear-gradient(rgba(201,169,110,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,169,110,0.035) 1px, transparent 1px);
          background-size: 56px 56px;
          mask-image: radial-gradient(ellipse 80% 100% at center top, black 20%, transparent 75%);
          pointer-events: none;
        }
        .cs-hero-inner {
          position: relative; z-index: 1;
          max-width: 1100px; margin: 0 auto; padding: 0 28px 40px;
        }
        .cs-breadcrumb {
          display: flex; align-items: center; gap: 8px;
          font-size: 0.72rem; color: rgba(255,255,255,0.25);
          text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 28px;
        }
        .cs-breadcrumb a { color: rgba(255,255,255,0.25); text-decoration: none; transition: color 0.18s; }
        .cs-breadcrumb a:hover { color: #c9a96e; }
        .cs-breadcrumb i { font-size: 8px; }
        .cs-eyebrow {
          font-size: 0.65rem; font-weight: 600; color: rgba(201,169,110,0.55);
          text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 8px;
        }
        .cs-hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.4rem; font-weight: 600; color: #fff; line-height: 1.08;
        }

        /* ── MAIN ── */
        .cs-main { max-width: 1100px; margin: 0 auto; padding: 0 28px 80px; }

        /* ── DIVIDER ── */
        .cs-divider { height: 1px; background: linear-gradient(to right, transparent, rgba(201,169,110,0.2), transparent); margin: 0 0 36px; }

        /* ── SHOP CARD ── */
        .cs-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(201,169,110,0.18);
          border-radius: 24px; overflow: hidden; margin-bottom: 28px;
        }
        .cs-card-inner {
          display: grid; grid-template-columns: 1fr 1fr; min-height: 420px;
        }

        /* ── IMAGE SIDE ── */
        .cs-img-side { position: relative; overflow: hidden; }
        .cs-card-img {
          width: 100%; height: 100%; object-fit: cover; display: block;
          min-height: 380px; transition: transform 0.5s ease;
        }
        .cs-card-img:hover { transform: scale(1.04); }
        .cs-img-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(120deg, transparent 50%, rgba(8,8,8,0.55) 100%);
        }
        .cs-img-badge {
          position: absolute; top: 18px; left: 18px;
          display: flex; align-items: center; gap: 7px;
          padding: 5px 14px; border-radius: 8px;
          background: rgba(8,8,8,0.78); backdrop-filter: blur(10px);
          border: 1px solid rgba(201,169,110,0.22);
          font-size: 0.65rem; font-weight: 600; color: #c9a96e;
          letter-spacing: 0.08em; text-transform: uppercase;
        }
        .cs-badge-dot {
          width: 6px; height: 6px; border-radius: 50%; background: #c9a96e;
          animation: csBlink 2s ease-in-out infinite;
        }
        @keyframes csBlink { 0%,100%{opacity:1;} 50%{opacity:0.2;} }

        /* ── INFO SIDE ── */
        .cs-info-side { padding: 36px 38px; display: flex; flex-direction: column; justify-content: space-between; }
        .cs-card-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem; font-weight: 600; color: #fff;
          line-height: 1.08; margin-bottom: 28px;
        }

        /* ── DETAILS LIST ── */
        .cs-details-list { display: flex; flex-direction: column; gap: 12px; margin-bottom: 28px; }
        .cs-detail-row { display: flex; align-items: flex-start; gap: 12px; }
        .cs-detail-icon {
          width: 32px; height: 32px; border-radius: 8px;
          background: rgba(201,169,110,0.08); border: 1px solid rgba(201,169,110,0.14);
          display: flex; align-items: center; justify-content: center;
          color: #c9a96e; font-size: 12px; flex-shrink: 0; margin-top: 1px;
        }
        .cs-detail-label {
          font-size: 0.63rem; font-weight: 600; color: rgba(255,255,255,0.26);
          text-transform: uppercase; letter-spacing: 0.09em; margin-bottom: 2px;
        }
        .cs-detail-value { font-size: 0.875rem; color: rgba(255,255,255,0.68); font-weight: 300; line-height: 1.5; }

        /* ── PRICE STRIP ── */
        .cs-price-strip {
          display: flex; align-items: center; gap: 14px;
          padding: 16px 20px; border-radius: 14px;
          background: rgba(201,169,110,0.07); border: 1px solid rgba(201,169,110,0.18);
          margin-bottom: 24px;
        }
        .cs-price-label { font-size: 0.68rem; font-weight: 600; color: rgba(255,255,255,0.3); text-transform: uppercase; letter-spacing: 0.09em; }
        .cs-price-val {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.9rem; font-weight: 600; color: #e8c98a; line-height: 1;
        }

        /* ── ACTIONS ── */
        .cs-actions { display: flex; gap: 10px; flex-wrap: wrap; }

        /* ── BUTTONS ── */
        .cs-btn-gold {
          display: inline-flex; align-items: center; gap: 8px; padding: 11px 24px;
          background: linear-gradient(135deg, #c9a96e, #e8c98a); color: #080808;
          font-weight: 600; font-size: 0.845rem; border-radius: 10px; border: none;
          cursor: pointer; font-family: 'DM Sans', sans-serif; letter-spacing: 0.03em;
          transition: all 0.22s; text-decoration: none;
        }
        .cs-btn-gold:hover { opacity: 0.88; transform: translateY(-1px); color: #080808; }
        .cs-btn-outline {
          display: inline-flex; align-items: center; gap: 8px; padding: 10px 20px;
          background: transparent; color: #c9a96e; font-size: 0.845rem;
          border-radius: 10px; border: 1px solid rgba(201,169,110,0.28);
          cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.2s; text-decoration: none;
        }
        .cs-btn-outline:hover { background: rgba(201,169,110,0.07); border-color: #c9a96e; color: #e8c98a; }
        .cs-btn-danger {
          display: inline-flex; align-items: center; gap: 8px; padding: 10px 18px;
          background: transparent; color: rgba(239,68,68,0.75); font-size: 0.845rem;
          border-radius: 10px; border: 1px solid rgba(239,68,68,0.22);
          cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.2s;
        }
        .cs-btn-danger:hover { background: rgba(239,68,68,0.07); border-color: rgba(239,68,68,0.45); }

        @media (max-width: 768px) {
          .cs-card-inner { grid-template-columns: 1fr; }
          .cs-card-img { min-height: 260px; }
          .cs-info-side { padding: 24px 22px; }
          .cs-card-name { font-size: 1.6rem; }
          .cs-hero-title { font-size: 1.8rem; }
        }
      `}</style>

      <div className="cs-root">
        {/* ── HERO BAND ── */}
        <section className="cs-hero">
          <div className="cs-hero-glow" />
          <div className="cs-hero-grid" />
          <div className="cs-hero-inner">
            <div className="cs-breadcrumb">
              <Link to="/listings">Shops</Link>
              <i className="fas fa-chevron-right" />
              <Link to={`/listings/${id}`}>{listing.shopName}</Link>
              <i className="fas fa-chevron-right" />
              <Link to={`/listings/${id}/Mcard`}>Cards</Link>
              <i className="fas fa-chevron-right" />
              <span style={{ color: 'rgba(255,255,255,0.5)' }}>{marriageCard.cardName}</span>
            </div>
            <div className="cs-eyebrow">Marriage Card Shop</div>
            <div className="cs-hero-title">Card Details</div>
          </div>
        </section>

        <div className="cs-main">
          <div className="cs-divider" />

          {/* ── MAIN CARD ── */}
          <div className="cs-card">
            <div className="cs-card-inner">

              {/* Image */}
              <div className="cs-img-side">
                <img src={marriageCard.image.url} alt="Marriage Card" className="cs-card-img" />
                <div className="cs-img-overlay" />
                <div className="cs-img-badge">
                  <div className="cs-badge-dot" />
                  Verified Card
                </div>
              </div>

              {/* Details */}
              <div className="cs-info-side">
                <div>
                  <div className="cs-card-name">{marriageCard.cardName}</div>

                  <div className="cs-details-list">
                    {[
                      { icon: 'fa-store', label: 'Shop Name', val: listing.shopName },
                      { icon: 'fa-align-left', label: 'Description', val: marriageCard.description },
                      { icon: 'fa-palette', label: 'Theme', val: marriageCard.theme },
                      { icon: 'fa-layer-group', label: 'Material', val: marriageCard.material },
                      { icon: 'fa-ruler-combined', label: 'Size', val: marriageCard.size },
                    ].filter(d => d.val).map(d => (
                      <div className="cs-detail-row" key={d.label}>
                        <div className="cs-detail-icon"><i className={`fas ${d.icon}`} /></div>
                        <div>
                          <div className="cs-detail-label">{d.label}</div>
                          <div className="cs-detail-value">{d.val}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Price */}
                  <div className="cs-price-strip">
                    <div className="cs-detail-icon"><i className="fas fa-tag" /></div>
                    <div>
                      <div className="cs-price-label">Price</div>
                      <div className="cs-price-val">₹ {marriageCard.price.toLocaleString('en-IN')}</div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="cs-actions">
                  {isOwner ? (
                    <>
                      <Link className="cs-btn-outline" to={`/listings/${id}/Mcard/${cardId}/edit`}>
                        <i className="fas fa-pen" style={{ fontSize: 11 }} /> Edit Card
                      </Link>
                      <button className="cs-btn-danger" onClick={handleDelete}>
                        <i className="fas fa-trash" style={{ fontSize: 11 }} /> Delete Card
                      </button>
                    </>
                  ) : (
                    <Link className="cs-btn-gold" to={`/listings/${id}/Mcard/${cardId}/book`}>
                      <i className="fas fa-bookmark" style={{ fontSize: 12 }} /> Book Card
                    </Link>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}