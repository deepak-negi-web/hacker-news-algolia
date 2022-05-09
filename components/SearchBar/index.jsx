import React from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { StyledWrapper } from "./styled";
import { useSearch } from "../../providers/searchStates";

export const SearchBar = () => {
  const { setPosts, setLoadingStatus, fetchPosts } = useSearch();
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
      const result = await fetchPosts(
        `https://hn.algolia.com/api/v1/search?query=${value}`
      );
      if (result && result.hits) {
        const filteredPosts = result.hits.filter((post) => post.title);
        setPosts(filteredPosts);
      }
    }
    setLoadingStatus(false);
  };

  return (
    <Stack spacing={2} sx={{ width: "60%" }}>
      <TextField
        ref={textFieldRef}
        id="outlined-search"
        label="Search stories"
        placeholder="Search stories by title,url or author"
        type="search"
        onChange={debounce((e) => getSearchResults(e), 300)}
      />
    </Stack>
  );
};
