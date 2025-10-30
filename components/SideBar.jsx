import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { IoHomeSharp, IoFolderOpen, IoPeopleSharp } from 'react-icons/io5';
import { LuHistory } from 'react-icons/lu';
import { BsThreeDotsVertical } from 'react-icons/bs';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import miasLogo from '../assets/mias_logo.png';
import miasLogoCollapsed from '../assets/mias_logo_collapsed.png';
import avatarBoy from '../assets/avatar-sample-boy.png';

function SideBar({ isMenuCollapsed }) {
  const navigate = useNavigate();
  const location = useLocation(); // grabs the current path from param

  const navItems = [
    { name: 'Dashboard', icon: <IoHomeSharp />, path: '/dashboard' },
    { name: 'Asset Management', icon: <IoFolderOpen />, path: '/assets' },
    { name: 'User Management', icon: <IoPeopleSharp />, path: '/users' },
    { name: 'Transactions', icon: <LuHistory />, path: '/transactions' },
  ];

  return (
    <div
      className={`flex flex-col justify-between h-full transition-all duration-300 items-start
      ${isMenuCollapsed ? 'w-20' : 'w-64'}`}
    >
      <div className="flex flex-col items-start p-3 space-y-2 w-full">

        {/* Logo */}
        <div
          className={`flex w-full mt-3 ${
            isMenuCollapsed ? 'justify-center' : 'justify-start'
          } mb-8 h-15 items-center`}
        >
          <img 
            src={isMenuCollapsed ? miasLogoCollapsed : miasLogo} 
            className="h-full w-auto object-contain transition-all duration-300"
          />
        </div>

        {/* Items */}
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={() => {
              navigate(item.path);
            }}
            className={`flex items-center gap-3 py-3 text-lg w-full text-left px-3 rounded-md transition-all duration-300
          ${
            location.pathname === item.path
              ? 'bg-[#ff5c5c] text-black'
              : 'hover:bg-[#4a4949]'
          }
          ${isMenuCollapsed ? 'justify-center' : ''}`}
          >
            <span className="w-5 h-5">{item.icon}</span>
            <span 
              className={`whitespace-nowrap transition-all duration-300 overflow-hidden ${
                isMenuCollapsed 
                  ? 'opacity-0 w-0' 
                  : 'opacity-100'
              }`}
            >
              {item.name}
            </span>
          </button>
        ))}
      </div>

      {/* Avatar Card */}
      <div className={`flex items-center w-full transition-all duration-300 ${
        isMenuCollapsed ? 'justify-center' : 'justify-between'
      }`}>
        <div className="flex items-center min-w-0">
          <img src={avatarBoy} className="w-10 m-5" />
          <div 
            className={`flex flex-col min-w-0 transition-all duration-300 overflow-hidden ${
              isMenuCollapsed 
                ? 'opacity-0 w-0' 
                : 'opacity-100'
            }`}
          >
            <h1 className="whitespace-nowrap">Simon Ong</h1>
            <h1 className="text-slate-400 whitespace-nowrap">Admin</h1>
          </div>
        </div>

        <div 
          className={`pr-3 transition-all duration-300 ${
            isMenuCollapsed 
              ? 'opacity-0 w-0 overflow-hidden' 
              : 'opacity-100 hover:scale-110'
          }`}
        >
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
    </div>
  );
}

export default SideBar;