import { Routes, Route } from 'react-router-dom';
import SideBar from '../components/SideBar.jsx';
import TopNavBar from '../components/TopNavBar.jsx';
import AssetManagement from '../pages/AssetManagement.jsx';
import UserManagement from '../pages/UserManagement.jsx';
import Settings from '../pages/Settings.jsx';
import { useState } from 'react';

function App() {
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);
  return (
    <>
      <div className="flex h-screen">
        <div className="flex bg-[#1d1d1d] text-white flex-col justify-between transition-all duration-200">
          <SideBar isMenuCollapsed={isMenuCollapsed} />
        </div>

        <div className="flex-1">
          <TopNavBar
            setIsMenuCollapsed={setIsMenuCollapsed}
            isMenuCollapsed={isMenuCollapsed}
          />
          <Routes>
            <Route path="/assets" element={<AssetManagement />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
