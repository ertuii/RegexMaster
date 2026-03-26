export type Difficulty = 'Einfach' | 'Mittel' | 'Schwer';

export interface TestCase {
  text: string;
  shouldMatch: boolean;
}

export interface Exercise {
  id: number;
  title: string;
  description: string;
  difficulty: Difficulty;
  testCases: TestCase[];
  hint: string;
  solution: string; // Regex solution
}

export const exercises: Exercise[] = [
  {
    id: 1,
    title: 'Übereinstimmung mit einem Literale',
    description: 'Schreibe einen regulären Ausdruck, der genau auf das Wort "Hallo" passt.',
    difficulty: 'Einfach',
    testCases: [
      { text: 'Hallo', shouldMatch: true },
      { text: 'hallo', shouldMatch: false },
      { text: 'Hallo Welt', shouldMatch: true }, // Je nach Anforderung könnte das false sein wenn ^$ gefragt ist, aber hier lassen wir es einfach
      { text: 'Tschüss', shouldMatch: false }
    ],
    hint: 'Reguläre Ausdrücke unterscheiden zwischen Groß- und Kleinschreibung.',
    solution: 'Hallo'
  },
  {
    id: 2,
    title: 'Ziffern finden',
    description: 'Finde alle Vorkommen von Ziffern (0-9).',
    difficulty: 'Einfach',
    testCases: [
      { text: '123', shouldMatch: true },
      { text: 'abc', shouldMatch: false },
      { text: 'a1b2', shouldMatch: true }
    ],
    hint: 'Verwende die Charakterklasse für Ziffern.',
    solution: '\\d'
  },
  {
    id: 3,
    title: 'Nur Kleinbuchstaben',
    description: 'Erstelle einen Ausdruck, der auf Kleinbuchstaben von a bis z passt.',
    difficulty: 'Einfach',
    testCases: [
      { text: 'a', shouldMatch: true },
      { text: 'Z', shouldMatch: false },
      { text: 'm', shouldMatch: true },
       { text: '0', shouldMatch: false }
    ],
    hint: 'Verwende einen Bereich [x-y].',
    solution: '[a-z]'
  },
   {
    id: 4,
    title: 'Bestimmte Länge',
    description: 'Finde Wörter, die genau 3 Zeichen lang sind. (Verwende keine Anker für den Anfang, nur die Länge)',
    difficulty: 'Mittel',
    testCases: [
      { text: 'cat', shouldMatch: true },
      { text: 'at', shouldMatch: false },
      { text: 'cats', shouldMatch: true }, // matcht "cat" in "cats"
    ],
    hint: 'Der Punkt . steht für ein beliebiges Zeichen.',
    solution: '...'
  },
  {
      id: 5,
      title: 'E-Mail Adresse (einfach)',
      description: 'Erstelle einen Regex für eine einfache E-Mail Validierung (Text @ Text . Text)',
      difficulty: 'Schwer',
      testCases: [
          { text: 'test@example.com', shouldMatch: true},
          { text: 'test.com', shouldMatch: false},
          { text: 'test@com', shouldMatch: false} // Vereinfacht
      ],
      hint: 'Denke daran, dass der Punkt eine besondere Bedeutung hat und escaped werden muss.',
      solution: '.+@.+\\..+'
  },
  {
    id: 6,
    title: 'Wortgrenzen',
    description: 'Finde das Wort "cat", aber nur wenn es als eigenständiges Wort vorkommt, nicht als Teil von "cats" oder "scatter".',
    difficulty: 'Mittel',
    testCases: [
      { text: 'cat', shouldMatch: true },
      { text: 'cats', shouldMatch: false },
      { text: 'scatter', shouldMatch: false },
      { text: 'the cat sat', shouldMatch: true }
    ],
    hint: 'Verwende \\b für Wortgrenzen.',
    solution: '\\bcat\\b'
  },
  {
    id: 7,
    title: 'Alternative (Oder)',
    description: 'Finde entweder "Apfel" oder "Banane".',
    difficulty: 'Einfach',
    testCases: [
      { text: 'Apfel', shouldMatch: true },
      { text: 'Banane', shouldMatch: true },
      { text: 'Kirsche', shouldMatch: false },
      { text: 'Apfelkuchen', shouldMatch: true } // Teilstring matcht
    ],
    hint: 'Verwende den vertikalen Strich |.',
    solution: 'Apfel|Banane'
  },
  {
    id: 8,
    title: 'Gruppierung und Referenz',
    description: 'Finde Wörter, die aus zwei gleichen Teilen bestehen (z.B. "papa", "mama").',
    difficulty: 'Schwer',
    testCases: [
      { text: 'papa', shouldMatch: true },
      { text: 'mama', shouldMatch: true },
      { text: 'test', shouldMatch: false },
      { text: 'haha', shouldMatch: true }
    ],
    hint: 'Verwende Klammern () für eine Gruppe und \\1, um auf die erste Gruppe Bezug zu nehmen.',
    solution: '(.+)\\1'
  },
  {
    id: 9,
    title: 'Nicht enthaltene Zeichen',
    description: 'Finde Wörter, die KEIN "e" enthalten.',
    difficulty: 'Mittel',
    testCases: [
      { text: 'hallo', shouldMatch: true },
      { text: 'test', shouldMatch: false },
      { text: 'auto', shouldMatch: true },
      { text: 'elefant', shouldMatch: false }
    ],
    hint: 'Verwende [^...] für eine negierte Zeichenklasse. Du musst sicherstellen, dass das ganze Wort passt, z.B. mit ^...$',
    solution: '^[^e]+$'
  },
  {
    id: 10,
    title: 'Datum im Format DD.MM.YYYY',
    description: 'Validiere ein Datum im Format Tag.Monat.Jahr (einfache Prüfung, 01-31, 01-12, 4 Ziffern Jahr).',
    difficulty: 'Schwer',
    testCases: [
      { text: '01.01.2000', shouldMatch: true },
      { text: '31.12.2023', shouldMatch: true },
      { text: '1.1.2000', shouldMatch: false }, // Format muss strikt sein
      { text: '99.99.2000', shouldMatch: false } // Einfache Logik reicht hier oft nicht in einem Regex, aber für die Struktur: \d\d
    ],
    hint: 'Verwende \\d{2} und \\d{4}.',
    solution: '\\d{2}\\.\\d{2}\\.\\d{4}'
  },
  {
    id: 11,
    title: 'Telefonnummern Extrahieren',
    description: 'Finde Telefonnummern im Format (123) 456-7890.',
    difficulty: 'Mittel',
    testCases: [
      { text: '(123) 456-7890', shouldMatch: true },
      { text: '1234567890', shouldMatch: false },
      { text: '(12) 456-7890', shouldMatch: false },
      { text: '(123)456-7890', shouldMatch: false }
    ],
    hint: 'Vergiss nicht die Klammern mit \\( und \\) zu escapen. Ein Leerzeichen ist ebenfalls erforderlich.',
    solution: '\\(\\d{3}\\) \\d{3}-\\d{4}'
  },
  {
    id: 12,
    title: 'Postleitzahlen (Deutschland)',
    description: 'Finde gültige 5-stellige deutsche Postleitzahlen.',
    difficulty: 'Mittel',
    testCases: [
      { text: '12345', shouldMatch: true },
      { text: '01234', shouldMatch: true },
      { text: '1234', shouldMatch: false },
      { text: '123456', shouldMatch: false },
      { text: 'abcde', shouldMatch: false }
    ],
    hint: 'Verwende \\d und {n} für eine genaue Anzahl Wiederholungen, kombiniert mit Ankern ^ und $ für vollständige Übereinstimmung.',
    solution: '^\\d{5}$'
  },
  {
    id: 13,
    title: 'Hexadezimal-Farbcodes',
    description: 'Finde Hex-Farbcodes wie #abc oder #1a2B3C. Sie können 3 oder 6 Zeichen lang sein, beginnend mit #.',
    difficulty: 'Schwer',
    testCases: [
      { text: '#fff', shouldMatch: true },
      { text: '#1A2b3c', shouldMatch: true },
      { text: '#1234', shouldMatch: false },
      { text: 'fff', shouldMatch: false },
      { text: '#xyz', shouldMatch: false }
    ],
    hint: 'Verwende ^ und $ für einen exakten Match. Kombiniere Charakterklassen [0-9a-fA-F] mit Längen {3} und {6} mittels einer Oder-Verknüpfung (|).',
    solution: '^#([a-fA-F0-9]{3}|[a-fA-F0-9]{6})$'
  },
  {
    id: 14,
    title: 'Erste und letzte Vokale',
    description: 'Finde Wörter, die mit einem Vokal (a,e,i,o,u) beginnen und mit demselben Vokal enden.',
    difficulty: 'Schwer',
    testCases: [
      { text: 'anna', shouldMatch: true },
      { text: 'eve', shouldMatch: true },
      { text: 'auto', shouldMatch: false },
      { text: 'apple', shouldMatch: false },
      { text: 'oho', shouldMatch: true }
    ],
    hint: 'Verwende Capturing Groups () und referenziere den gematchten Vokal mit \\1.',
    solution: '^([aeiou]).*\\1$'
  },
  {
    id: 15,
    title: 'Das exakte Wort "Haus"',
    description: 'Finde genau das Wort "Haus" (ohne weitere Zeichen davor oder danach).',
    difficulty: 'Einfach',
    testCases: [
      { text: 'Haus', shouldMatch: true },
      { text: 'Baumhaus', shouldMatch: false },
      { text: 'Haustür', shouldMatch: false },
      { text: 'haus', shouldMatch: false }
    ],
    hint: 'Nutze ^ und $ um den Anfang und das Ende exakt abzugrenzen.',
    solution: '^Haus$'
  },
  {
    id: 16,
    title: 'Ein beliebiges Zeichen',
    description: 'Finde Strings, die mit "A" beginnen, mit "B" enden und genau ein beliebiges Zeichen dazwischen haben (z.B. "AXB").',
    difficulty: 'Einfach',
    testCases: [
      { text: 'AXB', shouldMatch: true },
      { text: 'A-B', shouldMatch: true },
      { text: 'AB', shouldMatch: false },
      { text: 'AXXB', shouldMatch: false }
    ],
    hint: 'Der Punkt (.) steht für genau ein beliebiges Zeichen.',
    solution: '^A.B$'
  },
  {
    id: 17,
    title: 'Wortanfang',
    description: 'Finde Wörter, die mit dem Buchstaben "H" beginnen.',
    difficulty: 'Einfach',
    testCases: [
      { text: 'Hund', shouldMatch: true },
      { text: 'Haus', shouldMatch: true },
      { text: 'Maus', shouldMatch: false },
      { text: 'Schuh', shouldMatch: false }
    ],
    hint: 'Nutze das Zirkumflex (^) für den Beginn des Strings.',
    solution: '^H'
  },
  {
    id: 18,
    title: 'Leerzeichen finden',
    description: 'Der String darf nur aus genau einem Leerzeichen bestehen.',
    difficulty: 'Einfach',
    testCases: [
      { text: ' ', shouldMatch: true },
      { text: '  ', shouldMatch: false },
      { text: 'a', shouldMatch: false },
      { text: ' a ', shouldMatch: false }
    ],
    hint: '\\s steht für ein Whitespace-Zeichen wie Leerzeichen, Tabs oder Zeilenumbrüche.',
    solution: '^\\s$'
  },
  {
    id: 19,
    title: 'Eines oder mehrere (Plus)',
    description: 'Finde Strings, die aus einem oder mehreren "X" bestehen.',
    difficulty: 'Einfach',
    testCases: [
      { text: 'X', shouldMatch: true },
      { text: 'XXX', shouldMatch: true },
      { text: '', shouldMatch: false },
      { text: 'XXY', shouldMatch: false }
    ],
    hint: 'Das Plus (+) bedeutet: das vorherige Zeichen muss 1-mal oder öfter vorkommen.',
    solution: '^X+$'
  },
  {
    id: 20,
    title: 'Nur Großbuchstaben',
    description: 'Finde Strings, die komplett nur aus Großbuchstaben bestehen (mindestens einer).',
    difficulty: 'Einfach',
    testCases: [
      { text: 'HALLO', shouldMatch: true },
      { text: 'Hallo', shouldMatch: false },
      { text: 'ABC', shouldMatch: true },
      { text: 'A', shouldMatch: true }
    ],
    hint: 'Nutze die Charakterklasse [A-Z] kombiniert mit dem Plus für Wiederholungen.',
    solution: '^[A-Z]+$'
  },
  {
    id: 21,
    title: 'Entweder / Oder',
    description: 'Finde exakt das Wort "ja" oder exakt das Wort "nein".',
    difficulty: 'Einfach',
    testCases: [
      { text: 'ja', shouldMatch: true },
      { text: 'nein', shouldMatch: true },
      { text: 'vielleicht', shouldMatch: false },
      { text: 'jaja', shouldMatch: false }
    ],
    hint: 'Die Pipe (|) verhält sich wie ein logisches ODER.',
    solution: '^(ja|nein)$'
  },
  {
    id: 22,
    title: 'Sonderzeichen escapen',
    description: 'Finde exakt die Zeichenfolge "Wie?". Das Fragezeichen muss korrekt escaped werden.',
    difficulty: 'Einfach',
    testCases: [
      { text: 'Wie?', shouldMatch: true },
      { text: 'Wie!', shouldMatch: false },
      { text: 'Wie', shouldMatch: false }
    ],
    hint: 'Ein Backslash (\\) vor einem Sonderzeichen "escaped" dieses, sodass es als normales Zeichen gewertet wird.',
    solution: '^Wie\\?$'
  },
  {
    id: 23,
    title: 'Keine Ziffern',
    description: 'Finde Strings, die KEINE einzige Ziffer enthalten (auch nicht teilweise).',
    difficulty: 'Einfach',
    testCases: [
      { text: 'Hallo', shouldMatch: true },
      { text: 'Abc', shouldMatch: true },
      { text: 'Hallo 123', shouldMatch: false },
      { text: '1', shouldMatch: false }
    ],
    hint: '\\D ist das Gegenteil von \\d und matcht alle Zeichen, die KEINE Ziffern sind.',
    solution: '^\\D+$'
  },
  {
    id: 24,
    title: 'Genau drei Buchstaben',
    description: 'Finde Strings, die genau aus drei beliebigen WORT-Zeichen (a-z, A-Z, 0-9, _) bestehen.',
    difficulty: 'Einfach',
    testCases: [
      { text: 'abc', shouldMatch: true },
      { text: '123', shouldMatch: true },
      { text: 'a_b', shouldMatch: true },
      { text: 'ab', shouldMatch: false },
      { text: 'abcd', shouldMatch: false }
    ],
    hint: '\\w steht für ein "Word Character". Geschweifte Klammern {x} geben die genaue Anzahl vor.',
    solution: '^\\w{3}$'
  },
  {
    id: 25,
    title: 'Endend mit "ing"',
    description: 'Finde englische Wörter (oder Strings), die auf "ing" enden.',
    difficulty: 'Mittel',
    testCases: [
      { text: 'playing', shouldMatch: true },
      { text: 'sing', shouldMatch: true },
      { text: 'singer', shouldMatch: false },
      { text: 'ring ', shouldMatch: false } // Beachte das Leerzeichen
    ],
    hint: 'Nutze das Dollar-Zeichen ($) um das String-Ende zu signalisieren.',
    solution: 'ing$'
  },
  {
    id: 26,
    title: 'Zeilenanfang ist eine Zahl',
    description: 'Finde Strings, die mit einer Ziffer beginnen (der Rest ist egal).',
    difficulty: 'Mittel',
    testCases: [
      { text: '123 Hallo', shouldMatch: true },
      { text: '9', shouldMatch: true },
      { text: ' 123', shouldMatch: false }, // Fängt mit Leerzeichen an
      { text: 'Hallo 123', shouldMatch: false }
    ],
    hint: 'Kombiniere den ^ Anker mit einer Ziffer-Klasse.',
    solution: '^\\d'
  },
  {
    id: 27,
    title: 'Preis-Format (Kommazahl)',
    description: 'Validiere einen Preis im Format "10.99" (mindestens eine Vorkommastelle, exakt 2 Nachkommastellen, durch einen Punkt getrennt).',
    difficulty: 'Mittel',
    testCases: [
      { text: '10.99', shouldMatch: true },
      { text: '0.50', shouldMatch: true },
      { text: '10,99', shouldMatch: false }, // Falsches Trennzeichen
      { text: '10.9', shouldMatch: false }, // Zu wenig Stellen
      { text: '.99', shouldMatch: false }  // Fehlende Vorkommastelle
    ],
    hint: 'Escape den Punkt. Nutze \\d+ für Vor- und \\d{2} für die Nachkommastellen.',
    solution: '^\\d+\\.\\d{2}$'
  },
  {
    id: 28,
    title: 'Einfache HTML-Tags',
    description: 'Finde ein einfaches öffnendes HTML-Tag, z.B. <div> oder <span> (nur Buchstaben im Tag, keine Attribute).',
    difficulty: 'Mittel',
    testCases: [
      { text: '<div>', shouldMatch: true },
      { text: '<span>', shouldMatch: true },
      { text: '<div class="x">', shouldMatch: false }, // Enthält Attribute
      { text: '<>', shouldMatch: false }
    ],
    hint: 'Zwischen dem < und > müssen direkt 1 oder mehr Buchstaben (a-z) stehen.',
    solution: '^<[a-zA-Z]+>$'
  },
  {
    id: 29,
    title: 'Optionale Zeichen (color / colour)',
    description: 'Die britische Schreibweise ist "colour", die amerikanische "color". Schreibe einen regulären Ausdruck, der beide Versionen findet.',
    difficulty: 'Mittel',
    testCases: [
      { text: 'color', shouldMatch: true },
      { text: 'colour', shouldMatch: true },
      { text: 'colouur', shouldMatch: false },
      { text: 'colr', shouldMatch: false }
    ],
    hint: 'Das Fragezeichen (?) macht das davorstehende Zeichen (das "u") optional (0 oder 1 mal).',
    solution: '^colou?r$'
  },
  {
    id: 30,
    title: 'Trailing Whitespace (Leerzeichen am Ende)',
    description: 'Finde jeden Text, der versteckte Leerzeichen oder Tabs ganz am Schluss hat.',
    difficulty: 'Mittel',
    testCases: [
      { text: 'Hallo ', shouldMatch: true },
      { text: 'Test  ', shouldMatch: true },
      { text: 'Hallo', shouldMatch: false },
      { text: ' Text', shouldMatch: false }
    ],
    hint: 'Kombiniere \\s+ (für das/die Leerzeichen) unmittelbar mit dem String-Ende-Anker ($).',
    solution: '\\s+$'
  },
  {
    id: 31,
    title: 'Negierte Klassen (Darf nicht "A" sein)',
    description: 'Finde Wörter, deren erster Buchstabe aus dem englischen Alphabet NICHT "A" ist. Es muss exakt ein 5-Buchstaben-Wort sein.',
    difficulty: 'Mittel',
    testCases: [
      { text: 'Hallo', shouldMatch: true },
      { text: 'House', shouldMatch: true },
      { text: 'Apple', shouldMatch: false }, // Fängt mit A an
      { text: 'aBCDE', shouldMatch: true }, // Fängt mit a ab (ist nicht großes A)
      { text: 'Apfe', shouldMatch: false } // Zu kurz (aber fängt auch mit A an)
    ],
    hint: 'Mit [^A] im eckigen Klammerausdruck invertierst du die Match-Logik. Achte auf das Gesamt-Limit von 5 Zeichen.',
    solution: '^[^A][a-zA-Z]{4}$'
  },
  {
    id: 32,
    title: 'Bildformate (Endungen)',
    description: 'Finde Strings, die exakt auf ".jpg" oder ".png" enden und davor mindestens ein Zeichen haben.',
    difficulty: 'Mittel',
    testCases: [
      { text: 'bild.jpg', shouldMatch: true },
      { text: 'logo.png', shouldMatch: true },
      { text: '.jpg', shouldMatch: false },
      { text: 'bild.gif', shouldMatch: false }
    ],
    hint: 'Escape den Punkt. Benutze eine Gruppe mit Pipe (jpg|png) für die Wahl des Formates.',
    solution: '^.+\\.(jpg|png)$'
  },
  {
    id: 33,
    title: 'Exakt 5 Kleinbuchstaben',
    description: 'Finde Strings, die AUSSCHLIESSLICH aus exakt 5 Kleinbuchstaben bestehen.',
    difficulty: 'Mittel',
    testCases: [
      { text: 'abcde', shouldMatch: true },
      { text: 'hallo', shouldMatch: true },
      { text: 'Hallo', shouldMatch: false }, // Großbuchstabe
      { text: 'abcd', shouldMatch: false },  // Zu kurz
      { text: 'abcdef', shouldMatch: false } // Zu lang
    ],
    hint: 'Nutze wieder [a-z] als Set und {x} für die genaue Anzahl.',
    solution: '^[a-z]{5}$'
  },
  {
    id: 34,
    title: 'Einfacher Dateiname',
    description: 'Finde Dateinamen, die nur aus Alphazeichen (Wort-Zeichen) sowie der Endung ".txt" bestehen. (z.B. "notizen.txt")',
    difficulty: 'Mittel',
    testCases: [
      { text: 'notes.txt', shouldMatch: true },
      { text: 'Dokument_1.txt', shouldMatch: true },
      { text: 'a.txt', shouldMatch: true },
      { text: 'my notes.txt', shouldMatch: false }, // Enthält Leerzeichen
      { text: '.txt', shouldMatch: false } // Fehlt Dateiname
    ],
    hint: '\\w+ deckt Buchstaben, Zahlen und _ ab. Vergiss das Capping (^ und $) und den escpaden Punkt nicht.',
    solution: '^\\w+\\.txt$'
  },
  {
    id: 35,
    title: 'Passwort-Stärke validieren',
    description: 'Ein Passwort muss mindestens 8 Zeichen lang sein, mindestens einen Großbuchstaben und mindestens eine Ziffer enthalten (es sind alle anderen Zeichen erlaubt).',
    difficulty: 'Schwer',
    testCases: [
      { text: 'SafePass1', shouldMatch: true },
      { text: 'P@ssw0rd', shouldMatch: true },
      { text: 'password123', shouldMatch: false }, // Kein Großbuchstabe
      { text: 'Passwort', shouldMatch: false },     // Keine Zahl
      { text: 'Pw1', shouldMatch: false }           // Zu kurz
    ],
    hint: 'Verwende einen Lookahead (?=.*[A-Z]) und (?=.*\\d) um zu prüfen, ob die Bedingungen erfüllt sind, ohne den "Cursor" zu verschieben.',
    solution: '^(?=.*[A-Z])(?=.*\\d).{8,}$'
  },
  {
    id: 36,
    title: 'Gültige MAC-Adresse',
    description: 'Finde valide MAC-Adressen im Format XX:XX:XX:XX:XX:XX (wobei X ein gültiges Hexadezimalzeichen von 0-9 oder A-F ist).',
    difficulty: 'Schwer',
    testCases: [
      { text: '00:1A:2B:3C:4D:5E', shouldMatch: true },
      { text: 'A1:B2:C3:D4:E5:F6', shouldMatch: true },
      { text: '00-1A-2B-3C-4D-5E', shouldMatch: false }, // Falsches Trennzeichen
      { text: 'xx:yy:zz:11:22:33', shouldMatch: false }, // Ungültige Zeichen
      { text: '00:1A:2B:3C:4D', shouldMatch: false }     // Zu kurz
    ],
    hint: 'Du brauchst eine Gruppe, die sich 5x wiederholt (Hexblock + Doppelpunkt), gefolgt von einem finalen Hex-Block.',
    solution: '^([0-9A-Fa-f]{2}:){5}[0-9A-Fa-f]{2}$'
  },
  {
    id: 37,
    title: 'Semantische Versionierung',
    description: 'Finde Versionsnummern im groben Format X.Y.Z (Major.Minor.Patch), optional gefolgt von einem Prä-Release Text durch Bindestrich (z.B. -beta1).',
    difficulty: 'Schwer',
    testCases: [
      { text: '1.0.0', shouldMatch: true },
      { text: '2.14.3-alpha', shouldMatch: true },
      { text: '1.0', shouldMatch: false }, // Patch-Ziffer fehlt
      { text: 'v1.0.0', shouldMatch: false }, // v am anfang nicht erlaubt hier
      { text: '1.0.0.0', shouldMatch: false } // zu viele Punkte
    ],
    hint: 'Nutze \\d+ für die Ziffern und eine optionale Non-Capturing Group (?:...) für den Pre-Release Teil. ([a-zA-Z0-9]+)',
    solution: '^\\d+\\.\\d+\\.\\d+(?:-[a-zA-Z0-9]+)?$'
  },
  {
    id: 38,
    title: 'String im Quellcode extrahieren',
    description: 'Finde einen kompletten Text in doppelten Anführungszeichen. Escapte (mit Backslash) Anführungszeichen INNENDRIN dürfen den Test nicht abbrechen!',
    difficulty: 'Schwer',
    testCases: [
      { text: '"Hallo Welt"', shouldMatch: true },
      { text: '"Er sagte \\"Hallo\\""', shouldMatch: true },
      { text: '"Unvollständig', shouldMatch: false },
      { text: 'Ohne Quotes', shouldMatch: false }
    ],
    hint: 'Der innere Teil wiederholt entweder ein Nicht-Quote/Nicht-Backslash Zeichen ([^"\\\\]) ODER ein escaptes Zeichen (\\\\.).',
    solution: '^"(?:[^"\\\\]|\\\\.)*"$'
  },
  {
    id: 39,
    title: 'Wortwiederholungen finden',
    description: 'Finde Texte, in denen versehentlich dasselbe Wort direkt hintereinander steht (getrennt durch Whitespace).',
    difficulty: 'Schwer',
    testCases: [
      { text: 'der der Baum', shouldMatch: true },
      { text: 'Es ist ist wichtig', shouldMatch: true },
      { text: 'Das Haus ist schön', shouldMatch: false },
      { text: 'die diesen', shouldMatch: false }
    ],
    hint: 'Benutze Wortgrenzen (\\b), eine Capturing-Group für das erste Wort und eine Rückreferenz (\\1) für das zweite.',
    solution: '\\b(\\w+)\\s+\\1\\b'
  },
  {
    id: 40,
    title: 'Basis-Validierung YYYY-MM-DD Datum',
    description: 'Prüfe auf folgendes Format: 4 Ziffern Jahr, gefolgt von einem Strich, eine realistische Monatsziffer (01-12), Strich, und eine realistische Tagesziffer (01-31). Längere Monate/Schaltjahre ignorieren wir hier.',
    difficulty: 'Schwer',
    testCases: [
      { text: '2024-12-31', shouldMatch: true },
      { text: '1999-01-01', shouldMatch: true },
      { text: '2024-13-10', shouldMatch: false }, // Monat 13
      { text: '2022-00-15', shouldMatch: false }, // Monat 00
      { text: '2022-10-32', shouldMatch: false }  // Tag 32
    ],
    hint: 'Baue für den Monat (0[1-9]|1[0-2]) und für den Tag (0[1-9]|[12][0-9]|3[01]) auf.',
    solution: '^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$'
  },
  {
    id: 41,
    title: 'Strikter Username',
    description: 'Ein Username muss mit einem Buchstaben (groß/klein) beginnen, darf nur Buchstaben, Ziffern oder Unterstriche enthalten und muss zwischen 5 und 10 Zeichen lang sein.',
    difficulty: 'Schwer',
    testCases: [
      { text: 'user_123', shouldMatch: true },
      { text: 'Alpha99', shouldMatch: true },
      { text: 'a1', shouldMatch: false }, // Zu kurz
      { text: '1_user', shouldMatch: false }, // Fängt nicht mit Buchstaben an
      { text: 'user-name', shouldMatch: false } // Bindestrich verboten
    ],
    hint: 'Kombiniere zwei Teile: [a-zA-Z] für den ersten Letter, danach [a-zA-Z0-9_] für 4 bis 9 weitere (wg. der Gesamtlänge 5 bis 10).',
    solution: '^[a-zA-Z]\\w{4,9}$'
  },
  {
    id: 42,
    title: 'IPv4 Dummy Matcher',
    description: 'Prüfe grob das IPv4 Basisformat: 4 Blöcke mit je 1 bis 3 Ziffern, getrennt durch Punkte. (Logische Limitierung auf max 255 ist hier für Einfachheit nicht zwingend, es geht um das 4er Block Format).',
    difficulty: 'Schwer',
    testCases: [
      { text: '192.168.0.1', shouldMatch: true },
      { text: '10.0.0.255', shouldMatch: true },
      { text: '10.0.0', shouldMatch: false }, // Nur 3 Blöcke
      { text: '256.256.256.256', shouldMatch: true }, // Wird für das Testcase aufgrund der Dummy-Regel als true markiert (um Frust zu sparen)
      { text: '192.168.0.0.1', shouldMatch: false } // 5 Blöcke
    ],
    hint: 'Eine Non-Capturing Group (?:\\d{1,3}\\.){3} matcht die ersten drei Segmente effizient, gefolgt von einem finalen Block.',
    solution: '^(?:\\d{1,3}\\.){3}\\d{1,3}$'
  },
  {
    id: 43,
    title: 'HTML Link-Text Extraktion',
    description: 'Finde HTML a-Tags und extrahiere deren Link-Text (Der Text, der beim Anklicken sichtbar ist). Das Tag darf beliebige Attribute haben.',
    difficulty: 'Schwer',
    testCases: [
      { text: '<a href="#">Klick mich</a>', shouldMatch: true },
      { text: '<a class="btn">Link</a>', shouldMatch: true },
      { text: '<p>Kein Link</p>', shouldMatch: false },
      { text: '<a> Ohne schließendes Tag', shouldMatch: false }
    ],
    hint: 'Der Aufbau ist <a[^>]*>(.*?)</a>. Der Modifier .*? ist faul (lazy/non-greedy), um beim am ersten Schließen-Tag zu stoppen.',
    solution: '^<a[^>]*>.*?</a>$'
  },
  {
    id: 44,
    title: 'Erweiterte Hex-Farbcodes (mit Alpha)',
    description: 'Standard-Hex-Farbcodes sind 3 oder 6 Zeichen lang (nach dem "#"). Moderne Codes fügen für Transparenz (Alpha) noch 1 (Gesamt 4) oder 2 (Gesamt 8) weitere Zeichen an. Erlaube Längen 3/4/6/8.',
    difficulty: 'Schwer',
    testCases: [
      { text: '#fff', shouldMatch: true },
      { text: '#fffa', shouldMatch: true },
      { text: '#ffffff', shouldMatch: true },
      { text: '#ffffffaa', shouldMatch: true },
      { text: '#fffff', shouldMatch: false } // 5 ist ungültig
    ],
    hint: 'Nutze eine Oder-Gruppe (|) um sich auf die verschiedenen Längen der Zeichenklasse [a-fA-F0-9] aufzuteilen.',
    solution: '^#(?:[a-fA-F0-9]{3}|[a-fA-F0-9]{4}|[a-fA-F0-9]{6}|[a-fA-F0-9]{8})$'
  },
  {
    id: 45,
    title: 'Binär: Reines Nullmeer',
    description: 'Der String darf ausschließlich aus Nullen bestehen (mindestens eine). Einsen sind nicht erlaubt.',
    difficulty: 'Einfach',
    testCases: [
      { text: '0', shouldMatch: true },
      { text: '0000', shouldMatch: true },
      { text: '0010', shouldMatch: false },
      { text: '1', shouldMatch: false }
    ],
    hint: 'Verwende ^ und $ in Kombination mit 0 und einem Quantifier wie +.',
    solution: '^0+$'
  },
  {
    id: 46,
    title: 'Binär: Startet mit 1',
    description: 'Finde Binärstrings (aus 0en und 1en), die zwingend mit "1" beginnen.',
    difficulty: 'Einfach',
    testCases: [
      { text: '1001', shouldMatch: true },
      { text: '1', shouldMatch: true },
      { text: '010', shouldMatch: false },
      { text: '2', shouldMatch: false }
    ],
    hint: 'Nutze ^ um den Start zu markieren, und überprüfe ob der Rest aus [01] besteht.',
    solution: '^1[01]*$'
  },
  {
    id: 47,
    title: 'Binär: Endet auf 0',
    description: 'Finde Binärstrings, die auf eine "0" enden (z.B. eine gerade Zahl in Binär).',
    difficulty: 'Einfach',
    testCases: [
      { text: '1110', shouldMatch: true },
      { text: '0', shouldMatch: true },
      { text: '101', shouldMatch: false },
      { text: '00a', shouldMatch: false }
    ],
    hint: 'Ähnlich wie die letzte Übung, aber nutze das $ am Ende.',
    solution: '^[01]*0$'
  },
  {
    id: 48,
    title: 'Binär: Exakt 3 Bit',
    description: 'Finde Strings, die exakt 3 Zeichen lang sind und nur aus 0 und/oder 1 bestehen.',
    difficulty: 'Einfach',
    testCases: [
      { text: '101', shouldMatch: true },
      { text: '000', shouldMatch: true },
      { text: '10', shouldMatch: false },
      { text: '1010', shouldMatch: false },
      { text: '1a1', shouldMatch: false }
    ],
    hint: 'Eine Zeichenklasse [01] gepaart mit den geschweiften Klammern {x}.',
    solution: '^[01]{3}$'
  },
  {
    id: 49,
    title: 'Binär: Genau zwei Einsen',
    description: 'Finde Binärstrings, die an beliebiger Stelle exakt zwei "1"en enthalten (die restlichen Zeichen müssen "0" sein).',
    difficulty: 'Mittel',
    testCases: [
      { text: '11', shouldMatch: true },
      { text: '010100', shouldMatch: true },
      { text: '111', shouldMatch: false },
      { text: '1000', shouldMatch: false }
    ],
    hint: 'Baue ein Pattern auf, das null oder mehr 0en erlaubt (*), aber strikt nur zwei 1en.',
    solution: '^0*10*10*$'
  },
  {
    id: 50,
    title: 'Binär: Mindestens 3 Einsen am Stück',
    description: 'Finde Binärstrings, die irgendwo in der Sequenz mindestens drei "1"en direkt nacheinander haben.',
    difficulty: 'Mittel',
    testCases: [
      { text: '01110', shouldMatch: true },
      { text: '111', shouldMatch: true },
      { text: '101101', shouldMatch: false },
      { text: '11', shouldMatch: false }
    ],
    hint: 'Verwende 1{3} in der Mitte und erlaube davor und danach beliebige Nullen/Einsen.',
    solution: '^[01]*1{3}[01]*$'
  },
  {
    id: 51,
    title: 'Binär: Gerade Länge',
    description: 'Finde Binärstrings, die eine gerade Anzahl von Zeichen haben (Länge 2, 4, 6...).',
    difficulty: 'Mittel',
    testCases: [
      { text: '1010', shouldMatch: true },
      { text: '00', shouldMatch: true },
      { text: '111', shouldMatch: false },
      { text: '1', shouldMatch: false }
    ],
    hint: 'Fasse zwei beliebige Bitzeichen ([01]{2}) in eine Gruppe und wende ein + darauf an.',
    solution: '^([01]{2})+$'
  },
  {
    id: 52,
    title: 'Binär: Startet mit 10, endet auf 01',
    description: 'Finde Binärstrings (Länge >= 4), die präzise mit "10" starten und mit "01" enden.',
    difficulty: 'Mittel',
    testCases: [
      { text: '100001', shouldMatch: true },
      { text: '1001', shouldMatch: true },
      { text: '101', shouldMatch: false },
      { text: '101100', shouldMatch: false }
    ],
    hint: 'Der Anfang ist ^10, das Ende 01$. Dazwischen [01]*.',
    solution: '^10[01]*01$'
  },
  {
    id: 53,
    title: 'Binär: Kein "00" erlaubt',
    description: 'Finde Binärstrings, in denen nirgendwo zwei Nullen hintereinander vorkommen ("00").',
    difficulty: 'Schwer',
    testCases: [
      { text: '10101', shouldMatch: true },
      { text: '1', shouldMatch: true },
      { text: '1001', shouldMatch: false },
      { text: '00', shouldMatch: false }
    ],
    hint: 'Nutze einen Negative Lookahead am Anfang (?!.*00), um "00" komplett auszuschließen.',
    solution: '^(?!.*00)[01]+$'
  },
  {
    id: 54,
    title: 'Binär: Gleicher Start- und Endpunkt',
    description: 'Der Binärstring muss mit derselben Ziffer enden, mit der er begonnen hat (Länge mind. 2).',
    difficulty: 'Schwer',
    testCases: [
      { text: '1011', shouldMatch: true },
      { text: '00010', shouldMatch: true },
      { text: '10', shouldMatch: false },
      { text: '01', shouldMatch: false }
    ],
    hint: 'Eine Capturing Group am Start ^([01]), dann der Mittelteil, gefolgt von einer Back-Reference \\1$.',
    solution: '^([01])[01]*\\1$'
  },
  {
    id: 55,
    title: 'Binär: Endet nicht auf 11',
    description: 'Finde Binärstrings, die auf keinen Fall mit "11" enden dürfen. (Aber sie dürfen "11" enthalten!)',
    difficulty: 'Schwer',
    testCases: [
      { text: '1010', shouldMatch: true },
      { text: '110', shouldMatch: true },
      { text: '1011', shouldMatch: false },
      { text: '111', shouldMatch: false }
    ],
    hint: 'Ein Negative Lookahead am Beginn ^(?!.*11$) stellt sicher, dass "11" nicht vor dem Zeilenende $ auftaucht.',
    solution: '^(?!.*11$)[01]+$'
  },
  {
    id: 56,
    title: 'Binär: Gerade Anzahl an Nullen',
    description: 'Ein echter Klassiker in endlichen Automaten: Der Binärstring muss eine GERADE Anzahl an "0"en enthalten (0, 2, 4...). Einsen dürfen beliebig vorkommen.',
    difficulty: 'Schwer',
    testCases: [
      { text: '111', shouldMatch: true },  // 0 Nullen (Gerade)
      { text: '10101', shouldMatch: true }, // 2 Nullen
      { text: '100010', shouldMatch: true }, // 4 Nullen
      { text: '101', shouldMatch: false },   // 1 Null
      { text: '0', shouldMatch: false }      // 1 Null
    ],
    hint: 'Beginne mit beliebig vielen 1en. Wenn "0"en folgen, müssen sie immer im Paar auftauchen (bzw. mehrfache Paare), dazwischen dürfen beliebig viele 1en stehen: ^1*(01*01*)*$',
    solution: '^1*(01*01*)*$'
  }
];