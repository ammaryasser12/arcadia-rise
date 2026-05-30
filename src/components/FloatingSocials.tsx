import { motion } from 'motion/react';
import { MessageCircle, Instagram, Facebook } from 'lucide-react';

export default function FloatingSocials() {
  const socialPaths = [
    {
      id: 'float-fb',
      name: 'Facebook',
      icon: <Facebook className="w-5 h-5 text-[#C9A87C]" />,
      url: 'https://www.facebook.com/share/1EdjScMLvh/?mibextid=wwXIfr'
    },
    {
      id: 'float-ig',
      name: 'Instagram',
      icon: <Instagram className="w-5 h-5 text-[#C9A87C]" />,
      url: 'http://instagram.com/arcadiarise'
    },
    {
      id: 'float-wa',
      name: 'WhatsApp',
      icon: <MessageCircle className="w-5 h-5 text-black" />,
      url: 'https://wa.me/201554347348',
      isPrimary: true
    }
  ];

  return (
    <div
      className="fixed bottom-6 right-6 z-40 flex flex-col gap-3.5 items-center"
      id="floating-social-rail"
    >
      {socialPaths.map((soc, index) => (
        <motion.a
          key={soc.id}
          id={soc.id}
          href={soc.url}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.7, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
            delay: 0.8 + index * 0.1
          }}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
            soc.isPrimary
              ? 'bg-[#C9A87C] hover:bg-[#E8C97A] shadow-[0_4px_20px_rgba(201,168,124,0.4)] border border-transparent'
              : 'bg-black/80 backdrop-blur-sm border border-[#C9A87C]/30 hover:border-[#E8C97A] shadow-[0_4px_15px_rgba(0,0,0,0.6)]'
          }`}
          aria-label={soc.name}
        >
          {soc.icon}
        </motion.a>
      ))}
    </div>
  );
}
