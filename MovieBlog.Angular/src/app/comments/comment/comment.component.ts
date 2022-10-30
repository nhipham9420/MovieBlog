import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  ActiveCommentInterface,
  ActiveCommentTypeEnum,
  commentDTO,
} from '../comments.model';
import * as moment from 'moment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  @Input() comment: commentDTO;
  @Input() activeComment: ActiveCommentInterface;
  @Input() replies: commentDTO[];
  @Input() currentUserId: string;
  @Input() parentId: number;

  @Output()
  setActiveComment = new EventEmitter<ActiveCommentInterface>();
  @Output()
  deleteComment = new EventEmitter<number>();
  @Output()
  addComment = new EventEmitter<{
    text: string;
    parentId: number;
    movieId: number;
  }>();
  @Output()
  updateComment = new EventEmitter<{ text: string; commentId: number }>();

  createdAt: string = '';
  canReply: boolean = false;
  canEdit: boolean = false;
  canDelete: boolean = false;
  activeCommentType = ActiveCommentTypeEnum;
  replyId: number;
  commentget: commentDTO;

  ngOnInit(): void {
    this.createdAt = moment(this.comment.createAt).calendar();

    this.canReply = Boolean(this.currentUserId);

    this.canEdit = this.currentUserId === this.comment.userId;

    this.canDelete =
      this.currentUserId === this.comment.userId && this.replies.length === 0;

    this.replyId = this.parentId ? this.parentId : this.comment.id;
  }

  isReplying(): boolean {
    if (!this.activeComment) {
      return false;
    }
    return (
      this.activeComment.id === this.comment.id &&
      this.activeComment.type === this.activeCommentType.replying
    );
  }

  isEditing(): boolean {
    if (!this.activeComment) {
      return false;
    }
    return (
      this.activeComment.id === this.comment.id &&
      this.activeComment.type === 'editing'
    );
  }
}
