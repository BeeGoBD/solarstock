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
  FaqItem,
  ArchiveNewsItem
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
    id: 'hybrid-inverters',
    name: 'Solar Inverters',
    icon: 'Cpu',
    image: '',
    itemCount: 42,
    subCategories: [
      'Deye Low Voltage Hybrid (3-12kW)',
      'Deye Single-Phase On-Grid (SUN-8K-G02P1)',
      'Deye Commercial High Voltage (20-50kW)',
      'SAJ Three-Phase Hybrid (H2 Series)',
      'SAJ Single-Phase On-Grid (R5 Series)',
      'Micro Inverters & Rapid Shutdown'
    ]
  },
  {
    id: 'lithium-batteries',
    name: 'Energy Storage (ESS)',
    icon: 'BatteryCharging',
    image: '',
    itemCount: 28,
    subCategories: [
      'Deye BOS-G High-Voltage Rack',
      'SAJ B2 Smart LiFePO4 Wall',
      'Commercial Containerized ESS',
      '48V Server Rack Batteries',
      'Micro Grid Storage (1MWh–10MWh)'
    ]
  },
  {
    id: 'solar-panels',
    name: 'Solar PV Modules',
    icon: 'Sun',
    image: '',
    itemCount: 48,
    subCategories: [
      'JA Solar N-Type Bifacial Double Glass (625W)',
      'TW Solar N-Type TNC Bifacial (585W / 620W)',
      'TW Solar G12 High-Power (690W)',
      'JA Solar DeepBlue 4.0 Pro (580W)',
      'JA Solar DeepBlue 3.0 All-Black (415W)',
      'BIPV & Carport Modules'
    ]
  },
  {
    id: 'solar-pumps',
    name: 'Solar Water Pumps',
    icon: 'Droplets',
    image: '',
    itemCount: 26,
    subCategories: [
      'Difful AC/DC Hybrid Deep Well Pump (4DSC 2200W)',
      'Difful DC Brushless Submersible (48V/72V/110V)',
      'Difful Solar Surface Booster Pump',
      'Solar Irrigation MPPT Controller',
      'Agricultural Solar VFD Systems'
    ]
  },
  {
    id: 'ips-systems',
    name: 'Portable Power Stations',
    icon: 'Zap',
    image: '',
    itemCount: 24,
    subCategories: [
      'Solarstock SS-LPS Series Lithium ESS (500W / 1000W)',
      'YOUYO Portable Power Stations (R100 / R200)',
      'SolarStock NEOZL 300W LiFePO4',
      'SolarStock GP 1000 Generator',
      'Balcony Solar Storage Systems',
      'Emergency Backup Stations'
    ]
  },
  {
    id: 'solar-accessories',
    name: 'Solar Safety & BOS',
    icon: 'Wrench',
    image: '',
    itemCount: 45,
    subCategories: [
      'PROJOY Protection & Combiner Boxes (EPS / MI / AC / DC)',
      'Projoy PEFS Firefighter Rapid Shutdown',
      'Projoy PEDS 1000V DC Isolator Switches',
      'DC Surge Protection (SPD)',
      'Solar DC Cable & MC4 Connectors',
      'Combiner Boxes & PV Breakers'
    ]
  },
  {
    id: 'maintenance-group',
    name: 'Material Handling & Logistics',
    icon: 'Wrench',
    image: '',
    itemCount: 16,
    subCategories: [
      'EP Equipment Lithium Pallet Trucks (EPL154)',
      'Electric Walkie Stackers',
      'Solar Panel Cleaning Kits',
      'Digital Testing & Solar Multimeters'
    ]
  },
  {
    id: 'solar-structures',
    name: 'Mounting & Carports',
    icon: 'Layers',
    image: '',
    itemCount: 24,
    subCategories: [
      'Solar Carport Infrastructure',
      'Rooftop Tilted Aluminum Racks',
      'Ground Mount Heavy Steel Racks',
      'Floating Solar Mounting Floats'
    ]
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'prod-deye-sun-5k',
    name: 'Deye SUN-5K-SG04LP1-EU 5kW Single Phase Hybrid Inverter (Low Voltage 48V)',
    category: 'hybrid-inverters',
    subCategory: 'Deye Low Voltage Hybrid (3-12kW)',
    brand: 'Deye',
    images: [
      'https://images.unsplash.com/photo-1558441719-8b489c652790?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80',
      brightSolarShowcase
    ],
    price: 115000,
    originalPrice: 130000,
    discountPercent: 12,
    tag: 'Best Deal',
    isHot: true,
    warranty: '5 Years Official Manufacturer Warranty',
    capacityVariants: ['5kW (Single Phase 48V)', '6kW (Single Phase 48V)', '8kW (Single Phase 48V)'],
    specs: {
      'Rated Power': '5000W AC Continuous',
      'Max DC Input': '6500W',
      'Battery Voltage Range': '40V - 60V (Low Voltage)',
      'Max Charge/Discharge': '120A',
      'Max Efficiency': '97.6%',
      'MPPT Trackers': '2 (1+1 Strings)',
      'Switchover Time': '<4ms (Zero-Delay UPS Class)',
      'Display': 'Colorful Touch LCD Screen',
      'Ingress Protection': 'IP65 Rated'
    },
    highlights: [
      'Dual MPPT with 97.6% peak conversion efficiency for maximum rooftop solar yield',
      '48V low voltage battery architecture for superior residential safety and flexible battery expansion',
      'Supports energy storage from diesel generators and smart load management',
      'Built-in 6 time periods for programmable battery charging and peak-shaving'
    ],
    shortDesc: 'Deye 5kW low voltage single phase hybrid inverter with dual MPPT, touch LCD, and 4ms UPS switchover.',
    description: 'The Deye SUN-5K-SG04LP1-EU is an industry-benchmark hybrid inverter engineered for residential and light commercial solar systems. Featuring a safe 48V low-voltage battery architecture, colorful touchscreen interface, dual MPPT trackers, and IP65 weatherproof casing. Supports parallel operation up to 16 units for flexible capacity expansion.',
    rating: 4.9,
    reviewsCount: 38,
    minBooking: 5000,
    purchasePoints: 575
  },
  {
    id: 'prod-deye-sun-8k-sg05lp1',
    name: 'Deye SUN-8K-SG05LP1-EU-SM2 8kW Single-Phase Hybrid Inverter (Low Voltage 48V)',
    category: 'hybrid-inverters',
    subCategory: 'Deye Low Voltage Hybrid (3-12kW)',
    brand: 'Deye',
    images: [
      'https://images.unsplash.com/photo-1558441719-8b489c652790?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80',
      brightSolarShowcase
    ],
    price: 168000,
    originalPrice: 188000,
    discountPercent: 11,
    tag: 'Top Selling',
    isHot: true,
    stockCount: 14,
    warranty: '5 Years Official Manufacturer Warranty',
    capacityVariants: ['8kW Single-Phase (SUN-8K-SG05LP1-EU-SM2)', '6kW Single-Phase', '10kW Single-Phase'],
    specs: {
      'Battery Type': 'Lead-acid or Lithium-ion',
      'Battery Voltage Range': '40 - 60 V',
      'Max Charge / Discharge': '190 A (Self-adaption to BMS)',
      'Battery Inputs': '1 Battery Input',
      'Max PV Access': '16,000 W (Max Input: 12,800 W)',
      'Max PV Voltage': '500 V (Start-up: 125 V, Rated: 370 V)',
      'MPPT Voltage Range': '150 - 425 V',
      'MPPT Trackers / Strings': '2 MPPTs / 2+2 Strings',
      'Max Operating PV Current': '32 + 32 A (Short-circuit: 48 + 48 A)',
      'Rated AC Output': '8,000 W (Max Apparent: 8,800 VA)',
      'Rated AC Current': '36.4 / 34.8 A (Max: 40 / 38.3 A)',
      'Continuous Passthrough': '50 A',
      'Peak Off-Grid Power': '2× Rated (10 seconds)',
      'Power Factor': '0.8 Leading to 0.8 Lagging',
      'Grid Voltage / Freq': '220/230 V (0.85-1.1 Un), 50/45-55 or 60/55-65 Hz, L+N+PE',
      'Grid Quality': 'THDi < 3%, DC Injection < 0.5% In',
      'Efficiency': 'Max 97.60%, Euro 96.50%, MPPT > 99%'
    },
    highlights: [
      'Dual MPPT with 16,000W PV access and 97.60% peak efficiency (Euro 96.50%, MPPT >99%)',
      'High-current 190A battery charge/discharge with intelligent self-adaption to lithium BMS',
      'Massive 2× rated surge power for 10 seconds to start heavy inductive motor loads',
      'Continuous 50A AC passthrough and low distortion THDi <3% with pure sine wave output'
    ],
    shortDesc: 'Deye 8kW single-phase hybrid inverter with 16kW PV access, 190A charge/discharge, and 97.6% efficiency.',
    description: 'The Deye SUN-8K-SG05LP1-EU-SM2 is an advanced 8kW low-voltage single-phase hybrid inverter engineered for modern homes and commercial solar plants. Supporting up to 16,000W of PV panels across 2 MPPTs (2+2 strings), 190A high-capacity lithium charging, and 50A continuous grid passthrough with 2x peak surge capacity.',
    rating: 5.0,
    reviewsCount: 47,
    minBooking: 5000,
    purchasePoints: 840
  },
  {
    id: 'prod-deye-sun-8k-g02p1',
    name: 'Deye SUN-8K-G02P1-EU-AM2 8kW Single-Phase On-Grid String Inverter',
    category: 'hybrid-inverters',
    subCategory: 'Deye Single-Phase On-Grid (SUN-8K-G02P1)',
    brand: 'Deye',
    images: [
      'https://images.unsplash.com/photo-1558441719-8b489c652790?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80',
      brightSolarShowcase
    ],
    price: 135000,
    originalPrice: 152000,
    discountPercent: 11,
    tag: 'Top Selling',
    isHot: true,
    stockCount: 18,
    warranty: '5 Years Official Manufacturer Warranty (Extendable to 10 Years)',
    capacityVariants: ['8kW Single-Phase (SUN-8K-G02P1-EU-AM2)', '6kW Single-Phase', '10kW Single-Phase'],
    specs: {
      'Max PV Input Power': '10.4 kW',
      'Max PV Voltage': '550 V (Start-up: 80 V, Rated: 360 V)',
      'MPPT Voltage Range': '70 - 500 V',
      'Max Operating PV Current': '18 + 26 A',
      'Max Short-Circuit Current': '27 + 39 A',
      'MPPT Trackers / Strings': '2 MPPTs (1 + 2 Strings)',
      'Rated AC Output': '8 kW (Max Apparent: 8.8 kVA)',
      'Rated AC Current': '36.4 / 34.8 A (Max: 40 / 38.3 A)',
      'Efficiency': 'Max 97.70%, Euro 97.20%, MPPT >99%',
      'Protections': 'DC reverse polarity, AC overcurrent, AC overvoltage, short-circuit, and thermal protection'
    },
    highlights: [
      'High-power 10.4 kW max PV input with dual MPPTs (1+2 strings) and ultra-low 80V start-up',
      'Market-leading efficiency: 97.70% peak efficiency, 97.20% European efficiency, and >99% MPPT accuracy',
      'Full protective suite: DC reverse polarity, AC overcurrent/overvoltage, short-circuit, and thermal safeguards',
      'Quiet natural convection cooling and compact wall-mount chassis with zero fan maintenance'
    ],
    shortDesc: 'Deye 8kW single-phase on-grid string inverter with 10.4kW PV input, dual MPPT, 97.7% efficiency, and complete protection.',
    description: 'The Deye SUN-8K-G02P1-EU-AM2 is a high-yield single-phase on-grid string inverter with 10.4 kW maximum solar PV access, 550V max input voltage, and wide 70-500V MPPT range. Features 8kW rated AC output (8.8 kVA max apparent), 18+26A operating current, and dual MPPTs with 1+2 strings.',
    rating: 4.9,
    reviewsCount: 39,
    minBooking: 5000,
    purchasePoints: 675
  },
  {
    id: 'prod-deye-sun-12k',
    name: 'Deye SUN-12K-SG04LP3-EU 12kW Three Phase Hybrid Inverter (Low Voltage 48V)',
    category: 'hybrid-inverters',
    subCategory: 'Deye Low Voltage Hybrid (3-12kW)',
    brand: 'Deye',
    images: [
      'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1558441719-8b489c652790?auto=format&fit=crop&w=800&q=80',
      brightSolarShowcase
    ],
    price: 265000,
    originalPrice: 295000,
    discountPercent: 10,
    tag: 'Hot Product',
    isHot: true,
    warranty: '5 Years Official Manufacturer Warranty',
    capacityVariants: ['10kW Three Phase', '12kW Three Phase', '15kW Three Phase'],
    specs: {
      'Rated AC Output': '12000W Three Phase (400V)',
      'Max DC Input Power': '15600W',
      'Battery Voltage': '40V - 60V Low Voltage Architecture',
      'Max Charge/Discharge': '240A',
      'Unbalanced Output': '100% Unbalanced Output per Phase',
      'MPPT Trackers': '2 (2+1 Strings)',
      'Efficiency': '97.6% (Euro: 97.0%)',
      'Parallel Capability': 'Up to 16 Units Parallel On/Off-Grid',
      'Protection': 'IP65'
    },
    highlights: [
      '100% unbalanced output capability on each individual phase for diverse commercial loads',
      'Massive 240A charge/discharge current handles large industrial 48V LiFePO4 battery banks',
      'Can store energy directly from diesel generator during prolonged utility outages',
      'Comprehensive remote monitoring and parameter setting via Solarman smart app'
    ],
    shortDesc: 'Deye 12kW three-phase hybrid inverter with 100% unbalanced phase output and 16-unit parallel support.',
    description: 'Engineered for commercial workshops, larger villas, and industrial facilities, the Deye SUN-12K-SG04LP3-EU provides robust 3-phase clean power with 100% phase unbalance tolerance. Its 48V battery design allows safe, cost-effective lithium energy storage scaling.',
    rating: 4.9,
    reviewsCount: 29,
    minBooking: 10000,
    purchasePoints: 1325
  },
  {
    id: 'prod-deye-bos-g',
    name: 'Deye BOS-G 51.2V 100Ah High-Voltage LiFePO4 Rack-Mounted Energy Storage (5.12kWh)',
    category: 'lithium-batteries',
    subCategory: 'Deye BOS-G High-Voltage Rack',
    brand: 'Deye',
    images: [
      brightSolarBattery,
      'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80',
      brightSolarShowcase
    ],
    price: 185000,
    originalPrice: 210000,
    discountPercent: 12,
    tag: 'Top Selling',
    isHot: true,
    warranty: '10 Years Official Warranty',
    capacityVariants: ['5.12kWh (1 Module)', '20.48kWh (4 Modules + Master BMS)', '30.72kWh (6 Modules + Master BMS)'],
    specs: {
      'Nominal Energy': '5.12 kWh per Module',
      'Nominal Voltage': '51.2 V',
      'Capacity': '100 Ah',
      'Battery Chemistry': 'Cobalt-Free Lithium Iron Phosphate (LiFePO4)',
      'Operating Voltage': '44.8V - 57.6V',
      'Cycle Life': '≥6,000 Cycles @ 90% DOD, 25°C',
      'Dimensions': '440 × 570 × 133 mm (Standard 19-inch 3U)',
      'Weight': '44 kg'
    },
    highlights: [
      'Cobalt-free LiFePO4 chemistry provides exceptional thermal stability and non-combustible safety',
      'Standard 19-inch rack-mount design allows expandable clusters from 20.48kWh up to 61.44kWh',
      'Embedded intelligent BMS protects against over-charge, over-discharge, over-current, and temperature',
      'Direct CAN/RS485 plug-and-play communication with Deye and industry hybrid inverters'
    ],
    shortDesc: 'Deye BOS-G 5.12kWh high-voltage rack-mount LiFePO4 energy storage module with embedded smart BMS.',
    description: 'The Deye BOS-G series is a high-performance lithium iron phosphate battery system designed for residential and commercial energy storage applications. Featuring modular standard 19-inch rack design, 6,000+ cycle life, and seamless pairing with hybrid solar inverters.',
    rating: 5.0,
    reviewsCount: 22,
    minBooking: 8000,
    purchasePoints: 925
  },
  {
    id: 'prod-saj-h2-10k',
    name: 'SAJ H2-10K-T2 10kW High Voltage Three-Phase Hybrid Solar Inverter',
    category: 'hybrid-inverters',
    subCategory: 'SAJ Three-Phase Hybrid (H2 Series)',
    brand: 'SAJ',
    images: [
      'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1558441719-8b489c652790?auto=format&fit=crop&w=800&q=80',
      brightSolarShowcase
    ],
    price: 225000,
    originalPrice: 250000,
    discountPercent: 10,
    tag: 'New Arrival',
    warranty: '5 Years Official Warranty',
    capacityVariants: ['5kW High Voltage', '10kW High Voltage', '15kW High Voltage'],
    specs: {
      'Rated AC Output': '10000W (Three Phase 3L/N/PE)',
      'Max PV Input Power': '15000W (150% Oversizing)',
      'Battery Voltage Range': '180V - 600V (High Voltage)',
      'Max Efficiency': '98.2%',
      'UPS Switching Time': '<10ms',
      'Cooling': 'Natural Convection (Fanless & Silent)',
      'Protection': 'IP65 Rated Outdoor Enclosure',
      'Communication': 'RS485 / CAN / Wi-Fi / Ethernet'
    },
    highlights: [
      'High-voltage battery architecture (180V-600V) delivers superior 98.2% round-trip conversion efficiency',
      'Ultra-fast <10ms UPS grade transfer ensures critical IT servers and medical loads never reboot',
      '150% DC input oversizing extracts peak solar power even in overcast or low-irradiance conditions',
      'Completely fanless natural cooling design provides silent indoor or outdoor operation'
    ],
    shortDesc: 'SAJ H2 10kW high-voltage three-phase hybrid inverter with 98.2% efficiency and silent fanless cooling.',
    description: 'SAJ H2-10K-T2 is a premium high-voltage hybrid solar inverter engineered for sophisticated residential and C&I installations. Compatible with high-voltage LiFePO4 battery stacks for lower resistive cable losses and maximum overall round-trip system efficiency.',
    rating: 4.8,
    reviewsCount: 19,
    minBooking: 10000,
    purchasePoints: 1125
  },
  {
    id: 'prod-saj-b2-10k',
    name: 'SAJ B2-10.0-HV1 Smart High-Voltage LiFePO4 Battery System (10.24kWh)',
    category: 'lithium-batteries',
    subCategory: 'SAJ B2 Smart LiFePO4 Wall',
    brand: 'SAJ',
    images: [
      brightSolarBattery,
      'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80'
    ],
    price: 310000,
    originalPrice: 345000,
    discountPercent: 10,
    tag: 'Most Popular',
    warranty: '10 Years Performance Warranty',
    capacityVariants: ['5.12kWh (1 Module)', '10.24kWh (2 Modules)', '15.36kWh (3 Modules)', '20.48kWh (4 Modules)'],
    specs: {
      'Usable Energy': '10.24 kWh',
      'Nominal Voltage': '204.8 V',
      'Operating Voltage': '180V - 230V',
      'Cell Chemistry': 'Automotive Grade LiFePO4',
      'Cycle Life': '>6,000 Cycles @ 90% DOD, 25°C',
      'Protection Degree': 'IP65 Waterproof & Dustproof',
      'Installation': 'Wall Mounted or Floor Standing Base'
    },
    highlights: [
      'Modular cable-free stackable connection allows effortless 15-minute physical installation',
      '100% depth of discharge with intelligent cell-level thermal balancing',
      'High-voltage DC bus delivers up to 10kW continuous high-current discharge',
      'Integrated aerosol fire-suppression and multi-stage BMS protection system'
    ],
    shortDesc: 'SAJ B2 10.24kWh high-voltage modular LiFePO4 battery system with cable-free stack design.',
    description: 'The SAJ B2-10.0-HV1 is a modular high-voltage energy storage system built with Tier-1 lithium iron phosphate cells. Its plug-and-play stacking eliminates messy external battery cables, delivering an elegant aesthetic suitable for premium modern homes and executive commercial offices.',
    rating: 4.9,
    reviewsCount: 16,
    minBooking: 12000,
    purchasePoints: 1550
  },
  {
    id: 'prod-saj-r5-5k',
    name: 'SAJ R5-5K-S2 5kW Single Phase Grid-Tied Solar Inverter',
    category: 'hybrid-inverters',
    subCategory: 'SAJ Single-Phase On-Grid (R5 Series)',
    brand: 'SAJ',
    images: [
      'https://images.unsplash.com/photo-1558441719-8b489c652790?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80'
    ],
    price: 72000,
    originalPrice: 82000,
    discountPercent: 12,
    tag: 'Best Deal',
    warranty: '5 Years Manufacturer Warranty',
    capacityVariants: ['3kW Single Phase', '5kW Single Phase', '8kW Single Phase'],
    specs: {
      'Max AC Output Power': '5500 VA',
      'Nominal AC Output': '5000 W',
      'Max Efficiency': '98.0%',
      'MPPT Voltage Range': '90V - 550V',
      'Start-up Voltage': '100V',
      'Number of MPPT': '2 Trackers',
      'Weight': '11.5 kg',
      'Ingress Protection': 'IP65'
    },
    highlights: [
      'Class-leading 98.0% peak inverter efficiency for maximized net-metering solar generation',
      'Wide MPPT operating range starting at just 90V for early morning and late dusk power harvesting',
      'Die-cast aluminum unibody housing with integrated DC isolator switch included',
      'Built-in Wi-Fi and Bluetooth for real-time mobile app monitoring and zero-touch updates'
    ],
    shortDesc: 'SAJ R5 5kW single phase on-grid solar inverter with dual MPPT and 98% maximum efficiency.',
    description: 'Designed for residential rooftop net-metering systems, the SAJ R5-5K-S2 features dual independent MPPTs, compact 11.5kg chassis, and smart energy management compatible with all utility regulations.',
    rating: 4.8,
    reviewsCount: 31,
    minBooking: 3000,
    purchasePoints: 360
  },
  {
    id: 'prod-tw-solar-585w',
    name: 'TW Solar (Tongwei) 585W TNC N-Type Bifacial Dual-Glass Solar Module',
    category: 'solar-panels',
    subCategory: 'TW Solar N-Type TNC Bifacial (585W)',
    brand: 'TW Solar (Tongwei)',
    images: [
      flagshipSolarArray,
      brightSolarShowcase,
      'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80'
    ],
    price: 15800,
    originalPrice: 18500,
    discountPercent: 15,
    tag: 'Top Selling',
    isHot: true,
    warranty: '12 Years Product / 30 Years Linear Power Warranty',
    capacityVariants: ['585W Dual-Glass', '600W Dual-Glass', '620W Dual-Glass'],
    specs: {
      'Max Power (Pmax)': '585 W',
      'Module Efficiency': '22.6%',
      'Cell Type': 'N-Type TNC Monocrystalline',
      'Open Circuit Voltage (Voc)': '51.30 V',
      'Short Circuit Current (Isc)': '14.36 A',
      'Bifaciality Factor': '80% ± 5%',
      'Front / Back Glass': '2.0mm Semi-Tempered Glass (Dual-Glass)',
      'Dimensions': '2278 × 1134 × 30 mm',
      'Weight': '31.8 kg'
    },
    highlights: [
      'Tongwei N-Type TNC cell technology delivers an ultra-high 22.6% module conversion efficiency',
      'Bifacial power generation yields up to 25% additional backside energy gain on reflective surfaces',
      'Dual-glass anti-PID structure resists extreme humidity, salt spray, sandstorms, and ammonia',
      '30-year linear performance warranty guarantees at least 87.4% power output after three decades'
    ],
    shortDesc: 'Tongwei 585W N-Type TNC bifacial dual-glass solar panel with 22.6% efficiency and 30-year warranty.',
    description: 'TW Solar (Tongwei) is the world’s premier photovoltaic cell manufacturer. The 585W TNC N-Type Bifacial module combines cutting-edge tunnel-oxide passivated contact chemistry with dual-glass encapsulation for maximum lifespan and lowest levelized cost of energy (LCOE).',
    rating: 5.0,
    reviewsCount: 54,
    minBooking: 1000,
    purchasePoints: 79
  },
  {
    id: 'prod-tw-solar-620w-bifacial',
    name: 'Tongwei N-Type Bifacial 620W (TWMNH-66HD) Dual-Glass Solar Module',
    category: 'solar-panels',
    subCategory: 'TW Solar N-Type TNC Bifacial (585W)',
    brand: 'TW Solar (Tongwei)',
    images: [
      flagshipSolarArray,
      brightSolarShowcase,
      'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80'
    ],
    price: 16800,
    originalPrice: 19500,
    discountPercent: 14,
    tag: 'Top Selling',
    isHot: true,
    stockCount: 650,
    warranty: '1st year ≤1% degradation, annual ≤0.4%, 30-year power output 87.40%',
    capacityVariants: ['620W Bifacial Dual-Glass (TWMNH-66HD)', '585W Dual-Glass', '600W Dual-Glass'],
    specs: {
      'Model': 'TWMNH-66HD (Tongwei Solar)',
      'Cell Type': 'TNC (N-Type Monocrystalline)',
      'Cell Orientation': '132 [6 × 22]',
      'Dimensions': '2382 ± 2 × 1134 ± 2 × 30 mm',
      'Weight': '32.5 kg',
      'Front Glass': '2.0 mm AR coating semi-tempered',
      'Rear Glass': '2.0 mm semi-tempered',
      'Frame': 'Anodized aluminum alloy',
      'Junction Box': 'IP68, 3 diodes',
      'Cable': '4.0 mm² (+400 mm / -200 mm or 1400 mm customizable)',
      'Wind / Snow Load': '2400 Pa / 5400 Pa',
      'Electrical (STC)': 'Pmax 620 W, Voc 49.1 V, Isc 16.06 A, Vmp 40.82 V, Imp 15.19 A, Efficiency 23%',
      'Rear Gain': '5% → 651 W (24.1%), 15% → 713 W (26.4%), 25% → 775 W (28.7%)',
      'Warranty Standard': '1st year ≤1% degradation, annual ≤0.4%, 30-year power output 87.40%'
    },
    highlights: [
      'Tongwei TNC N-Type monocrystalline cells delivering 23% module efficiency and 620W peak power',
      'High rear bifacial gain boosts power up to 775W (28.7% efficiency) on reflective surfaces',
      'Robust dual 2.0mm semi-tempered glass with AR coating and 2400Pa wind / 5400Pa snow load rating',
      'Premium linear warranty: 1st year ≤1% degradation, annual ≤0.4%, 30-year output 87.40%'
    ],
    shortDesc: 'Tongwei 620W N-Type TNC bifacial dual-glass module with 23% efficiency, up to 775W rear gain, and 30-year warranty.',
    description: 'The Tongwei TWMNH-66HD 620W N-Type Bifacial dual-glass solar module features 132 [6×22] TNC cells, achieving an ultra-high 23% STC efficiency. Rear glass bifacial gain delivers 651W (+5%), 713W (+15%), up to 775W (+25% gain, 28.7% efficiency). Anodized aluminum frame, IP68 junction box, and 30-year warranty guaranteeing 87.40% power retention.',
    rating: 5.0,
    reviewsCount: 62,
    minBooking: 1000,
    purchasePoints: 84
  },
  {
    id: 'prod-tw-solar-690w',
    name: 'TW Solar 690W G12 High-Power Utility & C&I Bifacial Solar Module',
    category: 'solar-panels',
    subCategory: 'TW Solar G12 High-Power (690W)',
    brand: 'TW Solar (Tongwei)',
    images: [
      flagshipSolarArray,
      'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80',
      brightSolarShowcase
    ],
    price: 0,
    originalPrice: 0,
    discountPercent: 0,
    tag: 'Commercial & Industrial',
    warranty: '12 Years Product / 30 Years Linear Power Warranty',
    capacityVariants: ['680W G12', '690W G12', '700W G12'],
    specs: {
      'Max Power (Pmax)': '690 W',
      'Module Efficiency': '22.2%',
      'Cell Technology': '210mm G12 Multi-Busbar N-Type Cells',
      'Open Circuit Voltage (Voc)': '46.20 V',
      'Short Circuit Current (Isc)': '18.84 A',
      'Mechanical Load': 'Front 5400Pa / Back 2400Pa',
      'Dimensions': '2384 × 1303 × 33 mm',
      'Weight': '38.0 kg'
    },
    highlights: [
      'Industry-leading 690W rated output drastically reduces BOS costs, racking, and cable requirements',
      '210mm G12 wafer platform delivers optimal string length and high energy yield for C&I MW-scale parks',
      'Certified for heavy snow (5400Pa) and extreme tropical cyclonic wind loads (2400Pa)',
      'Wholesale container pricing available for EPC contractors and authorized project developers'
    ],
    shortDesc: 'TW Solar 690W high-power G12 bifacial solar module engineered for commercial, industrial and utility projects.',
    description: 'The TW Solar 690W G12 module represents the peak of modern utility and industrial solar technology. Built with 210mm large-format wafers and high-density multi-busbar packing, this panel maximizes energy harvest per square meter while driving down project balance-of-system (BOS) capital costs. Sign in or request a quote for container-load project pricing.',
    rating: 4.9,
    reviewsCount: 18,
    minBooking: 5000,
    purchasePoints: 0
  },
  {
    id: 'prod-ja-solar-625w',
    name: 'JA Solar 625W N-Type Bifacial Double Glass (JAM66D45 LB / JAM66D45-625/LB)',
    category: 'solar-panels',
    subCategory: 'JA Solar N-Type Bifacial Double Glass (625W)',
    brand: 'JA Solar',
    images: [
      flagshipSolarArray,
      brightSolarShowcase,
      'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80'
    ],
    price: 17200,
    originalPrice: 19800,
    discountPercent: 13,
    tag: 'Top Selling',
    isHot: true,
    stockCount: 420,
    warranty: '1% 1st-year degradation | 0.4% annual over 30 years (87.4% at year 30)',
    capacityVariants: ['625W Bifacial Double Glass (JAM66D45 LB)', '620W Bifacial', '630W Bifacial'],
    specs: {
      'Maximum Power (Pmax)': '625 W',
      'Open Circuit Voltage (Voc)': '48.7 V',
      'Maximum Power Voltage (Vmp)': '40.45 V',
      'Short Circuit Current (Isc)': '16.15 A',
      'Current at Pmax (Imp)': '15.45 A',
      'Module Efficiency': '23.1%',
      'Cell Configuration': 'Mono, 132 cells (6 × 22)',
      'Dimensions': '2382 ± 2 mm × 1134 ± 2 mm × 30 ± 1 mm',
      'Weight': '33.1 kg',
      'Front / Back Glass': '2.0 mm / 2.0 mm Dual Semi-Tempered Glass',
      'Junction Box': 'IP68, 3 diodes',
      'Connector': 'QC 4.10-351 / MC4-EVO2A',
      'Cable Spec': '4 mm² (IEC) / 12 AWG (UL)',
      'Cable Length': 'Portrait: 300 mm (+) / 400 mm (-); Landscape: 1500 mm (+) / 1500 mm (-)',
      'Packaging': '36 pcs/pallet, 720 pcs/40HQ container',
      'Warranty Degradation': '1% 1st-year degradation | 0.4% annual over 30 years',
      'Certificates': 'IEC 61215, IEC 61730, UL 61215, UL 61730, ISO 9001:2015, ISO 14001:2015, ISO 45001:2018, IEC 62941:2019'
    },
    highlights: [
      'Ultra-high 625W Pmax and 23.1% module efficiency with 132 mono N-Type half-cells',
      'Dual 2.0mm + 2.0mm semi-tempered glass delivers exceptional bifacial gain and physical durability',
      'Industry-leading warranty: 1% 1st-year degradation and 0.4% annual degradation over 30 years',
      'Container-ready packaging: 36 pcs/pallet, 720 pcs/40HQ container for large-scale utility and C&I deployment'
    ],
    shortDesc: 'JA Solar 625W N-Type bifacial double glass panel (JAM66D45 LB) with 23.1% efficiency and 30-year warranty.',
    description: 'The JA Solar JAM66D45 LB (JAM66D45-625/LB) delivers 625W peak power with 23.1% module efficiency. Featuring 132 (6×22) mono N-type cells, dual 2.0mm glass, IP68 junction box, and ultra-low 1% 1st-year degradation. Certified by IEC 61215/61730, UL, and ISO standards.',
    rating: 5.0,
    reviewsCount: 54,
    minBooking: 1000,
    purchasePoints: 86
  },
  {
    id: 'prod-ja-solar-580w',
    name: 'JA Solar DeepBlue 4.0 Pro 580W N-Type TOPCon Bifacial Dual-Glass Panel',
    category: 'solar-panels',
    subCategory: 'JA Solar DeepBlue 4.0 Pro (580W)',
    brand: 'JA Solar',
    images: [
      brightSolarShowcase,
      flagshipSolarArray,
      'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80'
    ],
    price: 15500,
    originalPrice: 17800,
    discountPercent: 13,
    tag: 'Hot Product',
    isHot: true,
    warranty: '12 Years Product / 30 Years Linear Power Warranty',
    capacityVariants: ['575W N-Type', '580W N-Type', '585W N-Type'],
    specs: {
      'Rated Max Power': '580 W',
      'Module Efficiency': '22.5%',
      'Cell Matrix': '144 (6 × 24) Bycium+ N-Type Cells',
      'Open Circuit Voltage (Voc)': '51.15 V',
      'Short Circuit Current (Isc)': '14.30 A',
      'Temp Coefficient (Pmax)': '-0.30% / °C (Outstanding Heat Tolerance)',
      'Dimensions': '2278 × 1134 × 30 mm',
      'Weight': '31.8 kg'
    },
    highlights: [
      'Tier-1 Bloomberg NEF listed manufacturer with proven multi-gigawatt global field reliability',
      'Bycium+ N-Type TOPCon cell technology features lower first-year degradation (<1%) and 0.4%/yr thereafter',
      'Superior -0.30%/°C temperature coefficient delivers greater actual power during intense hot summer days',
      'Bifacial double-glass architecture provides robust physical protection against hail and micro-cracking'
    ],
    shortDesc: 'JA Solar DeepBlue 4.0 Pro 580W N-Type TOPCon bifacial module with Bycium+ high-efficiency cells.',
    description: 'JA Solar DeepBlue 4.0 Pro 580W incorporates proprietary Bycium+ N-type cell architecture, SMBB technology, and high-density encapsulation. Engineered for high performance across diverse climates with minimal LID/LeTID degradation.',
    rating: 4.9,
    reviewsCount: 47,
    minBooking: 1000,
    purchasePoints: 77
  },
  {
    id: 'prod-ja-solar-415w',
    name: 'JA Solar DeepBlue 3.0 Light 415W All-Black Residential Solar Panel',
    category: 'solar-panels',
    subCategory: 'JA Solar DeepBlue 3.0 All-Black (415W)',
    brand: 'JA Solar',
    images: [
      rooftopSolarHome,
      brightSolarShowcase,
      'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80'
    ],
    price: 11200,
    originalPrice: 13000,
    discountPercent: 14,
    tag: 'Residential Best',
    warranty: '12 Years Product / 25 Years Performance Warranty',
    capacityVariants: ['410W All-Black', '415W All-Black', '420W All-Black'],
    specs: {
      'Rated Power': '415 W',
      'Module Efficiency': '21.3%',
      'Appearance': 'Full Black (Black Frame, Black Backsheet, Black Busbars)',
      'Open Circuit Voltage (Voc)': '37.45 V',
      'Short Circuit Current (Isc)': '14.02 A',
      'Dimensions': '1722 × 1134 × 30 mm',
      'Weight': '21.5 kg'
    },
    highlights: [
      'Striking all-black aesthetic seamlessly integrates into residential roof tiles, villas, and modern architecture',
      'Compact 1.72m profile makes roof handling, transport, and mounting fast and straightforward',
      '11-busbar half-cell configuration significantly mitigates power loss from partial tree or chimney shading',
      'Positive power tolerance (0 ~ +5W) ensures you always receive at least the rated nameplate power'
    ],
    shortDesc: 'JA Solar 415W DeepBlue 3.0 Light all-black monocrystalline residential solar panel.',
    description: 'Designed specifically for homeowners seeking premium curb appeal, the JA Solar DeepBlue 3.0 Light 415W combines all-black aesthetics with 11-busbar PERC half-cell efficiency. Perfect for urban homes, villas, and boutique commercial storefronts.',
    rating: 4.8,
    reviewsCount: 26,
    minBooking: 1000,
    purchasePoints: 56
  },
  {
    id: 'prod-difful-3dpc-750w',
    name: 'Difful 3DPC3.5-95-48-750 DC Submersible Solar Water Pump (750W / 48V MPPT)',
    category: 'solar-pumps',
    subCategory: 'Difful DC Brushless Submersible (48V/72V/110V)',
    brand: 'Difful',
    images: [
      brightSolarShowcase,
      'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=800&q=80'
    ],
    price: 42000,
    originalPrice: 48000,
    discountPercent: 13,
    tag: 'Top Selling',
    isHot: true,
    warranty: '2 Years Factory Replacement Warranty',
    capacityVariants: ['750W (1.0 HP) / 48V', '1100W (1.5 HP) / 72V', '1500W (2.0 HP) / 110V'],
    specs: {
      'Rated Motor Power': '750W (1.0 HP)',
      'Working DC Voltage': '48V DC (MPPT Range 60V-90V)',
      'Max Flow Rate': '3.5 m³/h (3,500 Liters / Hour)',
      'Max Delivery Head': '95 Meters',
      'Outlet Diameter': '1.25 Inch (32mm)',
      'Pump Body Diameter': '3 Inch (76mm Deep Well Fit)',
      'Motor Type': 'Brushless Permanent Magnet DC Motor',
      'Material': '100% High-Grade 304 Stainless Steel'
    },
    highlights: [
      'High-efficiency brushless permanent magnet DC motor provides 25% higher efficiency than AC induction pumps',
      'Smart MPPT controller dynamically matches solar radiation changes to maintain continuous water delivery',
      'Integrated water shortage and tank full sensors automatically stop pump dry-running to protect bearings',
      'Zero monthly electricity or diesel fuel costs — pays for itself within a single agricultural season'
    ],
    shortDesc: 'Difful 750W 48V brushless DC submersible solar deep well pump with intelligent MPPT controller.',
    description: 'Difful is a recognized global pioneer in solar pumping technology. The 3DPC3.5-95-48-750 is a 3-inch submersible pump engineered for deep tube-wells, rural drinking water supply, and agricultural drip irrigation. Powered directly by 3 to 4 solar panels without batteries.',
    rating: 4.9,
    reviewsCount: 33,
    minBooking: 2000,
    purchasePoints: 210
  },
  {
    id: 'prod-difful-4dpc-1500w',
    name: 'Difful AC/DC Hybrid 4DPC6-130-110-1500 Solar Deep Well Irrigation Pump (1.5kW / 2HP)',
    category: 'solar-pumps',
    subCategory: 'Difful AC/DC Hybrid Deep Well Pump',
    brand: 'Difful',
    images: [
      brightSolarShowcase,
      'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=800&q=80'
    ],
    price: 68000,
    originalPrice: 78000,
    discountPercent: 13,
    tag: 'Agriculture Flagship',
    warranty: '2 Years Official Warranty',
    capacityVariants: ['1.5kW (2.0 HP)', '2.2kW (3.0 HP)', '3.0kW (4.0 HP)'],
    specs: {
      'Rated Power': '1500W (2.0 HP)',
      'Solar DC Voltage': '110V - 150V (Voc < 200V)',
      'AC Input Voltage': '85V - 280V Single Phase AC',
      'Max Flow Rate': '6.0 m³/h (6,000 Liters / Hour)',
      'Max Delivery Head': '130 Meters',
      'Outlet Diameter': '1.5 Inch',
      'Pump Diameter': '4 Inch (100mm)',
      'Enclosure': 'IP68 Submersible Motor, IP65 External Controller'
    },
    highlights: [
      'Dual-power hybrid capability runs seamlessly on solar PV during daylight and AC generator/grid at night',
      'Heavy-duty 4-inch stainless steel construction designed for continuous 24/7 agricultural irrigation',
      'Digital LED controller displays real-time RPM, motor current, DC input voltage, and fault codes',
      'Eliminates diesel fuel transport hassles and high generator maintenance costs in remote farms'
    ],
    shortDesc: 'Difful 1500W AC/DC hybrid 4-inch deep well solar pump with 130m head and dual solar/grid input.',
    description: 'The Difful 4DPC6-130-110-1500 is a commercial-grade solar deep well pump built for farms, livestock stations, and commercial irrigation. Its hybrid controller accepts direct solar DC input or standard AC power, ensuring continuous water availability regardless of weather.',
    rating: 4.9,
    reviewsCount: 21,
    minBooking: 3000,
    purchasePoints: 340
  },
  {
    id: 'prod-difful-surface-booster',
    name: 'Difful Solar Surface Booster Water Pump with MPPT Controller (550W / 48V)',
    category: 'solar-pumps',
    subCategory: 'Difful Solar Surface Booster Pump',
    brand: 'Difful',
    images: [
      brightSolarShowcase,
      'https://images.unsplash.com/photo-1558441719-8b489c652790?auto=format&fit=crop&w=800&q=80'
    ],
    price: 34000,
    originalPrice: 39000,
    discountPercent: 13,
    tag: 'Hot Product',
    warranty: '2 Years Replacement Warranty',
    capacityVariants: ['370W (0.5 HP)', '550W (0.75 HP)', '750W (1.0 HP)'],
    specs: {
      'Rated Power': '550W (0.75 HP)',
      'Operating Voltage': '48V DC',
      'Max Flow Rate': '3.0 m³/h (3,000 L/h)',
      'Max Head': '35 Meters',
      'Max Suction Depth': '8 Meters',
      'Inlet / Outlet': '1.0 Inch (25mm)',
      'Motor': 'DC Brushless High-Torque Motor'
    },
    highlights: [
      'High suction capability draws water easily from open rivers, canals, farm ponds, and ground sumps',
      'Solid brass impeller and anti-rust cast housing ensure longevity in demanding tropical conditions',
      'Pairs directly with 2x 350W-450W solar modules for completely independent off-grid operation',
      'Compact, portable design with top handle for easy field relocation between irrigation plots'
    ],
    shortDesc: 'Difful 550W 48V surface booster solar pump with MPPT controller for canals, ponds, and overhead tanks.',
    description: 'The Difful 550W Surface Booster Pump delivers reliable surface water transfer for agricultural plots, orchards, fish ponds, and domestic rooftop water tanks. Features high suction capability and robust DC brushless mechanics.',
    rating: 4.8,
    reviewsCount: 15,
    minBooking: 1500,
    purchasePoints: 170
  },
  {
    id: 'prod-difful-4dsc-2200w',
    name: 'Difful 4-inch AC/DC Hybrid Solar Submersible Pump (4DSC18-95-200-2200-A/D(HV) / 4DSC-A/D)',
    category: 'solar-pumps',
    subCategory: 'Difful AC/DC Hybrid Deep Well Pump (4DSC 2200W)',
    brand: 'Difful',
    images: [
      brightSolarShowcase,
      'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=800&q=80'
    ],
    price: 89000,
    originalPrice: 102000,
    discountPercent: 13,
    tag: 'Agriculture Flagship',
    isHot: true,
    stockCount: 15,
    warranty: '2 Years Official Warranty',
    capacityVariants: ['2200W (≈3 HP) / 4DSC18-95', '1500W (2 HP)', '3000W (4 HP)'],
    specs: {
      'Rated Power': '2200 W (≈3 HP), brushless motor with MPPT',
      'Max Flow Rate': '18 m³/h (18,000 Liters / Hour)',
      'Max Delivery Head': '95 m',
      'Outlet Diameter': '2 inches (50 mm), Brass Outlet',
      'Pump Diameter': '4 inches (100 mm)',
      'Materials': 'Stainless steel body & impeller, brass outlet',
      'Solar DC Input': '200–350 V optimal (Voc <450 V)',
      'AC Input Voltage': '85–280 V single-phase AC',
      'Warranty': '2 Years Official Warranty',
      'Certificates': 'CE, GS, RoHS',
      'Packaging': 'Reinforced heavy-duty wooden case'
    },
    highlights: [
      'High-power 2200W (≈3 HP) brushless motor with integrated high-efficiency MPPT tracking',
      'High flow capacity up to 18 m³/h and 95m head for commercial agriculture, orchards, and fish farms',
      'Dual AC/DC input: accepts 200–350V optimal solar DC (Voc <450V) or 85–280V single-phase grid/generator AC',
      'Premium corrosion-resistant build: 100% stainless steel body & impeller with solid brass outlet; CE, GS, RoHS certified'
    ],
    shortDesc: 'Difful 4-inch 2200W (≈3 HP) AC/DC hybrid submersible solar pump with 18 m³/h flow and 95m head.',
    description: 'The Difful 4DSC18-95-200-2200-A/D(HV) / 4DSC-A/D is a high-capacity 4-inch submersible solar pump designed for large-scale crop irrigation, livestock, and commercial water supply. Featuring 2200W (≈3 HP) brushless motor with MPPT, 18 m³/h flow, 95m head, 2" brass outlet, stainless steel body & impeller, and dual solar/grid input in a secure wooden case.',
    rating: 5.0,
    reviewsCount: 28,
    minBooking: 3000,
    purchasePoints: 445
  },
  {
    id: 'prod-projoy-pefs-el',
    name: 'Projoy PEFS-EL Series Firefighter Safety Switch / Rapid Shutdown Unit (1500V 55A)',
    category: 'solar-accessories',
    subCategory: 'Projoy PEFS Firefighter Rapid Shutdown',
    brand: 'Projoy Electric',
    images: [
      brightSolarShowcase,
      'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80'
    ],
    price: 18500,
    originalPrice: 22000,
    discountPercent: 16,
    tag: 'Safety Essential',
    warranty: '5 Years Manufacturer Guarantee',
    capacityVariants: ['1-String (1000V 30A)', '2-String (1500V 55A)', '4-String (1500V 55A)'],
    specs: {
      'Rated Voltage': 'Up to 1500V DC',
      'Max Rated Current': '55 A per String',
      'Disconnection Time': '<10ms (Instant Motorized Trip)',
      'Enclosure Rating': 'IP66 Waterproof & Flame Retardant (UL94-V0)',
      'Operating Temp': '-40°C to +80°C',
      'Compliance': 'NEC 2017/2020 690.12 Rapid Shutdown Certified'
    },
    highlights: [
      'Compliant with international fire safety and NEC rapid shutdown standards for commercial rooftops',
      'Automatically isolates dangerous high-voltage DC lines when municipal AC grid power is disconnected',
      'Protects firefighters and emergency response personnel from electrical shock hazards during incidents',
      'Heavy-duty UV-stabilized IP66 enclosure with built-in motorized DC disconnect switch'
    ],
    shortDesc: 'Projoy PEFS-EL 1500V 55A firefighter safety switch and string-level rapid shutdown system.',
    description: 'Projoy Electric PEFS-EL series is a professional firefighter safety switch engineered to eliminate high-voltage DC hazards on solar roofs. When AC power is cut, the motorized mechanism instantly breaks the DC circuit at the module array level.',
    rating: 5.0,
    reviewsCount: 19,
    minBooking: 1000,
    purchasePoints: 92
  },
  {
    id: 'prod-projoy-peds-isolator',
    name: 'Projoy PEDS Series DC Isolator Switch (1000V 32A 4-Pole with Lockable Handle)',
    category: 'solar-accessories',
    subCategory: 'Projoy PEDS 1000V DC Isolator Switches',
    brand: 'Projoy Electric',
    images: [
      brightSolarShowcase,
      'https://images.unsplash.com/photo-1558441719-8b489c652790?auto=format&fit=crop&w=800&q=80'
    ],
    price: 4200,
    originalPrice: 5000,
    discountPercent: 16,
    tag: 'Standard Equipment',
    warranty: '5 Years Official Warranty',
    capacityVariants: ['2-Pole 1000V 32A', '4-Pole 1000V 32A', '4-Pole 1500V 55A'],
    specs: {
      'Rated Operational Voltage': '1000V DC',
      'Rated Current': '32 A',
      'Number of Poles': '4 Poles (Dual String)',
      'Standards': 'IEC / EN 60947-3, AS/NZS 5033',
      'Arc Extinction': '<3ms Fast Magnetic Arc Extinction',
      'Protection': 'IP66 Weatherproof with Padlockable Rotary Handle'
    },
    highlights: [
      'Patented magnetic arc-extinction chamber suppresses dangerous DC arcs in under 3 milliseconds',
      'Silver alloy contacts with self-cleaning knife-edge design ensure low contact resistance and zero heating',
      'Off-position padlockable handle prevents unauthorized activation during maintenance',
      'Certified under IEC 60947-3 and required by international solar electrical safety codes'
    ],
    shortDesc: 'Projoy PEDS 1000V 32A 4-pole solar DC isolator switch with rapid arc extinction and IP66 enclosure.',
    description: 'Projoy PEDS series DC isolator switches provide critical manual disconnection between solar PV arrays and inverters. Built with patented magnetic arc-quenching technology and durable IP66 UV-resistant housing.',
    rating: 4.9,
    reviewsCount: 42,
    minBooking: 500,
    purchasePoints: 21
  },
  {
    id: 'prod-projoy-eps-box',
    name: 'PROJOY EPS Box',
    category: 'solar-accessories',
    subCategory: 'PROJOY Protection & Combiner Boxes (EPS / MI / AC / DC)',
    brand: 'Projoy Electric',
    images: [
      brightSolarShowcase,
      'https://images.unsplash.com/photo-1558441719-8b489c652790?auto=format&fit=crop&w=800&q=80'
    ],
    price: 0,
    originalPrice: 0,
    discountPercent: 0,
    tag: 'Contact for Pricing',
    requiresSignInForPricing: true,
    warranty: '5 Years Official Warranty',
    specs: {
      'Product Name': 'PROJOY EPS Box',
      'Brand': 'Projoy Electric',
      'Pricing': 'Contact for pricing ($0.00 base quote)',
      'Application': 'Emergency Power Supply (EPS) Protection and Auto-Switching Box'
    },
    highlights: [
      'Genuine Projoy protection product listed on SolarStock secondary catalogue',
      'Specialized Emergency Power Supply (EPS) switching & protection architecture',
      'Contact desk or sign in for custom project specification and commercial quotation'
    ],
    shortDesc: 'PROJOY EPS Box for solar emergency power supply auto-switching and electrical isolation.',
    description: 'PROJOY EPS Box. Contact SolarStock regional sales desk or sign in for pricing and project quotation.',
    rating: 4.9,
    reviewsCount: 8,
    minBooking: 1000,
    purchasePoints: 0
  },
  {
    id: 'prod-projoy-dc-ac-combiner',
    name: 'PROJOY DC & AC Combiner Box',
    category: 'solar-accessories',
    subCategory: 'PROJOY Protection & Combiner Boxes (EPS / MI / AC / DC)',
    brand: 'Projoy Electric',
    images: [
      brightSolarShowcase,
      'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80'
    ],
    price: 0,
    originalPrice: 0,
    discountPercent: 0,
    tag: 'Contact for Pricing',
    requiresSignInForPricing: true,
    warranty: '5 Years Official Warranty',
    specs: {
      'Product Name': 'PROJOY DC & AC Combiner Box',
      'Brand': 'Projoy Electric',
      'Pricing': 'Contact for pricing ($0.00 base quote)',
      'Function': 'Dual-Domain DC Array & AC Grid Output Protection Combiner'
    },
    highlights: [
      'Unified DC & AC protection housing with dedicated string disconnects and surge suppressors',
      'Simplifies balance-of-system wiring and shortens on-site commissioning time',
      'Contact desk or sign in for engineering submittals and container volume pricing'
    ],
    shortDesc: 'PROJOY DC & AC Combiner Box combining solar string inputs and AC distribution protection.',
    description: 'PROJOY DC & AC Combiner Box. Contact SolarStock regional sales desk or sign in for pricing and project quotation.',
    rating: 4.8,
    reviewsCount: 11,
    minBooking: 1000,
    purchasePoints: 0
  },
  {
    id: 'prod-projoy-mi-box',
    name: 'PROJOY MI BOX',
    category: 'solar-accessories',
    subCategory: 'PROJOY Protection & Combiner Boxes (EPS / MI / AC / DC)',
    brand: 'Projoy Electric',
    images: [
      brightSolarShowcase,
      'https://images.unsplash.com/photo-1558441719-8b489c652790?auto=format&fit=crop&w=800&q=80'
    ],
    price: 0,
    originalPrice: 0,
    discountPercent: 0,
    tag: 'Contact for Pricing',
    requiresSignInForPricing: true,
    warranty: '5 Years Official Warranty',
    specs: {
      'Product Name': 'PROJOY MI BOX',
      'Brand': 'Projoy Electric',
      'Pricing': 'Contact for pricing ($0.00 base quote)',
      'Application': 'Microinverter Array AC Bus Distribution & Protection'
    },
    highlights: [
      'Tailored for commercial and residential microinverter string arrays',
      'Integrated AC breaker, surge arrestor, and outdoor weatherproof sealing',
      'Contact desk or sign in for technical specifications and project quotes'
    ],
    shortDesc: 'PROJOY MI BOX distribution and electrical protection box for solar microinverter systems.',
    description: 'PROJOY MI BOX. Contact SolarStock regional sales desk or sign in for pricing and project quotation.',
    rating: 4.8,
    reviewsCount: 7,
    minBooking: 1000,
    purchasePoints: 0
  },
  {
    id: 'prod-projoy-ac-combiner',
    name: 'PROJOY AC Combiner Box',
    category: 'solar-accessories',
    subCategory: 'PROJOY Protection & Combiner Boxes (EPS / MI / AC / DC)',
    brand: 'Projoy Electric',
    images: [
      brightSolarShowcase,
      'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80'
    ],
    price: 0,
    originalPrice: 0,
    discountPercent: 0,
    tag: 'Contact for Pricing',
    requiresSignInForPricing: true,
    warranty: '5 Years Official Warranty',
    specs: {
      'Product Name': 'PROJOY AC Combiner Box',
      'Brand': 'Projoy Electric',
      'Pricing': 'Contact for pricing ($0.00 base quote)',
      'Protection': 'AC Breakers, Type II SPD, IP65 Weatherproof Enclosure'
    },
    highlights: [
      'Multi-inverter AC string aggregation for commercial rooftop and ground-mounted plants',
      'Pre-wired with certified AC breakers and class-tested surge protection devices',
      'Contact desk or sign in for multi-unit bill of materials and pricing'
    ],
    shortDesc: 'PROJOY AC Combiner Box with integrated AC circuit breakers and surge protection.',
    description: 'PROJOY AC Combiner Box. Contact SolarStock regional sales desk or sign in for pricing and project quotation.',
    rating: 4.9,
    reviewsCount: 14,
    minBooking: 1000,
    purchasePoints: 0
  },
  {
    id: 'prod-projoy-dc-combiner',
    name: 'PROJOY DC Combiner Box',
    category: 'solar-accessories',
    subCategory: 'PROJOY Protection & Combiner Boxes (EPS / MI / AC / DC)',
    brand: 'Projoy Electric',
    images: [
      brightSolarShowcase,
      'https://images.unsplash.com/photo-1558441719-8b489c652790?auto=format&fit=crop&w=800&q=80'
    ],
    price: 0,
    originalPrice: 0,
    discountPercent: 0,
    tag: 'Contact for Pricing',
    requiresSignInForPricing: true,
    warranty: '5 Years Official Warranty',
    specs: {
      'Product Name': 'PROJOY DC Combiner Box',
      'Brand': 'Projoy Electric',
      'Pricing': 'Contact for pricing ($0.00 base quote)',
      'Voltage Rating': '1000V / 1500V DC String Isolation'
    },
    highlights: [
      'Multi-string PV DC combiner with high-speed DC fuses, surge arrestor, and isolator switch',
      'High-grade UV-resistant and flame-retardant outer enclosure',
      'Contact desk or sign in for string configuration sizing and price quotation'
    ],
    shortDesc: 'PROJOY DC Combiner Box for solar PV string aggregation and high-voltage DC protection.',
    description: 'PROJOY DC Combiner Box. Contact SolarStock regional sales desk or sign in for pricing and project quotation.',
    rating: 4.9,
    reviewsCount: 16,
    minBooking: 1000,
    purchasePoints: 0
  },
  {
    id: 'prod-pejb-dc-box',
    name: 'PEJB DC Electric Box',
    category: 'solar-accessories',
    subCategory: 'PROJOY Protection & Combiner Boxes (EPS / MI / AC / DC)',
    brand: 'Projoy Electric',
    images: [
      brightSolarShowcase,
      'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80'
    ],
    price: 0,
    originalPrice: 0,
    discountPercent: 0,
    tag: 'Contact for Pricing',
    requiresSignInForPricing: true,
    warranty: '5 Years Official Warranty',
    specs: {
      'Product Name': 'PEJB DC Electric Box',
      'Brand': 'Projoy Electric',
      'Pricing': 'Contact for pricing ($0.00 base quote)',
      'Enclosure': 'Heavy-Duty Industrial DC Electrical Box'
    },
    highlights: [
      'Industrial-grade DC terminal and junction enclosure for solar infrastructure projects',
      'Optimized for rapid field termination and long-term environmental resistance',
      'Contact desk or sign in for technical data sheets and volume pricing'
    ],
    shortDesc: 'PEJB DC Electric Box for field DC electrical termination and safety containment.',
    description: 'PEJB DC Electric Box. Contact SolarStock regional sales desk or sign in for pricing and project quotation.',
    rating: 4.8,
    reviewsCount: 5,
    minBooking: 1000,
    purchasePoints: 0
  },
  {
    id: 'prod-projoy-pejdb-box',
    name: 'PROJOY PEJDB DC&AC Electric Box',
    category: 'solar-accessories',
    subCategory: 'PROJOY Protection & Combiner Boxes (EPS / MI / AC / DC)',
    brand: 'Projoy Electric',
    images: [
      brightSolarShowcase,
      'https://images.unsplash.com/photo-1558441719-8b489c652790?auto=format&fit=crop&w=800&q=80'
    ],
    price: 0,
    originalPrice: 0,
    discountPercent: 0,
    tag: 'Contact for Pricing',
    requiresSignInForPricing: true,
    warranty: '5 Years Official Warranty',
    specs: {
      'Product Name': 'PROJOY PEJDB DC&AC Electric Box',
      'Brand': 'Projoy Electric',
      'Pricing': 'Contact for pricing ($0.00 base quote)',
      'Design': 'Hybrid Dual-Chamber DC & AC Protection & Distribution Enclosure'
    },
    highlights: [
      'Dual-compartment enclosure safely segregates DC solar inputs from AC distribution circuits',
      'Equipped with heavy-duty Projoy isolators, breakers, and surge protection modules',
      'Contact desk or sign in for tender specifications and pricing'
    ],
    shortDesc: 'PROJOY PEJDB DC&AC Electric Box with dual-compartment isolation for complete solar plant safety.',
    description: 'PROJOY PEJDB DC&AC Electric Box. Contact SolarStock regional sales desk or sign in for pricing and project quotation.',
    rating: 4.9,
    reviewsCount: 9,
    minBooking: 1000,
    purchasePoints: 0
  },
  {
    id: 'prod-ep-epl154-truck',
    name: 'EP MINI F4 1.5T Electric Pallet Truck (Li-Ion 24V/20Ah Dual-Slot)',
    category: 'maintenance-group',
    subCategory: 'EP Equipment Lithium Pallet Trucks (EPL154)',
    brand: 'EP Equipment',
    images: [
      brightSolarBattery,
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      brightSolarShowcase
    ],
    price: 0,
    originalPrice: 0,
    discountPercent: 0,
    tag: 'Warehouse Logistics',
    isCustomerOnly: true,
    requiresSignInForPricing: true,
    stockCount: 8,
    warranty: '1 Year Full Machine / 3 Years Lithium Battery Warranty',
    capacityVariants: ['1.5 Ton (MINI F4)', '1.5 Ton (EPL154)', '1.8 Ton (EPL185)'],
    specs: {
      'Rated Capacity': '1500 kg',
      'Load Centre': '600 mm',
      'Service Weight': '120 kg',
      'Lift Height': '105 mm',
      'Overall Length': '1550 mm',
      'Overall Width': '590 mm (695 mm)',
      'Length to Face of Forks': '400 mm',
      'Fork Dimensions': '55 / 150 / 1150 mm',
      'Turning Radius': '1360 mm',
      'Battery Chemistry & Capacity': '24 V Li-Ion, 20 Ah modules (dual-slot removable for continuous operation or opportunity charging)',
      'Operator Type': 'Pedestrian',
      'Stabilizing Wheels': 'Optional stabilizing wheels for heavy / large loads',
      'Braking System': 'Electromagnetic regenerative service brake'
    },
    highlights: [
      'Zero emissions & ultra-quiet operation – ideal for green textile factories, cleanrooms, and solar logistics',
      'Dual-slot removable 24V 20Ah Li-Ion battery modules enable continuous 24/7 operation and fast opportunity charging',
      'Ultra-compact 120 kg service weight with 1360 mm tight turning radius for narrow aisles and container offloading',
      'Heavy-duty 1500 kg rated capacity with optional stabilizing wheels for extra-wide pallet loads'
    ],
    shortDesc: 'EP MINI F4 1.5T pedestrian electric pallet truck with dual-slot 24V 20Ah Li-ion batteries and 1360mm turning radius.',
    description: 'The EP MINI F4 1.5T electric pallet truck brings zero-emission, effortless material handling to clean factories, textile plants, and solar storage facilities. Weighing only 120 kg with a 1500 kg load capacity and dual-slot 24V Li-Ion battery system for round-the-clock opportunity charging. Sign in or request a quote for commercial fleet pricing.',
    rating: 4.9,
    reviewsCount: 18,
    minBooking: 5000,
    purchasePoints: 0
  },
  {
    id: 'prod-solarstock-balcony-800w',
    name: 'SolarStock Balcony Solar Storage System (800W Microinverter + 1.6kWh LiFePO4)',
    category: 'ips-systems',
    subCategory: 'Balcony Solar Storage Systems',
    brand: 'Solarstock',
    images: [
      solarYellowBlackPoster1,
      brightSolarShowcase,
      rooftopSolarHome
    ],
    price: 89000,
    originalPrice: 105000,
    discountPercent: 15,
    tag: 'Beat The Clock',
    isHot: true,
    stockCount: 25,
    warranty: '5 Years Official Guarantee',
    capacityVariants: ['800W / 1.6kWh LiFePO4', '600W / 1.0kWh LiFePO4', '1200W / 3.2kWh LiFePO4'],
    specs: {
      'Microinverter Output': '800W Pure Sine Wave (Dual MPPT)',
      'Storage Battery': '1600Wh (1.6kWh) LiFePO4 Battery',
      'Solar Input': 'Up to 1000W PV Input (Dual String)',
      'Mounting Hardware': 'Plug & Play Balcony Railing / Terrace Hook Brackets',
      'Smart Monitoring': 'Integrated WiFi & Bluetooth Smartphone App',
      'Battery Cycle Life': '6000+ Cycles to 80% Capacity',
      'Weather Protection': 'IP65 Outdoor Waterproof'
    },
    highlights: [
      'Beat The Clock high-efficiency plug-and-play balcony solar solution requiring zero complex electrical wiring',
      'Stores daytime solar generation into 1.6kWh LiFePO4 battery and feeds electricity into home circuits automatically during night',
      'Dual MPPT channels maximize yield even when one panel is partially shaded by balcony railings or adjacent structures',
      'Official SolarStock local warranty support through Dhaka and Bangkok regional hubs'
    ],
    shortDesc: 'SolarStock 800W balcony microinverter & 1.6kWh LiFePO4 storage system with plug-and-play installation.',
    description: 'The SolarStock Balcony Solar Storage System empowers apartment owners and urban residences to generate and store clean electricity directly from their apartment balcony. Featuring an 800W grid-tie microinverter, 1.6kWh long-life LiFePO4 battery, and smart app monitoring.',
    rating: 4.9,
    reviewsCount: 27,
    minBooking: 5000,
    purchasePoints: 445
  },
  {
    id: 'prod-solarstock-neozl-300w',
    name: 'SolarStock NEOZL 300W Portable Power Station (192Wh LiFePO4)',
    category: 'ips-systems',
    subCategory: 'SolarStock NEOZL 300W LiFePO4',
    brand: 'Solarstock',
    images: [
      neozl300wPoster,
      solarYellowBlackPoster1,
      travelPortableSolar,
      familySolarLiving
    ],
    price: 24999,
    originalPrice: 31250,
    discountPercent: 20,
    tag: 'Beat The Clock',
    isHot: true,
    warranty: '2 Years SolarCare+ Official Replacement',
    capacityVariants: ['192Wh LiFePO4 (300W AC)'],
    specs: {
      'Rated AC Output': '300W Pure Sine Wave (Surge 600W)',
      'Battery Capacity': '192Wh (60,000mAh) Automotive-Grade LiFePO4',
      'Cycle Life': '3000+ Cycles to 80% Capacity',
      'Solar Input': '12-24V / 60W Max (Full Solar Recharge in ~3.4h)',
      'USB-A Ports': '2x 5V/3A 18W Fast Charging',
      'USB-C Port': '1x 45W Power Delivery (PD)',
      'AC Outlet': '1x Universal 220V 50Hz Socket',
      'Net Weight': '2.5 kg'
    },
    highlights: [
      'Ultra-compact 2.5kg body with ergonomic carry handle for indoor rooms and outdoor field trips',
      'Automotive-grade LiFePO4 chemistry with 3,000+ cycles guarantees over 8 years of daily use',
      '45W USB-C Power Delivery charges MacBook, laptops, tablets, and phones at maximum speed',
      'Pure Sine Wave 220V output safely powers delicate fans, LED lights, routers, and medical gadgets'
    ],
    shortDesc: 'SolarStock NEOZL 300W portable power station with 192Wh LiFePO4 battery, 45W USB-C PD and solar recharge.',
    description: 'The SolarStock NEOZL 300W is the ultimate portable energy hub. Powered by safe lithium iron phosphate cells, it provides silent, fume-free electricity for home study desks, balcony setups, camping, and emergency load-shedding backup.',
    rating: 4.9,
    reviewsCount: 88,
    minBooking: 2000,
    purchasePoints: 125
  },
  {
    id: 'prod-solarstock-gp-1000',
    name: 'SolarStock GP 1000 Heavy-Duty Solar Generator (576Wh LiFePO4 / 1000W AC)',
    category: 'ips-systems',
    subCategory: 'SolarStock GP 1000 Generator',
    brand: 'Solarstock',
    images: [
      gp1000Poster,
      solarYellowBlackPoster2,
      travelPortableSolar,
      familySolarLiving
    ],
    price: 59999,
    originalPrice: 74999,
    discountPercent: 20,
    tag: 'Top Selling',
    isHot: true,
    warranty: '2 Years SolarCare+ Official Replacement',
    capacityVariants: ['576Wh LiFePO4 (1000W AC)', '1024Wh LiFePO4 (1500W AC)'],
    specs: {
      'Rated AC Output': '1000W Continuous Pure Sine Wave (Surge 2000W)',
      'Battery Chemistry': 'Grade-A LiFePO4 (576Wh / 180,000mAh)',
      'Cycle Life': '3000+ Cycles (8-10 Years Life)',
      'Outputs': '2x AC 220V Outlets, 2x USB-A 18W, 1x USB-C 18W, 1x 12V Car Auxiliary Port',
      'Recharge Methods': 'Solar Panel (Up to 200W MPPT), AC Wall Outlet, Car 12V Socket',
      'Weight': '18.9 kg (Heavy-Duty Steel Armored)'
    },
    highlights: [
      'Heavy-duty 1000W continuous output runs blenders, power tools, desktop PCs, TVs, and CPAP machines',
      'Armored steel chassis with reinforced protective side guards built for tough industrial field environments',
      'Advanced multi-layer BMS protects against short circuits, overcharging, and extreme temperatures',
      'High-speed MPPT solar charging accepts up to 200W of folding or rigid solar panel input'
    ],
    shortDesc: 'SolarStock GP 1000 heavy-duty 1000W portable solar generator with 576Wh LiFePO4 and steel casing.',
    description: 'The SolarStock GP 1000 is built for heavy-duty emergency backup, construction sites, outdoor film production, and off-grid remote operations. Featuring robust 1000W pure sine wave power and long-life LiFePO4 energy storage.',
    rating: 4.9,
    reviewsCount: 52,
    minBooking: 3000,
    purchasePoints: 300
  },
  {
    id: 'prod-solarstock-lps1000b',
    name: 'Solarstock SS-LPS1000B 1000W High Capacity Lithium ESS',
    category: 'ips-systems',
    subCategory: 'Solarstock SS-LPS Series Lithium ESS (500W / 1000W)',
    brand: 'Solarstock',
    images: [
      solarYellowBlackPoster2,
      gp1000Poster,
      travelPortableSolar,
      brightSolarBattery
    ],
    price: 64900,
    originalPrice: 76000,
    discountPercent: 15,
    tag: 'Top Selling',
    isHot: true,
    stockCount: 35,
    warranty: '2 Years Official SolarStock Warranty',
    capacityVariants: ['1000W / 2009.6Wh (SS-LPS1000B)', '500W / 1004.8Wh (SS-LPS500B)'],
    specs: {
      'Rated AC Output': '1000 W, Pure Sine Wave, 185–230 Vac 50 Hz',
      'Battery Capacity': '2009.6 Wh, 6.4 Vdc, 314 Ah cells',
      'Charge / Discharge Current': 'Max charge/discharge 220 A, Operating range 5.8–7.2 Vdc',
      'Solar PV Input': 'Rated 38 Vdc, MPPT 15–70 Vdc, Max Voc 80 Vdc, Max solar charging 550 W',
      'AC Charging': '1000 W max, Input 230 Vac (max 300 Vac), 45–65 Hz',
      'DC Outputs': '12 V 60 W max + 5 V 1 A USB + 5 V 1 A Type-C',
      'Protections': 'Overcharge, over-discharge, overcurrent, short-circuit, over-temperature',
      'Dimensions & Weight': '430 × 296 × 157 mm (product), Net weight 20 kg',
      'Operating Environment': 'Working temp: -10 °C to +50 °C, Noise <60 dB'
    },
    highlights: [
      'Massive 2009.6 Wh energy reservoir with high-capacity 314 Ah lithium cells',
      '1000 W pure sine wave AC output (185–230 Vac 50 Hz) for heavy home and field appliances',
      'High-speed 550 W solar charging with MPPT (15–70 Vdc) and rapid 1000 W AC wall fast-charging',
      'Complete multi-layer battery safety suite with ultra-quiet <60 dB cooling'
    ],
    shortDesc: 'Solarstock SS-LPS1000B 1000W pure sine wave ESS with 2009.6Wh 314Ah lithium battery and 550W solar charging.',
    description: 'The Solarstock SS-LPS1000B 1000W High Capacity Lithium ESS features a massive 2009.6 Wh (6.4Vdc, 314 Ah) lithium battery bank. It delivers 1000W pure sine wave AC power (185-230 Vac), supports up to 550W solar charging (MPPT 15-70Vdc), 1000W fast AC charging, DC 12V 60W, USB and Type-C outputs in a compact 20kg chassis.',
    rating: 5.0,
    reviewsCount: 38,
    minBooking: 3000,
    purchasePoints: 325
  },
  {
    id: 'prod-solarstock-lps500b',
    name: 'Solarstock SS-LPS500B 500W Smart Lithium ESS',
    category: 'ips-systems',
    subCategory: 'Solarstock SS-LPS Series Lithium ESS (500W / 1000W)',
    brand: 'Solarstock',
    images: [
      solarYellowBlackPoster1,
      neozl300wPoster,
      travelPortableSolar,
      familySolarLiving
    ],
    price: 36900,
    originalPrice: 43000,
    discountPercent: 14,
    tag: 'Beat The Clock',
    isHot: true,
    stockCount: 45,
    warranty: '2 Years Official SolarStock Warranty',
    capacityVariants: ['500W / 1004.8Wh (SS-LPS500B)'],
    specs: {
      'Rated AC Output': '500 W, Pure Sine Wave, 185–230 Vac 50 Hz',
      'Battery Capacity': '1004.8 Wh, 3.2 Vdc, 314 Ah cells',
      'Charge / Discharge Current': 'Max charge/discharge 220 A, Operating range 3.0–3.6 Vdc',
      'Solar PV Input': 'Rated 30 Vdc, MPPT 10–55 Vdc, Max Voc 56 Vdc, Max solar charging 300 W',
      'AC Charging': '500 W max, Input 230 Vac (max 300 Vac), 45–65 Hz',
      'DC Output': '12 V 60 W max',
      'Dimensions & Weight': '322 × 230 × 150 mm (product), Net weight 10.3 kg',
      'Operating Environment': 'Working temp: -10 °C to +50 °C, Noise <60 dB',
      'Protections': 'Overcharge, over-discharge, overcurrent, short-circuit, overtemperature'
    },
    highlights: [
      'Over 1 kWh (1004.8 Wh) lithium storage with premium 314 Ah single-cell architecture',
      '500 W pure sine wave AC output safely runs fans, laptops, TVs, Wi-Fi routers, and LED lights',
      '300 W solar charging with wide 10–55 Vdc MPPT and fast 500 W AC charging',
      'Ultra-portable 10.3 kg lightweight body with ergonomic carry handle and quiet <60 dB operation'
    ],
    shortDesc: 'Solarstock SS-LPS500B 500W pure sine wave ESS with 1004.8Wh 314Ah lithium battery and 300W solar charging.',
    description: 'The Solarstock SS-LPS500B 500W Smart Lithium ESS provides 1004.8 Wh (3.2Vdc, 314 Ah) of clean, silent power. Delivers 500W pure sine wave AC (185-230 Vac 50 Hz), 300W MPPT solar input (10-55 Vdc), 500W AC wall charging, and 12V 60W DC output in a portable 10.3kg format.',
    rating: 4.9,
    reviewsCount: 46,
    minBooking: 2000,
    purchasePoints: 185
  },
  {
    id: 'prod-youyo-r200',
    name: 'YOUYO R200 200W Portable Power Station (192Wh LiFePO4)',
    category: 'ips-systems',
    subCategory: 'YOUYO Portable Power Stations (R100 / R200)',
    brand: 'YOUYO',
    images: [
      travelPortableSolar,
      neozl300wPoster,
      familySolarLiving,
      solarYellowBlackPoster1
    ],
    price: 18500,
    originalPrice: 22000,
    discountPercent: 16,
    tag: 'Beat The Clock',
    isHot: true,
    stockCount: 60,
    warranty: '2 Years Official Warranty',
    capacityVariants: ['192Wh LiFePO4 / 200W (Surge 400W)'],
    specs: {
      'Dimensions': '203 × 85 × 129 mm',
      'Net Weight': '1.85 kg',
      'Battery Chemistry': 'LFP (LiFePO4), 1P6S configuration, 192 Wh',
      'AC Output': '200 W Pure Sine Wave (Surge 400 W), AC 100 W socket',
      'USB Outputs': 'USB-A ×1 (30 W), USB-C1 (100 W Fast PD), USB-C2 (30 W)',
      'DC Output': 'DC5521 12 V 8 A Max 96 W',
      'Inputs': 'USB-C1 100 W Max, Solar 100 W Max',
      'LED Lighting': 'Multi-function LED (50% / 100% / SOS / Strobe modes)',
      'Included Accessory': 'C-C high-speed charging cable'
    },
    highlights: [
      'Ultra-compact 1.85 kg body with 192 Wh safe LiFePO4 chemistry (1P6S configuration)',
      'High-speed 100W USB-C bidirectional PD port charges laptops and recharges the power station',
      '200W AC pure sine wave output (400W surge) + 30W USB-A, 30W USB-C2, and 96W DC5521',
      'Emergency multi-mode LED torch with 50%, 100%, SOS, and Strobe flashing'
    ],
    shortDesc: 'YOUYO R200 200W ultra-portable power station with 192Wh LiFePO4, 100W USB-C PD, and 100W solar charging.',
    description: 'The YOUYO R200 200W Portable Power Station packs 192 Wh of long-life LiFePO4 (LFP 1P6S) energy into a featherweight 1.85 kg body. Features 200W AC (400W surge), 100W USB-C1 bidirectional input/output, 30W USB-A, 30W USB-C2, 96W DC5521, 100W solar charging, and multi-mode LED torch. Comes with C-C charging cable.',
    rating: 4.9,
    reviewsCount: 31,
    minBooking: 1000,
    purchasePoints: 92
  },
  {
    id: 'prod-youyo-r100',
    name: 'YOUYO R100 100W Mini Portable Power Station (89.6Wh LiFePO4)',
    category: 'ips-systems',
    subCategory: 'YOUYO Portable Power Stations (R100 / R200)',
    brand: 'YOUYO',
    images: [
      familySolarLiving,
      travelPortableSolar,
      neozl300wPoster,
      brightSolarShowcase
    ],
    price: 11900,
    originalPrice: 14500,
    discountPercent: 18,
    tag: 'Beat The Clock',
    isHot: true,
    stockCount: 75,
    warranty: '2 Years Official Warranty',
    capacityVariants: ['89.6Wh LiFePO4 / 100W AC'],
    specs: {
      'Battery Capacity': '89.6 Wh (LiFePO4)',
      'AC Output': '100 W Pure Sine Wave',
      'USB-A Outputs': 'USB-A1 Max 15 W, USB-A2 Max 18 W',
      'USB-C Outputs': 'USB-C1 Max 15 W, USB-C2 Max 45 W Fast Charge',
      'DC Output': 'DC5521 Max 60 W (12 V 5 A)',
      'LED Light': 'Built-in 3 W LED reading/night lamp',
      'Recharge Inputs': 'AC Max 40 W, Solar Max 40 W, USB-C1 Max 15 W',
      'Recharge Times': 'AC ~2.4 Hrs, Solar ~2.4 Hrs, USB-C1 ~6.3 Hrs',
      'Dimensions & Weight': '165 × 85 × 100 mm, Net Weight: ~1.15 kg'
    },
    highlights: [
      'Pocket-sized mini powerhouse: weighs only ~1.15 kg with 165 × 85 × 100 mm pocket footprint',
      'Safe 89.6 Wh LiFePO4 battery with 100W AC outlet and 45W USB-C2 fast charging',
      'Rapid 2.4-hour full recharge via AC wall adapter or 40W solar panel',
      'Dual USB-A (15W/18W), 12V 5A DC5521 (60W), and 3W LED light for camping and emergencies'
    ],
    shortDesc: 'YOUYO R100 100W mini portable power station with 89.6Wh LiFePO4, 45W USB-C, 100W AC, and 1.15kg weight.',
    description: 'The YOUYO R100 100W Mini Portable Power Station is a palm-sized power bank with 89.6 Wh LiFePO4 battery. Weighing just 1.15 kg, it delivers 100W AC output, 45W USB-C2, dual USB-A, 60W DC5521, and a 3W LED lamp. Fast ~2.4 hr recharge via AC or solar.',
    rating: 4.8,
    reviewsCount: 24,
    minBooking: 1000,
    purchasePoints: 60
  }
];

