// import { useEffect, useRef } from 'react'
// import { useNavigate } from 'react-router-dom'
// import Navbar from '../../components/Navbar'
// import Footer from '../../components/Footer'

// export default function FrontPage() {
//   const navigate = useNavigate()
//   const textRef = useRef(null)
//   const timerRef = useRef(null)

//   useEffect(() => {
//     const text = 'WedInk'
//     const el = textRef.current
//     if (!el) return
//     let index = 0
//     el.innerHTML = ''
//     function showLetter() {
//       if (index < text.length) {
//         el.innerHTML += text[index]
//         index++
//         timerRef.current = setTimeout(showLetter, 400)
//       } else {
//         timerRef.current = setTimeout(() => { el.innerHTML = ''; index = 0; showLetter() }, 6000)
//       }
//     }
//     showLetter()
//     return () => clearTimeout(timerRef.current)
//   }, [])

//   return (
//     <>
//       <style>{`
//         .video-section { position:relative; width:100%; height:100vh; overflow:hidden; }
//         .video-container { position:absolute; top:0; left:0; width:100%; height:100%; overflow:hidden; background-color:rgba(0,0,0,0.6) !important; }
//         .video-container video { position:absolute; top:50%; left:50%; min-width:100%; min-height:100%; width:auto; height:auto; transform:translate(-50%,-50%); object-fit:cover; z-index:-1; }
//         .front-content { position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); text-align:center; color:white; z-index:1; width:90%; }
//         .front-content h1 { font-size:5rem !important; }
//         .front-content p { font-size:1.2rem; }
//         @media(max-width:912px) { .front-content h1{font-size:4rem!important;margin-bottom:.6rem!important;} .front-content p{font-size:0.7rem!important;} }
//         @media(min-width:320px) and (max-width:941px) { .front-content h1{font-size:4.5rem;} .front-content p{font-size:0.8rem;} }
//         .roundess { border-radius:90%!important; }
//         @keyframes fadeBounce { 0%{opacity:0;transform:translateY(-30px);} 50%{opacity:.5;transform:translateY(10px);} 100%{opacity:1;transform:translateY(0);} }
//         .animated-text { color:skyblue!important; text-decoration:underline!important; font-size:5rem!important; animation:fadeBounce 1.5s ease-in-out forwards; }
//         @media(max-width:768px) { .animated-text{font-size:3.5rem!important;} }
//         @keyframes popAnimation { 0%{transform:scale(1);} 50%{transform:scale(1.1);} 100%{transform:scale(1);} }
//         .pop-button { transition:transform .2s ease,box-shadow .2s ease; animation:popAnimation 1.5s infinite ease-in-out; }
//         .pop-button:hover { transform:scale(1.15); box-shadow:0px 8px 20px rgba(0,0,0,.3); }
//         .pop-button:active { transform:scale(.9); }
//       `}</style>
//       <Navbar />
//       <section className="video-section">
//         <div className="video-container">
//           <video autoPlay loop muted playsInline>
//             <source src="/images/8551791-uhd_3840_2160_25fps.mp4" type="video/mp4" />
//           </video>
//         </div>
//         <div className="front-content">
//           <h1 ref={textRef} className="animated-text">WedInk</h1>
//           <p>Ultimate destination for creating custom celebration cards online! Whether it's a wedding, birthday, or any special occasion, we help you design unique and personalized cards to suit your event perfectly</p>
//           <button className="btn btn-primary btn-lg roundess pop-button mt-3" onClick={() => navigate('/listings')}>
//             Explore
//           </button>
//         </div>
//       </section>
//       <div className="foor"><Footer /></div>
//     </>
//   )
// }
import { useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export default function FrontPage() {
  const navigate = useNavigate()
  const typedRef = useRef(null)
  const timerRef = useRef(null)

  useEffect(() => {
    const text = 'WedInk'
    const el = typedRef.current
    if (!el) return
    let i = 0
    el.textContent = ''

    function type() {
      if (i < text.length) {
        el.textContent += text[i++]
        timerRef.current = setTimeout(type, 380)
      } else {
        timerRef.current = setTimeout(() => { el.textContent = ''; i = 0; type() }, 5500)
      }
    }
    timerRef.current = setTimeout(type, 800)
    return () => clearTimeout(timerRef.current)
  }, [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');

        .fp-root {
          font-family: 'DM Sans', sans-serif;
          background: #080808;
          color: #e2e2e2;
        }

        /* ── HERO ── */
        .fp-hero {
          position: relative;
          width: 100%;
          height: 100vh;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Video + overlays */
        .fp-video-wrap {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
        .fp-video-wrap::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(8,8,8,0.55) 0%,
            rgba(8,8,8,0.35) 40%,
            rgba(8,8,8,0.65) 75%,
            rgba(8,8,8,0.98) 100%
          );
          z-index: 1;
        }
        .fp-video-wrap video {
          position: absolute;
          top: 50%; left: 50%;
          min-width: 100%; min-height: 100%;
          width: auto; height: auto;
          transform: translate(-50%, -50%);
          object-fit: cover;
          z-index: 0;
        }

        /* Grid */
        .fp-grid {
          position: absolute;
          inset: 0;
          z-index: 2;
          background-image:
            linear-gradient(rgba(201,169,110,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,169,110,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 80% 80% at center, black 30%, transparent 80%);
          pointer-events: none;
        }

        /* Central glow */
        .fp-glow {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -55%);
          width: 800px; height: 600px;
          background: radial-gradient(ellipse, rgba(201,169,110,0.12) 0%, transparent 65%);
          z-index: 2;
          pointer-events: none;
          animation: fpPulse 4s ease-in-out infinite alternate;
        }
        @keyframes fpPulse {
          0% { opacity: 0.7; transform: translate(-50%,-55%) scale(1); }
          100% { opacity: 1; transform: translate(-50%,-55%) scale(1.08); }
        }

        /* Floating orbs */
        .fp-orb {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(201,169,110,0.15), transparent 70%);
          pointer-events: none;
          z-index: 2;
          animation: fpFloat linear infinite;
        }
        .fp-orb-1 { width: 300px; height: 300px; top: 10%; left: -80px; animation-duration: 20s; }
        .fp-orb-2 { width: 200px; height: 200px; top: 30%; right: -60px; animation-duration: 15s; animation-delay: -5s; }
        .fp-orb-3 { width: 150px; height: 150px; bottom: 20%; left: 15%; animation-duration: 18s; animation-delay: -8s; }
        @keyframes fpFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-30px); }
        }

        /* Decorative corners */
        .fp-corner {
          position: absolute;
          z-index: 3;
          pointer-events: none;
          width: 40px; height: 40px;
          border-color: rgba(201,169,110,0.25);
          border-style: solid;
        }
        .fp-corner-tl { top: 80px; left: 32px; border-width: 1px 0 0 1px; }
        .fp-corner-tr { top: 80px; right: 32px; border-width: 1px 1px 0 0; }
        .fp-corner-bl { bottom: 80px; left: 32px; border-width: 0 0 1px 1px; }
        .fp-corner-br { bottom: 80px; right: 32px; border-width: 0 1px 1px 0; }

        /* ── CONTENT ── */
        .fp-content {
          position: relative;
          z-index: 10;
          text-align: center;
          padding: 0 24px;
          max-width: 860px;
        }

        .fp-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 28px;
          padding: 6px 18px;
          border-radius: 30px;
          background: rgba(201,169,110,0.08);
          border: 1px solid rgba(201,169,110,0.18);
          font-size: 0.72rem;
          font-weight: 600;
          color: #c9a96e;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          animation: fpFadeUp 0.8s ease 0.2s both;
        }
        .fp-eyebrow-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #c9a96e;
          animation: fpBlink 2s ease-in-out infinite;
        }
        @keyframes fpBlink { 0%,100%{opacity:1;} 50%{opacity:0.3;} }

        .fp-tagline {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.2rem, 5vw, 4rem);
          font-weight: 300;
          font-style: italic;
          color: rgba(255,255,255,0.55);
          line-height: 1;
          animation: fpFadeUp 0.9s ease 0.35s both;
        }

        .fp-brand-line {
          display: block;
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(4rem, 11vw, 9.5rem);
          font-weight: 600;
          letter-spacing: 0.02em;
          color: #e8c98a;
          line-height: 1;
          animation: fpFadeUp 0.9s ease 0.45s both;
        }
        .fp-brand-line::after {
          content: '|';
          color: #c9a96e;
          animation: fpBlink 0.8s step-end infinite;
          font-weight: 300;
          margin-left: 2px;
        }

        .fp-subtitle {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1rem, 2.5vw, 1.4rem);
          font-weight: 300;
          font-style: italic;
          color: rgba(255,255,255,0.4);
          margin: 10px 0 32px;
          letter-spacing: 0.06em;
          animation: fpFadeUp 0.9s ease 0.55s both;
        }

        .fp-desc {
          font-size: clamp(0.82rem, 1.5vw, 0.95rem);
          color: rgba(255,255,255,0.35);
          max-width: 500px;
          margin: 0 auto 44px;
          line-height: 1.85;
          font-weight: 300;
          animation: fpFadeUp 0.9s ease 0.65s both;
        }

        .fp-actions {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          flex-wrap: wrap;
          animation: fpFadeUp 0.9s ease 0.75s both;
        }

        .fp-btn-gold {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 36px;
          background: linear-gradient(135deg, #c9a96e, #e8c98a);
          color: #080808;
          font-weight: 600;
          font-size: 0.9rem;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          letter-spacing: 0.04em;
          position: relative;
          overflow: hidden;
          transition: all 0.25s;
          animation: fpGoldPulse 3s ease-in-out infinite;
        }
        @keyframes fpGoldPulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(201,169,110,0.3); }
          50% { box-shadow: 0 0 24px 6px rgba(201,169,110,0.15); }
        }
        .fp-btn-gold::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent);
          transition: left 0.5s;
        }
        .fp-btn-gold:hover::before { left: 100%; }
        .fp-btn-gold:hover { transform: translateY(-2px); opacity: 0.9; }

        .fp-btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 13px 30px;
          background: transparent;
          color: rgba(255,255,255,0.55);
          font-size: 0.875rem;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.1);
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-weight: 400;
          transition: all 0.22s;
          text-decoration: none;
        }
        .fp-btn-ghost:hover {
          border-color: rgba(201,169,110,0.35);
          color: #c9a96e;
          background: rgba(201,169,110,0.04);
        }

        /* ── STATS BAR ── */
        .fp-stats {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          z-index: 10;
          display: flex;
          align-items: stretch;
          border-top: 1px solid rgba(201,169,110,0.1);
          background: rgba(8,8,8,0.85);
          backdrop-filter: blur(20px);
          animation: fpFadeUp 1s ease 1s both;
        }
        .fp-stat {
          flex: 1;
          padding: 20px 28px;
          text-align: center;
          position: relative;
        }
        .fp-stat:not(:last-child)::after {
          content: '';
          position: absolute;
          right: 0; top: 20%; bottom: 20%;
          width: 1px;
          background: rgba(201,169,110,0.12);
        }
        .fp-stat-val {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem;
          font-weight: 600;
          color: #fff;
          line-height: 1;
        }
        .fp-stat-val.gold { color: #e8c98a; }
        .fp-stat-lbl {
          font-size: 0.68rem;
          color: rgba(255,255,255,0.28);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-top: 4px;
        }

        /* ── SCROLL HINT ── */
        .fp-scroll {
          position: absolute;
          bottom: 90px; left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          animation: fpFadeUp 1s ease 1.2s both;
        }
        .fp-scroll span {
          font-size: 0.6rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.18);
        }
        .fp-scroll-line {
          width: 1px; height: 38px;
          background: linear-gradient(to bottom, rgba(201,169,110,0.5), transparent);
          animation: fpScrollAnim 2s ease-in-out infinite;
        }
        @keyframes fpScrollAnim {
          0% { transform: scaleY(0); transform-origin: top; }
          50% { transform: scaleY(1); transform-origin: top; }
          51% { transform: scaleY(1); transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; }
        }

        @keyframes fpFadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 600px) {
          .fp-stat { padding: 14px 12px; }
          .fp-stat-val { font-size: 1.5rem; }
          .fp-corner-tl, .fp-corner-tr { top: 70px; }
        }
      `}</style>

      <Navbar />

      <div className="fp-root">
        <section className="fp-hero">
          {/* Video background */}
          <div className="fp-video-wrap">
            <video autoPlay loop muted playsInline>
              <source src="/images/8551791-uhd_3840_2160_25fps.mp4" type="video/mp4" />
            </video>
          </div>

          {/* Atmosphere layers */}
          <div className="fp-grid" />
          <div className="fp-glow" />
          <div className="fp-orb fp-orb-1" />
          <div className="fp-orb fp-orb-2" />
          <div className="fp-orb fp-orb-3" />

          {/* Decorative corners */}
          <div className="fp-corner fp-corner-tl" />
          <div className="fp-corner fp-corner-tr" />
          <div className="fp-corner fp-corner-bl" />
          <div className="fp-corner fp-corner-br" />

          {/* Hero content */}
          <div className="fp-content">
            <div className="fp-eyebrow">
              <div className="fp-eyebrow-dot" />
              India's Premier Wedding Card Platform
            </div>

            <p className="fp-tagline">Craft Your</p>
            <span className="fp-brand-line" ref={typedRef} />

            <p className="fp-subtitle">Where every card tells a love story</p>

            <p className="fp-desc">
              The ultimate destination for custom celebration cards. Connect with artisan shops,
              design personalised wedding invitations, and make your special day unforgettable.
            </p>

            <div className="fp-actions">
              <button className="fp-btn-gold" onClick={() => navigate('/listings')}>
                <i className="fas fa-compass" style={{ fontSize: 13 }} />
                Explore Shops
              </button>
              <Link className="fp-btn-ghost" to="/listings/new">
                <i className="fas fa-store" style={{ fontSize: 12 }} />
                Open Your Shop
              </Link>
            </div>
          </div>

          {/* Scroll hint */}
          <div className="fp-scroll">
            <span>Scroll</span>
            <div className="fp-scroll-line" />
          </div>


        </section>

        <Footer />
      </div>
    </>
  )
}