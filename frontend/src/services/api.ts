import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5258/api/", // base path for your .NET controllers
});