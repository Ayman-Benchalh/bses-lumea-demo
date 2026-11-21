import { JournalArticle } from "@/types";

export const INITIAL_ARTICLES: JournalArticle[] = [
  {
    id: "art-01",
    slug: "construire-une-routine-de-soin-minimaliste-et-efficace",
    title: {
      fr: "L'Art de la Simplicité : Construire une Routine Skincare Essentielle",
      en: "The Art of Simplicity: Building an Essential Skincare Ritual",
      ar: "فن البساطة: بناء روتين عناية بالبشرة أساسي وفعال",
    },
    excerpt: {
      fr: "Découvrez pourquoi multiplier les couches d'actifs n'est pas toujours la clé. Comment trois étapes fondamentales suffisent pour préserver la barrière cutanée et raviver l'éclat.",
      en: "Discover why layering dozens of active ingredients is rarely the answer. How three fundamental steps maintain barrier integrity and awaken natural radiance.",
      ar: "اكتشفي لماذا لا يعد تكديس المكونات والطبقات حلاً دائماً. كيف تكفي ثلاث خطوات أساسية لحماية حاجز البشرة وإنعاش إشراقتها.",
    },
    content: {
      fr: `Dans un monde saturé d'injonctions cosmétiques et de rituels en dix étapes, revenir à l'essentiel relève d'une véritable philosophie de vie. La peau est un écosystème vivant, capable de s'autoréguler lorsqu'elle n'est pas agressée par une surcharge de substances incompatibles.

### 1. Le Nettoyage Respectueux
La première étape consiste à éliminer les impuretés accumulées au fil de la journée sans perturber le film hydrolipidique. Privilégiez les huiles et baumes fondants le soir, et une simple eau florale ou gelée douce au réveil.

### 2. L'Hydratation & Les Lipides Barrières
Toute peau a besoin d'eau (humectants comme l'acide hyaluronique ou la glycérine) et d'acides gras (comme le squalane végétal ou l'huile d'argan pure) pour sceller cette hydratation. Une crème ou émulsion adaptée remplit ce rôle avec distinction.

### 3. La Protection Solaire Quotidienne
Aucun actif anti-âge ne remplace un écran solaire minéral à large spectre. Même par temps couvert, les UVA accélèrent le vieillissement prématuré. Appliquer quotidiennement son soin protecteur est le geste de beauté le plus sage qui soit.`,
      en: `In a world inundated with 10-step skincare routines, returning to the essentials is a conscious lifestyle choice. Skin is a thriving living ecosystem capable of healthy self-regulation when shielded from sensory and chemical overload.

### 1. Gentle, Mindful Cleansing
The cornerstone of radiant skin is clarifying daily impurities without stripping moisture. Choose comforting melting balms at night, followed by pure floral water or light botanical gel at sunrise.

### 2. Moisture and Barrier Lipids
All skin profiles crave water (humectants like hyaluronic acid) and comforting fatty acids (such as botanical squalane or pure argan) to lock hydration in. An intentional cream provides optimal daily nourishment.

### 3. Broad-Spectrum Mineral Defense
No serum replaces daily UV defense. UVA rays penetrate clouds and glass, silently compromising skin elasticity. A clean mineral shield applied every single morning is the wisest beauty decision you can make.`,
      ar: `في عالم يفيض بالصيحات المعقدة وروتينات العناية متعددة المراحل، تعد العودة إلى الأساسيات خياراً واعياً وذكياً. فالبشرة نظام حيوي متكامل قادر على التوازن الذاتي عند تجنيبه الإجهاد المفرط.

### 1. التنظيف اللطيف والمتوازن
الخطوة الأولى تتمثل في تنقية البشرة من شوائب اليوم دون المساس بحاجزها الدهني الواقي. يفضل استخدام البلسم الزيتي المذاب في المساء، والرذاذ الزهري المنعش في الصباح.

### 2. الترطيب ودعم الحاجز الواقي
تحتاج كل بشرة إلى الترطيب المائي (مثل حمض الهيالورونيك) وإلى الدهون الصحية المغذية (مثل السكوالان وزيت الأركان النقي) للحفاظ على النضارة والمرونة.

### 3. الحماية اليومية من الشمس
لا يمكن لأي سيروم أن يحل محل الحماية اليومية من الأشعة فوق البنفسجية. وضع واقي شمس معدني كل صباح هو الخطوة الذهبية التي تحافظ على شباب ونضارة بشرتك.`,
    },
    category: {
      fr: "Rituels de Soin",
      en: "Skincare Rituals",
      ar: "طقوس العناية",
    },
    readTimeMinutes: 5,
    publishedAt: "2026-10-15",
    coverImage: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
    author: "LUMÉA Editorial",
    tags: ["skincare", "routine", "minimalisme", "barriere-cutanee"],
  },

  {
    id: "art-02",
    slug: "comprendre-les-textures-cosmetiques-serum-huile-creme",
    title: {
      fr: "Guide des Textures : Sérum, Émulsion, Crème ou Huile ?",
      en: "Decoding Textures: Serum, Emulsion, Cream, or Oil?",
      ar: "دليل القوام التجميلي: سيروم، مستحلب، كريم، أم زيت؟",
    },
    excerpt: {
      fr: "Comprendre la viscosité, la pénétration et la complémentarité des différentes textures cosmétiques pour composer un rituel personnalisé et harmonieux.",
      en: "Understand viscosity, skin absorption, and layering synergy between cosmetic formulations to curate your personalized beauty ritual.",
      ar: "فهم درجات اللزوجة ومستويات الامتصاص والتكامل بين مختلف تركيبات المستحضرات التجميلية لابتكار روتين متناغم ومخصص.",
    },
    content: {
      fr: `Pourquoi certains soins se superposent-ils avec une grâce infinie tandis que d'autres peluchent ? La réponse réside dans la physique et la chimie des textures cosmétiques.

### Du Plus Fluide au Plus Riche
La règle d'or consiste à appliquer les formules de la plus légère à la plus dense. Les solutions aqueuses (lotions, toniques, sérums) pénètrent facilement en profondeur grâce à leur faible poids moléculaire.

### Émulsions & Crèmes
Les émulsions combinent eau et huile pour rééquilibrer la teneur lipidique. Une texture crème agit comme un manteau protecteur qui empêche l'évaporation de l'eau intracellulaire (perte insensible en eau).

### L'Élixir d'Huile : Toujours en Dernière Étape
Parce que l'huile est hydrophobe, l'appliquer avant un sérum aqueux formerait une barrière infranchissable. Réservée pour la fin du rituel du soir, elle scelle l'ensemble des bienfaits préalablement appliqués.`,
      en: `Why do some formulas glide onto skin like second silk while others pill? The answer lies in the physics of cosmetic formulation and molecular viscosity.

### Lightest to Richest
The universal cosmetic law is to apply textures from thinnest to thickest. Aqueous solutions (tonics, essences, light serums) absorb rapidly into the upper layers of the epidermis.

### Emulsions & Creams
Emulsions blend water and beneficial lipids to rebalance surface moisture. A velvet cream provides a nurturing shield that minimizes trans-epidermal water loss (TEWL) throughout the day or night.

### Facial Oils: The Golden Final Seal
Because botanic oils are naturally lipophilic and occlusive, applying an oil prior to a water-based serum creates an impenetrable barrier. Applying 2-3 drops of precious oil as your final evening step locks every active safely within.`,
      ar: `لماذا تندمج بعض المستحضرات بسلاسة على البشرة بينما تتكتل أخرى؟ يكمن السر في فيزياء القوام التجميلي وتكامل الجزيئات.

### من الأخف إلى الأكثف
القاعدة الذهبية في العناية هي التدرج من التركيبات المائية الخفيفة إلى الأكثر كثافة وغنى. المحاليل المائية كالسيروم والتونيك تمتص سريعاً في طبقات البشرة.

### المستحلبات والكريمات
تجمع المستحلبات بين الماء والزيوت النباتية لتوازن الرطوبة. ويعمل الكريم المخملي كدرع حامٍ يمنع فقدان الماء الطبيعي من البشرة.

### الزيوت النباتية: الخطوة الختامية الذهبية
نظراً لأن الزيت يشكل طبقة عازلة، فإن وضعه قبل السيروم المائي يمنع امتصاص الأخير. لذا يوضع الزيت دائماً كخطوة أخيرة في المساء لحبس الرطوبة والمغذيات داخل البشرة.`,
    },
    category: {
      fr: "Science & Botanique",
      en: "Science & Botanicals",
      ar: "العلوم والنباتات",
    },
    readTimeMinutes: 4,
    publishedAt: "2026-10-22",
    coverImage: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80",
    author: "LUMÉA Editorial",
    tags: ["textures", "skincare", "conseils", "absorption"],
  },

  {
    id: "art-03",
    slug: "a-la-decouverte-des-familles-olfactives",
    title: {
      fr: "Voyage Olfactif : Découvrir les Grandes Familles de la Haute Parfumerie",
      en: "Olfactory Journey: Exploring Haute Parfumerie Families",
      ar: "رحلة عطرية: استكشاف العائلات الكبرى في صناعة العطور الفاخرة",
    },
    excerpt: {
      fr: "Des hespéridés solaires aux ambrés voluptueux, plongez au cœur de l'architecture invisible qui donne vie aux sillages les plus envoûtants.",
      en: "From radiant citrus groves to intoxicating ambers, immerse yourself in the invisible architecture behind majestic fragrances.",
      ar: "من نفحات الحمضيات المشمسة إلى العطور العنبرية الفاخرة، اكتشفي أسرار الهرم العطري الذي يصنع أروع الذكريات واللحظات.",
    },
    content: {
      fr: `Le parfum est le plus puissant des déclencheurs de mémoire. Comprendre sa structure permet de choisir un sillage qui résonne intimement avec votre personnalité.

### La Pyramide Olfactive
- **Notes de tête :** La première impression, vive et volatile (agrumes, baies, aromates), qui s'épanouit durant les 15 premières minutes.
- **Notes de cœur :** La véritable âme du parfum (fleurs nobles comme la rose de Damas ou le jasmin), perceptible durant plusieurs heures.
- **Notes de fond :** L'ancrage sensuel et durable (ambre, bois de santal, oud, muscs), qui persiste sur la peau jusqu'au lendemain.

### Les Signatures LUMÉA
Nos créations olfactives puisent leur noblesse dans les matières premières emblématiques du pourtour méditerranéen et du Maroc : le cèdre de l'Atlas, le néroli de Kémis, et le safran d'or.`,
      en: `Fragrance is the most evocative portal to memory and feeling. Understanding its construction empowers you to choose a signature scent that truly expresses your aura.

### The Olfactory Pyramid
- **Top Notes:** The dazzling initial impression (sparkling citrus, pink pepper, green notes) greeting you for the first 15 minutes.
- **Heart Notes:** The beating emotional core (noble florals like Damask rose or night jasmine) radiating for several hours.
- **Base Notes:** The deep, lingering resonance (warm amber, cedarwood, precious oud, musk) embracing your skin until dawn.

### The LUMÉA Scent Heritage
Our fragrances are deeply rooted in Moroccan and Mediterranean botanical excellence: sustainable Atlas cedar, artisanal orange blossom neroli, and sun-dried saffron threads.`,
      ar: `العطر هو أسرع طريق إلى الذاكرة والمشاعر. وفهم تكوينه يساعدك على اختيار البصمة العطرية التي تعبر بصدق عن شخصيتك وأناقتك.

### الهرم العطري
- **قمة العطر (المقدمة):** الانطباع الأول المشرق والمنعش (حمضيات، فلفل وردي، أعشاب نضرة) يدوم خلال الدقائق الخمس عشرة الأولى.
- **قلب العطر:** الروح الحقيقية والجوهر الفواح (زهور نبيلة كالورد الدمشقي والياسمين) ينبض لعدة ساعات.
- **قاعدة العطر:** الثبات العميق والدافئ (عنبر، خشب الصندل، عود، مسك) يستقر على البشرة والملابس ليدوم طويلاً.

### بصمة لوميا العطرية
تستمد عطور لوميا سحرها من أرقى المكونات الطبيعية للمغرب والبحر الأبيض المتوسط: خشب الأرز من جبال الأطلس، نيرولي زهر البرتقال النقي، والزعفران الأصيل.`,
    },
    category: {
      fr: "Haute Parfumerie",
      en: "Haute Parfumerie",
      ar: "العطور الفاخرة",
    },
    readTimeMinutes: 5,
    publishedAt: "2026-10-30",
    coverImage: "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&w=800&q=80",
    author: "LUMÉA Editorial",
    tags: ["parfum", "familles-olfactives", "notes-de-fond", "ambre"],
  },

  {
    id: "art-04",
    slug: "secrets-argan-or-liquide-marocain",
    title: {
      fr: "L'Argan : De la Coopérative Artisanale au Soin Précieux",
      en: "Argan Elixir: From Heritage Cooperatives to Precious Care",
      ar: "زيت الأركان: من التعاونيات التقليدية إلى العناية الفاخرة",
    },
    excerpt: {
      fr: "Immersion au cœur des arganeraies du Sud-Ouest marocain pour comprendre les vertus exceptionnelles de cet or végétal riche en acides gras insaturés et vitamine E.",
      en: "An inspiring journey into southwestern Moroccan argan groves to uncover why this liquid gold remains unmatched in botanical skincare.",
      ar: "جولة في قلب غابات الأركان بالجنوب المغربي للتعرف على الخصائص الاستثنائية لهذا الذهب السائل الغني بالأحماض الدهنية وفيتامين هـ.",
    },
    content: {
      fr: `Classé au patrimoine immatériel de l'humanité par l'UNESCO, l'arganier est un arbre millénaire symbole de résilience face au climat aride. Son huile, extraite selon des méthodes séculaires respectueuses de l'arbre, constitue l'un des trésors cosmétiques les plus prisés au monde.

### Une Richesse Moléculaire Inégalée
L'huile d'argan vierge pressée à froid regorge d'acide oléique (oméga-9) et d'acide linoléique (oméga-6), indispensables au maintien de la cohésion cellulaire. Sa haute concentration naturelle en tocophérols (vitamine E) lui confère une stabilité antioxydante exceptionnelle.

### L'Engagement Éthique
Chez LUMÉA, notre huile provient exclusivement de coopératives féminines équitables assurant une rémunération juste, l'indépendance économique des artisanes et la reforestation durable des zones arganières.`,
      en: `Recognized by UNESCO as intangible cultural heritage, the argan tree is an ancient symbol of botanical resilience in arid landscapes. Its oil, hand-harvested through ancestral craftsmanship, is celebrated globally as pure liquid gold.

### Exceptional Molecular Vitality
Cold-pressed virgin argan oil is packed with nourishing oleic (omega-9) and linoleic (omega-6) fatty acids, essential for resilient cell membranes. Its rich natural concentration of vitamin E provides potent antioxidant defense against oxidative stress.

### Ethical Stewardship
At LUMÉA, our argan oil is sourced directly from certified women's fair-trade cooperatives, fostering financial independence, fair wages, and regenerative replanting programs in rural Morocco.`,
      ar: `تعتبر شجرة الأركان، المصنفة ضمن التراث الثقافي غير المادي لليونسكو، رمزاً تاريخياً للصمود في مواجهة المناخ الجاف. ويعد زيتها المستخلص بطرق تقليدية ومستدامة من أثمن كنوز التجميل الطبيعية في العالم.

### تركيبة غنية ومغذية
يتميز زيت الأركان البكر المعصور على البارد باحتوائه على نسب عالية من حمض الأولييك (أوميغا 9) وحمض اللينوليك (أوميغا 6)، الضروريين لمرونة وحيوية خلايا البشرة، بالإضافة إلى تركيز غني من فيتامين هـ المضاد للأكسدة.

### الالتزام الأخلاقي والمستدام
في لوميا، نستورد زيت الأركان مباشرة من تعاونيات نسائية مغربية تعتمد التجارة العادلة، لضمان استقلاليتهن الاقتصادية ودعم برامج إعادة تشجير الأركان والحفاظ على البيئة.`,
    },
    category: {
      fr: "Patrimoine & Terroir",
      en: "Heritage & Terroir",
      ar: "التراث والأصالة",
    },
    readTimeMinutes: 6,
    publishedAt: "2026-11-05",
    coverImage: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
    author: "LUMÉA Editorial",
    tags: ["argan", "patrimoine-marocain", "antioxydant", "ethique"],
  },

  {
    id: "art-05",
    slug: "choisir-le-fini-de-son-maquillage-du-teint-mat-ou-lumineux",
    title: {
      fr: "Teint Velours ou Teint Glowy : Comment Choisir son Fini Idéal ?",
      en: "Matte Velvet or Fresh Glow: How to Choose Your Finish?",
      ar: "مخملي غير لامع أم مشرق نضر: كيف تختارين مظهر المكياج المثالي؟",
    },
    excerpt: {
      fr: "Analyse des finis de teint selon votre type de peau, l'éclairage de votre journée et l'effet recherché, pour un résultat sophistiqué sans surcharge.",
      en: "How to tailor your makeup finish to your skin type, daily lighting, and lifestyle for a luminous, sophisticated look that never feels heavy.",
      ar: "تحليل مظاهر المكياج وفقاً لنوع بشرتك والإضاءة اليومية والتأثير المطلوب، للحصول على إطلالة راقية وطبيعية بدون أي مظهر ثقيل.",
    },
    content: {
      fr: `Le choix du maquillage du teint a considérablement évolué. Finie l'époque des masques couvrants opaques : le maquillage moderne sublime la peau réelle en jouant avec la lumière.

### Le Fini Éclat Naturel (Glowy)
Idéal pour les peaux sèches, normales ou fatiguées. Il réfléchit la lumière grâce à des huiles végétales légères et du squalane. Pour éviter les brillances indésirables, appliquez la poudre uniquement sur le front et les ailes du nez.

### Le Fini Satiné Flouté
Le compromis parfait pour les peaux mixtes. Il absorbe l'excès de sébum sur la zone médiane tout en conservant une fraîcheur lumineuse sur les pommettes.`,
      en: `The philosophy of foundation and complexion makeup has evolved dramatically. The era of cakey masks is gone: modern beauty elevates authentic skin texture through light reflection.

### The Natural Glow Finish
Ideal for normal, dry, or tired skin tones. It captures soft ambient light with airy botanical oils and squalane. To prevent excessive shine in warm weather, dust sheer mineral powder solely across the T-zone.

### The Satin Soft-Focus Finish
The golden balance for combination skin. It diffuses light, minimizes the look of enlarged pores, and keeps midday shine at bay while allowing cheeks to glow naturally.`,
      ar: `تطورت فلسفة مكياج البشرة بشكل جذري. لقد ولى زمن الطبقات السميكة المعتمة، فالمكياج العصري يبرز جمال البشرة الطبيعي من خلال التلاعب بالضوء والظلال.

### المظهر المشرق النضر (Glowy)
مثالي للبشرة العادية أو الجافة أو المجهدة، حيث يعكس الضوء بفضل الزيوت النباتية الخفيفة والسكوالان. ولتفادي اللمعان الزائد، توضع لمسة خفيفة من البودرة الشفافة على الجبين وجوانب الأنف فقط.

### المظهر الساتاني المموه
التوازن الأمثل للبشرة المختلطة، حيث يخفف من وضوح المسام ويتحكم في الزيوت مع الحفاظ على حيوية ونضارة الخدين طوال اليوم.`,
    },
    category: {
      fr: "Maquillage Moderne",
      en: "Modern Makeup",
      ar: "المكياج العصري",
    },
    readTimeMinutes: 4,
    publishedAt: "2026-11-12",
    coverImage: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
    author: "LUMÉA Editorial",
    tags: ["maquillage", "teint", "glow", "fini-satine"],
  },

  {
    id: "art-06",
    slug: "dechiffrer-les-etiquettes-cosmetiques-avec-clarte",
    title: {
      fr: "Décrypter une Étiquette INCI : Le Guide Pratique et Rassurant",
      en: "Demystifying the INCI Label: A Practical and Reassuring Guide",
      ar: "قراءة الملصق التجميلي INCI: دليل عملي وموثوق",
    },
    excerpt: {
      fr: "Apprenez à lire la liste des ingrédients cosmétiques sans crainte ni jargon excessif, pour choisir vos soins en toute confiance et transparence.",
      en: "Learn to read ingredient lists with clarity and confidence, discovering how safe formulation and authentic botanicals truly work together.",
      ar: "تعلمي قراءة قائمة المكونات التجميلية بكل ثقة ووضوح، واكتشفي كيف تتكامل التركيبات الآمنة مع المستخلصات النباتية الأصيلة.",
    },
    content: {
      fr: `La liste INCI (International Nomenclature of Cosmetic Ingredients) peut parfois sembler rédigée dans une langue mystérieuse mêlant latin et chimie. Pourtant, quelques clés simples permettent de la lire avec discernement.

### L'Ordre Décroissant
Les ingrédients sont classés par ordre d'importance quantitative jusqu'au seuil de 1%. Les cinq premiers composants constituent généralement plus de 80% de la formule.

### Noms Latins vs Noms Chimiques
- Les extraits de plantes apparaissent sous leur dénomination botanique latine (ex: *Argania Spinosa Kernel Oil* pour l'huile d'argan, *Rosa Damascena* pour la rose de Damas).
- Les molécules actives pures ou agents stabilisants apparaissent sous leur dénomination courante (ex: *Niacinamide*, *Tocopherol*, *Glycerin*).

### L'Engagement LUMÉA
Nous privilégions des formules courtes, transparentes et biodégradables, sans dérivés pétrochimiques, sans silicones lourds et formulées pour le bien-être quotidien de votre épiderme.`,
      en: `The INCI (International Nomenclature of Cosmetic Ingredients) list can often look like an ancient dialect of Latin and molecular terminology. A few clear principles demystify it instantly.

### Descending Order of Concentration
Ingredients are listed in order of concentration down to the 1% threshold. The first five ingredients typically constitute over 80% of the entire formulation bottle.

### Latin Botanicals vs Pure Molecules
- Natural plant extracts are listed by their formal Latin botanical binomial (e.g. *Argania Spinosa Kernel Oil* for argan, *Rosa Damascena* for Damask rose).
- Pure isolated active vitamins or stabilizers use standard scientific names (e.g. *Niacinamide*, *Tocopherol*, *Glycerin*).

### The LUMÉA Pledge
We champion mindful, transparent, and biodegradable formulations—free from harsh petrochemical fillers or heavy silicones, crafted with pure intention for your skin.`,
      ar: `قد تبدو قائمة المكونات الدولية للمستحضرات (INCI) كرموز معقدة تجمع بين اللاتينية والمصطلحات العلمية. لكن بعض القواعد البسيطة تمنحك فهماً واضحاً وشفافاً لما تضعينه على بشرتك.

### الترتيب التنازلي للتركيز
تُرتّب المكونات دائماً حسب نسبتها التنازلية حتى تركيز 1%. وتمثل أول خمسة مكونات عادة أكثر من 80% من قوام العبوة بالكامل.

### الأسماء اللاتينية للنباتات
- تُكتب أسماء المستخلصات والزيوت الطبيعية بأسمائها النباتية اللاتينية (مثل: *Argania Spinosa* لزيت الأركان، و*Rosa Damascena* لورد دمشق).
- تظهر الفيتامينات والمركبات الفعالة بأسمائها العلمية المعروفة (مثل: *Niacinamide*، *Tocopherol*، *Glycerin*).

### ميثاق الشفافية لدى لوميا
نلتزم بتركيبات نقية ومختصرة وقابلة للتحلل الحيوي، خالية من المشتقات البترولية القاسية أو السيليكون الثقيل، ومصممة بأعلى معايير الأمان والعناية.`,
    },
    category: {
      fr: "Transparence & Conseil",
      en: "Transparency & Advice",
      ar: "الشفافية والنصائح",
    },
    readTimeMinutes: 5,
    publishedAt: "2026-11-18",
    coverImage: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
    author: "LUMÉA Editorial",
    tags: ["inci", "ingredients", "transparence", "securite"],
  },
];
