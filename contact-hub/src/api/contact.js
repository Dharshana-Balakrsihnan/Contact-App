import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3006/", // Backend running on port 3006
});