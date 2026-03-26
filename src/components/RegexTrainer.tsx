import { useState, useEffect, type FC } from 'react';
import { CheckCircle2, XCircle, Flag, RotateCcw } from 'lucide-react';
import { type Exercise } from '../data/exercises';

interface RegexTrainerProps {
  exercise: Exercise;
  onNext: () => void;
}

export const RegexTrainer: FC<RegexTrainerProps> = ({ exercise, onNext }) => {
  const [regexInput, setRegexInput] = useState('');
  const [flags, setFlags] = useState('g');
  const [results, setResults] = useState<{ [key: number]: boolean }>({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  useEffect(() => {
    setRegexInput('');
    setResults({});
    setIsSuccess(false);
    setShowSolution(false);
  }, [exercise]);

  useEffect(() => {
    validateRegex(regexInput);
  }, [regexInput, exercise]);

  const validateRegex = (input: string) => {
    if (!input) {
        setResults({});
        return;
    }

    try {
      const regex = new RegExp(input, flags);
      const newResults: { [key: number]: boolean } = {};
      let allCorrect = true;

      exercise.testCases.forEach((testCase, index) => {
        const isMatch = regex.test(testCase.text);
        const correct = isMatch === testCase.shouldMatch;
        newResults[index] = correct;
        if (!correct) allCorrect = false;
      });

      setResults(newResults);
      if (allCorrect && Object.keys(newResults).length > 0) {
        setIsSuccess(true);
      } else {
        setIsSuccess(false);
      }
    } catch (e) {
      // Invalid regex, ignore
      setIsSuccess(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-4xl mx-auto my-8 border border-gray-100">
      <div className="flex justify-between items-start mb-6">
        <div>
          <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded ${
            exercise.difficulty === 'Einfach' ? 'bg-green-100 text-green-700' :
            exercise.difficulty === 'Mittel' ? 'bg-yellow-100 text-yellow-700' :
            'bg-red-100 text-red-700'
          }`}>
            {exercise.difficulty}
          </span>
          <h2 className="text-3xl font-bold mt-2 text-gray-800">{exercise.title}</h2>
          <p className="text-gray-600 mt-2 text-lg">{exercise.description}</p>
        </div>
        <div className="text-right text-gray-400 text-sm font-mono">
            #{exercise.id}
        </div>
      </div>

      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">Dein Regex:</label>
        <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-mono text-xl">/</span>
            <input
            type="text"
            value={regexInput}
            onChange={(e) => setRegexInput(e.target.value)}
            className="w-full pl-8 pr-16 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none font-mono text-xl text-gray-800"
            placeholder="Muster eingeben..."
            autoFocus
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
         <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Testfälle</h3>
            <div className="space-y-3">
                {exercise.testCases.map((testCase, index) => (
                    <div key={index} className={`flex items-center justify-between p-3 rounded-lg border ${
                        results[index] === undefined ? 'bg-gray-50 border-gray-200' :
                        results[index] ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                    }`}>
                        <div className="flex items-center gap-3">
                            <span className="font-mono text-sm bg-white px-2 py-1 rounded border border-gray-200 text-gray-600">{testCase.text}</span>
                            <span className="text-xs text-gray-400">{testCase.shouldMatch ? 'Sollte matchen' : 'Sollte nicht matchen'}</span>
                        </div>
                        {results[index] === undefined ? (
                            <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                        ) : results[index] ? (
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                        ) : (
                            <XCircle className="w-5 h-5 text-red-500" />
                        )}
                    </div>
                ))}
            </div>
         </div>
         
         <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
            <h3 className="text-sm font-semibold text-blue-800 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Flag className="w-4 h-4" /> Hinweis
            </h3>
            <p className="text-blue-700 text-sm leading-relaxed mb-4">{exercise.hint}</p>
            
            <div className="pt-4 border-t border-blue-200">
                <button 
                    onClick={() => setShowSolution(!showSolution)}
                    className="text-xs font-medium text-blue-600 hover:text-blue-800 hover:underline mb-2 block"
                >
                    {showSolution ? 'Lösung verbergen' : 'Lösung anzeigen'}
                </button>
                {showSolution && (
                    <div className="font-mono text-lg font-bold text-gray-800 bg-white/50 p-2 rounded border border-blue-200 inline-block">
                        /{exercise.solution}/
                    </div>
                )}
            </div>
         </div>
      </div>

      <div className="flex justify-between items-center bg-gray-50 -mx-8 -mb-8 p-6 rounded-b-xl border-t border-gray-100">
        <button 
            onClick={() => {
                setRegexInput('');
                setResults({});
            }}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
            <RotateCcw className="w-4 h-4" /> Zurücksetzen
        </button>
        
        <button
            onClick={onNext}
            disabled={!isSuccess}
            className={`px-8 py-3 rounded-lg font-bold shadow-sm transition-all transform ${
                isSuccess 
                ? 'bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105 hover:shadow-md' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
        >
            Nächste Übung
        </button>
      </div>
    </div>
  );
};