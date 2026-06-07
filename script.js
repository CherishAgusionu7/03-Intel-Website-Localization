const exploreButton = document.getElementById('exploreTimeline');
const journeySection = document.getElementById('journey');

if (exploreButton && journeySection) {
  exploreButton.addEventListener('click', (event) => {
    event.preventDefault();
    journeySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    exploreButton.blur();
  });
}

const hero = document.querySelector('.hero');
if (hero) {
  hero.addEventListener('mousemove', (event) => {
    const x = (event.clientX / window.innerWidth - 0.5) * 24;
    const y = (event.clientY / window.innerHeight - 0.5) * 24;
    hero.style.setProperty('--hero-move-x', `${x}px`);
    hero.style.setProperty('--hero-move-y', `${y}px`);
  });
}

const revealItems = document.querySelectorAll('.reveal-on-scroll');
const counterCards = document.querySelectorAll('.counter-number');
let countersAnimated = false;

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.25,
});

revealItems.forEach((item) => revealObserver.observe(item));

const counterObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && !countersAnimated) {
      counterCards.forEach((counter) => {
        const target = parseInt(counter.dataset.target, 10);
        const duration = 1600;
        const startTime = performance.now();

        const update = (time) => {
          const elapsed = time - startTime;
          const progress = Math.min(elapsed / duration, 1);
          counter.textContent = Math.round(progress * target);
          if (progress < 1) {
            requestAnimationFrame(update);
          }
        };

        requestAnimationFrame(update);
      });

      countersAnimated = true;
      observer.disconnect();
    }
  });
}, {
  threshold: 0.4,
});

const dashboard = document.getElementById('dashboard');
if (dashboard) {
  counterObserver.observe(dashboard);
}

const languageToggle = document.getElementById('languageToggle');
const translatableElements = document.querySelectorAll('[data-i18n]');
const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
const altElements = document.querySelectorAll('[data-i18n-alt]');

