/* eslint-disable no-shadow */
import firebase from 'firebase/compat/app';
import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
import 'firebase/compat/firestore';

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [firstCurrency, setFirstCurrency] = useState('');
  const [secondCurrency, setSecondCurrency] = useState('');
  const [activeTheme, setActiveTheme] = useState(true);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
  }, [user]);
  const firestore = firebase.firestore();
  const value = {
    user,
    firestore,
    firstCurrency,
    setFirstCurrency,
    secondCurrency,
    setSecondCurrency,
    activeTheme,
    setActiveTheme,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
