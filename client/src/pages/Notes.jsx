// import React, { useState } from 'react'
// import { motion } from "motion/react"
// import { useNavigate } from 'react-router-dom'
// import { useSelector } from 'react-redux'
// import TopicForm from '../components/TopicForm'
// import Sidebar from '../components/Sidebar'
// import FinalResult from '../components/FinalResult'
// function Notes() {
//   const navigate = useNavigate()
//   const { userData } = useSelector((state) => state.user)
//   const credits = userData.credits
//   const [loading,setLoading]= useState(false)
//   const [result , setResult] = useState(null)
//   const [error,setError] = useState("")

//   return (
//     <div className='min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 px-6 py-8'>
//       <motion.header
//         initial={{ opacity: 0, y: -15 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}

//         className=" mb-10
//             rounded-2xl
//             bg-black/80 backdrop-blur-xl
//             border border-white/10
//             px-8 py-6
//             shadow-[0_20px_45px_rgba(0,0,0,0.6)] items-start
//             flex md:items-center justify-between gap-4 flex-col md:flex-row"
//       >
//         <div onClick={() => navigate("/")} className='cursor-pointer'><h1 className='text-2xl font-bold
//             bg-linear-to-r from-white via-gray-300 to-white
//             bg-clip-text text-transparent'>ExamNotes AI</h1>
//           <p className='text-sm text-gray-300 mt-1'>AI-powered exam-oriented notes & revision</p></div>

//         <div className='flex items-center gap-4 flex-wrap'>
//           <button className='flex items-center gap-2 
//     px-4 py-2 rounded-full
//     bg-white/10
//     border border-white/20
//     text-white text-sm' onClick={() => navigate("/pricing")}>
//             <span className='text-xl'>💠</span>
//             <span>{credits}</span>
//             <motion.span whileHover={{ scale: 1.2 }}
//               whileTap={{ scale: 0.97 }}
//               className='ml-2 h-5 w-5 flex items-center justify-center
//                         rounded-full bg-white  text-xs font-bold'
//             >
//               ➕

//             </motion.span>


//           </button>
//           <button onClick={()=>navigate("/history")} className='px-4 py-3 rounded-full
//       text-sm font-medium
//       bg-white/10
//       border border-white/20
//       text-white
//       hover:bg-white/20
//       transition
//       flex items-center gap-2'>
//         📚 Your Notes


//           </button>
//         </div>


//       </motion.header>


//       <motion.div 
//           className="mb-12">
//         <TopicForm loading={loading} setResult={setResult} setLoading={setLoading} setError={setError}/>
//       </motion.div>


//       {loading && (
//           <motion.div
//             animate={{ opacity: [0.4, 1, 0.4] }}
//             transition={{ repeat: Infinity, duration: 1.2 }}
//             className="text-center text-black font-medium mb-6"
//           >
//             Generating exam-focused notes…
//           </motion.div>
//         )}

//         {error && (
//           <div className="mb-6 text-center text-red-600 font-medium">
//             {error}
//           </div>
//         )}

//     {!result && <motion.div whileHover={{ scale: 1.02 }}
//             className="
//               h-64
//               rounded-2xl
//               flex flex-col items-center justify-center
//               bg-white/60 backdrop-blur-lg
//               border border-dashed border-gray-300
//               text-gray-500
//               shadow-inner
//             ">
//                <span className="text-4xl mb-3">📘</span>
//             <p className="text-sm">
//               Generated notes will appear here
//             </p>

//      </motion.div>}


//     {result && <motion.div
//     initial={{ opacity: 0, y: 30 }}
//     animate={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.4 }}
//      className='flex flex-col
//       lg:grid lg:grid-cols-4
//       gap-6'>

//         <div className='lg:col-span-1'>
//           <Sidebar result={result}/>


//         </div>

//         <div className='lg:col-span-3
//         rounded-2xl
//         bg-white
//         shadow-[0_15px_40px_rgba(0,0,0,0.15)]
//         p-6'>
//           <FinalResult result={result}/>

//         </div>


//     </motion.div>
// }
//     </div>
//   )
// }

// export default Notes
import React, { useState } from 'react'
import { motion } from "motion/react"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import TopicForm from '../components/TopicForm'
import Sidebar from '../components/Sidebar'
import FinalResult from '../components/FinalResult'

