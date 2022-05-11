import React from "react";
import dynamic from "next/dynamic";
import Skeleton from "@mui/material/Skeleton";
import { Spinner } from "../Spinner";
import { useSearch } from "../../providers/searchStates";
import { fetchHackerNews } from "../../utils/fetchData";

const ListItem = dynamic(() =>
  import("../ListItem").then((mod) => mod.ListItem)
);
const Empty = dynamic(() => import("../Empty").then((mod) => mod.Empty));

import { Wrapper } from "./styled";
export const Home = () => {
  const { isLoading, posts, setClearSearch, setPosts } = useSearch();
  const [page, setPage] = React.useState(1);
  const [loaderRef] = useHookWithRefCallback(handleObserver);
  const [isLoadingMore, setIsLoadingMore] = React.useState(false);

  const fetchMoreNews = React.useCallback(async () => {
    setIsLoadingMore(true);
    if (page > 1) {
      const result = await fetchHackerNews(`/search?page=${page}`);
      if (result && result.hits) {
        const filteredPosts = result.hits.filter((post) => post.title);
        setPosts(posts.concat(filteredPosts));
      }
    }
    setIsLoadingMore(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // here we handle what happens when user scrolls to Load More movies
  // in this case we just update page variable
  function handleObserver(entities) {
    const target = entities[0];
    console.log("ourTarget", target);
    if (target.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  }

  React.useEffect(() => {
    (async () => {
      await fetchMoreNews();
    })();
  }, [fetchMoreNews]);

  if (isLoading) {
    return (
      <div className="skeletonWrap">
        {Array.from(Array(5).keys()).map((item) => (
          <>
            <Skeleton
              key={item}
              animation="wave"
              variant="rectangular"
              height={100}
              sx={{ borderRadius: "5px" }}
            />
            <br />
          </>
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return <Empty clearFilterHandler={() => setClearSearch((prev) => !prev)} />;
  }
  return (
    <Wrapper>
      <ul className="listWrap">
        {posts.map((post) => (
          <ListItem key={post.objectID} post={post} />
        ))}
      </ul>
      {/* Add Ref to Load More div  */}
      <Spinner ref={loaderRef} />
    </Wrapper>
  );
};

function useHookWithRefCallback(fn) {
  const ref = React.useRef(null);
  const setRef = React.useCallback((node) => {
    if (node) {
      var options = {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      };
      const observer = new IntersectionObserver(fn, options);
      if (node) {
        observer.observe(node);
      }
    }
    ref.current = node;
  }, []);

  return [setRef];
}