export const DEFAULT_HERO_BILLBOARD: import('../types').HeroBillboardConfig = {
  megaSaleRibbon: 'REGIONAL',
  megaSaleTitle: 'PLATFORM',
  lowestPriceTag: '1,200 MW / 1.2 GW DELIVERED',
  guaranteeBadgeTitle: 'SolarStock Tier-1',
  guaranteeBadgeSubtitle: 'REGIONAL STORAGE & EXECUTION',
  freeDeliveryTitle: 'READY',
  freeDeliverySubtitle: 'REGIONAL STOCK',
  termsDisclaimer: '*COMMERCIAL & RESIDENTIAL',
  centerProductTitle: 'SOLARSTOCK PLATFORM',
  centerProductTag: 'Deye & SAJ Storage',
  centerProductSubtitle: 'Residential to 10MW C&I Solutions',
  leftProductTitle: 'DEYE HYBRID',
  leftProductSubtitle: '5kW - 12kW Low Voltage',
  rightProductTitle: 'TW SOLAR BIFACIAL',
  rightProductSubtitle: '585W - 690W N-Type'
};

export const DEFAULT_SUB_BANNERS: import('../types').SubBannerConfig = {
  leftBanner: {
    topTag: 'Regional Inventory Ready',
    title: 'COMMERCIAL & RESIDENTIAL HYBRID INVERTERS',
    guaranteeText: '5-10 YEAR GUARANTEE',
    categoryLink: 'hybrid-inverters',
    buttonText: 'Explore Solutions'
  },
  rightBanner: {
    topScript: 'Regional Infrastructure & Energy Platform',
    titleMain: 'Solar',
    titleAccent: 'Stock',
    titleTag: 'REGIONAL',
    discountBadge: '1,200 MW+ PROJECTS COMMISSIONED',
    bengaliTag: 'থাইল্যান্ড, বাংলাদেশ ও চায়না রিজিওনাল হাব',
    locationText: 'Bangkok Hub (KX Building, Klongsan) • Dhaka Hub (Baridhara)',
    categoryLink: 'lithium-batteries'
  }
};

