/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OceanZone, Threat, Solution } from '../types';

export const oceanZones: OceanZone[] = [
  {
    id: 'sunlight',
    name: 'SUNLIGHT ZONE',
    depthRange: '0 - 200 m',
    description: 'Warm sunlight fills the ocean with life and color. Coral reefs thrive here, supporting 25% of all marine species.',
    badges: [
      { label: 'Warm Water', icon: 'Sun' },
      { label: 'Coral Reefs', icon: 'Shrimp' },
      { label: 'High Biodiversity', icon: 'FlameKindling' },
      { label: 'Plenty of Light', icon: 'SunDim' }
    ],
    species: [
      {
        id: 'clownfish',
        name: 'Clownfish',
        scientificName: 'Amphiprioninae',
        image: 'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?auto=format&fit=crop&w=300&h=300&q=80',
        description: 'Famous for their symbiotic relationship with sea anemones, which protect them from predators.'
      },
      {
        id: 'parrotfish',
        name: 'Parrotfish',
        scientificName: 'Scaridae',
        image: 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?auto=format&fit=crop&w=300&h=300&q=80',
        description: 'Crucial cleaners of coral reefs, their teeth fused into a parrot-like beak to scrape algae off corals.'
      },
      {
        id: 'seaturtle',
        name: 'Sea Turtle',
        scientificName: 'Cheloniidae',
        image: 'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?auto=format&fit=crop&w=300&h=300&q=80',
        description: 'Ancient marine reptiles migrating thousands of miles across oceans to feed and lay eggs.'
      },
      {
        id: 'dolphin',
        name: 'Dolphin',
        scientificName: 'Delphinidae',
        image: 'https://images.unsplash.com/photo-1570481662006-a3a13746fe4e?auto=format&fit=crop&w=300&h=300&q=80',
        description: 'Highly intelligent social mammals that use advanced echolocation to communicate and navigate.'
      }
    ],
    factTitle: 'Did You Know?',
    factText: 'Coral reefs are often called the "Rainforests of the Sea" due to their immense biodiversity.',
    illustrationType: 'jellyfish', // We will render corresponding high-end SVG/CSS animations
    accentColor: 'text-cyan-400'
  },
  {
    id: 'twilight',
    name: 'TWILIGHT ZONE',
    depthRange: '200 - 1000 m',
    description: 'As sunlight fades, creatures adapt. Bioluminescence helps them survive in the dim blue.',
    badges: [
      { label: 'Low Light', icon: 'EyeOff' },
      { label: 'Bioluminescence', icon: 'Sparkles' },
      { label: 'Unique Adaptations', icon: 'Workflow' },
      { label: 'Cool Temperatures', icon: 'Snowflake' }
    ],
    species: [
      {
        id: 'jellyfish',
        name: 'Jellyfish',
        scientificName: 'Medusozoa',
        image: 'https://images.unsplash.com/photo-1545671913-b89ac1b4ac10?auto=format&fit=crop&w=300&h=300&q=80',
        description: 'Gelatinous drifters, some of which glow beautifully to deter predators or lure small prey.'
      },
      {
        id: 'lanternfish',
        name: 'Lantern Fish',
        scientificName: 'Myctophidae',
        image: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=300&h=300&q=80',
        description: 'Small deep-sea fish named after their light-producing photophores used for signaling.'
      },
      {
        id: 'squid',
        name: 'Squid',
        scientificName: 'Teuthida',
        image: 'https://images.unsplash.com/photo-1545551763-46a013bb70d5?auto=format&fit=crop&w=300&h=300&q=80',
        description: 'Active carnivores with complex eyes and chromatophores that let them camouflage instantly.'
      },
      {
        id: 'combjelly',
        name: 'Comb Jelly',
        scientificName: 'Ctenophora',
        image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=300&h=300&q=80',
        description: 'Stg-less ocean drifters with beating rows of cilia that split light into glittering rainbows.'
      }
    ],
    factTitle: 'Life in This Zone',
    factText: 'Some animals can migrate up to 1,000 m every single day to feed near the surface at night!',
    illustrationType: 'jellyfish',
    accentColor: 'text-indigo-400'
  },
  {
    id: 'midnight',
    name: 'MIDNIGHT ZONE',
    depthRange: '1000 - 4000 m',
    description: 'Pitch black. Cold. Extreme pressure. Only the most specialized creatures can survive here.',
    badges: [
      { label: 'No Sunlight', icon: 'Moon' },
      { label: 'High Pressure', icon: 'CircleDot' },
      { label: 'Near Freezing', icon: 'Thermometer' },
      { label: 'Slow Metabolism', icon: 'Timer' }
    ],
    species: [
      {
        id: 'anglerfish',
        name: 'Anglerfish',
        scientificName: 'Lophiiformes',
        image: 'https://images.unsplash.com/photo-1546026423-cc4642628d2b?auto=format&fit=crop&w=300&h=300&q=80',
        description: 'Deep sea predators known for the glowing symbiotic lure hanging from their heads to attract prey.'
      },
      {
        id: 'vampiresquid',
        name: 'Vampire Squid',
        scientificName: 'Vampyroteuthis',
        image: 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&w=300&h=300&q=80',
        description: 'A harmless detritivore with webbed arms that resemble a vampire’s dark, enveloping cloak.'
      },
      {
        id: 'giantsquid',
        name: 'Giant Squid',
        scientificName: 'Architeuthis',
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=300&h=300&q=80',
        description: 'Legendary ocean leviathans lurking in the deep, equipped with eyes the size of dinner plates.'
      },
      {
        id: 'barracuda',
        name: 'Barracuda',
        scientificName: 'Sphyraena',
        image: 'https://images.unsplash.com/photo-1516683018643-551fcfa19b8a?auto=format&fit=crop&w=300&h=300&q=80',
        description: 'Ray-finned fish known for their large size, ferocious appearance, and rapid predatory strikes.'
      }
    ],
    factTitle: 'Survival Secrets',
    factText: 'These creatures have unique adaptations like soft, jelly-like muscles and slow metabolisms.',
    illustrationType: 'angler',
    accentColor: 'text-blue-500'
  },
  {
    id: 'abyss',
    name: 'THE ABYSS',
    depthRange: '4000 - 6000+ m',
    description: 'The deepest part of the ocean. A mysterious world we are still exploring with robotic submersibles.',
    badges: [
      { label: 'Extreme Pressure', icon: 'Gauge' },
      { label: 'Hydrothermal Vents', icon: 'Flame' },
      { label: 'No Light', icon: 'ShieldAlert' },
      { label: 'Unknown Species', icon: 'HelpCircle' }
    ],
    species: [
      {
        id: 'tripodfish',
        name: 'Tripod Fish',
        scientificName: 'Bathypterois',
        image: 'https://images.unsplash.com/photo-1516683018643-551fcfa19b8a?auto=format&fit=crop&w=300&h=300&q=80',
        description: 'Deep sea fish that stands rigid on three long fin filaments on the muddy ocean floor.'
      },
      {
        id: 'giant_isopod',
        name: 'Giant Isopod',
        scientificName: 'Bathynomus',
        image: 'https://images.unsplash.com/photo-1546026423-cc4642628d2b?auto=format&fit=crop&w=300&h=300&q=80',
        description: 'Massive deep sea scavengers related to land-dwelling pillbugs, capable of fasting for years.'
      },
      {
        id: 'dumbo_octopus',
        name: 'Dumbo Octopus',
        scientificName: 'Grimpoteuthis',
        image: 'https://images.unsplash.com/photo-1545671913-b89ac1b4ac10?auto=format&fit=crop&w=300&h=300&q=80',
        description: 'Umbrella octopus that flaps ear-like fins on their head to hover gracefully above the abyss.'
      },
      {
        id: 'vent_crab',
        name: 'Vent Crab',
        scientificName: 'Bythograeidae',
        image: 'https://images.unsplash.com/photo-1571752726101-44dc4674ff9f?auto=format&fit=crop&w=300&h=300&q=80',
        description: 'Crabs that live in boiling hydrothermal vent fields, thriving off chemosynthetic bacteria.'
      }
    ],
    factTitle: 'Exploration',
    factText: 'Less than 20% of the ocean floor has been explored by humans. There is so much left to discover.',
    illustrationType: 'sub',
    accentColor: 'text-teal-400'
  }
];

