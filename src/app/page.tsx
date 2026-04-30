"use client";
import { useState } from 'react';
import gameData from '../data/gameData.json';

export default function Home() {
  const [mode, setMode] = useState<'LOGIN' | 'MENU' | 'LEARNING' | 'BATTLE' | 'MAP'>('LOGIN');
  const [unlockedCards, setUnlockedCards] = useState([]);
  const [playerName, setPlayerName] = useState('');

  return (
    <main className="min-h-screen bg-slate-900 text-white p-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8">Hatake Spanish TCG</h1>

      {mode === 'LOGIN' && (
        <div className="bg-slate-800 p-8 rounded-xl border border-slate-600 w-full max-w-md text-center shadow-xl">
          <h2 className="text-2xl font-bold text-blue-400 mb-6">Create Your Avatar</h2>
          
          <div className="mb-6 flex justify-center">
            <div className="w-24 h-24 bg-slate-700 rounded-full border-4 border-slate-500 flex items-center justify-center relative">
              <span className="text-5xl">🧑‍💻</span>
              <span className="absolute bottom-0 right-0 text-2xl drop-shadow-md" title="Spanish Learner">🇪🇸</span>
            </div>
          </div>

          <input 
            type="text" 
            placeholder="Enter your nickname..."
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="w-full bg-slate-900 border border-slate-600 rounded p-3 text-white mb-4 focus:outline-none focus:border-blue-500"
          />
          
          <button 
            onClick={() => {
              if (playerName.trim()) setMode('MENU');
            }}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded transition"
          >
            Enter the World
          </button>
        </div>
      )}
      
      {mode === 'MENU' && (
        <div className="flex flex-col gap-4 w-full max-w-md">
          <div className="bg-slate-800 p-4 rounded-lg border border-slate-600 mb-2 flex items-center gap-4">
             <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center text-2xl relative">
                🧑‍💻
                <span className="absolute -bottom-1 -right-1 text-sm">🇪🇸</span>
             </div>
             <div>
               <p className="text-slate-400 text-xs uppercase tracking-wider">Welcome back,</p>
               <p className="font-bold text-lg">{playerName}</p>
             </div>
          </div>

          <button 
            onClick={() => setMode('LEARNING')}
            className="bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-500 transition"
          >
            Visit the Sage's Grove (Learn)
          </button>
          <button 
            onClick={() => setMode('BATTLE')}
            className="bg-red-600 px-6 py-3 rounded-lg hover:bg-red-500 transition"
          >
            Enter the Arena (Duel)
          </button>
        </div>
      )}

      {mode === 'LEARNING' && (
        <div className="bg-slate-800 p-6 rounded-xl max-w-md border border-blue-500">
          <p className="italic mb-4 text-blue-300">"{gameData.languages.spanish.lessons[0].npc_talk}"</p>
          <button 
            onClick={() => setMode('MENU')}
            className="mt-4 text-sm text-slate-400 underline"
          >
            Back to Camp
          </button>
        </div>
      )}

      {mode === 'BATTLE' && (
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-500">Arena Under Construction</h2>
          <button onClick={() => setMode('MENU')} className="mt-4 underline">Leave Arena</button>
        </div>
      )}
    </main>
  );
}