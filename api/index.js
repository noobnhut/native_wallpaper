const API_KEY = "43079015-74414a12b338061366184c92d";
const API_URL = `https://pixabay.com/api/?key=${API_KEY}`;
import axios from "axios";
const formatUrl = (params) => {
  // q.page,category,order

  let url = API_URL + "&per_page=25&safesearch=true&editors_choice=true";
  if (!params) return url;

  let paramsKey = Object.keys(params);
  paramsKey.map((key) => {
    let value = key == "q" ? encodeURIComponent(params[key]) : params[key];
    url += `&${key}=${value}`;
  });
  console.log(url);
  return url;
};
export const apiCall = async (params) => {
  try {
    const response = await axios.get(formatUrl(params));
    const { data } = response;
    return { success: true, data };
  } catch (error) {
    console.log(error);
    return { success: false, msg: error.message };
  }
};
