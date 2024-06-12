import { Component, inject } from '@angular/core';
import { WebService } from '../web.service';
import { CatBreed } from '../../assets/types';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [RouterLink],
  template: ` <article>
    <div>
      <div [className]="'gradient-overlay'"></div>
      <a [routerLink]="'/home'">Go back</a>
      <img [src]="catBreedDetails?.image" alt="cat breed image" />
    </div>
    <h1>{{ catBreedDetails?.name }}</h1>
    <p>{{ catBreedDetails?.origin }}</p>
  </article>`,
  styleUrl: './details.component.css',
})
export class DetailsComponent {
  webService = inject(WebService);
  catBreedDetails: CatBreed | undefined;
  breedId: number | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.breedId = +id;
        this.loadBreedDetails(this.breedId);
      } else {
        // Handle the case where the id is null
        console.error('No ID provided');
      }
    });
  }

  loadBreedDetails(id: number): void {
    this.webService.getCatBreedById(id).then((catBreed) => {
      this.catBreedDetails = catBreed;
    });
  }
}
