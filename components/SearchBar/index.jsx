import React from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";

import { StyledWrapper } from "./styled";
export const SearchBar = () => {
  const [posts, setPosts] = React.useState([]);
  const [isLoadingSearchResult, setIsLoadingSearchResult] =
    React.useState(false);

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
    try {
      const {
        target: { value },
        keyCode,
      } = event;

      // exclude alt/ctrl/shift/arrow keys for unnecessary request call
      if (value && ![16, 17, 18, 37, 38, 39, 40].includes(keyCode)) {
        setIsLoadingSearchResult(true);
        const response = await fetch(
          `https://hn.algolia.com/api/v1/search?query=${value}`
        );
        const data = await response.json();
        console.log("dataResponse", data);
        setIsLoadingSearchResult(false);
        setPosts(data.hits.splice(0, 10));
      }
    } catch (error) {
      setIsLoadingSearchResult(false);
      setPosts([]);
      console.log("Error while searching", error);
    }
  };

  return (
    <Stack spacing={2} sx={{ width: "60%" }}>
      <Autocomplete
        freeSolo
        id="search-news"
        disableClearable
        options={posts.map((post) => post.title)}
        getOptionLabel={(option) => option.label ?? option}
        onKeyUp={debounce((e) => getSearchResults(e), 300)}
        loading={isLoadingSearchResult}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search News"
            InputProps={{
              ...params.InputProps,
              type: "search",
            }}
          />
        )}
      />
    </Stack>
  );
};
