'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { GameController } from '@/modules/game/game.controller';
import { BoardService } from '@/modules/board/board.service';
import { Direction } from '@/modules/board/board.model';
import { GameState } from '@/modules/game/game.state';
import { AIService } from '@/modules/ai/ai.service';

export default function Page() {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const controllerRef = useRef<GameController | null>(null);
  const aiServiceRef = useRef<AIService>(new AIService());
  const [boardSize, setBoardSize] = useState<number>(4);
  const [hintDirection, setHintDirection] = useState<Direction | null>(null);

  // Thay đổi kích thước bàn cờ khi người dùng chọn (4x4, 5x5, 6x6)
  // Effect này sẽ chạy lại mỗi khi biến boardSize thay đổi, giúp reset game theo kích thước mới
  useEffect(() => {
    const initialBoard = BoardService.createInitialBoard(boardSize);
    const controller = new GameController(initialBoard);
    controller.start();
    controllerRef.current = controller;
    setGameState(controller.getState());
  }, [boardSize]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const keys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
    if (!keys.includes(e.key)) return;

    // Tắt gợi ý nếu đang hiển thị
    setHintDirection(null);

    e.preventDefault();

    if (!controllerRef.current) return;

    let direction: Direction;
    if (e.key === 'ArrowUp') direction = 'UP';
    else if (e.key === 'ArrowDown') direction = 'DOWN';
    else if (e.key === 'ArrowLeft') direction = 'LEFT';
    else direction = 'RIGHT';

    const newState = controllerRef.current.move(direction);
    setGameState({ ...newState });

    const board = document.getElementById('game-board');
    if (!board) return;

    board.style.transform = 'scale(0.99)';
    setTimeout(() => {
      board.style.transform = 'scale(1)';
    }, 100);
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown, { passive: false });
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const startNewGame = () => {
    if (!controllerRef.current) return;
    const initialBoard = BoardService.createInitialBoard(boardSize);
    controllerRef.current.newGame(initialBoard);
    setGameState({ ...controllerRef.current.getState() });
  };

  const togglePause = () => {
    if (!controllerRef.current) return;
    controllerRef.current.togglePause();
    setGameState({ ...controllerRef.current.getState() });
  };

  // Tính năng Gợi Ý (AI Hint)
  const showHint = () => {
    if (!gameState || gameState.gameOver) return;

    // Gọi tới AI Service (sử dụng thuật toán Expectimax) để tìm hướng đi tốt nhất
    const bestMove = aiServiceRef.current.getBestMove(gameState.board);
    if (bestMove) {
      setHintDirection(bestMove);
      // Giữ hiệu ứng sáng lên phím trong 1.5 giây rồi tự động tắt
      setTimeout(() => setHintDirection(null), 1500);
    }
  };

  return (
    <div className="min-h-screen bg-[#111316] text-[#e2e2e6]">

      {/* HEADER */}
      <header className="sticky top-0 z-40 flex flex-col md:flex-row items-center justify-between gap-4 px-6 py-4 border-b border-white/10 bg-[#111316]">

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={startNewGame}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#ff4d80] text-[#660027]">
            ▶ START
          </button>

          <button
            onClick={togglePause}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1e2023] text-[#e1bec3]">
            {gameState?.paused ? '▶ RESUME' : '⏸ PAUSE'}
          </button>

          <button 
            onClick={showHint}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors ${hintDirection ? 'bg-[#ff4d80] text-[#660027] font-bold' : 'bg-[#1e2023] text-[#e1bec3]'}`}>
            💡 HINT
          </button>

          <select
            value={boardSize}
            onChange={(e) => setBoardSize(Number(e.target.value))}
            className="bg-[#1e2023] text-[#e1bec3] px-3 py-2 rounded-xl focus:outline-none cursor-pointer border border-white/10 font-bold"
          >
            <option value={4}>4 x 4</option>
            <option value={5}>5 x 5</option>
            <option value={6}>6 x 6</option>
          </select>
        </div>

        <div>
          <button
            onClick={startNewGame}
            className="px-6 py-2 rounded-xl bg-[#ffb2bf] text-[#3f0016] font-bold border-b-4 border-[#5a0022]/40">
            NEW GAME
          </button>
        </div>
      </header>

      {/* MAIN */}
      <main className="flex flex-col items-center justify-center p-6 min-h-[calc(100vh-140px)]">

        {/* SCORE */}
        <div className="w-full max-w-[500px] flex gap-4 mb-8">

          <div className="flex-1 bg-[#1e2023] rounded-xl p-4 text-center border-b-4 border-[#ff4d80]">
            <div className="text-xs text-[#e1bec3] uppercase">SCORE</div>
            <div className="text-2xl font-bold text-[#ffb2bf]">{gameState?.score || 0}</div>
          </div>

        </div>

        {/* BOARD */}
        <div className="bg-[#0c0e11] p-3 rounded-xl border border-white/10 relative">

          {gameState?.gameOver && (
            <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center rounded-xl z-10">
              <h2 className="text-4xl font-bold text-[#ff4d80] mb-4">Game Over!</h2>
              <button
                onClick={startNewGame}
                className="px-6 py-2 rounded-xl bg-[#ffb2bf] text-[#3f0016] font-bold border-b-4 border-[#5a0022]/40"
              >
                Try Again
              </button>
            </div>
          )}

          {gameState?.paused && !gameState?.gameOver && (
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center rounded-xl z-10">
              <h2 className="text-4xl font-bold text-[#e1bec3]">Paused</h2>
            </div>
          )}

          <div
            id="game-board"
            // CSS Lưới (Grid) Động:
            // Tùy thuộc vào kích thước (boardSize), chúng ta thiết lập grid-cols và grid-rows tương ứng.
            // Điều này ép các ô vuông luôn luôn phân bố đều bên trong khung hình cố định (500x500 px),
            // giúp các ô luôn giữ tỷ lệ vuông vắn hoàn hảo bất kể ma trận 4x4 hay 6x6.
            className={`grid ${boardSize === 4 ? 'grid-cols-4 grid-rows-4 gap-3' :
                boardSize === 5 ? 'grid-cols-5 grid-rows-5 gap-2.5' :
                  'grid-cols-6 grid-rows-6 gap-2 sm:gap-3'
              } w-[320px] h-[320px] sm:w-[500px] sm:h-[500px] transition-transform`}
          >
            {gameState?.board.map((row, rowIndex) =>
              row.map((cell, colIndex) =>
                cell !== 0 ? (
                  <Tile key={`${rowIndex}-${colIndex}`} v={cell} />
                ) : (
                  <Empty key={`${rowIndex}-${colIndex}`} />
                )
              )
            )}
          </div>
        </div>

        {/* HOW TO PLAY */}
        <div className="w-full max-w-[500px] mt-10 bg-[#1e2023] rounded-xl p-6 border border-white/10">
          <h3 className="text-center text-[#ffb2bf] font-bold mb-6">
            HOW TO PLAY
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <Key icon="↑" label="UP" highlight={hintDirection === 'UP'} />
            <Key icon="↓" label="DOWN" highlight={hintDirection === 'DOWN'} />
            <Key icon="←" label="LEFT" highlight={hintDirection === 'LEFT'} />
            <Key icon="→" label="RIGHT" highlight={hintDirection === 'RIGHT'} />
          </div>
        </div>
      </main>

      {/* BACKGROUND EFFECT */}
      <div className="fixed inset-0 -z-10 opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-pink-500 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-green-400 blur-[120px]" />
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function Tile({ v }: { v: number }) {
  const map: Record<number, string> = {
    2: 'bg-[#ff4d80] text-[#660027]',
    4: 'bg-[#4caf50] text-black',
    8: 'bg-[#00bcd4] text-black',
    16: 'bg-[#e0f7fa] text-[#00363d]',
    32: 'bg-[#8bc34a] text-black',
    64: 'bg-[#f8bbd0] text-[#3f0016]',
    128: 'bg-[#fce4ec] text-[#660027]',
    256: 'bg-[#ffb2bf] text-[#660027]',
  };

  return (
    <div
      className={`rounded-lg flex items-center justify-center font-bold text-xl shadow-md hover:scale-105 transition ${map[v] || 'bg-white/10'}`}
    >
      {v}
    </div>
  );
}

function Empty() {
  return <div className="bg-[#333538] rounded-lg" />;
}

function Key({ icon, label, highlight }: { icon: string; label: string; highlight?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-8 h-8 flex items-center justify-center rounded border transition-colors ${
        highlight 
          ? 'bg-[#ff4d80] border-[#ff4d80] text-[#660027] font-bold scale-110 shadow-lg shadow-[#ff4d80]/50' 
          : 'bg-[#333538] border-white/10'
      }`}>
        {icon}
      </div>
      <span className={`transition-colors ${highlight ? 'text-[#ff4d80] font-bold' : ''}`}>{label}</span>
    </div>
  );
}