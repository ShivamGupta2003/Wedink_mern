// export default function Footer() {
//   return (
//     <footer className="footer">
//       <div className="footer-content">
//         <div className="social-icons">
//           <a href="#"><i className="fab fa-facebook"></i></a>
//           <a href="#"><i className="fab fa-instagram"></i></a>
//           <a href="#"><i className="fab fa-linkedin"></i></a>
//         </div>
//         <div className="copyright">© WedInk Private Limited</div>
//         <div className="terms">
//           <span>Privacy</span>
//           <span className="heart">❤</span>
//           <span>Shivam</span>
//           <span className="heart">❤</span>
//           <span>Terms</span>
//         </div>
//       </div>
//     </footer>
//   )
// }
import { Link } from "react-router-dom"
export default function Footer() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        .footer {
          background: #080808;
          border-top: 1px solid rgba(201,169,110,0.12);
          position: relative;
          overflow: hidden;
          font-family: 'DM Sans', sans-serif;
        }
        .footer::before {
          content: '';
          position: absolute;
          top: 0; left: 50%;
          transform: translateX(-50%);
          width: 60%; height: 1px;
          background: linear-gradient(to right, transparent, rgba(201,169,110,0.55), transparent);
        }
        .footer-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(201,169,110,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,169,110,0.025) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: linear-gradient(to bottom, black, transparent);
          pointer-events: none;
        }
        .footer-inner {
          position: relative;
          z-index: 1;
          max-width: 1100px;
          margin: 0 auto;
          padding: 40px 32px 28px;
        }
        .footer-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 32px;
          padding-bottom: 28px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          flex-wrap: wrap;
        }
        .footer-brand-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.7rem;
          font-weight: 600;
          color: #e8c98a;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          line-height: 1;
        }
        .footer-brand-tagline {
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.85rem;
          font-style: italic;
          color: rgba(255,255,255,0.28);
          margin-top: 5px;
          letter-spacing: 0.04em;
        }
        .footer-links { display: flex; gap: 48px; flex-wrap: wrap; }
        .footer-col-title {
          font-size: 0.65rem;
          font-weight: 600;
          color: rgba(201,169,110,0.7);
          text-transform: uppercase;
          letter-spacing: 0.12em;
          margin-bottom: 14px;
        }
        .footer-col a {
          display: block;
          font-size: 0.82rem;
          color: rgba(255,255,255,0.32);
          text-decoration: none;
          margin-bottom: 9px;
          transition: color 0.18s;
          font-weight: 300;
        }
        .footer-col a:hover { color: #c9a96e; }
        .footer-social { display: flex; flex-direction: column; align-items: flex-end; gap: 14px; }
        .social-row { display: flex; gap: 10px; }
        .social-btn {
          width: 36px; height: 36px;
          border-radius: 9px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          display: flex; align-items: center; justify-content: center;
          color: rgba(255,255,255,0.35);
          font-size: 13px;
          text-decoration: none;
          transition: all 0.2s;
        }
        .social-btn:hover {
          border-color: rgba(201,169,110,0.4);
          color: #c9a96e;
          background: rgba(201,169,110,0.07);
          transform: translateY(-2px);
        }
        .footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 20px;
          flex-wrap: wrap;
          gap: 12px;
        }
        .footer-copy { font-size: 0.74rem; color: rgba(255,255,255,0.2); letter-spacing: 0.04em; }
        .footer-made { display: flex; align-items: center; gap: 7px; font-size: 0.74rem; color: rgba(255,255,255,0.18); }
        .made-heart {
          color: #c9a96e; font-size: 11px;
          animation: footerHeartbeat 2s ease-in-out infinite;
        }
        @keyframes footerHeartbeat {
          0%,100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.3); opacity: 1; }
        }
        .made-name { color: rgba(201,169,110,0.6); }
        .footer-legal { display: flex; gap: 20px; }
        .footer-legal a { font-size: 0.72rem; color: rgba(255,255,255,0.2); text-decoration: none; transition: color 0.18s; }
        .footer-legal a:hover { color: #c9a96e; }

        @media (max-width: 680px) {
          .footer-top { flex-direction: column; }
          .footer-social { align-items: flex-start; }
          .footer-bottom { flex-direction: column; align-items: flex-start; }
          .footer-links { gap: 28px; }
        }
      `}</style>

      <footer className="footer">
        <div className="footer-grid" />
        <div className="footer-inner">

          <div className="footer-top">
            <div>
              <div className="footer-brand-name">WedInk</div>
              <div className="footer-brand-tagline">Where every card tells a love story</div>
            </div>

            <div className="footer-links">
              <div className="footer-col">
                <div className="footer-col-title">Explore</div>

                <Link to="/listings">Browse Shops</Link>
                <Link to="/listings">Marriage Cards</Link>
                <Link to="#">How It Works</Link>
              </div>

              <div className="footer-col">
                <div className="footer-col-title">Sellers</div>

                <Link to="/listings/new">Open a Shop</Link>
                <Link to="/profile">Manage Orders</Link>
                <Link to="/profile">Shop Dashboard</Link>
              </div>
            </div>

            <div className="footer-social">
              <div className="footer-col-title">Follow Us</div>
              <div className="social-row">
                <a href="#" className="social-btn"><i className="fab fa-facebook-f" /></a>
                <a href="#" className="social-btn"><i className="fab fa-instagram" /></a>
                <a href="#" className="social-btn"><i className="fab fa-linkedin-in" /></a>
                <a href="#" className="social-btn"><i className="fab fa-twitter" /></a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-copy">© 2025 WedInk Private Limited. All rights reserved.</div>
            <div className="footer-made">
              Crafted with <span className="made-heart">♥</span> by <span className="made-name">Shivam</span>
            </div>
            <div className="footer-legal">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Use</a>
            </div>
          </div>

        </div>
      </footer>
    </>
  )
}