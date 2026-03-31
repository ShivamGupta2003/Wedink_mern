// import { useState, useEffect } from 'react'
// import { useNavigate, useSearchParams, Link } from 'react-router-dom'
// import Layout from '../../components/Layout'
// import { useAuth } from '../../context/AuthContext'
// import { useFlash } from '../../context/FlashContext'
// import api from '../../services/api'

// export default function ListingsIndex() {
//   const { curruser } = useAuth()
//   const { showError } = useFlash()
//   const navigate = useNavigate()
//   const [searchParams] = useSearchParams()

//   const [alllistings, setAlllistings] = useState([])
//   const [existingListing, setExistingListing] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [search, setSearch] = useState(searchParams.get('shopName') || '')
//   const [showAll, setShowAll] = useState(false)

//   useEffect(() => {
//     const shopName = searchParams.get('shopName') || ''
//     setSearch(shopName)
//     const query = shopName ? `?shopName=${encodeURIComponent(shopName)}` : ''
//     api.get(`/listings${query}`)
//       .then(res => {
//         setAlllistings(res.data.allListings)
//         setExistingListing(res.data.existingListing)
//       })
//       .catch(() => showError('Failed to load listings'))
//       .finally(() => setLoading(false))
//   }, [searchParams])

//   const handleSearch = (e) => {
//     e.preventDefault()
//     navigate(`/listings?shopName=${encodeURIComponent(search)}`)
//   }

//   const visibleListings = showAll ? alllistings : alllistings.slice(0, 8)

//   if (loading) return (
//     <Layout>
//       <div className="d-flex justify-content-center mt-5">
//         <div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div>
//       </div>
//     </Layout>
//   )

//   return (
//     <Layout>
//       <style>{`
//         .hero-section { background:linear-gradient(rgba(0,0,0,.5),rgba(0,0,0,.5)),url('https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-1.2.1'); background-size:cover; background-position:center; color:white; padding:100px 0; margin-bottom:2rem; }
//         .listing-card { transition:transform .3s ease-in-out; border:none; border-radius:15px; overflow:hidden; }
//         .listing-card:hover { transform:translateY(-5px); }
//         .listing-card:hover .card-img-top { transform:scale(1.05); }
//         .card-img-top { transition:transform .3s ease; }
//         @media(min-width:768px) and (max-width:1024px) { .container{padding:0!important;margin:0!important;max-width:100%!important;} }
//       `}</style>

//       {/* Hero */}
//       <div className="hero-section text-center">
//         <div className="container">
//           <h1 className="display-4 fw-bold mb-4">Book Your Dream Invitation Cards</h1>
//           <p className="lead mb-4">Create stunning digital and printed invitations for your special day!</p>
//           {!existingListing ? (
//             <button className="btn btn-dark btn-lg px-4 me-2" onClick={() => navigate('/listings/new')}>
//               <i className="fas fa-plus-circle me-2"></i>Register Your Shop
//             </button>
//           ) : (
//             <button className="btn btn-dark btn-lg px-4 me-2" onClick={() => navigate('/listings/new')}>
//               <i className="fas fa-home me-2"></i> Your Shop
//             </button>
//           )}
//         </div>
//       </div>

//       <div className="container">
//         {/* Search */}
//         <section className="py-5 bg-light text-center">
//           <div className="container">
//             <div className="row justify-content-center">
//               <div className="col-lg-8">
//                 <h1 className="display-4 fw-bold text-dark">Dream Celebration Invites</h1>
//                 <p className="lead text-secondary">Explore thousands of beautiful invitation designs, customize templates, and create your dream celebration cards.</p>
//                 <form onSubmit={handleSearch} className="d-flex mb-2 mb-lg-0">
//                   <input
//                     className="form-control me-2 text-dark bg-light border border-secondary"
//                     type="search"
//                     name="shopName"
//                     placeholder="Enter shop name"
//                     value={search}
//                     onChange={e => setSearch(e.target.value)}
//                   />
//                   <button className="btn btn-primary" type="submit">Search</button>
//                 </form>
//                 <p className="mt-3">
//                   <Link to="/listings" className="text-danger fw-semibold">Browse all Shops</Link>
//                 </p>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Grid */}
//         <h3 className="mb-4 fw-bold fs-2">Registered Shop</h3>
//         <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
//           {visibleListings.map(listing => (
//             <div key={listing._id} className="col listing-item">
//               <Link to={`/listings/${listing._id}`} className="text-decoration-none">
//                 <div className="card listing-card shadow h-100">
//                   <div className="position-relative">
//                     <img src={listing.image.url} className="card-img-top" alt={listing.shopName} style={{ height: 200, objectFit: 'cover' }} />
//                   </div>
//                   <div className="card-body">
//                     <h5 className="card-title text-dark mb-2">{listing.shopName}</h5>
//                     <p className="card-text text-muted">
//                       <i className="fas fa-map-marker-alt me-2"></i>Location
//                       <br />
//                       <i className="fas fa-users me-2"></i>Contact
//                     </p>
//                   </div>
//                 </div>
//               </Link>
//             </div>
//           ))}
//         </div>

