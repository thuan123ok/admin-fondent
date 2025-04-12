import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Footer from "./shared/components/Layout/footer";
import Header from "./shared/components/Layout/header";
import Sidebar from "./shared/components/Layout/sidebar";
import PrivateRoute from "./components/PrivateRoute";

import AddCategories from "./pages/AddCategories";
import Categories from "./pages/Categories";
import EditCategories from "./pages/EditCategories";
import Users from "./pages/Users";
import AddUsers from "./pages/AddUsers";
import EditUsers from "./pages/EditUsers";
import Products from "./pages/Products";
import AddProducts from "./pages/AddProducts";
import EditProducts from "./pages/EditProducts";

import Login from "./pages/Login";
import Admin from "./pages/AdminHome";

import { AuthProvider } from "./contexts/AuthContext";

const AppContent = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <>
      {!isLoginPage && <Header />}
      <div className="container-fluid">
        <div className="row">
          {!isLoginPage && <Sidebar />}
          <Routes>
            <Route path="/login" element={<Login />} />

            {/* Protected Routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Admin />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/categories/add" element={<AddCategories />} />
              <Route path="/categories/edit/:id" element={<EditCategories />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/add" element={<AddProducts />} />
              <Route path="/products/edit/:id" element={<EditProducts />} />
              <Route path="/users" element={<Users />} />
              <Route path="/users/add" element={<AddUsers />} />
              <Route path="/users/edit/:id" element={<EditUsers />} />
            </Route>
          </Routes>
        </div>
      </div>
      {!isLoginPage && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
