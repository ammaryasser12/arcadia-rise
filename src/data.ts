import { ServiceItem, ValuePoint, StepItem, PortfolioItem, TestimonialItem, PricingTier } from './types';

export const services: ServiceItem[] = [
  {
    id: 'web-design',
    title: {
      en: 'Website Design & Launch',
      ar: 'تصميم وإطلاق المواقع الإلكترونية'
    },
    description: {
      en: 'Stunning, fast-loading websites built with modern design principles. Fully responsive, custom tailored to reflect your unique business identity and convert local visitors into loyal clients.',
      ar: 'مواقع إلكترونية مذهلة وسريعة للغاية تعكس هوية مشروعك الفريد وتجذب العملاء، مصممة خصيصاً لتناسب الهواتف الذكية وتحقق مبيعات حقيقية لأصحاب الأعمال المحليين.'
    },
    longDescription: {
      en: 'A high-converting website is your 24/7 digital storefront in Egypt. We design beautiful, layout-optimized, fast-indexable websites that communicate reliability. Includes SEO optimization, native mobile support, speed performance tuning, and dynamic call-to-actions targeting Egyptian consumer habits.',
      ar: 'الموقع الإلكتروني هو واجهتك الرقمية على مدار الساعة. نقوم بتصميم مواقع جذابة وسريعة مصممة خصيصاً لجذب المستهلك المصري، مع تحسين محركات البحث، ودعم الأجهزة المحمولة، وسرعة تصفح فائقة لضمان بقاء الزائر.'
    },
    icon: 'Terminal'
  },
  {
    id: 'google-business',
    title: {
      en: 'Google Business Profile Setup',
      ar: 'إعداد ملف جوجل للأعمال (خرائط جوجل)'
    },
    description: {
      en: 'We put your physical business on Google Maps, configure your profile for local search, and establish keywords that make you show up when customers search for products in your area.',
      ar: 'نضع نشاطك التجاري على خرائط جوجل وحجوزات البحث المحلي، مع إعداد الكلمات الدلالية المناسبة لتظهر لعملائك بمجرد بحثهم عن خدماتك في منطقتك الجغرافية.'
    },
    longDescription: {
      en: 'If your business is not on Google Maps, you do not exist to local searchers. We setup, verify, and fully optimize your Google Business profile. This includes local keywords targeting your city and across Egypt, review solicitation setup, operating hours, cover photos, and seamless routing directions.',
      ar: 'إذا لم يكن مشروعك على خرائط جوجل، فأنت غير مرئي لعملائك. نقوم بإنشاء وتفعيل وتحسين ملف جوجل للأعمال بالكامل، مع التركيز على الكلمات الأكثر بحثاً في مدينتك وكل مصر لجلب الزوار مباشرة إلى باب محلك.'
    },
    icon: 'MapPin'
  },
  {
    id: 'social-media',
    title: {
      en: 'Social Media Page Creation',
      ar: 'إنشاء وتصميم صفحات التواصل الاجتماعي'
    },
    description: {
      en: 'Professional, cohesive brand pages across Facebook and Instagram. Beautifully branded graphic templates, standard bios, and optimized structures designed to command local trust.',
      ar: 'تأسيس حضور احترافي متناسق الهوية وموحد على منصات فيسبوك وإنستجرام، يشمل تصميم الأغلفة والشعارات بأسلوب يعكس مهنية نشاطك ويحوز على ثقة المجتمع المصري.'
    },
    longDescription: {
      en: 'Egyptian daily digital activity revolves around social platforms. We build unified, highly recognizable visual assets (logos, profile banners, content-ready templates) to ensure that the moment a client clicks on your Facebook or Instagram profile, they experience a cohesive luxury brand standard.',
      ar: 'يدور النشاط الرقمي في مصر حول شبكات التواصل الاجتماعي. نثبّت حضورك بقوالب بصرية فاخرة وأغلفة مهيأة للترويج تضمن تناسق الهوية الكامل بين موقعك وصفحاتك على فيسبوك وإنستجرام.'
    },
    icon: 'Share2'
  }
];

