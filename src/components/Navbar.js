import {
  Navbar,
  Typography,
  IconButton,
  Button,
  Input,
} from "@material-tailwind/react";
import { BellIcon, Cog6ToothIcon } from "@heroicons/react/24/solid";
import { useAuth } from "../context/AuthContext";
import React, { useEffect, useState } from "react";
import { Avatar } from "@material-tailwind/react";
import axios from "axios";
import { toast } from "react-toastify";
import { useSearch } from "../context/SearchContext";

export function NavbarDark() {
  const { user, SignUp, SignOut } = useAuth();
  // const [searchValue, setSearchValue] = useState();
  // const [allUsers, setAllUsers] = useState([])
  const { searchTerm, setSearchTerm, searchFriends, setSearchFriends } = useSearch();
  const [searchedFriends, setSearchedFriends] = useState([]);

  // useEffect(()=>{
  //   axios.get("http://localhost:3001/get-all-friends").then((response)=>{
  //     console.log('all friends',response.data)
  //     setAllUsers(response.data);
  //   }).catch((err)=>{
  //     console.log(err)
  //   })
  // },[])

  useEffect(() => {
    console.log("searched friends", searchedFriends);
    console.log('searchFriends', searchFriends)
    if (searchedFriends.length > 0) {
      toast.success("user found");
      console.log(searchedFriends);
    }
  }, [searchedFriends]); // Ensure this dependency array is correctly set

  // useEffect(() => {
  //   console.log("searchedx friends", searchedFriends);
  // }, [searchFriends]);

  const handleSearch = async () => {
    if (searchTerm !== "") {
      // console.log(searchValue);
      // allUsers.filter((user)=>{
      //   return searchValue.toLowerCase() === '' ? user : user.email.toLowerCase().includes(searchValue)
      // }).map(user=>{
      //   return(
      //     console.log(user)
      //   )
      // })
      try {
        const response = await axios({
          method: "GET",
          url: `http://localhost:3001/get-user/${searchTerm}`,
        });

        console.log("friends term", response.data);
        const friends = response.data;
        const friends2 = friends.filter((friend) => friend.id!== user.uid);
        console.log('user id' , user.id)
        // console.log("friends2", friends2)
        if(friends2.length === 0){
          toast.error("User not found !")
        }
        setSearchFriends(friends2)
        setSearchedFriends(friends2);
      } catch (err) {
        console.log(err);
      }

      // console.log('search friends end', searchFriends)
      // if (searchFriends.length > 0) {
      //   toast.success("User found !");
      // } else {
        // toast.error("User not found!");
      // }
    }
  };

  return (
    <Navbar
      variant="gradient"
      color="blue-gray"
      className="mx-auto max-w-screen-xl from-blue-gray-900 to-blue-gray-800 px-4 py-3 sticky top-0 z-50"
    >
      <div className="flex flex-wrap items-center justify-between gap-y-4 text-white">
        <Typography
          as="a"
          href="#"
          variant="h6"
          className="mr-4 ml-2 cursor-pointer py-1.5"
        ></Typography>
        <div className="relative flex w-full gap-2 md:w-max">
          <Input
            type="search"
            value={searchTerm}
            color="white"
            label="Type here..."
            className="pr-20"
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            containerProps={{
              className: "min-w-[288px]",
            }}
          />
          <Button
            size="sm"
            color="white"
            className="!absolute right-1 top-1 rounded"
            onClick={handleSearch}
          >
            Search
          </Button>
        </div>
        <div className="ml-auto flex gap-1 md:mr-4 items-center">
          {user && (
            <div className="flex items-center space-x-3">
              <Avatar src={user.photoURL} alt="avatar" size="sm" />
              <div className="text-sm">{user.displayName}</div>
            </div>
          )}
          <IconButton variant="text" color="white">
            <Cog6ToothIcon className="h-4 w-4" />
          </IconButton>
          <IconButton variant="text" color="white">
            <BellIcon className="h-4 w-4" />
          </IconButton>
        </div>
        <div className="relative">
          {user ? (
            <>
              {" "}
              <Button
                size="sm"
                color="white"
                className="right-1 rounded"
                onClick={SignOut}
              >
                Sign Out
              </Button>
            </>
          ) : (
            <>
              {" "}
              <Button
                size="sm"
                color="white"
                className="right-1 rounded"
                onClick={SignUp}
              >
                Sign In
              </Button>
            </>
          )}
        </div>
      </div>
    </Navbar>
  );
}
