# Pacy Training Program Generator

A Next.js application that generates training programs from client briefs. The app connects to a webhook that orchestrates multiple AI agents (topic research, writer agent, quality control) to create comprehensive training materials.

## Features

- **Client Brief Input**: Simple web interface to paste client briefs
- **Training Program Matrix**: Generates 3 chapters with 9-12 sessions, each with a WIIFM (What's In It For Me)
- **Articles**: Generates 1-2 example text articles (800-1000 words each)
- **Quiz Questions**: Creates quiz questions with multiple choice options
- **Download Support**: Export generated content as JSON or TXT files

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## How It Works

1. User pastes a client brief in the web interface
2. The app sends the brief to the configured webhook endpoint
3. The webhook orchestrates multiple AI agents
4. The generated training program is displayed in the UI
5. Users can download the content as JSON

## Webhook Configuration

The webhook URL is configured in `app/api/generate/route.ts`. The webhook should return JSON in the following format:

```json
{
  "chapters": [
    {
      "title": "Chapter Title",
      "sessions": [
        {
          "title": "Session Title",
          "wiifm": "What's in it for me description"
        }
      ]
    }
  ],
  "articles": [
    {
      "title": "Article Title",
      "content": "Article content...",
      "wordCount": 850
    }
  ],
  "quizQuestions": [
    {
      "question": "Question text?",
      "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
      "correctAnswer": 0,
      "explanation": "Explanation text"
    }
  ]
}
```

## Project Structure

```
pacy/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main page component
│   └── api/
│       └── generate/
│           └── route.ts    # API route for webhook integration
├── components/
│   ├── BriefInput.tsx      # Brief input form
│   └── GeneratedContent.tsx # Content display and download
├── package.json
├── tsconfig.json
└── next.config.js
```

