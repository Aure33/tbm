import { useContext, createContext, useEffect } from "react";
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setCurrentUser } from '@/store/currentUserReducer';
import PropTypes from "prop-types";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'

import { initFirebase } from "../../../serveur/config.js"

const { auth } = initFirebase(); 

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const dispatch = useDispatch(); 
  
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const logOut = () => {
    signOut(auth);
  };

  useEffect(()  => {
    const unsubscribe =  onAuthStateChanged(auth, async (currentUser) => {
      var actualUser = {
        name: '',
        uid: '',
        photoProfil: '',
        favoris: [],
      }
      if(currentUser != null){
        actualUser.name = currentUser.displayName;
        actualUser.uid = currentUser.uid;
        actualUser.photoProfil = currentUser.photoURL;
        
        await axios.post('/create', null, {
          headers: {
            'X-Name': actualUser.name,
            'X-UID': actualUser.uid,
            'X-PhotoProfil': actualUser.photoProfil
          }
        }).then((response) => {
          actualUser = response.data;
        }
        ).catch((error) => {
          console.error("Erreur lors de la création de l'utilisateur : ", error);
        });
      }
      dispatch(setCurrentUser(actualUser));
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

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
