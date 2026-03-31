// import { useState, useEffect } from 'react'
// import { useParams, useNavigate } from 'react-router-dom'
// import Layout from '../../components/Layout'
// import { useFlash } from '../../context/FlashContext'
// import api from '../../services/api'

// export default function BookNew() {
//   const { id, cardId } = useParams()
//   const { showSuccess, showError } = useFlash()
//   const navigate = useNavigate()

//   const [listing, setListing] = useState(null)
//   const [marriageCard, setMarriageCard] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [validated, setValidated] = useState(false)
//   const [submitting, setSubmitting] = useState(false)

//   const [form, setForm] = useState({
//     phoneNumber: '',
//     customization: '',
//     quantity: 1,
//   })

//   useEffect(() => {
//     api.get(`/listings/${id}/Mcard/${cardId}/book`)
//       .then(res => {
//         setListing(res.data.listing)
//         setMarriageCard(res.data.marriageCard)
//       })
//       .catch(() => { showError('Unable to load booking form'); navigate(`/listings/${id}/Mcard/${cardId}`) })
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
//       await api.post(`/listings/${id}/Mcard/${cardId}/book`, {
//         phoneNumber: form.phoneNumber,
//         customization: form.customization,
//         quantity: form.quantity,
//       })
//       showSuccess('Booking successful! Shop owner will contact you.')
//       navigate('/users/bookings')
//     } catch (err) {
//       showError(err.response?.data?.message || 'Booking failed')
//     } finally { setSubmitting(false) }
//   }

//   if (loading) return (
//     <Layout>
//       <div className="d-flex justify-content-center mt-5">
//         <div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div>
//       </div>
//     </Layout>
//   )
//   if (!listing || !marriageCard) return null

//   return (
//     <Layout>
//       <style>{`
//         .card { transition: transform .3s ease, box-shadow .3s ease; }
//         .card:hover { transform: translateY(-5px); box-shadow: 0 10px 20px rgba(0,0,0,.2)!important; }
//         .form-control:focus { box-shadow: 0 0 0 .25rem rgba(40,167,69,.25); border-color: #28a745; transition: all .3s ease; }
//         .btn-primary { background-color: #28a745; border-color: #28a745; transition: all .3s ease; }
//         .btn-primary:hover { transform: scale(1.05); box-shadow: 0 5px 15px rgba(40,167,69,.4); }
//         .form-label { transition: color .3s ease; font-weight: bold; }
//         body { background-color: #f8f9fa; }
//       `}</style>

//       <div className="container mt-5">
//         <h2 className="text-center mb-4 animate__animated animate__fadeInDown">Book a Card</h2>
//         <div className="row justify-content-center">
//           <div className="col-lg-6 col-md-8 col-sm-12">
//             <div className="card shadow-lg p-4 animate__animated animate__fadeInUp">
//               <form
//                 onSubmit={handleSubmit}
//                 className={`needs-validation ${validated ? 'was-validated' : ''}`}
//                 noValidate
//               >
//                 <div className="mb-3 animate__animated animate__fadeInLeft" style={{ animationDelay: '0.2s' }}>
//                   <label className="form-label">Card Name</label>
//                   <input className="form-control border-success" value={marriageCard.cardName} type="text" readOnly />
//                 </div>

//                 <div className="mb-3 animate__animated animate__fadeInRight" style={{ animationDelay: '0.3s' }}>
//                   <label className="form-label">Shop Name</label>
//                   <input className="form-control border-success" value={listing.shopName} type="text" readOnly />
//                 </div>

//                 <div className="mb-3 animate__animated animate__fadeInLeft" style={{ animationDelay: '0.4s' }}>
//                   <label className="form-label">Phone Number</label>
//                   <div className="input-group">
//                     <span className="input-group-text bg-success text-white">📞</span>
//                     <input
//                       className="form-control border-success"
//                       placeholder="Enter Your Contact Number"
//                       type="tel"
//                       required
//                       value={form.phoneNumber}
//                       onChange={e => setForm({ ...form, phoneNumber: e.target.value })}
//                       onFocus={handleFocus}
//                       onBlur={handleBlur}
//                     />
//                   </div>
//                   <div className="invalid-feedback">Please enter a valid phone number.</div>
//                 </div>

