/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Instagram, Youtube, SkipBack, SkipForward } from 'lucide-react';
import { motion } from 'motion/react';
import { HeadlinesTicker } from './components/HeadlinesTicker';
import { getProgramInfo } from './data/schedule';

const WhatsappIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Placeholder stream URL - can be replaced with the actual Radio520 stream URL
  const streamUrl = "https://servidor40.brlogic.com:7054/live"; 

  const [programInfo, setProgramInfo] = useState(getProgramInfo());

  useEffect(() => {
    // Update current program every minute
    const interval = setInterval(() => {
      setProgramInfo(getProgramInfo());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] flex flex-col items-center justify-center p-4 md:p-10 relative overflow-hidden font-sans text-white">
      {/* Background Gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none" style={{
        backgroundImage: `
          radial-gradient(circle at 20% 20%, #2c0b0e 0%, transparent 40%),
          radial-gradient(circle at 80% 80%, #1a1a2e 0%, transparent 50%),
          radial-gradient(circle at 50% 50%, #0a0a0c 0%, #000 100%)
        `
      }} />

      <div className="relative z-10 w-full max-w-[1024px] flex flex-col h-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div className="text-[32px] font-black tracking-tight flex items-center gap-2.5">
            RADIO<span className="text-[#ff3b30]">520</span>
          </div>
          <div className="bg-[#ff3b30] px-3 py-1 rounded text-xs font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(255,59,48,0.4)]">
            Ao Vivo
          </div>
        </div>

        {/* Main Container */}
        <div className="flex-1 flex justify-center items-center w-full pb-10">
          
          {/* Player Card */}
          <div className="bg-[rgba(255,255,255,0.08)] backdrop-blur-[25px] border border-[rgba(255,255,255,0.12)] rounded-[32px] p-6 md:p-10 flex flex-col justify-center items-center text-center shadow-2xl w-full max-w-[480px]">
            
            <div className="w-[240px] h-[240px] md:w-[280px] md:h-[280px] rounded-[24px] mb-[30px] shadow-[0_30px_60px_rgba(0,0,0,0.5)] flex items-center justify-center border border-white/10 overflow-hidden relative group">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
              <img 
                src="https://public-rf-upload.minhawebradio.net/249695/ad/b30edc6bd71dc1fc388825269de83aca.jpeg" 
                alt="Radio520 Logo" 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="mb-[20px]">
                <h1 className="text-[28px] md:text-[36px] mb-2 font-bold leading-tight">{programInfo.current}</h1>
                <p className="text-[rgba(255,255,255,0.6)] text-[16px] md:text-[18px]">A seguir: {programInfo.next}</p>
            </div>

            {/* Ticker de Notícias */}
            <HeadlinesTicker />

            {/* Controls */}
            <div className="flex items-center gap-8 mb-[30px]">
              <button className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all active:scale-95">
                <SkipBack className="w-5 h-5 fill-current" />
              </button>
              
              <button 
                onClick={togglePlay}
                className="relative w-[88px] h-[88px] flex items-center justify-center group"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-[#ff3b30] to-[#ff8b30] rounded-full opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(255,59,48,0.4)] group-hover:shadow-[0_0_40px_rgba(255,59,48,0.6)]"></div>
                <div className="absolute inset-1 bg-black rounded-full flex items-center justify-center z-10 group-hover:scale-[1.02] transition-transform duration-300">
                  {isPlaying ? (
                    <Pause className="w-8 h-8 text-white fill-current" />
                  ) : (
                    <Play className="w-8 h-8 text-white fill-current ml-1" />
                  )}
                </div>
              </button>

              <button className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all active:scale-95">
                <SkipForward className="w-5 h-5 fill-current" />
              </button>
            </div>

            {/* Visualizer */}
            <div className="flex items-end gap-1 h-10 mb-6">
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1.5 bg-[#ff3b30] rounded-full opacity-60"
                  animate={{
                    height: isPlaying ? ['30%', '100%', '40%', '80%', '50%'] : '10%',
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                    delay: i * 0.1,
                  }}
                  style={{ height: '10%' }}
                />
              ))}
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-4 px-4 w-full max-w-xs">
              <button onClick={toggleMute} className="text-[rgba(255,255,255,0.6)] hover:text-white transition-colors">
                {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="flex-1 h-1.5 bg-white/10 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full cursor-pointer"
              />
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 mt-8 pt-8 border-t border-white/10 w-full justify-center">
              <SocialIconButton href="https://wa.me/5511988277967" icon={<WhatsappIcon className="w-5 h-5" />} colorClass="hover:text-[#25D366] hover:bg-[#25D366]/10" />
              <SocialIconButton href="https://instagram.com/radio520oficial" icon={<Instagram className="w-5 h-5" />} colorClass="hover:text-[#E1306C] hover:bg-[#E1306C]/10" />
              <SocialIconButton href="https://youtube.com/@radio520real?si=F1u1CbUDmjePt9Pn" icon={<Youtube className="w-5 h-5" />} colorClass="hover:text-[#FF0000] hover:bg-[#FF0000]/10" />
              <SocialIconButton href="https://x.com/radio_520" icon={<XIcon className="w-4 h-4" />} colorClass="hover:text-white hover:bg-white/10" />
            </div>

          </div>
        </div>

        {/* Hidden Audio Element */}
        <audio
          ref={audioRef}
          src={streamUrl}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
        />
      </div>
    </div>
  );
}

function SocialIconButton({ href, icon, colorClass }: { href: string, icon: React.ReactNode, colorClass: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white/60 transition-all duration-300 ${colorClass}`}
    >
      {icon}
    </a>
  );
}

