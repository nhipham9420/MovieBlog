import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptorService } from './security/jwt-interceptor.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { MenuComponent } from './menu/menu.component';
import { MoviesListComponent } from './movies/movies-list/movies-list.component';
import { GenericListComponent } from './utilities/generic-list/generic-list.component';
import { RatingComponent } from './utilities/rating/rating.component';
import { HomeComponent } from './home/home.component';
import { CreateMovieComponent } from './movies/create-movie/create-movie.component';
import { EditMovieComponent } from './movies/edit-movie/edit-movie.component';
import { CreateActorComponent } from './actors/create-actor/create-actor.component';
import { EditActorComponent } from './actors/edit-actor/edit-actor.component';
import { IndexActorsComponent } from './actors/index-actors/index-actors.component';
import { CreateGenreComponent } from './genres/create-genre/create-genre.component';
import { EditGenreComponent } from './genres/edit-genre/edit-genre.component';
import { IndexGenresComponent } from './genres/index-genres/index-genres.component';
import { MultipleSelectorComponent } from './utilities/multiple-selector/multiple-selector.component';
import { InputMarkdownComponent } from './utilities/input-markdown/input-markdown.component';
import { InputImgComponent } from './utilities/input-img/input-img.component';
import { FormMovieComponent } from './movies/form-movie/form-movie.component';
import { MoviesFilterComponent } from './movies/movies-filter/movies-filter.component';
import { FormGenreComponent } from './genres/form-genre/form-genre.component';
import { FormActorComponent } from './actors/form-actor/form-actor.component';
import { ActorsAutocompleteComponent } from './actors/actors-autocomplete/actors-autocomplete.component';
import { MovieDetailsComponent } from './movies/movie-details/movie-details.component';
import { DisplayErrorsComponent } from './utilities/display-errors/display-errors.component';
import { AuthenticationFormComponent } from './security/authentication-form/authentication-form.component';
import { AuthorizeViewComponent } from './security/authorize-view/authorize-view.component';
import { LoginComponent } from './security/login/login.component';
import { RegisterComponent } from './security/register/register.component';
import { UsersIndexComponent } from './security/users-index/users-index.component';

import { CommentsComponent } from './comments/comments/comments.component';
import { CommentComponent } from './comments/comment/comment.component';
import { FormCommentComponent } from './comments/form-comment/form-comment.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    MoviesListComponent,
    GenericListComponent,
    RatingComponent,
    HomeComponent,
    CreateMovieComponent,
    EditMovieComponent,
    CreateActorComponent,
    EditActorComponent,
    IndexActorsComponent,
    CreateGenreComponent,
    EditGenreComponent,
    IndexGenresComponent,
    MultipleSelectorComponent,
    InputMarkdownComponent,
    InputImgComponent,
    FormMovieComponent,
    MoviesFilterComponent,
    FormGenreComponent,
    FormActorComponent,
    ActorsAutocompleteComponent,
    MovieDetailsComponent,
    DisplayErrorsComponent,
    AuthenticationFormComponent,
    AuthorizeViewComponent,
    LoginComponent,
    RegisterComponent,
    UsersIndexComponent,
    CommentsComponent,
    CommentComponent,
    FormCommentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    CKEditorModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MarkdownModule.forRoot(),
    SweetAlert2Module.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
