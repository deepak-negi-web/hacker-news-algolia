import React from "react";
import { ListItem } from "../ListItem";
import { Empty } from "../Empty";
import { Spinner } from "../Spinner";
import { useSearch } from "../../providers/searchStates";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

import { Wrapper } from "./styled";
export const Home = () => {
  const {
    isLoading,
    posts,
    setClearSearch,
    setPosts,
    setLoadingStatus,
    fetchPosts,
  } = useSearch();
  const [page, setPage] = React.useState(1);
  const [loaderRef] = useHookWithRefCallback(handleObserver);
  const [isLoadingMore, setIsLoadingMore] = React.useState(false);

  const getSearchResults = async () => {
    setIsLoadingMore(true);
    if (page > 1) {
      const result = await fetchPosts(
        `https://hn.algolia.com/api/v1/search?page=${page}`
      );
      if (result && result.hits) {
        const filteredPosts = result.hits.filter((post) => post.title);
        setPosts(posts.concat(filteredPosts));
      }
    }
    setIsLoadingMore(false);
  };

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
      await getSearchResults();
    })();
  }, [page]);

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
