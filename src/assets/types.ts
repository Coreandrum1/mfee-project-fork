export interface CatBreed {
  id: string;
  name: string;
  origin: string;
  coatPattern: string;
  coatLength: string;
  health: Health;
  locations: string[];
  temperament: string[];
  image: string;
}

export interface Health {
  commonIssues: string[];
  lifeExpectancy: string;
}
