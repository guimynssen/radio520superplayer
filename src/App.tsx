/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Instagram, SkipBack, SkipForward, X, Share2, RefreshCw, Download, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
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

const TiktokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z"/>
  </svg>
);

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const userPaused = useRef(false);

  // Carousel images
  const carouselImages = [
    "https://public-rf-upload.minhawebradio.net/249695/ad/b30edc6bd71dc1fc388825269de83aca.jpeg", // Logo Original
    "https://public-rf-upload.minhawebradio.net/249695/ad/a5c65ae7f0a45d8f5e0c8021d95c3c10.jpeg", // Nova 1
    "https://public-rf-upload.minhawebradio.net/249695/ad/5585acfa426370ca3d4fda0479bfae28.png",  // Nova 2
    "https://public-rf-upload.minhawebradio.net/249695/ad/274256c9f63c83296250e53a2ed6e37d.png"   // Muse
  ];

  const streamBaseUrl = "https://servidor40.brlogic.com:7054/live"; 
  const [streamUrl, setStreamUrl] = useState(streamBaseUrl);

  const [programInfo, setProgramInfo] = useState(getProgramInfo());
  const [refreshCount, setRefreshCount] = useState(0);
  const [showWhatsappPopup, setShowWhatsappPopup] = useState(false);
  const [showCopiedToast, setShowCopiedToast] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [isLoadingAudio, setIsLoadingAudio] = useState(true);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Detect OS: iOS restricts volume change via JS
    const checkIsIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
                       (navigator.userAgent.includes('Mac') && 'ontouchend' in document);
    setIsIOS(checkIsIOS);
    
    // Show WhatsApp popup after 30 seconds
    const timer = setTimeout(() => {
      setShowWhatsappPopup(true);
    }, 30000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Attempt to autoplay on mount
    if (audioRef.current) {
      setIsLoadingAudio(true);
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setAutoplayBlocked(false);
        setIsLoadingAudio(false);
      }).catch(e => {
        console.log("Autoplay blocked by browser policy:", e);
        setIsPlaying(false);
        setAutoplayBlocked(true);
        setIsLoadingAudio(false);
      });
    } else {
      setIsLoadingAudio(false);
    }
  }, []);

  useEffect(() => {
    // Update current program every minute
    const interval = setInterval(() => {
      setProgramInfo(prev => {
        const nextInfo = getProgramInfo();
        // Prevent generic state updates from breaking refs
        if (prev.current === nextInfo.current && prev.next === nextInfo.next) {
          return prev;
        }
        return nextInfo;
      });
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Rotate carousel image every 6 seconds
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
    }, 6000);
    return () => clearInterval(imageInterval);
  }, [carouselImages.length]);

  const handleAudioError = () => {
    console.error("Audio connection lost or stalled. Attempting to reconnect...");
    // Append timestamp securely to bypass aggressive caching on dropped streams
    const separator = streamBaseUrl.includes('?') ? '&' : '?';
    setStreamUrl(`${streamBaseUrl}${separator}cb=${Date.now()}`);
    setIsLoadingAudio(true);
    
    // Automatically try to resume playing if it was playing
    if (isPlaying) {
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play()
            .then(() => setIsLoadingAudio(false))
            .catch(e => {
              console.error("Reconnection playback failed", e);
              setIsLoadingAudio(false);
              setIsPlaying(false);
            });
        }
      }, 1500); // Give the stream a moment to buffer
    } else {
      setIsLoadingAudio(false);
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        userPaused.current = true;
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        userPaused.current = false;
        setIsLoadingAudio(true);
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            setIsLoadingAudio(false);
          })
          .catch(e => {
            console.error("Audio playback failed:", e);
            setIsLoadingAudio(false);
            setIsPlaying(false);
          });
      }
      setAutoplayBlocked(false);
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

  const handleRefresh = () => {
    // Hard refresh: Reloads the page to apply any internal structural 
    // changes made to JS logic, components, or ticker logic.
    // Note: This will interrupt audio play.
    window.location.reload();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Rádio 520',
          text: 'Ouça a Rádio 520 ao vivo!',
          url: window.location.href,
        });
      } catch (err) {
        console.error('Erro ao compartilhar:', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setShowCopiedToast(true);
        setTimeout(() => setShowCopiedToast(false), 3000);
      } catch (err) {
        console.error('Erro ao copiar link:', err);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-10 relative overflow-hidden font-sans text-white">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-black">
        <div className="absolute inset-0" style={{
          backgroundImage: `url('https://public-rf-upload.minhawebradio.net/249695/ad/1e7f8121be68d1901918181128a0309a.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.4
        }} />
      </div>

      <div className="relative z-10 w-full max-w-[1024px] flex flex-col h-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-[32px] font-black tracking-tight flex items-center gap-2.5">
            RADIO<span className="text-[#ff3b30]">520</span>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <button 
              onClick={() => setShowDownloadModal(true)}
              className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all active:scale-95"
              title="Instalar App"
            >
              <Download className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <button 
              onClick={handleRefresh}
              className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all active:scale-95"
              title="Atualizar"
            >
              <RefreshCw className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <button 
              onClick={handleShare}
              className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all active:scale-95"
              title="Compartilhar"
            >
              <Share2 className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <div className="bg-[#ff3b30] px-2 md:px-3 py-1 rounded text-[10px] md:text-xs font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(255,59,48,0.4)] ml-1 md:ml-2">
              Ao Vivo
            </div>
          </div>
        </div>

        {/* Main Container */}
        <div className="flex-1 flex justify-center items-center w-full pb-10">
          
          {/* Player Card */}
          <div className="bg-[rgba(255,255,255,0.08)] backdrop-blur-[25px] border border-[rgba(255,255,255,0.12)] rounded-[32px] p-6 md:p-10 flex flex-col justify-center items-center text-center shadow-2xl w-full max-w-[480px]">
            
            <div className="w-[240px] h-[240px] md:w-[280px] md:h-[280px] rounded-[24px] mb-[30px] shadow-[0_30px_60px_rgba(0,0,0,0.5)] flex items-center justify-center border border-white/10 overflow-hidden relative group">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-20"></div>
              <AnimatePresence initial={false}>
                <motion.div
                  key={currentImageIndex}
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '-100%' }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full"
                >
                  <img 
                    src={carouselImages[currentImageIndex]} 
                    alt="Rádio 520 Cover" 
                    className="w-full h-full object-cover transform scale-[1.01] group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mb-[20px]">
                <h1 className="text-[28px] md:text-[36px] mb-2 font-bold leading-tight">{programInfo.current}</h1>
                <p className="text-[rgba(255,255,255,0.6)] text-[16px] md:text-[18px]">A seguir: {programInfo.next}</p>
            </div>

            {/* Ticker de Notícias */}
            <HeadlinesTicker refreshTrigger={refreshCount} />

            {/* Controls */}
            <div className="flex items-center gap-8 mb-[30px]">
              <button className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all active:scale-95">
                <SkipBack className="w-5 h-5 fill-current" />
              </button>
              
              <button 
                onClick={togglePlay}
                className="relative w-[88px] h-[88px] flex flex-shrink-0 items-center justify-center group cursor-pointer"
              >
                {/* Efeito de Ping (Onda) ao bloquear Auto-Play para chamar atenção ao invés de usar tooltip */}
                {autoplayBlocked && !isPlaying && !isLoadingAudio && (
                  <div className="absolute inset-0 rounded-full border-2 border-[#ff3b30] animate-ping opacity-75 pointer-events-none"></div>
                )}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#ff3b30] to-[#ff8b30] opacity-80 md:group-hover:opacity-100 transition-all duration-300 md:group-hover:shadow-[0_0_40px_rgba(255,59,48,0.6)] md:group-hover:scale-105 rounded-full pointer-events-none"></div>
                <div className="absolute inset-1 bg-black flex items-center justify-center z-10 md:group-hover:scale-[1.02] transition-transform duration-300 rounded-full pointer-events-none">
                  {isLoadingAudio ? (
                    <Loader2 className="w-8 h-8 text-white/70 fill-current animate-spin" />
                  ) : isPlaying ? (
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
            <div className={`flex items-center gap-4 px-4 w-full max-w-xs ${isIOS ? 'justify-center' : ''}`}>
              <button onClick={toggleMute} className="text-[rgba(255,255,255,0.6)] hover:text-white transition-colors">
                {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              {!isIOS && (
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="flex-1 h-1.5 bg-white/10 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full cursor-pointer"
                />
              )}
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 mt-8 pt-8 border-t border-white/10 w-full justify-center">
              <SocialIconButton href="https://wa.me/5511988277967" icon={<WhatsappIcon className="w-5 h-5" />} colorClass="hover:text-[#25D366] hover:bg-[#25D366]/10" />
              <SocialIconButton href="https://instagram.com/radio520oficial" icon={<Instagram className="w-5 h-5" />} colorClass="hover:text-[#E1306C] hover:bg-[#E1306C]/10" />
              <SocialIconButton href="https://www.tiktok.com/@radio520oficial?_r=1&_t=ZS-96GxhY86KYb" icon={<TiktokIcon className="w-5 h-5" />} colorClass="hover:text-white hover:bg-white/10" />
              <SocialIconButton href="https://x.com/radio_520" icon={<XIcon className="w-4 h-4" />} colorClass="hover:text-white hover:bg-white/10" />
            </div>

          </div>
        </div>

        {/* Hidden Audio Element */}
        <audio
          ref={audioRef}
          src={streamUrl}
          preload="auto"
          onCanPlay={() => setIsLoadingAudio(false)}
          onTimeUpdate={(e) => {
            if (e.currentTarget.currentTime > 0) {
              setIsLoadingAudio(false);
              if (!isPlaying && !userPaused.current) {
                 setIsPlaying(true);
              }
            }
          }}
          onPlay={() => {
            setIsPlaying(true);
            setAutoplayBlocked(false);
            setIsLoadingAudio(false);
          }}
          onPlaying={() => {
            setIsPlaying(true);
            setIsLoadingAudio(false);
          }}
          onWaiting={() => setIsLoadingAudio(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
          onError={handleAudioError}
          onStalled={() => {
             // Let it buffer organically before forcing hard reconnect
             setIsLoadingAudio(true);
          }}
        />

        {/* Copied/Refresh Toasts */}
        <AnimatePresence>
          {showCopiedToast && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-[rgba(255,255,255,0.1)] backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full shadow-lg text-sm font-bold flex items-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              Link copiado!
            </motion.div>
          )}
        </AnimatePresence>

        {/* Download/Install Modal */}
        <AnimatePresence>
          {showDownloadModal && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-[#1a1a2e] border border-white/10 rounded-[24px] p-6 md:p-8 max-w-[400px] w-full shadow-2xl relative"
              >
                <button 
                  onClick={() => setShowDownloadModal(false)}
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                
                <div className="w-12 h-12 rounded-full bg-[#ff3b30]/20 text-[#ff3b30] flex items-center justify-center mb-5">
                  <Download className="w-6 h-6" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2">Instale o App da Rádio</h3>
                <p className="text-white/60 text-sm mb-6">
                  Leve a Rádio 520 com você! Adicione nosso aplicativo à tela inicial do seu celular para ouvir com apenas um toque.
                </p>
                
                <div className="space-y-4">
                  <div className="bg-white/5 border border-white/5 rounded-xl p-4">
                    <h4 className="font-bold text-white text-sm flex items-center gap-2 mb-2">
                      <span>🍎</span> iPhone (iOS)
                    </h4>
                    <p className="text-white/60 text-xs leading-relaxed">
                      No Safari, toque no ícone de <strong>Compartilhar</strong> (quadrado com seta para cima) na barra inferior e selecione <strong>"Adicionar à Tela de Início"</strong>.
                    </p>
                  </div>
                  
                  <div className="bg-white/5 border border-white/5 rounded-xl p-4">
                    <h4 className="font-bold text-white text-sm flex items-center gap-2 mb-2">
                      <span>🤖</span> Android
                    </h4>
                    <p className="text-white/60 text-xs leading-relaxed">
                      No Chrome, toque no <strong>Menu</strong> (três pontinhos) no canto superior direito e selecione <strong>"Adicionar à Tela Inicial"</strong> ou "Instalar aplicativo".
                    </p>
                  </div>
                </div>
                
                <button 
                  onClick={() => setShowDownloadModal(false)}
                  className="w-full mt-6 bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-xl transition-colors text-sm"
                >
                  Entendi
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* WhatsApp Popup */}
        <AnimatePresence>
          {showWhatsappPopup && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-2xl shadow-2xl flex items-start gap-4 max-w-[320px]"
            >
              <div className="flex-1">
                <h4 className="font-bold text-[15px] leading-tight mb-1">Mande seu recado! 🎵</h4>
                <p className="text-[13px] text-white/90 leading-tight mb-3">
                  Peça sua música ou mande um salve ao vivo pelo nosso WhatsApp.
                </p>
                <a
                  href="https://wa.me/5511988277967"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-white text-[#25D366] px-4 py-2 rounded-full text-[13px] font-bold hover:bg-white/90 transition-colors"
                  onClick={() => setShowWhatsappPopup(false)}
                >
                  <WhatsappIcon className="w-4 h-4 mr-2" />
                  Enviar Mensagem
                </a>
              </div>
              <button
                onClick={() => setShowWhatsappPopup(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
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

