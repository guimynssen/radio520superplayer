import React, { useState } from 'react';
import { scheduleData } from '../data/schedule';

const DAYS = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

export function Schedule() {
  const [selectedDay, setSelectedDay] = useState(new Date().getDay());

  return (
    <div className="mt-10 bg-[rgba(255,255,255,0.08)] backdrop-blur-[25px] border border-[rgba(255,255,255,0.12)] rounded-[32px] p-6 md:p-10 shadow-2xl w-full">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <span className="text-[#ff3b30]">📅</span> Programação
      </h2>

      {/* Day Selector */}
      <div className="flex overflow-x-auto pb-4 mb-6 gap-2 scrollbar-hide">
        {DAYS.map((day, index) => (
          <button
            key={index}
            onClick={() => setSelectedDay(index)}
            className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-bold transition-all ${
              selectedDay === index
                ? 'bg-[#ff3b30] text-white shadow-[0_0_15px_rgba(255,59,48,0.4)]'
                : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Schedule List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {scheduleData[selectedDay]?.map((prog, idx) => {
          const isNow = false; // Could enhance to highlight current program
          return (
            <div 
              key={idx} 
              className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col gap-1 hover:bg-white/10 transition-colors"
            >
              <div className="text-[#ff3b30] font-mono text-sm font-bold">
                {prog.start} - {prog.end}
              </div>
              <div className="text-white font-bold text-sm leading-tight">
                {prog.name}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
