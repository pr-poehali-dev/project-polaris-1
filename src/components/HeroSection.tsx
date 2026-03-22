import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import Icon from '@/components/ui/icon';

const images = [
  'https://cdn.poehali.dev/projects/a1789163-7857-4273-aa03-5efe8c7f6214/files/c57b214f-5c6a-46e5-ba2b-a376bf99f5ea.jpg',
  'https://cdn.poehali.dev/projects/a1789163-7857-4273-aa03-5efe8c7f6214/files/fc3ffd85-014f-457c-83de-9d1f2085358f.jpg',
  'https://cdn.poehali.dev/projects/a1789163-7857-4273-aa03-5efe8c7f6214/files/183731cc-cc74-435f-8963-bccb62cc412e.jpg',
  'https://cdn.poehali.dev/projects/a1789163-7857-4273-aa03-5efe8c7f6214/files/e67731eb-2e35-40d4-a8b5-a3c0637dd6b5.jpg',
];

const moods = [
  { emoji: '😌', label: 'Спокойствие', genre: 'Классика', bpm: '60–70 уд/мин' },
  { emoji: '😊', label: 'Радость', genre: 'Джаз', bpm: '80–90 уд/мин' },
  { emoji: '😔', label: 'Грусть', genre: 'Эмбиент', bpm: '55–65 уд/мин' },
  { emoji: '😤', label: 'Стресс', genre: 'Медитация', bpm: '50–60 уд/мин' },
  { emoji: '🤩', label: 'Энергия', genre: 'Поп', bpm: '90–100 уд/мин' },
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

      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-start justify-center">
        <div className="container mx-auto px-8 md:px-16 py-20">

          {/* Header */}
          <div
            className={cn(
              'transform transition-all duration-1000 ease-out mb-12',
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            )}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2">
                <Icon name="HeartPulse" size={16} className="text-rose-400" />
                <span className="text-white/80 text-sm font-light tracking-widest uppercase">Музыка и здоровье</span>
              </div>
            </div>

            <h1 className="text-4xl font-light text-white md:text-6xl lg:text-7xl leading-tight mb-4">
              Музыка,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-teal-400">
                которая лечит
              </span>
            </h1>

            <p className="text-xl font-light text-white/70 max-w-xl leading-relaxed">
              Выберите своё настроение — и получите трек, который мягко нормализует пульс и снизит давление
            </p>
          </div>

          {/* Mood selector */}
          <div
            className={cn(
              'transform transition-all duration-1000 delay-300 ease-out mb-12',
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            )}
          >
            <p className="text-white/50 text-sm uppercase tracking-widest mb-4">Как вы себя чувствуете?</p>
            <div className="flex flex-wrap gap-3">
              {moods.map((mood, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedMood(selectedMood === index ? null : index)}
                  className={cn(
                    'flex items-center gap-2 px-5 py-3 rounded-full border transition-all duration-300 backdrop-blur-sm',
                    selectedMood === index
                      ? 'bg-white text-black border-white shadow-lg shadow-white/20'
                      : 'bg-white/10 text-white border-white/20 hover:bg-white/20 hover:border-white/40'
                  )}
                >
                  <span className="text-xl">{mood.emoji}</span>
                  <span className="font-light">{mood.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Result card */}
          <div
            className={cn(
              'transform transition-all duration-500 ease-out',
              selectedMood !== null ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
            )}
          >
            {selectedMood !== null && (
              <div className="flex items-start gap-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 max-w-md">
                <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-violet-500 to-teal-500 rounded-xl flex items-center justify-center">
                  <Icon name="Music2" size={26} className="text-white" />
                </div>
                <div>
                  <p className="text-white/50 text-xs uppercase tracking-widest mb-1">Рекомендуем жанр</p>
                  <p className="text-white text-2xl font-light mb-2">{moods[selectedMood].genre}</p>
                  <div className="flex items-center gap-2 text-white/60 text-sm">
                    <Icon name="HeartPulse" size={14} className="text-rose-400" />
                    <span>Целевой пульс: {moods[selectedMood].bpm}</span>
                  </div>
                </div>
              </div>
            )}
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

      {/* Science section */}
      <div className="absolute bottom-8 left-8 md:left-16 z-20">
        <div className="flex gap-8">
          {[
            { icon: 'Activity', value: '−12%', label: 'снижение ЧСС' },
            { icon: 'Wind', value: '−8 мм', label: 'снижение давления' },
            { icon: 'Brain', value: '+40%', label: 'снижение стресса' },
          ].map((stat) => (
            <div key={stat.label} className="hidden md:block">
              <div className="flex items-center gap-2 mb-1">
                <Icon name={stat.icon} fallback="Activity" size={14} className="text-teal-400" />
                <span className="text-white text-lg font-light">{stat.value}</span>
              </div>
              <span className="text-white/40 text-xs">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}