
# Pacy Träningsprogramgenerator

<img width="1058" height="199" alt="image" src="https://github.com/user-attachments/assets/5fb3a879-b5f3-47ed-8e38-31b8a114ff79" />

En Next.js-applikation som genererar träningsprogram baserat på kundbriefar. Applikationen kopplar mot en webhook som använder flera AI-agenter (ämnesresearch, skrivande, kvalitetskontroll) för att skapa komplett utbildningsmaterial.

## Funktioner

* **Inmatning av kundbrief** via ett enkelt webbaserat formulär
* **Träningsprogrammatris** med 3 kapitel och totalt 9–12 sessioner, alla med WIIFM (What's In It For Me)
* **Artiklar** på 800–1000 ord, 1–2 stycken per program
* **Quizfrågor** med flervalsalternativ och förklaringar
* **Nedladdning** av genererat innehåll som JSON- eller TXT-filer

## Kom igång

### Förutsättningar

* Node.js 18+
* npm

### Installation

1. Installera beroenden:

```bash
npm install
```

2. Starta utvecklingsservern:

```bash
npm run dev
```

3. Öppna `http://localhost:3000` i webbläsaren.

### Bygg för produktion

```bash
npm run build
npm start
```

## Hur det fungerar

1. Användaren klistrar in en kundbrief i applikationen
2. Briefen skickas till en konfigurerad webhook
3. Webhooken orkestrerar flera AI-agenter
4. Det genererade träningsprogrammet visas i gränssnittet
5. Användaren kan ladda ner materialet som JSON eller TXT

## Webhook-konfiguration

Webhook-URL:en ställs in i `app/api/generate/route.ts`. Webhooken ska returnera JSON på följande format:

```json
{
  "chapters": [
    {
      "title": "Kapiteltitel",
      "sessions": [
        {
          "title": "Sessionstitel",
          "wiifm": "Vad deltagaren får ut av sessionen"
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
```

## Projektstruktur

```
pacy/
├── app/
│   ├── layout.tsx             # Root-layout
│   ├── page.tsx               # Huvudsida
│   └── api/
│       └── generate/
│           └── route.ts       # API-route för webhook-integration
├── components/
│   ├── BriefInput.tsx         # Formulär för brief-inmatning
│   └── GeneratedContent.tsx   # Visning och nedladdning av innehåll
├── package.json
├── tsconfig.json
└── next.config.js
```

---

