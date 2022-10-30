
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace MovieBlog.API.Entities
{
    public class Comment
    {
        public int Id { get; set; }
        public int ParentId { get; set; }
        public int MovieId { get; set; }
        [ForeignKey("MovieId")]
        public Movie Movie { get; set; }
        public string UserEmail { get; set; }
        public string UserId { get; set; }
        [ForeignKey("UserId")]
        public IdentityUser IdentityUser { get; set; }
        public string Body { get; set; }
        public DateTime CreateAt { get; set; }
    }
}
