import React from 'react'

export default function Sidebar({ result }) {
  if (!result?.subTopics || !result?.questions?.short || !result?.questions?.long) return null

  return (
    <div style={{
      background:'var(--bg2)', border:'1px solid var(--border)',
      borderRadius:18, overflow:'hidden', fontFamily:'var(--font)',
      position:'sticky', top:80,
    }}>
      {/* Header */}
      <div style={{ padding:'14px 16px', borderBottom:'1px solid var(--border)', background:'var(--bg3)', display:'flex', alignItems:'center', gap:10 }}>
        <div style={{ width:28, height:28, borderRadius:8, background:'var(--accent-dim)', border:'1px solid rgba(99,102,241,0.25)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, color:'var(--accent)' }}>
          ◆
        </div>
        <span style={{ fontSize:13, fontWeight:700, color:'var(--text)' }}>Quick View</span>
      </div>

      <div style={{ padding:14, display:'flex', flexDirection:'column', gap:16 }}>

        {/* Sub Topics */}
        <div>
          <p className='t-label' style={{ marginBottom:10 }}>Sub Topics · Priority</p>
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            {Object.entries(result.subTopics).map(([star, topics]) => (
              <div key={star} style={{ background:'var(--bg3)', border:'1px solid var(--border)', borderRadius:10, padding:12 }}>
                <div style={{ fontSize:10, fontWeight:700, color:'var(--amber)', marginBottom:8, letterSpacing:'0.05em', textTransform:'uppercase' }}>
                  {star} Priority
                </div>
                <ul style={{ margin:0, padding:0, listStyle:'none', display:'flex', flexDirection:'column', gap:5 }}>
                  {topics.map((t, i) => (
                    <li key={i} style={{ display:'flex', alignItems:'flex-start', gap:7, fontSize:11, color:'var(--text-2)', lineHeight:1.5 }}>
                      <span style={{ width:4, height:4, borderRadius:'50%', background:'var(--text-4)', marginTop:5, flexShrink:0, display:'block' }} />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Importance */}
        {result.importance && (
          <div style={{ background:'var(--amber-dim)', border:'1px solid rgba(251,191,36,0.2)', borderRadius:10, padding:12 }}>
            <p style={{ fontSize:10, fontWeight:700, color:'var(--amber)', marginBottom:5, letterSpacing:'0.05em', textTransform:'uppercase' }}>🔥 Exam Importance</p>
            <p style={{ fontSize:11, color:'#fde68a', lineHeight:1.5, margin:0 }}>{result.importance}</p>
          </div>
        )}

        {/* Questions */}
        <div>
          <p className='t-label' style={{ marginBottom:10 }}>Important Questions</p>
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            <QBox label='Short' items={result.questions.short} color='var(--accent-2)' bg='var(--accent-dim)' border='rgba(99,102,241,0.2)' />
            <QBox label='Long' items={result.questions.long} color='var(--violet)' bg='var(--violet-dim)' border='rgba(167,139,250,0.2)' />
            {result.questions.diagram && (
              <QBox label='Diagram' items={[result.questions.diagram]} color='var(--green)' bg='var(--green-dim)' border='rgba(52,211,153,0.2)' />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function QBox({ label, items, color, bg, border }) {
  return (
    <div style={{ background: bg, border:`1px solid ${border}`, borderRadius:10, padding:12 }}>
      <p style={{ fontSize:10, fontWeight:700, color, marginBottom:8, letterSpacing:'0.05em', textTransform:'uppercase' }}>{label} Questions</p>
      <ul style={{ margin:0, padding:0, listStyle:'none', display:'flex', flexDirection:'column', gap:5 }}>
        {items.filter(Boolean).map((q, i) => (
          <li key={i} style={{ display:'flex', alignItems:'flex-start', gap:7, fontSize:11, color:'var(--text-2)', lineHeight:1.5 }}>
            <span style={{ width:4, height:4, borderRadius:'50%', background:color, marginTop:5, flexShrink:0, display:'block' }} />
            {q}
          </li>
        ))}
      </ul>
    </div>
  )
}