export const DEFAULT_FLASH_SALE_CONFIG: import('../types').FlashSaleConfig = {
  title: 'Regional Clearance & Flash Sale ~ Tier-1 Inverters & Storage 🔥',
  subtitle: 'Immediate Dispatch from Regional Warehouses (Bangkok & Dhaka) ⏰',
  countdownHours: 18,
  countdownMinutes: 45,
  countdownSeconds: 20,
  activeProductIds: [
    'prod-solarstock-neozl-300w',
    'prod-deye-sun-5k',
    'prod-tw-solar-585w',
    'prod-difful-3dpc-750w',
    'prod-solarstock-gp-1000'
  ]
};

export const DEFAULT_FOOTER_CONFIG: import('../types').FooterConfig = {
  aboutText: 'SolarStock connects sourcing, storage, and execution into a single coordinated system — helping teams move faster from planning to live deployment across regions. Built for seamless movement from supply to deployment. Wholly owned local subsidiary: SolarStock BD Limited.',
  hotline: '+66 063 323 8863 / 01306-061919',
  email: 'info@solarstock.com',
  socialLinks: {
    facebook: 'https://facebook.com/solarstockbd',
    instagram: 'https://instagram.com/solarstockbd',
    linkedin: 'https://linkedin.com/company/solarstock',
    youtube: 'https://youtube.com/@solarstock',
    whatsapp: 'https://wa.me/8801306061919'
  },
  copyrightText: '© 2026 SolarStock. All rights reserved.',
  isoText: '1,200 MW / 1.2 GW Projects Delivered',
  poweredBy: 'SolarStock Regional Energy Platform'
};

