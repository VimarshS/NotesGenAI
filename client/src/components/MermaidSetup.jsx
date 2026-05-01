import React, { useEffect, useRef } from 'react'
import mermaid from 'mermaid'

mermaid.initialize({ startOnLoad:false, theme:'dark', themeVariables: {
  primaryColor: '#6366f1', primaryTextColor: '#f0ede8', primaryBorderColor: '#4f46e5',
  lineColor: '#6366f1', secondaryColor: '#1c1f28', tertiaryColor: '#22262f',
  background: '#111318', mainBkg: '#1c1f28', nodeBorder: '#6366f1',
  clusterBkg: '#16181f', titleColor: '#f0ede8', edgeLabelBackground: '#1c1f28',
}})

const clean = (diagram) => {
  if (!diagram) return ''
  let d = diagram.replace(/\r\n/g, '\n').trim()
  if (!d.startsWith('graph') && !d.startsWith('flowchart') && !d.startsWith('sequenceDiagram')) d = `graph TD\n${d}`
  return d
}

const fixNodes = (d) => {
  let idx = 0
  const used = new Map()
  return d.replace(/\[(.*?)\]/g, (match, label) => {
    const key = label.trim()
    if (used.has(key)) return used.get(key)
    idx++
    const node = `N${idx}["${key}"]`
    used.set(key, node)
    return node
  })
}

export default function MermaidSetup({ diagram }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!diagram || !ref.current) return
    const render = async () => {
      try {
        ref.current.innerHTML = ''
        const id = `mermaid-${Math.random().toString(36).slice(2,9)}`
        const { svg } = await mermaid.render(id, fixNodes(clean(diagram)))
        ref.current.innerHTML = svg
      } catch(e) { console.error('Mermaid error:', e) }
    }
    render()
  }, [diagram])

  return (
    <div style={{ padding:24, background:'var(--bg3)', overflowX:'auto', fontFamily:'var(--font)' }}>
      <div ref={ref} style={{ display:'flex', justifyContent:'center' }} />
    </div>
  )
}
