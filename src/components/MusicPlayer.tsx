import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import Icon from '@/components/ui/icon';

interface Track {
  title: string;
  artist: string;
  duration: string;
  youtubeId: string;
  bpm: string;
  effect: string;
}

interface MusicPlayerProps {
  moodIndex: number;
}

const tracksByMood: Track[][] = [
  // 😌 Спокойствие — Классика
  [
    { title: 'Clair de Lune', artist: 'Claude Debussy', duration: '5:02', youtubeId: 'CvFH_6DNRCY', bpm: '60', effect: 'Снижает ЧСС до 62 уд/мин' },
    { title: 'Gymnopédie No.1', artist: 'Erik Satie', duration: '3:17', youtubeId: '4iDRMEP1FTA', bpm: '58', effect: 'Уменьшает тревожность на 35%' },
    { title: 'Nocturne Op.9 No.2', artist: 'Frédéric Chopin', duration: '4:33', youtubeId: '9E6b3swbnWg', bpm: '63', effect: 'Снижает давление на 7 мм рт. ст.' },
  ],
  // 😊 Радость — Джаз
  [
    { title: 'What a Wonderful World', artist: 'Louis Armstrong', duration: '2:20', youtubeId: 'CWzrABouyeE', bpm: '82', effect: 'Повышает уровень дофамина' },
    { title: 'Fly Me to the Moon', artist: 'Frank Sinatra', duration: '2:27', youtubeId: 'EkHTsc9Ms28', bpm: '85', effect: 'Стабилизирует ритм сердца' },
    { title: 'Take Five', artist: 'Dave Brubeck', duration: '5:24', youtubeId: 'vmDDOFXSgAs', bpm: '88', effect: 'Улучшает настроение за 3 мин' },
  ],
  // 😔 Грусть — Эмбиент
  [
    { title: 'Experience', artist: 'Ludovico Einaudi', duration: '5:13', youtubeId: 'hN_q-_nGv4U', bpm: '57', effect: 'Снимает эмоциональное напряжение' },
    { title: 'Spiegel im Spiegel', artist: 'Arvo Pärt', duration: '10:00', youtubeId: 'TJ6Mzvh3XCc', bpm: '55', effect: 'Нормализует дыхание' },
    { title: 'On the Nature of Daylight', artist: 'Max Richter', duration: '6:43', youtubeId: 'b_YHE4Sx-08', bpm: '60', effect: 'Снижает кортизол на 20%' },
  ],
  // 😤 Стресс — Медитация
  [
    { title: '432 Hz Deep Meditation', artist: 'Healing Frequencies', duration: '10:00', youtubeId: 'hhHFpMRwnEA', bpm: '52', effect: 'Снижает ЧСС до 58 уд/мин' },
    { title: 'Weightless', artist: 'Marconi Union', duration: '8:08', youtubeId: 'UfcAVejslrU', bpm: '50', effect: 'Снижает тревогу на 65%' },
    { title: 'Tibetan Singing Bowls', artist: 'Sounds of Nature', duration: '15:00', youtubeId: 'mEPBHN4xIUs', bpm: '48', effect: 'Снижает давление на 12 мм рт. ст.' },
  ],
  // 🤩 Энергия — Поп
  [
    { title: 'Happy', artist: 'Pharrell Williams', duration: '3:53', youtubeId: 'y6Sxv-sUYtM', bpm: '96', effect: 'Повышает энергию и мотивацию' },
    { title: 'Can\'t Stop the Feeling', artist: 'Justin Timberlake', duration: '3:56', youtubeId: 'ru0K8uYEZWw', bpm: '113', effect: 'Стимулирует выработку эндорфинов' },
    { title: 'Walking on Sunshine', artist: 'Katrina & The Waves', duration: '3:58', youtubeId: 'iPUmE-tne5U', bpm: '102', effect: 'Поднимает настроение за 1 мин' },
  ],
];

export default function MusicPlayer({ moodIndex }: MusicPlayerProps) {
  const [activeTrack, setActiveTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const tracks = tracksByMood[moodIndex];
  const track = tracks[activeTrack];

  useEffect(() => {
    setActiveTrack(0);
    setIsPlaying(false);
    setProgress(0);
  }, [moodIndex]);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return p + 0.5;
        });
      }, 200);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying]);

  const handleTrackSelect = (index: number) => {
    setActiveTrack(index);
    setIsPlaying(false);
    setProgress(0);
  };

  const openYoutube = () => {
    window.open(`https://www.youtube.com/watch?v=${track.youtubeId}`, '_blank');
  };

  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 max-w-xl w-full">
      {/* Now playing */}
      <div className="flex items-center gap-4 mb-6">
        <div
          className={cn(
            'w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-teal-500 flex items-center justify-center flex-shrink-0 transition-all duration-300',
            isPlaying && 'shadow-lg shadow-violet-500/40'
          )}
        >
          <Icon name="Music2" size={28} className="text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white font-medium truncate">{track.title}</p>
          <p className="text-white/50 text-sm">{track.artist}</p>
          <div className="flex items-center gap-2 mt-1">
            <Icon name="HeartPulse" size={12} className="text-rose-400 flex-shrink-0" />
            <span className="text-rose-300 text-xs">{track.effect}</span>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-4">
        <div
          className="h-1 bg-white/10 rounded-full cursor-pointer overflow-hidden"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const pct = ((e.clientX - rect.left) / rect.width) * 100;
            setProgress(Math.max(0, Math.min(100, pct)));
          }}
        >
          <div
            className="h-full bg-gradient-to-r from-violet-500 to-teal-400 rounded-full transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-white/30 text-xs mt-1">
          <span>{track.bpm} BPM</span>
          <span>{track.duration}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <button
          onClick={() => handleTrackSelect((activeTrack - 1 + tracks.length) % tracks.length)}
          className="text-white/50 hover:text-white transition-colors"
        >
          <Icon name="SkipBack" size={20} />
        </button>

        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-12 h-12 rounded-full bg-white flex items-center justify-center hover:scale-105 transition-transform shadow-lg"
        >
          <Icon name={isPlaying ? 'Pause' : 'Play'} size={20} className="text-black ml-0.5" />
        </button>

        <button
          onClick={() => handleTrackSelect((activeTrack + 1) % tracks.length)}
          className="text-white/50 hover:text-white transition-colors"
        >
          <Icon name="SkipForward" size={20} />
        </button>

        <button
          onClick={openYoutube}
          title="Слушать на YouTube"
          className="ml-4 flex items-center gap-1.5 text-white/40 hover:text-white transition-colors text-xs"
        >
          <Icon name="ExternalLink" size={14} />
          <span>YouTube</span>
        </button>
      </div>

      {/* Track list */}
      <div className="space-y-2">
        {tracks.map((t, i) => (
          <button
            key={i}
            onClick={() => handleTrackSelect(i)}
            className={cn(
              'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200',
              activeTrack === i
                ? 'bg-white/15 border border-white/20'
                : 'hover:bg-white/8 border border-transparent'
            )}
          >
            <div className={cn(
              'w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs',
              activeTrack === i ? 'bg-violet-500 text-white' : 'bg-white/10 text-white/40'
            )}>
              {activeTrack === i && isPlaying
                ? <Icon name="Volume2" size={12} />
                : <span>{i + 1}</span>
              }
            </div>
            <div className="flex-1 min-w-0">
              <p className={cn('text-sm truncate', activeTrack === i ? 'text-white' : 'text-white/60')}>{t.title}</p>
              <p className="text-white/30 text-xs">{t.artist}</p>
            </div>
            <span className="text-white/30 text-xs flex-shrink-0">{t.duration}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
