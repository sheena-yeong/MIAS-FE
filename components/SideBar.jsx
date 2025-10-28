import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  IoHomeSharp,
  IoFolderOpen,
  IoPeopleSharp,
  IoPersonSharp,
  IoTimeSharp,
  IoSettingsSharp,
} from 'react-icons/io5';
import { LuLayoutDashboard } from 'react-icons/lu';

import miasLogo from '../assets/mias_logo.png';
import avatarBoy from '../assets/avatar-sample-boy.png';

function SideBar() {
  const navigate = useNavigate();

  const [active, setActive] = useState('');
  const navItems = [
    { name: 'Dashboard', icon: <IoHomeSharp />, path: '/dashboard' },
    { name: 'Asset Management', icon: <IoFolderOpen />, path: '/assets' },
    // { name: 'Associate Management', icon: <IoPeopleSharp />, path: '/associates'  },
    { name: 'User Management', icon: <IoPersonSharp />, path: '/users' },
    { name: 'History', icon: <IoTimeSharp />, path: '/history' },
  ];

  return (
    <>
      <div className="flex flex-col items-start p-3 space-y-2">
        <img src={miasLogo} className="mt-3 mb-8" />
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={() => {
              setActive(item.name);
              navigate(item.path);
            }}
            className={`flex items-center gap-2 py-3 text-lg w-full text-left px-3 rounded-md transition-colors
          ${
            active === item.name
              ? 'bg-[#ff5c5c] text-black'
              : 'hover:bg-[#4a4949]'
          }`}
          >
            <span className="w-5 h-5">{item.icon}</span>
            {item.name}
          </button>
        ))}
      </div>
      <img src={avatarBoy} className="w-10" />
    </>
  );
}

export default SideBar;
