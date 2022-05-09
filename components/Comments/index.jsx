import React from "react";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import moment from "moment";
import { Wrapper } from "./styled";

export const Comments = React.memo(function CommentsComp({ post }) {
  const filteredComments = post.children.filter((comment) => comment.author);
  const flattenArray = (arr = []) => {
    return arr.reduce(
      (result, item) => [
        ...result,
        item.id.toString(),
        ...flattenArray(item.children),
      ],
      []
    );
  };
  const renderTree = (node) => (
    <TreeItem
      key={node.id}
      nodeId={node.id.toString()}
      label={`${node.author} on ${moment(post.created_at).format(
        "MMMM Do, YYYY"
      )}`}
      sx={{
        color: "#828282",
      }}
    >
      <div
        className="comment_text"
        dangerouslySetInnerHTML={{ __html: node.text }}
      />
      {Array.isArray(node.children)
        ? node.children.map((childNode) => renderTree(childNode))
        : null}
    </TreeItem>
  );

  return (
    <Wrapper>
      <h2>Comments</h2>
      <div className="comment_wrapper">
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          sx={{ overflowY: "auto" }}
          defaultExpanded={flattenArray(filteredComments)}
        >
          {filteredComments.map((comment) => renderTree(comment))}
        </TreeView>
      </div>
    </Wrapper>
  );
});
