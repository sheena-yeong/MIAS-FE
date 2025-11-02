import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import SideBar from '../components/NavBars/SideBar.jsx';
import TopNavBar from '../components/NavBars/TopNavBar.jsx';
import Dashboard from '../pages/Dashboard.jsx';
import AssetManagement from '../pages/AssetManagement.jsx';
import UserManagement from '../pages/UserManagement.jsx';
import Settings from '../pages/Settings.jsx';
import Transactions from '../pages/Transactions.jsx';
import SignIn from '../components/Login/SignIn.jsx';
import SignUp from '../components/Login/SignUp.jsx';
import ProtectedRoute from '../components/Routes/ProtectedRoute.jsx';
import RoleProtectedRoute from '../components/Routes/RoleProtectedRoute.jsx';
import { getAllAssets } from '../services/asset.js';

function App() {
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);
  const [assetData, setAssetData] = useState([]);
  const { isAuthenticated, loading, tokens } = useAuth();

  async function fetchAssets() {
    try {
      const data = await getAllAssets(tokens.access);
      if (data) setAssetData(data);
    } catch (error) {
      console.log('Error fetching asset data from BE:', error);
    }
  }

  useEffect(() => {
    if (isAuthenticated) fetchAssets();
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
                  />
                  <main className="flex-1 overflow-auto bg-gray-50 p-6">
                    <Routes>
                      {/* Admin-only Access */}
                      <Route
                        path="/users"
                        element={
                          <RoleProtectedRoute allowedRoles={['Admin']}>
                            <UserManagement />
                          </RoleProtectedRoute>
                        }
                      />

                      {/* Editor and Viewer Access */}
                      <Route path="/" element={<Dashboard />} />
                      <Route
                        path="/assets"
                        element={
                          <AssetManagement
                            assetData={assetData}
                            fetchAssets={fetchAssets}
                          />
                        }
                      />

                      <Route path="/transactions" element={<Transactions />} />
                      <Route path="/settings" element={<Settings />} />
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
