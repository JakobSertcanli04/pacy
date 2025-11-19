'use client'

import { TrainingProgram } from '../app/page'

interface GeneratedContentProps {
  program: TrainingProgram
}

export default function GeneratedContent({ program }: GeneratedContentProps) {
  const downloadJSON = () => {
    const dataStr = JSON.stringify(program, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'training-program.json'
    link.click()
    URL.revokeObjectURL(url)
  }

  const downloadTXT = () => {
    let content = 'TRAINING PROGRAM\n'
    content += '='.repeat(50) + '\n\n'

    // Chapters and Sessions
    content += 'PROGRAM MATRIX\n'
    content += '-'.repeat(50) + '\n\n'
    
    program.chapters.forEach((chapter, idx) => {
      content += `Chapter ${idx + 1}: ${chapter.title}\n\n`
      chapter.sessions.forEach((session, sidx) => {
        content += `  Session ${sidx + 1}: ${session.title}\n`
        content += `    WIIFM: ${session.wiifm}\n\n`
      })
    })

    // Articles
    if (program.articles.length > 0) {
      content += '\n\nARTICLES\n'
      content += '-'.repeat(50) + '\n\n'
      program.articles.forEach((article, idx) => {
        content += `Article ${idx + 1}: ${article.title}\n`
        content += `Word Count: ${article.wordCount}\n\n`
        content += `${article.content}\n\n`
        content += '-'.repeat(50) + '\n\n'
      })
    }

    // Quiz Questions
    if (program.quizQuestions.length > 0) {
      content += '\n\nQUIZ QUESTIONS\n'
      content += '-'.repeat(50) + '\n\n'
      program.quizQuestions.forEach((q, idx) => {
        content += `Q${idx + 1}: ${q.question}\n`
        q.options.forEach((opt, oidx) => {
          const marker = oidx === q.correctAnswer ? '✓' : ' '
          content += `  ${marker} ${oidx + 1}. ${opt}\n`
        })
        if (q.explanation) {
          content += `  Explanation: ${q.explanation}\n`
        }
        content += '\n'
      })
    }

    const dataBlob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'training-program.txt'
    link.click()
    URL.revokeObjectURL(url)
  }

  const totalSessions = program.chapters.reduce(
    (sum, chapter) => sum + chapter.sessions.length, 
    0
  )

  return (
    <div style={{ marginTop: '2rem' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem',
        paddingBottom: '1rem',
        borderBottom: '2px solid #eee'
      }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333' }}>
          Generated Training Program
        </h2>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={downloadJSON}
            style={{
              padding: '0.5rem 1rem',
              fontSize: '0.9rem',
              backgroundColor: '#0070f3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Download JSON
          </button>
          <button
            onClick={downloadTXT}
            style={{
              padding: '0.5rem 1rem',
              fontSize: '0.9rem',
              backgroundColor: '#0070f3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Download TXT
          </button>
        </div>
      </div>

      {/* Program Matrix */}
      <section style={{ marginBottom: '2rem' }}>
        <h3 style={{ 
          fontSize: '1.25rem', 
          fontWeight: '600',
          marginBottom: '1rem',
          color: '#333'
        }}>
          Program Matrix ({program.chapters.length} Chapters, {totalSessions} Sessions)
        </h3>
        {program.chapters.map((chapter, cidx) => (
          <div 
            key={cidx}
            style={{
              marginBottom: '1.5rem',
              padding: '1rem',
              backgroundColor: '#f9f9f9',
              borderRadius: '4px'
            }}
          >
            <h4 style={{ 
              fontSize: '1.1rem', 
              fontWeight: '600',
              marginBottom: '0.75rem',
              color: '#0070f3'
            }}>
              Chapter {cidx + 1}: {chapter.title}
            </h4>
            {chapter.sessions.map((session, sidx) => (
              <div 
                key={sidx}
                style={{
                  marginBottom: '1rem',
                  padding: '0.75rem',
                  backgroundColor: 'white',
                  borderRadius: '4px',
                  borderLeft: '3px solid #0070f3'
                }}
              >
                <div style={{ fontWeight: '500', marginBottom: '0.25rem' }}>
                  Session {sidx + 1}: {session.title}
                </div>
                <div style={{ 
                  fontSize: '0.9rem', 
                  color: '#666',
                  fontStyle: 'italic'
                }}>
                  WIIFM: {session.wiifm}
                </div>
              </div>
            ))}
          </div>
        ))}
      </section>

      {/* Articles */}
      {program.articles.length > 0 && (
        <section style={{ marginBottom: '2rem' }}>
          <h3 style={{ 
            fontSize: '1.25rem', 
            fontWeight: '600',
            marginBottom: '1rem',
            color: '#333'
          }}>
            Articles ({program.articles.length})
          </h3>
          {program.articles.map((article, idx) => (
            <div 
              key={idx}
              style={{
                marginBottom: '1.5rem',
                padding: '1.5rem',
                backgroundColor: '#f9f9f9',
                borderRadius: '4px'
              }}
            >
              <h4 style={{ 
                fontSize: '1.1rem', 
                fontWeight: '600',
                marginBottom: '0.5rem',
                color: '#333'
              }}>
                {article.title}
              </h4>
              <p style={{ 
                fontSize: '0.85rem', 
                color: '#666',
                marginBottom: '1rem'
              }}>
                {article.wordCount} words
              </p>
              <div style={{ 
                lineHeight: '1.6',
                color: '#444',
                whiteSpace: 'pre-wrap'
              }}>
                {article.content}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Quiz Questions */}
      {program.quizQuestions.length > 0 && (
        <section>
          <h3 style={{ 
            fontSize: '1.25rem', 
            fontWeight: '600',
            marginBottom: '1rem',
            color: '#333'
          }}>
            Quiz Questions ({program.quizQuestions.length})
          </h3>
          {program.quizQuestions.map((q, idx) => (
            <div 
              key={idx}
              style={{
                marginBottom: '1.5rem',
                padding: '1rem',
                backgroundColor: '#f9f9f9',
                borderRadius: '4px'
              }}
            >
              <div style={{ 
                fontWeight: '500',
                marginBottom: '0.75rem',
                color: '#333'
              }}>
                Q{idx + 1}: {q.question}
              </div>
              <div style={{ marginLeft: '1rem', marginBottom: '0.5rem' }}>
                {q.options.map((opt, oidx) => (
                  <div 
                    key={oidx}
                    style={{
                      padding: '0.25rem 0',
                      color: oidx === q.correctAnswer ? '#0070f3' : '#666',
                      fontWeight: oidx === q.correctAnswer ? '500' : 'normal'
                    }}
                  >
                    {oidx + 1}. {opt} {oidx === q.correctAnswer && '✓'}
                  </div>
                ))}
              </div>
              {q.explanation && (
                <div style={{ 
                  marginTop: '0.5rem',
                  padding: '0.5rem',
                  backgroundColor: '#e6f3ff',
                  borderRadius: '4px',
                  fontSize: '0.9rem',
                  color: '#555'
                }}>
                  <strong>Explanation:</strong> {q.explanation}
                </div>
              )}
            </div>
          ))}
        </section>
      )}
    </div>
  )
}

