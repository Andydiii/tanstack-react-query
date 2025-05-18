import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

export default function PaginatedQueries() {
    function fetchFruits() {
        return axios.get("http://localhost:4000/fruits");
    }

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["fruits"],
        queryFn: fetchFruits
    }) 

    if (isLoading) {
        return <h2>Page is loading...</h2>
    }

    if (isError) {
        return <h1>{error.message}</h1>
    }

    return (
        <div className="container">
            {data?.data.map(item => {
                return (
                    <div className="fruit-label">
                        {item.name}
                    </div>
                )
            })}
        </div>
    )


}