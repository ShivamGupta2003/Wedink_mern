// import { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import Layout from '../../components/Layout'
// import { useAuth } from '../../context/AuthContext'
// import { useFlash } from '../../context/FlashContext'
// import api from '../../services/api'

// export default function Signup() {
//   const { login } = useAuth()
//   const { showSuccess, showError } = useFlash()
//   const navigate = useNavigate()

//   const [form, setForm] = useState({ username: '', email: '', password: '' })
//   const [validated, setValidated] = useState(false)
//   const [loading, setLoading] = useState(false)

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value })
//   }

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
//       const res = await api.post('/auth/signup', form)
//       login(res.data.user)
//       showSuccess('Welcome to WedInk')
//       navigate('/listings')
//     } catch (err) {
//       showError(err.response?.data?.message || 'Signup failed. Please try again.')
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <Layout>
//       <div className="container min-vh-100 d-flex align-items-center">
//         <div className="row justify-content-center w-100 move-up">
//           <div className="col-lg-5 col-md-7 col-sm-12">
//             <div className="card shadow-lg p-4 animate__animated animate__fadeInUp">
//               <div className="text-center mb-4 animate__animated animate__fadeInDown">
//                 <span className="fs-1">💌</span>
//                 <h2 className="text-success fw-bold">Create Your Account</h2>
//                 <p className="text-muted">Sign up to create beautiful Celebration Cards</p>
//               </div>

//               <form
//                 onSubmit={handleSubmit}
//                 className={`needs-validation ${validated ? 'was-validated' : ''}`}
//                 noValidate
//               >
//                 <div className="mb-3 animate__animated animate__fadeInLeft" style={{ animationDelay: '0.2s' }}>
//                   <label className="form-label fw-bold">Username</label>
//                   <input
//                     type="text"
//                     name="username"
//                     className="form-control border-success"
//                     placeholder="Choose a username"
//                     value={form.username}
//                     onChange={handleChange}
//                     onFocus={handleFocus}
//                     onBlur={handleBlur}
//                     required
//                   />
//                   <div className="invalid-feedback">Please enter a valid username</div>
//                 </div>

//                 <div className="mb-3 animate__animated animate__fadeInRight" style={{ animationDelay: '0.3s' }}>
//                   <label className="form-label fw-bold">Email</label>
//                   <input
//                     type="email"
//                     name="email"
//                     className="form-control border-success"
//                     placeholder="Enter your email"
//                     value={form.email}
//                     onChange={handleChange}
//                     onFocus={handleFocus}
//                     onBlur={handleBlur}
//                     required
//                   />
//                   <div className="invalid-feedback">Please enter a valid email</div>
//                 </div>

//                 <div className="mb-3 animate__animated animate__fadeInLeft" style={{ animationDelay: '0.4s' }}>
//                   <label className="form-label fw-bold">Password</label>
//                   <input
//                     type="password"
//                     name="password"
//                     className="form-control border-success"
//                     placeholder="Create a password"
//                     value={form.password}
//                     onChange={handleChange}
//                     onFocus={handleFocus}
//                     onBlur={handleBlur}
//                     required
//                   />
//                   <div className="invalid-feedback">Password must be at least 6 characters</div>
//                 </div>

//                 <div className="text-center animate__animated animate__fadeInUp" style={{ animationDelay: '0.5s' }}>
//                   <button
//                     type="submit"
//                     className="btn btn-success btn-lg w-100 shadow"
//                     disabled={loading}
//                   >
//                     {loading ? (
//                       <>
//                         <span className="spinner-border spinner-border-sm me-2" role="status"></span>
//                         Signing up...
//                       </>
//                     ) : 'Sign Up'}
//                   </button>
//                 </div>
//               </form>

//               <div className="text-center mt-3 animate__animated animate__fadeIn" style={{ animationDelay: '0.6s' }}>
//                 <Link to="/login" className="text-success text-decoration-none">
//                   Already have an account? Log in
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   )
// }
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Layout from '../../components/Layout'
import { useAuth } from '../../context/AuthContext'
import { useFlash } from '../../context/FlashContext'
import api from '../../services/api'

