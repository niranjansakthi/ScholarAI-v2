import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000";

// Create an Axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Request Interceptor: Attach token if available
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response Interceptor: Handle 401 Unauthorized globally
apiClient.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response && error.response.status === 401) {
    // Dispatch a custom event so the AuthContext can pick it up and log out
    window.dispatchEvent(new Event("auth:unauthorized"));
  }
  return Promise.reject(error);
});


// ── Authentication ────────────────────────────────────────────────
export async function signup(username, email, password) {
  const response = await apiClient.post("/auth/signup", { username, email, password });
  return response.data;
}

export async function login(username, password) {
  // FastAPI OAuth2PasswordRequestForm requires form data
  const formData = new URLSearchParams();
  formData.append("username", username); // For OAuth2, email is usually passed as username
  formData.append("password", password);
  
  const response = await apiClient.post("/auth/login", formData, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
  return response.data;
}

// ── Chat ──────────────────────────────────────────────────────
export async function sendChat(question, chat_id = null) {
  const response = await apiClient.post("/chat/", { question, chat_id });
  return response.data; // { answer, chat_id }
}

export async function getUserChats() {
  const response = await apiClient.get("/chat/");
  return response.data.chats; // [{ id, title, created_at, updated_at }]
}

export async function getChatHistory(chat_id) {
  const response = await apiClient.get(`/chat/${chat_id}/history`);
  return response.data.messages; // [{ id, chat_id, role, content, timestamp }]
}

// ── Upload ────────────────────────────────────────────────────
export async function uploadPDF(file) {
  const formData = new FormData();
  formData.append("file", file);
  const response = await apiClient.post("/upload/pdf", formData);
  return response.data;
}

export async function uploadHandwritten(file) {
  const formData = new FormData();
  formData.append("file", file);
  const response = await apiClient.post("/upload/handwritten", formData);
  return response.data;
}

export async function uploadYoutube(url) {
  const response = await apiClient.post("/upload/youtube", { url });
  return response.data;
}

// ── Flashcards ────────────────────────────────────────────────
export async function generateFlashcards(topic) {
  const response = await apiClient.post("/flashcards/", { topic });
  return response.data.flashcards; // [{question, answer}]
}

// ── Quiz ──────────────────────────────────────────────────────
export async function generateQuiz(topic, number_of_questions = 10) {
  const response = await apiClient.post("/Quiz/", { topic, number_of_questions });
  return response.data.quizzes; // [{question, options[], answer}]
}

// ── Summary ───────────────────────────────────────────────────
export async function generateSummary(topic) {
  const response = await apiClient.post("/summary/", { topic });
  return response.data.summary; // string
}

// ── Key Points ────────────────────────────────────────────────
export async function generateKeyPoints(topic) {
  const response = await apiClient.post("/keypoints/", { topic });
  return response.data.keypoints; // string
}

export default apiClient;
