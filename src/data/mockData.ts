import {
  Product,
  Category,
  BranchLocation,
  BlogPost,
  LiveNotification,
  HeroSlideItem,
  Slide3ShowcaseProduct,
  PeaceOfMindConfig,
  SolarCareConfig,
  BrandItem,
  FaqItem
} from '../types';
import neozl300wPoster from '../assets/images/neozl_300w_poster_1788228244967.jpg';
import gp1000Poster from '../assets/images/gp_1000_poster_1788228264628.jpg';
import gp600Poster from '../assets/images/gp_600_poster_1788228282433.jpg';
import youyoR100Poster from '../assets/images/youyo_r100_poster_1788228300440.jpg';
import neo600lPoster from '../assets/images/neo_600l_poster_1788228320164.jpg';
import solarYellowBlackPoster1 from '../assets/images/solar_yellow_black_poster1_1788580321943.jpg';
import solarYellowBlackPoster2 from '../assets/images/solar_yellow_black_poster2_1788580344764.jpg';
import solarYellowBlackPoster3 from '../assets/images/solar_yellow_black_poster3_1788580360991.jpg';
import flagshipSolarArray from '../assets/images/flagship_solar_array_1788247199655.jpg';
import rooftopSolarHome from '../assets/images/rooftop_solar_home_1788246756735.jpg';
import familySolarLiving from '../assets/images/family_solar_living_1788246770378.jpg';
import travelPortableSolar from '../assets/images/travel_portable_solar_1788246785319.jpg';
import brightSolarShowcase from '../assets/images/bright_solar_products_showcase_1788316402828.jpg';
import brightSolarBattery from '../assets/images/bright_solar_inverter_battery_1788316424489.jpg';