export default function Signup() {
  const { login } = useAuth()
  const { showSuccess, showError } = useFlash()
  const navigate = useNavigate()

  const [form, setForm] = useState({ username: '', email: '', password: '' })
  const [validated, setValidated] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleFocus = (e) => {
    const label = e.target.closest('.su-field')?.querySelector('.su-label')
    if (label) label.style.color = '#e8c98a'
  }
  const handleBlur = (e) => {
    if (!e.target.value) {
      const label = e.target.closest('.su-field')?.querySelector('.su-label')
      if (label) label.style.color = ''
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setValidated(true)
    if (!e.target.checkValidity()) return
    setLoading(true)
    try {
      const res = await api.post('/auth/signup', form)
      login(res.data.user)
      showSuccess('Welcome to WedInk')
      navigate('/listings')
    } catch (err) {
      showError(err.response?.data?.message || 'Signup failed. Please try again.')
    } finally { setLoading(false) }
  }

  return (
    <Layout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');

        .su-root {
          min-height: 100vh; background: #080808;
          font-family: 'DM Sans', sans-serif; color: #e2e2e2;
          display: flex; align-items: center; justify-content: center;
          position: relative; overflow: hidden;
        }

        /* ── BACKGROUND ── */
        .su-bg-glow {
          position: fixed; top: -160px; left: 50%; transform: translateX(-50%);
          width: 900px; height: 600px;
          background: radial-gradient(ellipse, rgba(201,169,110,0.09) 0%, transparent 68%);
          pointer-events: none; z-index: 0;
        }
        .su-bg-grid {
          position: fixed; inset: 0; z-index: 0;
          background-image:
            linear-gradient(rgba(201,169,110,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,169,110,0.03) 1px, transparent 1px);
          background-size: 56px 56px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 0%, black 20%, transparent 75%);
          pointer-events: none;
        }

        /* ── CARD ── */
        .su-card {
          position: relative; z-index: 1;
          width: 100%; max-width: 440px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(201,169,110,0.18);
          border-radius: 28px; padding: 44px 40px;
          margin: 24px;
        }

        /* ── HEADER ── */
        .su-header { text-align: center; margin-bottom: 36px; }
        .su-icon {
          width: 56px; height: 56px; border-radius: 16px; margin: 0 auto 18px;
          background: rgba(201,169,110,0.1); border: 1px solid rgba(201,169,110,0.22);
          display: flex; align-items: center; justify-content: center;
          color: #c9a96e; font-size: 20px;
        }
        .su-eyebrow {
          font-size: 0.65rem; font-weight: 600; color: rgba(201,169,110,0.55);
          text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 8px;
        }
        .su-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem; font-weight: 600; color: #fff; line-height: 1.1; margin-bottom: 6px;
        }
        .su-subtitle { font-size: 0.845rem; color: rgba(255,255,255,0.28); font-weight: 300; }

        /* ── DIVIDER ── */
        .su-divider { height: 1px; background: linear-gradient(to right, transparent, rgba(201,169,110,0.18), transparent); margin: 0 0 28px; }

        /* ── FIELD ── */
        .su-field { margin-bottom: 20px; }
        .su-label {
          display: block; font-size: 0.7rem; font-weight: 600;
          color: rgba(255,255,255,0.3); text-transform: uppercase;
          letter-spacing: 0.09em; margin-bottom: 10px; transition: color 0.2s;
        }
        .su-input-group { display: flex; align-items: stretch; }
        .su-input-icon {
          width: 42px; display: flex; align-items: center; justify-content: center;
          background: rgba(201,169,110,0.08); border: 1px solid rgba(201,169,110,0.18);
          border-right: none; border-radius: 10px 0 0 10px;
          color: #c9a96e; font-size: 13px; flex-shrink: 0;
        }
        .su-input {
          flex: 1; background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 0 10px 10px 0;
          padding: 12px 16px; color: #fff;
          font-family: 'DM Sans', sans-serif; font-size: 0.875rem; font-weight: 300;
          outline: none; transition: border-color 0.2s; width: 100%; box-sizing: border-box;
        }
        .su-input::placeholder { color: rgba(255,255,255,0.18); }
        .su-input:focus { border-color: rgba(201,169,110,0.4); }

        /* ── INVALID ── */
        .su-invalid-msg { font-size: 0.72rem; color: rgba(239,68,68,0.7); margin-top: 6px; display: none; }
        .su-show-invalid .su-invalid-msg { display: block; }

        /* ── SUBMIT ── */
        .su-btn-gold {
          display: flex; align-items: center; justify-content: center; gap: 9px;
          width: 100%; padding: 14px 24px;
          background: linear-gradient(135deg, #c9a96e, #e8c98a); color: #080808;
          font-weight: 600; font-size: 0.9rem; border-radius: 12px; border: none;
          cursor: pointer; font-family: 'DM Sans', sans-serif; letter-spacing: 0.04em;
          transition: all 0.22s; margin-top: 8px;
        }
        .su-btn-gold:hover:not(:disabled) { opacity: 0.88; transform: translateY(-2px); }
        .su-btn-gold:disabled { opacity: 0.5; cursor: not-allowed; }

        /* ── SPINNER ── */
        .su-spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(8,8,8,0.25); border-top-color: #080808;
          border-radius: 50%; animation: suSpin 0.7s linear infinite;
        }
        @keyframes suSpin { to { transform: rotate(360deg); } }

        /* ── FOOTER LINK ── */
        .su-footer { text-align: center; margin-top: 22px; }
        .su-footer a {
          font-size: 0.8rem; color: rgba(201,169,110,0.6); text-decoration: none;
          transition: color 0.18s;
        }
        .su-footer a:hover { color: #e8c98a; }

        @media (max-width: 480px) {
          .su-card { padding: 32px 22px; }
          .su-title { font-size: 1.7rem; }
        }
      `}</style>

      <div className="su-root">
        <div className="su-bg-glow" />
        <div className="su-bg-grid" />

        <div className="su-card">
          {/* Header */}
          <div className="su-header">
            <div className="su-icon"><i className="fas fa-pen-nib" /></div>
            <div className="su-eyebrow">WedInk</div>
            <div className="su-title">Create Your Account</div>
            <div className="su-subtitle">Sign up to create beautiful Celebration Cards</div>
          </div>

          <div className="su-divider" />

          <form
            onSubmit={handleSubmit}
            className={validated ? 'su-show-invalid' : ''}
            noValidate
          >
            {/* Username */}
            <div className="su-field">
              <label className="su-label">Username</label>
              <div className="su-input-group">
                <div className="su-input-icon"><i className="fas fa-user" /></div>
                <input
                  type="text" name="username"
                  className="su-input" placeholder="Choose a username"
                  value={form.username} onChange={handleChange}
                  onFocus={handleFocus} onBlur={handleBlur} required
                />
              </div>
              <div className="su-invalid-msg">Please enter a valid username.</div>
            </div>

            {/* Email */}
            <div className="su-field">
              <label className="su-label">Email</label>
              <div className="su-input-group">
                <div className="su-input-icon"><i className="fas fa-envelope" /></div>
                <input
                  type="email" name="email"
                  className="su-input" placeholder="Enter your email"
                  value={form.email} onChange={handleChange}
                  onFocus={handleFocus} onBlur={handleBlur} required
                />
              </div>
              <div className="su-invalid-msg">Please enter a valid email.</div>
            </div>

            {/* Password */}
            <div className="su-field">
              <label className="su-label">Password</label>
              <div className="su-input-group">
                <div className="su-input-icon"><i className="fas fa-lock" /></div>
                <input
                  type="password" name="password"
                  className="su-input" placeholder="Create a password"
                  value={form.password} onChange={handleChange}
                  onFocus={handleFocus} onBlur={handleBlur} required
                />
              </div>
              <div className="su-invalid-msg">Password must be at least 6 characters.</div>
            </div>

            <button type="submit" className="su-btn-gold" disabled={loading}>
              {loading
                ? <><div className="su-spinner" /> Signing up…</>
                : <><i className="fas fa-user-plus" style={{ fontSize: 13 }} /> Sign Up</>}
            </button>
          </form>

          <div className="su-footer">
            <Link to="/login">Already have an account? Log in</Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}