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
import { WebService } from '../web.service';

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
              <option value="USA">United States</option>
              <option value="Iran">Iran</option>
              <option value="Thailand">Thailand</option>
              <option value="Canada">Canada</option>
              <option value="México">México</option>
              <option value="Brazil">Brazil</option>
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
  catBreedService = inject(CatBreedHandlerService);
  formService = inject(OverlayFormService);
  webService = inject(WebService);
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

  async onSubmit() {
    if (this.overlayForm.valid) {
      let catBreedCopy = Object.assign({}, this.currentCatBreed);
      if (this.currentCatBreed) {
        catBreedCopy.name = this.overlayForm.value.breed;
        catBreedCopy.origin = this.overlayForm.value.origin;
        catBreedCopy.image = this.overlayForm.value.image;
        catBreedCopy.health.lifeExpectancy =
          this.overlayForm.value.lifeExpectancy;
        try {
          await this.webService.updateCatBreed(catBreedCopy);
          this.catBreedService.updateCatBreedList(catBreedCopy);
          this.formService.closeForm();
        } catch (error) {
          console.log(error);
        }
      } else {
        catBreedCopy = {
          id: crypto.randomUUID(),
          name: this.overlayForm.value.breed,
          origin: this.overlayForm.value.origin,
          image: this.overlayForm.value.image,
          health: {
            commonIssues: [],
            lifeExpectancy: this.overlayForm.value.lifeExpectancy,
          },
          coatPattern: '',
          coatLength: '',
          locations: [],
          temperament: [],
        };

        try {
          await this.webService.addCatBreed(catBreedCopy);
          this.catBreedService.addCatBreed(catBreedCopy);
          this.formService.closeForm();
        } catch (error) {
          console.log(error);
        }
      }
    }
  }

  closeForm() {
    this.formService.closeForm();
  }
}
