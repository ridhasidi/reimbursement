import { Route, Routes } from "react-router-dom";
import "./App.css";
import CreateReimbursement from "./components/CreateReimbursement";
import EditProfileForm from "./components/EditProfileForm";
import ProtectedRoute from "./components/ProtectedRoute";
import Receipt from "./components/Receipt";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        >
          <Route path="profile" element={<EditProfileForm />} />
          <Route path="create-new" element={<CreateReimbursement />} />
          <Route path="receipt/:id" element={<Receipt />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
