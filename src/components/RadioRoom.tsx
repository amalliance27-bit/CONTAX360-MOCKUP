import React, { useState, useRef, useEffect } from 'react';
import { 
  Radio, Play, Pause, Volume2, VolumeX, 
  MapPin, Disc, Music, Globe, Flame, Wifi, Sliders,
  CloudRain, Wind, Waves, Sparkles, Moon, Sun, Volume1
} from 'lucide-react';
import { rainSoundscape } from '../utils/rainSoundscape';

export interface Station {
  id: string;
  name: string;
  city: string;
  country: string;
  regionCode: string;
  genre: string;
  freq: string;
  accentColor: string;
  description: string;
  streamUrl: string;
}

export const STATIONS: Station[] = [
  // 1. Washington D.C. / Maryland (Howard University - player.whur.com live stream) [DEFAULT]
  {
    id: 'whur-dc',
    name: 'WHUR-FM 96.3 • Howard University',
    city: 'Washington, D.C. / Maryland',
    country: 'USA / Maryland',
    regionCode: 'DMV',
    genre: 'Urban Adult Contemporary, R&B, Soul & Howard University Broadcast',
    freq: '96.3 FM',
    accentColor: '#3b82f6',
    description: 'Howard University iconic radio station (player.whur.com) broadcasting live for Maryland and the DMV with world-class R&B, soul, and adult contemporary rhythms.',
    streamUrl: 'https://ais-sa1.streamon.fm/7028_48k.aac'
  },
  // 2. Mello FM 88.1 • Montego Bay, Jamaica (Contax360 Global Headquarters City)
  {
    id: 'mello-mobay',
    name: 'Mello FM 88.1 • Montego Bay',
    city: 'Montego Bay, St. James',
    country: 'Jamaica',
    regionCode: 'JAM',
    genre: 'Caribbean Hits, Reggae, Soul & Montego Bay Community Radio',
    freq: '88.1 FM',
    accentColor: '#10b981',
    description: 'Broadcasting live from Montego Bay, St. James, Jamaica — home of Contax360 BPO world headquarters at 1 Mangrove Way, Freeport — playing the sweetest reggae rhythms, Caribbean hits, and authentic island vibes.',
    streamUrl: 'https://usa19.fastcast4u.com:7430/;'
  },
  // 3. Irie FM 107.5 • Roots, Rock & Reggae (Jamaica)
  {
    id: 'irie-fm',
    name: 'Irie FM 107.5 • Roots Reggae',
    city: 'Ocho Rios / Montego Bay',
    country: 'Jamaica',
    regionCode: 'JAM',
    genre: 'Roots Reggae, Dub, Dancehall & Caribbean Culture',
    freq: '107.5 FM',
    accentColor: '#22c55e',
    description: 'Jamaica’s premier authentic reggae, dub, and cultural broadcasting giant connecting the island to global listeners.',
    streamUrl: 'https://stream.iriefm.net:8008/stream'
  },
  // 4. Alpha Boys School Radio • Kingston & Montego Bay
  {
    id: 'alphaboys-jam',
    name: 'Alpha Boys Radio • Jamaican Sound Heritage',
    city: 'Kingston / Montego Bay',
    country: 'Jamaica',
    regionCode: 'JAM',
    genre: 'Classic Jamaican Ska, Rocksteady, Roots & Dub',
    freq: 'Online HD',
    accentColor: '#eab308',
    description: 'Direct live stream celebrating the cradle of Jamaican music heritage, featuring classic rocksteady, ska, and vintage reggae.',
    streamUrl: 'https://alphaboys-live.streamguys1.com/alphaboys.aac'
  },
  // 5. Badda Jam Radio • Montego Bay Dancehall
  {
    id: 'baddajam-jam',
    name: 'Badda Jam Radio • Montego Bay Dancehall',
    city: 'Montego Bay / Kingston',
    country: 'Jamaica',
    regionCode: 'JAM',
    genre: 'Modern Dancehall, Island Reggae & Caribbean Heat',
    freq: '102.3 FM',
    accentColor: '#f59e0b',
    description: 'High-energy Jamaican dancehall and Caribbean beats vibrating live across the western Jamaican corridor.',
    streamUrl: 'https://dc2.serverse.com/stream/baddajam'
  },
  // 6. Montego Bay Reggae Lounge • Freeport Coastal Soundscape
  {
    id: 'caribbean-vibes',
    name: 'Montego Bay Reggae Lounge • Jamaica Live',
    city: 'Montego Bay Freeport',
    country: 'Jamaica',
    regionCode: 'JAM',
    genre: 'Lover’s Rock, Smooth Island Reggae & Tropical Lounge',
    freq: 'Live HD',
    accentColor: '#06b6d4',
    description: 'Relaxing reggae vibes and warm island rhythms reflecting the seaside ambience of Contax360 at 1 Mangrove Way, Montego Bay Freeport.',
    streamUrl: 'https://c13.radioboss.fm:18195/stream'
  },
  // 7. WHUR HD2 / Urban Contemporary
  {
    id: 'whur-hd2',
    name: 'WHUR-FM 96.3 HD2 • Howard University Experience',
    city: 'Washington, D.C. / Maryland',
    country: 'USA / Maryland',
    regionCode: 'DMV',
    genre: 'Classic Soul, Motown, R&B & Howard University Culture',
    freq: '96.3 HD2',
    accentColor: '#8b5cf6',
    description: 'Exclusive Howard University companion digital broadcast featuring uninterrupted classic soul, R&B, and DMV community radio.',
    streamUrl: 'https://ais-sa1.streamon.fm/7043_48k.aac'
  },
  // 8. Maryland / DMV Flagship (WKYS 93.9 FM)
  {
    id: 'wkys-md',
    name: 'WKYS-FM 93.9 • Maryland / DMV',
    city: 'Silver Spring / Baltimore / DMV',
    country: 'USA / Maryland',
    regionCode: 'MD',
    genre: 'Urban Contemporary, R&B & DMV Hits',
    freq: '93.9 FM',
    accentColor: '#06b6d4',
    description: 'The DMV and Maryland flagship station for today’s hottest R&B, Hip-Hop, and community culture.',
    streamUrl: 'https://15693.live.streamtheworld.com:443/WKYSFM.mp3'
  }
];