export const DEFAULT_BRAND_CONFIG: import('../types').BrandConfig = {
  logoMain: 'Solar',
  logoAccent: 'Stock',
  logoSymbol: '®',
  tagline: 'Regional Solar Solutions | Infrastructure & Energy Platform',
  announcementText: 'Regional Solar Solutions | Infrastructure & Energy Platform • 1,200 MW+ Delivered Worldwide',
  warrantyHeaderTag: 'Regional Execution & Tier-1 Warranties',
  hotlineHeader: '+66 063 323 8863 | 01306-061919',
  currencySymbol: '৳'
};

export const DEFAULT_POLICIES: import('../types').SitePolicy[] = [
  {
    id: 'terms',
    title: 'Terms & Conditions',
    content: 'Welcome to SolarStock Regional Infrastructure & Energy Platform. All procurement agreements, wholesale orders, and warranty claims across Bangladesh, Thailand, and China are governed by SolarStock\'s international standard commercial terms. All supplied equipment is 100% genuine, brand-sealed, and backed by Tier-1 manufacturer warranties.'
  },
  {
    id: 'refund',
    title: 'Return & Replacement Policy',
    content: 'SolarStock provides factory defect replacement guarantees. For commercial equipment, inverters, and containerized energy storage, certified diagnostics and on-site engineering support are coordinated through our regional desks in Bangkok and Dhaka.'
  },
  {
    id: 'privacy',
    title: 'Privacy Policy',
    content: 'SolarStock respects your corporate and personal privacy. Customer contact details, project specifications, and SLD engineering documents are securely managed and used exclusively for system sizing, order execution, logistics dispatch, and warranty registration.'
  },
  {
    id: 'warranty',
    title: 'SolarCare+ Regional Warranty Policy',
    content: 'SolarCare+ coordinates official manufacturer warranty execution: up to 30 years linear performance on solar PV modules, 5 to 10 years on Deye and SAJ hybrid inverters and high-voltage LiFePO4 batteries, and 2 years on Difful solar pumps.'
  },
  {
    id: 'logistics',
    title: 'Regional Storage & Delivery Policy',
    content: 'SolarStock maintains strategic buffer inventory in Bangkok (Thailand) and Dhaka (Bangladesh) to eliminate international freight lead times. Standard dispatch takes 24-48 hours from regional warehouse hubs.'
  },
  {
    id: 'commercial',
    title: 'EPC & C&I Project Terms',
    content: 'Commercial & Industrial projects (50kW to 10MW) and microgrid solutions (500kW to 5MW) are managed under turnkey engineering agreements, including load profiling, SLD schematics, and commissioning coordination.'
  }
];

