import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 0 16px;
  .MuiTreeItem-content.Mui-selected,
  .MuiTreeItem-content MuiTreeItem-content Mui-selected {
    background-color: #f5f5f5;
    &:hover {
      background-color: #f5f5f5;
    }
  }
  .MuiTreeItem-root {
    margin: 8px 0;
  }
  .comment_wrapper {
    background: #f2f2f2;
    height: 380px;
    overflow-y: auto;
  }
  .comment_text {
    color: #000;
    padding-left: 8px;
    p {
      padding: 0;
      margin: 0;
    }
  }
  .no_comments {
    padding: 16px;
  }
`;
