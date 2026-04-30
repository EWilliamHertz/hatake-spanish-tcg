"use client";
import { useState } from 'react';
import gameData from '../data/gameData.json';

export default function Home() {
  const [mode, setMode] = useState<'MENU' | 'LEARNING' | 'BATTLE'>('MENU');
  const [unlockedCards, setUnlockedCards] = useState([]);

  return (
    <main className="min-h-screen bg-slate-900 text-white p-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8">Hatake Spanish TCG</h1>
      
      {mode === 'MENU' && (
        <div className="flex flex-col gap-4">
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