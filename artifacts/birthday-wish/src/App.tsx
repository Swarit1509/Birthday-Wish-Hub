import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const queryClient = new QueryClient();

// ── font constants ────────────────────────────────────────────────────────────
const CINZEL     = "'Cinzel Decorative', 'Algerian', serif";
const CINZEL_SM  = "'Cinzel', 'Algerian', serif";
const LUCIDA     = "'Lucida Calligraphy', 'Great Vibes', cursive";

// ── NeonWords helper ──────────────────────────────────────────────────────────
function NeonWords({ text, style }: { text: string; style?: React.CSSProperties }) {
  return (
    <span style={style}>
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
        style={{ opacity: 0.38, filter: 'saturate(1.3)' }}
      />
      <div className="absolute inset-0 bg-background/45" />
    </div>
  );
}

// ── balloons ──────────────────────────────────────────────────────────────────
const BALLOON_COLORS = [
  '#FF4444','#FF8C00','#FFD700','#7FFF00','#00E5FF',
  '#4169E1','#9400D3','#FF69B4','#FF00FF','#00CED1',
];

function Balloon({ color, x, size, duration, delay, sway }:
  { color: string; x: number; size: number; duration: number; delay: number; sway: number }) {
  const h = size * 1.25;
  const sl = size * 1.6;
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: `${x}%`, bottom: -size * 3 }}
      initial={{ y: 0, opacity: 0 }}
      animate={{ y: [0, -(1200 + size * 4)], x: [0, sway, -sway, sway / 2, 0], opacity: [0, 1, 1, 0.8, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'linear', times: [0, 0.05, 0.85, 0.95, 1] }}
    >
      <svg width={size} height={h + sl} viewBox={`0 0 ${size} ${h + sl}`}>
        <ellipse cx={size/2} cy={h/2} rx={size/2} ry={h/2} fill={color} opacity={0.9}/>
        <ellipse cx={size*0.36} cy={h*0.28} rx={size*0.13} ry={h*0.1} fill="white" opacity={0.38}/>
        <circle cx={size/2} cy={h} r={size*0.055} fill={color}/>
        <path d={`M ${size/2} ${h+size*0.06} Q ${size*0.35} ${h+sl*0.5} ${size/2} ${h+sl}`}
          stroke={color} strokeWidth={1.5} fill="none" opacity={0.6}/>
      </svg>
    </motion.div>
  );
}

function Balloons() {
  const [items, setItems] = useState<{color:string;x:number;size:number;duration:number;delay:number;sway:number}[]>([]);
  useEffect(() => {
    setItems(BALLOON_COLORS.map((color, i) => ({
      color, x: 5 + i * 9.5 + (Math.random()*5-2.5),
      size: 44 + Math.random()*30,
      duration: 12 + Math.random()*10,
      delay: Math.random()*8,
      sway: 20 + Math.random()*30,
    })));
  }, []);
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{zIndex:1}}>
      {items.map((b,i) => <Balloon key={i} {...b}/>)}
    </div>
  );
}

// ── particles ─────────────────────────────────────────────────────────────────
function Particles() {
  const [ps, setPs] = useState<{id:number;x:number;dx:number;size:number;dur:number;del:number}[]>([]);
  useEffect(() => {
    setPs(Array.from({length:30},(_,i)=>({
      id:i, x:Math.random()*100, dx:Math.random()*100,
      size:Math.random()*5+2, dur:Math.random()*10+15, del:Math.random()*5,
    })));
  },[]);
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {ps.map(p=>(
        <motion.div key={p.id} className="absolute rounded-full bg-primary/40"
          style={{width:p.size,height:p.size,left:`${p.x}%`,boxShadow:'0 0 10px rgba(255,180,160,.5)'}}
          initial={{y:'110vh',opacity:0}}
          animate={{y:'-10vh',x:p.dx-p.x,opacity:[0,0.7,0]}}
          transition={{duration:p.dur,delay:p.del,repeat:Infinity,ease:'linear'}}/>
      ))}
    </div>
  );
}

// ── calendar widget ───────────────────────────────────────────────────────────
function CalendarWidget() {
  const cakeUrl = `${import.meta.env.BASE_URL}cake.png`.replace('//', '/');
  return (
    <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}}
      transition={{duration:1.2,ease:'easeOut'}}
      className="relative flex flex-row w-[780px] max-w-[95vw] h-72 mx-auto bg-card/80 backdrop-blur-md border border-card-border rounded-3xl shadow-2xl overflow-hidden z-10">
      <motion.div animate={{opacity:[0.4,0.8,0.4]}} transition={{duration:4,repeat:Infinity,ease:'easeInOut'}}
        className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 pointer-events-none"/>
      <div className="relative w-72 shrink-0 h-full overflow-hidden">
        <img src={cakeUrl} alt="" className="w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-card/80"/>
      </div>
      <div className="relative flex-1 flex flex-col z-10">
        <div className="w-full bg-primary/15 text-primary text-center py-3 text-5xl border-b border-primary/20"
          style={{fontFamily:"'Great Vibes', cursive"}}>
          <span className="neon-word">November</span>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center gap-1">
          <motion.div
            animate={{color:['hsl(var(--foreground))','hsl(var(--primary))','hsl(var(--foreground))'],
              textShadow:['0 0 0px rgba(0,0,0,0)','0 0 24px hsl(var(--primary)/.6)','0 0 0px rgba(0,0,0,0)']}}
            transition={{duration:4,repeat:Infinity,ease:'easeInOut'}}
            className="text-[9rem] font-serif font-bold leading-none">7</motion.div>
          <div className="text-muted-foreground font-sans tracking-[0.35em] text-xl">2026</div>
        </div>
      </div>
    </motion.div>
  );
}

