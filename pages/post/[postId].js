import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { PostDetails, Comments, Spinner } from "../../components";
import { randomLoadingMessage } from "../../utils/getLoadingMessage";
import { fetchHackerNews } from "../../utils/fetchData";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import styles from "../../styles/Post.module.css";

const PostDetailPage = () => {
  const router = useRouter();
  const postId = router.query.postId;
  const [post, setPost] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [loadingMessage, setLoadingMessage] = React.useState("Loading...");

  React.useEffect(() => {
    setLoadingMessage(randomLoadingMessage);
  }, []);

  React.useEffect(() => {
    if (postId && !post) {
      (async () => {
        const data = await fetchHackerNews(`/items/${postId}`);
        setPost(data);
        setIsLoading(false);
      })();
    }
  }, [postId, post]);

  if (isLoading) {
    return (
      <div className="loading_mangify">
        <Spinner />
        <h3>{loadingMessage}</h3>
      </div>
    );
  }
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={`${post.title} by ${post.author}`} />
      </Head>
      <div className={styles.container}>
        <div className={styles.head} onClick={() => router.push("/")}>
          <ArrowBackIosNewOutlinedIcon />
          <p>Back</p>
        </div>

        <PostDetails post={post} />
        <Comments post={post} />
      </div>
    </>
  );
};

export default PostDetailPage;
