import { NextRequest, NextResponse } from 'next/server'

const WEBHOOK_URL = 'https://primary-production-1f91f.up.railway.app/webhook/12648229-236a-4267-8379-5a599b80393c'

export async function POST(request: NextRequest) {
  try {
    const { brief } = await request.json()

    if (!brief || typeof brief !== 'string') {
      return NextResponse.json(
        { error: 'Brief is required' },
        { status: 400 }
      )
    }

    // Fetch raw JSON from webhook - no processing
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ brief }),
    })

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'No error details')
      throw new Error(`Webhook returned ${response.status}: ${errorText.substring(0, 200)}`)
    }

    // Get raw response text
    const responseText = await response.text()
    
    // Return raw JSON string as-is
    return new NextResponse(responseText, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('Error generating program:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate program' },
      { status: 500 }
    )
  }
}

