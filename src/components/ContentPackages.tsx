import { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Camera, Film, ArrowUpRight, Star } from 'lucide-react';
import { Language } from '../types';
import LaunchModal from './LaunchModal';

interface ContentPackagesProps {
  currentLanguage: Language;
}

const tiers = [
  {
    id: 'content-starter',
    name: { en: 'Starter', ar: 'ستارتر' },
    cadence: { en: '2–3 posts / week', ar: '٢–٣ منشورات أسبوعيًا' },
    recommended: false,
    features: {
      en: [
        '8–10 branded social posts / month',
        'Custom captions (English & Arabic)',
        'Consistent visual identity',
        'Monthly performance summary',
        'One content theme per month',
      ],
      ar: [
        '٨–١٠ منشورات شهريًا بهوية علامتك',
        'كتابة تعليقات احترافية (عربي وإنجليزي)',
        'هوية بصرية متناسقة',
        'تقرير أداء شهري',
        'ثيم محتوى واحد شهريًا',
      ],
    },
  },
  {
    id: 'content-growth',
    name: { en: 'Growth', ar: 'النمو' },
    cadence: { en: 'Daily content + reels', ar: 'محتوى يومي + ريلز' },
    recommended: true,
    features: {
      en: [
        '20+ posts / month (daily presence)',
        '4 reels & short-form videos / month',
        'Monthly photography / video session',
        'Custom captions (English & Arabic)',
        'Monthly strategy call + analytics report',
        'Priority turnaround',
      ],
      ar: [
        '٢٠+ منشور شهريًا (حضور يومي)',
        '٤ ريلز وفيديوهات قصيرة شهريًا',
        'جلسة تصوير فوتوغرافي / فيديو شهريًا',
        'كتابة تعليقات احترافية (عربي وإنجليزي)',
        'مكالمة استراتيجية شهرية + تقرير تحليلات',
        'أولوية في التسليم',
      ],
    },
  },
];

