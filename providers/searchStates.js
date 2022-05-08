import { getURL } from "next/dist/shared/lib/utils";
import React from "react";

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
  const setPosts = (posts) => {
    dispatch({ type: "SET_POSTS", payload: posts });
  };

  const setLoadingStatus = (status) => {
    dispatch({ type: "SET_LOADING_STATUS", payload: status });
  };

  const fetchPosts = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("Error while searching", error);
      return error;
    }
  };

  React.useEffect(() => {
    if (state.posts.length === 0) {
      (async () => {
        setLoadingStatus(true);
        const result = await fetchPosts("https://hn.algolia.com/api/v1/search");
        if (result && result.hits) {
          const filteredPosts = result.hits.filter((post) => post.title);
          setPosts(filteredPosts);
        }
        setLoadingStatus(false);
      })();
    }
  }, []);

  return (
    <SearchContext.Provider
      value={{
        posts: state.posts,
        isLoading: state.isLoading,
        setPosts,
        setLoadingStatus,
        fetchPosts,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => React.useContext(SearchContext);
