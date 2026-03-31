// import { useState, useEffect } from 'react'
// import { useParams, useNavigate } from 'react-router-dom'
// import Layout from '../../components/Layout'
// import { useFlash } from '../../context/FlashContext'
// import api from '../../services/api'

// export default function ListingEdit() {
//   const { id } = useParams()
//   const { showSuccess, showError } = useFlash()
//   const navigate = useNavigate()
//   const [listing, setListing] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [validated, setValidated] = useState(false)
//   const [submitting, setSubmitting] = useState(false)

//   useEffect(() => {
//     api.get(`/listings/${id}`)
//       .then(res => setListing(res.data.listing))
//       .catch(() => { showError('Shop not found'); navigate('/listings') })
//       .finally(() => setLoading(false))
//   }, [id])

//   const handleFocus = (e) => {
//     const label = e.target.closest('.mb-3')?.querySelector('.form-label')
//     if (label) label.style.color = '#28a745'
//   }

//   const handleBlur = (e) => {
//     if (!e.target.value) {
//       const label = e.target.closest('.mb-3')?.querySelector('.form-label')
//       if (label) label.style.color = ''
//     }
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setValidated(true)

//     if (!e.target.checkValidity()) return

//     setSubmitting(true)

//     try {
//       const formData = new FormData(e.target)

//       // DEBUG (optional)
//       console.log(Object.fromEntries(formData))

//       await api.put(`/listings/${id}`, formData)

//       showSuccess('Shop updated successfully!')
//       navigate(`/listings/${id}`)
//     } catch (err) {
//       showError(err.response?.data?.message || 'Failed to update shop')
//     } finally {
//       setSubmitting(false)
//     }
//   }

//   if (loading) return (
//     <Layout>
//       <div className="d-flex justify-content-center mt-5">
//         <div className="spinner-border text-primary"></div>
//       </div>
//     </Layout>
//   )

//   if (!listing) return null

//   return (
//     <Layout>
//       <div className="container mt-5">
//         <h2 className="text-center mb-4">Edit Listing</h2>

//         <div className="row justify-content-center">
//           <div className="col-lg-6 col-md-8 col-sm-12">
//             <div className="card shadow-lg p-4">

//               <form
//                 onSubmit={handleSubmit}
//                 className={`needs-validation ${validated ? 'was-validated' : ''}`}
//                 noValidate
//                 encType="multipart/form-data"
//               >

//                 {/* Shop Name */}
//                 <div className="mb-3">
//                   <label className="form-label fw-bold">Shop Name</label>
//                   <input
//                     name="shopName"
//                     defaultValue={listing.shopName}
//                     className="form-control border-success"
//                     type="text"
//                     required
//                     onFocus={handleFocus}
//                     onBlur={handleBlur}
//                   />
//                 </div>

//                 {/* Description */}
//                 <div className="mb-3">
//                   <label className="form-label fw-bold">Card Description</label>
//                   <textarea
//                     name="description"
//                     defaultValue={listing.description}
//                     className="form-control border-success"
//                     rows="3"
//                     required
//                     onFocus={handleFocus}
//                     onBlur={handleBlur}
//                   ></textarea>
//                 </div>

//                 {/* Image */}
//                 <div className="mb-3">
//                   <label className="form-label fw-bold">Upload New Image</label>
//                   <input
//                     name="image"
//                     className="form-control border-success"
//                     type="file"
//                   />
//                 </div>

//                 {/* Country */}
//                 <div className="mb-3">
//                   <label className="form-label fw-bold">Country</label>
//                   <input
//                     name="country"
//                     defaultValue={listing.country}
//                     className="form-control border-success"
//                     type="text"
//                     required
//                     onFocus={handleFocus}
//                     onBlur={handleBlur}
//                   />
//                 </div>

//                 {/* Location */}
//                 <div className="mb-3">
//                   <label className="form-label fw-bold">Location</label>
//                   <input
//                     name="location"
//                     defaultValue={listing.location}
//                     className="form-control border-success"
//                     type="text"
//                     required
//                     onFocus={handleFocus}
//                     onBlur={handleBlur}
//                   />
//                 </div>

