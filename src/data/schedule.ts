export type Program = { start: string; end: string; name: string };
export type WeeklySchedule = Record<number, Program[]>;

export const scheduleData: WeeklySchedule = {
  0: [ // Domingo
    { start: "00:00", end: "02:00", name: "LOVE HITS" },
    { start: "02:00", end: "11:50", name: "SUPERSEQUÊNCIA" },
    { start: "05:00", end: "07:00", name: "ORASOM 520" },
    { start: "07:00", end: "11:50", name: "RADIO520 CLASSIC HITS" },
    { start: "11:50", end: "12:00", name: "REPÓRTER520" },
    { start: "12:00", end: "13:00", name: "RADIO520 ESPORTE SHOW" },
    { start: "12:00", end: "14:00", name: "ZIRIGUIDUM" },
    { start: "14:00", end: "14:10", name: "REPÓRTER520" },
    { start: "14:10", end: "18:00", name: "BR520" },
    { start: "18:00", end: "18:10", name: "HORA DA AVE MARIA" },
    { start: "18:10", end: "20:00", name: "A ERA DO ROCK" },
    { start: "20:00", end: "20:10", name: "REPÓRTER520" },
    { start: "20:00", end: "21:10", name: "ZONA MISTA" },
    { start: "21:10", end: "00:00", name: "TOP BILLBOARD" },
    { start: "22:00", end: "23:00", name: "RADIO520 ESPORTE SHOW" },
    { start: "23:00", end: "00:00", name: "RADIO520 CLASSIC HITS" }
  ],
  1: [ // Segunda
    { start: "00:00", end: "00:10", name: "VERSUS520 - UMA BATALHA MUSICAL" },
    { start: "01:20", end: "01:30", name: "REPÓRTER 520" },
    { start: "01:30", end: "05:00", name: "INSÔNIA" },
    { start: "05:00", end: "08:00", name: "GIRO520" },
    { start: "08:00", end: "08:10", name: "VERSUS520 - UMA BATALHA MUSICAL" },
    { start: "08:10", end: "10:00", name: "CAFEÍNA" },
    { start: "10:00", end: "10:10", name: "REPÓRTER520" },
    { start: "10:10", end: "12:00", name: "VIBE520" },
    { start: "12:00", end: "13:00", name: "RADIO520 ESPORTE SHOW" },
    { start: "12:10", end: "12:20", name: "REPÓRTER520" },
    { start: "12:20", end: "17:00", name: "MARATONA520" },
    { start: "17:00", end: "17:10", name: "VERSUS520 - UMA BATALHA MUSICAL" },
    { start: "17:10", end: "18:00", name: "BR520" },
    { start: "18:00", end: "18:10", name: "HORA DA AVE MARIA" },
    { start: "18:10", end: "20:00", name: "MIX520 - AS MAIS TOCADAS PELO MUNDO" },
    { start: "20:00", end: "20:10", name: "REPÓRTER520" },
    { start: "20:10", end: "21:10", name: "ZONA MISTA" },
    { start: "21:10", end: "22:00", name: "RÁDIO 520 - A SUA RÁDIO" },
    { start: "22:00", end: "22:10", name: "VERSUS520 - UMA BATALHA MUSICAL" },
    { start: "22:00", end: "23:00", name: "RADIO520 ESPORTE SHOW" },
    { start: "22:10", end: "00:00", name: "RADIO520 CLASSIC HITS" }
  ],
  2: [ // Terça
    { start: "00:00", end: "00:10", name: "VERSUS520 - UMA BATALHA MUSICAL" },
    { start: "01:10", end: "01:20", name: "REPÓRTER520" },
    { start: "01:30", end: "05:00", name: "INSÔNIA" },
    { start: "05:00", end: "08:00", name: "GIRO520" },
    { start: "08:00", end: "08:10", name: "VERSUS520 - UMA BATALHA MUSICAL" },
    { start: "08:10", end: "10:00", name: "CAFEÍNA" },
    { start: "10:00", end: "10:10", name: "REPÓRTER520" },
    { start: "10:10", end: "12:10", name: "VIBE520" },
    { start: "12:00", end: "13:00", name: "RADIO520 ESPORTE SHOW" },
    { start: "12:10", end: "12:20", name: "REPÓRTER520" },
    { start: "12:20", end: "17:00", name: "MARATONA520" },
    { start: "17:00", end: "17:10", name: "VERSUS520 - UMA BATALHA MUSICAL" },
    { start: "17:10", end: "18:00", name: "BR520" },
    { start: "18:00", end: "18:10", name: "HORA DA AVE MARIA" },
    { start: "18:10", end: "20:00", name: "MIX520 - AS MAIS TOCADAS PELO MUNDO" },
    { start: "20:00", end: "20:10", name: "REPÓRTER520" },
    { start: "20:10", end: "22:00", name: "BUSINESS ROCK" },
    { start: "22:00", end: "22:10", name: "VERSUS520 - UMA BATALHA MUSICAL" },
    { start: "22:00", end: "23:00", name: "RADIO520 ESPORTE SHOW" },
    { start: "22:00", end: "00:00", name: "RADIO520 CLASSIC HITS" }
  ],
  3: [ // Quarta
    { start: "00:00", end: "00:10", name: "VERSUS520 - UMA BATALHA MUSICAL" },
    { start: "01:20", end: "01:30", name: "REPÓRTER520" },
    { start: "01:30", end: "05:00", name: "INSÔNIA" },
    { start: "05:00", end: "08:00", name: "GIRO520" },
    { start: "08:00", end: "08:10", name: "VERSUS520 - UMA BATALHA MUSICAL" },
    { start: "08:10", end: "10:00", name: "CAFEÍNA" },
    { start: "10:00", end: "10:10", name: "REPÓRTER520" },
    { start: "10:10", end: "12:10", name: "VIBE520" },
    { start: "12:00", end: "13:00", name: "RADIO520 ESPORTE SHOW" },
    { start: "12:10", end: "12:20", name: "REPÓRTER 520" },
    { start: "12:20", end: "17:00", name: "MARATONA520" },
    { start: "17:00", end: "17:10", name: "VERSUS520 - UMA BATALHA MUSICAL" },
    { start: "17:10", end: "18:00", name: "BR520" },
    { start: "18:00", end: "18:10", name: "HORA DA AVE MARIA" },
    { start: "18:05", end: "20:00", name: "MIX520 - AS MAIS TOCADAS PELO MUNDO" },
    { start: "20:00", end: "20:10", name: "REPÓRTER520" },
    { start: "20:10", end: "22:00", name: "BEATS520" },
    { start: "22:00", end: "22:10", name: "VERSUS520 - UMA BATALHA MUSICAL" },
    { start: "22:00", end: "23:00", name: "RADIO520 ESPORTE SHOW" },
    { start: "22:00", end: "00:00", name: "RADIO520 CLASSIC HITS" }
  ],
  4: [ // Quinta
    { start: "00:00", end: "00:10", name: "VERSUS520 - UMA BATALHA MUSICAL" },
    { start: "01:20", end: "01:30", name: "REPÓRTER 520" },
    { start: "01:30", end: "05:00", name: "INSÔNIA" },
    { start: "05:00", end: "08:00", name: "GIRO520" },
    { start: "08:00", end: "08:10", name: "VERSUS520 - UMA BATALHA MUSICAL" },
    { start: "08:10", end: "10:00", name: "CAFEÍNA" },
    { start: "10:00", end: "10:10", name: "REPÓRTER520" },
    { start: "10:10", end: "12:10", name: "VIBE520" },
    { start: "12:00", end: "13:00", name: "RADIO520 ESPORTE SHOW" },
    { start: "12:10", end: "12:20", name: "REPÓRTER520" },
    { start: "12:20", end: "17:00", name: "MARATONA520" },
    { start: "17:00", end: "17:10", name: "VERSUS520 - UMA BATALHA MUSICAL" },
    { start: "17:00", end: "18:00", name: "BR520" },
    { start: "18:00", end: "18:10", name: "HORA DA AVE MARIA" },
    { start: "18:05", end: "20:00", name: "MIX520 - AS MAIS TOCADAS PELO MUNDO" },
    { start: "20:00", end: "20:10", name: "REPÓRTER520" },
    { start: "20:15", end: "22:00", name: "RÁDIO520 - TOP20" },
    { start: "22:00", end: "22:10", name: "VERSUS520 - UMA BATALHA MUSICAL" },
    { start: "22:00", end: "23:00", name: "RADIO520 ESPORTE SHOW" },
    { start: "22:10", end: "00:00", name: "RADIO520 CLASSIC HITS" }
  ],
  5: [ // Sexta
    { start: "00:00", end: "00:10", name: "VERSUS520 - UMA BATALHA MUSICAL" },
    { start: "01:20", end: "01:30", name: "REPÓRTER520" },
    { start: "01:30", end: "05:00", name: "INSÔNIA" },
    { start: "05:00", end: "08:00", name: "GIRO520" },
    { start: "08:00", end: "08:10", name: "VERSUS520 - UMA BATALHA MUSICAL" },
    { start: "08:10", end: "10:00", name: "CAFEÍNA" },
    { start: "10:00", end: "10:10", name: "REPÓRTER520" },
    { start: "10:10", end: "12:10", name: "VIBE520" },
    { start: "12:00", end: "13:00", name: "RADIO520 ESPORTE SHOW" },
    { start: "13:00", end: "13:10", name: "REPÓRTER520" },
    { start: "13:10", end: "17:00", name: "MARATONA520" },
    { start: "16:50", end: "17:00", name: "MÚSICA DO DIA" },
    { start: "17:00", end: "18:00", name: "BR520" },
    { start: "18:00", end: "18:10", name: "HORA DA AVE MARIA" },
    { start: "18:05", end: "20:00", name: "MIX520 - AS MAIS TOCADAS PELO MUNDO" },
    { start: "20:00", end: "20:10", name: "REPÓRTER520" },
    { start: "20:10", end: "22:00", name: "A ERA DO ROCK" },
    { start: "22:00", end: "23:00", name: "RADIO520 ESPORTE SHOW" },
    { start: "23:00", end: "23:10", name: "VERSUS520 - UMA BATALHA MUSICAL" },
    { start: "23:10", end: "00:00", name: "RADIO520 CLASSIC HITS" }
  ],
  6: [ // Sábado
    { start: "00:00", end: "00:10", name: "VERSUS520 - UMA BATALHA MUSICAL" },
    { start: "00:10", end: "02:00", name: "LOVE HITS" },
    { start: "02:00", end: "10:10", name: "RADIO520 CLASSIC HITS" },
    { start: "10:10", end: "10:20", name: "REPÓRTER520" },
    { start: "10:20", end: "11:50", name: "RÁDIO520 - TOP20" },
    { start: "11:50", end: "12:00", name: "RÁDIO520 VIVA MELHOR" },
    { start: "12:00", end: "13:00", name: "RADIO520 ESPORTE SHOW" },
    { start: "12:00", end: "14:00", name: "ZIRIGUIDUM" },
    { start: "14:00", end: "14:10", name: "VERSUS520 - UMA BATALHA MUSICAL" },
    { start: "14:10", end: "18:00", name: "MARATONA520" },
    { start: "18:00", end: "18:10", name: "HORA DA AVE MARIA" },
    { start: "18:10", end: "19:50", name: "BR520" },
    { start: "19:50", end: "20:00", name: "VERSUS520 - UMA BATALHA MUSICAL" },
    { start: "20:00", end: "22:00", name: "RÁDIO520 - DANCE CLUB" },
    { start: "22:00", end: "00:00", name: "RÁDIO 520 - A SUA RÁDIO" },
    { start: "22:00", end: "23:00", name: "RADIO520 ESPORTE SHOW" },
    { start: "23:00", end: "00:00", name: "CLASSIC HITS" }
  ]
};

export function getProgramInfo(): { current: string; next: string } {
  const now = new Date();
  const day = now.getDay();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const currentTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

  const todaySchedule = scheduleData[day];
  if (!todaySchedule || todaySchedule.length === 0) {
    return { current: "Programação Rádio520", next: "Aguarde..." };
  }

  for (let i = 0; i < todaySchedule.length; i++) {
    const prog = todaySchedule[i];
    const start = prog.start;
    const end = prog.end === "00:00" ? "24:00" : prog.end;
    
    if (currentTime >= start && currentTime < end) {
      let nextProgName = "Aguarde...";
      if (i + 1 < todaySchedule.length) {
        nextProgName = todaySchedule[i + 1].name;
      } else {
        const nextDay = (day + 1) % 7;
        if (scheduleData[nextDay] && scheduleData[nextDay].length > 0) {
          nextProgName = scheduleData[nextDay][0].name;
        }
      }
      return { current: prog.name, next: nextProgName };
    }
  }
  
  return { current: "Programação Rádio520", next: "Aguarde..." };
}
