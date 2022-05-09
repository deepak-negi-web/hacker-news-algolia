import React from "react";
import moment from "moment";
import { useRouter } from "next/router";
import Typography from "@mui/material/Typography";

import { StyledWrapper } from "./styled";
export const ListItem = ({ post }) => {
  const router = useRouter();
  return (
    <StyledWrapper>
      <Typography
        noWrap
        variant="h3"
        className="post__title"
        onClick={() => router.push(`/post/${post.objectID}`)}
      >
        {post.title} ({post.url})
      </Typography>
      <p>
        {post.points} points | {post.author} |{" "}
        {moment(post.created_at).fromNow()} | {post.num_comments} comments
      </p>
    </StyledWrapper>
  );
};
