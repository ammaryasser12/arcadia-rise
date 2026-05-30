import { useState, ChangeEvent, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Instagram, Facebook, MapPin, Send, ArrowUpRight, Check } from 'lucide-react';
import { Language } from '../types';
import { translationCopy } from '../data';

interface ContactProps {
  currentLanguage: Language;
}

// Formspark form endpoint — replace with your real form ID from formspark.io
const FORMSPARK_ID = 'gUlvec56S';
const FORMSPARK_URL = `https://submit-form.com/${FORMSPARK_ID}`;

type SubmitStatus = 'idle' | 'sending' | 'success';

export default function Contact({ currentLanguage }: ContactProps) {
  const t = translationCopy[currentLanguage];
  const [formData, setFormData] = useState({ name: '', phone: '', package: 'growth', message: '' });
  const [status, setStatus] = useState<SubmitStatus>('idle');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(p => ({ ...p, [e.target.name]: e.target.value }));
  };

  // Bilingual button label per state
  const buttonLabel =
    status === 'sending'
      ? currentLanguage === 'en' ? 'Sending…' : 'جارٍ الإرسال…'
      : status === 'success'
      ? currentLanguage === 'en' ? 'Inquiry Received' : 'تم استلام طلبك'
      : currentLanguage === 'en' ? 'Request Consultation' : 'اطلب استشارة';

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();                 // no page refresh, no new tab
    if (status !== 'idle') return;      // guard against double submits
    setStatus('sending');

    const planName = formData.package === 'starter'
      ? 'Starter Package — EGP 9,999'
      : formData.package === 'growth'
      ? 'Growth Package — EGP 14,999'
      : 'Premium Experience — Custom';

    try {
      const res = await fetch(FORMSPARK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          package: planName,
          message: formData.message,
          _email: { subject: `New consultation request — ${formData.name}` },
        }),
      });

      if (!res.ok) throw new Error(`Formspark responded ${res.status}`);
      setStatus('success');             // permanently disabled — stays on page
    } catch (err) {
      console.error('Form submission failed:', err);
      setStatus('idle');                // revert so they can retry
      alert(
        currentLanguage === 'en'
          ? 'Something went wrong sending your request. Please try again.'
          : 'حدث خطأ أثناء إرسال طلبك. من فضلك حاول مرة أخرى.'
      );
    }
  };

  return (
    <div id="contact">

      {/* ══ FULL-VIEWPORT CTA BANNER ══════════════════════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0A0A0A]">

        {/* Grain texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-10 opacity-[0.035]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundSize: '180px',
          }}
        />

        {/* Radial gold bloom */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full bg-[#8B6914]/10 blur-[200px]" />
        </div>

        {/* Horizontal rule top */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A87C]/20 to-transparent" />

        <div className="relative z-20 max-w-[1400px] mx-auto px-8 md:px-16 text-center w-full py-20">

          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <div className="w-8 h-[1px] bg-[#C9A87C]/40" />
            <span className="text-[10px] font-mono tracking-[0.3em] text-[#C9A87C] uppercase">
              {currentLanguage === 'en' ? 'The Question' : 'السؤال'}
            </span>
            <div className="w-8 h-[1px] bg-[#C9A87C]/40" />
          </motion.div>

          {/* Giant headline — each line clips in */}
          {(currentLanguage === 'en'
            ? ['Your competitors', 'are online.', 'Are you?']
            : ['منافسوك', 'ظهروا على الإنترنت.', 'وأنت؟']
          ).map((line, i) => (
            <div key={i} className="overflow-hidden">
              <motion.div
                initial={{ y: '110%' }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 1, delay: i * 0.14, ease: [0.76, 0, 0.24, 1] }}
              >
                <span
                  className={`block font-serif font-bold tracking-[-0.03em] leading-[1.0] ${
                    i === 2 ? 'text-shimmer' : 'text-[#F5F0E8]'
                  }`}
                  style={{ fontSize: 'clamp(44px, 7.5vw, 110px)' }}
                >
                  {line}
                </span>
              </motion.div>
            </div>
          ))}

          {/* Giant WhatsApp CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="mt-10"
          >
            <a
              href="https://wa.me/201554347348"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-4 px-10 py-6 rounded-full bg-gradient-to-r from-[#8B6914] via-[#C9A87C] to-[#8B6914] text-black font-semibold text-sm tracking-[0.15em] uppercase hover:shadow-[0_0_60px_rgba(201,168,124,0.55)] hover:scale-[1.04] transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <span>{t.ctaBanner.cta}</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>

        </div>

        {/* Horizontal rule bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A87C]/15 to-transparent" />
      </section>

      {/* ══ CONTACT DETAILS + FORM ════════════════════════════ */}
      <section className="bg-[#0A0A0A] py-32 px-8 md:px-16 relative">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#8B6914]/3 rounded-full blur-[130px] pointer-events-none" />

        <div className="max-w-[1400px] mx-auto relative z-10">

          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            className="flex items-center gap-4 mb-20"
          >
            <div className="w-8 h-[1px] bg-[#C9A87C]/50" />
            <span className="text-[10px] font-mono tracking-[0.3em] text-[#C9A87C] uppercase">{t.contact.sectionSubtitle}</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Left — contact info */}
            <div>
              <div className="overflow-hidden mb-8">
                <motion.h2
                  initial={{ y: '105%' }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
                  style={{ fontSize: 'clamp(34px, 5vw, 72px)' }}
                  className="font-serif font-bold text-[#F5F0E8] leading-[0.92] tracking-[-0.03em]"
                >
                  {t.contact.sectionTitle}
                </motion.h2>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-[#F5F0E8]/50 text-sm leading-relaxed mb-12 max-w-sm font-sans-luxury"
              >
                {t.contact.desc}
              </motion.p>

              {/* Contact cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="space-y-4"
              >
                {[
                  {
                    Icon: MapPin,
                    label: currentLanguage === 'en' ? 'Headquarters' : 'المقر',
                    value: currentLanguage === 'en' ? 'Alexandria, Egypt' : 'الإسكندرية، مصر',
                    href: null,
                  },
                  {
                    Icon: MessageSquare,
                    label: currentLanguage === 'en' ? 'WhatsApp' : 'واتساب',
                    value: '+20 155 434 7348',
                    href: 'https://wa.me/201554347348',
                  },
                  {
                    Icon: Instagram,
                    label: 'Instagram',
                    value: '@arcadiarise',
                    href: 'http://instagram.com/arcadiarise',
                  },
                  {
                    Icon: Facebook,
                    label: 'Facebook',
                    value: 'Arcadia Rise',
                    href: 'https://www.facebook.com/share/1EdjScMLvh/?mibextid=wwXIfr',
                  },
                ].map(({ Icon, label, value, href }) => {
                  const inner = (
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.025] border border-[#C9A87C]/10 hover:border-[#C9A87C]/30 hover:bg-[#C9A87C]/4 transition-all duration-300 group">
                      <div className="w-9 h-9 rounded-lg bg-[#C9A87C]/8 border border-[#C9A87C]/15 flex items-center justify-center shrink-0 group-hover:bg-[#C9A87C]/15 transition-all duration-300">
                        <Icon className="w-4 h-4 text-[#E8C97A]" />
                      </div>
                      <div>
                        <span className="text-[9px] font-mono tracking-wider text-[#C9A87C]/55 uppercase block">{label}</span>
                        <span className="text-xs font-semibold text-[#F5F0E8]/80 font-sans-luxury group-hover:text-[#E8C97A] transition-colors duration-300">{value}</span>
                      </div>
                    </div>
                  );
                  return href
                    ? <a key={label} href={href} target="_blank" rel="noopener noreferrer">{inner}</a>
                    : <div key={label}>{inner}</div>;
                })}
              </motion.div>
            </div>

            {/* Right — glassmorphism form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="glass-panel glass-panel-glow rounded-2xl p-8 md:p-10 relative overflow-hidden"
            >
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-10 h-[1px] bg-gradient-to-r from-[#C9A87C]/50 to-transparent" />
              <div className="absolute top-0 left-0 w-[1px] h-10 bg-gradient-to-b from-[#C9A87C]/50 to-transparent" />
              <div className="absolute bottom-0 right-0 w-10 h-[1px] bg-gradient-to-l from-[#C9A87C]/30 to-transparent" />
              <div className="absolute bottom-0 right-0 w-[1px] h-10 bg-gradient-to-t from-[#C9A87C]/30 to-transparent" />

              <h3 className="text-base font-serif font-bold text-[#F5F0E8] mb-8 flex items-center gap-3">
                <span className="w-1 h-6 bg-gradient-to-b from-[#C9A87C] to-[#8B6914] rounded-full" />
                {t.contact.formTitle}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                {[
                  { id: 'name', type: 'text', label: t.contact.formData.name, placeholder: currentLanguage === 'en' ? 'e.g. Al-Noor Dental Center' : 'مثال: مركز النور لطب الأسنان' },
                  { id: 'phone', type: 'tel', label: t.contact.formData.phone, placeholder: 'e.g. 01554347348' },
                ].map(field => (
                  <div key={field.id} className="flex flex-col gap-2">
                    <label htmlFor={field.id} className="text-[9px] font-mono tracking-[0.2em] text-[#C9A87C]/65 uppercase">
                      {field.label}
                    </label>
                    <input
                      required
                      type={field.type}
                      id={field.id}
                      name={field.id}
                      value={(formData as any)[field.id]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      className="w-full px-4 py-3.5 bg-black/40 border border-[#C9A87C]/15 rounded-xl text-xs text-[#F5F0E8] placeholder-[#F5F0E8]/20 focus:border-[#C9A87C]/50 focus:outline-none transition-colors duration-300 font-sans-luxury"
                    />
                  </div>
                ))}

                <div className="flex flex-col gap-2">
                  <label htmlFor="package" className="text-[9px] font-mono tracking-[0.2em] text-[#C9A87C]/65 uppercase">
                    {t.contact.formData.service}
                  </label>
                  <select
                    id="package"
                    name="package"
                    value={formData.package}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 bg-black/40 border border-[#C9A87C]/15 rounded-xl text-xs text-[#F5F0E8] focus:border-[#C9A87C]/50 focus:outline-none transition-colors duration-300 font-sans-luxury"
                    style={{ colorScheme: 'dark' }}
                  >
                    <option value="starter">{currentLanguage === 'en' ? 'Starter Package — EGP 9,999' : 'الباقة التمهيدية — ٩,٩٩٩ ج.م'}</option>
                    <option value="growth">{currentLanguage === 'en' ? 'Growth Package — EGP 14,999 (Recommended)' : 'باقة النمو — ١٤,٩٩٩ ج.م (موصى بها)'}</option>
                    <option value="premium">{currentLanguage === 'en' ? 'Premium Experience — Custom' : 'الباقة الفاخرة — حسب الطلب'}</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-[9px] font-mono tracking-[0.2em] text-[#C9A87C]/65 uppercase">
                    {t.contact.formData.message}
                  </label>
                  <textarea
                    required
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={currentLanguage === 'en' ? 'What do you sell or build? Where are you based?' : 'ما طبيعة نشاطك التجاري؟ أين مقرك؟'}
                    className="w-full px-4 py-3.5 bg-black/40 border border-[#C9A87C]/15 rounded-xl text-xs text-[#F5F0E8] placeholder-[#F5F0E8]/20 focus:border-[#C9A87C]/50 focus:outline-none transition-colors duration-300 resize-none font-sans-luxury"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={status !== 'idle'}
                  aria-busy={status === 'sending'}
                  animate={status === 'success' ? { scale: [1, 1.04, 1] } : {}}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className={`w-full py-4 rounded-xl font-semibold text-xs tracking-[0.15em] uppercase transition-all duration-400 flex items-center justify-center gap-2 cursor-pointer ${
                    status === 'success'
                      ? 'bg-[#1f3a2e] text-[#E8C97A] border border-[#E8C97A]/40 cursor-default'
                      : status === 'sending'
                      ? 'bg-gradient-to-r from-[#8B6914] via-[#C9A87C] to-[#8B6914] text-black/70 cursor-wait'
                      : 'bg-gradient-to-r from-[#8B6914] via-[#C9A87C] to-[#8B6914] text-black hover:shadow-[0_0_30px_rgba(201,168,124,0.4)]'
                  }`}
                >
                  {status === 'sending' && (
                    <span className="w-3.5 h-3.5 rounded-full border-2 border-black/30 border-t-black/80 animate-spin" />
                  )}
                  {status === 'success' && (
                    <motion.span
                      initial={{ scale: 0, rotate: -90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 14 }}
                    >
                      <Check className="w-4 h-4" />
                    </motion.span>
                  )}
                  {status === 'idle' && <Send className="w-3.5 h-3.5" />}
                  <span>{buttonLabel}</span>
                </motion.button>

                {/* Inline success confirmation — so the client clearly knows it sent */}
                <AnimatePresence>
                  {status === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 12, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: 'auto' }}
                      exit={{ opacity: 0, y: -8, height: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 flex items-start gap-3 rounded-xl border border-[#E8C97A]/25 bg-[#E8C97A]/[0.06] px-4 py-4">
                        <div className="mt-0.5 w-6 h-6 shrink-0 rounded-full bg-[#E8C97A]/15 border border-[#E8C97A]/40 flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 text-[#E8C97A]" />
                        </div>
                        <div>
                          <p className="text-sm font-serif font-bold text-[#F5F0E8] mb-1">
                            {currentLanguage === 'en' ? 'Request received — thank you.' : 'تم استلام طلبك — شكرًا لك.'}
                          </p>
                          <p className="text-xs leading-relaxed text-[#F5F0E8]/55 font-sans-luxury">
                            {currentLanguage === 'en'
                              ? 'Our team will reach out within 24 hours. Prefer to talk now? Message us on WhatsApp.'
                              : 'سيتواصل معك فريقنا خلال ٢٤ ساعة. تفضّل التحدث الآن؟ راسلنا على واتساب.'}
                          </p>
                          <a
                            href="https://wa.me/201554347348"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 mt-3 text-[10px] font-mono tracking-[0.15em] uppercase text-[#E8C97A] border-b border-[#E8C97A]/30 pb-0.5 hover:border-[#E8C97A] transition-colors duration-300"
                          >
                            {currentLanguage === 'en' ? 'Open WhatsApp' : 'افتح واتساب'}
                            <ArrowUpRight className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>

          </div>
        </div>
      </section>

    </div>
  );
}