export const BRANCHES: BranchLocation[] = [
  {
    id: 'branch-thailand',
    name: 'SolarStock Thailand Regional Office',
    badge: 'Thailand Regional Hub',
    address: 'Building 12th Floor. 110, KX, 1 Soi Krung Thonburi 1, Bang Lamphu Lang, Klongsan, Bangkok 10600, Thailand',
    landmark: 'KX Building, Klongsan, Bangkok',
    phone: '+66 063 323 8863',
    offDay: 'Sunday',
    image: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=600&q=80',
    googleMapUrl: 'https://maps.google.com/?q=KX+Building+1+Soi+Krung+Thonburi+1+Bangkok+10600+Thailand'
  },
  {
    id: 'branch-bangladesh',
    name: 'SolarStock Bangladesh Regional Office',
    badge: 'Bangladesh Regional Hub',
    address: 'House-2, Road-5, Block-K, Baridhara, Dhaka, Bangladesh – 1212',
    landmark: 'Baridhara Diplomatic Zone, Dhaka',
    phone: '01306-061919',
    offDay: 'Friday',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
    googleMapUrl: 'https://maps.google.com/?q=House-2+Road-5+Block-K+Baridhara+Dhaka+1212+Bangladesh'
  },
  {
    id: 'branch-china',
    name: 'SolarStock China Sourcing & Supply Chain Hub',
    badge: 'Global Supply Hub',
    address: 'Regional Sourcing, Technical Coordination & Global Supply Desk, China',
    landmark: 'Global Manufacturing & QA Center',
    phone: '+66 063 323 8863 / 01306-061919',
    offDay: 'Sunday',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
    googleMapUrl: 'https://maps.google.com/?q=SolarStock+Global+Supply+Chain+Center'
  }
];

