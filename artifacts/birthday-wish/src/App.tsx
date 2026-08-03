import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const queryClient = new QueryClient();

// ── helpers ──────────────────────────────────────────────────────────────────

function NeonWords({ text, className, style }: { text: string; className?: string; style?: React.CSSProperties }) {
  return (
    <span className={className} style={style}>
      {text.split(' ').map((word, i) => (
        <span key={i} className="neon-word">{word}</span>
      )).reduce<React.ReactNode[]>((acc, el, i) => i === 0 ? [el] : [...acc, ' ', el], [])}
    </span>
  );
}

// ── background cake ───────────────────────────────────────────────────────────

function BackgroundCake() {
  const cakeUrl = `${import.meta.env.BASE_URL}cake.png`.replace('//', '/');
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <img
        src={cakeUrl}
        alt=""
        className="w-full h-full object-cover"
        style={{ opacity: 0.13, filter: 'blur(2px) saturate(1.4)' }}
      />
      {/* dark overlay so text stays readable */}
      <div className="absolute inset-0 bg-background/60" />
    </div>
  );
}

// ── balloons ──────────────────────────────────────────────────────────────────

const BALLOON_COLORS = [
  '#FF4444', '#FF8C00', '#FFD700', '#7FFF00', '#00E5FF',
  '#4169E1', '#9400D3', '#FF69B4', '#FF00FF', '#00CED1',
];

interface BalloonProps {
  color: string;
  x: number;        // % from left
  size: number;     // px width
  duration: number; // float duration
  delay: number;
  sway: number;     // sway amplitude px
}

function Balloon({ color, x, size, duration, delay, sway }: BalloonProps) {
  const h = size * 1.25;
  const stringLen = size * 1.6;

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: `${x}%`, bottom: -size * 3 }}
      initial={{ y: 0, opacity: 0 }}
      animate={{
        y: [0, -(window.innerHeight + size * 4)],
        x: [0, sway, -sway, sway / 2, 0],
        opacity: [0, 1, 1, 0.8, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'linear',
        times: [0, 0.05, 0.85, 0.95, 1],
      }}
    >
      <svg width={size} height={h + stringLen} viewBox={`0 0 ${size} ${h + stringLen}`}>
        {/* balloon body */}
        <ellipse cx={size / 2} cy={h / 2} rx={size / 2} ry={h / 2} fill={color} opacity={0.88} />
        {/* shine highlight */}
        <ellipse cx={size * 0.36} cy={h * 0.28} rx={size * 0.13} ry={h * 0.1} fill="white" opacity={0.35} />
        {/* knot */}
        <circle cx={size / 2} cy={h} r={size * 0.055} fill={color} />
        {/* string */}
        <path
          d={`M ${size / 2} ${h + size * 0.06} Q ${size * 0.35} ${h + stringLen * 0.5} ${size / 2} ${h + stringLen}`}
          stroke={color}
          strokeWidth={1.5}
          fill="none"
          opacity={0.6}
        />
      </svg>
    </motion.div>
  );
}

function Balloons() {
  const [items, setItems] = useState<BalloonProps[]>([]);

  useEffect(() => {
    const generated = BALLOON_COLORS.map((color, i) => ({
      color,
      x: 5 + (i * 9.5) + (Math.random() * 5 - 2.5),
      size: 44 + Math.random() * 30,
      duration: 12 + Math.random() * 10,
      delay: Math.random() * 8,
      sway: 20 + Math.random() * 30,
    }));
    setItems(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-1">
      {items.map((b, i) => <Balloon key={i} {...b} />)}
    </div>
  );
}

// ── particles ─────────────────────────────────────────────────────────────────

function Particles() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; destX: number; size: number; duration: number; delay: number }>>([]);

  useEffect(() => {
    setParticles(Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      destX: Math.random() * 100,
      size: Math.random() * 5 + 2,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 5,
    })));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-primary/40"
          style={{ width: p.size, height: p.size, left: `${p.x}%`, boxShadow: '0 0 10px rgba(255,180,160,0.5)' }}
          initial={{ y: '110vh', opacity: 0 }}
          animate={{ y: '-10vh', x: p.destX - p.x, opacity: [0, 0.7, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'linear' }}
        />
      ))}
    </div>
  );
}

