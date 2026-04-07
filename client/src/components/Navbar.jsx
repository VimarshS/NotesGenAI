// import React, { useState } from 'react'
// import { AnimatePresence, motion } from "motion/react"
// import logo from "../assets/logo.png"
// import { useDispatch, useSelector } from 'react-redux'
// import axios from 'axios'
// import { serverUrl } from '../App'
// import { setUserData } from '../redux/userSlice'
// import { useNavigate } from 'react-router-dom'

// function Navbar() {
//     const { userData } = useSelector((state) => state.user)
//     const credits = userData.credits
//     const [showCredits,setShowCredits] = useState(false)
//     const [showProfile,setShowProfile] = useState(false)
//     const navigate = useNavigate()
//     const dispatch = useDispatch()
//     const handleSignOut = async () => {
//         try {
//             await axios.get(serverUrl+ "/api/auth/logout" , {withCredentials:true})
//             dispatch(setUserData(null))
//             navigate("/auth")
            
            
//         } catch (error) {
//             console.log(error)
//         }
//     }
//     return (
//         <motion.div
//             initial={{ opacity: 0, y: -15 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1.5 }}
//             className='relative z-20 mx-6 mt-6
//         rounded-2xl
//         bg-gradient-to-br from-black/90 via-black/80 to-black/90
//         backdrop-blur-2xl
//         border border-white/10
//         shadow-[0_22px_55px_rgba(0,0,0,0.75)]
//         flex items-center justify-between px-8 py-4'>

//             <div className='flex items-center gap-3'>
//                 <img src={logo} alt="examnotes" className='w-9 h-9' />
//                 <span className='text-lg hidden md:block font-semibold text-white'>
//                     ExamNotes <span className='text-gray-400'>AI</span>
//                 </span>
//             </div>

//             <div className='flex items-center gap-6 relative'>
//                 <div className='relative'>

//                     <motion.div
//                     onClick={()=>{setShowCredits(!showCredits);setShowProfile(false)}}
//                      whileHover={{scale:1.07}}
//                     whileTap={{scale:0.97}}
//                      className='flex items-center justify-center gap-1
//                 px-4 py-2 rounded-full
//                 bg-white/10
//                 border border-white/20
//                 text-white text-sm
//                 shadow-md
//                 cursor-pointer'>
//                     <span className='text-xl'>💠</span>
//                     <span>{credits}</span>
//                     <motion.span whileHover={{scale:1.2}}
//                     whileTap={{scale:0.97}}
//                     className='ml-2 h-5 w-5 flex items-center justify-center
//                   rounded-full bg-white  text-xs font-bold'
//                     >
//                         ➕

//                     </motion.span>

//                     </motion.div>
//                       <AnimatePresence>

//                     {showCredits && 
                  
//                     <motion.div 
//                     initial={{ opacity: 0, y: -10, scale: 0.95 }}
//                   animate={{ opacity: 1, y: 10, scale: 1 }}
//                   exit={{ opacity: 0, y: -10, scale: 0.95 }}
//                   transition={{ duration: 0.2 }}
//                     className='absolute right-[-50px] mt-4 w-64
//                     rounded-2xl
//                     bg-black/90 backdrop-blur-xl
//                     border border-white/10
//                     shadow-[0_25px_60px_rgba(0,0,0,0.7)]
//                     p-4 text-white'>
//                         <h4 className='font-semibold mb-2'>Buy Credits</h4>
//                         <p className='text-sm text-gray-300 mb-4'>Use credits to generate AI notes, diagrams & PDFs.</p>
//                         <button onClick={()=>{setShowCredits(false);navigate("/pricing")}} className=' w-full py-2 rounded-lg
//                       bg-gradient-to-br from-white to-gray-200
//                       text-black font-semibold
//                       hover:opacity-90'>Buy More Credits</button>



//                     </motion.div>
//                     }</AnimatePresence>
//                 </div>

//                  <div className='relative'>

//                     <motion.div
//                     onClick={()=>{setShowProfile(!showProfile);setShowCredits(false)}}
//                      whileHover={{scale:1.1}}
//                     whileTap={{scale:0.97}}
//                      className='flex items-center justify-center gap-1
//                 px-4 py-2 rounded-full
//                 bg-white/10
//                 border border-white/20
//                 text-white text-sm
//                 shadow-md
//                 cursor-pointer'>
//                     <span className='text-lg'>{userData?.name.slice(0,1).toUpperCase()}</span>
                   

//                     </motion.div>
//                     <AnimatePresence>
                    
//                     {showProfile && 
                  
