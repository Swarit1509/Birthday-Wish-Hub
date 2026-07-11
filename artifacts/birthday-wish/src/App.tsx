import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const queryClient = new QueryClient();

function Particles() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; destX: number; size: number; duration: number; delay: number }>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      destX: Math.random() * 100,
      size: Math.random() * 6 + 2,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-primary/40 backdrop-blur-sm"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            boxShadow: '0 0 15px rgba(255, 180, 160, 0.6)'
          }}
          initial={{ y: '120vh', opacity: 0, x: 0 }}
          animate={{
            y: '-20vh',
            x: (p.destX - p.x),
            opacity: [0, 0.7, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
}

function CalendarWidget() {
  const cakeUrl = `${import.meta.env.BASE_URL}cake.png`.replace('//', '/');
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="relative flex flex-row w-[780px] max-w-[95vw] h-72 mx-auto bg-card/80 backdrop-blur-md border border-card-border rounded-3xl shadow-2xl overflow-hidden z-10"
    >
      {/* Ambient glow overlay */}
      <motion.div
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 pointer-events-none z-0"
      />

      {/* LEFT — cake image */}
      <div className="relative w-72 shrink-0 h-full overflow-hidden">
        <img
          src={cakeUrl}
          alt="Birthday Cake"
          className="w-full h-full object-cover"
        />
        {/* soft fade into the right panel */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-card/80" />
      </div>

      {/* RIGHT — date info */}
      <div className="relative flex-1 flex flex-col z-10">
        {/* Month header */}
        <div
          className="w-full bg-primary/15 text-primary text-center py-3 text-5xl border-b border-primary/20"
          style={{ fontFamily: "'Great Vibes', cursive" }}
        >
          November
        </div>

        {/* Day + Year */}
        <div className="flex-1 flex flex-col items-center justify-center gap-1">
          <motion.div
            animate={{
              color: ['hsl(var(--foreground))', 'hsl(var(--primary))', 'hsl(var(--foreground))'],
              textShadow: ['0 0 0px rgba(0,0,0,0)', '0 0 24px hsl(var(--primary)/0.6)', '0 0 0px rgba(0,0,0,0)'],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="text-[9rem] font-serif font-bold leading-none relative z-10"
          >
            7
          </motion.div>
          <div className="text-muted-foreground font-sans tracking-[0.35em] text-xl">
            2026
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function WishText() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
      className="text-center px-6 space-y-6 max-w-3xl mx-auto z-10 relative mt-16"
    >
      <h2
        className="text-5xl md:text-6xl lg:text-7xl text-foreground leading-[1.3]"
        style={{ fontFamily: "'Pacifico', cursive" }}
      >
        happpiessttt birthdayyyyyy gouriiiiiiiiii yayyyyyyyyyyyyyyyyy
      </h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="text-2xl md:text-3xl text-primary tracking-wide"
        style={{ fontFamily: "'Courgette', cursive" }}
      >
        Happy Birthday! May all your dreams come true 🎂
      </motion.p>
    </motion.div>
  );
}

function BirthdayPage() {
  return (
    <div className="min-h-[100dvh] w-full bg-background relative overflow-x-hidden flex flex-col items-center py-20 pb-32 selection:bg-primary/30">
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <Particles />
        {/* Ambient static lighting */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
      </div>
      
      <div className="relative w-full max-w-5xl mx-auto flex flex-col items-center z-10">
        <CalendarWidget />
        <WishText />
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BirthdayPage />
    </QueryClientProvider>
  );
}

export default App;