// ── wish text ─────────────────────────────────────────────────────────────────
function WishText() {
  return (
    <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}
      transition={{duration:1.2,delay:0.3,ease:'easeOut'}}
      className="text-center px-6 space-y-6 max-w-3xl mx-auto z-10 relative mt-16">
      <h2 className="text-5xl md:text-6xl lg:text-7xl text-foreground leading-[1.3]">
        {['happpiessttt','birthdayyyyyy'].map((w,i)=>(
          <span key={i}><span className="neon-word" style={{fontFamily:CINZEL,textTransform:'capitalize'}}>{w}</span>{' '}</span>
        ))}
        {/* full Gouri word in Lucida Calligraphy */}
        <span className="neon-word" style={{fontFamily:LUCIDA,fontSize:'1.05em'}}>Gouriiiiiiiiii</span>
        {' '}
        <span className="neon-word" style={{fontFamily:CINZEL,textTransform:'capitalize'}}>yayyyyyyyyyyyyyyyyy</span>
      </h2>
      <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1,delay:1.4}}
        className="text-2xl md:text-3xl text-primary tracking-wide">
        <NeonWords text="Happy Birthday! May all your dreams come true 🎂" style={{fontFamily:CINZEL_SM,textTransform:'capitalize'}}/>
      </motion.p>
    </motion.div>
  );
}

// ── glass-break option ────────────────────────────────────────────────────────
const SHARDS = [
  { x: -60,  y: 220, rotate: -35, scale: 0.6, clip: 'polygon(0 0,55% 0,40% 100%,0 70%)' },
  { x:  10,  y: 260, rotate:  12, scale: 0.55,clip: 'polygon(30% 0,80% 0,100% 100%,20% 90%)' },
  { x: -20,  y: 300, rotate: -20, scale: 0.5, clip: 'polygon(10% 0,60% 10%,50% 100%,0 80%)' },
  { x:  50,  y: 240, rotate:  28, scale: 0.65,clip: 'polygon(40% 0,100% 20%,80% 100%,30% 90%)' },
  { x: -80,  y: 280, rotate: -50, scale: 0.45,clip: 'polygon(0 20%,50% 0,60% 100%,0 100%)' },
];

