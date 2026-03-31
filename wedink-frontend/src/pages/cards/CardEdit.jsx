// import { useState, useEffect } from 'react'
// import { useParams, useNavigate } from 'react-router-dom'
// import Layout from '../../components/Layout'
// import { useFlash } from '../../context/FlashContext'
// import api from '../../services/api'

// export default function CardEdit() {
//   const { id, cardId } = useParams()
//   const { showSuccess, showError } = useFlash()
//   const navigate = useNavigate()

//   const [marriageCard, setMarriageCard] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [validated, setValidated] = useState(false)
//   const [submitting, setSubmitting] = useState(false)

//   useEffect(() => {
//     api.get(`/listings/${id}/Mcard/${cardId}`)
//       .then(res => setMarriageCard(res.data.marriageCard))
//       .catch(() => { showError('Card not found'); navigate(`/listings/${id}/Mcard`) })
//       .finally(() => setLoading(false))
//   }, [id, cardId])

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
//       await api.put(`/listings/${id}/Mcard/${cardId}`, formData)
//       showSuccess('Card updated!')
//       navigate(`/listings/${id}/Mcard/${cardId}`)
//     } catch (err) {
//       showError(err.response?.data?.message || 'Failed to update card')
//     } finally { setSubmitting(false) }
//   }

//   if (loading) return (
//     <Layout>
//       <div className="d-flex justify-content-center mt-5">
//         <div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div>
//       </div>
//     </Layout>
//   )
//   if (!marriageCard) return null

//   return (
//     <Layout>
//       <style>{`
//         .card { transition: transform .3s ease, box-shadow .3s ease; }
//         .card:hover { transform: translateY(-5px); box-shadow: 0 10px 20px rgba(0,0,0,.2)!important; }
//         .form-control:focus, .form-select:focus { box-shadow: 0 0 0 .25rem rgba(40,167,69,.25); border-color: #28a745; }
//         .btn-success:hover { transform: scale(1.05); box-shadow: 0 5px 15px rgba(40,167,69,.4); }
//         .form-label { transition: color .3s ease; font-weight: bold; }
//       `}</style>

//       <div className="container mt-5">
//         <h2 className="text-center mb-4 animate__animated animate__fadeInDown">Edit Card</h2>
//         <div className="row justify-content-center">
//           <div className="col-lg-6 col-md-8 col-sm-12">
//             <div className="card shadow-lg p-4 animate__animated animate__fadeInUp">
//               <form
//                 onSubmit={handleSubmit}
//                 className={`needs-validation ${validated ? 'was-validated' : ''}`}
//                 noValidate
//                 encType="multipart/form-data"
//               >


//                 <div className="mb-3 animate__animated animate__fadeInLeft" style={{ animationDelay: '0.2s' }}>
//                   <label className="form-label">Card Name</label>
//                   <div className="input-group">
//                     <span className="input-group-text bg-success text-white">💌</span>
//                     <input name="marriageCard[cardName]" defaultValue={marriageCard.cardName} className="form-control border-success" placeholder="Enter Card Name" type="text" required onFocus={handleFocus} onBlur={handleBlur} />
//                   </div>
//                   <div className="invalid-feedback">Please enter the card name.</div>
//                 </div>

//                 <div className="mb-3 animate__animated animate__fadeInRight" style={{ animationDelay: '0.3s' }}>
//                   <label className="form-label">Description</label>
//                   <textarea name="marriageCard[description]" className="form-control border-success" placeholder="Enter Card Description" rows="3" required defaultValue={marriageCard.description} onFocus={handleFocus} onBlur={handleBlur}></textarea>
//                   <div className="invalid-feedback">Please provide a description.</div>
//                 </div>

//                 <div className="mb-3 animate__animated animate__fadeInLeft" style={{ animationDelay: '0.4s' }}>
//                   <label className="form-label">Image URL</label>
//                   <div className="input-group">
//                     <span className="input-group-text bg-success text-white">🖼️</span>
//                     <input name="image" className="form-control border-success" type="file" />
//                   </div>
//                   <div className="invalid-feedback">Please enter a valid image URL.</div>
//                 </div>

