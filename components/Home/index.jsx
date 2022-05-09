import React from "react";
import { ListItem } from "../ListItem";
import { Empty } from "../Empty";
import { useSearch } from "../../providers/searchStates";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

import { Wrapper } from "./styled";
export const Home = () => {
  const { isLoading, posts, setClearSearch } = useSearch();

  if (isLoading) {
    return (
      <Stack spacing={2} sx={{ padding: "16px" }}>
        {Array.from(Array(5).keys()).map((item) => (
          <Skeleton
            key={item}
            animation="wave"
            variant="rectangular"
            height={100}
            sx={{ borderRadius: "5px" }}
          />
        ))}
      </Stack>
    );
  }

  if (posts.length === 0) {
    return <Empty clearFilterHandler={() => setClearSearch(true)} />;
  }
  return (
    <Wrapper>
      <ul>
        {posts.map((post) => (
          <ListItem key={post.objectID} post={post} />
        ))}
      </ul>
    </Wrapper>
  );
};
