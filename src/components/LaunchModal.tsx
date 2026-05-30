import React, { useState, ChangeEvent, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User, Briefcase, Phone, Mail, Send, Sparkles } from 'lucide-react';
import { Language } from '../types';

interface LaunchModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: Language;
  plan: {
    id: string;
    name: { en: string; ar: string };
    price: { en: string; ar: string };
  } | null;
}

export default function LaunchModal({ isOpen, onClose, currentLanguage, plan }: LaunchModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    business: '',
    phone: '',
    email: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !plan) return null;

  const planName = plan.name[currentLanguage];
  const planPrice = plan.price[currentLanguage];

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Format WhatsApp details beautifully with clear structure and bold headers
    const whatsAppMessage = 
      `*ARCADIA RISE - PLAN ACQUISITION INQUIRY / طلب حجز باقة رقمية*\n` +
      `==================================\n\n` +
      `• *Chosen Plan / الباقة المختارة:*\n` +
      `  ${plan.name.en} (${plan.name.ar})\n\n` +
      `• *Price / السعر:*\n` +
      `  ${plan.price.en} (${plan.price.ar})\n\n` +
      `----------------------------------\n` +
      `*CLIENT CONTACT PROFILE / ملف بيانات العميل:*\n` +
      `----------------------------------\n\n` +
      `• *Full Name / الاسم الكامل:*\n` +
      `  ${formData.name}\n\n` +
      `• *Business / Trade Name / اسم النشاط التجاري:*\n` +
      `  ${formData.business}\n\n` +
      `• *Mobile / WhatsApp / رقم الهاتف:*\n` +
      `  ${formData.phone}\n\n` +
      `• *Email Address / البريد الإلكتروني:*\n` +
      `  ${formData.email}\n\n` +
      `----------------------------------\n` +
      `Generated electronically via ARCADIA RISE atelier.`;

    const encodedMessage = encodeURIComponent(whatsAppMessage);
    const whatsappLink = `https://api.whatsapp.com/send/?phone=201554347348&text=${encodedMessage}&type=phone_number&app_absent=0`;

    // Redirect to WhatsApp immediately
    setTimeout(() => {
      window.open(whatsappLink, '_blank');
      setIsSubmitting(false);
      onClose();
    }, 600);
  };

  const isAr = currentLanguage === 'ar';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto select-none">
        
        {/* Backdrop overlay background blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Container layout */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 15 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="relative w-full max-w-xl bg-[#0d0d0d] border-2 border-[#C9A87C]/30 rounded-2xl shadow-[0_0_50px_rgba(201,168,124,0.18)] overflow-hidden z-20 self-center"
          id="launch-registration-modal"
        >
          {/* Subtle upper light line gradient */}
          <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-[#8B6914] via-[#E8C97A] to-[#8B6914] z-10" />

          {/* Golden radial background ambient light */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-[#C9A87C]/5 rounded-full blur-[70px] pointer-events-none" />

          {/* Close Header Trigger button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full border border-[#C9A87C]/20 hover:border-[#E8C97A] text-[#C9A87C]/60 hover:text-[#E8C97A] flex items-center justify-center transition-colors cursor-pointer z-20"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header design detailing */}
          <div className={`p-8 pb-3 border-b border-[#C9A87C]/10 text-left dir-auto`}>
            <div className="flex items-center gap-2 text-[#E8C97A] mb-2 font-mono text-[9px] font-bold tracking-[0.2em] uppercase">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>{isAr ? 'بدء الحجز الرقمي الفاخر' : 'Start Luxury Acquisition'}</span>
            </div>
            
            <h2 className="text-xl md:text-2xl font-serif font-bold text-[#F5F0E8] text-gold-glow mb-1 leading-normal">
              {isAr ? 'تخصيص وإطلاق الهوية' : 'Tailor & Launch Plan'}
            </h2>
            
            <p className="text-xs text-[#F5F0E8]/50 font-sans-luxury">
              {isAr 
                ? `الرجاء كتابة بياناتك للبدء في حجز باقة: ${planName}` 
                : `Please write down your contact profile to request: ${planName}`
              }
            </p>

            {/* Display selected plan badge details */}
            <div className="mt-4 inline-flex items-center gap-2.5 bg-[#C9A87C]/10 border border-[#C9A87C]/20 rounded-full px-4 py-1.5">
              <span className="w-2 h-2 rounded-full bg-[#E8C97A]" />
              <span className="text-xs font-serif font-bold text-[#E8C97A] tracking-wider">
                {planName}
              </span>
              <span className="text-[10px] text-[#F5F0E8]/40 font-mono">|</span>
              <span className="text-[10px] font-mono font-medium text-[#F5F0E8]/80">
                {planPrice}
              </span>
            </div>
          </div>

          {/* Form wrapper */}
          <form onSubmit={handleSubmit} className="p-8 space-y-5 text-left dir-auto">
            
            {/* Field: Full Name */}
            <div className="flex flex-col gap-2">
              <label htmlFor="modal-name" className="text-[10px] font-mono tracking-wider text-[#C9A87C] uppercase flex items-center gap-1.5">
                <User className="w-3 h-3 text-[#E8C97A]" />
                <span>{isAr ? 'الاسم الكامل للعميل / الممثل' : 'Full Client / Representative Name'}</span>
              </label>
              <input
                required
                type="text"
                id="modal-name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-black/50 border border-[#C9A87C]/15 focus:border-[#E8C97A] rounded-xl text-xs text-[#F5F0E8] placeholder-[#F5F0E8]/20 focus:outline-none transition-all focus:shadow-[0_0_10px_rgba(201,168,124,0.1)]"
                placeholder={isAr ? 'الرجاء كتابة اسمك الكامل الثنائي أو الثلاثي' : 'e.g. Ammar Elrashidi'}
              />
            </div>

            {/* Field: Business or Brand Name */}
            <div className="flex flex-col gap-2">
              <label htmlFor="modal-business" className="text-[10px] font-mono tracking-wider text-[#C9A87C] uppercase flex items-center gap-1.5">
                <Briefcase className="w-3 h-3 text-[#E8C97A]" />
                <span>{isAr ? 'اسم النشاط التجاري أو العلامة التجارية' : 'Business / Trade Name'}</span>
              </label>
              <input
                required
                type="text"
                id="modal-business"
                name="business"
                value={formData.business}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-black/50 border border-[#C9A87C]/15 focus:border-[#E8C97A] rounded-xl text-xs text-[#F5F0E8] placeholder-[#F5F0E8]/20 focus:outline-none transition-all focus:shadow-[0_0_10px_rgba(201,168,124,0.1)]"
                placeholder={isAr ? 'مثال: شركة النيل للتصدير أو المشرق للحديد' : 'e.g. Arcadia rise Clinic or Dental Atelier'}
              />
            </div>

            {/* Field: Phone or WhatsApp */}
            <div className="flex flex-col gap-2">
              <label htmlFor="modal-phone" className="text-[10px] font-mono tracking-wider text-[#C9A87C] uppercase flex items-center gap-1.5">
                <Phone className="w-3 h-3 text-[#E8C97A]" />
                <span>{isAr ? 'رقم الهاتف / الواتساب الفعال' : 'Active Mobile / WhatsApp'}</span>
              </label>
              <input
                required
                type="tel"
                id="modal-phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-black/50 border border-[#C9A87C]/15 focus:border-[#E8C97A] rounded-xl text-xs text-[#F5F0E8] placeholder-[#F5F0E8]/20 focus:outline-none transition-all focus:shadow-[0_0_10px_rgba(201,168,124,0.1)]"
                placeholder={isAr ? 'مثال: 01554347348' : 'e.g. 01554347348'}
              />
            </div>

            {/* Field: Email Address */}
            <div className="flex flex-col gap-2">
              <label htmlFor="modal-email" className="text-[10px] font-mono tracking-wider text-[#C9A87C] uppercase flex items-center gap-1.5">
                <Mail className="w-3 h-3 text-[#E8C97A]" />
                <span>{isAr ? 'البريد الإلكتروني للشركة / العميل' : 'Active Email Address'}</span>
              </label>
              <input
                required
                type="email"
                id="modal-email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-black/50 border border-[#C9A87C]/15 focus:border-[#E8C97A] rounded-xl text-xs text-[#F5F0E8] placeholder-[#F5F0E8]/20 focus:outline-none transition-all focus:shadow-[0_0_10px_rgba(201,168,124,0.1)]"
                placeholder={isAr ? 'example@domain.com' : 'e.g. example@business.com'}
              />
            </div>

            {/* Action buttons footer layout */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-[#C9A87C]/10">
              
              {/* Reset/Cancel Close button */}
              <button
                type="button"
                onClick={onClose}
                className="order-last sm:order-first w-full sm:w-1/3 py-3.5 rounded-xl border border-[#C9A87C]/20 hover:border-[#E8C97A] text-[#C9A87C]/70 hover:text-[#E8C97A] font-semibold text-xs tracking-widest uppercase transition-all"
              >
                {isAr ? 'إلغاء' : 'Cancel'}
              </button>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-2/3 py-3.5 rounded-xl bg-gradient-to-r from-[#8B6914] via-[#C9A87C] to-[#8B6914] hover:shadow-[0_0_20px_rgba(201,168,124,0.35)] text-black font-semibold text-xs tracking-widest uppercase flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                id="modal-submit-button"
              >
                <Send className="w-3.5 h-3.5" />
                <span>
                  {isSubmitting 
                    ? (isAr ? 'جاري التحويل للواتساب...' : 'Opening WhatsApp...') 
                    : (isAr ? 'إرسال للواتساب والبدء فوراً' : 'Send via WhatsApp Now')
                  }
                </span>
              </button>
            </div>

          </form>
        </motion.div>

      </div>
    </AnimatePresence>
  );
}
