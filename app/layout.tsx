import type { Metadata } from 'next'
import ErrorBoundary from '../components/ErrorBoundary'

export const metadata: Metadata = {
  title: 'Pacy Training Program Generator',
  description: 'Generate training programs from client briefs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif' }}>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  )
}