export const BRANDS = [
  { name: 'Deye', logo: '⚙️ DEYE' },
  { name: 'SAJ', logo: '⚡ SAJ' },
  { name: 'Difful', logo: '💧 DIFFUL' },
  { name: 'EP Equipment', logo: '🚜 EP EQUIPMENT' },
  { name: 'JA Solar', logo: '☀️ JA SOLAR' },
  { name: 'Projoy Electric', logo: '🛡️ PROJOY' },
  { name: 'Solarstock', logo: '🔋 SOLARSTOCK' },
  { name: 'TW Solar (Tongwei)', logo: '🌟 TW SOLAR' }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-green-textile',
    title: "How SolarStock Can Contribute To Bangladesh's Green Textile Manufacturing",
    category: 'News and Events',
    date: 'May 14, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1558441719-8b489c652790?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1558441719-8b489c652790?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'
    ],
    excerpt: "Bangladesh is facing a severe fuel shortage. How SolarStock's lithium-ion electric material handling and integrated ESS battery storage eliminate diesel dependence and power green certifications for global exports.",
    author: 'SolarStock BD Limited Editorial Desk',
    eventDetails: {
      venue: 'ICCB Dhaka',
      dateRange: 'May 14–16, 2026',
      stall: '2nd Bangladesh-China Green Textile Expo (BCGTX 2026)'
    },
    tags: ['#BCGTX2026', '#GreenTextile', '#SolarStock', '#LithiumBattery', '#BangladeshEnergyCrisis', '#UninterruptedPower'],
    content: `Bangladesh is facing a severe fuel shortage. Long queues at gas stations have become daily reality, while factories endure frequent power cuts. The common backup – diesel generators – brings high costs, disruptive noise, harmful emissions, and unreliable refueling. For textile manufacturers, this means production interruptions, rising operational expenses, and difficulty meeting sustainability goals.

SolarStock delivers a cleaner, smarter alternative. Our lithium-ion powered electric forklifts, pallet trucks, and stackers eliminate diesel dependence entirely – zero noise, zero fumes, and lower operating costs. More than just material handling equipment, our integrated lithium battery energy storage systems (ESS) provide factories with uninterrupted power, bridging grid outages instantly and enabling efficient load management. This not only keeps production running smoothly but also helps textile plants secure green certifications – a key advantage for accessing high-value markets in Europe and America.

Since 2012, SolarStock has built over 1,200 MW of solar and storage projects in China and worldwide, with a strong local presence in Bangladesh through SolarStock BD Limited. We invite you to experience our solutions firsthand at the 2nd Bangladesh-China Green Textile Expo (BCGTX 2026) – May 14–16, ICCB Dhaka. Let’s discuss how our lithium-ion technology can keep your factory running, cut costs, and open doors to global buyers.

Official Inquiry Email: info@solarstock.com | Website: www.solarstock.com`
  },
  {
    id: 'blog-bnef-tier1',
    title: 'BloombergNEF Tier 1 Solar Rating: What Nobody Told You',
    category: 'Blogs',
    date: 'May 3, 2026',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80'
    ],
    excerpt: 'Tier 1 measures bankability for large projects, not panel quality for rooftops. Discover the 5 persistent myths and what technical criteria actually matter in Bangladesh’s hot, humid, cyclone-prone climate.',
    author: 'SolarStock Regional Engineering Analysis Team',
    tags: ['#Tier1Solar', '#BNEF', '#SolarMyths', '#SolarBangladesh', '#TOPCon', '#SolarQuality'],
    content: `Tier 1 measures bankability for large projects (non-recourse financing), not panel quality for rooftops.

Criteria (as of 2025):
Manufacturer supplied own-branded modules to at least 6 projects >10 MW each, each financed by 6 different commercial banks within the last 2 years.

BloombergNEF itself explicitly warns:
“We strongly advise module buyers and banks not to use this list as a quality standard.”

It is a quarterly snapshot, not permanent. Rules tightened over time (from 1.5 MW → 5 MW → 10 MW).

5 Critical Myths Debunked:
1. “Tier 1 solar panels exist” – False (rates manufacturers, not panels).
2. Non-Tier-1 = poor quality – False. Many high-quality boutique manufacturers don't finance 10MW+ utility projects.
3. Tier 1 = quality guarantee – No. It guarantees bank financing history, not cell durability.
4. Once Tier 1 always Tier 1 – No. It changes every single quarter.
5. Ads saying “Tier 1 solar panels” = trustworthy – Often deceptive marketing spin.

What actually matters in Bangladesh:
Local service network, long-term performance data, installer responsibility for 10–25 years.

Better evaluation framework:
Bankability reports + RETC/PVEL testing + manufacturer financial health + local operations + warranty claim feasibility + technology (TOPCon/N-type/bifacial) + local installer feedback.

Reference brands evaluated:
Aiko, JA Solar, Jinko, LONGi, Risen Energy, Trina Solar.

Bottom line for Bangladesh (hot, humid, cyclone-prone):
Choose based on real durability, local support, and installer accountability, not marketing labels.`
  },
  {
    id: 'blog-power-bangladesh',
    title: 'SolarStock to Exhibit Complete Power Solutions at Power Bangladesh 2026',
    category: 'News and Events',
    date: 'Apr 14, 2026',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'
    ],
    excerpt: 'SolarStock BD Limited will exhibit complete clean power solutions at Power Bangladesh 2026, April 16–18, ICCB Dhaka, Stall 36, Hall 4. Featuring inverters, BESS, LPS, PPS, and solar pumping.',
    author: 'SolarStock BD Limited Exhibition Team',
    eventDetails: {
      venue: 'ICCB Dhaka',
      dateRange: 'April 16–18, 2026',
      hours: '10am–7pm',
      stall: 'Stall 36, Hall 4'
    },
    quote: {
      text: 'We understand the urgent need for decentralized, affordable energy… Our solutions are tailored for EPC contractors, distributors, shop owners, and building owners who want to cut dependence on volatile fossil fuels while ensuring uninterrupted operations.',
      author: 'Star Su',
      role: 'Managing Director'
    },
    tags: ['#PowerBangladesh2026', '#SolarStock', '#CleanEnergy', '#ICCB', '#SolarInverters', '#BESS'],
    content: `SolarStock BD Limited will exhibit at Power Bangladesh 2026, April 16–18 (10am–7pm), ICCB Dhaka, Stall 36, Hall 4.

Product lineup shown:
• Solar PV panels, inverters & BESS
• LPS, PPS (advanced replacements for traditional IPS)
• Mounting structures, cables and accessories
• Rechargeable fans & lights
• Solar pumping for irrigation/agriculture
• Electric stackers, pallet-movers, forklifts

Why trust SolarStock:
China HQ has delivered 1.2 GW of solar, storage, and EV charging projects since 2012. Mature teams and warehouses in China, Bangladesh, and Thailand.

Target visitors:
EPCs, distributors, project developers, factory and building owners.

Key benefits:
Customised packages, partnership models, direct access to large-scale project experts.

Official contact: info@solarstock.com | 01306-061919`
  }
];

