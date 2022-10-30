namespace MovieBlog.API.DTOs
{
    public class MoviePutGetDTO
    {
        public MovieDTO Movie { get; set; }
        public List<GenreDTO> SelectedGenres { get; set; }
        public List<GenreDTO> NonSelectedGenres { get; set; }
        public List<ActorsMovieDTO> Actors { get; set; }
    }
}
