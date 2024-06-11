import { Component } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { CatBreed } from '../../assets/types';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CardComponent],
  template: `
    <h2>Cat Breeds</h2>
    <article [className]="'content-area'">
      @for (catBreed of catBreeds; track $index) {
      <app-card [catBreed]="catBreed"></app-card>
      }
    </article>
  `,
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  catBreeds: CatBreed[] = [
    {
      breed: 'American Bobtail',
      origin: 'United States',
      coatLengthVariations: ['Short', 'Medium', 'Long'],
      coatColorVariations: ['White', 'Black', 'Brown'],
      coatShapeVariations: ['Round', 'Square', 'Curly'],
      lifeExpectancy: 10,
      imageSrc:
        'https://www.tica.org/images/Breeds/American_Bobtail/American-Bobtail-Full-Body_.jpg',
    },
    {
      breed: 'American Shorthair',
      origin: 'United States',
      coatLengthVariations: ['Short', 'Medium', 'Long'],
      coatColorVariations: ['White', 'Black', 'Brown'],
      coatShapeVariations: ['Round', 'Square', 'Curly'],
      lifeExpectancy: 12,
      imageSrc:
        'https://www.tiendanimal.es/articulos/wp-content/uploads/2022/05/American-Shorthair-1200x900.jpg',
    },
  ];
}