export const values: ValuePoint[] = [
  {
    id: 'fast-delivery',
    title: {
      en: 'Fast Delivery',
      ar: 'تسليم سريع وقياسي'
    },
    description: {
      en: 'Your customized luxury website is designed, approved, and fully launched in less than 14 business days.',
      ar: 'يتم تصميم موقعك الفاخر ومراجعته وإطلاقه بالكامل للجمهور في أقل من ١٤ يوم عمل وبدون أي تعقيدات.'
    },
    icon: 'Clock'
  },
  {
    id: 'full-service',
    title: {
      en: 'Full Service',
      ar: 'خدمة كاملة متكاملة'
    },
    description: {
      en: 'We copywrite, take pictures, buy domains, manage hosting, setup mails, and wire up maps. You focus on your business.',
      ar: 'نتكفل بكتابة النصوص، شراء النطاقات، توفير الاستضافة، إعداد البريد الإلكتروني وربط الخرائط بالكامل.'
    },
    icon: 'Wrench'
  },
  {
    id: 'local-expertise',
    title: {
      en: 'Local Expertise',
      ar: 'خبرة وفهم للسوق المحلي'
    },
    description: {
      en: 'Rooted in Egypt. We understand exactly how Egyptian buyers behave, search, and decide online.',
      ar: 'جذورنا في مصر. نفهم تماماً سلوك المستهلك المصري، كيفية بحثه، وما هي العوامل التي تدفعه للشراء والاتصال.'
    },
    icon: 'Compass'
  },
  {
    id: 'affordable-pricing',
    title: {
      en: 'Affordable Pricing',
      ar: 'أسعار مناسبة وقيمة حقيقية'
    },
    description: {
      en: 'Luxury presentation tailored for local SMEs. No hidden charges, no endless monthly retainers. Unbeatable ROI.',
      ar: 'تقديم جودة عالمية وأنيقة بأسعار تلائم الشركات الصغيرة والمتوسطة بمصر. بدون رسوم خفية أو مبالغ تعجيزية.'
    },
    icon: 'DollarSign'
  }
];

export const steps: StepItem[] = [
  {
    id: 'step-talk',
    stepNumber: '01',
    title: {
      en: 'We Talk',
      ar: 'نتحدث ونحلل'
    },
    description: {
      en: 'A strategic consultation where we map your services, identify your ideal Egyptian audience, and sketch your design needs.',
      ar: 'استشارة استراتيجية مجانية نحدد خلالها طبيعة خدماتك، نمط جمهورك المستهدف في مصر، والأسلوب البصري الأنسب لمشروعك.'
    }
  },
  {
    id: 'step-build',
    stepNumber: '02',
    title: {
      en: 'We Build',
      ar: 'نبني ونصمم'
    },
    description: {
      en: 'We write professional copy, structure sleek responsive visual grid configurations, and build optimized page paths using premium layouts.',
      ar: 'نصيغ النصوص التسويقية الاحترافية، نصمم واجهات متناسقة وراقية، ونبرمج صفحات سريعة متجاوبة مع كافة الشاشات.'
    }
  },
  {
    id: 'step-live',
    stepNumber: '03',
    title: {
      en: 'You Go Live',
      ar: 'تنطلق للعالمية'
    },
    description: {
      en: 'We launch on Egyptian cloud hosting, link your standard Google Maps profile, and activate direct WhatsApp booking gateways.',
      ar: 'نطلق موقعك على خوادم سحابية، نربط حساب خرائط جوجل المفعّل، ونفعل قنوات الاتصال المباشر لتبدأ باستقبال العملاء.'
    }
  }
];

