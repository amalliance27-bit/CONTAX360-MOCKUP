import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Gamepad2, Brain, Trophy, RotateCcw, Volume2, VolumeX, Sparkles, 
  CheckCircle2, Grid, Award, Play, Bot, CircleDot, HelpCircle,
  Crown, Scissors, FileText, Circle
} from 'lucide-react';
import { JarvisRoom } from './JarvisRoom';
import { VaultRoomArcade } from './VaultRoomArcade';

interface ArcadeRoomProps {
  className?: string;
  defaultTab?: 'arcade' | 'vip' | 'jarvis';
  hideHeaderSwitcher?: boolean;
  onClose?: () => void;
}

// Sudoku Pre-validated Puzzles (0 = blank)
const SUDOKU_PUZZLES = [
  {
    name: 'Executive Easy',
    initial: [
      [5, 3, 0, 0, 7, 0, 0, 0, 0],
      [6, 0, 0, 1, 9, 5, 0, 0, 0],
      [0, 9, 8, 0, 0, 0, 0, 6, 0],
      [8, 0, 0, 0, 6, 0, 0, 0, 3],
      [4, 0, 0, 8, 0, 3, 0, 0, 1],
      [7, 0, 0, 0, 2, 0, 0, 0, 6],
      [0, 6, 0, 0, 0, 0, 2, 8, 0],
      [0, 0, 0, 4, 1, 9, 0, 0, 5],
      [0, 0, 0, 0, 8, 0, 0, 7, 9]
    ],
    solution: [
      [5, 3, 4, 6, 7, 8, 9, 1, 2],
      [6, 7, 2, 1, 9, 5, 3, 4, 8],
      [1, 9, 8, 3, 4, 2, 5, 6, 7],
      [8, 5, 9, 7, 6, 1, 4, 2, 3],
      [4, 2, 6, 8, 5, 3, 7, 9, 1],
      [7, 1, 3, 9, 2, 4, 8, 5, 6],
      [9, 6, 1, 5, 3, 7, 2, 8, 4],
      [2, 8, 7, 4, 1, 9, 6, 3, 5],
      [3, 4, 5, 2, 8, 6, 1, 7, 9]
    ]
  },
  {
    name: 'Master Mind',
    initial: [
      [0, 0, 0, 2, 6, 0, 7, 0, 1],
      [6, 8, 0, 0, 7, 0, 0, 9, 0],
      [1, 9, 0, 0, 0, 4, 5, 0, 0],
      [8, 2, 0, 1, 0, 0, 0, 4, 0],
      [0, 0, 4, 6, 0, 2, 9, 0, 0],
      [0, 5, 0, 0, 0, 3, 0, 2, 8],
      [0, 0, 9, 3, 0, 0, 0, 7, 4],
      [0, 4, 0, 0, 5, 0, 0, 3, 6],
      [7, 0, 3, 0, 1, 8, 0, 0, 0]
    ],
    solution: [
      [4, 3, 5, 2, 6, 9, 7, 8, 1],
      [6, 8, 2, 5, 7, 1, 4, 9, 3],
      [1, 9, 7, 8, 3, 4, 5, 6, 2],
      [8, 2, 6, 1, 9, 5, 3, 4, 7],
      [3, 7, 4, 6, 8, 2, 9, 1, 5],
      [9, 5, 1, 7, 4, 3, 6, 2, 8],
      [5, 1, 9, 3, 2, 6, 8, 7, 4],
      [2, 4, 8, 9, 5, 7, 1, 3, 6],
      [7, 6, 3, 4, 1, 8, 2, 5, 9]
    ]
  }
];

// Memory Matching Pairs Tokens (Caribbean BPO & Executive Theme)
const MEMORY_SYMBOLS = ['CX-360', 'BPO-AI', 'SLA-99', 'FIBER', 'MONTEGO', 'FLORIDA', 'SECURITY', 'CLOUD'];

