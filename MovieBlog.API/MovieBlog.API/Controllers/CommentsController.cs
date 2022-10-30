using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MovieBlog.API.DTOs;
using MovieBlog.API.Entities;
using System.Security.Claims;

namespace MovieBlog.API.Controllers
{
    [Route("api/comments")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        private readonly ILogger<CommentsController> logger;
        private readonly ApplicationDbContext context;
        private readonly UserManager<IdentityUser> userManager;
        private readonly IMapper mapper;

        public CommentsController(ILogger<CommentsController> logger,
            ApplicationDbContext context,
            UserManager<IdentityUser> userManager,
            IMapper mapper)
        {
            this.logger = logger;
            this.context = context;
            this.userManager = userManager;
            this.mapper = mapper;
        }

        [HttpGet("getbymovieid/{id:int}")]
        public async Task<ActionResult<List<CommentDTO>>> GetByMovieId(int id)
        {
            var comments = await context.Comments.Where(x => x.MovieId == id).OrderByDescending(x => x.CreateAt).ToListAsync();

            return mapper.Map<List<CommentDTO>>(comments);
        }

        [HttpGet("{Id:int}", Name = "getComment")] // api/genres/example
        [AllowAnonymous]
        public async Task<ActionResult<CommentDTO>> Get(int Id)
        {
            var comments = await context.Comments.FirstOrDefaultAsync(x => x.Id == Id);

            if (comments == null)
            {
                return NotFound();
            }

            return mapper.Map<CommentDTO>(comments);
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult> Post([FromBody] CommentCreationDTO commentCreationDTO)
        {
            var email = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "email").Value;
            var user = await userManager.FindByEmailAsync(email);
            var userId = user.Id;

            var comment = new Comment();
            comment.MovieId = commentCreationDTO.MovieId;
            comment.UserEmail = email;
            comment.UserId = userId;
            comment.ParentId = commentCreationDTO.ParentId;
            comment.CreateAt = DateTime.Now;
            comment.Body = commentCreationDTO.Body;

            context.Add(comment);
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPatch("{id:int}")]
        public async Task<ActionResult> Patch(int id, [FromBody] CommentCreationDTO commentCreationDTO)
        {
            var comment = await context.Comments.FirstOrDefaultAsync(x => x.Id == id);
            comment.Body = commentCreationDTO.Body;
            context.Entry(comment).State = EntityState.Modified;
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int Id)
        {
            var genre = await context.Comments.FirstOrDefaultAsync(x => x.Id == Id);

            if (genre == null)
            {
                return NotFound();
            }

            context.Remove(genre);
            await context.SaveChangesAsync();
            return NoContent();
        }
    }
}