export const portfolios: PortfolioItem[] = [
  {
    id: 'port-corniche',
    title: {
      en: 'Corniche House Restaurant',
      ar: 'مطعم كورنيش هاوس'
    },
    category: {
      en: 'Restaurant & Fine Dining',
      ar: 'مطاعم وضيافة راقية'
    },
    industry: {
      en: 'Fresh Seafood · Mediterranean Waterfront',
      ar: 'مأكولات بحرية طازجة · على الواجهة البحرية'
    },
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80',
    url: '/demos/corniche-house.html'
  },
  {
    id: 'port-perfumes',
    title: {
      en: 'Al Andalus Perfumes',
      ar: 'عطارة الأندلس'
    },
    category: {
      en: 'Luxury Retail & Heritage',
      ar: 'تجزئة فاخرة وتراث عريق'
    },
    industry: {
      en: 'Attar & Oud · Heritage Perfumery',
      ar: 'عطور وعود · عطارة عريقة'
    },
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80',
    url: '/demos/andalus-perfumes.html'
  },
  {
    id: 'port-realty',
    title: {
      en: 'Prestige Realty',
      ar: 'بريستيج للعقارات'
    },
    category: {
      en: 'Real Estate Agency',
      ar: 'وكالة عقارية'
    },
    industry: {
      en: 'Luxury Property · Premium Districts',
      ar: 'عقارات فاخرة · أرقى الأحياء'
    },
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
    url: '/demos/prestige-realty.html'
  },
  {
    id: 'port-fitness',
    title: {
      en: 'Stella Fitness Club',
      ar: 'نادي ستيلا للياقة'
    },
    category: {
      en: 'Sports & Wellness',
      ar: 'رياضة وصحة'
    },
    industry: {
      en: 'Premium Gym · 24/7 Fitness Club',
      ar: 'صالة رياضية فاخرة · ناد مفتوح ٢٤ ساعة'
    },
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
    url: '/demos/stella-fitness.html'
  }
];

export const testimonials: TestimonialItem[] = [
  {
    id: 'test-1',
    name: {
      en: 'Emad El-Din',
      ar: 'الحاج عماد الدين'
    },
    role: {
      en: 'Owner & General Manager',
      ar: 'مؤسس ومدير عام'
    },
    business: {
      en: 'Sea Harvest Restaurant',
      ar: 'مطعم سي هارفست'
    },
    content: {
      en: 'Arcadia Rise rebuilt our restaurant’s digital face. Translating our fresh fish display to an elegant online booking catalog combined with Google Maps optimization literally doubled our physical walk-ins in under two weeks. Unbelievable return on investment!',
      ar: 'أعادت ARCADIA RISE بناء وجهنا الرقمي بالكامل. تحويل قائمة الأسماك الطازجة إلى معرض رقمي راقٍ مع تحسين تواجدنا على خرائط جوجل، ضاعف زبائن المحل بالكامل في أقل من أسبوعين. قيمة استثنائية وعائد حقيقي!'
    },
    rating: 5
  },
  {
    id: 'test-2',
    name: {
      en: 'Osama El-Hawary',
      ar: 'المهندس أسامة الهواري'
    },
    role: {
      en: 'Chief Artisan Woodworker',
      ar: 'صاحب ورشة ومعرض الحرية'
    },
    business: {
      en: 'El-Horreya Custom Furniture',
      ar: 'الحرية للأثاث والموبيليا'
    },
    content: {
      en: 'I did not understand anything about websites or branding online. The team took complete charge of copywriting, photography, and setting up our direct WhatsApp. Now, client orders from Cairo and Arab Gulf are coming in via our sleek showcase.',
      ar: 'لم أكن أفهم أي شيء في مواقع الويب والتصميم الرقمي. تولى الفريق زمام المبادرة وصاغوا العبارات وصوروا منتجاتنا من الموبيليا بدقة وأضافوا زر واتساب المباشر. الآن نستلم طلبات من القاهرة ودول الخليج بفضل المعرض الانيق.'
    },
    rating: 5
  },
  {
    id: 'test-3',
    name: {
      en: 'Dr. Sarah Mostafa',
      ar: 'دكتورة سارة مصطفى'
    },
    role: {
      en: 'Lead Orthodontist & Director',
      ar: 'طبيبة ومديرة المركز'
    },
    business: {
      en: 'Al-Amal Dental Center',
      ar: 'مركز الأمل لطب الأسنان'
    },
    content: {
      en: 'Extremely professional and dedicated agency. They delivered a brilliant, pixel-perfect medical booking applet. It looks and functions like a premium international template but at flat rates that local Egyptian clinics can comfortably afford.',
      ar: 'وكالة متفانية ومنظمون للغاية. صمموا لنا موقعاً طبياً لحجز المواعيد غاية في الرقي والسهولة. يبدو كمنصة عالمية فاخرة وبأسعار مسطحة واضحة تناسب ميزانيات عيادتنا تماماً دون أي مصاريف مستترة.'
    },
    rating: 5
  }
];

