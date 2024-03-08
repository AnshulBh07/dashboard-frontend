import { IPostState, ISocialMediaPost } from "../data/interface";

const initialState: IPostState = {
  showPostModal: false,
  showReactionBar: false,
  showCommentModal: false,
  index: -1,
  posts: new Array<ISocialMediaPost>(),
  isLoading: true,
};

type actionType = { type: string; payload?: ISocialMediaPost[] };

export const postReducer = (state = initialState, action: actionType) => {
  switch (action.type) {
    case "post/showModal":
      return { ...state, showPostModal: !state.showPostModal };
    case "post/setData":
      return { ...state, posts: action.payload!, isLoading: false };
    case "post/showReaction":
      return { ...state, showReactionBar: !state.showReactionBar };
    default:
      return state;
  }
};