export const RadioRoom: React.FC<{ 
  onSelectRoom: (room: string) => void;
  currentStationName?: string;
  onSelectStation?: (stationName: string, streamUrl: string) => void;
  isRadioPlaying?: boolean;
  onToggleRadio?: () => void;
}> = ({ onSelectRoom, currentStationName, onSelectStation, isRadioPlaying, onToggleRadio }) => {
  const [selectedStation, setSelectedStation] = useState<Station>(() => {
    if (currentStationName) {
      const found = STATIONS.find(s => s.name === currentStationName || currentStationName.includes(s.name) || currentStationName.includes(s.freq));
      if (found) return found;
    }
    return STATIONS[0];
  });
  const [localPlaying, setLocalPlaying] = useState(false);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [activeRegion, setActiveRegion] = useState<'ALL' | 'JAMAICA' | 'DMV' | 'MEDITATION'>('ALL');
  const [audioFreq, setAudioFreq] = useState<number[]>([35, 60, 45, 80, 65, 90, 70, 50, 85, 40, 75, 55, 65, 80, 45]);

  // Rain & Meditation Soundscape state
  const [isSoundscapePlaying, setIsSoundscapePlaying] = useState(false);
  const [rainVol, setRainVol] = useState(0.65);
  const [oceanVol, setOceanVol] = useState(0.45);
  const [meditationVol, setMeditationVol] = useState(0.55);
  const [thunderVol, setThunderVol] = useState(0.25);
  const [activePreset, setActivePreset] = useState<string | null>(null);

  // Sync selectedStation if parent currentStationName changes
  useEffect(() => {
    if (currentStationName) {
      const found = STATIONS.find(s => s.name === currentStationName || currentStationName.includes(s.name) || currentStationName.includes(s.freq));
      if (found && found.id !== selectedStation.id) {
        setSelectedStation(found);
      }
    }
  }, [currentStationName]);

  const isPlaying = typeof isRadioPlaying === 'boolean' ? isRadioPlaying : localPlaying;

  // Equalizer visualizer effect
  useEffect(() => {
    if (isPlaying || isSoundscapePlaying) {
      const interval = setInterval(() => {
        setAudioFreq(prev => prev.map(() => Math.floor(Math.random() * 75) + 20));
      }, 120);
      return () => clearInterval(interval);
    } else {
      setAudioFreq([10, 15, 10, 20, 15, 10, 20, 15, 10, 15, 10, 15, 10, 15, 10]);
    }
  }, [isPlaying, isSoundscapePlaying]);

  // Soundscape volume sync
  useEffect(() => {
    rainSoundscape.setRainLevel(rainVol);
    rainSoundscape.setOceanLevel(oceanVol);
    rainSoundscape.setMeditationLevel(meditationVol);
    rainSoundscape.setThunderLevel(thunderVol);
  }, [rainVol, oceanVol, meditationVol, thunderVol]);

  const handlePlayToggle = () => {
    if (onToggleRadio) {
      onToggleRadio();
    } else {
      setLocalPlaying(!localPlaying);
    }
  };

  const handleStationChange = (station: Station) => {
    setSelectedStation(station);
    if (onSelectStation) {
      onSelectStation(station.name, station.streamUrl);
    }
  };

  const handleSoundscapeToggle = () => {
    if (isSoundscapePlaying) {
      rainSoundscape.stop();
      setIsSoundscapePlaying(false);
      setActivePreset(null);
    } else {
      rainSoundscape.start();
      setIsSoundscapePlaying(true);
      setActivePreset('custom');
    }
  };

  const applyPreset = (preset: 'rain' | 'ocean' | 'meditation' | 'storm') => {
    if (!isSoundscapePlaying) {
      rainSoundscape.start();
      setIsSoundscapePlaying(true);
    }
    setActivePreset(preset);

    switch (preset) {
      case 'rain':
        setRainVol(0.85);
        setOceanVol(0.15);
        setMeditationVol(0.35);
        setThunderVol(0.1);
        break;
      case 'ocean':
        setRainVol(0.2);
        setOceanVol(0.9);
        setMeditationVol(0.4);
        setThunderVol(0.0);
        break;
      case 'meditation':
        setRainVol(0.3);
        setOceanVol(0.3);
        setMeditationVol(0.95);
        setThunderVol(0.0);
        break;
      case 'storm':
        setRainVol(0.95);
        setOceanVol(0.4);
        setMeditationVol(0.2);
        setThunderVol(0.75);
        break;
    }
  };

  const filteredStations = STATIONS.filter(st => {
    if (activeRegion === 'DMV') return st.regionCode === 'DMV' || st.regionCode === 'MD' || st.country.includes('Maryland');
    if (activeRegion === 'JAMAICA') return st.country === 'Jamaica' || st.regionCode === 'JAM';
    return true;
  });

  return (
    <div className="flex flex-col w-full bg-gradient-to-b from-[#070b16] via-[#0f1129] to-[#070b16] text-white min-h-screen">
      {/* 1. HERO HEADER: Sleek Obsidian & Purple Lounge */}
      <section className="relative px-4 pt-6 sm:pt-10 pb-6 text-center overflow-hidden border-b border-purple-950/60">
        <div className="max-w-4xl mx-auto space-y-2.5 relative z-10">
          <p className="text-xs sm:text-sm font-mono uppercase tracking-[0.22em] text-purple-300 font-bold flex items-center justify-center gap-2">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>Contax360 Live Radio & Soundscape Sanctuary</span>
          </p>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-raleway tracking-tight text-white">
            Radio & Meditation Lounge
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto font-work leading-relaxed">
            Direct high-definition audio broadcasts connecting our <strong className="text-emerald-300">Montego Bay, Jamaica World Headquarters</strong> alongside <strong className="text-cyan-300">WHUR 96.3 FM Howard University</strong> for our Maryland executive office, plus ambient <strong className="text-purple-300">528Hz Meditation & Tropical Rain</strong>.
          </p>
        </div>
      </section>

      {/* 2. MAIN RADIO INTERFACE */}
      <main className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* TOP STATION SELECTOR PILLS */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => setActiveRegion('ALL')}
            className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold transition border ${
              activeRegion === 'ALL'
                ? 'bg-blue-600 text-white border-blue-400 shadow-[0_0_12px_rgba(37,99,235,0.4)]'
                : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            ALL STATIONS ({STATIONS.length})
          </button>
          <button
            onClick={() => setActiveRegion('JAMAICA')}
            className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold transition border flex items-center gap-1.5 ${
              activeRegion === 'JAMAICA'
                ? 'bg-emerald-600 text-white border-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.4)]'
                : 'bg-slate-900/80 text-emerald-400 border-emerald-800/60 hover:text-emerald-200'
            }`}
          >
            <span>MONTEGO BAY & JAMAICA ({STATIONS.filter(s => s.country === 'Jamaica' || s.regionCode === 'JAM').length})</span>
          </button>
          <button
            onClick={() => setActiveRegion('DMV')}
            className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold transition border ${
              activeRegion === 'DMV'
                ? 'bg-blue-600 text-white border-blue-400 shadow-[0_0_12px_rgba(37,99,235,0.4)]'
                : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            WHUR 96.3 HOWARD UNIVERSITY (MARYLAND / DMV)
          </button>
          <button
            onClick={() => setActiveRegion('MEDITATION')}
            className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold transition border ${
              activeRegion === 'MEDITATION'
                ? 'bg-purple-600 text-white border-purple-400 shadow-[0_0_12px_rgba(147,51,234,0.4)]'
                : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            RAIN & 528Hz MEDITATION
          </button>
        </div>

        {/* PRIMARY PLAYER GLASS CARD */}
        <div className="bg-slate-900/80 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.6)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Station Art & Frequency Disc */}
            <div className="lg:col-span-5 flex flex-col items-center text-center space-y-4">
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full p-2 bg-gradient-to-tr from-purple-600 via-blue-600 to-cyan-400 shadow-2xl flex items-center justify-center">
                <div className={`w-full h-full rounded-full bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden ${
                  isPlaying ? 'animate-[spin_16s_linear_infinite]' : ''
                }`}>
                  <Radio className="w-10 h-10 text-cyan-400 mb-1" />
                  <span className="text-xl font-black font-raleway text-white">{selectedStation.freq}</span>
                  <span className="text-[10px] font-mono text-cyan-300 uppercase tracking-widest">{selectedStation.country}</span>
                </div>
              </div>

              {/* Status Badge */}
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${isPlaying ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}`} />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                  {isPlaying ? 'BROADCASTING LIVE' : 'STREAM ON STANDBY'}
                </span>
              </div>
            </div>

            {/* Right: Station Info, Visualizer & Controls */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-1 text-left">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-blue-500/20 text-cyan-300 text-[11px] font-mono font-bold">
                    {selectedStation.freq}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {selectedStation.city}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-raleway text-white">
                  {selectedStation.name}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 font-work leading-relaxed">
                  {selectedStation.description}
                </p>
              </div>

              {/* Live Audio Visualizer Bars */}
              <div className="p-4 rounded-2xl bg-black/40 border border-white/5 flex items-end justify-between h-20 gap-1.5 px-6">
                {audioFreq.map((height, i) => (
                  <div 
                    key={i} 
                    className="flex-1 bg-gradient-to-t from-blue-600 via-cyan-400 to-purple-400 rounded-full transition-all duration-100"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>

              {/* Playback Controls & Volume Slider */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <button
                  onClick={handlePlayToggle}
                  className={`px-8 py-4 rounded-2xl flex items-center gap-3 font-bold text-sm tracking-wider uppercase transition shadow-xl ${
                    isPlaying 
                      ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20' 
                      : 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-blue-500/30'
                  }`}
                >
                  {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
                  <span>{isPlaying ? 'PAUSE BROADCAST' : 'PLAY LIVE STREAM'}</span>
                </button>

                {/* Volume slider */}
                <div className="flex items-center gap-3 bg-black/30 px-4 py-2.5 rounded-2xl border border-white/5">
                  <button 
                    onClick={() => {
                      const nextMute = !isMuted;
                      setIsMuted(nextMute);
                      window.dispatchEvent(new CustomEvent('contax:radio-volume', { detail: { volume: nextMute ? 0 : volume } }));
                    }}
                    className="text-slate-400 hover:text-white"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => {
                      const v = parseFloat(e.target.value);
                      setVolume(v);
                      setIsMuted(false);
                      window.dispatchEvent(new CustomEvent('contax:radio-volume', { detail: { volume: v } }));
                    }}
                    className="w-24 accent-cyan-400 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. STATIONS GRID SELECTOR */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold font-raleway text-white flex items-center gap-2">
            <Globe className="w-4 h-4 text-cyan-400" />
            <span>Select Channel / Region</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredStations.map((station) => {
              const isCurrent = selectedStation.id === station.id;
              return (
                <button
                  key={station.id}
                  onClick={() => handleStationChange(station)}
                  className={`p-5 rounded-2xl text-left transition flex items-center gap-4 border ${
                    isCurrent
                      ? 'bg-blue-600/20 border-cyan-400/60 shadow-[0_0_20px_rgba(6,182,212,0.2)]'
                      : 'bg-slate-900/60 hover:bg-slate-900/90 border-white/5'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                    isCurrent ? 'bg-cyan-400 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'
                  }`}>
                    {isCurrent && isPlaying ? <Disc className="w-6 h-6 animate-spin" /> : <Radio className="w-5 h-5" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-cyan-400 font-bold">{station.freq}</span>
                      <span className="text-[10px] font-mono text-slate-400 uppercase">{station.city}</span>
                    </div>
                    <div className="text-sm font-bold text-white truncate font-raleway">{station.name}</div>
                    <div className="text-xs text-slate-400 truncate font-work">{station.genre}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. MEDITATION & TROPICAL SOUNDSCAPE SUITE */}
        <div className="bg-slate-900/60 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 border border-purple-500/20 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-purple-400 uppercase font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Deep Focus & Meditation Soundscapes</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-raleway text-white">
                Tropical Rain, Ocean & 528Hz Solfeggio Sanctuary
              </h3>
            </div>

            <button
              onClick={handleSoundscapeToggle}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs font-mono uppercase tracking-wider transition ${
                isSoundscapePlaying
                  ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(147,51,234,0.4)]'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
              }`}
            >
              {isSoundscapePlaying ? 'PAUSE SOUNDSCAPES' : 'START SOUNDSCAPES'}
            </button>
          </div>

          {/* Quick Presets */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button
              onClick={() => applyPreset('rain')}
              className={`p-3 rounded-xl border text-center transition ${
                activePreset === 'rain'
                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                  : 'bg-black/30 border-white/5 text-slate-400 hover:text-white'
              }`}
            >
              <CloudRain className="w-4 h-4 mx-auto mb-1 text-cyan-400" />
              <div className="text-xs font-bold font-mono">TROPICAL RAIN</div>
            </button>

            <button
              onClick={() => applyPreset('ocean')}
              className={`p-3 rounded-xl border text-center transition ${
                activePreset === 'ocean'
                  ? 'bg-blue-500/20 border-blue-400 text-blue-300'
                  : 'bg-black/30 border-white/5 text-slate-400 hover:text-white'
              }`}
            >
              <Waves className="w-4 h-4 mx-auto mb-1 text-blue-400" />
              <div className="text-xs font-bold font-mono">CARIBBEAN OCEAN</div>
            </button>

            <button
              onClick={() => applyPreset('meditation')}
              className={`p-3 rounded-xl border text-center transition ${
                activePreset === 'meditation'
                  ? 'bg-purple-500/20 border-purple-400 text-purple-300'
                  : 'bg-black/30 border-white/5 text-slate-400 hover:text-white'
              }`}
            >
              <Moon className="w-4 h-4 mx-auto mb-1 text-purple-400" />
              <div className="text-xs font-bold font-mono">528Hz MEDITATION</div>
            </button>

            <button
              onClick={() => applyPreset('storm')}
              className={`p-3 rounded-xl border text-center transition ${
                activePreset === 'storm'
                  ? 'bg-indigo-500/20 border-indigo-400 text-indigo-300'
                  : 'bg-black/30 border-white/5 text-slate-400 hover:text-white'
              }`}
            >
              <Wind className="w-4 h-4 mx-auto mb-1 text-indigo-400" />
              <div className="text-xs font-bold font-mono">THUNDER STORM</div>
            </button>
          </div>

          {/* Soundscape Faders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            <div className="p-3 bg-black/20 rounded-xl space-y-2 border border-white/5">
              <div className="flex justify-between text-xs font-mono text-slate-400">
                <span>Rain Sound</span>
                <span>{Math.round(rainVol * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={rainVol}
                onChange={(e) => setRainVol(parseFloat(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            <div className="p-3 bg-black/20 rounded-xl space-y-2 border border-white/5">
              <div className="flex justify-between text-xs font-mono text-slate-400">
                <span>Ocean Waves</span>
                <span>{Math.round(oceanVol * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={oceanVol}
                onChange={(e) => setOceanVol(parseFloat(e.target.value))}
                className="w-full accent-blue-400 cursor-pointer"
              />
            </div>

            <div className="p-3 bg-black/20 rounded-xl space-y-2 border border-white/5">
              <div className="flex justify-between text-xs font-mono text-slate-400">
                <span>528Hz Sine</span>
                <span>{Math.round(meditationVol * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={meditationVol}
                onChange={(e) => setMeditationVol(parseFloat(e.target.value))}
                className="w-full accent-purple-400 cursor-pointer"
              />
            </div>

            <div className="p-3 bg-black/20 rounded-xl space-y-2 border border-white/5">
              <div className="flex justify-between text-xs font-mono text-slate-400">
                <span>Thunder Rumble</span>
                <span>{Math.round(thunderVol * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={thunderVol}
                onChange={(e) => setThunderVol(parseFloat(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
