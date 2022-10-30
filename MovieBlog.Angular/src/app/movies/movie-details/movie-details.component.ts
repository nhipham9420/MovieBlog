import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { SecurityService } from 'src/app/security/security.service';
import { RatingService } from 'src/app/utilities/rating.service';
import Swal from 'sweetalert2';
import { movieDTO } from '../movies.model';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
  constructor(
    private moviesService: MoviesService,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private ratingsService: RatingService,
    private securityService: SecurityService
  ) {}

  movie: movieDTO;
  releaseDate: Date;
  trailerURL: SafeResourceUrl;

  currentUserId: string;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.moviesService.getById(params['id']).subscribe((movie) => {
        this.movie = movie;
        this.releaseDate = new Date(movie.releaseDate);
        this.trailerURL = this.generateYoutubeURLForEmbeddedVideo(
          movie.trailer
        );
      });
    });
    this.securityService.getUserId().subscribe((userid) => {
      this.currentUserId = userid.toString();
      // console.log(this.currentUserId)
    });
  }

  generateYoutubeURLForEmbeddedVideo(url: any): SafeResourceUrl {
    if (!url) {
      return '';
    }

    let videoId = url.split('v=')[1];
    const ampersandPosition = videoId.indexOf('&');
    if (ampersandPosition !== -1) {
      videoId = videoId.substring(0, ampersandPosition);
    }

    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${videoId}`
    );
  }

  onRating(rate: number) {
    this.ratingsService.rate(this.movie.id, rate).subscribe(() => {
      Swal.fire('Success', 'Your vote has been received', 'success');
    });
  }
}
