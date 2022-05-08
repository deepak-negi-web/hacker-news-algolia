import React from "react";
import moment from "moment";
import { useRouter } from "next/router";

import { StyledWrapper } from "./styled";
export const ListItem = ({ post }) => {
  const router = useRouter();
  return (
    <StyledWrapper>
      <h3
        className="post__title"
        onClick={() => router.push(`/post/${post.objectID}`)}
      >
        {post.title} ({post.url})
      </h3>
      <p>
        {post.points} points | {post.author} |{" "}
        {moment(post.created_at).fromNow()} | {post.num_comments} comments
      </p>
    </StyledWrapper>
  );
};
