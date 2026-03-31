// import { useState, useEffect } from 'react'
// import { useParams, Link } from 'react-router-dom'
// import Layout from '../../components/Layout'
// import { useAuth } from '../../context/AuthContext'
// import { useFlash } from '../../context/FlashContext'
// import api from '../../services/api'

// export default function CardIndex() {
//   const { id } = useParams()
//   const { curruser } = useAuth()
//   const { showError } = useFlash()
//   const [shop, setShop] = useState(null)
//   const [marriageCards, setMarriageCards] = useState([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     api.get(`/listings/${id}/Mcard`)
//       .then(res => { setShop(res.data.shop); setMarriageCards(res.data.marriageCards) })
//       .catch(() => showError('Failed to load cards'))
//       .finally(() => setLoading(false))
//   }, [id])

//   if (loading) return <Layout><div className="d-flex justify-content-center mt-5"><div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div></div></Layout>

//   const isOwner = curruser && shop && curruser._id === shop.owner._id

//   return (
//     <Layout>
//       <style>{`
//         .hover-shadow:hover { transform:translateY(-5px); box-shadow:0 .5rem 1rem rgba(0,0,0,.15)!important; }
//         .transition-all { transition:all .3s ease-in-out; }
//       `}</style>
//       <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
//       <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />

