import React, { useCallback, useEffect, useState } from 'react';
import {
  getAuth,
  setPersistence,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  browserLocalPersistence
} from 'firebase/auth';
import { db, firebaseApp } from '../firebase';
import { AuthContextType, LogInForm } from '../models/login';
import { useNavigate } from 'react-router';

export const AuthContext = React.createContext<AuthContextType | null>(null);

export function useAuth() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [authUser, setAuthUser] = useState<any>(null);
  const [exchangeRate, setExchangeRate] = useState<object | undefined>({});
  const auth = getAuth(firebaseApp);
  const navigate = useNavigate();

  useEffect(() => {
    const getAuth = async () => {
      setLoading(true);
      await onAuthStateChanged(auth, async (user) => {
        const email = await user?.email?.toString();
        await db
          .collection('accounts')
          .doc(email)
          .onSnapshot((snapshot) => setAuthUser(snapshot.data()));
      });
      const rates = await db.collection('exchangeRate').doc('rates').get();
      await setExchangeRate(rates.data());
    };
    getAuth();
    setLoading(false);
    return;
  }, []);

  const logIn = useCallback(async (form: LogInForm) => {
    const { email, password } = form;
    try {
      setPersistence(auth, browserLocalPersistence).then(async () => {
        signInWithEmailAndPassword(auth, email, password)
          .then((user) => setAuthUser(user))
          .catch((e) => {
            const errorMessage = e.message;
            alert(errorMessage);
          });
      });
    } catch (e) {
      console.log(e);
      setAuthUser(null);
      return undefined;
    } finally {
      setLoading(false);
    }
  }, []);

  const logOut = useCallback(async () => {
    await signOut(auth);
    navigate('/');
  }, []);
  return {
    authState: {
      isLoading,
      authUser,
      exchangeRate
    },
    authHandler: {
      logIn,
      logOut
    }
  };
}
