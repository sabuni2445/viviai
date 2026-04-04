
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Video, 
  Download, 
  Sparkles, 
  Plus, 
  Menu, 
  X, 
  ChevronRight, 
  ArrowRight,
  Globe,
  Settings,
  Layout,
  Library,
  Zap,
  CheckCircle2,
  RefreshCw,
  Sun,
  Moon,
  Clock,
  BookOpen,
  ImageIcon,
  Mic,
  ChevronDown,
  ChevronLeft,
  Search,
  MoreVertical,
  User,
  TrendingUp,
  Clock3,
  Waves,
  Heart,
  Eye,
  Share2,
  MessageSquare,
  Home as HomeIcon
} from 'lucide-react';
import { Language, translations } from '@/lib/translations';

// Sample Data for AI Videos Section
const sampleVideos = [
  { id: 1, title: 'Gateau Bakery 1', desc: 'Cinematic Bakery', thumb: '/videos/firefly_1.mp4', aspect: 'aspect-[4/5]', badge: { type: 'text', text: 'Fi', color: 'bg-[#FF1A1A] text-white' } },
  { id: 2, title: 'Gateau Bakery 2', desc: 'Soft Gold lighting', thumb: '/videos/firefly_2.mp4', aspect: 'aspect-[4/3]', badge: { type: 'icon', color: 'bg-white text-black' } },
  { id: 3, title: 'Birthday Celebration', desc: 'Emotional Happy', thumb: '/videos/firefly_3.mp4', aspect: 'aspect-[16/9]', badge: { type: 'google', color: 'bg-white' } },
  { id: 4, title: 'Street Food', desc: 'Sizzling Grill', thumb: '/videos/firefly_4.mp4', aspect: 'aspect-[1/2]', badge: { type: 'text', text: 'Fi', color: 'bg-[#FF1A1A] text-white' } },
  { id: 5, title: 'Restaurant Burgers', desc: 'Juicy Meals', thumb: '/videos/firefly_5.mp4', aspect: 'aspect-[1/1]', badge: { type: 'icon', color: 'bg-white text-black' } },
  { id: 6, title: 'White Studio', desc: 'Elegant Outfit', thumb: '/videos/firefly_6.mp4', aspect: 'aspect-[4/5]', badge: { type: 'google', color: 'bg-white' } },
  { id: 7, title: 'Juicy Burger', desc: 'Melted Cheese', thumb: '/videos/firefly_7.mp4', aspect: 'aspect-[4/3]', badge: { type: 'text', text: 'Fi', color: 'bg-[#FF1A1A] text-white' } },
  { id: 8, title: 'Cozy Morning', desc: 'Fresh Croissants', thumb: '/videos/firefly_8.mp4', aspect: 'aspect-[16/9]', badge: { type: 'icon', color: 'bg-white text-black' } },
  { id: 9, title: 'Animated Bear 1', desc: 'Sweets Box', thumb: '/videos/firefly_9.mp4', aspect: 'aspect-[1/2]', badge: { type: 'google', color: 'bg-white' } },
  { id: 10, title: 'Animated Bear 2', desc: 'Reacting Happily', thumb: '/videos/firefly_10.mp4', aspect: 'aspect-[1/1]', badge: { type: 'text', text: 'Fi', color: 'bg-[#FF1A1A] text-white' } },
  { id: 11, title: 'Elegant Interior', desc: 'Plated Dish', thumb: '/videos/firefly_11.mp4', aspect: 'aspect-[4/5]', badge: { type: 'icon', color: 'bg-white text-black' } },
  { id: 12, title: 'Fashion Shoot', desc: 'Confident Walk', thumb: '/videos/firefly_12.mp4', aspect: 'aspect-[4/3]', badge: { type: 'google', color: 'bg-white' } },
  { id: 13, title: 'Luxury Apartment', desc: 'Sunlight Windows', thumb: '/videos/firefly_13.mp4', aspect: 'aspect-[16/9]', badge: { type: 'text', text: 'Fi', color: 'bg-[#FF1A1A] text-white' } },
  { id: 14, title: 'Rustic Bakery', desc: 'Kneading Dough', thumb: '/videos/firefly_14.mp4', aspect: 'aspect-[1/2]', badge: { type: 'icon', color: 'bg-white text-black' } },
  { id: 15, title: 'Morning Commercial', desc: '4K Sequence', thumb: '/videos/firefly_15.mp4', aspect: 'aspect-[1/1]', badge: { type: 'google', color: 'bg-white' } },
  { id: 16, title: 'Bakery Seq 1', desc: 'Ultra Cinematic', thumb: '/videos/firefly_16.mp4', aspect: 'aspect-[4/5]', badge: { type: 'text', text: 'Fi', color: 'bg-[#FF1A1A] text-white' } },
  { id: 17, title: 'Bakery Seq 2', desc: 'Luxury Sequence', thumb: '/videos/firefly_17.mp4', aspect: 'aspect-[4/3]', badge: { type: 'icon', color: 'bg-white text-black' } },
  { id: 18, title: 'Realistic Closeup', desc: 'Exquisite Details', thumb: '/videos/firefly_18.mp4', aspect: 'aspect-[16/9]', badge: { type: 'google', color: 'bg-white' } },
  { id: 19, title: 'Vibrant Dessert', desc: 'Macarons Display', thumb: '/videos/firefly_19.mp4', aspect: 'aspect-[1/2]', badge: { type: 'text', text: 'Fi', color: 'bg-[#FF1A1A] text-white' } },
  { id: 20, title: 'Bonus Commercial', desc: 'Creative Shot', thumb: '/videos/firefly_20.mp4', aspect: 'aspect-[1/1]', badge: { type: 'icon', color: 'bg-white text-black' } }
];

