const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');

toggle?.addEventListener('click', () => {
  const open = nav?.classList.toggle('open') ?? false;
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
  });
});

const translations = {
  topline: 'حلول SenseAnywhere للمراقبة في المملكة العربية السعودية',
  topRegion: 'نخدم جميع أنحاء المملكة العربية السعودية',
  navSolution: 'الحل',
  navIndustries: 'القطاعات',
  navProducts: 'المنتجات',
  navPlatform: 'المنصة',
  navQuality: 'الجودة',
  navContact: 'تواصل مع خبير',
  heroEyebrow: 'حلول SENSEANYWHERE · المملكة العربية السعودية',
  heroTitle: 'كل درجة حرارة.<br><em>تحت السيطرة.</em>',
  heroText: 'تقدّم Electrolines Arabia تقنيات SenseAnywhere للمراقبة اللاسلكية للمؤسسات في السعودية، مع إرشاد محلي لاختيار المنتجات ودعم الحلول.',
  heroPrimary: 'اكتشف الحل',
  heroSecondary: 'شاهد منظومة المنتجات',
  proofBattery: 'سنوات<br>عمر البطارية',
  proofMeasurements: 'مراقبة مستمرة<br>على مدار الساعة',
  proofCustomers: 'دعم محلي<br>في السعودية',
  liveMonitoring: 'مراقبة مباشرة',
  allSystems: 'جميع الأنظمة طبيعية',
  coldRoom: 'غرفة التبريد 04',
  stable: 'مستقرة',
  now: 'الآن',
  auditReady: 'جاهز للتدقيق',
  auditText: 'سجل البيانات الكامل مؤمّن',
  connected: 'متصل · 100%',
  certified: 'شهادات واعتمادات',
  solutionKicker: 'نظام مراقبة كامل',
  solutionTitle: 'من المستشعر إلى القرار.<br><em>من دون تعقيد.</em>',
  solutionText: 'ثبّت النظام خلال دقائق، راقب باستمرار واستجب فوراً. يربط SenseAnywhere كل نقطة حساسة ضمن نظام آمن ومتوافق.',
  measureTitle: 'قياس دقيق',
  measureText: 'قياس الحرارة والرطوبة والإشارات التناظرية عبر مستشعرات لاسلكية عالية الدقة.',
  connectTitle: 'اتصال تلقائي',
  connectText: 'تتعرف نقاط الاتصال إلى الأجهزة فوراً من دون اقتران أو كابلات أو برامج محلية.',
  analyzeTitle: 'تحليل فوري',
  analyzeText: 'شاهد الرسوم الحية وسجلات التدقيق والتقارير المجدولة من أي جهاز.',
  actTitle: 'استجابة مباشرة',
  actText: 'نبّه المستخدمين عبر البريد أو الرسائل أو الاتصال الصوتي عند تجاوز الحدود.',
  globalDeployments: 'انتشار عالمي',
  countries: 'دولة في جميع القارات',
  industriesKicker: 'مصمم للبيئات الحساسة',
  industriesTitle: 'ثقة كاملة عبر سلسلة التبريد.',
  industriesText: 'منصة مرنة تحمي المنتجات الحساسة أثناء الإنتاج والتخزين والتحقق والنقل.',
  pharma: 'الأدوية',
  food: 'الأغذية',
  mapping: 'رسم الخرائط',
  laboratories: 'المختبرات',
  coldChain: 'سلسلة التبريد',
  healthcare: 'الرعاية الصحية',
  productsKicker: 'منظومة منتجات مرنة',
  productsTitle: 'منصة واحدة.<br><em>لكل الظروف.</em>',
  productsText: 'ادمج أجهزة التسجيل طويلة العمر والمجسات المتخصصة والاتصال الذكي لتناسب بيئة المراقبة لديك.',
  wirelessLogger: 'مسجل بيانات لاسلكي',
  airoText: 'راقب الحرارة من ‎-40°C إلى 70°C والرطوبة والمستشعرات الخارجية مع بطارية تدوم 10 سنوات.',
  discoverProduct: 'اكتشف المنتج',
  extremeTemp: 'درجات الحرارة القصوى',
  probeTitle: 'مجسات Pt100 والمحكمة الإغلاق',
  probeText: 'مراقبة الحرارة الشديدة من ‎-200°C إلى 250°C في البيئات الصعبة.',
  continuousMonitoring: 'مراقبة مستمرة',
  assetText: 'استبدل المستشعرات أثناء المعايرة من دون انقطاع المراقبة أو تراخيص إضافية.',
  seamlessRoaming: 'تجوال سلس',
  connectAnywhere: 'اتصال في أي مكان.',
  accesspointText: 'نقاط اتصال داخلية ومتنقلة وخارجية تُبقي أجهزة التسجيل متصلة من دون اقتران يدوي.',
  findSetup: 'اختر تجهيزك',
  platformKicker: 'منصة SACLIENT السحابية',
  platformTitle: 'بيئتك.<br><em>مرئية لحظة بلحظة.</em>',
  platformText: 'أدر الظروف المباشرة والأجهزة والتنبيهات والتقارير وإثباتات الامتثال من بوابة آمنة واحدة.',
  realTimeTitle: 'رؤية لحظية',
  realTimeText: 'حالة على مدار الساعة وسجل تدقيق كامل',
  reportingTitle: 'تقارير تلقائية',
  reportingText: 'تقارير مجدولة وفورية وتقارير نقل',
  complianceTitle: 'جاهز للامتثال',
  complianceText: 'يدعم GxP وHACCP وFDA 21 CFR Part 11',
  overview: 'نظرة عامة',
  environmentStatus: 'حالة البيئة',
  live: '● مباشر',
  activeSensors: 'المستشعرات النشطة',
  alertsToday: 'تنبيهات اليوم',
  review: 'مراجعة',
  systemHealth: 'صحة النظام',
  optimal: 'ممتاز',
  temperatureTrend: 'اتجاه الحرارة',
  last24: 'آخر 24 ساعة⌄',
  qualityKicker: 'الجودة · الموثوقية · الأمان',
  qualityTitle: 'مصمم للإثبات.<br><em>موثوق في الأداء.</em>',
  qualityText: 'برمجيات معتمدة ومعايرة موثوقة وبنية سحابية أوروبية مرنة لأكثر البيئات التنظيمية تطلباً.',
  qualityCardTitle: 'جودة معتمدة',
  qualityCardText: 'شهادات ISO 9001 وISO 14001 وISO 27001 ومعايرة ISO/IEC 17025.',
  securityCardTitle: 'أمان منذ التصميم',
  securityCardText: 'اتصال ثنائي مشفّر واختبارات اختراق دورية لحماية كل قراءة.',
  cloudCardTitle: 'سحابة مرنة',
  cloudCardText: 'Microsoft Azure ونسخ احتياطية مستمرة ومراكز بيانات أوروبية وتشغيل بنسبة 99.99%.',
  ctaKicker: 'خبرة محلية · تقنية عالمية',
  ctaTitle: 'ابنِ حل المراقبة المناسب<br><em>لعملياتك.</em>',
  ctaText: 'تواصل مع Electrolines Arabia لاختيار حلول SenseAnywhere المناسبة لمنشأتك أو عملياتك أو سلسلة التبريد في السعودية.',
  ctaButton: 'اطلب استشارة',
  contactPending: 'بيانات التواصل الرسمية ستُضاف قريباً · المملكة العربية السعودية',
  footerTagline: 'حلول SenseAnywhere للمراقبة.<br>متوفرة محلياً في السعودية.',
  footerExplore: 'استكشف',
  footerCompany: 'الحلول',
  qualitySecurity: 'الجودة والأمان',
  localSupport: 'الدعم المحلي',
  technologySite: 'تقنية SenseAnywhere',
  footerContact: 'المنطقة',
  regionText: 'المملكة العربية السعودية<br>ستُضاف بيانات التواصل قريباً',
  distributionLine: 'حلول SenseAnywhere في المملكة العربية السعودية',
  backTop: 'العودة للأعلى ↑',
  cookieSettings: 'إعدادات ملفات الارتباط',
  cookieTitle: 'خصوصيتك، خيارك',
  cookieText: 'نستخدم التخزين الضروري في المتصفح لحفظ تفضيلاتك. يمكنك قبول ملفات الارتباط الاختيارية أو رفضها.',
  cookieDeny: 'رفض',
  cookieAccept: 'قبول'
};

