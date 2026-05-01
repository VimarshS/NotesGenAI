import React from 'react'
import {
  Bar, BarChart, Cell, Line, LineChart,
  Pie, PieChart, ResponsiveContainer,
  Tooltip, XAxis, YAxis, CartesianGrid, Legend
} from 'recharts'

const COLORS = ['#6366f1', '#34d399', '#fbbf24', '#fb7185', '#a78bfa', '#38bdf8', '#f97316', '#e879f9']

const tooltipStyle = {
  contentStyle: {
    background: '#1c1f28',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 10,
    fontFamily: 'var(--font)',
    fontSize: 12,
    color: '#f0ede8',
  },
  labelStyle: { color: '#a0a0b0', fontWeight: 600 },
  itemStyle: { color: '#f0ede8' },
  cursor: { fill: 'rgba(255,255,255,0.04)' },
}

const CustomBar = (props) => {
  const { x, y, width, height, fill } = props
  const radius = 6
  return (
    <g>
      <rect
        x={x} y={y}
        width={width} height={height}
        rx={radius} ry={radius}
        fill={fill}
        opacity={0.92}
      />
      {/* Top highlight */}
      <rect
        x={x + 2} y={y + 2}
        width={width - 4} height={4}
        rx={4} ry={4}
        fill='rgba(255,255,255,0.18)'
      />
    </g>
  )
}

const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, name, percent }) => {
  const RADIAN = Math.PI / 180
  const radius = innerRadius + (outerRadius - innerRadius) * 1.35
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)
  if (percent < 0.04) return null
  return (
    <text
      x={x} y={y}
      fill='rgba(240,237,232,0.7)'
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline='central'
      style={{ fontSize: 11, fontFamily: 'var(--font)', fontWeight: 500 }}
    >
      {`${name} ${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

export default function RechartSetUp({ charts }) {
  if (!charts?.length) return null

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {charts.map((chart, i) => (
        <div
          key={i}
          style={{
            background: '#16181f',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 16,
            padding: '20px 20px 16px',
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
            <div style={{
              width: 8, height: 8, borderRadius: '50%',
              background: COLORS[i % COLORS.length],
              boxShadow: `0 0 8px ${COLORS[i % COLORS.length]}`,
              flexShrink: 0,
            }} />
            <h4 style={{
              fontSize: 13, fontWeight: 700,
              color: '#f0ede8', margin: 0,
              fontFamily: 'var(--font)', letterSpacing: '-0.01em',
            }}>
              {chart.title}
            </h4>
          </div>

          <div style={{ height: 260 }}>
            <ResponsiveContainer width='100%' height='100%'>

              {chart.type === 'bar' ? (
                <BarChart data={chart.data} barCategoryGap='30%'>
                  <defs>
                    {COLORS.map((color, j) => (
                      <linearGradient key={j} id={`barGrad${i}-${j}`} x1='0' y1='0' x2='0' y2='1'>
                        <stop offset='0%' stopColor={color} stopOpacity={1} />
                        <stop offset='100%' stopColor={color} stopOpacity={0.6} />
                      </linearGradient>
                    ))}
                  </defs>
                  <CartesianGrid strokeDasharray='3 3' stroke='rgba(255,255,255,0.06)' vertical={false} />
                  <XAxis
                    dataKey='name'
                    tick={{ fontSize: 11, fill: 'rgba(240,237,232,0.45)', fontFamily: 'var(--font)' }}
                    axisLine={false} tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: 'rgba(240,237,232,0.45)', fontFamily: 'var(--font)' }}
                    axisLine={false} tickLine={false}
                    width={36}
                  />
                  <Tooltip {...tooltipStyle} />
                  <Bar dataKey='value' shape={<CustomBar />} isAnimationActive={true}>
                    {chart.data.map((_, j) => (
                      <Cell key={j} fill={`url(#barGrad${i}-${j % COLORS.length})`} />
                    ))}
                  </Bar>
                </BarChart>

              ) : chart.type === 'line' ? (
                <LineChart data={chart.data}>
                  <defs>
                    <linearGradient id={`lineGrad${i}`} x1='0' y1='0' x2='1' y2='0'>
                      <stop offset='0%' stopColor='#6366f1' />
                      <stop offset='100%' stopColor='#a78bfa' />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray='3 3' stroke='rgba(255,255,255,0.06)' vertical={false} />
                  <XAxis
                    dataKey='name'
                    tick={{ fontSize: 11, fill: 'rgba(240,237,232,0.45)', fontFamily: 'var(--font)' }}
                    axisLine={false} tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: 'rgba(240,237,232,0.45)', fontFamily: 'var(--font)' }}
                    axisLine={false} tickLine={false}
                    width={36}
                  />
                  <Tooltip {...tooltipStyle} />
                  <Line
                    type='monotone'
                    dataKey='value'
                    stroke={`url(#lineGrad${i})`}
                    strokeWidth={3}
                    dot={{ r: 5, fill: '#6366f1', stroke: '#1c1f28', strokeWidth: 2 }}
                    activeDot={{ r: 7, fill: '#818cf8', stroke: '#1c1f28', strokeWidth: 2 }}
                  />
                </LineChart>

              ) : (
                <PieChart>
                  <defs>
                    {COLORS.map((color, j) => (
                      <radialGradient key={j} id={`pieGrad${i}-${j}`} cx='50%' cy='50%' r='50%'>
                        <stop offset='0%' stopColor={color} stopOpacity={1} />
                        <stop offset='100%' stopColor={color} stopOpacity={0.7} />
                      </radialGradient>
                    ))}
                  </defs>
                  <Tooltip {...tooltipStyle} />
                  <Pie
                    data={chart.data}
                    dataKey='value'
                    nameKey='name'
                    outerRadius={95}
                    innerRadius={48}
                    paddingAngle={3}
                    labelLine={false}
                    label={renderCustomLabel}
                    strokeWidth={0}
                  >
                    {chart.data.map((_, j) => (
                      <Cell key={j} fill={`url(#pieGrad${i}-${j % COLORS.length})`} />
                    ))}
                  </Pie>
                </PieChart>
              )}

            </ResponsiveContainer>
          </div>

          {/* Color legend */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 14px', marginTop: 14 }}>
            {chart.data.map((entry, j) => (
              <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{
                  width: 8, height: 8, borderRadius: 2,
                  background: COLORS[j % COLORS.length],
                  flexShrink: 0,
                }} />
                <span style={{
                  fontSize: 11, color: 'rgba(240,237,232,0.5)',
                  fontFamily: 'var(--font)', fontWeight: 500,
                }}>
                  {entry.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}