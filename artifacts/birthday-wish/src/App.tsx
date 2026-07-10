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
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="relative flex flex-col items-center justify-center w-72 h-80 mx-auto bg-card/80 backdrop-blur-md border border-card-border rounded-3xl shadow-2xl overflow-hidden z-10"
    >
      <motion.div 
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 pointer-events-none"
      />
      <div className="w-full bg-primary/15 text-primary font-sans text-center py-2.5 text-xs font-semibold tracking-[0.2em] uppercase border-b border-primary/20">
        November
      </div>
      <div className="flex-1 flex flex-col items-center justify-center pt-2 relative">
        <motion.div 
          animate={{ 
            color: ['hsl(var(--foreground))', 'hsl(var(--primary))', 'hsl(var(--foreground))'],
            textShadow: ['0 0 0px rgba(0,0,0,0)', '0 0 20px hsl(var(--primary)/0.5)', '0 0 0px rgba(0,0,0,0)']
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="text-9xl font-serif font-bold leading-none mt-2 relative z-10"
        >
          7
        </motion.div>
        <div className="text-muted-foreground font-sans mt-3 tracking-[0.3em] text-lg">
          2026
        </div>
      </div>
      
      {/* Hand-drawn style circle highlight effect */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 mt-6"
      >
        <svg width="140" height="140" viewBox="0 0 100 100" className="overflow-visible">
          <motion.path
            d="M 50, 20 C 80, 15 95, 40 85, 65 C 75, 90 35, 95 15, 75 C -5, 55 5, 25 25, 15 C 35, 10 50, 15 55, 18"
            fill="transparent"
            stroke="hsl(var(--primary))"
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.8 }}
            transition={{ duration: 2, delay: 1.5, ease: "easeInOut" }}
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}

function CakeSection() {
  const cakeUrl = `${import.meta.env.BASE_URL}cake.png`.replace('//', '/');
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
      className="relative flex justify-center items-center mt-16 mb-12 z-10"
    >
      <div className="relative">
        <motion.div 
          animate={{ opacity: [0.4, 0.7, 0.4], scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-primary/40 rounded-full blur-[50px] pointer-events-none"
        />
        <div className="relative z-10 p-2 rounded-full border border-primary/20 bg-card/30 backdrop-blur-sm shadow-[0_0_60px_rgba(200,100,100,0.15)]">
          <img 
            src={cakeUrl}
            alt="Birthday Cake" 
            className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-full shadow-inner"
          />
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
      transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
      className="text-center px-6 space-y-6 max-w-3xl mx-auto z-10 relative"
    >
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground leading-[1.2] md:leading-[1.2]">
        Wishing you a day as wonderful as you are
      </h2>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="text-xl md:text-2xl text-primary font-serif italic tracking-wide"
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
        <CakeSection />
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
