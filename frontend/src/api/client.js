const base = import.meta.env.VITE_API_URL?.trim() || "/api";

function getToken() {
  return localStorage.getItem("token");
}

async function request(path, options = {}) {
  const headers = { ...options.headers };
  if (options.body && typeof options.body === "object" && !(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }
  const token = getToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const res = await fetch(`${base}${path}`, {
    ...options,
    headers,
    body:
      options.body && typeof options.body === "object" && !(options.body instanceof FormData)
        ? JSON.stringify(options.body)
        : options.body
  });
  if (res.status === 204) {
    return null;
  }
  const text = await res.text();
  let data = null;
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = { error: text };
    }
  }
  if (!res.ok) {
    const err = new Error(data?.error || `HTTP ${res.status}`);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

export const api = {
  getGames: () => request("/games"),
  getReviews: () => request("/reviews"),
  register: (email, password) =>
    request("/auth/register", { method: "POST", body: { email, password } }),
  login: (email, password) => request("/auth/login", { method: "POST", body: { email, password } }),
  me: () => request("/auth/me"),
  myReviews: () => request("/me/reviews"),
  createReview: (payload) => request("/reviews", { method: "POST", body: payload }),
  updateReview: (id, payload) => request(`/reviews/${id}`, { method: "PATCH", body: payload }),
  deleteReview: (id) => request(`/reviews/${id}`, { method: "DELETE" }),
  adminStats: () => request("/admin/stats")
};
