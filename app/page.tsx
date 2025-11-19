'use client'

import { useState } from 'react'
import BriefInput from '../components/BriefInput'

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [output, setOutput] = useState<string>('')
  const [error, setError] = useState<string | null>(null)

  const downloadJSON = () => {
    if (!output) return
    
    const dataBlob = new Blob([output], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `webhook-response-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleGenerate = async (brief: string) => {
    setLoading(true)
    setError(null)
    setOutput('')
    
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ brief }),
      })

      if (!response.ok) {
        // Try to get error message from response
        let errorMessage = `Request failed with status ${response.status}`
        try {
          const errorData = await response.json()
          errorMessage = errorData.error || errorMessage
        } catch {
          try {
            const errorText = await response.text()
            if (errorText) errorMessage = errorText.substring(0, 200)
          } catch {
            // Use default error message
          }
        }
        throw new Error(errorMessage)
      }

      // Get raw response text
      const responseText = await response.text()
      
      // Try to format as JSON if it's valid JSON, otherwise show raw text
      try {
        const parsed = JSON.parse(responseText)
        const formattedOutput = JSON.stringify(parsed, null, 2)
        setOutput(formattedOutput)
      } catch {
        // If not valid JSON, show raw text
        setOutput(responseText)
      }
    } catch (err) {
      // Handle different types of errors
      if (err instanceof TypeError && err.message.includes('fetch')) {
        setError('Network error: Please check your internet connection and try again.')
      } else if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('An unexpected error occurred. Please try again.')
      }
      console.error('Error generating program:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f5f5f5',
      padding: '2rem'
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        padding: '2rem'
      }}>
        <h1 style={{ 
          fontSize: '2rem', 
          fontWeight: 'bold',
          marginBottom: '0.5rem',
          color: '#333'
        }}>
          Pacy Training Program Generator
        </h1>
        <p style={{ color: '#666', marginBottom: '2rem' }}>
          Paste your client brief below to generate a complete training program
        </p>

        <BriefInput onGenerate={handleGenerate} loading={loading} />
        
        <div style={{ marginTop: '2rem' }}>
          <label htmlFor="output" style={{ 
            display: 'block', 
            marginBottom: '0.5rem',
            fontWeight: '500',
            color: '#333'
          }}>
            Output
          </label>
          <textarea
            id="output"
            value={output}
            readOnly
            placeholder="Output will appear here after generating..."
            style={{
              width: '100%',
              minHeight: '400px',
              padding: '1rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '0.9rem',
              fontFamily: 'monospace',
              backgroundColor: '#f9f9f9',
              resize: 'vertical'
            }}
          />
          <button
            onClick={downloadJSON}
            disabled={!output}
            style={{
              marginTop: '1rem',
              padding: '0.75rem 2rem',
              fontSize: '1rem',
              fontWeight: '500',
              color: 'white',
              backgroundColor: !output ? '#999' : '#0070f3',
              border: 'none',
              borderRadius: '4px',
              cursor: !output ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s'
            }}
          >
            Download
          </button>
        </div>

        {error && (
          <div style={{
            marginTop: '1rem',
            padding: '1rem',
            backgroundColor: '#fee',
            border: '1px solid #fcc',
            borderRadius: '4px',
            color: '#c33'
          }}>
            Error: {error}
          </div>
        )}
      </div>
    </div>
  )
}