export const CATEGORIES: Category[] = [
  {
    id: 'ips-systems',
    name: 'IPS & UPS',
    icon: 'Zap',
    image: '',
    itemCount: 57,
    subCategories: ['Portable Power Station', 'Pure Sine Wave IPS', 'Solar Hybrid IPS', 'Home Office UPS', 'Digital Smart IPS', 'Heavy Duty Sine Wave', 'Industrial 3-Phase IPS']
  },
  {
    id: 'hybrid-inverters',
    name: 'Solar Inverter',
    icon: 'Cpu',
    image: '',
    itemCount: 36,
    subCategories: ['Growatt Hybrid Series', 'Deye High Voltage', 'Huawei SUN2000', 'Solis On-Grid & Hybrid', 'SMA Sunny Boy', 'Voltronic Axpert']
  },
  {
    id: 'lithium-batteries',
    name: 'Lithium Phosphate',
    icon: 'BatteryCharging',
    image: '',
    itemCount: 34,
    subCategories: ['Portable Solar Generator', '48V 100Ah LiFePO4', '51.2V 200Ah Powerwall', '24V Lithium Energy Pack', '12V 100Ah Solar Lithium', 'Rack Mount Storage']
  },
  {
    id: 'monitor-screen',
    name: 'Monitor Screen',
    icon: 'Radio',
    image: '',
    itemCount: 16,
    subCategories: ['Smart Solar LCD Display', 'WiFi Energy Data Logger', 'Digital Power Meter CT', 'RS485 Modbus Dashboard', 'IoT Remote Sizing Monitor']
  },
  {
    id: 'solar-panels',
    name: 'Solar Panels',
    icon: 'Sun',
    image: '',
    itemCount: 48,
    subCategories: ['Mono PERC Panels', 'Bifacial Solar Panels', 'Flexible Solar Panels', 'Polycrystalline', 'Commercial Solar Modules', 'N-Type TopCon Panels']
  },
  {
    id: 'maintenance-group',
    name: 'Maintenance Group',
    icon: 'Wrench',
    image: '',
    itemCount: 28,
    subCategories: ['Solar Panel Cleaning Kits', 'Digital Clamp Multimeter', 'MC4 Crimping Toolsets', 'Thermal Imaging Inspection', 'Battery Hydrometer & Testers']
  },
  {
    id: 'tubular-batteries',
    name: 'Tubular Battery',
    icon: 'Battery',
    image: '',
    itemCount: 42,
    subCategories: ['Tall Tubular 200Ah', 'Short Tubular 150Ah', 'Deep Cycle Solar Gel', 'Maintenance Free AGM', 'Heavy Duty Inverter Battery']
  },
  {
    id: 'charge-controllers',
    name: 'Charge Controller',
    icon: 'Sliders',
    image: '',
    itemCount: 24,
    subCategories: ['MPPT 60A Smart Controller', 'MPPT 100A High Voltage', 'PWM 30A Auto Switch', 'Solar Dual Battery Controller', 'Bluetooth Remote Tracker']
  },
  {
    id: 'solar-pumps',
    name: 'Solar Pumps',
    icon: 'Droplets',
    image: '',
    itemCount: 15,
    subCategories: ['DC Submersible Deep Well Pump', 'Solar Surface Water Pump', 'Agricultural Irrigation VFD', 'Solar Swimming Pool Pump']
  },
  {
    id: 'solar-street-lights',
    name: 'Street Lights',
    icon: 'Lightbulb',
    image: '',
    itemCount: 19,
    subCategories: ['All-In-One Solar Street Light', 'Split Solar Street Light', 'Radar Motion Sensor Lights', 'Highway High-Mast Lights', 'Solar Garden Lights']
  },
  {
    id: 'solar-accessories',
    name: 'DC Accessories',
    icon: 'Wrench',
    image: '',
    itemCount: 65,
    subCategories: ['4mm² / 6mm² Solar DC Cable', 'MC4 Waterproof Connectors', 'DC Surge Protector SPD', 'DC Circuit Breakers (MCCB)', 'Solar Aluminum Mounting Rail', 'Lightning Arrester']
  },
  {
    id: 'solar-structures',
    name: 'Mounting Stand',
    icon: 'Layers',
    image: '',
    itemCount: 31,
    subCategories: ['Rooftop Tilted Aluminum Rack', 'Tin Shed Solar Clamps', 'Ground Mount Heavy Structure', 'Elevated Walkway Solar Stand']
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'prod-solarstock-neozl-300w',
    name: 'SolarStock NEOZL 300W Portable Power Station (192Wh LiFePO4)',
    category: 'ips-systems',
    subCategory: 'Portable Power Station',
    brand: 'SolarStock BD',
    images: [
      neozl300wPoster,
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80'
    ],
    price: 24999,
    originalPrice: 31250,
    discountPercent: 20,
    tag: 'Beat The Clock',
    isHot: true,
    warranty: '2 Years SolarCare+ Official Replacement',
    capacityVariants: ['192Wh LiFePO4 (300W)'],
    voltageVariants: ['AC 220V Pure Sine Wave', 'Type-C PD 45W Fast Charge'],
    colorVariants: [
      { name: 'Graphite Black & Cyber Yellow', hex: '#1E293B' },
      { name: 'Silver Slate', hex: '#64748B' }
    ],
    specs: {
      'Rated AC Output': '300W Pure Sine Wave',
      'Battery Capacity': '192Wh (LiFePO4 Chemistry)',
      'USB-A Outputs': '2x USB-A (Max 18W each)',
      'USB-C Output': '1x USB-C PD (Max 45W)',
      'Net Weight': '~2.5 KG (5.5 LBS)',
      'AC Recharge Time': '~3.7 Hours',
      'Solar Recharge Time': '~3.4 Hours (MPPT Solar Input)',
      'Display Type': 'Multi-function LED/LCD Power Indicator',
      'Safety System': 'BMS Over-voltage, Short Circuit, Thermal Guard',
      'Hotline Support': '+8801306-061919'
    },
    highlights: [
      'SolarStock BD Official "Beat The Clock" 20% Special Discount',
      'Ultra-compact 2.5kg lightweight body with built-in ergonomic carry handle',
      'Safe & long-lasting 192Wh LiFePO4 battery cells with 3000+ cycle life',
      '45W Type-C Power Delivery charges MacBooks, tablets, and smartphones rapidly',
      'Rapid solar recharge in ~3.4 hours with DC/Solar input socket'
    ],
    shortDesc: 'SolarStock NEOZL 300W portable power station with 192Wh LiFePO4 battery, dual 18W USB-A, 45W USB-C PD, and 300W pure sine wave AC socket.',
    description: 'The SolarStock NEOZL 300W is the ultimate portable power companion designed for travel, outdoor camping, and home emergency load-shedding backup. Equipped with high-safety Grade-A LiFePO4 battery cells, it powers laptops, LED lights, mini-fans, Wi-Fi routers, and medical gadgets safely.',
    rating: 4.9,
    reviewsCount: 48,
    minBooking: 2500,
    purchasePoints: 125,
    emiAvailable: '6 Months EMI from ৳4,166/month with 0% interest'
  },
  {
    id: 'prod-solarstock-gp-1000',
    name: 'SolarStock GP 1000 High-Capacity Portable Solar Generator (576Wh LiFePO4)',
    category: 'ips-systems',
    subCategory: 'Portable Power Station',
    brand: 'SolarStock BD',
    images: [
      gp1000Poster,
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80'
    ],
    price: 59999,
    originalPrice: 74999,
    discountPercent: 20,
    tag: 'Top Selling',
    isHot: true,
    warranty: '2 Years SolarCare+ Official Replacement',
    capacityVariants: ['576Wh LiFePO4 (1000W Continuous)'],
    specs: {
      'Rated Output Power': '1000W Pure Sine Wave AC',
      'Battery Capacity': '576Wh (LiFePO4 Chemistry)',
      'USB-A Outputs': '2x USB-A (Max 18W)',
      'USB-C Output': '1x USB-C (Max 18W)',
      'Net Weight': '~18.9 KG (41.7 LBS)',
      'AC Outlet': 'European / Universal High-Amperage AC Socket',
      'DC Output': '12V Car Auxiliary Socket + DC Power Switch',
      'Display': 'Digital Multi-Info Backlit Dashboard',
      'Hotline Support': '+8801306-061919'
    },
    highlights: [
      'Heavy-duty 1000W AC output capable of running refrigerators, desktop PCs, TVs & tools',
      'Large 576Wh LiFePO4 energy reserve with long cycle life',
      '20% Disc limited-time promo from SolarStock BD',
      'Robust all-metal armored housing with rugged top handle',
      'Full multi-layer BMS protection against overload, overheat, and short circuits'
    ],
    shortDesc: 'SolarStock GP 1000 is a heavy-duty 1000W portable solar generator featuring 576Wh LiFePO4 storage, dual USB-A, USB-C, and high-power AC output.',
    description: 'Engineered for uninterrupted power during extended outages and fieldwork, the SolarStock GP 1000 delivers 1000W of reliable pure sine wave AC electricity. Featuring premium LiFePO4 battery chemistry for unmatched safety and longevity.',
    rating: 4.95,
    reviewsCount: 62,
    minBooking: 6000,
    purchasePoints: 300,
    emiAvailable: '12 Months EMI from ৳5,000/month with 0% interest'
  },
  {
    id: 'prod-solarstock-gp-600',
    name: 'SolarStock GP 600 Portable Power Station (576Wh LiFePO4 / 600W AC)',
    category: 'ips-systems',
    subCategory: 'Portable Power Station',
    brand: 'SolarStock BD',
    images: [
      gp600Poster,
      'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80'
    ],
    price: 34999,
    originalPrice: 43750,
    discountPercent: 20,
    tag: 'Hot Product',
    isHot: true,
    warranty: '2 Years SolarCare+ Official Replacement',
    capacityVariants: ['576Wh LiFePO4 (600W Output)'],
    specs: {
      'Rated AC Output': '600W Pure Sine Wave',
      'Battery Capacity': '576Wh (LiFePO4 Chemistry)',
      'USB-A Outputs': '2x USB-A (Max 18W)',
      'USB-C Output': '1x USB-C (Max 18W)',
      'Net Weight': '6.9 KG (15.2 LBS)',
      'Recharge Time (AC)': '~4.7 Hours',
      'Recharge Time (Solar)': '~7.6 Hours',
      'AC Outlets': 'Dual TR AC Outlets',
      'DC Output': '12V DC Socket & Fast Input Port',
      'Hotline Support': '+8801306-061919'
    },
    highlights: [
      'SolarStock BD 20% Discount with Instant SolarCare+ Warranty',
      'Substantial 576Wh capacity at only 6.9kg portable weight',
      'Dual AC outlets for running multiple computers, monitors, and emergency devices',
      'Fast 4.7h AC recharge and MPPT solar charging in 7.6h',
      'Clear digital multi-parameter LCD screen'
    ],
    shortDesc: 'SolarStock GP 600 delivers 600W pure sine wave power with a 576Wh LiFePO4 battery pack, dual AC sockets, and rugged chassis.',
    description: 'The SolarStock GP 600 bridges high energy storage (576Wh) with true portability (6.9kg). Perfect for powering work-from-home setups, medical devices (CPAP), photography gear, and home entertainment during load shedding.',
    rating: 4.88,
    reviewsCount: 54,
    minBooking: 3500,
    purchasePoints: 175,
    emiAvailable: '6 Months EMI from ৳5,833/month'
  },
  {
    id: 'prod-solarstock-youyo-r100',
    name: 'SolarStock YOUYO R100 Ultra-Portable Mini Power Station (89.6Wh LiFePO4)',
    category: 'ips-systems',
    subCategory: 'Portable Power Station',
    brand: 'SolarStock BD',
    images: [
      youyoR100Poster,
      'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=800&q=80'
    ],
    price: 11999,
    originalPrice: 14999,
    discountPercent: 20,
    tag: 'Best Deal',
    isHot: true,
    warranty: '1 Year SolarCare+ Official Replacement',
    capacityVariants: ['89.6Wh LiFePO4 (100W AC Output)'],
    specs: {
      'Rated Output Power': '100W AC Pure Sine Wave',
      'Battery Capacity': '89.6Wh (LiFePO4 Chemistry)',
      'USB-A Outputs': 'USB-A1 (Max 15W), USB-A2 (Max 18W)',
      'USB-C Outputs': 'USB-C1 (Max 15W), USB-C2 (Max 45W PD Fast Charge)',
      'Net Weight': '~1.15 KG (2.54 LBS)',
      'Recharge Time (AC)': '~2.4 Hours',
      'Recharge Time (Solar)': '~2.4 Hours',
      'Carrying Design': 'Reinforced woven carry loop handle',
      'Hotline Support': '+8801306-061919'
    },
    highlights: [
      'SolarStock BD 20% Discount - Only 11,999 BDT',
      'Ultra-featherweight 1.15kg - easily fits in backpack or messenger bag',
      'Dual Type-C ports with 45W PD fast charging for modern laptops and devices',
      'Super-quick 2.4-hour full recharge from wall or solar panel',
      'Intelligent digital display and built-in emergency LED illumination'
    ],
    shortDesc: 'SolarStock YOUYO R100 is an ultra-portable 1.15kg mini power station with 89.6Wh LiFePO4 battery, 45W USB-C PD, dual USB-A, and AC socket.',
    description: 'Pocket-sized yet powerful, the SolarStock YOUYO R100 is designed for mobile professionals, drone pilots, students, and travelers who need reliable power anywhere. Recharges completely in just 2.4 hours.',
    rating: 4.85,
    reviewsCount: 76,
    minBooking: 1200,
    purchasePoints: 60,
    emiAvailable: '3 Months EMI from ৳3,999/month'
  },
  {
    id: 'prod-solarstock-neo-600l',
    name: 'SolarStock NEO 600L Smart Solar Power Station (512Wh LiFePO4 / 600W-1200W Surge)',
    category: 'ips-systems',
    subCategory: 'Portable Power Station',
    brand: 'SolarStock BD',
    images: [
      neo600lPoster,
      'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80'
    ],
    price: 48999,
    originalPrice: 61250,
    discountPercent: 20,
    tag: 'New Arrival',
    isHot: true,
    warranty: '2 Years SolarCare+ Official Replacement',
    capacityVariants: ['512Wh LiFePO4 (600W Continuous / 1200W Surge)'],
    specs: {
      'Continuous Output': '600W Pure Sine Wave',
      'Surge Peak Power': '1200W Surge Power',
      'Battery Capacity': '512Wh (LiFePO4 Chemistry)',
      'Net Weight': '6.6 KG / 14.52 LBS',
      'AC Recharge Time': '~2.0 Hours Super-Fast Charge',
      'Solar Recharge Time': '~3.4 Hours (High Voltage MPPT)',
      'High-Speed Ports': 'USB-C (100W PD), USB-A (18W), USB-C (60W)',
      'Car Socket': '12V 10A Auxiliary Output',
      'Display': 'Color Graphic Smart LCD with Battery Cell Status',
      'Hotline Support': '+8801306-061919'
    },
    highlights: [
      'SolarStock BD 20% OFF Special Launch Offer at 48,999 BDT',
      'Lightning-fast 2.0-hour wall recharge technology',
      'Massive 1200W surge power handling to start high-inductance appliance motors',
      '100W USB-C Power Delivery + 12V Car Auxiliary socket',
      'Sleek graphite design with integrated ambient cyan status bar and sturdy handle'
    ],
    shortDesc: 'SolarStock NEO 600L features 600W continuous / 1200W surge output, 512Wh LiFePO4 battery, 2-hour ultra-fast AC recharge, and 100W USB-C PD.',
    description: 'The SolarStock NEO 600L represents the pinnacle of compact solar generators with its high-density 512Wh LiFePO4 battery and blazing fast 2-hour AC recharging. Ideal for modern households, camping, remote production, and critical home appliances.',
    rating: 4.92,
    reviewsCount: 83,
    minBooking: 5000,
    purchasePoints: 245,
    emiAvailable: '12 Months EMI from ৳4,083/month with 0% interest'
  },
  {
    id: 'prod-growatt-5000es',
    name: 'Growatt SPF 5000ES 5kW Pure Sine Wave Hybrid Solar Inverter',
    category: 'hybrid-inverters',
    subCategory: 'Growatt Hybrid Series',
    brand: 'Growatt',
    images: [
      'https://images.unsplash.com/photo-1558441719-8b489c652790?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'
    ],
    price: 74990,
    originalPrice: 98500,
    discountPercent: 24,
    tag: 'Hot Product',
    isHot: true,
    warranty: '5 Years SolarCare+ Official Replacement',
    capacityVariants: ['3.5kW (24V)', '5.0kW (48V)', '6.0kW (48V)', '10.0kW Parallel'],
    voltageVariants: ['Off-Grid / Hybrid Ready', 'Net-Metering Support', 'Dual MPPT Tracker'],
    colorVariants: [
      { name: 'Solar Frost White', hex: '#FFFFFF' },
      { name: 'Matte Titanium Black', hex: '#1E293B' }
    ],
    specs: {
      'Rated Power': '5000W / 5000VA',
      'AC Voltage': '230VAC ± 5%',
      'Battery Voltage': '48VDC (Lithium / Tubular / AGM)',
      'Max PV Array Power': '6000W',
      'MPPT Voltage Range': '120VDC - 430VDC',
      'Max Solar Charge Current': '100A MPPT',
      'Surge Power': '10000VA',
      'Efficiency': '93.5% Peak',
      'Communication': 'WiFi / GPRS / RS485 / CAN',
      'Parallel Capability': 'Up to 6 units (30kW)'
    },
    highlights: [
      'Pure Sine Wave with Zero Transfer Switch Time (<10ms)',
      'Integrated High-Voltage 100A MPPT Solar Charge Controller',
      'Works with or without battery (Direct Solar-to-Load Mode)',
      'Smart Battery Management (BMS) compatible with LiFePO4 & Tubular',
      'Built-in WiFi remote monitoring mobile app & web portal'
    ],
    shortDesc: 'The #1 best-selling 5kW hybrid solar inverter in Bangladesh. Perfect for whole-home load-shedding backup and heavy appliance loads including 2x 1.5-ton ACs.',
    description: 'Growatt SPF 5000ES is a multifunctional hybrid solar inverter, integrated with an MPPT solar charge controller, a high-frequency pure sine wave inverter, and a UPS function module in one machine. Perfect for off-grid backup power and self-consumption applications. It can operate without battery directly from solar panels during the daytime.',
    rating: 4.9,
    reviewsCount: 142,
    minBooking: 5000,
    purchasePoints: 350,
    emiAvailable: '12 Months EMI from ৳6,249/month with 0% interest',
    bundleOffer: {
      name: 'Installation Pro Bundle (10m 6mm² Solar Cable + 63A DC MCB + 2x MC4 Pairs)',
      originalPrice: 5500,
      offerPrice: 2890,
      saveAmount: 2610
    },
    carePlans: [
      {
        id: 'care-1yr',
        name: 'SolarCare+ Basic 1 Year',
        desc: 'Free on-site diagnostic & lightning surge board repair support',
        price: 2490
      },
      {
        id: 'care-3yr',
        name: 'SolarCare+ Ultimate 3 Years (Recommended)',
        desc: 'Brand new direct unit replacement guarantee + 730 days full priority technician dispatch',
        price: 6890
      }
    ]
  },
  {
    id: 'prod-longi-585w',
    name: 'LONGi Hi-MO 6 Explorer 585W Mono Bifacial Tier-1 Solar Panel',
    category: 'solar-panels',
    subCategory: 'Bifacial Solar Panels',
    brand: 'LONGi Solar',
    images: [
      'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=800&q=80'
    ],
    price: 18490,
    originalPrice: 24500,
    discountPercent: 25,
    tag: 'Top Selling',
    isHot: true,
    warranty: '25 Years Linear Power Output Guarantee',
    capacityVariants: ['550W Mono', '585W Bifacial', '600W Hi-MO 7', '660W Commercial'],
    specs: {
      'Max Power (Pmax)': '585Wp',
      'Module Efficiency': '22.8%',
      'Cell Type': 'HPBC Monocrystalline',
      'Operating Voltage (Vmp)': '44.8V',
      'Operating Current (Imp)': '13.06A',
      'Open Circuit Voltage (Voc)': '53.6V',
      'Short Circuit Current (Isc)': '14.15A',
      'Frame': 'Anodized Aluminum Alloy (Silver/Black)',
      'Dimensions': '2278 × 1134 × 35 mm',
      'Weight': '27.5 kg'
    },
    highlights: [
      'Tier-1 Global #1 solar manufacturer with cutting-edge HPBC cell tech',
      'Up to 25% extra energy generation from rear-side bifacial gain',
      'Superior low-light performance in cloudy, rainy and foggy weather',
      'Anti-PID (Potential Induced Degradation) certified resistant',
      'Heavy snow load (5400 Pa) and wind load (2400 Pa) certified'
    ],
    shortDesc: 'Ultra-high efficiency 585W Monocrystalline Bifacial solar panel from LONGi. Maximum energy harvest even in limited rooftop space.',
    description: 'LONGi Hi-MO 6 Explorer series uses next-generation HPBC cell technology to deliver groundbreaking aesthetic appearance and unmatched efficiency of 22.8%. With high temperature tolerance and rear-side light absorption.',
    rating: 4.9,
    reviewsCount: 88,
    minBooking: 2000,
    purchasePoints: 120,
    emiAvailable: '6 Months EMI from ৳3,081/month'
  },
  {
    id: 'prod-luminous-nxg-1800',
    name: 'Luminous Solar NXG 1800 Pure Sine Wave Smart Solar IPS / UPS',
    category: 'ips-systems',
    subCategory: 'Pure Sine Wave IPS',
    brand: 'Luminous',
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1558441719-8b489c652790?auto=format&fit=crop&w=800&q=80'
    ],
    price: 26990,
    originalPrice: 34500,
    discountPercent: 22,
    tag: 'Hot Product',
    isHot: true,
    warranty: '2 Years Official Luminous Replacement',
    capacityVariants: ['1100VA (12V)', '1500VA (12V)', '1800VA (24V)', '2500VA (24V)'],
    specs: {
      'Capacity': '1500VA / 1200W',
      'Battery Support': '24V (Supports 2x 12V Batteries)',
      'Solar Panel Support': 'Up to 1200Wp Solar Panels',
      'Wave Form': 'Pure Sine Wave (Appliance Safe)',
      'Display': 'Digital LCD with Solar Saving Indicator',
      'ISOT Technology': 'Intelligent Solar Optimization Tech',
      'Switchover': '< 15 ms (UPS Mode Safe for PC/Router)'
    },
    highlights: [
      'Save up to 4 to 6 units of electricity daily with Intelligent Solar Priority',
      'Eco & UPS modes prevent computer rebooting and flickering',
      'Supports all battery types: Tubular, Flat, Gel, and SMF',
      'Short circuit, overload, reverse polarity and deep discharge protection'
    ],
    shortDesc: 'Smart hybrid solar IPS from India’s trusted brand Luminous. Runs fans, lights, LED TVs, refrigerators, and computers with ease.',
    description: 'Luminous Solar NXG 1800 is a high-tech solar home inverter with intelligent solar optimization technology (ISOT) that maximizes solar power usage over grid electricity to lower utility bills while providing reliable 24/7 backup.',
    rating: 4.8,
    reviewsCount: 119,
    minBooking: 3000,
    purchasePoints: 180,
    emiAvailable: '12 Months EMI from ৳2,250/month'
  },
  {
    id: 'prod-felicity-lifepo4-5kwh',
    name: 'Felicity Solar 51.2V 100Ah 5.12kWh LiFePO4 Lithium Wall Battery',
    category: 'lithium-batteries',
    subCategory: '51.2V 200Ah Powerwall',
    brand: 'Felicity Solar',
    images: [
      'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1558441719-8b489c652790?auto=format&fit=crop&w=800&q=80'
    ],
    price: 154990,
    originalPrice: 214990,
    discountPercent: 28,
    tag: 'Hot Product',
    isHot: true,
    warranty: '10 Years Performance Warranty / 6000+ Cycles',
    capacityVariants: ['2.56kWh (25.6V 100Ah)', '5.12kWh (51.2V 100Ah)', '10.24kWh (51.2V 200Ah)'],
    specs: {
      'Nominal Energy': '5.12 kWh',
      'Nominal Voltage': '51.2 V',
      'Capacity': '100 Ah',
      'Cycle Life': '6,000+ Cycles @ 80% DoD',
      'Max Charge Current': '100 A',
      'Max Discharge Current': '100 A',
      'BMS Protection': 'Over-charge, Over-discharge, Temp, Short Circuit',
      'Communication': 'CAN / RS485 / RS232',
      'Weight': '48 kg',
      'Dimensions': '650 × 440 × 178 mm'
    },
    highlights: [
      'Grade-A Lithium Iron Phosphate (LiFePO4) chemistry for maximum safety',
      '15+ Years Lifespan with over 6,000 deep discharge cycles',
      'Intelligent Smart BMS with auto-balancing and protocol matching for Growatt/Deye/Victron',
      'Sleek wall-mounted design with color LCD status indicator',
      'Zero maintenance, zero toxic fumes, zero acid leakage'
    ],
    shortDesc: 'Premium 5.12kWh lithium powerwall battery. Replaces heavy messy tubular batteries with 4x longer life and 98% round-trip efficiency.',
    description: 'Felicity Solar LPBA48100-II lithium iron phosphate battery system is engineered for residential solar energy storage. It features advanced built-in BMS that seamlessly integrates with leading hybrid inverters.',
    rating: 4.95,
    reviewsCount: 64,
    minBooking: 15000,
    purchasePoints: 1000,
    emiAvailable: '24 Months EMI from ৳6,458/month with 0% interest'
  },
  {
    id: 'prod-hamko-tubular-200ah',
    name: 'Hamko Solar Power Deep Cycle 12V 200Ah Tall Tubular Battery',
    category: 'tubular-batteries',
    subCategory: 'Tall Tubular 200Ah',
    brand: 'Hamko',
    images: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'
    ],
    price: 24490,
    originalPrice: 29990,
    discountPercent: 18,
    tag: 'Most Popular',
    isHot: false,
    warranty: '30 Months Full Replacement Warranty',
    capacityVariants: ['130Ah Tubular', '165Ah Tubular', '200Ah Tall Tubular', '230Ah Heavy Duty'],
    specs: {
      'Capacity': '200Ah @ C10 Rating',
      'Voltage': '12V DC',
      'Plate Type': 'Spine Tubular Positive Plate',
      'Electrolyte': 'Low Antimony Alloy / High Acid Volume',
      'Cycle Life': '1,500+ Cycles at 80% DoD',
      'Maintenance': 'Low Maintenance with Float Indicators',
      'Weight': '62 kg'
    },
    highlights: [
      'Specially designed for intense frequent load-shedding conditions',
      'Thick spine tubular plate construction resists corrosion & sulfation',
      'Ceramic vent plugs to minimize acid fume evaporation',
      'Delivers sustained high amperage output without voltage drop'
    ],
    shortDesc: 'Heavy-duty 200Ah solar tubular battery engineered for long backups during extended power cuts.',
    description: 'Hamko Tall Tubular Solar series is built with high-pressure die-cast spines that guarantee defect-free grain structure and exceptional cycle endurance even in hot summer climates.',
    rating: 4.7,
    reviewsCount: 95,
    minBooking: 2500,
    purchasePoints: 150,
    emiAvailable: '6 Months EMI from ৳4,081/month'
  },
  {
    id: 'prod-srne-mppt-60a',
    name: 'SRNE MC4860N15 60A 12V/24V/36V/48V Smart MPPT Solar Controller',
    category: 'charge-controllers',
    subCategory: 'MPPT 60A Smart Controller',
    brand: 'SRNE Solar',
    images: [
      'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80'
    ],
    price: 9490,
    originalPrice: 12500,
    discountPercent: 24,
    tag: 'Hot Product',
    isHot: true,
    warranty: '2 Years Official Warranty',
    capacityVariants: ['30A (100V PV)', '40A (100V PV)', '60A (150V PV)', '100A (200V PV)'],
    specs: {
      'Rated Charge Current': '60A',
      'System Voltage': '12V / 24V / 36V / 48V Auto Detect',
      'Max PV Input Voltage': '150VDC',
      'Max PV Input Power': '3200W (48V System) / 1600W (24V) / 800W (12V)',
      'Tracking Efficiency': '≥ 99.5%',
      'Conversion Efficiency': 'Up to 98%',
      'Battery Support': 'Lithium, Gel, Sealed, Flooded, User Defined'
    },
    highlights: [
      'Ultra-fast tracking speed with peak conversion efficiency > 98%',
      'Multi-stage charging algorithm prolongs battery life',
      'Full electronic protections (PV short, PV reverse, over-charge, over-temp)',
      'Dual fans intelligent heat dissipation'
    ],
    shortDesc: 'High efficiency 60A MPPT solar charge controller with auto-voltage recognition and multi-chemistry battery charging.',
    description: 'SRNE MC series MPPT controller uses leading PowerCatcher tracking technology to extract maximum energy from solar panels under varying temperature and sunshine conditions.',
    rating: 4.85,
    reviewsCount: 52,
    minBooking: 1500,
    purchasePoints: 70,
    emiAvailable: '3 Months EMI from ৳3,163/month'
  },
  {
    id: 'prod-deye-8kw-hybrid',
    name: 'Deye SUN-8K-SG01LP1-EU 8kW Single Phase Low Voltage Hybrid Inverter',
    category: 'hybrid-inverters',
    subCategory: 'Deye High Voltage',
    brand: 'Deye',
    images: [
      'https://images.unsplash.com/photo-1558441719-8b489c652790?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80'
    ],
    price: 139990,
    originalPrice: 175000,
    discountPercent: 20,
    tag: 'Limited Time Offer',
    isHot: true,
    warranty: '5 Years Official Warranty & Net Metering Certified',
    capacityVariants: ['5kW Single Phase', '8kW Single Phase', '12kW Three Phase'],
    specs: {
      'AC Output': '8000W / 8000VA',
      'Battery Voltage': '40 - 60VDC (Low Voltage Safe)',
      'Max PV Input': '10400W',
      'Number of MPPT': '2 Trackers (2+2 Strings)',
      'Generator Support': 'Auto Generator Start & Micro-grid Compatible',
      'Protection Degree': 'IP65 Water & Dust Resistant'
    },
    highlights: [
      'Color touch LCD display with interactive energy flow diagrams',
      'Supports Net Metering with programmable export limitation',
      'Dual MPPT with 97.6% efficiency and 4ms UPS transfer switch',
      'Can store energy from diesel generator or AC grid'
    ],
    shortDesc: 'Top-tier 8kW hybrid inverter from Deye with smart load port, color touch screen, and IP65 weatherproof casing.',
    description: 'Deye 8kW hybrid inverter is designed to optimize energy consumption and independence for residential and light commercial buildings. Compatible with all 48V lithium batteries.',
    rating: 4.92,
    reviewsCount: 41,
    minBooking: 10000,
    purchasePoints: 800,
    emiAvailable: '18 Months EMI from ৳7,777/month'
  },
  {
    id: 'prod-solar-street-light-150w',
    name: 'Solarstock Pro Integrated 150W All-In-One Solar Street Light with Radar Sensor',
    category: 'solar-street-lights',
    subCategory: 'All-In-One Solar Street Light',
    brand: 'Solarstock',
    images: [
      'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=800&q=80'
    ],
    price: 7850,
    originalPrice: 11500,
    discountPercent: 31,
    tag: 'Top Selling',
    isHot: true,
    warranty: '3 Years Replacement Warranty',
    capacityVariants: ['90W Compact', '150W High Lumen', '300W Super Bright', '500W Stadium'],
    specs: {
      'LED Power': '150W Bridgelux USA Chips (18,000 Lumens)',
      'Solar Panel': 'Mono 6V 35W High Efficiency',
      'Battery': 'LiFePO4 3.2V 36,000mAh',
      'Lighting Time': '12 - 15 Hours (3 Rainy Days Backup)',
      'Sensor': 'Microwave Radar Motion Sensor (10-12m distance)',
      'Waterproof': 'IP67 Heavy Weather Resistant'
    },
    highlights: [
      'Integrated solar panel, LiFePO4 battery, and LED driver in one aluminum body',
      'Auto turn-on at dusk, auto turn-off at dawn',
      'Includes wireless remote control with timer & brightness adjustment',
      'Zero wiring required — mount on pole or wall in 5 minutes'
    ],
    shortDesc: 'Commercial grade 150W all-in-one solar street light. Ideal for factories, farmhouses, villages, residential roads, and security perimeters.',
    description: 'Engineered with high lumen Bridgelux LEDs and long-life LiFePO4 battery, this all-in-one solar street light delivers bright illumination with intelligent radar brightness dimming.',
    rating: 4.75,
    reviewsCount: 77,
    minBooking: 1000,
    purchasePoints: 50,
    emiAvailable: '3 Months EMI Available'
  },
  {
    id: 'prod-dc-cable-bundle',
    name: 'Solarstock Premium 6mm² TUV Certified Dual-Core Solar DC Cable (50m Coil)',
    category: 'solar-accessories',
    subCategory: '4mm² / 6mm² Solar DC Cable',
    brand: 'Solarstock',
    images: [
      'https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&w=800&q=80'
    ],
    price: 4890,
    originalPrice: 6500,
    discountPercent: 25,
    tag: 'Hot Product',
    isHot: false,
    warranty: '10 Years UV & Weather Resistance Guarantee',
    capacityVariants: ['4mm² (25m)', '4mm² (50m)', '6mm² (50m)', '10mm² (50m)'],
    specs: {
      'Conductor': 'Tinned Oxygen-Free Copper Wire',
      'Insulation': 'Cross-Linked Polyolefin (XLPO)',
      'Voltage Rating': 'DC 1500V / AC 1000V',
      'Temperature Range': '-40°C to +90°C (+120°C max)',
      'UV Resistance': 'EN 50618 & TUV 2PfG 1169 Certified'
    },
    highlights: [
      'TUV Rheinland certified genuine tinned copper solar wire',
      'Double insulated halogen-free flame retardant jacket',
      'Resistant to UV radiation, ozone, water, and acid-alkali'
    ],
    shortDesc: 'Heavy-duty 6mm² TUV certified solar cable for rooftop and ground mount solar strings.',
    description: 'High-spec solar PV cable specially manufactured for long-term outdoor exposure. Ensures lowest power transmission losses and prevents thermal overheating.',
    rating: 4.9,
    reviewsCount: 114,
    minBooking: 500,
    purchasePoints: 30
  },
  {
    id: 'prod-microtek-solar-max-2550',
    name: 'Microtek Solar MAX 2550 Smart Sine Wave Hybrid Inverter UPS',
    category: 'ips-systems',
    subCategory: 'Solar Hybrid IPS',
    brand: 'Microtek',
    images: [
      'https://images.unsplash.com/photo-1558441719-8b489c652790?auto=format&fit=crop&w=800&q=80'
    ],
    price: 32490,
    originalPrice: 39990,
    discountPercent: 19,
    tag: 'New Arrival',
    isHot: false,
    warranty: '2 Years Manufacturer Warranty',
    capacityVariants: ['1450VA (12V)', '2550VA (24V)', '3550VA (36V)'],
    specs: {
      'Capacity': '2550VA / 2040W',
      'Battery Voltage': '24V DC',
      'Solar Panel Max': '2000Wp',
      'Inbuilt Solar Controller': '50A PWM / MPPT Hybrid',
      'Display': 'Digital Multi-Color LED Status'
    },
    highlights: [
      'DSP based intelligent Pure Sine Wave output',
      'Prioritizes Solar Power > Battery > Grid Electricity to cut electric bill',
      'Bypass switch feature for easy troubleshooting without rewiring'
    ],
    shortDesc: 'Reliable 2550VA hybrid solar UPS designed to run full residential loads including multiple fans, LED TVs, and refrigerator.',
    description: 'Microtek Solar MAX delivers high performance with intelligent load sharing and dual charging modes to maximize solar savings in urban and semi-urban homes.',
    rating: 4.7,
    reviewsCount: 38,
    minBooking: 3000,
    purchasePoints: 200
  },
  {
    id: 'prod-solar-water-pump-2hp',
    name: 'Solarstock Pro 2HP DC Brushless Solar Submersible Deep Well Water Pump',
    category: 'solar-pumps',
    subCategory: 'DC Submersible Deep Well Pump',
    brand: 'Solarstock',
    images: [
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80'
    ],
    price: 42990,
    originalPrice: 55000,
    discountPercent: 22,
    tag: 'Hot Product',
    isHot: true,
    warranty: '2 Years Full Replacement Warranty',
    capacityVariants: ['1 HP (750W)', '2 HP (1500W)', '3 HP (2200W)', '5 HP (3700W)'],
    specs: {
      'Power': '1500W (2 HP)',
      'Voltage': '110V DC MPPT Controller',
      'Max Flow': '8,500 Liters / Hour',
      'Max Head (Depth)': '90 Meters (295 Feet)',
      'Outlet Diameter': '1.25 / 1.5 Inch Brass',
      'Motor': 'Permanent Magnet Brushless DC (BLDC)'
    },
    highlights: [
      'Stainless steel 304 pump body and impeller',
      'Direct solar drive without battery needed during daytime',
      'Smart MPPT controller with water level sensor and dry-run protection',
      'Ideal for agriculture irrigation, livestock, and drinking water supply'
    ],
    shortDesc: 'High-lift 2HP brushless DC solar water pump. Delivers up to 8,500L/hr with zero fuel or electricity costs.',
    description: 'Designed for deep tubewells and agriculture irrigation in rural areas. Runs smoothly with 4-6 solar panels.',
    rating: 4.88,
    reviewsCount: 47,
    minBooking: 5000,
    purchasePoints: 300,
    emiAvailable: '12 Months EMI Available'
  },
  {
    id: 'prod-anker-solix-f3800',
    name: 'Anker SOLIX F3800 3840Wh Portable Solar Power Station (6000W Output)',
    category: 'portable-power',
    subCategory: '2400W Emergency Power Backup',
    brand: 'Anker',
    images: [
      'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=800&q=80'
    ],
    price: 320000,
    originalPrice: 385000,
    discountPercent: 17,
    tag: 'Top Selling',
    isHot: true,
    warranty: '5 Years Official Anker Global Warranty',
    capacityVariants: ['3840Wh Base', '7680Wh (1 Expansion)', '26.9kWh (Full Home Backup)'],
    specs: {
      'Capacity': '3,840Wh (LiFePO4)',
      'AC Output': '6,000W (Surge 9,000W) Dual 120V/240V',
      'Solar Input': '2,400W Max MPPT',
      'AC Fast Charge': '0 to 80% in 1.5 hours',
      'App Control': 'WiFi & Bluetooth Smart App'
    },
    highlights: [
      'Runs heavy appliances: 240V Central AC, EV Charging, Power Tools',
      'Industrial-grade wheels and pull handle for effortless mobility',
      'Direct EV charging support (NEMA 14-50 & TT-30 ports)',
      'LiFePO4 EV-grade batteries with 3,000+ cycles to 80%'
    ],
    shortDesc: 'Ultimate mobile power station and home backup generator. 6000W output with solar fast charging.',
    description: 'Anker SOLIX F3800 provides plug-and-play whole home backup and EV charging without gasoline noise or fumes.',
    rating: 5.0,
    reviewsCount: 29,
    minBooking: 25000,
    purchasePoints: 2000,
    emiAvailable: '24 Months EMI from ৳13,333/month'
  },
  {
    id: 'prod-solar-monitor-lcd',
    name: 'Solarstock Smart Solar LCD Energy Monitor & WiFi Data Logger Hub',
    category: 'monitor-screen',
    subCategory: 'Smart Solar LCD Display',
    brand: 'Solarstock',
    images: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80'
    ],
    price: 8490,
    originalPrice: 11990,
    discountPercent: 29,
    tag: 'Hot Product',
    isHot: true,
    warranty: '2 Years Replacement Guarantee',
    capacityVariants: ['RS485 Modbus Hub', 'WiFi + Cloud Gateway', 'CT Smart Meter Dual'],
    specs: {
      'Display': '7-inch Full Color IPS Touchscreen Display',
      'Communication': 'Dual WiFi 2.4GHz + RS485 Modbus RTU',
      'Accuracy Class': 'Class 1.0 (0.5% Energy Precision)',
      'Current Sensors': 'Dual 100A Split-Core CT Clamps Included',
      'Cloud App': 'Solarstock iOS & Android Real-time Dashboard',
      'Voltage Range': '85V - 265V AC Single/Split Phase'
    },
    highlights: [
      'Live real-time solar generation, grid import/export, and home consumption graphs',
      'High-precision split-core CT clamps for zero-disruption installation',
      'Cloud data logging with lifetime free mobile app and web portal access',
      'Audible overload alarm and load-shedding automatic alert notification'
    ],
    shortDesc: 'Smart 7-inch color LCD touch monitor & WiFi data logger for real-time solar yield and home load tracking.',
    description: 'The Solarstock Smart Energy Monitor provides complete transparency over your solar generation, battery status, and home consumption with high-precision metrics directly on screen and your smartphone.',
    rating: 4.9,
    reviewsCount: 36,
    minBooking: 1000,
    purchasePoints: 50
  },
  {
    id: 'prod-solar-cleaning-kit',
    name: 'Solarstock Pro Telescopic Solar Panel Water Fed Cleaning Kit (6 Meter Pole)',
    category: 'maintenance-group',
    subCategory: 'Solar Panel Cleaning Kits',
    brand: 'Solarstock',
    images: [
      'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'
    ],
    price: 6990,
    originalPrice: 9500,
    discountPercent: 26,
    tag: 'Best Deal',
    isHot: false,
    warranty: '1 Year Warranty',
    capacityVariants: ['4 Meter (13ft) Pole', '6 Meter (20ft) Pole', '9 Meter (30ft) Industrial'],
    specs: {
      'Pole Material': 'High-strength Carbon Composite Aluminum',
      'Extended Length': '6.0 Meters (20 Feet)',
      'Brush Head': '35cm Anti-Scratch Soft Bristle with 4x Water Jet Nozzles',
      'Hose Length': '12 Meter Flexible High-Pressure Water Tube',
      'Weight': '2.1 KG Lightweight Design'
    },
    highlights: [
      'Restores up to 25% lost solar panel efficiency by removing dust, soot, and bird droppings',
      'Scratch-resistant soft flagged bristles engineered specifically for PV glass coatings',
      'Built-in brass angle adapter and standard quick-connect hose coupling'
    ],
    shortDesc: 'Professional 6-meter telescopic water-fed solar panel brush kit with 4 high-pressure water jets.',
    description: 'Keep your solar rooftop generating at maximum peak capacity with this telescopic water-fed cleaning kit designed for easy reach without climbing dangerous roof slopes.',
    rating: 4.8,
    reviewsCount: 42,
    minBooking: 800,
    purchasePoints: 35
  },
  {
    id: 'prod-solar-roof-mounting',
    name: 'Solarstock Heavy-Duty Anodized Aluminum Rooftop Solar Mounting Structure (4-Panel)',
    category: 'solar-structures',
    subCategory: 'Rooftop Tilted Aluminum Rack',
    brand: 'Solarstock',
    images: [
      'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80'
    ],
    price: 8990,
    originalPrice: 12000,
    discountPercent: 25,
    tag: 'Top Selling',
    isHot: true,
    warranty: '15 Years Anti-Corrosion Warranty',
    capacityVariants: ['2-Panel Kit', '4-Panel Kit', '6-Panel Kit', '8-Panel Commercial'],
    specs: {
      'Material': 'AL6005-T5 High Tensile Anodized Aluminum',
      'Fasteners': 'SUS304 Stainless Steel Bolts & Spring Nuts',
      'Tilt Angle': '15° - 30° Adjustable Angle for Optimal Sun Angle in BD',
      'Wind Load Capacity': 'Up to 60 m/s Cyclone Proof Design',
      'Snow/Dead Load': '1.4 kN/m²'
    },
    highlights: [
      'Premium AL6005-T5 extruded rails with pre-assembled clamps for rapid installation',
      'Engineered to withstand coastal cyclone winds up to 200 km/h',
      'Includes grounding clips and mid/end clamps for all panel thicknesses (30-40mm)'
    ],
    shortDesc: 'Cyclone-resistant 15-30° adjustable anodized aluminum rooftop solar mounting rack kit for 4 panels.',
    description: 'Manufactured with structural-grade AL6005-T5 anodized aluminum and marine-grade stainless fasteners, this structure guarantees rock-solid stability for rooftop solar arrays.',
    rating: 4.95,
    reviewsCount: 58,
    minBooking: 1000,
    purchasePoints: 45
  },
  {
    id: 'prod-solarstock-titan-2000',
    name: 'SolarStock TITAN 2000W Ultra Portable Solar Generator (1536Wh LiFePO4)',
    category: 'ips-systems',
    subCategory: 'Portable Power Station',
    brand: 'SolarStock BD',
    images: [
      solarYellowBlackPoster1,
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80'
    ],
    price: 89999,
    originalPrice: 112500,
    discountPercent: 20,
    tag: 'Beat The Clock',
    isHot: true,
    warranty: '2 Years SolarCare+ Official Replacement',
    capacityVariants: ['1536Wh LiFePO4 (2000W)'],
    voltageVariants: ['AC 220V Pure Sine Wave', 'Type-C PD 100W Supercharge'],
    specs: {
      'Continuous AC Output': '2000W Pure Sine Wave (Surge 4000W)',
      'Battery Capacity': '1536Wh Grade-A LiFePO4 Cells (3500+ Cycles)',
      'Solar Input': 'Max 600W MPPT (12V-60V DC)',
      'Fast Wall Charging': '0 to 80% in 70 Minutes via AC SuperCharge',
      'Outputs': '3x 220V AC Outlets, 2x 100W PD Type-C, 4x QC3.0 USB-A, 1x 12V Car Port',
      'Display': 'Color TFT Smart Power Analyzer with Real-Time Wattage',
      'Warranty': '2 Years Official Free Replacement'
    },
    highlights: [
      'Industrial-grade yellow-black chassis with reinforced anti-drop armor',
      'Powers heavy home appliances including 1.5-ton inverter AC, refrigerator, and water pumps',
      'Dual 100W Type-C Power Delivery ports for full-speed laptop & phone charging',
      'Whisper-quiet smart cooling fans with temperature-controlled speed modulation'
    ],
    shortDesc: 'SolarStock TITAN 2000W LiFePO4 power station with 1536Wh storage, 600W solar fast recharge, and 4000W peak surge output.',
    description: 'The SolarStock TITAN 2000W is our flagship ultra-power station built for extreme residential load-shedding and off-grid remote expeditions. Packed with automotive Grade-A LiFePO4 cells, it ensures up to 10 years of reliable daily power cycles.',
    rating: 4.96,
    reviewsCount: 74,
    minBooking: 5000,
    purchasePoints: 450,
    emiAvailable: '12 Months EMI from ৳7,499/month with 0% interest'
  },
  {
    id: 'prod-solarstock-volt-1200',
    name: 'SolarStock VOLTX 1200W Hybrid Inverter & Smart Energy Station (960Wh)',
    category: 'solar-inverters',
    subCategory: 'Hybrid Solar Inverter',
    brand: 'SolarStock BD',
    images: [
      solarYellowBlackPoster2,
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80'
    ],
    price: 49500,
    originalPrice: 61875,
    discountPercent: 20,
    tag: 'Beat The Clock',
    isHot: true,
    warranty: '3 Years Official SolarCare+ Guarantee',
    capacityVariants: ['960Wh High Rate LiFePO4 (1200W)'],
    specs: {
      'Rated AC Inverter': '1200W Continuous Pure Sine Wave',
      'Storage Capacity': '960Wh Integrated LiFePO4 Pack',
      'Solar MPPT Controller': 'Built-in 50A High-Efficiency Solar MPPT',
      'Transfer Time': '< 10ms UPS-grade Instant Switchover',
      'Dimensions': '360 x 280 x 215 mm',
      'Weight': '11.8 KG'
    },
    highlights: [
      'High-contrast yellow and matte black cyber design with built-in status display',
      'Instant 10ms zero-interruption UPS transition protects desktop computers and servers',
      'Multi-protection BMS safeguards against overcharge, short circuit, and voltage spikes'
    ],
    shortDesc: 'SolarStock VOLTX 1200W hybrid solar station with 960Wh LiFePO4 battery and built-in 50A MPPT.',
    description: 'Combining pure sine wave inverter technology with built-in high-capacity LiFePO4 battery, the SolarStock VOLTX 1200W eliminates the hassle of external acid batteries.',
    rating: 4.92,
    reviewsCount: 51,
    minBooking: 3000,
    purchasePoints: 250
  },
  {
    id: 'prod-solarstock-lithium-wall-5kwh',
    name: 'SolarStock BlackGold 5.12kWh LiFePO4 Wall Powerpack (100Ah 51.2V)',
    category: 'solar-batteries',
    subCategory: 'Lithium LiFePO4 Battery',
    brand: 'SolarStock BD',
    images: [
      solarYellowBlackPoster3,
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'
    ],
    price: 145000,
    originalPrice: 175000,
    discountPercent: 17,
    tag: 'Top Selling',
    isHot: true,
    warranty: '5 Years Official Free Replacement Guarantee',
    capacityVariants: ['5.12kWh / 51.2V 100Ah'],
    specs: {
      'Nominal Voltage': '51.2V (16S Configuration)',
      'Nominal Energy': '5,120 Wh (5.12 kWh)',
      'Usable Capacity': '100Ah with 95% Depth of Discharge (DoD)',
      'Cycle Life': '6,000+ Cycles at 80% DoD (15+ Years Service Life)',
      'Max Discharge Current': '100A Continuous (5.12kW output)',
      'Communication Protocols': 'CAN Bus / RS485 / RS232 (Growatt, Deye, SMA, SRNE compatible)',
      'Chassis': 'Heavy Gauge Wall-Mount Yellow & Black Alloy Steel Casing'
    },
    highlights: [
      'Premium SolarStock BD Yellow-Black industrial wall battery aesthetic',
      'Automotive EV-grade CATL prismatic cells with smart cloud BMS telemetry',
      'Supports parallel expansion up to 15 units (76.8kWh total capacity)'
    ],
    shortDesc: 'SolarStock BlackGold 5.12kWh 51.2V 100Ah wall-mount LiFePO4 lithium battery with 6000+ cycle life.',
    description: 'Designed for residential rooftop solar and commercial emergency backup, the SolarStock BlackGold 5.12kWh delivers zero-maintenance, high-density clean energy storage with full inverter CAN/RS485 sync.',
    rating: 4.98,
    reviewsCount: 39,
    minBooking: 10000,
    purchasePoints: 750
  },
  {
    id: 'prod-solarstock-gp-800-pro',
    name: 'SolarStock GP 800 Pro Smart Solar Generator (768Wh LiFePO4)',
    category: 'ips-systems',
    subCategory: 'Portable Power Station',
    brand: 'SolarStock BD',
    images: [
      gp600Poster,
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80'
    ],
    price: 44999,
    originalPrice: 56250,
    discountPercent: 20,
    tag: 'Beat The Clock',
    isHot: true,
    warranty: '2 Years SolarCare+ Official Replacement',
    capacityVariants: ['768Wh LiFePO4 (800W Inverter)'],
    specs: {
      'Rated Output Power': '800W Pure Sine Wave AC (Peak 1600W)',
      'Battery Capacity': '768Wh Premium LiFePO4',
      'USB-A Outputs': '3x QC3.0 18W Fast Ports',
      'USB-C Output': '1x 65W PD Fast Charge',
      'Net Weight': '~8.4 KG',
      'LED Light': 'Multi-stage SOS & Flood Light on rear panel'
    },
    highlights: [
      'Official SolarStock BD yellow-black graphic poster design',
      'Runs Wi-Fi router, laptop, ceiling fans, and LED TVs for 10+ hours',
      'Dual recharging methods via AC grid and high-efficiency solar panel input'
    ],
    shortDesc: 'SolarStock GP 800 Pro portable generator with 768Wh LiFePO4 battery, 800W pure sine wave inverter, and 65W USB-C PD.',
    description: 'The SolarStock GP 800 Pro delivers dependable, quiet power for families facing load-shedding or enjoying outdoor travel. Light enough to carry with one hand, strong enough to power all essentials.',
    rating: 4.93,
    reviewsCount: 62,
    minBooking: 3000,
    purchasePoints: 220
  },
  {
    id: 'prod-solarstock-neo-1500x',
    name: 'SolarStock NEO 1500X Extreme Camping & Loadshedding Hub',
    category: 'ips-systems',
    subCategory: 'Portable Power Station',
    brand: 'SolarStock BD',
    images: [
      neo600lPoster,
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80'
    ],
    price: 68000,
    originalPrice: 85000,
    discountPercent: 20,
    tag: 'Best Seller',
    isHot: true,
    warranty: '2 Years SolarCare+ Replacement',
    capacityVariants: ['1200Wh LiFePO4 (1500W Peak)'],
    specs: {
      'Rated Power': '1500W Pure Sine Wave Output',
      'Battery Capacity': '1200Wh Grade-A LiFePO4',
      'Recharge Time': '1.8 Hours Fast AC Input',
      'Chassis Material': 'Shock-Resistant Polymer with Yellow Racing Accents'
    },
    highlights: [
      'Iconic Solarstock yellow and black industrial aesthetic',
      'Built-in jump start capability and DC 12V 10A regulated outlet',
      'Ultra-clear color LCD with minute-by-minute runtime forecast'
    ],
    shortDesc: 'SolarStock NEO 1500X heavy-duty mobile power station with 1200Wh LiFePO4 battery and 1500W AC power.',
    description: 'Engineered for off-grid fieldwork, emergency relief, and modern home setups, the NEO 1500X offers huge power capacity in a rugged, portable build.',
    rating: 4.95,
    reviewsCount: 44,
    minBooking: 4000,
    purchasePoints: 340
  },
  {
    id: 'prod-solarstock-youyo-r200',
    name: 'SolarStock YOUYO R200 Fast-Charge Emergency Solar Station',
    category: 'ips-systems',
    subCategory: 'Portable Power Station',
    brand: 'SolarStock BD',
    images: [
      youyoR100Poster,
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80'
    ],
    price: 19999,
    originalPrice: 24999,
    discountPercent: 20,
    tag: 'Beat The Clock',
    isHot: true,
    warranty: '2 Years Official Replacement',
    capacityVariants: ['160Wh LiFePO4 (200W AC)'],
    specs: {
      'AC Output': '200W Continuous Pure Sine Wave',
      'Battery Capacity': '160Wh LiFePO4',
      'Weight': 'Only 1.85 KG (Ultra Portable)',
      'USB Ports': '2x Fast USB-A, 1x USB-C PD 30W'
    },
    highlights: [
      'Pocket-sized yellow & black emergency power station',
      'Ideal for university students, online freelancers, and drone pilots',
      'Charges from 0 to 100% in 2.5 hours with included fast charger'
    ],
    shortDesc: 'Ultra-compact 1.85kg SolarStock YOUYO R200 emergency power station with 160Wh battery and 200W AC output.',
    description: 'Never drop an online meeting, zoom call, or exam due to load-shedding. The YOUYO R200 powers routers and laptops effortlessly on the go.',
    rating: 4.88,
    reviewsCount: 83,
    minBooking: 1500,
    purchasePoints: 100
  },
  {
    id: 'prod-solarstock-apex-hybrid-3kw',
    name: 'SolarStock APEX 3.2kW MPPT Hybrid Inverter (Yellow Edition)',
    category: 'solar-inverters',
    subCategory: 'Off-Grid Solar Inverter',
    brand: 'SolarStock BD',
    images: [
      solarYellowBlackPoster2,
      'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80'
    ],
    price: 52000,
    originalPrice: 65000,
    discountPercent: 20,
    tag: 'New Arrival',
    isHot: true,
    warranty: '3 Years Comprehensive Warranty',
    capacityVariants: ['3.2kW 24V MPPT 80A'],
    specs: {
      'Rated Power': '3200W / 3200VA',
      'System Voltage': '24V DC',
      'Solar Input Voltage': '30V - 400V DC Wide Range',
      'Max PV Array Power': '4000W Solar PV Support',
      'Max Solar Charging Current': '80A Built-in MPPT',
      'Grid Feed-in Option': 'Zero Export / Battery Priority Mode'
    },
    highlights: [
      'Bold SolarStock yellow-black metal housing with dust-resistant filters',
      'High-voltage solar PV input allows running appliances directly without batteries during daytime',
      'Smart mobile app monitoring with Wi-Fi dongle support'
    ],
    shortDesc: 'SolarStock APEX 3.2kW 24V MPPT hybrid inverter with 4000W PV support and battery-less daytime operation.',
    description: 'The SolarStock APEX 3.2kW is built for modern households looking to cut electricity bills significantly. Run daytime loads directly from rooftop solar arrays with seamless city grid backup.',
    rating: 4.94,
    reviewsCount: 37,
    minBooking: 3500,
    purchasePoints: 260
  },
  {
    id: 'prod-solarstock-storm-500',
    name: 'SolarStock STORM 500W Compact LiFePO4 Power Station (320Wh)',
    category: 'ips-systems',
    subCategory: 'Portable Power Station',
    brand: 'SolarStock BD',
    images: [
      neozl300wPoster,
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80'
    ],
    price: 31500,
    originalPrice: 39375,
    discountPercent: 20,
    tag: 'Beat The Clock',
    isHot: true,
    warranty: '2 Years SolarCare+ Replacement',
    capacityVariants: ['320Wh LiFePO4 (500W Pure Sine)'],
    specs: {
      'Continuous Output': '500W Pure Sine Wave AC (Surge 1000W)',
      'Battery Capacity': '320Wh LiFePO4 Chemistry',
      'DC Output': '12V 10A Car Socket + 2x DC5521 Ports',
      'Weight': '3.8 KG with Sturdy Yellow Handle'
    },
    highlights: [
      'Signature yellow and black high-contrast design matching official posters',
      'Can run table fans, 32-inch LED TV, and 4 LED bulbs for up to 6 hours',
      'Compatible with SolarStock 100W foldable solar panels for 100% off-grid recharge'
    ],
    shortDesc: 'SolarStock STORM 500W power station with 320Wh LiFePO4 battery, pure sine wave AC, and 100W solar recharge support.',
    description: 'Compact, powerful, and built to survive frequent loadshedding cycles in Bangladesh homes and remote workspaces.',
    rating: 4.91,
    reviewsCount: 56,
    minBooking: 2000,
    purchasePoints: 160
  },
  {
    id: 'prod-solarstock-gp-2400-max',
    name: 'SolarStock GP 2400 MAX Heavy Duty Industrial Solar Generator (2048Wh)',
    category: 'ips-systems',
    subCategory: 'Portable Power Station',
    brand: 'SolarStock BD',
    images: [
      gp1000Poster,
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80'
    ],
    price: 125000,
    originalPrice: 155000,
    discountPercent: 19,
    tag: 'Top Selling',
    isHot: true,
    warranty: '2 Years SolarCare+ Replacement',
    capacityVariants: ['2048Wh LiFePO4 (2400W Continuous)'],
    specs: {
      'AC Output': '2400W Pure Sine Wave (Surge 4800W)',
      'Storage Capacity': '2048Wh Grade-A LiFePO4 Battery',
      'Expandability': 'Expandable up to 6144Wh with extra battery modules',
      'AC Fast Charge': '0-80% in 60 Minutes via 1800W Grid Input',
      'Heavy Duty Wheels': 'Built-in Luggage-Style Telescopic Handle and Rugged Wheels'
    },
    highlights: [
      'Maximum output yellow-black graphic poster flagship model',
      'Runs heavy equipment: microwave ovens, deep fridges, medical devices, and power tools',
      'Rugged trolley design for easy mobility across workshops, hospitals, and outdoor sites'
    ],
    shortDesc: 'SolarStock GP 2400 MAX 2400W / 2048Wh expandable LiFePO4 mobile solar generator with rolling wheels.',
    description: 'The heavyweight champion of portable clean power. Built for commercial enterprises, mobile clinics, and demanding off-grid luxury villas.',
    rating: 4.97,
    reviewsCount: 29,
    minBooking: 8000,
    purchasePoints: 620
  },
  {
    id: 'prod-solarstock-powerbox-lite',
    name: 'SolarStock CyberBox 400W Ultra-Lightweight Solar Station (256Wh)',
    category: 'ips-systems',
    subCategory: 'Portable Power Station',
    brand: 'SolarStock BD',
    images: [
      solarYellowBlackPoster1,
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80'
    ],
    price: 26999,
    originalPrice: 33750,
    discountPercent: 20,
    tag: 'New Arrival',
    isHot: true,
    warranty: '2 Years Official Warranty',
    capacityVariants: ['256Wh LiFePO4 (400W AC)'],
    specs: {
      'Rated Output': '400W Pure Sine Wave AC',
      'Battery Capacity': '256Wh LiFePO4',
      'Weight': '2.6 KG',
      'USB-C Fast Charging': 'Bidirectional 60W USB-C'
    },
    highlights: [
      'High-impact yellow & black graphic design with illuminated dashboard',
      'Zero noise, zero fumes, 100% safe for indoor bedside table operation',
      'Powers Wi-Fi and study light for up to 14 hours continuously'
    ],
    shortDesc: 'SolarStock CyberBox 400W portable power station with 256Wh LiFePO4 battery and bidirectional 60W USB-C.',
    description: 'A sleek, lightweight power pack perfect for apartment balconies, study desks, and photography shoots.',
    rating: 4.9,
    reviewsCount: 41,
    minBooking: 2000,
    purchasePoints: 135
  }
];

