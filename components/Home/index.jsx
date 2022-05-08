import React from "react";
import { ListItem } from "../ListItem";
import { useSearch } from "../../providers/searchStates";
export const Home = () => {
  const { isLoading, posts } = useSearch();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <ul>
        {posts.map((post) => (
          <ListItem key={post.objectID} post={post} />
        ))}
      </ul>
    </div>
  );
};