//                 <div className="mb-3 animate__animated animate__fadeInRight" style={{ animationDelay: '0.5s' }}>
//                   <label className="form-label">Customization Requests</label>
//                   <textarea
//                     className="form-control border-success"
//                     placeholder="Enter any customization requests"
//                     rows="3"
//                     value={form.customization}
//                     onChange={e => setForm({ ...form, customization: e.target.value })}
//                     onFocus={handleFocus}
//                     onBlur={handleBlur}
//                   ></textarea>
//                 </div>

//                 <div className="mb-4 animate__animated animate__fadeInLeft" style={{ animationDelay: '0.6s' }}>
//                   <label className="form-label">Quantity</label>
//                   <div className="input-group">
//                     <span className="input-group-text bg-success text-white">🔢</span>
//                     <input
//                       className="form-control border-success"
//                       type="number"
//                       min="1"
//                       required
//                       value={form.quantity}
//                       onChange={e => setForm({ ...form, quantity: e.target.value })}
//                       onFocus={handleFocus}
//                       onBlur={handleBlur}
//                     />
//                   </div>
//                   <div className="invalid-feedback">Please enter a valid quantity (minimum 1).</div>
//                 </div>

//                 <div className="text-center animate__animated animate__fadeInUp" style={{ animationDelay: '0.7s' }}>
//                   <button type="submit" className="btn btn-primary btn-lg w-100 shadow" disabled={submitting}>
//                     {submitting
//                       ? <><span className="spinner-border spinner-border-sm me-2" role="status"></span>Confirming...</>
//                       : 'Confirm Booking'}
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

