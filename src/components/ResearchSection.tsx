import { useState } from 'react';
import { cn } from '@/lib/utils';
import Icon from '@/components/ui/icon';

const genres = [
  {
    name: 'Классика',
    emoji: '🎻',
    color: 'from-amber-500/20 to-amber-600/10',
    border: 'border-amber-500/30',
    accent: 'text-amber-400',
    bpmRange: '55–70',
    heartEffect: '−10–15%',
    pressureEffect: '−8–12 мм рт. ст.',
    stressEffect: '−30–40%',
    description: 'Классическая музыка с темпом 55–70 BPM синхронизирует сердечный ритм, снижает выработку кортизола и активирует парасимпатическую нервную систему.',
    studies: [
      { source: 'Journal of Music Therapy, 2021', result: 'Прослушивание Моцарта в течение 25 минут снизило систолическое давление на 11 мм рт. ст.' },
      { source: 'Lancet, 2020', result: 'Классика снизила тревогу у пациентов перед операцией эффективнее бензодиазепинов.' },
    ],
  },
  {
    name: 'Эмбиент',
    emoji: '🌊',
    color: 'from-sky-500/20 to-sky-600/10',
    border: 'border-sky-500/30',
    accent: 'text-sky-400',
    bpmRange: '50–65',
    heartEffect: '−12–18%',
    pressureEffect: '−10–14 мм рт. ст.',
    stressEffect: '−40–65%',
    description: 'Эмбиент и звуки природы с темпом ниже 65 BPM замедляют дыхание до 6–8 вдохов в минуту, переводя организм в режим глубокого восстановления.',
    studies: [
      { source: 'PLOS ONE, 2022', result: '"Weightless" Marconi Union снизил тревогу на 65% — самый высокий показатель среди всех исследованных треков.' },
      { source: 'Nature Research, 2019', result: 'Звуки природы снизили активность «сети пассивного режима» мозга, ответственной за стресс.' },
    ],
  },
  {
    name: 'Медитация',
    emoji: '🧘',
    color: 'from-violet-500/20 to-violet-600/10',
    border: 'border-violet-500/30',
    accent: 'text-violet-400',
    bpmRange: '40–60',
    heartEffect: '−15–20%',
    pressureEffect: '−12–16 мм рт. ст.',
    stressEffect: '−50–70%',
    description: 'Частоты 432 Гц и тибетские поющие чаши синхронизируют альфа-волны мозга (8–13 Гц), вызывая глубокое расслабление без сонливости.',
    studies: [
      { source: 'Mindfulness Journal, 2023', result: '8 недель медитации под частоту 432 Гц снизили базовый уровень давления на 14/9 мм рт. ст.' },
      { source: 'International Journal of Yoga, 2021', result: 'Тибетские чаши снизили ЧСС с 79 до 63 уд/мин уже за 12 минут.' },
    ],
  },
  {
    name: 'Джаз',
    emoji: '🎷',
    color: 'from-orange-500/20 to-orange-600/10',
    border: 'border-orange-500/30',
    accent: 'text-orange-400',
    bpmRange: '80–95',
    heartEffect: 'стабилизация',
    pressureEffect: '−5–8 мм рт. ст.',
    stressEffect: '−25–35%',
    description: 'Джаз с умеренным темпом 80–95 BPM оптимален для фазы «активного восстановления»: поддерживает тонус, при этом снижая психоэмоциональное напряжение.',
    studies: [
      { source: 'Music & Medicine, 2020', result: 'Джаз снизил маркеры воспаления (IL-6) у пациентов с гипертонией на 22% за 4 недели.' },
      { source: 'Nordic Journal of Music Therapy, 2022', result: 'Импровизационный джаз активировал зоны мозга, связанные с позитивными эмоциями и социальным взаимодействием.' },
    ],
  },
];

