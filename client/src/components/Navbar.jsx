import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import logo from '../assets/logo.png'
import lg from '../assets/lg.png'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { serverUrl } from '../App'
import { setUserData } from '../redux/userSlice'
import { useNavigate, useLocation } from 'react-router-dom'

export default function Navbar() {
  const { userData } = useSelector(s => s.user)
  const credits = userData?.credits ?? 0
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [creditsOpen, setCreditsOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const creditsRef = useRef(null)
  const profileRef = useRef(null)

  useEffect(() => {
    const handler = (e) => {
      if (creditsRef.current && !creditsRef.current.contains(e.target)) setCreditsOpen(false)
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleSignOut = async () => {
    try {
      await axios.get(serverUrl + '/api/auth/logout', { withCredentials: true })
      dispatch(setUserData(null))
      navigate('/auth')
    } catch (e) { console.log(e) }
  }

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Generate', path: '/notes' },
    { label: 'History', path: '/history' },
  ]

  const S = {
    nav: {
      position: 'fixed',
      top: 12,
      left: '20%',
      transform: 'translateX(-50%)',
      zIndex: 50,
      width: 'min(calc(100vw - 24px), 740px)',
      background: 'rgba(17,19,24,0.90)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: '1px solid rgba(255,255,255,0.09)',
      borderRadius: 14,
      boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
      display: 'flex',
      alignItems: 'center',
      gap: 0,
      padding: '5px 6px',
      fontFamily: 'var(--font)',
      minHeight: 48,
    },
  }

  return (
    <motion.nav
      initial={{ opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      style={S.nav}
    >
      {/* ── Logo ── */}
      <button
        onClick={() => navigate('/')}
        style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '6px 10px', borderRadius: 8,
          background: 'transparent', border: 'none', cursor: 'pointer',
          flexShrink: 0, transition: 'background 0.15s',
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
      >
        <img src={lg} alt='logo' style={{ width: 22, height: 22, borderRadius: 6, objectFit: 'cover', flexShrink: 0 }} />
        <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.03em', whiteSpace: 'nowrap' }}>
          NotesGen<span style={{ color: 'var(--accent)' }}>.</span>AI
        </span>
      </button>

      {/* Divider */}
      <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.09)', flexShrink: 0, margin: '0 6px' }} />

      {/* ── Nav Links ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
        {navLinks.map(l => {
          const active = location.pathname === l.path
          return (
            <button
              key={l.path}
              onClick={() => navigate(l.path)}
              style={{
                padding: '7px 11px', borderRadius: 8, border: 'none', cursor: 'pointer',
                fontSize: 13, fontWeight: 600, fontFamily: 'var(--font)',
                color: active ? 'var(--text)' : 'var(--text-3)',
                background: active ? 'rgba(255,255,255,0.08)' : 'transparent',
                transition: 'all 0.15s', whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => { if (!active) { e.currentTarget.style.color = 'var(--text-2)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)' } }}
              onMouseLeave={e => { if (!active) { e.currentTarget.style.color = 'var(--text-3)'; e.currentTarget.style.background = 'transparent' } }}
            >
              {l.label}
            </button>
          )
        })}
      </div>

      {/* ── Right side ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>

        {/* Credits button */}
        <div ref={creditsRef} style={{ position: 'relative' }}>
          <button
            onClick={() => { setCreditsOpen(v => !v); setProfileOpen(false) }}
            style={{
              display: 'flex', alignItems: 'center', gap: 5,
              padding: '6px 11px', borderRadius: 8,
              border: '1px solid rgba(99,102,241,0.28)',
              background: 'rgba(99,102,241,0.12)',
              cursor: 'pointer', transition: 'all 0.15s',
              fontSize: 12, fontWeight: 700,
              fontFamily: 'var(--font)', color: 'var(--accent-2)',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.2)'; e.currentTarget.style.borderColor = 'rgba(99,102,241,0.45)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.12)'; e.currentTarget.style.borderColor = 'rgba(99,102,241,0.28)' }}
          >
            <span style={{ fontSize: 9, lineHeight: 1 }}>◆</span>
            <span style={{ fontVariantNumeric: 'tabular-nums' }}>{credits}</span>
            <span style={{ color: 'var(--text-3)', fontSize: 11, fontWeight: 500 }}>cr</span>
          </button>

          <AnimatePresence>
            {creditsOpen && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.96 }}
                animate={{ opacity: 1, y: 8, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.96 }}
                transition={{ duration: 0.15 }}
                style={{
                  position: 'absolute', right: 0, top: '100%',
                  width: 220, marginTop: 4,
                  background: 'var(--bg4)', border: '1px solid var(--border2)',
                  borderRadius: 14, boxShadow: '0 16px 48px rgba(0,0,0,0.7)',
                  overflow: 'hidden', zIndex: 100,
                }}
              >
                <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span style={{ color: 'var(--accent)', fontSize: 13 }}>◆</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', fontFamily: 'var(--font)' }}>{credits} credits left</span>
                  </div>
                  <p style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: 'var(--font)', margin: 0 }}>Used for AI note generation</p>
                </div>
                <div style={{ padding: 10 }}>
                  <button
                    onClick={() => { setCreditsOpen(false); navigate('/pricing') }}
                    style={{
                      width: '100%', padding: '9px 14px', borderRadius: 8, border: 'none',
                      background: 'var(--accent)', color: 'white', cursor: 'pointer',
                      fontSize: 13, fontWeight: 600, fontFamily: 'var(--font)',
                      boxShadow: '0 4px 16px var(--accent-glow)',
                    }}
                  >
                    Buy More Credits →
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile button */}
        <div ref={profileRef} style={{ position: 'relative' }}>
          <button
            onClick={() => { setProfileOpen(v => !v); setCreditsOpen(false) }}
            style={{
              width: 34, height: 34, borderRadius: 9,
              border: '1px solid rgba(255,255,255,0.12)',
              background: 'rgba(255,255,255,0.07)',
              cursor: 'pointer', fontFamily: 'var(--font)',
              fontSize: 13, fontWeight: 700, color: 'var(--text)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.15s', flexShrink: 0,
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.boxShadow = '0 0 0 3px var(--accent-dim)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.boxShadow = 'none' }}
          >
            {userData?.name?.slice(0, 1).toUpperCase()}
          </button>

          <AnimatePresence>
            {profileOpen && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.96 }}
                animate={{ opacity: 1, y: 8, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.96 }}
                transition={{ duration: 0.15 }}
                style={{
                  position: 'absolute', right: 0, top: '100%',
                  width: 210, marginTop: 4,
                  background: 'var(--bg4)', border: '1px solid var(--border2)',
                  borderRadius: 14, boxShadow: '0 16px 48px rgba(0,0,0,0.7)',
                  overflow: 'hidden', zIndex: 100,
                }}
              >
                <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)' }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: 8,
                    background: 'var(--accent-dim)', border: '1px solid rgba(99,102,241,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 14, fontWeight: 700, color: 'var(--accent-2)',
                    fontFamily: 'var(--font)', marginBottom: 10,
                  }}>
                    {userData?.name?.slice(0, 1).toUpperCase()}
                  </div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', fontFamily: 'var(--font)', margin: '0 0 3px', lineHeight: 1.2 }}>{userData?.name}</p>
                  <p style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: 'var(--font)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{userData?.email}</p>
                </div>
                <div style={{ padding: 8 }}>
                  {[
                    { label: 'Generate Notes', path: '/notes' },
                    { label: 'Note History', path: '/history' },
                    { label: 'Buy Credits', path: '/pricing' },
                  ].map(item => (
                    <button
                      key={item.path}
                      onClick={() => { setProfileOpen(false); navigate(item.path) }}
                      style={{
                        width: '100%', textAlign: 'left', display: 'block',
                        padding: '8px 12px', borderRadius: 7,
                        fontFamily: 'var(--font)', fontSize: 13,
                        color: 'var(--text-2)', background: 'transparent',
                        border: 'none', cursor: 'pointer', transition: 'all 0.15s',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'var(--text)' }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-2)' }}
                    >
                      {item.label}
                    </button>
                  ))}
                  <div style={{ height: 1, background: 'var(--border)', margin: '6px 4px' }} />
                  <button
                    onClick={handleSignOut}
                    style={{
                      width: '100%', textAlign: 'left', display: 'block',
                      padding: '8px 12px', borderRadius: 7,
                      fontFamily: 'var(--font)', fontSize: 13,
                      color: 'var(--rose)', background: 'transparent',
                      border: 'none', cursor: 'pointer', transition: 'background 0.15s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(251,113,133,0.08)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    Sign out
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  )
}