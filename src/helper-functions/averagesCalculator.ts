// includes functions used to calculate the averages for given data
import { ISocialMediaPost } from "../data/interface";

function getAvgImpressions(posts: ISocialMediaPost[]) {
  // formula = (views of post/total views)/number of posts

  let totalViews = 0;

  // first calculate total views of all posts
  for (const post of posts) {
    totalViews += post.views;
  }

  return Math.round(totalViews);
}

function getAvgReach(posts: ISocialMediaPost[]) {
  //formula = total number of views /  total posts
  let totalViews = 0;
  const n = posts.length;

  for (const post of posts) {
    totalViews += post.views;
  }

  return Math.round(totalViews / n);
}

function getAvgEngagement(posts: ISocialMediaPost[]) {
  // formula = ((total engagement)/posts)/followers * 100
  // let us assume that we have around 200 followers
  let totalEng = 0;
  const n = posts.length;

  // total engagement is the total number of reactions + comments + shares
  for (const post of posts) {
    const arr = Object.values(post.reactions);
    let sum = 0;
    arr.forEach((value) => {
      if (typeof value === "number") return (sum += value);

      return sum;
    });

    totalEng += sum + post.comments.length + post.shares;
  }

  const avgEng = (totalEng / n / 200) * 100;

  return Math.round(avgEng * 100) / 100;
}

function getAvgClick(posts: ISocialMediaPost[]) {
  // CTR = clicks/impressions, impressions is total number of views of a post
  // formula = (total CTR/number of posts) * 100
  let totalCTR = 0;
  const n = posts.length;

  for (const post of posts) {
    totalCTR += post.link_click / post.views;
  }

  const avgClick = (totalCTR / n) * 100;

  return Math.round(avgClick * 100) / 100;
}

export const getAggregates: (arr: ISocialMediaPost[]) => number[] = (posts) => {
  const ans = new Array<number>(4).fill(0);
  //   ans[0] -> average impressions per post
  // ans[1] -> average reach per post
  // ans[2] -> average engagement rate
  // ans[3] -> average click through rate
  ans[0] = getAvgImpressions(posts);
  ans[1] = getAvgReach(posts);
  ans[2] = getAvgEngagement(posts);
  ans[3] = getAvgClick(posts);
  return ans;
};