export const HISTORICAL_DISPATCHES: ArchiveNewsItem[] = [
  {
    id: 'arch-subsidiary-bd',
    title: 'SolarStock Establishes Bangladesh Subsidiary',
    date: '2025-06-25',
    category: 'Regional Expansion',
    location: 'Dhaka, Bangladesh',
    summary: 'Wholly owned local subsidiary based in Dhaka to accelerate local service, stocking, and growth in South Asia.',
    details: 'To directly serve regional EPC contractors and industrial factories, SolarStock established its wholly owned local subsidiary SolarStock BD Limited in Dhaka, Bangladesh. Provides local inventory, project engineering, and direct manufacturer warranties.'
  },
  {
    id: 'arch-asean-energy-2025',
    title: 'ASEAN Sustainable Energy 2025',
    date: '2025-06-25',
    category: 'International Exhibition',
    location: '60 Ratchadaphisek Rd, Khwaeng Khlong Toei, Bangkok',
    booth: 'Booth L45',
    summary: 'SolarStock exhibition participation July 2–4 at Bangkok showcasing hybrid solar, microinverters, and container storage.',
    details: 'SolarStock showcased high-efficiency C&I solar inverters, balcony microinverter storage systems, and lithium ESS solutions at Booth L45. Emphasizing rapid regional delivery between Bangkok and Dhaka hubs.'
  },
  {
    id: 'arch-team-bangladesh',
    title: 'SolarStock Team in Bangladesh',
    date: '2025-05-29',
    category: 'Operations Milestone',
    location: 'Dhaka, Bangladesh',
    summary: 'Celebrating the establishment of our local Dhaka team and regional operations hub.',
    details: 'Formal inauguration of the Dhaka engineering and logistics team supporting Bangladesh’s national renewable transition and textile sector decarbonization.'
  },
  {
    id: 'arch-renex-powergen-2025',
    title: 'RENEX / PowerGen Bangladesh 2025',
    date: '2025-05-29',
    category: 'Exhibition & Launch',
    location: 'Dhaka, Bangladesh',
    booth: 'Booth H2-14',
    summary: 'Exhibiting May 29–31 at Booth H2-14 featuring Deye hybrid inverter series and high-efficiency lithium battery storage.',
    details: 'Showcased the complete Deye low-voltage and high-voltage inverter series alongside high-efficiency lithium battery storage. Official contact referenced as info@solarstock.com and Facebook @SolarStock BD.'
  }
];

export const LIVE_NOTIFICATIONS: LiveNotification[] = [
  {
    id: 'notif-1',
    productName: 'Deye SUN-5K-SG04LP1 5kW Hybrid Inverter',
    image: brightSolarShowcase,
    timeAgo: 'About 4 minutes ago',
    location: 'Bangkok, Thailand'
  },
  {
    id: 'notif-2',
    productName: 'TW Solar 585W TNC N-Type Bifacial Module',
    image: flagshipSolarArray,
    timeAgo: 'About 11 minutes ago',
    location: 'Dhaka, Bangladesh'
  },
  {
    id: 'notif-3',
    productName: 'Difful 3DPC3.5-95-48-750 DC Solar Pump',
    image: brightSolarShowcase,
    timeAgo: 'About 18 minutes ago',
    location: 'Baridhara, Dhaka'
  },
  {
    id: 'notif-4',
    productName: 'SAJ H2-10K-T2 10kW Three-Phase Inverter',
    image: brightSolarBattery,
    timeAgo: 'About 27 minutes ago',
    location: 'Klongsan, Bangkok'
  },
  {
    id: 'notif-5',
    productName: 'SolarStock NEOZL 300W Portable Station',
    image: neozl300wPoster,
    timeAgo: 'About 34 minutes ago',
    location: 'Chittagong, Bangladesh'
  },
  {
    id: 'notif-6',
    productName: 'EP Equipment EPL154 Lithium Pallet Truck',
    image: brightSolarBattery,
    timeAgo: 'About 42 minutes ago',
    location: 'Regional Logistics Center'
  }
];

export const SEARCH_SUGGESTIONS = [
  'Deye 5kW Hybrid Inverter',
  'Deye 12kW Three-Phase Inverter',
  'SAJ H2 10kW High Voltage Inverter',
  'TW Solar 585W N-Type Bifacial',
  'TW Solar 690W G12 Module',
  'JA Solar DeepBlue 580W TOPCon',
  'Difful DC Solar Submersible Pump',
  'Difful AC/DC Deep Well Irrigation',
  'Projoy PEFS Rapid Shutdown',
  'Projoy 1000V DC Isolator',
  'EP Equipment EPL154 Lithium Pallet Truck',
  'SolarStock NEOZL 300W LiFePO4',
  'SolarStock GP 1000 Solar Generator'
];

export const ALL_PRODUCTS = PRODUCTS;

