import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, Links } from "react-router-dom";

// react query cache:
  // react query store the data in cache using the queryKey as a unique key for 5 minutes
  // but data in cache might be outdated, data in json server might have been updated, in this case, the react query doing the refetch in the backgroud, if it is updated, reflect on UI
  // isLoading is true when there is no cache for the data, but if there is, isLoading is false.
  // isFetching is true when you are fetching or refetching. no matter if there is cache for data.
  // react query assumes data is updating all the time, so every time you go the other page and come back would trigger the background refetch again. This can be seen in network
// stale mode in devtool:
  // stale mode stands for outdated data bc react query assumes its updated all the time
  // so this caused background refetch from the endpoint is triggered all the time when we click this page.
  // if I am a software developer and I know db data is not gonna change often, then I can configure it by staleTime myself
  // as long as the mode is in fresh, it wont trigger refetch during time we set. **
// polling can be beneficial if a application require netword request(e.g. data in UI has to be updated every 1/3/5/10 seconds)
  // react query makes it easy to pull data at intervals of time by configure "refetchInterval", 1000 means refetch data every 1 second
  // polling only continues if current tab is onFocus. if you switch to the other tab it stops refetch
  // if you want even if user switch to the other tab and the polling is still working, then "refetchIntervalInBackgroud" = true is needed.
// useQuery fetch data bny clicking on a button:
  // if you switch to a different tab(this means going out of focus) and switch back too app page(coming back of focus so it triggered network reuqest/refetch)
  // 

  const PostsRQ = () => {
    // useQuery hook returns a object contains many different fields including data, isLoading, isError, error....
    const { data, isLoading, isError, error, isFetching, refetch } = useQuery({
      queryKey: ["posts"], // this must be unique
      queryFn: () => {
        return axios.get("http://localhost:4000/posts");
      }, // a function alwasy returns a promise


      // how long in miliseconds it is frech data then become stale(outdated), default to be 0
      // staleTime: 10000 // 10 seconds

      // take value in milliseconds. default set to false. means no interval refetch
      // refetchInterval: 1000

      // disable automatic refetching when the query mounts(component mounts: when we go to the page the component gets rendered) or changes query keys.
        // once its disabled, when we get to the page or get back to the page, wont trigger automatic refetch
        // so we need to refertch manually
      // enabled: false
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
        {/* <button onClick={refetch}>
          Fetch Posts
        </button> */}
        {data.data.map((post) => {
          return (
            <Link to={`/rq-posts/${post.id}`}>
              <div className="post-item" key={post.id}>
                <h3 className="post-title">{post.title}</h3>
                <p className="post-body">{post.body}</p>
              </div>
            </Link>
          );
        })}
      </div> 
    );
  };

export default PostsRQ;


// create a RQPostDetails 
// configuring the route for the newly created page - (rq-posts/{postId})
// wrapping each item with the <a> tag