/**
 * data/destinations.js
 *
 * In-memory data store for tourist destinations.
 * Acts as a stand-in for a real database (Week 5 will migrate to MongoDB).
 *
 * Each destination object follows this schema:
 * {
 *   id          {number}  – auto-incrementing unique identifier
 *   name        {string}  – destination name
 *   location    {string}  – district / region within Uttarakhand
 *   category    {string}  – hill-station | pilgrimage | adventure |
 *                           wildlife | trekking | spiritual
 *   description {string}  – short marketing description
 *   image       {string}  – placeholder image URL (Unsplash)
 *   rating      {number}  – average rating 1–5 (one decimal place)
 *   bestSeason  {string}  – best months to visit
 * }
 */

let destinations = [
  {
    id: 1,
    name: "Nainital",
    location: "Nainital District, Kumaon",
    category: "hill-station",
    description:
      "A stunning lake-side hill station nestled in the Kumaon Hills, famous for the emerald Naini Lake, colonial-era architecture, and panoramic Himalayan views. A favourite family getaway since the British era.",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800",
    rating: 4.7,
    bestSeason: "March – June, September – November",
  },
  {
    id: 2,
    name: "Mussoorie",
    location: "Dehradun District, Garhwal",
    category: "hill-station",
    description:
      "Known as the 'Queen of Hills', Mussoorie sits at 2,000 m and offers sweeping views of the Shivalik ranges, lush forests, and the iconic Kempty Falls. The Mall Road is a lively hub for shopping and street food.",
    image: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800",
    rating: 4.6,
    bestSeason: "March – June, September – November",
  },
  {
    id: 3,
    name: "Rishikesh",
    location: "Dehradun District, Garhwal",
    category: "adventure",
    description:
      "The 'Yoga Capital of the World' sits at the foothills of the Himalayas on the banks of the Ganga. World-class white-water rafting, bungee jumping, an international yoga festival, and the legendary Laxman Jhula await.",
    image: "https://images.unsplash.com/photo-1591018653074-f2aba1d0f278?w=800",
    rating: 4.8,
    bestSeason: "September – November, February – May",
  },
  {
    id: 4,
    name: "Haridwar",
    location: "Haridwar District, Garhwal",
    category: "spiritual",
    description:
      "One of the seven holiest Hindu cities, Haridwar is where the Ganga descends to the plains. The evening Ganga Aarti at Har Ki Pauri is a deeply moving spiritual spectacle that draws millions of pilgrims each year.",
    image: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=800",
    rating: 4.7,
    bestSeason: "October – April",
  },
  {
    id: 5,
    name: "Auli",
    location: "Chamoli District, Garhwal",
    category: "adventure",
    description:
      "India's premier ski resort sits at 2,519 m, backed by magnificent views of Nanda Devi and Mana Parbat. Beyond skiing in winter, Auli offers cable-car rides, meadow walks, and the artificial lake at Gorson Bugyal.",
    image: "https://images.unsplash.com/photo-1610465299996-30f240ac2b1c?w=800",
    rating: 4.6,
    bestSeason: "December – February (skiing), May – June (trekking)",
  },
  {
    id: 6,
    name: "Kedarnath",
    location: "Rudraprayag District, Garhwal",
    category: "pilgrimage",
    description:
      "Perched at 3,583 m amid snow-clad peaks, Kedarnath is one of the 12 Jyotirlinga shrines of Lord Shiva and part of the revered Char Dham Yatra. The ancient stone temple, surrounded by glaciers and alpine meadows, is awe-inspiring.",
    image: "https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?w=800",
    rating: 4.9,
    bestSeason: "May – June, September – October",
  },
  {
    id: 7,
    name: "Badrinath",
    location: "Chamoli District, Garhwal",
    category: "pilgrimage",
    description:
      "Situated at 3,133 m in the Garhwal Himalayas, Badrinath is one of the four dhams in India, dedicated to Lord Vishnu. The Badrinarayan Temple sits between the Nar and Narayan mountain ranges, with the Alaknanda River flowing below.",
    image: "https://images.unsplash.com/photo-1598874034367-4d5f6f60e45f?w=800",
    rating: 4.8,
    bestSeason: "May – June, September – October",
  },
  {
    id: 8,
    name: "Jim Corbett National Park",
    location: "Nainital & Pauri Districts, Kumaon",
    category: "wildlife",
    description:
      "India's oldest national park and a UNESCO World Heritage site, Jim Corbett is home to the Bengal tiger, Asian elephant, leopard, and over 600 bird species. Jeep and elephant safaris through dense sal forests are a highlight.",
    image: "https://images.unsplash.com/photo-1602491453631-e2a5ad90a131?w=800",
    rating: 4.8,
    bestSeason: "October – June (park closed July – September)",
  },
  {
    id: 9,
    name: "Valley of Flowers",
    location: "Chamoli District, Garhwal",
    category: "trekking",
    description:
      "A UNESCO World Heritage Site and a national park at 3,500 m, the Valley of Flowers bursts into a riot of 300+ Himalayan wildflowers every monsoon. The 17 km trek from Govindghat passes through pristine alpine terrain and glacial streams.",
    image: "https://images.unsplash.com/photo-1626015179369-41fba99b9ecc?w=800",
    rating: 4.9,
    bestSeason: "July – September",
  },
  {
    id: 10,
    name: "Chopta",
    location: "Rudraprayag District, Garhwal",
    category: "trekking",
    description:
      "Often called the 'Mini Switzerland of Uttarakhand', Chopta is a serene meadow at 2,680 m blanketed in dense rhododendron and oak forests. It serves as the base camp for the Tungnath (world's highest Shiva temple) and Chandrashila treks.",
    image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=800",
    rating: 4.7,
    bestSeason: "March – April (rhododendrons), October – November (snow views)",
  },
];

