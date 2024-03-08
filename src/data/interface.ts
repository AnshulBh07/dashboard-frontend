// this file holds the type declaration for all custom types done using interfaces
export interface IComment {
  comment_id: number;
  user_id: number;
  username: string;
  comment_text: string;
  timestamp: string;
  parent_comment: number | null; //stores the id of parent comment, if a root comment, stores null
  _id: string;
}

export interface IReactions {
  like?: number;
  love?: number;
  haha?: number;
  sad?: number;
  angry?: number;
  wow?: number;
  _id: string;
}

export interface ISocialMediaPost {
  _id: string;
  post_id: number;
  username: string;
  post_content: string;
  media: string | null;
  media_type: "photo" | "video" | null;
  timestamp: string;
  likes: number;
  comments: IComment[];
  reactions: IReactions;
  link_click: number;
  views: number;
  shares: number;
  __v: number;
}

export interface INavItem {
  icon: JSX.Element;
  name: string;
  link: string;
}

export interface IAggregate {
  icon: JSX.Element;
  value: string;
  title: string;
}

export type dataset = {
  label: string;
  data: number[];
  borderColor?: string;
  backgroundColor?: string;
};

export interface IChartData {
  labels: string[];
  datasets: dataset[];
}

export interface ITreeItem extends IComment {
  level?: number;
}

export interface IPostState {
  showPostModal: boolean;
  showReactionBar: boolean;
  showCommentModal: boolean;
  index: number;
  posts: ISocialMediaPost[];
  isLoading: boolean;
}