//                     <motion.div 
//                     initial={{ opacity: 0, y: -10, scale: 0.95 }}
//                   animate={{ opacity: 1, y: 10, scale: 1 }}
//                   exit={{ opacity: 0, y: -10, scale: 0.95 }}
//                   transition={{ duration: 0.2 }}
//                     className='absolute right-0 mt-4 w-52
//                     rounded-2xl
//                     bg-black/90 backdrop-blur-xl
//                     border border-white/10
//                     shadow-[0_25px_60px_rgba(0,0,0,0.7)]
//                     p-4 text-white'>

//                        <MenuItem text="History" onClick={()=>{setShowProfile(false);navigate("/history")}}/>
//                        <div className="h-px bg-white/10 mx-3" />
//                        <MenuItem text="sign out" red  onClick={handleSignOut}/>
                       



//                     </motion.div>
//                     }</AnimatePresence>

                    
//                 </div>
//             </div>


//         </motion.div>
//     )
// }

// function MenuItem ({onClick , text , red}){
//     return(
//         <div
//         onClick={onClick} className={`
//         w-full text-left px-5 py-3 text-sm
//         transition-colors rounded-lg
//         ${
//           red
//             ? "text-red-400 hover:bg-red-500/10"
//             : "text-gray-200 hover:bg-white/10"
//         }
//       `}>
//         {text}

//         </div>
//     )
// }


// export default Navbar
import React, { useState } from 'react'
import { AnimatePresence, motion } from "motion/react"
import logo from "../assets/logo.png"
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { serverUrl } from '../App'
import { setUserData } from '../redux/userSlice'
import { useNavigate } from 'react-router-dom'

