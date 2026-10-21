/**
 * MAISON ALULA | مقتنيات الدار العطرية
 * Comprehensive bilingual product catalog
 */

const MAISON_CATALOG = [
  {
    id: 'ombre-elephant',
    category: 'parfum',
    category_en: 'Extrait de Parfum',
    category_ar: 'عطور نقية مركزة',
    name_en: "L'Ombre d'Éléphant",
    name_ar: 'ظل صخرة الفيل',
    subtitle_en: 'A tribute to the iconic geological monument under desert twilight',
    subtitle_ar: 'تحية عطرية للمَعلَم الجيولوجي الخالد تحت سكون الغسق الصحراوي',
    price: 920,
    price_100ml: 1380,
    family: 'woody',
    family_en: 'Woody & Resinous',
    family_ar: 'أخشاب وأصماغ نادرة',
    longevity: '24 Hours',
    sillage: 'Radiant & Majestic',
    notes: {
      top_en: 'Calabrian Bergamot, Green Cardamom, Pink Peppercorn',
      top_ar: 'برغموت كالابريا، هيل جبلي أخضر، فلفل وردي',
      heart_en: 'Royal Frankincense, Aged Cedarwood, Desert Papyrus',
      heart_ar: 'لبان الحوجري، خشب الأرز المعتق، ورق البردي الصحراوي',
      base_en: 'Cambodian Agarwood, Red Sea Amber, Smoked Birch',
      base_ar: 'عود كمبودي ملكي، عنبر البحر الأحمر، قطران البتولا المدخن'
    },
    terroir_en: 'Wadi Dawkah frankincense married with sandstone minerals',
    terroir_ar: 'لبان وادي دوكة الممتزج مع معادن الحجر الرملي النبطي',
    svgColor: '#9A5B32',
    svgCap: '#C5A059',
    featured: true
  },
  {
    id: 'petales-taif',
    category: 'parfum',
    category_en: 'Extrait de Parfum',
    category_ar: 'عطور نقية مركزة',
    name_en: 'Pétales de Taïf',
    name_ar: 'بتلات الطائف النادرة',
    subtitle_en: 'Hand-picked 30-petal Damask rose distilled at dawn in misty summits',
    subtitle_ar: 'ورد جوري ثلاثيني قُطف عند الفجر الباكر على قمم جبال الهدا الضبابية',
    price: 860,
    price_100ml: 1290,
    family: 'floral',
    family_en: 'Heirloom Floral',
    family_ar: 'زهوري تراثي فاخر',
    longevity: '18 Hours',
    sillage: 'Intimate & Sensual',
    notes: {
      top_en: 'Dewy Morning Petals, Neroli, Sweet Lychee',
      top_ar: 'قطرات الندى الصباحية، زهر البرتقال النيرولي، ليتشي ناعم',
      heart_en: 'Pure Taif Damask Absolute, Saffron Strands, Rose Water',
      heart_ar: 'خلاصة ورد الطائف النقي، مياسم الزعفران، ماء الورد المقطر',
      base_en: 'White Musk, Cashmeran, Mysore Sandalwood',
      base_ar: 'المسك الأبيض الحريري، الكشميران، خشب الصندل المايسوري'
    },
    terroir_en: 'Al-Hada highlands, 2,000 meters above sea level',
    terroir_ar: 'مرتفعات الهدا، 2000 متر فوق سطح البحر',
    svgColor: '#C47B78',
    svgCap: '#8E6845',
    featured: true
  },
  {
    id: 'dedicace-nabateenne',
    category: 'parfum',
    category_en: 'Extrait de Parfum',
    category_ar: 'عطور نقية مركزة',
    name_en: 'Dédicace Nabatéenne',
    name_ar: 'النذور النبطية',
    subtitle_en: 'Sacred resin ceremonies engraved on the sandstone tombs of Hegra',
    subtitle_ar: 'طقوس البخور والبلاسم المقدسة المحفورة على واجهات الحِجر الصخرية',
    price: 1150,
    price_100ml: 1725,
    family: 'resinous',
    family_en: 'Sacred Resins',
    family_ar: 'أصماغ نبطية مقدسة',
    longevity: '30+ Hours',
    sillage: 'Sublime & Expansive',
    notes: {
      top_en: 'Wild Thyme, Spiced Bitter Orange, Golden Opoponax',
      top_ar: 'زعتر صحراوي بري، نارنج متبل، أوبوبوناكس ذهبي',
      heart_en: 'Hojari Luban Tears, Rock Cistus Labdanum, Cinnamon Bark',
      heart_ar: 'دموع لبان الحوجري، صمغ القستوس الصخري، لحاء القرفة',
      base_en: 'Fossilized Amber, Benzoin of Siam, Raw Castoreum Accord',
      base_ar: 'عنبر متحجر قديم، جاوي سيام، أكورد الكاستوريوم الخام'
    },
    terroir_en: 'Hegra archaeological sanctuaries & the Incense Highway',
    terroir_ar: 'محميات الحِجر الأثرية ومسار قوافل البخور التاريخي',
    svgColor: '#7C4524',
    svgCap: '#C5A059',
    featured: true
  },
  {
    id: 'oasis-dattes',
    category: 'parfum',
    category_en: 'Extrait de Parfum',
    category_ar: 'عطور نقية مركزة',
    name_en: 'Oasis de Dattes',
    name_ar: 'ظلال نخيل الواحة',
    subtitle_en: 'The golden warmth of Barni date nectar filtered through palm canopies',
    subtitle_ar: 'دفء رحيق تمر البرني العسلي المنساب بين ظلال سعف نخيل الواحة',
    price: 890,
    price_100ml: 1335,
    family: 'spiced',
    family_en: 'Gourmand & Spiced',
    family_ar: 'توابل شرقية ورحيق النخيل',
    longevity: '20 Hours',
    sillage: 'Warm & Enveloping',
    notes: {
      top_en: 'Roasted Pistachio, Wild Cardamom, Honeycomb',
      top_ar: 'فستق محمص، هيل بري، شمع العسل الجبلي',
      heart_en: 'AlUla Barni Date Accord, Turkish Coffee, Cacao Pod',
      heart_ar: 'أكورد تمر برني العُلا، بن القهوة العربي، بذور الكاكاو',
      base_en: 'Madagascar Vanilla Pods, Tobacco Leaf, Guaiacwood',
      base_ar: 'قرون فانيليا مدغشقر، أوراق التبغ الفاخر، خشب الغاياك'
    },
    terroir_en: 'Ancient cultivated farms of AlUla Valley',
    terroir_ar: 'بساتين ومزارع وادي العُلا القديمة',
    svgColor: '#8C5638',
    svgCap: '#3F4E3C',
    featured: false
  },
  {
    id: 'encens-dawkah',
    category: 'incense',
    category_en: 'Home Incense & Bakhoor',
    category_ar: 'بخور ومعمول أندلسي',
    name_en: 'Encens Royal de Dawkah',
    name_ar: 'بخور ظفار الملكي',
    subtitle_en: 'First-harvest Frankincense tears rolled in pure aged amber oil',
    subtitle_ar: 'دموع اللبان الحوجري البكر المعجونة بزيت العنبر المعتق',
    price: 480,
    price_100ml: 480,
    family: 'resinous',
    family_en: 'Pure Incense Tears',
    family_ar: 'لبان حوجري بكر',
    longevity: '12 Hours Ambience',
    sillage: 'Atmospheric Purification',
    notes: {
      top_en: 'Citrus Terpenes, Pine Sap, Silver Frankincense',
      top_ar: 'تربينات الحمضيات، نسغ الصنوبر، لبان فضي ناصع',
      heart_en: 'Green Boswellia Sacra, Ground Cloves, Myrrh',
      heart_ar: 'بوزويليا ساكرا الخضراء، مسحوق القرنفل، المُر العتيق',
      base_en: 'Dry Cedar Embers, Raw Ambergris',
      base_ar: 'جمر خشب الأرز الجاف، دهن العنبر الخام'
    },
    terroir_en: 'UNESCO Natural Reserve of Wadi Dawkah',
    terroir_ar: 'محمية وادي دوكة الطبيعية المسجلة لدى اليونسكو',
    svgColor: '#D4AF37',
    svgCap: '#1C1917',
    featured: false
  },
  {
    id: 'santal-fume',
    category: 'incense',
    category_en: 'Home Incense & Bakhoor',
    category_ar: 'بخور ومعمول أندلسي',
    name_en: 'Bois de Santal Fumé',
    name_ar: 'خشب الصندل المعتّق',
    subtitle_en: 'Aged Mysore sandalwood logs soaked in Taif rose hydrolat',
    subtitle_ar: 'رقائق خشب الصندل المايسوري المشبعة بماء الورد الطائفي المركز',
    price: 520,
    price_100ml: 520,
    family: 'woody',
    family_en: 'Smoked Woods',
    family_ar: 'أخشاب نادرة مدخنة',
    longevity: '16 Hours Ambience',
    sillage: 'Meditative & Serene',
    notes: {
      top_en: 'Taif Hydrolat Steam, Bergamot Zest',
      top_ar: 'بخار هيدرولات الورد الطائفي، بشر البرغموت',
      heart_en: 'Heartwood Sandalwood, Nutmeg, Saffron Dust',
      heart_ar: 'لب خشب الصندل العتيق، جوزة الطيب، غبار الزعفران',
      base_en: 'Incense Smoke, Benzoin, Amyris',
      base_ar: 'دخان البخور الهادئ، الجاوي، خشب الأمريس'
    },
    terroir_en: 'Slow-cured in traditional stone jars in AlUla',
    terroir_ar: 'معتق ببطء داخل خوابي الفخار الحجرية في العُلا',
    svgColor: '#A87D56',
    svgCap: '#9A5B32',
    featured: false
  },
  {
    id: 'ambre-rouge',
    category: 'incense',
    category_en: 'Home Incense & Bakhoor',
    category_ar: 'بخور ومعمول أندلسي',
    name_en: "Ambre Rouge de l'AlUla",
    name_ar: 'عنبر العُلا القرمزي',
    subtitle_en: 'Natural amber resin infused with rare red saffron and musk grain',
    subtitle_ar: 'صمغ العنبر الطبيعي المذاب مع خيوط الزعفران القرمزية وحبيبات المسك',
    price: 610,
    price_100ml: 610,
    family: 'resinous',
    family_en: 'Amber Resin',
    family_ar: 'عنبر أحمر نادر',
    longevity: '14 Hours Ambience',
    sillage: 'Opulent & Enigmatic',
    notes: {
      top_en: 'Coriander Seeds, Dried Orange Rind',
      top_ar: 'بذور الكزبرة الجبلية، قشور البرتقال المجفف',
      heart_en: 'Fossil Amber Tears, Labdanum Honey, Saffron',
      heart_ar: 'دموع العنبر الأحفوري، عسل اللابدانوم، الزعفران',
      base_en: 'Red Sandalwood, Vanilla Resin, Patchouli',
      base_ar: 'خشب الصندل الأحمر، راتنج الفانيليا، الباتشولي'
    },
    terroir_en: 'Red sandstone ravines of Jabal Ithlib',
    terroir_ar: 'شِعاب الحجر الرملي القرمزي في جبل إثلب',
    svgColor: '#963D2E',
    svgCap: '#C5A059',
    featured: false
  },
  {
    id: 'huile-grenade',
    category: 'oils',
    category_en: 'Botanical Body Oils',
    category_ar: 'زيوت الجسم النباتية',
    name_en: 'Huile Sèche aux Graines de Grenade',
    name_ar: 'زيت الرمان والتين البري',
    subtitle_en: 'Cold-pressed virgin seed elixir that sinks instantly into desert-sunned skin',
    subtitle_ar: 'إكسير نقي معصور على البارد يتغلغل فورياً لتغذية البشرة المعرضة لشمس الصحراء',
    price: 360,
    price_100ml: 540,
    family: 'floral',
    family_en: 'Botanical Elixir',
    family_ar: 'إكسير زهوري ومستخلص نباتي',
    longevity: '10 Hours Hydration',
    sillage: 'Subtle Skin-Scent',
    notes: {
      top_en: 'Pomegranate Seed Oil, Sweet Orange Blossom',
      top_ar: 'زيت بذور الرمان البكر، زهر النارنج الحلو',
      heart_en: 'Wild Fig Milk, Golden Jojoba, Neroli Essential Oil',
      heart_ar: 'حليب التين البري، الجوجوبا الذهبية، زيت النيرولي العطري',
      base_en: 'Virgin Desert Argan, Atlas Cedar, Vitamin E',
      base_ar: 'أركان الصحراء البكر، أرز الأطلس، فيتامين هـ الطبيعي'
    },
    terroir_en: 'AlUla organic orchards & fertile valley soil',
    terroir_ar: 'بساتين العُلا العضوية وتربة الوادي الخصبة',
    svgColor: '#A44A4D',
    svgCap: '#3F4E3C',
    featured: false
  },
  {
    id: 'elixir-oasis',
    category: 'oils',
    category_en: 'Botanical Body Oils',
    category_ar: 'زيوت الجسم النباتية',
    name_en: "Élixir d'Or de l'Oasis",
    name_ar: 'إكسير الواحة الذهبي',
    subtitle_en: 'Sweet almond and prickly pear oil flecked with fine golden mineral mica',
    subtitle_ar: 'زيت اللوز الحلو والتين الشوكي المتلألئ ببريق معادن الميكا الذهبية',
    price: 410,
    price_100ml: 590,
    family: 'woody',
    family_en: 'Nourishing Gold Oil',
    family_ar: 'زيت مغذٍ بالذهب النباتي',
    longevity: '12 Hours Glow',
    sillage: 'Luminous & Warm',
    notes: {
      top_en: 'Bitter Almond Blossom, Bergamot',
      top_ar: 'زهر اللوز المر، البرغموت الصباحي',
      heart_en: 'Saffron Infusion, Damascus Jasmine, Cactus Seed',
      heart_ar: 'نقيع الزعفران الحر، ياسمين دمشقي، بذور الصبار',
      base_en: 'Sandalwood Oil, Amber Extract, Macadamia',
      base_ar: 'زيت الصندل النقي، مستخلص العنبر، المكاديميا'
    },
    terroir_en: 'Handcrafted in limited batches in the Old Town atelier',
    terroir_ar: 'مصنوع يدوياً بدفعات محدودة داخل مشغل البلدة القديمة',
    svgColor: '#D99B26',
    svgCap: '#9A5B32',
    featured: false
  },
  {
    id: 'serum-figue',
    category: 'oils',
    category_en: 'Botanical Body Oils',
    category_ar: 'زيوت الجسم النباتية',
    name_en: 'Sérum de Figue & Cèdre',
    name_ar: 'سيروم التين الشوكي والأرز',
    subtitle_en: 'Antioxidant-dense botanical restorative formulated for extreme climates',
    subtitle_ar: 'مركب نباتي فائق التركيز بمضادات الأكسدة مصمم لحماية البشرة في المناخات القاسية',
    price: 450,
    price_100ml: 650,
    family: 'woody',
    family_en: 'Restorative Botanical',
    family_ar: 'مرمم نباتي بخشب الأرز',
    longevity: '14 Hours Barrier',
    sillage: 'Intimate Botanical',
    notes: {
      top_en: 'Fig Leaf, Petitgrain, Wild Lavender',
      top_ar: 'أوراق التين العطرية، البيتيتغرين، الخزامى الجبلية',
      heart_en: 'Cold-Pressed Prickly Pear, Rose Geranium',
      heart_ar: 'تين شوكي معصور هيدروليكياً، إبرة الراعي',
      base_en: 'Lebanese Cedar, Vetiver Roots, Squalane',
      base_ar: 'أرز لبنان المعتق، جذور الفيتيفر، السكوالين النباتي'
    },
    terroir_en: 'Wild botanical flora of northern Hejaz valleys',
    terroir_ar: 'النباتات البرية لشِعاب شمال الحجاز',
    svgColor: '#3F4E3C',
    svgCap: '#1C1917',
    featured: false
  },
  {
    id: 'vase-terracotta',
    category: 'ceramics',
    category_en: 'Limited Ceramic Vessels',
    category_ar: 'مباخر وأوانٍ فخارية',
    name_en: "Vase Terracotta d'AlUla",
    name_ar: 'مبخرة الطين العتيق',
    subtitle_en: 'Hand-thrown unglazed terracotta brazier with hand-carved Nabataean motifs',
    subtitle_ar: 'مبخرة فخارية غير مصقولة مصنوعة يدوياً بنقوش هندسية نبطية محفورة',
    price: 680,
    price_100ml: 680,
    family: 'resinous',
    family_en: 'Artisan Vessel',
    family_ar: 'تحفة خزفية أصيلة',
    longevity: 'Generations',
    sillage: 'Thermal Heat Distribution',
    notes: {
      top_en: 'AlUla Canyon Natural Terracotta Clay',
      top_ar: 'طين الحجر الرملي الطبيعي من مضائق العُلا',
      heart_en: 'Forged Solid Brass Aeration Grate',
      heart_ar: 'شبكة تهوية نحاسية صلبة مطروقة يدوياً',
      base_en: 'Non-slip Raw Basalt Stone Foot',
      base_ar: 'قاعدة من حجر البازلت الأسود المقاوم للانزلاق والحرارة'
    },
    terroir_en: 'Fired in traditional wood kilns in AlUla pottery workshops',
    terroir_ar: 'أُحرقت في أفران الحطب التقليدية في محترفات الخزف بالعُلا',
    svgColor: '#9A5B32',
    svgCap: '#C5A059',
    featured: false
  },
  {
    id: 'flacon-verre-fume',
    category: 'ceramics',
    category_en: 'Limited Ceramic Vessels',
    category_ar: 'مباخر وأوانٍ فخارية',
    name_en: 'Flacon de Poche en Verre Fumé',
    name_ar: 'قارورة الجيب الزجاجية',
    subtitle_en: 'Mouth-blown 30ml smoked obsidian travel flask fitted with precision brass dipstick',
    subtitle_ar: 'قارورة جيب 30 مل من الزجاج الدخاني المنفوخ يدوياً مع ميل نحاسي لنقل قطرات العطر',
    price: 490,
    price_100ml: 490,
    family: 'woody',
    family_en: 'Artisan Glassware',
    family_ar: 'زجاج يدوي نفيس',
    longevity: 'Heirloom Keepsake',
    sillage: 'Apothecary Precision',
    notes: {
      top_en: 'UV-Protecting Smoked Obsidian Glass',
      top_ar: 'زجاج سبجي مدخن عاتم للحماية من الأشعة فوق البنفسجية',
      heart_en: 'Turned Solid Brass Cap with Wax Chamber',
      heart_ar: 'غطاء نحاسي مخرط مع حجرة شمعية حافظة',
      base_en: 'Individually Numbered Artisan Stamp',
      base_ar: 'ختم حرفي مرقم يدوياً على كل قطعة'
    },
    terroir_en: 'Crafted in collaboration with master glassblowers',
    terroir_ar: 'صُنعت بالتعاون مع حرفيي نفخ الزجاج التراثي',
    svgColor: '#2B2825',
    svgCap: '#8E6845',
    featured: false
  },
  {
    id: 'mortier-gres',
    category: 'ceramics',
    category_en: 'Limited Ceramic Vessels',
    category_ar: 'مباخر وأوانٍ فخارية',
    name_en: 'Mortier en Grès & Pilon en Bronze',
    name_ar: 'مهراس حجري نبطي',
    subtitle_en: 'Carved natural sandstone mortar paired with heavy cast bronze pestle for grinding resins',
    subtitle_ar: 'مهراس منحوت من الحجر الرملي الطبيعي مع يد نحاسية ثقيلة لطحن اللبان والمر',
    price: 740,
    price_100ml: 740,
    family: 'spiced',
    family_en: 'Apothecary Tool',
    family_ar: 'أداة صيدلانية تراثية',
    longevity: 'Centuries',
    sillage: 'Manual Extraction',
    notes: {
      top_en: 'Honed Natural Sandstone Vessel',
      top_ar: 'وعاء حجر رملي طبيعي مصقول بدقة',
      heart_en: 'Solid Cast Bronze Pestle (Weight: 680g)',
      heart_ar: 'يد هاون نحاسية مسبوكة بوزن 680 جرام',
      base_en: 'Natural Olive Wood Storage Casket',
      base_ar: 'صندوق حفظ خشبي مصنوع من شجر الزيتون المعمر'
    },
    terroir_en: 'Extracted from regional quarries following traditional masonry',
    terroir_ar: 'مستخرج من مقالع الحجر الإقليمية بأسلوب البناء التراثي',
    svgColor: '#8C8275',
    svgCap: '#C5A059',
    featured: false
  }
];

