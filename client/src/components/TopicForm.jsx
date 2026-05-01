import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { generateNotes } from '../services/api'
import { useDispatch } from 'react-redux'
import { updateCredits } from '../redux/userSlice'

export default function TopicForm({ setResult, setLoading, loading, setError }) {
  const [topic, setTopic] = useState('')
  const [classLevel, setClassLevel] = useState('')
  const [examType, setExamType] = useState('')
  const [revisionMode, setRevisionMode] = useState(false)
  const [includeDiagram, setIncludeDiagram] = useState(false)
  const [includeChart, setIncludeChart] = useState(false)
  const [progress, setProgress] = useState(0)
  const [progressText, setProgressText] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = async () => {
    if (!topic.trim()) { setError('Please enter a topic'); return }
    setError('')
    setLoading(true)
    setResult(null)
    try {
      const result = await generateNotes({ topic, classLevel, examType, revisionMode, includeDiagram, includeChart })
      setResult(result.data)
      setLoading(false)
      setTopic(''); setClassLevel(''); setExamType('')
      setRevisionMode(false); setIncludeDiagram(false); setIncludeChart(false)
      if (typeof result.creditsLeft === 'number') dispatch(updateCredits(result.creditsLeft))
    } catch (err) {
      console.log(err)
      setError('Failed to generate notes. Please try again.')
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!loading) { setProgress(0); setProgressText(''); return }
    let v = 0
    const steps = ['Analysing topic…', 'Structuring content…', 'Writing notes…', 'Adding key points…', 'Almost done…']
    const iv = setInterval(() => {
      v += Math.random() * 7
      if (v >= 95) { v = 95; clearInterval(iv) }
      setProgressText(steps[Math.min(Math.floor(v / 20), steps.length - 1)])
      setProgress(Math.floor(v))
    }, 650)
    return () => clearInterval(iv)
  }, [loading])

  return (
    <div style={{
      background:'var(--bg2)', border:'1px solid var(--border)',
      borderRadius:20, overflow:'hidden', fontFamily:'var(--font)',
    }}>
      {/* Header strip */}
      <div style={{
        padding:'16px 20px', borderBottom:'1px solid var(--border)',
        display:'flex', alignItems:'center', gap:12,
        background:'var(--bg3)',
      }}>
        <div style={{ width:32, height:32, borderRadius:9, background:'var(--accent-dim)', border:'1px solid rgba(99,102,241,0.25)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, color:'var(--accent)' }}>
          ✦
        </div>
        <div>
          <div style={{ fontSize:13, fontWeight:700, color:'var(--text)' }}>Generate Notes</div>
          <div style={{ fontSize:11, color:'var(--text-3)', marginTop:1 }}>Fill in the details to create AI-powered notes</div>
        </div>
        <div style={{ marginLeft:'auto' }}>
          <span className='badge badge-accent' style={{ fontSize:10 }}>
            <span style={{ fontSize:8 }}>◆</span> AI Ready
          </span>
        </div>
      </div>

      {/* Form body */}
      <div style={{ padding:20, display:'flex', flexDirection:'column', gap:14 }}>

        {/* Topic input — large */}
        <div>
          <label style={{ display:'block', fontSize:11, fontWeight:600, color:'var(--text-3)', marginBottom:6, letterSpacing:'0.05em', textTransform:'uppercase' }}>
            Topic *
          </label>
          <input
            className='input'
            value={topic}
            onChange={e => setTopic(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !loading && handleSubmit()}
            placeholder='e.g. Photosynthesis, World War II, Calculus…'
            style={{ fontSize:15, padding:'13px 16px', borderRadius:12 }}
          />
        </div>

        {/* Row: Class + Exam */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }} className='form-row'>
          <div>
            <label style={{ display:'block', fontSize:11, fontWeight:600, color:'var(--text-3)', marginBottom:6, letterSpacing:'0.05em', textTransform:'uppercase' }}>
              Class / Level
            </label>
            <input className='input' value={classLevel} onChange={e => setClassLevel(e.target.value)}
              placeholder='e.g. Class 10, Grade 12' />
          </div>
          <div>
            <label style={{ display:'block', fontSize:11, fontWeight:600, color:'var(--text-3)', marginBottom:6, letterSpacing:'0.05em', textTransform:'uppercase' }}>
              Exam Type
            </label>
            <input className='input' value={examType} onChange={e => setExamType(e.target.value)}
              placeholder='e.g. CBSE, JEE, NEET' />
          </div>
        </div>

        {/* Toggles */}
        <div style={{ background:'var(--bg3)', border:'1px solid var(--border)', borderRadius:12, padding:'14px 16px' }}>
          <p style={{ fontSize:11, fontWeight:600, color:'var(--text-3)', marginBottom:12, letterSpacing:'0.05em', textTransform:'uppercase', margin:'0 0 12px' }}>Options</p>
          <div style={{ display:'flex', flexWrap:'wrap', gap:20 }}>
            <Toggle label='Exam Revision Mode' checked={revisionMode} onChange={() => setRevisionMode(v => !v)} icon='⚡' />
            <Toggle label='Include Diagram' checked={includeDiagram} onChange={() => setIncludeDiagram(v => !v)} icon='◎' />
            <Toggle label='Include Charts' checked={includeChart} onChange={() => setIncludeChart(v => !v)} icon='▦' />
          </div>
        </div>

        {/* Submit */}
        <motion.button
          onClick={handleSubmit}
          disabled={loading}
          whileHover={!loading ? { scale:1.015 } : {}}
          whileTap={!loading ? { scale:0.985 } : {}}
          style={{
            width:'100%', padding:'14px 20px',
            borderRadius:12, border:'none', cursor: loading ? 'not-allowed' : 'pointer',
            fontFamily:'var(--font)', fontSize:14, fontWeight:700,
            display:'flex', alignItems:'center', justifyContent:'center', gap:8,
            transition:'all 0.2s',
            background: loading ? 'var(--bg5)' : 'var(--accent)',
            color: loading ? 'var(--text-3)' : 'white',
            boxShadow: loading ? 'none' : '0 4px 24px var(--accent-glow)',
          }}
        >
          {loading ? (
            <>
              <span className='animate-spin-slow' style={{ display:'inline-block', width:15, height:15, border:'2px solid rgba(255,255,255,0.2)', borderTopColor:'rgba(255,255,255,0.7)', borderRadius:'50%' }} />
              Generating…
            </>
          ) : (
            <>✦ Generate Notes</>
          )}
        </motion.button>

        {/* Progress */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:'auto' }} exit={{ opacity:0, height:0 }}
              style={{ overflow:'hidden' }}
            >
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
                <span style={{ fontSize:12, color:'var(--text-3)', fontFamily:'var(--font)' }}>{progressText}</span>
                <span style={{ fontSize:12, color:'var(--accent-2)', fontFamily:'var(--font-mono)', fontWeight:600 }}>{progress}%</span>
              </div>
              <div className='progress-track'>
                <div className='progress-fill' style={{ width:`${progress}%` }} />
              </div>
              <p style={{ marginTop:10, fontSize:11, color:'var(--text-4)', textAlign:'center', fontFamily:'var(--font)' }}>
                This may take 2–5 minutes · Please don't close this tab
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        @media (max-width: 560px) { .form-row { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  )
}

function Toggle({ label, checked, onChange, icon }) {
  return (
    <div onClick={onChange} style={{ display:'flex', alignItems:'center', gap:10, cursor:'pointer', userSelect:'none' }}>
      <div
        className='toggle-track'
        style={{ background: checked ? 'var(--accent)' : 'var(--bg5)', border:`1px solid ${checked ? 'rgba(99,102,241,0.5)' : 'var(--border)'}` }}
      >
        <div className='toggle-thumb' style={{ left: checked ? 17 : 3 }} />
      </div>
      <div style={{ display:'flex', alignItems:'center', gap:5 }}>
        <span style={{ fontSize:11, color: checked ? 'var(--accent-2)' : 'var(--text-3)' }}>{icon}</span>
        <span style={{ fontSize:12, fontWeight:600, color: checked ? 'var(--text)' : 'var(--text-3)', fontFamily:'var(--font)', transition:'color 0.2s' }}>
          {label}
        </span>
      </div>
    </div>
  )
}
