// All site copy lives here — edit this file to update the content of each section.

export type SectionId =
  | 'about'
  | 'work'
  | 'family'
  | 'cars'
  | 'motorcycles'
  | 'outdoors'
  | 'travel'
  | 'breweries'
  | 'space';

export interface EducationEntry {
  credential: string;
  school: string;
  years?: string;
  note?: string;
  /** Marks a program that's still in progress. */
  current?: boolean;
}

export interface Section {
  id: SectionId;
  title: string;
  /** Celestial body this section is attached to in the 3D scene. */
  body: string;
  tagline: string;
  paragraphs: string[];
  highlightsTitle?: string;
  highlights?: string[];
  links?: { label: string; href: string }[];
  /** Listed newest first. */
  education?: EducationEntry[];
}

export const sections: Section[] = [
  {
    id: 'about',
    title: 'About Cam',
    body: 'Sun',
    tagline: 'Pharmacist · Public Health Service Officer · Explorer',
    paragraphs: [
      "Hi, I'm Cam Wilson — a pharmacist and Lieutenant in the U.S. Public Health Service Commissioned Corps.",
      'When I am not working, you will find me behind the wheel, on two wheels, on the water, in nature, somewhere new on the map, or looking up at the night sky.',
      'Click any planet to explore a different part of my world.',
    ],
    education: [
      {
        credential: 'M.S. AIBHS — Artificial Intelligence in Biomedical and Health Sciences',
        school: 'University of Florida',
        years: '2026 – present',
        note: 'A groundbreaking program bridging the gap between blazing fast AI development and the healthcare systems of today',
        current: true,
      },
      {
        credential: 'Doctor of Pharmacy (PharmD)',
        school: 'University of Florida',
        years: '2011 – 2015',
      },
      {
        credential: 'B.S. Molecular Biology and Microbiology',
        school: 'University of Central Florida',
        years: '2007 – 2011',
      },
    ],
  },
  {
    id: 'work',
    title: 'Work',
    body: 'Earth',
    tagline: 'USPHS Pharmacist · FDA Oncology Center of Excellence',
    paragraphs: [
      "I serve as a U.S. Public Health Service (USPHS) pharmacist at the FDA's Oncology Center of Excellence (OCE), working on Project Facilitate.",
      'Project Facilitate is a national call center and single point-of-contact that helps oncology healthcare providers navigate the Expanded Access process — requesting access to investigational, unapproved cancer therapies for individual patients who have run out of other options.',
    ],
    highlightsTitle: 'What I do',
    highlights: [
      'Guide oncologists and their teams through single-patient Expanded Access requests',
      'Coordinate between providers, FDA review divisions, and drug manufacturers',
      'Support the USPHS mission to protect, promote, and advance the health of the nation',
    ],
    links: [
      {
        label: 'FDA Project Facilitate',
        href: 'https://www.fda.gov/about-fda/oncology-center-excellence/project-facilitate',
      },
      { label: 'U.S. Public Health Service', href: 'https://www.usphs.gov/' },
    ],
  },
  {
    id: 'family',
    title: 'Family',
    body: 'Venus',
    tagline: 'My wife and our pets',
    paragraphs: [
      "Home base is wherever my wife and our pets are. Caroline and I met in 2007 while in undergrad at UCF, before going our separate ways to pursue our dreams. Many years later, after maintaining distant connections on our life path, we reconnected in 2021 and found ourselves in love all over again. We tied the knot in 2025 and are now each other's travel and brewery companions for life, and I wouldn't change a thing about it. She is my rock who believes in me more than anyone - myself included.",
      'Our pets round out our family in their weird ways, but we love them all!',
    ],
    highlightsTitle: 'The crew',
    highlights: ['Wife: Caroline, my dearest human', 'Pet: Larry, our awkward Chow/Pit/Lab puppers', 'Pet: Luna, the de facto queen-of-the-castle Bombay cat'],
  },
  {
    id: 'cars',
    title: 'Cars',
    body: 'Mars',
    tagline: 'Horsepower, handling, and open roads',
    paragraphs: [
      'I have always loved cars — the engineering, the design, and the feeling of a great driving road.',
    ],
    highlightsTitle: 'Garage & favorites',
    highlights: ['Current car: 2024 Chevrolet Silverado EV RST', 'Prior cars: 2021 Dodge Challenger Scat Pack Widebody, 2021 Ram 1500 Limited, 2017 Dodge Challenger Scat Pack, 2016 Ford Explorer, 2015 Chevrolet Camaro 2SS, 2013 Chrysler 300 Limited, 2001 Isuzu Rodeo, and a 1998 Ram 3500 dually', 'Dream car: RestoMod 1972 Dodge Challenger R/T in Plum Crazy Purple (with the Helephant engine!)', 'Favorite drive: Any roadtrip, especially into the mountains!'],
  },
  {
    id: 'motorcycles',
    title: 'Motorcycles',
    body: 'Mercury',
    tagline: 'Two wheels, fast orbits',
    paragraphs: ['Riding is my way to clear my head and connect with the road.'],
    highlightsTitle: 'Rides',
    highlights: ['Current bike: 2019 BMW S1000XR', 'Prior bikes: 2019 Kawasaki Z900, 2016 Kawasaki ZX-10R, 2015 Kawasaki ZX-6R', 'Favorite route: San Juan Skyway from Durango to Ouray, CO', 'Dream Roadtrip: Up the Pacific Coast Highway from Los Angeles to Vancouver'],
  },
  {
    id: 'outdoors',
    title: 'Nature/Outdoors',
    body: 'Neptune',
    tagline: 'Paddles, trails, and open skies',
    paragraphs: [
      'Some of my favorite days are spent outside — kayaking deep-blue springs, hiking, or just soaking up the scenery.',
    ],
    highlightsTitle: 'Favorite places',
    highlights: ['Kayaking quiet rivers, enjoying peaceful mountain streams'],
  },
  {
    id: 'travel',
    title: 'World Travels',
    body: 'Jupiter',
    tagline: 'A big world with many moons to visit',
    paragraphs: [
      'Travel has taken me to places that changed how I see the world. Like Jupiter and its many moons, there is always another destination to explore.',
    ],
    highlightsTitle: 'Places I have been',
    highlights: ['Ireland', 'Colombia', 'Spain', 'Dominican Republic', 'Canada', 'Aruba', 'British Virgin Islands', 'St. Maarten'],
  },
  {
    id: 'breweries',
    title: 'Craft Beer & Breweries',
    body: 'Uranus',
    tagline: 'Exploring the universe one pint at a time',
    paragraphs: [
      "Whether we're at home or on the road, Caroline and I love finding a local brewery and seeing what's on tap.",
    ],
    highlightsTitle: 'On tap',
    highlights: [
      'Favorite style: English Style Bitter (ESB), Brown Ale, Festbier/Märzen',
      'Favorite brewery: First Magnitude Brewing (regional), Veterans United (local), and Ayinger (international)',
      'Best beer found while traveling: Estrella 1906 Reserva, A Coruña, ES',
    ],
  },
  {
    id: 'space',
    title: 'Space & Astronomy',
    body: 'Saturn',
    tagline: 'Looking up',
    paragraphs: [
      'Space is what inspired this site. I love following missions, learning about the cosmos, and stargazing whenever the skies are clear.',
    ],
    highlightsTitle: 'Favorites',
    highlights: [
      'Favorite mission: James-Webb Space Telescope',
      'Favorite object: 40 Eridani System (the home of Vulcan)',
      'Telescope / gear: Celestron AstroMaster 130 (it gets the job done!)',
    ],
    links: [{ label: 'NASA', href: 'https://www.nasa.gov/' }],
  },
];

export const sectionById = Object.fromEntries(sections.map((s) => [s.id, s])) as Record<
  SectionId,
  Section
>;

export function isSectionId(id: string | undefined): id is SectionId {
  return !!id && id in sectionById;
}
