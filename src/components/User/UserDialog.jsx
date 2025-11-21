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

  /* ========== Arrays ========== */
    const roles = ["Admin", "Editor", "Viewer" ];
  
    /* ========== Functions ========== */
    function resetValues() {
      setNewUser({
        eid: "",
        username: "",
        password: "",
        email: "",
        role: "Viewer",
        isEmployed: true,
      });
      setIsEditMode(false);
    }
  
    async function handleCreateUser(e) {
      e.preventDefault();
      try {
        const result = await createUser(newUser, tokens.access);
        resetValues();
        setOpenDialog(false);
        fetchUsers();
        console.log("User created:", result);
      } catch (error) {
        console.log("Failed to create User", error);
      }
    }

  return <div>UserDialog</div>;
}

export default UserDialog;
