import React from "react";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import moment from "moment";
import { Wrapper } from "./styled";

export const Comments = ({ post }) => {
  const filteredComments = post.children.filter((comment) => comment.author);
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
        style={{ color: "#000" }}
        dangerouslySetInnerHTML={{ __html: node.text }}
      />
      {Array.isArray(node.children)
        ? node.children.map((childNode) => renderTree(childNode))
        : null}
    </TreeItem>
  );
  // const treeViewComments = getTreeViewArray({
  //   dataset: post.children,
  //   rootIdKeyName: "id",
  //   parentIdKeyName: "parent_id",
  // });
  return (
    <Wrapper>
      <h2>Comments</h2>
      <TreeView
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{ flexGrow: 1, overflowY: "auto" }}
        defaultExpanded={filteredComments.map((comment) =>
          comment.id.toString()
        )}
      >
        {filteredComments.map((comment) => renderTree(comment))}
      </TreeView>
    </Wrapper>
  );
};
