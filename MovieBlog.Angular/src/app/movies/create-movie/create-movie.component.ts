import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { multipleSelectorModel } from 'src/app/utilities/multiple-selector/multiple-selector.model';
import { movieCreationDTO } from '../movies.model';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-create-movie',
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.scss'],
})
export class CreateMovieComponent implements OnInit {
  constructor(private moviesService: MoviesService, private router: Router) {}

  nonSelectedGenres: multipleSelectorModel[];

  ngOnInit(): void {
    this.moviesService.postGet().subscribe((response) => {
      this.nonSelectedGenres = response.genres.map((genre) => {
        return <multipleSelectorModel>{ key: genre.id, value: genre.name };
      });
    });
  }

  saveChanges(movieCreationDTO: movieCreationDTO) {
    console.log(movieCreationDTO);
    this.moviesService.create(movieCreationDTO).subscribe((id) => {
      this.router.navigate(['/movie/' + id]);
    });
  }
}
