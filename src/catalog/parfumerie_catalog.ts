/**
 * MAISON ALULA HAUTE PARFUMERIE // PARFUMERIE CATALOG & MULTI-FACET SEARCH ENGINE
 * ============================================================================
 * Strongly-typed bilingual product catalog database, Levenshtein distance fuzzy
 * search index, multi-attribute facet aggregation, and olfactory sorting.
 *
 * Author: Tariq Abuashi (Master Perfumer & Chief Digital Architect)
 * ============================================================================
 */

export type FragranceCategory = 'parfum' | 'incense' | 'oils' | 'ceramics';
export type FragranceFamily = 'woody' | 'floral' | 'resinous' | 'spiced';

export interface IOlfactoryPyramid {
  top_en: string;
  top_ar: string;
  heart_en: string;
  heart_ar: string;
  base_en: string;
  base_ar: string;
}

export interface ITerroirProvenance {
  region_en: string;
  region_ar: string;
  elevationMeters?: number;
  harvestSeason?: string;
  distillationVessel?: string;
}

export interface IFragranceProduct {
  id: string;
  sku: string;
  category: FragranceCategory;
  category_en: string;
  category_ar: string;
  name_en: string;
  name_ar: string;
  subtitle_en: string;
  subtitle_ar: string;
  priceSAR: number;
  price100mlSAR?: number;
  family: FragranceFamily;
  family_en: string;
  family_ar: string;
  longevity: string;
  sillageRating: 'Intimate' | 'Radiant' | 'Expansive' | 'Majestic';
  macerationMonths: number;
  pyramid: IOlfactoryPyramid;
  terroir: ITerroirProvenance;
  svgColor: string;
  svgCap: string;
  featured: boolean;
  inStock: boolean;
  stockQuantity: number;
}

export interface IFacetAggregation {
  byCategory: Record<FragranceCategory, number>;
  byFamily: Record<FragranceFamily, number>;
  priceRange: { min: number; max: number; median: number };
  totalCount: number;
}

export interface ICatalogFilterOptions {
  category?: FragranceCategory | 'all';
  family?: FragranceFamily | 'all';
  searchQuery?: string;
  minPrice?: number;
  maxPrice?: number;
  inStockOnly?: boolean;
  sortBy?: 'featured' | 'price-asc' | 'price-desc' | 'name' | 'maceration';
}

/**
 * The Archival Master Catalog of Maison AlUla
 */
