import React, { useEffect } from 'react'
import { motion } from 'motion/react'
import { getCurrentUser } from '../services/api'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function PaymentFailed() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    getCurrentUser(dispatch)
    const t = setTimeout(() => navigate('/'), 5000)
    return () => clearTimeout(t)
  }, [])

  return (
    <div style={{ minHeight:'100vh', background:'var(--bg)', fontFamily:'var(--font)', display:'flex', alignItems:'center', justifyContent:'center', padding:24 }}>
      <div className='grid-bg' style={{ position:'fixed', inset:0, opacity:0.3, pointerEvents:'none' }} />
      <motion.div
        initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }}
        transition={{ type:'spring', stiffness:200, damping:20 }}
        style={{ position:'relative', zIndex:1, textAlign:'center', maxWidth:380 }}
      >
        <motion.div
          initial={{ scale:0 }} animate={{ scale:1 }}
          transition={{ type:'spring', stiffness:260, damping:18, delay:0.15 }}
          style={{ width:80, height:80, borderRadius:24, background:'var(--rose-dim)', border:'1px solid rgba(251,113,133,0.3)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 24px', fontSize:32, color:'var(--rose)' }}
        >
          ✕
        </motion.div>
        <h1 style={{ fontSize:28, fontWeight:800, letterSpacing:'-0.04em', color:'var(--text)', margin:'0 0 10px' }}>Payment Failed</h1>
        <p style={{ fontSize:15, color:'var(--text-2)', margin:'0 0 28px', lineHeight:1.6 }}>
          Something went wrong. No charges were made to your account.
        </p>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8, fontSize:13, color:'var(--text-3)' }}>
          <motion.div animate={{ rotate:360 }} transition={{ repeat:Infinity, duration:1.2, ease:'linear' }}
            style={{ width:14, height:14, borderRadius:'50%', border:'2px solid var(--bg5)', borderTopColor:'var(--rose)', flexShrink:0 }} />
          Redirecting to home…
        </div>
      </motion.div>
    </div>
  )
}
