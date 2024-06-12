import { Component, inject } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { CatBreed } from '../../assets/types';
import { CatBreedHandlerService } from '../cat-breed-handler.service';
import { OverlayFormService } from '../overlay-form.service';
import { WebService } from '../web.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CardComponent, CommonModule],
  template: `
    <div class="header-content-area">
      <h2>{{ 'cat breeds by location' | uppercase }}</h2>
      <ul>
        @for (origin of uniqueCatOrigins; track $index) {
        <li (click)="filtercatBreedsByOrigin(origin)">{{ origin }}</li>
        }
        <li (click)="filtercatBreedsByOrigin('All')">All</li>
      </ul>
      <button (click)="addNewCatBreed()">Add New Cat Breed</button>
    </div>
    <article [className]="'content-area'">
      @for (catBreed of filteredCatBreeds; track $index) {
      <app-card [catBreed]="catBreed"></app-card>
      }
    </article>
  `,
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  catBreedService = inject(CatBreedHandlerService);
  formService = inject(OverlayFormService);
  webService = inject(WebService);
  uniqueCatOrigins: string[] = [];
  filteredCatBreeds: CatBreed[] = [];
  catBreeds: CatBreed[] = [];

  constructor() {
    this.uniqueCatOrigins = this.getUniqueCatOrigins();
    this.webService.getCatBreeds().then((catBreeds) => {
      this.catBreeds = catBreeds;
      this.filteredCatBreeds = catBreeds;
      this.uniqueCatOrigins = this.getUniqueCatOrigins();
    });
  }

  addNewCatBreed() {
    this.catBreedService.setSelectedCatBreed(undefined);
    this.formService.openForm();
  }

  filtercatBreedsByOrigin(origin: string | 'All') {
    if (origin === 'All') {
      this.filteredCatBreeds = this.catBreeds;
    } else {
      this.filteredCatBreeds = this.catBreeds.filter(
        (catBreed) => catBreed.origin === origin
      );
    }
  }

  getUniqueCatOrigins(): string[] {
    return this.catBreeds
      .map((catBreed) => catBreed.origin)
      .filter((origin, index, self) => self.indexOf(origin) === index);
  }
}