export const threats: Threat[] = [
  {
    id: 'plastic',
    title: 'Plastic Pollution',
    icon: 'ShoppingBag',
    description: 'Millions of tons of single-use plastic enter the oceans yearly, breaking into toxic microplastics.',
    impactLevel: 'Critical',
    stat: '8M+ Tons/Year'
  },
  {
    id: 'overfishing',
    title: 'Overfishing',
    icon: 'Compass',
    description: 'Industrial fleets empty ocean ecosystems of key predators and species, threatening biodiversity.',
    impactLevel: 'Severe',
    stat: '33% Overfished'
  },
  {
    id: 'oilspills',
    title: 'Oil Spills',
    icon: 'Droplets',
    description: 'Accidental shipping leaks and offshore drills release toxic petroleum, coating seabirds and killing coral.',
    impactLevel: 'Severe',
    stat: 'Millions of Liters'
  },
  {
    id: 'bleaching',
    title: 'Coral Bleaching',
    icon: 'Thermometer',
    description: 'Warming oceans stress corals, forcing them to eject vital symbiotic algae and perish.',
    impactLevel: 'Critical',
    stat: '50% Reefs Lost'
  },
  {
    id: 'climatechange',
    title: 'Climate Change',
    icon: 'Globe',
    description: 'Rising temperatures and atmospheric CO2 cause warming waters, melting ice, and high acidification.',
    impactLevel: 'Critical',
    stat: '+1.5°C Ocean Temp'
  },
  {
    id: 'habitat',
    title: 'Habitat Destruction',
    icon: 'Flame',
    description: 'Coastal developments, deep-sea mining, and dragging nets demolish crucial seabeds and nurseries.',
    impactLevel: 'Moderate',
    stat: '20% Wetlands Lost'
  }
];