export const DEFAULT_HERO_BILLBOARD: import('../types').HeroBillboardConfig = {
  megaSaleRibbon: 'MEGA',
  megaSaleTitle: 'SALE',
  lowestPriceTag: 'LOWEST PRICE',
  guaranteeBadgeTitle: 'solarCare+',
  guaranteeBadgeSubtitle: '5 YEAR REPLACEMENT GUARANTEE',
  freeDeliveryTitle: 'FREE',
  freeDeliverySubtitle: 'HOME DELIVERY',
  termsDisclaimer: '*T&C APPLY',
  centerProductTitle: 'SOLARSTOCK CORE',
  centerProductTag: 'LiFePO4 10.2kWh',
  centerProductSubtitle: 'Ultra Hybrid Inverter System',
  leftProductTitle: '5000W HYBRID',
  leftProductSubtitle: 'Pure Sine Wave',
  rightProductTitle: 'MONO BIFACIAL',
  rightProductSubtitle: '585W Hi-MO 6'
};

export const DEFAULT_SUB_BANNERS: import('../types').SubBannerConfig = {
  leftBanner: {
    topTag: 'Best deals on',
    title: 'SOLAR HYBRID INVERTERS',
    guaranteeText: '5 YEAR GUARANTEE',
    categoryLink: 'hybrid-inverters',
    buttonText: 'Buy Now'
  },
  rightBanner: {
    topScript: 'Largest Solar Hypermarket',
    titleMain: 'solar',
    titleAccent: 'stock',
    titleTag: 'SMART',
    discountBadge: 'ENJOY UP TO 70% OFF.',
    bengaliTag: 'ব্র্যান্ড নিউ রিপ্লেসমেন্ট গ্যারান্টি',
    locationText: 'Shop No 35 to 51, Level 7, Bashundhara City & Jamuna Future Park',
    categoryLink: 'lithium-batteries'
  }
};

