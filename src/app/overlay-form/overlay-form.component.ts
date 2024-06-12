import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CatBreedHandlerService } from '../cat-breed-handler.service';
import { CatBreed } from '../../assets/types';

@Component({
  selector: 'app-overlay-form',
  standalone: true,
  imports: [],
  template: `
    <div class="overlay">
      <div class="overlay-content">
        <h1>{{ currentCatBreed?.breed }}</h1>
        <br />
        <button type="button" (click)="closeForm()">close</button>
      </div>
    </div>
  `,
  styleUrl: './overlay-form.component.css',
})
export class OverlayFormComponent {
  @Output() dataFormClosed = new EventEmitter<void>();
  catBreedService = inject(CatBreedHandlerService);
  currentCatBreed: CatBreed | undefined;

  constructor() {
    this.currentCatBreed = this.catBreedService.getSelectedCatBreed();
  }

  closeForm() {
    this.dataFormClosed.emit();
  }
}
