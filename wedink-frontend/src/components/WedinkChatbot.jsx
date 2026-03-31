// import { useState, useRef, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// import api from '../services/api'

// const QUICK_REPLIES = [
//     'What styles do you have?',
//     'Show me royal designs',
//     'Cards under ₹500',
//     'Floral invitation styles',
// ]

// // ── Lightweight markdown renderer ──────────────────────────────────────────
// // Handles: **bold**, *italic*, bullet lists (* or -), numbered lists, line breaks
// function BotMessage({ content }) {
//     const lines = content.split('\n')
//     const elements = []
//     let listBuffer = []
//     let listType = null // 'ul' | 'ol'

//     const flushList = (key) => {
//         if (listBuffer.length === 0) return
//         const Tag = listType === 'ol' ? 'ol' : 'ul'
//         elements.push(
//             <Tag key={`list-${key}`} style={listType === 'ol' ? olStyle : ulStyle}>
//                 {listBuffer.map((item, j) => (
//                     <li key={j} style={liStyle}>{renderInline(item)}</li>
//                 ))}
//             </Tag>
//         )
//         listBuffer = []
//         listType = null
//     }

//     lines.forEach((line, i) => {
//         const ulMatch = line.match(/^[\*\-]\s+(.+)/)
//         const olMatch = line.match(/^\d+\.\s+(.+)/)

//         if (ulMatch) {
//             if (listType === 'ol') flushList(i)
//             listType = 'ul'
//             listBuffer.push(ulMatch[1])
//         } else if (olMatch) {
//             if (listType === 'ul') flushList(i)
//             listType = 'ol'
//             listBuffer.push(olMatch[1])
//         } else {
//             flushList(i)
//             if (line.trim() === '') {
//                 // skip empty lines that follow a list (already handled by margin)
//                 if (elements.length > 0) {
//                     elements.push(<div key={`sp-${i}`} style={{ height: 4 }} />)
//                 }
//             } else {
//                 elements.push(
//                     <p key={`p-${i}`} style={pStyle}>{renderInline(line)}</p>
//                 )
//             }
//         }
//     })
//     flushList('end')

//     return <div style={{ lineHeight: 1.6 }}>{elements}</div>
// }

// function renderInline(text) {
//     // Split on **bold** and *italic*
//     const parts = []
//     const regex = /(\*\*(.+?)\*\*|\*(.+?)\*)/g
//     let last = 0
//     let match
//     while ((match = regex.exec(text)) !== null) {
//         if (match.index > last) parts.push(text.slice(last, match.index))
//         if (match[0].startsWith('**')) {
//             parts.push(<strong key={match.index} style={{ fontWeight: 600, color: '#4e2e0d' }}>{match[2]}</strong>)
//         } else {
//             parts.push(<em key={match.index} style={{ fontStyle: 'italic', color: '#7a5230' }}>{match[3]}</em>)
//         }
//         last = match.index + match[0].length
//     }
//     if (last < text.length) parts.push(text.slice(last))
//     return parts.length > 0 ? parts : text
// }

// const pStyle = { margin: '0 0 6px', padding: 0 }
// const ulStyle = {
//     margin: '6px 0 8px',
//     paddingLeft: 18,
//     listStyleType: 'disc',
// }
// const olStyle = {
//     margin: '6px 0 8px',
//     paddingLeft: 18,
//     listStyleType: 'decimal',
// }
// const liStyle = { marginBottom: 4, paddingLeft: 2 }
// // ───────────────────────────────────────────────────────────────────────────

// export default function WedinkChatbot() {
//     const navigate = useNavigate()
//     const [open, setOpen] = useState(false)
//     const [messages, setMessages] = useState([
//         {
//             role: 'model',
//             content:
//                 "Welcome to WedInk! 💍\nI'm here to help you find the perfect wedding card. Tell me your style, color, or budget!",
//             ts: new Date(),
//         },
//     ])
//     const [input, setInput] = useState('')
//     const [loading, setLoading] = useState(false)
//     const bottomRef = useRef(null)
//     const inputRef = useRef(null)
//     const textareaRef = useRef(null)

//     useEffect(() => {
//         if (open) setTimeout(() => inputRef.current?.focus(), 220)
//     }, [open])

//     useEffect(() => {
//         bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
//     }, [messages, loading])

//     useEffect(() => {
//         const el = textareaRef.current
//         if (!el) return
//         el.style.height = 'auto'
//         el.style.height = Math.min(el.scrollHeight, 80) + 'px'
//     }, [input])

//     const fmt = (date) =>
//         date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

//     const handleSearch = (filters) => {
//         const params = new URLSearchParams()
//         if (filters.color) params.set('color', filters.color)
//         if (filters.style) params.set('style', filters.style)
//         if (filters.keywords) params.set('shopName', filters.keywords)
//         navigate(`/listings?${params.toString()}`)
//     }

//     const sendMessage = async (text) => {
//         const userText = (text ?? input).trim()
//         if (!userText || loading) return
//         setInput('')

//         const userMsg = { role: 'user', content: userText, ts: new Date() }
//         const history = [...messages, userMsg]
//         setMessages(history)
//         setLoading(true)

