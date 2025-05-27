import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Form, Link, Links } from "react-router-dom";


// GET method
const fetchPosts = () => {
    return axios.get("http://localhost:4000/posts");
}

// POST method
const addPost = (post) => {
    return axios.post("http://localhost:4000/posts", post); // post is the data that we want to send to the server
}

const PostsRQMutation1 = () => {

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const { data, isLoading, isError, error, isFetching, refetch } = useQuery({
        queryKey: ["posts"], 
        queryFn: fetchPosts
    });

    // kind of like we initialize the mutation and then we can use it later. so when we call mutate, it will call the addPost function
    const { mutate } = useMutation({
        mutationFn: addPost // similar to useQuery queryFn, this is mandatory to define.the function has to return a promise
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const post = {title, body};
        mutate(post);

        setTitle("");
        setBody("");
    }


    console.log({isLoading, isFetching});

    if (isLoading) {
        return <div>Page is loading...</div>;
    }

    if (isError) {
        return <div> {error.message} </div>;
    }



    return (
        <div className="post-list">
        <form onSubmit={handleSubmit}>
            <input
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title"
            value={title}
            />
            <input
            onChange={(e) => setBody(e.target.value)}
            placeholder="Enter post body"
            value={body}
            />
            <button type="submit">Post</button>
        </form>
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

export default PostsRQMutation1;