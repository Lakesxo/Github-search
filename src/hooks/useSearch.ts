import { useEffect, useState } from "react";
import { SearchResponse } from "../App";
import { notification } from "antd";

const useSearch = (
  search: string,
  searchParameter: string,
  page: number | string,
  limit: number | string
) => {
  const [api] = notification.useNotification();
  const [data, setData] = useState<SearchResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [shouldFetch, setShouldFetch] = useState<boolean>(false);

  const apiUrl = `https://api.github.com/search/users?q=${search}${
    searchParameter === "organization" ? "+type:org" : "+type:user"
  };page=${page}&amp;per_page=${limit}`;

  useEffect(() => {
    if (!shouldFetch || !search) return;

    const fetchData = () => {
      setIsLoading(true);
      fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => {
          setIsLoading(false);
          setShouldFetch(false);
          data?.items && setData(data.items);
          setTotalPages(Math.ceil(data.total_count / Number(limit)));
          if (data.message) {
            api.open({
              message: "An error occured",
              description: data.message,
              type: "error",
            });
          }
        })
        .catch((err) => {
          api.open({
            message: "An error occured",
            description: err.message,
            type: "error",
          });
          setIsLoading(false);
          setShouldFetch(false);
        });
    };
    fetchData();
  }, [search, page, limit, shouldFetch]);

  const triggerFetch = () => setShouldFetch(true);

  return { data, isLoading, totalPages, triggerFetch };
};

export default useSearch;
