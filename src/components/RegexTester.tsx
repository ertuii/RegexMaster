import { useState, useEffect, type FC } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

export const RegexTester: FC = () => {
  const [regexInput, setRegexInput] = useState('');
  const [flags, setFlags] = useState('g');
  const [testString, setTestString] = useState('');
  const [isMatch, setIsMatch] = useState<boolean | null>(null);
  const [isExactMatch, setIsExactMatch] = useState<boolean | null>(null);
  const [matchDetails, setMatchDetails] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!regexInput || !testString) {
      setIsMatch(null);
      setIsExactMatch(null);
      setMatchDetails([]);
      setError(null);
      return;
    }

    try {
      const regex = new RegExp(regexInput, flags);
      const matches = testString.match(regex);
      
      if (matches) {
        setIsMatch(true);
        setIsExactMatch(matches[0] === testString);
        setMatchDetails(Array.from(matches)); // Convert to array if it's not already
      } else {
        setIsMatch(false);
        setIsExactMatch(false);
        setMatchDetails([]);
      }
      setError(null);
    } catch (e) {
      setIsMatch(null);
      setIsExactMatch(null);
      setMatchDetails([]);
      setError((e as Error).message);
    }
  }, [regexInput, flags, testString]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-4xl mx-auto my-8 border border-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-4">Regex Tester</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Dein Regex:</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-mono text-xl">/</span>
            <input
              type="text"
              value={regexInput}
              onChange={(e) => setRegexInput(e.target.value)}
              className={`w-full pl-8 pr-16 py-3 bg-gray-50 border-2 ${error ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-indigo-500'} rounded-lg focus:outline-none font-mono text-xl text-gray-800`}
              placeholder="Muster eingeben..."
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 font-mono text-xl">/{flags}</span>
          </div>
          
          <div className="mt-3 flex gap-2">
            {['g', 'i', 'm'].map(flag => (
              <button
                key={flag}
                onClick={() => setFlags(prev => prev.includes(flag) ? prev.replace(flag, '') : prev + flag)}
                className={`px-3 py-1 rounded text-xs font-mono border ${flags.includes(flag) ? 'bg-indigo-100 text-indigo-700 border-indigo-200' : 'text-gray-500 border-gray-200'}`}
              >
                {flag}
              </button>
            ))}
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Test String:</label>
          <textarea
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
            rows={5}
            className="w-full p-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none font-mono text-gray-800"
            placeholder="Text zum Testen eingeben..."
          />
        </div>

        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Ergebnis</h3>
          
          {isMatch === null && !error && (
            <p className="text-gray-500 italic">Gib einen Regex und einen Test-String ein, um Ergebnisse zu sehen.</p>
          )}

          {isMatch === true && (
            <div>
              <div className="flex flex-col gap-3 mb-6 bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 text-green-600 font-bold text-lg">
                  <CheckCircle2 className="w-6 h-6" /> Regex findet Match(es)!
                </div>
                {isExactMatch ? (
                  <div className="flex items-center gap-2 text-indigo-600 font-bold text-md border-t pt-2">
                    <CheckCircle2 className="w-5 h-5" /> Kompletter String wurde exakt gematcht.
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-yellow-600 font-bold text-md border-t pt-2">
                    <XCircle className="w-5 h-5" /> Matcht nur teilweise, nicht den kompletten String.
                  </div>
                )}
              </div>

              {matchDetails.length > 0 && flags.includes('g') && (
                <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                   <p className="text-sm font-semibold text-gray-600 mb-2">Matches ({matchDetails.length}):</p>
                   <ul className="list-disc list-inside space-y-1 ml-4 text-sm font-mono text-gray-800">
                      {matchDetails.map((match, i) => (
                        <li key={i}><span className="bg-green-100 px-1 rounded">{match}</span></li>
                      ))}
                   </ul>
                </div>
              )}
               {matchDetails.length > 0 && !flags.includes('g') && (
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-2">Match + Capture Groups:</p>
                   <ul className="list-disc list-inside space-y-1 ml-4 text-sm font-mono text-gray-800">
                      {matchDetails.map((match, i) => (
                        <li key={i}>
                            {i === 0 ? 'Full Match: ' : `Group ${i}: `}
                            <span className="bg-green-100 px-1 rounded">{match}</span>
                        </li>
                      ))}
                   </ul>
                </div>
               )}
            </div>
          )}

          {isMatch === false && !error && (
            <div className="flex items-center gap-2 text-red-500 font-bold text-lg">
              <XCircle className="w-6 h-6" /> Kein Match gefunden.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};