import { Component, inject, Input } from '@angular/core';
import { OverlayFormComponent } from '../overlay-form/overlay-form.component';
import { CatBreed } from '../../assets/types';
import { CatBreedHandlerService } from '../cat-breed-handler.service';
import { OverlayFormService } from '../overlay-form.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [OverlayFormComponent, CommonModule, RouterLink],
  template: `
    <div [className]="'content-card'">
      <div [className]="'gradient-overlay'"></div>
      <img [src]="catBreed.image" alt="cat-breed-image" />
      <div [className]="'content-description'">
        <small>{{ catBreed.origin | uppercase }}</small>
        <h1>{{ catBreed.name }}</h1>
        <p>Coat Length: {{ catBreed.coatLength }}</p>
        <p>Coat Pattern: {{ catBreed.coatPattern }}</p>
        <a class="see-more" [routerLink]="['/cat-breed', catBreed.id]"
          >See more...</a
        >
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
