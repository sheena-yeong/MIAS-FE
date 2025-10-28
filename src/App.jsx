import Body from '../components/Body.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SideBar from '../components/SideBar.jsx';
import TopNavBar from '../components/TopNavBar.jsx'
import AssetManagement from '../pages/AssetManagement.jsx';

function App() {
  return (
    <>
      <div className="flex h-screen">
        <div className="w-2xs bg-[#1d1d1d] text-white">
          <SideBar />
        </div>
        <div className="flex-1">
        <TopNavBar />
          <Routes>
            <Route path="/assets" element={<AssetManagement />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