// ── calendar ──────────────────────────────────────────────────────────────────

function CalendarWidget() {
  const cakeUrl = `${import.meta.env.BASE_URL}cake.png`.replace('//', '/');
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      className="relative flex flex-row w-[780px] max-w-[95vw] h-72 mx-auto bg-card/80 backdrop-blur-md border border-card-border rounded-3xl shadow-2xl overflow-hidden z-10"
    >
      <motion.div
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 pointer-events-none z-0"
      />
      {/* cake image on left */}
      <div className="relative w-72 shrink-0 h-full overflow-hidden">
        <img src={cakeUrl} alt="Birthday Cake" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-card/80" />
      </div>
      {/* date on right */}
      <div className="relative flex-1 flex flex-col z-10">
        <div
          className="w-full bg-primary/15 text-primary text-center py-3 text-5xl border-b border-primary/20"
          style={{ fontFamily: "'Great Vibes', cursive" }}
        >
          <span className="neon-word">November</span>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center gap-1">
          <motion.div
            animate={{
              color: ['hsl(var(--foreground))', 'hsl(var(--primary))', 'hsl(var(--foreground))'],
              textShadow: ['0 0 0px rgba(0,0,0,0)', '0 0 24px hsl(var(--primary)/0.6)', '0 0 0px rgba(0,0,0,0)'],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="text-[9rem] font-serif font-bold leading-none relative z-10"
          >
            7
          </motion.div>
          <div className="text-muted-foreground font-sans tracking-[0.35em] text-xl">2026</div>
        </div>
      </div>
    </motion.div>
  );
}

// ── wish text ─────────────────────────────────────────────────────────────────

const CINZEL = "'Cinzel Decorative', 'Algerian', serif";
const CINZEL_BODY = "'Cinzel', 'Algerian', serif";
const LUCIDA_G: React.CSSProperties = {
  fontFamily: "'Lucida Calligraphy', 'Great Vibes', cursive",
  fontSize: '1.25em',
  lineHeight: 1,
  display: 'inline-block',
  verticalAlign: 'middle',
};

/** Renders "gouriiiiiiiiii" with the G in Lucida Calligraphy and the rest in Cinzel */
function GouriWord() {
  return (
    <span className="neon-word" style={{ fontFamily: CINZEL, textTransform: 'capitalize' }}>
      <span style={LUCIDA_G}>G</span>ouriiiiiiiiii
    </span>
  );
}

function WishText() {
  // Split the first line manually to inject the special G word
  const before = ['happpiessttt', 'birthdayyyyyy'];
  const after  = ['yayyyyyyyyyyyyyyyyy'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
      className="text-center px-6 space-y-6 max-w-3xl mx-auto z-10 relative mt-16"
    >
      <h2 className="text-5xl md:text-6xl lg:text-7xl text-foreground leading-[1.3]">
        {before.map((w, i) => (
          <span key={i}>
            <span className="neon-word" style={{ fontFamily: CINZEL, textTransform: 'capitalize' }}>{w}</span>
            {' '}
          </span>
        ))}
        <GouriWord />
        {after.map((w, i) => (
          <span key={i}>
            {' '}
            <span className="neon-word" style={{ fontFamily: CINZEL, textTransform: 'capitalize' }}>{w}</span>
          </span>
        ))}
      </h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="text-2xl md:text-3xl text-primary tracking-wide"
      >
        <NeonWords
          text="Happy Birthday! May all your dreams come true 🎂"
          style={{ fontFamily: CINZEL_BODY, textTransform: 'capitalize' }}
        />
      </motion.p>
    </motion.div>
  );
}

// ── page ──────────────────────────────────────────────────────────────────────

function BirthdayPage() {
  return (
    <div className="min-h-[100dvh] w-full bg-background relative overflow-x-hidden flex flex-col items-center py-20 pb-32 selection:bg-primary/30">
      <BackgroundCake />
      <Balloons />

      <div className="fixed inset-0 pointer-events-none z-2 overflow-hidden">
        <Particles />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative w-full max-w-5xl mx-auto flex flex-col items-center z-10">
        <CalendarWidget />
        <WishText />
      </div>
    </div>
  );
}

// ── app ───────────────────────────────────────────────────────────────────────

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BirthdayPage />
    </QueryClientProvider>
  );
}

export default App;
