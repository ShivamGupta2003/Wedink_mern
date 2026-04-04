import { useEffect, useRef } from 'react'
import { useFlash } from '../context/FlashContext'

export default function FlashMessage() {
  const { flash, clearFlash } = useFlash()
  const timerRef = useRef(null)

  useEffect(() => {
    if (flash.success || flash.error) {
      clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => {
        clearFlash()
      }, 4000)
    }
    return () => clearTimeout(timerRef.current)
  }, [flash.success, flash.error])

  const hasMessage = flash.success || flash.error
  if (!hasMessage) return null

  const isSuccess = !!flash.success
  const message = flash.success || flash.error

  return (
    <>
      <style>{`
        @keyframes flashSlideIn {
          from {
            opacity: 0;
            transform: translateY(-16px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes flashSlideUp {
          from {
            opacity: 0;
            transform: translateY(16px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes flashProgress {
          from { width: 100%; }
          to   { width: 0%; }
        }

        /* ── Base (desktop) ── */
        .wedink-flash-wrapper {
          position: fixed;
          top: 78px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 9999;
          width: calc(100% - 32px);
          max-width: 480px;
          animation: flashSlideIn 0.28s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .wedink-flash {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 14px 16px;
          border-radius: 14px;
          background: #161616;
          border: 1px solid;
          box-shadow:
            0 8px 32px rgba(0,0,0,0.45),
            0 2px 8px rgba(0,0,0,0.3),
            inset 0 1px 0 rgba(255,255,255,0.04);
          position: relative;
          overflow: hidden;
        }

        .wedink-flash.success { border-color: rgba(201, 169, 110, 0.35); }
        .wedink-flash.error   { border-color: rgba(248, 113, 113, 0.3); }

        .wedink-flash::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 3px;
          border-radius: 14px 0 0 14px;
        }
        .wedink-flash.success::before { background: linear-gradient(180deg, #c9a96e, #e8c98a); }
        .wedink-flash.error::before   { background: linear-gradient(180deg, #f87171, #fca5a5); }

        .flash-icon-wrap {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-size: 15px;
          margin-top: 1px;
        }
        .wedink-flash.success .flash-icon-wrap { background: rgba(201, 169, 110, 0.12); color: #e8c98a; }
        .wedink-flash.error   .flash-icon-wrap { background: rgba(248, 113, 113, 0.1);  color: #f87171; }

        .flash-body { flex: 1; min-width: 0; }

        .flash-label {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 2px;
          font-family: 'Georgia', serif;
        }
        .wedink-flash.success .flash-label { color: #c9a96e; }
        .wedink-flash.error   .flash-label { color: #f87171; }

        .flash-message {
          font-size: 0.855rem;
          color: rgba(255,255,255,0.82);
          line-height: 1.45;
          font-family: inherit;
        }

        .flash-close {
          background: transparent;
          border: none;
          color: rgba(255,255,255,0.3);
          cursor: pointer;
          padding: 2px 4px;
          font-size: 13px;
          line-height: 1;
          border-radius: 6px;
          transition: color 0.15s, background 0.15s;
          flex-shrink: 0;
          margin-top: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
        }
        .flash-close:hover  { color: #fff; background: rgba(255,255,255,0.08); }

        .flash-progress {
          position: absolute;
          bottom: 0; left: 0;
          height: 2px;
          border-radius: 0 0 14px 14px;
          animation: flashProgress 4s linear forwards;
        }
        .wedink-flash.success .flash-progress { background: linear-gradient(90deg, #c9a96e, #e8c98a); }
        .wedink-flash.error   .flash-progress { background: linear-gradient(90deg, #f87171, #fca5a5); }

        /* ── Tablet tweak ── */
        @media (max-width: 600px) {
          .wedink-flash-wrapper {
            top: 72px;
          }
        }

        /* ── Mobile (≤ 480px): move to bottom, full-bleed ── */
        @media (max-width: 480px) {
          .wedink-flash-wrapper {
            top: auto;
            bottom: calc(16px + env(safe-area-inset-bottom, 0px));
            left: 12px;
            right: 12px;
            width: auto;
            transform: none;
            animation: flashSlideUp 0.28s cubic-bezier(0.22, 1, 0.36, 1) both;
          }

          .wedink-flash {
            padding: 12px 14px;
            border-radius: 12px;
          }

          .flash-icon-wrap {
            width: 32px;
            height: 32px;
            border-radius: 8px;
            font-size: 13px;
          }

          .flash-label  { font-size: 0.65rem; }
          .flash-message { font-size: 0.82rem; }

          .flash-close {
            width: 28px;
            height: 28px;
          }
        }
      `}</style>

      <div className="wedink-flash-wrapper" role="alert" aria-live="polite">
        <div className={`wedink-flash ${isSuccess ? 'success' : 'error'}`}>

          <div className="flash-icon-wrap">
            {isSuccess
              ? <i className="fas fa-check"></i>
              : <i className="fas fa-exclamation-triangle"></i>
            }
          </div>

          <div className="flash-body">
            <div className="flash-label">{isSuccess ? 'Success' : 'Error'}</div>
            <div className="flash-message">{message}</div>
          </div>

          <button className="flash-close" onClick={clearFlash} aria-label="Dismiss">
            <i className="fas fa-times"></i>
          </button>

          <div className="flash-progress" key={message}></div>
        </div>
      </div>
    </>
  )
}