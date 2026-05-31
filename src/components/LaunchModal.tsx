import { useState, ChangeEvent, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User, Briefcase, Phone, Mail, Send, Sparkles, Check } from 'lucide-react';
import { Language } from '../types';

/* Formspark form for plan / package inquiries.
   You can create a SEPARATE form at formspark.io and paste its ID here,
   or reuse the consultation form ID. Endpoint = https://submit-form.com/<ID> */
const PLAN_FORMSPARK_ID = 'gUlvec56S';
const PLAN_FORMSPARK_URL = `https://submit-form.com/${PLAN_FORMSPARK_ID}`;

type Status = 'idle' | 'sending' | 'success';

interface LaunchModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: Language;
  plan: {
    id: string;
    name: { en: string; ar: string };
    price?: { en: string; ar: string };
  } | null;
}

export default function LaunchModal({ isOpen, onClose, currentLanguage, plan }: LaunchModalProps) {
  const [formData, setFormData] = useState({ name: '', business: '', phone: '', email: '' });
  const [status, setStatus] = useState<Status>('idle');

  if (!isOpen || !plan) return null;

  const isAr = currentLanguage === 'ar';
  const planName = plan.name[currentLanguage];
  const planPrice = plan.price ? plan.price[currentLanguage] : (isAr ? 'اشتراك شهري' : 'Monthly Retainer');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const close = () => { setStatus('idle'); setFormData({ name: '', business: '', phone: '', email: '' }); onClose(); };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status !== 'idle') return;
    setStatus('sending');
    try {
      const res = await fetch(PLAN_FORMSPARK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          business: formData.business,
          phone: formData.phone,
          email: formData.email,
          plan: `${plan.name.en} — ${plan.price ? plan.price.en : 'Monthly Retainer'}`,
          _email: { subject: `Plan inquiry: ${plan.name.en} — ${formData.name}` },
        }),
      });
      if (!res.ok) throw new Error(`Formspark ${res.status}`);
      setStatus('success');
    } catch (err) {
      console.error('Plan inquiry failed:', err);
      setStatus('idle');
      alert(isAr ? 'حدث خطأ أثناء الإرسال. من فضلك حاول مرة أخرى.' : 'Something went wrong sending your request. Please try again.');
    }
  };

  const submitLabel =
    status === 'sending' ? (isAr ? 'جارٍ الإرسال…' : 'Sending…')
    : status === 'success' ? (isAr ? 'تم الإرسال' : 'Request Sent')
    : (isAr ? 'إرسال الطلب' : 'Send Request');

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto select-none">
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={close}
          className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 15 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="relative w-full max-w-xl bg-[#0d0d0d] border-2 border-[#C9A87C]/30 rounded-2xl shadow-[0_0_50px_rgba(201,168,124,0.18)] overflow-hidden z-20 self-center"
        >
          <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-[#8B6914] via-[#E8C97A] to-[#8B6914] z-10" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-[#C9A87C]/5 rounded-full blur-[70px] pointer-events-none" />

          <button
            onClick={close}
            className="absolute top-5 right-5 w-8 h-8 rounded-full border border-[#C9A87C]/20 hover:border-[#E8C97A] text-[#C9A87C]/60 hover:text-[#E8C97A] flex items-center justify-center transition-colors cursor-pointer z-20"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          {status === 'success' ? (
            /* ── Success view ── */
            <div className="p-10 text-center">
              <motion.div
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 16 }}
                className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#E8C97A]/12 border border-[#E8C97A]/40 flex items-center justify-center"
              >
                <Check className="w-7 h-7 text-[#E8C97A]" />
              </motion.div>
              <h2 className="text-2xl font-serif font-bold text-[#F5F0E8] mb-3">
                {isAr ? 'تم استلام طلبك' : 'Request Received'}
              </h2>
              <p className="text-sm text-[#F5F0E8]/55 font-sans-luxury leading-relaxed mb-8 max-w-sm mx-auto">
                {isAr
                  ? `شكرًا لك. سيتواصل معك فريقنا خلال ٢٤ ساعة بخصوص باقة ${planName}.`
                  : `Thank you. Our team will reach out within 24 hours about your ${planName} request.`}
              </p>
              <button
                onClick={close}
                className="px-8 py-3 rounded-xl border border-[#C9A87C]/30 hover:border-[#E8C97A] text-[#C9A87C] hover:text-[#E8C97A] font-mono text-xs tracking-widest uppercase transition-all cursor-pointer"
              >
                {isAr ? 'إغلاق' : 'Close'}
              </button>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="p-8 pb-3 border-b border-[#C9A87C]/10 text-left dir-auto">
                <div className="flex items-center gap-2 text-[#E8C97A] mb-2 font-mono text-[9px] font-bold tracking-[0.2em] uppercase">
                  <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                  <span>{isAr ? 'طلب باقة' : 'Request This Plan'}</span>
                </div>
                <h2 className="text-xl md:text-2xl font-serif font-bold text-[#F5F0E8] mb-1 leading-normal">
                  {isAr ? 'أخبرنا عن مشروعك' : 'Tell Us About Your Business'}
                </h2>
                <p className="text-xs text-[#F5F0E8]/50 font-sans-luxury">
                  {isAr ? 'املأ بياناتك وسنعاود التواصل معك خلال ٢٤ ساعة.' : 'Fill in your details and we will get back to you within 24 hours.'}
                </p>
                <div className="mt-4 inline-flex items-center gap-2.5 bg-[#C9A87C]/10 border border-[#C9A87C]/20 rounded-full px-4 py-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#E8C97A]" />
                  <span className="text-xs font-serif font-bold text-[#E8C97A] tracking-wider">{planName}</span>
                  <span className="text-[10px] text-[#F5F0E8]/40 font-mono">|</span>
                  <span className="text-[10px] font-mono font-medium text-[#F5F0E8]/80">{planPrice}</span>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-8 space-y-5 text-left dir-auto">
                {[
                  { id: 'name', Icon: User, type: 'text', label: isAr ? 'الاسم الكامل' : 'Full Name', ph: isAr ? 'مثال: عمار الرشيدي' : 'e.g. Ammar Elrashidi' },
                  { id: 'business', Icon: Briefcase, type: 'text', label: isAr ? 'اسم النشاط التجاري' : 'Business / Brand Name', ph: isAr ? 'مثال: عيادة النور' : 'e.g. Al-Noor Clinic' },
                  { id: 'phone', Icon: Phone, type: 'tel', label: isAr ? 'رقم الهاتف / الواتساب' : 'Phone / WhatsApp', ph: 'e.g. 01554347348' },
                  { id: 'email', Icon: Mail, type: 'email', label: isAr ? 'البريد الإلكتروني' : 'Email Address', ph: 'e.g. you@business.com' },
                ].map(f => (
                  <div key={f.id} className="flex flex-col gap-2">
                    <label htmlFor={`modal-${f.id}`} className="text-[10px] font-mono tracking-wider text-[#C9A87C] uppercase flex items-center gap-1.5">
                      <f.Icon className="w-3 h-3 text-[#E8C97A]" />
                      <span>{f.label}</span>
                    </label>
                    <input
                      required
                      type={f.type}
                      id={`modal-${f.id}`}
                      name={f.id}
                      value={(formData as any)[f.id]}
                      onChange={handleInputChange}
                      placeholder={f.ph}
                      className="w-full px-4 py-3 bg-black/50 border border-[#C9A87C]/15 focus:border-[#E8C97A] rounded-xl text-xs text-[#F5F0E8] placeholder-[#F5F0E8]/20 focus:outline-none transition-all focus:shadow-[0_0_10px_rgba(201,168,124,0.1)]"
                    />
                  </div>
                ))}

                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-[#C9A87C]/10">
                  <button
                    type="button"
                    onClick={close}
                    className="order-last sm:order-first w-full sm:w-1/3 py-3.5 rounded-xl border border-[#C9A87C]/20 hover:border-[#E8C97A] text-[#C9A87C]/70 hover:text-[#E8C97A] font-semibold text-xs tracking-widest uppercase transition-all cursor-pointer"
                  >
                    {isAr ? 'إلغاء' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    disabled={status !== 'idle'}
                    aria-busy={status === 'sending'}
                    className="w-full sm:w-2/3 py-3.5 rounded-xl bg-gradient-to-r from-[#8B6914] via-[#C9A87C] to-[#8B6914] hover:shadow-[0_0_20px_rgba(201,168,124,0.35)] text-black font-semibold text-xs tracking-widest uppercase flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === 'sending'
                      ? <span className="w-3.5 h-3.5 rounded-full border-2 border-black/30 border-t-black/80 animate-spin" />
                      : <Send className="w-3.5 h-3.5" />}
                    <span>{submitLabel}</span>
                  </button>
                </div>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
