import { Header, ScrollToTop } from "../components";
import "../styles/globals.css";
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <ScrollToTop showBelow={250} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