// Helper to generate bespoke bottle SVG
function generateBottleSvg(color = '#9A5B32', cap = '#C5A059', labelText = 'MAISON ALULA', batch = 'BATCH 26-A') {
  return `
    <svg viewBox="0 0 200 280" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="glassGrad-${color.replace('#','')}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${color}" stop-opacity="0.25"/>
          <stop offset="50%" stop-color="${color}" stop-opacity="0.75"/>
          <stop offset="100%" stop-color="${color}" stop-opacity="0.95"/>
        </linearGradient>
        <linearGradient id="capGrad-${cap.replace('#','')}" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#4A3B2C"/>
          <stop offset="50%" stop-color="${cap}"/>
          <stop offset="100%" stop-color="#3A2D20"/>
        </linearGradient>
        <filter id="glassShine" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
          <feOffset dx="1" dy="2" result="offsetblur"/>
          <feComponentTransfer><feFuncA type="linear" slope="0.3"/></feComponentTransfer>
          <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      
      <!-- Bottle Shadow -->
      <ellipse cx="100" cy="265" rx="55" ry="8" fill="rgba(28, 25, 23, 0.12)" />

      <!-- Heavy Glass Bottle Body -->
      <rect x="45" y="80" width="110" height="175" rx="8" fill="url(#glassGrad-${color.replace('#','')})" stroke="#1C1917" stroke-width="1.5" />
      
      <!-- Liquid Level & Ambient Internal Glow -->
      <rect x="50" y="95" width="100" height="152" rx="4" fill="${color}" opacity="0.4" />
      <path d="M50 95 Q100 90 150 95 L150 247 L50 247 Z" fill="${color}" opacity="0.3" />

      <!-- Bottle Neck -->
      <rect x="80" y="55" width="40" height="26" fill="url(#glassGrad-${color.replace('#','')})" stroke="#1C1917" stroke-width="1.5" />
      <rect x="76" y="50" width="48" height="6" rx="2" fill="url(#glassGrad-${color.replace('#','')})" stroke="#1C1917" stroke-width="1.2" />

      <!-- Hand-Hammered Cap -->
      <rect x="74" y="16" width="52" height="36" rx="4" fill="url(#capGrad-${cap.replace('#','')})" stroke="#1C1917" stroke-width="1.5" />
      <line x1="74" y1="28" x2="126" y2="28" stroke="rgba(255,255,255,0.2)" stroke-width="1" />
      <circle cx="100" cy="34" r="3" fill="#D4AF37" opacity="0.8"/>

      <!-- Parchment Label -->
      <rect x="55" y="125" width="90" height="95" rx="1" fill="#FAF6EE" stroke="#CFC5B6" stroke-width="1" />
      <rect x="58" y="128" width="84" height="89" fill="none" stroke="#9A5B32" stroke-width="0.5" stroke-dasharray="2,1" />

      <!-- Label Typography -->
      <text x="100" y="145" font-family="'Playfair Display', serif" font-size="7.5" font-weight="600" fill="#1C1917" text-anchor="middle" letter-spacing="1">MAISON ALULA</text>
      <text x="100" y="155" font-family="'JetBrains Mono', monospace" font-size="4.5" fill="#9A5B32" text-anchor="middle" letter-spacing="0.5">${batch}</text>
      <line x1="68" y1="160" x2="132" y2="160" stroke="#E5DDD0" stroke-width="0.75" />
      
      <text x="100" y="174" font-family="'Playfair Display', serif" font-size="6.5" font-weight="600" fill="#1C1917" text-anchor="middle">${labelText.substring(0, 18)}</text>
      <text x="100" y="185" font-family="'Plus Jakarta Sans', sans-serif" font-size="4" fill="#6B635B" text-anchor="middle">EXTRAIT DE PARFUM // 50 ML</text>
      <text x="100" y="196" font-family="'JetBrains Mono', monospace" font-size="3.5" fill="#9C948A" text-anchor="middle">COMPOUNDED IN ALULA</text>
      
      <!-- Wax Stamp Dot on Label -->
      <circle cx="100" cy="207" r="4.5" fill="#8B261D" />
      <text x="100" y="209" font-family="'Playfair Display', serif" font-size="4.5" font-weight="bold" fill="#FFF" text-anchor="middle">A</text>

      <!-- Glass Highlight Reflection (Subtle Luxury Sheen) -->
      <path d="M52 86 L52 245 Q52 248 55 248 L58 248 L58 86 Z" fill="#FFF" opacity="0.35" />
    </svg>
  `;
}
