import React, { useState, useEffect } from "react";
import Cards from "./Cards";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import AddCard from "./AddCard";
import { useSearch } from "../context/SearchContext";

const ChatBody = () => {
  const { searchTerm, searchFriends } = useSearch();
  const { user } = useAuth();
  const [userFriends, setUserFriends] = useState([]);
  console.log("user friendssssss", userFriends);

  useEffect(() => {
    console.log("user friends", userFriends);
    console.log("search friends", searchFriends);
  }, [userFriends, searchFriends]);

  useEffect(() => {
    console.log("user chatbody", user);
    console.log("cjecl search friend", searchFriends);
    if (user) {
      console.log("this user id", user.uid);
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
    }
  }, [user]);

  return (
    <div className="mx-auto max-w-screen-xl from-blue-gray-900 to-blue-gray-800 px-4 py-3 max-h-screen mt-10 flex justify-center">
      {searchTerm !== "" &&
      userFriends.length > 0 &&
      searchFriends.length === 0 ? (
        userFriends
          ?.filter((friend) => {
            return searchTerm.toLowerCase() === ""
              ? friend
              : friend.email.toLowerCase().includes(searchTerm);
          })
          .map((friend) => {
            return (
              <div className="grid grid-cols-3 gap-10">
                <Cards friend={friend} />
              </div>
            );
          })
      ) : (
        <div>
          {searchTerm !== "" && searchFriends.length > 0 ? (
            <div className="grid grid-cols-3 gap-10">
              {searchFriends.map((friend) => {
                return <AddCard friendDetails={friend} />;
              })}
            </div>
          ) : (
            <div>
              {searchTerm === "" && userFriends.length > 0 ? (
                <div className="grid grid-cols-3 gap-10">
                  {userFriends.map((friend) => (
                    <div
                      className="flex items-center justify-center"
                      key={friend?.id}
                    >
                      <Cards friend={friend} />
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  You have got no friends yet..! Please search for new friends.
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatBody;
