import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import MermaidSetup from './MermaidSetup'
import RechartSetUp from './RechartSetUp'
import { downloadPdf } from '../services/api'
import { motion, AnimatePresence } from 'motion/react'

const mdComponents = {
  h1: ({ children }) => <h1 style={{ fontSize:18, fontWeight:700, color:'var(--text)', margin:'24px 0 10px', letterSpacing:'-0.02em', borderBottom:'1px solid var(--border)', paddingBottom:8, fontFamily:'var(--font)' }}>{children}</h1>,
  h2: ({ children }) => <h2 style={{ fontSize:15, fontWeight:700, color:'var(--accent-2)', margin:'20px 0 8px', letterSpacing:'-0.01em', fontFamily:'var(--font)' }}>{children}</h2>,
  h3: ({ children }) => <h3 style={{ fontSize:13, fontWeight:700, color:'var(--text)', margin:'16px 0 6px', fontFamily:'var(--font)' }}>{children}</h3>,
  p: ({ children }) => <p style={{ fontSize:14, lineHeight:1.7, color:'var(--text-2)', margin:'0 0 12px', fontFamily:'var(--font)' }}>{children}</p>,
  ul: ({ children }) => <ul style={{ margin:'0 0 12px', padding:0, listStyle:'none' }}>{children}</ul>,
  li: ({ children }) => (
    <li style={{ display:'flex', alignItems:'flex-start', gap:8, fontSize:14, lineHeight:1.65, color:'var(--text-2)', marginBottom:6, fontFamily:'var(--font)' }}>
      <span style={{ width:5, height:5, borderRadius:'50%', background:'var(--accent)', marginTop:7, flexShrink:0, display:'block' }} />
      <span>{children}</span>
    </li>
  ),
  strong: ({ children }) => <strong style={{ fontWeight:700, color:'var(--text)', fontFamily:'var(--font)' }}>{children}</strong>,
  code: ({ children }) => <code style={{ fontFamily:'var(--font-mono)', fontSize:12, background:'var(--bg5)', color:'var(--accent-2)', padding:'2px 6px', borderRadius:5 }}>{children}</code>,
}

