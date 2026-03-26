import { FC } from 'react';

export const Cheatsheet: FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-4xl mx-auto my-8 border border-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-4">Regex Cheatsheet</h2>
      
      <div className="space-y-8">
        <section>
          <h3 className="text-xl font-bold text-indigo-700 mb-3">Zeichenklassen (Character Classes)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-3 rounded border border-gray-200"><span className="font-mono text-indigo-600 font-bold">.</span> - Beliebiges Zeichen (außer Zeilenumbrüche)</div>
            <div className="bg-gray-50 p-3 rounded border border-gray-200"><span className="font-mono text-indigo-600 font-bold">\w</span> - Wortzeichen (a-z, A-Z, 0-9, _)</div>
            <div className="bg-gray-50 p-3 rounded border border-gray-200"><span className="font-mono text-indigo-600 font-bold">\W</span> - Kein Wortzeichen</div>
            <div className="bg-gray-50 p-3 rounded border border-gray-200"><span className="font-mono text-indigo-600 font-bold">\d</span> - Ziffer (0-9)</div>
            <div className="bg-gray-50 p-3 rounded border border-gray-200"><span className="font-mono text-indigo-600 font-bold">\D</span> - Keine Ziffer</div>
            <div className="bg-gray-50 p-3 rounded border border-gray-200"><span className="font-mono text-indigo-600 font-bold">\s</span> - Whitespace (Leerzeichen, Tab, etc.)</div>
            <div className="bg-gray-50 p-3 rounded border border-gray-200"><span className="font-mono text-indigo-600 font-bold">\S</span> - Kein Whitespace</div>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-bold text-indigo-700 mb-3">Anker (Anchors)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-3 rounded border border-gray-200"><span className="font-mono text-indigo-600 font-bold">^</span> - Anfang eines Strings (oder Zeile bei 'm' Flag)</div>
            <div className="bg-gray-50 p-3 rounded border border-gray-200"><span className="font-mono text-indigo-600 font-bold">$</span> - Ende eines Strings</div>
            <div className="bg-gray-50 p-3 rounded border border-gray-200"><span className="font-mono text-indigo-600 font-bold">\b</span> - Wortgrenze (Word Boundary)</div>
            <div className="bg-gray-50 p-3 rounded border border-gray-200"><span className="font-mono text-indigo-600 font-bold">\B</span> - Keine Wortgrenze</div>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-bold text-indigo-700 mb-3">Escaped Characters</h3>
          <div className="bg-gray-50 p-4 rounded border border-gray-200">
            Damit Sonderzeichen wie <span className="font-mono font-bold">. * + ? ^ $ {`{ } [ ] ( ) | \\`}</span> als normale Zeichen erkannt werden, muss ein Backslash (<span className="font-mono text-indigo-600 font-bold">\.</span>) vorangestellt werden.
          </div>
        </section>

        <section>
          <h3 className="text-xl font-bold text-indigo-700 mb-3">Quantifizierer (Quantifiers)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-3 rounded border border-gray-200"><span className="font-mono text-indigo-600 font-bold">*</span> - 0 oder mehr Mal</div>
            <div className="bg-gray-50 p-3 rounded border border-gray-200"><span className="font-mono text-indigo-600 font-bold">+</span> - 1 oder mehr Mal</div>
            <div className="bg-gray-50 p-3 rounded border border-gray-200"><span className="font-mono text-indigo-600 font-bold">?</span> - 0 oder 1 Mal (optional)</div>
            <div className="bg-gray-50 p-3 rounded border border-gray-200"><span className="font-mono text-indigo-600 font-bold">{`{3}`}</span> - Genau 3 Mal</div>
            <div className="bg-gray-50 p-3 rounded border border-gray-200"><span className="font-mono text-indigo-600 font-bold">{`{3,}`}</span> - 3 oder mehr Mal</div>
            <div className="bg-gray-50 p-3 rounded border border-gray-200"><span className="font-mono text-indigo-600 font-bold">{`{3,5}`}</span> - Zwischen 3 und 5 Mal</div>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-bold text-indigo-700 mb-3">Gruppierungen & Sets</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-3 rounded border border-gray-200"><span className="font-mono text-indigo-600 font-bold">[abc]</span> - a, b oder c</div>
            <div className="bg-gray-50 p-3 rounded border border-gray-200"><span className="font-mono text-indigo-600 font-bold">[^abc]</span> - Ein beliebiges Zeichen AUßER a, b oder c</div>
            <div className="bg-gray-50 p-3 rounded border border-gray-200"><span className="font-mono text-indigo-600 font-bold">[a-z]</span> - Ein Zeichen im Bereich a bis z</div>
            <div className="bg-gray-50 p-3 rounded border border-gray-200"><span className="font-mono text-indigo-600 font-bold">(abc)</span> - Capturing Group (Rückreferenz mit \1)</div>
            <div className="bg-gray-50 p-3 rounded border border-gray-200"><span className="font-mono text-indigo-600 font-bold">(?:abc)</span> - Non-capturing Group</div>
            <div className="bg-gray-50 p-3 rounded border border-gray-200"><span className="font-mono text-indigo-600 font-bold">a|b</span> - a oder b</div>
          </div>
        </section>
        
        <section>
          <h3 className="text-xl font-bold text-indigo-700 mb-3">Lookaround</h3>
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-gray-50 p-3 rounded border border-gray-200"><span className="font-mono text-indigo-600 font-bold">A(?=B)</span> - Positive Lookahead: Findet A, aber nur wenn B folgt.</div>
            <div className="bg-gray-50 p-3 rounded border border-gray-200"><span className="font-mono text-indigo-600 font-bold">A(?!B)</span> - Negative Lookahead: Findet A, aber nur wenn B NICHT folgt.</div>
            <div className="bg-gray-50 p-3 rounded border border-gray-200"><span className="font-mono text-indigo-600 font-bold">(?&lt;=B)A</span> - Positive Lookbehind: Findet A, aber nur wenn B vorangeht.</div>
            <div className="bg-gray-50 p-3 rounded border border-gray-200"><span className="font-mono text-indigo-600 font-bold">(?&lt;!B)A</span> - Negative Lookbehind: Findet A, aber nur wenn B NICHT vorangeht.</div>
          </div>
        </section>

      </div>
    </div>
  );
};