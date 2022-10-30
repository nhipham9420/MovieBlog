import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { actorCreationDTO } from '../actors.model';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-form-actor',
  templateUrl: './form-actor.component.html',
  styleUrls: ['./form-actor.component.scss'],
})
export class FormActorComponent implements OnInit {
  public Editor = ClassicEditor;

  constructor(private formBuilder: FormBuilder) {}

  form: FormGroup;

  @Input()
  model: actorCreationDTO;

  @Output()
  onSaveChanges = new EventEmitter<actorCreationDTO>();

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [
        '',
        {
          validators: [Validators.required],
        },
      ],
      dateOfBirth: '',
      picture: '',
      biography: '',
    });

    if (this.model !== undefined) {
      this.form.patchValue(this.model);
    }
  }

  onImageSelected(image) {
    this.form.get('picture').setValue(image);
  }

  // changeMarkdown(content){
  //   this.form.get('biography').setValue(content);
  // }

  saveChanges() {
    this.onSaveChanges.emit(this.form.value);
  }
}