export default function FinalResult({ result }) {
  const [quickRevision, setQuickRevision] = useState(false)
  const [downloading, setDownloading] = useState(false)

  if (!result?.subTopics || !result?.questions?.short || !result?.questions?.long || !result?.revisionPoints) return null

  const handleDownload = async () => {
    setDownloading(true)
    try { await downloadPdf(result) } catch (e) { console.log(e) }
    setDownloading(false)
  }

  return (
    <div style={{ fontFamily:'var(--font)' }}>

      {/* Toolbar */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:10, marginBottom:24, paddingBottom:20, borderBottom:'1px solid var(--border)' }}>
        <div>
          <h2 style={{ fontSize:16, fontWeight:700, color:'var(--text)', margin:'0 0 3px', letterSpacing:'-0.02em' }}>Generated Notes</h2>
          <p style={{ fontSize:12, color:'var(--text-3)', margin:0 }}>{quickRevision ? 'Quick Revision Mode' : 'Full structured notes'}</p>
        </div>
        <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
          <button
            onClick={() => setQuickRevision(v => !v)}
            className='btn btn-secondary btn-sm'
            style={quickRevision ? { borderColor:'var(--green)', color:'var(--green)', background:'var(--green-dim)' } : {}}
          >
            {quickRevision ? '⚡ Exit Revision' : '⚡ Quick Revision'}
          </button>
          <button
            onClick={handleDownload}
            disabled={downloading}
            className='btn btn-primary btn-sm'
            style={{ opacity: downloading ? 0.6 : 1 }}
          >
            {downloading ? 'Generating PDF…' : '⬇ Download PDF'}
          </button>
        </div>
      </div>

      {/* Quick Revision */}
      <AnimatePresence>
        {quickRevision && (
          <motion.div
            initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:'auto' }} exit={{ opacity:0, height:0 }}
            style={{ overflow:'hidden', marginBottom:24 }}
          >
            <div style={{ background:'var(--green-dim)', border:'1px solid rgba(52,211,153,0.2)', borderRadius:14, padding:20 }}>
              <div className='accent-line'>
                <span style={{ fontSize:13, fontWeight:700, color:'var(--green)' }}>Quick Revision Points</span>
              </div>
              <ul style={{ margin:0, padding:0, listStyle:'none', display:'flex', flexDirection:'column', gap:8 }}>
                {result.revisionPoints.map((p, i) => (
                  <li key={i} style={{ display:'flex', alignItems:'flex-start', gap:8, fontSize:13, color:'#a7f3d0', lineHeight:1.6 }}>
                    <span style={{ width:5, height:5, borderRadius:'50%', background:'var(--green)', marginTop:6, flexShrink:0, display:'block' }} />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!quickRevision && (
        <div style={{ display:'flex', flexDirection:'column', gap:28 }}>

          {/* Sub Topics */}
          <Section title='Sub Topics' icon='◆' color='var(--accent-2)'>
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {Object.entries(result.subTopics).map(([star, topics]) => (
                <div key={star} style={{ background:'var(--bg3)', border:'1px solid var(--border)', borderRadius:12, padding:14 }}>
                  <div className='badge badge-amber' style={{ marginBottom:10, display:'inline-flex' }}>{star} Priority</div>
                  <ul style={{ margin:0, padding:0, listStyle:'none', display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))', gap:6 }}>
                    {topics.map((t, i) => (
                      <li key={i} style={{ display:'flex', alignItems:'flex-start', gap:7, fontSize:13, color:'var(--text-2)', lineHeight:1.5 }}>
                        <span style={{ width:4, height:4, borderRadius:'50%', background:'var(--amber)', marginTop:5.5, flexShrink:0, display:'block' }} />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>

          {/* Detailed Notes */}
          <Section title='Detailed Notes' icon='▲' color='var(--violet)'>
            <div style={{ background:'var(--bg3)', border:'1px solid var(--border)', borderRadius:12, padding:'16px 20px' }}>
              <ReactMarkdown components={mdComponents}>{result.notes}</ReactMarkdown>
            </div>
          </Section>

          {/* Diagram */}
          {result.diagram?.data && (
            <Section title='Diagram' icon='●' color='var(--sky)'>
              <div style={{ background:'var(--bg3)', border:'1px solid var(--border)', borderRadius:12, overflow:'hidden' }}>
                <MermaidSetup diagram={result.diagram.data} />
              </div>
              <p style={{ fontSize:11, color:'var(--text-4)', marginTop:8 }}>ℹ Take a screenshot to save the diagram.</p>
            </Section>
          )}

          {/* Charts */}
          {result.charts?.length > 0 && (
            <Section title='Visual Charts' icon='■' color='var(--green)'>
              <RechartSetUp charts={result.charts} />
              <p style={{ fontSize:11, color:'var(--text-4)', marginTop:8 }}>ℹ Take a screenshot to save the chart.</p>
            </Section>
          )}

          {/* Questions */}
          <Section title='Important Questions' icon='?' color='var(--rose)'>
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              <QList label='Short Questions' items={result.questions.short} color='var(--accent-2)' bg='var(--accent-dim)' border='rgba(99,102,241,0.2)' />
              <QList label='Long Questions' items={result.questions.long} color='var(--violet)' bg='var(--violet-dim)' border='rgba(167,139,250,0.2)' />
              {result.questions.diagram && (
                <QList label='Diagram Question' items={[result.questions.diagram]} color='var(--sky)' bg='var(--sky-dim)' border='rgba(56,189,248,0.2)' />
              )}
            </div>
          </Section>
        </div>
      )}
    </div>
  )
}

function Section({ title, icon, color, children }) {
  return (
    <div>
      <div className='accent-line' style={{ '--accent': color }}>
        <span style={{ fontSize:13, fontWeight:700, color: color, fontFamily:'var(--font)' }}>{title}</span>
      </div>
      {children}
    </div>
  )
}

function QList({ label, items, color, bg, border }) {
  return (
    <div style={{ background: bg, border:`1px solid ${border}`, borderRadius:12, padding:16 }}>
      <p style={{ fontSize:11, fontWeight:700, color, marginBottom:10, letterSpacing:'0.05em', textTransform:'uppercase', fontFamily:'var(--font)' }}>{label}</p>
      <ul style={{ margin:0, padding:0, listStyle:'none', display:'flex', flexDirection:'column', gap:7 }}>
        {items.filter(Boolean).map((q, i) => (
          <li key={i} style={{ display:'flex', alignItems:'flex-start', gap:8, fontSize:13, color:'var(--text-2)', lineHeight:1.6, fontFamily:'var(--font)' }}>
            <span style={{ width:5, height:5, borderRadius:'50%', background:color, marginTop:5.5, flexShrink:0, display:'block' }} />
            {q}
          </li>
        ))}
      </ul>
    </div>
  )
}