export const DEFAULT_FLASH_SALE_CONFIG: import('../types').FlashSaleConfig = {
  title: 'Flash Sale ~ ⚡ BEAT THE CLOCK (Flat 20% OFF SolarStock Power Stations) 🔥',
  subtitle: 'Limited Stock Clearance Offer • Official 2-Yr Warranty ⏰',
  countdownHours: 14,
  countdownMinutes: 32,
  countdownSeconds: 48,
  activeProductIds: [
    'prod-solarstock-neozl-300w',
    'prod-solarstock-gp-1000',
    'prod-solarstock-gp-600',
    'prod-solarstock-youyo-r100',
    'prod-solarstock-neo-600l'
  ]
};

export const DEFAULT_FOOTER_CONFIG: import('../types').FooterConfig = {
  aboutText: 'Solarstock is Bangladesh\'s leading direct factory authorized solar megastore and IPS equipment retailer. Bringing clean, uninterrupted energy with certified warranties.',
  hotline: '09638001122',
  email: 'admin@solarstock.com.bd',
  socialLinks: {
    facebook: 'https://facebook.com/solarstockbd',
    instagram: 'https://instagram.com/solarstockbd',
    linkedin: 'https://linkedin.com/company/solarstockbd',
    youtube: 'https://youtube.com/@solarstockbd',
    whatsapp: 'https://wa.me/8801306061919'
  },
  copyrightText: '© 2026 Solarstock™ Ltd. | All rights reserved. Designed & Engineered with Factory Direct Certified Equipment.',
  isoText: 'ISO 9001:2015 Certified',
  poweredBy: 'Solarstock Core™'
};

