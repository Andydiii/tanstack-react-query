import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import {useState} from "react";

function fetchFruits(pageId) {
    return axios.get(`http://localhost:4000/fruits?_page=${pageId}&_per_page=4`);
}

// press nextPage button goes to next page, press previousPage goes back to previous page.
export default function PaginatedQueries() {

    const [page, setPage] = useState(1);

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["fruits", page],
        queryFn: () => fetchFruits(page),
        placeholderData: keepPreviousData // prevent showing loading text in the screen by remains the current UI in the page
    })

    // console.log(data);

    if (isLoading) {
        return <h2>Page is loading...</h2>
    }

    if (isError) {
        return <h1>{error.message}</h1>
    }

    return (
        <div className="container">
            {data?.data.data.map(item => {
                return (
                    <div className="fruit-label" key={item.id}>
                        {item.name}
                    </div>
                )
            })}
            <button onClick={() => {setPage(page - 1)}} disabled={page === 1? true : false}>
                Prev Page
            </button>
            <button onClick={() => {setPage(page + 1)}} disabled={page === 5? true : false}>
                Next Page
            </button>
        </div>
    )
}