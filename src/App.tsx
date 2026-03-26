import { useState } from 'react';
import { Header } from './components/Header';
import { RegexTrainer } from './components/RegexTrainer';
import { Cheatsheet } from './components/Cheatsheet';
import { RegexTester } from './components/RegexTester';
import { exercises, type Difficulty } from './data/exercises';
import { Trophy, CheckCircle2, Circle } from 'lucide-react';

export type ViewState = 'exercises' | 'cheatsheet' | 'tester';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>('exercises');
  const [completedExercises, setCompletedExercises] = useState<number[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'Alle'>('Alle');
  const [selectedExerciseId, setSelectedExerciseId] = useState<number>(exercises[0].id);

  const filteredExercises = exercises.filter(
    (ex) => selectedDifficulty === 'Alle' || ex.difficulty === selectedDifficulty
  ).sort((a, b) => {
    if (selectedDifficulty === 'Alle') {
      const difficultyOrder: Record<Difficulty, number> = { 'Einfach': 1, 'Mittel': 2, 'Schwer': 3 };
      return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
    }
    return 0;
  });

  const currentExercise = exercises.find((ex) => ex.id === selectedExerciseId);
  const currentFilteredIndex = currentExercise ? filteredExercises.findIndex((ex) => ex.id === currentExercise.id) : -1;

  const handleNext = () => {
    if (currentExercise && !completedExercises.includes(currentExercise.id)) {
      setCompletedExercises((prev) => [...prev, currentExercise.id]);
    }
    
    if (currentFilteredIndex >= 0 && currentFilteredIndex < filteredExercises.length - 1) {
      setSelectedExerciseId(filteredExercises[currentFilteredIndex + 1].id);
    } else {
      // Done with filtered
      alert("Herzlichen Glückwunsch! Alle Übungen in diesem Bereich abgeschlossen.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans pb-12">
      <Header currentView={currentView} onViewChange={setCurrentView} />
      
      <main className="container mx-auto px-4 mt-8 flex flex-col md:flex-row gap-6 items-start">
        {currentView === 'cheatsheet' ? (
          <Cheatsheet />
        ) : currentView === 'tester' ? (
          <RegexTester />
        ) : (
          <>
            {/* Sidebar */}
            <aside className="w-full md:w-1/3 lg:w-1/4 bg-white rounded-xl shadow-lg p-6 border border-gray-100 shrink-0">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Übungen</h2>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Schwierigkeit:</label>
                <select 
                  value={selectedDifficulty}
                  onChange={(e) => {
                    setSelectedDifficulty(e.target.value as Difficulty | 'Alle');
                    // Select first available exercise if the current one is filtered out
                    const newFiltered = exercises.filter(ex => e.target.value === 'Alle' || ex.difficulty === e.target.value);
                    if (newFiltered.length > 0) {
                      setSelectedExerciseId(newFiltered[0].id);
                    }
                  }}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:border-indigo-500"
                >
                  <option value="Alle">Alle</option>
                  <option value="Einfach">Einfach</option>
                  <option value="Mittel">Mittel</option>
                  <option value="Schwer">Schwer</option>
                </select>
              </div>

              <div className="space-y-2 h-[calc(100vh-300px)] overflow-y-auto pr-2">
                {filteredExercises.map((ex) => {
                  const isCompleted = completedExercises.includes(ex.id);
                  const isActive = selectedExerciseId === ex.id;
                  
                  return (
                    <button
                      key={ex.id}
                      onClick={() => setSelectedExerciseId(ex.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg border transition-all flex items-start gap-3 ${
                        isActive 
                          ? 'bg-indigo-50 border-indigo-200 shadow-sm' 
                          : 'bg-white border-gray-100 hover:bg-gray-50 hover:border-gray-200'
                      }`}
                    >
                      <div className="mt-0.5">
                        {isCompleted ? (
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                        ) : (
                          <Circle className="w-5 h-5 text-gray-300" />
                        )}
                      </div>
                      <div>
                        <h3 className={`font-semibold text-sm ${isActive ? 'text-indigo-900' : 'text-gray-800'}`}>
                          {ex.title}
                        </h3>
                        <span className={`text-xs px-2 py-0.5 mt-1 inline-block rounded ${
                          ex.difficulty === 'Einfach' ? 'bg-green-100 text-green-700' :
                          ex.difficulty === 'Mittel' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {ex.difficulty}
                        </span>
                      </div>
                    </button>
                  );
                })}
                
                {filteredExercises.length === 0 && (
                  <p className="text-gray-500 text-sm text-center py-4">Keine Übungen gefunden.</p>
                )}
              </div>
            </aside>

            {/* Main Content */}
            <section className="flex-1 w-full">
              {currentExercise ? (
                <div className="flex flex-col items-center w-full">
                  <div className="w-full mt-2 flex justify-between items-center text-sm text-gray-500 mb-2">
                    <span>Übung {currentFilteredIndex + 1} von {filteredExercises.length}</span>
                    <div className="w-1/3 bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500" 
                        style={{ width: `${filteredExercises.length > 0 ? ((currentFilteredIndex + 1) / filteredExercises.length) * 100 : 0}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <RegexTrainer 
                    exercise={currentExercise} 
                    onNext={handleNext} 
                  />
                </div>
              ) : (
                <div className="text-center mt-20 bg-white rounded-xl shadow-lg p-12 border border-gray-100">
                  <Trophy className="w-24 h-24 text-yellow-500 mx-auto mb-6" />
                  <h2 className="text-4xl font-bold text-gray-800 mb-4">Bereich abgeschlossen!</h2>
                  <p className="text-xl text-gray-600">Du hast alle Regex-Herausforderungen in diesem Bereich gemeistert oder ausgeblendet.</p>
                  <button 
                    onClick={() => {
                      setSelectedDifficulty('Alle');
                      if (exercises.length > 0) setSelectedExerciseId(exercises[0].id);
                      setCompletedExercises([]);
                    }}
                    className="mt-8 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition-colors"
                  >
                    Von vorne beginnen
                  </button>
                </div>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default App;