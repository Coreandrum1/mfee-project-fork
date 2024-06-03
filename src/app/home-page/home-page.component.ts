import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [],
  template: `
    <h2>Cat Breeds</h2>
    <article [className]="'content-area'">
      @for (catBreed of catBreeds; track $index) {
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
      </div>
      }
    </article>
  `,
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  catBreeds = [
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
