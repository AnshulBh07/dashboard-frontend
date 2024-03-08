// this contains an n-ary tree implementation that is used to store comments
// as the comments are hierarchical in nature this makes for a perfect data structure
// we will leverage the use of parent_comment field for each comment

import { ITreeItem, ISocialMediaPost } from "../data/interface";

// make use of generic classes
class TreeNode<T extends ITreeItem> {
  //defines the structure of node
  data: T;
  children: TreeNode<T>[];

  constructor(data: T) {
    this.data = data;
    this.children = [];
  }
}

// interface for the class that implements operations
interface INAryTree<T extends ITreeItem> {
  insert(root: TreeNode<T> | null, data: T): TreeNode<T>;
  //   we don't perform deletion here, as it has to be in sync with database, we do it at backend an then fetch fresh data
  //   our only task here is to create the tree for retrieval purposes
  findNode(root: TreeNode<T>, parent: number): TreeNode<T> | null; //function to find the parent node

  //   traversing algo, here we will go for preOrder traversal
  preOrder(root: TreeNode<T> | null, level: number): T[];
}

class NAryTree<T extends ITreeItem> implements INAryTree<T> {
  // function to find the parent node using a simple dfs traversal
  public findNode(root: TreeNode<T>, parent: number): TreeNode<T> | null {
    // if root doesn't exist
    if (!root) return null;

    // base case if root is the required node
    if (root.data.comment_id === parent) return root;

    // loop through all the children and call recursively for each child
    for (const child of root.children) {
      const result = this.findNode(child, parent);
      if (result !== null) return result;
    }

    return null;
  }

  public insert(root: TreeNode<T> | null, data: T): TreeNode<T> {
    // if root doesn't exist or parent is null return new node as root of curr tree
    if (!root) return new TreeNode(data);

    if (!data.parent_comment) {
      root.children.push(new TreeNode(data));
      return root;
    }

    const node = this.findNode(root, data.parent_comment);

    if (node) {
      node.children.push(new TreeNode(data));
    }

    return root;
  }

  public preOrder(root: TreeNode<T> | null, level: number): T[] {
    const preOrderArr: T[] = [];

    if (!root) return preOrderArr;

    preOrderArr.push({ ...root.data, level: level });

    for (const child of root.children) {
      preOrderArr.push(...this.preOrder(child, level + 1));
    }

    return preOrderArr;
  }
}

// a function that will create tree as soon as we get the data, T will be IComment with extended property of level
export const createTree: (arr: ISocialMediaPost[]) => TreeNode<ITreeItem>[] = (
  posts: ISocialMediaPost[]
) => {
  // create an array of nAry trees, by the end we will have 20 nAry trees, one for each post
  const ans = new Array<TreeNode<ITreeItem>>();
  const treeObj = new NAryTree<ITreeItem>();

  for (const post of posts) {
    // the root level for each node will be gibberish, we just need it to link all comments to a single post
    const data: ITreeItem = {
      comment_id: -1,
      user_id: -1,
      username: "",
      comment_text: "",
      timestamp: "",
      parent_comment: null,
      _id: "",
      level: -1,
    };

    let root = new TreeNode(data);

    // now loop over the comments field for current post and insert in tree
    post.comments.forEach((comment) => {
      root = treeObj.insert(root, comment);
    });

    ans.push(root);
  }

  console.log(ans.length);
  return ans;
};

// function that returns final comments mapped to their posts
export const getCommentsFromTree: (
  arr: TreeNode<ITreeItem>[],
  posts: ISocialMediaPost[]
) => Map<string, ITreeItem[]> = (commentTrees, posts) => {
  const commentsMap = new Map<string, ITreeItem[]>(); // posts_id -> comments[]
  const treeObj = new NAryTree<ITreeItem>();

  const n = commentTrees.length;

  for (let i = 0; i < n; i++) {
    commentsMap.set(posts[i]._id, treeObj.preOrder(commentTrees[i], -1));
  }

  return commentsMap;
};
