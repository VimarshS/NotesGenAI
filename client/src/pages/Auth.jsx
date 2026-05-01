import React from 'react'
import { motion } from 'motion/react'
import { FcGoogle } from 'react-icons/fc'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../utils/firebase'
import axios from 'axios'
import { serverUrl } from '../App'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'

const features = [
  { icon: '◆', label: '50 Free Credits', desc: 'Start generating notes instantly, no card required.', color: 'var(--accent)' },
  { icon: '▲', label: 'Exam Notes', desc: 'High-yield, exam-focused structured content.', color: 'var(--violet)' },
  { icon: '●', label: 'Visual Diagrams', desc: 'Auto-generated flow diagrams and charts.', color: 'var(--sky)' },
  { icon: '■', label: 'PDF Export', desc: 'Download print-ready PDFs in one click.', color: 'var(--green)' },
]

export default function Auth() {
  const dispatch = useDispatch()

  const handleGoogleAuth = async () => {
    try {
      const response = await signInWithPopup(auth, provider)
      const { displayName: name, email } = response.user
      const result = await axios.post(serverUrl + '/api/auth/google', { name, email }, { withCredentials: true })
      dispatch(setUserData(result.data))
    } catch (error) { console.log(error) }
  }

  return (
    <div className='noise' style={{ minHeight:'100vh', background:'var(--bg)', fontFamily:'var(--font)', display:'flex', flexDirection:'column', overflow:'hidden' }}>

      {/* Background grid */}
      <div className='grid-bg' style={{ position:'fixed', inset:0, opacity:0.4, pointerEvents:'none' }} />

      {/* Glow orbs */}
      <div style={{ position:'fixed', top:'-20%', left:'-10%', width:600, height:600, borderRadius:'50%', background:'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)', pointerEvents:'none' }} />
      <div style={{ position:'fixed', bottom:'-20%', right:'-10%', width:500, height:500, borderRadius:'50%', background:'radial-gradient(circle, rgba(167,139,250,0.1) 0%, transparent 70%)', pointerEvents:'none' }} />

      {/* Top bar */}
      <div style={{ position:'relative', zIndex:10, padding:'20px 28px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <div style={{ width:8, height:8, borderRadius:'50%', background:'var(--accent)', boxShadow:'0 0 12px var(--accent)' }} />
          <span style={{ fontSize:14, fontWeight:700, color:'var(--text)', letterSpacing:'-0.03em' }}>
            NotesGen<span style={{ color:'var(--accent)' }}>.</span>AI
          </span>
        </div>
        <span className='badge badge-green animate-pulse-soft'>
          <span style={{ width:5, height:5, borderRadius:'50%', background:'var(--green)', display:'inline-block' }} />
          Live
        </span>
      </div>

      {/* Main */}
      <main style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', padding:'20px 24px', position:'relative', zIndex:10 }}>
        <div style={{ width:'100%', maxWidth:960, display:'grid', gridTemplateColumns:'1fr 1fr', gap:64, alignItems:'center' }}
          className='auth-grid'>

          {/* Left: Hero */}
          <motion.div
            initial={{ opacity:0, x:-32 }}
            animate={{ opacity:1, x:0 }}
            transition={{ duration:0.6, ease:[0.22,1,0.36,1] }}
          >
            {/* Badge */}
            <div className='badge badge-accent animate-fade-in' style={{ marginBottom:24 }}>
              <span style={{ fontSize:9 }}>◆</span>
              50 credits free · No card needed
            </div>

            {/* Headline */}
            <h1 style={{ fontSize:'clamp(36px,5vw,58px)', fontWeight:800, letterSpacing:'-0.04em', lineHeight:1.0, color:'var(--text)', margin:'0 0 8px' }}>
              Study Smarter<br />
              <span style={{ fontFamily:'var(--font-serif)', fontWeight:400, fontStyle:'italic', color:'var(--accent-2)' }}>
                with AI Notes
              </span>
            </h1>

            <p style={{ fontSize:16, lineHeight:1.65, color:'var(--text-2)', margin:'20px 0 36px', maxWidth:380 }}>
              Generate exam-ready notes, visual diagrams, and revision PDFs powered by AI — in seconds, not hours.
            </p>

            {/* CTA */}
            <motion.button
              onClick={handleGoogleAuth}
              whileHover={{ scale:1.03, y:-2 }}
              whileTap={{ scale:0.97 }}
              className='btn btn-lg'
              style={{
                background:'white', color:'#1a1a2e',
                boxShadow:'0 8px 32px rgba(0,0,0,0.4)',
                gap:10, fontWeight:700,
              }}
            >
              <FcGoogle size={20} />
              Continue with Google
            </motion.button>

            <p style={{ marginTop:14, fontSize:12, color:'var(--text-4)', fontFamily:'var(--font)' }}>
              Free to start · Upgrade anytime · Instant access
            </p>

            {/* Stats */}
            <div style={{ display:'flex', gap:28, marginTop:36, paddingTop:28, borderTop:'1px solid var(--border)' }}>
              {[['50', 'Free Credits'], ['4', 'Content Types'], ['∞', 'Subjects']].map(([val, label]) => (
                <div key={label}>
                  <div style={{ fontSize:22, fontWeight:800, color:'var(--text)', letterSpacing:'-0.04em', fontFamily:'var(--font)' }}>{val}</div>
                  <div style={{ fontSize:11, color:'var(--text-3)', marginTop:2, fontFamily:'var(--font)', fontWeight:500 }}>{label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Feature cards */}
          <motion.div
            initial={{ opacity:0, x:32 }}
            animate={{ opacity:1, x:0 }}
            transition={{ duration:0.6, ease:[0.22,1,0.36,1] }}
            style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}
          >
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity:0, y:20 }}
                animate={{ opacity:1, y:0 }}
                transition={{ delay:0.15 + i * 0.08, duration:0.45 }}
                whileHover={{ y:-4, borderColor:'rgba(255,255,255,0.14)' }}
                style={{
                  background:'var(--bg2)', border:'1px solid var(--border)',
                  borderRadius:16, padding:20, cursor:'default',
                  transition:'all 0.2s',
                }}
              >
                <div style={{
                  width:36, height:36, borderRadius:10, marginBottom:14,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  background:`${f.color}18`, fontSize:14, color:f.color,
                  border:`1px solid ${f.color}30`,
                }}>
                  {f.icon}
                </div>
                <div style={{ fontSize:13, fontWeight:700, color:'var(--text)', marginBottom:5, fontFamily:'var(--font)' }}>{f.label}</div>
                <div style={{ fontSize:12, color:'var(--text-3)', lineHeight:1.5, fontFamily:'var(--font)' }}>{f.desc}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>

      <style>{`
        @media (max-width: 700px) {
          .auth-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </div>
  )
}
