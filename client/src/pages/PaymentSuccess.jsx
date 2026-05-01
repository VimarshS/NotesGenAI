import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { useDispatch } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { serverUrl } from '../App'
import { setUserData } from '../redux/userSlice'

export default function PaymentSuccess() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [status, setStatus] = useState('verifying')
  const [creditsAdded, setCreditsAdded] = useState(0)
  const [newTotal, setNewTotal] = useState(0)
  const attemptRef = useRef(0)

  useEffect(() => {
    const sessionId = searchParams.get('session_id')
    if (sessionId) {
      tryVerify(sessionId)
    } else {
      // No session_id — just refresh user and go home
      refreshUserAndRedirect()
    }
  }, [])

  const refreshUserAndRedirect = async () => {
    try {
      const res = await axios.get(serverUrl + '/api/user/currentuser', { withCredentials: true })
      dispatch(setUserData(res.data))
    } catch (e) {
      console.log('Refresh error:', e)
    }
    setStatus('success')
    setTimeout(() => navigate('/'), 3000)
  }

  const tryVerify = async (sessionId) => {
    attemptRef.current += 1
    const attempt = attemptRef.current

    try {
      const res = await axios.get(
        `${serverUrl}/api/credit/verify?session_id=${sessionId}`,
        { withCredentials: true }
      )

      const { credits, added, alreadyProcessed } = res.data

      // Update redux with the fresh credits value from DB
      // Fetch full user object so we don't lose any other fields
      try {
        const userRes = await axios.get(serverUrl + '/api/user/currentuser', { withCredentials: true })
        dispatch(setUserData(userRes.data))
      } catch (e) {
        console.log('User refresh error:', e)
      }

      setNewTotal(credits)
      setCreditsAdded(alreadyProcessed ? 0 : added)
      setStatus(alreadyProcessed ? 'already' : 'success')
      setTimeout(() => navigate('/'), 4000)

    } catch (err) {
      const status = err?.response?.status
      const msg = err?.response?.data?.message || ''

      console.log(`Attempt ${attempt} failed: ${status} — ${msg}`)

      // 402 = payment not completed yet — retry up to 6 times
      if (status === 402 && attempt < 6) {
        setTimeout(() => tryVerify(sessionId), 2000)
        return
      }

      // 403 = wrong user, 400 = bad session — don't retry
      if (status === 403 || status === 400) {
        setStatus('error')
        setTimeout(() => navigate('/'), 4000)
        return
      }

      // Any other error — retry up to 6 times
      if (attempt < 6) {
        setTimeout(() => tryVerify(sessionId), 2000)
        return
      }

      // All retries exhausted — still refresh user and go home
      console.error('All verification attempts failed')
      await refreshUserAndRedirect()
      setStatus('error')
    }
  }

  const copy = {
    verifying: {
      icon: 'spin',
      title: 'Verifying Payment…',
      sub: 'Confirming your payment with Stripe. Please wait.',
      iconBg: 'rgba(99,102,241,0.12)',
      iconBorder: 'rgba(99,102,241,0.3)',
      iconColor: '#6366f1',
    },
    success: {
      icon: '✓',
      title: 'Payment Successful!',
      sub: creditsAdded > 0
        ? `${creditsAdded} credits added. Your new balance is ${newTotal} credits.`
        : `Credits have been added. Your balance is ${newTotal} credits.`,
      iconBg: 'rgba(52,211,153,0.1)',
      iconBorder: 'rgba(52,211,153,0.3)',
      iconColor: '#34d399',
    },
    already: {
      icon: '✓',
      title: 'Credits Ready!',
      sub: `Your credits are already in your account. Balance: ${newTotal} credits.`,
      iconBg: 'rgba(52,211,153,0.1)',
      iconBorder: 'rgba(52,211,153,0.3)',
      iconColor: '#34d399',
    },
    error: {
      icon: '!',
      title: 'Verification Delayed',
      sub: 'Payment was received but credits may take a moment. Please refresh the app.',
      iconBg: 'rgba(251,191,36,0.1)',
      iconBorder: 'rgba(251,191,36,0.3)',
      iconColor: '#fbbf24',
    },
  }

  const c = copy[status]

  return (
    <div style={{
      minHeight: '100vh', background: 'var(--bg)', fontFamily: 'var(--font)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
    }}>
      <div className='grid-bg' style={{ position: 'fixed', inset: 0, opacity: 0.3, pointerEvents: 'none' }} />

      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        style={{
          position: 'relative', zIndex: 1, textAlign: 'center',
          width: '100%', maxWidth: 400,
          background: 'var(--bg2)', border: '1px solid var(--border)',
          borderRadius: 24, padding: '48px 36px',
          boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
        }}
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }}
          style={{
            width: 80, height: 80, borderRadius: 24,
            background: c.iconBg, border: `1px solid ${c.iconBorder}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 24px', fontSize: 34, color: c.iconColor,
          }}
        >
          {c.icon === 'spin' ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              style={{
                width: 34, height: 34, borderRadius: '50%',
                border: '3px solid rgba(99,102,241,0.15)',
                borderTopColor: '#6366f1',
              }}
            />
          ) : c.icon}
        </motion.div>

        <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.04em', color: 'var(--text)', margin: '0 0 10px' }}>
          {c.title}
        </h1>
        <p style={{ fontSize: 14, color: 'var(--text-2)', margin: '0 0 32px', lineHeight: 1.65 }}>
          {c.sub}
        </p>

        {/* Bottom indicator */}
        {status === 'verifying' ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            {[0, 0.2, 0.4].map((delay, i) => (
              <motion.div key={i}
                animate={{ opacity: [1, 0.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.2, delay }}
                style={{ width: 6, height: 6, borderRadius: '50%', background: '#6366f1' }}
              />
            ))}
          </div>
        ) : (
          <p style={{ fontSize: 12, color: 'var(--text-4)', margin: 0 }}>
            Redirecting to home in a moment…
          </p>
        )}
      </motion.div>
    </div>
  )
}