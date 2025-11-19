import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "./context/AuthContext.jsx";
import SideBar from "./components/NavBars/SideBar.jsx";
import TopNavBar from "./components/NavBars/TopNavBar.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import InvoiceManagement from "./pages/InvoiceManagement.jsx";
import AssetManagement from "./pages/AssetManagement.jsx";
import AssociateDirectory from "./pages/AssociateDirectory.jsx";
import UserManagement from "./pages/UserManagement.jsx";
import Settings from "./pages/Settings.jsx";
import AssetTransactions from "./pages/AssetTransactions.jsx";
import SignIn from "./components/Login/SignIn.jsx";
import SignUp from "./components/Login/SignUp.jsx";
import ProtectedRoute from "./components/Routes/ProtectedRoute.jsx";
import RoleProtectedRoute from "./components/Routes/RoleProtectedRoute.jsx";
import { getAllAssets } from "./services/asset.js";
import { getAllInvoices } from "./services/invoice.js";
import { getAllTransactions } from "./services/transaction.js";
import { getAllUsers } from "./services/user.js";
import { getAllAssociates } from "./services/associate.js";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import MyAsset from "./pages/MyAssets.jsx";

function App() {
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [assetData, setAssetData] = useState([]);
  const [invoiceData, setInvoiceData] = useState([]);
  const [transactionData, setTransactionData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [associateData, setAssociateData] = useState([]);
  const { isAuthenticated, loading, tokens } = useAuth();

  const location = useLocation();
  const showSearch = location.pathname !== '/' &&  location.pathname !== '/myassets' && location.pathname !== '/settings';

  async function fetchAssets() {
    try {
      const data = await getAllAssets(tokens.access);
      console.log(data);
      if (data) setAssetData(data);
    } catch (error) {
      console.log("Error fetching asset data from BE:", error);
    }
  }

  async function fetchInvoices() {
    try {
      const data = await getAllInvoices(tokens.access);
      console.log(data);
      if (data) setInvoiceData(data);
    } catch (error) {
      console.log("Error fetching invoice data from BE:", error);
    }
  }

  async function fetchTransactions() {
    try {
      const data = await getAllTransactions(tokens.access);
      console.log(data);
      if (data) setTransactionData(data);
    } catch (error) {
      console.log("Error fetching transaction data from BE:", error);
    }
  }

  async function fetchUsers() {
    try {
      const data = await getAllUsers(tokens.access);
      console.log(data);
      if (data) setUserData(data);
    } catch (error) {
      console.log("Error fetching users data from BE:", error);
    }
  }

  async function fetchAssociates() {
    try {
      const data = await getAllAssociates(tokens.access);
      console.log(data);
      if (data) setAssociateData(data);
    } catch (error) {
      console.log("Error fetching associates data from BE:", error);
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchAssets();
      fetchInvoices();
      fetchTransactions();
      fetchUsers();
      fetchAssociates();
    }
  }, [isAuthenticated]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route
          path="/signin"
          element={isAuthenticated ? <Navigate to="/" replace /> : <SignIn />}
        />
        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />  
        <Route
          path="/reset-password"
          element={<ResetPassword />}
        />      
        <Route
          path="/signup"
          element={isAuthenticated ? <Navigate to="/" replace /> : <SignUp />}
        />

        {/* Protected routes */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <div className="flex h-screen">
                <div className="flex bg-[#1d1d1d] text-white flex-col justify-between transition-all duration-200">
                  <SideBar isMenuCollapsed={isMenuCollapsed} />
                </div>

                <div className="flex-1 flex flex-col overflow-hidden">
                  <TopNavBar
                    setIsMenuCollapsed={setIsMenuCollapsed}
                    isMenuCollapsed={isMenuCollapsed}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    showSearch={showSearch}
                  />
                  <main className="flex-1 overflow-auto bg-gray-50 p-6">
                    <Routes>
                      {/* Admin-only Access */}
                      <Route
                        path="/users"
                        element={
                          <RoleProtectedRoute allowedRoles={["Admin"]}>
                            <UserManagement 
                              userData={userData}
                              fetchUsers={fetchUsers}
                            />
                          </RoleProtectedRoute>
                        }
                      />

                      {/* Admin and Editor Access */}
                      <Route
                        path="/"
                        element={
                        <RoleProtectedRoute allowedRoles={["Admin", "Editor"]}>
                          <Dashboard assetData={assetData}/>
                          </RoleProtectedRoute>
                        }
                      />
                      <Route
                        path="/assets"
                        element={
                          <AssetManagement
                            assetData={assetData}
                            fetchAssets={fetchAssets}
                            fetchTransactions={fetchTransactions}
                            invoiceData={invoiceData}
                            associateData={associateData}
                            searchQuery={searchQuery}
                          />
                        }
                      />
                      <Route
                        path="/associates"
                        element={
                          <AssociateDirectory 
                            associateData={associateData}
                            fetchAssociates={fetchAssociates}  
                          />
                        }
                      />
                      <Route
                        path="/invoices"
                        element={
                          <InvoiceManagement
                            invoiceData={invoiceData}
                            fetchInvoices={fetchInvoices}
                          />
                        }
                      />
                      <Route
                        path="/transactions"
                        element={
                          <AssetTransactions transactionData={transactionData} />
                        }
                      />
                      {/* Viewer Access */}
                      <Route
                        path="/myassets"
                        element={
                          <MyAsset
                            assetData={assetData}
                            fetchAssets={fetchAssets}                         
                            showSearch={showSearch}
                          />
                        }
                      />                      
                      <Route path="/settings" element={<Settings showSearch={showSearch} />} />
                      <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                  </main>
                </div>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