//                 <div className="mb-3 animate__animated animate__fadeInRight" style={{ animationDelay: '0.5s' }}>
//                   <label className="form-label">Price (₹)</label>
//                   <div className="input-group">
//                     <span className="input-group-text bg-success text-white">₹</span>
//                     <input name="marriageCard[price]" defaultValue={marriageCard.price} className="form-control border-success" placeholder="Enter Card Price" type="number" min="0" step="0.01" required onFocus={handleFocus} onBlur={handleBlur} />
//                   </div>
//                   <div className="invalid-feedback">Please enter a valid price.</div>
//                 </div>

//                 <div className="mb-3 animate__animated animate__fadeInLeft" style={{ animationDelay: '0.6s' }}>
//                   <label className="form-label">Theme</label>
//                   <div className="input-group">
//                     <span className="input-group-text bg-success text-white">🎨</span>
//                     <select name="marriageCard[theme]" className="form-select border-success" required defaultValue={marriageCard.theme}>
//                       <option value="Traditional">Traditional</option>
//                       <option value="Modern">Modern</option>
//                       <option value="Royal">Royal</option>
//                     </select>
//                   </div>
//                   <div className="invalid-feedback">Please select a theme.</div>
//                 </div>

//                 <div className="mb-3 animate__animated animate__fadeInRight" style={{ animationDelay: '0.7s' }}>
//                   <label className="form-label">Material</label>
//                   <div className="input-group">
//                     <span className="input-group-text bg-success text-white">📄</span>
//                     <select name="marriageCard[material]" className="form-select border-success" required defaultValue={marriageCard.material}>
//                       <option value="Paper">Paper</option>
//                       <option value="Handmade">Handmade</option>
//                       <option value="Digital">Digital</option>
//                     </select>
//                   </div>
//                   <div className="invalid-feedback">Please select a material type.</div>
//                 </div>

//                 <div className="mb-4 animate__animated animate__fadeInLeft" style={{ animationDelay: '0.8s' }}>
//                   <label className="form-label">Size</label>
//                   <div className="input-group">
//                     <span className="input-group-text bg-success text-white">📏</span>
//                     <input name="marriageCard[size]" defaultValue={marriageCard.size} className="form-control border-success" placeholder="Enter Card Size (e.g., 5x7 inches)" type="text" required onFocus={handleFocus} onBlur={handleBlur} />
//                   </div>
//                   <div className="invalid-feedback">Please enter the card size.</div>
//                 </div>

//                 <div className="text-center animate__animated animate__fadeInUp" style={{ animationDelay: '0.9s' }}>
//                   <button type="submit" className="btn btn-success btn-lg w-100 shadow" disabled={submitting}>
//                     {submitting
//                       ? <><span className="spinner-border spinner-border-sm me-2" role="status"></span>Updating...</>
//                       : <><i className="bi bi-check-circle me-2"></i>Update Card</>}
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

