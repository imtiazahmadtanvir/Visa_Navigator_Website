import { createContext, useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import app from "../firebase/firebase.config"
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,sendPasswordResetEmail, signInWithPopup 
} from "firebase/auth";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();
const auth = getAuth(app);

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createNewUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const userLogin = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };
  
  const googleProvider = new GoogleAuthProvider();
  const passwordReset = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
};

const createUserWithGoogle = () => {
  setLoading(true);
  return signInWithPopup(auth, googleProvider)
    .then((result) => {
      setUser(result.user);
      return result.user;
    })
    .catch((error) => {
      setLoading(false);
      throw error;
    });
};

  const authInfo = {
    user,
    setUser,
    createNewUser,
    logOut,
    userLogin,
    loading,
    passwordReset,
    createUserWithGoogle, 

  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,  // Ensure children is required
};

export default AuthProvider;
