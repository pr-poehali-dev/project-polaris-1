import { useState } from 'react';
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
  [
    { title: 'Clair de Lune', artist: 'Claude Debussy', duration: '5:02', youtubeId: 'CvFH_6DNRCY', bpm: '60', effect: 'Снижает ЧСС до 62 уд/мин' },
    { title: 'Gymnopédie No.1', artist: 'Erik Satie', duration: '3:17', youtubeId: '4iDRMEP1FTA', bpm: '58', effect: 'Уменьшает тревожность на 35%' },
    { title: 'Nocturne Op.9 No.2', artist: 'Frédéric Chopin', duration: '4:33', youtubeId: '9E6b3swbnWg', bpm: '63', effect: 'Снижает давление на 7 мм рт. ст.' },
  ],
  [
    { title: 'What a Wonderful World', artist: 'Louis Armstrong', duration: '2:20', youtubeId: 'CWzrABouyeE', bpm: '82', effect: 'Повышает уровень дофамина' },
    { title: 'Fly Me to the Moon', artist: 'Frank Sinatra', duration: '2:27', youtubeId: 'EkHTsc9Ms28', bpm: '85', effect: 'Стабилизирует ритм сердца' },
    { title: 'Take Five', artist: 'Dave Brubeck', duration: '5:24', youtubeId: 'vmDDOFXSgAs', bpm: '88', effect: 'Улучшает настроение за 3 мин' },
  ],
  [
    { title: 'Experience', artist: 'Ludovico Einaudi', duration: '5:13', youtubeId: 'hN_q-_nGv4U', bpm: '57', effect: 'Снимает эмоциональное напряжение' },
    { title: 'Spiegel im Spiegel', artist: 'Arvo Pärt', duration: '10:00', youtubeId: 'TJ6Mzvh3XCc', bpm: '55', effect: 'Нормализует дыхание' },
    { title: 'On the Nature of Daylight', artist: 'Max Richter', duration: '6:43', youtubeId: 'b_YHE4Sx-08', bpm: '60', effect: 'Снижает кортизол на 20%' },
  ],
  [
    { title: '432 Hz Deep Meditation', artist: 'Healing Frequencies', duration: '10:00', youtubeId: 'hhHFpMRwnEA', bpm: '52', effect: 'Снижает ЧСС до 58 уд/мин' },
    { title: 'Weightless', artist: 'Marconi Union', duration: '8:08', youtubeId: 'UfcAVejslrU', bpm: '50', effect: 'Снижает тревогу на 65%' },
    { title: 'Tibetan Singing Bowls', artist: 'Sounds of Nature', duration: '15:00', youtubeId: 'mEPBHN4xIUs', bpm: '48', effect: 'Снижает давление на 12 мм рт. ст.' },
  ],
  [
    { title: 'Happy', artist: 'Pharrell Williams', duration: '3:53', youtubeId: 'y6Sxv-sUYtM', bpm: '96', effect: 'Повышает энергию и мотивацию' },
    { title: "Can't Stop the Feeling", artist: 'Justin Timberlake', duration: '3:56', youtubeId: 'ru0K8uYEZWw', bpm: '113', effect: 'Стимулирует выработку эндорфинов' },
    { title: 'Walking on Sunshine', artist: 'Katrina & The Waves', duration: '3:58', youtubeId: 'iPUmE-tne5U', bpm: '102', effect: 'Поднимает настроение за 1 мин' },
  ],
];

export default function MusicPlayer({ moodIndex }: MusicPlayerProps) {
  const [activeTrack, setActiveTrack] = useState(0);

  const tracks = tracksByMood[moodIndex];
  const track = tracks[activeTrack];

  const openYoutube = (youtubeId: string) => {
    window.open(`https://www.youtube.com/watch?v=${youtubeId}`, '_blank');
  };

  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 max-w-xl w-full">

      {/* Featured track — превью с кнопкой */}
      <div
        className="relative rounded-2xl overflow-hidden mb-5 cursor-pointer group"
        onClick={() => openYoutube(track.youtubeId)}
      >
        <img
          src={`https://img.youtube.com/vi/${track.youtubeId}/mqdefault.jpg`}
          alt={track.title}
          className="w-full object-cover"
          style={{ aspectRatio: '16/9' }}
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-white/90 group-hover:bg-white group-hover:scale-110 transition-all duration-300 flex items-center justify-center shadow-2xl">
            <Icon name="Play" size={28} className="text-black ml-1" />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
          <p className="text-white font-medium text-sm">{track.title}</p>
          <p className="text-white/60 text-xs">{track.artist}</p>
        </div>
        <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/60 rounded-full px-3 py-1">
          <Icon name="Youtube" size={12} className="text-red-400" />
          <span className="text-white/80 text-xs">Слушать на YouTube</span>
        </div>
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
              'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 group',
              activeTrack === i
                ? 'bg-white/15 border border-white/20'
                : 'hover:bg-white/8 border border-transparent'
            )}
          >
            <div className={cn(
              'w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs transition-all',
              activeTrack === i ? 'bg-violet-500 text-white' : 'bg-white/10 text-white/40'
            )}>
              {activeTrack === i ? <Icon name="Music2" size={12} /> : <span>{i + 1}</span>}
            </div>
            <div className="flex-1 min-w-0">
              <p className={cn('text-sm truncate', activeTrack === i ? 'text-white' : 'text-white/60')}>{t.title}</p>
              <p className="text-white/30 text-xs">{t.artist}</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-white/30 text-xs">{t.duration}</span>
              <button
                onClick={(e) => { e.stopPropagation(); openYoutube(t.youtubeId); }}
                className="opacity-0 group-hover:opacity-100 transition-opacity text-white/40 hover:text-white"
                title="Слушать на YouTube"
              >
                <Icon name="ExternalLink" size={13} />
              </button>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
