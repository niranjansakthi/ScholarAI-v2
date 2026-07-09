import { BrowserRouter, Routes, Route } from "react-router-dom";

import { DocumentProvider } from "./context/DocumentContext";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/common/ProtectedRoute/ProtectedRoute";

import MainLayout from "./layout/MainLayout/MainLayout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Chat from "./pages/Chat/Chat";
import Upload from "./pages/Upload/Upload";
import Flashcards from "./pages/Flashcards/Flashcards";
import Quiz from "./pages/Quiz/Quiz";
import Summary from "./pages/Summary/Summary";
import KeyPoints from "./pages/KeyPoints/KeyPoints";

import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";

function App() {
  return (
    <AuthProvider>
      <DocumentProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route element={<MainLayout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/upload" element={<Upload />} />
                <Route path="/flashcards" element={<Flashcards />} />
                <Route path="/quiz" element={<Quiz />} />
                <Route path="/summary" element={<Summary />} />
                <Route path="/keypoints" element={<KeyPoints />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </DocumentProvider>
    </AuthProvider>
  );
}

export default App;