const langButton = document.querySelector('.language-switcher');
const translatableElements = document.querySelectorAll(
  '[data-i18n],[data-i18n-html],[data-cookie-i18n]'
);
const englishText = new Map();

translatableElements.forEach((element) => {
  englishText.set(element, element.innerHTML);
});

function setLanguage(language) {
  const arabic = language === 'ar';
  document.documentElement.lang = language;
  document.documentElement.dir = arabic ? 'rtl' : 'ltr';
  document.title = arabic
    ? 'Electrolines Arabia | حلول SenseAnywhere في السعودية'
    : 'Electrolines Arabia | SenseAnywhere Solutions in Saudi Arabia';

  translatableElements.forEach((element) => {
    const key =
      element.dataset.i18n ||
      element.dataset.i18nHtml ||
      element.dataset.cookieI18n;

    element.innerHTML =
      arabic && translations[key] ? translations[key] : englishText.get(element);
  });

  if (langButton) {
    langButton.textContent = arabic ? 'EN' : 'AR';
    langButton.setAttribute(
      'aria-label',
      arabic ? 'Switch language to English' : 'Switch language to Arabic'
    );
  }

  try {
    localStorage.setItem('ea-language', language);
  } catch (error) {
    // Language still works when browser storage is unavailable.
  }
}

