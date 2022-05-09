import React from "react";
import LinkIcon from "@mui/icons-material/Link";
import moment from "moment";

import { StyledWrapper } from "./styled";

export const PostDetails = React.memo(function PostData({ post }) {
  return (
    <StyledWrapper>
      <div className="heading__title">
        <h1>{post.title}</h1>
        <a href={post.url} target="_blank" rel="noopener noreferrer">
          <LinkIcon fontSize="large" color="secondary" titleAccess={post.url} />
        </a>
      </div>
      <p>
        {post.points} points by {post.author} on{" "}
        {moment(post.created_at).format("MMMM Do, YYYY")} |{" "}
        {post.children.length} comments
      </p>
    </StyledWrapper>
  );
});
