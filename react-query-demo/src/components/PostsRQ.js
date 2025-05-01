import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const PostsRQ = () => {
  // useQuery hook returns a object contains many different fields including data, isLoading, isError, error....
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts"], // this must be unique
    queryFn: () => {
      return axios.get("http://localhost:4000/posts");
    }, // a function alwasy returns a promise
  });

  if (isLoading) {
    return <div>Page is loading...</div>;
  }

  if (isError) {
    return <div> {error.message} </div>;
  }

  console.log(data);

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