export const MASTER_CATALOG_DATABASE: IFragranceProduct[] = [
  {
    id: 'ombre-elephant',
    sku: 'ALU-PARF-001',
    category: 'parfum',
    category_en: 'Extrait de Parfum',
    category_ar: 'عطور نقية مركزة',
    name_en: "L'Ombre d'Éléphant",
    name_ar: 'ظل صخرة الفيل',
    subtitle_en: 'A tribute to the iconic geological monument under desert twilight',
    subtitle_ar: 'تحية عطرية للمَعلَم الجيولوجي الخالد تحت سكون الغسق الصحراوي',
    priceSAR: 920,
    price100mlSAR: 1380,
    family: 'woody',
    family_en: 'Woody & Resinous',
    family_ar: 'أخشاب وأصماغ نادرة',
    longevity: '24 Hours',
    sillageRating: 'Majestic',
    macerationMonths: 24,
    pyramid: {
      top_en: 'Calabrian Bergamot, Green Cardamom, Pink Peppercorn',
      top_ar: 'برغموت كالابريا، هيل جبلي أخضر، فلفل وردي',
      heart_en: 'Royal Frankincense, Aged Cedarwood, Desert Papyrus',
      heart_ar: 'لبان الحوجري، خشب الأرز المعتق، ورق البردي الصحراوي',
      base_en: 'Cambodian Agarwood, Red Sea Amber, Smoked Birch',
      base_ar: 'عود كمبودي ملكي، عنبر البحر الأحمر، قطران البتولا المدخن'
    },
    terroir: {
      region_en: 'Wadi Dawkah frankincense married with sandstone minerals',
      region_ar: 'لبان وادي دوكة الممتزج مع معادن الحجر الرملي النبطي',
      elevationMeters: 680,
      harvestSeason: 'Late Autumn Harvest',
      distillationVessel: 'Handmade Copper Alembic'
    },
    svgColor: '#9A5B32',
    svgCap: '#C5A059',
    featured: true,
    inStock: true,
    stockQuantity: 42
  },
  {
    id: 'petales-taif',
    sku: 'ALU-PARF-002',
    category: 'parfum',
    category_en: 'Extrait de Parfum',
    category_ar: 'عطور نقية مركزة',
    name_en: 'Pétales de Taïf',
    name_ar: 'بتلات الطائف النادرة',
    subtitle_en: 'Hand-picked 30-petal Damask rose distilled at dawn in misty summits',
    subtitle_ar: 'ورد جوري ثلاثيني قُطف عند الفجر الباكر على قمم جبال الهدا الضبابية',
    priceSAR: 860,
    price100mlSAR: 1290,
    family: 'floral',
    family_en: 'Heirloom Floral',
    family_ar: 'زهوري تراثي فاخر',
    longevity: '18 Hours',
    sillageRating: 'Radiant',
    macerationMonths: 18,
    pyramid: {
      top_en: 'Dewy Morning Petals, Neroli, Sweet Lychee',
      top_ar: 'قطرات الندى الصباحية، زهر البرتقال النيرولي، ليتشي ناعم',
      heart_en: 'Pure Taif Damask Absolute, Saffron Strands, Rose Water',
      heart_ar: 'خلاصة ورد الطائف النقي، مياسم الزعفران، ماء الورد المقطر',
      base_en: 'White Musk, Cashmeran, Mysore Sandalwood',
      base_ar: 'المسك الأبيض الحريري، الكشميران، خشب الصندل المايسوري'
    },
    terroir: {
      region_en: 'Al-Hada highlands, 2,000 meters above sea level',
      region_ar: 'مرتفعات الهدا، 2000 متر فوق سطح البحر',
      elevationMeters: 2000,
      harvestSeason: 'April Spring Dawn',
      distillationVessel: 'Direct Fire Copper Hydrolat Retort'
    },
    svgColor: '#C47B78',
    svgCap: '#8E6845',
    featured: true,
    inStock: true,
    stockQuantity: 28
  },
  {
    id: 'dedicace-nabateenne',
    sku: 'ALU-PARF-003',
    category: 'parfum',
    category_en: 'Extrait de Parfum',
    category_ar: 'عطور نقية مركزة',
    name_en: 'Dédicace Nabatéenne',
    name_ar: 'النذور النبطية',
    subtitle_en: 'Sacred resin ceremonies engraved on the sandstone tombs of Hegra',
    subtitle_ar: 'طقوس البخور والبلاسم المقدسة المحفورة على واجهات الحِجر الصخرية',
    priceSAR: 1150,
    price100mlSAR: 1725,
    family: 'resinous',
    family_en: 'Sacred Resins',
    family_ar: 'أصماغ نبطية مقدسة',
    longevity: '30+ Hours',
    sillageRating: 'Majestic',
    macerationMonths: 36,
    pyramid: {
      top_en: 'Wild Thyme, Spiced Bitter Orange, Golden Opoponax',
      top_ar: 'زعتر صحراوي بري، نارنج متبل، أوبوبوناكس ذهبي',
      heart_en: 'Hojari Luban Tears, Rock Cistus Labdanum, Cinnamon Bark',
      heart_ar: 'دموع لبان الحوجري، صمغ القستوس الصخري، لحاء القرفة',
      base_en: 'Fossilized Amber, Benzoin of Siam, Raw Castoreum Accord',
      base_ar: 'عنبر متحجر قديم، جاوي سيام، أكورد الكاستوريوم الخام'
    },
    terroir: {
      region_en: 'Hegra archaeological sanctuaries & the Incense Highway',
      region_ar: 'محميات الحِجر الأثرية ومسار قوافل البخور التاريخي',
      elevationMeters: 750,
      harvestSeason: 'Perennial Maceration',
      distillationVessel: 'Subterranean Ceramic Amphora'
    },
    svgColor: '#7C4524',
    svgCap: '#C5A059',
    featured: true,
    inStock: true,
    stockQuantity: 18
  },
  {
    id: 'oasis-dattes',
    sku: 'ALU-PARF-004',
    category: 'parfum',
    category_en: 'Extrait de Parfum',
    category_ar: 'عطور نقية مركزة',
    name_en: 'Oasis de Dattes',
    name_ar: 'ظلال نخيل الواحة',
    subtitle_en: 'The golden warmth of Barni date nectar filtered through palm canopies',
    subtitle_ar: 'دفء رحيق تمر البرني العسلي المنساب بين ظلال سعف نخيل الواحة',
    priceSAR: 890,
    price100mlSAR: 1335,
    family: 'spiced',
    family_en: 'Gourmand & Spiced',
    family_ar: 'توابل شرقية ورحيق النخيل',
    longevity: '20 Hours',
    sillageRating: 'Expansive',
    macerationMonths: 18,
    pyramid: {
      top_en: 'Roasted Pistachio, Wild Cardamom, Honeycomb',
      top_ar: 'فستق محمص، هيل بري، شمع العسل الجبلي',
      heart_en: 'AlUla Barni Date Accord, Turkish Coffee, Cacao Pod',
      heart_ar: 'أكورد تمر برني العُلا، بن القهوة العربي، بذور الكاكاو',
      base_en: 'Madagascar Vanilla Pods, Tobacco Leaf, Guaiacwood',
      base_ar: 'قرون فانيليا مدغشقر، أوراق التبغ الفاخر، خشب الغاياك'
    },
    terroir: {
      region_en: 'Ancient cultivated farms of AlUla Valley',
      region_ar: 'بساتين ومزارع وادي العُلا القديمة',
      elevationMeters: 650,
      harvestSeason: 'Late Date Harvest',
      distillationVessel: 'Gentle Vacuum Extraction'
    },
    svgColor: '#8C5638',
    svgCap: '#3F4E3C',
    featured: false,
    inStock: true,
    stockQuantity: 34
  },
  {
    id: 'encens-dawkah',
    sku: 'ALU-INC-001',
    category: 'incense',
    category_en: 'Home Incense & Bakhoor',
    category_ar: 'بخور ومعمول أندلسي',
    name_en: 'Encens Royal de Dawkah',
    name_ar: 'بخور ظفار الملكي',
    subtitle_en: 'First-harvest Frankincense tears rolled in pure aged amber oil',
    subtitle_ar: 'دموع اللبان الحوجري البكر المعجونة بزيت العنبر المعتق',
    priceSAR: 480,
    family: 'resinous',
    family_en: 'Pure Incense Tears',
    family_ar: 'لبان حوجري بكر',
    longevity: '12 Hours Ambience',
    sillageRating: 'Expansive',
    macerationMonths: 12,
    pyramid: {
      top_en: 'Citrus Terpenes, Pine Sap, Silver Frankincense',
      top_ar: 'تربينات الحمضيات، نسغ الصنوبر، لبان فضي ناصع',
      heart_en: 'Green Boswellia Sacra, Ground Cloves, Myrrh',
      heart_ar: 'بوزويليا ساكرا الخضراء، مسحوق القرنفل، المُر العتيق',
      base_en: 'Dry Cedar Embers, Raw Ambergris',
      base_ar: 'جمر خشب الأرز الجاف، دهن العنبر الخام'
    },
    terroir: {
      region_en: 'UNESCO Natural Reserve of Wadi Dawkah',
      region_ar: 'محمية وادي دوكة الطبيعية المسجلة لدى اليونسكو'
    },
    svgColor: '#D4AF37',
    svgCap: '#1C1917',
    featured: false,
    inStock: true,
    stockQuantity: 60
  },
  {
    id: 'santal-fume',
    sku: 'ALU-INC-002',
    category: 'incense',
    category_en: 'Home Incense & Bakhoor',
    category_ar: 'بخور ومعمول أندلسي',
    name_en: 'Bois de Santal Fumé',
    name_ar: 'خشب الصندل المعتّق',
    subtitle_en: 'Aged Mysore sandalwood logs soaked in Taif rose hydrolat',
    subtitle_ar: 'رقائق خشب الصندل المايسوري المشبعة بماء الورد الطائفي المركز',
    priceSAR: 520,
    family: 'woody',
    family_en: 'Smoked Woods',
    family_ar: 'أخشاب نادرة مدخنة',
    longevity: '16 Hours Ambience',
    sillageRating: 'Radiant',
    macerationMonths: 14,
    pyramid: {
      top_en: 'Taif Hydrolat Steam, Bergamot Zest',
      top_ar: 'بخار هيدرولات الورد الطائفي، بشر البرغموت',
      heart_en: 'Heartwood Sandalwood, Nutmeg, Saffron Dust',
      heart_ar: 'لب خشب الصندل العتيق، جوزة الطيب، غبار الزعفران',
      base_en: 'Incense Smoke, Benzoin, Amyris',
      base_ar: 'دخان البخور الهادئ، الجاوي، خشب الأمريس'
    },
    terroir: {
      region_en: 'Slow-cured in traditional stone jars in AlUla',
      region_ar: 'معتق ببطء داخل خوابي الفخار الحجرية في العُلا'
    },
    svgColor: '#A87D56',
    svgCap: '#9A5B32',
    featured: false,
    inStock: true,
    stockQuantity: 45
  },
  {
    id: 'ambre-rouge',
    sku: 'ALU-INC-003',
    category: 'incense',
    category_en: 'Home Incense & Bakhoor',
    category_ar: 'بخور ومعمول أندلسي',
    name_en: "Ambre Rouge de l'AlUla",
    name_ar: 'عنبر العُلا القرمزي',
    subtitle_en: 'Natural amber resin infused with rare red saffron and musk grain',
    subtitle_ar: 'صمغ العنبر الطبيعي المذاب مع خيوط الزعفران القرمزية وحبيبات المسك',
    priceSAR: 610,
    family: 'resinous',
    family_en: 'Amber Resin',
    family_ar: 'عنبر أحمر نادر',
    longevity: '14 Hours Ambience',
    sillageRating: 'Majestic',
    macerationMonths: 20,
    pyramid: {
      top_en: 'Coriander Seeds, Dried Orange Rind',
      top_ar: 'بذور الكزبرة الجبلية، قشور البرتقال المجفف',
      heart_en: 'Fossil Amber Tears, Labdanum Honey, Saffron',
      heart_ar: 'دموع العنبر الأحفوري، عسل اللابدانوم، الزعفران',
      base_en: 'Red Sandalwood, Vanilla Resin, Patchouli',
      base_ar: 'خشب الصندل الأحمر، راتنج الفانيليا، الباتشولي'
    },
    terroir: {
      region_en: 'Red sandstone ravines of Jabal Ithlib',
      region_ar: 'شِعاب الحجر الرملي القرمزي في جبل إثلب'
    },
    svgColor: '#963D2E',
    svgCap: '#C5A059',
    featured: false,
    inStock: true,
    stockQuantity: 32
  },
  {
    id: 'huile-grenade',
    sku: 'ALU-OIL-001',
    category: 'oils',
    category_en: 'Botanical Body Oils',
    category_ar: 'زيوت الجسم النباتية',
    name_en: 'Huile Sèche aux Graines de Grenade',
    name_ar: 'زيت الرمان والتين البري',
    subtitle_en: 'Cold-pressed virgin seed elixir that sinks instantly into desert-sunned skin',
    subtitle_ar: 'إكسير نقي معصور على البارد يتغلغل فورياً لتغذية البشرة المعرضة لشمس الصحراء',
    priceSAR: 360,
    price100mlSAR: 540,
    family: 'floral',
    family_en: 'Botanical Elixir',
    family_ar: 'إكسير زهوري ومستخلص نباتي',
    longevity: '10 Hours Hydration',
    sillageRating: 'Intimate',
    macerationMonths: 6,
    pyramid: {
      top_en: 'Pomegranate Seed Oil, Sweet Orange Blossom',
      top_ar: 'زيت بذور الرمان البكر، زهر النارنج الحلو',
      heart_en: 'Wild Fig Milk, Golden Jojoba, Neroli Essential Oil',
      heart_ar: 'حليب التين البري، الجوجوبا الذهبية، زيت النيرولي العطري',
      base_en: 'Virgin Desert Argan, Atlas Cedar, Vitamin E',
      base_ar: 'أركان الصحراء البكر، أرز الأطلس، فيتامين هـ الطبيعي'
    },
    terroir: {
      region_en: 'AlUla organic orchards & fertile valley soil',
      region_ar: 'بساتين العُلا العضوية وتربة الوادي الخصبة'
    },
    svgColor: '#A44A4D',
    svgCap: '#3F4E3C',
    featured: false,
    inStock: true,
    stockQuantity: 50
  },
  {
    id: 'elixir-oasis',
    sku: 'ALU-OIL-002',
    category: 'oils',
    category_en: 'Botanical Body Oils',
    category_ar: 'زيوت الجسم النباتية',
    name_en: "Élixir d'Or de l'Oasis",
    name_ar: 'إكسير الواحة الذهبي',
    subtitle_en: 'Sweet almond and prickly pear oil flecked with fine golden mineral mica',
    subtitle_ar: 'زيت اللوز الحلو والتين الشوكي المتلألئ ببريق معادن الميكا الذهبية',
    priceSAR: 410,
    price100mlSAR: 590,
    family: 'woody',
    family_en: 'Nourishing Gold Oil',
    family_ar: 'زيت مغذٍ بالذهب النباتي',
    longevity: '12 Hours Glow',
    sillageRating: 'Radiant',
    macerationMonths: 8,
    pyramid: {
      top_en: 'Bitter Almond Blossom, Bergamot',
      top_ar: 'زهر اللوز المر، البرغموت الصباحي',
      heart_en: 'Saffron Infusion, Damascus Jasmine, Cactus Seed',
      heart_ar: 'نقيع الزعفران الحر، ياسمين دمشقي، بذور الصبار',
      base_en: 'Sandalwood Oil, Amber Extract, Macadamia',
      base_ar: 'زيت الصندل النقي، مستخلص العنبر، المكاديميا'
    },
    terroir: {
      region_en: 'Handcrafted in limited batches in the Old Town atelier',
      region_ar: 'مصنوع يدوياً بدفعات محدودة داخل مشغل البلدة القديمة'
    },
    svgColor: '#D99B26',
    svgCap: '#9A5B32',
    featured: false,
    inStock: true,
    stockQuantity: 38
  },
  {
    id: 'serum-figue',
    sku: 'ALU-OIL-003',
    category: 'oils',
    category_en: 'Botanical Body Oils',
    category_ar: 'زيوت الجسم النباتية',
    name_en: 'Sérum de Figue & Cèdre',
    name_ar: 'سيروم التين الشوكي والأرز',
    subtitle_en: 'Antioxidant-dense botanical restorative formulated for extreme climates',
    subtitle_ar: 'مركب نباتي فائق التركيز بمضادات الأكسدة مصمم لحماية البشرة في المناخات القاسية',
    priceSAR: 450,
    price100mlSAR: 650,
    family: 'woody',
    family_en: 'Restorative Botanical',
    family_ar: 'مرمم نباتي بخشب الأرز',
    longevity: '14 Hours Barrier',
    sillageRating: 'Intimate',
    macerationMonths: 10,
    pyramid: {
      top_en: 'Fig Leaf, Petitgrain, Wild Lavender',
      top_ar: 'أوراق التين العطرية، البيتيتغرين، الخزامى الجبلية',
      heart_en: 'Cold-Pressed Prickly Pear, Rose Geranium',
      heart_ar: 'تين شوكي معصور هيدروليكياً، إبرة الراعي',
      base_en: 'Lebanese Cedar, Vetiver Roots, Squalane',
      base_ar: 'أرز لبنان المعتق، جذور الفيتيفر، السكوالين النباتي'
    },
    terroir: {
      region_en: 'Wild botanical flora of northern Hejaz valleys',
      region_ar: 'النباتات البرية لشِعاب شمال الحجاز'
    },
    svgColor: '#3F4E3C',
    svgCap: '#1C1917',
    featured: false,
    inStock: true,
    stockQuantity: 40
  },
  {
    id: 'vase-terracotta',
    sku: 'ALU-CER-001',
    category: 'ceramics',
    category_en: 'Limited Ceramic Vessels',
    category_ar: 'مباخر وأوانٍ فخارية',
    name_en: "Vase Terracotta d'AlUla",
    name_ar: 'مبخرة الطين العتيق',
    subtitle_en: 'Hand-thrown unglazed terracotta brazier with hand-carved Nabataean motifs',
    subtitle_ar: 'مبخرة فخارية غير مصقولة مصنوعة يدوياً بنقوش هندسية نبطية محفورة',
    priceSAR: 680,
    family: 'resinous',
    family_en: 'Artisan Vessel',
    family_ar: 'تحفة خزفية أصيلة',
    longevity: 'Generations',
    sillageRating: 'Expansive',
    macerationMonths: 0,
    pyramid: {
      top_en: 'AlUla Canyon Natural Terracotta Clay',
      top_ar: 'طين الحجر الرملي الطبيعي من مضائق العُلا',
      heart_en: 'Forged Solid Brass Aeration Grate',
      heart_ar: 'شبكة تهوية نحاسية صلبة مطروقة يدوياً',
      base_en: 'Non-slip Raw Basalt Stone Foot',
      base_ar: 'قاعدة من حجر البازلت الأسود المقاوم للانزلاق والحرارة'
    },
    terroir: {
      region_en: 'Fired in traditional wood kilns in AlUla pottery workshops',
      region_ar: 'أُحرقت في أفران الحطب التقليدية في محترفات الخزف بالعُلا'
    },
    svgColor: '#9A5B32',
    svgCap: '#C5A059',
    featured: false,
    inStock: true,
    stockQuantity: 15
  },
  {
    id: 'flacon-verre-fume',
    sku: 'ALU-CER-002',
    category: 'ceramics',
    category_en: 'Limited Ceramic Vessels',
    category_ar: 'مباخر وأوانٍ فخارية',
    name_en: 'Flacon de Poche en Verre Fumé',
    name_ar: 'قارورة الجيب الزجاجية',
    subtitle_en: 'Mouth-blown 30ml smoked obsidian travel flask fitted with precision brass dipstick',
    subtitle_ar: 'قارورة جيب 30 مل من الزجاج الدخاني المنفوخ يدوياً مع ميل نحاسي لنقل قطرات العطر',
    priceSAR: 490,
    family: 'woody',
    family_en: 'Artisan Glassware',
    family_ar: 'زجاج يدوي نفيس',
    longevity: 'Heirloom Keepsake',
    sillageRating: 'Intimate',
    macerationMonths: 0,
    pyramid: {
      top_en: 'UV-Protecting Smoked Obsidian Glass',
      top_ar: 'زجاج سبجي مدخن عاتم للحماية من الأشعة فوق البنفسجية',
      heart_en: 'Turned Solid Brass Cap with Wax Chamber',
      heart_ar: 'غطاء نحاسي مخرط مع حجرة شمعية حافظة',
      base_en: 'Individually Numbered Artisan Stamp',
      base_ar: 'ختم حرفي مرقم يدوياً على كل قطعة'
    },
    terroir: {
      region_en: 'Crafted in collaboration with master glassblowers',
      region_ar: 'صُنعت بالتعاون مع حرفيي نفخ الزجاج التراثي'
    },
    svgColor: '#2B2825',
    svgCap: '#8E6845',
    featured: false,
    inStock: true,
    stockQuantity: 22
  },
  {
    id: 'mortier-gres',
    sku: 'ALU-CER-003',
    category: 'ceramics',
    category_en: 'Limited Ceramic Vessels',
    category_ar: 'مباخر وأوانٍ فخارية',
    name_en: 'Mortier en Grès & Pilon en Bronze',
    name_ar: 'مهراس حجري نبطي',
    subtitle_en: 'Carved natural sandstone mortar paired with heavy cast bronze pestle for grinding resins',
    subtitle_ar: 'مهراس منحوت من الحجر الرملي الطبيعي مع يد نحاسية ثقيلة لطحن اللبان والمر',
    priceSAR: 740,
    family: 'spiced',
    family_en: 'Apothecary Tool',
    family_ar: 'أداة صيدلانية تراثية',
    longevity: 'Centuries',
    sillageRating: 'Intimate',
    macerationMonths: 0,
    pyramid: {
      top_en: 'Honed Natural Sandstone Vessel',
      top_ar: 'وعاء حجر رملي طبيعي مصقول بدقة',
      heart_en: 'Solid Cast Bronze Pestle (Weight: 680g)',
      heart_ar: 'يد هاون نحاسية مسبوكة بوزن 680 جرام',
      base_en: 'Natural Olive Wood Storage Casket',
      base_ar: 'صندوق حفظ خشبي مصنوع من شجر الزيتون المعمر'
    },
    terroir: {
      region_en: 'Extracted from regional quarries following traditional masonry',
      region_ar: 'مستخرج من مقالع الحجر الإقليمية بأسلوب البناء التراثي'
    },
    svgColor: '#8C8275',
    svgCap: '#C5A059',
    featured: false,
    inStock: true,
    stockQuantity: 12
  }
];

