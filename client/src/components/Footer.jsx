import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { serverUrl } from '../App'
import { setUserData } from '../redux/userSlice'

export default function Footer() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSignOut = async () => {
    try {
      await axios.get(serverUrl + '/api/auth/logout', { withCredentials:true })
      dispatch(setUserData(null))
      navigate('/auth')
    } catch(e) { console.log(e) }
  }

  return (
    <footer style={{
      position:'relative', zIndex:1,
      maxWidth:1100, margin:'0 auto', padding:'0 24px 32px',
      fontFamily:'var(--font)',
    }}>
      <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:20, padding:'36px 40px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:32 }} className='footer-grid'>

          {/* Brand */}
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:12 }}>
              <div style={{ width:8, height:8, borderRadius:'50%', background:'var(--accent)', boxShadow:'0 0 10px var(--accent)' }} />
              <span style={{ fontSize:14, fontWeight:700, color:'var(--text)', letterSpacing:'-0.03em' }}>
                NotesGen<span style={{ color:'var(--accent)' }}>.</span>AI
              </span>
            </div>
            <p style={{ fontSize:12, color:'var(--text-3)', lineHeight:1.6, maxWidth:220, margin:0 }}>
              AI-powered exam notes, diagrams, and revision PDFs for students.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className='t-label' style={{ marginBottom:14 }}>Navigate</p>
            <div style={{ display:'flex', flexDirection:'column', gap:9 }}>
              {[['Home', '/'], ['Generate Notes', '/notes'], ['History', '/history'], ['Buy Credits', '/pricing']].map(([label, path]) => (
                <button key={label} onClick={() => navigate(path)}
                  style={{ background:'none', border:'none', cursor:'pointer', textAlign:'left', fontSize:13, color:'var(--text-3)', fontFamily:'var(--font)', padding:0, transition:'color 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.color='var(--text)'}
                  onMouseLeave={e => e.currentTarget.style.color='var(--text-3)'}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Account */}
          <div>
            <p className='t-label' style={{ marginBottom:14 }}>Account</p>
            <div style={{ display:'flex', flexDirection:'column', gap:9 }}>
              <button onClick={handleSignOut}
                style={{ background:'none', border:'none', cursor:'pointer', textAlign:'left', fontSize:13, color:'var(--rose)', fontFamily:'var(--font)', padding:0 }}>
                Sign Out
              </button>
              <span style={{ fontSize:13, color:'var(--text-3)' }}>support@notesgen.ai</span>
            </div>
          </div>
        </div>

        <div className='divider' style={{ margin:'28px 0 20px' }} />

        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:10 }}>
          <p style={{ fontSize:11, color:'var(--text-4)', margin:0 }}>
            © {new Date().getFullYear()} NotesGen AI. All rights reserved.
          </p>
          <span className='badge badge-green' style={{ fontSize:10 }}>
            <span style={{ width:5, height:5, borderRadius:'50%', background:'var(--green)', display:'inline-block' }} />
            All systems operational
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .footer-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
        }
      `}</style>
    </footer>
  )
}
