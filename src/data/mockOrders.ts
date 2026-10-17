import { Order } from '../types';

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'SS-2026-8941',
    createdAt: '2026-10-17T08:15:00Z',
    customer: {
      name: 'Engr. Rafiqul Islam',
      phone: '01711-892341',
      email: 'engr.rafiq@technopowerbd.com',
      address: 'House 42, Road 11, Sector 4, Uttara',
      district: 'Dhaka',
      division: 'Dhaka',
      customerType: 'corporate_b2b'
    },
    items: [
      {
        productId: 'prod-growatt-5000es',
        productName: 'Growatt SPF 5000 ES Off-Grid Solar Hybrid Inverter',
        productImage: 'https://images.unsplash.com/photo-1508873696983-2df5293cb395?auto=format&fit=crop&w=600&q=80',
        price: 78500,
        quantity: 1,
        capacity: '5kW (48V)',
        voltage: '48V DC',
        color: 'Solar White',
        carePlanName: 'SolarCare+ 2-Year Lightning Surge Plan',
        carePlanPrice: 2800,
        totalPrice: 81300
      },
      {
        productId: 'prod-felicity-10kwh',
        productName: 'Felicity Solar 48V 200Ah 10kWh LiFePO4 Lithium Battery Rack',
        productImage: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&w=600&q=80',
        price: 185000,
        quantity: 1,
        capacity: '10kWh (48V 200Ah)',
        voltage: '48V DC',
        totalPrice: 185000
      }
    ],
    subtotal: 266300,
    deliveryFee: 0,
    discountAmount: 13315, // 5% B2B discount
    totalAmount: 252985,
    paymentMethod: 'bank_transfer',
    paymentStatus: 'paid',
    status: 'pending',
    statusHistory: [
      {
        status: 'pending',
        timestamp: '2026-10-17T08:15:00Z',
        note: 'Order submitted online via Bank Wire (Eastern Bank Ltd). Verification required.'
      }
    ],
    customerNotes: 'Please deliver through heavy equipment hydraulic lift truck to Uttara roof.',
    adminNotes: 'Payment verified by Accounts (Slip #EBL-491204). Ready for warehouse packing.'
  },
  {
    id: 'SS-2026-8935',
    createdAt: '2026-10-16T16:40:00Z',
    customer: {
      name: 'Tanvir Hossain Chowdhury',
      phone: '01819-450122',
      email: 'tanvir@agroindustrialbd.com',
      address: 'Plot 18, Block B, Agrabad Commercial Area',
      district: 'Chattogram',
      division: 'Chattogram',
      customerType: 'corporate_b2b'
    },
    items: [
      {
        productId: 'prod-longi-585w',
        productName: 'LONGi 585W Hi-MO 6 Explorer Mono-Facial Solar Panel',
        productImage: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=600&q=80',
        price: 19800,
        quantity: 12,
        capacity: '585 Watt',
        totalPrice: 237600
      }
    ],
    subtotal: 237600,
    deliveryFee: 1500,
    discountAmount: 10000,
    totalAmount: 229100,
    paymentMethod: 'bkash',
    paymentStatus: 'paid',
    status: 'processing',
    statusHistory: [
      {
        status: 'pending',
        timestamp: '2026-10-16T16:40:00Z',
        note: 'Order placed with bKash Merchant Payment (Trx: 9KM72A11Q).'
      },
      {
        status: 'processing',
        timestamp: '2026-10-17T02:10:00Z',
        note: 'Solar panels pulled from Tejgaon Central Depo. Crating for Chittagong highway.'
      }
    ],
    courierTracking: {
      courierName: 'Sundarban Courier Service',
      trackingNumber: 'SC-CTG-98214',
      dispatchedDate: '2026-10-17'
    },
    customerNotes: 'Requires wooden pallet crating to prevent micro-cracks during highway transit.'
  },
  {
    id: 'SS-2026-8920',
    createdAt: '2026-10-15T11:20:00Z',
    customer: {
      name: 'Mahfuzur Rahman',
      phone: '01923-771100',
      email: 'mahfuz.sylhet@gmail.com',
      address: 'Shahjalal Upashahar, Block D, Main Road',
      district: 'Sylhet',
      division: 'Sylhet',
      customerType: 'regular'
    },
    items: [
      {
        productId: 'prod-luminous-1500va',
        productName: 'Luminous Solarverter PRO 1500VA / 24V Pure Sine Wave Hybrid IPS',
        productImage: 'https://images.unsplash.com/photo-1558441719-8b839846b0d9?auto=format&fit=crop&w=600&q=80',
        price: 24500,
        quantity: 1,
        capacity: '1500VA (24V)',
        voltage: '24V DC',
        carePlanName: 'SolarCare+ 1-Year Rapid Replacement Warranty',
        carePlanPrice: 1200,
        totalPrice: 25700
      }
    ],
    subtotal: 25700,
    deliveryFee: 450,
    discountAmount: 0,
    totalAmount: 26150,
    paymentMethod: 'cod',
    paymentStatus: 'cod',
    status: 'shipped',
    statusHistory: [
      {
        status: 'pending',
        timestamp: '2026-10-15T11:20:00Z',
        note: 'Cash on delivery order verified by phone agent.'
      },
      {
        status: 'processing',
        timestamp: '2026-10-15T14:00:00Z',
        note: 'Package inspected, QC passed, and sealed.'
      },
      {
        status: 'shipped',
        timestamp: '2026-10-16T09:30:00Z',
        note: 'Handed over to Steadfast Courier Sylhet Express.'
      }
    ],
    courierTracking: {
      courierName: 'Steadfast Courier',
      trackingNumber: 'SF-SYL-55209',
      dispatchedDate: '2026-10-16'
    },
    customerNotes: 'Please call 30 minutes before delivery.'
  },
  {
    id: 'SS-2026-8892',
    createdAt: '2026-10-14T14:10:00Z',
    customer: {
      name: 'Dr. Shirin Akhter',
      phone: '01715-339900',
      email: 'dr.shirin@medicare.bd',
      address: 'Apartment 6B, Green Leaf Villa, Dhanmondi 27',
      district: 'Dhaka',
      division: 'Dhaka',
      customerType: 'regular'
    },
    items: [
      {
        productId: 'prod-growatt-5000es',
        productName: 'Growatt SPF 5000 ES Off-Grid Solar Hybrid Inverter',
        productImage: 'https://images.unsplash.com/photo-1508873696983-2df5293cb395?auto=format&fit=crop&w=600&q=80',
        price: 78500,
        quantity: 1,
        capacity: '5kW (48V)',
        totalPrice: 78500
      }
    ],
    subtotal: 78500,
    deliveryFee: 0,
    discountAmount: 2000,
    totalAmount: 76500,
    paymentMethod: 'emi',
    paymentStatus: 'paid',
    status: 'delivered',
    statusHistory: [
      {
        status: 'pending',
        timestamp: '2026-10-14T14:10:00Z',
        note: 'City Bank Amex 0% EMI 12-month approved.'
      },
      {
        status: 'processing',
        timestamp: '2026-10-14T16:00:00Z',
        note: 'Ready at Dhanmondi experience center.'
      },
      {
        status: 'shipped',
        timestamp: '2026-10-15T10:00:00Z',
        note: 'SolarStock certified technician dispatched for site install.'
      },
      {
        status: 'delivered',
        timestamp: '2026-10-15T15:30:00Z',
        note: 'Unit commissioned, solar test successful, customer signed warranty booklet.'
      }
    ]
  }
];
