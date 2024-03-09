import { IPostState, ISocialMediaPost } from "../data/interface";

const initialState: IPostState = {
  showPostModal: false,
  showReactionBar: false,
  showCommentModal: false,
  index: -1,
  posts: new Array<ISocialMediaPost>(),
  isLoading: true,
};

type actionType = { type: string; payload?: ISocialMediaPost[] | number };

export const postReducer = (state = initialState, action: actionType) => {
  switch (action.type) {
    case "post/showModal":
      return { ...state, showPostModal: !state.showPostModal };
    case "post/setData":
      return {
        ...state,
        posts:
          typeof action.payload !== "number" ? action.payload! : state.posts,
        isLoading: false,
      };
    case "post/showReaction":
      return { ...state, showReactionBar: !state.showReactionBar };
    case "post/setCurrPost":
      return {
        ...state,
        index:
          typeof action.payload === "number" ? action.payload : state.index,
      };
    case "post/showComment":
      return { ...state, showCommentModal: !state.showCommentModal };
    default:
      return state;
  }
};
