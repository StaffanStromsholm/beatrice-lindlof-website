import React, { useEffect, useState } from "react";
import { app } from "./firebase-config";
import { auth } from "./firebase-config";
import firebase from 'firebase/compat/app';

export type User = firebase.User

interface AppContextInterface {
    currentUser: User | null;
  }

type AuthProverProps = {
    children: React.ReactNode
}

export const AuthContext = React.createContext<AppContextInterface | null>(null);


export const AuthProvider = (props: AuthProverProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user)
      setPending(false)
    });
  }, []);

  if(pending){
    return <>Loading...</>
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};