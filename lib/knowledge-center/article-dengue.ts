import type { KnowledgeArticle } from "./types";

/**
 * Researched from WHO's own Pakistan disease-outbreak-news pages,
 * Pakistan's National Institutes of Health dengue advisory, and
 * peer-reviewed Pakistani case data (Lancet, PMC) — see references.
 */
export const dengueArticle: KnowledgeArticle = {
  slug: "dengue-prevention-warning-signs",
  month: 7,
  category: { en: "Seasonal Illness", ur: "موسمی بیماری" },
  title: {
    en: "Dengue Prevention & Warning Signs",
    ur: "ڈینگی سے بچاؤ اور خطرے کی علامات",
  },
  metaDescription: {
    en: "Dengue is endemic in Pakistan and peaks after monsoon season. Here's what actually prevents it, and the specific warning signs that mean it's time to see a doctor now.",
    ur: "ڈینگی پاکستان میں مقامی طور پر پایا جاتا ہے اور مون سون کے بعد عروج پر ہوتا ہے۔ یہاں وہ چیزیں ہیں جو واقعی اس سے بچاؤ کرتی ہیں۔",
  },
  excerpt: {
    en: "Most dengue is mild and self-limiting. A small number of cases turn serious fast — knowing the difference matters.",
    ur: "زیادہ تر ڈینگی ہلکا اور خود بخود ٹھیک ہونے والا ہوتا ہے۔ تھوڑی تعداد میں کیسز تیزی سے سنگین ہو جاتے ہیں — فرق جاننا ضروری ہے۔",
  },
  readingMinutes: 7,
  reviewStatus: "pending-review",
  status: "complete",
  sections: {
    intro: [
      {
        en: "Dengue is a mosquito-borne viral infection, spread by the Aedes aegypti mosquito, and it's endemic in Pakistan — meaning it circulates every year, with seasonal outbreaks that typically peak from July through November, after monsoon rains leave standing water for mosquitoes to breed in. Rawalpindi and other Punjab cities have been repeatedly affected in recent outbreak seasons.",
        ur: "ڈینگی مچھر سے پھیلنے والا وائرل انفیکشن ہے، جو ایڈیس ایجپٹائی مچھر سے پھیلتا ہے، اور یہ پاکستان میں مقامی طور پر پایا جاتا ہے — یعنی یہ ہر سال گردش کرتا ہے، موسمی وباؤں کے ساتھ جو عام طور پر جولائی سے نومبر تک عروج پر ہوتی ہیں۔",
      },
      {
        en: "There are four distinct dengue virus types (DENV-1 through DENV-4). Having had dengue once gives long-term protection against that specific type only — not the other three. In fact, a second infection with a different type carries a higher risk of becoming severe, which is exactly why prevention matters even for people who've already had dengue before.",
        ur: "ڈینگی وائرس کی چار الگ اقسام ہیں (DENV-1 سے DENV-4)۔ ایک بار ڈینگی ہونے سے صرف اسی مخصوص قسم کے خلاف طویل مدتی تحفظ ملتا ہے — باقی تین کے خلاف نہیں۔",
      },
    ],
    symptoms: [
      {
        en: "Most dengue infections are actually mild — a large share produce no noticeable symptoms at all. When symptoms do appear, typically 4 to 10 days after the mosquito bite, they usually include: sudden high fever, severe headache, pain behind the eyes, joint and muscle pain (dengue's old nickname, \"breakbone fever,\" comes from exactly this), and sometimes a skin rash. Most people recover within about a week with rest and supportive care.",
        ur: "زیادہ تر ڈینگی انفیکشن دراصل ہلکے ہوتے ہیں — ایک بڑا حصہ کوئی قابل توجہ علامات پیدا نہیں کرتا۔ جب علامات ظاہر ہوتی ہیں، عام طور پر مچھر کے کاٹنے کے 4 سے 10 دن بعد، ان میں شامل ہیں: اچانک تیز بخار، شدید سر درد، آنکھوں کے پیچھے درد، جوڑوں اور پٹھوں کا درد، اور کبھی کبھی جلد پر خارش۔",
      },
    ],
    warningSigns: [
      {
        en: "A small proportion of dengue cases progress to severe dengue, and this is where prompt recognition genuinely saves lives. Warning signs to watch for, usually appearing as the initial fever starts to come down, include: severe abdominal pain, persistent vomiting, rapid or difficult breathing, bleeding gums or nose, blood in vomit or stool, and unusual tiredness or restlessness. These are not symptoms to wait out — they mean it's time for medical evaluation, not more rest at home.",
        ur: "ڈینگی کے کیسز کا ایک چھوٹا حصہ شدید ڈینگی میں تبدیل ہو جاتا ہے، اور یہیں فوری پہچان واقعی جانیں بچاتی ہے۔ خطرے کی علامات جن پر نظر رکھنی چاہیے، عام طور پر جب ابتدائی بخار کم ہونا شروع ہوتا ہے: شدید پیٹ کا درد، مسلسل الٹی، تیز یا مشکل سانس لینا، مسوڑھوں یا ناک سے خون آنا، الٹی یا پاخانے میں خون، اور غیر معمولی تھکاوٹ یا بےچینی۔ یہ علامات گھر پر برداشت کرنے کی نہیں — یہ طبی معائنے کا وقت ہیں۔",
      },
    ],
    diagnosis: [
      {
        en: "A doctor will typically evaluate a combination of symptoms, timing, and a blood test — usually a complete blood count to check platelet levels, sometimes alongside a dengue-specific test (NS1 antigen or IgM antibody testing). If fever continues for three days or more, a full blood picture is generally recommended to track how platelet counts are trending, since falling platelets are part of what's monitored in a developing case.",
        ur: "ایک ڈاکٹر عام طور پر علامات، وقت، اور خون کے ٹیسٹ کے مجموعے کا جائزہ لے گا — عام طور پر پلیٹلیٹ کی سطح چیک کرنے کے لیے مکمل بلڈ کاؤنٹ۔",
      },
    ],
    treatment: [
      {
        en: "There is no specific antiviral cure for dengue — treatment is entirely supportive. That means: paracetamol for fever and pain (not more than the recommended dose in 24 hours), plenty of fluids (water, soups, ORS), and rest. Aspirin and ibuprofen (and other NSAIDs) should specifically be avoided, since they can increase bleeding risk in dengue. Most people recover fully at home with this kind of care; severe cases require hospitalization for closer monitoring and, sometimes, IV fluids.",
        ur: "ڈینگی کے لیے کوئی مخصوص اینٹی وائرل علاج نہیں ہے — علاج مکمل طور پر معاون ہوتا ہے۔ اس کا مطلب ہے: بخار اور درد کے لیے پیراسیٹامول، کافی مقدار میں سیالات، اور آرام۔ اسپرین اور آئبوپروفین سے خاص طور پر پرہیز کرنا چاہیے، کیونکہ یہ ڈینگی میں خون بہنے کا خطرہ بڑھا سکتے ہیں۔",
      },
    ],
    prevention: [
      {
        en: "Since there's no widely available vaccine or cure, prevention is genuinely the most powerful tool, and it comes down to mosquito control: empty or cover standing water around the home (buckets, old tires, water tanks, plant trays — anywhere water can collect for more than a few days), use mosquito repellent on exposed skin, wear long sleeves and pants especially during the mosquito's peak biting times (roughly two hours after sunrise and two hours before sunset), and use screens on windows and doors or a mosquito net, especially if someone in the household already has dengue.",
        ur: "چونکہ کوئی وسیع پیمانے پر دستیاب ویکسین یا علاج نہیں ہے، بچاؤ واقعی سب سے طاقتور ذریعہ ہے، اور یہ مچھروں کے کنٹرول پر آتا ہے: گھر کے ارد گرد کھڑے پانی کو خالی یا ڈھانپیں، جلد پر مچھر بھگانے والی دوا استعمال کریں، لمبی آستین اور پتلون پہنیں خاص طور پر مچھر کے کاٹنے کے عروج کے اوقات میں، اور کھڑکیوں اور دروازوں پر جالی یا مچھر دانی استعمال کریں۔",
      },
      {
        en: "This is also a community effort, not just a household one — mosquito breeding sites near a home are a significant risk factor regardless of how careful that one household is, which is why local clean-up drives and supporting municipal fumigation and drainage efforts genuinely matter for everyone's risk, not just the individual participating.",
        ur: "یہ ایک کمیونٹی کی کوشش بھی ہے، صرف ایک گھرانے کی نہیں — گھر کے قریب مچھروں کی افزائش گاہیں ایک اہم خطرے کا عنصر ہیں چاہے وہ ایک گھرانہ کتنا بھی محتاط ہو۔",
      },
    ],
    lifestyle: [
      {
        en: "If you or a family member has dengue, staying somewhere with screened windows or under a mosquito net during the illness genuinely matters — it isn't just for the patient's comfort, it prevents mosquitoes from biting an infected person and then spreading the virus further to others nearby.",
        ur: "اگر آپ یا خاندان کے کسی فرد کو ڈینگی ہے، تو بیماری کے دوران جالی والی کھڑکیوں یا مچھر دانی کے نیچے رہنا واقعی اہم ہے — یہ صرف مریض کے آرام کے لیے نہیں، یہ مچھروں کو متاثرہ شخص کو کاٹنے اور وائرس کو مزید پھیلانے سے روکتا ہے۔",
      },
    ],
    mythVsFact: [
      {
        myth: { en: "\"I already had dengue once, so I'm immune now.\"", ur: "\"مجھے پہلے ہی ایک بار ڈینگی ہو چکا ہے، تو اب میں محفوظ ہوں۔\"" },
        fact: { en: "You're immune to that one specific strain — not the other three. A second infection with a different strain actually carries a higher risk of becoming severe, not a lower one.", ur: "آپ صرف اس مخصوص قسم کے خلاف محفوظ ہیں — باقی تین کے خلاف نہیں۔ ایک مختلف قسم کے ساتھ دوسرا انفیکشن دراصل شدید ہونے کا زیادہ خطرہ رکھتا ہے۔" },
      },
      {
        myth: { en: "\"Dengue only spreads at night, like malaria.\"", ur: "\"ڈینگی صرف رات کو پھیلتا ہے، ملیریا کی طرح۔\"" },
        fact: { en: "The opposite — Aedes mosquitoes are daytime biters, most active around two hours after sunrise and before sunset. This is a genuinely important difference for when to take precautions.", ur: "اس کے برعکس — ایڈیس مچھر دن کو کاٹتے ہیں، طلوع آفتاب کے دو گھنٹے بعد اور غروب سے پہلے سب سے زیادہ فعال ہوتے ہیں۔" },
      },
    ],
  },
  faqs: [
    {
      question: { en: "How soon do dengue symptoms appear after a mosquito bite?", ur: "مچھر کے کاٹنے کے کتنی دیر بعد ڈینگی کی علامات ظاہر ہوتی ہیں؟" },
      answer: { en: "Typically 4 to 10 days.", ur: "عام طور پر 4 سے 10 دن۔" },
    },
    {
      question: { en: "Is there a dengue vaccine available in Pakistan?", ur: "کیا پاکستان میں ڈینگی کی ویکسین دستیاب ہے؟" },
      answer: { en: "Not widely available. Prevention through mosquito control remains the primary protective strategy.", ur: "وسیع پیمانے پر دستیاب نہیں۔ مچھروں کے کنٹرول کے ذریعے بچاؤ بنیادی حفاظتی حکمت عملی ہے۔" },
    },
    {
      question: { en: "Can I take ibuprofen for dengue fever?", ur: "کیا میں ڈینگی بخار کے لیے آئبوپروفین لے سکتا ہوں؟" },
      answer: { en: "No — avoid ibuprofen, aspirin, and other NSAIDs with suspected dengue, as they can increase bleeding risk. Paracetamol is the recommended option for fever and pain.", ur: "نہیں — مشتبہ ڈینگی کے ساتھ آئبوپروفین، اسپرین سے پرہیز کریں۔ پیراسیٹامول بخار اور درد کے لیے تجویز کردہ آپشن ہے۔" },
    },
  ],
  references: [
    { label: "WHO — Dengue, Pakistan (Disease Outbreak News)", url: "https://www.who.int/emergencies/disease-outbreak-news/item/2022-DON414" },
    { label: "WHO — Dengue Fever, Pakistan", url: "https://www.who.int/emergencies/disease-outbreak-news/item/dengue-fever-pakistan" },
    { label: "Pakistan National Institutes of Health — Advisory for the Prevention and Control of Dengue Fever", url: "https://www.nih.org.pk/wp-content/uploads/2023/07/Advisory%20for%20the%20Prevention%20and%20Control%20of%20Dengue%20Fever.pdf" },
    { label: "The Lancet — Dengue Epidemic: Pakistan on Alert", url: "https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(24)02284-0/fulltext" },
    { label: "PMC — Dengue Fever (DF) in Pakistan", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3050821/" },
    { label: "PMC — The Rising Toll of Dengue Cases in Pakistan Every Year: An Incipient Crisis", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9052282/" },
  ],
  relatedSlugs: ["malaria-prevention-symptoms-treatment", "monsoon-waterborne-diseases"],
};
