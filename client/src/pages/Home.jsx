import React from 'react'
import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import study from '../assets/study.png'

const features = [
  { icon:'◆', color:'var(--accent)', bg:'var(--accent-dim)', title:'Exam Notes', desc:'High-yield, structured exam content with key points and revision summaries.' },
  { icon:'▲', color:'var(--violet)', bg:'var(--violet-dim)', title:'Project Notes', desc:'Clean documentation for assignments, labs, and academic projects.' },
  { icon:'●', color:'var(--sky)', bg:'var(--sky-dim)', title:'Flow Diagrams', desc:'AI-generated Mermaid diagrams that visualize complex concepts.' },
  { icon:'■', color:'var(--green)', bg:'var(--green-dim)', title:'PDF Export', desc:'Download polished, print-ready PDFs with a single click.' },
]

const steps = [
  { n:'01', title:'Enter Your Topic', desc:'Type any subject, chapter, or concept from your syllabus.' },
  { n:'02', title:'Configure Options', desc:'Choose your class, exam type, and add diagrams or charts.' },
  { n:'03', title:'AI Generates', desc:'Our AI crafts structured, exam-focused notes in minutes.' },
  { n:'04', title:'Download & Study', desc:'Export to PDF or review directly in your browser.' },
]

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className='noise' style={{ minHeight:'100vh', background:'var(--bg)', fontFamily:'var(--font)' }}>
      {/* Background */}
      <div className='grid-bg' style={{ position:'fixed', inset:0, opacity:0.35, pointerEvents:'none' }} />
      <div style={{ position:'fixed', top:'-25%', right:'-15%', width:700, height:700, borderRadius:'50%', background:'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 65%)', pointerEvents:'none' }} />

      <Navbar />

      {/* ── HERO ── */}
      <section style={{ position:'relative', zIndex:1, maxWidth:1100, margin:'0 auto', padding:'140px 24px 80px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:64, alignItems:'center' }} className='hero-grid'>

          {/* Text */}
          <div>
            <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }}>
              <span className='badge badge-accent' style={{ marginBottom:20, display:'inline-flex' }}>
                <span style={{ width:6, height:6, borderRadius:'50%', background:'var(--green)', display:'inline-block', boxShadow:'0 0 8px var(--green)' }} />
                AI-Powered · Free to start
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
              transition={{ duration:0.55, delay:0.07 }}
              style={{ fontSize:'clamp(38px,5vw,62px)', fontWeight:800, letterSpacing:'-0.045em', lineHeight:1.0, color:'var(--text)', margin:'0 0 20px' }}
            >
              Ace Every Exam<br />
              <span style={{ fontFamily:'var(--font-serif)', fontStyle:'italic', fontWeight:400, color:'var(--accent-2)' }}>
                with AI Notes
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
              transition={{ duration:0.5, delay:0.14 }}
              style={{ fontSize:17, lineHeight:1.65, color:'var(--text-2)', maxWidth:420, margin:'0 0 36px' }}
            >
              Generate exam-focused notes, visual diagrams, and revision PDFs for any subject — powered by AI, delivered in minutes.
            </motion.p>

            <motion.div
              initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }}
              transition={{ duration:0.45, delay:0.2 }}
              style={{ display:'flex', gap:12, flexWrap:'wrap' }}
            >
              <button onClick={() => navigate('/notes')} className='btn btn-primary btn-lg'
                style={{ letterSpacing:'-0.01em' }}>
                Generate Notes →
              </button>
              <button onClick={() => navigate('/history')} className='btn btn-secondary btn-lg'>
                My Notes
              </button>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.35 }}
              style={{ display:'flex', gap:28, marginTop:36, paddingTop:28, borderTop:'1px solid var(--border)' }}
            >
              {[['50', 'Free Credits'], ['4', 'Content Types'], ['PDF', 'Export']].map(([val, label]) => (
                <div key={label}>
                  <div style={{ fontSize:20, fontWeight:800, color:'var(--text)', letterSpacing:'-0.04em' }}>{val}</div>
                  <div style={{ fontSize:11, color:'var(--text-3)', marginTop:2, fontWeight:500 }}>{label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Image */}
          <motion.div
            initial={{ opacity:0, x:32 }} animate={{ opacity:1, x:0 }}
            transition={{ duration:0.6, delay:0.1 }}
            style={{ position:'relative' }}
          >
            <div style={{ position:'absolute', inset:-2, borderRadius:24, background:'linear-gradient(135deg, rgba(99,102,241,0.3), rgba(167,139,250,0.2))', filter:'blur(20px)', opacity:0.6 }} />
            <motion.div whileHover={{ y:-6 }} transition={{ type:'spring', stiffness:200, damping:20 }}
              style={{ position:'relative', borderRadius:20, overflow:'hidden', border:'1px solid var(--border2)', boxShadow:'var(--shadow-xl)' }}>
              <img src={study} alt='Study' style={{ width:'100%', height:'auto', display:'block' }} />
              {/* Overlay shimmer */}
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg, rgba(99,102,241,0.05) 0%, transparent 60%)', pointerEvents:'none' }} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{ position:'relative', zIndex:1, maxWidth:1100, margin:'0 auto', padding:'0 24px 80px' }}>
        <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.5 }}
          style={{ textAlign:'center', marginBottom:48 }}>
          <p className='t-label' style={{ marginBottom:10 }}>What You Get</p>
          <h2 style={{ fontSize:'clamp(26px,4vw,40px)', fontWeight:800, letterSpacing:'-0.04em', color:'var(--text)', margin:0 }}>
            Everything Students Need
          </h2>
        </motion.div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:16 }}>
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ delay:i*0.08, duration:0.45 }}
              whileHover={{ y:-5, borderColor:'rgba(255,255,255,0.12)' }}
              style={{
                background:'var(--bg2)', border:'1px solid var(--border)',
                borderRadius:18, padding:24, transition:'all 0.2s',
              }}
            >
              <div style={{ width:40, height:40, borderRadius:11, background:f.bg, border:`1px solid ${f.color}25`, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:16, fontSize:16, color:f.color }}>
                {f.icon}
              </div>
              <h3 style={{ fontSize:14, fontWeight:700, color:'var(--text)', margin:'0 0 7px', letterSpacing:'-0.01em' }}>{f.title}</h3>
              <p style={{ fontSize:13, color:'var(--text-3)', lineHeight:1.55, margin:0 }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ position:'relative', zIndex:1, maxWidth:1100, margin:'0 auto', padding:'0 24px 80px' }}>
        <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:24, padding:'48px 40px' }}>
          <motion.div initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
            style={{ textAlign:'center', marginBottom:44 }}>
            <p className='t-label' style={{ marginBottom:10 }}>Simple Process</p>
            <h2 style={{ fontSize:'clamp(24px,3.5vw,36px)', fontWeight:800, letterSpacing:'-0.04em', color:'var(--text)', margin:0 }}>
              From Topic to Notes in Minutes
            </h2>
          </motion.div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))', gap:24 }}>
            {steps.map((s, i) => (
              <motion.div key={i}
                initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ delay:i*0.1 }}
                style={{ textAlign:'center', padding:'0 8px' }}
              >
                <div style={{ fontFamily:'var(--font-mono)', fontSize:11, fontWeight:600, color:'var(--accent)', marginBottom:12, letterSpacing:'0.05em' }}>{s.n}</div>
                <div style={{ width:1, height:24, background:'linear-gradient(to bottom, var(--accent-dim), transparent)', margin:'0 auto 12px' }} />
                <h4 style={{ fontSize:14, fontWeight:700, color:'var(--text)', margin:'0 0 7px', letterSpacing:'-0.01em' }}>{s.title}</h4>
                <p style={{ fontSize:12, color:'var(--text-3)', lineHeight:1.55, margin:0 }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ position:'relative', zIndex:1, maxWidth:1100, margin:'0 auto', padding:'0 24px 80px' }}>
        <motion.div
          initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          style={{
            textAlign:'center', padding:'64px 40px',
            background:'linear-gradient(135deg, var(--bg3) 0%, var(--bg2) 100%)',
            border:'1px solid var(--border2)', borderRadius:24,
            position:'relative', overflow:'hidden',
          }}
        >
          <div style={{ position:'absolute', top:'-50%', left:'50%', transform:'translateX(-50%)', width:400, height:400, borderRadius:'50%', background:'radial-gradient(circle, var(--accent-dim) 0%, transparent 70%)', pointerEvents:'none' }} />
          <div style={{ position:'relative', zIndex:1 }}>
            <h2 style={{ fontSize:'clamp(28px,4vw,44px)', fontWeight:800, letterSpacing:'-0.04em', color:'var(--text)', margin:'0 0 14px' }}>
              Start for Free Today
            </h2>
            <p style={{ fontSize:16, color:'var(--text-2)', margin:'0 0 32px' }}>
              50 credits included — no credit card required.
            </p>
            <button onClick={() => navigate('/notes')} className='btn btn-primary btn-lg' style={{ letterSpacing:'-0.01em' }}>
              Generate Your First Note →
            </button>
          </div>
        </motion.div>
      </section>

      <Footer />

      <style>{`
        @media (max-width: 700px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </div>
  )
}
