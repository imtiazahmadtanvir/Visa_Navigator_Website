import { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import app from "../firebase/firebase.config"
import { createUserWithEmailAndPassword,getAuth } from 'firebase/auth';

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Initial state for user


  const createNewUser=(email,password)=>{
    return createUserWithEmailAndPassword(auth,email,password)
  }
  const authInfo = {
    user,
    setUser,
    createNewUser,
  };

   
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
