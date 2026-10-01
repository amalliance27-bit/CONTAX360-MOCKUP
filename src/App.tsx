import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Header } from './components/Header';
import { HomeRoom } from './components/HomeRoom';
import { ServicesRoom } from './components/ServicesRoom';
import { AboutRoom } from './components/AboutRoom';
import { CareersRoom } from './components/CareersRoom';
import { ContactRoom } from './components/ContactRoom';
import { InfomercialRoom } from './components/InfomercialRoom';
import { RadioRoom } from './components/RadioRoom';
import { Footer } from './components/Footer';
import { SplashPage } from './components/SplashPage';
import { ExecutiveOfficeRoom } from './components/ExecutiveOfficeRoom';
import { JarvisRoom } from './components/JarvisRoom';
import { TeamMember } from './data/teamData';
import { audioCoordinator, ROOM_INTRO_SCRIPTS, ROOM_REVISIT_SCRIPTS } from './utils/audioCoordinator';

export type RoomType = 'home' | 'services' | 'about' | 'careers' | 'contact' | 'infomercial' | 'radio' | 'jarvis';

// WHUR-FM 96.3 Howard University (Washington D.C. / Maryland) Direct Stream
const ALL_RADIO_STREAMS = [
  'https://ais-sa1.streamon.fm/7028_48k.aac', // Official WHUR-FM 96.3 Howard University
  'https://ais-sa1.streamon.fm/7043_48k.aac', // WHUR 96.3 HD Stream
  'https://ais-sa1.cdnstream1.com/7028_48k.aac', // WHUR-FM CDN Mirror
];

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentRoom, setCurrentRoom] = useState<RoomType>('home');
  const [isRadioPlaying, setIsRadioPlaying] = useState(false);
  const [radioStatusText, setRadioStatusText] = useState<string>('RADIO LIVE');
  const [audioBlockedByBrowser, setAudioBlockedByBrowser] = useState(false);
  const [currentStreamIndex, setCurrentStreamIndex] = useState(0);
  const [selectedStationName, setSelectedStationName] = useState<string>('WHUR-FM 96.3 • Howard University • Washington D.C. & Maryland');

  const [activeExecutiveMember, setActiveExecutiveMember] = useState<TeamMember | null>(null);
  const activeExecutiveMemberRef = useRef<TeamMember | null>(null);
  const returnScrollYRef = useRef<number>(0);
  const returnRoomRef = useRef<RoomType>('home');
  const visitedSuitesRef = useRef<Set<string>>(new Set());
  const [isExecutiveFirstVisit, setIsExecutiveFirstVisit] = useState<boolean>(true);

  useEffect(() => {
    activeExecutiveMemberRef.current = activeExecutiveMember;
  }, [activeExecutiveMember]);

  const scrollIntervalRef = useRef<number | null>(null);
  const holdTimeoutRef = useRef<number | null>(null);
  const initialDelayTimeoutRef = useRef<number | null>(null);
  const scrollDirectionRef = useRef<'down' | 'up'>('down');
  const isHoldingRef = useRef<boolean>(false);
  const isUserInteractingRef = useRef<boolean>(false);
  
  const globalRadioAudioRef = useRef<HTMLAudioElement | null>(null);
  const hasSpokenGreetingRef = useRef<boolean>(false);
  const visitedRoomsRef = useRef<Set<string>>(new Set());
  const isTourActiveRef = useRef<boolean>(false);
  const resumeRadioTimerRef = useRef<number | null>(null);
  const countdownIntervalRef = useRef<number | null>(null);

  const isFormPage = currentRoom === 'contact' || currentRoom === 'careers';

  // Open an Executive Office Splash Room and save caller position
  const handleOpenExecutiveRoom = (member: TeamMember) => {
    returnScrollYRef.current = window.scrollY;
    returnRoomRef.current = currentRoom;
    activeExecutiveMemberRef.current = member;

    const isFirst = !visitedSuitesRef.current.has(member.roomKey);
    setIsExecutiveFirstVisit(isFirst);

    resetAutoScrollTimer();

    // Immediately stop and mute ANY sound playing across the site
    if (resumeRadioTimerRef.current) {
      clearTimeout(resumeRadioTimerRef.current);
      resumeRadioTimerRef.current = null;
    }
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
    if (globalRadioAudioRef.current) {
      globalRadioAudioRef.current.pause();
      setIsRadioPlaying(false);
      setRadioStatusText('RADIO MUTED');
    }

    // Stop all media elements on the page immediately
    document.querySelectorAll('audio, video').forEach((el) => {
      try {
        (el as HTMLMediaElement).pause();
      } catch (_) {}
    });

    audioCoordinator.stopAllVoice();
    setActiveExecutiveMember(member);
  };

  // Close Executive Office and return smoothly to exact room and spot, restoring radio & auto-scroll
  const handleCloseExecutiveRoom = useCallback(() => {
    const exitedMember = activeExecutiveMemberRef.current;
    if (exitedMember) {
      visitedSuitesRef.current.add(exitedMember.roomKey);
    }

    activeExecutiveMemberRef.current = null;
    setActiveExecutiveMember(null);
    audioCoordinator.stopAllVoice();
    const savedRoom = returnRoomRef.current;
    const savedScrollY = returnScrollYRef.current;

    setCurrentRoom(savedRoom);
    setTimeout(() => {
      window.scrollTo({ top: savedScrollY, behavior: 'smooth' });
    }, 70);

    // 1. Radio returns automatically once exited suite
    setTimeout(() => {
      fadeInRadioLowVolume(0.35);
    }, 600);

    // 2. Auto-scroll loop returns automatically once settled in lobby
    isUserInteractingRef.current = false;
    setTimeout(() => {
      startAutoScrollLoop();
    }, 2400);
  }, []);

  // Helper to gently play and fade in Caribbean / Howard radio at low ambient volume
  const fadeInRadioLowVolume = (targetVolume = 0.35, durationMs = 2000) => {
    if (isTourActiveRef.current || activeExecutiveMemberRef.current) {
      if (globalRadioAudioRef.current) globalRadioAudioRef.current.pause();
      setIsRadioPlaying(false);
      setRadioStatusText('RADIO PAUSED');
      return;
    }

    if (resumeRadioTimerRef.current) {
      clearTimeout(resumeRadioTimerRef.current);
      resumeRadioTimerRef.current = null;
    }
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }

    if (!globalRadioAudioRef.current) {
      const radio = new Audio(ALL_RADIO_STREAMS[0]);
      radio.volume = targetVolume;
      radio.preload = 'auto';
      radio.crossOrigin = 'anonymous';
      globalRadioAudioRef.current = radio;
    }

    const radio = globalRadioAudioRef.current;
    radio.volume = targetVolume;

    const playWithFallback = (streamIdx: number) => {
      radio.src = ALL_RADIO_STREAMS[streamIdx];
      radio.play()
        .then(() => {
          setIsRadioPlaying(true);
          setRadioStatusText('RADIO LIVE');
          setAudioBlockedByBrowser(false);
        })
        .catch((err) => {
          console.warn(`Radio stream #${streamIdx} restricted or errored:`, err);
          if (streamIdx + 1 < ALL_RADIO_STREAMS.length) {
            playWithFallback(streamIdx + 1);
          } else {
            setIsRadioPlaying(false);
            setRadioStatusText('TAP TO PLAY');
          }
        });
    };

    playWithFallback(currentStreamIndex);
  };

  // Helper to resume radio after speech ends with smooth fade-in
  const handleSpeechEndWithDelay = (delayMs = 1000) => {
    if (isTourActiveRef.current || activeExecutiveMemberRef.current) {
      if (globalRadioAudioRef.current) globalRadioAudioRef.current.pause();
      setIsRadioPlaying(false);
      setRadioStatusText('RADIO PAUSED');
      return;
    }

    if (resumeRadioTimerRef.current) clearTimeout(resumeRadioTimerRef.current);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);

    // Fade radio back in seamlessly after Pandora finishes speaking
    resumeRadioTimerRef.current = window.setTimeout(() => {
      if (!isTourActiveRef.current && !activeExecutiveMemberRef.current) {
        fadeInRadioLowVolume(0.35);
      }
    }, delayMs);

    // Auto showcase scroll on pages after greeting finishes
    if (!isUserInteractingRef.current && !isFormPage && !showSplash && !activeExecutiveMemberRef.current) {
      if (initialDelayTimeoutRef.current) clearTimeout(initialDelayTimeoutRef.current);
      initialDelayTimeoutRef.current = window.setTimeout(() => {
        if (!isUserInteractingRef.current && !isFormPage && !showSplash && !activeExecutiveMemberRef.current) {
          startAutoScrollLoop();
        }
      }, 7000);
    }
  };

  // Play Room Intro Narration by Pandora Lee
  const playRoomIntro = (roomKey: string, forceFullIntro = false) => {
    const isRevisit = !forceFullIntro && visitedRoomsRef.current.has(roomKey);
    visitedRoomsRef.current.add(roomKey);

    const scriptText = isRevisit 
      ? (ROOM_REVISIT_SCRIPTS[roomKey]?.text || ROOM_INTRO_SCRIPTS[roomKey]?.text || '')
      : (ROOM_INTRO_SCRIPTS[roomKey]?.text || '');

    if (!scriptText) {
      audioCoordinator.stopAllVoice();
      return;
    }

    const scriptTitle = isRevisit
      ? (ROOM_REVISIT_SCRIPTS[roomKey]?.title || `${roomKey} (Revisit)`)
      : (ROOM_INTRO_SCRIPTS[roomKey]?.title || roomKey);

    const cacheKey = isRevisit ? `revisit_${roomKey}` : roomKey;
    
    // Explicitly pause and hold radio while Pandora speaks
    if (globalRadioAudioRef.current) {
      globalRadioAudioRef.current.pause();
      setIsRadioPlaying(false);
      setRadioStatusText(`PANDORA SPEAKING`);
    }

    audioCoordinator.playVoice(scriptText, {
      cacheKey,
      title: scriptTitle,
      onStart: () => {
        if (globalRadioAudioRef.current) {
          globalRadioAudioRef.current.pause();
          setIsRadioPlaying(false);
          setRadioStatusText('PANDORA SPEAKING');
        }
      },
      onEnd: () => {
        // Resume radio gently after speech and schedule auto-scroll
        handleSpeechEndWithDelay(1000);
      },
      pauseRadioDelayMs: 500,
    });
  };

  const handleSelectRoom = (room: string) => {
    setCurrentRoom(room as RoomType);
    window.scrollTo(0, 0);
    scrollDirectionRef.current = 'down';
    resetAutoScrollTimer();
    playRoomIntro(room);
  };

  const handleStartTour = () => {
    const trigger = document.querySelector('[data-assistant-btn]') as HTMLElement;
    if (trigger) trigger.click();
  };

  // 1. Radio Engine & Event Listeners
  useEffect(() => {
    const radio = new Audio(ALL_RADIO_STREAMS[0]);
    radio.volume = 0.85;
    radio.preload = 'auto';
    radio.crossOrigin = 'anonymous';
    globalRadioAudioRef.current = radio;

    let backupIndex = 1;
    radio.onerror = () => {
      if (backupIndex < ALL_RADIO_STREAMS.length && globalRadioAudioRef.current) {
        globalRadioAudioRef.current.src = ALL_RADIO_STREAMS[backupIndex];
        backupIndex++;
        globalRadioAudioRef.current.play()
          .then(() => {
            setIsRadioPlaying(true);
            setRadioStatusText('RADIO LIVE');
          })
          .catch(() => {});
      }
    };

    // Standby radio initialized - user controlled or accessed in Radio Room
    setIsRadioPlaying(false);
    setRadioStatusText('RADIO STANDBY');

    // Listen for Video Play events to immediately stop all other audio and radio
    const onVideoPlay = () => {
      if (resumeRadioTimerRef.current) {
        clearTimeout(resumeRadioTimerRef.current);
        resumeRadioTimerRef.current = null;
      }
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
        countdownIntervalRef.current = null;
      }
      if (globalRadioAudioRef.current) {
        globalRadioAudioRef.current.pause();
        setIsRadioPlaying(false);
        setRadioStatusText('RADIO PAUSED (VIDEO)');
      }
      audioCoordinator.stopAllVoice();
    };
    window.addEventListener('contax:video-play', onVideoPlay);

    // Listen for Web Tour active/inactive events
    const onTourStateChange = (e: any) => {
      const active = !!e?.detail?.active;
      isTourActiveRef.current = active;
      if (active) {
        if (resumeRadioTimerRef.current) clearTimeout(resumeRadioTimerRef.current);
        if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
        if (globalRadioAudioRef.current) {
          globalRadioAudioRef.current.pause();
          setIsRadioPlaying(false);
          setRadioStatusText('RADIO PAUSED (ASSISTANT)');
        }
      }
    };

    const onSpeechStart = () => {
      if (resumeRadioTimerRef.current) clearTimeout(resumeRadioTimerRef.current);
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
      if (globalRadioAudioRef.current) {
        globalRadioAudioRef.current.pause();
        setIsRadioPlaying(false);
        setRadioStatusText('PANDORA SPEAKING');
      }
    };

    const onSpeechEnd = (e: any) => {
      const delay = e?.detail?.pauseDelayMs || 3000;
      handleSpeechEndWithDelay(delay);
    };

    const onRadioVolume = (e: any) => {
      const v = typeof e?.detail?.volume === 'number' ? e.detail.volume : 0.85;
      if (globalRadioAudioRef.current) {
        globalRadioAudioRef.current.volume = v;
      }
    };

    // When ANY video plays across the entire site, immediately stop all audio and voice
    const onAnyVideoPlay = () => {
      audioCoordinator.stopAllVoice();
      if (resumeRadioTimerRef.current) clearTimeout(resumeRadioTimerRef.current);
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
      if (globalRadioAudioRef.current) {
        globalRadioAudioRef.current.pause();
        setIsRadioPlaying(false);
        setRadioStatusText('AUDIO MUTED FOR VIDEO');
      }
      document.querySelectorAll('audio').forEach((el) => {
        try {
          el.pause();
        } catch (_) {}
      });
    };

    const handleDocumentVideoPlay = (e: Event) => {
      if ((e.target as HTMLElement)?.tagName?.toLowerCase() === 'video') {
        onAnyVideoPlay();
      }
    };

    window.addEventListener('contax:speech-start', onSpeechStart);
    window.addEventListener('contax:speech-end', onSpeechEnd);
    window.addEventListener('contax:tour-state', onTourStateChange);
    window.addEventListener('contax:radio-volume', onRadioVolume);
    window.addEventListener('contax:video-play', onAnyVideoPlay);
    document.addEventListener('play', handleDocumentVideoPlay, true);

    return () => {
      if (resumeRadioTimerRef.current) clearTimeout(resumeRadioTimerRef.current);
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
      window.removeEventListener('contax:speech-start', onSpeechStart);
      window.removeEventListener('contax:speech-end', onSpeechEnd);
      window.removeEventListener('contax:tour-state', onTourStateChange);
      window.removeEventListener('contax:radio-volume', onRadioVolume);
      window.removeEventListener('contax:video-play', onAnyVideoPlay);
      document.removeEventListener('play', handleDocumentVideoPlay, true);
      if (globalRadioAudioRef.current) {
        globalRadioAudioRef.current.pause();
        globalRadioAudioRef.current = null;
      }
    };
  }, []);

  const handleToggleRadio = () => {
    if (resumeRadioTimerRef.current) {
      clearTimeout(resumeRadioTimerRef.current);
      resumeRadioTimerRef.current = null;
    }
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }

    if (!globalRadioAudioRef.current) {
      const radio = new Audio(ALL_RADIO_STREAMS[currentStreamIndex] || ALL_RADIO_STREAMS[0]);
      radio.crossOrigin = 'anonymous';
      globalRadioAudioRef.current = radio;
    }

    const radio = globalRadioAudioRef.current;

    if (isRadioPlaying) {
      radio.pause();
      setIsRadioPlaying(false);
      setRadioStatusText('RADIO MUTED');
    } else {
      audioCoordinator.stopAllVoice();
      radio.volume = 0.8;
      radio.play()
        .then(() => {
          setIsRadioPlaying(true);
          setRadioStatusText('RADIO LIVE');
          setAudioBlockedByBrowser(false);
        })
        .catch((err) => {
          console.warn('Radio play error:', err);
          const nextIdx = (currentStreamIndex + 1) % ALL_RADIO_STREAMS.length;
          setCurrentStreamIndex(nextIdx);
          radio.src = ALL_RADIO_STREAMS[nextIdx];
          radio.play()
            .then(() => {
              setIsRadioPlaying(true);
              setRadioStatusText('RADIO LIVE');
            })
            .catch(() => {
              setIsRadioPlaying(false);
              setRadioStatusText('TAP TO PLAY');
            });
        });
    }
  };

  // Reset auto-scroll timers and animation frame
  const resetAutoScrollTimer = () => {
    if (scrollIntervalRef.current) {
      cancelAnimationFrame(scrollIntervalRef.current);
      scrollIntervalRef.current = null;
    }
    if (holdTimeoutRef.current) {
      clearTimeout(holdTimeoutRef.current);
      holdTimeoutRef.current = null;
    }
    if (initialDelayTimeoutRef.current) {
      clearTimeout(initialDelayTimeoutRef.current);
      initialDelayTimeoutRef.current = null;
    }
    isHoldingRef.current = false;
  };

  // Silky-smooth auto scroll loop for showcasing lobby and pages
  const startAutoScrollLoop = () => {
    if (isFormPage || showSplash || activeExecutiveMember) return;
    if (scrollIntervalRef.current) {
      cancelAnimationFrame(scrollIntervalRef.current);
      scrollIntervalRef.current = null;
    }

    let lastTime = performance.now();

    const scrollStep = (now: number) => {
      if (isUserInteractingRef.current || isHoldingRef.current) {
        return;
      }

      const elapsed = now - lastTime;
      if (elapsed >= 18) {
        lastTime = now;
        const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

        if (maxScroll <= 40) {
          scrollIntervalRef.current = requestAnimationFrame(scrollStep);
          return;
        }

        const currentY = window.scrollY;

        if (scrollDirectionRef.current === 'down') {
          if (currentY >= maxScroll - 6) {
            isHoldingRef.current = true;
            holdTimeoutRef.current = window.setTimeout(() => {
              scrollDirectionRef.current = 'up';
              isHoldingRef.current = false;
              scrollIntervalRef.current = requestAnimationFrame(scrollStep);
            }, 3500);
            return;
          } else {
            window.scrollBy({ top: 1.0, behavior: 'auto' });
          }
        } else {
          if (currentY <= 6) {
            isHoldingRef.current = true;
            holdTimeoutRef.current = window.setTimeout(() => {
              scrollDirectionRef.current = 'down';
              isHoldingRef.current = false;
              scrollIntervalRef.current = requestAnimationFrame(scrollStep);
            }, 3500);
            return;
          } else {
            window.scrollBy({ top: -1.0, behavior: 'auto' });
          }
        }
      }

      scrollIntervalRef.current = requestAnimationFrame(scrollStep);
    };

    scrollIntervalRef.current = requestAnimationFrame(scrollStep);
  };

  // Auto-scroll lifecycle per room and user interaction listeners
  useEffect(() => {
    resetAutoScrollTimer();

    if (showSplash || isFormPage || activeExecutiveMember) return;

    // Start auto showcase after initial pause on entering a room
    initialDelayTimeoutRef.current = window.setTimeout(() => {
      if (!isUserInteractingRef.current) {
        startAutoScrollLoop();
      }
    }, 7000);

    const onUserInteract = () => {
      isUserInteractingRef.current = true;
      if (scrollIntervalRef.current) {
        cancelAnimationFrame(scrollIntervalRef.current);
        scrollIntervalRef.current = null;
      }
      if (initialDelayTimeoutRef.current) {
        clearTimeout(initialDelayTimeoutRef.current);
      }
      // Resume auto scroll after 9 seconds of inactivity if user is idle
      initialDelayTimeoutRef.current = window.setTimeout(() => {
        isUserInteractingRef.current = false;
        if (!isFormPage && !showSplash && !activeExecutiveMember) {
          startAutoScrollLoop();
        }
      }, 9000);
    };

    window.addEventListener('wheel', onUserInteract, { passive: true });
    window.addEventListener('touchstart', onUserInteract, { passive: true });
    window.addEventListener('touchmove', onUserInteract, { passive: true });
    window.addEventListener('keydown', onUserInteract, { passive: true });
    window.addEventListener('mousedown', onUserInteract, { passive: true });

    return () => {
      resetAutoScrollTimer();
      window.removeEventListener('wheel', onUserInteract);
      window.removeEventListener('touchstart', onUserInteract);
      window.removeEventListener('touchmove', onUserInteract);
      window.removeEventListener('keydown', onUserInteract);
      window.removeEventListener('mousedown', onUserInteract);
    };
  }, [currentRoom, showSplash, isFormPage, activeExecutiveMember]);

  // Priority Executive Office Suite (enters instantly, full viewport takeover, zero distraction)
  if (activeExecutiveMember) {
    return (
      <ExecutiveOfficeRoom
        member={activeExecutiveMember}
        onClose={handleCloseExecutiveRoom}
        isFirstVisit={isExecutiveFirstVisit}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-600 selection:text-white flex flex-col justify-between relative">
      {/* 0. White & Pearl Shade Splash Page with Contax360 Intro Video */}
      {showSplash && (
        <SplashPage
          onEnterLobby={() => {
            setShowSplash(false);
            setCurrentRoom('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            audioCoordinator.stopAllVoice();
            // Generous delay (1400ms) after splash closes so there is zero audio overlap
            setTimeout(() => {
              if (!hasSpokenGreetingRef.current) {
                hasSpokenGreetingRef.current = true;
                playRoomIntro('home', false);
              }
            }, 1400);
          }}
        />
      )}

      {/* 1. Contax360 Standard Header Bar with Live Radio Toggle, Mercury Retrograde & Live Station Ticker */}
      <Header
        currentRoom={currentRoom}
        onSelectRoom={handleSelectRoom}
        onStartTour={handleStartTour}
        isRadioPlaying={isRadioPlaying}
        radioStatusText={radioStatusText}
        onToggleRadio={handleToggleRadio}
        currentStationName={selectedStationName}
      />

      {/* 2. Active Page/Room */}
      <main className="flex-1 flex flex-col w-full">
        {currentRoom === 'home' && (
          <HomeRoom 
            onSelectRoom={handleSelectRoom} 
            onStartTour={handleStartTour} 
            onOpenExecutiveRoom={handleOpenExecutiveRoom}
          />
        )}

        {currentRoom === 'services' && (
          <ServicesRoom 
            onSelectRoom={handleSelectRoom} 
          />
        )}

        {currentRoom === 'about' && (
          <AboutRoom 
            onSelectRoom={handleSelectRoom} 
            onOpenExecutiveRoom={handleOpenExecutiveRoom}
          />
        )}

        {currentRoom === 'careers' && (
          <CareersRoom 
            onSelectRoom={handleSelectRoom} 
          />
        )}

        {currentRoom === 'contact' && (
          <ContactRoom 
            onSelectRoom={handleSelectRoom} 
          />
        )}

        {currentRoom === 'infomercial' && (
          <InfomercialRoom 
            onSelectRoom={handleSelectRoom} 
            onStartTour={handleStartTour} 
          />
        )}

        {currentRoom === 'radio' && (
          <RadioRoom 
            onSelectRoom={handleSelectRoom} 
            currentStationName={selectedStationName}
            isRadioPlaying={isRadioPlaying}
            onToggleRadio={handleToggleRadio}
            onSelectStation={(name, streamUrl) => {
              setSelectedStationName(name);
              if (globalRadioAudioRef.current) {
                globalRadioAudioRef.current.src = streamUrl;
                globalRadioAudioRef.current.play()
                  .then(() => {
                    setIsRadioPlaying(true);
                    setRadioStatusText('RADIO LIVE');
                  })
                  .catch(() => {});
              }
            }}
          />
        )}

        {currentRoom === 'jarvis' && (
          <JarvisRoom 
            onReturn={() => {
              handleSelectRoom('home');
            }} 
          />
        )}
      </main>

      {/* 3. Contax360 Standard Footer */}
      <Footer onSelectRoom={handleSelectRoom} />
    </div>
  );
}
