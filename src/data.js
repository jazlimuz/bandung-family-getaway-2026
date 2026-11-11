export const initialData = {
  trip: {
    name: 'Bandung Family Getaway',
    startDate: '2026-11-22',
    endDate: '2026-11-27',
    adults: 2,
    children: 1,
    childAge: '4 years old',
    currencyRate: 11800,
    notes: 'Balanced family pace. Keep downtime flexible for Melissa, snacks and rest. Halal-preferred food.'
  },
  flights: [
    { id: 'f1', direction: 'Outbound', airline: 'Scoot', flightNo: 'To confirm', date: '2026-11-22', from: 'Singapore (SIN)', to: 'Jakarta (CGK)', depart: '07:55', arrive: '08:50', status: 'Booked', notes: 'Booked via Trip.com. Flight, seats and baggage paid.' },
    { id: 'f2', direction: 'Return', airline: 'Garuda Indonesia', flightNo: 'To confirm', date: '2026-11-27', from: 'Jakarta (CGK)', to: 'Singapore (SIN)', depart: '18:45', arrive: '21:45', status: 'Booked', notes: 'Allow sufficient time from Bandung to Soekarno-Hatta Airport.' }
  ],
  rail: [
    { id: 'r1', title: 'Outbound Whoosh', date: '2026-11-22', route: 'Halim → Padalarang', time: 'After arrival at Halim', class: 'Business Class', status: 'Not purchased', notes: 'Plan is to purchase Business Class tickets directly at the station on arrival. Check availability and departure options.' },
    { id: 'r2', title: 'Return Whoosh', date: '2026-11-27', route: 'Padalarang → Halim', time: 'To be confirmed', class: 'Business Class preferred', status: 'Not purchased', notes: 'Choose a train that leaves a generous buffer for the 18:45 Garuda flight from CGK.' }
  ],
  transport: [
    { id: 't1', day: 1, mode: 'GrabCar', route: 'Soekarno-Hatta Airport → Halim Station', payment: 'YouTrip / app', notes: 'Airport-to-station transfer before Whoosh.' },
    { id: 't2', day: 1, mode: 'GrabCar / pre-arranged transfer', route: 'Padalarang Station → Bobocabin Signature Sukawana', payment: 'Confirm with driver', notes: 'Compare Grab availability with a pre-arranged transfer; cabin is in a more secluded area.' },
    { id: 't3', day: 2, mode: 'Private driver / charter', route: 'Bobocabin → Lembang attractions → Bobocabin', payment: 'Cash or agreed method', notes: 'Confirm driver, vehicle, child seat and total price before trip.' },
    { id: 't4', day: 3, mode: 'Private driver / transfer', route: 'Bobocabin → voco Bandung Setiabudi', payment: 'Cash or agreed method', notes: 'Hotel move day. Kawah Putih was considered but is optional; keep the route realistic with a 4-year-old.' },
    { id: 't5', day: 4, mode: 'GrabCar / GoCar', route: 'voco ↔ Braga / central Bandung', payment: 'YouTrip / app', notes: 'Short city rides; check traffic and pickup points.' },
    { id: 't6', day: 5, mode: 'GrabCar / private driver', route: 'voco ↔ chosen activity', payment: 'YouTrip / cash', notes: 'Keep this day flexible for weather, energy and shopping.' },
    { id: 't7', day: 6, mode: 'Private transfer / Grab + Whoosh', route: 'voco → Padalarang → Halim → Soekarno-Hatta Airport', payment: 'Mixed', notes: 'Do not leave Bandung too late. Confirm rail timing and airport transfer.' }
  ],
  stays: [
    { id: 's1', name: 'Bobocabin Signature Sukawana', room: 'Grand Cabin Hot Tub', checkIn: '2026-11-22', checkOut: '2026-11-24', nights: 2, priceSgd: 389.42, breakfast: 'Included', location: 'Sukawana, Lembang area', notes: 'Booked. Nature stay; plan transfers in advance due to its secluded location.' },
    { id: 's2', name: 'voco Bandung Setiabudi by IHG', room: 'King Deluxe City View', checkIn: '2026-11-24', checkOut: '2026-11-27', nights: 3, priceSgd: 267.87, breakfast: 'Included', location: 'Setiabudi, Bandung', notes: 'Booked. Convenient base for the city and remaining activities.' }
  ],
  days: [
    { id: 'd1', date: '2026-11-22', title: 'Arrival & settle into the cabin', area: 'Jakarta → Padalarang → Sukawana', hotelId: 's1', pace: 'Easy arrival day. Prioritise transfers, food, check-in and rest.', items: [
      { id: 'a11', time: '07:55', type: 'transport', title: 'Scoot flight: Singapore to Jakarta', place: 'SIN → CGK', cost: 'Paid', payment: 'prepaid', notes: 'Flight booked; arrive at CGK around 08:50.' },
      { id: 'a12', time: 'Morning', type: 'transport', title: 'Grab to Halim Station', place: 'CGK → Halim', cost: 'Estimate to add', payment: 'youtrip', notes: 'Allow for Jakarta traffic and airport exit time.' },
      { id: 'a13', time: 'To confirm', type: 'transport', title: 'Whoosh Business Class to Padalarang', place: 'Halim → Padalarang', cost: 'Not purchased', payment: 'cash', notes: 'Current plan is to buy at the station on arrival, subject to seat availability.' },
      { id: 'a14', time: 'Afternoon', type: 'transport', title: 'Transfer to Bobocabin', place: 'Padalarang → Sukawana', cost: 'Estimate to add', payment: 'cash', notes: 'Decide between Grab and a pre-arranged driver.' },
      { id: 'a15', time: 'Evening', type: 'stay', title: 'Check in & relax', place: 'Bobocabin Signature Sukawana', cost: 'Booked', payment: 'prepaid', notes: 'Unpack, enjoy the cabin and keep dinner simple.' }
    ]},
    { id: 'd2', date: '2026-11-23', title: 'Lembang & forest day', area: 'Lembang / Cikole', hotelId: 's1', pace: 'Main nature and attraction day. Avoid stacking too many stops; leave a rest window.', items: [
      { id: 'a21', time: 'Morning', type: 'activity', title: 'Orchid Forest Cikole', place: 'Cikole', cost: 'Estimate to add', payment: 'cash', notes: 'One of the preferred must-visit places. Check weather and walking distance.' },
      { id: 'a22', time: 'Lunch', type: 'food', title: 'Lunch in Lembang', place: 'Choose halal-friendly restaurant', cost: 'Estimate to add', payment: 'cash', notes: 'Add the specific restaurant once selected.' },
      { id: 'a23', time: 'Afternoon', type: 'activity', title: 'Lembang attraction of choice', place: 'Lembang', cost: 'Estimate to add', payment: 'cash', notes: 'Consider Great Asia Africa, Floating Market or another child-friendly stop. Keep one optional.' },
      { id: 'a24', time: 'Evening', type: 'food', title: 'Dinner near cabin', place: 'Sukawana / Lembang', cost: 'Estimate to add', payment: 'cash', notes: 'Keep the return journey manageable.' }
    ]},
    { id: 'd3', date: '2026-11-24', title: 'Hotel move to voco', area: 'Sukawana → Setiabudi', hotelId: 's2', pace: 'Check out and transfer to the second hotel. Kawah Putih is optional, not a fixed commitment.', items: [
      { id: 'a31', time: 'Morning', type: 'stay', title: 'Check out from Bobocabin', place: 'Sukawana', cost: 'Included', payment: 'prepaid', notes: 'Pack before breakfast and confirm pickup.' },
      { id: 'a32', time: 'Daytime', type: 'activity', title: 'Optional scenic stop / Kawah Putih decision', place: 'Ciwidey (long detour)', cost: 'Estimate to add', payment: 'cash', notes: 'Only include if the family is comfortable with the longer drive and sulfur environment. Easy alternative: go directly to voco.' },
      { id: 'a33', time: 'Afternoon', type: 'stay', title: 'Check in at voco Bandung Setiabudi', place: 'Setiabudi', cost: 'Booked', payment: 'prepaid', notes: 'Rest and settle into the city hotel.' },
      { id: 'a34', time: 'Evening', type: 'food', title: 'Dinner around Setiabudi', place: 'Near hotel', cost: 'Estimate to add', payment: 'youtrip', notes: 'Choose a halal-friendly option.' }
    ]},
    { id: 'd4', date: '2026-11-25', title: 'Braga & Bandung heritage', area: 'Central Bandung', hotelId: 's2', pace: 'City exploration at a relaxed pace. Plan shade, snacks and breaks for Melissa.', items: [
      { id: 'a41', time: 'Morning', type: 'activity', title: 'Braga Street', place: 'Braga', cost: 'Free / spending', payment: 'cash', notes: 'Photography, architecture and a relaxed walk.' },
      { id: 'a42', time: 'Lunch', type: 'food', title: 'Halal-friendly lunch in the city', place: 'Braga / Asia Afrika area', cost: 'Estimate to add', payment: 'youtrip', notes: 'Restaurant to be selected.' },
      { id: 'a43', time: 'Afternoon', type: 'activity', title: 'Asia Afrika area / nearby stop', place: 'Bandung city centre', cost: 'Estimate to add', payment: 'cash', notes: 'Keep this flexible depending on heat, crowds and energy.' },
      { id: 'a44', time: 'Evening', type: 'food', title: 'Dinner', place: 'Bandung', cost: 'Estimate to add', payment: 'youtrip', notes: 'Add restaurant after deciding.' }
    ]},
    { id: 'd5', date: '2026-11-26', title: 'Flexible attractions & shopping', area: 'Bandung / Setiabudi', hotelId: 's2', pace: 'Keep this day open for favourites, shopping and anything missed due to weather.', items: [
      { id: 'a51', time: 'Morning', type: 'activity', title: 'Choose one family-friendly attraction', place: 'Bandung / Lembang', cost: 'Estimate to add', payment: 'cash', notes: 'Use the ideas bank to add an activity.' },
      { id: 'a52', time: 'Lunch', type: 'food', title: 'Lunch / cafe stop', place: 'Bandung', cost: 'Estimate to add', payment: 'youtrip', notes: 'Halal-preferred; confirm restaurant details.' },
      { id: 'a53', time: 'Afternoon', type: 'activity', title: 'Shopping / souvenirs', place: 'Bandung', cost: 'Flexible', payment: 'cash', notes: 'Leave room in luggage and budget.' },
      { id: 'a54', time: 'Evening', type: 'food', title: 'Final Bandung dinner', place: 'Near voco', cost: 'Estimate to add', payment: 'youtrip', notes: 'Keep packing and next-day departure in mind.' }
    ]},
    { id: 'd6', date: '2026-11-27', title: 'Return to Singapore', area: 'Bandung → Jakarta → Singapore', hotelId: 's2', pace: 'Departure day. Prioritise an early, reliable transfer and airport buffer.', items: [
      { id: 'a61', time: 'Morning', type: 'stay', title: 'Breakfast & check out', place: 'voco Bandung Setiabudi', cost: 'Included', payment: 'prepaid', notes: 'Confirm checkout time and luggage.' },
      { id: 'a62', time: 'To confirm', type: 'transport', title: 'Transfer to Padalarang Station', place: 'Setiabudi → Padalarang', cost: 'Estimate to add', payment: 'cash', notes: 'Allow extra time for Bandung traffic.' },
      { id: 'a63', time: 'To confirm', type: 'transport', title: 'Whoosh to Halim + transfer to CGK', place: 'Padalarang → Halim → CGK', cost: 'Not purchased', payment: 'cash', notes: 'Choose train timing around the 18:45 Garuda departure. Do not cut this close.' },
      { id: 'a64', time: '18:45', type: 'transport', title: 'Garuda Indonesia flight to Singapore', place: 'CGK → SIN', cost: 'Paid', payment: 'prepaid', notes: 'Arrive Singapore around 21:45.' }
    ]}
  ],
  ideas: [
    { id: 'i1', title: 'The Great Asia Africa', category: 'Lembang', kind: 'activity', estimate: 'IDR 50k–100k per person', notes: 'Cultural-themed photo areas; can be paired with a Lembang day.' },
    { id: 'i2', title: 'Floating Market Lembang', category: 'Lembang', kind: 'activity', estimate: 'IDR 50k–150k per person', notes: 'Food stalls and family-friendly attractions; check current ticket rules.' },
    { id: 'i3', title: 'Dusun Bambu', category: 'Lembang', kind: 'activity', estimate: 'To verify', notes: 'Scenic family park, gardens and dining.' },
    { id: 'i4', title: 'Lembang Park & Zoo', category: 'Lembang', kind: 'activity', estimate: 'To verify', notes: 'Animal-focused option for Melissa.' },
    { id: 'i5', title: 'Kawah Putih', category: 'Ciwidey', kind: 'activity', estimate: 'To verify', notes: 'Longer drive and sulfur smell; optional. Consider comfort and weather.' },
    { id: 'i6', title: 'Braga Street', category: 'City', kind: 'activity', estimate: 'Free / spending', notes: 'Already in the draft itinerary; can be moved or removed.' },
    { id: 'i7', title: 'Saung Angklung Udjo', category: 'City', kind: 'activity', estimate: 'To verify', notes: 'Cultural performance; check show schedule before committing.' },
    { id: 'i8', title: 'Kartika Sari', category: 'Shopping', kind: 'food', estimate: 'Depends on purchases', notes: 'Popular Bandung bakery and souvenir stop.' },
    { id: 'i9', title: 'Amanda Brownies', category: 'Shopping', kind: 'food', estimate: 'Depends on purchases', notes: 'Souvenir bakery option.' },
    { id: 'i10', title: 'One Eighty Coffee', category: 'City', kind: 'food', estimate: 'To verify', notes: 'Distinctive cafe experience; check suitability and current menu.' }
  ],
  budget: [
    { id: 'b1', category: 'Flights (paid)', youtrip: 0, cash: 0, notes: 'S$985.20 already paid via Trip.com; tracked separately as prepaid.' , prepaidSgd: 985.20 },
    { id: 'b2', category: 'Accommodation (paid)', youtrip: 0, cash: 0, notes: 'Bobocabin S$389.42 + voco S$267.87 already booked.', prepaidSgd: 657.29 },
    { id: 'b3', category: 'Whoosh rail', youtrip: 0, cash: 0, notes: 'Business Class planned; fare and payment method to confirm.', prepaidSgd: 0 },
    { id: 'b4', category: 'Airport / city transfers', youtrip: 100, cash: 100000, notes: 'Grab / GoCar and local transfers; edit after quotes.', prepaidSgd: 0 },
    { id: 'b5', category: 'Private driver', youtrip: 0, cash: 2500000, notes: 'Placeholder only. Confirm driver, days and quote.', prepaidSgd: 0 },
    { id: 'b6', category: 'Meals & cafes', youtrip: 180, cash: 800000, notes: 'Use YouTrip where accepted; cash for smaller vendors.', prepaidSgd: 0 },
    { id: 'b7', category: 'Attractions & activities', youtrip: 80, cash: 900000, notes: 'Entry fees for the final chosen activities.', prepaidSgd: 0 },
    { id: 'b8', category: 'Shopping & souvenirs', youtrip: 40, cash: 700000, notes: 'Keep discretionary spending capped.', prepaidSgd: 0 },
    { id: 'b9', category: 'Emergency buffer', youtrip: 100, cash: 500000, notes: 'Keep separate from daily spending.', prepaidSgd: 0 }
  ],
  wallet: { totalSgd: 1200, cashSgd: 500, youtripSgd: 700, physicalCashIdr: 5900000 },
  packing: [
    { id: 'p1', group: 'Documents & money', text: 'Passports for all 3 travellers', done: false },
    { id: 'p2', group: 'Documents & money', text: 'Flight booking / boarding details', done: false },
    { id: 'p3', group: 'Documents & money', text: 'Hotel booking confirmations', done: false },
    { id: 'p4', group: 'Documents & money', text: 'YouTrip cards and app access', done: false },
    { id: 'p5', group: 'Documents & money', text: 'Indonesian rupiah cash', done: false },
    { id: 'p6', group: 'Melissa', text: 'Compact stroller', done: false },
    { id: 'p7', group: 'Melissa', text: 'Snacks, water bottle and small toys', done: false },
    { id: 'p8', group: 'Melissa', text: 'Spare clothes and underwear', done: false },
    { id: 'p9', group: 'Melissa', text: 'Wipes, tissues and hand sanitiser', done: false },
    { id: 'p10', group: 'Melissa', text: 'Child-friendly medication / thermometer', done: false },
    { id: 'p11', group: 'Clothing', text: 'Light layers and jackets for Lembang', done: false },
    { id: 'p12', group: 'Clothing', text: 'Comfortable walking shoes', done: false },
    { id: 'p13', group: 'Clothing', text: 'Rain jackets / compact umbrellas', done: false },
    { id: 'p14', group: 'Essentials', text: 'Phone chargers and power bank', done: false },
    { id: 'p15', group: 'Essentials', text: 'Universal travel adapter', done: false },
    { id: 'p16', group: 'Essentials', text: 'Mosquito repellent and sunscreen', done: false }
  ]
}