export default function CardEdit() {
  const { id, cardId } = useParams()
  const { showSuccess, showError } = useFlash()
  const navigate = useNavigate()

  const [marriageCard, setMarriageCard] = useState(null)
  const [loading, setLoading] = useState(true)
  const [validated, setValidated] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    api.get(`/listings/${id}/Mcard/${cardId}`)
      .then(res => setMarriageCard(res.data.marriageCard))
      .catch(() => { showError('Card not found'); navigate(`/listings/${id}/Mcard`) })
      .finally(() => setLoading(false))
  }, [id, cardId])

  const handleFocus = (e) => {
    const label = e.target.closest('.ce-field')?.querySelector('.ce-label')
    if (label) label.style.color = '#e8c98a'
  }
  const handleBlur = (e) => {
    if (!e.target.value) {
      const label = e.target.closest('.ce-field')?.querySelector('.ce-label')
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
      await api.put(`/listings/${id}/Mcard/${cardId}`, formData)
      showSuccess('Card updated!')
      navigate(`/listings/${id}/Mcard/${cardId}`)
    } catch (err) {
      showError(err.response?.data?.message || 'Failed to update card')
    } finally { setSubmitting(false) }
  }

  if (loading) return (
    <Layout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');
        .ce-root { min-height: 100vh; background: #080808; font-family: 'DM Sans', sans-serif; }
        .ce-loading { min-height: 60vh; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 14px; color: rgba(255,255,255,0.25); font-size: 0.875rem; }
        .ce-spinner { width: 38px; height: 38px; border: 2px solid rgba(201,169,110,0.15); border-top-color: #c9a96e; border-radius: 50%; animation: ceSpin 0.8s linear infinite; }
        @keyframes ceSpin { to { transform: rotate(360deg); } }
      `}</style>
      <div className="ce-root">
        <div className="ce-loading">
          <div className="ce-spinner" />
          <span>Loading card…</span>
        </div>
      </div>
    </Layout>
  )

  if (!marriageCard) return null

  return (
    <Layout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');

        .ce-root {
          min-height: 100vh;
          background: #080808;
          font-family: 'DM Sans', sans-serif;
          color: #e2e2e2;
        }

        /* ── HERO BAND ── */
        .ce-hero { position: relative; padding: 40px 0 0; overflow: hidden; }
        .ce-hero-glow {
          position: absolute; top: -100px; left: 50%; transform: translateX(-50%);
          width: 800px; height: 500px;
          background: radial-gradient(ellipse, rgba(201,169,110,0.1) 0%, transparent 68%);
          pointer-events: none; z-index: 0;
        }
        .ce-hero-grid {
          position: absolute; inset: 0; z-index: 0;
          background-image:
            linear-gradient(rgba(201,169,110,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,169,110,0.035) 1px, transparent 1px);
          background-size: 56px 56px;
          mask-image: radial-gradient(ellipse 80% 100% at center top, black 20%, transparent 75%);
          pointer-events: none;
        }
        .ce-hero-inner {
          position: relative; z-index: 1;
          max-width: 720px; margin: 0 auto; padding: 0 28px 40px;
        }
        .ce-breadcrumb {
          display: flex; align-items: center; gap: 8px;
          font-size: 0.72rem; color: rgba(255,255,255,0.25);
          text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 28px;
        }
        .ce-breadcrumb a { color: rgba(255,255,255,0.25); text-decoration: none; transition: color 0.18s; }
        .ce-breadcrumb a:hover { color: #c9a96e; }
        .ce-breadcrumb i { font-size: 8px; }
        .ce-eyebrow {
          font-size: 0.65rem; font-weight: 600; color: rgba(201,169,110,0.55);
          text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 8px;
        }
        .ce-hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.4rem; font-weight: 600; color: #fff; line-height: 1.08;
        }

        /* ── MAIN ── */
        .ce-main { max-width: 720px; margin: 0 auto; padding: 0 28px 80px; }

        /* ── DIVIDER ── */
        .ce-divider { height: 1px; background: linear-gradient(to right, transparent, rgba(201,169,110,0.2), transparent); margin: 0 0 36px; }

        /* ── FORM CARD ── */
        .ce-form-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(201,169,110,0.18);
          border-radius: 24px; padding: 38px 40px;
        }

        /* ── FIELD ── */
        .ce-field { margin-bottom: 24px; }
        .ce-label {
          display: block;
          font-size: 0.7rem; font-weight: 600; color: rgba(255,255,255,0.3);
          text-transform: uppercase; letter-spacing: 0.09em; margin-bottom: 10px;
          transition: color 0.2s;
        }

        /* ── INPUT GROUP ── */
        .ce-input-group { display: flex; align-items: stretch; }
        .ce-input-icon {
          width: 42px; display: flex; align-items: center; justify-content: center;
          background: rgba(201,169,110,0.08); border: 1px solid rgba(201,169,110,0.18);
          border-right: none; border-radius: 10px 0 0 10px;
          color: #c9a96e; font-size: 13px; flex-shrink: 0;
        }
        .ce-input {
          flex: 1;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 0 10px 10px 0;
          padding: 12px 16px; color: #fff;
          font-family: 'DM Sans', sans-serif; font-size: 0.875rem; font-weight: 300;
          outline: none; transition: border-color 0.2s;
          width: 100%; box-sizing: border-box;
        }
        .ce-input::placeholder { color: rgba(255,255,255,0.18); }
        .ce-input:focus { border-color: rgba(201,169,110,0.4); }
        .ce-input.ce-invalid { border-color: rgba(239,68,68,0.45); }

        /* ── TEXTAREA ── */
        .ce-textarea {
          width: 100%;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 10px;
          padding: 13px 16px; color: #fff;
          font-family: 'DM Sans', sans-serif; font-size: 0.875rem; font-weight: 300;
          resize: vertical; min-height: 100px; outline: none;
          transition: border-color 0.2s; box-sizing: border-box;
        }
        .ce-textarea::placeholder { color: rgba(255,255,255,0.18); }
        .ce-textarea:focus { border-color: rgba(201,169,110,0.4); }
        .ce-textarea.ce-invalid { border-color: rgba(239,68,68,0.45); }

        /* ── SELECT ── */
        .ce-select {
          flex: 1;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 0 10px 10px 0;
          padding: 12px 16px; color: #fff;
          font-family: 'DM Sans', sans-serif; font-size: 0.875rem; font-weight: 300;
          outline: none; transition: border-color 0.2s;
          appearance: none; cursor: pointer;
        }
        .ce-select:focus { border-color: rgba(201,169,110,0.4); }
        .ce-select option { background: #1a1a1a; color: #e2e2e2; }
        .ce-select.ce-invalid { border-color: rgba(239,68,68,0.45); }

        /* ── FILE INPUT ── */
        .ce-file {
          flex: 1;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 0 10px 10px 0;
          padding: 10px 16px; color: rgba(255,255,255,0.45);
          font-family: 'DM Sans', sans-serif; font-size: 0.845rem;
          outline: none; transition: border-color 0.2s; cursor: pointer;
        }
        .ce-file:focus { border-color: rgba(201,169,110,0.4); }
        .ce-file::file-selector-button {
          background: rgba(201,169,110,0.1); border: 1px solid rgba(201,169,110,0.22);
          border-radius: 6px; color: #c9a96e; font-family: 'DM Sans', sans-serif;
          font-size: 0.78rem; padding: 4px 12px; cursor: pointer; margin-right: 10px;
          transition: background 0.18s;
        }
        .ce-file::file-selector-button:hover { background: rgba(201,169,110,0.18); }

        /* ── INVALID TEXT ── */
        .ce-invalid-msg {
          font-size: 0.72rem; color: rgba(239,68,68,0.7);
          margin-top: 6px; display: none;
        }
        .ce-show-invalid .ce-invalid-msg { display: block; }

        /* ── SUBMIT BUTTON ── */
        .ce-btn-gold {
          display: flex; align-items: center; justify-content: center; gap: 9px;
          width: 100%; padding: 14px 24px;
          background: linear-gradient(135deg, #c9a96e, #e8c98a); color: #080808;
          font-weight: 600; font-size: 0.9rem; border-radius: 12px; border: none;
          cursor: pointer; font-family: 'DM Sans', sans-serif; letter-spacing: 0.04em;
          transition: all 0.22s; margin-top: 8px;
        }
        .ce-btn-gold:hover:not(:disabled) { opacity: 0.88; transform: translateY(-2px); }
        .ce-btn-gold:disabled { opacity: 0.5; cursor: not-allowed; }

        /* ── SPINNER ── */
        .ce-spinner-sm {
          width: 16px; height: 16px;
          border: 2px solid rgba(8,8,8,0.25); border-top-color: #080808;
          border-radius: 50%; animation: ceSpin 0.7s linear infinite;
        }
        @keyframes ceSpin { to { transform: rotate(360deg); } }

        @media (max-width: 640px) {
          .ce-form-card { padding: 26px 20px; }
          .ce-hero-title { font-size: 1.8rem; }
        }
      `}</style>

      <div className="ce-root">
        {/* ── HERO BAND ── */}
        <section className="ce-hero">
          <div className="ce-hero-glow" />
          <div className="ce-hero-grid" />
          <div className="ce-hero-inner">
            <div className="ce-breadcrumb">
              <Link to="/listings">Shops</Link>
              <i className="fas fa-chevron-right" />
              <Link to={`/listings/${id}/Mcard`}>Cards</Link>
              <i className="fas fa-chevron-right" />
              <Link to={`/listings/${id}/Mcard/${cardId}`}>{marriageCard.cardName}</Link>
              <i className="fas fa-chevron-right" />
              <span style={{ color: 'rgba(255,255,255,0.5)' }}>Edit</span>
            </div>
            <div className="ce-eyebrow">Marriage Card Shop</div>
            <div className="ce-hero-title">Edit Card</div>
          </div>
        </section>

        <div className="ce-main">
          <div className="ce-divider" />

          <div className="ce-form-card">
            <form
              onSubmit={handleSubmit}
              className={validated ? 'ce-show-invalid' : ''}
              noValidate
              encType="multipart/form-data"
            >

              {/* Card Name */}
              <div className="ce-field">
                <label className="ce-label">Card Name</label>
                <div className="ce-input-group">
                  <div className="ce-input-icon"><i className="fas fa-envelope-open-text" /></div>
                  <input
                    name="marriageCard[cardName]"
                    defaultValue={marriageCard.cardName}
                    className="ce-input"
                    placeholder="Enter Card Name"
                    type="text"
                    required
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </div>
                <div className="ce-invalid-msg">Please enter the card name.</div>
              </div>

              {/* Description */}
              <div className="ce-field">
                <label className="ce-label">Description</label>
                <textarea
                  name="marriageCard[description]"
                  className="ce-textarea"
                  placeholder="Enter Card Description"
                  rows="3"
                  required
                  defaultValue={marriageCard.description}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
                <div className="ce-invalid-msg">Please provide a description.</div>
              </div>

              {/* Upload Image */}
              <div className="ce-field">
                <label className="ce-label">Upload Image</label>
                <div className="ce-input-group">
                  <div className="ce-input-icon"><i className="fas fa-image" /></div>
                  <input name="image" className="ce-file" type="file" />
                </div>
                <div className="ce-invalid-msg">Please upload an image.</div>
              </div>

              {/* Price */}
              <div className="ce-field">
                <label className="ce-label">Price (₹)</label>
                <div className="ce-input-group">
                  <div className="ce-input-icon" style={{ fontWeight: 600, fontSize: '0.9rem' }}>₹</div>
                  <input
                    name="marriageCard[price]"
                    defaultValue={marriageCard.price}
                    className="ce-input"
                    placeholder="Enter Card Price"
                    type="number"
                    min="0"
                    step="0.01"
                    required
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </div>
                <div className="ce-invalid-msg">Please enter a valid price.</div>
              </div>

              {/* Theme */}
              <div className="ce-field">
                <label className="ce-label">Theme</label>
                <div className="ce-input-group">
                  <div className="ce-input-icon"><i className="fas fa-palette" /></div>
                  <select
                    name="marriageCard[theme]"
                    className="ce-select"
                    required
                    defaultValue={marriageCard.theme}
                  >
                    <option value="Traditional">Traditional</option>
                    <option value="Modern">Modern</option>
                    <option value="Royal">Royal</option>
                  </select>
                </div>
                <div className="ce-invalid-msg">Please select a theme.</div>
              </div>

              {/* Material */}
              <div className="ce-field">
                <label className="ce-label">Material</label>
                <div className="ce-input-group">
                  <div className="ce-input-icon"><i className="fas fa-layer-group" /></div>
                  <select
                    name="marriageCard[material]"
                    className="ce-select"
                    required
                    defaultValue={marriageCard.material}
                  >
                    <option value="Paper">Paper</option>
                    <option value="Handmade">Handmade</option>
                    <option value="Digital">Digital</option>
                  </select>
                </div>
                <div className="ce-invalid-msg">Please select a material type.</div>
              </div>

              {/* Size */}
              <div className="ce-field">
                <label className="ce-label">Size</label>
                <div className="ce-input-group">
                  <div className="ce-input-icon"><i className="fas fa-ruler-combined" /></div>
                  <input
                    name="marriageCard[size]"
                    defaultValue={marriageCard.size}
                    className="ce-input"
                    placeholder="Enter Card Size (e.g., 5x7 inches)"
                    type="text"
                    required
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </div>
                <div className="ce-invalid-msg">Please enter the card size.</div>
              </div>

              {/* Submit */}
              <button type="submit" className="ce-btn-gold" disabled={submitting}>
                {submitting ? (
                  <><div className="ce-spinner-sm" /> Updating…</>
                ) : (
                  <><i className="fas fa-check-circle" style={{ fontSize: 13 }} /> Update Card</>
                )}
              </button>

            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}