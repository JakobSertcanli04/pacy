'use client'

import { useEffect } from 'react'

export default function ErrorBoundary({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Handle unhandled promise rejections
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      // Log the error but don't show it to the user unless it's a real application error
      // Many browser extensions cause false positives
      console.warn('Unhandled promise rejection:', event.reason)
      
      // Only prevent default if it's actually an error we care about
      // Browser extension errors are safe to ignore
      if (event.reason && typeof event.reason === 'object' && 'message' in event.reason) {
        const errorMessage = String(event.reason.message || '')
        // Ignore common browser extension errors
        if (errorMessage.includes('message channel') || 
            errorMessage.includes('Extension context invalidated')) {
          event.preventDefault()
        }
      }
    }

    window.addEventListener('unhandledrejection', handleUnhandledRejection)

    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
    }
  }, [])

  return <>{children}</>
}

