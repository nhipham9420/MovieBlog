import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { actorsMovieDTO } from 'src/app/actors/actors.model';
import { multipleSelectorModel } from 'src/app/utilities/multiple-selector/multiple-selector.model';
import { movieCreationDTO, movieDTO } from '../movies.model';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-form-movie',
  templateUrl: './form-movie.component.html',
  styleUrls: ['./form-movie.component.scss'],
})
export class FormMovieComponent implements OnInit {
  public Editor = ClassicEditor;

  constructor(private formBuilder: FormBuilder) {}

  form: FormGroup;

  @Input()
  model: movieDTO;

  @Output()
  onSaveChanges = new EventEmitter<movieCreationDTO>();

  @Input()
  nonSelectedGenres: multipleSelectorModel[] = [];

  @Input()
  selectedGenres: multipleSelectorModel[] = [];

  @Input()
  selectedActors: actorsMovieDTO[] = [];

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: [
        '',
        {
          validators: [Validators.required],
        },
      ],
      summary: '',
      inTheaters: false,
      trailer: '',
      releaseDate: '',
      poster: '',
      genresIds: '',
      actors: '',
    });

    if (this.model !== undefined) {
      this.form.patchValue(this.model);
    }
  }

  onImageSelected(file: File) {
    this.form.get('poster').setValue(file);
  }

  // changeMarkdown(content: string){
  //   this.form.get('summary').setValue(content);
  // }

  saveChanges() {
    const genresIds = this.selectedGenres.map((value) => value.key);
    this.form.get('genresIds').setValue(genresIds);

    const actors = this.selectedActors.map((val) => {
      return { id: val.id, character: val.character };
    });
    this.form.get('actors').setValue(actors);

    this.onSaveChanges.emit(this.form.value);
  }
}
