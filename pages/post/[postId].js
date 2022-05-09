import React from "react";
import { useRouter } from "next/router";
import { PostDetails, Comments, Spinner } from "../../components";
import { randomLoadingMessage } from "../../utils/getLoadingMessage";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import styles from "../../styles/post.module.css";

const PostDetailPage = () => {
  const router = useRouter();
  const postId = router.query.postId;
  const [post, setPost] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  const fetchPostDetails = React.useCallback(async () => {
    const response = await fetch(
      `https://hn.algolia.com/api/v1/items/${postId}`
    );
    const data = await response.json();
    return data;
  }, [postId]);

  React.useEffect(() => {
    if (!post) {
      fetchPostDetails()
        .then((data) => {
          setPost(data);
          setIsLoading(false);
        })
        .catch(() => setIsLoading(false));
    }
  }, []);

  if (isLoading) {
    return (
      <div className="loading_mangify">
        <Spinner />
        <h3>{randomLoadingMessage}</h3>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <div className={styles.head} onClick={() => router.push("/")}>
        <ArrowBackIosNewOutlinedIcon />
        <p>Back</p>
      </div>
      <PostDetails loading={isLoading} post={post} />
      <Comments post={post} />
    </div>
  );
};

export default PostDetailPage;
