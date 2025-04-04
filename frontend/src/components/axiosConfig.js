import axios from "axios";

const isLocal = window.location.hostname === "localhost";

axios.defaults.baseURL = isLocal
  ? import.meta.env.VITE_API_URL_LOCAL
  : import.meta.env.VITE_API_URL_PROD;

  console.log("VITE_API_URL_LOCAL:", import.meta.env.VITE_API_URL_LOCAL);
    console.log("VITE_API_URL_PROD:", import.meta.env.VITE_API_URL_PROD);
console.log("isLocal:", isLocal);
export default axios;