//         try {
//             const response = await fetch('http://localhost:8080/api/chat', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 credentials: 'include',
//                 body: JSON.stringify({
//                     messages: history.map((m) => ({ role: m.role, content: m.content }))
//                 })
//             })

//             const data = await response.json()

//             if (data.type === 'search') {
//                 const parts = [data.filters.style, data.filters.color, data.filters.keywords].filter(Boolean)
//                 setMessages((prev) => [
//                     ...prev,
//                     {
//                         role: 'model',
//                         content: `✨ Searching for ${parts.join(' ')} cards for you...`,
//                         ts: new Date(),
//                         searchAction: data.filters,
//                     },
//                 ])
//                 setTimeout(() => handleSearch(data.filters), 1400)
//             } else {
//                 setMessages((prev) => [
//                     ...prev,
//                     { role: 'model', content: data.content, ts: new Date() },
//                 ])
//             }
//         } catch (err) {
//             setMessages((prev) => [
//                 ...prev,
//                 { role: 'model', content: 'Something went wrong. Please try again 🙏', ts: new Date() },
//             ])
//         } finally {
//             setLoading(false)
//         }
//     }

//     const handleKey = (e) => {
//         if (e.key === 'Enter' && !e.shiftKey) {
//             e.preventDefault()
//             sendMessage()
//         }
//     }

//     return (
//         <>
//             <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;700&family=DM+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap');

//         .wc-fab {
//           position: fixed; bottom: 28px; right: 28px; z-index: 9999;
//           width: 58px; height: 58px; border-radius: 50%;
//           background: linear-gradient(135deg,#b5813a 0%,#e8c98a 50%,#b5813a 100%);
//           background-size: 200% 200%;
//           animation: wc-shimmer 3s ease infinite;
//           border: none; cursor: pointer;
//           box-shadow: 0 6px 28px rgba(181,129,58,.45), 0 2px 8px rgba(0,0,0,.18);
//           display: flex; align-items: center; justify-content: center;
//           color: #1a0e05; font-size: 23px;
//           transition: transform .2s, box-shadow .2s;
//         }
//         .wc-fab:hover { transform: scale(1.08); box-shadow: 0 10px 36px rgba(181,129,58,.55); }
//         @keyframes wc-shimmer {
//           0%,100%{ background-position: 0% 50%; }
//           50%    { background-position: 100% 50%; }
//         }
//         .wc-fab-dot {
//           position: absolute; top: 3px; right: 3px;
//           width: 11px; height: 11px; border-radius: 50%;
//           background: #ef4444; border: 2px solid #fff;
//           animation: wc-pulse 2s ease infinite;
//         }
//         @keyframes wc-pulse {
//           0%,100%{ transform: scale(1); }
//           50%    { transform: scale(1.25); }
//         }

//         .wc-window {
//           position: fixed; bottom: 98px; right: 28px; z-index: 9998;
//           width: 370px;
//           border-radius: 22px;
//           background: #fff;
//           box-shadow: 0 28px 90px rgba(0,0,0,.18), 0 4px 20px rgba(181,129,58,.1);
//           display: flex; flex-direction: column;
//           overflow: hidden;
//           font-family: 'DM Sans', sans-serif;
//           animation: wc-in .28s cubic-bezier(.34,1.56,.64,1);
//           transform-origin: bottom right;
//           max-height: 580px;
//         }
//         @keyframes wc-in {
//           from { opacity:0; transform: scale(.84) translateY(26px); }
//           to   { opacity:1; transform: scale(1) translateY(0); }
//         }

//         .wc-header {
//           background: linear-gradient(130deg,#1a0e05 0%,#2c1a09 55%,#3d2510 100%);
//           padding: 14px 16px;
//           display: flex; align-items: center; gap: 11px;
//           flex-shrink: 0;
//         }
//         .wc-avatar {
//           width: 42px; height: 42px; border-radius: 50%;
//           background: linear-gradient(135deg,#b5813a,#e8c98a);
//           display: flex; align-items: center; justify-content: center;
//           font-size: 19px; flex-shrink: 0;
//           box-shadow: 0 0 0 3px rgba(232,201,138,.22);
//         }
//         .wc-title {
//           font-family: 'Cormorant Garamond', serif;
//           font-size: 1.02rem; font-weight: 700; color: #e8c98a;
//         }
//         .wc-sub {
//           font-size: .71rem; color: rgba(232,201,138,.5);
//           display: flex; align-items: center; gap: 5px; margin-top: 2px;
//         }
//         .wc-online {
//           width: 6px; height: 6px; border-radius: 50%;
//           background: #4ade80; display: inline-block;
//         }
//         .wc-close {
//           margin-left: auto;
//           background: rgba(255,255,255,.08); border: none; cursor: pointer;
//           color: rgba(232,201,138,.65); border-radius: 9px;
//           width: 32px; height: 32px;
//           display: flex; align-items: center; justify-content: center;
//           font-size: 14px; transition: background .15s, color .15s;
//         }
//         .wc-close:hover { background: rgba(255,255,255,.15); color: #e8c98a; }

