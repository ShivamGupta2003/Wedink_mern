// import { Link, useNavigate } from 'react-router-dom'
// import { useState } from 'react'
// import { useAuth } from '../context/AuthContext'
// import { useFlash } from '../context/FlashContext'
// import api from '../services/api'

// export default function Navbar() {
//   const { curruser, logout } = useAuth()
//   const { showSuccess, showError } = useFlash()
//   const navigate = useNavigate()
//   const [search, setSearch] = useState('')

//   const handleLogout = async () => {
//     try {
//       await api.get('/auth/logout')
//       logout()
//       showSuccess('You are LoggedOut Successfully !!')
//       navigate('/')
//     } catch {
//       showError('Logout failed')
//     }
//   }

//   const handleSearch = (e) => {
//     e.preventDefault()
//     navigate(`/listings?shopName=${encodeURIComponent(search)}`)
//   }

//   return (
//     <>
//       {/* Offcanvas for mobile */}
//       <div
//         className="offcanvas offcanvas-start"
//         tabIndex="-1"
//         id="offcanvasNavbar"
//         aria-labelledby="offcanvasNavbarLabel"
//       >
//         <div className="offcanvas-header">
//           <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
//             <i className="fas fa-rings me-2"></i>WedInk
//           </h5>
//           <button
//             type="button"
//             className="btn-close btn-close-white"
//             data-bs-dismiss="offcanvas"
//             aria-label="Close"
//           ></button>
//         </div>
//         <div className="offcanvas-body">
//           <ul className="navbar-nav">
//             <li className="nav-item">
//               <Link className="nav-link active" to="/listings" data-bs-dismiss="offcanvas">
//                 <i className="fas fa-home me-2"></i>Home
//               </Link>
//             </li>
//             {!curruser && (
//               <>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/login" data-bs-dismiss="offcanvas">
//                     <i className="fas fa-sign-in-alt me-2"></i>Login
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/signup" data-bs-dismiss="offcanvas">
//                     <i className="fas fa-user-plus me-2"></i>Sign Up
//                   </Link>
//                 </li>
//               </>
//             )}
//             {curruser && (
//               <>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/users/bookings" data-bs-dismiss="offcanvas">
//                     <i className="fas fa-calendar-check me-2"></i>My Orders
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <button className="nav-link btn btn-link" onClick={handleLogout}>
//                     <i className="fas fa-sign-out-alt me-2"></i>Logout
//                   </button>
//                 </li>
//               </>
//             )}
//           </ul>
//           <form onSubmit={handleSearch} className="mt-4">
//             <div className="input-group">
//               <input
//                 className="form-control"
//                 type="search"
//                 placeholder="Search shop..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//               />
//               <button
//                 type="submit"
//                 style={{
//                   padding: '4px 30px',
//                   fontSize: '12px',
//                   backgroundColor: '#007bff',
//                   color: 'white',
//                   borderRadius: '2px',
//                   border: 'none',
//                   cursor: 'pointer',
//                 }}
//               >
//                 <i className="fas fa-search" style={{ fontSize: '12px' }}></i>
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>

//       {/* Main Navbar */}
//       <nav className="navbar navbar-expand-lg fixed-top">
//         <div className="container">
//           <button
//             className="navbar-toggler"
//             type="button"
//             data-bs-toggle="offcanvas"
//             data-bs-target="#offcanvasNavbar"
//             aria-controls="offcanvasNavbar"
//           >
//             <i className="fas fa-bars text-white"></i>
//           </button>

//           <Link className="navbar-brand" to="/">
//             <i className="fa-regular fa-compass mass"></i>
//           </Link>

//           <div className="collapse navbar-collapse">
//             <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//               <li className="nav-item">
//                 <Link className="nav-link active" to="/">WedInk</Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link" to="/listings">Home</Link>
//               </li>
//               {!curruser && (
//                 <>
//                   <li className="nav-item">
//                     <Link className="nav-link" to="/login">Login</Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link className="nav-link" to="/signup">Sign Up</Link>
//                   </li>
//                 </>
//               )}
//               {curruser && (
//                 <>
//                   <li className="nav-item">
//                     <Link className="nav-link" to="/users/bookings">My Orders</Link>
//                   </li>
//                   <li className="nav-item">
//                     <button
//                       className="nav-link btn btn-link p-0"
//                       style={{ textDecoration: 'none' }}
//                       onClick={handleLogout}
//                     >
//                       Logout
//                     </button>
//                   </li>
//                 </>
//               )}
//             </ul>

