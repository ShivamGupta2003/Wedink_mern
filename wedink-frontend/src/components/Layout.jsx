// import Navbar from './Navbar'
// import Footer from './Footer'
// import FlashMessage from './FlashMessage'

// export default function Layout({ children }) {
//   return (
//     <>
//       <Navbar />
//       <div className="main-content">
//         <div className="container">
//           <FlashMessage />
//         </div>
//         {children}
//       </div>
//       <Footer />
//     </>
//   )
// }

import Navbar from './Navbar'
import Footer from './Footer'
import FlashMessage from './FlashMessage'
import WedinkChatbot from './WedinkChatbot'

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <div className="main-content">
        <div className="container">
          <FlashMessage />
        </div>
        {children}
      </div>
      <Footer />

      {/* 💬 AI Chatbot — fixed floating button, works on all pages */}
      <WedinkChatbot />
    </>
  )
}