/**
 * Counter used to generate unique IDs when new destinations are created.
 * Starts at 11 so it never clashes with the seed data above.
 */
let nextId = 11;

/**
 * Returns the current list of all destinations (mutable reference).
 * @returns {Array} destinations array
 */
function getAll() {
  return destinations;
}

/**
 * Returns a single destination by its numeric id, or undefined if not found.
 * @param {number} id
 * @returns {Object|undefined}
 */
function getById(id) {
  return destinations.find((d) => d.id === id);
}

/**
 * Creates a new destination, assigns the next available id, and pushes it
 * into the in-memory array.
 * @param {Object} data – fields for the new destination (id is ignored)
 * @returns {Object} the newly created destination
 */
function create(data) {
  const newDestination = { id: nextId++, ...data };
  destinations.push(newDestination);
  return newDestination;
}

/**
 * Updates an existing destination by id using shallow merge.
 * The id field is protected and cannot be overwritten via the merge.
 * @param {number} id
 * @param {Object} updates – partial or full destination fields
 * @returns {Object|null} updated destination, or null if id not found
 */
function update(id, updates) {
  const index = destinations.findIndex((d) => d.id === id);
  if (index === -1) return null;

  // Merge, but always keep the original id
  destinations[index] = { ...destinations[index], ...updates, id };
  return destinations[index];
}

/**
 * Removes a destination by id.
 * @param {number} id
 * @returns {boolean} true if removed, false if id not found
 */
function remove(id) {
  const index = destinations.findIndex((d) => d.id === id);
  if (index === -1) return false;
  destinations.splice(index, 1);
  return true;
}

/**
 * Case-insensitive full-text search across name, location, and description.
 * @param {string} query
 * @returns {Array} matching destinations
 */
function search(query) {
  const q = query.toLowerCase().trim();
  return destinations.filter(
    (d) =>
      d.name.toLowerCase().includes(q) ||
      d.location.toLowerCase().includes(q) ||
      d.description.toLowerCase().includes(q)
  );
}

/**
 * Returns all destinations whose category matches the given string
 * (case-insensitive).
 * @param {string} category
 * @returns {Array} matching destinations
 */
function getByCategory(category) {
  return destinations.filter(
    (d) => d.category.toLowerCase() === category.toLowerCase()
  );
}

module.exports = { getAll, getById, create, update, remove, search, getByCategory };
