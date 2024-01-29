import { useState, createContext, useContext,useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const SearchContext = createContext();

export const SearchContextProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchFriends , setSearchFriends] = useState([])
  const [userFriends, setUserFriends] = useState([]);
  const { user } = useAuth();

  useEffect(()=>{
    axios({
      method: "GET",
      url: `http://localhost:3001/get-friends/${user.uid}`,
    })
      .then((res) => {
        console.log("Friends are ", res.data);
        setUserFriends(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },[user])

  const values = { searchTerm, setSearchTerm, searchFriends, setSearchFriends, userFriends, setUserFriends };


  return (
    <SearchContext.Provider value={values}>{children}</SearchContext.Provider>
  );
};


export function useSearch(){
    return useContext(SearchContext)
}