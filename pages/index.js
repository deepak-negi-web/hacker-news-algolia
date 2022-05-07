import { SearchBar } from "../components";
import styles from "../styles/home.module.css";
export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <div className={styles.searchBarWrapper}>
        <SearchBar />
      </div>
    </div>
  );
}
