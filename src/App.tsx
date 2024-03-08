import React, { useEffect, useState } from "react";
import styles from "./appStyles.module.scss";
import { Navbar } from "./components/navbar/Navbar";
import { Dashboard } from "./components/dashboard/Dashboard";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";
import { PostModal } from "./components/modal/PostModal";
import { fetchAllPosts } from "./helper-functions/fetchAllPosts";
import { useDispatch } from "react-redux";
import { Posts } from "./components/posts-page/Posts";
import { createTree, getCommentsFromTree } from "./helper-functions/nAryTree";
import { ISocialMediaPost, ITreeItem } from "./data/interface";
import { CommentModal } from "./components/modal/CommentModal";

const App: React.FC = () => {
  const { showPostModal, posts, showCommentModal } = useSelector(
    (state: RootState) => state.post
  );
  const dispatch: AppDispatch = useDispatch();

  const [commentsMap, setCommentsMap] = useState<Map<string, ITreeItem[]>>(
    new Map<string, ITreeItem[]>()
  );

  // let's retrieve data here when the app loads, i.e all social media data
  useEffect(() => {
    const controller = new AbortController();

    const getPosts = async () => {
      const postsData: ISocialMediaPost[] = await fetchAllPosts(
        controller.signal
      );

      if (postsData) {
        // console.log(postsData);
        dispatch({ type: "post/setData", payload: postsData });
        const resultComments = getCommentsFromTree(
          createTree(postsData),
          postsData
        );

        setCommentsMap(resultComments);
      }
    };

    getPosts();

    // cleanup function
    return () => controller.abort();
  }, [dispatch]);

  return (
    <React.Fragment>
      <div className={styles.app}>
        <Navbar />

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/posts"
            element={<Posts commentsMap={commentsMap} posts={posts} />}
          />
        </Routes>
      </div>

      {showPostModal && <PostModal />}
      {showCommentModal && <CommentModal />}
    </React.Fragment>
  );
};

export default App;