export default function ContentPackages({ currentLanguage }: ContentPackagesProps) {
  const en = currentLanguage === 'en';
  const [selected, setSelected] = useState<any | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const openInquiry = (tier: typeof tiers[0]) => {
    setSelected({
      id: tier.id,
      name: { en: `Content — ${tier.name.en}`, ar: `محتوى — ${tier.name.ar}` },
      price: tier.cadence,
    });
    setModalOpen(true);
  };

  return (
    <section id="content" className="relative bg-[var(--bg)] py-32 overflow-hidden">
      {/* ambient bloom */}
      <div className="absolute top-1/3 right-0 w-[600px] h-[500px] bg-[#8B6914]/5 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-8 md:px-16 relative z-10">

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className="flex items-center gap-4 mb-10"
        >
          <div className="w-8 h-px bg-[#C9A87C]/50" />
          <span className="text-[10px] font-mono tracking-[0.3em] text-[#C9A87C] uppercase">
            {en ? 'Recurring Service · Monthly' : 'خدمة شهرية مستمرة'}
          </span>
        </motion.div>

        {/* Heading + intro */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-end mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontSize: 'clamp(38px, 5.5vw, 80px)' }}
            className="font-serif font-bold text-[var(--text)] leading-[1.02] tracking-[-0.02em]"
          >
            {en ? (
              <>Monthly Content<br /><span className="text-shimmer">Packages.</span></>
            ) : (
              <>باقات المحتوى<br /><span className="text-shimmer">الشهرية.</span></>
            )}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <p className="text-[var(--text)]/60 text-sm md:text-base leading-relaxed font-sans-luxury mb-4">
              {en
                ? 'Beyond your website — professional content creation, photography, and social media management, tailored to any business type. Stay visible every single week without lifting a finger.'
                : 'ما بعد الموقع — إنتاج محتوى احترافي وتصوير وإدارة كاملة لمنصات التواصل، مصمّمة لأي نوع نشاط. ابقَ حاضرًا كل أسبوع دون أي مجهود منك.'}
            </p>
            <p className="text-[#C9A87C]/70 text-xs leading-relaxed font-sans-luxury flex items-start gap-2">
              <span className="text-[#E8C97A] shrink-0">✦</span>
              <span>
                {en
                  ? 'For restaurants, doctors, gyms, salons, startups, e-commerce, services — and any brand that wants to grow online.'
                  : 'للمطاعم والأطباء والصالات والصالونات والشركات الناشئة والمتاجر والخدمات — وأي علامة تريد أن تنمو على الإنترنت.'}
              </span>
            </p>
          </motion.div>
        </div>

        {/* Tier cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className={`relative flex flex-col rounded-2xl overflow-hidden border transition-all duration-500 hover:-translate-y-2 ${
                tier.recommended
                  ? 'border-[#C9A87C]/50 bg-gradient-to-b from-[#C9A87C]/8 via-black/60 to-black/80 shadow-[0_0_60px_rgba(201,168,124,0.18)]'
                  : 'liquid-glass border-transparent hover:border-[#C9A87C]/25'
              }`}
            >
              {tier.recommended && (
                <div className="flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-[#8B6914] via-[#C9A87C] to-[#8B6914]">
                  <Star className="w-3 h-3 text-black fill-black" />
                  <span className="text-[9px] font-mono font-bold tracking-[0.25em] text-black uppercase">
                    {en ? 'Most Popular' : 'الأكثر طلبًا'}
                  </span>
                  <Star className="w-3 h-3 text-black fill-black" />
                </div>
              )}

              <div className="flex flex-col flex-1 p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className={`font-serif font-bold leading-tight mb-1 ${tier.recommended ? 'text-shimmer' : 'text-[var(--text)]'}`} style={{ fontSize: 'clamp(24px, 2.5vw, 34px)' }}>
                      {tier.name[currentLanguage]}
                    </h3>
                    <span className="text-[11px] font-mono tracking-wider text-[#C9A87C]/70 uppercase">
                      {tier.cadence[currentLanguage]}
                    </span>
                  </div>
                  <div className="w-11 h-11 rounded-xl bg-[#C9A87C]/8 border border-[#C9A87C]/20 flex items-center justify-center shrink-0">
                    {i === 0 ? <Camera className="w-5 h-5 text-[#E8C97A]" /> : <Film className="w-5 h-5 text-[#E8C97A]" />}
                  </div>
                </div>

                {/* Monthly retainer note (no invented number — quote on request) */}
                <div className="mb-7 pb-7 border-b border-[#C9A87C]/12">
                  <div className="font-serif font-bold text-[#E8C97A] leading-none" style={{ fontSize: 'clamp(22px, 2.4vw, 30px)' }}>
                    {en ? 'Monthly Retainer' : 'اشتراك شهري'}
                  </div>
                  <div className="text-[9px] font-mono tracking-wider text-[#C9A87C]/45 uppercase mt-2">
                    {en ? 'custom quote · cancel anytime' : 'عرض سعر مخصص · إلغاء في أي وقت'}
                  </div>
                </div>

                <ul className="space-y-3.5 flex-1 mb-9">
                  {tier.features[currentLanguage].map((f, fi) => (
                    <li key={fi} className="flex items-start gap-3">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 border ${tier.recommended ? 'bg-[#C9A87C]/20 border-[#C9A87C]/40' : 'bg-[#C9A87C]/8 border-[#C9A87C]/20'}`}>
                        <Check className="w-2.5 h-2.5 text-[#C9A87C]" />
                      </div>
                      <span className="text-xs text-[var(--text)]/60 leading-relaxed font-sans-luxury">{f}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => openInquiry(tier)}
                  className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl text-xs font-mono tracking-[0.12em] uppercase transition-all duration-400 cursor-pointer group ${
                    tier.recommended
                      ? 'bg-gradient-to-r from-[#8B6914] via-[#C9A87C] to-[#8B6914] text-black hover:shadow-[0_0_28px_rgba(201,168,124,0.5)] hover:scale-[1.02]'
                      : 'border border-[#C9A87C]/25 text-[#C9A87C] hover:border-[#C9A87C]/55 hover:bg-[#C9A87C]/6 hover:text-[#E8C97A]'
                  }`}
                >
                  <span>{en ? 'Get Started With Content' : 'ابدأ مع المحتوى'}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>

              {tier.recommended && (
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A87C]/60 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <LaunchModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        currentLanguage={currentLanguage}
        plan={selected}
      />
    </section>
  );
}