export const DEFAULT_BRAND_CONFIG: import('../types').BrandConfig = {
  logoMain: 'solar',
  logoAccent: 'stock',
  logoSymbol: '™',
  tagline: 'Solar • IPS • Inverter',
  announcementText: 'Direct Factory Authorized Solar & IPS Megastore in Bangladesh',
  warrantyHeaderTag: 'Up to 25 Years Official Warranty Support',
  hotlineHeader: '09638001122',
  currencySymbol: '৳'
};

export const DEFAULT_POLICIES: import('../types').SitePolicy[] = [
  {
    id: 'terms',
    title: 'Terms & Conditions',
    content: 'Welcome to Solarstock Bangladesh. All purchases, pre-orders, and warranty claims made through this website or our retail experience centers are governed by Solarstock\'s standard terms. All products sold are 100% authentic, brand new, and covered by respective factory direct or SolarCare+ warranties.'
  },
  {
    id: 'refund',
    title: 'Refund & Return Policy',
    content: 'Solarstock offers a 7-day hassle-free replacement or return policy on any unopened equipment with manufacturer defects. For custom solar installations and battery packs, diagnostics are provided on-site by our certified engineering team.'
  },
  {
    id: 'privacy',
    title: 'Privacy Policy',
    content: 'We respect your privacy. Customer contact details, delivery addresses, and phone numbers are encrypted and strictly used for order fulfillment, technician dispatch, and warranty record verification.'
  },
  {
    id: 'warranty',
    title: 'SolarCare+ Warranty Policy',
    content: 'SolarCare+ provides comprehensive priority replacement and on-site servicing for hybrid inverters, LiFePO4 batteries, and solar panels. Standard inverters include 2-5 years warranty; Tier-1 solar panels feature 25 years linear power output guarantee.'
  },
  {
    id: 'exchange',
    title: 'Old Battery Exchange Policy',
    content: 'Trade in your old lead-acid or tubular batteries for instant cash rebates of up to ৳8,000 when upgrading to new high-efficiency LiFePO4 lithium batteries or tall tubular packs at any Solarstock store.'
  },
  {
    id: 'emi',
    title: '0% EMI Facility Policy',
    content: 'Enjoy up to 36 months 0% interest EMI on credit cards from 24+ major banks across Bangladesh on purchases over ৳10,000.'
  }
];


