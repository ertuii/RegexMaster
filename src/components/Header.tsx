import { Terminal } from 'lucide-react';
import type { ViewState } from '../App';

interface HeaderProps {
  currentView: ViewState;
  onViewChange: (view: ViewState) => void;
}

export const Header = ({ currentView, onViewChange }: HeaderProps) => {
  return (
    <header className="bg-gray-900 text-white p-6 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Terminal className="w-8 h-8 text-green-400" />
          <h1 className="text-2xl font-bold tracking-tight">Regex<span className="text-green-400">Master</span></h1>
        </div>
        <nav>
          <ul className="flex gap-6 text-sm font-medium text-gray-300">
            <li 
              onClick={() => onViewChange('exercises')}
              className={`cursor-pointer transition-colors ${currentView === 'exercises' ? 'text-green-400 font-bold' : 'hover:text-white'}`}
            >
              Übungen
            </li>
            <li 
              onClick={() => onViewChange('tester')}
              className={`cursor-pointer transition-colors ${currentView === 'tester' ? 'text-green-400 font-bold' : 'hover:text-white'}`}
            >
              Tester
            </li>
            <li 
              onClick={() => onViewChange('cheatsheet')}
              className={`cursor-pointer transition-colors ${currentView === 'cheatsheet' ? 'text-green-400 font-bold' : 'hover:text-white'}`}
            >
              Cheatsheet
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};