function Navbar() {
    const { userData } = useSelector((state) => state.user)
    const credits = userData.credits
    const [showCredits, setShowCredits] = useState(false)
    const [showProfile, setShowProfile] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSignOut = async () => {
        try {
            await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true })
            dispatch(setUserData(null))
            navigate("/auth")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5 }}
                className='relative z-20 mx-4 sm:mx-6 mt-5 sm:mt-6
                    rounded-2xl
                    bg-gradient-to-br from-black/90 via-black/80 to-black/90
                    backdrop-blur-2xl
                    border border-white/10
                    shadow-[0_22px_55px_rgba(0,0,0,0.75)]
                    flex items-center justify-between px-5 sm:px-8 py-3 sm:py-4'
            >
                {/* ── Logo ── */}
                <motion.div
                    onClick={() => navigate("/")}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className='flex items-center gap-3 cursor-pointer'
                >
                    <div className='relative'>
                        <div className='absolute inset-0 rounded-full blur-md opacity-40'
                            style={{ background: "rgba(255,255,255,0.3)" }} />
                        <img src={logo} alt="examnotes" className='relative w-8 h-8 sm:w-9 sm:h-9 rounded-full' />
                    </div>

                    <div className='hidden md:block'>
                        <span className='text-base sm:text-lg font-black tracking-tight text-white'
                            style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>
                            ExamNotes
                        </span>
                        <span className='text-base sm:text-lg font-black tracking-tight ml-1'
                            style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'Cabinet Grotesk', sans-serif" }}>
                            AI
                        </span>
                    </div>
                </motion.div>

                {/* ── Right controls ── */}
                <div className='flex items-center gap-2 sm:gap-3 relative'>

                    {/* ── Credits button ── */}
                    <div className='relative'>
                        <motion.div
                            onClick={() => { setShowCredits(!showCredits); setShowProfile(false) }}
                            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
                            whileTap={{ scale: 0.97 }}
                            className='flex items-center gap-1.5 sm:gap-2
                                px-3 sm:px-4 py-2 rounded-xl
                                bg-white/8 border border-white/15
                                text-white text-xs sm:text-sm
                                cursor-pointer transition-colors duration-200'
                            style={{ background: "rgba(255,255,255,0.08)" }}
                        >
                            <span className='text-base sm:text-lg'>💠</span>
                            <span className='font-bold tracking-wide'>{credits}</span>
                            <div className='w-px h-3 bg-white/20 mx-0.5' />
                            <motion.span
                                whileHover={{ scale: 1.2, rotate: 90 }}
                                whileTap={{ scale: 0.97 }}
                                transition={{ duration: 0.2 }}
                                className='h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center
                                    rounded-full bg-white text-xs font-black text-black'
                            >
                                +
                            </motion.span>
                        </motion.div>

                        <AnimatePresence>
                            {showCredits &&
                                <motion.div
                                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 10, scale: 1 }}
                                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                    className='absolute right-[-40px] sm:right-[-50px] mt-4 w-64
                                        rounded-2xl
                                        bg-black/90 backdrop-blur-xl
                                        border border-white/10
                                        shadow-[0_25px_60px_rgba(0,0,0,0.8)]
                                        overflow-hidden'
                                >
                                    <div className='px-5 pt-5 pb-4'
                                        style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                                        <div className='flex items-center gap-2 mb-1'>
                                            <span className='text-lg'>💠</span>
                                            <h4 className='font-black text-white text-sm tracking-tight'
                                                style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>
                                                {credits} Credits Remaining
                                            </h4>
                                        </div>
                                        <p className='text-xs font-medium text-white/40 mt-1'>
                                            Used for AI notes, diagrams & PDFs
                                        </p>
                                    </div>
                                    <div className='p-4'>
                                        <motion.button
                                            onClick={() => { setShowCredits(false); navigate("/pricing") }}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className='w-full py-2.5 rounded-xl font-black text-sm text-black tracking-wide'
                                            style={{
                                                background: "linear-gradient(135deg, #fff 0%, #e5e5e5 100%)",
                                                fontFamily: "'Cabinet Grotesk', sans-serif"
                                            }}
                                        >
                                            Buy More Credits →
                                        </motion.button>
                                    </div>
                                </motion.div>
                            }
                        </AnimatePresence>
                    </div>

                    {/* ── Profile button ── */}
                    <div className='relative'>
                        <motion.div
                            onClick={() => { setShowProfile(!showProfile); setShowCredits(false) }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.97 }}
                            className='flex items-center justify-center
                                w-8 h-8 sm:w-9 sm:h-9 rounded-xl
                                border border-white/20
                                text-white font-black text-sm
                                cursor-pointer transition-all duration-200'
                            style={{ background: "rgba(255,255,255,0.1)", fontFamily: "'Cabinet Grotesk', sans-serif" }}
                        >
                            {userData?.name.slice(0, 1).toUpperCase()}
                        </motion.div>

                        <AnimatePresence>
                            {showProfile &&
                                <motion.div
                                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 10, scale: 1 }}
                                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                    className='absolute right-0 mt-4 w-52
                                        rounded-2xl
                                        bg-black/90 backdrop-blur-xl
                                        border border-white/10
                                        shadow-[0_25px_60px_rgba(0,0,0,0.8)]
                                        overflow-hidden'
                                >
                                    <div className='px-5 py-4'
                                        style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                                        <div className='w-8 h-8 rounded-lg flex items-center justify-center
                                            font-black text-sm text-black mb-2'
                                            style={{ background: "rgba(255,255,255,0.9)", fontFamily: "'Cabinet Grotesk', sans-serif" }}>
                                            {userData?.name.slice(0, 1).toUpperCase()}
                                        </div>
                                        <p className='text-sm font-black text-white truncate'
                                            style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>
                                            {userData?.name}
                                        </p>
                                        <p className='text-xs font-medium text-white/35 truncate mt-0.5'>
                                            {userData?.email}
                                        </p>
                                    </div>
                                    <div className='p-2'>
                                        <MenuItem text="History" onClick={() => { setShowProfile(false); navigate("/history") }} />
                                        <div className="h-px bg-white/8 mx-2 my-1"
                                            style={{ background: "rgba(255,255,255,0.08)" }} />
                                        <MenuItem text="Sign Out" red onClick={handleSignOut} />
                                    </div>
                                </motion.div>
                            }
                        </AnimatePresence>
                    </div>
                </div>

                <style>{`
                    @import url('https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@800,700,500,400&display=swap');
                `}</style>
            </motion.div>

            {/* ── Glowing bottom border strip ── */}
            <div className='relative mx-4 sm:mx-6 h-px overflow-hidden'>
                {/* Base hairline */}
                <div className='absolute inset-0'
                    style={{ background: "rgba(255,255,255,0.06)" }} />
                {/* Center radial glow bloom */}
                <div className='absolute inset-0'
                    style={{
                        background: "radial-gradient(ellipse 60% 800% at 50% 0%, rgba(255,255,255,0.3) 0%, transparent 100%)"
                    }} />
                {/* Animated shimmer sweeping left → right every 7s */}
                <motion.div
                    className='absolute top-0 h-px w-40'
                    style={{
                        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.65), transparent)"
                    }}
                    animate={{ x: ["-160px", "100vw"] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 3 }}
                />
            </div>
        </>
    )
}

function MenuItem({ onClick, text, red }) {
    return (
        <motion.div
            onClick={onClick}
            whileHover={{ x: 3 }}
            transition={{ duration: 0.15 }}
            className={`
                w-full text-left px-4 py-2.5 text-sm font-bold
                transition-colors rounded-xl cursor-pointer
                flex items-center justify-between
                ${red
                    ? "text-red-400 hover:bg-red-500/10"
                    : "text-gray-200 hover:bg-white/10"}
            `}
            style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
        >
            {text}
            <span className='text-xs opacity-40'>{red ? "↩" : "→"}</span>
        </motion.div>
    )
}

export default Navbar