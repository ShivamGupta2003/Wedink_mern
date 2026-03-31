// import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import Layout from '../../components/Layout'
// import { useFlash } from '../../context/FlashContext'
// import api from '../../services/api'

// export default function ListingNew() {
//   const { showSuccess, showError } = useFlash()
//   const navigate = useNavigate()
//   const [validated, setValidated] = useState(false)
//   const [loading, setLoading] = useState(false)

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

//     setLoading(true)

//     try {
//       const formData = new FormData(e.target)

//       // DEBUG (optional)
//       console.log(Object.fromEntries(formData))

//       await api.post('/listings', formData)

//       showSuccess('Shop registered successfully!')
//       navigate('/listings')
//     } catch (err) {
//       showError(err.response?.data?.message || 'Failed to register shop')
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <Layout>
//       <style>{`
//         .card { transition:transform .3s ease,box-shadow .3s ease; }
//         .card:hover { transform:translateY(-5px); box-shadow:0 10px 20px rgba(0,0,0,.2)!important; }
//         .form-control:focus { box-shadow:0 0 0 .25rem rgba(40,167,69,.25); border-color:#28a745; transition:all .3s ease; }
//         .btn-success { transition:all .3s ease; }
//         .btn-success:hover { transform:scale(1.05); box-shadow:0 5px 15px rgba(40,167,69,.4); }
//       `}</style>

//       <div className="container mt-5">
//         <h2 className="text-center mb-4">Submit a New Listing</h2>

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
//                     className="form-control border-success"
//                     placeholder="Enter Shop Name"
//                     type="text"
//                     required
//                     onFocus={handleFocus}
//                     onBlur={handleBlur}
//                   />
//                   <div className="invalid-feedback">Please enter the shop name.</div>
//                 </div>

//                 {/* Description */}
//                 <div className="mb-3">
//                   <label className="form-label fw-bold">Card Description</label>
//                   <textarea
//                     name="description"
//                     className="form-control border-success"
//                     placeholder="Enter Card Description"
//                     rows="3"
//                     required
//                     onFocus={handleFocus}
//                     onBlur={handleBlur}
//                   ></textarea>
//                   <div className="invalid-feedback">Please provide a description.</div>
//                 </div>

//                 {/* Image */}
//                 <div className="mb-3">
//                   <label className="form-label fw-bold">Image Upload</label>
//                   <input
//                     name="image"
//                     className="form-control border-success"
//                     type="file"
//                     required
//                   />
//                   <div className="invalid-feedback">Please upload an image.</div>
//                 </div>

//                 {/* Country */}
//                 <div className="mb-3">
//                   <label className="form-label fw-bold">Country</label>
//                   <div className="input-group">
//                     <span className="input-group-text bg-success text-white">🌍</span>
//                     <input
//                       name="country"
//                       className="form-control border-success"
//                       placeholder="Enter Shop Country"
//                       type="text"
//                       required
//                       onFocus={handleFocus}
//                       onBlur={handleBlur}
//                     />
//                   </div>
//                   <div className="invalid-feedback">Please enter the country name.</div>
//                 </div>

//                 {/* Location */}
//                 <div className="mb-3">
//                   <label className="form-label fw-bold">Location</label>
//                   <div className="input-group">
//                     <span className="input-group-text bg-success text-white">📍</span>
//                     <input
//                       name="location"
//                       className="form-control border-success"
//                       placeholder="Enter Shop Location"
//                       type="text"
//                       required
//                       onFocus={handleFocus}
//                       onBlur={handleBlur}
//                     />
//                   </div>
//                   <div className="invalid-feedback">Please enter the shop location.</div>
//                 </div>

//                 {/* Phone */}
//                 <div className="mb-4">
//                   <label className="form-label fw-bold">Phone Number</label>
//                   <div className="input-group">
//                     <span className="input-group-text bg-success text-white">📞</span>
//                     <input
//                       name="phoneNumber"
//                       className="form-control border-success"
//                       placeholder="Enter Shop Phone Number"
//                       type="number"
//                       required
//                       onFocus={handleFocus}
//                       onBlur={handleBlur}
//                     />
//                   </div>
//                   <div className="invalid-feedback">Please enter a valid phone number.</div>
//                 </div>

//                 {/* Submit */}
//                 <div className="text-center">
//                   <button
//                     type="submit"
//                     className="btn btn-success btn-lg w-100 shadow"
//                     disabled={loading}
//                   >
//                     {loading ? 'Submitting...' : 'Submit Listing'}
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
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../../components/Layout'
import { useFlash } from '../../context/FlashContext'
import api from '../../services/api'

