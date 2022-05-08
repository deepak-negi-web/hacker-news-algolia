import React from "react";
import { useRouter } from "next/router";
import { PostDetails, Comments } from "../../components";
const PostDetailPage = () => {
  const router = useRouter();
  const postIds = router.query.postId || [];
  const [post, setPost] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState({});
  React.useEffect(() => {
    if (postIds.length > 0 && !post) {
      (async () => {
        const response = await fetch(
          `https://hn.algolia.com/api/v1/items/${postIds[0]}`
        );
        const data = await response.json();
        console.log("data", data);
        setPost(data);
      })();
    }
  }, [postIds]);

  React.useEffect(() => {
    if (post) {
      setIsLoading(false);
    }
  }, [post]);

  if (isLoading || postIds.length === 0) {
    return <div>Loading...</div>;
  }
  return (
    <div style={{ padding: "1rem" }}>
      <PostDetails post={post} />
      <Comments post={post} />
    </div>
  );
};

export default PostDetailPage;