export default function BookNew() {
  const { id, cardId } = useParams()
  const { showSuccess, showError } = useFlash()
  const navigate = useNavigate()

  const [listing, setListing] = useState(null)
  const [marriageCard, setMarriageCard] = useState(null)
  const [loading, setLoading] = useState(true)
  const [validated, setValidated] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const [form, setForm] = useState({
    phoneNumber: '',
    customization: '',
    quantity: 1,
  })

  useEffect(() => {
    api.get(`/listings/${id}/Mcard/${cardId}/book`)
      .then(res => {
        setListing(res.data.listing)
        setMarriageCard(res.data.marriageCard)
      })
      .catch(() => { showError('Unable to load booking form'); navigate(`/listings/${id}/Mcard/${cardId}`) })
      .finally(() => setLoading(false))
  }, [id, cardId])

  const handleFocus = (e) => {
    const label = e.target.closest('.bn-field')?.querySelector('.bn-label')
    if (label) label.style.color = '#e8c98a'
  }
  const handleBlur = (e) => {
    if (!e.target.value) {
      const label = e.target.closest('.bn-field')?.querySelector('.bn-label')
      if (label) label.style.color = ''
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setValidated(true)
    if (!e.target.checkValidity()) return
    setSubmitting(true)
    try {
      await api.post(`/listings/${id}/Mcard/${cardId}/book`, {
        phoneNumber: form.phoneNumber,
        customization: form.customization,
        quantity: form.quantity,
      })
      showSuccess('Booking successful! Shop owner will contact you.')
      navigate('/users/bookings')
    } catch (err) {
      showError(err.response?.data?.message || 'Booking failed')
    } finally { setSubmitting(false) }
  }

  if (loading) return (
    <Layout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');
        .bn-root { min-height: 100vh; background: #080808; font-family: 'DM Sans', sans-serif; }
        .bn-loading { min-height: 60vh; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 14px; color: rgba(255,255,255,0.25); font-size: 0.875rem; }
        .bn-spinner { width: 38px; height: 38px; border: 2px solid rgba(201,169,110,0.15); border-top-color: #c9a96e; border-radius: 50%; animation: bnSpin 0.8s linear infinite; }
        @keyframes bnSpin { to { transform: rotate(360deg); } }
      `}</style>
      <div className="bn-root">
        <div className="bn-loading">
          <div className="bn-spinner" />
          <span>Loading booking form…</span>
        </div>
      </div>
    </Layout>
  )

  if (!listing || !marriageCard) return null

  const total = form.quantity * (marriageCard.price || 0)

  return (
    <Layout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');

        .bn-root {
          min-height: 100vh;
          background: #080808;
          font-family: 'DM Sans', sans-serif;
          color: #e2e2e2;
        }

        /* ── HERO BAND ── */
        .bn-hero { position: relative; padding: 40px 0 0; overflow: hidden; }
        .bn-hero-glow {
          position: absolute; top: -100px; left: 50%; transform: translateX(-50%);
          width: 800px; height: 500px;
          background: radial-gradient(ellipse, rgba(201,169,110,0.1) 0%, transparent 68%);
          pointer-events: none; z-index: 0;
        }
        .bn-hero-grid {
          position: absolute; inset: 0; z-index: 0;
          background-image:
            linear-gradient(rgba(201,169,110,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,169,110,0.035) 1px, transparent 1px);
          background-size: 56px 56px;
          mask-image: radial-gradient(ellipse 80% 100% at center top, black 20%, transparent 75%);
          pointer-events: none;
        }
        .bn-hero-inner {
          position: relative; z-index: 1;
          max-width: 720px; margin: 0 auto; padding: 0 28px 40px;
        }
        .bn-breadcrumb {
          display: flex; align-items: center; gap: 8px;
          font-size: 0.72rem; color: rgba(255,255,255,0.25);
          text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 28px;
        }
        .bn-breadcrumb a { color: rgba(255,255,255,0.25); text-decoration: none; transition: color 0.18s; }
        .bn-breadcrumb a:hover { color: #c9a96e; }
        .bn-breadcrumb i { font-size: 8px; }
        .bn-eyebrow {
          font-size: 0.65rem; font-weight: 600; color: rgba(201,169,110,0.55);
          text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 8px;
        }
        .bn-hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.4rem; font-weight: 600; color: #fff; line-height: 1.08;
        }

        /* ── MAIN ── */
        .bn-main { max-width: 720px; margin: 0 auto; padding: 0 28px 80px; }

        /* ── DIVIDER ── */
        .bn-divider { height: 1px; background: linear-gradient(to right, transparent, rgba(201,169,110,0.2), transparent); margin: 0 0 36px; }

        /* ── SUMMARY STRIP ── */
        .bn-summary {
          display: grid; grid-template-columns: 1fr 1fr; gap: 12px;
          margin-bottom: 28px;
        }
        .bn-summary-item {
          padding: 14px 18px; border-radius: 14px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(201,169,110,0.14);
          display: flex; align-items: flex-start; gap: 10px;
        }
        .bn-summary-icon {
          width: 28px; height: 28px; border-radius: 7px;
          background: rgba(201,169,110,0.08); border: 1px solid rgba(201,169,110,0.14);
          display: flex; align-items: center; justify-content: center;
          color: #c9a96e; font-size: 11px; flex-shrink: 0;
        }
        .bn-summary-label {
          font-size: 0.62rem; font-weight: 600; color: rgba(255,255,255,0.25);
          text-transform: uppercase; letter-spacing: 0.09em; margin-bottom: 2px;
        }
        .bn-summary-value { font-size: 0.845rem; color: rgba(255,255,255,0.7); font-weight: 300; }

        /* ── FORM CARD ── */
        .bn-form-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(201,169,110,0.18);
          border-radius: 24px; padding: 38px 40px;
        }

        /* ── FIELD ── */
        .bn-field { margin-bottom: 24px; }
        .bn-label {
          display: block;
          font-size: 0.7rem; font-weight: 600; color: rgba(255,255,255,0.3);
          text-transform: uppercase; letter-spacing: 0.09em; margin-bottom: 10px;
          transition: color 0.2s;
        }

        /* ── INPUT GROUP ── */
        .bn-input-group { display: flex; align-items: stretch; }
        .bn-input-icon {
          width: 42px; display: flex; align-items: center; justify-content: center;
          background: rgba(201,169,110,0.08); border: 1px solid rgba(201,169,110,0.18);
          border-right: none; border-radius: 10px 0 0 10px;
          color: #c9a96e; font-size: 13px; flex-shrink: 0;
        }
        .bn-input {
          flex: 1;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 0 10px 10px 0;
          padding: 12px 16px; color: #fff;
          font-family: 'DM Sans', sans-serif; font-size: 0.875rem; font-weight: 300;
          outline: none; transition: border-color 0.2s;
          width: 100%; box-sizing: border-box;
        }
        .bn-input::placeholder { color: rgba(255,255,255,0.18); }
        .bn-input:focus { border-color: rgba(201,169,110,0.4); }
        .bn-input[readonly] {
          color: rgba(255,255,255,0.4);
          cursor: default;
          border-color: rgba(255,255,255,0.04);
        }

        /* ── TEXTAREA ── */
        .bn-textarea {
          width: 100%;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 10px;
          padding: 13px 16px; color: #fff;
          font-family: 'DM Sans', sans-serif; font-size: 0.875rem; font-weight: 300;
          resize: vertical; min-height: 100px; outline: none;
          transition: border-color 0.2s; box-sizing: border-box;
        }
        .bn-textarea::placeholder { color: rgba(255,255,255,0.18); }
        .bn-textarea:focus { border-color: rgba(201,169,110,0.4); }

        /* ── INVALID TEXT ── */
        .bn-invalid-msg {
          font-size: 0.72rem; color: rgba(239,68,68,0.7);
          margin-top: 6px; display: none;
        }
        .bn-show-invalid .bn-invalid-msg { display: block; }

        /* ── LIVE TOTAL ── */
        .bn-total-row {
          display: flex; align-items: center; gap: 12px;
          padding: 14px 18px; border-radius: 14px;
          background: rgba(201,169,110,0.07); border: 1px solid rgba(201,169,110,0.18);
          margin-bottom: 24px;
        }
        .bn-total-label { font-size: 0.62rem; font-weight: 600; color: rgba(255,255,255,0.28); text-transform: uppercase; letter-spacing: 0.09em; }
        .bn-total-val {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.7rem; font-weight: 600; color: #e8c98a; line-height: 1;
        }

        /* ── SUBMIT BUTTON ── */
        .bn-btn-gold {
          display: flex; align-items: center; justify-content: center; gap: 9px;
          width: 100%; padding: 14px 24px;
          background: linear-gradient(135deg, #c9a96e, #e8c98a); color: #080808;
          font-weight: 600; font-size: 0.9rem; border-radius: 12px; border: none;
          cursor: pointer; font-family: 'DM Sans', sans-serif; letter-spacing: 0.04em;
          transition: all 0.22s;
        }
        .bn-btn-gold:hover:not(:disabled) { opacity: 0.88; transform: translateY(-2px); }
        .bn-btn-gold:disabled { opacity: 0.5; cursor: not-allowed; }

        /* ── SPINNER ── */
        .bn-spinner-sm {
          width: 16px; height: 16px;
          border: 2px solid rgba(8,8,8,0.25); border-top-color: #080808;
          border-radius: 50%; animation: bnSpin 0.7s linear infinite;
        }
        @keyframes bnSpin { to { transform: rotate(360deg); } }

        @media (max-width: 640px) {
          .bn-form-card { padding: 26px 20px; }
          .bn-hero-title { font-size: 1.8rem; }
          .bn-summary { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="bn-root">
        {/* ── HERO BAND ── */}
        <section className="bn-hero">
          <div className="bn-hero-glow" />
          <div className="bn-hero-grid" />
          <div className="bn-hero-inner">
            <div className="bn-breadcrumb">
              <Link to="/listings">Shops</Link>
              <i className="fas fa-chevron-right" />
              <Link to={`/listings/${id}`}>{listing.shopName}</Link>
              <i className="fas fa-chevron-right" />
              <Link to={`/listings/${id}/Mcard`}>Cards</Link>
              <i className="fas fa-chevron-right" />
              <Link to={`/listings/${id}/Mcard/${cardId}`}>{marriageCard.cardName}</Link>
              <i className="fas fa-chevron-right" />
              <span style={{ color: 'rgba(255,255,255,0.5)' }}>Book</span>
            </div>
            <div className="bn-eyebrow">Marriage Card Shop</div>
            <div className="bn-hero-title">Book a Card</div>
          </div>
        </section>

        <div className="bn-main">
          <div className="bn-divider" />

          {/* ── SUMMARY STRIP ── */}
          <div className="bn-summary">
            <div className="bn-summary-item">
              <div className="bn-summary-icon"><i className="fas fa-envelope-open-text" /></div>
              <div>
                <div className="bn-summary-label">Card</div>
                <div className="bn-summary-value">{marriageCard.cardName}</div>
              </div>
            </div>
            <div className="bn-summary-item">
              <div className="bn-summary-icon"><i className="fas fa-store" /></div>
              <div>
                <div className="bn-summary-label">Shop</div>
                <div className="bn-summary-value">{listing.shopName}</div>
              </div>
            </div>
          </div>

          {/* ── FORM CARD ── */}
          <div className="bn-form-card">
            <form
              onSubmit={handleSubmit}
              className={validated ? 'bn-show-invalid' : ''}
              noValidate
            >

              {/* Phone Number */}
              <div className="bn-field">
                <label className="bn-label">Phone Number</label>
                <div className="bn-input-group">
                  <div className="bn-input-icon"><i className="fas fa-phone" /></div>
                  <input
                    className="bn-input"
                    placeholder="Enter Your Contact Number"
                    type="tel"
                    required
                    value={form.phoneNumber}
                    onChange={e => setForm({ ...form, phoneNumber: e.target.value })}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </div>
                <div className="bn-invalid-msg">Please enter a valid phone number.</div>
              </div>

              {/* Customization */}
              <div className="bn-field">
                <label className="bn-label">Customization Requests</label>
                <textarea
                  className="bn-textarea"
                  placeholder="Enter any customization requests (optional)"
                  rows="3"
                  value={form.customization}
                  onChange={e => setForm({ ...form, customization: e.target.value })}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>

              {/* Quantity */}
              <div className="bn-field">
                <label className="bn-label">Quantity</label>
                <div className="bn-input-group">
                  <div className="bn-input-icon"><i className="fas fa-layer-group" /></div>
                  <input
                    className="bn-input"
                    type="number"
                    min="1"
                    required
                    value={form.quantity}
                    onChange={e => setForm({ ...form, quantity: e.target.value })}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </div>
                <div className="bn-invalid-msg">Please enter a valid quantity (minimum 1).</div>
              </div>

              {/* Live Total */}
              <div className="bn-total-row">
                <div className="bn-summary-icon"><i className="fas fa-tag" /></div>
                <div>
                  <div className="bn-total-label">Estimated Total</div>
                  <div className="bn-total-val">₹ {total.toLocaleString('en-IN')}</div>
                </div>
              </div>

              {/* Submit */}
              <button type="submit" className="bn-btn-gold" disabled={submitting}>
                {submitting ? (
                  <><div className="bn-spinner-sm" /> Confirming…</>
                ) : (
                  <><i className="fas fa-bookmark" style={{ fontSize: 13 }} /> Confirm Booking</>
                )}
              </button>

            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}