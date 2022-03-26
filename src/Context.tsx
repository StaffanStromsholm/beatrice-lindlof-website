import React, { useEffect, useState } from "react";
import { app } from "./firebase-config";
import { auth } from "./firebase-config";
import firebase from 'firebase/compat/app';

export type User = firebase.User

interface AppContextInterface {
    currentUser: User | null;
    setLanguageHandler: (language: T_Language) => void;
    language: T_Language;
  }

type AuthProverProps = {
    children: React.ReactNode
}

export type T_Language = "sv" | "fi";

export const Context = React.createContext<AppContextInterface | null>(null);


export const Provider = (props: AuthProverProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [language, setLanguage] = useState<T_Language>("sv");
  const [pending, setPending] = useState<boolean>(true);

  const setLanguageHandler = (language: T_Language) => {
    setLanguage(language);
  }

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
    <Context.Provider
      value={{
        currentUser,
        setLanguageHandler,
        language
      }}
    >
      {props.children}
    </Context.Provider>
  );
};