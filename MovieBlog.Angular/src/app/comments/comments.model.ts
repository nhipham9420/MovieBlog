export interface commentDTO {
  id: number;
  body: string;
  userEmail: string;
  userId: string;
  movieId: number;
  parentId: number;
  createAt: string;
}

export enum ActiveCommentTypeEnum {
  replying = 'replying',
  editing = 'editing',
}

export interface ActiveCommentInterface {
  id: number;
  type: ActiveCommentTypeEnum;
}