/**
 * Parfumerie Search & Multi-Facet Engine
 */
export class ParfumerieCatalogService {
  private catalog: IFragranceProduct[];

  constructor(customCatalog: IFragranceProduct[] = MASTER_CATALOG_DATABASE) {
    this.catalog = customCatalog;
  }

  /**
   * Levenshtein Distance for fuzzy bilingual string searching
   */
  public static calculateLevenshtein(a: string, b: string): number {
    const al = a.length;
    const bl = b.length;
    if (al === 0) return bl;
    if (bl === 0) return al;

    const matrix: number[][] = [];
    for (let i = 0; i <= al; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= bl; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= al; i++) {
      for (let j = 1; j <= bl; j++) {
        const cost = a.charAt(i - 1).toLowerCase() === b.charAt(j - 1).toLowerCase() ? 0 : 1;
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1, // deletion
          matrix[i][j - 1] + 1, // insertion
          matrix[i - 1][j - 1] + cost // substitution
        );
      }
    }
    return matrix[al][bl];
  }

  /**
   * Queries products with multi-attribute filtering and sorting
   */
  public query(options: ICatalogFilterOptions = {}): IFragranceProduct[] {
    let result = [...this.catalog];

    // Filter by Category
    if (options.category && options.category !== 'all') {
      result = result.filter(item => item.category === options.category);
    }

    // Filter by Olfactory Family
    if (options.family && options.family !== 'all') {
      result = result.filter(item => item.family === options.family);
    }

    // Filter by Stock
    if (options.inStockOnly) {
      result = result.filter(item => item.inStock && item.stockQuantity > 0);
    }

    // Filter by Price Bounds
    if (options.minPrice !== undefined) {
      result = result.filter(item => item.priceSAR >= options.minPrice!);
    }
    if (options.maxPrice !== undefined) {
      result = result.filter(item => item.priceSAR <= options.maxPrice!);
    }

    // Search query matching (Exact, Substring, and Fuzzy)
    if (options.searchQuery && options.searchQuery.trim().length > 0) {
      const q = options.searchQuery.toLowerCase().trim();
      result = result.filter(item => {
        // Direct checks
        const matchNameEn = item.name_en.toLowerCase().includes(q);
        const matchNameAr = item.name_ar.includes(q);
        const matchSubEn = item.subtitle_en.toLowerCase().includes(q);
        const matchSubAr = item.subtitle_ar.includes(q);
        const matchTop = item.pyramid.top_en.toLowerCase().includes(q) || item.pyramid.top_ar.includes(q);
        const matchHeart = item.pyramid.heart_en.toLowerCase().includes(q) || item.pyramid.heart_ar.includes(q);
        const matchBase = item.pyramid.base_en.toLowerCase().includes(q) || item.pyramid.base_ar.includes(q);

        if (matchNameEn || matchNameAr || matchSubEn || matchSubAr || matchTop || matchHeart || matchBase) {
          return true;
        }

        // Levenshtein fuzzy check on English name tokens
        const tokens = item.name_en.toLowerCase().split(/\s+/);
        return tokens.some(token => ParfumerieCatalogService.calculateLevenshtein(token, q) <= 2);
      });
    }

    // Sorting
    const sort = options.sortBy || 'featured';
    if (sort === 'price-asc') {
      result.sort((a, b) => a.priceSAR - b.priceSAR);
    } else if (sort === 'price-desc') {
      result.sort((a, b) => b.priceSAR - a.priceSAR);
    } else if (sort === 'name') {
      result.sort((a, b) => a.name_en.localeCompare(b.name_en));
    } else if (sort === 'maceration') {
      result.sort((a, b) => b.macerationMonths - a.macerationMonths);
    } else {
      // 'featured'
      result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }

  /**
   * Calculates facet counts for dynamic UI aggregations
   */
  public getFacets(): IFacetAggregation {
    const byCategory: Record<FragranceCategory, number> = {
      parfum: 0,
      incense: 0,
      oils: 0,
      ceramics: 0
    };

    const byFamily: Record<FragranceFamily, number> = {
      woody: 0,
      floral: 0,
      resinous: 0,
      spiced: 0
    };

    let min = Infinity;
    let max = -Infinity;
    const prices: number[] = [];

    this.catalog.forEach(item => {
      byCategory[item.category] = (byCategory[item.category] || 0) + 1;
      byFamily[item.family] = (byFamily[item.family] || 0) + 1;

      if (item.priceSAR < min) min = item.priceSAR;
      if (item.priceSAR > max) max = item.priceSAR;
      prices.push(item.priceSAR);
    });

    prices.sort((a, b) => a - b);
    const median = prices.length > 0 ? prices[Math.floor(prices.length / 2)] : 0;

    return {
      byCategory,
      byFamily,
      priceRange: { min: min === Infinity ? 0 : min, max: max === -Infinity ? 0 : max, median },
      totalCount: this.catalog.length
    };
  }

  public getById(id: string): IFragranceProduct | undefined {
    return this.catalog.find(i => i.id === id);
  }
}