const availableLanguages = [
  { code: 'en', label: 'English' },
  { code: 'ar', label: 'العربية' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' }
];

const translationData = {
  en: {
    navImpact: 'Impact',
    navVision: 'Vision',
    languageButton: 'English',
    eyebrow: 'Innovation meets responsibility',
    heroHeading: 'Building a Sustainable Digital Future',
    heroDescription: 'Intel is transforming the future through climate action, renewable energy, water stewardship, and responsible innovation',
    exploreJourney: 'Enter the Journey',
    scrollHint: 'Scroll to explore',
    storyLabel: 'Sustainability story',
    storyHeading: 'From ambition to action, each milestone is a chapter in Intel’s climate journey',
    panel1Tag: '2030 · Net Zero Carbon',
    panel1Heading: 'Net-zero emissions powered by smarter operations',
    panel1Description: 'Intel commits to net-zero Scope 1 and 2 emissions by optimizing energy, manufacturing, and renewable sourcing across every facility.',
    panel1Detail1: 'Smart factory systems with predictive efficiency',
    panel1Detail2: 'Renewable electricity expanded across global operations',
    panel1Detail3: 'Clean energy atmosphere with lower carbon intensity',
    altPanel1: 'Net Zero Carbon',
    panel2Tag: '2030 · Water Impact',
    panel2Heading: 'Restoring water with digital precision',
    panel2Description: 'Intel restores more freshwater than it consumes in water-stressed regions through advanced recycling, conservation, and water-smart manufacturing.',
    panel2Detail1: 'Closed-loop water systems for fabs',
    panel2Detail2: 'Smart metrics for regional restoration',
    panel2Detail3: 'Digital circuits guiding water flow',
    altPanel2: 'Water Impact',
    panel3Tag: '2030 · Zero Waste',
    panel3Heading: 'Closing loops with a circular economy mindset',
    panel3Description: 'Intel reduces landfill waste by designing systems, materials, and logistics that keep products and materials in circulation.',
    panel3Detail1: 'Recycling loops enabled by smart tracking',
    panel3Detail2: 'Waste-to-resource innovation across fabs',
    panel3Detail3: 'Materials recovery embedded into operations',
    altPanel3: 'Zero Waste innovation',
    panel4Tag: '2030 · Renewable Electricity',
    panel4Heading: 'Fueling innovation with 100% renewable power',
    panel4Description: 'Intel accelerates renewable energy use through large-scale sourcing, grid partnerships, and clean energy investments across its global sites.',
    panel4Detail1: 'Solar and wind networks powering operations',
    panel4Detail2: 'Energy grid intelligence to optimize delivery',
    panel4Detail3: 'Cleaner power with a glowing, low-carbon future',
    altPanel4: 'Renewable electricity',
    panel5Tag: '2040 · Supply Chain Decarbonization',
    panel5Heading: 'Building a low-carbon network of sustainable partners',
    panel5Description: 'Intel drives emissions reduction across its supply chain through digital collaboration, low-carbon materials, and shared climate action.',
    panel5Detail1: 'Connected supplier network with carbon signals',
    panel5Detail2: 'Global logistics designed for sustainability',
    panel5Detail3: 'Decarbonization as a collaborative platform',
    altPanel5: 'Supply Chain Decarbonization',
    highlightsLabel: 'Highlights',
    highlightsHeading: 'Key focus areas driving sustainable impact',
    card1Title: 'Energy Innovation',
    card1Text: 'Scaling renewable energy and grid partnerships to power operations with low-carbon electricity',
    card2Title: 'Water Stewardship',
    card2Text: 'Restoring and conserving freshwater through closed-loop systems and smart recycling',
    card3Title: 'Circular Materials',
    card3Text: 'Designing products and logistics to keep materials in use and out of landfills',
    cardButton: 'Learn more',
    dashboardLabel: 'Impact dashboard',
    dashboardHeading: 'Measurable progress in every dimension of sustainability',
    counter1Description: 'Renewable energy usage',
    counter2Description: 'Net-zero goal year',
    counter3Description: 'Million gallons of water restored',
    counter4Description: 'Waste diversion across operations',
    futureLabel: 'Future vision',
    futureHeading: 'The next generation of technology must be sustainable by design',
    futureDescription: 'Intel is building the infrastructure, partnerships, and ethical innovation that power tomorrow’s responsible digital ecosystem',
    subscribeTitle: 'Subscribe to Intel’s Sustainability Newsletter',
    subscribeText: 'Get updates on climate action, renewable energy, and responsible innovation',
    subscribeNameLabel: 'Name',
    subscribeEmailLabel: 'Email address',
    subscribeName: 'Your name',
    subscribeEmail: 'Email address',
    consentText: 'I agree to receive Intel sustainability updates',
    subscribeButton: 'Subscribe',
    validationEmail: 'Please enter a valid email address',
    validationConsent: 'You must agree before submitting'
  },
  ar: {
    navImpact: 'التأثير',
    navVision: 'الرؤية',
    languageButton: 'العربية',
    eyebrow: 'الابتكار يلتقي بالمسؤولية',
    heroHeading: 'بناء مستقبل رقمي مستدام',
    heroDescription: 'تسهم إنتل في تشكيل المستقبل من خلال العمل المناخي والطاقة المتجددة وإدارة المياه والابتكار المسؤول',
    exploreJourney: 'ابدأ الرحلة',
    scrollHint: 'مرّر للاستكشاف',
    storyLabel: 'قصة الاستدامة',
    storyHeading: 'من الطموح إلى العمل، كل مرحلة فصل في رحلة إنتل المناخية',
    panel1Tag: '٢٠٣٠ · صافي انبعاثات صفر',
    panel1Heading: 'انبعاثات صافية صفرية مدعومة بعمليات أكثر ذكاءً',
    panel1Description: 'تتعهد إنتل بتحقيق صافي انبعاثات صفرية في النطاقين 1 و2 من خلال تحسين الطاقة والتصنيع وتوريد الطاقة المتجددة عبر كل منشأة.',
    panel1Detail1: 'أنظمة مصانع ذكية بكفاءة تنبؤية',
    panel1Detail2: 'توسيع الكهرباء المتجددة عبر العمليات العالمية',
    panel1Detail3: 'بيئة طاقة نظيفة بكثافة كربون أقل',
    altPanel1: 'صافي انبعاثات صفر',
    panel2Tag: '٢٠٣٠ · أثر المياه',
    panel2Heading: 'استعادة المياه بدقة رقمية',
    panel2Description: 'تستعيد إنتل مياهًا عذبة أكثر مما تستهلك في المناطق المهددة بنقص المياه من خلال إعادة التدوير المتطورة والحفظ والتصنيع الذكي للمياه.',
    panel2Detail1: 'أنظمة مياه مغلقة للرقائق',
    panel2Detail2: 'مؤشرات ذكية لاستعادة المناطق',
    panel2Detail3: 'دارات رقمية توجه تدفق المياه',
    altPanel2: 'أثر المياه',
    panel3Tag: '٢٠٣٠ · صفر نفايات',
    panel3Heading: 'إغلاق الحلقات بعقلية الاقتصاد الدائري',
    panel3Description: 'تقلل إنتل من نفايات المطامر بتصميم أنظمة ومواد ولوجستيات تبقي المنتجات والمواد في دائرة الاستخدام.',
    panel3Detail1: 'دوارات إعادة التدوير المدعومة بالتتبع الذكي',
    panel3Detail2: 'ابتكار تحويل النفايات إلى موارد عبر المصانع',
    panel3Detail3: 'استعادة المواد مدمجة في العمليات',
    altPanel3: 'ابتكار صفر نفايات',
    panel4Tag: '٢٠٣٠ · الكهرباء المتجددة',
    panel4Heading: 'تغذية الابتكار بطاقة متجددة ١٠٠٪',
    panel4Description: 'تسرع إنتل استخدام الطاقة المتجددة من خلال التوريد على نطاق واسع والشراكات الشبكية والاستثمارات في الطاقة النظيفة عبر مواقعها العالمية.',
    panel4Detail1: 'شبكات شمسية وريحية تغذي العمليات',
    panel4Detail2: 'ذكاء شبكة الطاقة لتحسين التوزيع',
    panel4Detail3: 'طاقة أنظف مع مستقبل منخفض الكربون متوهج',
    altPanel4: 'كهرباء متجددة',
    panel5Tag: '٢٠٤٠ · إزالة الكربون من سلسلة التوريد',
    panel5Heading: 'بناء شبكة منخفضة الكربون من الشركاء المستدامين',
    panel5Description: 'تقود إنتل خفض الانبعاثات عبر سلسلة التوريد من خلال التعاون الرقمي والمواد منخفضة الكربون والعمل المناخي المشترك.',
    panel5Detail1: 'شبكة الموردين المترابطة بإشارات الكربون',
    panel5Detail2: 'لوجستيات عالمية مصممة للاستدامة',
    panel5Detail3: 'إزالة الكربون كمنصة تعاونية',
    altPanel5: 'إزالة الكربون في سلسلة التوريد',
    highlightsLabel: 'أهم النقاط',
    highlightsHeading: 'المجالات الرئيسية التي تقود الأثر المستدام',
    card1Title: 'ابتكار الطاقة',
    card1Text: 'توسيع استخدام الطاقة المتجددة وشراكات الشبكة لتشغيل العمليات بكهرباء منخفضة الكربون',
    card2Title: 'إدارة المياه',
    card2Text: 'استعادة وحفظ المياه العذبة عبر أنظمة مغلقة وإعادة تدوير ذكية',
    card3Title: 'المواد الدائرية',
    card3Text: 'تصميم المنتجات واللوجستيات للحفاظ على المواد في الاستخدام وبعيدًا عن المطامر',
    cardButton: 'تعرف أكثر',
    dashboardLabel: 'لوحة التأثير',
    dashboardHeading: 'تقدم يمكن قياسه في كل جانب من جوانب الاستدامة',
    counter1Description: 'استخدام الطاقة المتجددة',
    counter2Description: 'سنة هدف صافي الصفر',
    counter3Description: 'ملايين الجالونات من المياه المستعادة',
    counter4Description: 'تحويل النفايات عبر العمليات',
    futureLabel: 'رؤية المستقبل',
    futureHeading: 'يجب أن يكون الجيل القادم من التكنولوجيا مستدامًا بالفطرة',
    futureDescription: 'تقوم إنتل ببناء البنية التحتية والشراكات والابتكار الأخلاقي التي تدعم نظامًا رقميًا مسؤولًا في المستقبل',
    subscribeTitle: 'اشترك في نشرة إنتل للاستدامة',
    subscribeText: 'احصل على تحديثات حول العمل المناخي والطاقة المتجددة والابتكار المسؤول',
    subscribeNameLabel: 'الاسم',
    subscribeEmailLabel: 'عنوان البريد الإلكتروني',
    subscribeName: 'اسمك',
    subscribeEmail: 'عنوان البريد الإلكتروني',
    consentText: 'أوافق على تلقي تحديثات استدامة إنتل',
    subscribeButton: 'اشترك',
    validationEmail: 'يرجى إدخال عنوان بريد إلكتروني صالح',
    validationConsent: 'يجب أن توافق قبل الإرسال'
  },
  es: {
    navImpact: 'Impacto',
    navVision: 'Visión',
    languageButton: 'Español',
    eyebrow: 'Innovación se encuentra con responsabilidad',
    heroHeading: 'Construyendo un futuro digital sostenible',
    heroDescription: 'Intel está transformando el futuro a través de la acción climática, energía renovable, gestión del agua e innovación responsable',
    exploreJourney: 'Entrar al viaje',
    scrollHint: 'Desplázate para explorar',
    storyLabel: 'Historia de sostenibilidad',
    storyHeading: 'De la ambición a la acción, cada hito es un capítulo en el viaje climático de Intel',
    panel1Tag: '2030 · Carbono neto cero',
    panel1Heading: 'Emisiones netas cero impulsadas por operaciones más inteligentes',
    panel1Description: 'Intel se compromete a emisiones netas cero de Alcance 1 y 2 optimizando energía, manufactura y abastecimiento renovable en cada instalación.',
    panel1Detail1: 'Sistemas de fábricas inteligentes con eficiencia predictiva',
    panel1Detail2: 'Electricidad renovable ampliada en todas las operaciones globales',
    panel1Detail3: 'Atmósfera de energía limpia con menor intensidad de carbono',
    altPanel1: 'Carbono neto cero',
    panel2Tag: '2030 · Impacto del agua',
    panel2Heading: 'Restaurando el agua con precisión digital',
    panel2Description: 'Intel restaura más agua dulce de la que consume en regiones con estrés hídrico mediante reciclaje avanzado, conservación y manufactura inteligente con agua.',
    panel2Detail1: 'Sistemas de agua de circuito cerrado para plantas',
    panel2Detail2: 'Métricas inteligentes para restauración regional',
    panel2Detail3: 'Circuitos digitales guiando el flujo de agua',
    altPanel2: 'Impacto del agua',
    panel3Tag: '2030 · Cero residuos',
    panel3Heading: 'Cerrando ciclos con una mentalidad de economía circular',
    panel3Description: 'Intel reduce los residuos en vertederos diseñando sistemas, materiales y logística que mantienen productos y materiales en circulación.',
    panel3Detail1: 'Bucles de reciclaje habilitados por seguimiento inteligente',
    panel3Detail2: 'Innovación de residuos a recursos en todas las fábricas',
    panel3Detail3: 'Recuperación de materiales integrada en las operaciones',
    altPanel3: 'Innovación cero residuos',
    panel4Tag: '2030 · Electricidad renovable',
    panel4Heading: 'Alimentando la innovación con energía 100% renovable',
    panel4Description: 'Intel acelera el uso de energía renovable mediante abastecimiento a gran escala, asociaciones de redes e inversiones en energía limpia en sus sitios globales.',
    panel4Detail1: 'Redes solares y eólicas que alimentan las operaciones',
    panel4Detail2: 'Inteligencia de red energética para optimizar la entrega',
    panel4Detail3: 'Energía más limpia con un futuro radiante y bajo en carbono',
    altPanel4: 'Electricidad renovable',
    panel5Tag: '2040 · Descarbonización de la cadena de suministro',
    panel5Heading: 'Construyendo una red de socios sostenibles de bajo carbono',
    panel5Description: 'Intel impulsa la reducción de emisiones a lo largo de su cadena de suministro mediante colaboración digital, materiales de bajo carbono y acción climática compartida.',
    panel5Detail1: 'Red de proveedores conectada con señales de carbono',
    panel5Detail2: 'Logística global diseñada para la sostenibilidad',
    panel5Detail3: 'Descarbonización como plataforma colaborativa',
    altPanel5: 'Descarbonización de la cadena de suministro',
    highlightsLabel: 'Destacados',
    highlightsHeading: 'Áreas clave de enfoque que impulsan un impacto sostenible',
    card1Title: 'Innovación energética',
    card1Text: 'Escalando energías renovables y asociaciones de red para alimentar operaciones con electricidad baja en carbono',
    card2Title: 'Gestión del agua',
    card2Text: 'Restaurando y conservando agua dulce mediante sistemas de circuito cerrado y reciclaje inteligente',
    card3Title: 'Materiales circulares',
    card3Text: 'Diseñando productos y logística para mantener los materiales en uso y fuera de vertederos',
    cardButton: 'Aprende más',
    dashboardLabel: 'Panel de impacto',
    dashboardHeading: 'Progreso medible en cada dimensión de la sostenibilidad',
    counter1Description: 'Uso de energía renovable',
    counter2Description: 'Año objetivo de cero neto',
    counter3Description: 'Millones de galones de agua restaurada',
    counter4Description: 'Desvío de residuos en las operaciones',
    futureLabel: 'Visión futura',
    futureHeading: 'La próxima generación de tecnología debe ser sostenible por diseño',
    futureDescription: 'Intel acelera la infraestructura, las asociaciones y la innovación ética que impulsan el ecosistema digital responsable del mañana',
    subscribeTitle: 'Suscríbete al boletín de sostenibilidad de Intel',
    subscribeText: 'Recibe actualizaciones sobre acción climática, energía renovable e innovación responsable',
    subscribeNameLabel: 'Nombre',
    subscribeEmailLabel: 'Dirección de correo electrónico',
    subscribeName: 'Tu nombre',
    subscribeEmail: 'Dirección de correo electrónico',
    consentText: 'Acepto recibir actualizaciones de sostenibilidad de Intel',
    subscribeButton: 'Suscribirse',
    validationEmail: 'Por favor ingresa una dirección de correo electrónico válida',
    validationConsent: 'Debes aceptar antes de enviar'
  },
  fr: {
    navImpact: 'Impact',
    navVision: 'Vision',
    languageButton: 'Français',
    eyebrow: 'L\'innovation rencontre la responsabilité',
    heroHeading: 'Construire un avenir numérique durable',
    heroDescription: 'Intel transforme l\'avenir grâce à l\'action climatique, l\'énergie renouvelable, la gestion de l\'eau et l\'innovation responsable',
    exploreJourney: 'Entrer dans le parcours',
    scrollHint: 'Faites défiler pour explorer',
    storyLabel: 'Histoire de durabilité',
    storyHeading: 'De l\'ambition à l\'action, chaque étape est un chapitre du parcours climatique d\'Intel',
    panel1Tag: '2030 · Zéro émission nette',
    panel1Heading: 'Des émissions nettes zéro alimentées par des opérations plus intelligentes',
    panel1Description: 'Intel s\'engage à des émissions nettes zéro des scopes 1 et 2 en optimisant l\'énergie, la fabrication et l\'approvisionnement renouvelable dans chaque site.',
    panel1Detail1: 'Systèmes d\'usine intelligents avec efficacité prédictive',
    panel1Detail2: 'Électricité renouvelable étendue à travers les opérations mondiales',
    panel1Detail3: 'Atmosphère d\'énergie propre avec une intensité carbone plus faible',
    altPanel1: 'Zéro émission nette',
    panel2Tag: '2030 · Impact sur l\'eau',
    panel2Heading: 'Restaurer l\'eau avec une précision numérique',
    panel2Description: 'Intel restaure plus d\'eau douce qu\'elle n\'en consomme dans les régions stressées par l\'eau grâce au recyclage avancé, à la conservation et à la fabrication intelligente en eau.',
    panel2Detail1: 'Systèmes d\'eau en boucle fermée pour les usines',
    panel2Detail2: 'Indicateurs intelligents pour la restauration régionale',
    panel2Detail3: 'Circuits numériques guidant le flux d\'eau',
    altPanel2: 'Impact sur l\'eau',
    panel3Tag: '2030 · Zéro déchet',
    panel3Heading: 'Boucler les cycles avec un état d\'esprit d\'économie circulaire',
    panel3Description: 'Intel réduit les déchets mis en décharge en concevant des systèmes, des matériaux et une logistique qui maintiennent les produits et matériaux en circulation.',
    panel3Detail1: 'Boucles de recyclage activées par un suivi intelligent',
    panel3Detail2: 'Innovation de déchets en ressources dans toutes les usines',
    panel3Detail3: 'Récupération des matériaux intégrée aux opérations',
    altPanel3: 'Innovation zéro déchet',
    panel4Tag: '2030 · Électricité renouvelable',
    panel4Heading: 'Alimenter l\'innovation avec une énergie 100 % renouvelable',
    panel4Description: 'Intel accélère l\'utilisation de l\'énergie renouvelable grâce à des approvisionnements à grande échelle, des partenariats de réseau et des investissements dans l\'énergie propre sur ses sites mondiaux.',
    panel4Detail1: 'Réseaux solaire et éolien alimentant les opérations',
    panel4Detail2: 'Intelligence du réseau énergétique pour optimiser la distribution',
    panel4Detail3: 'Une énergie plus propre avec un avenir bas carbone et lumineux',
    altPanel4: 'Électricité renouvelable',
    panel5Tag: '2040 · Décarbonisation de la chaîne d\'approvisionnement',
    panel5Heading: 'Construire un réseau de partenaires durables à faible carbone',
    panel5Description: 'Intel favorise la réduction des émissions dans sa chaîne d\'approvisionnement grâce à la collaboration numérique, aux matériaux bas carbone et à l\'action climatique partagée.',
    panel5Detail1: 'Réseau de fournisseurs connecté avec des signaux carbone',
    panel5Detail2: 'Logistique mondiale conçue pour la durabilité',
    panel5Detail3: 'La décarbonisation comme plateforme collaborative',
    altPanel5: 'Décarbonisation de la chaîne d\'approvisionnement',
    highlightsLabel: 'Points forts',
    highlightsHeading: 'Domaines clés d\'action qui génèrent un impact durable',
    card1Title: 'Innovation énergétique',
    card1Text: 'Élargir les énergies renouvelables et les partenariats de réseau pour alimenter les opérations avec de l\'électricité à faible carbone',
    card2Title: 'Gestion de l\'eau',
    card2Text: 'Restaurer et conserver l\'eau douce grâce à des systèmes en boucle fermée et au recyclage intelligent',
    card3Title: 'Matériaux circulaires',
    card3Text: 'Concevoir des produits et une logistique pour garder les matériaux en usage et hors des décharges',
    cardButton: 'En savoir plus',
    dashboardLabel: 'Tableau d\'impact',
    dashboardHeading: 'Progrès mesurables dans chaque dimension de la durabilité',
    counter1Description: 'Utilisation d\'énergie renouvelable',
    counter2Description: 'Année cible neutre en carbone',
    counter3Description: 'Millions de gallons d\'eau restaurée',
    counter4Description: 'Détournement des déchets dans les opérations',
    futureLabel: 'Vision future',
    futureHeading: 'La prochaine génération de technologie doit être durable par conception',
    futureDescription: 'Intel construit l\'infrastructure, les partenariats et l\'innovation éthique qui alimentent l\'écosystème numérique responsable de demain',
    subscribeTitle: 'Abonnez-vous à la newsletter durabilité d\'Intel',
    subscribeText: 'Recevez des mises à jour sur l\'action climatique, l\'énergie renouvelable et l\'innovation responsable',
    subscribeNameLabel: 'Nom',
    subscribeEmailLabel: 'Adresse e-mail',
    subscribeName: 'Votre nom',
    subscribeEmail: 'Adresse e-mail',
    consentText: 'J\'accepte de recevoir des mises à jour sur la durabilité d\'Intel',
    subscribeButton: 'S\'abonner',
    validationEmail: 'Veuillez entrer une adresse e-mail valide',
    validationConsent: 'Vous devez accepter avant d\'envoyer'
  }
};

function updateLanguageButton(lang) {
  const language = availableLanguages.find((item) => item.code === lang) || availableLanguages[0];
  if (languageToggle) {
    languageToggle.textContent = language.label;
  }
}

function translatePage(lang) {
  const translations = translationData[lang] || translationData.en;
  translatableElements.forEach((element) => {
    const key = element.dataset.i18n;
    if (key && translations[key] !== undefined) {
      element.textContent = translations[key];
    }
  });

  placeholderElements.forEach((element) => {
    const key = element.dataset.i18nPlaceholder;
    if (key && translations[key] !== undefined) {
      element.placeholder = translations[key];
    }
  });

  altElements.forEach((element) => {
    const key = element.dataset.i18nAlt;
    if (key && translations[key] !== undefined) {
      element.alt = translations[key];
    }
  });
}

function setLanguage(lang) {
  const languageCode = translationData[lang] ? lang : 'en';
  document.documentElement.lang = languageCode;
  document.body.lang = languageCode;
  translatePage(languageCode);
  updateLanguageButton(languageCode);
  localStorage.setItem('pageLanguage', languageCode);
  applyPageDirection();
}

function cycleLanguage() {
  const currentLanguage = document.documentElement.lang || 'en';
  const currentIndex = availableLanguages.findIndex((item) => item.code === currentLanguage);
  const nextIndex = (currentIndex + 1) % availableLanguages.length;
  setLanguage(availableLanguages[nextIndex].code);
}

if (languageToggle) {
  languageToggle.addEventListener('click', cycleLanguage);
}

const savedLanguage = localStorage.getItem('pageLanguage');
setLanguage(savedLanguage || 'en');

const rtlLanguageCodes = new Set([
  'ar', 'he', 'fa', 'ur', 'ps', 'ku', 'sd', 'ug', 'yi', 'dv'
]);

const rtlCharRegex = /[\u0590-\u05FF\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;

function getPrimaryLanguage(langValue) {
  if (!langValue) return '';
  return langValue.split('-')[0].toLowerCase();
}

function isRtlLanguageCode(langValue) {
  const primary = getPrimaryLanguage(langValue);
  return rtlLanguageCodes.has(primary);
}

function inferDirectionFromText(text) {
  if (!text) return 'ltr';
  return rtlCharRegex.test(text) ? 'rtl' : 'ltr';
}

function getVisibleTextSample() {
  const text = (document.body.innerText || document.body.textContent || '').trim();
  return text.replace(/\s+/g, ' ').slice(0, 250);
}

function detectPageDirection() {
  const htmlLang = document.documentElement.lang || document.documentElement.getAttribute('lang');
  const bodyLang = document.body.lang || document.body.getAttribute('lang');
  if (isRtlLanguageCode(htmlLang || bodyLang)) {
    return 'rtl';
  }

  const sample = getVisibleTextSample();
  return inferDirectionFromText(sample);
}

function applyPageDirection() {
  const direction = detectPageDirection();
  const html = document.documentElement;
  const body = document.body;
  if (html.dir !== direction) {
    html.dir = direction;
    body.dir = direction;
    html.classList.toggle('rtl-mode', direction === 'rtl');
  }
}

function watchForLanguageChanges() {
  const observer = new MutationObserver(() => applyPageDirection());
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['lang', 'dir']
  });
  observer.observe(document.body, {
    attributes: true,
    attributeFilter: ['lang', 'dir'],
    childList: true,
    subtree: true
  });

  setInterval(applyPageDirection, 1800);
}

applyPageDirection();
watchForLanguageChanges();
