import { Component, inject, Input } from '@angular/core';
import { OverlayFormComponent } from '../overlay-form/overlay-form.component';
import { CatBreed } from '../../assets/types';
import { CatBreedHandlerService } from '../cat-breed-handler.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [OverlayFormComponent],
  template: `
    <div [className]="'content-card'">
      <img [src]="catBreed.imageSrc" />
      <div [className]="'content-description'">
        <p>Breed: {{ catBreed.breed }}</p>
        <p>Origin: {{ catBreed.origin }}</p>
        <p>Coat Length Variations: {{ catBreed.coatLengthVariations }}</p>
        <p>Coat Color Variations: {{ catBreed.coatColorVariations }}</p>
        <p>Coat Shape Variations: {{ catBreed.coatShapeVariations }}</p>
        <p>Life Expectancy: {{ catBreed.lifeExpectancy }}</p>
      </div>
      <button type="button" (click)="onOpenForm()">open form</button>
      @if (isFormOpen) {
      <app-overlay-form (dataFormClosed)="onCloseForm()"></app-overlay-form>
      }
    </div>
  `,
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() catBreed!: CatBreed;
  catBreedService = inject(CatBreedHandlerService);

  isFormOpen: boolean;
  constructor() {
    this.isFormOpen = false;
  }

  onOpenForm() {
    this.openForm();
    this.catBreedService.setSelectedCatBreed(this.catBreed);
  }

  onCloseForm() {
    this.closeForm();
  }
  openForm() {
    this.isFormOpen = true;
  }
  closeForm() {
    this.isFormOpen = false;
  }
}
