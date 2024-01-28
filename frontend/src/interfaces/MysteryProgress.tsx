export interface Location {
  _id: string;
  name: string;
  discovered: boolean;
  context: string[];
  clues: string[];
  misleadingClues: string[];
}

export interface Mystery {
  _id: string;
  name: string;
  locations: Location[];
}

export interface LocationProgress {
  _id: string;
  discovered: boolean;
  clues: boolean[];
  misleadingClues: boolean[];
}

export interface MysteryProgress {
  _id: string;
  userId: string;
  mystery: Mystery;
  locations: LocationProgress[];
}