export const BRANCHES: BranchLocation[] = [
  {
    id: 'branch-1',
    name: 'Solarstock Hypermarket - Bashundhara City Shopping Mall',
    badge: 'Flagship Store',
    address: 'Shop No - 35 to 51, Block B, Level 7 (Gold Floor), Bashundhara City Shopping Mall, Panthapath, Dhaka',
    landmark: 'Panthapath, Dhaka 1205',
    phone: '09638001122 / 01711-SOLAR1',
    offDay: 'Tuesday',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
    googleMapUrl: 'https://maps.google.com/?q=Bashundhara+City+Shopping+Mall+Dhaka'
  },
  {
    id: 'branch-2',
    name: 'Solarstock Jamuna Future Park - Mega Experience Center',
    badge: 'Branch - 2',
    address: 'Shop No: 4A-022B, West Court, Level 4, Block A, Jamuna Future Park, Kuril Pragoti Shoroni, Dhaka 1229',
    landmark: 'Kuril, Dhaka',
    phone: '09638001123 / 01711-SOLAR2',
    offDay: 'Wednesday',
    image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=600&q=80',
    googleMapUrl: 'https://maps.google.com/?q=Jamuna+Future+Park+Dhaka'
  },
  {
    id: 'branch-3',
    name: 'Solarstock Chittagong - Finlay Square Shopping Mall',
    badge: 'Chittagong Hub',
    address: 'Shop No - 414 & 429, 4th Floor, Finlay Square, East Nasirabad, GEC Circle, Chittagong',
    landmark: 'GEC Circle, Chittagong',
    phone: '09638001124 / 01811-SOLAR3',
    offDay: 'Wednesday',
    image: 'https://images.unsplash.com/photo-1558441719-8b489c652790?auto=format&fit=crop&w=600&q=80',
    googleMapUrl: 'https://maps.google.com/?q=Finlay+Square+Chittagong'
  },
  {
    id: 'branch-4',
    name: 'Solarstock Meridian Kohinoor City - CTG',
    badge: 'Corporate Outlet',
    address: 'Shop No - 509 & 510, 5th Floor, Meridian Kohinoor City (MKC), 344 Mohammad Ali Road, Chittagong',
    landmark: 'Mohammad Ali Road, CTG',
    phone: '09638001125',
    offDay: 'Sunday',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
    googleMapUrl: 'https://maps.google.com/?q=Meridian+Kohinoor+City+Chittagong'
  },
  {
    id: 'branch-5',
    name: 'Solarstock Solar Care Point - Uttara Centrepoint Mall',
    badge: 'Service & Hub',
    address: 'Shop No - A19 & A20, 4th Floor, Centre Point Shopping Mall, Beside Dhaka Airport, Dhaka Mymensingh Highway, Uttara, Dhaka',
    landmark: 'Beside Airport, Uttara',
    phone: '09638001126',
    offDay: 'Monday',
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80',
    googleMapUrl: 'https://maps.google.com/?q=Centre+Point+Uttara+Dhaka'
  },
  {
    id: 'branch-6',
    name: 'Solarstock North Bengal Hub - Bogura',
    badge: 'Regional Hub',
    address: 'Holding 142, Nawab Bari Road, City Center Plaza, Bogura Sadar',
    landmark: 'Nawab Bari Road, Bogura',
    phone: '09638001127',
    offDay: 'Friday',
    image: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=600&q=80',
    googleMapUrl: 'https://maps.google.com/?q=Nawab+Bari+Road+Bogura'
  },
  {
    id: 'branch-7',
    name: 'Solarstock Sylhet Experience Zone - Zindabazar',
    badge: 'Sylhet Division',
    address: 'Al-Hamra Shopping City, Level 5, Zindabazar, Sylhet',
    landmark: 'Zindabazar, Sylhet',
    phone: '09638001128',
    offDay: 'Friday',
    image: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=600&q=80',
    googleMapUrl: 'https://maps.google.com/?q=Al-Hamra+Shopping+City+Zindabazar+Sylhet'
  },
  {
    id: 'branch-8',
    name: 'Solarstock Khulna Branch - KDA Avenue',
    badge: 'Khulna Hub',
    address: 'Ocean City Commercial Complex, Level 3, KDA Avenue, Khulna',
    landmark: 'KDA Avenue, Khulna',
    phone: '09638001129',
    offDay: 'Thursday',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    googleMapUrl: 'https://maps.google.com/?q=Ocean+City+KDA+Avenue+Khulna'
  }
];

