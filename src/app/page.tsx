"use client";
import { useState } from 'react';
import gameData from '../data/gameData.json';
// Note: We will comment this out temporarily until your DB is fully set up
// import { savePlayerToDB } from './actions'; 

export default function Home() {
  const [mode, setMode] = useState<'LANDING' | 'LOGIN' | 'MENU' | 'LEARNING' | 'BATTLE' | 'MAP'>('LANDING');
  const [unlockedCards, setUnlockedCards] = useState<any[]>([]);
  const [playerName, setPlayerName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Helper function to handle smooth page transitions
  const transitionTo = (nextMode: typeof mode) => {
    setIsLoading(true);
    setTimeout(() => {
      setMode(nextMode);
      setIsLoading(false);
    }, 800); // 800ms fake loading time for vibe
  };

  const handleLogin = async () => {
    if (!playerName.trim()) return;
    setIsLoading(true);
    
    // TEMPORARY BYPASS: Since actions.ts is missing from your repo, 
    // we will just let you into the game without hitting the NeonDB yet.
    /*
    const result = await savePlayerToDB(playerName);
    if (result.success) {
      setMode('MENU');
    } else {
      alert(result.error);
    }
    */
    
    setTimeout(() => {
      setMode('MENU');
      setIsLoading(false);
    }, 500);
  };

  return (
    <main className="min-h-screen bg-slate-900 text-white p-8 flex flex-col items-center relative">
      
      {/* Global Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm flex flex-col items-center justify-center z-50">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-blue-400 font-bold animate-pulse text-xl">Loading Realm...</p>
        </div>
      )}

      {mode !== 'LANDING' && <h1 className="text-4xl font-bold mb-8">LinguaForge</h1>}

      {mode === 'LANDING' && (
        <div className="flex flex-col items-center justify-center h-[70vh] text-center mt-12">
          <span className="text-6xl mb-4">🌍🃏</span>
          <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 mb-6 drop-shadow-lg">
            LinguaForge
          </h1>
          <p className="text-slate-400 mb-12 max-w-md text-lg">Master languages. Collect cards. Conquer the world.</p>
          <button 
            onClick={() => transitionTo('LOGIN')}
            className="animate-pulse bg-white text-slate-900 font-extrabold px-10 py-4 rounded-full hover:bg-slate-200 transition shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.6)]"
          >
            PRESS START
          </button>
        </div>
      )}

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
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded transition flex justify-center items-center gap-2"
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
            onClick={() => transitionTo('LEARNING')}
            className="bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-500 transition"
          >
            Visit the Sage's Grove (Learn)
          </button>
          <button 
            onClick={() => transitionTo('BATTLE')}
            className="bg-red-600 px-6 py-3 rounded-lg hover:bg-red-500 transition"
          >
            Enter the Arena (Duel)
          </button>
          <button 
            onClick={() => transitionTo('MAP')}
            className="bg-green-600 px-6 py-3 rounded-lg hover:bg-green-500 transition"
          >
            Explore the World (MMO Map)
          </button>
        </div>
      )}

      {mode === 'LEARNING' && (
        <div className="bg-slate-800 p-6 rounded-xl max-w-md w-full border border-blue-500">
          <p className="italic mb-6 text-blue-300 text-lg">"{gameData.languages.spanish.lessons[0].npc_talk}"</p>
          
          <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
            <p className="mb-4 font-semibold text-white">{gameData.languages.spanish.lessons[0].quiz.question}</p>
            <div className="flex flex-col gap-2">
              {gameData.languages.spanish.lessons[0].quiz.options.map((option, index) => (
                <button 
                  key={index}
                  onClick={() => {
                    if (index === gameData.languages.spanish.lessons[0].quiz.correct) {
                      alert("Correct! You unlocked: Espada & Escudo!");
                      setUnlockedCards([...unlockedCards, ...gameData.languages.spanish.lessons[0].cards_to_unlock]);
                      transitionTo('MENU');
                    } else {
                      alert("Not quite. The Sage shakes his head. Try again!");
                    }
                  }}
                  className="bg-slate-700 hover:bg-blue-600 px-4 py-3 rounded transition text-left text-white"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={() => transitionTo('MENU')}
            className="mt-6 text-sm text-slate-400 hover:text-white underline transition"
          >
            Flee back to Camp
          </button>
        </div>
      )}

      {mode === 'BATTLE' && (
        <div className="w-full max-w-2xl bg-slate-800 p-6 rounded-xl border border-red-500 shadow-lg shadow-red-900/20">
          <h2 className="text-3xl font-bold text-red-500 mb-6 text-center">The Arena</h2>
          
          <div className="mb-8 bg-slate-900 p-6 rounded-lg border border-slate-700 text-center flex flex-col items-center">
            <h3 className="text-xl text-slate-300 mb-2">Training Dummy</h3>
            <div className="w-full bg-slate-800 h-6 rounded-full overflow-hidden border border-slate-600">
              <div className="bg-red-500 h-full w-full"></div>
            </div>
            <p className="mt-2 font-mono">HP: 50 / 50</p>
          </div>
          
          <h3 className="text-lg font-semibold mb-3 text-blue-300">Your Hand:</h3>
          {unlockedCards.length === 0 ? (
            <div className="bg-slate-900 p-6 rounded text-center border border-dashed border-slate-600">
              <p className="text-slate-400 italic">Your hands are empty.</p>
              <p className="text-sm text-slate-500 mt-2">Go visit the Sage to learn your first words!</p>
            </div>
          ) : (
            <div className="flex flex-wrap gap-4 mb-6">
              {unlockedCards.map((card, idx) => (
                <button 
                  key={idx}
                  onClick={() => alert(`You attacked with ${card.word} for ${card.power} damage!`)}
                  className="bg-slate-700 hover:bg-red-600 hover:-translate-y-1 p-4 rounded-lg transition-all border border-slate-600 min-w-[120px]"
                >
                  <p className="font-bold text-xl">{card.word}</p>
                  <p className="text-xs text-slate-300 mt-1">PWR: {card.power}</p>
                  <p className="text-xs text-blue-200 mt-2 border-t border-slate-500 pt-1">{card.translation}</p>
                </button>
              ))}
            </div>
          )}
          
          <div className="text-center mt-8">
            <button onClick={() => transitionTo('MENU')} className="text-sm text-slate-400 hover:text-white underline transition">
              Flee Arena
            </button>
          </div>
        </div>
      )}

      {mode === 'MAP' && (
        <div className="text-center">
          <h2 className="text-2xl font-bold text-green-500">World Map Under Construction</h2>
          <button onClick={() => transitionTo('MENU')} className="mt-4 underline">Leave Map</button>
        </div>
      )}
    </main>
  );
}