import * as Dialog from '@radix-ui/react-dialog';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { useState, useEffect } from 'react';
import { createUser, updateUser } from '../../services/user';
import { useAuth } from '../../context/AuthContext';

function UserDialog({
  openDialog,
  setOpenDialog,
  selectedUser,
  fetchUsers,
}) {
  /* ========== useStates and useEffect ========== */
  const { tokens } = useAuth();
  const [isEditMode, setIsEditMode] = useState(false);
  const [newUser, setNewUser] = useState({
    eid: "",
    username: "",
    password: "",
    email: "",
    role: "Viewer",
    isEmployed: true,
  });

  useEffect(() => {
    if (selectedUser) {
      setNewUser({
        eid: selectedUser.eid || "",
        username: selectedUser.username || "",
        password: selectedUser.password || "",
        email: selectedUser.email || "",
        role: selectedUser.role || "Viewer",
        isEmployed: selectedUser.isEmployed || true,
      });
      setIsEditMode(true);
    } else {
      resetValues();
      setIsEditMode(false);
    }
  }, [selectedUser]);

  return <div>UserDialog</div>;
}

export default UserDialog;
