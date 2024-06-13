import { Component, inject } from '@angular/core';
import { WebService } from '../web.service';
import { CatBreed, Comment } from '../../assets/types';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  template: ` <article>
    <div>
      <div [className]="'gradient-overlay'"></div>
      <a [routerLink]="'/home'">Go back</a>
      <img [src]="catBreedDetails?.image" alt="cat breed image" />
    </div>
    <section class="comments-section">
      <section class="details-section">
        <h1>{{ catBreedDetails?.name }}</h1>
        <h2>{{ catBreedDetails?.origin }}</h2>
        <h3>Coat pattern: {{ catBreedDetails?.coatPattern }}</h3>
        <h3>Coat length: {{ catBreedDetails?.coatLength }}</h3>
        <h3>Health: {{ catBreedDetails?.health?.lifeExpectancy }}</h3>
        <h3>Locations: {{ catBreedDetails?.locations?.join(', ') }}</h3>
        <h3>Temperament: {{ catBreedDetails?.temperament?.join(', ') }}</h3>
        <h3>
          Health issues: {{ catBreedDetails?.health?.commonIssues?.join(', ') }}
        </h3>
        <h3>Life expectancy: {{ catBreedDetails?.health?.lifeExpectancy }}</h3>
      </section>
      <form [formGroup]="commentForm" (ngSubmit)="onSubmit()">
        <label for="comment">Add a comment</label>
        <input
          type="text"
          id="comment"
          formControlName="comment"
          placeholder="Write a comment..."
        />
        <button type="submit" [disabled]="commentForm.invalid">Post</button>
      </form>
      @for (comment of comments; track $index) {
      <div class="comment">
        <div class="comment-profile">
          <div class="avatar"></div>
        </div>
        <div class="comment-content">
          <div class="comment-header">
            <div class="comment-author">
              <span>{{ comment.userName }} {{ comment.userLastName }}</span>
            </div>
            <div class="comment-date">{{ comment.createdAt | date }}</div>
          </div>
          <div class="comment-body">{{ comment.comment }}</div>
        </div>
      </div>
      }
    </section>
  </article>`,
  styleUrl: './details.component.css',
})
export class DetailsComponent {
  webService = inject(WebService);
  catBreedDetails: CatBreed | undefined;
  breedId: string | null = null;
  comments: Comment[] = [];
  commentForm: FormGroup;
  authService = inject(AuthService);

  constructor(private route: ActivatedRoute, private fb: FormBuilder) {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.breedId = id;
        this.loadBreedDetails(this.breedId);
        this.webService.getCommentsByCatId(this.breedId).then((comments) => {
          this.comments = comments;
        });
      } else {
        // Handle the case where the id is null
        console.error('No ID provided');
      }
    });
    this.commentForm = this.fb.group({
      comment: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    const user = JSON.parse(this.authService.getCurrentUser());
    if (this.commentForm.valid) {
      const comment: Comment = {
        id: crypto.randomUUID(),
        userId: this.authService.getUserId(),
        userName: user?.firstName,
        userLastName: user?.lastName,
        catId: this.breedId as string,
        comment: this.commentForm.value.comment,
        createdAt: new Date().toDateString(),
        updatedAt: new Date().toDateString(),
      };
      this.webService.addComment(comment).then((response) => {
        if (response) {
          this.comments.push(comment);
          this.commentForm.reset();
        }
      });
    }
  }

  loadBreedDetails(id: string): void {
    this.webService.getCatBreedById(id).then((catBreed) => {
      this.catBreedDetails = catBreed;
    });
  }
}
