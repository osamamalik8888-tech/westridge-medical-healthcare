import type { KnowledgeArticle } from "./types";

/**
 * The flagship article. Written from real research (Mayo Clinic on
 * corticosteroid pharmacology and side effects; peer-reviewed Pakistani
 * case series on steroid-misuse harm, including pediatric Cushing's
 * syndrome from unqualified treatment and mucormycosis linked to
 * unsupervised steroid use during COVID-19) — see the references list
 * at the bottom of this file for exactly what was drawn from where.
 *
 * reviewStatus is "pending-review" — this has not actually been read by
 * Dr. Ahmed. Change this field (and add reviewerName/reviewerRole) once
 * it has been; nothing else about the article needs to change to add
 * that byline honestly.
 */
export const featuredArticle: KnowledgeArticle = {
  slug: "dexamethasone-steroid-injection-risks",
  featured: true,
  category: { en: "Medication Safety", ur: "ادویات کی حفاظت" },
  title: {
    en: "The Hidden Dangers of Unnecessary Dexamethasone (Dexa) Injections and Tablets: What Every Patient Should Know",
    ur: "غیر ضروری ڈیکسامیتھاسون (ڈیکسا) انجیکشنز اور گولیوں کے پوشیدہ خطرات: ہر مریض کو کیا معلوم ہونا چاہیے",
  },
  metaDescription: {
    en: "Dexamethasone is a genuinely life-saving medicine when used correctly — and a genuinely dangerous one when used for ordinary viral fever, flu, or body aches. Here's the real difference.",
    ur: "ڈیکسامیتھاسون صحیح طریقے سے استعمال ہونے پر واقعی جان بچانے والی دوا ہے — اور عام وائرل بخار، فلو یا جسمانی درد کے لیے استعمال ہونے پر واقعی خطرناک۔ اصل فرق یہ ہے۔",
  },
  excerpt: {
    en: "Why a quick steroid injection for a viral fever can feel like it's working — and why that quick relief can come at a real cost.",
    ur: "وائرل بخار کے لیے فوری سٹیرائیڈ انجیکشن کیوں کام کرتا محسوس ہوتا ہے — اور یہ فوری آرام حقیقی قیمت پر کیوں آ سکتا ہے۔",
  },
  readingMinutes: 9,
  reviewStatus: "pending-review",
  status: "complete",
  sections: {
    intro: [
      {
        en: "Dexamethasone is a synthetic corticosteroid — a lab-made version of the anti-inflammatory hormones your adrenal glands produce naturally. It is genuinely one of the most useful medicines in modern medicine: it treats severe allergic reactions, certain autoimmune diseases, some cancers, brain swelling, croup in children, and — when a patient is hospitalized and needs supplemental oxygen — severe COVID-19. The WHO ACTION-I trial, run partly in Pakistan, showed dexamethasone-family steroids can meaningfully improve survival for babies at risk of very premature birth.",
        ur: "ڈیکسامیتھاسون ایک مصنوعی کورٹیکوسٹیرائیڈ ہے — آپ کے ایڈرینل غدود قدرتی طور پر پیدا کرنے والے سوزش کم کرنے والے ہارمونز کی لیبارٹری میں بنائی گئی شکل۔ یہ جدید طب کی واقعی مفید ترین ادویات میں سے ایک ہے: یہ شدید الرجک ری ایکشنز، بعض آٹو امیون بیماریوں، کچھ کینسرز، دماغی ورم، بچوں میں کروپ، اور — جب مریض ہسپتال میں داخل ہو اور اسے اضافی آکسیجن کی ضرورت ہو — شدید کووڈ-19 کا علاج کرتی ہے۔",
      },
      {
        en: "That real, documented value is exactly why its misuse is worth taking seriously. In many parts of Pakistan, a dexamethasone injection (often known by a brand name rather than its generic name) has become an informal go-to for viral fever, flu, sore throat, and general body aches — illnesses that, in the overwhelming majority of cases, resolve on their own with rest, fluids, and time. This article explains why that shortcut can feel like it works, and what it can actually cost.",
        ur: "یہی حقیقی، دستاویزی فائدہ اس بات کی وجہ ہے کہ اس کے غلط استعمال کو سنجیدگی سے لینا ضروری ہے۔ پاکستان کے کئی حصوں میں، ڈیکسامیتھاسون کا انجیکشن (اکثر جینرک نام کی بجائے برانڈ نام سے جانا جاتا ہے) وائرل بخار، فلو، گلے کی خراش اور عمومی جسمانی درد کے لیے ایک غیر رسمی حل بن چکا ہے — ایسی بیماریاں جو، بیشتر صورتوں میں، آرام، سیالات اور وقت کے ساتھ خود ہی ٹھیک ہو جاتی ہیں۔",
      },
    ],
    treatment: [
      {
        en: "Dexamethasone has real, evidence-based uses. These include: severe allergic reactions and anaphylaxis, certain autoimmune and inflammatory conditions, some blood cancers and brain tumors (to reduce swelling around the tumor), croup in young children, and hospitalized COVID-19 patients who need supplemental oxygen (a WHO-recommended use, not a home-treatment one). In every one of these cases, a qualified physician is weighing a specific, diagnosed condition against the medicine's real risks — not treating a symptom in isolation.",
        ur: "ڈیکسامیتھاسون کے حقیقی، شواہد پر مبنی استعمال ہیں۔ ان میں شامل ہیں: شدید الرجک ری ایکشنز اور اینافلیکسس، بعض آٹو امیون اور سوزشی حالات، کچھ خون کے کینسرز اور دماغی رسولیاں (رسولی کے ارد گرد ورم کم کرنے کے لیے)، چھوٹے بچوں میں کروپ، اور ہسپتال میں داخل کووڈ-19 کے مریض جنہیں اضافی آکسیجن کی ضرورت ہو (یہ ڈبلیو ایچ او کی تجویز کردہ ہسپتال میں استعمال ہے، گھر پر علاج نہیں)۔ ان تمام صورتوں میں، ایک قابل معالج کسی مخصوص، تشخیص شدہ حالت کا دوا کے حقیقی خطرات کے ساتھ موازنہ کر رہا ہوتا ہے۔",
      },
    ],
    causes: [
      {
        en: "Here's the part that makes misuse so convincing: dexamethasone works fast, and it works on almost anything involving inflammation — which includes the fever, body aches, and general misery of an ordinary viral illness. A patient who feels dramatically better within hours of an injection isn't imagining it. The steroid is genuinely suppressing the inflammatory response that's making them feel sick.",
        ur: "یہی وہ حصہ ہے جو غلط استعمال کو اتنا قائل کرنے والا بناتا ہے: ڈیکسامیتھاسون تیزی سے کام کرتا ہے، اور یہ سوزش سے متعلق تقریباً ہر چیز پر کام کرتا ہے — جس میں عام وائرل بیماری کا بخار، جسمانی درد اور عمومی تکلیف شامل ہے۔ جو مریض انجیکشن کے چند گھنٹوں میں نمایاں بہتر محسوس کرتا ہے وہ خیالی نہیں ہے۔ سٹیرائیڈ واقعی اس سوزشی ردعمل کو دبا رہا ہوتا ہے جو انہیں بیمار محسوس کروا رہا تھا۔",
      },
      {
        en: "The problem is what that relief doesn't mean. Feeling better is not the same as the underlying viral infection being gone — the virus is often still present and still running its course. Worse, dexamethasone actively suppresses the immune response that's supposed to be fighting that virus, which is exactly backwards from what a sick body needs. Peer-reviewed case reports from Pakistan have documented this going seriously wrong: patients using unsupervised steroids for mild early COVID-19 symptoms who went on to develop mucormycosis, a rare but life-threatening fungal infection, particularly in patients with underlying diabetes.",
        ur: "مسئلہ یہ ہے کہ یہ آرام کیا معنی نہیں رکھتا۔ بہتر محسوس کرنا اصل وائرل انفیکشن کے ختم ہونے کے برابر نہیں ہے — وائرس اکثر اب بھی موجود ہوتا ہے اور اپنا دورانیہ مکمل کر رہا ہوتا ہے۔ مزید یہ کہ، ڈیکسامیتھاسون اس مدافعتی ردعمل کو فعال طور پر دباتا ہے جسے اس وائرس سے لڑنا چاہیے تھا، جو ایک بیمار جسم کی ضرورت کے بالکل برعکس ہے۔",
      },
    ],
    symptoms: [
      {
        en: "The most common misuse pattern in Pakistan looks like this: a patient with a viral fever, flu, sore throat, or body aches — all self-limiting illnesses that resolve with rest and time — receives a steroid injection, often from an unqualified provider, and feels rapid relief. That relief reinforces the belief that the injection was necessary, and the pattern repeats with the next illness.",
        ur: "پاکستان میں غلط استعمال کا سب سے عام پیٹرن یہ ہے: وائرل بخار، فلو، گلے کی خراش، یا جسمانی درد کا مریض — یہ تمام ایسی بیماریاں ہیں جو آرام اور وقت کے ساتھ خود ٹھیک ہو جاتی ہیں — سٹیرائیڈ انجیکشن لگواتا ہے، اکثر غیر قابل فراہم کنندہ سے، اور فوری آرام محسوس کرتا ہے۔",
      },
      {
        en: "Research on Pakistan's healthcare system has documented a related pattern at scale: unsafe and unnecessary injection practices are unusually common, and unregulated \"quack\" providers — operating without medical qualifications — are a well-documented source of steroid misuse, particularly in rural areas with limited access to qualified physicians.",
        ur: "پاکستان کے صحت کے نظام پر تحقیق نے اس سے متعلق ایک وسیع پیمانے کا پیٹرن دستاویز کیا ہے: غیر محفوظ اور غیر ضروری انجیکشن کے طریقے غیر معمولی طور پر عام ہیں، اور غیر منظم فراہم کنندگان اسٹیرائیڈ کے غلط استعمال کا ایک اچھی طرح دستاویزی ذریعہ ہیں، خاص طور پر ان دیہی علاقوں میں جہاں قابل معالجین تک رسائی محدود ہے۔",
      },
    ],
    warningSigns: [
      {
        en: "Documented adverse effects of unnecessary or repeated steroid use include: a weakened immune response and increased susceptibility to infection; elevated blood sugar (a real danger for anyone with, or at risk of, diabetes); increased blood pressure and fluid retention; gastric irritation and, with repeated use, ulcers; mood changes ranging from irritability to genuine depressive symptoms with longer use; sleep disturbance; weight gain, especially around the face, neck, and abdomen; osteoporosis and weakened bones with repeated exposure; muscle weakness; adrenal suppression (the adrenal glands scaling back their own hormone production, which can be dangerous if steroids are then stopped suddenly); thin, fragile skin and delayed wound healing; and, with prolonged use, cataracts and glaucoma.",
        ur: "غیر ضروری یا بار بار سٹیرائیڈ استعمال کے دستاویزی مضر اثرات میں شامل ہیں: کمزور مدافعتی ردعمل اور انفیکشن کا بڑھتا ہوا خطرہ؛ بلند بلڈ شوگر؛ بلند بلڈ پریشر اور جسم میں پانی کا رکنا؛ معدے کی جلن اور، بار بار استعمال سے، السر؛ مزاج میں تبدیلیاں چڑچڑاپن سے لے کر حقیقی افسردگی کی علامات تک؛ نیند میں خلل؛ خاص طور پر چہرے، گردن اور پیٹ کے ارد گرد وزن میں اضافہ؛ ہڈیوں کی کمزوری اور آسٹیوپوروسس بار بار نمائش سے؛ پٹھوں کی کمزوری؛ ایڈرینل دباؤ؛ پتلی، نازک جلد اور زخم بھرنے میں تاخیر؛ اور طویل استعمال سے موتیابند اور گلوکوما۔",
      },
      {
        en: "These aren't theoretical. Pakistani case reports have documented children developing Cushing's syndrome — including significant weight gain, a rounded \"moon face,\" and stunted growth — after being treated with steroids by unqualified providers for ordinary childhood illnesses like viral cough. Adult cases of iatrogenic (medically-caused) Cushing syndrome from unsupervised steroid use have been documented too, sometimes only diagnosed after multiple organ systems were already affected.",
        ur: "یہ نظریاتی نہیں ہیں۔ پاکستانی کیس رپورٹس نے بچوں میں کشنگ سنڈروم کی نشوونما کو دستاویز کیا ہے — جس میں نمایاں وزن میں اضافہ، گول \"چاند جیسا چہرہ\"، اور نشوونما میں رکاوٹ شامل ہے — عام بچپن کی بیماریوں جیسے وائرل کھانسی کے لیے غیر قابل فراہم کنندگان کے ذریعے سٹیرائیڈ سے علاج کے بعد۔",
      },
    ],
    whenToSeeDoctor: [
      {
        en: "If you've been receiving frequent steroid injections — for recurring fevers, body aches, or \"weakness\" — and have noticed unusual weight gain (especially around the face or abdomen), new or worsening high blood pressure, unexplained mood changes, slow-healing cuts, or unusual bruising, mention this history to a qualified physician directly and specifically. These can be signs the body has been affected by repeated steroid exposure, and they're worth a real evaluation, not another injection.",
        ur: "اگر آپ کو بار بار بخار، جسمانی درد، یا \"کمزوری\" کے لیے متواتر سٹیرائیڈ انجیکشن مل رہے ہیں، اور آپ نے غیر معمولی وزن میں اضافہ (خاص طور پر چہرے یا پیٹ کے ارد گرد)، نیا یا بگڑتا ہوا بلند بلڈ پریشر، غیر واضح مزاج کی تبدیلیاں، دیر سے بھرنے والے زخم، یا غیر معمولی نیل محسوس کیے ہیں، تو یہ تاریخ کسی قابل معالج کو براہ راست اور خاص طور پر بتائیں۔",
      },
      {
        en: "If you've been on any steroid for more than a few days and want to stop, don't stop abruptly — talk to a physician first. Suddenly discontinuing steroids after the adrenal glands have scaled back their own hormone production can itself cause a real medical problem (adrenal insufficiency), with symptoms including severe fatigue, nausea, and fever. This is precisely why steroids prescribed for a real medical reason are usually tapered down gradually, under supervision, rather than stopped all at once.",
        ur: "اگر آپ کسی بھی سٹیرائیڈ پر چند دنوں سے زیادہ عرصے سے ہیں اور رکنا چاہتے ہیں، تو اچانک نہ روکیں — پہلے معالج سے بات کریں۔",
      },
    ],
    prevention: [
      {
        en: "Before agreeing to any injection for a common illness, it's reasonable to ask: what exactly is in this injection, and why is it needed for this specific illness? A qualified physician should be able to answer both questions clearly. If an injection is offered for an ordinary fever, flu, or body ache without a clear explanation of what it contains or why it's necessary, that's worth pausing on.",
        ur: "کسی بھی عام بیماری کے لیے انجیکشن پر رضامند ہونے سے پہلے، یہ پوچھنا مناسب ہے: اس انجیکشن میں بالکل کیا ہے، اور اس مخصوص بیماری کے لیے اس کی ضرورت کیوں ہے؟ ایک قابل معالج کو دونوں سوالوں کا واضح جواب دینے کے قابل ہونا چاہیے۔",
      },
      {
        en: "Seeking care from a qualified, registered physician — rather than an unregulated provider — is the single most protective step. Pakistan's own public health research has repeatedly identified unregulated \"quack\" practices as a major driver of steroid and injection misuse specifically because they operate outside routine medical judgment and follow-up. This isn't about distrust of medicine in general; it's about the specific, documented risk of treatment from providers without the training to weigh a medicine's real risks against its benefits.",
        ur: "ایک قابل، رجسٹرڈ معالج سے دیکھ بھال حاصل کرنا — غیر منظم فراہم کنندہ کی بجائے — سب سے زیادہ حفاظتی قدم ہے۔",
      },
    ],
    lifestyle: [
      {
        en: "For the ordinary viral illnesses steroids are often mistakenly used for — flu, common cold, mild viral fever, sore throat — the genuinely effective approach is unglamorous but well-supported: rest, fluids, and time. Paracetamol can help with fever and discomfort. Most of these illnesses resolve within a week to ten days without any injection at all.",
        ur: "عام وائرل بیماریوں کے لیے جن کے لیے سٹیرائیڈ اکثر غلطی سے استعمال ہوتے ہیں — فلو، عام زکام، ہلکا وائرل بخار، گلے کی خراش — واقعی موثر طریقہ سادہ لیکن اچھی طرح معاون ہے: آرام، سیالات، اور وقت۔",
      },
    ],
    mythVsFact: [
      {
        myth: { en: "\"I felt better right away, so the injection must have been the right treatment.\"", ur: "\"مجھے فوراً بہتر محسوس ہوا، تو انجیکشن صحیح علاج ہونا چاہیے۔\"" },
        fact: { en: "Fast relief from a steroid injection reflects how powerfully it suppresses inflammation and immune activity — not whether the underlying illness needed treating that way. Most viral illnesses would have resolved on their own regardless.", ur: "سٹیرائیڈ انجیکشن سے فوری آرام یہ ظاہر کرتا ہے کہ یہ سوزش اور مدافعتی سرگرمی کو کتنی طاقت سے دباتا ہے — یہ نہیں کہ بنیادی بیماری کو اس طرح علاج کی ضرورت تھی۔" },
      },
      {
        myth: { en: "\"It's just one injection — a single dose can't cause real harm.\"", ur: "\"یہ صرف ایک انجیکشن ہے — ایک خوراک حقیقی نقصان نہیں پہنچا سکتی۔\"" },
        fact: { en: "A single, medically appropriate dose is usually low-risk. The real danger documented in Pakistani case reports comes from repeated use over time — the same shortcut reached for every fever or ache, injection after injection, often without any record being kept of how many, or when.", ur: "ایک، طبی طور پر مناسب خوراک عام طور پر کم خطرہ رکھتی ہے۔ اصل خطرہ بار بار استعمال سے آتا ہے — ہر بخار یا درد کے لیے وہی شارٹ کٹ، انجیکشن پر انجیکشن۔" },
      },
      {
        myth: { en: "\"Steroids are dangerous medicine that should never be used.\"", ur: "\"سٹیرائیڈز خطرناک دوا ہیں جو کبھی استعمال نہیں ہونی چاہیے۔\"" },
        fact: { en: "This is also not accurate. Dexamethasone and related steroids are genuinely life-saving for severe allergic reactions, certain autoimmune diseases, some cancers, and hospitalized severe COVID-19, among other real indications. The problem isn't the medicine — it's using it for illnesses it was never meant to treat.", ur: "یہ بھی درست نہیں ہے۔ ڈیکسامیتھاسون اور متعلقہ سٹیرائیڈز شدید الرجک ری ایکشنز، بعض آٹو امیون بیماریوں، کچھ کینسرز، اور ہسپتال میں داخل شدید کووڈ-19 کے لیے واقعی جان بچانے والے ہیں۔ مسئلہ دوا نہیں ہے — اسے ایسی بیماریوں کے لیے استعمال کرنا ہے جن کے لیے یہ کبھی نہیں بنائی گئی۔" },
      },
    ],
  },
  faqs: [
    {
      question: { en: "Is dexamethasone the same as a painkiller?", ur: "کیا ڈیکسامیتھاسون درد کش دوا جیسی ہے؟" },
      answer: { en: "No. It's a corticosteroid that reduces inflammation and suppresses immune activity — it doesn't work the same way as paracetamol or ibuprofen, and it carries a very different risk profile.", ur: "نہیں۔ یہ ایک کورٹیکوسٹیرائیڈ ہے جو سوزش کم کرتا ہے اور مدافعتی سرگرمی کو دباتا ہے — یہ پیراسیٹامول یا آئبوپروفین کی طرح کام نہیں کرتا، اور اس کا خطرہ پروفائل بہت مختلف ہے۔" },
    },
    {
      question: { en: "Why do some providers give steroid injections for ordinary fever?", ur: "کچھ فراہم کنندگان عام بخار کے لیے سٹیرائیڈ انجیکشن کیوں دیتے ہیں؟" },
      answer: { en: "Because it produces fast, visible relief, which patients associate with effective treatment — even though the relief comes from suppressing symptoms, not treating the actual illness. This is a documented pattern in Pakistani healthcare research, especially among unregulated providers.", ur: "کیونکہ یہ تیز، نظر آنے والا آرام پیدا کرتا ہے، جسے مریض مؤثر علاج سمجھتے ہیں — حالانکہ آرام علامات کو دبانے سے آتا ہے، اصل بیماری کے علاج سے نہیں۔" },
    },
    {
      question: { en: "Can children safely receive dexamethasone?", ur: "کیا بچے محفوظ طریقے سے ڈیکسامیتھاسون لے سکتے ہیں؟" },
      answer: { en: "For genuine medical indications (like croup), yes, under a qualified physician's care. But children are also documented as particularly vulnerable to the harms of steroid misuse — Pakistani case reports have specifically described children developing Cushing's syndrome after unsupervised steroid treatment for ordinary illnesses.", ur: "حقیقی طبی اشارے کے لیے (جیسے کروپ)، ہاں، ایک قابل معالج کی نگرانی میں۔ لیکن بچے سٹیرائیڈ کے غلط استعمال کے نقصانات کے لیے خاص طور پر کمزور بھی دستاویز کیے گئے ہیں۔" },
    },
    {
      question: { en: "What should I ask before agreeing to any injection?", ur: "کسی بھی انجیکشن پر رضامند ہونے سے پہلے مجھے کیا پوچھنا چاہیے؟" },
      answer: { en: "What is in it, specifically, and why is it the right treatment for your specific diagnosis — not just your symptoms. A qualified physician will be able to answer clearly.", ur: "اس میں خاص طور پر کیا ہے، اور یہ آپ کی مخصوص تشخیص کے لیے صحیح علاج کیوں ہے — صرف آپ کی علامات کے لیے نہیں۔" },
    },
  ],
  references: [
    { label: "Mayo Clinic — Corticosteroid (Oral Route, Parenteral Route) Side Effects", url: "https://www.mayoclinic.org/drugs-supplements/corticosteroid-oral-route-parenteral-route/side-effects/drg-20070491" },
    { label: "Mayo Clinic — Prednisone and Other Corticosteroids", url: "https://www.mayoclinic.org/tests-procedures/cortisone-shots/in-depth/steroids/art-20045692" },
    { label: "PMC — Cushing's Syndrome in Children: An Unchecked Consequence of Steroid Use by Quacks in Rural Areas of Pakistan", url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10357129/" },
    { label: "PMC — Unnecessary Use of Corticosteroids for Managing Early Mild COVID-19 Symptoms May Lead to Rhino-Orbital-Cerebral Mucormycosis in Patients with Diabetes (Lahore, Pakistan case series)", url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9083038/" },
    { label: "PMC — A Rare Case Report of Iatrogenic Cushing Syndrome with Multisystem Involvement Due to Prolonged Steroid Injections", url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12768222/" },
    { label: "PMC — Pakistan's Unsafe Medical Injections and the Enduring Public Health Crisis", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12728702/" },
    { label: "The Lancet — Over-the-Counter Medicines in Pakistan: Misuse and Overuse", url: "https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(19)32999-X/fulltext" },
    { label: "EClinicalMedicine — WHO ACTION-I Trial: Effect of Dexamethasone on Newborn Survival", url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9716334/" },
  ],
  relatedSlugs: ["viral-fever", "seasonal-influenza-flu-prevention"],
};
