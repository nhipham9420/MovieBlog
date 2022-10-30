import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActiveCommentInterface, commentDTO } from '../comments.model';
import { CommentsService } from '../comments.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  @Input() currentUserId: string;

  comments: commentDTO[] = [];
  activeComment: ActiveCommentInterface | null = null;

  model: commentDTO[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private commentsService: CommentsService
  ) {}

  ngOnInit(): void {
    this.loadModel();
  }

  loadModel() {
    this.activatedRoute.params.subscribe((params) => {
      this.commentsService.getByMovieId(params['id']).subscribe((comments) => {
        this.comments = comments;
      });
    });
  }

  getRootComments(): commentDTO[] {
    return this.comments.filter((comment) => comment?.parentId === 0);
  }

  updateComment({
    text,
    commentId,
  }: {
    text: string;
    commentId: number;
  }): void {
    this.commentsService
      .updateComment(commentId, text)
      .subscribe((updatedComment) => {
        this.comments = this.comments.map((comment) => {
          if (comment.id === commentId) {
            return updatedComment;
          }
          return comment;
        });

        this.activeComment = null;
        this.loadModel();
      });
  }

  deleteComment(commentId: number): void {
    this.commentsService.deleteComment(commentId).subscribe(() => {
      this.comments = this.comments.filter(
        (comment) => comment.id !== commentId
      );
      this.loadModel();
    });
  }

  setActiveComment(activeComment: ActiveCommentInterface | null): void {
    this.activeComment = activeComment;
  }

  addComment({
    text,
    parentId,
    movieId,
  }: {
    text: string;
    parentId: number;
    movieId: number;
  }): void {
    this.activatedRoute.params.subscribe((params) => {
      this.commentsService
        .createComment(text, parentId, (movieId = params['id']))
        .subscribe((createdComment) => {
          this.comments = [...this.comments, createdComment];
          this.activeComment = null;
          this.loadModel();
        });
    });
  }

  getReplies(commentId: number): commentDTO[] {
    return this.comments
      .filter((comment) => comment?.parentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createAt).getTime() - new Date(b.createAt).getTime()
      );
  }
}
