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
import { BsThreeDotsVertical } from 'react-icons/bs';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import miasLogo from '../assets/mias_logo.png';
import avatarBoy from '../assets/avatar-sample-boy.png';

function SideBar() {
  const navigate = useNavigate();

  const [active, setActive] = useState('');
  const navItems = [
    { name: 'Dashboard', icon: <IoHomeSharp />, path: '/dashboard' },
    { name: 'Asset Management', icon: <IoFolderOpen />, path: '/assets' },
    { name: 'User Management', icon: <IoPersonSharp />, path: '/users' },
    { name: 'Transactions', icon: <IoTimeSharp />, path: '/history' },
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
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img src={avatarBoy} className="w-10 m-5" />
          <div className="flex flex-col">
            <h1>Simon Ong</h1>
            <h1 className="text-slate-400">Admin</h1>
          </div>
        </div>
        <div className="pr-3 transition-transform duration-300 ease-in-out hover:scale-110">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <BsThreeDotsVertical />
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenu.Content
                className="bg-white text-black rounded-md shadow-lg p-2 m-2 min-w-[90px]"
                sideOffset={5}
                align="end"
                alignOffset={-10}
              >
                <DropdownMenu.Item>Logout</DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      </div>
    </>
  );
}

export default SideBar;