export const pricing: PricingTier[] = [
  {
    id: 'tier-starter',
    name: {
      en: 'Starter Package',
      ar: 'الباقة التمهيدية (ستارتر)'
    },
    price: {
      en: 'EGP 14,999',
      ar: '١٤,٩٩٩ ج.م'
    },
    originalPrice: {
      en: 'EGP 19,999',
      ar: '١٩,٩٩٩ ج.م'
    },
    period: {
      en: 'one-time fee',
      ar: 'تدفع لمرة واحدة'
    },
    description: {
      en: 'Perfect setup for local shops, cafes, and solo craftspeople taking their first step online.',
      ar: 'إعداد مثالي للمحلات التجارية والورش ومقدمي الخدمات الفردية لبدء التواجد الفعلي على الإنترنت.'
    },
    features: {
      en: [
        'Premium single-page landing catalog',
        'Google Business Profile & Maps registration',
        'Direct WhatsApp contact floating button',
        'Mobile responsive grid configuration',
        'Bilingual English OR Arabic copy',
        '1 year ultra-secure local domain & hosting assistance'
      ],
      ar: [
        'صفحة رئيسية واحدة (كتالوج وبصمة تعريفية)',
        'تأسيس ملف جوجل للأعمال وتثبيته على الخريطة',
        'زر اتصال مباشر مع واتساب بضغطة زر',
        'تصميم مهيأ بالكامل للهواتف الذكية وحجم الشاشات',
        'محتوى باللغة العربية أو الإنجليزية',
        'تأمين النطاق الخارجي والمساعدة في حجز الاستضافة'
      ]
    },
    isRecommended: false,
    ctaText: {
      en: 'Launch Starter Plan',
      ar: 'اختر باقة ستارتر'
    }
  },
  {
    id: 'tier-growth',
    name: {
      en: 'Growth Package',
      ar: 'باقة النمو الذهبية (جروس)'
    },
    price: {
      en: 'EGP 24,999',
      ar: '٢٤,٩٩٩ ج.م'
    },
    originalPrice: {
      en: 'EGP 29,999',
      ar: '٢٩,٩٩٩ ج.م'
    },
    period: {
      en: 'one-time fee',
      ar: 'تدفع لمرة واحدة'
    },
    description: {
      en: 'Our recommended, high-impact presence package. Complete ecosystem setup for solid expansion and ultimate local credibility.',
      ar: 'الخيار الأكثر طلباً وتوصية لنمو الأعمال. تأسيس نظام رقمي متكامل لمضاعفة الثقة والوصول لأكبر عدد زبائن.'
    },
    features: {
      en: [
        '5 pages (Home, Services, Portfolio, About, Call)',
        'Full Google Maps listing optimization with Local SEO',
        'Social media design integrations (FB, IG banners)',
        'Dual Bilingual Support (Instant Switch EN/AR)',
        'SEO Optimized code to rank high in local search queries',
        'Highly responsive custom gold-themed layouts',
        '1 year free custom domain registration (.com/.com.eg)',
        'Standard interactive contact dynamic form'
      ],
      ar: [
        'موقع فريد كامل من ٥ صفحات (الرئيسية، الخدمة، سابقة العمل، عنا، اتصال)',
        'تحسين كامل لظهور خرائط جوجل والسيو التجاري المحلي',
        'تصاميم واجهات وأغلفة متناسقة للهوية لصفحات فيسبوك وإنستجرام',
        'دعم ثنائي اللغة كامل مع سهولة التحويل (عربي/إنجليزي)',
        'بناء برمجي مهيأ لمحركات البحث للظهور بنتائج مصر الأولى',
        'مؤثرات بصرية فاخرة مطلية بتصميم الزجاج والذهب الفخم',
        'نطاق خاص بالشركة مجاني لعام كامل (.com أو .eg)',
        'نموذج اتصال تفاعلي راقٍ يُرسل التنبيهات فوراً'
      ]
    },
    isRecommended: true,
    ctaText: {
      en: 'Launch Growth Plan',
      ar: 'انطلق مع باقة جروس'
    }
  },
  {
    id: 'tier-premium',
    name: {
      en: 'Premium Experience',
      ar: 'الباقة الفاخرة المخصصة (بريميوم)'
    },
    price: {
      en: 'Contact Sales',
      ar: 'اتصل بالمبيعات'
    },
    period: {
      en: 'Custom pricing based on requests',
      ar: 'تسعير مخصص حسب الطلب'
    },
    description: {
      en: 'Unyielding luxury designed for established corporate fleets, doctors, real estate portals, and upscale boutiques.',
      ar: 'تصميم عالي الفخامة للشركات الكبرى والأطباء المشهورين ووكالات العقارات والمحلات الراقية.'
    },
    features: {
      en: [
        'Unlimited premium crafted layouts & galleries',
        'Full custom photography consultation & premium copy',
        'Ultimate security & multi-CDN Egyptian delivery',
        'Advance custom dynamic modules (Booking managers, Catalogs)',
        '3 months of dedicated priority updates & maintenance',
        'Full integration with localized email pipelines'
      ],
      ar: [
        'عدد صفحات ومعارض صور فاخرة غير محدود حسب الطلب',
        'جلسة تصوير احترافية لمنتجاتك وصياغة نصوص فائقة الإقناع',
        'حماية قصوى وتوصيل فائق السرعة عبر خوادم سحابية محلية',
        'أنظمة اتصال و حجز مواعيد متقدمة داخل الموقع',
        '٣ أشهر كاملة من الدعم والصيانة المستمرة مجاناً وتحديثات دورية',
        'إقران كامل مع أنظمة البريد والربط الداخلي لفرق المبيعات'
      ]
    },
    isRecommended: false,
    ctaText: {
      en: 'Launch Premium Experience',
      ar: 'اطلب الباقة الفاخرة'
    }
  }
];