const dashboardStats = [
  { label: 'Total Videos', value: '24', icon: <Video className="w-4 h-4" />, change: '+12%' },
  { label: 'Time Saved', value: '180h', icon: <Clock3 className="w-4 h-4" />, change: '+45%' },
  { label: 'Avg Engagement', value: '8.4%', icon: <TrendingUp className="w-4 h-4" />, change: '+2.1%' },
];

const suiteTools = [
  { id: 'text-video', title: 'Text to Video', desc: 'Generate videos from text prompts', icon: '/videos/firefly_1.mp4', bg: 'bg-[#111111]', titleColor: 'text-green-400' },
  { id: 'frame-video', title: 'Frame to Video', desc: 'Generate videos from images', icon: '/videos/firefly_2.mp4', bg: 'bg-[#111111]', titleColor: 'text-green-400' },
  { id: 'motion-sync', title: 'Motion Sync', desc: 'Motion sync videos from image and motion...', icon: '/videos/firefly_3.mp4', bg: 'bg-[#111111]', titleColor: 'text-green-400' },
  { id: 'lip-sync', title: 'Lip-Sync', desc: 'Lip-sync videos from audio and image', icon: '/videos/firefly_4.mp4', bg: 'bg-[#111111]', titleColor: 'text-green-400' },
  { id: 'edit-video', title: 'Edit Video', desc: 'Modify or retake videos (Kling 01, LTX...)', icon: '/videos/firefly_5.mp4', bg: 'bg-[#111111]', titleColor: 'text-green-400' },
  { id: 'create-image', title: 'Create Image', desc: 'Generate images from text prompts', icon: '/videos/firefly_6.mp4', bg: 'bg-[#111111]', titleColor: 'text-green-400' },
  { id: 'edit-image', title: 'Edit Image', desc: 'Edit images with AI models', icon: '/videos/firefly_7.mp4', bg: 'bg-[#111111]', titleColor: 'text-green-400' },
  { id: 'image-upscale', title: 'Image Upscale', desc: 'Upscale and enhance image quality', icon: '/videos/firefly_8.mp4', bg: 'bg-[#111111]', titleColor: 'text-green-400' },
  { id: 'camera-angle', title: 'Camera Angle Contr...', desc: 'Control the camera angle of the image', icon: '/videos/firefly_9.mp4', bg: 'bg-[#111111]', titleColor: 'text-green-400' },
  { id: 'create-voice', title: 'Create voice-over', desc: 'Generate natural sounding voiceovers fro...', icon: '/videos/firefly_10.mp4', bg: 'bg-[#111111]', titleColor: 'text-green-400' },
];

