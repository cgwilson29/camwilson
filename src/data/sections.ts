// All site copy lives here — edit this file to update the content of each section.

export type SectionId =
  | 'about'
  | 'work'
  | 'family'
  | 'cars'
  | 'motorcycles'
  | 'kayaking'
  | 'travel'
  | 'space';

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
}

export const sections: Section[] = [
  {
    id: 'about',
    title: 'About Cam',
    body: 'Sun',
    tagline: 'Pharmacist · Public health officer · Explorer',
    paragraphs: [
      "Hi, I'm Cam Wilson — a pharmacist and Lieutenant in the U.S. Public Health Service Commissioned Corps.",
      'When I am not working, you will find me behind the wheel, on two wheels, on the water, somewhere new on the map, or looking up at the night sky.',
      'Click any planet to explore a different part of my world.',
    ],
  },
  {
    id: 'work',
    title: 'Work',
    body: 'Earth',
    tagline: 'USPHS Pharmacist · FDA Oncology Center of Excellence',
    paragraphs: [
      "I serve as a U.S. Public Health Service (USPHS) pharmacist at the FDA's Oncology Center of Excellence (OCE), working on Project Facilitate.",
      'Project Facilitate is a call center that helps oncology healthcare providers navigate the Expanded Access process — requesting access to investigational, unapproved cancer therapies for individual patients who have run out of other options.',
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
      "Home base is wherever my wife and our pets are. Caroline and I met in 2007 while in undergrad at UCF, before going our separate ways to pursue our dreams. We reconnected in 2021 and found ourselves in love all over again, and ultimately tied the knot in 2025! We are now each other's travel and brewery companions, and I wouldn't change a thing about it.",
      'Our pets are a weird mix, but we love them all!',
    ],
    highlightsTitle: 'The crew',
    highlights: ['Wife: Caroline, dearest human', 'Pet: Larry, awkward Chow/Pit/Lab puppers', 'Pet: Luna, queen-of-the-castle Bombay cat'],
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
    highlights: ['Current car: 2024 Chevrolet Silverado EV RST', 'Dream car: RestoMod 1972 Dodge Challenger R/T in Plum Crazy Purple', 'Favorite drive: Any roadtrip, especially into the mountains!'],
  },
  {
    id: 'motorcycles',
    title: 'Motorcycles',
    body: 'Mercury',
    tagline: 'Two wheels, fast orbits',
    paragraphs: ['Riding is my way to clear my head and connect with the road.'],
    highlightsTitle: 'Rides',
    highlights: ['Current bike: 2019 BMW S1000XR', 'Favorite route: San Juan Skyway from Durango to Ouray, Colorado'],
  },
  {
    id: 'kayaking',
    title: 'Kayaking',
    body: 'Neptune',
    tagline: 'Paddling deep-blue waters',
    paragraphs: ['Some of my favorite days are spent on the water with a paddle in hand.'],
    highlightsTitle: 'Favorite waters',
    highlights: ['Florida springs', 'Rainbow River'],
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