langButton?.addEventListener('click', () => {
  setLanguage(document.documentElement.lang === 'ar' ? 'en' : 'ar');
});

let savedLanguage = 'en';
try {
  savedLanguage = localStorage.getItem('ea-language') === 'ar' ? 'ar' : 'en';
} catch (error) {
  savedLanguage = 'en';
}
setLanguage(savedLanguage);

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
} else {
  document.querySelectorAll('.reveal').forEach((element) => {
    element.classList.add('visible');
  });
}

// Clicking the upper logo returns immediately to the top.
document.querySelector('.site-header .brand')?.addEventListener('click', (event) => {
  event.preventDefault();
  const root = document.documentElement;
  const previousBehavior = root.style.scrollBehavior;
  root.style.scrollBehavior = 'auto';
  window.scrollTo(0, 0);
  window.setTimeout(() => {
    root.style.scrollBehavior = previousBehavior;
  }, 0);
});

// Cookie popup.
const cookiePopup = document.getElementById('cookie-banner');
const cookieSettingsButton = document.querySelector('.cookie-settings-link');
const cookieStorageKey = 'electrolines_cookie_consent_v4';

function readCookieChoice() {
  try {
    return localStorage.getItem(cookieStorageKey);
  } catch (error) {
    return null;
  }
}

function saveCookieChoice(choice) {
  try {
    localStorage.setItem(cookieStorageKey, choice);
  } catch (error) {
    // Keep working for the current page when storage is blocked.
  }

  document.documentElement.dataset.cookieConsent = choice;
  if (cookiePopup) cookiePopup.hidden = true;
}

if (cookiePopup) {
  const savedChoice = readCookieChoice();
  cookiePopup.hidden = savedChoice === 'accepted' || savedChoice === 'denied';

  cookiePopup
    .querySelector('[data-cookie-action="accept"]')
    ?.addEventListener('click', () => saveCookieChoice('accepted'));

  cookiePopup
    .querySelector('[data-cookie-action="deny"]')
    ?.addEventListener('click', () => saveCookieChoice('denied'));
}

cookieSettingsButton?.addEventListener('click', () => {
  if (cookiePopup) {
    cookiePopup.hidden = false;
    cookiePopup
      .querySelector('[data-cookie-action="deny"]')
      ?.focus();
  }
});
