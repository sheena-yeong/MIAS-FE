import { IoIosNotificationsOutline } from 'react-icons/io';
import { IoSettingsOutline, IoSearchOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { IoIosMenu } from "react-icons/io";

function NavBar({ isMenuCollapsed, setIsMenuCollapsed }) {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex pl-5 justify-between items-center h-15 shadow-md">
        <div className="flex gap-2 items-center">
          <IoIosMenu
            size={25}
            onClick={() => setIsMenuCollapsed(!isMenuCollapsed)}
          />
          <div className="relative w-full max-w-[800px] min-w-[600px]">
            <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="search"
              className="pl-10 pr-3 py-2 w-full rounded-xl bg-gray-50 border border-gray-500
            text-sm placeholder-gray-400 outline-none transition-shadow
            focus:shadow-[0_0_0_4px_rgba(0,122,255,0.12)] focus:border-blue-400"
              placeholder="Search assets, invoices or users..."
            />
          </div>
        </div>
        <div className="flex items-center gap-8 mr-5">
          <IoIosNotificationsOutline
            size={23}
            className="transition-transform duration-300 ease-in-out hover:rotate-12 hover:scale-110"
          />
          <IoSettingsOutline
            size={23}
            onClick={() => navigate('/settings')}
            className="transition-transform duration-300 ease-in-out hover:rotate-45"
          />
        </div>
      </div>
    </>
  );
}

export default NavBar;
