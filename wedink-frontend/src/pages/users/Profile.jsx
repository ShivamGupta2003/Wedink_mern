import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useFlash } from '../../context/FlashContext'
import api from '../../services/api'
import Navbar from '../../components/Navbar'
import Layout from '../../components/Layout'

export default function Profile() {
    const { curruser } = useAuth()
    const { showError } = useFlash()
    const navigate = useNavigate()

    const [myShop, setMyShop] = useState(null)
    const [shopOrders, setShopOrders] = useState([])
    const [myBookings, setMyBookings] = useState([])
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState('overview')

    useEffect(() => {
        if (!curruser) { navigate('/login'); return }
        fetchAll()
    }, [curruser])

    const fetchAll = async () => {
        try {
            setLoading(true)
            const [listingsRes, bookingsRes] = await Promise.all([
                api.get('/listings'),
                api.get('/bookings/user'),
            ])
            const shop = listingsRes.data.existingListing || null
            setMyShop(shop)
            setMyBookings(bookingsRes.data.bookings || [])

            if (shop) {
                const ordersRes = await api.get(`/bookings/shop/${shop._id}/orders`)
                setShopOrders(ordersRes.data.bookings || [])
            }
        } catch {
            showError('Failed to load profile data.')
        } finally {
            setLoading(false)
        }
    }

    const getInitials = (name) =>
        (name || 'U').split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)

    const statusColor = (s) => {
        const map = { Pending: '#f59e0b', Confirmed: '#10b981', Cancelled: '#ef4444', Completed: '#6366f1' }
        return map[s] || '#94a3b8'
    }

    const statusBg = (s) => {
        const map = { Pending: 'rgba(245,158,11,0.12)', Confirmed: 'rgba(16,185,129,0.12)', Cancelled: 'rgba(239,68,68,0.12)', Completed: 'rgba(99,102,241,0.12)' }
        return map[s] || 'rgba(148,163,184,0.1)'
    }

    const tabs = [
        { id: 'overview', label: 'Overview', icon: 'fa-chart-pie' },
        { id: 'shop', label: myShop ? 'My Shop' : 'Open Shop', icon: 'fa-store' },
        { id: 'orders', label: 'My Orders', icon: 'fa-bag-shopping' },
    ]

    const pendingOrders = shopOrders.filter((o) => o.status === 'Pending').length
    const completedBookings = myBookings.filter((b) => b.status === 'Completed').length

    return (
        <>
            <Layout>
                <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

        .profile-root {
          min-height: 100vh;
          background: #080808;
          padding-top: 62px;
          font-family: 'DM Sans', sans-serif;
          color: #e2e2e2;
        }

        /* ── Hero ── */
        .profile-hero {
          position: relative;
          padding: 56px 0 0;
          overflow: hidden;
        }
        .hero-glow {
          position: absolute;
          top: -120px;
          left: 50%;
          transform: translateX(-50%);
          width: 700px;
          height: 500px;
          background: radial-gradient(ellipse, rgba(201,169,110,0.1) 0%, transparent 70%);
          pointer-events: none;
        }
        .hero-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(201,169,110,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,169,110,0.04) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
          mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
        }

        .profile-container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* ── Avatar section ── */
        .avatar-section {
          display: flex;
          align-items: flex-end;
          gap: 28px;
          padding-bottom: 28px;
          position: relative;
          z-index: 1;
        }
        .big-avatar {
          width: 96px;
          height: 96px;
          border-radius: 50%;
          background: linear-gradient(135deg, #c9a96e, #e8c98a);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.2rem;
          font-weight: 700;
          color: #080808;
          border: 3px solid rgba(201,169,110,0.25);
          box-shadow: 0 0 0 6px rgba(201,169,110,0.07), 0 20px 40px rgba(0,0,0,0.5);
          flex-shrink: 0;
          letter-spacing: 0.04em;
        }
        .avatar-meta { flex: 1; }
        .avatar-meta .display-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem;
          font-weight: 600;
          color: #fff;
          line-height: 1.1;
          letter-spacing: 0.01em;
        }
        .avatar-meta .display-email {
          font-size: 0.845rem;
          color: rgba(255,255,255,0.38);
          margin-top: 4px;
        }
        .avatar-meta .member-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-top: 10px;
          padding: 4px 12px;
          border-radius: 20px;
          background: rgba(201,169,110,0.1);
          border: 1px solid rgba(201,169,110,0.2);
          font-size: 0.74rem;
          font-weight: 500;
          color: #c9a96e;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        /* ── Tabs ── */
        .tabs-bar {
          border-top: 1px solid rgba(255,255,255,0.06);
          display: flex;
          gap: 0;
          position: relative;
          z-index: 1;
          margin-top: 4px;
        }
        .tab-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 14px 22px;
          background: transparent;
          border: none;
          border-bottom: 2px solid transparent;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.845rem;
          font-weight: 500;
          color: rgba(255,255,255,0.4);
          transition: color 0.18s, border-color 0.18s;
          margin-bottom: -1px;
          white-space: nowrap;
        }
        .tab-btn:hover { color: rgba(255,255,255,0.75); }
        .tab-btn.active {
          color: #e8c98a;
          border-bottom-color: #c9a96e;
        }
        .tab-btn i { font-size: 13px; }

        /* ── Content area ── */
        .profile-content {
          max-width: 1100px;
          margin: 0 auto;
          padding: 40px 24px 80px;
        }

        /* ── Stat cards ── */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          margin-bottom: 36px;
        }
        .stat-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 22px 24px;
          position: relative;
          overflow: hidden;
          transition: border-color 0.2s, background 0.2s;
        }
        .stat-card:hover {
          border-color: rgba(201,169,110,0.2);
          background: rgba(255,255,255,0.045);
        }
        .stat-card .stat-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: rgba(201,169,110,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 15px;
          color: #c9a96e;
          margin-bottom: 14px;
        }
        .stat-card .stat-number {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.4rem;
          font-weight: 600;
          color: #fff;
          line-height: 1;
        }
        .stat-card .stat-label {
          font-size: 0.78rem;
          color: rgba(255,255,255,0.4);
          margin-top: 4px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .stat-card .stat-accent {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(201,169,110,0.08), transparent 70%);
          transform: translate(30%, 30%);
        }

        /* ── Section headers ── */
        .section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }
        .section-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.4rem;
          font-weight: 600;
          color: #fff;
          letter-spacing: 0.01em;
        }
        .section-title span {
          font-size: 0.8rem;
          font-family: 'DM Sans', sans-serif;
          font-weight: 400;
          color: rgba(255,255,255,0.3);
          margin-left: 10px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        /* ── Shop card ── */
        .shop-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px;
          overflow: hidden;
          transition: border-color 0.2s;
        }
        .shop-card:hover { border-color: rgba(201,169,110,0.25); }
        .shop-card-inner {
          display: flex;
          gap: 0;
          align-items: stretch;
        }
        .shop-image-wrap {
          width: 200px;
          flex-shrink: 0;
          overflow: hidden;
          position: relative;
        }
        .shop-image-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .shop-image-placeholder {
          width: 100%;
          height: 100%;
          min-height: 160px;
          background: linear-gradient(135deg, #1a1a1a, #222);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.5rem;
          color: rgba(201,169,110,0.3);
        }
        .shop-info {
          flex: 1;
          padding: 28px 30px;
        }
        .shop-name-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 8px;
        }
        .shop-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.6rem;
          font-weight: 600;
          color: #fff;
        }
        .owner-badge {
          padding: 3px 10px;
          border-radius: 6px;
          background: rgba(201,169,110,0.1);
          border: 1px solid rgba(201,169,110,0.2);
          font-size: 0.7rem;
          color: #c9a96e;
          font-weight: 600;
          letter-spacing: 0.07em;
          text-transform: uppercase;
        }
        .shop-desc {
          font-size: 0.875rem;
          color: rgba(255,255,255,0.4);
          line-height: 1.6;
          margin-bottom: 20px;
          max-width: 480px;
        }
        .shop-meta-row {
          display: flex;
          gap: 24px;
          flex-wrap: wrap;
        }
        .shop-meta-item {
          display: flex;
          align-items: center;
          gap: 7px;
          font-size: 0.82rem;
          color: rgba(255,255,255,0.45);
        }
        .shop-meta-item i { color: #c9a96e; font-size: 12px; }
        .shop-actions {
          display: flex;
          gap: 10px;
          margin-top: 20px;
        }

        /* ── No shop CTA ── */
        .no-shop-card {
          background: rgba(255,255,255,0.02);
          border: 1px dashed rgba(201,169,110,0.2);
          border-radius: 20px;
          padding: 52px 40px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .no-shop-card .cta-icon {
          width: 72px;
          height: 72px;
          margin: 0 auto 20px;
          border-radius: 20px;
          background: rgba(201,169,110,0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 26px;
          color: #c9a96e;
          border: 1px solid rgba(201,169,110,0.15);
        }
        .no-shop-card h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.6rem;
          font-weight: 600;
          color: #fff;
          margin-bottom: 8px;
        }
        .no-shop-card p {
          font-size: 0.875rem;
          color: rgba(255,255,255,0.38);
          max-width: 380px;
          margin: 0 auto 28px;
          line-height: 1.65;
        }

        /* ── Order / Booking table ── */
        .orders-list { display: flex; flex-direction: column; gap: 12px; }
        .order-row {
          display: flex;
          align-items: center;
          gap: 16px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 14px;
          padding: 16px 20px;
          transition: border-color 0.18s, background 0.18s;
        }
        .order-row:hover {
          border-color: rgba(201,169,110,0.15);
          background: rgba(255,255,255,0.045);
        }
        .order-thumb {
          width: 52px;
          height: 52px;
          border-radius: 10px;
          object-fit: cover;
          flex-shrink: 0;
          background: #1a1a1a;
        }
        .order-thumb-placeholder {
          width: 52px;
          height: 52px;
          border-radius: 10px;
          background: rgba(201,169,110,0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(201,169,110,0.4);
          font-size: 18px;
          flex-shrink: 0;
        }
        .order-info { flex: 1; min-width: 0; }
        .order-card-name {
          font-size: 0.9rem;
          font-weight: 500;
          color: #fff;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .order-shop-name {
          font-size: 0.78rem;
          color: rgba(255,255,255,0.35);
          margin-top: 3px;
        }
        .order-qty {
          font-size: 0.78rem;
          color: rgba(255,255,255,0.3);
          margin-top: 2px;
        }
        .order-meta { text-align: right; flex-shrink: 0; }
        .status-pill {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        .order-date {
          font-size: 0.73rem;
          color: rgba(255,255,255,0.25);
          margin-top: 5px;
        }

        /* ── Empty states ── */
        .empty-state {
          text-align: center;
          padding: 56px 20px;
          color: rgba(255,255,255,0.25);
        }
        .empty-state i { font-size: 2.5rem; margin-bottom: 14px; display: block; color: rgba(201,169,110,0.2); }
        .empty-state p { font-size: 0.875rem; }

        /* ── Buttons ── */
        .btn-gold {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 22px;
          background: linear-gradient(135deg, #c9a96e, #e8c98a);
          color: #080808;
          font-weight: 600;
          font-size: 0.845rem;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          text-decoration: none;
          transition: opacity 0.18s, transform 0.15s;
          font-family: 'DM Sans', sans-serif;
        }
        .btn-gold:hover { opacity: 0.88; transform: translateY(-1px); color: #080808; }
        .btn-outline-gold {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 9px 20px;
          background: transparent;
          color: #c9a96e;
          font-weight: 500;
          font-size: 0.845rem;
          border-radius: 10px;
          border: 1px solid rgba(201,169,110,0.3);
          cursor: pointer;
          text-decoration: none;
          transition: all 0.18s;
          font-family: 'DM Sans', sans-serif;
        }
        .btn-outline-gold:hover {
          background: rgba(201,169,110,0.07);
          border-color: rgba(201,169,110,0.55);
          color: #e8c98a;
        }

        /* ── Loading ── */
        .profile-loading {
          min-height: 60vh;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 14px;
          color: rgba(255,255,255,0.25);
          font-size: 0.875rem;
        }
        .spinner {
          width: 40px;
          height: 40px;
          border: 2px solid rgba(201,169,110,0.15);
          border-top-color: #c9a96e;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* ── Divider ── */
        .gold-divider {
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(201,169,110,0.25), transparent);
          margin: 32px 0;
        }

        /* ── Two col layout for overview ── */
        .overview-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }
        @media (max-width: 768px) {
          .overview-grid { grid-template-columns: 1fr; }
          .shop-card-inner { flex-direction: column; }
          .shop-image-wrap { width: 100%; height: 160px; }
        }

        /* ── Recent item compact ── */
        .recent-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .recent-item:last-child { border-bottom: none; }
        .recent-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .recent-text { flex: 1; font-size: 0.835rem; color: rgba(255,255,255,0.6); }
        .recent-badge {
          font-size: 0.7rem;
          padding: 2px 9px;
          border-radius: 20px;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .panel-card {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 18px;
          padding: 24px;
        }
      `}</style>

                <div className="profile-root">
                    {loading ? (
                        <div className="profile-loading">
                            <div className="spinner" />
                            <span>Loading profile…</span>
                        </div>
                    ) : (
                        <>
                            {/* ── Hero ── */}
                            <div className="profile-hero">
                                <div className="hero-glow" />
                                <div className="hero-grid" />
                                <div className="profile-container">
                                    <div className="avatar-section">
                                        <div className="big-avatar">
                                            {getInitials(curruser?.username || curruser?.name || curruser?.email)}
                                        </div>
                                        <div className="avatar-meta">
                                            <div className="display-name">
                                                {curruser?.username || curruser?.name || 'Member'}
                                            </div>
                                            <div className="display-email">{curruser?.email}</div>
                                            <div className="member-badge">
                                                <i className="fas fa-crown" style={{ fontSize: 10 }}></i>
                                                {myShop ? 'Shop Owner · Customer' : 'WedInk Member'}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Tabs */}
                                    <div className="tabs-bar">
                                        {tabs.map((t) => (
                                            <button
                                                key={t.id}
                                                className={`tab-btn${activeTab === t.id ? ' active' : ''}`}
                                                onClick={() => setActiveTab(t.id)}
                                            >
                                                <i className={`fas ${t.icon}`}></i>
                                                {t.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* ── Tab Content ── */}
                            <div className="profile-content">

                                {/* ════ OVERVIEW TAB ════ */}
                                {activeTab === 'overview' && (
                                    <>
                                        {/* Stats */}
                                        <div className="stats-grid">
                                            <div className="stat-card">
                                                <div className="stat-icon"><i className="fas fa-bag-shopping"></i></div>
                                                <div className="stat-number">{myBookings.length}</div>
                                                <div className="stat-label">Total Orders Placed</div>
                                                <div className="stat-accent" />
                                            </div>
                                            <div className="stat-card">
                                                <div className="stat-icon"><i className="fas fa-circle-check"></i></div>
                                                <div className="stat-number">{completedBookings}</div>
                                                <div className="stat-label">Completed Orders</div>
                                                <div className="stat-accent" />
                                            </div>
                                            {myShop && (
                                                <>
                                                    <div className="stat-card">
                                                        <div className="stat-icon"><i className="fas fa-store"></i></div>
                                                        <div className="stat-number">{shopOrders.length}</div>
                                                        <div className="stat-label">Shop Orders Received</div>
                                                        <div className="stat-accent" />
                                                    </div>
                                                    <div className="stat-card">
                                                        <div className="stat-icon"><i className="fas fa-clock"></i></div>
                                                        <div className="stat-number">{pendingOrders}</div>
                                                        <div className="stat-label">Pending Shop Orders</div>
                                                        <div className="stat-accent" />
                                                    </div>
                                                </>
                                            )}
                                            {!myShop && (
                                                <div className="stat-card">
                                                    <div className="stat-icon"><i className="fas fa-store"></i></div>
                                                    <div className="stat-number" style={{ fontSize: '1.3rem', color: 'rgba(255,255,255,0.25)' }}>—</div>
                                                    <div className="stat-label">No Shop Yet</div>
                                                    <div className="stat-accent" />
                                                </div>
                                            )}
                                        </div>

                                        <div className="overview-grid">
                                            {/* Recent Orders */}
                                            <div className="panel-card">
                                                <div className="section-header" style={{ marginBottom: 16 }}>
                                                    <div className="section-title">
                                                        Recent Orders <span>Customer</span>
                                                    </div>
                                                    {myBookings.length > 0 && (
                                                        <button className="btn-outline-gold" style={{ padding: '5px 14px', fontSize: '0.78rem' }} onClick={() => setActiveTab('orders')}>
                                                            View All
                                                        </button>
                                                    )}
                                                </div>
                                                {myBookings.length === 0 ? (
                                                    <div className="empty-state" style={{ padding: '28px 0' }}>
                                                        <i className="fas fa-inbox"></i>
                                                        <p>No orders yet</p>
                                                    </div>
                                                ) : (
                                                    myBookings.slice(0, 4).map((b) => (
                                                        <div className="recent-item" key={b._id}>
                                                            <div className="recent-dot" style={{ background: statusColor(b.status) }} />
                                                            <div className="recent-text">
                                                                {b.marriageCard?.title || 'Card'} — {b.shop?.shopName || 'Shop'}
                                                            </div>
                                                            <div className="recent-badge" style={{ background: statusBg(b.status), color: statusColor(b.status) }}>
                                                                {b.status}
                                                            </div>
                                                        </div>
                                                    ))
                                                )}
                                            </div>

                                            {/* Shop summary */}
                                            <div className="panel-card">
                                                <div className="section-title" style={{ marginBottom: 16 }}>
                                                    {myShop ? <>Shop Summary <span>Owner</span></> : <>Start Selling</>}
                                                </div>
                                                {myShop ? (
                                                    <>
                                                        <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 16 }}>
                                                            {myShop.image?.url
                                                                ? <img src={myShop.image.url} alt="shop" style={{ width: 56, height: 56, borderRadius: 10, objectFit: 'cover', flexShrink: 0 }} />
                                                                : <div style={{ width: 56, height: 56, borderRadius: 10, background: 'rgba(201,169,110,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c9a96e', fontSize: 20 }}><i className="fas fa-store" /></div>
                                                            }
                                                            <div>
                                                                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', color: '#fff', fontWeight: 600 }}>{myShop.shopName}</div>
                                                                <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>{myShop.location || 'No location set'}</div>
                                                            </div>
                                                        </div>
                                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                                                            {[
                                                                { label: 'Total Orders', val: shopOrders.length, icon: 'fa-list-check' },
                                                                { label: 'Pending', val: pendingOrders, icon: 'fa-clock' },
                                                            ].map((s) => (
                                                                <div key={s.label} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 10, padding: '12px 14px', border: '1px solid rgba(255,255,255,0.06)' }}>
                                                                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', color: '#fff', fontWeight: 600 }}>{s.val}</div>
                                                                    <div style={{ fontSize: '0.73rem', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.label}</div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                        <div style={{ display: 'flex', gap: 10 }}>
                                                            <Link className="btn-outline-gold" to={`/listings/${myShop._id}`} style={{ fontSize: '0.8rem', padding: '7px 14px' }}>
                                                                <i className="fas fa-eye" style={{ fontSize: 11 }}></i> View Shop
                                                            </Link>
                                                            <Link className="btn-outline-gold" to={`/listings/${myShop._id}/orders`} style={{ fontSize: '0.8rem', padding: '7px 14px' }}>
                                                                <i className="fas fa-list-check" style={{ fontSize: 11 }}></i> All Orders
                                                            </Link>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <div style={{ textAlign: 'center', padding: '20px 0 4px' }}>
                                                        <div style={{ fontSize: '2rem', color: 'rgba(201,169,110,0.25)', marginBottom: 10 }}><i className="fas fa-store" /></div>
                                                        <p style={{ fontSize: '0.84rem', color: 'rgba(255,255,255,0.35)', marginBottom: 20, lineHeight: 1.6 }}>
                                                            Register your marriage card shop and start receiving orders from customers.
                                                        </p>
                                                        <Link className="btn-gold" to="/listings/new">
                                                            <i className="fas fa-plus" style={{ fontSize: 12 }}></i>
                                                            Open My Shop
                                                        </Link>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </>
                                )}

                                {/* ════ SHOP TAB ════ */}
                                {activeTab === 'shop' && (
                                    <>
                                        {myShop ? (
                                            <>
                                                <div className="section-header">
                                                    <div className="section-title">My Shop</div>
                                                    <div style={{ display: 'flex', gap: 10 }}>
                                                        <Link className="btn-outline-gold" to={`/listings/${myShop._id}/edit`}>
                                                            <i className="fas fa-pen" style={{ fontSize: 12 }}></i> Edit Shop
                                                        </Link>
                                                        <Link className="btn-gold" to={`/listings/${myShop._id}`}>
                                                            <i className="fas fa-arrow-up-right-from-square" style={{ fontSize: 11 }}></i>
                                                            View Public Page
                                                        </Link>
                                                    </div>
                                                </div>

                                                <div className="shop-card" style={{ marginBottom: 32 }}>
                                                    <div className="shop-card-inner">
                                                        <div className="shop-image-wrap">
                                                            {myShop.image?.url
                                                                ? <img src={myShop.image.url} alt={myShop.shopName} />
                                                                : <div className="shop-image-placeholder"><i className="fas fa-store" /></div>
                                                            }
                                                        </div>
                                                        <div className="shop-info">
                                                            <div className="shop-name-row">
                                                                <div className="shop-name">{myShop.shopName}</div>
                                                                <span className="owner-badge">Owner</span>
                                                            </div>
                                                            <div className="shop-desc">{myShop.description || 'No description provided.'}</div>
                                                            <div className="shop-meta-row">
                                                                {myShop.location && <div className="shop-meta-item"><i className="fas fa-location-dot"></i>{myShop.location}</div>}
                                                                {myShop.phone && <div className="shop-meta-item"><i className="fas fa-phone"></i>{myShop.phone}</div>}
                                                                <div className="shop-meta-item"><i className="fas fa-boxes-stacked"></i>{myShop.marriageCards?.length || 0} Cards Listed</div>
                                                                <div className="shop-meta-item"><i className="fas fa-star"></i>{myShop.reviews?.length || 0} Reviews</div>
                                                            </div>
                                                            <div className="shop-actions">
                                                                <Link className="btn-gold" to={`/listings/${myShop._id}/Mcard/new`}>
                                                                    <i className="fas fa-plus" style={{ fontSize: 12 }}></i>
                                                                    Add New Card
                                                                </Link>
                                                                <Link className="btn-outline-gold" to={`/listings/${myShop._id}/Mcard`}>
                                                                    <i className="fas fa-layer-group" style={{ fontSize: 12 }}></i>
                                                                    Manage Cards
                                                                </Link>
                                                                <Link className="btn-outline-gold" to={`/listings/${myShop._id}/orders`}>
                                                                    <i className="fas fa-list-check" style={{ fontSize: 12 }}></i>
                                                                    View Orders
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Recent shop orders */}
                                                <div className="section-header">
                                                    <div className="section-title">Recent Shop Orders <span>{shopOrders.length} total</span></div>
                                                    {shopOrders.length > 0 && (
                                                        <Link className="btn-outline-gold" to={`/listings/${myShop._id}/orders`} style={{ fontSize: '0.8rem', padding: '7px 14px' }}>
                                                            Manage All
                                                        </Link>
                                                    )}
                                                </div>

                                                {shopOrders.length === 0 ? (
                                                    <div className="empty-state">
                                                        <i className="fas fa-inbox"></i>
                                                        <p>No orders received yet. Share your shop to get started.</p>
                                                    </div>
                                                ) : (
                                                    <div className="orders-list">
                                                        {shopOrders.slice(0, 6).map((b) => (
                                                            <div className="order-row" key={b._id}>
                                                                {b.marriageCard?.image?.url
                                                                    ? <img src={b.marriageCard.image.url} alt="card" className="order-thumb" />
                                                                    : <div className="order-thumb-placeholder"><i className="fas fa-envelope-open-text" /></div>
                                                                }
                                                                <div className="order-info">
                                                                    <div className="order-card-name">{b.marriageCard?.title || 'Marriage Card'}</div>
                                                                    <div className="order-shop-name">
                                                                        <i className="fas fa-user" style={{ fontSize: 10, marginRight: 4, color: 'rgba(201,169,110,0.5)' }}></i>
                                                                        {b.user?.username || 'Customer'} · {b.phoneNumber}
                                                                    </div>
                                                                    <div className="order-qty">Qty: {b.quantity}</div>
                                                                </div>
                                                                <div className="order-meta">
                                                                    <div className="status-pill" style={{ background: statusBg(b.status), color: statusColor(b.status) }}>
                                                                        {b.status}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </>
                                        ) : (
                                            <div className="no-shop-card">
                                                <div className="cta-icon"><i className="fas fa-store"></i></div>
                                                <h3>Launch Your Card Shop</h3>
                                                <p>
                                                    Join WedInk as a shop owner. List your marriage card designs, manage bookings,
                                                    and reach customers planning their special day.
                                                </p>
                                                <Link className="btn-gold" to="/listings/new" style={{ margin: '0 auto', display: 'inline-flex' }}>
                                                    <i className="fas fa-plus" style={{ fontSize: 12 }}></i>
                                                    Register My Shop — It's Free
                                                </Link>
                                                <div style={{ marginTop: 36, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, maxWidth: 480, marginInline: 'auto', textAlign: 'left' }}>
                                                    {[
                                                        { icon: 'fa-image', t: 'Upload Cards', d: 'Showcase your designs with beautiful images' },
                                                        { icon: 'fa-calendar-check', t: 'Manage Orders', d: 'Accept and track customer bookings easily' },
                                                        { icon: 'fa-star', t: 'Earn Reviews', d: 'Build trust through customer testimonials' },
                                                    ].map((f) => (
                                                        <div key={f.t} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 12, padding: '16px 14px', border: '1px solid rgba(255,255,255,0.06)' }}>
                                                            <div style={{ color: '#c9a96e', fontSize: 16, marginBottom: 8 }}><i className={`fas ${f.icon}`} /></div>
                                                            <div style={{ fontSize: '0.82rem', color: '#fff', fontWeight: 600, marginBottom: 4 }}>{f.t}</div>
                                                            <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)', lineHeight: 1.5 }}>{f.d}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}

                                {/* ════ MY ORDERS TAB ════ */}
                                {activeTab === 'orders' && (
                                    <>
                                        <div className="section-header">
                                            <div className="section-title">
                                                My Orders <span>{myBookings.length} total</span>
                                            </div>
                                        </div>

                                        {myBookings.length === 0 ? (
                                            <div className="empty-state">
                                                <i className="fas fa-bag-shopping"></i>
                                                <p>You haven't placed any orders yet.</p>
                                                <Link className="btn-gold" to="/listings" style={{ marginTop: 16, display: 'inline-flex' }}>
                                                    <i className="fas fa-magnifying-glass" style={{ fontSize: 12 }}></i>
                                                    Browse Shops
                                                </Link>
                                            </div>
                                        ) : (
                                            <div className="orders-list">
                                                {myBookings.map((b) => (
                                                    <div className="order-row" key={b._id}>
                                                        {b.marriageCard?.image?.url
                                                            ? <img src={b.marriageCard.image.url} alt="card" className="order-thumb" />
                                                            : <div className="order-thumb-placeholder"><i className="fas fa-envelope-open-text" /></div>
                                                        }
                                                        <div className="order-info">
                                                            <div className="order-card-name">{b.marriageCard?.title || 'Marriage Card'}</div>
                                                            <div className="order-shop-name">
                                                                <i className="fas fa-store" style={{ fontSize: 10, marginRight: 4, color: 'rgba(201,169,110,0.5)' }}></i>
                                                                {b.shop?.shopName || 'Shop'}
                                                            </div>
                                                            <div className="order-qty">Qty: {b.quantity} · {b.phoneNumber}</div>
                                                            {b.customization && (
                                                                <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.28)', marginTop: 2 }}>
                                                                    Note: {b.customization}
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="order-meta">
                                                            <div className="status-pill" style={{ background: statusBg(b.status), color: statusColor(b.status) }}>
                                                                {b.status}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </Layout>
        </>
    )
}