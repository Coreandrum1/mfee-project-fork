import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CatBreedHandlerService } from '../cat-breed-handler.service';
import { CatBreed } from '../../assets/types';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { OverlayFormService } from '../overlay-form.service';

@Component({
  selector: 'app-overlay-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="overlay">
      <div class="overlay-content">
        <h1>{{ currentCatBreed?.name }}</h1>
        <br />
        <form [formGroup]="overlayForm" (ngSubmit)="onSubmit()">
          <div class="input-group">
            <label for="breed">Breed:</label>
            <input id="breed" formControlName="breed" type="text" />
            @if (overlayForm.get('breed')?.invalid &&
            overlayForm.get('breed')?.touched) {
            <div>
              @if (overlayForm.get('breed')?.errors?.['required']) {
              <small>Breed is required.</small>
              }
            </div>
            }
          </div>
          <div class="input-group">
            <label for="origin">Origin:</label>
            <select id="origin" formControlName="origin" type="text">
              <option value="United States">United States</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Japan">Japan</option>
            </select>
            @if (overlayForm.get('origin')?.invalid &&
            overlayForm.get('origin')?.touched) {
            <div>
              @if (overlayForm.get('origin')?.errors?.['required']) {
              <small>Origin is required.</small>
              }
            </div>
            }
          </div>
          <div class="input-group">
            <label for="image">Image:</label>
            <input id="image" formControlName="image" type="text" />
            @if (overlayForm.get('image')?.invalid &&
            overlayForm.get('image')?.touched) {
            <div>
              @if (overlayForm.get('image')?.errors?.['required']) {
              <small>Image is required.</small>
              }
            </div>
            }
          </div>
          <div class="input-group">
            <label for="lifeExpectancy">Life Expectancy:</label>
            <input
              id="lifeExpectancy"
              formControlName="lifeExpectancy"
              type="text"
            />
            @if (overlayForm.get('lifeExpectancy')?.invalid &&
            overlayForm.get('lifeExpectancy')?.touched) {
            <div>
              @if (overlayForm.get('lifeExpectancy')?.errors?.['required']) {
              <small>Life Expectancy is required.</small>
              }
            </div>
            }
          </div>
          <button type="submit" [disabled]="overlayForm.invalid">Submit</button>
        </form>
        <button type="button" (click)="closeForm()">close</button>
      </div>
    </div>
  `,
  styleUrl: './overlay-form.component.css',
})
export class OverlayFormComponent {
  // @Output() dataFormClosed = new EventEmitter<void>();
  catBreedService = inject(CatBreedHandlerService);
  formService = inject(OverlayFormService);
  overlayForm: FormGroup;
  currentCatBreed: CatBreed | undefined;

  constructor(private fb: FormBuilder) {
    this.currentCatBreed = this.catBreedService.getSelectedCatBreed();

    this.overlayForm = this.fb.group({
      breed: [this.currentCatBreed?.name, [Validators.required]],
      origin: [this.currentCatBreed?.origin, [Validators.required]],
      image: [this.currentCatBreed?.image, [Validators.required]],
      lifeExpectancy: [
        this.currentCatBreed?.health?.lifeExpectancy,
        [Validators.required],
      ],
    });
  }

  onSubmit() {
    if (this.overlayForm.valid) {
      console.log(this.overlayForm.value);
      this.catBreedService.updateCatBreed(this.overlayForm.value);
    }
  }

  closeForm() {
    // this.dataFormClosed.emit();
    this.formService.closeForm();
  }
}
