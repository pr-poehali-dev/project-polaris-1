import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import Icon from '@/components/ui/icon';

interface Track {
  title: string;
  artist: string;
  duration: string;
  spotifyId: string;
  bpm: string;
  effect: string;
}

interface MusicPlayerProps {
  moodIndex: number;
}

const tracksByMood: Track[][] = [
  // 😌 Спокойствие — Классика
  [
    { title: 'Clair de Lune', artist: 'Claude Debussy', duration: '5:02', spotifyId: '5aXAsdwDcfRPNDHBMCdaFQ', bpm: '60', effect: 'Снижает ЧСС до 62 уд/мин' },
    { title: 'Gymnopédie No.1', artist: 'Erik Satie', duration: '3:05', spotifyId: '5NGtFXVpXSvwunEIGeviY3', bpm: '58', effect: 'Уменьшает тревожность на 35%' },
    { title: 'Nocturne Op.9 No.2', artist: 'Frédéric Chopin', duration: '4:33', spotifyId: '2ctvdKmETyOzPb2GiJJT53', bpm: '63', effect: 'Снижает давление на 7 мм рт. ст.' },
  ],
  // 😊 Радость — Джаз
  [
    { title: 'What a Wonderful World', artist: 'Louis Armstrong', duration: '2:20', spotifyId: '29U7stRjqHU6rMiS8BfaI9', bpm: '82', effect: 'Повышает уровень дофамина' },
    { title: 'Fly Me to the Moon', artist: 'Frank Sinatra', duration: '2:27', spotifyId: '5b4PYA2nMpFxnNmQAlQpn7', bpm: '85', effect: 'Стабилизирует ритм сердца' },
    { title: 'Take Five', artist: 'Dave Brubeck', duration: '5:24', spotifyId: '1YQWosTIljIvxAgHWTp7KP', bpm: '88', effect: 'Улучшает настроение за 3 мин' },
  ],
  // 😔 Грусть — Эмбиент
  [
    { title: 'Experience', artist: 'Ludovico Einaudi', duration: '5:13', spotifyId: '1BNC5HNOBEGqGEcTDMqGPN', bpm: '57', effect: 'Снимает эмоциональное напряжение' },
    { title: 'Spiegel im Spiegel', artist: 'Arvo Pärt', duration: '9:58', spotifyId: '4WGnAkBDoZSgIHPR4WcHdX', bpm: '55', effect: 'Нормализует дыхание' },
    { title: 'On the Nature of Daylight', artist: 'Max Richter', duration: '6:43', spotifyId: '6KnoBESILLsIlcIBOfqeqG', bpm: '60', effect: 'Снижает кортизол на 20%' },
  ],
  // 😤 Стресс — Медитация
  [
    { title: 'Weightless', artist: 'Marconi Union', duration: '8:08', spotifyId: '7ygpwy2qP3NbrxVkHvUhXY', bpm: '50', effect: 'Снижает тревогу на 65%' },
    { title: 'Porcelain', artist: 'Moby', duration: '3:58', spotifyId: '3bMNqM0DYqnPbOGHNUd9s6', bpm: '52', effect: 'Успокаивает нервную систему' },
    { title: 'Floating', artist: 'Brian Eno', duration: '9:54', spotifyId: '6LPXnhGjLBJOHpEeez6JKF', bpm: '48', effect: 'Снижает давление на 12 мм рт. ст.' },
  ],
  // 🤩 Энергия — Поп
  [
    { title: 'Happy', artist: 'Pharrell Williams', duration: '3:53', spotifyId: '60nZcImufyMA1MKQY3dcCH', bpm: '96', effect: 'Повышает энергию и мотивацию' },
    { title: "Can't Stop the Feeling", artist: 'Justin Timberlake', duration: '3:56', spotifyId: '6JV2soU0LxfTWggXB3dc6V', bpm: '113', effect: 'Стимулирует выработку эндорфинов' },
    { title: 'Walking on Sunshine', artist: 'Katrina & The Waves', duration: '3:58', spotifyId: '05wIAjNReClZRMfQm0Mtb5', bpm: '102', effect: 'Поднимает настроение за 1 мин' },
  ],
];

export default function MusicPlayer({ moodIndex }: MusicPlayerProps) {
  const [activeTrack, setActiveTrack] = useState(0);

  useEffect(() => {
    setActiveTrack(0);
  }, [moodIndex]);

  const tracks = tracksByMood[moodIndex];
  const track = tracks[activeTrack];

  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 max-w-xl w-full">

      {/* Spotify embed */}
      <div className="rounded-2xl overflow-hidden mb-5">
        <iframe
          key={`${moodIndex}-${activeTrack}`}
          src={`https://open.spotify.com/embed/track/${track.spotifyId}?utm_source=generator&theme=0`}
          width="100%"
          height="152"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          className="border-0 rounded-2xl"
          title={track.title}
        />
      </div>

      {/* Track meta */}
      <div className="flex items-center gap-3 mb-5 px-1">
        <div className="flex-1 min-w-0">
          <p className="text-white font-medium truncate">{track.title}</p>
          <div className="flex items-center gap-2 mt-0.5">
            <Icon name="HeartPulse" size={11} className="text-rose-400 flex-shrink-0" />
            <span className="text-rose-300 text-xs">{track.effect}</span>
          </div>
        </div>
        <div className="flex-shrink-0 text-right">
          <p className="text-violet-400 text-sm font-medium">{track.bpm} BPM</p>
          <p className="text-white/30 text-xs">{track.duration}</p>
        </div>
      </div>

      {/* Track list */}
      <div className="space-y-1.5">
        <p className="text-white/30 text-xs uppercase tracking-widest mb-2 px-1">Все треки подборки</p>
        {tracks.map((t, i) => (
          <button
            key={i}
            onClick={() => setActiveTrack(i)}
            className={cn(
              'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200',
              activeTrack === i
                ? 'bg-white/15 border border-white/20'
                : 'hover:bg-white/10 border border-transparent'
            )}
          >
            <div className={cn(
              'w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs transition-all',
              activeTrack === i ? 'bg-[#1DB954] text-white' : 'bg-white/10 text-white/40'
            )}>
              {activeTrack === i ? <Icon name="Music2" size={12} /> : <span>{i + 1}</span>}
            </div>
            <div className="flex-1 min-w-0">
              <p className={cn('text-sm truncate', activeTrack === i ? 'text-white' : 'text-white/60')}>{t.title}</p>
              <p className="text-white/30 text-xs">{t.artist}</p>
            </div>
            <span className="text-white/30 text-xs flex-shrink-0">{t.duration}</span>
          </button>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-2 justify-center">
        <Icon name="Music" size={12} className="text-[#1DB954]" />
        <span className="text-white/20 text-xs">Воспроизведение через Spotify</span>
      </div>
    </div>
  );
}
