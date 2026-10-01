// Web Audio API Ambient Rain, Ocean Waves & 528Hz Meditation Generator
// 100% Client-side, ultra-low CPU, zero network bandwidth, infinite uninterrupted playback

class RainSoundscapeEngine {
  private ctx: AudioContext | null = null;
  private isRunning: boolean = false;

  // Nodes
  private masterGain: GainNode | null = null;
  private rainGain: GainNode | null = null;
  private oceanGain: GainNode | null = null;
  private meditationGain: GainNode | null = null;
  private thunderGain: GainNode | null = null;

  // Generators & intervals
  private rainNoiseNode: AudioBufferSourceNode | null = null;
  private oceanNoiseNode: AudioBufferSourceNode | null = null;
  private thunderInterval: number | null = null;
  private oscillators: OscillatorNode[] = [];

  // Volumes (0.0 to 1.0)
  public rainVolume: number = 0.6;
  public oceanVolume: number = 0.4;
  public meditationVolume: number = 0.5;
  public thunderVolume: number = 0.3;

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Create pink/brown noise buffer for natural rain and waves
  private createNoiseBuffer(type: 'pink' | 'brown', durationSec: number = 5): AudioBuffer {
    if (!this.ctx) throw new Error('No audio context');
    const bufferSize = this.ctx.sampleRate * durationSec;
    const buffer = this.ctx.createBuffer(2, bufferSize, this.ctx.sampleRate);

    for (let channel = 0; channel < 2; channel++) {
      const data = buffer.getChannelData(channel);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      let lastOut = 0.0;

      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        if (type === 'pink') {
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.0168980;
          data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
          b6 = white * 0.115926;
        } else {
          // Brown noise for deep rain & surf
          lastOut = (lastOut + (0.02 * white)) / 1.02;
          data[i] = lastOut * 3.5;
        }
      }
    }
    return buffer;
  }

  public start() {
    if (this.isRunning) return;
    this.initContext();
    if (!this.ctx) return;

    this.isRunning = true;

    // Master Gain
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.8, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);

    // 1. RAIN GENERATOR
    const rainBuffer = this.createNoiseBuffer('pink', 5);
    this.rainNoiseNode = this.ctx.createBufferSource();
    this.rainNoiseNode.buffer = rainBuffer;
    this.rainNoiseNode.loop = true;

    const rainFilter = this.ctx.createBiquadFilter();
    rainFilter.type = 'lowpass';
    rainFilter.frequency.setValueAtTime(1200, this.ctx.currentTime);

    const rainHighpass = this.ctx.createBiquadFilter();
    rainHighpass.type = 'highpass';
    rainHighpass.frequency.setValueAtTime(300, this.ctx.currentTime);

    this.rainGain = this.ctx.createGain();
    this.rainGain.gain.setValueAtTime(this.rainVolume, this.ctx.currentTime);

    this.rainNoiseNode.connect(rainFilter);
    rainFilter.connect(rainHighpass);
    rainHighpass.connect(this.rainGain);
    this.rainGain.connect(this.masterGain);
    this.rainNoiseNode.start();

    // 2. MONTEGO BAY OCEAN SURF GENERATOR (LFO Modulated Brown Noise)
    const oceanBuffer = this.createNoiseBuffer('brown', 6);
    this.oceanNoiseNode = this.ctx.createBufferSource();
    this.oceanNoiseNode.buffer = oceanBuffer;
    this.oceanNoiseNode.loop = true;

    const oceanFilter = this.ctx.createBiquadFilter();
    oceanFilter.type = 'lowpass';
    oceanFilter.frequency.setValueAtTime(450, this.ctx.currentTime);

    // LFO for wave swells (0.1 Hz = 10s wave cycle)
    const waveLfo = this.ctx.createOscillator();
    waveLfo.frequency.setValueAtTime(0.12, this.ctx.currentTime);
    const waveLfoGain = this.ctx.createGain();
    waveLfoGain.gain.setValueAtTime(350, this.ctx.currentTime);
    waveLfo.connect(waveLfoGain);
    waveLfoGain.connect(oceanFilter.frequency);
    waveLfo.start();
    this.oscillators.push(waveLfo);

    this.oceanGain = this.ctx.createGain();
    this.oceanGain.gain.setValueAtTime(this.oceanVolume, this.ctx.currentTime);

    this.oceanNoiseNode.connect(oceanFilter);
    oceanFilter.connect(this.oceanGain);
    this.oceanGain.connect(this.masterGain);
    this.oceanNoiseNode.start();

    // 3. 528Hz SOLFEGGIO MEDITATION & THETA DRONE (528Hz + 534Hz binaural 6Hz beat)
    this.meditationGain = this.ctx.createGain();
    this.meditationGain.gain.setValueAtTime(this.meditationVolume * 0.35, this.ctx.currentTime);

    // Left channel: 528Hz (Transformation & Miracles)
    const osc1 = this.ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(528, this.ctx.currentTime);

    // Right channel / harmonic: 264Hz (Lower octave warmth)
    const osc2 = this.ctx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(264, this.ctx.currentTime);

    // Theta beat (534Hz)
    const osc3 = this.ctx.createOscillator();
    osc3.type = 'sine';
    osc3.frequency.setValueAtTime(534, this.ctx.currentTime);

    const medFilter = this.ctx.createBiquadFilter();
    medFilter.type = 'lowpass';
    medFilter.frequency.setValueAtTime(800, this.ctx.currentTime);

    osc1.connect(medFilter);
    osc2.connect(medFilter);
    osc3.connect(medFilter);
    medFilter.connect(this.meditationGain);
    this.meditationGain.connect(this.masterGain);

    osc1.start();
    osc2.start();
    osc3.start();
    this.oscillators.push(osc1, osc2, osc3);

    // 4. RANDOM OCCASIONAL DISTANT THUNDER
    this.thunderGain = this.ctx.createGain();
    this.thunderGain.gain.setValueAtTime(this.thunderVolume, this.ctx.currentTime);
    this.thunderGain.connect(this.masterGain);

    this.scheduleThunder();
  }

  private scheduleThunder() {
    if (!this.isRunning || !this.ctx) return;
    const nextThunderMs = (Math.random() * 20 + 15) * 1000; // Every 15-35 seconds
    this.thunderInterval = window.setTimeout(() => {
      this.triggerThunderRumble();
      this.scheduleThunder();
    }, nextThunderMs);
  }

  private triggerThunderRumble() {
    if (!this.isRunning || !this.ctx || !this.thunderGain || this.thunderVolume <= 0.05) return;
    try {
      const now = this.ctx.currentTime;
      const thunderBuf = this.createNoiseBuffer('brown', 4);
      const source = this.ctx.createBufferSource();
      source.buffer = thunderBuf;

      const thunderFilter = this.ctx.createBiquadFilter();
      thunderFilter.type = 'lowpass';
      thunderFilter.frequency.setValueAtTime(120, now);
      thunderFilter.frequency.exponentialRampToValueAtTime(60, now + 3.5);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(this.thunderVolume * 0.8, now + 0.6);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 3.8);

      source.connect(thunderFilter);
      thunderFilter.connect(gain);
      gain.connect(this.thunderGain);

      source.start(now);
      source.stop(now + 4);
    } catch (e) {
      // Ignore transient thunder audio context issues
    }
  }

  public stop() {
    this.isRunning = false;
    if (this.thunderInterval) {
      clearTimeout(this.thunderInterval);
      this.thunderInterval = null;
    }
    this.oscillators.forEach(osc => {
      try { osc.stop(); osc.disconnect(); } catch (e) {}
    });
    this.oscillators = [];

    if (this.rainNoiseNode) {
      try { this.rainNoiseNode.stop(); this.rainNoiseNode.disconnect(); } catch (e) {}
      this.rainNoiseNode = null;
    }
    if (this.oceanNoiseNode) {
      try { this.oceanNoiseNode.stop(); this.oceanNoiseNode.disconnect(); } catch (e) {}
      this.oceanNoiseNode = null;
    }
  }

  public setRainLevel(vol: number) {
    this.rainVolume = vol;
    if (this.rainGain && this.ctx) {
      this.rainGain.gain.setValueAtTime(vol, this.ctx.currentTime);
    }
  }

  public setOceanLevel(vol: number) {
    this.oceanVolume = vol;
    if (this.oceanGain && this.ctx) {
      this.oceanGain.gain.setValueAtTime(vol, this.ctx.currentTime);
    }
  }

  public setMeditationLevel(vol: number) {
    this.meditationVolume = vol;
    if (this.meditationGain && this.ctx) {
      this.meditationGain.gain.setValueAtTime(vol * 0.35, this.ctx.currentTime);
    }
  }

  public setThunderLevel(vol: number) {
    this.thunderVolume = vol;
    if (this.thunderGain && this.ctx) {
      this.thunderGain.gain.setValueAtTime(vol, this.ctx.currentTime);
    }
  }

  public setMasterLevel(vol: number) {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(vol, this.ctx.currentTime);
    }
  }

  public getStatus(): boolean {
    return this.isRunning;
  }
}

export const rainSoundscape = new RainSoundscapeEngine();
