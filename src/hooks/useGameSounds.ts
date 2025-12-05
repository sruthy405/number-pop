import { useCallback, useRef, useEffect } from 'react';

export const useGameSounds = (enabled: boolean) => {
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    // Initialize AudioContext on first user interaction
    const initAudio = () => {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
    };

    document.addEventListener('click', initAudio, { once: true });
    return () => document.removeEventListener('click', initAudio);
  }, []);

  const playCorrectSound = useCallback(() => {
    if (!enabled) return;
    
    try {
      const ctx = audioContextRef.current || new (window.AudioContext || (window as any).webkitAudioContext)();
      audioContextRef.current = ctx;

      // Cheerful ascending chime for correct answer
      const notes = [523, 659, 784, 1047]; // C5, E5, G5, C6 - major chord arpeggio
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.frequency.value = freq;
        osc.type = 'sine';
        
        const startTime = ctx.currentTime + i * 0.08;
        gain.gain.setValueAtTime(0.25, startTime);
        gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.15);
        
        osc.start(startTime);
        osc.stop(startTime + 0.2);
      });
    } catch (e) {
      // Silently fail if audio doesn't work
    }
  }, [enabled]);

  const playWrongSound = useCallback(() => {
    if (!enabled) return;
    
    try {
      const ctx = audioContextRef.current || new (window.AudioContext || (window as any).webkitAudioContext)();
      audioContextRef.current = ctx;

      // Short buzzer/error sound
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.frequency.setValueAtTime(150, ctx.currentTime);
      osc.frequency.setValueAtTime(120, ctx.currentTime + 0.1);
      
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);

      osc.type = 'square';
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.25);
    } catch (e) {
      // Silently fail if audio doesn't work
    }
  }, [enabled]);

  const playPopSound = useCallback(() => {
    if (!enabled) return;
    
    try {
      const ctx = audioContextRef.current || new (window.AudioContext || (window as any).webkitAudioContext)();
      audioContextRef.current = ctx;

      // Satisfying bubble pop sound
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      // Quick frequency drop for pop effect
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

      osc.type = 'sine';
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.1);
    } catch (e) {
      // Silently fail if audio doesn't work
    }
  }, [enabled]);

  const playGameOverSound = useCallback(() => {
    if (!enabled) return;
    
    try {
      const ctx = audioContextRef.current || new (window.AudioContext || (window as any).webkitAudioContext)();
      audioContextRef.current = ctx;

      // Sad descending notes for game over
      const notes = [523, 466, 392, 349, 262]; // C5, Bb4, G4, F4, C4
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.frequency.value = freq;
        osc.type = 'triangle';
        
        const startTime = ctx.currentTime + i * 0.2;
        gain.gain.setValueAtTime(0.2, startTime);
        gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.25);
        
        osc.start(startTime);
        osc.stop(startTime + 0.3);
      });
    } catch (e) {
      // Silently fail if audio doesn't work
    }
  }, [enabled]);

  return { playCorrectSound, playWrongSound, playPopSound, playGameOverSound };
};
