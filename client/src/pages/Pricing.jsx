import React, { useState } from 'react'
import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { serverUrl } from '../App'
import Navbar from '../components/Navbar'

const plans = [
  {
    id: 0, title:'Starter', price:'₹100', amount:100, credits:'50 Credits',
    desc:'Perfect for quick topic revisions',
    features:['AI note generation','Exam-focused structure','Diagram support','Fast turnaround'],
  },
  {
    id: 1, title:'Scholar', price:'₹200', amount:200, credits:'120 Credits',
    desc:'Best value — most popular plan',
    features:['All Starter features','60% more credits per ₹','Revision mode access','Chart generation'],
    popular:true,
  },
  {
    id: 2, title:'Pro Learner', price:'₹500', amount:500, credits:'300 Credits',
    desc:'For serious exam preparation',
    features:['Maximum credit value','Full syllabus coverage','Priority AI generation','All features unlocked'],
  },
]

export default function Pricing() {
  const navigate = useNavigate()
  const [paying, setPaying] = useState(false)
  const [payingId, setPayingId] = useState(null)

  const handleBuy = async (amount, id) => {
    try {
      setPayingId(id); setPaying(true)
      const res = await axios.post(serverUrl + '/api/credit/order', { amount }, { withCredentials:true })
      if (res.data.url) window.location.href = res.data.url
      setPaying(false)
    } catch(e) { setPaying(false); console.log(e) }
  }

  return (
    <div className='noise' style={{ minHeight:'100vh', background:'var(--bg)', fontFamily:'var(--font)' }}>
      <div className='grid-bg' style={{ position:'fixed', inset:0, opacity:0.3, pointerEvents:'none' }} />
      <div style={{ position:'fixed', top:'-20%', left:'50%', transform:'translateX(-50%)', width:800, height:400, borderRadius:'50%', background:'radial-gradient(ellipse, rgba(99,102,241,0.07) 0%, transparent 70%)', pointerEvents:'none' }} />

      <Navbar />

      <div style={{ position:'relative', zIndex:1, maxWidth:1000, margin:'0 auto', padding:'100px 24px 60px' }}>

        {/* Header */}
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} style={{ textAlign:'center', marginBottom:56 }}>
          <span className='badge badge-accent' style={{ marginBottom:18, display:'inline-flex' }}>
            <span style={{ fontSize:9 }}>◆</span> Credits & Pricing
          </span>
          <h1 style={{ fontSize:'clamp(32px,5vw,52px)', fontWeight:800, letterSpacing:'-0.045em', color:'var(--text)', margin:'0 0 14px' }}>
            Choose Your{' '}
            <span style={{ fontFamily:'var(--font-serif)', fontStyle:'italic', fontWeight:400, color:'var(--accent-2)' }}>Plan</span>
          </h1>
          <p style={{ fontSize:16, color:'var(--text-2)', maxWidth:400, margin:'0 auto' }}>
            Buy credits to generate AI-powered notes for any subject
          </p>
        </motion.div>

        {/* Cards */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16 }} className='pricing-grid'>
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              initial={{ opacity:0, y:28 }} animate={{ opacity:1, y:0 }}
              transition={{ delay:plan.id*0.1, duration:0.45 }}
              whileHover={{ y:-5 }}
              style={{
                position:'relative', borderRadius:20, overflow:'visible',
                background: plan.popular ? 'linear-gradient(160deg, var(--bg4) 0%, var(--bg3) 100%)' : 'var(--bg2)',
                border: plan.popular ? '1px solid rgba(99,102,241,0.4)' : '1px solid var(--border)',
                boxShadow: plan.popular ? '0 0 40px rgba(99,102,241,0.15), var(--shadow-lg)' : 'var(--shadow)',
                padding:28, transition:'box-shadow 0.2s',
              }}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div style={{ position:'absolute', top:-12, left:'50%', transform:'translateX(-50%)', zIndex:1 }}>
                  <span className='badge badge-accent' style={{ boxShadow:'0 4px 16px var(--accent-glow)', fontSize:11, padding:'5px 14px' }}>
                    ◆ Most Popular
                  </span>
                </div>
              )}

              {/* Plan ID */}
              <div style={{ fontFamily:'var(--font-mono)', fontSize:10, fontWeight:600, color:'var(--text-4)', marginBottom:18, letterSpacing:'0.08em' }}>
                0{plan.id + 1}
              </div>

              <h2 style={{ fontSize:18, fontWeight:800, letterSpacing:'-0.03em', color:'var(--text)', margin:'0 0 5px' }}>{plan.title}</h2>
              <p style={{ fontSize:13, color:'var(--text-3)', margin:'0 0 24px' }}>{plan.desc}</p>

              {/* Price */}
              <div style={{ marginBottom:24 }}>
                <div style={{ fontSize:40, fontWeight:800, letterSpacing:'-0.05em', color: plan.popular ? 'var(--accent-2)' : 'var(--text)', lineHeight:1 }}>
                  {plan.price}
                </div>
                <div style={{ fontSize:11, fontFamily:'var(--font-mono)', fontWeight:600, color:'var(--text-3)', marginTop:5, letterSpacing:'0.05em', textTransform:'uppercase' }}>
                  {plan.credits}
                </div>
              </div>

              <div className='divider' style={{ marginBottom:20 }} />

              {/* Features */}
              <ul style={{ margin:'0 0 24px', padding:0, listStyle:'none', display:'flex', flexDirection:'column', gap:10 }}>
                {plan.features.map((f, i) => (
                  <li key={i} style={{ display:'flex', alignItems:'center', gap:9, fontSize:13, color:'var(--text-2)' }}>
                    <span style={{ width:16, height:16, borderRadius:'50%', background: plan.popular ? 'var(--accent-dim)' : 'var(--bg5)', border:`1px solid ${plan.popular ? 'rgba(99,102,241,0.3)' : 'var(--border)'}`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:8, color: plan.popular ? 'var(--accent-2)' : 'var(--text-3)', flexShrink:0 }}>
                      ✓
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                onClick={() => handleBuy(plan.amount, plan.id)}
                disabled={paying}
                className={`btn btn-lg ${plan.popular ? 'btn-primary' : 'btn-secondary'}`}
                style={{ width:'100%', justifyContent:'center', opacity: paying && payingId !== plan.id ? 0.5 : 1 }}
              >
                {paying && payingId === plan.id ? 'Redirecting…' : `Get ${plan.credits} →`}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Trust row */}
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.5 }}
          style={{ display:'flex', justifyContent:'center', gap:32, marginTop:40, flexWrap:'wrap' }}>
          {['🔒 Secure Payment', '⚡ Instant Credits', '📧 Support Available'].map(item => (
            <span key={item} style={{ fontSize:12, color:'var(--text-4)', fontWeight:500 }}>{item}</span>
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 760px) {
          .pricing-grid { grid-template-columns: 1fr !important; max-width: 380px; margin: 0 auto; }
        }
      `}</style>
    </div>
  )
}
