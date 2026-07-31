// Tiny WebAudio arcade sound effects — no assets, generated on the fly.
// Only ever called from user gestures (answering), so autoplay policies are fine.

let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

function tone(freq: number, start: number, dur: number, type: OscillatorType = "square", gain = 0.06) {
  const ac = getCtx();
  if (!ac) return;
  const osc = ac.createOscillator();
  const g = ac.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  g.gain.setValueAtTime(0, ac.currentTime + start);
  g.gain.linearRampToValueAtTime(gain, ac.currentTime + start + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + start + dur);
  osc.connect(g);
  g.connect(ac.destination);
  osc.start(ac.currentTime + start);
  osc.stop(ac.currentTime + start + dur + 0.02);
}

export const sfx = {
  correct() {
    // rising arpeggio
    tone(523, 0, 0.12);
    tone(659, 0.08, 0.12);
    tone(784, 0.16, 0.18);
  },
  wrong() {
    tone(196, 0, 0.22, "sawtooth", 0.05);
    tone(150, 0.1, 0.26, "sawtooth", 0.05);
  },
  survive() {
    tone(523, 0, 0.12);
    tone(659, 0.1, 0.12);
    tone(784, 0.2, 0.12);
    tone(1047, 0.3, 0.3);
  },
  fail() {
    tone(392, 0, 0.2, "triangle");
    tone(311, 0.16, 0.24, "triangle");
    tone(233, 0.34, 0.4, "triangle");
  },
};
