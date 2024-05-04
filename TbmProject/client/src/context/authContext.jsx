import { useContext, createContext, useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setCurrentUser, resetUser } from '@/store/currentUserReducer';
import PropTypes from "prop-types";
import {
  GoogleAuthProvider,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
  getRedirectResult,
} from 'firebase/auth'

import { initFirebase } from "../../../serveur/config.js"

const { auth } = initFirebase();

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const googleSignIn = async () => {
    setIsRedirecting(true);
    const provider = new GoogleAuthProvider();
    await signInWithRedirect(auth, provider);
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      dispatch(resetUser());
      if (window.location.hash === '#/favoris'){
        window.location.href = '/';
      }
    } catch (error) {
      console.error("Erreur lors de la déconnexion : ", error);
    }  };

  useEffect(() => {
    const handleAuthStateChanged = async (unsubscribe) => {
      onAuthStateChanged(auth, async (currentUser) => {
        let actualUser = {
          name: '',
          uid: '',
          photoProfil: '',
          favoris: [],
        }
        if (currentUser != null) {
          actualUser.name = currentUser.displayName;
          actualUser.uid = currentUser.uid;
          actualUser.photoProfil = currentUser.photoURL;
          try {
            const response = await axios.post('/create', null, {
              headers: {
                'X-Name': actualUser.name,
                'X-UID': actualUser.uid,
                'X-PhotoProfil': actualUser.photoProfil
              }
            });
            actualUser = response.data;
            dispatch(setCurrentUser(actualUser));
          } catch (error) {
            console.error("Erreur lors de la création de l'utilisateur : ", error);
          }
        } else if (isRedirecting) {
          setIsRedirecting(false);
          await getRedirectResult(auth);
        }
      });

      return () => {
        unsubscribe();
      };
    };

    const unsubscribe = auth.onAuthStateChanged(handleAuthStateChanged);

    return () => {
      unsubscribe();
    };
  }, [isRedirecting, dispatch]);

  return (
    <AuthContext.Provider value={{ googleSignIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