//         .wc-msgs {
//           flex: 1; overflow-y: auto;
//           padding: 16px 14px 6px;
//           display: flex; flex-direction: column; gap: 14px;
//           background: #f9f6f2;
//         }
//         .wc-msgs::-webkit-scrollbar { width: 3px; }
//         .wc-msgs::-webkit-scrollbar-thumb { background: #ddd0bc; border-radius: 4px; }

//         .wc-row { display: flex; align-items: flex-end; gap: 8px; }
//         .wc-row.user { flex-direction: row-reverse; }

//         .wc-bot-ico {
//           width: 30px; height: 30px; border-radius: 50%; flex-shrink: 0;
//           background: linear-gradient(135deg,#b5813a,#e8c98a);
//           display: flex; align-items: center; justify-content: center; font-size: 14px;
//         }

//         .wc-bubble {
//           max-width: 80%; padding: 10px 14px; border-radius: 18px;
//           font-size: .84rem; line-height: 1.58;
//           word-break: break-word;
//         }
//         .wc-bubble.bot {
//           background: #fff; color: #2c1a09;
//           border: 1px solid #ece3d6; border-bottom-left-radius: 4px;
//           box-shadow: 0 1px 5px rgba(0,0,0,.05);
//         }
//         .wc-bubble.user {
//           background: linear-gradient(135deg,#b5813a,#c9943f);
//           color: #fff; border-bottom-right-radius: 4px;
//           white-space: pre-wrap;
//         }

//         /* Styled list inside bot bubble */
//         .wc-bubble.bot ul, .wc-bubble.bot ol {
//           margin: 6px 0 8px; padding-left: 18px;
//         }
//         .wc-bubble.bot li { margin-bottom: 4px; }

//         .wc-ts {
//           font-size: .67rem; color: #c0b09e; margin-top: 4px; text-align: right;
//         }
//         .wc-ts.bot { text-align: left; }

//         .wc-search-pill {
//           display: inline-flex; align-items: center; gap: 6px;
//           margin-top: 9px; padding: 5px 13px;
//           background: rgba(181,129,58,.1);
//           border: 1px solid rgba(201,148,63,.3);
//           border-radius: 20px; font-size: .74rem;
//           color: #7a4f1e; font-weight: 500;
//         }

//         .wc-typing {
//           display: flex; align-items: center; gap: 4px;
//           padding: 11px 14px;
//           background: #fff; border: 1px solid #ece3d6;
//           border-radius: 18px; border-bottom-left-radius: 4px;
//           max-width: 68px; box-shadow: 0 1px 5px rgba(0,0,0,.05);
//         }
//         .wc-dot {
//           width: 7px; height: 7px; border-radius: 50%; background: #c9943f;
//           animation: wc-bounce 1.2s infinite ease-in-out;
//         }
//         .wc-dot:nth-child(2){ animation-delay: .2s; }
//         .wc-dot:nth-child(3){ animation-delay: .4s; }
//         @keyframes wc-bounce {
//           0%,60%,100%{ transform: translateY(0); opacity:.45; }
//           30%        { transform: translateY(-6px); opacity:1; }
//         }

//         .wc-quickreplies {
//           display: flex; flex-wrap: wrap; gap: 7px;
//           padding: 8px 14px 2px; background: #f9f6f2;
//         }
//         .wc-qr {
//           padding: 5px 13px; border-radius: 20px;
//           border: 1px solid #d5b994; background: #fff;
//           color: #7a4f1e; font-size: .75rem; font-weight: 500;
//           cursor: pointer; font-family: 'DM Sans', sans-serif;
//           transition: all .15s; white-space: nowrap;
//         }
//         .wc-qr:hover { background: #f8eedd; border-color: #b5813a; color: #4e2e0d; }

//         .wc-inputbar {
//           padding: 10px 12px 13px; background: #fff;
//           border-top: 1px solid #ece3d6;
//           display: flex; align-items: flex-end; gap: 8px; flex-shrink: 0;
//         }
//         .wc-textarea {
//           flex: 1;
//           background: #f9f6f2; border: 1px solid #e2d5c3; border-radius: 13px;
//           padding: 9px 13px; font-size: .84rem;
//           font-family: 'DM Sans', sans-serif; color: #2c1a09;
//           outline: none; resize: none; overflow: hidden;
//           min-height: 38px; max-height: 80px;
//           transition: border-color .15s; line-height: 1.45;
//         }
//         .wc-textarea::placeholder { color: #c8b8a4; }
//         .wc-textarea:focus { border-color: #c9943f; }

//         .wc-send {
//           width: 42px; height: 42px; border-radius: 13px; flex-shrink: 0;
//           background: linear-gradient(135deg,#b5813a,#e8c98a);
//           border: none; cursor: pointer;
//           display: flex; align-items: center; justify-content: center;
//           color: #1a0e05; font-size: 15px;
//           box-shadow: 0 3px 12px rgba(181,129,58,.32);
//           transition: transform .15s, opacity .15s;
//         }
//         .wc-send:hover { transform: scale(1.07); }
//         .wc-send:disabled { opacity:.45; cursor:default; transform:none; }

//         .wc-footer {
//           text-align: center; font-size: .65rem;
//           color: #ccbfb2; padding: 3px 0 10px; background: #fff;
//           letter-spacing: .02em;
//         }

