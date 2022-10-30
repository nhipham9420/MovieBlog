namespace MovieBlog.API.DTOs
{
    public class CommentDTO
    {
        public int Id { get; set; }
        public int ParentId { get; set; }
        public int MovieId { get; set; }
        public string UserId { get; set; }
        public string UserEmail { get; set; }
        public string Body { get; set; }
        public DateTime CreateAt { get; set; }
    }
}
