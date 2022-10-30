namespace MovieBlog.API.DTOs
{
    public class CommentCreationDTO
    {
        public int ParentId { get; set; }
        public int MovieId { get; set; }
        public string Body { get; set; }
        public DateTime CreateAt { get; set; }
    }
}
