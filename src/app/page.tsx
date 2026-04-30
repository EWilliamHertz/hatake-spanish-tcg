"use client";
import { useState, useEffect } from 'react';
import gameData from '../data/gameData.json';

export default function Home() {
  const [mode, setMode] = useState<'LANDING' | 'LOGIN' | 'MENU' | 'LEARNING' | 'BATTLE' | 'MAP'>('LANDING');
  const [unlockedCards, setUnlockedCards] = useState<any[]>([]);
  const [playerName, setPlayerName] = useState('');
  const [playerAvatar, setPlayerAvatar] = useState('/avatar_mage.png');
  const [isLoading, setIsLoading] = useState(false);
  const [dummyHp, setDummyHp] = useState(50);
  
  // Progression & MMO States
  const [exp, setExp] = useState(0);
  const [friendsList, setFriendsList] = useState<string[]>([]);
  const [activeLesson, setActiveLesson] = useState<number | null>(null);
  const [isGrinding, setIsGrinding] = useState(false);
  
  // Overworld States
  const [toast, setToast] = useState<string | null>(null);
  const [playerPosition, setPlayerPosition] = useState({ x: 2, y: 2 });
  const [currentZone, setCurrentZone] = useState('Starter Village');
  const [contextMenu, setContextMenu] = useState<{ x: number, y: number, target: string, type: 'player' | 'npc', lessonId?: number } | null>(null);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const transitionTo = (nextMode: typeof mode) => {
    setIsLoading(true);
    setTimeout(() => {
      setMode(nextMode);
      setIsLoading(false);
    }, 500); 
  };

  // WASD Keyboard Movement
  useEffect(() => {
    if (mode !== 'MAP') return;
    const handleKeyDown = (e: KeyboardEvent) => {
      setPlayerPosition(prev => {
        const newPos = { ...prev };
        if (e.key === 'w' || e.key === 'W' || e.key === 'ArrowUp') newPos.y = Math.max(0, prev.y - 1);
        if (e.key === 's' || e.key === 'S' || e.key === 'ArrowDown') newPos.y = Math.min(4, prev.y + 1);
        if (e.key === 'a' || e.key === 'A' || e.key === 'ArrowLeft') newPos.x = Math.max(0, prev.x - 1);
        if (e.key === 'd' || e.key === 'D' || e.key === 'ArrowRight') newPos.x = Math.min(4, prev.x + 1);
        return newPos;
      });
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mode]);

  // Close Context Menu on click
  useEffect(() => {
    const handleClick = () => setContextMenu(null);
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <main className="min-h-screen bg-slate-900 text-white p-8 flex flex-col items-center relative overflow-hidden">
      
      {/* Custom Toast Notification */}
      {toast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-emerald-600 text-white px-6 py-3 rounded-full shadow-lg z-50 animate-bounce font-bold border-2 border-emerald-400">
          {toast}
        </div>
      )}

      {/* Right-Click Context Menu */}
      {contextMenu && (
        <div 
          className="fixed bg-slate-800 border border-slate-600 rounded-lg shadow-xl z-50 w-48 overflow-hidden"
          style={{ top: contextMenu.y, left: contextMenu.x }}
          onClick={(e) => e.stopPropagation()} 
        >
          <div className={`px-4 py-2 border-b border-slate-700 font-bold text-sm ${contextMenu.type === 'player' ? 'bg-red-900/30 text-red-400' : 'bg-blue-900/30 text-blue-400'}`}>
            {contextMenu.target}
          </div>
          
          {contextMenu.type === 'npc' && (
            <>
              <button 
                onClick={() => {
                  setContextMenu(null);
                  setActiveLesson(contextMenu.lessonId!);
                  setIsGrinding(false); 
                  transitionTo('LEARNING');
                }}
                className="w-full text-left px-4 py-2 hover:bg-slate-700 transition text-sm text-white"
              >
                Request Lesson (Cards)
              </button>
              <button 
                onClick={() => {
                  setContextMenu(null);
                  setActiveLesson(contextMenu.lessonId!);
                  setIsGrinding(true); 
                  transitionTo('LEARNING');
                }}
                className="w-full text-left px-4 py-2 hover:bg-emerald-900 transition text-sm text-emerald-300 border-t border-slate-700"
              >
                Chat / Practice (EXP)
              </button>
            </>
          )}

          {contextMenu.type === 'player' && (
            <>
              <button className="w-full text-left px-4 py-2 hover:bg-red-900 transition text-sm text-red-300">Duel Player</button>
              <button 
                onClick={() => {
                  if (!friendsList.includes(contextMenu.target)) {
                    setFriendsList([...friendsList, contextMenu.target]);
                    showToast(`${contextMenu.target} added to friends!`);
                  } else {
                    showToast(`${contextMenu.target} is already your friend.`);
                  }
                  setContextMenu(null);
                }}
                className="w-full text-left px-4 py-2 hover:bg-emerald-900 transition text-sm text-emerald-300 border-t border-slate-700"
              >
                Add as Friend
              </button>
            </>
          )}
        </div>
      )}

      {/* Global Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm flex flex-col items-center justify-center z-50">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-blue-400 font-bold animate-pulse text-xl">Loading Realm...</p>
        </div>
      )}

      {mode !== 'LANDING' && <h1 className="text-4xl font-bold mb-8">LinguaForge Online</h1>}

      {mode === 'LANDING' && (
        <div className="flex flex-col items-center justify-center h-[70vh] text-center mt-12">
          <span className="text-6xl mb-4">🌍🃏</span>
          <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 mb-6 drop-shadow-lg">
            LinguaForge Online
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
          <h2 className="text-2xl font-bold text-blue-400 mb-6">Choose Your Avatar</h2>
          
          <div className="mb-6 flex justify-center gap-4">
            <button 
              onClick={() => setPlayerAvatar('/avatar_mage.png')}
              className={`w-20 h-20 rounded-lg border-4 transition-all overflow-hidden bg-slate-700 flex items-center justify-center ${playerAvatar === '/avatar_mage.png' ? 'border-blue-500 scale-110 shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'border-slate-600 opacity-50'}`}
            >
              <img src="/avatar_mage.png" alt="Mage" className="w-12 h-12 object-contain" onError={(e) => e.currentTarget.style.display = 'none'} />
              <span className="absolute text-3xl -z-10">🧙‍♂️</span>
            </button>
            <button 
              onClick={() => setPlayerAvatar('/avatar_warrior.png')}
              className={`w-20 h-20 rounded-lg border-4 transition-all overflow-hidden bg-slate-700 flex items-center justify-center ${playerAvatar === '/avatar_warrior.png' ? 'border-red-500 scale-110 shadow-[0_0_15px_rgba(239,68,68,0.5)]' : 'border-slate-600 opacity-50'}`}
            >
              <img src="/avatar_warrior.png" alt="Warrior" className="w-12 h-12 object-contain" onError={(e) => e.currentTarget.style.display = 'none'} />
              <span className="absolute text-3xl -z-10">🥷</span>
            </button>
          </div>

          <input 
            type="text" 
            placeholder="Enter your nickname..."
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="w-full bg-slate-900 border border-slate-600 rounded p-3 text-white mb-4 focus:outline-none focus:border-blue-500"
          />
          
          <button 
            onClick={() => { if (playerName.trim()) transitionTo('MENU'); }}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded transition flex justify-center items-center gap-2"
          >
            Enter the World
          </button>
        </div>
      )}

      {mode === 'MENU' && (
        <div className="flex flex-col gap-4 w-full max-w-md">
          <div className="bg-slate-800 p-4 rounded-lg border border-slate-600 mb-2 flex items-center gap-4 relative overflow-hidden">
             <div className="w-16 h-16 bg-slate-700 rounded-lg flex items-center justify-center relative border-2 border-slate-500 shadow-inner overflow-hidden">
                <img src={playerAvatar} alt="Avatar" className="w-10 h-10 object-contain z-10" onError={(e) => e.currentTarget.style.display = 'none'} />
                <span className="absolute -bottom-1 -right-1 text-sm z-20">🇪🇸</span>
             </div>
             <div className="flex-1 z-10">
               <p className="text-slate-400 text-xs uppercase tracking-wider flex justify-between">
                 <span>Camp</span>
                 <span className="text-emerald-400 font-bold">LVL {Math.floor(exp / 100) + 1}</span>
               </p>
               <p className="font-bold text-xl text-white">{playerName}</p>
               <div className="w-full bg-slate-900 h-2 rounded-full mt-2 overflow-hidden border border-slate-700">
                  <div className="bg-emerald-500 h-full transition-all" style={{ width: `${exp % 100}%` }}></div>
               </div>
               <p className="text-[10px] text-right text-slate-500 mt-1">{exp % 100} / 100 EXP</p>
             </div>
          </div>
          
          {friendsList.length > 0 && (
            <div className="bg-slate-900/50 border border-slate-700 p-2 rounded text-xs text-slate-400 flex gap-2 overflow-x-auto">
              <span className="font-bold text-slate-300">Friends:</span> 
              {friendsList.map(f => <span key={f} className="bg-slate-800 px-2 rounded text-blue-300">{f}</span>)}
            </div>
          )}

          <button 
            onClick={() => transitionTo('BATTLE')}
            className="bg-red-600 px-6 py-3 rounded-lg hover:bg-red-500 transition"
          >
            Enter the Arena (Duel)
          </button>
          <button 
            onClick={() => transitionTo('MAP')}
            className="bg-green-600 px-6 py-3 rounded-lg hover:bg-green-500 transition shadow-[0_0_15px_rgba(34,197,94,0.3)]"
          >
            Explore the World (MMO Map)
          </button>
        </div>
      )}

      {mode === 'LEARNING' && activeLesson !== null && (
        <div className={`bg-slate-800 p-6 rounded-xl max-w-md w-full border ${isGrinding ? 'border-emerald-500 shadow-emerald-900/30' : 'border-blue-500 shadow-blue-900/30'} shadow-lg`}>
            <div>
              <h3 className={`font-bold mb-2 ${isGrinding ? 'text-emerald-400' : 'text-blue-400'} flex justify-between`}>
                <span>{gameData.languages.spanish.lessons[activeLesson].npc_name}</span>
                <span className="text-xs bg-slate-900 px-2 py-1 rounded">{isGrinding ? '+ EXP Practice' : 'Unlock Card'}</span>
              </h3>
              
              <p className="italic mb-6 text-slate-300 text-lg">"{gameData.languages.spanish.lessons[activeLesson].npc_talk}"</p>
              
              <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
                <p className="mb-4 font-semibold text-white">{gameData.languages.spanish.lessons[activeLesson].quiz.question}</p>
                <div className="flex flex-col gap-2">
                  {gameData.languages.spanish.lessons[activeLesson].quiz.options.map((option, index) => (
                    <button 
                      key={index}
                      onClick={() => {
                        if (index === gameData.languages.spanish.lessons[activeLesson].quiz.correct) {
                          if (isGrinding) {
                            setExp(prev => prev + 25);
                            showToast("🌟 Correct! +25 EXP Gained!");
                          } else {
                            const newCards = gameData.languages.spanish.lessons[activeLesson].cards_to_unlock;
                            const isAlreadyUnlocked = unlockedCards.some(card => card.id === newCards[0].id);
                            if (!isAlreadyUnlocked) {
                              setUnlockedCards([...unlockedCards, ...newCards]);
                              showToast(`✨ Unlocked Card: ${newCards.map(c => c.word).join(', ')}!`);
                            } else {
                              showToast(`⚠️ You already own ${newCards.map(c => c.word).join(', ')}.`);
                            }
                          }
                          transitionTo('MAP');
                        } else {
                          showToast("❌ Not quite. The tutor shakes their head. Try again!");
                        }
                      }}
                      className={`px-4 py-3 rounded transition text-left text-white ${isGrinding ? 'bg-slate-700 hover:bg-emerald-600' : 'bg-slate-700 hover:bg-blue-600'}`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              <button 
                onClick={() => transitionTo('MAP')}
                className="mt-6 text-sm text-slate-400 hover:text-white underline transition block w-full text-center border-t border-slate-700 pt-4"
              >
                Walk away
              </button>
            </div>
        </div>
      )}

      {mode === 'BATTLE' && (
        <div className="w-full max-w-2xl bg-slate-800 p-6 rounded-xl border border-red-500 shadow-lg shadow-red-900/20">
          <h2 className="text-3xl font-bold text-red-500 mb-6 text-center">The Arena</h2>
          
          <div className="mb-8 bg-slate-900 p-6 rounded-lg border border-slate-700 text-center flex flex-col items-center">
            <h3 className="text-xl text-slate-300 mb-2">Training Dummy</h3>
            <div className="w-full bg-slate-800 h-6 rounded-full overflow-hidden border border-slate-600">
              <div 
                className="bg-red-500 h-full transition-all duration-300 ease-out" 
                style={{ width: `${Math.max(0, (dummyHp / 50) * 100)}%` }}
              ></div>
            </div>
            <p className="mt-2 font-mono">HP: {dummyHp} / 50</p>
            {dummyHp <= 0 && <p className="text-green-400 font-bold mt-2 animate-bounce">Dummy Destroyed!</p>}
            <button 
              onClick={() => setDummyHp(50)} 
              className="mt-4 text-xs bg-slate-700 hover:bg-slate-600 px-3 py-1 rounded"
            >
              Reset Dummy
            </button>
          </div>
          
          <h3 className="text-lg font-semibold mb-3 text-blue-300">Your Hand:</h3>
          {unlockedCards.length === 0 ? (
            <div className="bg-slate-900 p-6 rounded text-center border border-dashed border-slate-600">
              <p className="text-slate-400 italic">Your hands are empty.</p>
              <p className="text-sm text-slate-500 mt-2">Explore the Map to find Tutors!</p>
            </div>
          ) : (
            <div className="flex flex-wrap gap-4 mb-6">
              {unlockedCards.map((card, idx) => (
                <button 
                  key={idx}
                  onClick={() => setDummyHp(prev => Math.max(0, prev - card.power))}
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
            <button onClick={() => { setDummyHp(50); transitionTo('MENU'); }} className="text-sm text-slate-400 hover:text-white underline transition">
              Flee Arena
            </button>
          </div>
        </div>
      )}

      {mode === 'MAP' && (
        <div className="w-full max-w-2xl bg-slate-800 p-6 rounded-xl border border-green-500 shadow-lg shadow-green-900/20" onContextMenu={(e) => e.preventDefault()}>
          <h2 className="text-2xl font-bold text-green-400 mb-4 flex justify-between items-center">
            <span>The Overworld</span>
            <span className="text-sm font-normal text-emerald-300 bg-emerald-900/50 px-3 py-1 rounded-full border border-emerald-700">Location: {currentZone}</span>
          </h2>
          
          <div className="bg-emerald-900/30 border border-emerald-800 rounded-lg p-4 mb-4 grid grid-cols-5 grid-rows-5 gap-1 w-full max-w-sm mx-auto aspect-square relative">
            {Array.from({ length: 25 }).map((_, i) => {
              const x = i % 5;
              const y = Math.floor(i / 5);
              const isPlayer = x === playerPosition.x && y === playerPosition.y;
              
              // Map Entities
              const isEnemyPlayer = currentZone === 'Starter Village' && x === 1 && y === 1; 
              const isBlacksmith = currentZone === 'Starter Village' && x === 4 && y === 0;
              const isScholar = currentZone === 'Dark Forest' && x === 2 && y === 2;
              const isAlchemist = currentZone === 'Volcano' && x === 3 && y === 1;
              
              // Zone Portals
              const isExitToForest = currentZone === 'Starter Village' && x === 4 && y === 4;
              const isExitToVillageFromForest = currentZone === 'Dark Forest' && x === 0 && y === 0;
              const isExitToVolcano = currentZone === 'Dark Forest' && x === 4 && y === 0;
              const isExitToForestFromVolcano = currentZone === 'Volcano' && x === 0 && y === 4;
              
              let bgClass = 'bg-emerald-800/40';
              let tileImage = '/tile_grass.png';
              if (currentZone === 'Volcano') {
                bgClass = 'bg-orange-900/60';
                tileImage = '/tile_lava.png';
              } else if (currentZone === 'Dark Forest') {
                bgClass = 'bg-emerald-950/80';
              }

              return (
                <div 
                  key={i} 
                  className={`rounded-sm flex items-center justify-center relative transition-colors overflow-hidden
                    ${isPlayer ? 'bg-blue-700/80 shadow-[inset_0_0_15px_rgba(59,130,246,0.8)]' : bgClass}
                    ${(isExitToForest || isExitToVolcano) ? 'bg-blue-900/50 border-2 border-blue-500 animate-pulse' : ''}
                    ${(isExitToVillageFromForest || isExitToForestFromVolcano) ? 'bg-yellow-900/50 border-2 border-yellow-500 animate-pulse' : ''}
                  `}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    if (isEnemyPlayer) setContextMenu({ x: e.clientX, y: e.clientY, target: 'xX_Shadow_Xx', type: 'player' });
                    if (isBlacksmith) setContextMenu({ x: e.clientX, y: e.clientY, target: 'The Blacksmith', type: 'npc', lessonId: 0 }); 
                    if (isScholar) setContextMenu({ x: e.clientX, y: e.clientY, target: 'The Scholar', type: 'npc', lessonId: 1 }); 
                    if (isAlchemist) setContextMenu({ x: e.clientX, y: e.clientY, target: 'The Alchemist', type: 'npc', lessonId: 2 }); 
                  }}
                  onClick={() => {
                    if (isPlayer && isExitToForest) {
                      setCurrentZone('Dark Forest');
                      setPlayerPosition({x: 0, y: 1}); 
                      showToast("You entered the Dark Forest...");
                    }
                    if (isPlayer && isExitToVillageFromForest) {
                      setCurrentZone('Starter Village');
                      setPlayerPosition({x: 3, y: 4}); 
                      showToast("You returned to the Village.");
                    }
                    if (isPlayer && isExitToVolcano) {
                      setCurrentZone('Volcano');
                      setPlayerPosition({x: 1, y: 4}); 
                      showToast("It's getting hot... You entered the Volcano.");
                    }
                    if (isPlayer && isExitToForestFromVolcano) {
                      setCurrentZone('Dark Forest');
                      setPlayerPosition({x: 3, y: 0}); 
                      showToast("You escaped the heat.");
                    }
                  }}
                >
                  <img src={tileImage} alt="tile" className="absolute w-full h-full object-cover opacity-20 pointer-events-none" onError={(e) => e.currentTarget.style.display = 'none'} />

                  {(isExitToForest || isExitToVolcano) && <span className="text-[10px] font-bold text-blue-300 absolute z-0 drop-shadow-md pointer-events-none">NEXT ➡️</span>}
                  {(isExitToVillageFromForest || isExitToForestFromVolcano) && <span className="text-[10px] font-bold text-yellow-300 absolute z-0 drop-shadow-md pointer-events-none">⬅️ BACK</span>}

                  {isPlayer && (
                    <div className="absolute z-10 w-full h-full flex items-center justify-center drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                      <img src={playerAvatar} alt="Player" className="w-10 h-10 object-contain animate-bounce" onError={(e) => e.currentTarget.style.display = 'none'} />
                    </div>
                  )}
                  
                  {isEnemyPlayer && <div className="text-3xl absolute z-10 cursor-pointer hover:scale-110 transition drop-shadow-md" title="Right-click me!">🥷</div>}
                  
                  {isBlacksmith && <img src="/npc_blacksmith.png" className="w-8 h-8 absolute z-10 cursor-pointer hover:scale-110 transition drop-shadow-md" title="The Blacksmith" onError={(e) => e.currentTarget.style.display = 'none'} />}
                  {isScholar && <img src="/npc_scholar.png" className="w-8 h-8 absolute z-10 cursor-pointer hover:scale-110 transition drop-shadow-md" title="The Scholar" onError={(e) => e.currentTarget.style.display = 'none'} />}
                  {isAlchemist && <img src="/npc_alchemist.png" className="w-8 h-8 absolute z-10 cursor-pointer hover:scale-110 transition drop-shadow-md animate-pulse" title="The Alchemist" onError={(e) => e.currentTarget.style.display = 'none'} />}
                  
                  {(currentZone === 'Dark Forest' && (x === 1 || y === 3)) && <div className="text-2xl absolute opacity-90 drop-shadow-md pointer-events-none">🌲</div>}
                  {(currentZone === 'Volcano' && (x === 0 || y === 2)) && <div className="text-2xl absolute opacity-90 drop-shadow-md pointer-events-none text-red-500">🔥</div>}
                </div>
              )
            })}
          </div>

          <p className="text-emerald-400 font-bold text-center mb-6">
            Move to flashing tiles and <span className="text-white bg-slate-700 px-2 rounded">CLICK</span> to travel. <br/>
            Right-click NPCs to Learn!
          </p>

          <div className="text-center">
            <button onClick={() => transitionTo('MENU')} className="text-sm text-slate-400 hover:text-white underline transition">
              Return to Camp
            </button>
          </div>
        </div>
      )}
    </main>
  );
}