export const BRANDS = [
  { name: 'Growatt', logo: '⚡ GROWATT' },
  { name: 'LONGi Solar', logo: '☀️ LONGI' },
  { name: 'Luminous', logo: '💡 LUMINOUS' },
  { name: 'Deye', logo: '⚙️ DEYE' },
  { name: 'Felicity Solar', logo: '🔋 FELICITY' },
  { name: 'Jinko Solar', logo: '🌟 JINKO' },
  { name: 'Microtek', logo: '🔌 MICROTEK' },
  { name: 'Huawei Solar', logo: '📡 HUAWEI' },
  { name: 'Hamko', logo: '🛡️ HAMKO' },
  { name: 'Canadian Solar', logo: '🍁 CANADIAN' },
  { name: 'SMA Solar', logo: '🌐 SMA' },
  { name: 'SRNE', logo: '🎛️ SRNE' }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'How to Choose the Best Hybrid Solar Inverter for Load Shedding in 2026',
    category: 'SOLAR GUIDE',
    date: '17 AUG, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=600&q=80',
    excerpt: 'Detailed comparison of Growatt vs Deye vs Solis hybrid inverters, MPPT voltage requirements, and battery chemistry compatibility.',
    author: 'Engr. Rafiqul Islam, Senior Solar Engineer'
  },
  {
    id: 'blog-2',
    title: 'LiFePO4 Lithium Battery vs Tubular Battery: Which is Better for Home IPS in Bangladesh?',
    category: 'BATTERY TECH',
    date: '12 AUG, 2026',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=600&q=80',
    excerpt: 'Calculate total cost of ownership, 6000 cycles life vs 1500 cycles, charging speed, and zero maintenance benefits.',
    author: 'Solarstock Technical Team'
  },
  {
    id: 'blog-3',
    title: 'Net Metering in Bangladesh: Step-by-Step Guide to Selling Rooftop Solar Electricity',
    category: 'NET METERING',
    date: '04 AUG, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=600&q=80',
    excerpt: 'How DESCO, DPDC, and REB consumers can apply for bi-directional meters and reduce electric bills by up to 85%.',
    author: 'Engr. Shamim Ahmed'
  }
];

export const LIVE_NOTIFICATIONS: LiveNotification[] = [
  {
    id: 'notif-1',
    productName: 'SolarStock NEOZL 300W Portable Power Station',
    image: neozl300wPoster,
    timeAgo: 'About 3 minutes ago',
    location: 'Dhanmondi, Dhaka'
  },
  {
    id: 'notif-2',
    productName: 'SolarStock NEO 600L Smart Power Station',
    image: neo600lPoster,
    timeAgo: 'About 9 minutes ago',
    location: 'Banani, Dhaka'
  },
  {
    id: 'notif-3',
    productName: 'Growatt SPF 5000ES 5kW Hybrid Inverter',
    image: 'https://images.unsplash.com/photo-1558441719-8b489c652790?auto=format&fit=crop&w=200&q=80',
    timeAgo: 'About 15 minutes ago',
    location: 'Gulshan, Dhaka'
  },
  {
    id: 'notif-4',
    productName: 'SolarStock GP 1000 Solar Generator',
    image: gp1000Poster,
    timeAgo: 'About 22 minutes ago',
    location: 'GEC Circle, Chittagong'
  },
  {
    id: 'notif-5',
    productName: 'SolarStock YOUYO R100 Mini Power Station',
    image: youyoR100Poster,
    timeAgo: 'About 28 minutes ago',
    location: 'Uttara, Dhaka'
  },
  {
    id: 'notif-6',
    productName: 'LONGi Hi-MO 6 585W Mono Bifacial Solar Panel',
    image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=200&q=80',
    timeAgo: 'About 35 minutes ago',
    location: 'Zindabazar, Sylhet'
  }
];

export const SEARCH_SUGGESTIONS = [
  'NEOZL 300W SolarStock',
  'NEO 600L Power Station',
  'GP 1000 Solar Generator',
  'GP 600 Portable IPS',
  'YOUYO R100 Mini Station',
  'Growatt 5kW Hybrid Inverter',
  'LONGi 585W Bifacial Solar Panel',
  'Felicity 48V 100Ah Lithium Battery',
  'Luminous 1500VA Pure Sine Wave IPS',
  'Hamko 200Ah Tall Tubular Battery',
  'SRNE 60A MPPT Charge Controller'
];

export const ALL_PRODUCTS = PRODUCTS;

export const HERO_SLIDES = [
  {
    id: 'slide-1',
    title: 'Growatt 5kW Pure Sine Wave Hybrid Inverter',
    subtitle: 'Zero switchover lag • 100A MPPT Solar Charge Controller • Dual AC Output',
    priceText: 'BDT ৳ 74,990',
    originalPriceText: 'BDT ৳ 98,500',
    discountBadge: '24% OFF',
    warrantyBadge: '5 Yrs Replacement Warranty',
    image: 'https://images.unsplash.com/photo-1558441719-8b489c652790?auto=format&fit=crop&w=1000&q=80',
    productId: 'prod-growatt-5000es',
    category: 'hybrid-inverters',
    bgGradient: 'from-amber-400 via-amber-300 to-yellow-100',
    badgeText: 'HOT PRODUCT OF THE SEASON'
  },
  {
    id: 'slide-2',
    title: 'Felicity 51.2V 100Ah LiFePO4 Lithium Wall Battery',
    subtitle: '6,000+ Deep Cycles • Smart BMS with LCD screen • 15-Year Operating Life',
    priceText: 'BDT ৳ 118,000',
    originalPriceText: 'BDT ৳ 145,000',
    discountBadge: '৳27,000 OFF',
    warrantyBadge: '10 Years Official Guarantee',
    image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1000&q=80',
    productId: 'prod-felicity-10kwh',
    category: 'lithium-batteries',
    bgGradient: 'from-amber-500 via-amber-400 to-amber-200',
    badgeText: 'NEXT-GEN ENERGY STORAGE'
  },
  {
    id: 'slide-3',
    title: 'LONGi Hi-MO 6 585W Mono Bifacial Solar Panels',
    subtitle: '22.8% Ultra-High Efficiency • German TUV Certified • Hail & Cyclone Proof',
    priceText: 'BDT ৳ 23,800',
    originalPriceText: 'BDT ৳ 29,500',
    discountBadge: '19% OFF',
    warrantyBadge: '25 Years Linear Performance Warranty',
    image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1000&q=80',
    productId: 'prod-longi-585w',
    category: 'solar-panels',
    bgGradient: 'from-yellow-400 via-amber-300 to-orange-100',
    badgeText: 'TIER-1 ROOFTOP SOLAR'
  }
];

const solarstockPowerStations = PRODUCTS.filter(p => p.id.startsWith('prod-solarstock-'));
const otherFlashDeals = PRODUCTS.filter(p => !p.id.startsWith('prod-solarstock-') && (p.discountPercent >= 20 || p.isHot));

export const FLASH_SALE_PRODUCTS = [...solarstockPowerStations, ...otherFlashDeals];
export const BEST_DEALS_PRODUCTS = PRODUCTS.filter(p => p.price < 50000).slice(0, 8);
export const RECENT_PRODUCTS = PRODUCTS.slice().reverse().slice(0, 6);
export const TRENDING_PRODUCTS = PRODUCTS.filter(p => p.rating && p.rating >= 4.8).slice(0, 8);

