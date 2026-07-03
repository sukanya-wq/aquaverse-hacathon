/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Species {
  id: string;
  name: string;
  scientificName: string;
  image: string;
  description: string;
}

export interface Badge {
  label: string;
  icon: string; // Lucide icon name
}

export interface OceanZone {
  id: string;
  name: string;
  depthRange: string;
  description: string;
  badges: Badge[];
  species: Species[];
  factTitle: string;
  factText: string;
  illustrationType: 'jellyfish' | 'angler' | 'sub';
  accentColor: string; // Tailwind class color
}

export interface Threat {
  id: string;
  title: string;
  icon: string; // Lucide icon name
  description: string;
  impactLevel: 'Critical' | 'Severe' | 'Moderate';
  stat: string;
}

export interface Solution {
  id: string;
  title: string;
  icon: string; // Lucide icon name
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Involved';
}

export interface Pledge {
  name: string;
  email: string;
  date: string;
}
