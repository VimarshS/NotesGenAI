import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { serverUrl } from '../App'
import { motion, AnimatePresence } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import FinalResult from '../components/FinalResult'
import Navbar from '../components/Navbar'

export default function History() {
  const [topics, setTopics] = useState([])
  const [activeId, setActiveId] = useState(null)
  const [selectedNote, setSelectedNote] = useState(null)
  const [loadingNote, setLoadingNote] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const navigate = useNavigate()
  const { userData } = useSelector(s => s.user)

  useEffect(() => {
    axios.get(serverUrl + '/api/notes/getnotes', { withCredentials:true })
      .then(res => setTopics(Array.isArray(res.data) ? res.data : []))
      .catch(console.log)
  }, [])

  useEffect(() => {
    setSidebarOpen(window.innerWidth >= 1024)
  }, [])

  const openNote = async (id) => {
    if (activeId === id) return
    setLoadingNote(true)
    setActiveId(id)
    try {
      const res = await axios.get(serverUrl + `/api/notes/${id}`, { withCredentials:true })
      setSelectedNote(res.data.content)
      if (window.innerWidth < 1024) setSidebarOpen(false)
    } catch(e) { console.log(e) }
    setLoadingNote(false)
  }

  return (
    <div className='noise' style={{ minHeight:'100vh', background:'var(--bg)', fontFamily:'var(--font)', display:'flex', flexDirection:'column' }}>
      <div className='grid-bg' style={{ position:'fixed', inset:0, opacity:0.3, pointerEvents:'none' }} />

      <Navbar />

      <div style={{ position:'relative', zIndex:1, flex:1, maxWidth:1200, margin:'0 auto', width:'100%', padding:'88px 20px 40px', display:'flex', flexDirection:'column' }}>

        {/* Page header */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20, flexWrap:'wrap', gap:10 }}>
          <div>
            <h1 style={{ fontSize:26, fontWeight:800, letterSpacing:'-0.04em', color:'var(--text)', margin:'0 0 4px' }}>Note History</h1>
            <p style={{ fontSize:13, color:'var(--text-3)', margin:0 }}>{topics.length} saved {topics.length === 1 ? 'note' : 'notes'}</p>
          </div>
          <div style={{ display:'flex', gap:8 }}>
            <button
              onClick={() => setSidebarOpen(v => !v)}
              className='btn btn-secondary btn-sm'
              style={{ display: window.innerWidth < 1024 ? 'flex' : 'none' }}
            >
              ☰ Topics
            </button>
            <button onClick={() => navigate('/notes')} className='btn btn-primary btn-sm'>
              ✦ New Notes
            </button>
          </div>
        </div>

        {/* Body */}
        <div style={{ flex:1, display:'grid', gridTemplateColumns:'280px 1fr', gap:16, alignItems:'start' }} className='history-grid'>

          {/* Sidebar */}
          <>
            {/* Mobile overlay */}
            <AnimatePresence>
              {sidebarOpen && (
                <motion.div
                  initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
                  onClick={() => setSidebarOpen(false)}
                  style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.6)', backdropFilter:'blur(4px)', zIndex:40, display:'none' }}
                  className='mobile-overlay'
                />
              )}
            </AnimatePresence>

            <motion.div
              animate={{ x: sidebarOpen ? 0 : -320 }}
              transition={{ type:'spring', stiffness:280, damping:28 }}
              style={{
                background:'var(--bg2)', border:'1px solid var(--border)',
                borderRadius:18, overflow:'hidden',
                position:'sticky', top:80,
                maxHeight:'calc(100vh - 110px)',
                display:'flex', flexDirection:'column',
              }}
              className='history-sidebar'
            >
              {/* Sidebar header */}
              <div style={{ padding:'14px 16px', borderBottom:'1px solid var(--border)', background:'var(--bg3)', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <span style={{ fontSize:13, fontWeight:700, color:'var(--text)' }}>Your Notes</span>
                <button onClick={() => navigate('/notes')} className='btn btn-primary' style={{ padding:'5px 12px', fontSize:11, borderRadius:7 }}>
                  + New
                </button>
              </div>

              {/* List */}
              <div style={{ flex:1, overflowY:'auto', padding:10 }}>
                {topics.length === 0 ? (
                  <div style={{ textAlign:'center', padding:'40px 16px' }}>
                    <div style={{ fontSize:28, marginBottom:10 }}>📭</div>
                    <p style={{ fontSize:13, color:'var(--text-3)', margin:'0 0 12px' }}>No notes yet</p>
                    <button onClick={() => navigate('/notes')} className='btn btn-primary btn-sm'>Create First Note</button>
                  </div>
                ) : (
                  <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
                    {topics.map((t) => {
                      const isActive = activeId === t._id
                      return (
                        <motion.button
                          key={t._id}
                          onClick={() => openNote(t._id)}
                          whileHover={{ x:2 }}
                          style={{
                            width:'100%', textAlign:'left', border:'none', cursor:'pointer',
                            borderRadius:10, padding:'11px 13px', fontFamily:'var(--font)',
                            transition:'all 0.15s',
                            background: isActive ? 'var(--accent-dim)' : 'transparent',
                            outline: isActive ? '1px solid rgba(99,102,241,0.3)' : '1px solid transparent',
                          }}
                          onMouseEnter={e => { if (!isActive) e.currentTarget.style.background='var(--bg3)' }}
                          onMouseLeave={e => { if (!isActive) e.currentTarget.style.background='transparent' }}
                        >
                          <p style={{ fontSize:13, fontWeight:600, color: isActive ? 'var(--accent-2)' : 'var(--text)', margin:'0 0 6px', lineHeight:1.3, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                            {t.topic}
                          </p>
                          <div style={{ display:'flex', flexWrap:'wrap', gap:4 }}>
                            {t.classLevel && <span className='badge badge-accent' style={{ fontSize:10, padding:'2px 7px' }}>{t.classLevel}</span>}
                            {t.examType && <span className='badge badge-violet' style={{ fontSize:10, padding:'2px 7px' }}>{t.examType}</span>}
                            {t.revisionMode && <span className='badge badge-amber' style={{ fontSize:10, padding:'2px 7px' }}>⚡ Rev</span>}
                          </div>
                        </motion.button>
                      )
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          </>

          {/* Main content */}
          <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:18, minHeight:'calc(100vh - 140px)', overflow:'hidden' }}>

            {/* Loading */}
            {loadingNote && (
              <div style={{ height:'100%', minHeight:400, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:14 }}>
                <motion.div animate={{ rotate:360 }} transition={{ repeat:Infinity, duration:1.2, ease:'linear' }}
                  style={{ width:36, height:36, borderRadius:'50%', border:'3px solid var(--bg5)', borderTopColor:'var(--accent)' }} />
                <p style={{ fontSize:13, color:'var(--text-3)' }}>Loading note…</p>
              </div>
            )}

            {/* Empty */}
            {!loadingNote && !selectedNote && (
              <div style={{ height:'100%', minHeight:400, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:14 }}>
                <div style={{ width:52, height:52, borderRadius:16, background:'var(--accent-dim)', border:'1px solid rgba(99,102,241,0.25)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, color:'var(--accent)' }}>
                  📖
                </div>
                <div style={{ textAlign:'center' }}>
                  <p style={{ fontSize:14, fontWeight:600, color:'var(--text-3)', margin:'0 0 4px' }}>Select a note to view</p>
                  <p style={{ fontSize:12, color:'var(--text-4)', margin:0 }}>
                    {topics.length > 0 ? `${topics.length} note${topics.length > 1 ? 's' : ''} available on the left` : 'Create your first note to get started'}
                  </p>
                </div>
              </div>
            )}

            {/* Note content */}
            {!loadingNote && selectedNote && (
              <AnimatePresence>
                <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} style={{ padding:28 }}>
                  <FinalResult result={selectedNote} />
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .history-grid { grid-template-columns: 1fr !important; }
          .history-sidebar { position: fixed !important; top: 0 !important; left: 0 !important; height: 100vh !important; width: 290px !important; z-index: 45 !important; border-radius: 0 18px 18px 0 !important; }
          .mobile-overlay { display: block !important; }
        }
      `}</style>
    </div>
  )
}
