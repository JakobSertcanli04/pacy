'use client'

import { useState } from 'react'

interface BriefInputProps {
  onGenerate: (brief: string) => void
  loading: boolean
}

export default function BriefInput({ onGenerate, loading }: BriefInputProps) {
  const [brief, setBrief] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (brief.trim()) {
      onGenerate(brief)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="brief" style={{ 
          display: 'block', 
          marginBottom: '0.5rem',
          fontWeight: '500',
          color: '#333'
        }}>
          Client Brief
        </label>
        <textarea
          id="brief"
          value={brief}
          onChange={(e) => setBrief(e.target.value)}
          placeholder="Paste your client brief here..."
          style={{
            width: '100%',
            minHeight: '200px',
            padding: '1rem',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '1rem',
            fontFamily: 'inherit',
            resize: 'vertical'
          }}
          disabled={loading}
        />
      </div>
      <button
        type="submit"
        disabled={loading || !brief.trim()}
        style={{
          padding: '0.75rem 2rem',
          fontSize: '1rem',
          fontWeight: '500',
          color: 'white',
          backgroundColor: loading ? '#999' : '#0070f3',
          border: 'none',
          borderRadius: '4px',
          cursor: loading ? 'not-allowed' : 'pointer',
          transition: 'background-color 0.2s'
        }}
      >
        {loading ? 'Generating...' : 'Generate Training Program'}
      </button>
    </form>
  )
}

