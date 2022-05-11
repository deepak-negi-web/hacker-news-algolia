import React from "react";
import { fetchHackerNews } from "../utils/fetchData";

const SearchContext = React.createContext();

const initialState = {
  posts: [],
  isLoading: false,
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "SET_POSTS":
      return {
        ...state,
        posts: payload,
      };
    case "SET_LOADING_STATUS":
      return {
        ...state,
        isLoading: payload,
      };
    default:
      return state;
  }
};

export const SearchProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const [clearSearch, setClearSearch] = React.useState(false);
  const setPosts = (posts) => {
    dispatch({ type: "SET_POSTS", payload: posts });
  };

  const setLoadingStatus = (status) => {
    dispatch({ type: "SET_LOADING_STATUS", payload: status });
  };

  React.useEffect(() => {
    if (state.posts.length === 0 || clearSearch) {
      (async () => {
        setLoadingStatus(true);
        const result = await fetchHackerNews("/search?page=1");
        if (result && result.hits) {
          const filteredPosts = result.hits.filter((post) => post.title);
          setPosts(filteredPosts);
        }
        setLoadingStatus(false);
        setClearSearch(false);
      })();
    }
  }, [clearSearch]);

  return (
    <SearchContext.Provider
      value={{
        posts: state.posts,
        isLoading: state.isLoading,
        setPosts,
        setLoadingStatus,
        setClearSearch,
        clearSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => React.useContext(SearchContext);