//         {!showAll && alllistings.length > 8 && (
//           <div className="text-center">
//             <button className="btn btn-primary mt-3 mb-4" onClick={() => setShowAll(true)}>View More</button>
//           </div>
//         )}
//       </div>
//     </Layout>
//   )
// }

import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { useAuth } from '../../context/AuthContext'
import { useFlash } from '../../context/FlashContext'
import api from '../../services/api'
import Layout from '../../components/Layout'

export default function ListingsIndex() {
  const { curruser } = useAuth()
  const { showError } = useFlash()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const [alllistings, setAlllistings] = useState([])
  const [existingListing, setExistingListing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState(searchParams.get('shopName') || '')
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    const shopName = searchParams.get('shopName') || ''
    setSearch(shopName)
    const query = shopName ? `?shopName=${encodeURIComponent(shopName)}` : ''
    api.get(`/listings${query}`)
      .then(res => {
        setAlllistings(res.data.allListings)
        setExistingListing(res.data.existingListing)
      })
      .catch(() => showError('Failed to load listings'))
      .finally(() => setLoading(false))
  }, [searchParams])

  const handleSearch = (e) => {
    e.preventDefault()
    navigate(`/listings?shopName=${encodeURIComponent(search)}`)
  }

  const visibleListings = showAll ? alllistings : alllistings.slice(0, 8)

  return (
    <>
      <Layout>
        <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');

        .li-root {
          min-height: 100vh;
          background: #080808;
          padding-top: 62px;
          font-family: 'DM Sans', sans-serif;
          color: #e2e2e2;
        }

        /* ── HERO ── */
        .li-hero {
          position: relative;
          padding: 100px 0 80px;
          overflow: hidden;
          text-align: center;
        }
        .li-hero-bg {
          position: absolute; inset: 0;
          background: url('https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1400&q=80') center/cover no-repeat;
          opacity: 0.1;
          z-index: 0;
        }
        .li-hero-bg::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(to bottom, transparent 40%, #080808 100%);
        }
        .li-hero-glow {
          position: absolute; top: -80px; left: 50%; transform: translateX(-50%);
          width: 700px; height: 500px;
          background: radial-gradient(ellipse, rgba(201,169,110,0.13) 0%, transparent 68%);
          pointer-events: none; z-index: 0;
        }
        .li-hero-grid {
          position: absolute; inset: 0; z-index: 0;
          background-image:
            linear-gradient(rgba(201,169,110,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,169,110,0.04) 1px, transparent 1px);
          background-size: 56px 56px;
          mask-image: radial-gradient(ellipse 80% 90% at center, black 20%, transparent 80%);
          pointer-events: none;
        }
        .li-hero-inner {
          position: relative; z-index: 1;
          max-width: 680px; margin: 0 auto; padding: 0 24px;
        }
        .li-eyebrow {
          display: inline-flex; align-items: center; gap: 9px;
          margin-bottom: 22px; padding: 5px 16px; border-radius: 30px;
          background: rgba(201,169,110,0.08); border: 1px solid rgba(201,169,110,0.18);
          font-size: 0.68rem; font-weight: 600; color: #c9a96e;
          letter-spacing: 0.12em; text-transform: uppercase;
        }
        .li-eyebrow-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #c9a96e; animation: liDotBlink 2s ease-in-out infinite;
        }
        @keyframes liDotBlink { 0%,100%{opacity:1;} 50%{opacity:0.2;} }
        .li-hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.8rem, 6vw, 5rem);
          font-weight: 600; color: #fff; line-height: 1.05;
          margin-bottom: 14px; letter-spacing: 0.01em;
        }
        .li-hero-title em {
          font-style: italic; font-weight: 300; color: #e8c98a;
        }
        .li-hero-sub {
          font-size: 0.9rem; color: rgba(255,255,255,0.35);
          max-width: 460px; margin: 0 auto 36px; line-height: 1.85; font-weight: 300;
        }
        .li-hero-actions {
          display: flex; align-items: center; justify-content: center;
          gap: 12px; flex-wrap: wrap;
        }

        /* ── SEARCH ── */
        .li-search-wrap {
          max-width: 1100px; margin: 0 auto;
          padding: 0 24px; position: relative; z-index: 2;
        }
        .li-search-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(201,169,110,0.12);
          border-radius: 18px; padding: 20px 24px;
          display: flex; align-items: center; gap: 14px; flex-wrap: wrap;
        }
        .li-search-field {
          flex: 1; min-width: 200px;
          display: flex; align-items: center; gap: 10px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 10px; padding: 10px 16px;
          transition: border-color 0.2s;
        }
        .li-search-field:focus-within { border-color: rgba(201,169,110,0.35); }
        .li-search-field i { color: rgba(201,169,110,0.45); font-size: 13px; flex-shrink: 0; }
        .li-search-field input {
          background: transparent; border: none; outline: none;
          color: #fff; font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem; font-weight: 300; width: 100%;
        }
        .li-search-field input::placeholder { color: rgba(255,255,255,0.2); }
        .li-search-divider { width: 1px; height: 30px; background: rgba(255,255,255,0.07); flex-shrink: 0; }
        .li-search-meta { font-size: 0.74rem; color: rgba(255,255,255,0.2); white-space: nowrap; }
        .li-search-meta span { color: #c9a96e; font-weight: 500; }

        /* ── MAIN ── */
        .li-main { max-width: 1100px; margin: 0 auto; padding: 44px 24px 80px; }
        .li-divider {
          height: 1px; margin-bottom: 40px;
          background: linear-gradient(to right, transparent, rgba(201,169,110,0.2), transparent);
        }
        .li-section-header {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 28px;
        }
        .li-section-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.6rem; font-weight: 600; color: #fff; letter-spacing: 0.01em;
        }
        .li-section-title span {
          font-size: 0.72rem; font-family: 'DM Sans', sans-serif;
          font-weight: 400; color: rgba(255,255,255,0.28);
          margin-left: 10px; text-transform: uppercase; letter-spacing: 0.08em;
        }
        .li-count-pill {
          padding: 4px 14px; border-radius: 20px;
          background: rgba(201,169,110,0.08); border: 1px solid rgba(201,169,110,0.15);
          font-size: 0.72rem; color: #c9a96e; font-weight: 600;
          letter-spacing: 0.06em; text-transform: uppercase;
        }

        /* ── CARDS GRID ── */
        .li-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(242px, 1fr));
          gap: 20px;
        }
        .li-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 18px; overflow: hidden;
          text-decoration: none; color: inherit;
          display: block;
          transition: border-color 0.2s, transform 0.22s, background 0.2s;
        }
        .li-card:hover {
          border-color: rgba(201,169,110,0.28);
          transform: translateY(-4px);
          background: rgba(255,255,255,0.05);
        }
        .li-card-img-wrap { position: relative; overflow: hidden; height: 190px; }
        .li-card-img {
          width: 100%; height: 100%; object-fit: cover; display: block;
          transition: transform 0.4s ease;
        }
        .li-card:hover .li-card-img { transform: scale(1.06); }
        .li-card-img-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(8,8,8,0.65) 0%, transparent 55%);
        }
        .li-card-verified {
          position: absolute; top: 12px; right: 12px;
          padding: 3px 10px; border-radius: 6px;
          background: rgba(8,8,8,0.75); backdrop-filter: blur(8px);
          border: 1px solid rgba(201,169,110,0.2);
          font-size: 0.62rem; color: #c9a96e;
          font-weight: 600; letter-spacing: 0.07em; text-transform: uppercase;
        }
        .li-card-body { padding: 18px 20px 20px; }
        .li-card-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.15rem; font-weight: 600; color: #fff;
          margin-bottom: 9px; line-height: 1.2;
        }
        .li-card-meta { display: flex; flex-direction: column; gap: 5px; }
        .li-meta-row {
          display: flex; align-items: center; gap: 7px;
          font-size: 0.775rem; color: rgba(255,255,255,0.33);
        }
        .li-meta-row i { color: #c9a96e; font-size: 11px; width: 12px; text-align: center; }
        .li-card-footer {
          display: flex; align-items: center; justify-content: space-between;
          margin-top: 14px; padding-top: 14px;
          border-top: 1px solid rgba(255,255,255,0.05);
        }
        .li-card-cta {
          font-size: 0.775rem; color: #c9a96e;
          display: flex; align-items: center; gap: 5px;
          transition: gap 0.15s;
        }
        .li-card:hover .li-card-cta { gap: 8px; }
        .li-card-reviews {
          display: flex; align-items: center; gap: 4px;
          font-size: 0.72rem; color: rgba(255,255,255,0.25);
        }
        .li-card-reviews i { color: #c9a96e; font-size: 10px; }

        /* ── BUTTONS ── */
        .li-btn-gold {
          display: inline-flex; align-items: center; gap: 9px;
          padding: 12px 26px;
          background: linear-gradient(135deg, #c9a96e, #e8c98a);
          color: #080808; font-weight: 600; font-size: 0.855rem;
          border-radius: 10px; border: none; cursor: pointer;
          font-family: 'DM Sans', sans-serif; letter-spacing: 0.03em;
          transition: all 0.22s; text-decoration: none;
        }
        .li-btn-gold:hover { opacity: 0.88; transform: translateY(-1px); color: #080808; }
        .li-btn-outline {
          display: inline-flex; align-items: center; gap: 9px;
          padding: 11px 22px;
          background: transparent; color: #c9a96e;
          font-size: 0.855rem; border-radius: 10px;
          border: 1px solid rgba(201,169,110,0.3);
          cursor: pointer; font-family: 'DM Sans', sans-serif;
          transition: all 0.2s; text-decoration: none;
        }
        .li-btn-outline:hover { background: rgba(201,169,110,0.07); border-color: #c9a96e; color: #e8c98a; }

        /* ── LOADING ── */
        .li-loading {
          min-height: 60vh; display: flex; align-items: center;
          justify-content: center; flex-direction: column; gap: 14px;
          color: rgba(255,255,255,0.25); font-size: 0.875rem;
        }
        .li-spinner {
          width: 38px; height: 38px;
          border: 2px solid rgba(201,169,110,0.15);
          border-top-color: #c9a96e;
          border-radius: 50%;
          animation: liSpin 0.8s linear infinite;
        }
        @keyframes liSpin { to { transform: rotate(360deg); } }

        /* ── EMPTY ── */
        .li-empty { text-align: center; padding: 64px 20px; color: rgba(255,255,255,0.22); }
        .li-empty i { font-size: 2.8rem; color: rgba(201,169,110,0.18); margin-bottom: 16px; display: block; }
        .li-empty p { font-size: 0.9rem; margin-bottom: 24px; }

        .li-load-more { text-align: center; margin-top: 40px; }
      `}</style>

        <div className="li-root">
          {loading ? (
            <div className="li-loading">
              <div className="li-spinner" />
              <span>Loading shops…</span>
            </div>
          ) : (
            <>
              {/* ── HERO ── */}
              <section className="li-hero">
                <div className="li-hero-bg" />
                <div className="li-hero-glow" />
                <div className="li-hero-grid" />
                <div className="li-hero-inner">
                  <div className="li-eyebrow">
                    <div className="li-eyebrow-dot" />
                    Curated Wedding Card Shops
                  </div>
                  <h1 className="li-hero-title">
                    Find Your<br /><em>Perfect Card Shop</em>
                  </h1>
                  <p className="li-hero-sub">
                    Browse verified artisan shops. From traditional to contemporary,
                    discover the invitation that speaks your love story.
                  </p>
                  <div className="li-hero-actions">
                    {!existingListing ? (
                      <button className="li-btn-gold" onClick={() => navigate('/listings/new')}>
                        <i className="fas fa-plus" style={{ fontSize: 12 }} />
                        Register Your Shop
                      </button>
                    ) : (
                      <button className="li-btn-gold" onClick={() => navigate(`/listings/${existingListing._id}`)}>
                        <i className="fas fa-store" style={{ fontSize: 12 }} />
                        My Shop
                      </button>
                    )}
                    <Link className="li-btn-outline" to="/listings">
                      <i className="fas fa-compass" style={{ fontSize: 12 }} />
                      Explore All
                    </Link>
                  </div>
                </div>
              </section>

              {/* ── SEARCH ── */}
              <div className="li-search-wrap">
                <form className="li-search-card" onSubmit={handleSearch}>
                  <div className="li-search-field">
                    <i className="fas fa-magnifying-glass" />
                    <input
                      type="text"
                      placeholder="Search shops by name…"
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                    />
                  </div>
                  <div className="li-search-divider" />
                  <div className="li-search-meta">
                    Showing <span>{visibleListings.length}</span> of <span>{alllistings.length}</span> shops
                  </div>
                  <button className="li-btn-gold" type="submit" style={{ padding: '10px 22px', fontSize: '0.82rem' }}>
                    <i className="fas fa-search" style={{ fontSize: 11 }} /> Search
                  </button>
                  <Link className="li-btn-outline" to="/listings" style={{ padding: '9px 18px', fontSize: '0.82rem' }}>
                    All Shops
                  </Link>
                </form>
              </div>

              {/* ── GRID ── */}
              <main className="li-main">
                <div className="li-divider" />
                <div className="li-section-header">
                  <div className="li-section-title">
                    Registered Shops <span>verified artisans</span>
                  </div>
                  <div className="li-count-pill">{alllistings.length} Shops</div>
                </div>

                {alllistings.length === 0 ? (
                  <div className="li-empty">
                    <i className="fas fa-store" />
                    <p>No shops found. Try a different search.</p>
                    <Link className="li-btn-outline" to="/listings">Clear Search</Link>
                  </div>
                ) : (
                  <div className="li-grid">
                    {visibleListings.map(listing => (
                      <Link key={listing._id} to={`/listings/${listing._id}`} className="li-card">
                        <div className="li-card-img-wrap">
                          <img
                            src={listing.image.url}
                            alt={listing.shopName}
                            className="li-card-img"
                          />
                          <div className="li-card-img-overlay" />
                          <div className="li-card-verified">
                            <i className="fas fa-check-circle" style={{ fontSize: 9, marginRight: 3 }} />
                            Verified
                          </div>
                        </div>
                        <div className="li-card-body">
                          <div className="li-card-name">{listing.shopName}</div>
                          <div className="li-card-meta">
                            {listing.location && (
                              <div className="li-meta-row">
                                <i className="fas fa-location-dot" />
                                {listing.location}
                              </div>
                            )}
                            {listing.phone && (
                              <div className="li-meta-row">
                                <i className="fas fa-phone" />
                                {listing.phone}
                              </div>
                            )}
                          </div>
                          <div className="li-card-footer">
                            <div className="li-card-cta">
                              View Shop <i className="fas fa-arrow-right" style={{ fontSize: 10 }} />
                            </div>
                            <div className="li-card-reviews">
                              <i className="fas fa-star" />
                              {listing.reviews?.length || 0} reviews
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}

                {!showAll && alllistings.length > 8 && (
                  <div className="li-load-more">
                    <button className="li-btn-outline" onClick={() => setShowAll(true)} style={{ padding: '12px 36px' }}>
                      <i className="fas fa-chevron-down" style={{ fontSize: 11 }} />
                      View More Shops
                    </button>
                  </div>
                )}
              </main>
            </>
          )}
        </div>
      </Layout>

    </>
  )
}