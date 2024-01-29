import { createContext, useContext, useState, useEffect } from "react";
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState('');

  const SignUp = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((res) => {
        console.log("Signed in successfully");
        toast.success("Signed in Successfully !");
        setUser(res.user);
        console.log(res.user);
        axios({
          method: "POST",
          url: `http://localhost:3001/register/${res.user.uid}`,
          data: {
            id: res.user.uid,
            email:res.user.email,
            name: res.user.displayName,
          },
        })
          .then((data) => {
            console.log('user id',data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log("Failed to sign in", err);
      });
  };

  const SignOut = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        toast.success("Signed out Successfully !");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        console.log(user.uid);
      } else {
        setUser(null);
      }
    });
  }, []);

  const value = { user, setUser, SignOut, SignUp };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  return useContext(AuthContext);
}
