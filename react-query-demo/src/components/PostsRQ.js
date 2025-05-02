import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// react query cache:
  // react query store the data in cache for 5 minutes
  // but data in cache might be outdated, data in json server might have been updated, in this case, the react query doing the refetch in the backgroud, if it is updated, reflect on UI
  // isLoading is true when there is no cache for the data, but if there is, isLoading is false.
  // isFetching is true when you are fetching or refetching. no matter if there is cache for data.
  // react query assumes data is updating all the time, so every time you go the other page and come back would trigger the background refetch again. This can be seen in network
// stale mode in devtool:
  // stale mode stands for outdated data bc react query assumes its updated all the time
  // if I am a software developer and I know db data is not gonna change often, then I can set it by staleTime myself
  // as long as the mode is in fresh, it wont trigger refetch later on for the time we set. **
const PostsRQ = () => {
  // useQuery hook returns a object contains many different fields including data, isLoading, isError, error....
  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ["posts"], // this must be unique
    queryFn: () => {
      return axios.get("http://localhost:4000/posts");
    }, // a function alwasy returns a promise
    // how long it is frech data then become stale(outdated), default to be 0
    staleTime: 10000
  });

  console.log({isLoading, isFetching});

  if (isLoading) {
    return <div>Page is loading...</div>;
  }

  if (isError) {
    return <div> {error.message} </div>;
  }

  

  return (
    // we fetch from /posts endpoint, => set key as ["posts"]
    // fetch from /posts/1 => set key = ["posts", 1] or ["posts", post.id]
    // fetch from /posts/2 => set key = ["posts", 2] or ["posts", post.id]
    // /posts/1/comments => ["posts", post.id, "comments"]
    <div className="post-list">
      {data.data.map((post) => {
        return (
          <div className="post-item" key={post.id}>
            <h3 className="post-title">{post.title}</h3>
            <p className="post-body">{post.body}</p>
          </div>
        );
      })}
    </div>
  );
};

export default PostsRQ;
