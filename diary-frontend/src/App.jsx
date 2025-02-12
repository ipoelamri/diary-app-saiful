import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import DiaryList from "./pages/DiaryList";
import DiaryForm from "./pages/DiaryForm";
import DiaryDetail from "./pages/DiaryDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ZipCodeSearch from "./pages/ZipCodeSearch"; // Import halaman pencarian kode pos

function App() {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/zipcode" element={<ZipCodeSearch />} />{" "}
        {/* Tambahkan routing kode pos */}
        {isAuthenticated ? (
          <>
            <Route path="/diaries" element={<DiaryList />} />
            <Route path="/diary/add" element={<DiaryForm />} />
            <Route path="/diary/edit/:id" element={<DiaryForm />} />
            <Route path="/diary/:id" element={<DiaryDetail />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </>
  );
}

export default App;
