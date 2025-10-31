import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SideBar from '../components/SideBar.jsx';
import TopNavBar from '../components/TopNavBar.jsx';
import Dashboard from '../pages/Dashboard.jsx';
import AssetManagement from '../pages/AssetManagement.jsx';
import UserManagement from '../pages/UserManagement.jsx';
import Settings from '../pages/Settings.jsx';
import Transactions from '../pages/Transactions.jsx';
import { getAllAssets } from '../services/asset.js';

function App() {
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);
  const [assetData, setAssetData] = useState([]);

  async function fetchAssets() {
    try {
      const data = await getAllAssets();
      if (data) setAssetData(data);
    } catch (error) {
      console.log('Error fetching asset data from BE:', error);
    }
  }

  useEffect(() => {
    fetchAssets();
  }, []);

  return (
    <>
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
              <Route path="/users" element={<UserManagement />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="*" element={<Dashboard />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