function GlassBreakOption({ label, onClick, broken }: { label: string; onClick: ()=>void; broken: boolean }) {
  return (
    <div className="relative flex justify-center" style={{height:64}}>
      <AnimatePresence>
        {!broken && (
          <motion.button
            key="btn"
            initial={{opacity:1,y:0}}
            exit={{opacity:0,transition:{duration:0.05}}}
            whileHover={{scale:1.04}}
            onClick={onClick}
            className="absolute px-10 py-3 rounded-xl border-2 border-primary/60 bg-white/10 backdrop-blur-sm text-foreground text-xl font-semibold tracking-wide"
            style={{fontFamily:CINZEL_SM,minWidth:220}}
          >{label}</motion.button>
        )}
      </AnimatePresence>

      {/* shards */}
      <AnimatePresence>
        {broken && SHARDS.map((s,i)=>(
          <motion.div key={i}
            className="absolute px-10 py-3 rounded-xl border-2 border-primary/60 bg-white/10 backdrop-blur-sm text-foreground text-xl font-semibold tracking-wide overflow-hidden pointer-events-none"
            style={{fontFamily:CINZEL_SM,minWidth:220,clipPath:s.clip,top:0}}
            initial={{x:0,y:0,rotate:0,opacity:1}}
            animate={{x:s.x,y:s.y,rotate:s.rotate,scale:s.scale,opacity:0}}
            transition={{duration:0.9,ease:[0.2,0,1,1],delay:i*0.04}}
          >{label}</motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// ── quiz page ─────────────────────────────────────────────────────────────────
const QUIZ_OPTIONS = ['9 Nov','7 Nov','15 Nov','10 Nov'];
const CORRECT = '7 Nov';

function QuizPage({ onCorrect }: { onCorrect: ()=>void }) {
  const [broken, setBroken] = useState<string|null>(null);

  function handleOption(opt: string) {
    if (opt === CORRECT) { onCorrect(); return; }
    setBroken(opt);
    setTimeout(()=>setBroken(null), 1200);
  }

  return (
    <motion.div
      key="quiz"
      initial={{opacity:0,y:60}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-40}}
      transition={{duration:0.7,ease:'easeOut'}}
      className="min-h-[100dvh] w-full flex flex-col items-center justify-center relative z-10 px-6 gap-12">
      <motion.h2
        initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} transition={{delay:0.3,duration:0.6}}
        className="text-4xl md:text-5xl text-foreground text-center leading-[1.4]"
        style={{fontFamily:CINZEL}}>
        Which day is today?
      </motion.h2>

      <div className="flex flex-col gap-6 w-full max-w-sm">
        {QUIZ_OPTIONS.map((opt,i)=>(
          <motion.div key={opt} initial={{opacity:0,x:-30}} animate={{opacity:1,x:0}}
            transition={{delay:0.5+i*0.1,duration:0.5}}>
            <GlassBreakOption
              label={opt}
              broken={broken===opt}
              onClick={()=>handleOption(opt)}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ── next / congrats page ──────────────────────────────────────────────────────
function CongratsPage() {
  const cakeUrl = `${import.meta.env.BASE_URL}cake.png`.replace('//', '/');
  return (
    <motion.div
      key="congrats"
      initial={{opacity:0,scale:0.92}} animate={{opacity:1,scale:1}} exit={{opacity:0}}
      transition={{duration:0.8,ease:'easeOut'}}
      className="min-h-[100dvh] w-full flex flex-col items-center justify-center relative z-10 px-6 gap-10 text-center">
      <motion.div
        initial={{scale:0,rotate:-20}} animate={{scale:1,rotate:0}}
        transition={{type:'spring',stiffness:200,damping:14,delay:0.2}}
        className="w-52 h-52 rounded-full overflow-hidden border-4 border-primary shadow-[0_0_60px_rgba(255,180,255,0.6)]">
        <img src={cakeUrl} alt="cake" className="w-full h-full object-cover"/>
      </motion.div>

      <motion.h1 initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:0.5}}
        className="text-5xl md:text-6xl text-foreground leading-[1.3]"
        style={{fontFamily:LUCIDA}}>
        🎉 That's right! It's your day! 🎉
      </motion.h1>

      <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.9}}
        className="text-2xl text-primary"
        style={{fontFamily:CINZEL_SM}}>
        <span className="neon-word">Happy Birthday Gouri!</span>
      </motion.p>
    </motion.div>
  );
}

// ── main birthday page ────────────────────────────────────────────────────────
function MainPage({ onEnter }: { onEnter: ()=>void }) {
  return (
    <motion.div key="main" initial={{opacity:1}} exit={{opacity:0,y:-40}} transition={{duration:0.5}}
      className="w-full flex flex-col items-center py-20 pb-32">
      <div className="relative w-full max-w-5xl mx-auto flex flex-col items-center z-10">
        <CalendarWidget/>
        <WishText/>

        {/* Enter Here button */}
        <motion.div className="mt-24 flex flex-col items-center gap-3 z-10"
          initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:1.8,duration:0.8}}>
          <p className="text-primary/70 text-sm tracking-widest uppercase" style={{fontFamily:CINZEL_SM}}>
            scroll down
          </p>
          <motion.div animate={{y:[0,8,0]}} transition={{repeat:Infinity,duration:1.4,ease:'easeInOut'}}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2" className="text-primary/60">
              <path d="M12 5v14M5 12l7 7 7-7"/>
            </svg>
          </motion.div>
          <motion.button
            onClick={onEnter}
            whileHover={{scale:1.06, boxShadow:'0 0 30px rgba(0,200,255,0.5)'}}
            whileTap={{scale:0.97}}
            className="mt-4 px-12 py-4 rounded-2xl text-2xl font-bold tracking-wide text-white border-2 border-primary/60 bg-primary/20 backdrop-blur-sm"
            style={{fontFamily:CINZEL,
              textShadow:'0 0 12px rgba(0,220,255,0.8)',
              boxShadow:'0 0 20px rgba(0,200,255,0.3)'}}>
            Enter Here
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ── birthday page shell ───────────────────────────────────────────────────────
type Page = 'main'|'quiz'|'congrats';

function BirthdayPage() {
  const [page, setPage] = useState<Page>('main');

  return (
    <div className="min-h-[100dvh] w-full bg-background relative overflow-x-hidden selection:bg-primary/30">
      <BackgroundCake/>
      <Balloons/>
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{zIndex:2}}>
        <Particles/>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/10 rounded-full blur-[120px]"/>
      </div>

      <AnimatePresence mode="wait">
        {page==='main'    && <MainPage    key="main"    onEnter={()=>setPage('quiz')}/>}
        {page==='quiz'    && <QuizPage    key="quiz"    onCorrect={()=>setPage('congrats')}/>}
        {page==='congrats'&& <CongratsPage key="congrats"/>}
      </AnimatePresence>
    </div>
  );
}

// ── app ───────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BirthdayPage/>
    </QueryClientProvider>
  );
}