export default function ListingNew() {
  const { showSuccess, showError } = useFlash()
  const navigate = useNavigate()
  const [validated, setValidated] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleFocus = (e) => {
    const label = e.target.closest('.ln-field')?.querySelector('.ln-label')
    if (label) label.style.color = '#e8c98a'
  }
  const handleBlur = (e) => {
    if (!e.target.value) {
      const label = e.target.closest('.ln-field')?.querySelector('.ln-label')
      if (label) label.style.color = ''
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setValidated(true)
    if (!e.target.checkValidity()) return
    setLoading(true)
    try {
      const formData = new FormData(e.target)
      await api.post('/listings', formData)
      showSuccess('Shop registered successfully!')
      navigate('/listings')
    } catch (err) {
      showError(err.response?.data?.message || 'Failed to register shop')
    } finally { setLoading(false) }
  }

  return (
    <Layout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');

        .ln-root { min-height: 100vh; background: #080808; font-family: 'DM Sans', sans-serif; color: #e2e2e2; }

        /* ── HERO ── */
        .ln-hero { position: relative; padding: 40px 0 0; overflow: hidden; }
        .ln-hero-glow {
          position: absolute; top: -100px; left: 50%; transform: translateX(-50%);
          width: 800px; height: 500px;
          background: radial-gradient(ellipse, rgba(201,169,110,0.1) 0%, transparent 68%);
          pointer-events: none; z-index: 0;
        }
        .ln-hero-grid {
          position: absolute; inset: 0; z-index: 0;
          background-image:
            linear-gradient(rgba(201,169,110,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,169,110,0.035) 1px, transparent 1px);
          background-size: 56px 56px;
          mask-image: radial-gradient(ellipse 80% 100% at center top, black 20%, transparent 75%);
          pointer-events: none;
        }
        .ln-hero-inner {
          position: relative; z-index: 1;
          max-width: 720px; margin: 0 auto; padding: 0 28px 40px;
        }
        .ln-eyebrow {
          font-size: 0.65rem; font-weight: 600; color: rgba(201,169,110,0.55);
          text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 8px;
        }
        .ln-hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.4rem; font-weight: 600; color: #fff; line-height: 1.08;
        }

        /* ── MAIN ── */
        .ln-main { max-width: 720px; margin: 0 auto; padding: 0 28px 80px; }
        .ln-divider { height: 1px; background: linear-gradient(to right, transparent, rgba(201,169,110,0.2), transparent); margin: 0 0 36px; }

        /* ── FORM CARD ── */
        .ln-form-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(201,169,110,0.18);
          border-radius: 24px; padding: 38px 40px;
        }

        /* ── FIELD ── */
        .ln-field { margin-bottom: 24px; }
        .ln-label {
          display: block; font-size: 0.7rem; font-weight: 600; color: rgba(255,255,255,0.3);
          text-transform: uppercase; letter-spacing: 0.09em; margin-bottom: 10px; transition: color 0.2s;
        }

        /* ── INPUT GROUP ── */
        .ln-input-group { display: flex; align-items: stretch; }
        .ln-input-icon {
          width: 42px; display: flex; align-items: center; justify-content: center;
          background: rgba(201,169,110,0.08); border: 1px solid rgba(201,169,110,0.18);
          border-right: none; border-radius: 10px 0 0 10px;
          color: #c9a96e; font-size: 13px; flex-shrink: 0;
        }
        .ln-input {
          flex: 1; background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 0 10px 10px 0;
          padding: 12px 16px; color: #fff;
          font-family: 'DM Sans', sans-serif; font-size: 0.875rem; font-weight: 300;
          outline: none; transition: border-color 0.2s; width: 100%; box-sizing: border-box;
        }
        .ln-input::placeholder { color: rgba(255,255,255,0.18); }
        .ln-input:focus { border-color: rgba(201,169,110,0.4); }

        /* standalone input (no icon) */
        .ln-input-solo {
          width: 100%; background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 10px;
          padding: 12px 16px; color: #fff;
          font-family: 'DM Sans', sans-serif; font-size: 0.875rem; font-weight: 300;
          outline: none; transition: border-color 0.2s; box-sizing: border-box;
        }
        .ln-input-solo::placeholder { color: rgba(255,255,255,0.18); }
        .ln-input-solo:focus { border-color: rgba(201,169,110,0.4); }

        /* ── TEXTAREA ── */
        .ln-textarea {
          width: 100%; background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 10px;
          padding: 13px 16px; color: #fff;
          font-family: 'DM Sans', sans-serif; font-size: 0.875rem; font-weight: 300;
          resize: vertical; min-height: 100px; outline: none;
          transition: border-color 0.2s; box-sizing: border-box;
        }
        .ln-textarea::placeholder { color: rgba(255,255,255,0.18); }
        .ln-textarea:focus { border-color: rgba(201,169,110,0.4); }

        /* ── FILE ── */
        .ln-file {
          width: 100%; background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 10px;
          padding: 10px 16px; color: rgba(255,255,255,0.45);
          font-family: 'DM Sans', sans-serif; font-size: 0.845rem;
          outline: none; transition: border-color 0.2s; cursor: pointer; box-sizing: border-box;
        }
        .ln-file:focus { border-color: rgba(201,169,110,0.4); }
        .ln-file::file-selector-button {
          background: rgba(201,169,110,0.1); border: 1px solid rgba(201,169,110,0.22);
          border-radius: 6px; color: #c9a96e; font-family: 'DM Sans', sans-serif;
          font-size: 0.78rem; padding: 4px 12px; cursor: pointer; margin-right: 10px;
          transition: background 0.18s;
        }
        .ln-file::file-selector-button:hover { background: rgba(201,169,110,0.18); }

        /* ── INVALID ── */
        .ln-invalid-msg { font-size: 0.72rem; color: rgba(239,68,68,0.7); margin-top: 6px; display: none; }
        .ln-show-invalid .ln-invalid-msg { display: block; }

        /* ── SUBMIT ── */
        .ln-btn-gold {
          display: flex; align-items: center; justify-content: center; gap: 9px;
          width: 100%; padding: 14px 24px;
          background: linear-gradient(135deg, #c9a96e, #e8c98a); color: #080808;
          font-weight: 600; font-size: 0.9rem; border-radius: 12px; border: none;
          cursor: pointer; font-family: 'DM Sans', sans-serif; letter-spacing: 0.04em;
          transition: all 0.22s; margin-top: 8px;
        }
        .ln-btn-gold:hover:not(:disabled) { opacity: 0.88; transform: translateY(-2px); }
        .ln-btn-gold:disabled { opacity: 0.5; cursor: not-allowed; }
        .ln-spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(8,8,8,0.25); border-top-color: #080808;
          border-radius: 50%; animation: lnSpin 0.7s linear infinite;
        }
        @keyframes lnSpin { to { transform: rotate(360deg); } }

        @media (max-width: 640px) {
          .ln-form-card { padding: 26px 20px; }
          .ln-hero-title { font-size: 1.8rem; }
        }
      `}</style>

      <div className="ln-root">
        <section className="ln-hero">
          <div className="ln-hero-glow" />
          <div className="ln-hero-grid" />
          <div className="ln-hero-inner">
            <div className="ln-eyebrow">Marriage Card Shop</div>
            <div className="ln-hero-title">Register a New Shop</div>
          </div>
        </section>

        <div className="ln-main">
          <div className="ln-divider" />
          <div className="ln-form-card">
            <form
              onSubmit={handleSubmit}
              className={validated ? 'ln-show-invalid' : ''}
              noValidate
              encType="multipart/form-data"
            >

              {/* Shop Name */}
              <div className="ln-field">
                <label className="ln-label">Shop Name</label>
                <div className="ln-input-group">
                  <div className="ln-input-icon"><i className="fas fa-store" /></div>
                  <input name="shopName" className="ln-input" placeholder="Enter Shop Name" type="text" required onFocus={handleFocus} onBlur={handleBlur} />
                </div>
                <div className="ln-invalid-msg">Please enter the shop name.</div>
              </div>

              {/* Description */}
              <div className="ln-field">
                <label className="ln-label">Description</label>
                <textarea name="description" className="ln-textarea" placeholder="Enter Shop Description" rows="3" required onFocus={handleFocus} onBlur={handleBlur} />
                <div className="ln-invalid-msg">Please provide a description.</div>
              </div>

              {/* Image */}
              <div className="ln-field">
                <label className="ln-label">Upload Image</label>
                <div className="ln-input-group">
                  <div className="ln-input-icon"><i className="fas fa-image" /></div>
                  <input name="image" className="ln-input" type="file" required style={{ padding: '10px 16px', color: 'rgba(255,255,255,0.45)', cursor: 'pointer' }} />
                </div>
                <div className="ln-invalid-msg">Please upload an image.</div>
              </div>

              {/* Country */}
              <div className="ln-field">
                <label className="ln-label">Country</label>
                <div className="ln-input-group">
                  <div className="ln-input-icon"><i className="fas fa-globe" /></div>
                  <input name="country" className="ln-input" placeholder="Enter Shop Country" type="text" required onFocus={handleFocus} onBlur={handleBlur} />
                </div>
                <div className="ln-invalid-msg">Please enter the country name.</div>
              </div>

              {/* Location */}
              <div className="ln-field">
                <label className="ln-label">Location</label>
                <div className="ln-input-group">
                  <div className="ln-input-icon"><i className="fas fa-location-dot" /></div>
                  <input name="location" className="ln-input" placeholder="Enter Shop Location" type="text" required onFocus={handleFocus} onBlur={handleBlur} />
                </div>
                <div className="ln-invalid-msg">Please enter the shop location.</div>
              </div>

              {/* Phone */}
              <div className="ln-field">
                <label className="ln-label">Phone Number</label>
                <div className="ln-input-group">
                  <div className="ln-input-icon"><i className="fas fa-phone" /></div>
                  <input name="phoneNumber" className="ln-input" placeholder="Enter Shop Phone Number" type="number" required onFocus={handleFocus} onBlur={handleBlur} />
                </div>
                <div className="ln-invalid-msg">Please enter a valid phone number.</div>
              </div>

              <button type="submit" className="ln-btn-gold" disabled={loading}>
                {loading
                  ? <><div className="ln-spinner" /> Submitting…</>
                  : <><i className="fas fa-plus-circle" style={{ fontSize: 13 }} /> Submit Listing</>}
              </button>

            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}