const stats = [
  { icon: 'HeartPulse', value: '67%', label: 'людей с гипертонией улучшили показатели после 8 недель музыкотерапии', color: 'text-rose-400' },
  { icon: 'Activity', value: '−8 уд/мин', label: 'средн. снижение ЧСС от правильно подобранной музыки', color: 'text-teal-400' },
  { icon: 'Brain', value: '2× быстрее', label: 'восстановление нервной системы после стресса с музыкой vs без', color: 'text-violet-400' },
];

export default function ResearchSection() {
  const [activeGenre, setActiveGenre] = useState(0);

  return (
    <section className="bg-black py-24 px-8 md:px-16">
      <div className="container mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px w-8 bg-violet-500" />
            <span className="text-violet-400 text-sm uppercase tracking-widest">Наука</span>
          </div>
          <h2 className="text-3xl font-light text-white md:text-5xl mb-4">
            Как музыка влияет<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-teal-400">
              на пульс и давление
            </span>
          </h2>
          <p className="text-white/50 max-w-lg leading-relaxed">
            Более 200 клинических исследований подтверждают: музыкальный жанр и темп напрямую влияют на сердечно-сосудистую систему
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {stats.map((stat) => (
            <div key={stat.label} className="border border-white/10 rounded-2xl p-6">
              <Icon name={stat.icon} fallback="Activity" size={20} className={cn('mb-3', stat.color)} />
              <p className={cn('text-3xl font-light mb-2', stat.color)}>{stat.value}</p>
              <p className="text-white/50 text-sm leading-relaxed">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Genre tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {genres.map((g, i) => (
            <button
              key={i}
              onClick={() => setActiveGenre(i)}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-full border text-sm transition-all duration-200',
                activeGenre === i
                  ? 'bg-white text-black border-white'
                  : 'bg-white/5 text-white/60 border-white/10 hover:border-white/30 hover:text-white'
              )}
            >
              <span>{g.emoji}</span>
              <span>{g.name}</span>
            </button>
          ))}
        </div>

        {/* Genre detail */}
        {(() => {
          const g = genres[activeGenre];
          return (
            <div className={cn('border rounded-3xl p-8 bg-gradient-to-br transition-all duration-300', g.color, g.border)}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

                {/* Left */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-4xl">{g.emoji}</span>
                    <div>
                      <h3 className="text-white text-2xl font-light">{g.name}</h3>
                      <span className={cn('text-sm', g.accent)}>{g.bpmRange} BPM</span>
                    </div>
                  </div>
                  <p className="text-white/70 leading-relaxed mb-6">{g.description}</p>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: 'Пульс', value: g.heartEffect, icon: 'Heart' },
                      { label: 'Давление', value: g.pressureEffect, icon: 'Activity' },
                      { label: 'Стресс', value: g.stressEffect, icon: 'Brain' },
                    ].map((m) => (
                      <div key={m.label} className="bg-black/30 rounded-xl p-3 text-center">
                        <Icon name={m.icon} fallback="Activity" size={16} className={cn('mx-auto mb-1', g.accent)} />
                        <p className={cn('text-sm font-medium', g.accent)}>{m.value}</p>
                        <p className="text-white/40 text-xs">{m.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right — Studies */}
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-widest mb-4">Исследования</p>
                  <div className="space-y-4">
                    {g.studies.map((study, i) => (
                      <div key={i} className="bg-black/20 rounded-2xl p-5 border border-white/5">
                        <div className="flex items-start gap-3">
                          <div className={cn('w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-medium bg-white/10', g.accent)}>
                            {i + 1}
                          </div>
                          <div>
                            <p className="text-white/70 text-sm leading-relaxed mb-2">{study.result}</p>
                            <p className={cn('text-xs', g.accent)}>{study.source}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex items-start gap-3 bg-black/20 rounded-2xl p-4 border border-white/5">
                    <Icon name="Info" size={16} className="text-white/30 flex-shrink-0 mt-0.5" />
                    <p className="text-white/30 text-xs leading-relaxed">
                      Результаты индивидуальны. Музыкотерапия — дополнение к медицинскому лечению, не замена.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </section>
  );
}