export const DEFAULT_HERO_SLIDES: HeroSlideItem[] = [
  {
    id: 0,
    image: flagshipSolarArray,
    alt: 'Next-Generation Smart Solar Energy Showroom',
    tag: 'SMART SOLAR ARCHITECTURE',
    badge: 'Up to 90% Bill Savings',
    title: 'Next-Generation Solar Energy Systems',
    subtitle: 'Pure Sine Wave Hybrid Inverters & LiFePO4 Battery Storage for 24/7 Power Freedom.',
    category: 'hybrid-inverters',
    buttonText: 'Explore Solar Systems'
  },
  {
    id: 1,
    image: rooftopSolarHome,
    alt: 'Modern Rooftop Solar Home under Sunny Sky',
    tag: 'RESIDENTIAL ROOFTOP',
    badge: '25-Year Linear Warranty',
    title: 'Power Your Home From Your Own Roof',
    subtitle: 'Sleek monocrystalline rooftop installations engineered for 25+ years of silent, zero-emission electricity.',
    category: 'solar-packages',
    buttonText: 'View Rooftop Packages'
  },
  {
    id: 2,
    image: familySolarLiving,
    alt: 'Family Relaxing in Solar Powered Living Room',
    tag: '24/7 UNINTERRUPTED LIVING',
    badge: '100% Silent & Safe LiFePO4',
    title: 'Zero Load Shedding, Pure Family Comfort',
    subtitle: 'Instant zero-millisecond power transfer keeps lights, fans, WiFi, and refrigerators running continuously.',
    category: 'lithium-batteries',
    buttonText: 'Discover Home Backup'
  },
  {
    id: 3,
    image: travelPortableSolar,
    alt: 'Friends Camping Powered by Portable Solar Generator',
    tag: 'OFF-GRID & ADVENTURE',
    badge: '220V Pure Sine Output',
    title: 'Take Limitless Solar Anywhere Under the Sky',
    subtitle: 'Lightweight LiFePO4 portable power stations and folding solar panels for travel, camping & field work.',
    category: 'ips-systems',
    buttonText: 'Explore Portable Power'
  }
];

export const DEFAULT_SLIDE3_PRODUCTS: Slide3ShowcaseProduct[] = [
  {
    id: 'hybrid-10kw',
    category: 'hybrid-inverters',
    name: '10kW Hybrid MPPT Inverter',
    tag: 'FLAGSHIP INVERTER',
    spec: '98.4% Efficiency • 0ms UPS Switch',
    badge: 'Tier-1 Pure Sine',
    accentColor: '#38bdf8',
    image: brightSolarShowcase
  },
  {
    id: 'lifepo4-powerwall',
    category: 'lithium-batteries',
    name: '51.2V 200Ah LiFePO4 ESS',
    tag: 'SMART ENERGY STORAGE',
    spec: '10.24kWh • 6,000+ Deep Cycles',
    badge: 'Grade-A Smart BMS',
    accentColor: '#34d399',
    image: brightSolarBattery
  },
  {
    id: 'bifacial-600w',
    category: 'solar-packages',
    name: '600W Bifacial TOPCon Array',
    tag: 'N-TYPE MONOCRYSTALLINE',
    spec: '22.8% Yield • 30-Yr Power Output',
    badge: 'Dual-Glass Armor',
    accentColor: '#fbbf24',
    image: brightSolarShowcase
  },
  {
    id: 'portable-2400w',
    category: 'ips-systems',
    name: '2400W LiFePO4 Power Hub',
    tag: 'PORTABLE & OFF-GRID',
    spec: '2048Wh • 1.2h Super Solar Charge',
    badge: '220V + Dual PD 100W',
    accentColor: '#f59e0b',
    image: brightSolarBattery
  }
];

export const DEFAULT_PEACE_OF_MIND: PeaceOfMindConfig = {
  sectionTitle: 'Solarstock™ Peace of Mind Guarantee',
  trustHighlight: 'Trusted by over 45,000+ Bangladeshi Homes & Businesses',
  items: [
    {
      id: 'pom-1',
      tag: '100% AUTHENTIC',
      tagColor: 'bg-emerald-100 text-emerald-800',
      title: '100% Genuine Products',
      subtitle: 'Direct Factory Sealed with Serial Verification',
      iconType: 'shield'
    },
    {
      id: 'pom-2',
      tag: 'EXPRESS DISPATCH',
      tagColor: 'bg-amber-100 text-amber-800',
      title: 'Super Fast Delivery',
      subtitle: '24-48 Hours Delivery Across All 64 Districts',
      iconType: 'zap'
    },
    {
      id: 'pom-3',
      tag: 'FLEXIBLE PAYMENT',
      tagColor: 'bg-sky-100 text-sky-800',
      title: '36 Months 0% EMI',
      subtitle: 'Available with 18+ Leading Partner Banks',
      iconType: 'calendar'
    },
    {
      id: 'pom-4',
      tag: 'OFFICIAL GUARANTEE',
      tagColor: 'bg-purple-100 text-purple-800',
      title: 'Up to 25 Yrs Warranty',
      subtitle: 'SolarCare+ Instant Replacement Guarantee',
      iconType: 'rotate'
    }
  ]
};

export const DEFAULT_SOLAR_CARE: SolarCareConfig = {
  badgeText: 'Official Solar Protection',
  tag: 'Official Solar Protection',
  titleMain: 'Why',
  titleHighlight: 'Solarstock Care+?',
  title: 'Why Solarstock Care+?',
  description: 'The only dedicated solar & IPS warranty in Bangladesh offering instant doorstep hardware replacement, lightning surge protection, and certified solar engineer dispatch.',
  feature1Title: 'Instant Unit Replacement',
  feature1Desc: 'Zero waiting for repair parts',
  feature2Title: '730 Days Surge Coverage',
  feature2Desc: 'Full lightning & grid fluctuation cover',
  features: [
    {
      id: 'sc-1',
      title: 'Instant Unit Replacement',
      subtitle: 'Zero waiting for repair parts'
    },
    {
      id: 'sc-2',
      title: '730 Days Surge Coverage',
      subtitle: 'Full lightning & grid fluctuation cover'
    }
  ]
};

export const DEFAULT_BRANDS_LIST: BrandItem[] = [
  { name: 'Growatt', logo: '⚡ GROWATT', tagline: 'Global #1 Residential Hybrid Inverters' },
  { name: 'LONGi Solar', logo: '☀️ LONGI', tagline: 'Tier-1 Mono Bifacial Solar Panels' },
  { name: 'Luminous', logo: '💡 LUMINOUS', tagline: 'Pure Sine Wave Smart Home IPS' },
  { name: 'Deye', logo: '⚙️ DEYE', tagline: 'Industrial High-Voltage Inverters' },
  { name: 'Felicity Solar', logo: '🔋 FELICITY', tagline: 'Smart LiFePO4 Wall Batteries' },
  { name: 'Jinko Solar', logo: '🌟 JINKO', tagline: 'Ultra-High Efficiency Tiger Neo Panels' },
  { name: 'Microtek', logo: '🔌 MICROTEK', tagline: 'Heavy Duty Digital UPS Systems' },
  { name: 'Huawei Solar', logo: '📡 HUAWEI', tagline: 'FusionSolar Commercial Inverters' },
  { name: 'Hamko', logo: '🛡️ HAMKO', tagline: 'Deep Cycle Tall Tubular Batteries' },
  { name: 'Canadian Solar', logo: '🍁 CANADIAN', tagline: 'BiHiKu7 Bifacial Modules' },
  { name: 'SMA Solar', logo: '🌐 SMA', tagline: 'German Engineered On-Grid Inverters' },
  { name: 'SRNE', logo: '🎛️ SRNE', tagline: 'Advanced MPPT Charge Controllers' }
];

export const DEFAULT_FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    q: "1. Can I exchange my old IPS device or battery for a new one at Solarstock?",
    a: "Yes! Solarstock offers an exclusive Solar Trade-In Exchange facility with up to 25% extra bonus value. Simply bring your old tubular battery or dead inverter to any of our 8+ branches, and our engineering team will evaluate its exchange value toward your brand-new pure sine wave hybrid inverter or LiFePO4 battery pack."
  },
  {
    id: 'faq-2',
    q: "2. Where are Solarstock's store locations in Bangladesh?",
    a: "Solarstock operates premier flagship experience centers across Dhaka (Bashundhara City Level 7, Jamuna Future Park Level 4, Uttara Centre Point), Chittagong (Finlay Square & Meridian Kohinoor City), Bogura (Nawab Bari Road), Sylhet (Zindabazar), and Khulna (KDA Avenue) with nationwide delivery to all 64 districts."
  },
  {
    id: 'faq-3',
    q: "3. What customer support does Solarstock provide?",
    a: "Solarstock offers 24/7 technical solar engineering hotline support to assist with rooftop solar load calculations, system design, inverter setup, warranty registrations, and net metering liaison. You can reach our engineers via hotline 09638001122 (10 AM - 10 PM) or our on-site technician dispatch desk."
  },
  {
    id: 'faq-4',
    q: "4. How can I be sure I'm getting a genuine product from Solarstock?",
    a: "Solarstock guarantees 100% authenticity. We import directly from verified Tier-1 manufacturers (Growatt, LONGi, Luminous, Deye, Felicity Solar, Jinko) as authorized distributors. Every product is sealed with official brand barcodes and verified under our SolarCare+ registration portal."
  },
  {
    id: 'faq-5',
    q: "5. Does Solarstock accept pre-orders for specialized industrial solar equipment?",
    a: "Yes! Use our interactive Pre-Order portal in the app to request specialized 3-phase commercial inverters (10kW to 100kW), custom high-voltage rack batteries, or agricultural solar irrigation systems. We source and deliver custom units within 10 to 15 business days."
  },
  {
    id: 'faq-6',
    q: "6. Can I return or exchange a product if I'm not satisfied?",
    a: "Solarstock offers a 7-day hassle-free replacement policy and official manufacturer warranty up to 25 years. If your inverter, panel, or battery has any manufacturing discrepancy, our SolarCare+ team will exchange it with a brand-new unit immediately."
  }
];

export const DEFAULT_BLOGS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'How to Choose the Best Hybrid Solar Inverter for Load Shedding in 2026',
    category: 'SOLAR GUIDE',
    date: '17 AUG, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1558441719-8b489c652790?auto=format&fit=crop&w=600&q=80'
    ],
    excerpt: 'Detailed comparison of Growatt vs Deye vs Solis hybrid inverters, MPPT voltage requirements, and battery chemistry compatibility.',
    author: 'Engr. Rafiqul Islam, Senior Solar Engineer'
  },
  {
    id: 'blog-2',
    title: 'LiFePO4 Lithium Battery vs Tubular Battery: Which is Better for Home IPS in Bangladesh?',
    category: 'BATTERY TECH',
    date: '12 AUG, 2026',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80'
    ],
    excerpt: 'Calculate total cost of ownership, 6000 cycles life vs 1500 cycles, charging speed, and zero maintenance benefits.',
    author: 'Solarstock Technical Team'
  },
  {
    id: 'blog-3',
    title: 'Net Metering in Bangladesh: Step-by-Step Guide to Selling Rooftop Solar Electricity',
    category: 'NET METERING',
    date: '04 AUG, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=600&q=80'
    ],
    excerpt: 'How DESCO, DPDC, and REB consumers can apply for bi-directional meters and reduce electric bills by up to 85%.',
    author: 'Engr. Shamim Ahmed'
  }
];

