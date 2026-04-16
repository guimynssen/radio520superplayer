import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { headlines as initialHeadlines } from '../data/headlines';

export function HeadlinesTicker() {
  const [headlines, setHeadlines] = useState(initialHeadlines);
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    // A cada 30 segundos, exibe a logo por 5 segundos
    const interval = setInterval(() => {
      setShowLogo(true);
      setTimeout(() => {
        setShowLogo(false);
      }, 5000);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // Duplicamos o array para criar o efeito de loop infinito contínuo
  const tickerItems = [...headlines, ...headlines];

  return (
    <div className="w-full overflow-hidden bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl py-2.5 mb-[30px] relative flex items-center min-h-[42px]">
      {/* Overlay da Logo */}
      <AnimatePresence>
        {showLogo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 z-20 flex items-center justify-center bg-[#0a0a0c]/95 backdrop-blur-md rounded-xl"
          >
            <img 
              src="https://public-rf-upload.minhawebradio.net/249695/ad/563fe73a5c00172f2eee3693bea4a0de.jpeg" 
              alt="Logo Rádio 520" 
              className="h-6 object-contain rounded" 
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Máscaras de gradiente para suavizar as bordas do ticker */}
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[rgba(255,255,255,0.05)] to-transparent z-10 pointer-events-none rounded-l-xl"></div>
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[rgba(255,255,255,0.05)] to-transparent z-10 pointer-events-none rounded-r-xl"></div>
      
      <div className="flex w-max animate-ticker hover:[animation-play-state:paused]">
        {tickerItems.map((item, index) => (
          <div key={index} className="flex items-center whitespace-nowrap">
            <a 
              href={item.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[13px] md:text-[14px] text-white/80 hover:text-[#ff3b30] transition-colors px-6 cursor-pointer font-medium"
            >
              {item.title}
            </a>
            {/* Separador discreto */}
            <span className="text-[#ff3b30] text-[10px] opacity-60">•</span>
          </div>
        ))}
      </div>
    </div>
  );
}
