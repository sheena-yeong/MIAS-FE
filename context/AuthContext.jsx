import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:3000/auth';

const AuthContext = createContext(null); // calling AuthContext outside of <AuthProvider> will return null

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [tokens, setTokens] = useState({ access: null, refresh: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  async function signIn(eid, password) {
    try {
      const { data } = await axios.post(`${BASE_URL}/sign-in`, { eid, password });

      setTokens({ access: data.access, refresh: data.refresh });

      const payload = JSON.parse(atob(data.access.split('.')[1]));
      setUser({ _id: payload._id, eid: payload.eid, role: payload.role });

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

async function signUp(userData) {
  try {
    const { data } = await axios.post(`${BASE_URL}/sign-up`, userData);
    return { success: true, message: data.message };
  } catch (error) {
    console.error('SignUp Error Details:', error.response?.data); // ✅ Add this
    return { 
      success: false, 
      error: error.response?.data || error.message  // ✅ Fix this
    };
  }
}

  async function signOut() {
    try {
      await axios.post(`${BASE_URL}/sign-out`, {}, {
        headers: {
          Authorization: `Bearer ${tokens.access}`,
        },
      });
    } catch (error) {
      console.log('Sign out error:', error);
    } finally {
      setUser(null);
      setTokens({ access: null, refresh: null });
    }
  }

  const value = {
    user,
    tokens,
    loading,
    signIn,
    signOut,
    signUp,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to check if this hook was used inside AuthProvider. If yes, return the context.
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
