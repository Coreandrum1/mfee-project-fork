import { Component, inject, Input } from '@angular/core';
import { OverlayFormComponent } from '../overlay-form/overlay-form.component';
import { CatBreed } from '../../assets/types';
import { CatBreedHandlerService } from '../cat-breed-handler.service';
import { OverlayFormService } from '../overlay-form.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [OverlayFormComponent],
  template: `
    <div [className]="'content-card'">
      <div [className]="'gradient-overlay'"></div>
      <img [src]="catBreed.imageSrc" />
      <div [className]="'content-description'">
        <p>Breed: {{ catBreed.breed }}</p>
        <p>Origin: {{ catBreed.origin }}</p>
        <p>Coat Length Variations: {{ catBreed.coatLengthVariations }}</p>
        <p>Coat Color Variations: {{ catBreed.coatColorVariations }}</p>
        <p>Coat Shape Variations: {{ catBreed.coatShapeVariations }}</p>
        <p>Life Expectancy: {{ catBreed.lifeExpectancy }}</p>
        <section class="form-buttons">
          <button type="button" class="button-primary" (click)="onOpenForm()">
            Edit
          </button>
        </section>
      </div>

      @if (formService.getIsFormOpen()) {
      <!-- <app-overlay-form (dataFormClosed)="onCloseForm()"></app-overlay-form> -->
      <app-overlay-form (dataFormClosed)="onCloseForm()"></app-overlay-form>
      }
    </div>
  `,
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() catBreed!: CatBreed;
  formService = inject(OverlayFormService);
  catBreedService = inject(CatBreedHandlerService);

  onOpenForm() {
    this.formService.openForm();
    this.catBreedService.setSelectedCatBreed(this.catBreed);
  }

  onCloseForm() {
    this.formService.closeForm();
    this.catBreedService.setSelectedCatBreed(undefined);
  }
}
