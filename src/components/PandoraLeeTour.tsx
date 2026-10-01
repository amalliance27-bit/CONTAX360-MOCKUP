import React, { useState, useEffect } from 'react';
import { 
  Bot, Sparkles, Send, X, Volume2, VolumeX, 
  Play, Pause, HardDrive, Database, RefreshCw, Key, Download, Loader2, CheckCircle2
} from 'lucide-react';
import { 
  audioCoordinator, 
  ROOM_INTRO_SCRIPTS, 
  ROOM_REVISIT_SCRIPTS, 
  CachedAudioEntry,
  MAIN_LOBBY_EVERGREEN_SCRIPT
} from '../utils/audioCoordinator';

interface PandoraMessage {
  role: 'pandora' | 'user';
  content: string;
  time: string;
}

interface PandoraLeeTourProps {
  currentRoom: string;
  onSelectRoom: (room: string) => void;
}

export const PandoraLeeTour: React.FC<PandoraLeeTourProps> = ({ currentRoom, onSelectRoom }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'room_intros' | 'chat'>('room_intros');
  const [messages, setMessages] = useState<PandoraMessage[]>([
    {
      role: 'pandora',
      content: "Welcome to Contax360 BPO Solutions! I am Pandora Lee, your virtual tour guide and brand ambassador. Explore our nearshore campus, browse walk-in career opportunities, or ask me any question about our services!",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [voiceMuted, setVoiceMuted] = useState(false);
  
  // Audio Caching State
  const [cachedEntries, setCachedEntries] = useState<Record<string, CachedAudioEntry>>({});
  const [isBatchCaching, setIsBatchCaching] = useState(false);
  const [batchProgress, setBatchProgress] = useState(0);
  const [playingRoomKey, setPlayingRoomKey] = useState<string | null>(null);
  const [downloadingKey, setDownloadingKey] = useState<string | null>(null);
  const [downloadSuccessKey, setDownloadSuccessKey] = useState<string | null>(null);

  // ElevenLabs Key in localStorage
  const [elevenApiKey, setElevenApiKey] = useState(() => localStorage.getItem('contax_eleven_key') || '');
  const [elevenVoiceId, setElevenVoiceId] = useState(() => localStorage.getItem('contax_eleven_voice') || '21m00Tcm4TlvDq8ikWAM');

  const refreshCacheList = () => {
    setCachedEntries(audioCoordinator.getAllCachedEntries());
  };

  useEffect(() => {
    refreshCacheList();
    const onCacheUpdated = () => refreshCacheList();
    const onSpeechEnd = () => setPlayingRoomKey(null);
    window.addEventListener('contax:cache-updated', onCacheUpdated);
    window.addEventListener('contax:speech-end', onSpeechEnd);
    return () => {
      window.removeEventListener('contax:cache-updated', onCacheUpdated);
      window.removeEventListener('contax:speech-end', onSpeechEnd);
    };
  }, []);

  const handleSaveApiKeys = () => {
    localStorage.setItem('contax_eleven_key', elevenApiKey.trim());
    localStorage.setItem('contax_eleven_voice', elevenVoiceId.trim());
    alert('Voice settings saved!');
  };

  const handleDownload = async (key: string, scriptText: string, filename: string) => {
    setDownloadingKey(key);
    try {
      // First ensure it's synthesized and downloaded
      const ok = await audioCoordinator.downloadClip(key, scriptText, filename);
      if (ok) {
        refreshCacheList();
        setDownloadSuccessKey(key);
        setTimeout(() => setDownloadSuccessKey(null), 3000);
      }
    } catch (e) {
      console.error('Download error:', e);
      // Fallback direct server download link
      const link = document.createElement('a');
      link.href = `/api/pandora/download/${key}`;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      setTimeout(() => document.body.removeChild(link), 1000);
    } finally {
      setDownloadingKey(null);
    }
  };

  const speakRoomIntro = (roomKey: string, isRevisit = false) => {
    const item = ROOM_INTRO_SCRIPTS[roomKey];
    const revisitItem = ROOM_REVISIT_SCRIPTS[roomKey];
    const scriptText = isRevisit 
      ? (revisitItem?.text || `${roomKey}.`) 
      : (roomKey === 'home' ? MAIN_LOBBY_EVERGREEN_SCRIPT : (item?.text || 'Welcome to Contax Three-Sixty.'));
    const title = isRevisit 
      ? (revisitItem?.title || `${roomKey} (Revisit)`) 
      : (item?.title || roomKey);
    const cacheKey = isRevisit ? `revisit_${roomKey}` : roomKey;

    if (playingRoomKey === cacheKey) {
      audioCoordinator.stopAllVoice();
      setPlayingRoomKey(null);
      return;
    }

    setPlayingRoomKey(cacheKey);
    audioCoordinator.playVoice(scriptText, {
      cacheKey,
      title,
      onStart: () => setPlayingRoomKey(cacheKey),
      onEnd: () => setPlayingRoomKey(null),
      pauseRadioDelayMs: 10000
    });
  };

  const handlePreCacheAllClips = async () => {
    setIsBatchCaching(true);
    setBatchProgress(5);
    
    const fullKeys = Object.keys(ROOM_INTRO_SCRIPTS);
    const revisitKeys = Object.keys(ROOM_REVISIT_SCRIPTS);
    const totalItems = fullKeys.length + revisitKeys.length;
    let completed = 0;

    // 1. Cache Full Intro Clips
    for (let i = 0; i < fullKeys.length; i++) {
      const key = fullKeys[i];
      const item = ROOM_INTRO_SCRIPTS[key];
      const textToUse = key === 'home' ? MAIN_LOBBY_EVERGREEN_SCRIPT : item.text;
      
      try {
        const apiKey = localStorage.getItem('contax_eleven_key') || '';
        const voiceId = localStorage.getItem('contax_eleven_voice') || '21m00Tcm4TlvDq8ikWAM';

        const res = await fetch('/api/pandora/tts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: textToUse,
            cacheKey: key,
            title: item.title,
            apiKey: apiKey.trim(),
            voiceId: voiceId.trim()
          })
        });

        if (res.ok) {
          const data = await res.json();
          if (data.audio) {
            audioCoordinator.saveAudioToCache({
              key,
              title: item.title,
              text: textToUse,
              dataUri: `data:${data.mimeType || 'audio/wav'};base64,${data.audio}`,
              mimeType: data.mimeType || 'audio/wav',
              provider: data.provider || 'gemini',
              timestamp: Date.now()
            });
          }
        }
      } catch (err) {
        console.warn(`Failed to cache ${key}:`, err);
      }
      completed++;
      setBatchProgress(Math.round((completed / totalItems) * 100));
    }

    // 2. Cache Short Revisit Clips
    for (let i = 0; i < revisitKeys.length; i++) {
      const key = revisitKeys[i];
      const item = ROOM_REVISIT_SCRIPTS[key];
      const cacheKey = `revisit_${key}`;
      
      try {
        const apiKey = localStorage.getItem('contax_eleven_key') || '';
        const voiceId = localStorage.getItem('contax_eleven_voice') || '21m00Tcm4TlvDq8ikWAM';

        const res = await fetch('/api/pandora/tts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: item.text,
            cacheKey: cacheKey,
            title: item.title,
            apiKey: apiKey.trim(),
            voiceId: voiceId.trim()
          })
        });

        if (res.ok) {
          const data = await res.json();
          if (data.audio) {
            audioCoordinator.saveAudioToCache({
              key: cacheKey,
              title: item.title,
              text: item.text,
              dataUri: `data:${data.mimeType || 'audio/wav'};base64,${data.audio}`,
              mimeType: data.mimeType || 'audio/wav',
              provider: data.provider || 'gemini',
              timestamp: Date.now()
            });
          }
        }
      } catch (err) {
        console.warn(`Failed to cache revisit for ${key}:`, err);
      }
      completed++;
      setBatchProgress(Math.round((completed / totalItems) * 100));
    }

    refreshCacheList();
    setIsBatchCaching(false);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userText = inputMessage.trim();
    setInputMessage('');

    const newMsg: PandoraMessage = {
      role: 'user',
      content: userText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMsg]);
    setIsLoading(true);

    try {
      const historyPayload = messages.map(m => ({
        role: m.role === 'pandora' ? 'model' : 'user',
        content: m.content
      }));

      const res = await fetch('/api/pandora/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userText,
          conversationHistory: historyPayload
        })
      });

      const data = await res.json();
      const reply = data.reply || "I'm here to guide you through Contax360's BPO and KPO solutions!";

      setMessages(prev => [
        ...prev,
        {
          role: 'pandora',
          content: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);

      if (!voiceMuted) {
        audioCoordinator.playVoice(reply, {
          cacheKey: `chat_${Date.now()}`,
          title: 'Chat Reply',
          pauseRadioDelayMs: 10000
        });
      }

      if (data.suggestedSection) {
        if (data.suggestedSection === 'hiring') onSelectRoom('careers');
        else if (data.suggestedSection === 'services') onSelectRoom('services');
        else if (data.suggestedSection === 'infomercial') onSelectRoom('infomercial');
        else if (data.suggestedSection === 'contact') onSelectRoom('contact');
        else if (data.suggestedSection === 'team') onSelectRoom('about');
      }
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          role: 'pandora',
          content: "Contax360 BPO Solutions is a woman and minority-owned leader based in Montego Bay, Jamaica & Florida, providing world-class customer care, back-office, IT, and security operations!",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Assistant Launcher Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          data-assistant-btn
          onClick={() => {
            setIsOpen(!isOpen);
            window.dispatchEvent(new CustomEvent('contax:tour-state', { detail: { active: !isOpen } }));
          }}
          className="group flex items-center gap-3 px-4 py-2.5 rounded-full bg-[#082255] hover:bg-[#0a2b6c] text-white shadow-2xl transition active:scale-95 border border-[#144294]"
        >
          <div className="relative w-9 h-9 rounded-full bg-[#2563eb] flex items-center justify-center shrink-0 shadow-md">
            <Bot className="w-5 h-5 text-white" />
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#10b981] ring-2 ring-[#082255]" />
          </div>
          <div className="text-left pr-2">
            <div className="text-sm font-extrabold text-white font-raleway leading-tight">
              Contax360 Assistant
            </div>
            <div className="text-[11px] text-blue-200 font-work font-medium leading-tight">
              Pandora Lee • AI Host
            </div>
          </div>
        </button>
      </div>

      {/* Slide-over Drawer / Modal Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm transition-opacity animate-fadeIn">
          <div 
            className="w-full max-w-lg bg-slate-900 text-white h-full flex flex-col shadow-2xl border-l border-blue-800/60"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-4 bg-[#0a1636] border-b border-blue-900/60 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center text-white shadow-md">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base font-raleway flex items-center gap-1.5 text-white">
                    Pandora Lee
                    <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-mono">
                      Voice & Scripts
                    </span>
                  </h3>
                  <p className="text-[11px] text-blue-200">
                    Contax360 Virtual Ambassador & Audio Hub
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const next = !voiceMuted;
                    setVoiceMuted(next);
                    if (next) audioCoordinator.stopAllVoice();
                  }}
                  className={`p-2 rounded-xl transition ${
                    voiceMuted ? 'bg-rose-500/20 text-rose-300' : 'bg-blue-950 text-cyan-300'
                  }`}
                  title={voiceMuted ? 'Unmute Pandora Voice' : 'Mute Pandora Voice'}
                >
                  {voiceMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    audioCoordinator.stopAllVoice();
                    window.dispatchEvent(new CustomEvent('contax:tour-state', { detail: { active: false } }));
                  }}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-slate-800 bg-slate-950 p-1.5 text-xs font-semibold">
              <button
                onClick={() => setActiveTab('room_intros')}
                className={`flex-1 py-2 rounded-xl transition flex items-center justify-center gap-1.5 ${
                  activeTab === 'room_intros' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                <HardDrive className="w-3.5 h-3.5" />
                <span>Room Showcase Scripts & MP3s</span>
              </button>
              <button
                onClick={() => setActiveTab('chat')}
                className={`flex-1 py-2 rounded-xl transition flex items-center justify-center gap-1.5 ${
                  activeTab === 'chat' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Bot className="w-3.5 h-3.5" />
                <span>Interactive AI Chat</span>
              </button>
            </div>

            {/* TAB 1: ALL ROOM SHOWCASE SCRIPTS & MP3 STUDIO */}
            {activeTab === 'room_intros' && (
              <div className="p-4 space-y-4 flex-1 overflow-y-auto">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-950 to-slate-950 border border-blue-900/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-white font-raleway flex items-center gap-1.5">
                        <HardDrive className="w-4 h-4 text-cyan-400" />
                        Room Intros & Revisit Voice Studio
                      </h4>
                      <p className="text-[11px] text-slate-300 mt-0.5">
                        First entry plays full room overview. Returning to visited rooms plays short title greeting. Download long & short MP3 audio files below.
                      </p>
                    </div>
                  </div>

                  <button
                    disabled={isBatchCaching}
                    onClick={handlePreCacheAllClips}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs uppercase tracking-wider shadow flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isBatchCaching ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Pre-Caching Audio ({batchProgress}%)...</span>
                      </>
                    ) : (
                      <>
                        <Database className="w-3.5 h-3.5" />
                        <span>Pre-Generate & Save All Clips (Full + Revisit)</span>
                      </>
                    )}
                  </button>
                </div>

                {/* All 7 Rooms Scripts List */}
                <div className="space-y-4">
                  <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                    <span>All Showcase Rooms (Full Overview & Short Revisit)</span>
                    <span className="text-emerald-400 font-bold">{Object.keys(cachedEntries).length} Audio Clips In Cache</span>
                  </div>

                  {Object.entries(ROOM_INTRO_SCRIPTS).map(([key, item]) => {
                    const isCachedFull = !!cachedEntries[key];
                    const revisitItem = ROOM_REVISIT_SCRIPTS[key];
                    const revisitKey = `revisit_${key}`;
                    const isCachedRevisit = !!cachedEntries[revisitKey];
                    const isPlayingFull = playingRoomKey === key;
                    const isPlayingRevisit = playingRoomKey === revisitKey;
                    const isCurrent = currentRoom === key;

                    const effectiveScriptText = key === 'home' ? MAIN_LOBBY_EVERGREEN_SCRIPT : item.text;

                    return (
                      <div
                        key={key}
                        className={`p-3.5 rounded-2xl border transition ${
                          isCurrent 
                            ? 'bg-blue-950/60 border-blue-500/80 shadow-md' 
                            : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3 text-xs">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-white text-sm">{item.title}</span>
                              {isCachedFull ? (
                                <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[9px] font-mono font-bold shrink-0">
                                  FULL SAVED
                                </span>
                              ) : null}
                              {isCachedRevisit ? (
                                <span className="px-1.5 py-0.5 rounded-full bg-blue-500/20 text-cyan-300 text-[9px] font-mono font-bold shrink-0">
                                  REVISIT SAVED
                                </span>
                              ) : null}
                            </div>
                            
                            {/* Full Intro Box */}
                            <div className="mt-2 bg-slate-900/70 p-2.5 rounded-xl border border-slate-800/80">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase">
                                  {key === 'home' ? 'Evergreen Master Template (Static):' : '1st Visit Script:'}
                                </span>
                              </div>
                              <p className="text-xs text-slate-200 font-work leading-relaxed italic">
                                "{effectiveScriptText}"
                              </p>
                            </div>

                            {/* Revisit Intro Box */}
                            {revisitItem && (
                              <div className="mt-2 bg-slate-900/40 p-2 rounded-lg border border-slate-800/60 flex items-center justify-between">
                                <span className="text-[10px] font-mono text-amber-400 font-bold">Revisit Script:</span>
                                <span className="text-xs text-amber-200 font-bold italic">"{revisitItem.text}"</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Action Buttons: Full Intro Play, Revisit Play & Download */}
                        <div className="flex flex-wrap items-center justify-between gap-2 mt-3 pt-2.5 border-t border-slate-800/80">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                onSelectRoom(key);
                                speakRoomIntro(key, false);
                              }}
                              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                                isPlayingFull 
                                  ? 'bg-amber-500 text-slate-950' 
                                  : 'bg-blue-600 hover:bg-blue-500 text-white'
                              }`}
                            >
                              {isPlayingFull ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                              <span>Full Intro</span>
                            </button>

                            {revisitItem && (
                              <button
                                onClick={() => {
                                  onSelectRoom(key);
                                  speakRoomIntro(key, true);
                                }}
                                className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
                                  isPlayingRevisit 
                                    ? 'bg-amber-500 text-slate-950' 
                                    : 'bg-slate-800 hover:bg-slate-700 text-cyan-300'
                                }`}
                              >
                                {isPlayingRevisit ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 fill-current" />}
                                <span>Revisit ("{revisitItem.text}")</span>
                              </button>
                            )}
                          </div>

                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => handleDownload(key, effectiveScriptText, `${key}_long_overview.mp3`)}
                              disabled={downloadingKey === key}
                              title="Download Full Intro Audio MP3"
                              className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-emerald-600/30 text-emerald-300 hover:text-emerald-200 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1.5 transition disabled:opacity-50"
                            >
                              {downloadingKey === key ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-400" />
                              ) : downloadSuccessKey === key ? (
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                              ) : (
                                <Download className="w-3.5 h-3.5 text-emerald-400" />
                              )}
                              <span>{downloadingKey === key ? 'Generating...' : downloadSuccessKey === key ? 'Downloaded!' : 'Download MP3'}</span>
                            </button>
                            
                            {revisitItem && (
                              <button
                                onClick={() => handleDownload(revisitKey, revisitItem.text, `${key}_short_revisit.mp3`)}
                                disabled={downloadingKey === revisitKey}
                                title="Download Short Revisit Audio MP3"
                                className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-amber-600/30 text-amber-300 hover:text-amber-200 border border-amber-500/30 text-xs font-semibold flex items-center gap-1.5 transition disabled:opacity-50"
                              >
                                {downloadingKey === revisitKey ? (
                                  <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />
                                ) : (
                                  <Download className="w-3.5 h-3.5 text-amber-400" />
                                )}
                                <span>{downloadingKey === revisitKey ? 'Generating...' : 'Short MP3'}</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 2: AI CHAT VIEW */}
            {activeTab === 'chat' && (
              <>
                <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs font-sans">
                  {messages.map((m, idx) => (
                    <div
                      key={idx}
                      className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
                    >
                      <div className="flex items-center gap-1.5 mb-1 px-1">
                        <span className="text-[10px] font-bold text-slate-400">
                          {m.role === 'user' ? 'You' : 'Pandora Lee'}
                        </span>
                        <span className="text-[9px] text-slate-500">{m.time}</span>
                      </div>
                      <div
                        className={`p-3.5 rounded-2xl max-w-[85%] leading-relaxed ${
                          m.role === 'user'
                            ? 'bg-blue-600 text-white rounded-br-none shadow-md'
                            : 'bg-slate-800 text-slate-100 rounded-bl-none border border-slate-700'
                        }`}
                      >
                        {m.content}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex items-center gap-2 text-slate-400 text-xs italic p-2">
                      <Bot className="w-4 h-4 animate-spin text-cyan-400" />
                      <span>Pandora is drafting an answer...</span>
                    </div>
                  )}
                </div>

                <form onSubmit={handleSendMessage} className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Ask about nearshore BPO, walk-ins, ROI savings..."
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !inputMessage.trim()}
                    className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};
