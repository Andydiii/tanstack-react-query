import React from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";


// you press loadmore it gives you one more page accumulatively
export function InfiniteFruits() {
    const {data, isLoading, isError, error, fetchNextPage, hasNextPage} = useInfiniteQuery({
        queryKey: ["Fruits"], // dont need to do ["Fruits", page] here, probably because it is appending new data to the existing data in cache
        queryFn: ({pageParam}) => {
            return axios.get(`http://localhost:4000/fruits?_page=${pageParam}&_per_page=4`)
        },
        initialPageParam: 1,
        // 1. used to calculate the next page number. 
        // 2. if the next page number dne, then it should return 'undefined', then when we trigger fetchNextPage, it does nothing
        // 3. It has two params: 
            // lastPage: contains entire API response of last, most recent data fetch
            // allPages: array of objects, each objec is the entire API response of all the past data fetches
        getNextPageParam: (lastPage, allPages) => {
            // 20 items
            // at any page we show 4 items, so 5 pages 
            if (allPages.length < 5) {
                return allPages.length + 1
            } else {
                return undefined
            }
        }
    })

    // console.log(data)

    if (isLoading) {
        return <div>Page is loading....</div>
    }

    if (isError) {
        return <div>{error.message}</div>
    }

    return (
        
        <div className="container">
            {data.pages.map((page) => {
                return page.data.data.map((fruit) => {
                    return (
                        <div key={fruit.id} className='fruit-item'>
                            {fruit.name}
                        </div>
                    )
                })
            })}
            <button onClick={fetchNextPage} disabled={!hasNextPage}>
                loadMore...
            </button>
        </div>

    );
};