export const translationCopy = {
  en: {
    brandName: 'ARCADIA RISE',
    tagline: 'Arcadia Rise',
    subTitle: 'Digital Agency',
    alexandria: 'Egypt · Worldwide',
    origin: 'Egypt',
    menu: {
      home: 'Home',
      services: 'Services',
      whyUs: 'Why Arcadia',
      process: 'How It Works',
      portfolio: 'Portfolio',
      testimonials: 'Testimonials',
      pricing: 'Pricing',
      about: 'About',
      contact: 'Contact'
    },
    hero: {
      headline: 'We Put Your Business On The Map.',
      subheadline: 'Professional websites for Egyptian businesses that deserve to be found online.',
      cta: 'Get Your Free Consultation'
    },
    services: {
      sectionTitle: 'What We Do',
      sectionSubtitle: 'PREMIUM DIGITAL ESSENTIALS',
      desc: 'We construct elegant pathways from neighborhood storefronts to global internet screens, designed specifically for non-online businesses in Egypt.'
    },
    whyUs: {
      sectionTitle: 'Why Arcadia Rise',
      sectionSubtitle: 'DELIVERING VALUE',
      desc: 'Formulated to meet the demands of ambitious businesses looking for flawless reputation, immediate ROI, and direct human communication.'
    },
    process: {
      sectionTitle: 'How It Works',
      sectionSubtitle: 'OUR CHRONICLE',
      desc: 'A transparent, streamlined path designed with zero technical hassle for you of any kind.'
    },
    portfolio: {
      sectionTitle: 'What We Can Build For You',
      sectionSubtitle: 'DESIGN CONCEPTS · ALEXANDRIA',
      desc: 'Four concept designs built for ambitious businesses — each fully interactive. This is the standard we hold ourselves to.',
      viewDemo: 'Open Live Site'
    },
    testimonials: {
      sectionTitle: 'Client Voices',
      sectionSubtitle: 'CREDIBILITY ALIVE',
      desc: 'Hear from business owners who unlocked their digital scale with our high-end framework.'
    },
    pricing: {
      sectionTitle: 'Tiered Ecosystem Packages',
      sectionSubtitle: 'HONEST PRICING',
      desc: 'Clear, transparent pricing structure tailored to support Egyptian small and medium enterprises. No hidden maintenance bills.',
      recommended: 'RECOMMENDED CHOICE'
    },
    about: {
      sectionTitle: 'About Arcadia Rise',
      sectionSubtitle: 'WHO WE ARE',
      desc: 'Rooted in Egypt, our agency is fueled by a singular, passionate mission: to rescue small and medium businesses from digital invisibility. We believe that everyday entrepreneurs — from legendary carpentry workshops to neighborhood seafood institutions — possess incredible craftsmanship that deserves to be honored visually online. We combine high-end European design discipline with sharp local hustle, building premium web portals that put your business exactly where your customers are searching.'
    },
    ctaBanner: {
      headline: 'Your competitors are online. Are you?',
      cta: 'Secure Your Web Presence Today'
    },
    contact: {
      sectionTitle: 'Establish Contact',
      sectionSubtitle: 'GET IN TOUCH',
      desc: 'Let us discuss your project. Reach us from anywhere — call or text us digitally, worldwide.',
      infoTitle: 'Headquarters & Social Realms',
      formTitle: 'Send a Message',
      formData: {
        name: 'Full Name / Business Name',
        phone: 'Phone Number (WhatsApp)',
        service: 'Selected Package',
        message: 'Briefly describe your business...',
        send: 'Send Inquiry (WhatsApp Direct)',
        saving: 'Preparing Gateways...'
      },
      locale: 'Egypt · Worldwide'
    },
    footer: {
      rights: '© 2026 Arcadia Rise. All rights reserved. Crafted for the prominent Egyptian Hustle.',
      disclaimer: 'Luxury branding & web engineering inspired by Egyptian heritage.'
    }
  },
  ar: {
    brandName: 'ARCADIA RISE',
    tagline: 'ARCADIA RISE',
    subTitle: 'وكالة رقمية',
    alexandria: 'مصر · حول العالم',
    origin: 'مصر',
    menu: {
      home: 'الرئيسية',
      services: 'خدماتنا',
      whyUs: 'لماذا نحن',
      process: 'خطوات العمل',
      portfolio: 'سابقة أعمالنا',
      testimonials: 'آراء عملائنا',
      pricing: 'أسعارنا',
      about: 'من نحن',
      contact: 'اتصل بنا'
    },
    hero: {
      headline: 'نضع مشروعك التجاري على الخريطة.',
      subheadline: 'مواقع إلكترونية فاخرة للمشروعات المصرية التي تستحق التواجد والظهور بقوة لملايين العملاء.',
      cta: 'احصل على استشارتك المجانية الآن'
    },
    services: {
      sectionTitle: 'ماذا نقدم لك',
      sectionSubtitle: 'روافد الرقمنة الفاخرة',
      desc: 'نقوم بتشييد ممرات رقمية أنيقة تنقل مشروعك من حدود منطقتك المحلية إلى شاشات الهواتف في كل مكان بمصر.'
    },
    whyUs: {
      sectionTitle: 'لماذا تختار ARCADIA RISE؟',
      sectionSubtitle: 'قيمة حقيقية ملموسة',
      desc: 'تمت تهيئتها لملائمة احتياجات المشروعات المصرية الباحثة عن السمعة الطيبة، وعوائد فورية، ومصداقية تامة.'
    },
    process: {
      sectionTitle: 'كيف تبدأ كعضو معنا؟',
      sectionSubtitle: 'آلية ميسرة وموثوقة',
      desc: 'مسار عمل شفاف، ومبسط للغاية، صُمم بدون أي تعقيد تقني من جانبك على الإطلاق.'
    },
    portfolio: {
      sectionTitle: 'هكذا نبني لك',
      sectionSubtitle: 'نماذج تصميم',
      desc: 'أربعة نماذج تصميمية كاملة لأعمال طموحة — كل منها تفاعلي وجاهز للاستخدام. هذا هو المستوى الذي نلتزم به.',
      viewDemo: 'افتح الموقع'
    },
    testimonials: {
      sectionTitle: 'آراء شركاء النجاح',
      sectionSubtitle: 'الصدق يظهر في النتائج',
      desc: 'مستثمرون وأصحاب ورش ومطاعم مصرية حققوا قفزة رقمية حقيقية وتضاعفت أرباحهم بفضل شراكتهم معنا.'
    },
    pricing: {
      sectionTitle: 'باقات مصممة لنجاحك',
      sectionSubtitle: 'أسعار واضحة ومسطحة',
      desc: 'هيكل أسعار مبسط ومدروس للشركات الناشئة والصغيرة في مصر. بدون عقود طويلة ومصاريف خفية.',
      recommended: 'الخيار الذهبي الموصى به'
    },
    about: {
      sectionTitle: 'قصة ARCADIA RISE',
      sectionSubtitle: 'من نحن وما هي رسالتنا',
      desc: 'تأسست ARCADIA RISE بجذور مصرية وهدف واحد: إنقاذ المشاريع والورش والخدمات من الاختفاء الرقمي. نؤمن بأن الحرفيين والشركات وبائعي التجزئة يمتلكون تميزاً فريداً وحرفية تستحق أن تظهر للعالم بأرقى شكل بصري ممكن. نمزج الانضباط والدقة في التصميمات الأوروبية الفخمة بروح الإبداع المحلي لتقديم مواقع لا تقل فخامة عن الماركات العالمية، مع تبسيط التجربة بالكامل لأصحاب الأعمال ليركزوا على زيادة المبيعات.'
    },
    ctaBanner: {
      headline: 'كل منافسيك ظهروا للعلن على الإنترنت. ماذا تنتظر؟',
      cta: 'احجز مكانك في طليعة المستقبل الآن'
    },
    contact: {
      sectionTitle: 'ابدأ تواصلك الراقي معنا',
      sectionSubtitle: 'طرق قنوات الاتصال بروح ARCADIA RISE',
      desc: 'يسعد شريكنا وفريقنا التحدث بالهاتف أو اللقاء لمراجعة أفكارك وبلورتها.',
      infoTitle: 'المقر والفرع الاجتماعي',
      formTitle: 'أرسل لنا رسالة مباشرة',
      formData: {
        name: 'الاسم الكامل / اسم النشاط التجاري',
        phone: 'رقم الهاتف والواتساب',
        service: 'الباقة المحددة للاستشارة',
        message: 'اكتب لمحة سريعة عن مشروعك ومجالك...',
        send: 'أرسل طلب الاستشارة (واتساب مباشر)',
        saving: 'جاري تهيئة قنوات الاتصال...'
      },
      locale: 'مصر · حول العالم'
    },
    footer: {
      rights: '© ٢٠٢٦ ARCADIA RISE. جميع الحقوق محفوظة لرواد وكفاح الأعمال بمصر وشعبها الأبي.',
      disclaimer: 'تصميم وهندسة رقمية مفعمة بالذهب مستوحاة من رقي التراث العربي الأصيل.'
    }
  }
};