function Notes() {
  const navigate = useNavigate()
  const { userData } = useSelector((state) => state.user)
  const credits = userData.credits
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState("")

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 px-4 sm:px-6 py-6 sm:py-8 relative'
      style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>

      {/* Grid texture */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(#111 1px, transparent 1px), linear-gradient(90deg, #111 1px, transparent 1px)`,
          backgroundSize: "72px 72px"
        }}
      />

      {/* ── Header ── */}
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 mb-8 sm:mb-10
          rounded-2xl
          bg-black/80 backdrop-blur-xl
          border border-white/10
          px-5 sm:px-8 py-4 sm:py-6
          shadow-[0_20px_45px_rgba(0,0,0,0.6)]
          flex md:items-center justify-between gap-4 flex-col md:flex-row overflow-hidden"
      >
        {/* Header grid texture */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: "72px 72px"
          }}
        />

        {/* Logo */}
        <div onClick={() => navigate("/")} className='relative z-10 cursor-pointer'>
          <h1 className='text-lg sm:text-2xl font-black tracking-[-0.02em]
            bg-gradient-to-r from-white via-gray-300 to-white
            bg-clip-text text-transparent'
            style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>
            ExamNotes AI
          </h1>
          <p className='text-xs sm:text-sm font-medium text-gray-300 mt-0.5 sm:mt-1'>
            AI-powered exam-oriented notes & revision
          </p>
        </div>

        {/* Controls */}
        <div className='relative z-10 flex items-center gap-2 sm:gap-4 flex-wrap'>
          {/* Credits */}
          <motion.button
            whileHover={{ scale: 1.04, backgroundColor: "rgba(255,255,255,0.15)" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/pricing")}
            className='flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl
              text-white text-xs sm:text-sm font-bold transition-colors duration-200'
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              fontFamily: "'Cabinet Grotesk', sans-serif"
            }}
          >
            <span className='text-base sm:text-xl'>💠</span>
            <span>{credits}</span>
            <div className='w-px h-3 bg-white/20' />
            <motion.span
              whileHover={{ rotate: 90 }}
              transition={{ duration: 0.2 }}
              className='h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center
                rounded-full bg-white text-xs font-black text-black'
            >
              +
            </motion.span>
          </motion.button>

          {/* History */}
          <motion.button
            whileHover={{ scale: 1.04, backgroundColor: "rgba(255,255,255,0.15)" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/history")}
            className='flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl
              text-white text-xs sm:text-sm font-bold transition-colors duration-200'
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              fontFamily: "'Cabinet Grotesk', sans-serif"
            }}
          >
            📚 <span>Your Notes</span>
          </motion.button>
        </div>
      </motion.header>

      {/* ── Topic Form ── */}
      <motion.div className="relative z-10 mb-8 sm:mb-12">
        <TopicForm loading={loading} setResult={setResult} setLoading={setLoading} setError={setError} />
      </motion.div>

      {/* ── Loading ── */}
      {loading && (
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 1.2 }}
          className="relative z-10 text-center font-bold mb-6 text-sm tracking-[0.15em] uppercase text-black/50"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          Generating exam-focused notes…
        </motion.div>
      )}

      {/* ── Error ── */}
      {error && (
        <div className="relative z-10 mb-6 text-center text-red-600 font-bold text-sm"
          style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>
          {error}
        </div>
      )}

      {/* ── Empty state ── */}
      {!result && (
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="relative z-10 h-64 rounded-2xl
            flex flex-col items-center justify-center gap-3
            bg-white/60 backdrop-blur-lg
            border border-dashed border-gray-300
            shadow-inner overflow-hidden"
        >
          {/* Grid inside empty state */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
            style={{
              backgroundImage: `linear-gradient(#111 1px, transparent 1px), linear-gradient(90deg, #111 1px, transparent 1px)`,
              backgroundSize: "72px 72px"
            }}
          />
          <span className="relative z-10 text-4xl">📘</span>
          <p className="relative z-10 text-sm font-bold text-gray-400 tracking-[0.1em] uppercase"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            Generated notes will appear here
          </p>
        </motion.div>
      )}

      {/* ── Result ── */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className='relative z-10 flex flex-col lg:grid lg:grid-cols-4 gap-5 sm:gap-6'
        >
          <div className='lg:col-span-1'>
            <Sidebar result={result} />
          </div>

          <div className='relative lg:col-span-3 rounded-2xl bg-white
            shadow-[0_15px_40px_rgba(0,0,0,0.15)] p-4 sm:p-6 overflow-hidden'>
            {/* Grid inside result panel */}
            <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.025]"
              style={{
                backgroundImage: `linear-gradient(#111 1px, transparent 1px), linear-gradient(90deg, #111 1px, transparent 1px)`,
                backgroundSize: "72px 72px"
              }}
            />
            <div className="relative z-10">
              <FinalResult result={result} />
            </div>
          </div>
        </motion.div>
      )}

      <style>{`
        @import url('https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@800,700,500,400&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;600;700&display=swap');
      `}</style>
    </div>
  )
}

export default Notes