import {
  IoIosNotificationsOutline,
  IoIosHelpCircleOutline,
} from 'react-icons/io';
import { IoSettingsOutline } from 'react-icons/io5';

function NavBar() {
  return (
    <>
      <div className="flex justify-between items-center h-15 shadow-3xl/30">
        <div className="flex items-center gap-8 mr-5">
          <IoIosNotificationsOutline />
          <IoSettingsOutline />
          <IoIosHelpCircleOutline />
        </div>
      </div>
    </>
  );
}

export default NavBar;
