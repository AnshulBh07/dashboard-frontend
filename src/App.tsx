import React, { useEffect, useState } from "react";
import styles from "./appStyles.module.scss";
import { Navbar } from "./components/navbar/Navbar";
import { Dashboard } from "./components/dashboard/Dashboard";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";
import { PostModal } from "./components/modal/PostModal";
import { fetchAllPosts } from "./helper-functions/postRequests";
import { useDispatch } from "react-redux";
import { Posts } from "./components/posts-page/Posts";
import { TreeNode, createTree } from "./helper-functions/nAryTree";
import { ISocialMediaPost, ITreeItem } from "./data/interface";
import { CommentModal } from "./components/modal/CommentModal";
import { Layout } from "./components/login/Layout";
import { LoginForm } from "./components/login/LoginForm";
import { SignupForm } from "./components/login/SignupForm";
import { setToast } from "./helper-functions/setToast";

const App: React.FC = () => {
  const { showPostModal, showCommentModal, index } = useSelector(
    (state: RootState) => state.post
  );
  const dispatch: AppDispatch = useDispatch();

  const [commentsTreeArr, setCommentsTreeArr] = useState<TreeNode<ITreeItem>[]>(
    new Array<TreeNode<ITreeItem>>()
  );

  const { pathname } = useLocation();
  const { isAuthenticated } = useSelector((state: RootState) => state.login);

  // let's retrieve data here when the app loads, i.e all social media data
  useEffect(() => {
    const controller = new AbortController();
    let timer: NodeJS.Timeout;

    const getPosts = async () => {
      const response = await fetchAllPosts(controller.signal);

      if (response) {
        if (
          response.status === 400 ||
          response.status === 401 ||
          response.status === 500
        ) {
          setToast("error", response.data, dispatch, timer);
          return;
        }
      }

      const postsData = response
        ? response.data.posts
        : new Array<ISocialMediaPost>();

      if (postsData.length > 0) {
        // console.log(postsData);
        dispatch({ type: "post/setData", payload: postsData });
        const commentsTrees = createTree(postsData);

        setCommentsTreeArr(commentsTrees);
      }
    };

    getPosts();

    // cleanup function
    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [dispatch]);

  return (
    <React.Fragment>
      <div className={styles.app}>
        {!pathname.includes("/login") && <Navbar />}

        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? <Dashboard /> : <Navigate to={"/login"} />
            }
          />
          <Route
            path="/posts"
            element={isAuthenticated ? <Posts /> : <Navigate to={"/login"} />}
          />
          <Route path="/login" element={<Layout />}>
            <Route index element={<LoginForm />} />
            <Route path="signup" element={<SignupForm />} />
          </Route>
        </Routes>
      </div>

      {showPostModal && <PostModal />}
      {/* comment modal will take post data and comments as prop */}
      {showCommentModal && (
        <CommentModal
          commentTree={commentsTreeArr[index]}
          setCommentsTree={setCommentsTreeArr}
        />
      )}
    </React.Fragment>
  );
};

export default App;
