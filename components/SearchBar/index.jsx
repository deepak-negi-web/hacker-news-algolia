import React from "react";
import TextField from "@mui/material/TextField";
import { useSearch } from "../../providers/searchStates";
import { fetchHackerNews } from "../../utils/fetchData";

export const SearchBar = () => {
  const { setPosts, setLoadingStatus, fetchPosts, clearSearch } = useSearch();
  const textFieldRef = React.useRef(null);
  // debounce function for limiting the api request
  const debounce = (fn, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };

  const getSearchResults = async (event) => {
    setLoadingStatus(true);
    const { value } = event.target;
    if (value) {
      const result = await fetchHackerNews(`/search?query=${value}`);
      if (result && result.hits) {
        const filteredPosts = result.hits.filter((post) => post.title);
        setPosts(filteredPosts);
      }
    }
    setLoadingStatus(false);
  };

  React.useEffect(() => {
    if (clearSearch) {
      textFieldRef.current.value = "";
    }
  }, [clearSearch]);

  return (
    <TextField
      inputRef={textFieldRef}
      id="outlined-search"
      label="Search stories"
      placeholder="Search stories by title,url or author"
      type="search"
      fullWidth
      onChange={debounce((e) => getSearchResults(e), 300)}
    />
  );
};
