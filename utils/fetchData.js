export const fetchHackerNews = async (param) => {
  try {
    const hackerNewsAPI = process.env.NEXT_PUBLIC_HN_ALGOLIA_API;
    const url = `${hackerNewsAPI}${param}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error while searching", error);
    return error;
  }
};