//             <form onSubmit={handleSearch} className="d-flex">
//               <div className="input-group">
//                 <input
//                   className="form-control"
//                   type="search"
//                   placeholder="Search shop..."
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                 />
//                 <button
//                   type="submit"
//                   style={{
//                     padding: '4px 30px',
//                     fontSize: '12px',
//                     backgroundColor: '#007bff',
//                     color: 'white',
//                     borderRadius: '2px',
//                     border: 'none',
//                     cursor: 'pointer',
//                   }}
//                 >
//                   <i className="fas fa-search" style={{ fontSize: '12px' }}></i>
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </nav>
//     </>
//   )
// }
import { Link, useNavigate } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useFlash } from '../context/FlashContext'
import api from '../services/api'

export default function Navbar() {
  const { curruser, logout } = useAuth()
  const { showSuccess, showError } = useFlash()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  const handleLogout = async () => {
    try {
      await api.get('/auth/logout')
      logout()
      setDropdownOpen(false)
      showSuccess('You are LoggedOut Successfully !!')
      navigate('/')
    } catch {
      showError('Logout failed')
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    navigate(`/listings?shopName=${encodeURIComponent(search)}`)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Get initials from username
  const getInitials = (name) => {
    if (!name) return 'U'
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <>
      <style>{`
        /* ── Navbar base ── */
        .wedinknav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1050;
          background: #0f0f0f;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        .wedinknav .container {
          display: flex;
          align-items: center;
          height: 62px;
          gap: 24px;
        }

        /* ── Brand ── */
        .nav-brand {
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          font-family: 'Georgia', serif;
          font-size: 1.25rem;
          font-weight: 700;
          color: #fff;
          letter-spacing: 0.02em;
          flex-shrink: 0;
        }
        .nav-brand .brand-icon {
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, #c9a96e, #e8c98a);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          color: #0f0f0f;
        }
        .nav-brand:hover { color: #e8c98a; }

        /* ── Nav links ── */
        .nav-links {
          display: flex;
          align-items: center;
          gap: 4px;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .nav-links a {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          border-radius: 8px;
          font-size: 0.875rem;
          font-weight: 500;
          color: rgba(255,255,255,0.65);
          text-decoration: none;
          transition: color 0.18s, background 0.18s;
          white-space: nowrap;
        }
        .nav-links a:hover {
          color: #fff;
          background: rgba(255,255,255,0.06);
        }
        .nav-links a.active-link {
          color: #e8c98a;
        }

        /* ── Search ── */
        .nav-search {
          display: flex;
          align-items: center;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          overflow: hidden;
          transition: border-color 0.2s, background 0.2s;
          flex: 1;
          max-width: 280px;
        }
        .nav-search:focus-within {
          border-color: rgba(201,169,110,0.5);
          background: rgba(255,255,255,0.08);
        }
        .nav-search input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: #fff;
          font-size: 0.845rem;
          padding: 8px 12px;
        }
        .nav-search input::placeholder { color: rgba(255,255,255,0.35); }
        .nav-search button {
          background: transparent;
          border: none;
          padding: 8px 12px;
          color: rgba(255,255,255,0.45);
          cursor: pointer;
          transition: color 0.18s;
          display: flex;
          align-items: center;
        }
        .nav-search button:hover { color: #e8c98a; }

        /* ── Spacer ── */
        .nav-spacer { flex: 1; }

        /* ── Auth buttons (logged out) ── */
        .btn-ghost-nav {
          padding: 7px 16px;
          border-radius: 9px;
          font-size: 0.845rem;
          font-weight: 500;
          color: rgba(255,255,255,0.7);
          text-decoration: none;
          border: 1px solid transparent;
          transition: all 0.18s;
          white-space: nowrap;
        }
        .btn-ghost-nav:hover {
          color: #fff;
          border-color: rgba(255,255,255,0.15);
          background: rgba(255,255,255,0.05);
        }
        .btn-primary-nav {
          padding: 7px 18px;
          border-radius: 9px;
          font-size: 0.845rem;
          font-weight: 600;
          color: #0f0f0f;
          text-decoration: none;
          background: linear-gradient(135deg, #c9a96e, #e8c98a);
          border: none;
          transition: opacity 0.18s, transform 0.15s;
          white-space: nowrap;
        }
        .btn-primary-nav:hover {
          opacity: 0.9;
          transform: translateY(-1px);
          color: #0f0f0f;
        }

        /* ── Avatar / Profile dropdown ── */
        .profile-dropdown-wrapper {
          position: relative;
        }
        .avatar-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: linear-gradient(135deg, #c9a96e, #e8c98a);
          border: 2px solid rgba(201,169,110,0.3);
          color: #0f0f0f;
          font-size: 0.78rem;
          font-weight: 700;
          font-family: 'Georgia', serif;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: border-color 0.2s, transform 0.15s, box-shadow 0.2s;
          flex-shrink: 0;
          letter-spacing: 0.05em;
        }
        .avatar-btn:hover {
          border-color: rgba(201,169,110,0.7);
          transform: scale(1.05);
          box-shadow: 0 0 0 4px rgba(201,169,110,0.12);
        }
        .avatar-btn.open {
          border-color: #c9a96e;
          box-shadow: 0 0 0 4px rgba(201,169,110,0.18);
        }

        /* ── Dropdown panel ── */
        .profile-dropdown {
          position: absolute;
          top: calc(100% + 10px);
          right: 0;
          width: 220px;
          background: #1a1a1a;
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 14px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.55), 0 4px 16px rgba(0,0,0,0.3);
          overflow: hidden;
          animation: dropIn 0.18s ease;
          transform-origin: top right;
        }
        @keyframes dropIn {
          from { opacity: 0; transform: scale(0.93) translateY(-6px); }
          to   { opacity: 1; transform: scale(1)    translateY(0); }
        }

        .dropdown-user-info {
          padding: 14px 16px 12px;
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }
        .dropdown-user-info .user-name {
          font-size: 0.9rem;
          font-weight: 600;
          color: #fff;
          margin-bottom: 2px;
        }
        .dropdown-user-info .user-label {
          font-size: 0.74rem;
          color: rgba(255,255,255,0.35);
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .dropdown-menu-list {
          list-style: none;
          margin: 0;
          padding: 6px 0;
        }
        .dropdown-menu-list li a,
        .dropdown-menu-list li button {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          padding: 9px 16px;
          font-size: 0.845rem;
          color: rgba(255,255,255,0.7);
          text-decoration: none;
          background: transparent;
          border: none;
          cursor: pointer;
          text-align: left;
          transition: background 0.15s, color 0.15s;
          font-family: inherit;
        }
        .dropdown-menu-list li a:hover,
        .dropdown-menu-list li button:hover {
          background: rgba(255,255,255,0.06);
          color: #fff;
        }
        .dropdown-menu-list li a .menu-icon,
        .dropdown-menu-list li button .menu-icon {
          width: 30px;
          height: 30px;
          border-radius: 8px;
          background: rgba(255,255,255,0.06);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          flex-shrink: 0;
        }
        .dropdown-divider {
          height: 1px;
          background: rgba(255,255,255,0.07);
          margin: 4px 0;
        }
        .logout-item a,
        .logout-item button {
          color: #f87171 !important;
        }
        .logout-item a:hover,
        .logout-item button:hover {
          background: rgba(248,113,113,0.08) !important;
        }
        .logout-item .menu-icon {
          background: rgba(248,113,113,0.1) !important;
          color: #f87171;
        }

        /* ── Toggler (mobile) ── */
        .mobile-toggler {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 8px;
          padding: 6px 10px;
          color: #fff;
          cursor: pointer;
          display: none;
          align-items: center;
        }

        /* ── Offcanvas overrides ── */
        .offcanvas {
          background: #0f0f0f !important;
          border-right: 1px solid rgba(255,255,255,0.08) !important;
        }
        .offcanvas-title { color: #e8c98a !important; font-family: 'Georgia', serif; }
        .offcanvas .nav-link { color: rgba(255,255,255,0.7) !important; border-radius: 8px; }
        .offcanvas .nav-link:hover { color: #fff !important; background: rgba(255,255,255,0.05) !important; }
        .offcanvas .form-control {
          background: rgba(255,255,255,0.06) !important;
          border: 1px solid rgba(255,255,255,0.1) !important;
          color: #fff !important;
          border-radius: 8px 0 0 8px;
        }

        /* ── Responsive ── */
        @media (max-width: 991px) {
          .desktop-nav { display: none !important; }
          .mobile-toggler { display: flex !important; }
          .nav-brand { margin-left: 8px; }
        }
        @media (min-width: 992px) {
          .mobile-toggler { display: none !important; }
        }
      `}</style>

      {/* ── Offcanvas (mobile) ── */}
      <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
            <i className="fas fa-rings me-2"></i>WedInk
          </h5>
          <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" to="/listings" data-bs-dismiss="offcanvas">
                <i className="fas fa-home me-2"></i>Home
              </Link>
            </li>
            {curruser && (
              <li className="nav-item">
                <Link className="nav-link" to="/users/bookings" data-bs-dismiss="offcanvas">
                  <i className="fas fa-calendar-check me-2"></i>My Orders
                </Link>
              </li>
            )}
            {!curruser && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login" data-bs-dismiss="offcanvas">
                    <i className="fas fa-sign-in-alt me-2"></i>Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup" data-bs-dismiss="offcanvas">
                    <i className="fas fa-user-plus me-2"></i>Sign Up
                  </Link>
                </li>
              </>
            )}
            {curruser && (
              <li className="nav-item">
                <button className="nav-link btn btn-link" onClick={handleLogout} data-bs-dismiss="offcanvas">
                  <i className="fas fa-sign-out-alt me-2"></i>Logout
                </button>
              </li>
            )}
          </ul>
          <form onSubmit={handleSearch} className="mt-4">
            <div className="input-group">
              <input className="form-control" type="search" placeholder="Search shop..." value={search} onChange={(e) => setSearch(e.target.value)} />
              <button type="submit" style={{ padding: '8px 18px', background: 'linear-gradient(135deg,#c9a96e,#e8c98a)', color: '#0f0f0f', border: 'none', borderRadius: '0 8px 8px 0', cursor: 'pointer' }}>
                <i className="fas fa-search" style={{ fontSize: '13px' }}></i>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* ── Main Navbar ── */}
      <nav className="wedinknav">
        <div className="container">

          {/* Mobile toggler */}
          <button className="mobile-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
            <i className="fas fa-bars" style={{ fontSize: 15 }}></i>
          </button>

          {/* Brand */}
          <Link className="nav-brand" to="/">
            <span className="brand-icon"><i className="fa-regular fa-compass"></i></span>
            WedInk
          </Link>

          {/* Desktop nav */}
          <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', flex: 1, gap: 8 }}>
            <ul className="nav-links">
              <li><Link className="nav-link" to="/listings">Home</Link></li>
              {curruser && <li><Link className="nav-link" to="/users/bookings">My Orders</Link></li>}
            </ul>

            <div className="nav-spacer" />

            {/* Search */}
            <form onSubmit={handleSearch}>
              <div className="nav-search">
                <input type="search" placeholder="Search shop..." value={search} onChange={(e) => setSearch(e.target.value)} />
                <button type="submit"><i className="fas fa-search" style={{ fontSize: 13 }}></i></button>
              </div>
            </form>

            {/* Auth section */}
            {!curruser ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 8 }}>
                <Link className="btn-ghost-nav" to="/login">Login</Link>
                <Link className="btn-primary-nav" to="/signup">Sign Up</Link>
              </div>
            ) : (
              /* ── Profile Avatar Dropdown ── */
              <div className="profile-dropdown-wrapper" ref={dropdownRef} style={{ marginLeft: 12 }}>
                <button
                  className={`avatar-btn${dropdownOpen ? ' open' : ''}`}
                  onClick={() => setDropdownOpen((v) => !v)}
                  aria-label="Profile menu"
                >
                  {getInitials(curruser?.username || curruser?.name || curruser?.email)}
                </button>

                {dropdownOpen && (
                  <div className="profile-dropdown">
                    {/* User info */}
                    <div className="dropdown-user-info">
                      <div className="user-name">{curruser?.username || curruser?.name || 'User'}</div>
                      <div className="user-label">Member</div>
                    </div>

                    <ul className="dropdown-menu-list">
                      <li>
                        <Link to="/users/bookings" onClick={() => setDropdownOpen(false)}>
                          <span className="menu-icon"><i className="fas fa-calendar-check"></i></span>
                          My Orders
                        </Link>
                      </li>
                      <li>
                        <Link to="/profile" onClick={() => setDropdownOpen(false)}>
                          <span className="menu-icon"><i className="fas fa-user"></i></span>
                          Profile
                        </Link>
                      </li>

                      <div className="dropdown-divider"></div>

                      <li className="logout-item">
                        <button onClick={handleLogout}>
                          <span className="menu-icon"><i className="fas fa-sign-out-alt"></i></span>
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  )
}