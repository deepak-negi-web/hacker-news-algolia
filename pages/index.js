import dynamic from "next/dynamic";
import Head from "next/head";
import { SearchProvider } from "../providers/searchStates";
import styles from "../styles/Home.module.css";
const SearchBar = dynamic(() =>
  import("../components/SearchBar").then((mod) => mod.SearchBar)
);
const Home = dynamic(() =>
  import("../components/Home").then((mod) => mod.Home)
);

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Hacker News</title>
        <meta
          name="description"
          content="Hacker News shows you the list of news with `infinte scrolling`, a search bar to search any news story & a detail page of the news."
        />
      </Head>
      <SearchProvider>
        <div className={styles.container}>
          <div className={styles.searchBarWrapper}>
            <SearchBar />
          </div>
          <Home />
        </div>
      </SearchProvider>
    </>
  );
}
