import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import Icon from '@/components/ui/icon';
import MusicPlayer from '@/components/MusicPlayer';

const images = [
  'https://cdn.poehali.dev/projects/a1789163-7857-4273-aa03-5efe8c7f6214/files/c57b214f-5c6a-46e5-ba2b-a376bf99f5ea.jpg',
  'https://cdn.poehali.dev/projects/a1789163-7857-4273-aa03-5efe8c7f6214/files/fc3ffd85-014f-457c-83de-9d1f2085358f.jpg',
  'https://cdn.poehali.dev/projects/a1789163-7857-4273-aa03-5efe8c7f6214/files/183731cc-cc74-435f-8963-bccb62cc412e.jpg',
  'https://cdn.poehali.dev/projects/a1789163-7857-4273-aa03-5efe8c7f6214/files/e67731eb-2e35-40d4-a8b5-a3c0637dd6b5.jpg',
];

const moods = [
  { emoji: '😌', label: 'Спокойствие', genre: 'Классика' },
  { emoji: '😊', label: 'Радость', genre: 'Джаз' },
  { emoji: '😔', label: 'Грусть', genre: 'Эмбиент' },
  { emoji: '😤', label: 'Стресс', genre: 'Медитация' },
  { emoji: '🤩', label: 'Энергия', genre: 'Поп' },
];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedMood, setSelectedMood] = useState<number | null>(null);

  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Background images */}
      <div className="absolute inset-0">
        {images.map((src, index) => (
          <div
            key={src}
            className={cn(
              'absolute inset-0 transition-opacity duration-1000 ease-in-out',
              currentIndex === index ? 'opacity-100' : 'opacity-0'
            )}
          >
            <img src={src} alt="" className="h-full w-full object-cover" />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-black/40" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center">
        <div className="container mx-auto px-8 md:px-16 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left — text + mood selector */}
            <div>
              <div
                className={cn(
                  'transform transition-all duration-1000 ease-out mb-10',
                  isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                )}
              >
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2">
                    <Icon name="HeartPulse" size={16} className="text-rose-400" />
                    <span className="text-white/80 text-sm font-light tracking-widest uppercase">Музыка и здоровье</span>
                  </div>
                </div>

                <h1 className="text-4xl font-light text-white md:text-5xl lg:text-6xl leading-tight mb-4">
                  Музыка,<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-teal-400">
                    которая лечит
                  </span>
                </h1>

                <p className="text-lg font-light text-white/60 max-w-md leading-relaxed">
                  Выберите настроение — и получите треки, которые мягко нормализуют пульс и снизят давление
                </p>
              </div>

              {/* Mood selector */}
              <div
                className={cn(
                  'transform transition-all duration-1000 delay-300 ease-out',
                  isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                )}
              >
                <p className="text-white/40 text-xs uppercase tracking-widest mb-3">Как вы себя чувствуете?</p>
                <div className="flex flex-wrap gap-2">
                  {moods.map((mood, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedMood(selectedMood === index ? null : index)}
                      className={cn(
                        'flex items-center gap-2 px-4 py-2.5 rounded-full border transition-all duration-300 backdrop-blur-sm',
                        selectedMood === index
                          ? 'bg-white text-black border-white shadow-lg shadow-white/20'
                          : 'bg-white/10 text-white border-white/20 hover:bg-white/20 hover:border-white/40'
                      )}
                    >
                      <span className="text-lg">{mood.emoji}</span>
                      <span className="text-sm font-light">{mood.label}</span>
                    </button>
                  ))}
                </div>

                {selectedMood !== null && (
                  <p className="mt-4 text-white/40 text-sm flex items-center gap-2">
                    <Icon name="Music2" size={14} className="text-violet-400" />
                    Подобрали {moods[selectedMood].genre} — прокрутите плеер вправо
                  </p>
                )}
              </div>

              {/* Bottom stats */}
              <div className="flex gap-8 mt-12">
                {[
                  { icon: 'Activity', value: '−12%', label: 'снижение ЧСС' },
                  { icon: 'Wind', value: '−8 мм', label: 'снижение давления' },
                  { icon: 'Brain', value: '+40%', label: 'снижение стресса' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <Icon name={stat.icon} fallback="Activity" size={12} className="text-teal-400" />
                      <span className="text-white text-base font-light">{stat.value}</span>
                    </div>
                    <span className="text-white/30 text-xs">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — player */}
            <div
              className={cn(
                'transform transition-all duration-1000 delay-500 ease-out',
                isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
              )}
            >
              {selectedMood !== null ? (
                <MusicPlayer moodIndex={selectedMood} />
              ) : (
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-10 flex flex-col items-center justify-center text-center min-h-64">
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
                    <Icon name="Music2" size={28} className="text-white/30" />
                  </div>
                  <p className="text-white/40 text-sm">Выберите настроение слева,<br />чтобы получить подборку треков</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-8 right-8 z-20 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              'h-1 transition-all duration-300',
              currentIndex === index ? 'w-12 bg-white' : 'w-8 bg-white/40 hover:bg-white/60'
            )}
            aria-label={`Перейти к слайду ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
