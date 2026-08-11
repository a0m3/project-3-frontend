import { Route, Routes } from "react-router";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import SignupPage from "./pages/SignupPage";
import Homepage from "./pages/Homepage";
import SignInPage from "./pages/SigninPage";
import Dashboard from "./pages/Dashboard";

import ProfilePage from "./pages/ProfilePage"
import RegularGamePage from "./pages/game/RegularGamePage";
import CustomGamePlayPage from "./pages/game/CustomGamePlayPage";
import CustomGamesList from "./pages/customGames/CustomGamesList";
import CreateCustomGame from "./pages/customGames/CreateCustomGame";
import CustomGameDetails from "./pages/customGames/CustomGameDetails";
import EditCustomGame from "./pages/customGames/EditCustomGame";
import GameHistoryPage from "./pages/history/GameHistoryPage";
import AdminQuestionsList from "./pages/admin/AdminQuestionsList";
import AdminQuestionForm from "./pages/admin/AdminQuestionForm";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

        <Route path="/play/regular" element={<ProtectedRoute><RegularGamePage /></ProtectedRoute>} />

        <Route path="/custom-games" element={<ProtectedRoute><CustomGamesList /></ProtectedRoute>} />
        <Route path="/custom-games/new" element={<ProtectedRoute><CreateCustomGame /></ProtectedRoute>} />
        <Route path="/custom-games/:id" element={<ProtectedRoute><CustomGameDetails /></ProtectedRoute>} />
        <Route path="/custom-games/:id/edit" element={<ProtectedRoute><EditCustomGame /></ProtectedRoute>} />
        <Route path="/custom-games/:id/play" element={<ProtectedRoute><CustomGamePlayPage /></ProtectedRoute>} />

        <Route path="/history" element={<ProtectedRoute><GameHistoryPage /></ProtectedRoute>} />

        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />

        <Route path="/admin/questions" element={<AdminRoute><AdminQuestionsList /></AdminRoute>} />
        <Route path="/admin/questions/new" element={<AdminRoute><AdminQuestionForm /></AdminRoute>} />
        <Route path="/admin/questions/:id/edit" element={<AdminRoute><AdminQuestionForm /></AdminRoute>} />

      </Routes>
    </div>
  );
}

export default App;
