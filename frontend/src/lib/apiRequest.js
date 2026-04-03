import axios from "axios";

const apiRequest = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8800/api",
  withCredentials: true,
});

// Fetch a CSRF token from the server before any state-mutating request
apiRequest.interceptors.request.use(async (config) => {
  const mutatingMethods = ["post", "put", "patch", "delete"];
  if (mutatingMethods.includes(config.method?.toLowerCase())) {
    try {
      const { data } = await axios.get(
        `${config.baseURL?.replace("/api", "") || "http://localhost:8800"}/api/csrf-token`,
        { withCredentials: true }
      );
      config.headers["x-csrf-token"] = data.csrfToken;
    } catch {
      // If the CSRF endpoint is unreachable, proceed without the token
      // (the server will reject the request)
    }
  }
  return config;
});

export default apiRequest;
