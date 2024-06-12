import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OverlayFormService {
  isFormOpen: boolean;
  constructor() {
    this.isFormOpen = false;
  }

  getIsFormOpen(): boolean {
    return this.isFormOpen;
  }

  openForm() {
    this.isFormOpen = true;
  }
  closeForm() {
    this.isFormOpen = false;
  }
}
