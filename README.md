
# Pacy Träningsprogramgenerator

<img width="1058" height="199" alt="image" src="https://github.com/user-attachments/assets/5fb3a879-b5f3-47ed-8e38-31b8a114ff79" />

En Next.js-applikation som genererar träningsprogram baserat på kundbriefar. Applikationen kopplar mot en webhook som använder flera AI-agenter för att skapa komplett utbildningsmaterial.

## Funktioner

* **Inmatning av kundbrief** via ett enkelt webbaserat formulär
* **Träningsprogrammatris** med 3 kapitel och totalt 9–12 sessioner, alla med WIIFM (What's In It For Me)
* **Artiklar** på 800–1000 ord, 1–2 stycken per program
* **Quizfrågor** med flervalsalternativ och förklaringar
* **Nedladdning** av genererat innehåll som JSON- eller TXT-filer

## Kom igång

## Länk: [Pacy Training Program Generator](https://some-new-onboarding.up.railway.app/)
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


## Vad jag valde att bygga först

Jag prioriterade att få hela huvudflödet att fungera stabilt: från att användaren klistrar in en brief → att den skickas till webhooken → att agentkedjan genererar en komplett programmatris och tillhörande innehåll → att resultatet renderas tydligt i UI:t. Fokus låg på att få ner en grundläggande struktur som sessions, kapitel och artiklar. Samt ett normaliserat JSON-format som alltid kommer tillbaka i samma struktur.

## Vad jag förenklade för att spara tid

Jag använde en rak modellkedja i stället för mer avancerad orkestrering. Jag la också tid på att förbättra promptar och minimera hallucinationer, inklusive en separat research-agent och en Tavily-subnod för faktasökning, men utan att gå för djupt i agentkonfiguration eller finjustering. Skulle vara bra att använda en RAG för att hitta relevant information när det gäller te.x EU regler då dessa ändras konstant. 

Dessutom fokuserade jag inte särskilt mycket på quizz frågorna, ger några exempel i outputen men det var ingen prioritet för mig eftersom de kan byggas upp med informationen man har från föregående steg.

## Vad jag lämnade utanför

Jag implementerade ingen separat valideringsnod för slutresultatet. All data lagras i minnet utan historik, caching eller sessionshantering. Jag byggde heller ingen avancerad loggning, retry-logik, timeouts eller fallback-strategier. Mitt fokus var funktionalitet och tydlig struktur.


## Exempel


Input
```
Lär nya trafikplanerare att skapa lagliga och effektiva scheman. Målgrupp: Nya trafikplanerare. Problem: Olagliga scheman, svag förståelse för EU-förordning 561/2006. Lärandemål: Förstå reglerna, tillämpa undantag, dokumentera avvikelser. Särskild inriktning: Fokus på praktisk, daglig planering. Källor: Transportstyrelsen, EU:s mobilitetspaket.

```
## Programmatris:
```json
{
  "output": {
    "brief": {
      "purpose": "Att ge fullständig kompetens i EU-förordning 561/2006",
      "audience": " trafikplanerare och transportledare",
      "problems_solved": [
        "Osäkerhet kring lagstiftning",
        "Risk för sanktionsavgifter",
        "Ineffektiv planering"
      ],
      "method": "Training program based on EU regulation 561/2006",
      "effect": "säkerställa lagliga, effektiva och lönsamma transporter"
    },
    "program": {
      "name": "Kör- och Vilotider för Trafikplanerare",
      "chapters": [
        {
          "chapter_id": "chapter_1",
          "chapter_name": "Grunderna i Kör- och Vilotider",
          "description": "Grundläggande genomgång av regler och begrepp.",
          "sessions": [
            {
              "session_id": "session_1",
              "session_name": "Identifiera lagens omfattning och begrepp",
              "duration_minutes": 12,
              "theory_percent": 30,
              "practice_percent": 70
            },
            {
              "session_id": "session_2",
              "session_name": "Beräkna daglig och veckovis körtid",
              "duration_minutes": 15,
              "theory_percent": 30,
              "practice_percent": 70
            },
            {
              "session_id": "session_3",
              "session_name": "Planera in obligatoriska raster och pauser",
              "duration_minutes": 13,
              "theory_percent": 30,
              "practice_percent": 70
            },
            {
              "session_id": "session_4",
              "session_name": "Schemalägga dygns- och veckovila",
              "duration_minutes": 15,
              "theory_percent": 30,
              "practice_percent": 70
            }
          ]
        },
        {
          "chapter_id": "chapter_2",
          "chapter_name": "Praktisk Schemaläggning och Undantag",
          "description": "Tillämpning av regler i praktisk planering.",
          "sessions": [
            {
              "session_id": "session_5",
              "session_name": "Skapa ett lagenligt veckoschema",
              "duration_minutes": 15,
              "theory_percent": 30,
              "practice_percent": 70
            },
            {
              "session_id": "session_6",
              "session_name": "Hantera färja, tåg och dubbelbemanning",
              "duration_minutes": 14,
              "theory_percent": 30,
              "practice_percent": 70
            },
            {
              "session_id": "session_7",
              "session_name": "Tillämpa mobilitetspaketets flexibilitetsregler",
              "duration_minutes": 13,
              "theory_percent": 30,
              "practice_percent": 70
            }
          ]
        },
        {
          "chapter_id": "chapter_3",
          "chapter_name": "Dokumentation, Ansvar och Sanktioner",
          "description": "Hantering av ansvar och efterlevnad.",
          "sessions": [
            {
              "session_id": "session_8",
              "session_name": "Hantera färdskrivare och datalagring",
              "duration_minutes": 12,
              "theory_percent": 30,
              "practice_percent": 70
            },
            {
              "session_id": "session_9",
              "session_name": "Dokumentera avvikelser på rätt sätt",
              "duration_minutes": 13,
              "theory_percent": 30,
              "practice_percent": 70
            },
            {
              "session_id": "session_10",
              "session_name": "Förebygga sanktioner genom egenkontroll",
              "duration_minutes": 14,
              "theory_percent": 30,
              "practice_percent": 70
            }
          ]
        }
      ]
    },
    "articles": [
      {
        "article_id": "article_1",
        "related_session_id": "session_2",
        "title": "Beräkna daglig och veckovis körtid",
        "word_count_target": "800-1000",
        "content": "# Beräkna daglig och veckovis körtid: Grunden för laglig planering\n\n## Inledning: När marginalerna avgör din vinst eller förlust\n\nDet är torsdag eftermiddag. Din förare, Johan, befinner sig i Jönköping och ska lossa i Malmö senast klockan 17.00. En snabb blick på GPS:en visar att han har kört mycket den här veckan. Om du ber honom fortsätta, riskerar du då en sanktionsavgift på 4 000 kronor eller mer? Eller kan han lagligt köra sista sträckan?\n\nSom trafikplanerare hamnar du dagligen i situationer där skillnaden mellan en lyckad leverans och en kostsam överträdelse mäts i minuter. Att ha fullständig kontroll över reglerna för daglig och veckovis körtid är inte bara en fråga om att undvika böter – det är avgörande för att maximera din fordonsflottas nyttjandegrad. Osäkerhet leder ofta till att man planerar för konservativt och förlorar intäkter, eller för aggressivt och betalar böter. I denna artikel går vi igenom exakt hur du räknar för att utnyttja varje laglig minut.\n\n## Daglig körtid: 9 timmar är regeln – men 10 är möjligt\n\nDen grundläggande regeln enligt EU-förordning 561/2006 är att den dagliga körtiden får vara högst **9 timmar**. Det är viktigt att förstå definitionen: \"Daglig körtid\" är den sammanlagda körtiden mellan slutet på en dygnsvila och början på nästa dygnsvila (eller en veckovila).\n\nMen verkligheten i transportbranschen kräver flexibilitet. Därför tillåter lagen att föraren förlänger körtiden till högst **10 timmar**, men detta får ske maximalt **två gånger per kalendervecka**.\n\n### Exempel på korrekt planering:\nLåt oss titta på en förares vecka (Måndag–Söndag):\n- **Måndag:** 9 timmar\n- **Tisdag:** 10 timmar (Förlängning 1 – OK)\n- **Onsdag:** 9 timmar\n- **Torsdag:** 10 timmar (Förlängning 2 – OK)\n- **Fredag:** 9 timmar\n\nHär har föraren använt sina två tillåtna joker-kort. Om föraren på lördagen skulle behöva köra 9 timmar och 15 minuter, har du ett problem. Även 15 minuters överskridande när kvoten är fylld räknas som en överträdelse. Som planerare måste du spåra dessa 10-timmarsdagar noggrant. Använd dem strategiskt för de längsta rutterna, inte av slump.\n\n## Veckovis och tvåveckors körtid: Den rullande fällan\n\nAtt hålla koll på den dagliga körtiden är oftast enkelt. Det är veckoreglerna som brukar orsaka störst huvudvärk för planerare. Här finns två absoluta gränser att förhålla sig till:\n\n1.  **Maximal körtid per vecka:** 56 timmar.\n2.  **Maximal körtid per tvåveckorsperiod:** 90 timmar.\n\nVeckan definieras strikt som måndag 00.00 till söndag 24.00. Enskilda veckor får du alltså planera upp till 56 timmar. Men – och här är fällan – du måste alltid titta på föregående vecka OCH nästa vecka.\n\n### 90-timmarsregeln i praktiken\nLåt oss säga att du pressade schemat maximalt vecka 1:\n\n*   **Vecka 1:** 56 timmar körtid (Lagligt).\n*   **Vecka 2:** Hur mycket får föraren köra?\n    *   Matematiken är enkel: 90 - 56 = **34 timmar**.\n\nVecka 2 blir alltså en \"lågvecka\". Om du av misstag planerar in en normal 40-timmarsvecka vecka 2, har du begått en överträdelse på 6 timmar. Detta är en rullande beräkning. När vecka 3 börjar, glömmer du vecka 1 och tittar på summan av vecka 2 och vecka 3.\n\n**Scenario att undvika:**\nTransportledare Lisa ser att föraren har 45 timmar kvar på sin 90-timmarsperiod för vecka 2 och 3. Hon planerar in full körning. Men hon glömde att föraren redan kört 50 timmar vecka 2. Det innebär att vecka 3 bara får innehålla 40 timmar (90 - 50 = 40), även om 56-timmarsregeln tillåter mer.\n\n## Skillnaden mellan Körtid och Arbetstid\n\nEtt av de vanligaste misstagen nyare planerare gör är att blanda ihop *körtid* (Driving Time) med *arbetstid* (Working Time). EU-förordning 561/2006 reglerar framför allt körtiden. Vägarbetstidslagen reglerar arbetstiden.\n\n*   **Körtid:** Tiden hjulen rullar. Det är detta som räknas mot 9h/10h och 56h/90h gränserna.\n*   **Annat arbete:** Lastning, lossning, tankning, säkerhetskontroll, rengöring av fordonet.\n\nFör en distributionsförare kan en dag se ut så här:\n- 07.00–08.00: Lastning (Annat arbete)\n- 08.00–12.00: Körning (4h Körtid)\n- 12.00–13.00: Lossning (Annat arbete)\n- 13.00–17.00: Körning (4h Körtid)\n\n**Resultat:** Föraren har arbetat i 10 timmar, men förbrukat endast **8 timmar körtid**. Detta innebär att föraren juridiskt sett har 1 timme körtid kvar innan 9-timmarsgränsen nås. Att förstå denna distinktion är nyckeln till effektivitet. Om du tror att \"arbetsdagen är slut\" efter 9 timmars arbete, tappar du värdefull produktivitet.\n\n## Praktisk tillämpning i din vardag\n\nFör att säkerställa att du alltid ligger steget före, använd denna process när du lägger veckoschemat:\n\n### Checklista för schemaläggning:\n1.  **Kontrollera föregående vecka:** Hur många timmar körde föraren förra veckan? Dra av detta från 90 för att få veckans absoluta maxtak.\n2.  **Identifiera långa dagar:** Vilka rutter kräver mer än 9 timmars ren körtid? Markera dessa som \"10-timmarsdagar\".\n3.  **Räkna 10-timmarsdagarna:** Har du mer än två? Du måste banta ner en rutt eller byta förare.\n4.  **Separera momenten:** Räkna inte lastningstid som körtid i dina kalkyler. Var optimistisk men realistisk med körtiderna.\n\n### Snabbreferens för dagliga beslut:\n- **Max körtid dag:** 9 h (eller 10 h max 2 ggr/vecka).\n- **Max körtid vecka:** 56 h.\n- **Max körtid 2 veckor:** 90 h.\n- **Veckobryt:** Måndag 00.00.\n\n## Sammanfattning\n\nAtt bemästra körtidsreglerna handlar om matematik och framförhållning. Kom ihåg följande tre nyckelpunkter:\n1.  **9 timmar är standarden**, men du har två \"jokrar\\\" på 10 timmar varje vecka som måste användas smart.\n2.  **Tvåveckorsregeln på 90 timmar** är den vanligaste fällan – planera alltid i tvåveckorscykler, inte bara vecka för vecka.\n3.  **Allt arbete är inte körtid**. Genom att skilja på lastning och körning kan du ofta hitta extra kapacitet i schemat.\n\nI nästa session ska vi titta på hur du pusslar in de obligatoriska rasterna för att dessa körtimmar ska bli lagliga i praktiken.\n\n---\n**Källor:**\n- EU-förordning 561/2006, Artikel 6\n- Transportstyrelsens vägledning för kör- och vilotider\n- Vägarbetstidslagen (för distinktion mot arbetstid)"
      },
      {
        "article_id": "article_2",
        "related_session_id": "session_4",
        "title": "Schemalägga dygns- och veckovila",
        "word_count_target": "800-1000",
        "content": "# Schemalägga dygns- och veckovila: Pusslet som måste gå ihop\n\n## Inledning: Vila är inte bara sömn – det är juridik\n\nFör en planare kan begreppet \"vila\" verka enkelt: Föraren sover, lastbilen står stilla. Men i lagens mening är vila ett komplext matematiskt pussel med strikta ramar. En missad vila med bara 30 minuter kan ogiltigförklara en hel arbetsvecka och leda till kännbara sanktioner. \n\nDessutom är vilotiderna den faktor som mest påverkar din långsiktiga kapacitetsplanering. Om du inte förstår reglerna för reducerad vila och kompensation, kommer du antingen att stå med bilar som inte får rulla trots att godset väntar, eller förare som tvingas ta ledigt mitt i veckan för att \"betala tillbaka\" tid. Denna session ger dig verktygen för att navigera i reglerna för dygnsvila och veckovila, inklusive den ofta missförstådda kompensationsregeln.\n\n## Dygnsvila: 24-timmarsperioden är din klocka\n\nDet första och viktigaste konceptet att förstå är att dygnsvila inte är kopplat till ett kalenderdygn (00-24). Det är kopplat till en **24-timmarsperiod** som startar exakt när föraren påbörjar sitt arbete efter en godkänd vila.\n\nOm din förare, Lena, börjar jobba klockan 06.00 på måndagen, måste hon ha avslutat sin dygnsvila *innan* klockan 06.00 på tisdagen. Inom detta fönster ska både arbete, raster och vila rymmas.\n\n### Normal vs. Reducerad dygnsvila\n*   **Normal dygnsvila:** Minst **11 timmar** sammanhängande vila. Detta är standarden du ska sikta på.\n    *   *Delad vila:* Du kan dela upp den normala vilan i två perioder. Kravet är då: Första delen minst 3 timmar, andra delen minst 9 timmar (totalt 12h). Exempel: 3h vila mitt på dagen medan man väntar på returlass, plus 9h nattvila.\n*   **Reducerad dygnsvila:** Minst **9 timmar** men mindre än 11 timmar. \n    *   En förare får ta högst **tre** reducerade dygnsvilor mellan två veckovilor.\n    *   Fördelen: Du \"köper\" dig två timmar extra produktionstid eller flexibilitet den dagen.\n    *   Nackdelen: Du måste hålla räkningen. Den fjärde vilan *måste* vara minst 11 timmar (eller en veckovila).\n\n## Veckovila: Planering över gränserna\n\nVeckovilan är kärnan i långsiktig hållbarhet för förarna. Här gäller att en veckovila ska påbörjas senast efter 6 st 24-timmarsperioder från slutet av föregående veckovila.\n\n*   **Normal veckovila:** Minst **45 timmar** sammanhängande. Detta ska vara huvudregeln.\n*   **Reducerad veckovila:** Minst **24 timmar** sammanhängande. \n\nRegelverket tillåter reducerad veckovila, men med strikta villkor. Under två på varandra följande veckor måste föraren ta antingen:\n1.  Två normala veckovilor (45h + 45h).\n2.  En normal och en reducerad veckovila (45h + 24h).\n\nDu får alltså **aldrig** planera in reducerad veckovila två veckor i rad (med vissa specifika undantag för internationella transporter enligt mobilitetspaketet, vilket vi behandlar i session 7, men grundregeln för nationell trafik är strikt).\n\n## Kompensation: Att betala tillbaka skulden\n\nDet här är momentet där flest fel begås. Om du utnyttjar möjligheten till reducerad veckovila (t.ex. 24 timmar istället för 45), uppstår en tidsskuld. Mellanskillnaden måste \"betalas tillbaka\" till föraren.\n\n**Räkneexempel:**\nFöraren tar en reducerad vila på 25 timmar.\nNormal vila skulle varit 45 timmar.\nSkuld att kompensera: 45 - 25 = **20 timmar**.\n\n### Regler för kompensationen:\n1.  **När?** Kompensationen måste tas ut senast vid slutet av den tredje veckan efter den vecka då reduceringen skedde.\n2.  **Hur?** Den måste tas ut **sammanhängande** (i ett block) och kopplas till en annan vila på minst 9 timmar (dygnsvila eller veckovila).\n\n**Exempel på planering:**\n*   Vecka 1: Reducerad vila (24h). Skuld: 21h.\n*   Vecka 2: Normal veckovila (45h).\n*   Vecka 3: Normal veckovila (45h). Här lägger du in kompensationen. Föraren tar sin normala vila (45h) + kompensationen (21h) = Total ledighet 66 timmar.\n\nAtt missa kompensationen är lika illa som att missa själva vilan. Som planerare måste du ha ett system som flaggar \"skulder\" så de inte glöms bort.\n\n## Praktisk tillämpning: Så skapar du schemat\n\nNär du sätter dig med schemat för nästa period, följ dessa steg för att säkra vilotiderna:\n\n### 1. Spika veckovilorna först\nBörja med helgerna (eller när veckovilan infaller). Se till att varannan vecka är minst 45 timmar. Om du planerar en 24h-vila, boka omedelbart in kompensationstiden i kalendern inom 3 veckor. Skjut inte upp det beslutat.\n\n### 2. Räkna baklänges för dygnsvila\nOm föraren måste starta 06.00 på tisdag, och ska ha normal vila (11h), måste bilen stå still senast 19.00 på måndag. Det ger dig ramarna för måndagens produktion.\n\n### 3. Använd de reducerade dygnsvilorna som buffert\nPlanera helst med normala 11h-vilor. Spara möjligheten till 9h-vila för oförutsedda händelser (köer, förseningar vid lastning). Om du planerar in 9h-vilor från början har du ingen marginal när verkligheten slår till.\n\n### Snabbreferens för vila:\n- **Dygnsvila Normal:** 11h (eller 3h+9h).\n- **Dygnsvila Reducerad:** 9h (max 3 ggr mellan veckovilor).\n- **Veckovila Normal:** 45h.\n- **Veckovila Reducerad:** 24h (kräver kompensation).\n- **24-timmarsregeln:** Vila måste *avslutas* inom 24h från start.\n\n## Sammanfattning\n\nRätt hanterad vila är nyckeln till friska förare och laglig verksamhet. Kom ihåg:\n1.  **24-timmarsperioden** styr dygnsvilan, inte klockslagen på väggen.\n2.  Du får ha **max tre reducerade dygnsvilor** per vecka – räkna dem noga.\n3.  **Reducerad veckovila skapar en skuld** som måste betalas tillbaka sammanhängande med annan vila. Bokför denna skuld direkt.\n\nGenom att behärska dessa regler kan du bygga scheman som håller både i teorin och i verkligheten. I nästa session tittar vi på hur du sätter ihop allt detta till ett komplett veckoschema.\n\n---\n**Källor:**\n- EU-förordning 561/2006, Artikel 8\n- Transportstyrelsens vägledning om körtider och vilotider\n- Rättsfall gällande tolkning av kompensationsvila"
      },
      {
        "article_id": "article_3",
        "related_session_id": "session_1",
        "title": "Identifiera lagens omfattning och begrepp",
        "word_count_target": "800-1000",
        "content": "Placeholder för 800-1000 ord lång artikel."
      },
      {
        "article_id": "article_4",
        "related_session_id": "session_3",
        "title": "Planera in obligatoriska raster och pauser",
        "word_count_target": "800-1000",
        "content": "Placeholder för 800-1000 ord lång artikel."
      },
      {
        "article_id": "article_5",
        "related_session_id": "session_5",
        "title": "Skapa ett lagenligt veckoschema",
        "word_count_target": "800-1000",
        "content": "Placeholder för 800-1000 ord lång artikel."
      },
      {
        "article_id": "article_6",
        "related_session_id": "session_6",
        "title": "Hantera färja, tåg och dubbelbemanning",
        "word_count_target": "800-1000",
        "content": "Placeholder för 800-1000 ord lång artikel."
      },
      {
        "article_id": "article_7",
        "related_session_id": "session_7",
        "title": "Tillämpa mobilitetspaketets flexibilitetsregler",
        "word_count_target": "800-1000",
        "content": "Placeholder för 800-1000 ord lång artikel."
      },
      {
        "article_id": "article_8",
        "related_session_id": "session_8",
        "title": "Hantera färdskrivare och datalagring",
        "word_count_target": "800-1000",
        "content": "Placeholder för 800-1000 ord lång artikel."
      },
      {
        "article_id": "article_9",
        "related_session_id": "session_9",
        "title": "Dokumentera avvikelser på rätt sätt",
        "word_count_target": "800-1000",
        "content": "Placeholder för 800-1000 ord lång artikel."
      },
      {
        "article_id": "article_10",
        "related_session_id": "session_10",
        "title": "Förebygga sanktioner genom egenkontroll",
        "word_count_target": "800-1000",
        "content": "Placeholder för 800-1000 ord lång artikel."
      }
    ],
    "quizzes": [
      {
        "quiz_id": "quiz_1",
        "session_id": "session_2",
        "question": "En förare har redan utnyttjat sina två tillåtna 10-timmarsdagar denna vecka. Får hen köra 9 timmar och 15 minuter på lördagen?",
        "options": [
          "A: Ja, om det behövs för att nå hem",
          "B: Nej, maxgränsen är nu 9 timmar",
          "C: Ja, eftersom det är under 9,5 timmar"
        ],
        "correct_answer": "B"
      },
      {
        "quiz_id": "quiz_2",
        "session_id": "session_2",
        "question": "Föraren körde maximala 56 timmar förra veckan. Hur många timmar får hen maximalt köra denna vecka för att klara 90-timmarsregeln?",
        "options": [
          "A: 56 timmar",
          "B: 45 timmar",
          "C: 34 timmar"
        ],
        "correct_answer": "C"
      },
      {
        "quiz_id": "quiz_3",
        "session_id": "session_2",
        "question": "En förare har under dagen lastat i 1 timme, kört 4 timmar, lossat 1 timme och kört 4 timmar till. Hur mycket av den dagliga *körtiden* har förbrukats?",
        "options": [
          "A: 10 timmar",
          "B: 8 timmar",
          "C: 9 timmar"
        ],
        "correct_answer": "B"
      },
      {
        "quiz_id": "quiz_4",
        "session_id": "session_4",
        "question": "Du planerar veckans körning. Hur många gånger får föraren ta en reducerad dygnsvila (minst 9h men mindre än 11h) mellan två veckovilor?",
        "options": [
          "A: Max 3 gånger",
          "B: Max 2 gånger",
          "C: Så många gånger som behövs"
        ],
        "correct_answer": "A"
      },
      {
        "quiz_id": "quiz_5",
        "session_id": "session_4",
        "question": "En förare har tagit en reducerad veckovila på 24 timmar. När måste kompensationen för den förlorade tiden senast tas ut?",
        "options": [
          "A: Före slutet på den tredje veckan efter reduktionen",
          "B: Inom nästa arbetsvecka",
          "C: Det finns ingen tidsgräns så länge det sker under året"
        ],
        "correct_answer": "A"
      },
      {
        "quiz_id": "quiz_6",
        "session_id": "session_4",
        "question": "Föraren börjar sitt arbetspass kl 06:00 på måndagen. När måste dygnsvilan senast vara *avslutad* för att rymmas inom 24-timmarsperioden?",
        "options": [
          "A: Kl 06:00 på tisdagen",
          "B: Kl 24:00 på måndagen",
          "C: Kl 06:00 på onsdagen"
        ],
        "correct_answer": "A"
      }
    ]
  }
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


