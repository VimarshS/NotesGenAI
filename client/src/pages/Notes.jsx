import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import TopicForm from '../components/TopicForm'
import Sidebar from '../components/Sidebar'
import FinalResult from '../components/FinalResult'
import Navbar from '../components/Navbar'

export default function Notes() {
  const { userData } = useSelector(s => s.user)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  return (
    <div className='noise' style={{ minHeight:'100vh', background:'var(--bg)', fontFamily:'var(--font)' }}>
      <div className='grid-bg' style={{ position:'fixed', inset:0, opacity:0.3, pointerEvents:'none' }} />

      <Navbar />

      <div style={{ position:'relative', zIndex:1, maxWidth:1200, margin:'0 auto', padding:'88px 20px 40px' }}>

        {/* Page header */}
        <motion.div
          initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:0.45 }}
          style={{ marginBottom:28 }}
        >
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:12 }}>
            <div>
              <h1 style={{ fontSize:26, fontWeight:800, letterSpacing:'-0.04em', color:'var(--text)', margin:'0 0 4px' }}>
                Generate Notes
              </h1>
              <p style={{ fontSize:13, color:'var(--text-3)', margin:0 }}>
                AI-powered notes for any topic or subject
              </p>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <span className='badge badge-accent'>
                <span style={{ fontSize:9 }}>◆</span>
                {userData?.credits ?? 0} credits
              </span>
            </div>
          </div>
        </motion.div>

        {/* Error banner */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity:0, y:-8, height:0 }} animate={{ opacity:1, y:0, height:'auto' }} exit={{ opacity:0, y:-8, height:0 }}
              style={{
                background:'var(--rose-dim)', border:'1px solid rgba(251,113,133,0.25)',
                borderRadius:10, padding:'12px 16px', marginBottom:16,
                display:'flex', alignItems:'center', gap:10, overflow:'hidden',
              }}
            >
              <span style={{ fontSize:14 }}>⚠</span>
              <span style={{ fontSize:13, color:'var(--rose)', fontWeight:500 }}>{error}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Two-column layout */}
        <div style={{ display:'grid', gridTemplateColumns:'380px 1fr', gap:20, alignItems:'start' }} className='notes-grid'>

          {/* Left: Form */}
          <motion.div initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.45, delay:0.05 }}
            style={{ position:'sticky', top:80 }}>
            <TopicForm loading={loading} setResult={setResult} setLoading={setLoading} setError={setError} />
          </motion.div>

          {/* Right: Result */}
          <motion.div initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.45, delay:0.1 }}>

            {/* Empty state */}
            {!result && !loading && (
              <div style={{
                background:'var(--bg2)', border:'1px dashed var(--border2)',
                borderRadius:20, minHeight:480,
                display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:14,
              }}>
                <div style={{ width:56, height:56, borderRadius:16, background:'var(--accent-dim)', border:'1px solid rgba(99,102,241,0.25)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:24, color:'var(--accent)' }}>
                  ✦
                </div>
                <div style={{ textAlign:'center' }}>
                  <p style={{ fontSize:14, fontWeight:600, color:'var(--text-3)', margin:'0 0 4px' }}>Notes will appear here</p>
                  <p style={{ fontSize:12, color:'var(--text-4)', margin:0 }}>Fill in the form and click Generate</p>
                </div>
              </div>
            )}

            {/* Loading state */}
            {loading && (
              <div style={{
                background:'var(--bg2)', border:'1px solid var(--border)',
                borderRadius:20, minHeight:480,
                display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:16,
              }}>
                <motion.div
                  animate={{ rotate:360 }} transition={{ repeat:Infinity, duration:1.5, ease:'linear' }}
                  style={{ width:40, height:40, borderRadius:'50%', border:'3px solid var(--bg5)', borderTopColor:'var(--accent)' }}
                />
                <div style={{ textAlign:'center' }}>
                  <p style={{ fontSize:14, fontWeight:600, color:'var(--text-2)', margin:'0 0 4px' }}>Generating your notes…</p>
                  <p style={{ fontSize:12, color:'var(--text-4)', margin:0 }}>AI is crafting structured content for you</p>
                </div>
              </div>
            )}

            {/* Result */}
            {result && !loading && (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }}
                  style={{ display:'grid', gridTemplateColumns:'1fr 260px', gap:16, alignItems:'start' }}
                  className='result-grid'
                >
                  <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:20, padding:24 }}>
                    <FinalResult result={result} />
                  </div>
                  <Sidebar result={result} />
                </motion.div>
              </AnimatePresence>
            )}
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .notes-grid { grid-template-columns: 1fr !important; }
          .result-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
