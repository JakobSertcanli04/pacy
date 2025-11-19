import { NextRequest, NextResponse } from 'next/server'
import https from 'https'
import { URL } from 'url'

const WEBHOOK_URL = 'https://primary-production-1f91f.up.railway.app/webhook/12648229-236a-4267-8379-5a599b80393c'
const REQUEST_TIMEOUT = 1800000 // 30 minutes

// Use native https module for full control over timeouts
async function fetchWithTimeout(url: string, options: { method: string; headers: Record<string, string>; body: string }, timeout: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url)
    const requestOptions = {
      hostname: urlObj.hostname,
      port: urlObj.port || 443,
      path: urlObj.pathname + urlObj.search,
      method: options.method,
      headers: options.headers,
      timeout: timeout,
    }

    const req = https.request(requestOptions, (res) => {
      let data = ''
      
      res.on('data', (chunk) => {
        data += chunk
      })
      
      res.on('end', () => {
        if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
          resolve(data)
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data.substring(0, 200)}`))
        }
      })
    })

    req.on('error', (error) => {
      reject(error)
    })

    req.on('timeout', () => {
      req.destroy()
      reject(new Error(`Request timeout after ${timeout / 1000} seconds`))
    })

    req.write(options.body)
    req.end()
  })
}

export async function POST(request: NextRequest) {
  try {
    const { brief } = await request.json()

    if (!brief || typeof brief !== 'string') {
      return NextResponse.json(
        { error: 'Brief is required' },
        { status: 400 }
      )
    }

    try {
      const responseText = await fetchWithTimeout(
        WEBHOOK_URL,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ brief }),
        },
        REQUEST_TIMEOUT
      )
      
      // Return raw JSON string as-is
      return new NextResponse(responseText, {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } catch (fetchError) {
      // Handle different types of timeout errors
      if (fetchError instanceof Error) {
        if (fetchError.message.includes('timeout')) {
          throw new Error('Request timeout: The webhook took longer than 30 minutes to respond. This is normal for complex AI generation tasks. Please try again.')
        }
        
        // Handle connection errors
        if (fetchError.message.includes('ECONNREFUSED') || fetchError.message.includes('ENOTFOUND')) {
          throw new Error('Could not connect to the webhook service. Please check if the service is available.')
        }
      }
      
      throw fetchError
    }
  } catch (error) {
    console.error('Error generating program:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate program' },
      { status: 500 }
    )
  }
}

