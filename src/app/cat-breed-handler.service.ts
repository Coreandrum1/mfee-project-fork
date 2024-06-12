import { Injectable } from '@angular/core';
import { CatBreed } from '../assets/types';

@Injectable({
  providedIn: 'root',
})
export class CatBreedHandlerService {
  currentCatBreed: CatBreed | undefined;
  filteredCatBreeds: CatBreed[] = [];
  catBreedList: CatBreed[] = [];
  constructor() {}

  updateCatBreedList(newCatBreed: CatBreed) {
    const indexFound = this.catBreedList.findIndex(
      (catBreed) => catBreed.id === newCatBreed.id
    );
    if (indexFound !== -1) {
      this.catBreedList[indexFound] = newCatBreed;
      this.filteredCatBreeds = this.catBreedList;
    }
  }

  addCatBreed(newCatBreed: CatBreed) {
    this.catBreedList.push(newCatBreed);
    this.filteredCatBreeds = this.catBreedList;
  }

  removeCatBreed(catBreed: CatBreed) {
    const indexFound = this.catBreedList.findIndex(
      (catBreed) => catBreed.id === catBreed.id
    );
    if (indexFound !== -1) {
      this.catBreedList.splice(indexFound, 1);
      this.filteredCatBreeds = this.catBreedList;
    }
  }

  getSelectedCatBreed(): CatBreed | undefined {
    return this.currentCatBreed;
  }

  setSelectedCatBreed(catBreed: CatBreed | undefined) {
    this.currentCatBreed = catBreed;
  }
}