//       <div className="container py-5 animate__animated animate__fadeIn">
//         <div className="row mb-4">
//           <div className="col-12">
//             <h2 className="text-center h4 text-muted mb-4"><b>Shop Name:</b> {shop?.shopName}</h2>
//             {isOwner && (
//               <div className="text-center">
//                 <Link to={`/listings/${id}/Mcard/new`} className="btn btn-primary btn-lg animate__animated animate__pulse animate__infinite">
//                   <i className="fas fa-plus-circle me-2"></i>Create New Cards
//                 </Link>
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
//           {marriageCards.map(card => (
//             <div key={card._id} className="col">
//               <div className="card h-100 shadow-sm hover-shadow transition-all animate__animated animate__fadeInUp">
//                 <div className="position-relative">
//                   <img src={card.image.url} className="card-img-top" alt={card.cardName} style={{ height: 200, objectFit: 'cover' }} />
//                   <div className="position-absolute top-0 end-0 m-2">
//                     <span className="badge bg-primary fs-6">₹ {card.price.toLocaleString('en-IN')} /Card</span>
//                   </div>
//                 </div>
//                 <div className="card-body">
//                   <h5 className="card-title text-center mb-3">Card Name: {card.cardName}</h5>
//                   <div className="d-grid">
//                     <Link to={`/listings/${id}/Mcard/${card._id}`} className="btn btn-outline-primary">
//                       <i className="fas fa-eye me-2"></i>View Details
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {marriageCards.length === 0 && (
//           <div className="text-center py-5">
//             <div className="display-6 text-muted mb-3">No Cards Available</div>
//             <p className="lead">Check back later for new listings!</p>
//           </div>
//         )}
//       </div>
//     </Layout>
//   )
// }

import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Layout from '../../components/Layout'
import { useAuth } from '../../context/AuthContext'
import { useFlash } from '../../context/FlashContext'
import api from '../../services/api'

export default function CardIndex() {
  const { id } = useParams()
  const { curruser } = useAuth()
  const { showError } = useFlash()
  const [shop, setShop] = useState(null)
  const [marriageCards, setMarriageCards] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get(`/listings/${id}/Mcard`)
      .then(res => { setShop(res.data.shop); setMarriageCards(res.data.marriageCards) })
      .catch(() => showError('Failed to load cards'))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return (
    <Layout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');
        .ci-root { min-height: 100vh; background: #080808; font-family: 'DM Sans', sans-serif; }
        .ci-loading { min-height: 60vh; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 14px; color: rgba(255,255,255,0.25); font-size: 0.875rem; }
        .ci-spinner { width: 38px; height: 38px; border: 2px solid rgba(201,169,110,0.15); border-top-color: #c9a96e; border-radius: 50%; animation: ciSpin 0.8s linear infinite; }
        @keyframes ciSpin { to { transform: rotate(360deg); } }
      `}</style>
      <div className="ci-root">
        <div className="ci-loading">
          <div className="ci-spinner" />
          <span>Loading cards…</span>
        </div>
      </div>
    </Layout>
  )

  const isOwner = curruser && shop && curruser._id === shop.owner._id

  return (
    <Layout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');

        .ci-root {
          min-height: 100vh;
          background: #080808;
          font-family: 'DM Sans', sans-serif;
          color: #e2e2e2;
        }

        /* ── HERO BAND ── */
        .ci-hero { position: relative; padding: 40px 0 0; overflow: hidden; }
        .ci-hero-glow {
          position: absolute; top: -100px; left: 50%; transform: translateX(-50%);
          width: 800px; height: 500px;
          background: radial-gradient(ellipse, rgba(201,169,110,0.1) 0%, transparent 68%);
          pointer-events: none; z-index: 0;
        }
        .ci-hero-grid {
          position: absolute; inset: 0; z-index: 0;
          background-image:
            linear-gradient(rgba(201,169,110,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,169,110,0.035) 1px, transparent 1px);
          background-size: 56px 56px;
          mask-image: radial-gradient(ellipse 80% 100% at center top, black 20%, transparent 75%);
          pointer-events: none;
        }
        .ci-hero-inner {
          position: relative; z-index: 1;
          max-width: 1100px; margin: 0 auto; padding: 0 28px 40px;
        }
        .ci-breadcrumb {
          display: flex; align-items: center; gap: 8px;
          font-size: 0.72rem; color: rgba(255,255,255,0.25);
          text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 28px;
        }
        .ci-breadcrumb a { color: rgba(255,255,255,0.25); text-decoration: none; transition: color 0.18s; }
        .ci-breadcrumb a:hover { color: #c9a96e; }
        .ci-breadcrumb i { font-size: 8px; }

        .ci-hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.6rem; font-weight: 600; color: #fff;
          line-height: 1.08; margin-bottom: 8px;
        }
        .ci-hero-sub {
          font-size: 0.78rem; color: rgba(201,169,110,0.55);
          text-transform: uppercase; letter-spacing: 0.12em;
        }

        /* ── MAIN ── */
        .ci-main { max-width: 1100px; margin: 0 auto; padding: 0 28px 80px; }

        /* ── DIVIDER ── */
        .ci-divider { height: 1px; background: linear-gradient(to right, transparent, rgba(201,169,110,0.2), transparent); margin: 0 0 36px; }

        /* ── SECTION HEADER ── */
        .ci-sec-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 28px; flex-wrap: wrap; gap: 14px; }
        .ci-sec-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem; font-weight: 600; color: #fff; letter-spacing: 0.01em;
        }
        .ci-sec-title span { font-size: 0.72rem; font-family: 'DM Sans', sans-serif; font-weight: 400; color: rgba(255,255,255,0.25); margin-left: 10px; text-transform: uppercase; letter-spacing: 0.08em; }

        /* ── CARDS GRID ── */
        .ci-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }

        /* ── CARD ── */
        .ci-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(201,169,110,0.14);
          border-radius: 20px; overflow: hidden;
          transition: border-color 0.22s, transform 0.22s;
          display: flex; flex-direction: column;
        }
        .ci-card:hover { border-color: rgba(201,169,110,0.38); transform: translateY(-5px); }

        .ci-card-img-wrap { position: relative; overflow: hidden; }
        .ci-card-img {
          width: 100%; height: 200px; object-fit: cover; display: block;
          transition: transform 0.5s ease;
        }
        .ci-card:hover .ci-card-img { transform: scale(1.05); }
        .ci-card-img-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(8,8,8,0.6) 0%, transparent 50%);
        }
        .ci-price-badge {
          position: absolute; top: 14px; right: 14px;
          display: flex; align-items: center; gap: 5px;
          padding: 5px 13px; border-radius: 8px;
          background: rgba(8,8,8,0.8); backdrop-filter: blur(10px);
          border: 1px solid rgba(201,169,110,0.28);
          font-size: 0.75rem; font-weight: 600; color: #e8c98a;
          letter-spacing: 0.04em;
        }

        .ci-card-body { padding: 22px 24px; display: flex; flex-direction: column; flex: 1; }
        .ci-card-eyebrow {
          font-size: 0.63rem; font-weight: 600; color: rgba(201,169,110,0.5);
          text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 6px;
        }
        .ci-card-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.35rem; font-weight: 600; color: #fff; line-height: 1.2;
          margin-bottom: 20px; flex: 1;
        }

        /* ── BUTTONS ── */
        .ci-btn-gold {
          display: inline-flex; align-items: center; gap: 8px; padding: 11px 24px;
          background: linear-gradient(135deg, #c9a96e, #e8c98a); color: #080808;
          font-weight: 600; font-size: 0.845rem; border-radius: 10px; border: none;
          cursor: pointer; font-family: 'DM Sans', sans-serif; letter-spacing: 0.03em;
          transition: all 0.22s; text-decoration: none; justify-content: center;
        }
        .ci-btn-gold:hover { opacity: 0.88; transform: translateY(-1px); color: #080808; }
        .ci-btn-outline {
          display: inline-flex; align-items: center; gap: 8px; padding: 10px 20px;
          background: transparent; color: #c9a96e; font-size: 0.845rem;
          border-radius: 10px; border: 1px solid rgba(201,169,110,0.28);
          cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.2s; text-decoration: none;
          justify-content: center;
        }
        .ci-btn-outline:hover { background: rgba(201,169,110,0.07); border-color: #c9a96e; color: #e8c98a; }

        /* ── LOADING ── */
        .ci-loading { min-height: 60vh; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 14px; color: rgba(255,255,255,0.25); font-size: 0.875rem; }
        .ci-spinner { width: 38px; height: 38px; border: 2px solid rgba(201,169,110,0.15); border-top-color: #c9a96e; border-radius: 50%; animation: ciSpin 0.8s linear infinite; }
        @keyframes ciSpin { to { transform: rotate(360deg); } }

        /* ── EMPTY ── */
        .ci-empty { text-align: center; padding: 72px 20px; color: rgba(255,255,255,0.22); }
        .ci-empty i { font-size: 2.4rem; color: rgba(201,169,110,0.15); margin-bottom: 16px; display: block; }
        .ci-empty-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.6rem; font-weight: 500; color: rgba(255,255,255,0.3);
          margin-bottom: 8px;
        }
        .ci-empty p { font-size: 0.875rem; color: rgba(255,255,255,0.2); }

        @media (max-width: 640px) {
          .ci-hero-title { font-size: 1.9rem; }
          .ci-cards-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="ci-root">
        {/* ── HERO BAND ── */}
        <section className="ci-hero">
          <div className="ci-hero-glow" />
          <div className="ci-hero-grid" />
          <div className="ci-hero-inner">
            <div className="ci-breadcrumb">
              <Link to="/listings">Shops</Link>
              <i className="fas fa-chevron-right" />
              <Link to={`/listings/${id}`}>{shop?.shopName}</Link>
              <i className="fas fa-chevron-right" />
              <span style={{ color: 'rgba(255,255,255,0.5)' }}>Cards</span>
            </div>
            <div className="ci-hero-sub">Marriage Card Shop</div>
            <div className="ci-hero-title">Shop Name: {shop?.shopName}</div>
          </div>
        </section>

        <div className="ci-main">
          <div className="ci-divider" />

          {/* ── SECTION HEADER ── */}
          <div className="ci-sec-header">
            <div className="ci-sec-title">
              Cards <span>{marriageCards.length} listed</span>
            </div>
            {isOwner && (
              <Link to={`/listings/${id}/Mcard/new`} className="ci-btn-gold">
                <i className="fas fa-plus-circle" style={{ fontSize: 12 }} /> Create New Cards
              </Link>
            )}
          </div>

          {/* ── CARDS GRID ── */}
          {marriageCards.length === 0 ? (
            <div className="ci-empty">
              <i className="fas fa-layer-group" />
              <div className="ci-empty-title">No Cards Available</div>
              <p>Check back later for new listings!</p>
            </div>
          ) : (
            <div className="ci-cards-grid">
              {marriageCards.map(card => (
                <div className="ci-card" key={card._id}>
                  <div className="ci-card-img-wrap">
                    <img src={card.image.url} className="ci-card-img" alt={card.cardName} />
                    <div className="ci-card-img-overlay" />
                    <div className="ci-price-badge">
                      ₹ {card.price.toLocaleString('en-IN')} /Card
                    </div>
                  </div>
                  <div className="ci-card-body">
                    <div className="ci-card-eyebrow">Marriage Card</div>
                    <div className="ci-card-name">Card Name: {card.cardName}</div>
                    <Link to={`/listings/${id}/Mcard/${card._id}`} className="ci-btn-outline">
                      <i className="fas fa-eye" style={{ fontSize: 12 }} /> View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}
