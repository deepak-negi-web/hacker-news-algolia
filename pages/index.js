import { SearchBar, Home } from "../components";
import { SearchProvider } from "../providers/searchStates";
import styles from "../styles/Home.module.css";

export default function HomePage() {
  return (
    <SearchProvider>
      <div className={styles.container}>
        <div className={styles.searchBarWrapper}>
          <SearchBar />
        </div>
        <Home />
      </div>
    </SearchProvider>
  );
}