//         @media (max-width: 420px) {
//           .wc-window { width: calc(100vw - 20px); right: 10px; bottom: 86px; }
//         }
//       `}</style>

//             {/* ── FAB ── */}
//             <button className="wc-fab" onClick={() => setOpen((v) => !v)} aria-label="Toggle chat">
//                 {open
//                     ? <i className="fas fa-times" />
//                     : <><i className="fas fa-comment-dots" /><span className="wc-fab-dot" /></>
//                 }
//             </button>

//             {/* ── Chat window ── */}
//             {open && (
//                 <div className="wc-window">

//                     {/* Header */}
//                     <div className="wc-header">
//                         <div className="wc-avatar">💍</div>
//                         <div>
//                             <div className="wc-title">WedInk Assistant</div>
//                             <div className="wc-sub">
//                                 <span className="wc-online" />
//                                 Online · Card Design Expert
//                             </div>
//                         </div>
//                         <button className="wc-close" onClick={() => setOpen(false)}>
//                             <i className="fas fa-times" />
//                         </button>
//                     </div>

//                     {/* Messages */}
//                     <div className="wc-msgs">
//                         {messages.map((msg, i) => (
//                             <div key={i} className={`wc-row ${msg.role === 'user' ? 'user' : ''}`}>
//                                 {msg.role !== 'user' && <div className="wc-bot-ico">💍</div>}
//                                 <div>
//                                     <div className={`wc-bubble ${msg.role !== 'user' ? 'bot' : 'user'}`}>
//                                         {msg.role !== 'user'
//                                             ? <BotMessage content={msg.content} />
//                                             : msg.content
//                                         }
//                                         {msg.searchAction && (
//                                             <div className="wc-search-pill">
//                                                 <i className="fas fa-search" style={{ fontSize: 10 }} />
//                                                 Redirecting to listings…
//                                             </div>
//                                         )}
//                                     </div>
//                                     <div className={`wc-ts ${msg.role !== 'user' ? 'bot' : ''}`}>{fmt(msg.ts)}</div>
//                                 </div>
//                             </div>
//                         ))}

//                         {loading && (
//                             <div className="wc-row">
//                                 <div className="wc-bot-ico">💍</div>
//                                 <div className="wc-typing">
//                                     <div className="wc-dot" /><div className="wc-dot" /><div className="wc-dot" />
//                                 </div>
//                             </div>
//                         )}
//                         <div ref={bottomRef} />
//                     </div>

//                     {/* Quick replies (only on first open) */}
//                     {messages.length <= 2 && !loading && (
//                         <div className="wc-quickreplies">
//                             {QUICK_REPLIES.map((qr) => (
//                                 <button key={qr} className="wc-qr" onClick={() => sendMessage(qr)}>{qr}</button>
//                             ))}
//                         </div>
//                     )}

//                     {/* Input */}
//                     <div className="wc-inputbar">
//                         <textarea
//                             ref={(el) => { inputRef.current = el; textareaRef.current = el }}
//                             className="wc-textarea"
//                             placeholder="Describe your dream card…"
//                             value={input}
//                             rows={1}
//                             onChange={(e) => setInput(e.target.value)}
//                             onKeyDown={handleKey}
//                         />
//                         <button
//                             className="wc-send"
//                             onClick={() => sendMessage()}
//                             disabled={!input.trim() || loading}
//                             aria-label="Send"
//                         >
//                             <i className="fas fa-paper-plane" />
//                         </button>
//                     </div>

//                     <div className="wc-footer">Powered by Gemini AI ✨</div>
//                 </div>
//             )}
//         </>
//     )
// }

import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const QUICK_REPLIES = [
    'What styles do you have?',
    'Show me royal designs',
    'Cards under ₹500',
    'Floral invitation styles',
]

// ── Markdown renderer ──────────────────────────────────────────────────────
function BotMessage({ content }) {
    const lines = content.split('\n')
    const elements = []
    let listBuffer = []
    let listType = null

    const flushList = (key) => {
        if (listBuffer.length === 0) return
        const Tag = listType === 'ol' ? 'ol' : 'ul'
        elements.push(
            <Tag key={`list-${key}`} style={listType === 'ol' ? olStyle : ulStyle}>
                {listBuffer.map((item, j) => (
                    <li key={j} style={liStyle}>{renderInline(item)}</li>
                ))}
            </Tag>
        )
        listBuffer = []
        listType = null
    }

    lines.forEach((line, i) => {
        const ulMatch = line.match(/^[\*\-]\s+(.+)/)
        const olMatch = line.match(/^\d+\.\s+(.+)/)
        if (ulMatch) {
            if (listType === 'ol') flushList(i)
            listType = 'ul'
            listBuffer.push(ulMatch[1])
        } else if (olMatch) {
            if (listType === 'ul') flushList(i)
            listType = 'ol'
            listBuffer.push(olMatch[1])
        } else {
            flushList(i)
            if (line.trim() === '') {
                if (elements.length > 0) elements.push(<div key={`sp-${i}`} style={{ height: 4 }} />)
            } else {
                elements.push(<p key={`p-${i}`} style={pStyle}>{renderInline(line)}</p>)
            }
        }
    })
    flushList('end')
    return <div style={{ lineHeight: 1.6 }}>{elements}</div>
}