//                 {/* Phone */}
//                 <div className="mb-4">
//                   <label className="form-label fw-bold">Phone Number</label>
//                   <input
//                     name="phoneNumber"
//                     defaultValue={listing.phoneNumber}
//                     className="form-control border-success"
//                     type="number"
//                     required
//                     onFocus={handleFocus}
//                     onBlur={handleBlur}
//                   />
//                 </div>

//                 {/* Submit */}
//                 <div className="text-center">
//                   <button
//                     type="submit"
//                     className="btn btn-success w-100"
//                     disabled={submitting}
//                   >
//                     {submitting ? 'Updating...' : 'Update Listing'}
//                   </button>
//                 </div>

//               </form>

//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   )
// }

import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import Layout from '../../components/Layout'
import { useFlash } from '../../context/FlashContext'
import api from '../../services/api'

export default function ListingEdit() {
  const { id } = useParams()
  const { showSuccess, showError } = useFlash()
  const navigate = useNavigate()
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [validated, setValidated] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    api.get(`/listings/${id}`)
      .then(res => setListing(res.data.listing))
      .catch(() => { showError('Shop not found'); navigate('/listings') })
      .finally(() => setLoading(false))
  }, [id])

  const handleFocus = (e) => {
    const label = e.target.closest('.le-field')?.querySelector('.le-label')
    if (label) label.style.color = '#e8c98a'
  }
  const handleBlur = (e) => {
    if (!e.target.value) {
      const label = e.target.closest('.le-field')?.querySelector('.le-label')
      if (label) label.style.color = ''
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setValidated(true)
    if (!e.target.checkValidity()) return
    setSubmitting(true)
    try {
      const formData = new FormData(e.target)
      await api.put(`/listings/${id}`, formData)
      showSuccess('Shop updated successfully!')
      navigate(`/listings/${id}`)
    } catch (err) {
      showError(err.response?.data?.message || 'Failed to update shop')
    } finally { setSubmitting(false) }
  }

  if (loading) return (
    <Layout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');
        .le-root { min-height: 100vh; background: #080808; font-family: 'DM Sans', sans-serif; }
        .le-loading { min-height: 60vh; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 14px; color: rgba(255,255,255,0.25); font-size: 0.875rem; }
        .le-spinner-lg { width: 38px; height: 38px; border: 2px solid rgba(201,169,110,0.15); border-top-color: #c9a96e; border-radius: 50%; animation: leSpin 0.8s linear infinite; }
        @keyframes leSpin { to { transform: rotate(360deg); } }
      `}</style>
      <div className="le-root">
        <div className="le-loading">
          <div className="le-spinner-lg" />
          <span>Loading shop…</span>
        </div>
      </div>
    </Layout>
  )

  if (!listing) return null

  return (
    <Layout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');

        .le-root { min-height: 100vh; background: #080808; font-family: 'DM Sans', sans-serif; color: #e2e2e2; }

        /* ── HERO ── */
        .le-hero { position: relative; padding: 40px 0 0; overflow: hidden; }
        .le-hero-glow {
          position: absolute; top: -100px; left: 50%; transform: translateX(-50%);
          width: 800px; height: 500px;
          background: radial-gradient(ellipse, rgba(201,169,110,0.1) 0%, transparent 68%);
          pointer-events: none; z-index: 0;
        }
        .le-hero-grid {
          position: absolute; inset: 0; z-index: 0;
          background-image:
            linear-gradient(rgba(201,169,110,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,169,110,0.035) 1px, transparent 1px);
          background-size: 56px 56px;
          mask-image: radial-gradient(ellipse 80% 100% at center top, black 20%, transparent 75%);
          pointer-events: none;
        }
        .le-hero-inner {
          position: relative; z-index: 1;
          max-width: 720px; margin: 0 auto; padding: 0 28px 40px;
        }
        .le-breadcrumb {
          display: flex; align-items: center; gap: 8px;
          font-size: 0.72rem; color: rgba(255,255,255,0.25);
          text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 28px;
        }
        .le-breadcrumb a { color: rgba(255,255,255,0.25); text-decoration: none; transition: color 0.18s; }
        .le-breadcrumb a:hover { color: #c9a96e; }
        .le-breadcrumb i { font-size: 8px; }
        .le-eyebrow {
          font-size: 0.65rem; font-weight: 600; color: rgba(201,169,110,0.55);
          text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 8px;
        }
        .le-hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.4rem; font-weight: 600; color: #fff; line-height: 1.08;
        }

        /* ── MAIN ── */
        .le-main { max-width: 720px; margin: 0 auto; padding: 0 28px 80px; }
        .le-divider { height: 1px; background: linear-gradient(to right, transparent, rgba(201,169,110,0.2), transparent); margin: 0 0 36px; }

        /* ── FORM CARD ── */
        .le-form-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(201,169,110,0.18);
          border-radius: 24px; padding: 38px 40px;
        }

        /* ── FIELD ── */
        .le-field { margin-bottom: 24px; }
        .le-label {
          display: block; font-size: 0.7rem; font-weight: 600; color: rgba(255,255,255,0.3);
          text-transform: uppercase; letter-spacing: 0.09em; margin-bottom: 10px; transition: color 0.2s;
        }

        /* ── INPUT GROUP ── */
        .le-input-group { display: flex; align-items: stretch; }
        .le-input-icon {
          width: 42px; display: flex; align-items: center; justify-content: center;
          background: rgba(201,169,110,0.08); border: 1px solid rgba(201,169,110,0.18);
          border-right: none; border-radius: 10px 0 0 10px;
          color: #c9a96e; font-size: 13px; flex-shrink: 0;
        }
        .le-input {
          flex: 1; background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 0 10px 10px 0;
          padding: 12px 16px; color: #fff;
          font-family: 'DM Sans', sans-serif; font-size: 0.875rem; font-weight: 300;
          outline: none; transition: border-color 0.2s; width: 100%; box-sizing: border-box;
        }
        .le-input::placeholder { color: rgba(255,255,255,0.18); }
        .le-input:focus { border-color: rgba(201,169,110,0.4); }

        /* ── TEXTAREA ── */
        .le-textarea {
          width: 100%; background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 10px;
          padding: 13px 16px; color: #fff;
          font-family: 'DM Sans', sans-serif; font-size: 0.875rem; font-weight: 300;
          resize: vertical; min-height: 100px; outline: none;
          transition: border-color 0.2s; box-sizing: border-box;
        }
        .le-textarea::placeholder { color: rgba(255,255,255,0.18); }
        .le-textarea:focus { border-color: rgba(201,169,110,0.4); }

        /* ── INVALID ── */
        .le-invalid-msg { font-size: 0.72rem; color: rgba(239,68,68,0.7); margin-top: 6px; display: none; }
        .le-show-invalid .le-invalid-msg { display: block; }

        /* ── SUBMIT ── */
        .le-btn-gold {
          display: flex; align-items: center; justify-content: center; gap: 9px;
          width: 100%; padding: 14px 24px;
          background: linear-gradient(135deg, #c9a96e, #e8c98a); color: #080808;
          font-weight: 600; font-size: 0.9rem; border-radius: 12px; border: none;
          cursor: pointer; font-family: 'DM Sans', sans-serif; letter-spacing: 0.04em;
          transition: all 0.22s; margin-top: 8px;
        }
        .le-btn-gold:hover:not(:disabled) { opacity: 0.88; transform: translateY(-2px); }
        .le-btn-gold:disabled { opacity: 0.5; cursor: not-allowed; }
        .le-spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(8,8,8,0.25); border-top-color: #080808;
          border-radius: 50%; animation: leSpin 0.7s linear infinite;
        }
        @keyframes leSpin { to { transform: rotate(360deg); } }

        @media (max-width: 640px) {
          .le-form-card { padding: 26px 20px; }
          .le-hero-title { font-size: 1.8rem; }
        }
      `}</style>

      <div className="le-root">
        <section className="le-hero">
          <div className="le-hero-glow" />
          <div className="le-hero-grid" />
          <div className="le-hero-inner">
            <div className="le-breadcrumb">
              <Link to="/listings">Shops</Link>
              <i className="fas fa-chevron-right" />
              <Link to={`/listings/${id}`}>{listing.shopName}</Link>
              <i className="fas fa-chevron-right" />
              <span style={{ color: 'rgba(255,255,255,0.5)' }}>Edit</span>
            </div>
            <div className="le-eyebrow">Marriage Card Shop</div>
            <div className="le-hero-title">Edit Shop</div>
          </div>
        </section>

        <div className="le-main">
          <div className="le-divider" />
          <div className="le-form-card">
            <form
              onSubmit={handleSubmit}
              className={validated ? 'le-show-invalid' : ''}
              noValidate
              encType="multipart/form-data"
            >

              {/* Shop Name */}
              <div className="le-field">
                <label className="le-label">Shop Name</label>
                <div className="le-input-group">
                  <div className="le-input-icon"><i className="fas fa-store" /></div>
                  <input name="shopName" defaultValue={listing.shopName} className="le-input" placeholder="Enter Shop Name" type="text" required onFocus={handleFocus} onBlur={handleBlur} />
                </div>
                <div className="le-invalid-msg">Please enter the shop name.</div>
              </div>

              {/* Description */}
              <div className="le-field">
                <label className="le-label">Description</label>
                <textarea name="description" defaultValue={listing.description} className="le-textarea" placeholder="Enter Shop Description" rows="3" required onFocus={handleFocus} onBlur={handleBlur} />
                <div className="le-invalid-msg">Please provide a description.</div>
              </div>

              {/* Image */}
              <div className="le-field">
                <label className="le-label">Upload New Image</label>
                <div className="le-input-group">
                  <div className="le-input-icon"><i className="fas fa-image" /></div>
                  <input name="image" className="le-input" type="file" style={{ padding: '10px 16px', color: 'rgba(255,255,255,0.45)', cursor: 'pointer' }} />
                </div>
              </div>

              {/* Country */}
              <div className="le-field">
                <label className="le-label">Country</label>
                <div className="le-input-group">
                  <div className="le-input-icon"><i className="fas fa-globe" /></div>
                  <input name="country" defaultValue={listing.country} className="le-input" placeholder="Enter Shop Country" type="text" required onFocus={handleFocus} onBlur={handleBlur} />
                </div>
                <div className="le-invalid-msg">Please enter the country name.</div>
              </div>

              {/* Location */}
              <div className="le-field">
                <label className="le-label">Location</label>
                <div className="le-input-group">
                  <div className="le-input-icon"><i className="fas fa-location-dot" /></div>
                  <input name="location" defaultValue={listing.location} className="le-input" placeholder="Enter Shop Location" type="text" required onFocus={handleFocus} onBlur={handleBlur} />
                </div>
                <div className="le-invalid-msg">Please enter the shop location.</div>
              </div>

              {/* Phone */}
              <div className="le-field">
                <label className="le-label">Phone Number</label>
                <div className="le-input-group">
                  <div className="le-input-icon"><i className="fas fa-phone" /></div>
                  <input name="phoneNumber" defaultValue={listing.phoneNumber} className="le-input" placeholder="Enter Shop Phone Number" type="number" required onFocus={handleFocus} onBlur={handleBlur} />
                </div>
                <div className="le-invalid-msg">Please enter a valid phone number.</div>
              </div>

              <button type="submit" className="le-btn-gold" disabled={submitting}>
                {submitting
                  ? <><div className="le-spinner" /> Updating…</>
                  : <><i className="fas fa-check-circle" style={{ fontSize: 13 }} /> Update Listing</>}
              </button>

            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}