export default function Home() {
  const [lang, setLang] = useState<Language>('am');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  
  // App routing state: landing -> application (dashboard/create/result)
  const [view, setView] = useState<'landing' | 'app'>('landing');

  // App workspace states
  const [activeTab, setActiveTab] = useState<'dashboard' | 'create' | 'library'>('dashboard');
  const [mode, setMode] = useState<'guided' | 'prompt'>('guided');
  const [step, setStep] = useState<'idle' | 'forming' | 'loading' | 'result'>('idle');
  const [activeCategory, setActiveCategory] = useState('all');
  const [progressStep, setProgressStep] = useState(0);
  const [originalPrompt, setOriginalPrompt] = useState('');
  const [enhancedPrompt, setEnhancedPrompt] = useState('');
  
  const T = translations[lang];

  const categories = [
    { id: 'all', label: lang === 'am' ? 'ሁሉም' : 'All' },
    { id: 'food', label: T.categories?.food || 'Food' },
    { id: 'restaurants', label: T.categories?.restaurants || 'Restaurants' },
    { id: 'fashion', label: T.categories?.fashion || 'Fashion' },
    { id: 'fitness', label: T.categories?.fitness || 'Fitness' },
    { id: 'realEstate', label: T.categories?.realEstate || 'Real Estate' },
  ];

  const filteredVideos = activeCategory === 'all' 
    ? sampleVideos 
    : sampleVideos.filter(v => v.category === activeCategory);

  const [form, setForm] = useState({
    businessName: '',
    businessType: '',
    product: '',
    style: 'Modern',
    platform: 'Instagram',
    description: ''
  });

  const loadingMessages = [
    T.generating.analyzing,
    T.generating.enhancing,
    T.generating.visuals,
    T.generating.finalizing
  ];

  useEffect(() => {
    const savedTheme = localStorage.getItem('vivi-pro-theme') as 'light' | 'dark' | null;
    const initialTheme = savedTheme || 'dark';
    setTheme(initialTheme);
    document.documentElement.setAttribute('data-theme', initialTheme);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('vivi-pro-theme', theme);
  }, [theme]);

  const handleFormSubmit = () => {
    let finalPrompt = '';
    if (mode === 'guided') {
      finalPrompt = `${form.product} for ${form.businessName} (${form.businessType}). ${form.description}`;
    } else {
      finalPrompt = originalPrompt;
    }
    
    setOriginalPrompt(finalPrompt);
    setEnhancedPrompt(`Cinematic high-detail video of ${finalPrompt}. Dramatic lighting, professional camera work, optimized for ${form.platform}.`);
    setStep('loading');
    setProgressStep(0);

    const interval = setInterval(() => {
      setProgressStep((prev) => {
        if (prev < 3) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 2500);

    setTimeout(() => {
      setStep('result');
      clearInterval(interval);
    }, 10000);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  if (view === 'landing') {
    return (
      <div className="min-h-screen text-foreground font-sans selection:bg-primary selection:text-white relative overflow-hidden bg-[#020202]">
        {/* Antigravity Deep Void Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 bg-[#020202]">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#3d1872]/50 blur-[130px] rounded-full mix-blend-screen opacity-80" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#1a2f6b]/40 blur-[140px] rounded-full mix-blend-screen opacity-70" />
          <div className="absolute top-[30%] left-[60%] w-[30%] h-[30%] bg-indigo-500/20 blur-[120px] rounded-full mix-blend-screen opacity-50" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,1)_85%)] z-0" />
          <div className="absolute inset-0 opacity-[0.03] z-0" style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          <div className="floating-particles opacity-30 z-0" />
        </div>

        {/* Top Navbar */}
        <nav className="absolute top-0 left-0 w-full z-50">
          <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 primary-btn rounded-xl flex items-center justify-center text-white vivid-glow shadow-[0_0_20px_var(--primary-glow)]">
                <Video className="w-6 h-6" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight">VIVI</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-muted">
              <span className="hover:text-foreground cursor-pointer transition-colors">Features</span>
              <span className="hover:text-foreground cursor-pointer transition-colors">Use Cases</span>
              <span className="hover:text-foreground cursor-pointer transition-colors">Pricing</span>
            </div>

            <div className="flex items-center gap-4">
              <button onClick={() => setLang(lang === 'am' ? 'en' : 'am')} className="text-sm font-bold text-muted hover:text-foreground transition-colors mr-2">
                {lang === 'am' ? 'Eng' : 'አማ'}
              </button>
              <button 
                onClick={() => setView('app')}
                className="hidden md:block text-sm font-bold hover:text-primary transition-colors"
              >
                Log in
              </button>
              <button 
                onClick={() => setView('app')}
                className="primary-btn px-6 py-2.5 rounded-full text-sm font-bold shadow-[0_0_20px_var(--primary-glow)] hover:scale-105 transition-all"
              >
                Start for Free
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative pt-40 pb-32 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8 max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/50 backdrop-blur-md text-sm font-bold text-primary mb-4">
              <Sparkles className="w-4 h-4 fill-current" /> Seedance 2.0 Video Engine Live
            </div>
            <h1 className="text-6xl md:text-8xl font-extrabold tracking-[-0.04em] leading-[1.1]">
              Make great videos by <br className="hidden md:block"/> chatting with AI.
            </h1>
            <p className="text-xl md:text-2xl text-muted font-medium max-w-2xl mx-auto leading-relaxed">
              If you can text, you can create. Turn your best ideas into video reality without touching a single complex tool.
            </p>
            <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => setView('app')}
                className="primary-btn px-10 py-5 rounded-full text-xl font-bold flex items-center gap-3 vivid-glow hover:scale-105 transition-all shadow-[0_0_30px_var(--primary-glow)] w-full sm:w-auto"
              >
                Start Creating Free <ChevronRight className="w-6 h-6" />
              </button>
              <button className="px-10 py-5 rounded-full text-xl font-bold flex items-center gap-3 border border-border hover:bg-accent transition-all w-full sm:w-auto">
                <Play className="w-6 h-6" /> View Demo
              </button>
            </div>
          </motion.div>
        </section>

        {/* Perspective Video Strip */}
        <section className="py-20 bg-[#080808] overflow-hidden relative">
           <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background z-20 pointer-events-none"/>
           <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none"/>
           <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none"/>
           
           <div className="w-full ml-[10vw]" style={{ perspective: '1600px' }}>
              <div className="flex flex-col gap-3 scale-110 shadow-2xl" style={{ transformStyle: 'preserve-3d', transform: 'rotateX(30deg) rotateZ(-4deg)' }}>
                 {/* Row Strip 1 */}
                 <div className="flex gap-3 w-max -ml-40 blur-[2px] opacity-60">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                       <video key={i} src={`/videos/firefly_${i}.mp4`} className="w-[340px] h-[190px] object-cover rounded-[20px] shadow-2xl" autoPlay muted loop playsInline />
                    ))}
                 </div>
                 {/* Row Strip 2 (Dominant) */}
                 <div className="flex gap-3 w-max -ml-10 z-10 drop-shadow-[0_0_80px_rgba(0,0,0,0.8)]">
                    {[9, 10, 11, 12, 13, 14, 15, 16].map(i => (
                       <video key={`r2-${i}`} src={`/videos/firefly_${i}.mp4`} className="w-[380px] h-[220px] object-cover rounded-[20px] shadow-2xl brightness-110" autoPlay muted loop playsInline />
                    ))}
                 </div>
                 {/* Row Strip 3 */}
                 <div className="flex gap-3 w-max ml-10 blur-[2px] opacity-60">
                    {[17, 18, 19, 20, 1, 2, 3, 4].map(i => (
                       <video key={`r3-${i}`} src={`/videos/firefly_${i}.mp4`} className="w-[340px] h-[190px] object-cover rounded-[20px] shadow-2xl" autoPlay muted loop playsInline />
                    ))}
                 </div>
              </div>
           </div>
        </section>

        {/* Value Props Section */}
        <section className="py-32 px-6 bg-card border-t border-border relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-glow rounded-full blur-[150px] pointer-events-none opacity-30 mix-blend-screen" />
          <div className="max-w-7xl mx-auto space-y-24">
            
            <div className="text-center space-y-6 max-w-3xl mx-auto">
              <h2 className="text-5xl md:text-6xl font-extrabold tracking-[-0.04em]">Real Talk, <span className="text-primary">Reel Gold.</span></h2>
              <p className="text-xl text-muted font-medium">One platform for every need. Create marketing ads, educational explainers, and animated shorts seamlessly.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
               <div className="high-end-card p-8 space-y-6 hover:-translate-y-2 transition-transform duration-300">
                 <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <MessageSquare className="w-7 h-7" />
                 </div>
                 <h3 className="text-2xl font-bold">Chat-based Creation</h3>
                 <p className="text-muted leading-relaxed font-medium">If you can text, you can create. Turn your best ideas into video reality without touching a single complex tool.</p>
               </div>
               <div className="high-end-card p-8 space-y-6 hover:-translate-y-2 transition-transform duration-300">
                 <div className="w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                    <RefreshCw className="w-7 h-7" />
                 </div>
                 <h3 className="text-2xl font-bold">Chat-based Editing</h3>
                 <p className="text-muted leading-relaxed font-medium">Edit like chatting with a real person. Say "Make this part faster" and the video updates instantly.</p>
               </div>
               <div className="high-end-card p-8 space-y-6 hover:-translate-y-2 transition-transform duration-300">
                 <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                    <User className="w-7 h-7" />
                 </div>
                 <h3 className="text-2xl font-bold">Character Consistency</h3>
                 <p className="text-muted leading-relaxed font-medium">Lock your character's identity. Generate them in new locations, actions, and emotions automatically.</p>
               </div>
               <div className="high-end-card p-8 space-y-6 hover:-translate-y-2 transition-transform duration-300">
                 <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-500">
                    <Layout className="w-7 h-7" />
                 </div>
                 <h3 className="text-2xl font-bold">All-Purpose Hub</h3>
                 <p className="text-muted leading-relaxed font-medium">From high-converting marketing ads to cinematic explainer shorts, generate any format natively.</p>
               </div>
            </div>

          </div>
        </section>

        {/* Action Bottom */}
        <section className="py-32 px-6 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-6xl font-extrabold tracking-[-0.04em] pb-[10px]">Chat it. <span className="text-primary">Clip it.</span></h2>
            <p className="text-2xl text-muted font-medium mb-12">Join thousands of creators producing studio-grade content.</p>
            <button 
                onClick={() => setView('app')}
                className="primary-btn px-12 py-6 rounded-full text-2xl font-bold inline-flex items-center gap-3 vivid-glow hover:scale-105 transition-all shadow-[0_0_40px_var(--primary-glow)]"
              >
                Start for Free <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </section>
        
        {/* Simple Footer */}
        <footer className="border-t border-border py-12 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-muted font-medium">
             <div className="flex items-center gap-3">
              <div className="w-8 h-8 primary-btn rounded-lg flex items-center justify-center text-white vivid-glow">
                <Video className="w-4 h-4" />
              </div>
              <span className="font-extrabold tracking-tight">VIVI INC.</span>
            </div>
            <div className="flex gap-6">
              <span className="cursor-pointer hover:text-foreground">Discord</span>
              <span className="cursor-pointer hover:text-foreground">Twitter</span>
              <span className="cursor-pointer hover:text-foreground">Privacy Policy</span>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  // APP WORKSPACE VIEW (Dashboard / Create / Result)
  return (
    <div className="flex bg-background text-foreground min-h-screen font-sans selection:bg-primary selection:text-white">
      
      {/* Dynamic Background Mesh */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="mesh-decorator" />
        <div className="floating-particles" />
        <div className="cinematic-vignette" />
      </div>

      {/* Sidebar */}
      <aside className="w-72 border-r border-border bg-sidebar/50 backdrop-blur-xl flex flex-col hidden lg:flex sticky top-0 h-screen">
        <div className="p-8 flex items-center gap-4 cursor-pointer" onClick={() => setView('landing')}>
          <div className="w-10 h-10 primary-btn rounded-2xl flex items-center justify-center text-white vivid-glow">
            <Video className="w-6 h-6" />
          </div>
          <span className="text-2xl font-bold tracking-tight">VIVI <span className="text-primary">STUDIO</span></span>
        </div>

        <nav className="flex-1 px-6 space-y-2 mt-4">
          <button onClick={() => {setActiveTab('dashboard'); setStep('idle');}} className={`w-full sidebar-item ${activeTab === 'dashboard' ? 'active' : ''}`}>
            <Layout className="w-5 h-5" /> {lang === 'am' ? 'ዳሽቦርድ' : 'Dashboard'}
          </button>
          <button onClick={() => setActiveTab('library')} className={`w-full sidebar-item ${activeTab === 'library' ? 'active' : ''}`}>
            <Library className="w-5 h-5" /> {lang === 'am' ? 'የእኔ ስራዎች' : 'Studio Assets'}
          </button>
          <button className="w-full sidebar-item">
            <TrendingUp className="w-5 h-5" /> Analytics
          </button>
          <button className="w-full sidebar-item">
            <Settings className="w-5 h-5" /> Settings
          </button>
        </nav>

        <div className="p-6 border-t border-border space-y-6">
            <div className="flex bg-accent/30 p-4 rounded-2xl border border-border/50">
               <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                 <User className="w-5 h-5" />
               </div>
               <div className="ml-3 flex-1 text-sm overflow-hidden">
                 <p className="font-bold truncate">Premium Creator</p>
                 <div className="flex items-center gap-1.5 mt-0.5">
                   <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                   <p className="text-muted text-xs truncate">Pro Account</p>
                 </div>
               </div>
            </div>
            <button 
              onClick={() => {setActiveTab('create'); setStep('forming');}}
              className="w-full primary-btn py-4 rounded-2xl font-bold flex items-center justify-center gap-3 text-lg vivid-glow shadow-[0_0_20px_var(--primary-glow)]"
            >
              <Plus className="w-6 h-6" /> {lang === 'am' ? 'አዲስ ቪዲዮ' : 'New Project'}
            </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen">
        
        {/* Modern Header */}
        <header className="h-20 border-b border-border bg-background/50 backdrop-blur-md flex items-center justify-between px-10 sticky top-0 z-50">
           <div className="flex items-center gap-6 flex-1">
             <div className="relative max-w-lg w-full group">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted group-focus-within:text-primary transition-colors" />
               <input 
                  type="text" 
                  placeholder={lang === 'am' ? 'ፕሮጀክቶችን ወይም ሞዴሎችን ፈልግ...' : 'Search projects, templates...'} 
                  className="w-full bg-accent/50 border border-border/50 rounded-2xl py-3 pl-12 pr-6 text-sm transition-all focus:ring-1 focus:ring-primary focus:bg-accent focus:outline-none"
               />
             </div>
           </div>

           <div className="flex items-center gap-4">
              <button 
                onClick={() => setLang(lang === 'am' ? 'en' : 'am')}
                className="px-4 py-2 rounded-xl bg-accent/50 hover:bg-accent border border-border/50 transition-all text-xs font-bold flex items-center gap-2 group"
              >
                <Globe className="w-4 h-4 text-muted group-hover:text-primary transition-colors" />
                {lang === 'am' ? 'English' : 'አማርኛ'}
              </button>
              <div className="h-6 w-[1px] bg-border mx-2" />
              <button 
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-3 rounded-xl bg-accent/50 hover:bg-accent border border-border/50 transition-all text-muted hover:text-primary"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
           </div>
        </header>

        {/* Dynamic Studio Workspace */}
        <main className="flex-1 p-10 relative">
           <AnimatePresence mode="wait">
             
             {/* DASHBOARD: High-Growth Overview */}
             {activeTab === 'dashboard' && step === 'idle' && (
               <motion.div 
                 key="dashboard"
                 variants={containerVariants}
                 initial="hidden"
                 animate="visible"
                 exit="hidden"
                 className="space-y-12"
               >
                  {/* Navigation Pill */}
                  <div className="flex justify-center mb-8">
                    <div className="flex items-center bg-[#18181A] rounded-full px-8 py-3 gap-10 text-sm font-bold text-white shadow-xl border border-white/5">
                       <div className="flex items-center gap-2 cursor-pointer hover:text-green-400 transition-colors"><BookOpen className="w-4 h-4"/> Story <ChevronDown className="w-3 h-3 text-muted"/></div>
                       <div className="flex items-center gap-2 cursor-pointer hover:text-green-400 transition-colors"><Video className="w-4 h-4"/> Video <ChevronDown className="w-3 h-3 text-muted"/></div>
                       <div className="flex items-center gap-2 cursor-pointer hover:text-green-400 transition-colors"><ImageIcon className="w-4 h-4"/> Image <ChevronDown className="w-3 h-3 text-muted"/></div>
                       <div className="flex items-center gap-2 cursor-pointer hover:text-green-400 transition-colors"><User className="w-4 h-4"/> Character <ChevronDown className="w-3 h-3 text-muted"/></div>
                       <div className="flex items-center gap-2 cursor-pointer hover:text-green-400 transition-colors"><Globe className="w-4 h-4"/> World <span className="text-[9px] bg-green-500 text-black px-1.5 py-0.5 rounded font-extrabold -ml-1">NEW</span> <ChevronDown className="w-3 h-3 text-muted"/></div>
                       <div className="flex items-center gap-2 cursor-pointer hover:text-green-400 transition-colors"><Mic className="w-4 h-4"/> Audio <ChevronDown className="w-3 h-3 text-muted"/></div>
                    </div>
                  </div>
                  
                  {/* Hero Feature Banners */}
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-16">
                     <div className="lg:col-span-2 relative group rounded-[16px] overflow-hidden aspect-[21/9] lg:aspect-auto h-full min-h-[220px] cursor-pointer" onClick={() => {setActiveTab('create'); setStep('forming');}}>
                        <video src="/videos/firefly_11.mp4" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" autoPlay muted loop playsInline />
                        <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-black/90 to-transparent pointer-events-none" />
                        <div className="absolute bottom-6 left-6 z-10 space-y-3">
                           <h3 className="text-white text-2xl font-extrabold tracking-tight">Seedance 2.0</h3>
                           <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-white text-[11px] font-bold border border-white/20 transition-colors">Create Video</button>
                        </div>
                     </div>
                     <div className="relative group rounded-[16px] overflow-hidden aspect-[4/3] lg:aspect-auto h-full min-h-[220px] cursor-pointer" onClick={() => {setActiveTab('create'); setStep('forming');}}>
                        <video src="/videos/firefly_12.mp4" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" autoPlay muted loop playsInline />
                        <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-black/90 to-transparent pointer-events-none" />
                        <div className="absolute bottom-6 left-6 z-10 space-y-3">
                           <h3 className="text-white text-lg font-extrabold tracking-tight">Create Your Own AI World</h3>
                           <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-white text-[11px] font-bold border border-white/20 transition-colors">Create 3D World</button>
                        </div>
                     </div>
                     <div className="relative group rounded-[16px] overflow-hidden aspect-[4/3] lg:aspect-auto h-full min-h-[220px] cursor-pointer" onClick={() => {setActiveTab('create'); setStep('forming');}}>
                        <video src="/videos/firefly_13.mp4" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" autoPlay muted loop playsInline />
                        <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-black/90 to-transparent pointer-events-none" />
                        <div className="absolute bottom-6 left-6 z-10 space-y-3">
                           <h3 className="text-white text-lg font-extrabold leading-tight tracking-tight">AI Personality of the<br/>Year Awards</h3>
                           <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-white text-[11px] font-bold border border-white/20 transition-colors">Create. Post. Win $20K</button>
                        </div>
                     </div>
                  </div>

                  {/* Suite Tools Layout */}
                  <div className="mb-20">
                     <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-extrabold text-white tracking-tight">OpenArt Suite</h2>
                        <button className="text-muted text-sm font-bold hover:text-white transition-colors flex items-center gap-1.5">More <ArrowRight className="w-3.5 h-3.5" /></button>
                     </div>
                     <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {suiteTools.map(tool => (
                           <div key={tool.id} onClick={() => {setActiveTab('create'); setStep('forming'); setMode('guided');}} className={`group relative ${tool.bg} hover:bg-[#1A1A1A] border border-white/5 hover:border-green-500/30 rounded-[20px] p-4 flex justify-between cursor-pointer transition-colors duration-300 h-28`}>
                              <div className="flex flex-col gap-1 w-[55%]">
                                 <h4 className={`text-[13px] font-extrabold tracking-tight ${tool.titleColor}`}>{tool.title}</h4>
                                 <p className="text-[10px] text-muted font-medium leading-normal line-clamp-3 pr-2">{tool.desc}</p>
                              </div>
                              <div className="w-[84px] h-[84px] rounded-2xl overflow-hidden self-center relative shadow-lg bg-black shrink-0 -mr-1">
                                  <video src={tool.icon} className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop playsInline />
                                  <div className="absolute bottom-1 right-1 rounded border border-white/20 overflow-hidden">
                                     <div className="bg-black/80 backdrop-blur-md px-1 py-0.5 text-[6px] font-extrabold tracking-widest text-white uppercase transform scale-90 origin-bottom-right">PROMPT</div>
                                  </div>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>



                 {/* Media Archive */}
                 <div className="space-y-8 pt-8">
                   <div className="flex items-center justify-between">
                     <h2 className="text-2xl font-extrabold tracking-tight">{T.samples}</h2>
                     <div className="flex bg-accent/50 p-1 rounded-xl">
                        {categories.map(c => (
                          <button 
                            key={c.id} 
                            onClick={() => setActiveCategory(c.id)} 
                            className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${activeCategory === c.id ? 'bg-card text-foreground shadow-sm' : 'text-muted hover:text-foreground'}`}
                          >
                            {c.label}
                          </button>
                        ))}
                     </div>
                   </div>
                   <div className="columns-2 md:columns-4 gap-6 w-full mx-auto pb-10">
                      {filteredVideos.map((v, i) => (
                        <motion.div 
                          key={v.id} 
                          variants={itemVariants}
                          className={`group relative overflow-hidden bg-black break-inside-avoid w-full mb-6 rounded-3xl shadow-xl border border-white/5 ${v.aspect}`}
                        >
                           <video 
                             src={v.thumb} 
                             className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
                             muted 
                             loop 
                             playsInline 
                             onMouseEnter={(e) => e.currentTarget.play()}
                             onMouseLeave={(e) => { e.currentTarget.pause(); }}
                           />
                           
                           {/* Dark dim on hover just for interaction feel */}
                           <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none z-10" />
                           
                           {/* Isolated Badge overlay matching exact reference style */}
                           <div className="absolute bottom-4 left-4 z-20">
                              <div className={`w-9 h-9 rounded-[10px] flex items-center justify-center shadow-lg ${v.badge?.color}`}>
                                 {v.badge?.type === 'text' && <span className="font-extrabold text-[15px] tracking-tighter leading-none -ml-0.5">{v.badge.text}</span>}
                                 {v.badge?.type === 'icon' && <div className="w-3.5 h-3.5 bg-black rotate-45 transform" />}
                                 {v.badge?.type === 'google' && (
                                   <Globe className="w-5 h-5 text-blue-500" />
                                 )}
                              </div>
                           </div>
                        </motion.div>
                      ))}
                   </div>
                 </div>
               </motion.div>
             )}

             {/* CREATE: Advanced Studio Parameters */}
             {activeTab === 'create' && step === 'forming' && (
                <motion.div 
                  key="forming"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  className="max-w-4xl mx-auto space-y-10"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button onClick={() => setActiveTab('dashboard')} className="p-3 rounded-2xl bg-accent/50 hover:bg-accent transition-all text-primary border border-border/50">
                        <ArrowRight className="w-5 h-5 rotate-180" />
                      </button>
                      <h1 className="text-3xl font-extrabold tracking-tight">{lang === 'am' ? 'አዲስ ፕሮጀክት' : 'Initialize Studio'}</h1>
                    </div>
                    <div className="hidden md:flex gap-1.5 p-1 bg-accent/50 rounded-xl border border-border/50">
                       <button onClick={() => setMode('guided')} className={`px-5 py-2 rounded-lg text-xs font-extrabold transition-all ${mode === 'guided' ? 'bg-card text-primary shadow-sm' : 'text-muted'}`}>{T.form.mode1}</button>
                       <button onClick={() => setMode('prompt')} className={`px-5 py-2 rounded-lg text-xs font-extrabold transition-all ${mode === 'prompt' ? 'bg-card text-primary shadow-sm' : 'text-muted'}`}>{T.form.mode2}</button>
                    </div>
                  </div>

                  <div className="high-end-card p-10 space-y-10 border-border shadow-2xl relative overflow-hidden bg-card">                    
                    {mode === 'guided' ? (
                       <div className="grid grid-cols-2 gap-8">
                          <div className="space-y-3">
                             <label className="text-[12px] font-extrabold uppercase text-primary/80 tracking-widest">{T.form.businessName}</label>
                             <input type="text" value={form.businessName} onChange={(e) => setForm({...form, businessName: e.target.value})} className="w-full high-end-input p-4 text-sm font-bold text-foreground" placeholder="e.g. Skyline Media" />
                          </div>
                          <div className="space-y-3">
                             <label className="text-[12px] font-extrabold uppercase text-primary/80 tracking-widest">{T.form.businessType}</label>
                             <input type="text" value={form.businessType} onChange={(e) => setForm({...form, businessType: e.target.value})} className="w-full high-end-input p-4 text-sm font-bold text-foreground" placeholder="e.g. Creative Agency" />
                          </div>
                          <div className="space-y-3">
                             <label className="text-[12px] font-extrabold uppercase text-primary/80 tracking-widest">{T.form.product}</label>
                             <input type="text" value={form.product} onChange={(e) => setForm({...form, product: e.target.value})} className="w-full high-end-input p-4 text-sm font-bold text-foreground" placeholder="e.g. Virtual Showroom" />
                          </div>
                          <div className="space-y-3">
                             <label className="text-[12px] font-extrabold uppercase text-primary/80 tracking-widest">{T.form.style}</label>
                             <select value={form.style} onChange={(e) => setForm({...form, style: e.target.value})} className="w-full high-end-input p-4 text-sm font-bold text-foreground appearance-none">
                               {T.styles.map(s => <option key={s} value={s}>{s}</option>)}
                             </select>
                          </div>
                       </div>
                    ) : (
                      <div className="space-y-3">
                        <label className="text-[12px] font-extrabold uppercase text-primary/80 tracking-widest">{T.form.promptLabel}</label>
                        <textarea 
                          value={originalPrompt} 
                          onChange={(e) => setOriginalPrompt(e.target.value)}
                          className="w-full high-end-input p-8 text-xl font-bold min-h-[250px] resize-none"
                          placeholder={T.form.promptPlaceholder || 'Describe your idea...'}
                        />
                      </div>
                    )}

                    <button 
                      onClick={handleFormSubmit} 
                      className="w-full primary-btn py-5 rounded-2xl font-extrabold text-2xl flex items-center justify-center gap-4 vivid-glow"
                      disabled={mode === 'prompt' ? !originalPrompt : !form.businessName}
                    >
                       <Zap className="w-8 h-8 fill-current" /> {T.ctaGenerate || 'Generate Cinematic Video'}
                    </button>
                  </div>
                </motion.div>
             )}

             {/* LOADING: Cinematic Synthesis */}
             {step === 'loading' && (
               <motion.div 
                 key="loading"
                 className="h-full flex flex-col items-center justify-center space-y-16 absolute inset-0 z-50 bg-black/80 backdrop-blur-3xl rounded-[32px] overflow-hidden"
               >
                 <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.15),transparent_70%)] pointer-events-none" />
                 <div className="w-48 h-48 relative group z-10">
                    <div className="absolute inset-0 bg-primary/30 rounded-full blur-3xl animate-pulse" />
                    <svg className="w-full h-full overflow-visible drop-shadow-[0_0_20px_rgba(139,92,246,0.6)]">
                      <motion.circle 
                         cx="96" cy="96" r="86" 
                         stroke="rgba(255,255,255,0.05)" strokeWidth="2" fill="none"
                      />
                      <motion.circle 
                         cx="96" cy="96" r="86" 
                         stroke="var(--primary)" strokeWidth="6" fill="none"
                         strokeDasharray="540"
                         initial={{ strokeDashoffset: 540 }}
                         animate={{ strokeDashoffset: 540 - (progressStep + 1) * 135 }}
                         strokeLinecap="round"
                         className="transition-all duration-[2.5s] ease-in-out"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                       <Sparkles className="w-16 h-16 text-white animate-pulse drop-shadow-[0_0_15px_var(--primary-glow)]" />
                    </div>
                 </div>
                 <div className="text-center space-y-4 max-w-lg relative z-10">
                    <AnimatePresence mode="popLayout">
                      <motion.h2 
                        key={progressStep}
                        initial={{ opacity: 0, y: 15, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: -15, filter: 'blur(10px)' }}
                        className="text-4xl font-extrabold tracking-tight text-white drop-shadow-2xl"
                      >
                        {loadingMessages[progressStep]}
                      </motion.h2>
                    </AnimatePresence>
                    <p className="text-primary font-bold italic tracking-wide">Rendering cinematic visuals...</p>
                 </div>
               </motion.div>
             )}

             {step === 'result' && (
               <motion.div 
                 key="result"
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="h-full grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10"
               >
                 <div className="absolute -inset-8 bg-black/40 pointer-events-none -z-10 rounded-[40px] backdrop-blur-md shadow-2xl" />
                 <div className="lg:col-span-8 space-y-8">
                    <div className="aspect-video bg-black rounded-[32px] overflow-hidden border border-border shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] relative group cursor-pointer">
                       <video src="https://videos.pexels.com/video-files/3209211/3209211-uhd_2560_1440_25fps.mp4" controls autoPlay loop className="w-full h-full object-cover" />
                       <div className="absolute top-6 left-6 p-1.5 bg-primary rounded-lg text-white font-bold text-[10px] uppercase tracking-widest shadow-lg">AI Studio Master</div>
                    </div>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                       <div className="space-y-1">
                         <h1 className="text-3xl font-extrabold tracking-tight">{T.results.ready}</h1>
                         <div className="flex items-center gap-3 text-muted text-sm font-medium">
                            <CheckCircle2 className="w-4 h-4 text-green-500" /> Fully Optimized for Premium Distibution
                         </div>
                       </div>
                       <div className="flex gap-4 w-full md:w-auto">
                          <button className="flex-1 md:flex-none px-8 py-4 rounded-2xl bg-accent p-2 border border-border hover:bg-accent transition-all font-bold flex items-center justify-center gap-3">
                            <Share2 className="w-5 h-5" /> Share
                          </button>
                          <button className="flex-1 md:flex-none primary-btn px-10 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 vivid-glow shadow-[0_0_20px_var(--primary-glow)]">
                            <Download className="w-5 h-5" /> {T.results.download}
                          </button>
                       </div>
                    </div>
                 </div>

                 <div className="lg:col-span-4 space-y-6">
                    <div className="high-end-card p-8 space-y-10 border-border shadow-xl bg-card">
                       <div className="space-y-3">
                         <p className="text-[10px] uppercase font-extrabold text-muted tracking-widest flex items-center gap-2">
                           <Library className="w-3 h-3" /> Studio Input
                         </p>
                         <div className="bg-accent/40 border border-border/50 p-4 rounded-2xl text-sm italic font-medium leading-relaxed font-serif">"{originalPrompt}"</div>
                       </div>
                       
                       <div className="h-[1px] bg-border/50" />

                       <div className="space-y-3">
                         <p className="text-[10px] uppercase font-extrabold text-primary tracking-widest flex items-center gap-2">
                           <Sparkles className="w-3 h-3" /> Enhanced Parameters
                         </p>
                         <div className="bg-primary/5 border border-primary/20 p-6 rounded-2xl text-sm leading-relaxed font-medium text-foreground/80">{enhancedPrompt}</div>
                       </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                       <button onClick={() => setStep('forming')} className="px-6 py-4 rounded-2xl border border-border font-extrabold hover:bg-accent transition-all flex items-center justify-center gap-3 bg-card">
                         <RefreshCw className="w-5 h-5" /> Re-Synthesize Visuals
                       </button>
                       <button onClick={() => {setStep('idle'); setActiveTab('dashboard');}} className="px-6 py-4 rounded-2xl border border-border font-extrabold hover:bg-accent transition-all flex items-center justify-center gap-3 bg-card text-muted">
                         <HomeIcon className="w-5 h-5" /> Dashboard
                       </button>
                    </div>
                 </div>
               </motion.div>
             )}

           </AnimatePresence>
        </main>
      </div>
      
    </div>
  );
}
