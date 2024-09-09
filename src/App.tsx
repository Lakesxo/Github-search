import "./app.css";
import { Radio, RadioChangeEvent, Skeleton, notification } from "antd";
import {
  AssemblyLogo,
  CaretIcon,
  GithubLogo,
  PlaceholderSearchIcon,
  SearchIcon,
} from "./assets/icons";
import Button from "./components/button/Button";
import { useEffect, useState } from "react";
import SearchResultCard from "./components/search-card/SearchResultCard";
import background from "./assets/images/lines.png";
import useSearch from "./hooks/useSearch";

export enum SearchType {
  Users = "user",
  Organization = "organization",
}

export type SearchResponse = {
  id: number;
  avatar_url: string;
  login: string;
  html_url: string;
  type: SearchType.Users | SearchType.Organization;
};

const App: React.FunctionComponent = () => {
  const pathname = window.location.pathname;
  const search = window.location.search;
  const searchParamFromURL = pathname.split("/")[2];
  const searchValueFromURL = pathname.split("/")[3];
  const pageFromURL = new URLSearchParams(search).get("page") || 1;
  const limitFromURL = new URLSearchParams(search).get("limit") || 50;

  const [searchParameter, setSearchParameter] = useState<
    SearchType.Users | SearchType.Organization | string
  >(searchParamFromURL || SearchType.Users);
  const [isSearched, setIsSearched] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>(
    searchValueFromURL || ""
  );
  const [page, setPage] = useState<number | string>(pageFromURL);
  const [pageLimit, setPageLimit] = useState<number | string>(limitFromURL);
  const [api, contextHolder] = notification.useNotification();

  const onRadiochange = (e: RadioChangeEvent) => {
    setSearchParameter(e.target.value);
  };
  const { data, isLoading, error, totalPages, triggerFetch } = useSearch(
    searchValue,
    searchParameter,
    page,
    pageLimit
  );

  const handleSearch = (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.KeyboardEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | null,
    search: string,
    page: number | string,
    limit: number | string
  ) => {
    e?.preventDefault();
    if (searchValue) {
      triggerFetch();
      window.history.pushState(
        {},
        "",
        `/search/${searchParameter}/${search}?page=${page}&limit=${limit}`
      );
      setIsSearched(true);
    }
  };

  useEffect(() => {
    if (searchValueFromURL) {
      handleSearch(null, searchValueFromURL, pageFromURL, pageLimit);
    }
  }, []);

  if (error) {
    api.open({
      message: "An error occured",
      description: error,
      type: "error",
    });
  }

  return (
    <main>
      {contextHolder}
      <header>
        <nav>
          <AssemblyLogo />
          <a href="https://github.com/Lakesxo/Github-search" target="_blank">
            <Button
              name="Github"
              variant="secondary"
              prefixIcon={<GithubLogo />}
            />
          </a>
        </nav>
      </header>
      <section>
        <h2>
          Search for <br />{" "}
          <span className="gradient">Github Users or Organizations</span> <br />{" "}
          In Seconds!
        </h2>
        <p className="select">Choose search paramenter below :</p>
        <form
          onSubmit={(e) => {
            handleSearch(e, searchValue, 1, pageLimit);
            setPage(1);
          }}
        >
          <div className="radiogroup">
            <Radio.Group onChange={onRadiochange} value={searchParameter}>
              <Radio value="user">Users</Radio>
              <Radio value="organization">Organizations</Radio>
            </Radio.Group>
          </div>
          <section className="inputContainer">
            <div className="inputgroup">
              <input
                aria-label={`search ${searchParameter}`}
                type="text"
                placeholder={
                  searchParameter === "user"
                    ? "Enter user name"
                    : "Enter organization name"
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch(e, searchValue, 1, pageLimit);
                    setPage(1);
                  }
                }}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <span className="searchIcon">
                <PlaceholderSearchIcon />
              </span>
              <Button
                name={
                  searchParameter === "user"
                    ? "Search Users"
                    : "Search Organization"
                }
                variant="primary"
                isLoading={isLoading}
                disabled={isLoading || searchValue.length < 1}
              />
            </div>
          </section>
        </form>
        {isSearched && (
          <div>
            {isLoading ? (
              <Skeleton active paragraph={{ rows: 6 }} />
            ) : (
              <div>
                {data.length > 0 ? (
                  <div>
                    <section className="pagination">
                      <div className="recordLimit">
                        <p>Show</p>
                        <select
                          aria-label="page record limit"
                          value={pageLimit}
                          onChange={(e) => {
                            handleSearch(
                              e,
                              searchValue,
                              1,
                              parseInt(e.target.value)
                            );
                            setPageLimit(parseInt(e.target.value));
                            setPage(1);
                          }}
                          name="limit"
                          id="limit"
                          disabled={!searchValue || !totalPages}
                        >
                          <option value={5}>5</option>
                          <option value={10}>10</option>
                          <option value={15}>15</option>
                          <option value={20}>20</option>
                          <option value={50}>50</option>
                          <option value={100}>100</option>
                        </select>
                        <p>records per page</p>
                      </div>
                      {totalPages && (
                        <div className="page">
                          Page {page} of {totalPages}
                        </div>
                      )}
                      <div className="navigation">
                        <Button
                          name={<CaretIcon variant="left" />}
                          ariaLabel="Previous button"
                          variant="secondary"
                          onClick={() => {
                            handleSearch(
                              null,
                              searchValue,
                              Number(page) - 1,
                              pageLimit
                            );
                            setPage(Number(page) - 1);
                          }}
                          disabled={page == 1 || !searchValue || !totalPages}
                        />
                        <Button
                          name={<CaretIcon variant="right" />}
                          ariaLabel="Next button"
                          variant="secondary"
                          onClick={() => {
                            handleSearch(
                              null,
                              searchValue,
                              Number(page) + 1,
                              pageLimit
                            );
                            setPage(Number(page) + 1);
                          }}
                          disabled={
                            page == totalPages || !searchValue || !totalPages
                          }
                        />
                      </div>
                    </section>
                    <section className="results">
                      {data.map((result: SearchResponse) => (
                        <SearchResultCard key={result.id} data={result} />
                      ))}
                    </section>
                  </div>
                ) : (
                  <section className="noResult">
                    <img
                      draggable={false}
                      src={background}
                      alt="background lines"
                    />
                    <div className="overlay">
                      <div>
                        <SearchIcon />
                      </div>
                      <p>No results found</p>
                    </div>
                  </section>
                )}
              </div>
            )}
          </div>
        )}
      </section>
    </main>
  );
};

export default App;
