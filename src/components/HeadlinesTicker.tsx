import React, { useState, useEffect, useCallback } from 'react';

export const HeadlinesTicker = React.memo(({ refreshTrigger }: { refreshTrigger?: number }) => {
  const [headlines, setHeadlines] = useState<{title: string, url: string}[]>([]);

  const fetchHeadlines = useCallback(async () => {
    try {
      const response = await fetch(`/headlines.json?ts=${Date.now()}`, { cache: "no-store" });
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setHeadlines(data);
    } catch (error) {
      console.error("Failed to fetch headlines:", error);
    }
  }, []);

  useEffect(() => {
    fetchHeadlines();
  }, [fetchHeadlines, refreshTrigger]);

  useEffect(() => {
    const fetchInterval = setInterval(() => {
      fetchHeadlines();
    }, 120000); // 2 minutos

    return () => clearInterval(fetchInterval);
  }, [fetchHeadlines]);

  const renderContent = () => headlines.map((item, index) => (
    <div key={index} className="flex items-center whitespace-nowrap px-6">
      <a 
        href={item.url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-[13px] md:text-[14px] text-white/80 hover:text-[#ff3b30] transition-colors cursor-pointer font-medium"
      >
        {item.title}
      </a>
      <span className="text-[#ff3b30] text-[10px] opacity-60 ml-6">•</span>
    </div>
  ));

  return (
    <div className="w-full overflow-hidden bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl py-2.5 mb-[30px] relative flex items-center min-h-[42px] group">
      
      {/* Overlay da Logo Puro CSS - Zero Travamentos na camada React */}
      <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#0a0a0c]/95 backdrop-blur-md rounded-xl animate-logo-cycle opacity-0 pointer-events-none">
        <img 
          src="https://public-rf-upload.minhawebradio.net/249695/ad/563fe73a5c00172f2eee3693bea4a0de.jpeg" 
          alt="Logo Rádio 520" 
          className="h-6 object-contain rounded" 
        />
      </div>

      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[rgba(255,255,255,0.05)] to-transparent z-10 pointer-events-none rounded-l-xl"></div>
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[rgba(255,255,255,0.05)] to-transparent z-10 pointer-events-none rounded-r-xl"></div>
      
      {/* Container duplo lado-a-lado usando Native CSS Marquee perfeitamente isolado */}
      <div className="flex w-full" key={refreshTrigger}>
        {headlines.length > 0 ? (
          <>
            <div className="flex shrink-0 min-w-full animate-marquee justify-around items-center">
              {renderContent()}
            </div>
            <div aria-hidden="true" className="flex shrink-0 min-w-full animate-marquee justify-around items-center">
              {renderContent()}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
});
