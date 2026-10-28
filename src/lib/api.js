import axios from "axios";
import { API_URL } from "./config";
import { clearToken, getToken } from "./session";
import { toast } from "@/components/ui/toast/toast";

// One client for every API call. The token is read as each request goes out, so a call made
// right after signing in (or out) sends the current one.
const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use((config) => {
  const token = getToken();
  // A call can pass its own token (logout does, because it clears the stored one at once).
  if (token && !config.headers.has("x-access-token")) {
    config.headers.set("x-access-token", token);
  }
  return config;
});

// What the API's auth middleware answers when a session is over: the token expired or was
// revoked (logout elsewhere, a password reset, an admin switching the account off), or the
// user is gone. Revoked sessions come back as 400 and missing users as 404, so the message,
// not just the status, tells them apart from ordinary errors.
const SESSION_ENDED = new Set(["Please authenticate", "Invalid Token", "Token Not Found", "User Not Found"]);

api.interceptors.response.use(undefined, (error) => {
  if (SESSION_ENDED.has(error.response?.data?.message) && getToken()) {
    clearToken();
    toast.info("Your session has ended. Sign in again to continue.");
  }
  return Promise.reject(error);
});

// The API's own message for a failed request, if it sent one.
export const errorMessage = (error, fallback) => error?.response?.data?.message || fallback;

// ************ Sign-in and passwords ************
export const UserLoginAPI = (email, password) => api.post("/auth/login", { email, password });

// Sends this session's token explicitly: the caller forgets it locally straight away.
export const UserLogOutAPI = (token) =>
  api.post("/auth/logout", {}, { headers: { "x-access-token": token } });

export const ForgetSendOTPAPI = (email) => api.post("/auth/otp", { email, type: "forget_password" });

// The code goes as typed, a string, so leading zeros survive.
export const ForgotPassword = (email, otp, password, confirmPassword) =>
  api.post("/auth/forgot-password", { email, otp, password, confirm_password: confirmPassword });

// Change the password while signed in. This session stays signed in; others are signed out.
export const ChangePasswordAPI = (oldPassword, newPassword, confirmPassword) =>
  api.post("/auth/reset-password", {
    old_password: oldPassword,
    new_password: newPassword,
    confirm_password: confirmPassword,
  });

// ************ Profile ************
// Returns the response body: { data: { name, email, attachements, access: { plan, trial_ends_at, … } } }
export const GetProfile = async () => (await api.get("/user/profile")).data;

export const UserEditProfileAPI = (name, image) => {
  const form = new FormData();
  form.append("name", name);
  if (image) form.append("images", image);
  return api.put("/user/updateProfile", form);
};

// ************ Stories ************
// Returns the response body: { data: [category] }
export const AllCategoryAPI = async () => (await api.get("/category/all")).data;

// "all" lists every story. Rows a free account can't open come back with is_locked and a teaser.
export const BlogByCategoryApi = (categorySlug, limit, page) =>
  api.post(`/user/get-blog-from-category?limit=${limit}&page=${page}`, { category_slug: categorySlug });

// Returns the response body: { data: story }. A 404 means there is no such story.
export const GetStoryApi = async (id) => (await api.get(`/blog/${encodeURIComponent(id)}`)).data;

// Counts one view per reader. Locked stories refuse it, so callers skip those.
export const ViewCountBlog = (blogId) =>
  api.post(`/user/markBlogAsViewed?blog_id=${blogId}`).catch((error) => {
    console.error("Couldn't count the view:", error);
  });

export const LikeApi = (blogId) => api.post("/blog/like", { blog_id: blogId });

// Returns the response body: { data: { total_likes, is_like } }
export const LikeCountApi = async (blogId) => (await api.get(`/blog/getLikesCount?blog_id=${blogId}`)).data;

export const AddCommentApi = (comment, blogId) => api.post("/blog/comment", { comment, blog_id: blogId });

// Returns the response body: { data: [comment] }
export const GetComment = async (blogId) => (await api.get(`/blog/getAllCommentByBlogId?blog_id=${blogId}`)).data;

// ************ AI stories ************
// Generates a story from a prompt. The reply's data.id identifies it when saving.
export const AipromtApi = (input) => api.post("/story", { input });

// The API toggles: saving a saved story removes it, so call this once per story.
// description is the version on screen; the API currently saves the story as generated.
export const SaveStoryApi = (storyId, title, description) =>
  api.put("/story", { story_id: storyId, title, description });

// Short and long versions of a story.
export const SortStoryApi = (input, description) =>
  api.post("/story/sort", { input, title: input, description });

// Returns the response body: { data: [story] } with the user's saved stories.
export const GetSavedStoriesApi = async () => (await api.get("/story")).data;

// Returns the response body: { data: story } for one saved story. A 404 means it isn't saved.
export const GetSavedStoryApi = async (id) => (await api.get(`/story/${encodeURIComponent(id)}`)).data;
