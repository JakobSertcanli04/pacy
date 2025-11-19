Pacy Träningsprogramgenerator
<img width="1058" height="199" alt="image" src="https://github.com/user-attachments/assets/5fb3a879-b5f3-47ed-8e38-31b8a114ff79" />

En Next.js-applikation som genererar träningsprogram utifrån kundbriefar. Appen kopplar till en webhook som orkestrerar flera AI-agenter (ämnesforskning, skrivaragent, kvalitetskontroll) för att skapa heltäckande utbildningsmaterial.

Funktioner

Inmatning av kundbrief: Enkel webbvy där man kan klistra in kundens brief

Träningsprogrammatris: Genererar 3 kapitel med 9–12 sessioner, varje med ett WIIFM (What's In It For Me)

Artiklar: Genererar 1–2 exempelartiklar (800–1000 ord vardera)

Quizfrågor: Skapar flervalsfrågor med svarsalternativ

Nedladdning: Exportera genererat innehåll som JSON- eller TXT-filer

Kom igång
Förutsättningar

Node.js 18+ och npm

Installation

Installera beroenden:

npm install


Starta utvecklingsservern:

npm run dev


Öppna http://localhost:3000
 i din webbläsare

Bygg för produktion
npm run build
npm start

Hur det fungerar

Användaren klistrar in en kundbrief i webbgränssnittet

Appen skickar briefen till den konfigurerade webhook-endpointen

Webhooken orkestrerar flera AI-agenter

Det genererade träningsprogrammet visas i gränssnittet

Användare kan ladda ner innehållet som JSON

Webhook-konfiguration

Webhook-URL:en konfigureras i app/api/generate/route.ts. Webhooken ska returnera JSON i följande format:

{
  "chapters": [
    {
      "title": "Kapiteltitel",
      "sessions": [
        {
          "title": "Sessionstitel",
          "wiifm": "Beskrivning av vad man får ut av sessionen"
        }
      ]
    }
  ],
  "articles": [
    {
      "title": "Artikelrubrik",
      "content": "Artikelinnehåll...",
      "wordCount": 850
    }
  ],
  "quizQuestions": [
    {
      "question": "Frågetext?",
      "options": ["Alternativ 1", "Alternativ 2", "Alternativ 3", "Alternativ 4"],
      "correctAnswer": 0,
      "explanation": "Förklaring"
    }
  ]
}

Projektstruktur
pacy/
├── app/
│   ├── layout.tsx           # Root-layout
│   ├── page.tsx             # Huvudsida
│   └── api/
│       └── generate/
│           └── route.ts     # API-route för webhook-integration
├── components/
│   ├── BriefInput.tsx       # Formulär för brief-inmatning
│   └── GeneratedContent.tsx # Visning och nedladdning av genererat innehåll
├── package.json
├── tsconfig.json
└── next.config.js