function renderInline(text) {
    const parts = []
    const regex = /(\*\*(.+?)\*\*|\*(.+?)\*)/g
    let last = 0, match
    while ((match = regex.exec(text)) !== null) {
        if (match.index > last) parts.push(text.slice(last, match.index))
        if (match[0].startsWith('**')) {
            parts.push(<strong key={match.index} style={{ fontWeight: 600, color: '#4e2e0d' }}>{match[2]}</strong>)
        } else {
            parts.push(<em key={match.index} style={{ fontStyle: 'italic', color: '#7a5230' }}>{match[3]}</em>)
        }
        last = match.index + match[0].length
    }
    if (last < text.length) parts.push(text.slice(last))
    return parts.length > 0 ? parts : text
}

const pStyle = { margin: '0 0 6px', padding: 0 }
const ulStyle = { margin: '6px 0 8px', paddingLeft: 18, listStyleType: 'disc' }
const olStyle = { margin: '6px 0 8px', paddingLeft: 18, listStyleType: 'decimal' }
const liStyle = { marginBottom: 4, paddingLeft: 2 }
// ──────────────────────────────────────────────────────────────────────────

// ── Card Recommendation Panel ─────────────────────────────────────────────
function CardRecommendations({ cards, navigate }) {
    const [revealed, setRevealed] = useState({})

    const themeEmoji = { Royal: '👑', Traditional: '🌸', Modern: '✨' }

    const handleClick = (card) => {
        if (!revealed[card.id]) {
            setRevealed(r => ({ ...r, [card.id]: true }))
        } else {
            navigate(`/cards/${card.id}`)
        }
    }

    return (
        <div style={{
            marginTop: 10,
            borderRadius: 14,
            overflow: 'hidden',
            border: '1px solid #ece3d6',
            background: '#fffdf9',
        }}>
            {/* Header */}
            <div style={{
                padding: '8px 12px 6px',
                fontSize: '.68rem', fontWeight: 600,
                color: '#b5813a', textTransform: 'uppercase',
                letterSpacing: '.07em', borderBottom: '1px solid #f0e6d6',
                display: 'flex', alignItems: 'center', gap: 6,
            }}>
                <span style={{ fontSize: 10 }}>✦</span> Suggested cards for you
            </div>

            {/* Scrollable cards row */}
            <div style={{
                display: 'flex', gap: 8, overflowX: 'auto',
                padding: '10px 10px 10px', scrollbarWidth: 'none',
            }}>
                {cards.map((card) => (
                    <div
                        key={card.id}
                        onClick={() => handleClick(card)}
                        style={{
                            flexShrink: 0, width: 108,
                            borderRadius: 10, overflow: 'hidden',
                            border: revealed[card.id] ? '1.5px solid #b5813a' : '1px solid #e2d5c3',
                            background: '#fff', cursor: 'pointer',
                            position: 'relative',
                            transition: 'transform .2s, border-color .2s, box-shadow .2s',
                            boxShadow: revealed[card.id] ? '0 4px 16px rgba(181,129,58,.22)' : 'none',
                            transform: revealed[card.id] ? 'translateY(-2px)' : 'none',
                        }}
                    >
                        {/* Image area */}
                        <div style={{
                            width: 108, height: 80,
                            background: '#f5ede0',
                            position: 'relative', overflow: 'hidden',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                            {/* Real image from DB */}
                            {card.image ? (
                                <img
                                    src={card.image}
                                    alt={card.cardName}
                                    style={{
                                        width: '100%', height: '100%', objectFit: 'cover',
                                        filter: revealed[card.id] ? 'blur(0px)' : 'blur(8px)',
                                        transform: revealed[card.id] ? 'scale(1)' : 'scale(1.1)',
                                        transition: 'filter .4s, transform .4s',
                                    }}
                                    onError={(e) => {
                                        e.target.style.display = 'none'
                                        e.target.nextSibling.style.display = 'flex'
                                    }}
                                />
                            ) : null}

                            {/* Emoji fallback when no image or image fails */}
                            <div style={{
                                display: card.image ? 'none' : 'flex',
                                position: card.image ? 'absolute' : 'relative',
                                inset: 0,
                                alignItems: 'center', justifyContent: 'center',
                                fontSize: 28,
                                filter: revealed[card.id] ? 'blur(0px)' : 'blur(6px)',
                                transition: 'filter .4s',
                            }}>
                                {themeEmoji[card.theme] || '💌'}
                            </div>

                            {/* Dark overlay before reveal */}
                            {!revealed[card.id] && (
                                <div style={{
                                    position: 'absolute', inset: 0,
                                    background: 'rgba(26,14,5,0.3)',
                                    display: 'flex', alignItems: 'center',
                                    justifyContent: 'center', flexDirection: 'column', gap: 3,
                                }}>
                                    <div style={{ fontSize: 13 }}>👁️</div>
                                    <div style={{
                                        fontSize: '.57rem', color: '#fff',
                                        fontWeight: 500, letterSpacing: '.02em',
                                    }}>
                                        Tap to reveal
                                    </div>
                                </div>
                            )}

                            {/* Match % badge */}
                            <div style={{
                                position: 'absolute', top: 5, left: 5,
                                background: 'rgba(181,129,58,0.88)',
                                color: '#fff', fontSize: '.55rem', fontWeight: 600,
                                padding: '2px 6px', borderRadius: 6,
                            }}>
                                {card.match}% match
                            </div>
                        </div>

                        {/* Card info */}
                        <div style={{ padding: '7px 8px 9px' }}>
                            <div style={{
                                fontSize: '.72rem', fontWeight: 600, color: '#2c1a09',
                                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                            }}>
                                {card.cardName}
                            </div>
                            <div style={{
                                fontSize: '.68rem', color: '#b5813a',
                                fontWeight: 500, marginTop: 3,
                            }}>
                                ₹{card.price}
                            </div>
                            {card.shopName && (
                                <div style={{
                                    fontSize: '.6rem', color: '#b0a090', marginTop: 2,
                                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                                }}>
                                    {card.shopName}
                                </div>
                            )}
                        </div>

                        {/* Tap to open bar after reveal */}
                        {revealed[card.id] && (
                            <div style={{
                                background: '#b5813a', color: '#fff',
                                fontSize: '.6rem', fontWeight: 500,
                                textAlign: 'center', padding: '4px 0',
                                letterSpacing: '.03em',
                            }}>
                                Tap to open →
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
// ──────────────────────────────────────────────────────────────────────────

export default function WedinkChatbot() {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const [messages, setMessages] = useState([
        {
            role: 'model',
            content: "Welcome to WedInk! 💍\nI'm here to help you find the perfect wedding card. Tell me your style, color, or budget!",
            ts: new Date(),
        },
    ])
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const bottomRef = useRef(null)
    const inputRef = useRef(null)
    const textareaRef = useRef(null)

    useEffect(() => {
        if (open) setTimeout(() => inputRef.current?.focus(), 220)
    }, [open])

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages, loading])

    useEffect(() => {
        const el = textareaRef.current
        if (!el) return
        el.style.height = 'auto'
        el.style.height = Math.min(el.scrollHeight, 80) + 'px'
    }, [input])

    const fmt = (date) => date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

    const handleSearch = (filters) => {
        const params = new URLSearchParams()
        if (filters.color) params.set('color', filters.color)
        if (filters.style) params.set('style', filters.style)
        if (filters.keywords) params.set('shopName', filters.keywords)
        navigate(`/listings?${params.toString()}`)
    }

    const sendMessage = async (text) => {
        const userText = (text ?? input).trim()
        if (!userText || loading) return
        setInput('')

        const userMsg = { role: 'user', content: userText, ts: new Date() }
        const history = [...messages, userMsg]
        setMessages(history)
        setLoading(true)

        try {
            const response = await fetch('http://localhost:8080/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    messages: history.map((m) => ({ role: m.role, content: m.content })),
                }),
            })

            const data = await response.json()

            if (data.type === 'cards') {
                setMessages((prev) => [
                    ...prev,
                    {
                        role: 'model',
                        content: data.message,
                        ts: new Date(),
                        cards: data.cards,
                    },
                ])
            } else if (data.type === 'search') {
                const parts = [data.filters.style, data.filters.color, data.filters.keywords].filter(Boolean)
                setMessages((prev) => [
                    ...prev,
                    {
                        role: 'model',
                        content: `✨ Searching for ${parts.join(' ')} cards for you...`,
                        ts: new Date(),
                        searchAction: data.filters,
                    },
                ])
                setTimeout(() => handleSearch(data.filters), 1400)
            } else {
                setMessages((prev) => [
                    ...prev,
                    { role: 'model', content: data.content, ts: new Date() },
                ])
            }
        } catch (err) {
            setMessages((prev) => [
                ...prev,
                { role: 'model', content: 'Something went wrong. Please try again 🙏', ts: new Date() },
            ])
        } finally {
            setLoading(false)
        }
    }

    const handleKey = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            sendMessage()
        }
    }

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;700&family=DM+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap');

        .wc-fab {
          position: fixed; bottom: 28px; right: 28px; z-index: 9999;
          width: 58px; height: 58px; border-radius: 50%;
          background: linear-gradient(135deg,#b5813a 0%,#e8c98a 50%,#b5813a 100%);
          background-size: 200% 200%;
          animation: wc-shimmer 3s ease infinite;
          border: none; cursor: pointer;
          box-shadow: 0 6px 28px rgba(181,129,58,.45), 0 2px 8px rgba(0,0,0,.18);
          display: flex; align-items: center; justify-content: center;
          color: #1a0e05; font-size: 23px;
          transition: transform .2s, box-shadow .2s;
        }
        .wc-fab:hover { transform: scale(1.08); box-shadow: 0 10px 36px rgba(181,129,58,.55); }
        @keyframes wc-shimmer {
          0%,100%{ background-position: 0% 50%; }
          50%    { background-position: 100% 50%; }
        }
        .wc-fab-dot {
          position: absolute; top: 3px; right: 3px;
          width: 11px; height: 11px; border-radius: 50%;
          background: #ef4444; border: 2px solid #fff;
          animation: wc-pulse 2s ease infinite;
        }
        @keyframes wc-pulse {
          0%,100%{ transform: scale(1); }
          50%    { transform: scale(1.25); }
        }

        .wc-window {
          position: fixed; bottom: 98px; right: 28px; z-index: 9998;
          width: 370px;
          border-radius: 22px;
          background: #fff;
          box-shadow: 0 28px 90px rgba(0,0,0,.18), 0 4px 20px rgba(181,129,58,.1);
          display: flex; flex-direction: column;
          overflow: hidden;
          font-family: 'DM Sans', sans-serif;
          animation: wc-in .28s cubic-bezier(.34,1.56,.64,1);
          transform-origin: bottom right;
          max-height: 600px;
        }
        @keyframes wc-in {
          from { opacity:0; transform: scale(.84) translateY(26px); }
          to   { opacity:1; transform: scale(1) translateY(0); }
        }

        .wc-header {
          background: linear-gradient(130deg,#1a0e05 0%,#2c1a09 55%,#3d2510 100%);
          padding: 14px 16px;
          display: flex; align-items: center; gap: 11px;
          flex-shrink: 0;
        }
        .wc-avatar {
          width: 42px; height: 42px; border-radius: 50%;
          background: linear-gradient(135deg,#b5813a,#e8c98a);
          display: flex; align-items: center; justify-content: center;
          font-size: 19px; flex-shrink: 0;
          box-shadow: 0 0 0 3px rgba(232,201,138,.22);
        }
        .wc-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.02rem; font-weight: 700; color: #e8c98a;
        }
        .wc-sub {
          font-size: .71rem; color: rgba(232,201,138,.5);
          display: flex; align-items: center; gap: 5px; margin-top: 2px;
        }
        .wc-online {
          width: 6px; height: 6px; border-radius: 50%;
          background: #4ade80; display: inline-block;
        }
        .wc-close {
          margin-left: auto;
          background: rgba(255,255,255,.08); border: none; cursor: pointer;
          color: rgba(232,201,138,.65); border-radius: 9px;
          width: 32px; height: 32px;
          display: flex; align-items: center; justify-content: center;
          font-size: 14px; transition: background .15s, color .15s;
        }
        .wc-close:hover { background: rgba(255,255,255,.15); color: #e8c98a; }

        .wc-msgs {
          flex: 1; overflow-y: auto;
          padding: 16px 14px 6px;
          display: flex; flex-direction: column; gap: 14px;
          background: #f9f6f2;
        }
        .wc-msgs::-webkit-scrollbar { width: 3px; }
        .wc-msgs::-webkit-scrollbar-thumb { background: #ddd0bc; border-radius: 4px; }

        .wc-row { display: flex; align-items: flex-end; gap: 8px; }
        .wc-row.user { flex-direction: row-reverse; }

        .wc-bot-ico {
          width: 30px; height: 30px; border-radius: 50%; flex-shrink: 0;
          background: linear-gradient(135deg,#b5813a,#e8c98a);
          display: flex; align-items: center; justify-content: center; font-size: 14px;
        }

        .wc-bubble {
          max-width: 80%; padding: 10px 14px; border-radius: 18px;
          font-size: .84rem; line-height: 1.58;
          word-break: break-word;
        }
        .wc-bubble.bot {
          background: #fff; color: #2c1a09;
          border: 1px solid #ece3d6; border-bottom-left-radius: 4px;
          box-shadow: 0 1px 5px rgba(0,0,0,.05);
        }
        .wc-bubble.user {
          background: linear-gradient(135deg,#b5813a,#c9943f);
          color: #fff; border-bottom-right-radius: 4px;
          white-space: pre-wrap;
        }

        .wc-bubble.bot ul, .wc-bubble.bot ol {
          margin: 6px 0 8px; padding-left: 18px;
        }
        .wc-bubble.bot li { margin-bottom: 4px; }

        .wc-ts {
          font-size: .67rem; color: #c0b09e; margin-top: 4px; text-align: right;
        }
        .wc-ts.bot { text-align: left; }

        .wc-search-pill {
          display: inline-flex; align-items: center; gap: 6px;
          margin-top: 9px; padding: 5px 13px;
          background: rgba(181,129,58,.1);
          border: 1px solid rgba(201,148,63,.3);
          border-radius: 20px; font-size: .74rem;
          color: #7a4f1e; font-weight: 500;
        }

        .wc-typing {
          display: flex; align-items: center; gap: 4px;
          padding: 11px 14px;
          background: #fff; border: 1px solid #ece3d6;
          border-radius: 18px; border-bottom-left-radius: 4px;
          max-width: 68px; box-shadow: 0 1px 5px rgba(0,0,0,.05);
        }
        .wc-dot {
          width: 7px; height: 7px; border-radius: 50%; background: #c9943f;
          animation: wc-bounce 1.2s infinite ease-in-out;
        }
        .wc-dot:nth-child(2){ animation-delay: .2s; }
        .wc-dot:nth-child(3){ animation-delay: .4s; }
        @keyframes wc-bounce {
          0%,60%,100%{ transform: translateY(0); opacity:.45; }
          30%        { transform: translateY(-6px); opacity:1; }
        }

        .wc-quickreplies {
          display: flex; flex-wrap: wrap; gap: 7px;
          padding: 8px 14px 2px; background: #f9f6f2;
        }
        .wc-qr {
          padding: 5px 13px; border-radius: 20px;
          border: 1px solid #d5b994; background: #fff;
          color: #7a4f1e; font-size: .75rem; font-weight: 500;
          cursor: pointer; font-family: 'DM Sans', sans-serif;
          transition: all .15s; white-space: nowrap;
        }
        .wc-qr:hover { background: #f8eedd; border-color: #b5813a; color: #4e2e0d; }

        .wc-inputbar {
          padding: 10px 12px 13px; background: #fff;
          border-top: 1px solid #ece3d6;
          display: flex; align-items: flex-end; gap: 8px; flex-shrink: 0;
        }
        .wc-textarea {
          flex: 1;
          background: #f9f6f2; border: 1px solid #e2d5c3; border-radius: 13px;
          padding: 9px 13px; font-size: .84rem;
          font-family: 'DM Sans', sans-serif; color: #2c1a09;
          outline: none; resize: none; overflow: hidden;
          min-height: 38px; max-height: 80px;
          transition: border-color .15s; line-height: 1.45;
        }
        .wc-textarea::placeholder { color: #c8b8a4; }
        .wc-textarea:focus { border-color: #c9943f; }

        .wc-send {
          width: 42px; height: 42px; border-radius: 13px; flex-shrink: 0;
          background: linear-gradient(135deg,#b5813a,#e8c98a);
          border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          color: #1a0e05; font-size: 15px;
          box-shadow: 0 3px 12px rgba(181,129,58,.32);
          transition: transform .15s, opacity .15s;
        }
        .wc-send:hover { transform: scale(1.07); }
        .wc-send:disabled { opacity:.45; cursor:default; transform:none; }

        .wc-footer {
          text-align: center; font-size: .65rem;
          color: #ccbfb2; padding: 3px 0 10px; background: #fff;
          letter-spacing: .02em;
        }

        @media (max-width: 420px) {
          .wc-window { width: calc(100vw - 20px); right: 10px; bottom: 86px; }
        }
      `}</style>

            {/* ── FAB ── */}
            <button className="wc-fab" onClick={() => setOpen((v) => !v)} aria-label="Toggle chat">
                {open
                    ? <i className="fas fa-times" />
                    : <><i className="fas fa-comment-dots" /><span className="wc-fab-dot" /></>
                }
            </button>

            {/* ── Chat window ── */}
            {open && (
                <div className="wc-window">

                    {/* Header */}
                    <div className="wc-header">
                        <div className="wc-avatar">💍</div>
                        <div>
                            <div className="wc-title">WedInk Assistant</div>
                            <div className="wc-sub">
                                <span className="wc-online" />
                                Online · Card Design Expert
                            </div>
                        </div>
                        <button className="wc-close" onClick={() => setOpen(false)}>
                            <i className="fas fa-times" />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="wc-msgs">
                        {messages.map((msg, i) => (
                            <div key={i} className={`wc-row ${msg.role === 'user' ? 'user' : ''}`}>
                                {msg.role !== 'user' && <div className="wc-bot-ico">💍</div>}
                                <div style={{ maxWidth: '85%' }}>
                                    <div className={`wc-bubble ${msg.role !== 'user' ? 'bot' : 'user'}`}>
                                        {msg.role !== 'user'
                                            ? <BotMessage content={msg.content} />
                                            : msg.content
                                        }
                                        {msg.searchAction && (
                                            <div className="wc-search-pill">
                                                <i className="fas fa-search" style={{ fontSize: 10 }} />
                                                Redirecting to listings…
                                            </div>
                                        )}
                                    </div>

                                    {/* Card panel below the bubble */}
                                    {msg.cards && msg.cards.length > 0 && (
                                        <CardRecommendations cards={msg.cards} navigate={navigate} />
                                    )}

                                    <div className={`wc-ts ${msg.role !== 'user' ? 'bot' : ''}`}>{fmt(msg.ts)}</div>
                                </div>
                            </div>
                        ))}

                        {loading && (
                            <div className="wc-row">
                                <div className="wc-bot-ico">💍</div>
                                <div className="wc-typing">
                                    <div className="wc-dot" /><div className="wc-dot" /><div className="wc-dot" />
                                </div>
                            </div>
                        )}
                        <div ref={bottomRef} />
                    </div>

                    {/* Quick replies */}
                    {messages.length <= 2 && !loading && (
                        <div className="wc-quickreplies">
                            {QUICK_REPLIES.map((qr) => (
                                <button key={qr} className="wc-qr" onClick={() => sendMessage(qr)}>{qr}</button>
                            ))}
                        </div>
                    )}

                    {/* Input */}
                    <div className="wc-inputbar">
                        <textarea
                            ref={(el) => { inputRef.current = el; textareaRef.current = el }}
                            className="wc-textarea"
                            placeholder="Describe your dream card…"
                            value={input}
                            rows={1}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKey}
                        />
                        <button
                            className="wc-send"
                            onClick={() => sendMessage()}
                            disabled={!input.trim() || loading}
                            aria-label="Send"
                        >
                            <i className="fas fa-paper-plane" />
                        </button>
                    </div>

                    <div className="wc-footer">Powered by Gemini AI ✨</div>
                </div>
            )}
        </>
    )
}