export const HERO_SLIDES = [
  {
    id: 'slide-1',
    title: 'Regional Solar Solutions | Infrastructure & Energy Platform',
    subtitle: 'Connecting sourcing, storage, and execution into a single coordinated system across Bangladesh, Thailand & China.',
    priceText: 'BDT ৳ 115,000',
    originalPriceText: 'BDT ৳ 130,000',
    discountBadge: '12% OFF',
    warrantyBadge: '5 Yrs Factory Warranty',
    image: 'https://images.unsplash.com/photo-1558441719-8b489c652790?auto=format&fit=crop&w=1000&q=80',
    productId: 'prod-deye-sun-5k',
    category: 'hybrid-inverters',
    bgGradient: 'from-amber-400 via-amber-300 to-yellow-100',
    badgeText: 'REGIONAL SOLAR PLATFORM'
  },
  {
    id: 'slide-2',
    title: 'Commercial & Industrial Solar (50kW to 10MW)',
    subtitle: 'Tier-1 Deye & SAJ hybrid inverters with scalable high-voltage LiFePO4 energy storage for industrial facilities.',
    priceText: 'BDT ৳ 265,000',
    originalPriceText: 'BDT ৳ 295,000',
    discountBadge: '৳30,000 OFF',
    warrantyBadge: '10 Years Official Guarantee',
    image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1000&q=80',
    productId: 'prod-deye-sun-12k',
    category: 'hybrid-inverters',
    bgGradient: 'from-amber-500 via-amber-400 to-amber-200',
    badgeText: 'C&I ENERGY STORAGE'
  },
  {
    id: 'slide-3',
    title: 'TW Solar 585W TNC N-Type Bifacial Dual-Glass Panels',
    subtitle: '22.6% Yield • Tier-1 Bloomberg NEF • 30 Years Linear Performance Output Guarantee.',
    priceText: 'BDT ৳ 15,800',
    originalPriceText: 'BDT ৳ 18,500',
    discountBadge: '15% OFF',
    warrantyBadge: '30 Years Linear Warranty',
    image: flagshipSolarArray,
    productId: 'prod-tw-solar-585w',
    category: 'solar-panels',
    bgGradient: 'from-yellow-400 via-amber-300 to-orange-100',
    badgeText: 'TIER-1 N-TYPE DUAL GLASS'
  }
];

const solarstockPowerStations = PRODUCTS.filter(p => p.id.startsWith('prod-solarstock-'));
const otherFlashDeals = PRODUCTS.filter(p => !p.id.startsWith('prod-solarstock-') && (p.discountPercent >= 10 || p.isHot));

export const FLASH_SALE_PRODUCTS = [...solarstockPowerStations, ...otherFlashDeals];
export const BEST_DEALS_PRODUCTS = PRODUCTS.filter(p => p.price > 0 && p.price < 50000).slice(0, 8);
export const RECENT_PRODUCTS = PRODUCTS.slice().reverse().slice(0, 6);
export const TRENDING_PRODUCTS = PRODUCTS.filter(p => p.rating && p.rating >= 4.8).slice(0, 8);

export const DEFAULT_HERO_SLIDES: HeroSlideItem[] = [
  {
    id: 0,
    image: flagshipSolarArray,
    alt: 'Large Utility & Commercial Solar Project Commissioned by SolarStock',
    tag: 'REGIONAL SOLAR SOLUTIONS',
    badge: '1100MW+ Commissioned',
    title: 'Regional Solar Solutions | Infrastructure & Energy Platform',
    subtitle: 'Connecting sourcing, storage, and execution into a single coordinated system across Bangladesh, Thailand, and China.',
    category: 'hybrid-inverters',
    buttonText: 'Explore Solutions'
  },
  {
    id: 1,
    image: rooftopSolarHome,
    alt: 'Commercial & Industrial Solar Installation',
    tag: 'COMMERCIAL & INDUSTRIAL (50kW - 10MW)',
    badge: 'Tier-1 Deye & SAJ Partner',
    title: 'High-Efficiency C&I Hybrid Inverters & High-Voltage ESS',
    subtitle: 'Scalable energy storage and solar generation engineered to power manufacturing facilities and commercial parks.',
    category: 'lithium-batteries',
    buttonText: 'View C&I Solutions'
  },
  {
    id: 2,
    image: brightSolarShowcase,
    alt: 'High Performance Solar PV Panels',
    tag: 'TIER-1 SOLAR PV MODULES',
    badge: '30-Year Performance Warranty',
    title: 'TW Solar & JA Solar High-Efficiency TOPCon Bifacial Arrays',
    subtitle: '580W to 690W N-Type dual-glass modules delivering industry-leading energy density and lowest levelized cost of energy.',
    category: 'solar-panels',
    buttonText: 'View Solar Modules'
  },
  {
    id: 3,
    image: travelPortableSolar,
    alt: 'Agricultural Solar Water Pumping and Off-Grid Stations',
    tag: 'SOLAR PUMPING & PORTABLE ESS',
    badge: 'Zero-Fuel Solar Irrigation',
    title: 'Difful Solar Pumps & SolarStock LiFePO4 Power Stations',
    subtitle: 'Brushless DC submersible irrigation pumps and ultra-durable LiFePO4 generators for off-grid energy security.',
    category: 'solar-pumps',
    buttonText: 'Explore Solar Pumping'
  }
];

export const DEFAULT_SLIDE3_PRODUCTS: Slide3ShowcaseProduct[] = [
  {
    id: 'deye-12kw',
    category: 'hybrid-inverters',
    name: 'Deye 12kW Three-Phase Hybrid Inverter',
    tag: 'DEYE FLAGSHIP HYBRID',
    spec: '97.6% Efficiency • 48V Low Voltage Safe',
    badge: '100% Unbalanced Output',
    accentColor: '#38bdf8',
    image: brightSolarShowcase
  },
  {
    id: 'saj-b2-10k',
    category: 'lithium-batteries',
    name: 'SAJ B2-10.0-HV1 High-Voltage ESS',
    tag: 'SMART ENERGY STORAGE',
    spec: '10.24kWh • 6,000+ Deep Cycles',
    badge: 'Grade-A Smart BMS',
    accentColor: '#34d399',
    image: brightSolarBattery
  },
  {
    id: 'tw-solar-585w',
    category: 'solar-panels',
    name: 'TW Solar 585W TNC N-Type Bifacial',
    tag: 'N-TYPE DUAL GLASS',
    spec: '22.6% Yield • 30-Yr Power Output',
    badge: 'Tier-1 Bloomberg NEF',
    accentColor: '#fbbf24',
    image: flagshipSolarArray
  },
  {
    id: 'difful-3dpc-750w',
    category: 'solar-pumps',
    name: 'Difful DC Submersible Solar Pump',
    tag: 'SOLAR IRRIGATION',
    spec: '3.5 m³/h • 95m Head • 48V MPPT',
    badge: 'Stainless 304 Casing',
    accentColor: '#f59e0b',
    image: brightSolarShowcase
  }
];

export const DEFAULT_PEACE_OF_MIND: PeaceOfMindConfig = {
  sectionTitle: 'SolarStock™ Regional Peace of Mind Guarantee',
  trustHighlight: '1100MW+ Commissioned Projects Across South Asia, Southeast Asia & Middle East',
  items: [
    {
      id: 'pom-1',
      tag: 'DIRECT AUTHORIZED',
      tagColor: 'bg-emerald-100 text-emerald-800',
      title: '100% Genuine Tier-1 Partners',
      subtitle: 'Official Channel for Deye, SAJ, Difful, JA Solar, TW Solar & Projoy',
      iconType: 'shield'
    },
    {
      id: 'pom-2',
      tag: 'REGIONAL STORAGE',
      tagColor: 'bg-amber-100 text-amber-800',
      title: 'Local Storage & Availability',
      subtitle: 'Fast Deployment from Strategic Warehouses in Bangkok & Dhaka',
      iconType: 'zap'
    },
    {
      id: 'pom-3',
      tag: 'TECHNICAL SUPPORT',
      tagColor: 'bg-sky-100 text-sky-800',
      title: 'Turnkey Engineering & Sizing',
      subtitle: 'Expert System Design from 3kW Residential to 10MW Industrial C&I',
      iconType: 'calendar'
    },
    {
      id: 'pom-4',
      tag: 'CERTIFIED WARRANTY',
      tagColor: 'bg-purple-100 text-purple-800',
      title: 'Up to 30 Yrs Official Warranty',
      subtitle: 'Direct Factory Backing & Rapid Local Replacement Support',
      iconType: 'rotate'
    }
  ]
};

export const DEFAULT_SOLAR_CARE: SolarCareConfig = {
  badgeText: 'Regional Solar Platform',
  tag: 'Regional Solar Platform',
  titleMain: 'Why',
  titleHighlight: 'SolarStock Platform?',
  title: 'Why SolarStock Platform?',
  description: 'SolarStock connects sourcing, storage, and execution into a single coordinated system — helping teams move faster from planning to live deployment across regions. Built for seamless movement from supply to deployment.',
  feature1Title: 'Local Storage & Availability',
  feature1Desc: 'Immediate dispatch from regional hubs',
  feature2Title: '1100MW+ Execution Experience',
  feature2Desc: 'Mountain, floating, carport, C&I, BIPV & ESS',
  features: [
    {
      id: 'sc-1',
      title: 'Local Storage & Availability',
      subtitle: 'Immediate dispatch from regional hubs'
    },
    {
      id: 'sc-2',
      title: '1100MW+ Execution Experience',
      subtitle: 'Mountain, floating, carport, C&I, BIPV & ESS'
    }
  ]
};

export const DEFAULT_BRANDS_LIST: BrandItem[] = [
  { name: 'Deye', logo: '⚙️ DEYE', tagline: 'Industrial & Hybrid Inverters & LiFePO4 ESS' },
  { name: 'SAJ', logo: '⚡ SAJ', tagline: 'Smart Inverters & High-Voltage Energy Storage' },
  { name: 'Difful', logo: '💧 DIFFUL', tagline: 'Global Leader in DC & Hybrid Solar Water Pumps' },
  { name: 'EP Equipment', logo: '🚜 EP EQUIPMENT', tagline: 'Lithium-Ion Material Handling & Logistics' },
  { name: 'JA Solar', logo: '☀️ JA SOLAR', tagline: 'Tier-1 DeepBlue High-Efficiency TOPCon Panels' },
  { name: 'Projoy Electric', logo: '🛡️ PROJOY', tagline: 'Solar Safety Switches, Rapid Shutdown & Isolators' },
  { name: 'Solarstock', logo: '🔋 SOLARSTOCK', tagline: 'Regional Solar Solutions & Portable Power' },
  { name: 'TW Solar (Tongwei)', logo: '🌟 TW SOLAR', tagline: 'World Leading High-Efficiency TNC & G12 Modules' }
];

export const DEFAULT_FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    q: "1. What regions does SolarStock serve and where are your operational hubs?",
    a: "SolarStock operates an integrated regional platform across Bangladesh, Thailand, and China, with active project deployment and distribution across South Asia, Southeast Asia, the Middle East, and Africa. We maintain strategic warehousing and engineering desks in Dhaka (Baridhara) and Bangkok (KX Building, Klongsan) alongside our China sourcing and quality assurance hub."
  },
  {
    id: 'faq-2',
    q: "2. What solution categories and project capacities does SolarStock support?",
    a: "SolarStock provides end-to-end solar solutions across five key categories: Residential (3–30kW on-grid and hybrid systems), Commercial & Industrial (50kW–10MW on-grid and hybrid installations), Micro Grid (500kW/1MWh to 5MW/10MWh containerized solutions), Solar Pumping (Difful agricultural and surface systems), and Balcony Solar systems."
  },
  {
    id: 'faq-3',
    q: "3. Who are SolarStock's authorized brand and manufacturing partners?",
    a: "SolarStock is an authorized direct regional channel and distribution partner for global Tier-1 leaders including Deye (hybrid inverters and ESS), SAJ (smart inverters and high-voltage storage), Difful (DC submersible and solar pumps), EP Equipment (electric warehouse lithium pallet trucks), JA Solar (N-Type TOPCon panels), Projoy Electric (rapid shutdown and DC safety switches), TW Solar / Tongwei (high-power bifacial modules), and SolarStock portable power stations."
  },
  {
    id: 'faq-4',
    q: "4. What is SolarStock's track record and experience in solar infrastructure?",
    a: "Established in 2012, SolarStock has participated in over 1100MW+ of commissioned solar projects worldwide. Our experience spans diverse environments including mountain solar, floating solar, solar carports, C&I rooftop installations, residential solar, building-integrated photovoltaics (BIPV), large-scale energy storage systems (ESS), and EV charging infrastructure."
  },
  {
    id: 'faq-5',
    q: "5. What are SolarStock's four core business sectors?",
    a: "SolarStock operates across four coordinated sectors: EPC (engineering, procurement, and project execution exceeding 1100MW), R&D (in-house product development since 2015), EMC (energy management contract & investment of ~100MW), and Regional Distribution with local buffer storage."
  },
  {
    id: 'faq-6',
    q: "6. How can I contact SolarStock or request project sizing and quotes?",
    a: "You can reach out to our regional desks via the online Contact Form, email contact@solarstock.com, or directly call our Bangkok office at +66 063 323 8863 or Dhaka office at 01306-061919. Our engineering team provides detailed SLDs, load analyses, and turnkey commercial proposals."
  }
];

export const DEFAULT_BLOGS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Regional Solar Supply Chains: How Coordinated Sourcing and Local Warehousing in Thailand and Bangladesh Accelerate Project Deployment',
    category: 'REGIONAL LOGISTICS',
    date: '18 AUG, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1558441719-8b489c652790?auto=format&fit=crop&w=600&q=80'
    ],
    excerpt: 'How SolarStock eliminates regional import bottlenecks through pre-allocated stock in Bangkok and Dhaka, cutting project commissioning timelines by over 40%.',
    author: 'SolarStock Regional Engineering Desk'
  },
  {
    id: 'blog-2',
    title: 'Selecting Between Low-Voltage and High-Voltage C&I Energy Storage: Deye vs SAJ System Architectures',
    category: 'ESS ENGINEERING',
    date: '14 AUG, 2026',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80'
    ],
    excerpt: 'A technical evaluation of 48V low-voltage battery banks versus 200V-600V high-voltage containerized ESS for commercial factories and microgrids up to 10MW.',
    author: 'Engr. Tanvir Ahmed, Chief Solutions Architect'
  },
  {
    id: 'blog-3',
    title: 'Replacing Diesel with Solar Water Pumping: Field Economics of Difful MPPT Systems Across South Asia',
    category: 'SOLAR AGRICULTURE',
    date: '08 AUG, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=600&q=80'
    ],
    excerpt: 'How agricultural cooperatives and irrigation schemes achieve full ROI in under 18 months using Difful brushless submersible solar pumps and zero-fuel power.',
    author: 'SolarStock Agricultural Energy Group'
  }
];
