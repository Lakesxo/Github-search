import { useEffect, useState } from "react";
import { SearchResponse } from "../App";

const useSearch = (
  search: string,
  searchParameter: string,
  page: number | string,
  limit: number | string
) => {
  const [data, setData] = useState<SearchResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [shouldFetch, setShouldFetch] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const apiUrl = `https://api.github.com/search/users?q=${search}${
    searchParameter === "organization" ? "+type:org" : "+type:user"
  };page=${page}&amp;per_page=${limit}`;

  useEffect(() => {
    if (!shouldFetch || !search) return;

    const fetchData = () => {
      setIsLoading(true);
      fetch(apiUrl)
        .then((res) => {
          if (!res.ok) {
            setError(`HTTP error! status: ${res.status}`);
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          setIsLoading(false);
          setShouldFetch(false);
          data?.items && setData(data.items);
          setTotalPages(Math.ceil(data.total_count / Number(limit)));
          if (data.message) {
            setError(data.message);
          }
        })
        .catch((err) => {
          setError(err.message);
          setIsLoading(false);
          setShouldFetch(false);
        });
    };
    fetchData();
  }, [search, page, limit, shouldFetch]);

  const triggerFetch = () => setShouldFetch(true);

  setTimeout(() => {
    setError("");
  }, 1000);

  return { data, isLoading, error, totalPages, triggerFetch };
};

export default useSearch;