export const solutions: Solution[] = [
  {
    id: 'reduce_plastic',
    title: 'Reduce Plastic Use',
    icon: 'ShoppingBag',
    description: 'Use reusable alternatives to single-use straws, bottles, bags, and food containers.',
    difficulty: 'Easy'
  },
  {
    id: 'eco_products',
    title: 'Use Eco-Friendly Products',
    icon: 'ShoppingBag',
    description: 'Choose non-toxic, chemical-free, reef-safe biodegradable body wash and sunscreen.',
    difficulty: 'Easy'
  },
  {
    id: 'beach_cleanup',
    title: 'Clean Our Beaches',
    icon: 'Trees',
    description: 'Pick up plastic trash on shores, riverbanks, and street gutters before it washes downstream.',
    difficulty: 'Medium'
  },
  {
    id: 'marine_conservation',
    title: 'Support Marine Conservation',
    icon: 'Shield',
    description: 'Advocate for Marine Protected Areas (MPAs) that outlaw commercial fishing and industrial exploitation.',
    difficulty: 'Involved'
  },
  {
    id: 'sustainable_seafood',
    title: 'Sustainable Seafood',
    icon: 'Flame',
    description: 'Only purchase seafood caught via eco-certified, small-scale, non-destructive traditional methods.',
    difficulty: 'Medium'
  },
  {
    id: 'save_energy_water',
    title: 'Save Energy & Water',
    icon: 'Zap',
    description: 'Lower your carbon footprint to curb rising global temperatures and slow down ocean acidification.',
    difficulty: 'Easy'
  },
  {
    id: 'educate_spread',
    title: 'Educate & Spread Awareness',
    icon: 'MessageSquare',
    description: 'Teach friends about ocean preservation, and help mobilize local communities to protect marine habits.',
    difficulty: 'Easy'
  }
];