export const ArcadeRoom: React.FC<ArcadeRoomProps> = ({ 
  className = '', 
  defaultTab = 'arcade',
  hideHeaderSwitcher = false,
  onClose 
}) => {
  const [activeTab, setActiveTab] = useState<'arcade' | 'vip' | 'jarvis'>(defaultTab);

  // Sub-game selection
  const [activeArcadeGame, setActiveArcadeGame] = useState<'breaker' | 'checkers' | 'connect4' | 'tictactoe' | 'rps'>('breaker');
  const [activeVipGame, setActiveVipGame] = useState<'sudoku' | 'wordle' | 'memory' | 'simon'>('sudoku');

  useEffect(() => {
    if (defaultTab) {
      setActiveTab(defaultTab);
    }
  }, [defaultTab]);

  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Web Audio synth for retro game sounds
  const audioCtxRef = useRef<AudioContext | null>(null);
  const playSound = useCallback((type: 'click' | 'win' | 'loss' | 'match' | 'simon') => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      const now = ctx.currentTime;

      if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(540, now);
        osc.frequency.exponentialRampToValueAtTime(320, now + 0.05);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === 'win') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.setValueAtTime(587, now + 0.08);
        osc.frequency.setValueAtTime(880, now + 0.16);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
        osc.start(now);
        osc.stop(now + 0.28);
      } else if (type === 'loss') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(280, now);
        osc.frequency.exponentialRampToValueAtTime(110, now + 0.22);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
        osc.start(now);
        osc.stop(now + 0.22);
      } else if (type === 'match') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523, now);
        osc.frequency.setValueAtTime(659, now + 0.08);
        osc.frequency.setValueAtTime(783, now + 0.16);
        gain.gain.setValueAtTime(0.14, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === 'simon') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(400 + Math.random() * 250, now);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
      }
    } catch (_) {}
  }, [soundEnabled]);

  // ==========================================
  // 1. EXECUTIVE CHECKERS (vs CPU AI)
  // ==========================================
  // Board 8x8: 'r' = Player Red, 'R' = Player King, 'b' = CPU Black, 'B' = CPU King, null = Empty
  type CheckerPiece = 'r' | 'R' | 'b' | 'B' | null;
  const initialCheckersBoard = (): CheckerPiece[] => {
    const b: CheckerPiece[] = Array(64).fill(null);
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        if ((r + c) % 2 === 1) {
          if (r < 3) b[r * 8 + c] = 'b';
          else if (r > 4) b[r * 8 + c] = 'r';
        }
      }
    }
    return b;
  };

  const [checkersBoard, setCheckersBoard] = useState<CheckerPiece[]>(initialCheckersBoard);
  const [checkersSelected, setCheckersSelected] = useState<number | null>(null);
  const [checkersTurn, setCheckersTurn] = useState<'user' | 'cpu'>('user');
  const [checkersWinner, setCheckersWinner] = useState<string | null>(null);
  const [checkersScore, setCheckersScore] = useState({ user: 0, cpu: 0 });

  const getValidMoves = useCallback((board: CheckerPiece[], idx: number) => {
    const p = board[idx];
    if (!p) return [];
    const r = Math.floor(idx / 8);
    const c = idx % 8;
    const moves: { to: number; captured?: number }[] = [];

    const isUser = p === 'r' || p === 'R';
    const isKing = p === 'R' || p === 'B';

    // Directions
    const dirs: number[][] = [];
    if (isUser || isKing) dirs.push([-1, -1], [-1, 1]); // up
    if (!isUser || isKing) dirs.push([1, -1], [1, 1]); // down

    dirs.forEach(([dr, dc]) => {
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nr < 8 && nc >= 0 && nc < 8) {
        const destIdx = nr * 8 + nc;
        if (board[destIdx] === null) {
          moves.push({ to: destIdx });
        } else {
          // Check jump capture
          const isTargetUser = board[destIdx] === 'r' || board[destIdx] === 'R';
          if (isUser !== isTargetUser) {
            const jnr = nr + dr;
            const jnc = nc + dc;
            if (jnr >= 0 && jnr < 8 && jnc >= 0 && jnc < 8) {
              const jumpIdx = jnr * 8 + jnc;
              if (board[jumpIdx] === null) {
                moves.push({ to: jumpIdx, captured: destIdx });
              }
            }
          }
        }
      }
    });

    return moves;
  }, []);

  const handleCheckerClick = (idx: number) => {
    if (checkersTurn !== 'user' || checkersWinner) return;
    const p = checkersBoard[idx];

    // Select own piece
    if (p === 'r' || p === 'R') {
      playSound('click');
      setCheckersSelected(idx);
      return;
    }

    // Try moving selected piece
    if (checkersSelected !== null) {
      const moves = getValidMoves(checkersBoard, checkersSelected);
      const chosenMove = moves.find(m => m.to === idx);

      if (chosenMove) {
        playSound('click');
        const next = [...checkersBoard];
        let movedPiece = next[checkersSelected];

        // King promotion
        const targetRow = Math.floor(idx / 8);
        if (targetRow === 0 && movedPiece === 'r') movedPiece = 'R';

        next[idx] = movedPiece;
        next[checkersSelected] = null;
        if (chosenMove.captured !== undefined) {
          next[chosenMove.captured] = null;
          playSound('match');
        }

        setCheckersBoard(next);
        setCheckersSelected(null);

        // Check if CPU has pieces left
        const cpuRemaining = next.filter(x => x === 'b' || x === 'B').length;
        if (cpuRemaining === 0) {
          setCheckersWinner('user');
          setCheckersScore(s => ({ ...s, user: s.user + 1 }));
          playSound('win');
          return;
        }

        setCheckersTurn('cpu');
      }
    }
  };

  // CPU Turn Execution
  useEffect(() => {
    if (checkersTurn === 'cpu' && !checkersWinner) {
      const timer = setTimeout(() => {
        const cpuPieces = checkersBoard
          .map((p, idx) => ((p === 'b' || p === 'B') ? idx : null))
          .filter((v): v is number => v !== null);

        let allMoves: { from: number; to: number; captured?: number }[] = [];
        cpuPieces.forEach(from => {
          const valid = getValidMoves(checkersBoard, from);
          valid.forEach(m => allMoves.push({ from, ...m }));
        });

        if (allMoves.length === 0) {
          setCheckersWinner('user');
          setCheckersScore(s => ({ ...s, user: s.user + 1 }));
          playSound('win');
          return;
        }

        // Prioritize jump captures
        const captures = allMoves.filter(m => m.captured !== undefined);
        const selectedMove = captures.length > 0
          ? captures[Math.floor(Math.random() * captures.length)]
          : allMoves[Math.floor(Math.random() * allMoves.length)];

        const next = [...checkersBoard];
        let movedPiece = next[selectedMove.from];

        // King promotion for CPU
        const targetRow = Math.floor(selectedMove.to / 8);
        if (targetRow === 7 && movedPiece === 'b') movedPiece = 'B';

        next[selectedMove.to] = movedPiece;
        next[selectedMove.from] = null;
        if (selectedMove.captured !== undefined) {
          next[selectedMove.captured] = null;
        }

        setCheckersBoard(next);

        // Check if user has pieces left
        const userRemaining = next.filter(x => x === 'r' || x === 'R').length;
        if (userRemaining === 0) {
          setCheckersWinner('cpu');
          setCheckersScore(s => ({ ...s, cpu: s.cpu + 1 }));
          playSound('loss');
        } else {
          setCheckersTurn('user');
        }
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [checkersTurn, checkersWinner, checkersBoard, getValidMoves, playSound]);

  const resetCheckers = () => {
    setCheckersBoard(initialCheckersBoard());
    setCheckersSelected(null);
    setCheckersTurn('user');
    setCheckersWinner(null);
  };

  // ==========================================
  // 2. EXECUTIVE 9x9 SUDOKU
  // ==========================================
  const [sudokuPuzzleIdx, setSudokuPuzzleIdx] = useState(0);
  const [sudokuGrid, setSudokuGrid] = useState<number[][]>(() => {
    return SUDOKU_PUZZLES[0].initial.map(row => [...row]);
  });
  const [sudokuSelected, setSudokuSelected] = useState<[number, number] | null>(null);
  const [sudokuMistakes, setSudokuMistakes] = useState(0);
  const [sudokuSuccess, setSudokuSuccess] = useState(false);
  const [sudokuStatusMsg, setSudokuStatusMsg] = useState('Select an empty cell and enter a number 1-9');

  const handleSudokuCellClick = (r: number, c: number) => {
    setSudokuSelected([r, c]);
    playSound('click');
  };

  const handleSudokuNumberInput = (num: number) => {
    if (!sudokuSelected) return;
    const [r, c] = sudokuSelected;
    // Don't modify initial given clues
    if (SUDOKU_PUZZLES[sudokuPuzzleIdx].initial[r][c] !== 0) return;

    playSound('click');
    const next = sudokuGrid.map(row => [...row]);
    next[r][c] = num;
    setSudokuGrid(next);

    // Instant validation check against puzzle solution
    const sol = SUDOKU_PUZZLES[sudokuPuzzleIdx].solution;
    if (num !== 0 && num !== sol[r][c]) {
      setSudokuMistakes(m => m + 1);
      setSudokuStatusMsg('Conflicting number placed in this row, col, or box');
    } else {
      setSudokuStatusMsg('Number entered.');
    }

    // Check if entire puzzle is solved correctly
    const isCompleted = next.every((row, ri) => 
      row.every((val, ci) => val === sol[ri][ci])
    );
    if (isCompleted) {
      setSudokuSuccess(true);
      setSudokuStatusMsg('Congratulations! Executive Sudoku Solved!');
      playSound('win');
    }
  };

  const resetSudoku = (pIdx?: number) => {
    const idx = pIdx !== undefined ? pIdx : sudokuPuzzleIdx;
    setSudokuPuzzleIdx(idx);
    setSudokuGrid(SUDOKU_PUZZLES[idx].initial.map(row => [...row]));
    setSudokuSelected(null);
    setSudokuMistakes(0);
    setSudokuSuccess(false);
    setSudokuStatusMsg('Puzzle reset. Good luck!');
  };

  // ==========================================
  // 3. EXECUTIVE MEMORY MATCH (Caribbean BPO Icons)
  // ==========================================
  interface MemoryCard {
    id: number;
    symbol: string;
    isFlipped: boolean;
    isMatched: boolean;
  }

  const initMemoryCards = (): MemoryCard[] => {
    const doubled = [...MEMORY_SYMBOLS, ...MEMORY_SYMBOLS];
    // Fisher-Yates shuffle
    for (let i = doubled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [doubled[i], doubled[j]] = [doubled[j], doubled[i]];
    }
    return doubled.map((sym, id) => ({
      id,
      symbol: sym,
      isFlipped: false,
      isMatched: false
    }));
  };

  const [memoryCards, setMemoryCards] = useState<MemoryCard[]>(initMemoryCards);
  const [memoryFlipped, setMemoryFlipped] = useState<number[]>([]);
  const [memoryMoves, setMemoryMoves] = useState(0);
  const [memoryMatches, setMemoryMatches] = useState(0);
  const [memoryLock, setMemoryLock] = useState(false);

  const handleMemoryCardClick = (id: number) => {
    if (memoryLock) return;
    const card = memoryCards[id];
    if (card.isFlipped || card.isMatched) return;

    playSound('click');
    const updated = [...memoryCards];
    updated[id].isFlipped = true;
    setMemoryCards(updated);

    const nextFlipped = [...memoryFlipped, id];
    setMemoryFlipped(nextFlipped);

    if (nextFlipped.length === 2) {
      setMemoryMoves(m => m + 1);
      setMemoryLock(true);

      const [firstIdx, secondIdx] = nextFlipped;
      if (updated[firstIdx].symbol === updated[secondIdx].symbol) {
        // Matched
        setTimeout(() => {
          playSound('match');
          const matched = [...memoryCards];
          matched[firstIdx].isMatched = true;
          matched[secondIdx].isMatched = true;
          setMemoryCards(matched);
          setMemoryFlipped([]);
          setMemoryLock(false);
          const newMatches = memoryMatches + 1;
          setMemoryMatches(newMatches);
          if (newMatches === MEMORY_SYMBOLS.length) {
            playSound('win');
          }
        }, 300);
      } else {
        // Not matched
        setTimeout(() => {
          const reset = [...memoryCards];
          reset[firstIdx].isFlipped = false;
          reset[secondIdx].isFlipped = false;
          setMemoryCards(reset);
          setMemoryFlipped([]);
          setMemoryLock(false);
        }, 700);
      }
    }
  };

  const resetMemoryGame = () => {
    setMemoryCards(initMemoryCards());
    setMemoryFlipped([]);
    setMemoryMoves(0);
    setMemoryMatches(0);
    setMemoryLock(false);
  };

  // ==========================================
  // 4. TIC TAC TOE (Provided Logic)
  // ==========================================
  const [tttBoard, setTttBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [tttIsXNext, setTttIsXNext] = useState(true);
  const [tttWinner, setTttWinner] = useState<string | null>(null);
  const [tttScore, setTttScore] = useState({ user: 0, cpu: 0, ties: 0 });

  const tttLines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  const checkTTTWinner = (sq: (string | null)[]) => {
    for (const [a, b, c] of tttLines) {
      if (sq[a] && sq[a] === sq[b] && sq[a] === sq[c]) return sq[a];
    }
    if (sq.every((cell) => cell !== null)) return 'TIE';
    return null;
  };

  const handleTTTClick = (i: number) => {
    if (tttBoard[i] || tttWinner || !tttIsXNext) return;
    playSound('click');
    const newBoard = [...tttBoard];
    newBoard[i] = 'X';
    setTttBoard(newBoard);
    setTttIsXNext(false);
    const w = checkTTTWinner(newBoard);
    if (w) {
      setTttWinner(w);
      if (w === 'X') {
        playSound('win');
        setTttScore(s => ({ ...s, user: s.user + 1 }));
      } else if (w === 'TIE') {
        setTttScore(s => ({ ...s, ties: s.ties + 1 }));
      }
    }
  };

  useEffect(() => {
    if (!tttIsXNext && !tttWinner) {
      const timer = setTimeout(() => {
        const avail = tttBoard.map((v, idx) => v === null ? idx : null).filter((v): v is number => v !== null);
        if (avail.length > 0) {
          let move = avail[Math.floor(Math.random() * avail.length)];
          const nextBoard = [...tttBoard];
          nextBoard[move] = 'O';
          setTttBoard(nextBoard);
          setTttIsXNext(true);
          const w = checkTTTWinner(nextBoard);
          if (w) {
            setTttWinner(w);
            if (w === 'O') {
              playSound('loss');
              setTttScore(s => ({ ...s, cpu: s.cpu + 1 }));
            } else if (w === 'TIE') {
              setTttScore(s => ({ ...s, ties: s.ties + 1 }));
            }
          }
        }
      }, 450);
      return () => clearTimeout(timer);
    }
  }, [tttIsXNext, tttWinner, tttBoard, playSound]);

  // ==========================================
  // 5. ROCK PAPER SCISSORS (Provided Logic)
  // ==========================================
  const [rpsScore, setRpsScore] = useState({ user: 0, cpu: 0, ties: 0 });
  const [rpsResult, setRpsResult] = useState<string | null>(null);
  const [lastUserChoice, setLastUserChoice] = useState<string | null>(null);
  const [lastCpuChoice, setLastCpuChoice] = useState<string | null>(null);
  const rpsOptions = ['ROCK', 'PAPER', 'SCISSORS'] as const;

  const playRPS = (choice: 'ROCK' | 'PAPER' | 'SCISSORS') => {
    playSound('click');
    const cpu = rpsOptions[Math.floor(Math.random() * rpsOptions.length)];
    setLastUserChoice(choice);
    setLastCpuChoice(cpu);

    if (choice === cpu) {
      setRpsResult("IT'S A TIE!");
      setRpsScore(s => ({ ...s, ties: s.ties + 1 }));
    } else if (
      (choice === 'ROCK' && cpu === 'SCISSORS') || 
      (choice === 'PAPER' && cpu === 'ROCK') || 
      (choice === 'SCISSORS' && cpu === 'PAPER')
    ) {
      setRpsResult('YOU WIN!');
      playSound('win');
      setRpsScore(s => ({ ...s, user: s.user + 1 }));
    } else {
      setRpsResult('CPU WINS!');
      playSound('loss');
      setRpsScore(s => ({ ...s, cpu: s.cpu + 1 }));
    }
  };

  // ==========================================
  // 5B. CONNECT FOUR (7 cols x 6 rows vs CPU AI)
  // ==========================================
  type C4Piece = 'R' | 'Y' | null; // R = User (Red), Y = CPU (Yellow)
  const [c4Board, setC4Board] = useState<C4Piece[]>(Array(42).fill(null));
  const [c4Turn, setC4Turn] = useState<'user' | 'cpu'>('user');
  const [c4Winner, setC4Winner] = useState<string | null>(null);
  const [c4Score, setC4Score] = useState({ user: 0, cpu: 0, ties: 0 });

  const checkC4Winner = (b: C4Piece[]): C4Piece => {
    // Horizontal
    for (let r = 0; r < 6; r++) {
      for (let c = 0; c < 4; c++) {
        const i = r * 7 + c;
        if (b[i] && b[i] === b[i + 1] && b[i] === b[i + 2] && b[i] === b[i + 3]) return b[i];
      }
    }
    // Vertical
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 7; c++) {
        const i = r * 7 + c;
        if (b[i] && b[i] === b[i + 7] && b[i] === b[i + 14] && b[i] === b[i + 21]) return b[i];
      }
    }
    // Diagonal down-right
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 4; c++) {
        const i = r * 7 + c;
        if (b[i] && b[i] === b[i + 8] && b[i] === b[i + 16] && b[i] === b[i + 24]) return b[i];
      }
    }
    // Diagonal down-left
    for (let r = 0; r < 3; r++) {
      for (let c = 3; c < 7; c++) {
        const i = r * 7 + c;
        if (b[i] && b[i] === b[i + 6] && b[i] === b[i + 12] && b[i] === b[i + 18]) return b[i];
      }
    }
    return null;
  };

  const dropPieceInCol = (b: C4Piece[], col: number, piece: C4Piece): { newBoard: C4Piece[]; row: number } | null => {
    for (let r = 5; r >= 0; r--) {
      const idx = r * 7 + col;
      if (b[idx] === null) {
        const next = [...b];
        next[idx] = piece;
        return { newBoard: next, row: r };
      }
    }
    return null;
  };

  const handleC4ColClick = (col: number) => {
    if (c4Turn !== 'user' || c4Winner) return;
    const res = dropPieceInCol(c4Board, col, 'R');
    if (!res) return;
    playSound('click');
    setC4Board(res.newBoard);

    const w = checkC4Winner(res.newBoard);
    if (w === 'R') {
      setC4Winner('YOU WIN!');
      setC4Score(s => ({ ...s, user: s.user + 1 }));
      playSound('win');
      return;
    }
    if (res.newBoard.every(x => x !== null)) {
      setC4Winner("IT'S A TIE!");
      setC4Score(s => ({ ...s, ties: s.ties + 1 }));
      return;
    }

    setC4Turn('cpu');
  };

  useEffect(() => {
    if (c4Turn === 'cpu' && !c4Winner) {
      const timer = setTimeout(() => {
        let chosenCol: number | null = null;
        for (let col = 0; col < 7; col++) {
          const test = dropPieceInCol(c4Board, col, 'Y');
          if (test && checkC4Winner(test.newBoard) === 'Y') {
            chosenCol = col;
            break;
          }
        }
        if (chosenCol === null) {
          for (let col = 0; col < 7; col++) {
            const test = dropPieceInCol(c4Board, col, 'R');
            if (test && checkC4Winner(test.newBoard) === 'R') {
              chosenCol = col;
              break;
            }
          }
        }
        if (chosenCol === null) {
          const pref = [3, 2, 4, 1, 5, 0, 6];
          const valid = pref.filter(c => c4Board[c] === null);
          if (valid.length > 0) {
            chosenCol = valid[0];
          }
        }

        if (chosenCol !== null) {
          const res = dropPieceInCol(c4Board, chosenCol, 'Y');
          if (res) {
            setC4Board(res.newBoard);
            playSound('click');
            const w = checkC4Winner(res.newBoard);
            if (w === 'Y') {
              setC4Winner('CPU WINS!');
              setC4Score(s => ({ ...s, cpu: s.cpu + 1 }));
              playSound('loss');
            } else if (res.newBoard.every(x => x !== null)) {
              setC4Winner("IT'S A TIE!");
              setC4Score(s => ({ ...s, ties: s.ties + 1 }));
            } else {
              setC4Turn('user');
            }
          }
        }
      }, 480);
      return () => clearTimeout(timer);
    }
  }, [c4Turn, c4Winner, c4Board, playSound]);

  const resetC4Game = () => {
    setC4Board(Array(42).fill(null));
    setC4Turn('user');
    setC4Winner(null);
  };

  // ==========================================
  // 5C. EXECUTIVE WORD DECRYPTOR (Business Wordle)
  // ==========================================
  const WORDLE_WORDS = [
    'SCALE', 'FOCUS', 'CLOUD', 'SMART', 'VALUE', 
    'CYBER', 'TEAMS', 'AUDIT', 'LEADS', 'SOLVE', 
    'TRUST', 'BRAND', 'PULSE', 'AGILE', 'POWER'
  ];
  const [wordleTarget, setWordleTarget] = useState<string>(WORDLE_WORDS[0]);
  const [wordleGuesses, setWordleGuesses] = useState<string[]>([]);
  const [wordleCurrent, setWordleCurrent] = useState<string>('');
  const [wordleStatus, setWordleStatus] = useState<'IN_PROGRESS' | 'WON' | 'LOST'>('IN_PROGRESS');
  const [wordleScore, setWordleScore] = useState<number>(0);

  const resetWordle = () => {
    const nextWord = WORDLE_WORDS[Math.floor(Math.random() * WORDLE_WORDS.length)];
    setWordleTarget(nextWord);
    setWordleGuesses([]);
    setWordleCurrent('');
    setWordleStatus('IN_PROGRESS');
  };

  const handleWordleKey = (key: string) => {
    if (wordleStatus !== 'IN_PROGRESS') return;
    if (key === 'ENTER') {
      if (wordleCurrent.length === 5) {
        playSound('click');
        const nextGuesses = [...wordleGuesses, wordleCurrent];
        setWordleGuesses(nextGuesses);
        if (wordleCurrent === wordleTarget) {
          setWordleStatus('WON');
          setWordleScore(s => s + 25);
          playSound('win');
        } else if (nextGuesses.length >= 6) {
          setWordleStatus('LOST');
          playSound('loss');
        }
        setWordleCurrent('');
      }
    } else if (key === 'BACKSPACE' || key === 'DEL') {
      setWordleCurrent(c => c.slice(0, -1));
    } else if (/^[A-Z]$/.test(key) && wordleCurrent.length < 5) {
      playSound('click');
      setWordleCurrent(c => c + key);
    }
  };

  // ==========================================
  // 6. VIP SIMON BRAIN GAME (Provided Logic)
  // ==========================================
  const [simonSeq, setSimonSeq] = useState<number[]>([]);
  const [simonUserSeq, setSimonUserSeq] = useState<number[]>([]);
  const [simonActive, setSimonActive] = useState<number | null>(null);
  const [simonMsg, setSimonMsg] = useState('Press Start to begin!');
  const [simonScore, setSimonScore] = useState(0);

  const startSimon = () => {
    const first = Math.floor(Math.random() * 4);
    setSimonSeq([first]);
    setSimonUserSeq([]);
    setSimonScore(0);
    setSimonMsg('Watch pattern carefully...');
    playSeq([first]);
  };

  const playSeq = (seq: number[]) => {
    seq.forEach((val, idx) => {
      setTimeout(() => {
        setSimonActive(val);
        playSound('simon');
        setTimeout(() => setSimonActive(null), 300);
      }, (idx + 1) * 600);
    });
    setTimeout(() => {
      setSimonMsg('Your turn! Repeat the pattern.');
    }, (seq.length + 1) * 600);
  };

  const handleSimonClick = (id: number) => {
    if (simonSeq.length === 0) return;
    setSimonActive(id);
    playSound('simon');
    setTimeout(() => setSimonActive(null), 250);
    const nextUser = [...simonUserSeq, id];
    setSimonUserSeq(nextUser);
    const currIdx = nextUser.length - 1;
    if (nextUser[currIdx] !== simonSeq[currIdx]) {
      playSound('loss');
      setSimonMsg('Game Over! Pattern broke.');
      setSimonSeq([]);
      return;
    }
    if (nextUser.length === simonSeq.length) {
      playSound('win');
      setSimonScore(s => s + 10);
      setSimonMsg('Correct! Level up...');
      setTimeout(() => {
        const next = [...simonSeq, Math.floor(Math.random() * 4)];
        setSimonSeq(next);
        setSimonUserSeq([]);
        playSeq(next);
      }, 1000);
    }
  };

  return (
    <div className={`w-full bg-[#081226] text-slate-100 p-2 sm:p-4 font-sans select-none ${className}`}>
      
      {/* Top Suite Switcher */}
      {!hideHeaderSwitcher && (
        <div className="max-w-4xl mx-auto flex flex-wrap justify-between items-center gap-3 p-3 sm:p-4 bg-[#0d1c3a]/70 rounded-2xl shadow-md mb-6">
          <div className="flex items-center gap-2">
            <Gamepad2 className="w-5 h-5 text-cyan-400" />
            <h2 className="text-sm sm:text-base font-black tracking-wider uppercase font-raleway text-white">
              Arcade & VIP Games
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <div className="inline-flex p-1 bg-[#12244a] rounded-xl text-xs font-semibold">
              <button
                onClick={() => setActiveTab('arcade')}
                className={`px-3.5 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                  activeTab === 'arcade' ? 'bg-[#0066ff] text-white shadow-sm font-bold' : 'text-blue-200 hover:text-white'
                }`}
              >
                <Gamepad2 className="w-3.5 h-3.5" />
                <span>Arcade Room</span>
              </button>
              <button
                onClick={() => setActiveTab('vip')}
                className={`px-3.5 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                  activeTab === 'vip' ? 'bg-[#0066ff] text-white shadow-sm font-bold' : 'text-blue-200 hover:text-white'
                }`}
              >
                <Brain className="w-3.5 h-3.5" />
                <span>VIP Mind Games</span>
              </button>
              <button
                onClick={() => setActiveTab('jarvis')}
                className={`px-3.5 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                  activeTab === 'jarvis' ? 'bg-[#0066ff] text-white shadow-sm font-bold' : 'text-blue-200 hover:text-white'
                }`}
              >
                <Bot className="w-3.5 h-3.5 text-emerald-400" />
                <span>Jarvis-27 AI</span>
              </button>
            </div>

            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 rounded-xl bg-[#12244a] text-blue-200 hover:text-white transition"
              title={soundEnabled ? 'Mute Game Sounds' : 'Unmute Game Sounds'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-300" /> : <VolumeX className="w-4 h-4 text-rose-300" />}
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 1: ARCADE ROOM (Checkers + Tic-Tac-Toe + Rock Paper Scissors) */}
      {/* ========================================================================= */}
      {activeTab === 'arcade' && (
        <div className="space-y-6 max-w-4xl mx-auto">
          {/* Sub-Game Picker */}
          <div className="flex items-center justify-between flex-wrap gap-2 px-1">
            <div className="inline-flex p-1 bg-[#0f2146] rounded-xl text-xs font-semibold flex-wrap">
              <button
                onClick={() => setActiveArcadeGame('breaker')}
                className={`px-3.5 py-1.5 rounded-lg transition ${
                  activeArcadeGame === 'breaker' ? 'bg-[#0066ff] text-white shadow-sm font-bold' : 'text-blue-200 hover:text-white'
                }`}
              >
                Vault Breaker
              </button>
              <button
                onClick={() => setActiveArcadeGame('checkers')}
                className={`px-3.5 py-1.5 rounded-lg transition ${
                  activeArcadeGame === 'checkers' ? 'bg-[#0066ff] text-white shadow-sm font-bold' : 'text-blue-200 hover:text-white'
                }`}
              >
                Checkers
              </button>
              <button
                onClick={() => setActiveArcadeGame('connect4')}
                className={`px-3.5 py-1.5 rounded-lg transition ${
                  activeArcadeGame === 'connect4' ? 'bg-[#0066ff] text-white shadow-sm font-bold' : 'text-blue-200 hover:text-white'
                }`}
              >
                Connect 4
              </button>
              <button
                onClick={() => setActiveArcadeGame('tictactoe')}
                className={`px-3.5 py-1.5 rounded-lg transition ${
                  activeArcadeGame === 'tictactoe' ? 'bg-[#0066ff] text-white shadow-sm font-bold' : 'text-blue-200 hover:text-white'
                }`}
              >
                Tic-Tac-Toe
              </button>
              <button
                onClick={() => setActiveArcadeGame('rps')}
                className={`px-3.5 py-1.5 rounded-lg transition ${
                  activeArcadeGame === 'rps' ? 'bg-[#0066ff] text-white shadow-sm font-bold' : 'text-blue-200 hover:text-white'
                }`}
              >
                Rock Paper Scissors
              </button>
            </div>

            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-1.5 rounded-lg bg-[#0f2146] text-blue-200 hover:text-white text-xs flex items-center gap-1.5"
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-cyan-300" /> : <VolumeX className="w-3.5 h-3.5 text-rose-300" />}
              <span className="hidden sm:inline">{soundEnabled ? 'Audio On' : 'Muted'}</span>
            </button>
          </div>

          {/* 1A: RETRO CYBER VAULT BREAKER (From arcade_room.py) */}
          {activeArcadeGame === 'breaker' && (
            <div className="bg-[#0e2148]/60 backdrop-blur-md rounded-3xl p-2 sm:p-6 shadow-xl">
              <VaultRoomArcade memberId="arcade" memberName="Contax360" />
            </div>
          )}

          {/* 1B: EXECUTIVE CHECKERS */}
          {activeArcadeGame === 'checkers' && (
            <div className="bg-[#0e2148]/60 backdrop-blur-md rounded-3xl p-4 sm:p-6 shadow-xl flex flex-col items-center">
              <div className="text-center mb-4 space-y-1">
                <h3 className="text-lg sm:text-xl font-black font-raleway text-white uppercase tracking-wider">
                  Executive Checkers vs System AI
                </h3>
                <div className="flex items-center justify-center gap-4 text-xs font-mono font-bold text-blue-200">
                  <span className="text-rose-400">YOU (Red): {checkersScore.user}</span>
                  <span>•</span>
                  <span className="text-cyan-300">CPU (Cyan): {checkersScore.cpu}</span>
                </div>
              </div>

              {/* 8x8 Board */}
              <div className="grid grid-cols-8 gap-1 p-2 sm:p-3 rounded-2xl bg-[#07132a] shadow-inner max-w-[380px] sm:max-w-[420px] w-full aspect-square">
                {checkersBoard.map((p, idx) => {
                  const r = Math.floor(idx / 8);
                  const c = idx % 8;
                  const isDark = (r + c) % 2 === 1;
                  const isSelected = checkersSelected === idx;
                  const validMoves = checkersSelected !== null ? getValidMoves(checkersBoard, checkersSelected) : [];
                  const isValidTarget = validMoves.some(m => m.to === idx);

                  return (
                    <button
                      key={idx}
                      onClick={() => handleCheckerClick(idx)}
                      disabled={!isDark || (checkersTurn !== 'user')}
                      className={`relative aspect-square rounded-lg flex items-center justify-center transition ${
                        isDark ? 'bg-[#0f234f]' : 'bg-[#18346e]/40'
                      } ${isValidTarget ? 'ring-2 ring-emerald-400 bg-[#143a5e]' : ''}`}
                    >
                      {p && (
                        <div
                          className={`w-[80%] h-[80%] rounded-full shadow-md flex items-center justify-center font-bold text-xs sm:text-sm select-none transition-transform ${
                            p === 'r' || p === 'R'
                              ? 'bg-gradient-to-br from-rose-500 to-rose-700 text-white'
                              : 'bg-gradient-to-br from-cyan-400 to-cyan-600 text-slate-950'
                          } ${isSelected ? 'ring-4 ring-white scale-110' : ''}`}
                        >
                          {(p === 'R' || p === 'B') && <Crown className="w-3.5 h-3.5" />}
                        </div>
                      )}
                      {isValidTarget && !p && (
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Status & Reset */}
              <div className="mt-4 text-center space-y-2">
                <div className="text-sm font-bold min-h-[22px]">
                  {checkersWinner ? (
                    <span className={checkersWinner === 'user' ? 'text-emerald-400' : 'text-rose-400'}>
                      {checkersWinner === 'user' ? 'YOU WIN! Checkers Master!' : 'CPU WINS! Better luck next game.'}
                    </span>
                  ) : (
                    <span className="text-xs text-blue-200">
                      {checkersTurn === 'user' ? 'Your turn (Red) • Tap piece then target' : 'CPU calculating move (Cyan)...'}
                    </span>
                  )}
                </div>

                <button
                  onClick={resetCheckers}
                  className="px-5 py-2 rounded-full bg-[#0066ff] hover:bg-blue-600 text-white text-xs font-bold uppercase tracking-wider shadow-md transition active:scale-95 flex items-center gap-1.5 mx-auto"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Board</span>
                </button>
              </div>
            </div>
          )}

          {/* 1B: CONNECT FOUR (7 cols x 6 rows vs CPU AI) */}
          {activeArcadeGame === 'connect4' && (
            <div className="bg-[#0e2148]/60 backdrop-blur-md rounded-3xl p-4 sm:p-6 shadow-xl flex flex-col items-center max-w-lg mx-auto">
              <div className="text-center mb-3 space-y-1">
                <h3 className="text-lg sm:text-xl font-black font-raleway text-white uppercase tracking-wider">
                  Connect Four vs System AI
                </h3>
                <p className="text-xs text-blue-200/90">
                  Tap column arrow to drop chip. Connect 4 in any direction to win!
                </p>
                <div className="flex items-center justify-center gap-4 text-xs font-mono font-bold text-blue-200 pt-1">
                  <span className="text-rose-400">YOU (Red): {c4Score.user}</span>
                  <span>•</span>
                  <span className="text-yellow-300">CPU (Yellow): {c4Score.cpu}</span>
                  <span>•</span>
                  <span className="text-slate-400">Ties: {c4Score.ties}</span>
                </div>
              </div>

              {/* Status Message */}
              <div className="mb-3 text-sm font-bold min-h-[24px]">
                {c4Winner ? (
                  <span className={c4Winner.includes('WIN') ? 'text-emerald-400' : c4Winner.includes('TIE') ? 'text-amber-300' : 'text-rose-400'}>
                    {c4Winner}
                  </span>
                ) : (
                  <span className={c4Turn === 'user' ? 'text-cyan-300' : 'text-yellow-300 animate-pulse'}>
                    {c4Turn === 'user' ? 'Your Turn (Red)' : 'CPU Thinking (Yellow)...'}
                  </span>
                )}
              </div>

              {/* 7x6 Connect 4 Grid */}
              <div className="p-3 sm:p-4 rounded-2xl bg-[#004fc7]/80 shadow-2xl max-w-[360px] sm:max-w-[400px] w-full">
                {/* Column Drop Buttons Header */}
                <div className="grid grid-cols-7 gap-1.5 mb-2">
                  {Array(7).fill(0).map((_, col) => (
                    <button
                      key={col}
                      onClick={() => handleC4ColClick(col)}
                      disabled={c4Turn !== 'user' || !!c4Winner || c4Board[col] !== null}
                      className="py-1 rounded-lg bg-blue-950/80 hover:bg-cyan-300 hover:text-black text-cyan-300 text-xs font-black transition disabled:opacity-30 disabled:pointer-events-none"
                      title={`Drop in Column ${col + 1}`}
                    >
                      ↓
                    </button>
                  ))}
                </div>

                {/* 6 rows x 7 cols Slots */}
                <div className="grid grid-cols-7 gap-1.5 sm:gap-2 bg-[#06163a] p-2 sm:p-3 rounded-xl shadow-inner">
                  {Array(42).fill(0).map((_, idx) => {
                    const piece = c4Board[idx];
                    const col = idx % 7;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleC4ColClick(col)}
                        disabled={c4Turn !== 'user' || !!c4Winner}
                        className="aspect-square rounded-full transition-all duration-300 flex items-center justify-center shadow-inner relative overflow-hidden"
                      >
                        <div
                          className={`w-full h-full rounded-full transition-all duration-300 ${
                            piece === 'R'
                              ? 'bg-rose-500 shadow-[0_0_12px_#f43f5e] border-2 border-rose-300 scale-95'
                              : piece === 'Y'
                              ? 'bg-amber-400 shadow-[0_0_12px_#fbbf24] border-2 border-amber-200 scale-95'
                              : 'bg-[#091530] border border-blue-950/80 hover:bg-[#0f2148]'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Reset Game */}
              <div className="mt-4">
                <button
                  onClick={resetC4Game}
                  className="px-5 py-2 rounded-full bg-[#0066ff] hover:bg-blue-600 text-white text-xs font-bold uppercase tracking-wider shadow-md transition active:scale-95 flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restart Match</span>
                </button>
              </div>
            </div>
          )}

          {/* 1C: TIC-TAC-TOE */}
          {activeArcadeGame === 'tictactoe' && (
            <div className="bg-[#0e2148]/60 backdrop-blur-md rounded-3xl p-6 shadow-xl max-w-md mx-auto flex flex-col items-center">
              <h3 className="text-lg font-black font-raleway text-cyan-300 uppercase tracking-wider mb-1">
                TIC-TAC-TOE VS CPU
              </h3>
              <p className="text-xs text-blue-200/80 mb-3">You (X) vs System AI (O)</p>
              
              <div className="flex items-center justify-center gap-4 text-xs font-mono font-bold text-blue-200 mb-4 bg-[#102450]/80 py-1.5 px-4 rounded-full">
                <span className="text-cyan-300">YOU: {tttScore.user}</span>
                <span>•</span>
                <span className="text-rose-300">CPU: {tttScore.cpu}</span>
                <span>•</span>
                <span className="text-slate-300">TIE: {tttScore.ties}</span>
              </div>

              <div className="grid grid-cols-3 gap-2.5 p-3 rounded-2xl bg-[#091530] shadow-inner mb-4 max-w-[240px] w-full">
                {tttBoard.map((c, i) => (
                  <button
                    key={i}
                    onClick={() => handleTTTClick(i)}
                    disabled={!!c || !!tttWinner || !tttIsXNext}
                    className={`w-16 h-16 text-3xl font-black rounded-xl transition duration-150 flex items-center justify-center shadow-sm ${
                      c === 'X' ? 'bg-[#0066ff] text-white' : c === 'O' ? 'bg-rose-600 text-white' : 'bg-[#12254e] hover:bg-[#1a336b]'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>

              <div className="text-center space-y-2">
                <div className="text-sm font-bold min-h-[24px]">
                  {tttWinner ? (
                    <span className={tttWinner === 'X' ? 'text-emerald-400' : tttWinner === 'O' ? 'text-rose-400' : 'text-amber-300'}>
                      {tttWinner === 'X' ? 'YOU WIN!' : tttWinner === 'O' ? 'CPU WINS!' : "IT'S A DRAW!"}
                    </span>
                  ) : (
                    <span className="text-xs text-blue-200">
                      {tttIsXNext ? 'Your turn (X)' : 'CPU thinking (O)...'}
                    </span>
                  )}
                </div>

                <button 
                  onClick={() => { setTttBoard(Array(9).fill(null)); setTttWinner(null); setTttIsXNext(true); }}
                  className="px-5 py-2 bg-[#0066ff] hover:bg-blue-600 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-md transition active:scale-95 flex items-center gap-1.5 mx-auto"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Play Again</span>
                </button>
              </div>
            </div>
          )}

          {/* 1C: ROCK PAPER SCISSORS */}
          {activeArcadeGame === 'rps' && (
            <div className="bg-[#0e2148]/60 backdrop-blur-md rounded-3xl p-6 shadow-xl max-w-md mx-auto flex flex-col items-center">
              <h3 className="text-lg font-black font-raleway text-cyan-300 uppercase tracking-wider mb-1">
                ROCK PAPER SCISSORS
              </h3>
              <p className="text-xs text-blue-200/80 mb-3">Quick Battle vs System AI</p>

              <div className="flex items-center justify-center gap-4 text-xs font-mono font-bold text-blue-200 mb-4 bg-[#102450]/80 py-1.5 px-4 rounded-full">
                <span className="text-cyan-300">YOU: {rpsScore.user}</span>
                <span>•</span>
                <span className="text-rose-300">CPU: {rpsScore.cpu}</span>
                <span>•</span>
                <span className="text-slate-300">TIE: {rpsScore.ties}</span>
              </div>

              <div className="my-4 p-5 rounded-2xl bg-[#091530] w-full max-w-xs flex items-center justify-around shadow-inner">
                <div className="text-center flex flex-col items-center justify-center min-w-[70px]">
                  <div className="h-10 flex items-center justify-center">
                    {lastUserChoice ? (
                      <span className="text-xs font-black text-cyan-300 font-mono tracking-wider px-2.5 py-1 rounded-lg bg-cyan-950/80 border border-cyan-500/40">
                        {lastUserChoice}
                      </span>
                    ) : (
                      <span className="text-xs text-slate-500 font-mono">READY</span>
                    )}
                  </div>
                  <span className="text-[11px] font-mono text-blue-300 uppercase mt-1">You</span>
                </div>
                <span className="text-lg font-black text-cyan-400 font-mono">VS</span>
                <div className="text-center flex flex-col items-center justify-center min-w-[70px]">
                  <div className="h-10 flex items-center justify-center">
                    {lastCpuChoice ? (
                      <span className="text-xs font-black text-rose-300 font-mono tracking-wider px-2.5 py-1 rounded-lg bg-rose-950/80 border border-rose-500/40">
                        {lastCpuChoice}
                      </span>
                    ) : (
                      <span className="text-xs text-slate-500 font-mono">READY</span>
                    )}
                  </div>
                  <span className="text-[11px] font-mono text-rose-300 uppercase mt-1">CPU</span>
                </div>
              </div>

              <div className="text-base font-black min-h-[30px] flex items-center justify-center mb-2">
                {rpsResult ? (
                  <span className={rpsResult.includes('WIN') ? 'text-emerald-400' : rpsResult.includes('TIE') ? 'text-amber-300' : 'text-rose-400'}>
                    {rpsResult}
                  </span>
                ) : (
                  <span className="text-xs text-blue-300/80">Choose your move:</span>
                )}
              </div>

              <div className="flex gap-3">
                {rpsOptions.map(opt => (
                  <button 
                    key={opt} 
                    onClick={() => playRPS(opt)}
                    className="w-24 py-3 bg-[#12254e] hover:bg-[#0066ff] text-white rounded-2xl shadow-md hover:scale-105 active:scale-95 transition flex flex-col items-center justify-center gap-1.5 border border-white/10 group cursor-pointer"
                  >
                    {opt === 'ROCK' && <Circle className="w-5 h-5 text-cyan-300 group-hover:text-white" />}
                    {opt === 'PAPER' && <FileText className="w-5 h-5 text-amber-300 group-hover:text-white" />}
                    {opt === 'SCISSORS' && <Scissors className="w-5 h-5 text-emerald-300 group-hover:text-white" />}
                    <span className="text-[10px] font-bold font-mono tracking-wider">{opt}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: VIP MIND GAMES (Sudoku + Memory Match + Simon Color Sequence) */}
      {/* ========================================================================= */}
      {activeTab === 'vip' && (
        <div className="space-y-6 max-w-4xl mx-auto">
          {/* Sub-Game Picker */}
          <div className="flex items-center justify-between flex-wrap gap-2 px-1">
            <div className="inline-flex p-1 bg-[#0f2146] rounded-xl text-xs font-semibold">
              <button
                onClick={() => setActiveVipGame('sudoku')}
                className={`px-3.5 py-1.5 rounded-lg transition ${
                  activeVipGame === 'sudoku' ? 'bg-[#0066ff] text-white shadow-sm font-bold' : 'text-blue-200 hover:text-white'
                }`}
              >
                Sudoku
              </button>
              <button
                onClick={() => setActiveVipGame('wordle')}
                className={`px-3.5 py-1.5 rounded-lg transition ${
                  activeVipGame === 'wordle' ? 'bg-[#0066ff] text-white shadow-sm font-bold' : 'text-blue-200 hover:text-white'
                }`}
              >
                Word Decryptor
              </button>
              <button
                onClick={() => setActiveVipGame('memory')}
                className={`px-3.5 py-1.5 rounded-lg transition ${
                  activeVipGame === 'memory' ? 'bg-[#0066ff] text-white shadow-sm font-bold' : 'text-blue-200 hover:text-white'
                }`}
              >
                Memory Match
              </button>
              <button
                onClick={() => setActiveVipGame('simon')}
                className={`px-3.5 py-1.5 rounded-lg transition ${
                  activeVipGame === 'simon' ? 'bg-[#0066ff] text-white shadow-sm font-bold' : 'text-blue-200 hover:text-white'
                }`}
              >
                Simon Sequence
              </button>
            </div>

            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-1.5 rounded-lg bg-[#0f2146] text-blue-200 hover:text-white text-xs flex items-center gap-1.5"
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-cyan-300" /> : <VolumeX className="w-3.5 h-3.5 text-rose-300" />}
              <span className="hidden sm:inline">{soundEnabled ? 'Audio On' : 'Muted'}</span>
            </button>
          </div>

          {/* 2A: EXECUTIVE 9x9 SUDOKU */}
          {activeVipGame === 'sudoku' && (
            <div className="bg-[#0e2148]/60 backdrop-blur-md rounded-3xl p-4 sm:p-6 shadow-xl flex flex-col items-center">
              <div className="text-center mb-3 space-y-1">
                <div className="flex items-center justify-center gap-2">
                  <h3 className="text-lg sm:text-xl font-black font-raleway text-amber-300 uppercase tracking-wider">
                    Executive Sudoku
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/20 text-cyan-300">
                    {SUDOKU_PUZZLES[sudokuPuzzleIdx].name}
                  </span>
                </div>
                <div className="flex items-center justify-center gap-4 text-xs font-mono text-blue-200">
                  <span>Mistakes: {sudokuMistakes}</span>
                  <span>•</span>
                  <span className="text-cyan-300">{sudokuStatusMsg}</span>
                </div>
              </div>

              {/* 9x9 Sudoku Grid */}
              <div className="grid grid-cols-9 gap-0.5 sm:gap-1 p-2 rounded-2xl bg-[#060e20] shadow-inner max-w-[360px] sm:max-w-[420px] w-full aspect-square mb-4">
                {sudokuGrid.map((row, ri) =>
                  row.map((val, ci) => {
                    const isInitial = SUDOKU_PUZZLES[sudokuPuzzleIdx].initial[ri][ci] !== 0;
                    const isSelected = sudokuSelected?.[0] === ri && sudokuSelected?.[1] === ci;
                    const isSameRowOrCol = sudokuSelected && (sudokuSelected[0] === ri || sudokuSelected[1] === ci);
                    const isBlockBorderR = (ci + 1) % 3 === 0 && ci < 8;
                    const isBlockBorderB = (ri + 1) % 3 === 0 && ri < 8;

                    return (
                      <button
                        key={`${ri}-${ci}`}
                        onClick={() => handleSudokuCellClick(ri, ci)}
                        className={`aspect-square flex items-center justify-center text-xs sm:text-base font-bold transition rounded-sm ${
                          isSelected 
                            ? 'bg-[#0066ff] text-white ring-2 ring-cyan-300' 
                            : isSameRowOrCol 
                            ? 'bg-[#102450]/70' 
                            : 'bg-[#0d1c3e]'
                        } ${isInitial ? 'text-cyan-300 font-extrabold' : 'text-white'} ${
                          isBlockBorderR ? 'border-r-2 border-blue-400/40' : ''
                        } ${isBlockBorderB ? 'border-b-2 border-blue-400/40' : ''}`}
                      >
                        {val !== 0 ? val : ''}
                      </button>
                    );
                  })
                )}
              </div>

              {/* Number Input Keypad 1-9 & Erase */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-4 max-w-sm">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <button
                    key={num}
                    onClick={() => handleSudokuNumberInput(num)}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#122650] hover:bg-[#0066ff] text-white font-bold text-sm sm:text-base shadow-sm transition active:scale-95"
                  >
                    {num}
                  </button>
                ))}
                <button
                  onClick={() => handleSudokuNumberInput(0)}
                  className="px-3 h-8 sm:h-10 rounded-xl bg-[#1c2e56] hover:bg-rose-600 text-blue-200 hover:text-white font-bold text-xs shadow-sm transition"
                >
                  Erase
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => resetSudoku()}
                  className="px-4 py-1.5 rounded-full bg-[#12254e] hover:bg-[#1a336b] text-blue-200 text-xs font-semibold transition"
                >
                  Restart
                </button>
                <button
                  onClick={() => resetSudoku((sudokuPuzzleIdx + 1) % SUDOKU_PUZZLES.length)}
                  className="px-4 py-1.5 rounded-full bg-[#0066ff] hover:bg-blue-600 text-white text-xs font-bold transition flex items-center gap-1.5"
                >
                  <span>Next Puzzle</span>
                </button>
              </div>
            </div>
          )}

          {/* 2B: EXECUTIVE WORD DECRYPTOR (Business Wordle) */}
          {activeVipGame === 'wordle' && (
            <div className="bg-[#0e2148]/60 backdrop-blur-md rounded-3xl p-4 sm:p-6 shadow-xl flex flex-col items-center max-w-md mx-auto">
              <div className="text-center mb-4 space-y-1">
                <h3 className="text-lg sm:text-xl font-black font-raleway text-white uppercase tracking-wider">
                  Executive Word Decryptor
                </h3>
                <p className="text-xs text-blue-200/90">
                  Guess the 5-letter executive business term in 6 tries.
                </p>
                <div className="flex items-center justify-center gap-4 text-xs font-mono font-bold text-blue-200 pt-1">
                  <span className="text-amber-300">Mind Points: {wordleScore}</span>
                  <span>•</span>
                  <span className="text-cyan-300">Tries: {wordleGuesses.length} / 6</span>
                </div>
              </div>

              {/* Status Banner */}
              <div className="mb-3 text-sm font-bold min-h-[24px] text-center">
                {wordleStatus === 'WON' && (
                  <span className="text-emerald-400">
                    Excellent! Decrypted in {wordleGuesses.length} {wordleGuesses.length === 1 ? 'try' : 'tries'}! (+25 Points)
                  </span>
                )}
                {wordleStatus === 'LOST' && (
                  <span className="text-rose-400">
                    Mission Failed. Target word was: <strong className="text-amber-300 tracking-widest">{wordleTarget}</strong>
                  </span>
                )}
                {wordleStatus === 'IN_PROGRESS' && (
                  <span className="text-blue-200/80 text-xs">
                    Green = Correct spot • Yellow = Wrong spot • Gray = Not in word
                  </span>
                )}
              </div>

              {/* 6x5 Grid */}
              <div className="space-y-1.5 mb-4">
                {Array(6).fill(0).map((_, rowIdx) => {
                  const guess = wordleGuesses[rowIdx];
                  const isCurrentRow = rowIdx === wordleGuesses.length && wordleStatus === 'IN_PROGRESS';

                  return (
                    <div key={rowIdx} className="grid grid-cols-5 gap-1.5">
                      {Array(5).fill(0).map((_, colIdx) => {
                        let letter = '';
                        let colorClass = 'bg-[#091530] text-white border border-blue-900/50';

                        if (guess) {
                          letter = guess[colIdx] || '';
                          if (letter === wordleTarget[colIdx]) {
                            colorClass = 'bg-emerald-600 text-white font-black shadow-[0_0_10px_#10b981]';
                          } else if (wordleTarget.includes(letter)) {
                            colorClass = 'bg-amber-500 text-slate-950 font-black';
                          } else {
                            colorClass = 'bg-slate-700/80 text-slate-400 font-semibold';
                          }
                        } else if (isCurrentRow) {
                          letter = wordleCurrent[colIdx] || '';
                          if (letter) {
                            colorClass = 'bg-[#0f2452] text-cyan-300 border-2 border-cyan-400 font-black scale-105';
                          }
                        }

                        return (
                          <div
                            key={colIdx}
                            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-lg sm:text-xl uppercase transition-all duration-200 ${colorClass}`}
                          >
                            {letter}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>

              {/* Virtual Keyboard */}
              <div className="w-full space-y-1.5 mb-3">
                {[
                  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
                  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
                  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DEL']
                ].map((row, rIdx) => (
                  <div key={rIdx} className="flex justify-center gap-1">
                    {row.map((k) => {
                      let keyBg = 'bg-[#102450] text-blue-100 hover:bg-[#152e63]';
                      if (k.length === 1) {
                        const hasCorrect = wordleGuesses.some(g => g.split('').some((ch, i) => ch === k && wordleTarget[i] === k));
                        const hasPresent = wordleGuesses.some(g => g.includes(k) && wordleTarget.includes(k));
                        const hasAbsent = wordleGuesses.some(g => g.includes(k) && !wordleTarget.includes(k));

                        if (hasCorrect) keyBg = 'bg-emerald-600 text-white font-bold';
                        else if (hasPresent) keyBg = 'bg-amber-500 text-slate-950 font-bold';
                        else if (hasAbsent) keyBg = 'bg-slate-800 text-slate-500 opacity-60';
                      }

                      return (
                        <button
                          key={k}
                          onClick={() => handleWordleKey(k)}
                          className={`py-2 rounded-lg text-xs font-bold transition active:scale-95 shadow-sm ${
                            k.length > 1 ? 'px-2.5 sm:px-3 bg-blue-700 hover:bg-blue-600 text-white' : 'w-7 sm:w-8 ' + keyBg
                          }`}
                        >
                          {k}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* Reset Button */}
              <button
                onClick={resetWordle}
                className="px-5 py-2 rounded-full bg-[#0066ff] hover:bg-blue-600 text-white text-xs font-bold uppercase tracking-wider shadow-md transition active:scale-95 flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>New Word Challenge</span>
              </button>
            </div>
          )}

          {/* 2C: EXECUTIVE MEMORY MATCH */}
          {activeVipGame === 'memory' && (
            <div className="bg-[#0e2148]/60 backdrop-blur-md rounded-3xl p-4 sm:p-6 shadow-xl flex flex-col items-center">
              <div className="text-center mb-4 space-y-1">
                <h3 className="text-lg sm:text-xl font-black font-raleway text-white uppercase tracking-wider">
                  Caribbean BPO Memory Challenge
                </h3>
                <div className="flex items-center justify-center gap-4 text-xs font-mono font-bold text-blue-200">
                  <span className="text-cyan-300">Moves: {memoryMoves}</span>
                  <span>•</span>
                  <span className="text-emerald-400">Pairs Matched: {memoryMatches} / {MEMORY_SYMBOLS.length}</span>
                </div>
              </div>

              {/* 4x4 Cards Grid */}
              <div className="grid grid-cols-4 gap-2.5 sm:gap-3 p-3 rounded-2xl bg-[#07132a] shadow-inner max-w-[340px] sm:max-w-[380px] w-full aspect-square mb-4">
                {memoryCards.map((card) => (
                  <button
                    key={card.id}
                    onClick={() => handleMemoryCardClick(card.id)}
                    disabled={card.isFlipped || card.isMatched}
                    className={`aspect-square rounded-2xl flex items-center justify-center p-1 text-xs sm:text-sm font-black font-mono tracking-tight transition-all duration-300 shadow-md ${
                      card.isMatched
                        ? 'bg-emerald-600/30 ring-2 ring-emerald-400 text-emerald-300'
                        : card.isFlipped
                        ? 'bg-[#0066ff] text-white scale-105'
                        : 'bg-[#102450] hover:bg-[#152e63] text-blue-300/40'
                    }`}
                  >
                    {card.isFlipped || card.isMatched ? (
                      <span className="text-center break-all">{card.symbol}</span>
                    ) : (
                      <span className="text-base font-bold font-mono">?</span>
                    )}
                  </button>
                ))}
              </div>

              {/* Win Banner / Restart */}
              <div className="text-center space-y-2">
                {memoryMatches === MEMORY_SYMBOLS.length && (
                  <p className="text-emerald-400 font-bold text-sm">
                    Outstanding Memory! Completed in {memoryMoves} moves!
                  </p>
                )}

                <button
                  onClick={resetMemoryGame}
                  className="px-5 py-2 rounded-full bg-[#0066ff] hover:bg-blue-600 text-white text-xs font-bold uppercase tracking-wider shadow-md transition active:scale-95 flex items-center gap-1.5 mx-auto"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Shuffle & Play Again</span>
                </button>
              </div>
            </div>
          )}

          {/* 2C: VIP SIMON COLOR SEQUENCE */}
          {activeVipGame === 'simon' && (
            <div className="bg-[#0e2148]/60 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-xl max-w-md mx-auto flex flex-col items-center text-center">
              <h3 className="text-xl sm:text-2xl font-black font-raleway text-amber-300 uppercase tracking-tight mb-1">
                VIP SIMON COLOR SEQUENCE
              </h3>
              <p className="text-xs text-blue-200/90 mb-3">
                Memorize the glowing color pattern and repeat it.
              </p>
              
              <div className="text-xs font-mono font-bold text-blue-200 mb-6 bg-[#102450]/80 py-1.5 px-5 rounded-full">
                Mind Points: <span className="text-amber-300 font-bold">{simonScore}</span>
              </div>

              {/* 2x2 Matrix */}
              <div className="grid grid-cols-2 gap-4 max-w-xs w-full mb-6 p-4 rounded-3xl bg-[#091530] shadow-inner">
                {['bg-emerald-500', 'bg-rose-500', 'bg-amber-500', 'bg-cyan-500'].map((bg, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSimonClick(idx)}
                    className={`h-24 sm:h-28 rounded-2xl transition duration-150 active:scale-95 shadow-md ${bg} ${
                      simonActive === idx ? 'brightness-200 scale-105 shadow-[0_0_20px_white]' : 'opacity-80 hover:opacity-100'
                    }`}
                  />
                ))}
              </div>

              <p className="text-sm font-bold text-cyan-300 mb-4 min-h-[24px]">
                {simonMsg}
              </p>

              <button 
                onClick={startSimon}
                className="px-7 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider rounded-full shadow-lg transition active:scale-95 flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>{simonSeq.length === 0 ? 'Start Sequence Challenge' : 'Restart Sequence'}</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: JARVIS-27 AI AGENT & WEB UPGRADE STUDIO */}
      {/* ========================================================================= */}
      {activeTab === 'jarvis' && (
        <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl">
          <JarvisRoom onReturn={() => setActiveTab('arcade')} />
        </div>
      )}

    </div>
  );
};

export default ArcadeRoom;
