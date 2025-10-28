import { useState } from 'react';
import { IoMdArrowDropright } from 'react-icons/io';

function LeftNavBar() {
  const [showSection, setShowSection] = useState('');
  const [isActive, setIsActive] = useState('');

  return (
    <>
      <h3 className="m-3 text-xl">IT Inventory Management</h3>
      <div className="flex flex-col items-start p-3">
        <h3>Asset Management</h3>
        <button>Associate Management</button>
        <button>Account Management</button>
        <button>Settings</button>
      </div>
    </>
  );
}

export default LeftNavBar;
