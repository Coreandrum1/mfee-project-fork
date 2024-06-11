import { Injectable } from '@angular/core';
import { CatBreed } from '../assets/types';

@Injectable({
  providedIn: 'root',
})
export class CatBreedHandlerService {
  currentCatBreed: CatBreed | undefined;
  constructor() {}

  getSelectedCatBreed(): CatBreed | undefined {
    return this.currentCatBreed;
  }

  setSelectedCatBreed(catBreed: CatBreed | undefined) {
    this.currentCatBreed = catBreed;
  }
}
