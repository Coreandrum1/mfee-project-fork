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

export interface User {
  id: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
}
