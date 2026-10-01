import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Gamepad2, Linkedin, Mail, Twitter, Instagram, Calendar, 
  Send, ExternalLink, Sparkles, Trophy, Volume2, VolumeX, 
  RotateCcw, Play, Pause, Terminal, CheckCircle2, ShieldCheck, ArrowRight
} from 'lucide-react';

interface VaultRoomArcadeProps {
  memberId?: string;
  memberName?: string;
}

export const VaultRoomArcade: React.FC<VaultRoomArcadeProps> = ({ 
  memberId = 'arcade', 
  memberName = 'Contax360' 
}) => {
  const isJackie = memberId === 'jacqueline-sutherland';
  const isAshley = memberId === 'ashley-martin';

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(() => {
    return parseInt(localStorage.getItem(`contax_arcade_high_${memberId}`) || '14500', 10);
  });
  const [lives, setLives] = useState<number>(3);
  const [level, setLevel] = useState<number>(1);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [messageSent, setMessageSent] = useState<boolean>(false);
  const [connectorForm, setConnectorForm] = useState({
    senderName: '',
    senderEmail: '',
    senderCompany: '',
    message: ''
  });

  // Sound synthesis using Web Audio API
  const audioCtxRef = useRef<AudioContext | null>(null);
  const playRetroSound = useCallback((type: 'bounce' | 'brick' | 'loss' | 'levelup' | 'win') => {
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
      if (type === 'bounce') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(480, now + 0.08);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === 'brick') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(520 + Math.random() * 200, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.09);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
        osc.start(now);
        osc.stop(now + 0.09);
      } else if (type === 'loss') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(280, now);
        osc.frequency.exponentialRampToValueAtTime(90, now + 0.3);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
      } else if (type === 'levelup') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.setValueAtTime(554.37, now + 0.08);
        osc.frequency.setValueAtTime(659.25, now + 0.16);
        osc.frequency.setValueAtTime(880, now + 0.24);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      }
    } catch (_) {}
  }, [soundEnabled]);

  // Game Engine State
  const gameStateRef = useRef({
    running: false,
    paused: false,
    score: 0,
    lives: 3,
    level: 1,
    paddle: { x: 260, w: 90, h: 12, speed: 7, dx: 0 },
    ball: { x: 300, y: 250, r: 6, dx: 3.5, dy: -3.5, speed: 4.5 },
    bricks: [] as { x: number; y: number; w: number; h: number; active: boolean; color: string; val: number }[],
    animId: 0
  });

  const initLevel = useCallback((lvl: number) => {
    const cols = 8;
    const rows = 5;
    const brickW = 62;
    const brickH = 16;
    const pad = 8;
    const offTop = 35;
    const offLeft = 24;

    const colors = ['#38bdf8', '#3b82f6', '#6366f1', '#a855f7', '#ec4899'];
    const newBricks = [];

    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        newBricks.push({
          x: c * (brickW + pad) + offLeft,
          y: r * (brickH + pad) + offTop,
          w: brickW,
          h: brickH,
          active: true,
          color: colors[r % colors.length],
          val: (5 - r) * 20 * lvl
        });
      }
    }

    gameStateRef.current.bricks = newBricks;
    gameStateRef.current.ball.x = 300;
    gameStateRef.current.ball.y = 250;
    gameStateRef.current.ball.dx = 3.5 * (Math.random() > 0.5 ? 1 : -1);
    gameStateRef.current.ball.dy = -3.5;
  }, []);

  const startGame = useCallback(() => {
    const s = gameStateRef.current;
    s.running = true;
    s.paused = false;
    s.score = 0;
    s.lives = 3;
    s.level = 1;
    s.paddle.x = (600 - 90) / 2;
    s.paddle.dx = 0;

    setScore(0);
    setLives(3);
    setLevel(1);
    setIsPlaying(true);
    setIsPaused(false);

    initLevel(1);
    playRetroSound('levelup');
  }, [initLevel, playRetroSound]);

  const togglePause = useCallback(() => {
    if (!gameStateRef.current.running) return;
    gameStateRef.current.paused = !gameStateRef.current.paused;
    setIsPaused(gameStateRef.current.paused);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = 0;

    const gameLoop = () => {
      const s = gameStateRef.current;

      // Clear Canvas
      ctx.fillStyle = '#050b18';
      ctx.fillRect(0, 0, 600, 360);

      // Draw Grid lines (Retro aesthetic)
      ctx.strokeStyle = 'rgba(30, 58, 138, 0.2)';
      ctx.lineWidth = 1;
      for (let x = 0; x < 600; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 360);
        ctx.stroke();
      }
      for (let y = 0; y < 360; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(600, y);
        ctx.stroke();
      }

      // Draw Bricks
      let activeCount = 0;
      s.bricks.forEach((b) => {
        if (!b.active) return;
        activeCount++;

        ctx.fillStyle = b.color;
        ctx.shadowColor = b.color;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.roundRect(b.x, b.y, b.w, b.h, 3);
        ctx.fill();

        // Inner brick shine
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.fillRect(b.x + 2, b.y + 2, b.w - 4, 3);
      });
      ctx.shadowBlur = 0;

      // Draw Paddle
      ctx.fillStyle = '#38bdf8';
      ctx.shadowColor = '#0284c7';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.roundRect(s.paddle.x, 335, s.paddle.w, s.paddle.h, 5);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Draw Ball
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#60a5fa';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(s.ball.x, s.ball.y, s.ball.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      if (!s.running) {
        ctx.fillStyle = 'rgba(6, 11, 24, 0.85)';
        ctx.fillRect(0, 0, 600, 360);

        ctx.fillStyle = '#38bdf8';
        ctx.font = 'bold 22px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('THE VAULT ROOM ARCADE', 300, 160);

        ctx.fillStyle = '#94a3b8';
        ctx.font = '13px monospace';
        ctx.fillText('CLICK LAUNCH ARCADE TO BREACH THE VAULT', 300, 195);
        ctx.fillText('USE ARROWS / DRAG PADDLE TO PLAY', 300, 220);
      } else if (s.paused) {
        ctx.fillStyle = 'rgba(6, 11, 24, 0.75)';
        ctx.fillRect(0, 0, 600, 360);

        ctx.fillStyle = '#fbbf24';
        ctx.font = 'bold 24px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('ARCADE PAUSED', 300, 180);
      } else {
        // Physics update
        s.paddle.x += s.paddle.dx;
        if (s.paddle.x < 10) s.paddle.x = 10;
        if (s.paddle.x + s.paddle.w > 590) s.paddle.x = 590 - s.paddle.w;

        s.ball.x += s.ball.dx;
        s.ball.y += s.ball.dy;

        // Wall collisions
        if (s.ball.x - s.ball.r < 10) {
          s.ball.x = 10 + s.ball.r;
          s.ball.dx = -s.ball.dx;
          playRetroSound('bounce');
        } else if (s.ball.x + s.ball.r > 590) {
          s.ball.x = 590 - s.ball.r;
          s.ball.dx = -s.ball.dx;
          playRetroSound('bounce');
        }

        if (s.ball.y - s.ball.r < 10) {
          s.ball.y = 10 + s.ball.r;
          s.ball.dy = -s.ball.dy;
          playRetroSound('bounce');
        }

        // Paddle collision
        if (
          s.ball.y + s.ball.r >= 335 &&
          s.ball.y - s.ball.r <= 335 + s.paddle.h &&
          s.ball.x >= s.paddle.x - 4 &&
          s.ball.x <= s.paddle.x + s.paddle.w + 4
        ) {
          const hitOffset = (s.ball.x - (s.paddle.x + s.paddle.w / 2)) / (s.paddle.w / 2);
          s.ball.dx = hitOffset * 5.2;
          s.ball.dy = -Math.abs(s.ball.dy);
          playRetroSound('bounce');
        }

        // Bottom boundary (Life loss)
        if (s.ball.y + s.ball.r > 360) {
          s.lives--;
          setLives(s.lives);
          playRetroSound('loss');

          if (s.lives <= 0) {
            s.running = false;
            setIsPlaying(false);
          } else {
            s.ball.x = s.paddle.x + s.paddle.w / 2;
            s.ball.y = 310;
            s.ball.dx = 3.5 * (Math.random() > 0.5 ? 1 : -1);
            s.ball.dy = -3.5;
          }
        }

        // Brick collisions
        s.bricks.forEach((b) => {
          if (!b.active) return;
          if (
            s.ball.x + s.ball.r > b.x &&
            s.ball.x - s.ball.r < b.x + b.w &&
            s.ball.y + s.ball.r > b.y &&
            s.ball.y - s.ball.r < b.y + b.h
          ) {
            b.active = false;
            s.ball.dy = -s.ball.dy;
            s.score += b.val;
            setScore(s.score);
            playRetroSound('brick');

            if (s.score > highScore) {
              setHighScore(s.score);
              localStorage.setItem(`contax_arcade_high_${memberId}`, String(s.score));
            }
          }
        });

        // Level Complete
        if (activeCount === 0) {
          s.level++;
          setLevel(s.level);
          initLevel(s.level);
          playRetroSound('levelup');
        }
      }

      animId = requestAnimationFrame(gameLoop);
    };

    animId = requestAnimationFrame(gameLoop);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowRight', 'd', 'D'].includes(e.key)) gameStateRef.current.paddle.dx = gameStateRef.current.paddle.speed;
      if (['ArrowLeft', 'a', 'A'].includes(e.key)) gameStateRef.current.paddle.dx = -gameStateRef.current.paddle.speed;
      if (e.key === ' ' && gameStateRef.current.running) {
        e.preventDefault();
        togglePause();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (['ArrowRight', 'd', 'D', 'ArrowLeft', 'a', 'A'].includes(e.key)) {
        gameStateRef.current.paddle.dx = 0;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [highScore, initLevel, memberId, playRetroSound, togglePause]);

  // Touch and Drag control
  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const touchX = e.touches[0].clientX - rect.left;
    const scaledX = (touchX / rect.width) * 600;
    gameStateRef.current.paddle.x = Math.max(10, Math.min(500, scaledX - gameStateRef.current.paddle.w / 2));
  };

  const handleConnectorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessageSent(true);
    setTimeout(() => setMessageSent(false), 5000);
    setConnectorForm({ senderName: '', senderEmail: '', senderCompany: '', message: '' });
  };

  // Social Connectors Data specifically for Jackie & Ashley
  const connectors = isJackie
    ? [
        {
          id: 'linkedin',
          title: 'LinkedIn Executive Network',
          subtitle: 'Direct CEO Connection & Executive Insights',
          url: 'https://www.linkedin.com/in/jacqueline-sutherland-contax360',
          icon: <Linkedin className="w-5 h-5 text-[#0077b5]" />,
          action: 'Connect on LinkedIn'
        },
        {
          id: 'email',
          title: 'Direct Executive Dispatch',
          subtitle: 'Priority Office of the President & CEO',
          url: 'mailto:jackie@contax360.com?subject=Contax360%20Executive%20Inquiry%20from%20Suite%20100',
          icon: <Mail className="w-5 h-5 text-emerald-400" />,
          action: 'Send Direct Message'
        },
        {
          id: 'twitter',
          title: 'Twitter / X Executive Voice',
          subtitle: 'Caribbean BPO & Female Leadership Thought',
          url: 'https://x.com/JackieSutherBPO',
          icon: <Twitter className="w-5 h-5 text-[#1da1f2]" />,
          action: 'Follow @JackieSutherBPO'
        },
        {
          id: 'calendar',
          title: 'Private Executive Briefing',
          subtitle: 'Request 1-on-1 Consultation with Jackie',
          url: 'mailto:jackie@contax360.com?subject=Private%20Executive%20Briefing%20Request',
          icon: <Calendar className="w-5 h-5 text-purple-400" />,
          action: 'Schedule Briefing'
        },
        {
          id: 'instagram',
          title: 'Instagram Leadership & Culture',
          subtitle: 'Contax360 Montego Bay Campus Life',
          url: 'https://www.instagram.com/contax360bpo/',
          icon: <Instagram className="w-5 h-5 text-pink-500" />,
          action: 'View Campus Stories'
        }
      ]
    : [
        {
          id: 'linkedin',
          title: 'LinkedIn Enterprise Network',
          subtitle: 'Enterprise Migrations & Client Solutions',
          url: 'https://www.linkedin.com/in/ashley-martin-enterprise-bpo',
          icon: <Linkedin className="w-5 h-5 text-[#0077b5]" />,
          action: 'Connect on LinkedIn'
        },
        {
          id: 'email',
          title: 'Direct Client Onboarding Desk',
          subtitle: 'Enterprise Solutions & RFP Direct Inquiries',
          url: 'mailto:ashley.martin@contax360.com?subject=Enterprise%20Migration%20Inquiry%20from%20Suite%20501',
          icon: <Mail className="w-5 h-5 text-cyan-400" />,
          action: 'Send Project Brief'
        },
        {
          id: 'twitter',
          title: 'Twitter / X Enterprise Tech',
          subtitle: 'Omnichannel BPO & Migration Innovations',
          url: 'https://x.com/AshleyM_Contax',
          icon: <Twitter className="w-5 h-5 text-[#1da1f2]" />,
          action: 'Follow @AshleyM_Contax'
        },
        {
          id: 'calendar',
          title: 'Enterprise Onboarding Scope',
          subtitle: 'Book 30-min Technical Migration Review',
          url: 'mailto:ashley.martin@contax360.com?subject=Schedule%20Enterprise%20Migration%20Scoping%20Call',
          icon: <Calendar className="w-5 h-5 text-indigo-400" />,
          action: 'Book Migration Call'
        },
        {
          id: 'instagram',
          title: 'Instagram Global Delivery',
          subtitle: 'Jamaica & Florida Team Operational Excellence',
          url: 'https://www.instagram.com/contax360bpo/',
          icon: <Instagram className="w-5 h-5 text-pink-500" />,
          action: 'View Operations'
        }
      ];

  return (
    <div className="w-full pt-16 mt-16 border-t-2 border-blue-500/30 text-left">
      
      {/* Vault Room Header - Striking Blue Banner Aesthetic */}
      <div className="w-full bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 border border-blue-400/40 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden mb-10">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_#34d399]" />
              <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-cyan-300">
                Exclusive Executive Sub-Suite • Port 8080
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black font-raleway text-white tracking-tight flex items-center gap-3">
              <Gamepad2 className="w-8 h-8 text-cyan-400 shrink-0" />
              <span>The Vault Room</span>
            </h2>
            <p className="text-xs sm:text-sm text-blue-200/90 font-work mt-1.5 max-w-xl">
              Private executive arcade lounge for {memberName}. Test your precision in the Cyber Vault Breaker and access dedicated executive personal connectors below.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-blue-950/80 border border-blue-400/30 py-2 px-4 rounded-xl shrink-0 font-mono text-xs">
            <Terminal className="w-4 h-4 text-cyan-400 shrink-0" />
            <span className="text-slate-300">Protocol:</span>
            <span className="text-emerald-400 font-bold">ARCADE_ROOM :8080</span>
          </div>
        </div>
      </div>

      {/* Arcade Cabinet Screen */}
      <div className="bg-[#091124] border-2 border-blue-500/50 rounded-2xl p-4 sm:p-6 shadow-[0_0_50px_rgba(37,99,235,0.25)] relative overflow-hidden">
        
        {/* Arcade Cabinet Top Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-blue-900/60 mb-4 font-mono text-xs text-slate-300">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 bg-blue-950 border border-blue-500/40 rounded-lg text-cyan-300 font-bold">
              SCORE: {String(score).padStart(5, '0')}
            </span>
            <span className="px-2.5 py-1 bg-slate-900 border border-slate-700 rounded-lg text-amber-300 flex items-center gap-1 font-bold">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              HIGH: {String(highScore).padStart(5, '0')}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-rose-400 font-bold tracking-widest">
              LIVES: {lives}
            </span>
            <span className="text-cyan-400 font-bold">
              LEVEL: {level}
            </span>
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
              title={soundEnabled ? 'Mute 8-bit sound' : 'Enable 8-bit sound'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            </button>
          </div>
        </div>

        {/* Canvas Display */}
        <div className="relative rounded-xl overflow-hidden border border-blue-500/30 bg-[#050b18]">
          <canvas
            ref={canvasRef}
            width={600}
            height={360}
            onTouchMove={handleTouchMove}
            className="w-full h-[280px] sm:h-[360px] block cursor-pointer select-none"
          />
        </div>

        {/* Arcade Control Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-4 border-t border-blue-900/60 font-mono text-xs">
          <div className="flex items-center gap-2">
            {!isPlaying ? (
              <button
                onClick={startGame}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold tracking-wider uppercase shadow-lg shadow-blue-500/30 flex items-center gap-2 transition active:scale-95"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Launch Arcade Game</span>
              </button>
            ) : (
              <>
                <button
                  onClick={togglePause}
                  className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold flex items-center gap-1.5 transition active:scale-95"
                >
                  {isPaused ? <Play className="w-3.5 h-3.5 fill-current" /> : <Pause className="w-3.5 h-3.5" />}
                  <span>{isPaused ? 'Resume' : 'Pause'}</span>
                </button>
                <button
                  onClick={startGame}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold flex items-center gap-1.5 transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restart</span>
                </button>
              </>
            )}
          </div>

          <div className="text-[11px] text-slate-400 flex items-center gap-2">
            <span className="hidden sm:inline">Desktop: ← / → Arrow Keys • A / D</span>
            <span>Mobile: Drag paddle on screen</span>
          </div>
        </div>

        {/* Python Arcade Module Code Reference Callout */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
          <span className="text-cyan-300">from arcade_room import run_server, mount_fastapi, mount_flask, get_html</span>
          <span className="text-emerald-400 hidden sm:inline">run_server(8080) ✓ READY</span>
        </div>
      </div>

      {/* CONNECTORS SECTION - UNDER ARCADE FOR EXECUTIVE SUITES ONLY */}
      {(isJackie || isAshley) && (
        <div className="mt-14 space-y-6">
        <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <h3 className="text-xl sm:text-2xl font-bold font-raleway text-white tracking-wide">
                Connect With {memberName}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 font-work mt-1">
              Direct personal and executive connectors for direct partnership, inquiries, and social networks.
            </p>
          </div>
          <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-mono font-bold shrink-0">
            Direct Line Active
          </span>
        </div>

        {/* Connectors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {connectors.map((c) => (
            <a
              key={c.id}
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl bg-slate-900/60 hover:bg-slate-900 border border-white/10 hover:border-blue-400/60 shadow-lg hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {c.icon}
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition" />
                </div>
                <h4 className="text-base font-bold font-raleway text-white group-hover:text-cyan-300 transition">
                  {c.title}
                </h4>
                <p className="text-xs text-slate-400 font-work mt-1 leading-relaxed">
                  {c.subtitle}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-semibold text-cyan-400 group-hover:text-cyan-300">
                <span>{c.action}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
          ))}
        </div>

        {/* Interactive Direct Dispatch / Connector Form */}
        <div className="mt-8 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-blue-950 border border-blue-500/30 shadow-xl">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h4 className="text-lg font-bold font-raleway text-white">
              Send Priority Dispatch to {memberName}'s Desk
            </h4>
          </div>
          <p className="text-xs text-slate-300 mb-6 font-work">
            Leave an authenticated direct inquiry that routes straight to {memberName}'s executive team with SLA routing.
          </p>

          {messageSent ? (
            <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span className="text-xs sm:text-sm font-semibold">
                Your dispatch has been successfully routed to {memberName}'s executive inbox! You will receive a direct follow-up.
              </span>
            </div>
          ) : (
            <form onSubmit={handleConnectorSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={connectorForm.senderName}
                    onChange={(e) => setConnectorForm({ ...connectorForm, senderName: e.target.value })}
                    placeholder="e.g. Director of Operations"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">Direct Email</label>
                  <input
                    type="email"
                    required
                    value={connectorForm.senderEmail}
                    onChange={(e) => setConnectorForm({ ...connectorForm, senderEmail: e.target.value })}
                    placeholder="name@enterprise.com"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">Company / Organization</label>
                  <input
                    type="text"
                    required
                    value={connectorForm.senderCompany}
                    onChange={(e) => setConnectorForm({ ...connectorForm, senderCompany: e.target.value })}
                    placeholder="e.g. Healthcare Systems Inc"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-1">Message / Consultation Scope</label>
                <textarea
                  required
                  rows={3}
                  value={connectorForm.message}
                  onChange={(e) => setConnectorForm({ ...connectorForm, message: e.target.value })}
                  placeholder={`Brief inquiry or strategic partnership scope for ${memberName}...`}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400 resize-none"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg flex items-center gap-2 transition active:scale-95"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Priority Dispatch</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      )}
    </div>
  );
};
