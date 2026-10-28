import { Product, Coupon } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'mehkavi-ro-001',
    name: 'Royal Oud',
    slug: 'royal-oud',
    tagline: 'Deep woody Cambodian agarwood, velvety damask rose, and golden saffron.',
    inspiredBy: 'Impression of Creed Royal Oud',
    inspiredBrand: 'Creed',
    gender: 'Men',
    classification: 'Signature',
    olfactoryFamily: 'Woody & Oud',
    concentration: 'Extrait De Parfum (35% Oil Concentration)',
    description: 'A rich and luxurious fragrance inspired by the timeless allure of oud, Royal Oud blends deep woody notes with a hint of spice, creating an unforgettable scent.',
    shortDescription: 'Calabrian bergamot, saffron, rare Cambodian oud, damascena rose, and amber musk.',
    notes: {
      top: ['Bergamot', 'Saffron', 'Pink Pepper'],
      middle: ['Oud Wood', 'Damask Rose', 'Angelica Root'],
      base: ['Amber', 'White Musk', 'Cedarwood', 'Sandalwood']
    },
    longevity: '14-18+ Hours',
    sillage: 'Heavy',
    season: 'Autumn / Winter / Formal Evenings',
    occasion: 'Weddings, Black-Tie Galas, Executive Boardrooms',
    images: [
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=900&q=80'
    ],
    variants: [
      { id: 'ro-50ml', size: '50ml', price: 4999, originalPrice: 6200, inStock: true, sku: 'MK-RO-50' },
      { id: 'ro-100ml', size: '100ml', price: 7999, originalPrice: 9999, inStock: true, sku: 'MK-RO-100' }
    ],
    rating: 5.0,
    reviewCount: 124,
    isBestseller: true,
    isFeatured: true,
    onSale: true,
    reviews: [
      {
        id: 'rev-ro-01',
        author: 'Ahmed Khan',
        rating: 5,
        date: 'October 18, 2026',
        title: 'Masterpiece oud with regal sillage',
        comment: 'Royal Oud is genuinely aristocratic. The spicy saffron opening and warm woody drydown last through an entire evening and the next morning. Unbeatable quality.',
        verifiedPurchase: true,
        location: 'Lahore, Pakistan'
      },
      {
        id: 'rev-ro-02',
        author: 'M. Daniyal',
        rating: 5,
        date: 'October 05, 2026',
        title: 'Compliment magnet',
        comment: 'Everyone at the dinner asked what I was wearing. The 35% oil concentration makes a massive difference in staying power.',
        verifiedPurchase: true,
        location: 'Karachi, Pakistan'
      }
    ]
  },
  {
    id: 'mehkavi-vr-002',
    name: 'Velvet Rose',
    slug: 'velvet-rose',
    tagline: 'Sumptuous damascena rose wrapped in velvet amber and sweet praline.',
    inspiredBy: 'Impression of Jo Malone Velvet Rose & Oud',
    inspiredBrand: 'Jo Malone',
    gender: 'Women',
    classification: 'Signature',
    olfactoryFamily: 'Floral & Gourmand',
    concentration: 'Extrait De Parfum (35% Oil Concentration)',
    description: 'Velvet Rose is a decadent floral masterpiece capturing crimson damask roses in full bloom, enveloped in smoky agarwood, clove spices, and decadent praline truffle.',
    shortDescription: 'Damascena rose, sweet praline, smoky agarwood, and amber.',
    notes: {
      top: ['Damask Rose', 'Lychee', 'Bergamot'],
      middle: ['Praline Truffle', 'Clove Spices', 'Peony'],
      base: ['Smoky Agarwood', 'Golden Amber', 'Bourbon Vanilla']
    },
    longevity: '14-18+ Hours',
    sillage: 'Heavy',
    season: 'All Year Round / Evenings',
    occasion: 'Weddings, Formal Dinners, Date Nights',
    images: [
      'https://images.unsplash.com/photo-1588405748480-1cf414c89329?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=900&q=80'
    ],
    variants: [
      { id: 'vr-50ml', size: '50ml', price: 4299, originalPrice: 5100, inStock: true, sku: 'MK-VR-50' },
      { id: 'vr-100ml', size: '100ml', price: 6799, originalPrice: 7999, inStock: true, sku: 'MK-VR-100' }
    ],
    rating: 4.9,
    reviewCount: 96,
    isBestseller: true,
    isFeatured: true,
    onSale: true
  },
  {
    id: 'mehkavi-ob-003',
    name: 'Ocean Breeze',
    slug: 'ocean-breeze',
    tagline: 'Invigorating Mediterranean sea minerals, crushed mint, and grey driftwood.',
    inspiredBy: 'MEHKAVI Marine Creation',
    inspiredBrand: 'MEHKAVI Original',
    gender: 'Unisex',
    classification: 'Signature',
    olfactoryFamily: 'Aromatic Aquatic',
    concentration: 'Extrait De Parfum (35% Oil Concentration)',
    description: 'Ocean Breeze channels the fresh, salty spray of crystal sea waves breaking over sun-warmed rocks. Crisp bergamot, calone, rosemary, and solar driftwood deliver pure coastal vitality.',
    shortDescription: 'Calabrian bergamot, marine salt spray, wild rosemary, and mineral amber.',
    notes: {
      top: ['Sea Salt Crystals', 'Calabrian Bergamot', 'Mandarin'],
      middle: ['Calone Oceanic Accord', 'Wild Rosemary', 'Geranium'],
      base: ['Driftwood', 'Mineral Grey Amber', 'Patchouli']
    },
    longevity: '10-14 Hours',
    sillage: 'Heavy',
    season: 'Spring / Summer / Hot Climates',
    occasion: 'Daily Signature, Office, Summer Vacations',
    images: [
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=80'
    ],
    variants: [
      { id: 'ob-50ml', size: '50ml', price: 3799, originalPrice: 4700, inStock: true, sku: 'MK-OB-50' },
      { id: 'ob-100ml', size: '100ml', price: 5999, originalPrice: 7499, inStock: true, sku: 'MK-OB-100' }
    ],
    rating: 4.8,
    reviewCount: 78,
    isBestseller: true,
    isFeatured: true,
    onSale: true
  },
  {
    id: 'mehkavi-an-004',
    name: 'Amber Nights',
    slug: 'amber-nights',
    tagline: 'Smoky balsamic benzoin, honeyed cardamom, and golden vanilla amber.',
    inspiredBy: 'Impression of MFK Grand Soir',
    inspiredBrand: 'Maison Francis Kurkdjian',
    gender: 'Unisex',
    classification: 'Exclusif',
    olfactoryFamily: 'Oriental & Spicy',
    concentration: 'Extrait De Parfum (35% Oil Concentration)',
    description: 'Amber Nights radiates the intoxicating, golden luminescence of a Parisian evening. Enriched with Spanish labdanum, Siamese benzoin resin, Brazilian tonka bean, and Madagascan vanilla.',
    shortDescription: 'Golden amber, cinnamon quill, benzoin resin, and rich tonka bean.',
    notes: {
      top: ['Cardamom', 'Cinnamon Quill', 'Pink Pepper'],
      middle: ['Golden Amber Accord', 'Honeyed Rose', 'Labdanum'],
      base: ['Siamese Benzoin', 'Madagascar Vanilla', 'Tonka Bean', 'Cedarwood']
    },
    longevity: '14-18+ Hours',
    sillage: 'Enormous',
    season: 'Autumn / Winter / Cozy Evenings',
    occasion: 'High Profile Galas, Intimate Dinners, Winter Wear',
    images: [
      'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=900&q=80'
    ],
    variants: [
      { id: 'an-50ml', size: '50ml', price: 4199, originalPrice: 5500, inStock: true, sku: 'MK-AN-50' },
      { id: 'an-100ml', size: '100ml', price: 6499, originalPrice: 8499, inStock: true, sku: 'MK-AN-100' }
    ],
    rating: 4.9,
    reviewCount: 82,
    isBestseller: true,
    isFeatured: true,
    onSale: true
  },
  {
    id: 'mehkavi-bh-005',
    name: 'Blue Horizon',
    slug: 'blue-horizon',
    tagline: 'Electric iced grapefruit, cold marine breeze, and noble woody ambroxan.',
    inspiredBy: 'Impression of Bleu de Chanel Parfum',
    inspiredBrand: 'Chanel',
    gender: 'Men',
    classification: 'Signature',
    olfactoryFamily: 'Aromatic Aquatic',
    concentration: 'Extrait De Parfum (35% Oil Concentration)',
    description: 'Blue Horizon is a devastatingly crisp aquatic scent crafted for modern men of vision. A torrent of zesty grapefruit and mint meets French lavender and noble New Caledonian sandalwood.',
    shortDescription: 'Iced grapefruit, mint, French lavender, and sandalwood.',
    notes: {
      top: ['Pink Grapefruit', 'Lemon Zest', 'Crisp Mint'],
      middle: ['Ginger', 'French Lavender', 'Geranium'],
      base: ['Ambroxan', 'New Caledonian Sandalwood', 'Atlas Cedar']
    },
    longevity: '14-18+ Hours',
    sillage: 'Heavy',
    season: 'All Year Round / Summer Signature',
    occasion: 'Executive Office, Daily Confidence, Travel',
    images: [
      'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=900&q=80'
    ],
    variants: [
      { id: 'bh-50ml', size: '50ml', price: 3199, originalPrice: 4200, inStock: true, sku: 'MK-BH-50' },
      { id: 'bh-100ml', size: '100ml', price: 4699, originalPrice: 6499, inStock: true, sku: 'MK-BH-100' }
    ],
    rating: 4.8,
    reviewCount: 58,
    isBestseller: true,
    isFeatured: true,
    onSale: true
  },
  {
    id: 'mehkavi-cw-006',
    name: 'Citrus Wood',
    slug: 'citrus-wood',
    tagline: 'Sparkling Sicilian orange, flint minerality, and earthy vetiver root.',
    inspiredBy: "Impression of Terre d'Hermes",
    inspiredBrand: 'Hermes',
    gender: 'Men',
    classification: 'Signature',
    olfactoryFamily: 'Fresh Citrus',
    concentration: 'Extrait De Parfum (35% Oil Concentration)',
    description: 'Citrus Wood is an architectural balance of sky and earth. Bitter orange and grapefruit burst across flint stone minerals, grounded in woody cedar and Haitian vetiver.',
    shortDescription: 'Sicilian orange, flint stone minerals, pink pepper, and Haitian vetiver.',
    notes: {
      top: ['Sicilian Orange', 'Grapefruit', 'Bergamot'],
      middle: ['Flint Stone Accord', 'Pink Pepper', 'Geranium'],
      base: ['Haitian Vetiver', 'Cedarwood', 'Benzoin', 'Oakmoss']
    },
    longevity: '10-14 Hours',
    sillage: 'Heavy',
    season: 'Spring / Summer / Autumn',
    occasion: 'Business Meetings, High Heat, Formal Days',
    images: [
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=900&q=80'
    ],
    variants: [
      { id: 'cw-50ml', size: '50ml', price: 3899, originalPrice: 4900, inStock: true, sku: 'MK-CW-50' },
      { id: 'cw-100ml', size: '100ml', price: 5899, originalPrice: 7499, inStock: true, sku: 'MK-CW-100' }
    ],
    rating: 4.7,
    reviewCount: 71,
    isBestseller: true,
    isFeatured: true,
    onSale: true
  },
  {
    id: 'mehkavi-sl-007',
    name: 'Silver Legend',
    slug: 'silver-legend',
    tagline: 'Alpine glacier stream, silver birch, blackcurrant bud, and milky green tea.',
    inspiredBy: 'Impression of Creed Silver Mountain Water',
    inspiredBrand: 'Creed',
    gender: 'Unisex',
    classification: 'Exclusif',
    olfactoryFamily: 'Woody & Oud',
    concentration: 'Extrait De Parfum (35% Oil Concentration)',
    description: 'Silver Legend captures the thrilling purity of crystalline Alpine meltwater cascading over snowy silver rocks. Bergamot, mandarin, green tea, and blackcurrant bud rest upon an ethereal bed of clean white musk.',
    shortDescription: 'Frosted green tea, blackcurrant bud, silver birch, and ethereal musk.',
    notes: {
      top: ['Bergamot', 'Mandarin Orange'],
      middle: ['Green Tea Accord', 'Blackcurrant Bud', 'Iris'],
      base: ['White Musk', 'Sandalwood', 'Galbanum', 'Petitgrain']
    },
    longevity: '14-18+ Hours',
    sillage: 'Heavy',
    season: 'Spring / Summer / Daytime',
    occasion: 'Sophisticated Daily Wear, Golf Club, Luxury Brunches',
    images: [
      'https://images.unsplash.com/photo-1588405748480-1cf414c89329?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=900&q=80'
    ],
    variants: [
      { id: 'sl-50ml', size: '50ml', price: 4899, originalPrice: 6200, inStock: true, sku: 'MK-SL-50' },
      { id: 'sl-100ml', size: '100ml', price: 7499, originalPrice: 9499, inStock: true, sku: 'MK-SL-100' }
    ],
    rating: 4.9,
    reviewCount: 47,
    isBestseller: true,
    isFeatured: true,
    onSale: true
  },
  {
    id: 'mehkavi-dm-008',
    name: 'Dark Musk',
    slug: 'dark-musk',
    tagline: 'Midnight crushed pepper, dark velvety musk, and smoked Tuscan leather.',
    inspiredBy: 'Impression of Tom Ford Noir de Noir',
    inspiredBrand: 'Tom Ford',
    gender: 'Men',
    classification: 'Prive',
    olfactoryFamily: 'Oriental & Spicy',
    concentration: 'Extrait De Parfum (35% Oil Concentration)',
    description: 'Dark Musk is an intoxicating noir seduction. Spicy black pepper and nutmeg intertwine with dark animalic musk, black rose, smoked leather, and earthy Indonesian patchouli.',
    shortDescription: 'Black pepper, midnight musk, black rose, and smoked leather.',
    notes: {
      top: ['Black Pepper', 'Nutmeg', 'Coriander'],
      middle: ['Midnight Musk', 'Black Rose', 'Smoked Incense'],
      base: ['Tuscan Leather', 'Patchouli', 'Dark Amber', 'Vanilla']
    },
    longevity: '14-18+ Hours',
    sillage: 'Enormous',
    season: 'Autumn / Winter / Clubbing & Nights',
    occasion: 'Intimate Dates, Nightlife, Statement Evenings',
    images: [
      'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=80'
    ],
    variants: [
      { id: 'dm-50ml', size: '50ml', price: 4399, originalPrice: 5200, inStock: true, sku: 'MK-DM-50' },
      { id: 'dm-100ml', size: '100ml', price: 6799, originalPrice: 7999, inStock: true, sku: 'MK-DM-100' }
    ],
    rating: 4.8,
    reviewCount: 98,
    isBestseller: true,
    isFeatured: true,
    onSale: true
  },
  {
    id: 'mehkavi-001',
    name: 'Fearless Prince',
    slug: 'fearless-prince',
    tagline: 'An intoxicating clash of fresh mint, candied apple, and creamy tonka bean.',
    inspiredBy: 'Impression of Versace Eros',
    inspiredBrand: 'Versace',
    gender: 'Men',
    classification: 'Signature',
    olfactoryFamily: 'Oriental & Spicy',
    concentration: 'Extrait De Parfum (35% Oil Concentration)',
    description: 'Fearless Prince is MEHKAVI’s acclaimed impression of Versace Eros. Formulated as a potent Extrait De Parfum with an assertive 35% pure oil concentration, it opens with radiant mint leaves, vibrant Italian lemon zest, and crisp green apple. The heart reveals warm Venezuelan tonka bean, ambergris accords, and geranium flower, settling into a rich trail of Virginian cedarwood, Atlas cedar, vetiver, and sensual vanilla.',
    shortDescription: 'Luminous mint zest, green apple, tonka bean, and Madagascan vanilla.',
    notes: {
      top: ['Mint Leaves', 'Italian Lemon Zest', 'Green Apple'],
      middle: ['Tonka Bean', 'Ambroxan', 'Geranium Flower'],
      base: ['Madagascar Vanilla', 'Virginian Cedar', 'Atlas Cedar', 'Vetiver']
    },
    longevity: '14-18+ Hours',
    sillage: 'Heavy',
    season: 'Fall / Winter / Clubbing & Evenings',
    occasion: 'Evening Out, Parties, Bold Signature Wear',
    images: [
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=900&q=80'
    ],
    variants: [
      { id: 'fp-5ml', size: '5ML Travel Spray', price: 450, originalPrice: 550, inStock: true, sku: 'MK-FP-05' },
      { id: 'fp-50ml', size: '50ML Extrait', price: 2950, originalPrice: 3500, inStock: true, sku: 'MK-FP-50' },
      { id: 'fp-100ml', size: '100ML Grand Extrait', price: 5450, originalPrice: 6200, inStock: true, sku: 'MK-FP-100' }
    ],
    rating: 4.9,
    reviewCount: 142,
    isBestseller: true,
    isFeatured: true,
    onSale: true,
    reviews: [
      {
        id: 'rev-01',
        author: 'Hamza Tariq',
        rating: 5,
        date: 'October 14, 2026',
        title: 'Unbelievable longevity and projection!',
        comment: 'I sprayed Fearless Prince at 8 AM for an event, and even after 12 hours people kept complimenting the vanilla-mint drydown. Better projection than the original reformulated designer bottle.',
        verifiedPurchase: true,
        location: 'Lahore, Pakistan'
      },
      {
        id: 'rev-02',
        author: 'Bilal Siddiqui',
        rating: 5,
        date: 'September 28, 2026',
        title: 'A true party beast',
        comment: 'Spot-on impression of Eros with much thicker oil density. The bottle presentation and magnetic-feel cap are truly luxury.',
        verifiedPurchase: true,
        location: 'Karachi, Pakistan'
      }
    ]
  },
  {
    id: 'mehkavi-002',
    name: 'Fantasy World',
    slug: 'fantasy-world',
    tagline: 'Sun-drenched Calabrian bergamot infused with smoky Chinese black tea and pure ambroxan.',
    inspiredBy: 'Impression of Louis Vuitton Imagination',
    inspiredBrand: 'Louis Vuitton',
    gender: 'Unisex',
    classification: 'Exclusif',
    olfactoryFamily: 'Fresh Citrus',
    concentration: 'Extrait De Parfum (35% Oil Concentration)',
    description: 'Fantasy World is an aristocratic summer masterpiece capturing the sheer elegance of Louis Vuitton Imagination. Handcrafted with sparkling Calabrian bergamot, Sicilian orange, and Tunisian neroli, delicately blended with precious black tea from Fujian, Nigerian ginger, and a massive dose of crystal ambroxan. Clean, wealthy, and mesmerizingly refreshing.',
    shortDescription: 'Calabrian bergamot, sparkling neroli, Chinese black tea, and ambroxan.',
    notes: {
      top: ['Calabrian Bergamot', 'Sicilian Orange', 'Citron'],
      middle: ['Nigerian Ginger', 'Tunisian Neroli', 'Ceylon Cinnamon'],
      base: ['Chinese Black Tea', 'Ambroxan', 'Guaiac Wood', 'Olibanum']
    },
    longevity: '14-18+ Hours',
    sillage: 'Heavy',
    season: 'Spring / Summer / Hot Climates',
    occasion: 'Boardrooms, Luxury Resorts, Daily Sophistication',
    images: [
      'https://images.unsplash.com/photo-1588405748480-1cf414c89329?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=80'
    ],
    variants: [
      { id: 'fw-5ml', size: '5ML Travel Spray', price: 950, originalPrice: 1100, inStock: true, sku: 'MK-FW-05' },
      { id: 'fw-50ml', size: '50ML Extrait', price: 4850, originalPrice: 5600, inStock: true, sku: 'MK-FW-50' },
      { id: 'fw-100ml', size: '100ML Grand Extrait', price: 8950, originalPrice: 10500, inStock: true, sku: 'MK-FW-100' }
    ],
    rating: 5.0,
    reviewCount: 98,
    isBestseller: true,
    isNewArrival: true,
    isFeatured: true,
    onSale: true,
    reviews: [
      {
        id: 'rev-03',
        author: 'Dr. Shahmeer Khan',
        rating: 5,
        date: 'October 21, 2026',
        title: 'Masterclass in citrus and black tea',
        comment: 'I own the authentic LV Imagination ($340 bottle) and side by side on skin, Fantasy World stays even longer in Karachi heat. The tea note is exquisitely realistic.',
        verifiedPurchase: true,
        location: 'Islamabad, Pakistan'
      }
    ]
  },
  {
    id: 'mehkavi-003',
    name: 'Ace of Heart',
    slug: 'ace-of-heart',
    tagline: 'Opulent bitter almond, Egyptian grandiflorum jasmine, and warm ambergris.',
    inspiredBy: 'Impression of Baccarat Rouge 540 Extrait',
    inspiredBrand: 'Maison Francis Kurkdjian',
    gender: 'Unisex',
    classification: 'Prive',
    olfactoryFamily: 'Oriental & Spicy',
    concentration: 'Extrait De Parfum (35% Oil Concentration)',
    description: 'Ace of Heart is MEHKAVI’s iconic, royal interpretation of MFK Baccarat Rouge 540 Extrait de Parfum. Featuring Morocco bitter almond, saffron, radiating Egyptian jasmine petals, ambergris, and a woody musk base that projects an aura of sheer affluence and royalty.',
    shortDescription: 'Moroccan bitter almond, saffron, red crystal ambergris, and cedarwood.',
    notes: {
      top: ['Bitter Almond', 'Saffron'],
      middle: ['Egyptian Jasmine', 'Cedar'],
      base: ['Ambergris', 'Woody Accords', 'Musk']
    },
    longevity: '14-18+ Hours',
    sillage: 'Enormous',
    season: 'All Year Round / Special Occasions',
    occasion: 'Weddings, Black Tie Events, High Profile Gatherings',
    images: [
      'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=80'
    ],
    variants: [
      { id: 'aoh-5ml', size: '5ML Travel Spray', price: 924, originalPrice: 1100, inStock: true, sku: 'MK-AOH-05' },
      { id: 'aoh-50ml', size: '50ML Extrait', price: 5450, originalPrice: 6500, inStock: true, sku: 'MK-AOH-50' },
      { id: 'aoh-100ml', size: '100ML Grand Extrait', price: 9800, originalPrice: 11900, inStock: true, sku: 'MK-AOH-100' }
    ],
    rating: 4.9,
    reviewCount: 215,
    isBestseller: true,
    isFeatured: true,
    onSale: true,
    reviews: [
      {
        id: 'rev-04',
        author: 'Zainab Qureshi',
        rating: 5,
        date: 'October 11, 2026',
        title: 'Luxurious scent trail that turns heads',
        comment: 'Every single wedding I wear Ace of Heart to, at least 4 women ask me what perfume I have on. Simply spellbinding.',
        verifiedPurchase: true,
        location: 'Rawalpindi, Pakistan'
      }
    ]
  },
  {
    id: 'mehkavi-004',
    name: 'Wild Sparkle',
    slug: 'wild-sparkle',
    tagline: 'Radiant Calabrian bergamot, crackling Sichuan pepper, and ambroxan overdrive.',
    inspiredBy: 'Impression of Dior Sauvage',
    inspiredBrand: 'Dior',
    gender: 'Men',
    classification: 'Signature',
    olfactoryFamily: 'Aromatic Aquatic',
    concentration: 'Extrait De Parfum (35% Oil Concentration)',
    description: 'Wild Sparkle is a devastatingly magnetic, masculine signature inspired by Dior Sauvage. Clean, spicy, and fiercely fresh. The top bursts with juicy bergamot and crisp pepper, followed by lavender, pink pepper, and elemi, anchored by an overdose of noble ambroxan and cedar.',
    shortDescription: 'Calabrian bergamot, pink pepper, lavender, and rich ambroxan.',
    notes: {
      top: ['Calabrian Bergamot', 'Pepper'],
      middle: ['Sichuan Pepper', 'Lavender', 'Pink Pepper', 'Vetiver', 'Patchouli'],
      base: ['Ambroxan', 'Cedar', 'Labdanum']
    },
    longevity: '14-18+ Hours',
    sillage: 'Heavy',
    season: 'All Year Round / Everyday Signature',
    occasion: 'Office, Gym, Casual, Date Night',
    images: [
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=80'
    ],
    variants: [
      { id: 'ws-5ml', size: '5ML Travel Spray', price: 420, originalPrice: 500, inStock: true, sku: 'MK-WS-05' },
      { id: 'ws-50ml', size: '50ML Extrait', price: 2850, originalPrice: 3400, inStock: true, sku: 'MK-WS-50' },
      { id: 'ws-100ml', size: '100ML Grand Extrait', price: 5200, originalPrice: 5900, inStock: true, sku: 'MK-WS-100' }
    ],
    rating: 4.8,
    reviewCount: 310,
    isBestseller: true,
    isFeatured: true,
    onSale: true,
    reviews: [
      {
        id: 'rev-05',
        author: 'Usman Ghani',
        rating: 5,
        date: 'October 18, 2026',
        title: 'Compliment magnet for everyday wear',
        comment: 'Fresh, sharp, and very clean. Stays on my clothes until washed.',
        verifiedPurchase: true,
        location: 'Faisalabad, Pakistan'
      }
    ]
  },
  {
    id: 'mehkavi-005',
    name: 'Imperial Wood',
    slug: 'imperial-wood',
    tagline: 'Smoky birch, blackcurrant, French apple, and royal oakmoss.',
    inspiredBy: 'Impression of Creed Aventus',
    inspiredBrand: 'Creed',
    gender: 'Men',
    classification: 'Exclusif',
    olfactoryFamily: 'Woody & Oud',
    concentration: 'Extrait De Parfum (35% Oil Concentration)',
    description: 'Imperial Wood is the quintessential power fragrance, paying tribute to the legendary Creed Aventus batch. Opening with intoxicating pineapple, blackcurrant, and apple, merging into smoky dry birch bark and Moroccan jasmine, finishing on real ambergris and oakmoss.',
    shortDescription: 'Grilled pineapple, blackcurrant, smoky birch, and oakmoss.',
    notes: {
      top: ['Pineapple', 'Bergamot', 'Blackcurrant', 'Apple'],
      middle: ['Smoky Birch', 'Patchouli', 'Moroccan Jasmine', 'Rose'],
      base: ['Musk', 'Oakmoss', 'Ambergris', 'Vanille']
    },
    longevity: '14-18+ Hours',
    sillage: 'Heavy',
    season: 'Spring / Summer / Fall',
    occasion: 'Executive Meetings, Weddings, High Energy Days',
    images: [
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=900&q=80'
    ],
    variants: [
      { id: 'iw-5ml', size: '5ML Travel Spray', price: 750, originalPrice: 900, inStock: true, sku: 'MK-IW-05' },
      { id: 'iw-50ml', size: '50ML Extrait', price: 4250, originalPrice: 5100, inStock: true, sku: 'MK-IW-50' },
      { id: 'iw-100ml', size: '100ML Grand Extrait', price: 7800, originalPrice: 9200, inStock: true, sku: 'MK-IW-100' }
    ],
    rating: 4.9,
    reviewCount: 268,
    isBestseller: true,
    isFeatured: true,
    onSale: false,
    reviews: [
      {
        id: 'rev-06',
        author: 'Saad Farooqi',
        rating: 5,
        date: 'October 02, 2026',
        title: 'Better than the current Aventus bottles',
        comment: 'Current retail Creed Aventus has watered-down longevity. Imperial Wood from MEHKAVI has that old-school fruity smoky punch that lasts whole day.',
        verifiedPurchase: true,
        location: 'Karachi, Pakistan'
      }
    ]
  },
  {
    id: 'mehkavi-006',
    name: 'Desert Rose',
    slug: 'desert-rose',
    tagline: 'Dark agarwood, crimson Taif rose, raspberry, and frankincense.',
    inspiredBy: 'Impression of Louis Vuitton Ombre Nomade',
    inspiredBrand: 'Louis Vuitton',
    gender: 'Unisex',
    classification: 'Prive',
    olfactoryFamily: 'Woody & Oud',
    concentration: 'Extrait De Parfum (35% Oil Concentration)',
    description: 'Desert Rose is an intense oriental odyssey inspired by LV Ombre Nomade. Crafted with deep Cambodian oud, incense smoke, sweet raspberry, rose de Mai, benzoin tears, and saffron. Dark, smoky, rich, and unforgettable.',
    shortDescription: 'Smoky oud wood, raspberry liquor, Bulgarian rose, and incense.',
    notes: {
      top: ['Raspberry', 'Saffron', 'Rose de Mai'],
      middle: ['Frankincense', 'Geranium', 'Benzoin'],
      base: ['Cambodian Oud', 'Birch Tar', 'Leather', 'Amberwood']
    },
    longevity: '14-18+ Hours',
    sillage: 'Enormous',
    season: 'Winter / Cold Weather / Evenings',
    occasion: 'Luxury Gala, Winter Nights, Ceremonies',
    images: [
      'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1588405748480-1cf414c89329?auto=format&fit=crop&w=900&q=80'
    ],
    variants: [
      { id: 'dr-5ml', size: '5ML Travel Spray', price: 950, originalPrice: 1100, inStock: true, sku: 'MK-DR-05' },
      { id: 'dr-50ml', size: '50ML Extrait', price: 5450, originalPrice: 6200, inStock: true, sku: 'MK-DR-50' },
      { id: 'dr-100ml', size: '100ML Grand Extrait', price: 9800, originalPrice: 11500, inStock: true, sku: 'MK-DR-100' }
    ],
    rating: 5.0,
    reviewCount: 84,
    isBestseller: true,
    isFeatured: true,
    onSale: true,
    reviews: [
      {
        id: 'rev-07',
        author: 'Omer Al-Khatib',
        rating: 5,
        date: 'October 19, 2026',
        title: 'Dark, intoxicating luxury',
        comment: 'The oud and raspberry combo is pure royalty. Literally 2 sprays last through the next morning.',
        verifiedPurchase: true,
        location: 'Peshawar, Pakistan'
      }
    ]
  },
  {
    id: 'mehkavi-007',
    name: 'Sovereign Oak',
    slug: 'sovereign-oak',
    tagline: 'Cognac essence, warm cinnamon bark, tonka bean, and oakwood cask.',
    inspiredBy: "Impression of Kilian Angels' Share",
    inspiredBrand: 'Kilian',
    gender: 'Unisex',
    classification: 'Prive',
    olfactoryFamily: 'Oriental & Spicy',
    concentration: 'Extrait De Parfum (35% Oil Concentration)',
    description: 'Sovereign Oak channels the boozy warmth of aged French cognac poured into toasted oak barrels. Enriched with cinnamon quill, candied hazelnut, praline, and vanilla liqueur, drying down into creamy sandalwood.',
    shortDescription: 'Aged French cognac, Ceylon cinnamon, praline, and vanilla oak.',
    notes: {
      top: ['Aged Cognac', 'Cinnamon Quill'],
      middle: ['Tonka Bean Absolute', 'Oak Wood', 'Praline'],
      base: ['Bourbon Vanilla', 'Sandalwood', 'Candied Almond']
    },
    longevity: '14-18+ Hours',
    sillage: 'Heavy',
    season: 'Autumn / Winter / Cozy Evenings',
    occasion: 'Intimate Dinners, Winter Gatherings, Date Nights',
    images: [
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=900&q=80'
    ],
    variants: [
      { id: 'so-5ml', size: '5ML Travel Spray', price: 920, originalPrice: 1050, inStock: true, sku: 'MK-SO-05' },
      { id: 'so-50ml', size: '50ML Extrait', price: 4950, originalPrice: 5800, inStock: true, sku: 'MK-SO-50' },
      { id: 'so-100ml', size: '100ML Grand Extrait', price: 8950, originalPrice: 10200, inStock: true, sku: 'MK-SO-100' }
    ],
    rating: 4.9,
    reviewCount: 112,
    isBestseller: true,
    isFeatured: true,
    onSale: false
  },
  {
    id: 'mehkavi-008',
    name: 'Citrus Sovereign',
    slug: 'citrus-sovereign',
    tagline: 'Sparkling ruby grapefruit, rich ambrox, and noble woody facets.',
    inspiredBy: 'Impression of Bvlgari Tygar',
    inspiredBrand: 'Bvlgari',
    gender: 'Men',
    classification: 'Exclusif',
    olfactoryFamily: 'Fresh Citrus',
    concentration: 'Extrait De Parfum (35% Oil Concentration)',
    description: 'Citrus Sovereign is a commanding citrus-ambroxan dynamo inspired by Bvlgari Tygar. Fresh, crystalline grapefruit bursting with vibrant energy, counterbalanced with warm golden woods and velvety ambroxan that lingers relentlessly.',
    shortDescription: 'Burst of pink grapefruit, deep ambrox, and golden woods.',
    notes: {
      top: ['Pink Grapefruit', 'Ginger', 'Mandarin'],
      middle: ['Ambroxan', 'Hedione'],
      base: ['Vetiver', 'Patchouli', 'White Musk']
    },
    longevity: '14-18+ Hours',
    sillage: 'Heavy',
    season: 'Spring / Summer / High Heat',
    occasion: 'Executive Office, Summer Weddings, Signature Wear',
    images: [
      'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=900&q=80'
    ],
    variants: [
      { id: 'cs-5ml', size: '5ML Travel Spray', price: 850, originalPrice: 1000, inStock: true, sku: 'MK-CS-05' },
      { id: 'cs-50ml', size: '50ML Extrait', price: 4650, originalPrice: 5400, inStock: true, sku: 'MK-CS-50' },
      { id: 'cs-100ml', size: '100ML Grand Extrait', price: 8450, originalPrice: 9800, inStock: true, sku: 'MK-CS-100' }
    ],
    rating: 4.9,
    reviewCount: 88,
    isBestseller: true,
    isFeatured: true,
    onSale: true
  },
  {
    id: 'mehkavi-009',
    name: 'Marine Bleu',
    slug: 'marine-bleu',
    tagline: 'MEHKAVI’s original oceanic creation: Saline sea spray, icy mint, and solar woods.',
    inspiredBy: 'MEHKAVI Original Creation',
    inspiredBrand: 'MEHKAVI Exclusive',
    gender: 'Men',
    classification: 'Own Creations',
    olfactoryFamily: 'Aromatic Aquatic',
    concentration: 'Extrait De Parfum (35% Oil Concentration)',
    description: 'Formulated exclusively in-house by MEHKAVI’s master nose. Marine Bleu represents the pristine waters of the Arabian sea at dawn: crisp oceanic salt, crushed iced mint, solar driftwood, grey amber, and green moss. An invigorating Pakistani original.',
    shortDescription: 'Saline sea salt breeze, crisp mint, solar cedar, and grey amber.',
    notes: {
      top: ['Oceanic Breeze Accord', 'Icy Spearmint', 'Bitter Lemon'],
      middle: ['Rosemary Herb', 'Sea Salt Crystals', 'Aquatic Lotus'],
      base: ['Solar Driftwood', 'Grey Amber', 'Oakmoss', 'Clean Musk']
    },
    longevity: '10-14 Hours',
    sillage: 'Moderate',
    season: 'Spring / Summer',
    occasion: 'Daytime, Coastal Drives, Weekend Escapes',
    images: [
      'https://images.unsplash.com/photo-1588405748480-1cf414c89329?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=80'
    ],
    variants: [
      { id: 'mb-5ml', size: '5ML Travel Spray', price: 480, originalPrice: 600, inStock: true, sku: 'MK-MB-05' },
      { id: 'mb-50ml', size: '50ML Extrait', price: 3250, originalPrice: 3900, inStock: true, sku: 'MK-MB-50' },
      { id: 'mb-100ml', size: '100ML Grand Extrait', price: 5850, originalPrice: 6800, inStock: true, sku: 'MK-MB-100' }
    ],
    rating: 4.8,
    reviewCount: 65,
    isBestseller: false,
    isNewArrival: true,
    isFeatured: true,
    onSale: false
  },
  {
    id: 'mehkavi-010',
    name: 'Velvet Shadow',
    slug: 'velvet-shadow',
    tagline: 'Smoky rare oud wood, Brazilian rosewood, cardamom, and tonka.',
    inspiredBy: 'Impression of Tom Ford Oud Wood',
    inspiredBrand: 'Tom Ford',
    gender: 'Unisex',
    classification: 'Exclusif',
    olfactoryFamily: 'Woody & Oud',
    concentration: 'Extrait De Parfum (35% Oil Concentration)',
    description: 'Velvet Shadow is a silky, mystical blend echoing Tom Ford’s Oud Wood. Rich, exotic rosewood and cardamom give way to a smoky blend of rare oud wood, sandalwood, and vetiver. Tonka bean and amber add warmth and sensuality.',
    shortDescription: 'Exotic rosewood, cardamom spice, rare smoky oud, and tonka bean.',
    notes: {
      top: ['Cardamom', 'Brazilian Rosewood', 'Chinese Pepper'],
      middle: ['Oud Wood', 'Sandalwood', 'Vetiver'],
      base: ['Tonka Bean', 'Vanilla', 'Golden Amber']
    },
    longevity: '14-18+ Hours',
    sillage: 'Moderate',
    season: 'Autumn / Winter / All Year Evening',
    occasion: 'Executive Evenings, Formal Dinners, Sophisticated Gatherings',
    images: [
      'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=80'
    ],
    variants: [
      { id: 'vs-5ml', size: '5ML Travel Spray', price: 850, originalPrice: 950, inStock: true, sku: 'MK-VS-05' },
      { id: 'vs-50ml', size: '50ML Extrait', price: 4650, originalPrice: 5300, inStock: true, sku: 'MK-VS-50' },
      { id: 'vs-100ml', size: '100ML Grand Extrait', price: 8250, originalPrice: 9500, inStock: true, sku: 'MK-VS-100' }
    ],
    rating: 4.8,
    reviewCount: 94,
    isBestseller: true,
    isFeatured: false,
    onSale: true
  },
  {
    id: 'mehkavi-011',
    name: 'Crimson Kiss',
    slug: 'crimson-kiss',
    tagline: 'Luscious black cherry liqueur, bitter almond, Turkish rose, and Peru balsam.',
    inspiredBy: 'Impression of Tom Ford Lost Cherry',
    inspiredBrand: 'Tom Ford',
    gender: 'Women',
    classification: 'Exclusif',
    olfactoryFamily: 'Floral & Gourmand',
    concentration: 'Extrait De Parfum (35% Oil Concentration)',
    description: 'Crimson Kiss is a luscious, seductive gourmand journey echoing Tom Ford Lost Cherry. Ripe black cherries dripping in cherry liqueur, touched with roasted bitter almond, velvety Turkish rose, and Peru balsam with roasted tonka.',
    shortDescription: 'Black cherry liqueur, bitter almond, Turkish rose, and Peru balsam.',
    notes: {
      top: ['Black Cherry', 'Cherry Liqueur', 'Bitter Almond'],
      middle: ['Sour Cherry Syrup', 'Turkish Rose', 'Jasmine Sambac'],
      base: ['Peru Balsam', 'Roasted Tonka Bean', 'Sandalwood', 'Cedar', 'Vetiver']
    },
    longevity: '14-18+ Hours',
    sillage: 'Heavy',
    season: 'Autumn / Winter / Date Nights',
    occasion: 'Romantic Evenings, Celebrations, Luxury Parties',
    images: [
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=900&q=80'
    ],
    variants: [
      { id: 'ck-5ml', size: '5ML Travel Spray', price: 890, originalPrice: 1050, inStock: true, sku: 'MK-CK-05' },
      { id: 'ck-50ml', size: '50ML Extrait', price: 4950, originalPrice: 5800, inStock: true, sku: 'MK-CK-50' },
      { id: 'ck-100ml', size: '100ML Grand Extrait', price: 8950, originalPrice: 10500, inStock: true, sku: 'MK-CK-100' }
    ],
    rating: 4.9,
    reviewCount: 76,
    isBestseller: true,
    isFeatured: true,
    onSale: true
  },
  {
    id: 'mehkavi-012',
    name: 'Royal Pegasus',
    slug: 'royal-pegasus',
    tagline: 'Crisp green apple, lavender, wild vanilla, and cardamom intrigue.',
    inspiredBy: 'Impression of Parfums de Marly Layton',
    inspiredBrand: 'Parfums de Marly',
    gender: 'Men',
    classification: 'Prive',
    olfactoryFamily: 'Oriental & Spicy',
    concentration: 'Extrait De Parfum (35% Oil Concentration)',
    description: 'Royal Pegasus is a decadent, royal fougère-oriental composition inspired by Parfums de Marly Layton. Bursting with tart green apple, mandarin, and lavender, followed by geranium and violet, resting on a sumptuous bed of vanilla, caramelized pepper, and guaiac wood.',
    shortDescription: 'Crisp green apple, lavender blossom, warm vanilla, and caramelized pepper.',
    notes: {
      top: ['Green Apple', 'Lavender', 'Mandarin Orange', 'Bergamot'],
      middle: ['Geranium', 'Violet', 'Jasmine'],
      base: ['Bourbon Vanilla', 'Cardamom', 'Sandalwood', 'Guaiac Wood', 'Pink Pepper']
    },
    longevity: '14-18+ Hours',
    sillage: 'Heavy',
    season: 'Autumn / Winter / Spring',
    occasion: 'Weddings, Formal Dinners, Signature Evenings',
    images: [
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=80'
    ],
    variants: [
      { id: 'rp-5ml', size: '5ML Travel Spray', price: 880, originalPrice: 1050, inStock: true, sku: 'MK-RP-05' },
      { id: 'rp-50ml', size: '50ML Extrait', price: 4850, originalPrice: 5600, inStock: true, sku: 'MK-RP-50' },
      { id: 'rp-100ml', size: '100ML Grand Extrait', price: 8750, originalPrice: 10200, inStock: true, sku: 'MK-RP-100' }
    ],
    rating: 4.9,
    reviewCount: 133,
    isBestseller: true,
    isFeatured: true,
    onSale: false
  },
  {
    id: 'mehkavi-013',
    name: 'Celestial Amber',
    slug: 'celestial-amber',
    tagline: 'Warm Spanish labdanum, Siamese benzoin, Brazilian tonka, and golden vanilla.',
    inspiredBy: 'Impression of MFK Grand Soir',
    inspiredBrand: 'Maison Francis Kurkdjian',
    gender: 'Unisex',
    classification: 'Prive',
    olfactoryFamily: 'Oriental & Spicy',
    concentration: 'Extrait De Parfum (35% Oil Concentration)',
    description: 'Celestial Amber captures the golden glow of Parisian evening architecture. Sensual Siamese benzoin resin, Spanish cistus labdanum, Brazilian tonka beans, and glowing deep amber accords create an enveloping cocoon of supreme comfort and elegance.',
    shortDescription: 'Golden amber resin, Siamese benzoin, Spanish labdanum, and creamy vanilla.',
    notes: {
      top: ['Spanish Labdanum', 'Orange Blossom'],
      middle: ['Siamese Benzoin Resin', 'Brazilian Tonka Bean'],
      base: ['Amber Accords', 'Vanilla Caviar', 'Cedarwood']
    },
    longevity: '14-18+ Hours',
    sillage: 'Heavy',
    season: 'Autumn / Winter / Evening Warmth',
    occasion: 'Formal Galas, Candlelight Dinners, Cozy Luxury',
    images: [
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=900&q=80'
    ],
    variants: [
      { id: 'ca-5ml', size: '5ML Travel Spray', price: 920, originalPrice: 1100, inStock: true, sku: 'MK-CA-05' },
      { id: 'ca-50ml', size: '50ML Extrait', price: 5200, originalPrice: 6100, inStock: true, sku: 'MK-CA-50' },
      { id: 'ca-100ml', size: '100ML Grand Extrait', price: 9400, originalPrice: 11000, inStock: true, sku: 'MK-CA-100' }
    ],
    rating: 5.0,
    reviewCount: 47,
    isBestseller: false,
    isFeatured: true,
    onSale: true
  },
  {
    id: 'mehkavi-014',
    name: 'Bombastic',
    slug: 'bombastic',
    tagline: 'Explosive cinnamon, black pepper, bourbon vanilla, and cured tobacco.',
    inspiredBy: 'Impression of Viktor&Rolf Spicebomb Extreme',
    inspiredBrand: 'Viktor&Rolf',
    gender: 'Men',
    classification: 'Signature',
    olfactoryFamily: 'Leather & Tobacco',
    concentration: 'Extrait De Parfum (35% Oil Concentration)',
    description: 'Bombastic is an explosive, addictive firestorm of heat and spices. Infused with piquant black pepper, pimento berry, cinnamon, toasted cumin, cured tobacco leaves, and bourbon vanilla.',
    shortDescription: 'Black pepper, fiery cinnamon, cured tobacco leaf, and bourbon vanilla.',
    notes: {
      top: ['Black Pepper', 'Pimento Berry', 'Grapefruit'],
      middle: ['Cinnamon Quill', 'Saffron', 'Cumin'],
      base: ['Cured Tobacco Leaf', 'Bourbon Vanilla', 'Amber']
    },
    longevity: '14-18+ Hours',
    sillage: 'Enormous',
    season: 'Winter / Late Autumn Nights',
    occasion: 'Cold Weather, Night Gatherings, Bold Statements',
    images: [
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=80'
    ],
    variants: [
      { id: 'bm-5ml', size: '5ML Travel Spray', price: 725, originalPrice: 850, inStock: true, sku: 'MK-BM-05' },
      { id: 'bm-50ml', size: '50ML Extrait', price: 3950, originalPrice: 4800, inStock: true, sku: 'MK-BM-50' },
      { id: 'bm-100ml', size: '100ML Grand Extrait', price: 6950, originalPrice: 8200, inStock: true, sku: 'MK-BM-100' }
    ],
    rating: 4.8,
    reviewCount: 110,
    isBestseller: true,
    isFeatured: false,
    onSale: true
  },
  {
    id: 'mehkavi-015',
    name: 'Pure Oud Al Malaki',
    slug: 'pure-oud-al-malaki-attar',
    tagline: 'Artisanal 100% concentrated pure perfume oil without alcohol.',
    inspiredBy: 'Traditional Royal Arabian Blend',
    inspiredBrand: 'MEHKAVI Exclusive',
    gender: 'Unisex',
    classification: 'Attar Collection',
    olfactoryFamily: 'Woody & Oud',
    concentration: '100% Pure Perfume Oil (Alcohol-Free)',
    description: 'Distilled with high-grade aged Cambodian and Indian agarwood, royal Taif rose, ambergris, and sweet musk. Presented in a luxury crystal dip-stick bottle with gold ornate filigree. One single swipe on pulse points projects for 24+ hours.',
    shortDescription: 'Aged Cambodian agarwood, Taif rose, sweet musk, and golden amber.',
    notes: {
      top: ['Taif Rose', 'Saffron Threads'],
      middle: ['Aged Dehn Al Oud', 'Frankincense'],
      base: ['Royal Musk', 'Dark Ambergris', 'Cedarwood']
    },
    longevity: '14-18+ Hours',
    sillage: 'Heavy',
    season: 'All Year Round / Spiritual & Celebratory',
    occasion: 'Jummah Prayers, Eid, Weddings, Spiritual Moments',
    images: [
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=900&q=80'
    ],
    variants: [
      { id: 'attar-6ml', size: '6ML Crystal Bottle', price: 2450, originalPrice: 2900, inStock: true, sku: 'MK-OAM-06' },
      { id: 'attar-12ml', size: '12ML Grand Crystal Bottle', price: 4250, originalPrice: 5000, inStock: true, sku: 'MK-OAM-12' }
    ],
    rating: 5.0,
    reviewCount: 52,
    isBestseller: true,
    isFeatured: true,
    onSale: true
  },
  {
    id: 'mehkavi-016',
    name: 'Royal Musk Tahara',
    slug: 'royal-musk-tahara-attar',
    tagline: 'Thick, creamy, pristine white musk for pure cleanliness and calm.',
    inspiredBy: 'Traditional White Musk Ritual',
    inspiredBrand: 'MEHKAVI Exclusive',
    gender: 'Unisex',
    classification: 'Attar Collection',
    olfactoryFamily: 'Floral & Gourmand',
    concentration: '100% Pure Perfume Oil (Alcohol-Free)',
    description: 'Thick, velvety, and snowy white. Musk Tahara is famous for its unmatched freshness, powdery floral accords, lily of the valley, and soothing creamy white musk. Intimate, calming, and deeply skin-friendly.',
    shortDescription: 'Creamy white musk, fresh lily, violet petals, and soft powdery notes.',
    notes: {
      top: ['Fresh Lily of the Valley', 'White Lotus'],
      middle: ['Violet Petals', 'Powdery Accords'],
      base: ['Pure White Musk', 'Vanilla Cream', 'Soft Amber']
    },
    longevity: '14-18+ Hours',
    sillage: 'Moderate',
    season: 'All Year Round',
    occasion: 'Daily Freshness, After Shower, Intimate Wear',
    images: [
      'https://images.unsplash.com/photo-1588405748480-1cf414c89329?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=900&q=80'
    ],
    variants: [
      { id: 'tahara-6ml', size: '6ML Crystal Bottle', price: 1650, originalPrice: 1950, inStock: true, sku: 'MK-RMT-06' },
      { id: 'tahara-12ml', size: '12ML Grand Crystal Bottle', price: 2850, originalPrice: 3400, inStock: true, sku: 'MK-RMT-12' }
    ],
    rating: 4.9,
    reviewCount: 78,
    isBestseller: true,
    isFeatured: false,
    onSale: false
  },
  {
    id: 'mehkavi-017',
    name: 'Amber Noir Scented Candle',
    slug: 'amber-noir-candle',
    tagline: '100% Pure Soy Wax Candle with 65+ Hours of Luxury Fragrance Throw.',
    inspiredBy: 'Artisanal Home Fragrance',
    inspiredBrand: 'MEHKAVI Exclusive',
    gender: 'Unisex',
    classification: 'Candles',
    olfactoryFamily: 'Oriental & Spicy',
    concentration: 'Natural Soy Wax & Essential Perfume Oils',
    description: 'Infuse your living space with the hypnotic ambiance of amber resin, velvet patchouli, sandalwood, and sweet Madagascar vanilla. Hand-poured in a matte black ceramic vessel with a natural crackling wooden wick.',
    shortDescription: 'Rich amber resin, French patchouli, sandalwood, and crackling wood wick.',
    notes: {
      top: ['Mandarin Peel', 'Bergamot'],
      middle: ['Amber Resin', 'Cinnamon Bark'],
      base: ['Patchouli', 'Dark Sandalwood', 'Vanilla Bean']
    },
    longevity: '14-18+ Hours',
    sillage: 'Heavy',
    season: 'All Year Round',
    occasion: 'Living Room, Study, Bedside Relaxation',
    images: [
      'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=900&q=80'
    ],
    variants: [
      { id: 'can-300g', size: '300g Matte Ceramic Jar (65h Burn)', price: 3450, originalPrice: 4200, inStock: true, sku: 'MK-CND-AN' }
    ],
    rating: 4.9,
    reviewCount: 39,
    isBestseller: false,
    isFeatured: true,
    onSale: true
  },
  {
    id: 'mehkavi-018',
    name: 'Discovery Set (5 x 5ML)',
    slug: 'discovery-set-5x5ml',
    tagline: 'Experience 5 of MEHKAVI’s most iconic bestsellers before choosing your signature bottle.',
    inspiredBy: 'The Master Collection',
    inspiredBrand: 'MEHKAVI Exclusive',
    gender: 'Unisex',
    classification: 'Bundles',
    olfactoryFamily: 'Woody & Oud',
    concentration: 'Extrait De Parfum (35% Oil Concentration)',
    description: 'The definitive luxury gateway to MEHKAVI. Includes 5 deluxe atomizers (5ml each with 75+ sprays per bottle): 1. Fearless Prince (Versace Eros), 2. Fantasy World (LV Imagination), 3. Ace of Heart (BR540 Extrait), 4. Wild Sparkle (Dior Sauvage), and 5. Imperial Wood (Creed Aventus). Comes with an exclusive Rs. 1,000 voucher towards your next 50ml or 100ml bottle.',
    shortDescription: '5 Deluxe 5ml bottles: Fearless Prince, Fantasy World, Ace of Heart, Wild Sparkle, Imperial Wood.',
    notes: {
      top: ['Citrus', 'Mint', 'Pineapple', 'Bergamot'],
      middle: ['Almond', 'Black Tea', 'Birch Wood', 'Spices'],
      base: ['Ambroxan', 'Ambergris', 'Tonka Bean', 'Cedar']
    },
    longevity: '14-18+ Hours',
    sillage: 'Enormous',
    season: 'All Year Round',
    occasion: 'Gifting, Traveling, Fragrance Exploration',
    images: [
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=80'
    ],
    variants: [
      { id: 'bundle-disc5', size: '5 x 5ML Atomizer Gift Box', price: 3250, originalPrice: 4200, inStock: true, sku: 'MK-BUN-DISC' }
    ],
    rating: 5.0,
    reviewCount: 184,
    isBestseller: true,
    isFeatured: true,
    onSale: true
  },
  {
    id: 'mehkavi-019',
    name: 'Executive Power Duo',
    slug: 'executive-power-duo',
    tagline: 'Two 50ML Grand Extraits: Imperial Wood (Creed Aventus) & Fantasy World (LV Imagination).',
    inspiredBy: 'Alpha Bestsellers Combo',
    inspiredBrand: 'MEHKAVI Exclusive',
    gender: 'Men',
    classification: 'Bundles',
    olfactoryFamily: 'Fresh Citrus',
    concentration: 'Extrait De Parfum (35% Oil Concentration)',
    description: 'Curated for the modern gentleman who commands the room. Receive two full-size 50ML luxury bottles at a special bundled price saving over Rs. 1,800. Perfect pairing for fresh daytime meetings and evening authority.',
    shortDescription: 'Imperial Wood 50ML + Fantasy World 50ML in MEHKAVI magnetic gift packaging.',
    notes: {
      top: ['Pineapple', 'Calabrian Bergamot', 'Sicilian Orange'],
      middle: ['Smoky Birch', 'Black Tea', 'Tunisian Neroli'],
      base: ['Oakmoss', 'Ambroxan', 'Ambergris']
    },
    longevity: '14-18+ Hours',
    sillage: 'Heavy',
    season: 'Spring / Summer / Executive Wear',
    occasion: 'Boardrooms, Weddings, Elite Lifestyle',
    images: [
      'https://images.unsplash.com/photo-1588405748480-1cf414c89329?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=900&q=80'
    ],
    variants: [
      { id: 'bundle-duo-exec', size: '2 x 50ML Luxury Bundle', price: 7950, originalPrice: 9750, inStock: true, sku: 'MK-BUN-EXEC' }
    ],
    rating: 5.0,
    reviewCount: 92,
    isBestseller: true,
    isFeatured: true,
    onSale: true
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    code: 'MEHKAVI10',
    discountPercent: 10,
    description: '10% off on all items across the store',
    active: true
  },
  {
    code: 'LUXURY20',
    discountPercent: 20,
    minSpend: 8000,
    description: '20% off on orders above Rs. 8,000',
    active: true
  },
  {
    code: 'FREESHIP',
    freeShipping: true,
    description: 'Free nationwide express shipping',
    active: true
  }
];
