import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus } from 'lucide-react';
import { Language } from '../types';

interface FAQProps {
  currentLanguage: Language;
}

const faqs: { q: Record<Language, string>; a: Record<Language, string> }[] = [
  {
    q: { en: 'How long does a website take to launch?', ar: 'كم يستغرق إطلاق الموقع؟' },
    a: {
      en: 'Most projects go live within 14 business days — from first consultation to a fully launched, mobile-optimised site. Larger custom builds are scoped with a clear timeline before we begin.',
      ar: 'تنطلق معظم المشاريع خلال ١٤ يوم عمل — من الاستشارة الأولى حتى إطلاق موقع متكامل ومُحسّن للهواتف. المشاريع الأكبر يتم تحديد جدولها الزمني بوضوح قبل البدء.',
    },
  },
  {
    q: { en: 'Do I need any technical experience?', ar: 'هل أحتاج إلى خبرة تقنية؟' },
    a: {
      en: 'None at all. We handle everything — copywriting, photography, domains, hosting, email setup, and Google Maps. You focus on your business; we handle the digital craft.',
      ar: 'لا تحتاج إلى أي خبرة. نتولى كل شيء — كتابة المحتوى، التصوير، النطاقات، الاستضافة، البريد، وخرائط جوجل. أنت تركز على عملك، ونحن نتولى الجانب الرقمي.',
    },
  },
  {
    q: { en: 'What does a project actually cost?', ar: 'كم تكلفة المشروع فعليًا؟' },
    a: {
      en: 'Our packages currently start at EGP 14,999 one-time (limited offer, down from 19,999) for a premium presence, with no hidden monthly retainers. Pick a tier above, or message us for a custom quote — pricing is always transparent.',
      ar: 'تبدأ باقاتنا حاليًا من ١٤,٩٩٩ ج.م تُدفع لمرة واحدة (عرض محدود، بدلاً من ١٩,٩٩٩) لحضور رقمي فاخر، بدون رسوم شهرية مستترة. اختر باقة من الأعلى أو راسلنا لعرض مخصص — أسعارنا واضحة دائمًا.',
    },
  },
  {
    q: { en: 'Will my site rank on Google?', ar: 'هل سيظهر موقعي على جوجل؟' },
    a: {
      en: 'Every site ships SEO-optimised and we set up and verify your Google Business Profile so you appear on Maps and local search. We build for discoverability from day one.',
      ar: 'كل موقع يُسلّم مُحسّنًا لمحركات البحث، ونقوم بإعداد وتفعيل ملف نشاطك على جوجل لتظهر على الخرائط والبحث المحلي. نبني للظهور منذ اليوم الأول.',
    },
  },
  {
    q: { en: 'Do you work with businesses anywhere?', ar: 'هل تعملون مع الأنشطة في أي مكان؟' },
    a: {
      en: 'Yes. We are based in Egypt but serve businesses across the region and beyond. Everything runs remotely over WhatsApp and call — distance is never a barrier.',
      ar: 'نعم. مقرنا مصر لكننا نخدم الأنشطة في المنطقة وخارجها. كل شيء يتم عن بُعد عبر واتساب والمكالمات — المسافة ليست عائقًا أبدًا.',
    },
  },
  {
    q: { en: 'What happens after the site goes live?', ar: 'ماذا يحدث بعد إطلاق الموقع؟' },
    a: {
      en: 'We hand over a site you fully own, with guidance on updates. Maintenance and priority support are included in our Premium tier, and available as an add-on for any package.',
      ar: 'نسلّمك موقعًا تملكه بالكامل، مع إرشادك لتحديثه. الصيانة والدعم ذو الأولوية متضمنان في الباقة الفاخرة، ومتاحان كإضافة لأي باقة أخرى.',
    },
  },
];

export default function FAQ({ currentLanguage }: FAQProps) {
  const [open, setOpen] = useState<number | null>(0);
  const en = currentLanguage === 'en';

  return (
    <section id="faq" className="relative py-32 overflow-hidden">
      {/* faint scrim so copy stays legible over the living canvas */}
      <div className="absolute inset-0 -z-[1] pointer-events-none bg-[var(--bg)]/70" />

      <div className="max-w-[1400px] mx-auto px-8 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

          {/* Left — sticky editorial header */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-px bg-[#C9A87C]/50" />
                <span className="text-[10px] font-mono tracking-[0.3em] text-[#C9A87C] uppercase">
                  {en ? 'Answers' : 'إجابات'}
                </span>
              </div>
              <h2
                className="font-serif font-bold text-[var(--text)] leading-[0.9] tracking-[-0.03em]"
                style={{ fontSize: 'clamp(40px, 5vw, 76px)' }}
              >
                {en ? (
                  <>Questions,<br /><span className="text-shimmer italic">answered.</span></>
                ) : (
                  <>أسئلة،<br /><span className="text-shimmer">وإجابات.</span></>
                )}
              </h2>
              <p className="mt-6 text-sm leading-relaxed text-[var(--text)]/55 max-w-xs font-sans-luxury">
                {en
                  ? 'Everything you might wonder before we begin. Still curious? A message away.'
                  : 'كل ما قد يدور في ذهنك قبل أن نبدأ. لديك سؤال آخر؟ نحن على بُعد رسالة.'}
              </p>
            </div>
          </div>

          {/* Right — accordion */}
          <div className="lg:col-span-8">
            <ul className="divide-y divide-[#C9A87C]/12 border-t border-[#C9A87C]/12">
              {faqs.map((item, i) => {
                const isOpen = open === i;
                return (
                  <li key={i}>
                    <motion.div
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-10%' }}
                      transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <button
                        onClick={() => setOpen(isOpen ? null : i)}
                        aria-expanded={isOpen}
                        className="group w-full flex items-start justify-between gap-6 py-7 text-left cursor-pointer"
                      >
                        <span
                          className={`font-serif tracking-[-0.01em] transition-colors duration-300 ${
                            isOpen ? 'text-[#E8C97A]' : 'text-[var(--text)] group-hover:text-[#E8C97A]'
                          }`}
                          style={{ fontSize: 'clamp(19px, 2vw, 28px)' }}
                        >
                          {item.q[currentLanguage]}
                        </span>
                        <span
                          className={`mt-1 shrink-0 grid place-items-center w-8 h-8 rounded-full border transition-all duration-400 ${
                            isOpen
                              ? 'border-[#E8C97A] rotate-45 bg-[#C9A87C]/10'
                              : 'border-[#C9A87C]/30 group-hover:border-[#C9A87C]/60'
                          }`}
                        >
                          <Plus className="w-4 h-4 text-[#C9A87C]" />
                        </span>
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                          >
                            <p className="pb-8 pr-12 text-sm md:text-[15px] leading-[1.8] text-[var(--text)]/60 font-sans-luxury max-w-2xl">
                              {item.a[currentLanguage]}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
